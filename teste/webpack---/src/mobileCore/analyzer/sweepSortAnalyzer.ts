
import * as _ from 'lodash';
import {getSign, getComponentEndCoordinate, areSimilarFragments, sortComponentsByNaturalOrder, getComponentSize} from './analyzerUtils';
import {objectUtils} from 'santa-core-utils';

const EVENTS_TYPES = {
    START_EVENT: 'start',
    END_EVENT: 'end'
};

const COMPONENT_SIZE_SCALE_FACTOR = 0.9;

const DISTANCE_PARTITIONS_WEIGHTS = {
    HORIZONTAL: 1,
    VERTICAL: 1.25
};

interface PartitionsStrategies {
    singleCompRow: boolean;
    verticalDivider: boolean;
    mirrorPattern: boolean;
    chessPattern: boolean;
}

type StrategyHandler = (fragments: Fragment[], allEvents: {x: Event[]; y: Event[]; }, partitionAxis: Axis) => Partition | null;

function findVerticalDividerFragmentIndex(fragments: Fragment[], allEvents: {x: Event[]; y: Event[]; }): number {
    const eventsCoordinates = <number[][]> _(allEvents.y).partition({eventType: EVENTS_TYPES.START_EVENT}).map(a => _.map(a, 'coordinate')).value();
    const maxStart = _.max(eventsCoordinates[0]);
    const minEnd = _.min(eventsCoordinates[1]);
    return _.findIndex(fragments, fragment => {
        const firstComp = fragment.comps[0];
        return fragment.comps.length === 1 && firstComp.conversionData.keepIfVerticalDivider &&
            firstComp.layout.y <= minEnd && getComponentEndCoordinate(firstComp, 'y') >= maxStart;
    });
}

function refragment(fragments: Fragment[], getNewFragmentIndex: (originalIndex: number) => number): Fragment[] {
    return _.transform(fragments, (res, fragment, fragmentIndex) => {
        const newFragmentIndex = getNewFragmentIndex(fragmentIndex);
        res[newFragmentIndex] = res[newFragmentIndex] || {comps: [], distanceToPreviousFragment: fragment.distanceToPreviousFragment};
        res[newFragmentIndex].comps = [...res[newFragmentIndex].comps, ...fragment.comps];
        return res;
    }, []);
}

const strategiesHandlers = {
    singleCompRow(fragments: Fragment[], allEvents: {x: Event[]; y: Event[]; }, partitionAxis: Axis) {
        if (partitionAxis === 'x') {
            return null;
        }
        const singleCompRowIndex = _.findIndex(fragments, fragment => _.size(fragment.comps) === 1);
        if (singleCompRowIndex === -1) {
            return null;
        }
        const getNewFragmentIndex = (oldFragmentIndex: number) => getSign(oldFragmentIndex - singleCompRowIndex) + getSign(singleCompRowIndex);
        const newFragments = refragment(fragments, getNewFragmentIndex);
        return <Partition> {type: 'singleCompRow', fragments: newFragments, fragmentsEvents: splitAllEventsByFragments(allEvents, newFragments)};
    },

    verticalDivider(fragments: Fragment[], allEvents: {x: Event[]; y: Event[]; }, partitionAxis: Axis): Partition | null {
        const isSingleCompFragment = (fragment) => _.size(fragment.comps) === 1;
        if (_.size(fragments) < 3 || _.every(fragments, isSingleCompFragment) || partitionAxis === 'y') {
            return null;
        }
        const dividerFragmentIndex = findVerticalDividerFragmentIndex(fragments, allEvents);
        if (dividerFragmentIndex === -1) {
            return null;
        }
        _.set(fragments[dividerFragmentIndex].comps[0], ['conversionData', 'isVerticalDivider'], true);
        const getNewFragmentIndex = (oldFragmentIndex: number) => getSign(oldFragmentIndex - dividerFragmentIndex) + getSign(dividerFragmentIndex);
        const newFragments = refragment(fragments, getNewFragmentIndex);
        return <Partition> {type: 'verticalDivider', fragments: newFragments, fragmentsEvents: splitAllEventsByFragments(allEvents, newFragments)};
    },

    mirrorPattern(fragments: Fragment[], allEvents: {x: Event[]; y: Event[]; }, partitionAxis: Axis): Partition | null {
        if (_.size(fragments) < 2) {
            return null;
        }
        const fragmentsEvents = splitAllEventsByFragments(allEvents, fragments);
        const perpAxis = getPerpendicularAxis(partitionAxis);
        const sortedFragmentsComps = <ComponentWithConversionData[][]> _.map(fragmentsEvents, fragmentEvents => extractCompsFromEvents(fragmentEvents[perpAxis]));
        const isMirrorPattern = _.every(sortedFragmentsComps, fragmentComps => areSimilarFragments(fragmentComps, sortedFragmentsComps[0], perpAxis));
        if (!isMirrorPattern) {
            return null;
        }
        return isMirrorPattern ? createSingleFragmentPartition(_.flatten(sortedFragmentsComps), allEvents, {type: 'mirrorPattern'}) : null;
    },

    chessPattern(fragments: Fragment[], allEvents: {x: Event[]; y: Event[]; }, partitionAxis: Axis): Partition | null {
        const isValidFragmentSize = (fragment) => _.size(fragment.comps) === 2;
        if (partitionAxis !== 'y' || _.size(fragments) < 2 || !_.every(fragments, isValidFragmentSize)) {
            return null;
        }
        const fragmentsEvents = splitAllEventsByFragments(allEvents, fragments);
        const xSortedFragmentsComps = <ComponentWithConversionData[][]> _.map(fragmentsEvents, fragmentEvents => extractCompsFromEvents(fragmentEvents.x));
        const chessSortedComps = _.flatMap(xSortedFragmentsComps, (fragmentComps, fragmentIndex) => isEven(fragmentIndex) ? fragmentComps : _.reverse(fragmentComps));
        const evenCategory = chessSortedComps[0].conversionData.category;
        const oddCategory = evenCategory === 'text' ? 'photo' : 'text';
        const isValidChessComp = (comp, compIndex) => comp.conversionData.category === (isEven(compIndex) ? evenCategory : oddCategory);
        const isChessPattern = _.every(chessSortedComps, isValidChessComp);
        return isChessPattern ? createSingleFragmentPartition(<ComponentWithConversionData[]> chessSortedComps, allEvents, {type: 'chessPattern'}) : null;
    }
};

