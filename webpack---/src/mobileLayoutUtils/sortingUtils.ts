import * as _ from 'lodash';
import * as sweepSortAnalyzer from '../mobileCore/analyzer/sweepSortAnalyzer';
import * as conversionUtils from '../mobileCore/conversionUtils';

export function splitToFragments(siblings, axis: Axis): Fragment[] {
    const sweepLineEvents = sweepSortAnalyzer.createEventsQueue(siblings, axis);
    return sweepSortAnalyzer.createFragments(sweepLineEvents);
}

export function sortSiblings(components: Component[]): Component[] {
    if (_.size(components) <= 1) {
        return components;
    }
    const rowsComponents = _.map(splitToFragments(components, 'y'), 'comps');
    return <Component[]> _.reduce(rowsComponents, (sortedComponents, rowComponents: Component[]) => {
        if (_.size(rowComponents) === 1) {
            return sortedComponents.concat(rowComponents);
        }
        const columnsComponents = _.map(splitToFragments(rowComponents, 'x'), 'comps');
        const sortedColumnsComponents = <Component[]> _.flatMap(columnsComponents, (columnComponents: Component[]) => {
            return _.size(columnComponents) === 1 ? columnComponents : _.sortBy(columnComponents, _.findIndex.bind(null, components));
        });
        return sortedComponents.concat(sortedColumnsComponents);
    }, []);
}

export function getComponentsOrder(parent: PageComponent | MasterPageComponent): ObjMap<string[]> {
    const children = conversionUtils.getChildren(parent);
    if (!children) {
        return {};
    }
    const sortedChildren = sortSiblings(children);
    const parentOrderMap = _.set({}, parent.id, _.map(sortedChildren, 'id'));
    const childrenOrderMaps = _.map(children, getComponentsOrder);
    return <ObjMap<string[]>> _.assign.apply(_, [parentOrderMap].concat(childrenOrderMaps));
}
