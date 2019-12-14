let warmupUtils // eslint-disable-line santa/no-module-state
let layout // eslint-disable-line santa/no-module-state
let _ // eslint-disable-line santa/no-module-state
let reactDOM // eslint-disable-line santa/no-module-state

function init({
    dependencies,
    siteData
}) {
    warmupUtils = dependencies.warmupUtils
    layout = dependencies.layout
    _ = dependencies.lodash
    reactDOM = reactDOM || dependencies.reactDOM

    return {
        imageLoader: siteData.imageLoader,
        isMobileDevice: siteData.isMobileDevice(),
        runLayout: runLayout(siteData),
        registerLayoutFunc: (domNode, func) => registerLayoutFunc(siteData, domNode, func)
    }
}

function createPagesDataForWarmup(layoutData) {
    if (layoutData.isMobileView) {
        return _.mapValues(layoutData.displayedPagesData, ({
                data,
                structure
            }) =>
            ({
                data,
                structure: {
                    DESKTOP: structure.DESKTOP,
                    MOBILE: structure.DESKTOP
                }
            }))
    }
    return layoutData.displayedPagesData
}

function createSiteData(layoutData, dependencies, isWarmup = false, prefersReducedMotion) {
    warmupUtils = dependencies.warmupUtils
    _ = dependencies.lodash
    const {
        SiteData
    } = warmupUtils
    const siteModel = _.assign({}, _.pick(layoutData, ['documentServicesModel', 'publicModel', 'rendererModel', 'serviceTopology', 'requestModel', 'wixBiSession', 'currentUrl', 'ssr', 'urlFormatModel', 'pagesDataItemsMap', 'renderFlags']))
    const pagesData = isWarmup ? createPagesDataForWarmup(layoutData) : layoutData.displayedPagesData
    const siteData = new SiteData(_.assign({}, siteModel, {
        pagesData
    }))
    delete siteData.resolvedDataMaps
    siteData.prefersReducedMotion = prefersReducedMotion
    siteData.anchorsMap = layoutData.anchorsMap
    siteData.setRootNavigationInfo(layoutData.primaryPageNavigationInfo, true)
    siteData.pagesData = pagesData
    siteData.pagesDataRaw = {
        pagesData: siteData.pagesData
    }
    siteData.isMobileView = () => layoutData.isMobileView
    siteData.getNonPageItemZoomData = () => _.get(layoutData.getNonPageItemZoomData, 'image')
    siteData.tpasRenderedInSsr = {}
    siteData.getRequestedLayoutMechanism = () => _.get(layoutData.currentUrl, ['query', 'layoutMechanism'])
    siteData.getSiteMemberDetails = () => layoutData.siteMemberDetails
    siteData.getDataByQuery = (query, rootId, dataType) => {
        rootId = rootId || 'masterPage'
        dataType = dataType || 'document_data'
        query = query.replace('#', '')
        if (pagesData[rootId].data[dataType][query]) {
            return pagesData[rootId].data[dataType][query]
        }
        for (rootId of siteData.getAllPossiblyRenderedRoots()) {
            if (pagesData[rootId] && pagesData[rootId].data[dataType][query]) {
                return pagesData[rootId].data[dataType][query]
            }
        }
        for (rootId of Object.keys(pagesData)) {
            if (pagesData[rootId] && pagesData[rootId].data[dataType][query]) {
                return pagesData[rootId].data[dataType][query]
            }
        }
        if (_.get(layoutData, ['pagesDataItemsMap', query])) { // need data item for page not currently rendered
            return layoutData.pagesDataItemsMap[query]
        }
        return null
    }
    siteData.getMasterPageDataByQuery = (query, dataType) => {
        query = query.replace('#', '')
        dataType = dataType || 'document_data'
        return pagesData.masterPage.data[dataType][query]
    }
    _.assign(siteData._browserFlags, layoutData.browserFlags) // Override browserFlags with the ones calculated in Bolt

    const {
        wixBiSession
    } = layoutData
    siteData.biData.getPageNumber = () => wixBiSession.pn
    return siteData
}

function createLayoutApi(siteData, allRenderedRootIds) {
    const {
        layoutAPI
    } = warmupUtils
    siteData.getAllPossiblyRenderedRoots = () => allRenderedRootIds

    return layoutAPI({
        getSiteData() {
            return siteData
        },
        getAllRenderedRootIds() {
            return allRenderedRootIds
        },
        isSiteBusyIncludingTransition() {
            return false
        }
    })
}

function getReactRef(component, childRefName) {
    const componentReactRef = _.get(component, ['refs', childRefName])
    return componentReactRef
}