interface DistancePartition extends Partition {
    maxCompsDistance: number;
}

export const extractCompsFromEvents = (events: Event[]): ComponentWithConversionData[] => <ComponentWithConversionData[]> _(events).map('compRef').uniq().value();
const getPerpendicularAxis = (axis: Axis): Axis => axis === 'x' ? 'y' : 'x';
const isEven = (n: number): boolean => n % 2 === 0;

function createSingleFragmentPartition(sortedComps: ComponentWithConversionData[], allEvents: {x: Event[]; y: Event[]; }, partitionData: {type: string}): Partition {
    return <Partition> _.assign(partitionData, {fragments: [{comps: sortedComps, distanceToPreviousFragment: -1}], fragmentsEvents: [allEvents]});
}

function compareEvents(event1: Event, event2: Event): number {
    const distance = event1.coordinate - event2.coordinate;
    if (distance !== 0) {
        return getSign(distance);
    }
    if (event1.compRef === event2.compRef) {
        return event1.eventType === EVENTS_TYPES.END_EVENT ? 1 : -1;
    }
    return event1.eventType === EVENTS_TYPES.END_EVENT ? -1 : 1;
}

function insertStable(arr: Event[], event: Event): Event[] {
    const i = _.findLastIndex(arr, e => {
        if (e.coordinate === event.coordinate) {
            if (e.eventType === EVENTS_TYPES.START_EVENT && event.eventType === EVENTS_TYPES.START_EVENT) {
                return e.size > event.size;
            }
            if (e.eventType === EVENTS_TYPES.END_EVENT && event.eventType === EVENTS_TYPES.END_EVENT) {
                return e.size < event.size;
            }
            if (e.eventType === EVENTS_TYPES.START_EVENT && event.eventType === EVENTS_TYPES.END_EVENT) {
                return e.compRef === event.compRef;
            }
            if (e.eventType === EVENTS_TYPES.END_EVENT && event.eventType === EVENTS_TYPES.START_EVENT) {
                return e.compRef !== event.compRef;
            }
        }
        return e.coordinate < event.coordinate;
    });
    arr.splice(i + 1, 0, event);
    return arr;
}

