import * as _ from 'lodash';
import {conversionConfig} from './conversionConfig';
import {objectUtils} from 'santa-core-utils';

export const isMergeVirtualGroup = (comp): boolean => _.get(comp, 'componentType') === conversionConfig.VIRTUAL_GROUP_TYPES.MERGE;
export const isRescaleVirtualGroup = (comp): boolean => _.get(comp, 'componentType') === conversionConfig.VIRTUAL_GROUP_TYPES.RESCALE;
export const isVirtualGroup = (comp): boolean => isRescaleVirtualGroup(comp) || isMergeVirtualGroup(comp);

export function isDesktopOnlyComponent(component: ComponentWithConversionData): boolean {
    return _.get(component, ['conversionData', 'desktopOnly'], false);
}

export function isTextComponent(component: ComponentWithConversionData): boolean {
    return _.get(component, ['conversionData', 'category']) === 'text';
}

export function isGraphicComponent(component: ComponentWithConversionData): boolean {
    return _.get(component, ['conversionData', 'category']) === 'graphic' || isImageComponent(component);
}

export function isGroupComponent(component: Component): boolean {
    return component && (component.componentType === 'wysiwyg.viewer.components.Group');
}

export function isColumnsContainerComponent(component: ComponentWithConversionData): boolean {
    return _.get(component, ['conversionData', 'category']) === 'columns';
}

export function isImageComponent(component: ComponentWithConversionData): boolean {
    return _.get(component, ['conversionData', 'category']) === 'photo';
}

export function isMasterPage(component: Component | MasterPageComponent): component is MasterPageComponent {
    return _.get(component, 'id') === 'masterPage';
}

export function isDockingAllowed(comp: Component | MasterPageComponent): boolean {
    return _.get(comp, ['conversionData', 'isDockingAllowed']);
}

export function isFixedPositionAllowed(comp: Component | MasterPageComponent): boolean {
    return _.get(comp, ['conversionData', 'isFixedPositionAllowed']);
}

export function shouldStretchToScreenWidth(component: ComponentWithConversionData): boolean {
    const shouldStretchHorizontally = comp =>
        _.get(comp.conversionData, 'isScreenWidth', false) ||
        _.get(comp.conversionData, 'stretchHorizontally', false) ||
        _.some(comp.components, shouldStretchHorizontally);

    return isSiteSegmentOrPage(component) || shouldStretchHorizontally(component);
}

export function extractComponentsFromStructureByType(root: Component | MasterPageComponent, compTypes: string[]) {
    const children = getChildren(root);
    const extractedChildrenByType = _.remove(children, child => _.includes(compTypes, child.componentType));
    return _.concat(extractedChildrenByType, _.flatMap(children, extractComponentsFromStructureByType));
}

export function isScreenWidthComponent(component: ComponentWithConversionData): boolean {
    return _.get(component.conversionData, 'isScreenWidth', false) || _.some(component.components, isScreenWidthComponent);
}

export function translateComps(comps: Component[], x: number = 0, y: number = 0): void {
    _.forEach(comps, comp => {
        comp.layout.x += x;
        comp.layout.y += y;
    });
}

export function reparentComponent(parent: Component | MasterPageComponent, newChild: Component, index?: number): void {
    addComponentsTo(parent, [newChild], index);
    translateComps([newChild], -parent.layout.x, -parent.layout.y);
}

export function addComponentsTo(container: Component | MasterPageComponent, components: Component[], index?: number): void {
    const children = getChildren(container);

    if (!components.length || !children) {
        return;
    }
    index = index !== undefined ? index : children.length;
    children.splice.apply(children, (<any[]> [index, 0]).concat(components));
}

export function removeChildrenFrom(container: Component | MasterPageComponent, componentsToRemove: Component[]): void {
    const children = getChildren(container);
    _.remove(children, child => _.includes(componentsToRemove, child));
}

export function removeGroup(group: Component, groupParent: Component) {
    if (!isGroupComponent(group)) {
        return;
    }

    const groupIndex = _.findIndex(groupParent.components, {id: group.id});

    _.forEach(group.components.reverse(), (curGroupedComponent) => {
        addComponentsTo(groupParent, [curGroupedComponent], groupIndex);
        translateComps([curGroupedComponent], group.layout.x, group.layout.y);
    });
    _.remove(groupParent.components, group);
}