function postWarmupGetDomNode(compRefs) {
    return function(a, b, c, d, e, f) {
        if (a && !b) {
            const node = window.document.getElementById(a)
            if (node) {
                return node
            }
        }
        let ref = _.get(compRefs, a)
        ref = ref && b ? getReactRef(ref, b) : ref
        ref = ref && c ? getReactRef(ref, c) : ref
        ref = ref && d ? getReactRef(ref, d) : ref
        ref = ref && e ? getReactRef(ref, e) : ref
        ref = ref && f ? getReactRef(ref, f) : ref
        return ref && reactDOM.findDOMNode(ref) //eslint-disable-line react/no-find-dom-node
    }
}

function warmupGetDomNode(...args) {
    const domId = args.join('')
    let node = window.document.getElementById(domId)
    if (!node) {
        const compId = args[0]
        const fix = subId => subId.replace(compId, '')
        node = window.document.getElementById(`${compId}${_(args).tail().map(fix).join('')}`)
        node = node || window.document.getElementById(_(args).uniq().join(''))
        node = node || window.document.getElementById(_.last(args))
    }
    return node
}

function getStructuresDesc(layoutAPI, isPageAllowed, isWarmup, compRefs) {
    const findDomNode = isWarmup ? warmupGetDomNode : postWarmupGetDomNode(compRefs)

    const structuresDesc = _.mapValues(layoutAPI.ssr.aspectsComponentStructures, comp => ({
        structure: comp,
        getDomNodeFunc: warmupGetDomNode
    }))

    const currentPopupId = layoutAPI.getCurrentPopupId()
    if (compRefs) {
        _.assign(structuresDesc, {
            inner: compRefs[layoutAPI.getPrimaryPageId()] && warmupUtils.structuresDescription.getInner(layoutAPI, findDomNode),
            outer: compRefs.masterPage && warmupUtils.structuresDescription.getOuter(layoutAPI, findDomNode),
            siteBackground: compRefs.SITE_BACKGROUND && warmupUtils.structuresDescription.getSiteBackground(findDomNode),
            wixAds: compRefs.WIX_ADS && warmupUtils.structuresDescription.getWixAds(layoutAPI),
            [currentPopupId]: compRefs[currentPopupId] && warmupUtils.structuresDescription.getRootDescriptor(layoutAPI, currentPopupId, findDomNode)
        })
    } else {
        if (currentPopupId) {
            structuresDesc[currentPopupId] = warmupUtils.structuresDescription.getRootDescriptor(layoutAPI, currentPopupId, findDomNode)
        }

        if (isPageAllowed) {
            _.assign(structuresDesc, {
                inner: warmupUtils.structuresDescription.getInner(layoutAPI, findDomNode),
                outer: warmupUtils.structuresDescription.getOuter(layoutAPI, findDomNode),
                siteBackground: warmupUtils.structuresDescription.getSiteBackground(findDomNode),
                wixAds: warmupUtils.structuresDescription.getWixAds(layoutAPI)
            })
        }
    }

    return _.pickBy(structuresDesc, _.identity)
}

function runLayout(siteData) {
    return function({
        currentNavigationInfo,
        allRenderedRootIds,
        isPageAllowed,
        compRefs,
        compsToLayout,
        lockedCompsForEnforceAnchors,
        isEnforcingAnchors = true
    } = {}, onReady = _.noop, isWarmup = false) {
        if (currentNavigationInfo) {
            siteData.setRootNavigationInfo(currentNavigationInfo, true)
        }

        const pageId = siteData.getRootNavigationInfo().pageId
        const renderedRootIds = isWarmup ? ['masterPage', pageId] : allRenderedRootIds
        const layoutAPI = createLayoutApi(siteData, renderedRootIds)
        const shouldRenderPage = _.get(layoutAPI, 'ssr.shouldRenderPage', true)
        // TODO make sure structureDesc has right structure
        const structuresDesc = shouldRenderPage ? getStructuresDesc(layoutAPI, isPageAllowed, isWarmup, compRefs) : {}

        if (isWarmup) {
            warmupUtils.mobileViewportFixer.fixViewportTag(layoutAPI)
            layout.reportPresetIframes(layoutAPI)
        }

        layout.updateBodyNodeStyle(layoutAPI)
        siteData.updateScreenSize()

        // TODO add anchorsMap to siteData
        const {
            reLayoutedCompsMap
        } = layout.reLayout(structuresDesc, !isEnforcingAnchors, lockedCompsForEnforceAnchors, compsToLayout, layoutAPI)

        if (shouldRenderPage && isWarmup && layoutAPI.getLayoutMechanism() === 'anchors') {
            _(renderedRootIds)
                .map(id => warmupGetDomNode(id))
                .compact()
                .forEach(({
                    style
                }) => {
                    style.visibility = ''
                })
        }

        onReady()

        return {
            measureMap: layoutAPI.measureMap,
            reLayoutedCompsMap
        }
    }
}

function registerLayoutFunc(siteData, domNode, func) {
    siteData.registerLayoutFunc(domNode, func)
}

module.exports = {
    init,
    createSiteData
}