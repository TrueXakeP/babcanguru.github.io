function resolveCurrentLanguage(langFromUrl, multilingualInfo) {
    if (!multilingualInfo) {
        return ''
    }
    const doesExistInTranslationLangs = multilingualInfo.translationLanguages
        .map(x => x.languageCode)
        .filter(x => x === langFromUrl)
        .length

    if (langFromUrl && doesExistInTranslationLangs) {
        return langFromUrl
    }
    return multilingualInfo.originalLanguage.languageCode || ''
}

function getLanguageCode(langFromUrl, sitePropertiesInfo) {
    const multilingualInfo = sitePropertiesInfo && sitePropertiesInfo.multilingualInfo
    return resolveCurrentLanguage(langFromUrl, multilingualInfo)
}

module.exports = {
    getLanguageCode
}