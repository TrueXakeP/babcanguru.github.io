'use strict'
const _ = require('lodash')
const santaTypesDefinitions = require('../../definitions/santaTypesDefinitions')
const skins = require('./screenWidthSkins/skins.json')

function createInitialState(isMobile) {
    const state = {}
    if (isMobile) {
        state.$mobile = 'mobileView'
    }
    return state
}

module.exports = {
    propTypes: {
        windowScrollEventAspect: santaTypesDefinitions.SiteAspects.windowScrollEvent.isRequired,
        compActions: santaTypesDefinitions.Component.compActions.isRequired,
        isMobileView: santaTypesDefinitions.isMobileView
    },

    getMixinSkins() {
        return skins
    },

    getInitialState() {
        if (this.props.compActions.scroll) {
            this.props.windowScrollEventAspect.registerToScroll(this)
        }

        return createInitialState(this.props.isMobileView)
    },

    componentWillReceiveProps(nextProps) {
        if (this.props.compActions.scroll && _.isUndefined(nextProps.compActions.scroll)) {
            this.props.windowScrollEventAspect.unregisterToScroll(this)
        }
        if (nextProps.compActions.scroll && _.isUndefined(this.props.compActions.scroll)) {
            nextProps.windowScrollEventAspect.registerToScroll(this)
        }
    },

    onScroll(position, direction) {
        const evtData = {
            left: position.x,
            top: position.y,
            direction
        }

        // compActionMixin.handleAction
        this.handleAction('scroll', evtData)
    }
}