export function createEventsQueue(comps: ComponentWithConversionData[], axis: Axis): Event[] {
    const events = _.transform(comps, (eventsQueue, comp: ComponentWithConversionData) => {
        const componentStartPosition = comp.layout[axis] || 0;
        const componentEndPosition = getComponentEndCoordinate(comp, axis) || componentStartPosition;
        const componentSize = getComponentSize(comp, axis) || 0;
        insertStable(eventsQueue, <Event> {eventType: EVENTS_TYPES.START_EVENT, compRef: comp, coordinate: componentStartPosition, size: componentSize});
        insertStable(eventsQueue, <Event> {eventType: EVENTS_TYPES.END_EVENT, compRef: comp, coordinate: componentEndPosition, size: componentSize});
        return eventsQueue;
    }, []);
    return _.map(events, event => <Event> _.omit(event, 'size'));
}

export function createFragments(sweepLineEvents: Event[]): Fragment[] {
    const sweepLineStatus: Event[] = [];
    const fragments = [];

    _.forEach(sweepLineEvents, (event: Event) => {
        const lastFragment = <{events: Event[]; distanceToPreviousFragment: number; }> _.last(fragments);
        if (event.eventType === EVENTS_TYPES.START_EVENT) {
            if (_.isEmpty(sweepLineStatus)) {
                const distance = lastFragment ? event.coordinate - _.last(lastFragment.events).coordinate : -1;
                const newFragment = {events: [event], distanceToPreviousFragment: distance};
                fragments.push(newFragment);
            } else {
                lastFragment.events.push(event);
            }
            sweepLineStatus.push(event);
        } else {
            _.remove(sweepLineStatus, {compRef: event.compRef});
            lastFragment.events.push(event);
        }
    });

    return <Fragment[]> _.map(fragments, group => {
        return {comps: extractCompsFromEvents(group.events), distanceToPreviousFragment: group.distanceToPreviousFragment};
    });
}

function divideByDistance(fragments: Fragment[], allEvents: {x: Event[]; y: Event[]; }, partitionAxis: Axis): DistancePartition {
    const mostDistantFragment = _.maxBy(fragments, 'distanceToPreviousFragment');
    const mostDistantFragmentIndex = _.findIndex(fragments, mostDistantFragment);
    const getNewFragmentIndex = (oldFragmentIndex: number) => oldFragmentIndex < mostDistantFragmentIndex ? 0 : 1;
    const newFragments = refragment(fragments, getNewFragmentIndex);
    const adjacentFragments = [fragments[mostDistantFragmentIndex - 1], mostDistantFragment];
    const adjacentFragmentsEvents = _.filter(allEvents[getPerpendicularAxis(partitionAxis)], (e: Event) => _.some(adjacentFragments, g => _.includes(g.comps, e.compRef)));
    const partition = {fragmentsEvents: splitAllEventsByFragments(allEvents, newFragments), fragments: newFragments};
    const maxCompsDistance = calculateMaxCompsDistance(adjacentFragments, adjacentFragmentsEvents, partitionAxis);
    return <DistancePartition> _.assign(partition, {maxCompsDistance});
}

function extractPartitionAxisVectors(eventsPartition: Event[][], axis: Axis): PartitionAxisVectorEvent[][] {
    return _(eventsPartition)
        .map((events: Event[], vectorIndex) => {
            return <PartitionAxisVectorEvent[]> (vectorIndex ?
                _.map(events, (e: Event) => _.defaults({closestPoint: e.compRef.layout[axis]}, e)) :
                _.map(events, (e: Event) => _.defaults({closestPoint: getComponentEndCoordinate(e.compRef, axis)}, e)));
            })
        .map((events: PartitionAxisVectorEvent[], vectorIndex) => {
            return _.reduce(events, (vector, e) => {
                const lastAddedEvent = _.last(vector);
                if (!lastAddedEvent || lastAddedEvent.eventType === EVENTS_TYPES.END_EVENT) {
                    return vector.concat(e.eventType === EVENTS_TYPES.START_EVENT ? [e] : []);
                }
                if (lastAddedEvent.compRef === e.compRef) {
                    return [...vector, e];
                }
                if (vectorIndex && e.closestPoint < lastAddedEvent.closestPoint || !vectorIndex && e.closestPoint > lastAddedEvent.closestPoint) {
                    vector.splice(vector.length - 1, 1, e);
                }
                return vector;
            }, []);
        })
        .value();
}

interface PartitionAxisVectorEvent extends Event {
    closestPoint: number;
}

