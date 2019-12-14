'use strict'

const _ = require('lodash')
const PropTypes = require('prop-types')
const utils = require('santa-core-utils')
const collectFontsFromLoadedCompStyles = require('../utils/skins/collectFontsFromLoadedCompStyles')
const skinsRenderer = require('../utils/skins/skinRenderer')
const Touchy = require('../utils/Touchy')
const createReactElement = require('../utils/createReactElement')
const fixedPositionRenderPlugin = require('../utils/fixedPositionRenderPlugin')
const baseCompMixin = require('./baseCompMixin')
const santaTypesDefinitions = require('../definitions/santaTypesDefinitions')

skinsRenderer.registerRenderPlugin(fixedPositionRenderPlugin)

const EMPTY_SKIN = 'skins.core.VerySimpleSkin'

function getCompCssStates() {
    let state

    if (_.isFunction(this.getTransformedCssStates)) {
        const transformedCssStates = this.getTransformedCssStates()
        state = transformedCssStates !== undefined ? transformedCssStates : this.state
    } else {
        state = this.state
    }

    if (_.isFunction(this.getTransformedCssStatesForHeader)) {
        state = this.getTransformedCssStatesForHeader(state)
    }

    if (!state) {
        return {}
    }
    const stateAttribute = {}
    let cssState = []

    _.forOwn(state, function(stateValue, stateGroup) {
        if (stateGroup.lastIndexOf('$', 0) === 0) {
            cssState.push(stateValue)
        }
    })

    //should be removed when no component uses this options
    if (_.isEmpty(cssState) && state.hasOwnProperty('cssState')) {
        cssState = _.values(state.cssState)
    }

    if (!_.isEmpty(cssState)) {
        stateAttribute['data-state'] = cssState.join(' ')
    }

    return stateAttribute
}

function handleInvalidSkin({
    logger,
    isQAMode
}, msg) {
    if (isQAMode) {
        throw new Error(msg)
    } else {
        const warn = _.get(logger, 'warn')
        if (_.isFunction(warn)) {
            warn(msg)
        }
    }
}

function getSkinFromJson(skinName, skinsJson, reportInvalidSkin) {
    if (_.isNil(skinName)) {
        return
    }

    let skin = skinsJson[skinName]

    if (!skin) {
        /**
         * svgshape skins are not loaded to the skinsJson
         */
        if (!_.startsWith(skinName, 'svgshape.')) {
            if (skinName === EMPTY_SKIN) {
                skin = {
                    react: []
                }
            } else {
                // Default skin is the first skin
                const defaultSkinName = _(skinsJson).keys().head()
                skin = skinsJson[defaultSkinName]

                reportInvalidSkin(`Fallback skin: ${skinName} to ${defaultSkinName}`)
            }
        }
    }

    return skin
}

function getSkinFromCompSkinsJson(comp, compSkinsJson) {
    const {
        logger,
        isQAMode,
        skin
    } = comp.props
    return getSkinFromJson(skin, compSkinsJson, _.partial(handleInvalidSkin, {
        logger,
        isQAMode
    }))
}

function getSkinFromSkinsMap(comp, skinsMap) {
    let skinName = comp.props.skin
    let skin = skinsMap.get(skinName, comp.props.isExperimentOpen)
    if (!skin && comp.getDefaultSkinName) {
        skinName = comp.getDefaultSkinName()
        skin = skinsMap.get(skinName, comp.props.isExperimentOpen)
    }
    return skin
}

function ensureCursorPointerForClickableSkinParts(refData) {
    //this is due to a bug in iOS that doesn't fire onClick
    // event for non-clickable elements like div/span
    // since we don't see the cursor, it's ok to put it on all elements
    _(refData).filter(function(skinPart) {
        return _.has(skinPart, 'onClick')
    }).forEach(function(skinPart) {
        skinPart.style = _.assign(skinPart.style || {}, {
            cursor: 'pointer'
        })
    })
}

function addHoverModeListeners(refData) {
    if (this.props.structure && this.props.structure.modes) {
        const hoverMode = _.find(this.props.structure.modes.definitions, {
            type: utils.siteConstants.COMP_MODES_TYPES.HOVER
        })
        if (hoverMode) {
            const compId = this.props.structure.id
            refData[''].onMouseEnter = () => this.props.activateModeById(compId, this.props.rootId, hoverMode.modeId)
            refData[''].onMouseLeave = () => this.props.deactivateModeById(compId, this.props.rootId, hoverMode.modeId)
        }
    }
}

