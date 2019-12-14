'use strict'

const _ = require('lodash')
const ReactDOM = require('react-dom')
const PropTypes = require('prop-types')
const coreUtilsLib = require('santa-core-utils')
const animatableMixin = require('./animatableMixin')
const compActionMixin = require('./compActionMixin')
const santaTypesDefinitions = require('../definitions/santaTypesDefinitions')
const getFullWidthStyle = require('../utils/getFullWidthStyle')
const {
    BASE_COMP_ACTIONS
} = require('../utils/baseCompActions')

const ALWAYS_RENDERED_COMPONENTS = [
    'wysiwyg.viewer.components.SiteBackground'
]

function getMergedEventHandlers(refData) {
    const refDataEventHandlers = _.pick(refData, _.values(BASE_COMP_ACTIONS))

    if (_.get(this.props.compProp, 'isDisabled')) {
        return refDataEventHandlers
    }

    const compActionHandlers = _(this.props.compActions)
        .pick(_.keys(BASE_COMP_ACTIONS))
        .mapKeys(function(compAction, compName) {
            return BASE_COMP_ACTIONS[compName]
        })
        .mapValues(function(action) {
            return this.handleAction.bind(this, action.name)
        }.bind(this))
        .value()
    if (compActionHandlers.onClick && this.props.setCustomClickOccurred) {
        compActionHandlers.onClickCapture = function(event) {
            if (_.includes(event.target.id, this.props.id)) {
                this.props.setCustomClickOccurred()
            }
        }.bind(this)
    }
    return _.assignWith(compActionHandlers, refDataEventHandlers, function(compActionHandler, refDataEventHandler) {
        const self = this
        return function() {
            if (compActionHandler) {
                compActionHandler.apply(self, arguments)
            }
            if (refDataEventHandler) {
                refDataEventHandler.apply(self, arguments)
            }
        }
    }.bind(this))
}

function getCompInlineStyles(refData) {
    const isScreenWidthByComp = !!(_.invoke(this, 'isScreenWidth') || this.props.isHorizontallyDocked)

    const ignoreDimensions = _.isFunction(this.ignoreDimensions) && this.ignoreDimensions()
    const styleOverrides = refData.style
    const fullWidthCompStyle = isScreenWidthByComp && getFullWidthStyle(this.props.isMobileView, this.props.siteWidth, _.get(this.props.structure, ['layout', 'docked']))
    const defaultStyle = _.omit(this.props.style, ignoreDimensions && ['width', 'height'])

    const style = _.defaults({},
        styleOverrides,
        fullWidthCompStyle,
        defaultStyle)

    if (refData['data-hidden']) {
        style.visibility = 'hidden'
    }

    if (refData['data-collapsed']) {
        _.assign(style, {
            visibility: 'hidden',
            overflow: 'hidden',
            width: 0,
            minWidth: 0,
            height: 0,
            minHeight: 0
        }, this.props.isMeshLayoutMechanism ? {
            marginBottom: 0
        } : {
            top: 0,
            left: 0,
            position: 'absolute'
        })
    }

    if (!_.get(this.props.compProp, 'isDisabled') && _.has(this.props.compActions, 'click')) {
        style.cursor = 'pointer'
    }

    return style
}

function getCompClasses(refDataClassName) {
    return _.compact([refDataClassName, this.props.layoutComponentClassName, this.props.className]).join(' ')
}

/**
 * @class core.baseCompMixin
 * @extends {core.animatableMixin}
 * @property {comp.properties} props
 */
