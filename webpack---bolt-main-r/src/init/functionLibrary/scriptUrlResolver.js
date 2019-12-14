const _ = require('lodash')

const URL_TEMPLATE_MATCHER = /{urlTemplate:(.*)}/

const dataGetters = {
    serviceTopology: (dataPath, {
        serviceTopology
    }) => _.get(serviceTopology, dataPath),
    universalEditorApp: (dataPath, {
        serviceTopology
    }) => {
        const baseUrl = serviceTopology.scriptsLocationMap['universal-editor-app']

        return `${baseUrl}/editorApp.bundle.min.js`
    },
    clientSpec: (dataPath, {
        clientSpec
    }) => _.get(clientSpec, dataPath),
    appStudioBundler: (dataPath, {
        clientSpec,
        serviceTopology,
        query
    }) => {
        const {
            wixCodeInstanceId,
            wixCodeGridId
        } = clientSpec.appFields.platform.studio

        const bundlerUrlOverrideQueryParam = _.get(query, 'app-studio-bundler-override')
        const baseUrl = bundlerUrlOverrideQueryParam || `https://${wixCodeInstanceId}.static.pub.${serviceTopology.wixCloudBaseDomain}/static/v2`

        return `${baseUrl}/${wixCodeGridId}/${wixCodeInstanceId}/appstudio.viewer.js?module-name=bundle`
    }
}

const resolveByDataGetter = (url, dataSources, dataGetter, dataGetterKey) => {
    const matcher = new RegExp(`{${dataGetterKey}:(.*?)}`, 'g')

    return url.replace(matcher, (match, dataPath) => {
        const resolvedData = dataGetter(dataPath, dataSources)
        if (!resolvedData) {
            throw new Error(`Data getter '${dataGetterKey}' returned no value for data '${dataPath}'`)
        }

        return resolvedData
    })
}

//Example: {urlTemplate:http://{serviceTopology:someService}/bundler/{clientSpec:appFields.appStudio.version}.js}
const resolveUrl = (url, query, clientSpec, serviceTopology) => {
    const [, template] = URL_TEMPLATE_MATCHER.exec(url) || []

    if (template) {
        return _.reduce(dataGetters, (currUrl, dataGetter, dataGetterKey) =>
            resolveByDataGetter(currUrl, {
                query,
                clientSpec,
                serviceTopology
            }, dataGetter, dataGetterKey), template)
    }

    return url
}

module.exports = {
    resolveUrl
}