function getDataPreviewStates() {
    const state = this.getComponentPreviewState()
    if (state) {
        return {
            'data-preview': state
        }
    }
}


function getRefData(skin) {
    let refData = this.getSkinProperties()

    if (_.isFunction(this.transformRefData)) {
        this.transformRefData(refData)
    }

    if (this.props.transformSkinProperties) {
        refData = this.props.transformSkinProperties(refData)
    }

    if (!refData['']) {
        refData[''] = {}
    }

    if (this.props.isMobileDevice) {
        ensureCursorPointerForClickableSkinParts(refData)
    }

    if (!this.props.isMobileView) {
        addHoverModeListeners.call(this, refData)
    }

    this.updateRootRefDataStyles(refData[''])

    _.assign(refData[''], getCompCssStates.call(this), getDataPreviewStates.call(this))
    const {
        inlineContent
    } = refData
    if (!skin.react || skin.react.length === 0) {
        refData[''] = _.defaults(refData[''], _.has(inlineContent, 'children') ? {
            addChildren: refData.inlineContent.children
        } : inlineContent)
    }

    return refData
}

function getCompCss(compSkinsJson, styleId, props, styleClass = styleId) {
    const {
        getStyleData,
        themeData,
        siteZoomRatio,
        invertedZoomRatio,
        orientationZoomFix,
        mobileZoom,
        scriptsLocationMap,
        logger,
        isQAMode
    } = props

    const mobileData = {
        siteZoomRatio,
        invertedZoomRatio,
        orientationZoomFix,
        mobileZoom
    }
    const serviceTopology = {
        scriptsLocationMap
    }
    const getSkin = compSkinsJson.get ? skinId => compSkinsJson.get(skinId) : skinId => getSkinFromJson(skinId, compSkinsJson, _.partial(handleInvalidSkin, {
        logger,
        isQAMode
    }))
    const styleData = getStyleData(styleId)

    const css = skinsRenderer.createSkinCss(
        getSkin(styleData.skin),
        _.get(styleData, 'style.properties', {}), themeData, styleClass, mobileData, serviceTopology, getSkin
    )

    return css && {
        [styleId]: css
    }
}

const cssTypes = {
    getStyleData: santaTypesDefinitions.Component.getStyleData,
    themeData: santaTypesDefinitions.Theme.THEME_DATA,
    siteZoomRatio: santaTypesDefinitions.Mobile.siteZoomRatio,
    invertedZoomRatio: santaTypesDefinitions.Mobile.invertedZoomRatio,
    orientationZoomFix: santaTypesDefinitions.Mobile.orientationZoomFix,
    mobileZoom: santaTypesDefinitions.Mobile.mobileZoom,
    scriptsLocationMap: santaTypesDefinitions.ServiceTopology.scriptsLocationMap,
    logger: santaTypesDefinitions.Utils.logger,
    isQAMode: santaTypesDefinitions.isQAMode
}

const getCompFonts = (compSkinsJson, styleIds, {
    getStyleData,
    generalTheme,
    logger,
    isQAMode
}) => {
    const styleItems = getStyleData ? _.reduce(styleIds, (result, styleId) => _.assign(result, {
        [styleId]: getStyleData(styleId)
    }), {}) : styleIds
    const getSkin = compSkinsJson.get ?
        skinId => compSkinsJson.get(skinId) :
        skinId => getSkinFromJson(skinId, compSkinsJson, _.partial(handleInvalidSkin, {
            logger,
            isQAMode
        }))

    return collectFontsFromLoadedCompStyles(styleItems, generalTheme, getSkin)
}

const fontsTypes = {
    getStyleData: santaTypesDefinitions.Component.getStyleData,
    generalTheme: santaTypesDefinitions.Theme.THEME_DATA,
    logger: santaTypesDefinitions.Utils.logger,
    isQAMode: santaTypesDefinitions.isQAMode
}

/**
 * @class core.skinBasedComp
 * @extends {core.baseCompMixin}
 * @extends {ReactCompositeComponent}
 * @property {comp.properties} props
 * @property {function(): string} getDefaultSkinName
 * @property {function(): object} getSkinProperties
 */
