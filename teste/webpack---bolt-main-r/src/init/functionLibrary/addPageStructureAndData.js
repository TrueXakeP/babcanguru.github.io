module.exports = (page, pageId, boltInstance) => {
    const fullStructure = boltInstance.full.structureWithoutRefs
    if (fullStructure[pageId]) {
        return true
    }

    const {
        structure,
        data,
        translations = {},
        meshData = {}
    } = page
    Object.keys(data).forEach(dataMapKey => {
        const dataMap = data[dataMapKey]

        Object.keys(dataMap).forEach(dataItemId => {
            if (!boltInstance.data[dataMapKey][dataItemId]) {
                boltInstance.updateDataItem(dataMapKey, dataItemId, dataMap[dataItemId])
            }
        })
    })

    Object.keys(translations).forEach(language => {
        const languageData = translations[language].data.document_data

        Object.keys(languageData).forEach(dataItemId => {
            boltInstance.updateTranslationDataItem(language, dataItemId, languageData[dataItemId])
        })
    })

    Object.keys(meshData).forEach(container => {
        boltInstance.updateMeshData(container, meshData[container])
    })

    //add new comps to structure:
    Object.keys(structure).forEach(compId => {
        if (!fullStructure[compId]) {
            const originalCompStructure = structure[compId]
            boltInstance.updateComponent(compId, originalCompStructure)
        }
    })

    return true
}