export function containsComponent(container: ComponentWithConversionData, componentMatcher: (comp: ComponentWithConversionData) => boolean): boolean {
    return _.some(getChildren(container), (child: ComponentWithConversionData) => componentMatcher(child) || child && containsComponent(child, componentMatcher));
}

export function getHeightAccordingToChildren(container: ComponentWithConversionData, children?: ComponentWithConversionData[], enforceShrinkEvenWithNoChildren?: boolean): number|undefined {
    if (isMasterPage(container)) {
        return;
    }

    if (!children || (!enforceShrinkEvenWithNoChildren && _.isEmpty(children))) {
        return;
    }

    const lowestChildBottom = <number> _(children)
        .reject(['conversionData.isInvisible',  true])
        .reduce((lowest, child) => _.max([lowest, child.layout.y + child.layout.height, 0]), 0);

    if (_.get(container, ['conversionData', 'hasTightYMargin']) || _.get(container, ['conversionData', 'hasTightBottomMargin'])) {
        return lowestChildBottom;
    }

    const bottomMargin = shouldStretchToScreenWidth(container) ? conversionConfig.SECTION_MOBILE_MARGIN_Y : conversionConfig.COMPONENT_MOBILE_MARGIN_Y + _.get(container.conversionData, 'borderWidth', 0);
    return lowestChildBottom + bottomMargin;
}

export function ensureContainerTightlyWrapsChildren(container: Component, children?: Component[], enforceShrinkEvenWithNoChildren?: boolean, defaultMinHeight: number = 0): void {
    const heightByChildren = getHeightAccordingToChildren(<ComponentWithConversionData> container, <ComponentWithConversionData[]> children, enforceShrinkEvenWithNoChildren);
    if (_.isNumber(heightByChildren)) {
        const minHeight = _.get(container, ['conversionData', 'minHeight'], defaultMinHeight);
        container.layout.height = Math.max(minHeight, heightByChildren);
    }
}

export function isSiteSegmentOrPage(component: ComponentWithConversionData): boolean {
    return isPageComponent(component) || isSiteSegment(component);
}

export function isPageComponent(component: Component): boolean {
    return component.type === 'Page';
}

export function isContainerComponent(component: Component): boolean {
    return component.type === 'Container';
}

export function isSiteSegment(component: ComponentWithConversionData): boolean {
    return _.has(component.conversionData, 'siteSegmentRole');
}

export function isAllowedToBeInMasterPage(component: ComponentWithConversionData): boolean {
    return isSiteSegment(component) || _.has(component.conversionData, 'isAllowedToBeChildOfMasterPage');
}

export function extractMobilePage(desktopPage: PageComponent | MasterPageComponent): PageComponent | MasterPageComponent {
    const mobilePage = objectUtils.cloneDeep(desktopPage);
    const childrenPropertyName = _.has(mobilePage, 'components') ? 'components' : 'children';
    return <PageComponent | MasterPageComponent> _.set(mobilePage, childrenPropertyName, desktopPage.mobileComponents || []);
}

export function getComponentByIdFromStructure(componentId: string, component: Component | MasterPageComponent): Component | MasterPageComponent | null {
    if (component.id === componentId) {
        return <Component> component;
    }
    let res = null;
    _.find(getChildren(component), (comp) => {
        res = getComponentByIdFromStructure(componentId, comp);
        return res;
    });
    return res;
}

export function unifyGroups(groups: string[][], groupOverflowThreshold?: number): void {
    if (groups.length > groupOverflowThreshold) {
        groups.length = 0;
        return;
    }
    const haveCommonElements = (arr1, arr2) => _.size(_.intersection(arr1, arr2)) > 0;
    for (let i = groups.length - 1; i >= 0; i--) {
        const j = _.findLastIndex(groups, (group, index) => index < i && haveCommonElements(groups[i], group));
        if (j !== -1) {
            groups[j] = groups[j].concat(_.difference(groups[i], groups[j]));
            groups.splice(i, 1);
        }
    }
}

export function getComponentsByIds(container: Component | MasterPageComponent, compIds: string[]): Component[] {
    const children = getChildren(container);
    return _.map(compIds, id => _.find(children, {id}) || null);
}

export function getParent(componentId: string, root: Component | MasterPageComponent): Component | MasterPageComponent | null {
    const children = getChildren(root);
    if (_.find(children, {id: componentId})) {
        return root;
    }
    let parent = null;
    _.find(children, child => {
        parent = getParent(componentId, child);
        return parent;
    });
    return parent;
}

