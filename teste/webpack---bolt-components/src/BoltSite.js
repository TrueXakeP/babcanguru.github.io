const _ = require('lodash')
const React = require('react')
const PropTypes = require('prop-types')
const {
    utils: {
        createSantaTypesDefinitions
    },
    santaTypesDefinitions
} = require('santa-components')

const CHILD_IDS_TO_KEEP = {
    aspectCompsContainer: true,
    POPUPS_ROOT: true,
    FONTS_CONTAINER: true
}

const santaTypes = createSantaTypesDefinitions({
    navigateTo: PropTypes.func,
    parseNavInfo: PropTypes.func,
    navigateToLanguage: PropTypes.func,
    shouldShowAllBoltSiteContainerChildren: PropTypes.bool,
    isWixSite: PropTypes.bool,
    getPrimaryRootNavigationInfo: PropTypes.func,
    getCustomClickOccurred: PropTypes.func,
    isExternalNavigationAllowed: PropTypes.bool,
    previewTooltipCallback: PropTypes.func
}, 'BoltSite')

const getClosestAncestorByTagName = (element, parentTagName) => {
    if (!element || !element.tagName) {
        return null
    }
    if (element.tagName.toLowerCase() === parentTagName) {
        return element
    }
    return getClosestAncestorByTagName(element.parentNode, parentTagName)
}

const getAnchorNode = event => getClosestAncestorByTagName(event.target, 'a')

const cancelEvent = event => {
    event.stopPropagation()
    event.preventDefault()
    return false
}

const parseLinkNode = linkNode => ({
    href: linkNode.getAttribute('href'),
    target: linkNode.getAttribute('target'),
    pageItemAdditionalData: linkNode.getAttribute('data-page-item-context'),
    anchorData: linkNode.getAttribute('data-anchor'),
    noUrlChangeAttr: linkNode.getAttribute('data-no-physical-url'),
    isChangingUrl: !linkNode.getAttribute('data-no-physical-url'), //maybe skip this
    isKeepingRoots: !!linkNode.getAttribute('data-keep-roots')
})

const shouldCancelLink = (customClickOccured, parsedLink, navInfo, getPrimaryRootNavigationInfo) => {
    if (!customClickOccured) {
        return false
    }

    const rootNavigationInfo = getPrimaryRootNavigationInfo()
    const isExternalLinkToSameTab = !navInfo && parsedLink.target === '_self'
    const isInternalNavigationToDifferentPage = parsedLink.target !== '_blank' && navInfo && navInfo.pageId && navInfo.pageId !== rootNavigationInfo.pageId
    const isInternalNavigationToDifferentDynamicPage = parsedLink.target !== '_blank' && navInfo && navInfo.innerRoute && navInfo.innerRoute !== rootNavigationInfo.innerRoute

    return isExternalLinkToSameTab || isInternalNavigationToDifferentPage || isInternalNavigationToDifferentDynamicPage
}

const siteClickHandler = (navigateMethod, navigateToLanguage, currentLanguage, isExperimentOpen, parseNavInfo, resetCustomClickOccurred, getCustomClickOccurred, getPrimaryRootNavigationInfo, previewTooltipCallback, isExternalNavigationAllowed) => e => {
    const customClickOccured = getCustomClickOccurred()
    resetCustomClickOccurred()
    const linkNode = getAnchorNode(e)
    if (!linkNode) {
        return true
    }
    const parsedLink = parseLinkNode(linkNode)
    const url = parsedLink.noUrlChangeAttr || parsedLink.href
    const navInfo = parseNavInfo(url)
    const isExternalLinkOrTargetBlank = parsedLink.target === '_blank' || !navInfo
    const isExternalLinkWithTargetSelf = parsedLink.target === '_self' && !navInfo
    if (shouldCancelLink(customClickOccured, parsedLink, navInfo, getPrimaryRootNavigationInfo)) {
        return cancelEvent(e)
    }
    const isEmailLink = !!url && url.indexOf('mailto') === 0
    if (!isExternalNavigationAllowed && (isExternalLinkWithTargetSelf || isEmailLink)) {
        if (previewTooltipCallback) {
            const targetClientRect = e.target.getBoundingClientRect()
            previewTooltipCallback(targetClientRect, 'text_editor_inactive_link_on_preview')
        }
        return cancelEvent(e)
    }
    if (!linkNode || isExternalLinkOrTargetBlank) {
        return true //let the browser do it's thing
    }

    if (navInfo && navInfo.queryParams && navInfo.queryParams.lang && currentLanguage && navInfo.queryParams.lang !== currentLanguage.languageCode && isExperimentOpen && isExperimentOpen('sv_multilingualSubDomains')) {
        navigateToLanguage(navInfo.queryParams.lang)
    } else {
        navigateMethod(parsedLink)
    }
    return cancelEvent(e) //we got this
}

