import * as _ from 'lodash';
import * as conversionUtils from '../conversionUtils';

const EQUALITY_DEVIATION_THRESHOLD = 0.1;

export const getSign = (n: number): number => n === 0 ? 0 : n / Math.abs(n);
export const getComponentSize = (comp: ComponentWithConversionData, dim: Axis): number => dim === 'x' ? comp.layout.width : comp.layout.height;
export const getComponentEndCoordinate = (comp: ComponentWithConversionData, axis: Axis): number => comp.layout[axis] + getComponentSize(comp, axis);
export const compareComponentsByY = (c1: ComponentWithConversionData, c2: ComponentWithConversionData): number => getSign(c1.layout.y - c2.layout.y);

function haveSimilarCoordinates(comp1: ComponentWithConversionData, comp2: ComponentWithConversionData, dim: Axis, deviationThreshold: number = EQUALITY_DEVIATION_THRESHOLD): boolean {
    const v1 = <number> _.get(comp1, ['layout', dim]);
    const v2 = <number> _.get(comp2, ['layout', dim]);
    return Math.abs(v1 - v2) <= deviationThreshold * _.min([getComponentSize(comp1, dim), getComponentSize(comp2, dim)]);
}

function similarBy(comp1: ComponentWithConversionData, comp2: ComponentWithConversionData, valuePath: string[], deviationThreshold: number = EQUALITY_DEVIATION_THRESHOLD): boolean {
    const v1 = <number> _.get(comp1, valuePath);
    const v2 = <number> _.get(comp2, valuePath);
    return Math.abs(v1 - v2) <= deviationThreshold * _.min([v1, v2]);
}

export function areSimilarFragments(fragment1: ComponentWithConversionData[], fragment2: ComponentWithConversionData[], dimension: Axis): boolean {
    if (fragment1 === fragment2) {
        return true;
    }
    if (_.size(fragment1) !== _.size(fragment2) || shouldBreakFragment(fragment1, dimension) || shouldBreakFragment(fragment2, dimension)) {
        return false;
    }
    return _.every(fragment1, (comp1, compIndex) => {
        const comp2 = fragment2[compIndex];
        return comp1.componentType === comp2.componentType && haveSimilarCoordinates(comp1, comp2, dimension) &&
            (comp1.conversionData.category === 'text' ? similarBy(comp1, comp2, ['conversionData', 'averageNormalizedFontSize']) :
            similarBy(comp1, comp2, ['layout', 'height']) && similarBy(comp1, comp2, ['layout', 'width']));
    });
}

function shouldBreakFragment(fragment: ComponentWithConversionData[], dimension: Axis): boolean {
    const firstDistantCompIndex = _.findIndex(fragment, (comp, compIndex) => {
        if (compIndex === 0) {
            return false;
        }
        const previousCompEnd = getComponentEndCoordinate(fragment[compIndex - 1], dimension);
        const distance = comp.layout[dimension] - previousCompEnd;
        return distance < 0 || distance > _.min([getComponentSize(fragment[compIndex - 1], dimension), getComponentSize(comp, dimension)]);
    });
    return firstDistantCompIndex !== -1 && firstDistantCompIndex !== fragment.length - 1;
}

export function getOrderedComponents(parent: ComponentWithConversionData | MasterPageComponentWithConversionData): ComponentWithConversionData[] {
    const children = conversionUtils.getChildren(parent);
    return <ComponentWithConversionData[]> _.map(parent.conversionData.componentsOrder, id => _.find(children, {id}));
}

export const shouldUseNaturalOrder = (comp: ComponentWithConversionData | MasterPageComponentWithConversionData) =>
    conversionUtils.isRescaleVirtualGroup(comp) && comp.conversionData.rescaleMethod !== 'reorder' ||
    comp.conversionData.structuralContainer;

export function sortComponentsByNaturalOrder(parent: MasterPageComponentWithConversionData | ComponentWithConversionData, comps: ComponentWithConversionData[]): ComponentWithConversionData[] {
    const childrenIds = _.map(conversionUtils.getChildren(parent), 'id');
    return _.sortBy(comps, comp => childrenIds.indexOf(comp.id));
}

export function hasMobileHintsPresets(comp: ComponentWithConversionData | MasterPageComponentWithConversionData): boolean {
    const mobileHints = _.pick(comp.conversionData.mobileHints, ['recommendedWidth', 'recommendedHeight', 'recommendedScale', 'recommendedOrder']);
    return !_.isEmpty(mobileHints);
}