export function getSnugLayout(components: Component[]): Layout {
    if (!components || components.length === 0) {
        return undefined;
    }
    const mostLeft = <number> _.min(_.map(components, 'layout.x'));
    const mostTop = <number> _.min(_.map(components, 'layout.y'));
    const mostRight = _.max(_.map(components, c => c.layout.x + c.layout.width));
    const mostBottom = _.max(_.map(components, c => c.layout.y + c.layout.height));
    return {
        x: mostLeft,
        y: mostTop,
        width: mostRight - mostLeft,
        height: mostBottom - mostTop,
        rotationInDegrees: 0
    };
}

export function getTinyMenuDefaultPosition(): { x: number; y: number; rotationInDegrees: number; } {
    return {
        x: conversionConfig.MOBILE_WIDTH - (conversionConfig.TINY_MENU_SIZE + conversionConfig.SITE_SEGMENT_PADDING_X),
        y: conversionConfig.SECTION_MOBILE_MARGIN_Y,
        rotationInDegrees: 0
    };
}

export function getChildren(comp: Component | PageComponent | MasterPageComponent): Component[] {
    return (<Component> comp).components || (<MasterPageComponent> comp).children;
}

export function getRangesOverlap(range1: number[] = [], range2: number[] = []) {
    const getSortedRangesOverlap = (r1, r2) => Math.min(r1[1], r2[1]) - r2[0];
    return range1[0] <= range2[0] ? getSortedRangesOverlap(range1, range2) : getSortedRangesOverlap(range2, range1);
}

export function getYOverlap(comp1: Component, comp2: Component): number {
    const getYProjection = (comp) => [comp.layout.y, comp.layout.height + comp.layout.y];
    return getRangesOverlap(getYProjection(comp1), getYProjection(comp2));
}

export function getXOverlap(comp1: ComponentWithConversionData, comp2: ComponentWithConversionData): number {
    if (isScreenWidthComponent(comp1)) {
        return comp2.layout.width;
    }
    if (isScreenWidthComponent(comp2)) {
        return comp1.layout.width;
    }
    const getXProjection = (comp) => [comp.layout.x, comp.layout.width + comp.layout.x];
    return getRangesOverlap(getXProjection(comp1), getXProjection(comp2));
}

const getArea = (component: Component) => component.layout.width * component.layout.height;

export function hasGreaterArea(comp1, comp2) {
    if (isScreenWidthComponent(comp1)) {
        return comp1.layout.height >= comp2.layout.height || getArea(comp1) > getArea(comp2);
    }
    if (isScreenWidthComponent(comp2)) {
        return false;
    }
    return getArea(comp1) > getArea(comp2);
}

export function haveSufficientOverlap(comp1: ComponentWithConversionData, comp2: ComponentWithConversionData, overlapToMinAreaRationThreshold?): boolean {
    const xOverlap = getXOverlap(comp1, comp2);
    const yOverlap = getYOverlap(comp1, comp2);
    if (xOverlap <= 0 || yOverlap <= 0) {
        return false;
    }
    const overlapArea = xOverlap * yOverlap;
    const minCompArea = Math.min(getArea(comp1), getArea(comp2));
    return overlapArea > 0 && overlapArea / minCompArea >= overlapToMinAreaRationThreshold;
}

export function isEmptyContainer(component: ComponentWithConversionData): boolean {
    if (!isContainerComponent(component)) {
        return false;
    }
    if (component.conversionData.category === 'columns') {
        return _.size(component.components) === 1 && _.isEmpty(component.components[0].components);
    }
    return _.isEmpty(component.components);
}

export function shouldReparentCompToChildOfContainer(comp, container): boolean {
    return isColumnsContainerComponent(container) && _.get(comp, ['conversionData', 'isInvisible'], false);
}

export function getAllCompsInStructure(compStructure: Component | MasterPageComponent, isMobile: boolean = false, filterFunc?: (comp: Component | MasterPageComponent) => boolean): ObjMap<Component> {
    const queue = [[compStructure]];
    for (const innerQueue of queue) {
        _.forEach(innerQueue, child => {
            const children = isMobile ? _.get(child, 'mobileComponents') : getChildren(child);
            if (!_.isEmpty(children)) {
                queue.push(<Component[]> children);
            }
        });
    }

    return <ObjMap<Component>> _(queue).flatten().remove(filterFunc).keyBy('id').value();
}
