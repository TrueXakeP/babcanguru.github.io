'use strict'
const _ = require('lodash')
const React = require('react')
const createReactClass = require('create-react-class')
const createReactElement = require('../../utils/createReactElement')
const PropTypes = require('prop-types')
const santaTypesDefinitions = require('../../definitions/santaTypesDefinitions')
const skinBasedComp = require('../../mixins/skinBasedComp')
const animationsMixin = require('../../mixins/animationsMixin')
const skinsJson = require('../../components/PageGroup/pageGroupSkins/skins.json.js')

/**
 * Convert legacy wix transition names to new modern animations
 * @type {{outIn: string, crossfade: string, shrinkfade: string, swipeHorizontal: string, swipeHorizontalFullScreen: string, swipeVertical: string, swipeVerticalFullScreen: string, none: string}}
 */
const legacyTransitionTypesMap = {
    outIn: 'OutIn',
    crossfade: 'CrossFade',
    shrinkfade: 'CrossFade',
    swipeHorizontal: 'SlideHorizontal',
    swipeHorizontalFullScreen: 'SlideHorizontal',
    swipeVertical: 'SlideVertical',
    swipeVerticalFullScreen: 'SlideVertical',
    none: 'NoTransition'
}

/**
 *
 * Return a params function with specific transition settings
 *
 * The function is using __DangerousSantaTypes measure map getters, this is ok because the function is used in animation and we have measure map
 * @param transitionName
 * @param getWindowSize
 * @param siteWidth
 * @param getRenderedMasterPageHeight
 * @returns {function}
 */
function getDynamicTransitionParams(transitionName, getWindowSize, siteWidth, getRenderedMasterPageHeight) {
    return function paramsFunc() {
        const windowSize = getWindowSize()
        switch (transitionName) {
            case 'SlideHorizontal':
                return {
                    siteWidth,
                    width: windowSize.width,
                    ease: 'Cubic.easeOut'
                }
            case 'SlideVertical':
                const height = Math.max(windowSize.height, getRenderedMasterPageHeight())
                return {
                    screenHeight: windowSize.height,
                    height,
                    reverse: true,
                    ease: 'Cubic.easeInOut'
                }
            case 'OutIn':
                return {
                    sourceEase: 'Strong.easeOut',
                    destEase: 'Strong.easeIn'
                }
            case 'CrossFade':
                return {
                    sourceEase: 'Sine.easeInOut',
                    destEase: 'Quad.easeInOut'
                }
            default:
                return {}
        }
    }
}

function changePage(pgGroup, previousPage, currentPage, stubifyPage) {
    if (!pgGroup.refs[previousPage]) {
        pgGroup.refs[currentPage].updateVisibility()
    } else if (pgGroup.props.currentUrlPageId !== previousPage) {
        stubifyPage(previousPage)
        pgGroup.refs[previousPage].forceUpdate(function() {
            pgGroup.refs[currentPage].updateVisibility()
            pgGroup.refs[previousPage].hide()
        })
    }
}

const skins = _.pick(skinsJson, ['wysiwyg.viewer.skins.PageGroupSkin'])

const getComponentSkins = () => skins

const pageGroupCompType = 'wysiwyg.viewer.components.PageGroup'

/**
 * @class components.PageGroup
 */

const PageGroup = createReactClass({
    displayName: 'PageGroup',
    mixins: [skinBasedComp(skins), animationsMixin],
    propTypes: {
        pageClass: PropTypes.any,
        createPageProps: santaTypesDefinitions.PageGroup.createPageProps.isRequired,
        getRenderedMasterPageHeight: santaTypesDefinitions.__DangerousSantaTypes.getRenderedMasterPageHeight.isRequired,
        getWindowSize: santaTypesDefinitions.__DangerousSantaTypes.getWindowSize.isRequired,
        actionsAspect: santaTypesDefinitions.SiteAspects.actionsAspect.isRequired,
        siteWidth: santaTypesDefinitions.siteWidth.isRequired,
        stubifyPage: santaTypesDefinitions.PageGroup.stubifyPage.isRequired,
        currentUrlPageId: santaTypesDefinitions.currentUrlPageId.isRequired,
        rootNavigationInfo: santaTypesDefinitions.Component.rootNavigationInfo.isRequired,
        compProp: santaTypesDefinitions.Component.compProp.isRequired,
        pagesToRender: santaTypesDefinitions.PageGroup.pagesToRender.isRequired,
        isMeshLayoutMechanism: santaTypesDefinitions.Layout.isMeshLayoutMechanism.isRequired,
        isExperimentOpen: santaTypesDefinitions.isExperimentOpen
    },
    statics: {
        useSantaTypes: true,
        getComponentSkins,
        compSpecificIsDomOnlyOverride: () => false,
        compType: pageGroupCompType
    },

    ignoreDimensions() {
        return this.props.isMeshLayoutMechanism
    },

    componentWillReceiveProps(nextProps) {
        const currentPage = this.props.currentUrlPageId
        const nextPageToRender = nextProps.currentUrlPageId
        const transitionName = legacyTransitionTypesMap[nextProps.rootNavigationInfo.transition || this.props.compProp.transition] || legacyTransitionTypesMap.none

        if (currentPage !== nextPageToRender) {
            this.refs[currentPage].clearAnimationsQueue(true)
            const duration = this.getAnimationProperties(transitionName).defaultDuration || 0
            const paramsFunc = getDynamicTransitionParams(transitionName, this.props.getWindowSize, this.props.siteWidth, this.props.getRenderedMasterPageHeight)
            const callbacks = {
                onComplete: () => {
                    changePage(this, currentPage, nextPageToRender, this.props.stubifyPage)
                    this.props.actionsAspect.handlePageTransitionComplete(currentPage, nextPageToRender)
                }
            }

            this.props.actionsAspect.registerNextPageTransition(this, currentPage, nextPageToRender, transitionName, duration, 0, paramsFunc, callbacks)
        }
    },

    createPage(pageId) {
        const isFirstPage = this.props.pagesToRender.length === 1
        const pageProps = this.props.createPageProps(this.props.pageClass, pageId, isFirstPage)
        return createReactElement(this.props.pageClass, pageProps)
    },

    getSkinProperties() {
        return {
            '': {
                'data-is-mesh': this.props.isMeshLayoutMechanism,
                children: _.map(this.props.pagesToRender, this.createPage),
                style: {
                    width: '100%'
                }
            }
        }
    }
})

const BoltPageGroup = props => React.createElement('div', {
    id: props.id,
    style: {
        width: '100%'
    }
}, props.children)
BoltPageGroup.compType = pageGroupCompType
BoltPageGroup.displayName = 'BoltPageGroup'


module.exports = {
    PageGroup,
    BoltPageGroup
}