function calculateMaxCompsDistance(fragments: Fragment[], fragmentsEvents: Event[], axis: Axis): number {
    const eventsPartition = _.partition(fragmentsEvents, e => _.includes(fragments[0].comps, e.compRef));
    const events = extractPartitionAxisVectors(eventsPartition, axis);
    const eventIndex = [0, 0];
    const sweepLineStatus: PartitionAxisVectorEvent[][] = [[], []];

    function getNextEventFragmentIndex() {
        if (eventIndex[0] === events[0].length || eventIndex[1] === events[1].length) {
            return eventIndex[0] === events[0].length ? 1 : 0;
        }
        return events[0][eventIndex[0]].coordinate <= events[1][eventIndex[1]].coordinate ? 0 : 1;
    }
    let maxCompsDistances = -Infinity;
    while (eventIndex[0] < events[0].length || eventIndex[1] < events[1].length) {
        const eventFragmentIndex = getNextEventFragmentIndex();
        const event = events[eventFragmentIndex][eventIndex[eventFragmentIndex]++];
        if (event.eventType === EVENTS_TYPES.END_EVENT) {
            _.remove(sweepLineStatus[eventFragmentIndex], {compRef: event.compRef});
            continue;
        }
        sweepLineStatus[eventFragmentIndex].push(event);
        const closestEvents = [_.maxBy(sweepLineStatus[0], 'closestPoint'), _.minBy(sweepLineStatus[1], 'closestPoint')];
        const distanceBetweenClosestEvents = <number> _.get(closestEvents, [1, 'closestPoint']) - <number> _.get(closestEvents, [0, 'closestPoint']);
        if (!_.isNaN(distanceBetweenClosestEvents) && distanceBetweenClosestEvents > maxCompsDistances) {
            maxCompsDistances = distanceBetweenClosestEvents;
        }
    }
    return maxCompsDistances;
}

export function splitAxisEventsByFragments(events: Event[], fragments: Fragment[]): Event[][] {
    return _.transform(events, (res, event) => {
        const eventFragmentIndex = _.findIndex(fragments, group => _.includes(group.comps, event.compRef));
        res[eventFragmentIndex] = [...(res[eventFragmentIndex] || []), event];
        return res;
    }, []);
}

function splitAllEventsByFragments(allEvents: {x: Event[]; y: Event[]; }, fragments: Fragment[]): Array<{x: Event[]; y: Event[]; }> {
    const xEventsPartition = splitAxisEventsByFragments(allEvents.x, fragments);
    const yEventsPartition = splitAxisEventsByFragments(allEvents.y, fragments);
    return <Array<{x: Event[]; y: Event[]; }>> _.map(_.keys(fragments), index => _.assign({}, {x: xEventsPartition[index], y: yEventsPartition[index]}));
}

function findBestPartitionByStrategy(allEvents: {x: Event[]; y: Event[]; }, fragments: {x: Fragment[]; y: Fragment[]; }, strategies: PartitionsStrategies): Partition | null {
    let bestPartition = null;
    _.forEach(strategiesHandlers, (handler: StrategyHandler, strategyName) => {
        if (!strategies[strategyName]) {
            return true;
        }
        const bestPartitionY =  handler(fragments.y, allEvents, 'y');
        const bestPartitionX =  handler(fragments.x, allEvents, 'x');
        bestPartition = bestPartitionY && bestPartitionX ? null : bestPartitionY || bestPartitionX;
        return bestPartition === null;
    });
    return bestPartition;
}

function findBestDistancePartition(allEvents: {x: Event[]; y: Event[]; }, fragments: {x: Fragment[]; y: Fragment[]; }): Partition {
    const partitionX = _.size(fragments.x) > 1 ? divideByDistance(fragments.x, allEvents, 'x') : null;
    const partitionY = _.size(fragments.y) > 1 ? divideByDistance(fragments.y, allEvents, 'y') : null;
    if (partitionX && partitionY) {
        const bestDistancePartition = DISTANCE_PARTITIONS_WEIGHTS.HORIZONTAL * partitionX.maxCompsDistance > DISTANCE_PARTITIONS_WEIGHTS.VERTICAL * partitionY.maxCompsDistance ? partitionX : partitionY;
        return <Partition> _.pick(bestDistancePartition, ['fragments', 'fragmentsEvents']);
    }
    return partitionX || partitionY;
}

function findBestPartition(allEvents: {x: Event[]; y: Event[]; }, fragments: {x: Fragment[]; y: Fragment[]; }, strategies: PartitionsStrategies): Partition {
    return findBestPartitionByStrategy(allEvents, fragments, strategies) || findBestDistancePartition(allEvents, fragments);
}