const getClassList = props => {
    const res = []
    const {
        isWixSite,
        isVisualFocusEnabled
    } = props
    if (isWixSite) {
        res.push('wixSiteProperties')
    } else {
        res.push('noop')
    }

    if (isVisualFocusEnabled) {
        res.push('visual-focus-on')
    }

    return res.join(' ')
}

const PartiallyVisibleBeatScript = ({
    isMeshLayoutMechanism,
    getPrimaryRootNavigationInfo,
    isExperimentOpen
}) => {
    if (!getPrimaryRootNavigationInfo) {
        return null
    }

    const earlyCloseWelcome = isExperimentOpen && isExperimentOpen('sv_earlyCloseWelcome') ? `
        if (window.requestCloseWelcomeScreen) {
            window.requestCloseWelcomeScreen();
        }
    ` : ''

    return <script
    id = 'partiallyVisibleBeat'
    dangerouslySetInnerHTML = {
        {
            __html: `
                if (window.wixBiSession) {
                    wixBiSession.isUsingMesh = ${isMeshLayoutMechanism ? 'true' : 'false'};
                    if (wixBiSession.sendBeat) {
                        wixBiSession.sendBeat(12, 'Partially visible', '&pid=${_.get(getPrimaryRootNavigationInfo(), ['primaryPage', 'pageId'], '')}');
                    }
                    ${earlyCloseWelcome}
                }
            `
        }
    }
    />
}

PartiallyVisibleBeatScript.propTypes = {
    isMeshLayoutMechanism: santaTypesDefinitions.Layout.isMeshLayoutMechanism,
    getPrimaryRootNavigationInfo: santaTypes.getPrimaryRootNavigationInfo.isRequired,
    isExperimentOpen: santaTypesDefinitions.isExperimentOpen.isRequired
}

const BoltChildren = props => {
    if (props.shouldShowAllBoltSiteContainerChildren) {
        return props.children || null
    }

    return React.Children.map(props.children, child => CHILD_IDS_TO_KEEP[_.get(child, 'props.id')] ? child : null)
}

/**
 * @class components.BoltSite
 */
class BoltSite extends React.Component {
    render() {
        const {
            props
        } = this
        const {
            navigateTo,
            navigateToLanguage,
            currentLanguage,
            isExperimentOpen,
            parseNavInfo,
            resetCustomClickOccurred,
            getCustomClickOccurred,
            isMeshLayoutMechanism,
            getPrimaryRootNavigationInfo,
            previewTooltipCallback,
            isExternalNavigationAllowed
        } = props
        return ( <
            div key = 'BoltSite'
            className = {
                getClassList(props)
            }
            style = {
                {
                    position: 'relative'
                }
            }
            onClick = {
                siteClickHandler(navigateTo, navigateToLanguage, currentLanguage, isExperimentOpen, parseNavInfo, resetCustomClickOccurred, getCustomClickOccurred, getPrimaryRootNavigationInfo, previewTooltipCallback, isExternalNavigationAllowed)
            } >
            <
            BoltChildren { ...props
            }
            /> <
            PartiallyVisibleBeatScript key = 'partiallyVisibleBeat'
            isMeshLayoutMechanism = {
                isMeshLayoutMechanism
            }
            getPrimaryRootNavigationInfo = {
                getPrimaryRootNavigationInfo
            }
            isExperimentOpen = {
                isExperimentOpen
            }
            /> <
            /div>
        )
    }
}

BoltSite.displayName = 'BoltSite'
BoltSite.santaTypeDefinitions = santaTypes
BoltSite.compType = 'BOLT_SITE'
BoltSite.propTypes = {
    children: PropTypes.node,
    navigateTo: santaTypes.navigateTo.isRequired,
    navigateToLanguage: santaTypes.navigateToLanguage.isRequired,
    currentLanguage: santaTypesDefinitions.RendererModel.multilingual.currentLanguage,
    parseNavInfo: santaTypes.parseNavInfo.isRequired,
    isVisualFocusEnabled: santaTypesDefinitions.isVisualFocusEnabled.isRequired,
    isWixSite: santaTypes.isWixSite.isRequired,
    shouldShowAllBoltSiteContainerChildren: santaTypes.shouldShowAllBoltSiteContainerChildren,
    isMeshLayoutMechanism: santaTypesDefinitions.Layout.isMeshLayoutMechanism,
    resetCustomClickOccurred: santaTypesDefinitions.resetCustomClickOccurred,
    getPrimaryRootNavigationInfo: santaTypes.getPrimaryRootNavigationInfo.isRequired,
    getCustomClickOccurred: santaTypes.getCustomClickOccurred,
    isExperimentOpen: santaTypesDefinitions.isExperimentOpen,
    previewTooltipCallback: santaTypesDefinitions.RenderRealtimeConfig.previewTooltipCallback,
    isExternalNavigationAllowed: santaTypesDefinitions.RenderFlags.isExternalNavigationAllowed
}

BoltSite.defaultProps = {
    shouldShowAllBoltSiteContainerChildren: true
}

module.exports = BoltSite