function skinBasedComp(compSkinsJson) {
    const getSkin = compSkinsJson.get ? getSkinFromSkinsMap : getSkinFromCompSkinsJson
    return {
        mixins: [baseCompMixin.baseComp],

        statics: {
            getCompCss: _.set(_.partial(getCompCss, compSkinsJson), 'cssTypes', cssTypes),
            getCompFonts: _.set(_.partial(getCompFonts, compSkinsJson), 'fontsTypes', fontsTypes)
        },

        propTypes: {
            isTouchDevice: santaTypesDefinitions.Device.isTouchDevice,
            isMobileView: santaTypesDefinitions.isMobileView,
            isMobileDevice: santaTypesDefinitions.Device.isMobileDevice,
            isDebugMode: santaTypesDefinitions.isDebugMode,
            isQAMode: santaTypesDefinitions.isQAMode,
            hideComponentsListForQa: santaTypesDefinitions.hideComponentsListForQa,
            structure: santaTypesDefinitions.Component.structure,
            id: santaTypesDefinitions.Component.id,
            rootId: santaTypesDefinitions.Component.rootId,
            currentUrlPageId: santaTypesDefinitions.Component.currentUrlPageId,
            styleId: santaTypesDefinitions.Component.styleId,
            skin: santaTypesDefinitions.Component.skin,
            logger: santaTypesDefinitions.Utils.logger,
            style: santaTypesDefinitions.Component.style,
            compProp: santaTypesDefinitions.Component.compProp,
            compData: santaTypesDefinitions.Component.compData,
            compActions: santaTypesDefinitions.Component.compActions,
            componentPreviewState: santaTypesDefinitions.RenderFlags.componentPreviewState,
            activateModeById: santaTypesDefinitions.Modes.activateModeById,
            deactivateModeById: santaTypesDefinitions.Modes.deactivateModeById,
            switchModesByIds: santaTypesDefinitions.Modes.switchModesByIds,
            transformSkinProperties: PropTypes.func,
            isExperimentOpen: santaTypesDefinitions.isExperimentOpen,
            setCustomClickOccurred: santaTypesDefinitions.setCustomClickOccurred,
            // For render plugins
            renderFixedPosition: santaTypesDefinitions.Component.renderFixedPosition
        },

        renderHelper() {
            const skin = getSkin(this, compSkinsJson)

            if (!skin) {
                const componentName = this.constructor.displayName || ''
                throw Error(`Skin [${this.props.skin}] not found for comp [${componentName}]`)
            }

            const refData = getRefData.call(this, skin)

            const touchy = new Touchy()

            _.forEach(refData, function(ref) {
                if (this.props.isTouchDevice) {
                    touchy.registerTouchEvents(ref)
                }

                // Prevent custom events from reaching the DOM
                touchy.removeCustomTouchEvents(ref)
            }.bind(this))

            return skinsRenderer.renderSkinHTML.call(this, skin.react, refData, this.props.styleId, this.props.id, this.props.structure, this.props, this.state, this.props.isQAMode, this.props.hideComponentsListForQa)
        },

        getRootRef() {
            return this.refs['']
        },

        getComponentPreviewState() {
            return this.props.componentPreviewState
        },

        render() {
            try {
                return this.renderHelper()
            } catch (e) {
                if (this.props.isDebugMode) {
                    throw e
                }
                this.props.logger.error(`Cannot render component: ${this.constructor.displayName}`, e.stack, this.props.id)
                const deadCompProps = {
                    id: this.props.id,
                    style: _.defaults({
                        background: 'transparent'
                    }, this.props.style),
                    'data-dead-comp': true
                }

                return createReactElement('div', deadCompProps)
            }
        },

        getSkinExports() {
            const skin = getSkin(this, compSkinsJson)
            return skin && skin.exports
        },

        classSet(classesMap) {
            return utils.classNames(_.reduce(classesMap, function(result, value, className) {
                result[`${this.styleId}_${className}`] = value
                return result
            }.bind(this.props), {}))
        },

        componentWillUpdate() {
            if (this.props.onComponentWillUpdate) {
                this.props.onComponentWillUpdate()
            }
        }
    }
}

module.exports = skinBasedComp