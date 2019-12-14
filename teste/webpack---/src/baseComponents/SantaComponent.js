'use strict'

const React = require('react')
const _ = require('lodash')
const PropTypes = require('prop-types')
const {
    getEvent
} = require('../mixins/getEvent')
const getFullWidthStyle = require('../utils/getFullWidthStyle')
const santaTypesDefinitions = require('../definitions/santaTypesDefinitions')
const {
    BASE_COMP_ACTIONS
} = require('../utils/baseCompActions')

const collapsedStyle = {
    visibility: 'hidden',
    overflow: 'hidden',
    width: 0,
    minWidth: 0,
    height: 0,
    minHeight: 0
}

const meshLayoutStyle = {
    marginBottom: 0
}

const defaultLayoutStyle = {
    top: 0,
    left: 0,
    position: 'absolute'
}

const getWrappedEventHandlers = (compInstance, {
    id,
    handleAction,
    compActions,
    setCustomClickOccurred
}, {
    eventHandlers,
    isDisabled
}) => {
    const compActionHandlers = Object.keys(BASE_COMP_ACTIONS)
        .filter(action => {
            if (compActions && compActions[action]) {
                return true
            }
            if (eventHandlers && eventHandlers[BASE_COMP_ACTIONS[action]]) {
                return true
            }

            return false
        })
        .reduce((acc, action) => {
            const eventName = BASE_COMP_ACTIONS[action]
            acc[eventName] = e => {
                if (!isDisabled) {
                    if (compActions && compActions[action]) {
                        handleAction(compActions[action], getEvent.call(compInstance, e))
                    }

                    if (eventHandlers && eventHandlers[eventName]) {
                        eventHandlers[eventName](e)
                    }
                }
            }
            return acc
        }, {})

    if (compActionHandlers.onClick && setCustomClickOccurred) {
        compActionHandlers.onClickCapture = e => {
            if (_.includes(e.target.id, id)) {
                setCustomClickOccurred()
            }
        }
    }

    return compActionHandlers
}

function getCompInlineStyles({
    compProp,
    compActions,
    style,
    isHorizontallyDocked,
    isMeshLayoutMechanism,
    isMobileView,
    siteWidth,
    structure
}) {
    if (compProp) {
        const isScreenWidthByComp = !!isHorizontallyDocked
        const fullWidthCompStyle = isScreenWidthByComp && getFullWidthStyle(isMobileView, siteWidth, _.get(structure, ['layout', 'docked'])) // ASK BARAK
        const rootStyle = _.defaults({}, fullWidthCompStyle, style)

        if (compProp.isCollapsed) {
            const layoutStyle = isMeshLayoutMechanism ? meshLayoutStyle : defaultLayoutStyle
            return _.assign(rootStyle, collapsedStyle, layoutStyle)
        }

        if (compProp.isHidden) {
            rootStyle.visibility = 'hidden'
        }

        if (!compProp.isDisabled && compActions && compActions.click) {
            rootStyle.cursor = 'pointer'
        }

        return rootStyle
    }
}


function getRequiredProps(eventHandlers) {
    const {
        id,
        componentPreviewState,
        renderedLink,
        compProp,
        rotationInDegrees
    } = this.props
    const isDisabled = compProp ? compProp.isDisabled : null

    const rootProps = {
        id
    }

    if (isDisabled) {
        rootProps.disabled = isDisabled
    }

    // if (!props.isMobileView) {
    //   _.assign(attr, addHoverModeListeners())
    // }

    if (componentPreviewState) {
        rootProps['data-preview'] = componentPreviewState
    }

    if (rotationInDegrees) {
        rootProps['data-angle'] = rotationInDegrees
    }

    if (renderedLink) {
        _.assign(rootProps, renderedLink)
    }

    if (!this.props.isResponsive) {
        rootProps.style = getCompInlineStyles(this.props)
    }

    _.assign(rootProps, getWrappedEventHandlers(this, this.props, {
        isDisabled,
        eventHandlers
    }))

    return rootProps
}

/**
 * @class core.SantaComp
 * @extends {React.Component}
 * @property {function(props): santaProps} getSantaProps
 */

class SantaComponent extends React.Component {
    constructor(props) {
        super(props)
        this.getRequiredProps = getRequiredProps.bind(this)
    }

    updateData(newData) {
        this.props.setRuntimeCompData(this.props.id, newData)
    }

    updateProps(newProps) {
        this.props.setRuntimeCompProps(this.props.id, newProps)
    }
}

SantaComponent.propTypes = {
    isTouchDevice: santaTypesDefinitions.Device.isTouchDevice,
    isMobileView: santaTypesDefinitions.isMobileView,
    isMobileDevice: santaTypesDefinitions.Device.isMobileDevice,
    isDebugMode: santaTypesDefinitions.isDebugMode,
    isQAMode: santaTypesDefinitions.isQAMode,
    hideComponentsListForQa: santaTypesDefinitions.hideComponentsListForQa,
    structure: santaTypesDefinitions.Component.structure,
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
    renderFixedPosition: santaTypesDefinitions.Component.renderFixedPosition,
    //base
    id: santaTypesDefinitions.Component.id.isRequired,
    className: PropTypes.string,
    rotationInDegrees: santaTypesDefinitions.Component.rotationInDegrees,
    siteWidth: santaTypesDefinitions.siteWidth,
    isCollapsed: santaTypesDefinitions.Component.isCollapsed,
    compBehaviors: santaTypesDefinitions.Component.compBehaviors,
    isHorizontallyDocked: santaTypesDefinitions.Component.isHorizontallyDocked,
    shouldHideAnimatable: santaTypesDefinitions.Component.shouldHideAnimatable,
    isMeshLayoutMechanism: santaTypesDefinitions.Layout.isMeshLayoutMechanism,
    isResponsive: santaTypesDefinitions.RendererModel.isResponsive.isRequired,
    // runtimeCompDataPropTypes
    setRuntimeCompData: santaTypesDefinitions.DAL.setCompData,
    setRuntimeCompProps: santaTypesDefinitions.DAL.setCompProps
}

module.exports = SantaComponent