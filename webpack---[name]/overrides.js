const createOverrideMap = requireFn => requireFn.keys().map(requireFn).reduce((overridesMap, compOverrideMetadata) => {
    overridesMap[compOverrideMetadata.overrideViewerType] = compOverrideMetadata;
    return overridesMap;
}, {});
const componentOverrides = createOverrideMap(require.context('./components/', true, /componentOverride\.js$/));

function getOverrides() {
    return componentOverrides;
}

module.exports = {
    getOverrides,
};