function getSortedOverlappingComponents(parent: ComponentWithConversionData | MasterPageComponentWithConversionData, comps: ComponentWithConversionData[]): ComponentWithConversionData[] {
    comps = sortComponentsByNaturalOrder(parent, comps);
    comps = _.sortBy(comps, 'layout.y');
    const overlayGroupId = `overlayGroup_${comps[0].id}`;
    _.forEach(comps, comp => _.set(comp, ['conversionData', 'overlayGroupId'], overlayGroupId));
    return comps;
}

function getSortedComponents(parent: ComponentWithConversionData | MasterPageComponentWithConversionData, comps: ComponentWithConversionData[], allEvents: {x: Event[]; y: Event[]}, settings: ConversionSettings): ComponentWithConversionData[] {
    if (_.size(comps) < 2) {
        return comps || [];
    }
    const fragments = <{x: Fragment[]; y: Fragment[]; }> _.mapValues(allEvents, createFragments);
    if (_.size(fragments.x) === 1 && _.size(fragments.y) === 1) {
        if (!settings.detectSemanticGroups) {
            return sortComponentsByNaturalOrder(parent, comps);
        } else if (settings.useOverlapRules) {
            return getSortedOverlappingComponents(parent, comps);
        } else {
            return getSortedOverlappingComponentsOld(parent, comps, settings);
        }
    }
    const strategies = {
        mirrorPattern: settings.detectSemanticGroups,
        chessPattern: settings.detectSemanticGroups,
        verticalDivider: true,
        singleCompRow: true
    };
    const partition = findBestPartition(allEvents, fragments, strategies);
    return _.size(partition.fragments) === 1 ? partition.fragments[0].comps :
        _.flatMap(partition.fragments, (fragment, fragmentIndex) => getSortedComponents(parent, fragment.comps, partition.fragmentsEvents[fragmentIndex], settings));
}

function getSortedOverlappingComponentsOld(parent: ComponentWithConversionData | MasterPageComponentWithConversionData, comps: ComponentWithConversionData[], settings: ConversionSettings): ComponentWithConversionData[] {
    const haveTransformedLayout = (compsList) => _.some(compsList, 'conversionData.originalLayout');
    const isLayoutTransformed = haveTransformedLayout(comps) || _.some(comps, child => haveTransformedLayout(child));
    if (isLayoutTransformed) {
        restoreLayouts(comps);
        return comps;
    }
    transformLayouts(comps);
    const eventsY: Event[] = createEventsQueue(comps, 'y');
    const eventsX: Event[] = createEventsQueue(comps, 'x');
    const orderedComps = getSortedComponents(parent, comps, {y: eventsY, x: eventsX}, settings);
    restoreLayouts(orderedComps);
    return orderedComps;
}

function transformLayouts(comps: ComponentWithConversionData[]): void {
    _.forEach(comps, comp => {
        const originalLayout = comp.layout;
        const transformedLayout = <Layout> _.assign(objectUtils.cloneDeep(originalLayout), {
            height: originalLayout.height * COMPONENT_SIZE_SCALE_FACTOR,
            width: originalLayout.width * COMPONENT_SIZE_SCALE_FACTOR
        });
        comp.layout = transformedLayout;
        _.set(comp, ['conversionData', 'originalLayout'], originalLayout);
    });
}

function restoreLayouts(comps: ComponentWithConversionData[], recursive: boolean = true): void {
    _.forEach(comps, comp => {
        const originalLayout = _.get(comp, ['conversionData', 'originalLayout']);
        if (originalLayout) {
            comp.layout = <Layout> objectUtils.cloneDeep(originalLayout);
            delete (<any> comp).conversionData.originalLayout;
        }
    });
    if (recursive) {
        _.forEach(comps, comp => restoreLayouts(<ComponentWithConversionData[]> comp.components, false));
    }
}

export function setComponentsOrder(parent: ComponentWithConversionData | MasterPageComponentWithConversionData, comps: ComponentWithConversionData[], settings: ConversionSettings): void {
    const eventsY: Event[] = createEventsQueue(comps, 'y');
    const eventsX: Event[] = createEventsQueue(comps, 'x');
    const orderedComponents = getSortedComponents(parent, comps, {y: eventsY, x: eventsX}, settings);
    parent.conversionData.componentsOrder = <string[]> _.map(orderedComponents, 'id');
}

export const testAPI = {
    isEven,
    transformLayouts,
    restoreLayouts,
    extractCompsFromEvents,
    getPerpendicularAxis,
    compareEvents,
    refragment,
    splitAxisEventsByFragments,
    splitAllEventsByFragments,
    calculateMaxCompsDistance,
    sortComponentsByNaturalOrder
};
