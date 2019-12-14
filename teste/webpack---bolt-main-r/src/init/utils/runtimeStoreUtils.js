function getEmptyMaps() {
    return {
        behaviors_data: {},
        connections_data: {},
        document_data: {},
        design_data: {},
        mobile_hints: {},
        component_properties: {},
        theme_data: {}
    }
}

module.exports = {
    getRuntimeStoreDefaultValue: () => ({
        data: getEmptyMaps(),
        behaviors: [],
        state: {}
    }),
    getRuntimeEventsStoreDefaultValue: () => ({
        data: {}
    })
}