const baseComp = { // eslint-disable-line santa/no-module-state
    mixins: [animatableMixin, coreUtilsLib.renderDoneMixin, compActionMixin],

    propTypes: {
        id: santaTypesDefinitions.Component.id.isRequired,
        className: PropTypes.string,
        structure: santaTypesDefinitions.Component.structure,
        rotationInDegrees: santaTypesDefinitions.Component.rotationInDegrees,
        siteWidth: santaTypesDefinitions.siteWidth,
        style: santaTypesDefinitions.Component.style,
        registerLayoutFunc: santaTypesDefinitions.Layout.registerLayoutFunc,
        isCollapsed: santaTypesDefinitions.Component.isCollapsed,
        compActions: santaTypesDefinitions.Component.compActions,
        compBehaviors: santaTypesDefinitions.Component.compBehaviors,
        isHorizontallyDocked: santaTypesDefinitions.Component.isHorizontallyDocked,
        compProp: santaTypesDefinitions.Component.compProp,
        registerReLayoutPending: santaTypesDefinitions.Layout.registerReLayoutPending,
        reLayoutIfPending: santaTypesDefinitions.Layout.reLayoutIfPending,
        isExperimentOpen: santaTypesDefinitions.isExperimentOpen,
        isMobileView: santaTypesDefinitions.isMobileView,
        shouldHideAnimatable: santaTypesDefinitions.Component.shouldHideAnimatable,
        layoutComponentClassName: santaTypesDefinitions.Layout.layoutComponentClassName,
        isMeshLayoutMechanism: santaTypesDefinitions.Layout.isMeshLayoutMechanism,
        isResponsive: santaTypesDefinitions.RendererModel.isResponsive
    },

    registerReLayout() {
        if (this.props.registerReLayoutPending) {
            this.props.registerReLayoutPending(this.props.id)
        }
    },

    componentDidUpdate() {
        if (this.props.reLayoutIfPending) {
            this.callAfterRenderDone(this.props.reLayoutIfPending)
        }
    },

    componentDidMount() {
        if (_.isFunction(this.measureComponent)) {
            this.props.registerLayoutFunc(ReactDOM.findDOMNode(this), this.measureComponent)
        }
    },

    /**
     * Return false if this component is currently animating and should not be updated
     * @returns {boolean}
     */
    shouldComponentUpdate(nextProps, nextState) {
        //this probably should be more generic
        const animationAllowsUpdate = !this.shouldComponentUpdateAnimatable || this.shouldComponentUpdateAnimatable(nextProps, nextState)
        const isAlwaysRenderedComponent = nextProps.structure && _.includes(ALWAYS_RENDERED_COMPONENTS, nextProps.structure.componentType)
        const specificComponentAllowsUpdate = !_.isFunction(this.componentSpecificShouldUpdate) || this.componentSpecificShouldUpdate(nextProps, nextState)

        return animationAllowsUpdate && specificComponentAllowsUpdate || isAlwaysRenderedComponent
    },

    updateRootRefDataStyles(rootRefData) {
        if (!_.get(this.props, 'compProp.isHidden') && !this.props.isCollapsed) {
            const mergedEvents = getMergedEventHandlers.call(this, rootRefData)
            _.assign(rootRefData, mergedEvents)
        }

        if (_.get(this.props, 'compProp.isHidden') || this.props.shouldHideAnimatable) {
            rootRefData['data-hidden'] = true
        }

        if (this.props.isCollapsed) {
            rootRefData['data-collapsed'] = true
        }

        if (this.props.isResponsive) {
            if (rootRefData['data-hidden']) {
                rootRefData.style = {
                    visibility: 'hidden'
                }
            }

            if (rootRefData['data-collapsed']) {
                rootRefData.style = {
                    visibility: 'hidden',
                    overflow: 'hidden',
                    width: 0,
                    minWidth: 0,
                    height: 0,
                    minHeight: 0,
                    top: 0,
                    left: 0,
                    position: 'absolute'
                }
            }
        } else {
            rootRefData.style = getCompInlineStyles.call(this, rootRefData)

            const angle = this.props.rotationInDegrees
            if (angle) {
                rootRefData['data-angle'] = angle
            }
        }

        rootRefData.className = getCompClasses.call(this, rootRefData.className)
    }
}

module.exports = {
    baseComp,
    _testActionsMap: BASE_COMP_ACTIONS
}