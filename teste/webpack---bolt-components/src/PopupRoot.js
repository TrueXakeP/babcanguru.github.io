const React = require('react')
const PropTypes = require('prop-types')
const _ = require('lodash')
const {
    utils: {
        createReactElement
    },
    santaTypesDefinitions
} = require('santa-components')

/**
 * @class components.PopupRoot
 */
class PopupRoot extends React.Component {
    constructor(props) {
        super(props)
        this.state = {}
    }

    getPopupsWrapperStyles(isMesh, isMobileView, siteWidth, screenHeight) {
        return _.assign({
            margin: '0 auto',
            width: isMobileView ? siteWidth : 'auto'
        }, !isMesh && {
            minWidth: siteWidth,
            minHeight: screenHeight
        })
    }

    getPopupsRootClassName() {
        return `POPUPS_ROOT${this.props.isMobileView ? ' mobile' : ''}${this.props.isResponsive ? ' responsive' : ''}`
    }

    render() {
        const wrapper = createReactElement('div', {
            id: 'POPUPS_WRAPPER',
            className: 'POPUPS_WRAPPER',
            key: 'POPUPS_WRAPPER',
            style: this.props.isResponsive ? {} : this.getPopupsWrapperStyles(this.props.isMesh, this.props.isMobileView, this.props.siteWidth, this.props.getScreenHeight()),
            onScroll: this.props.onScrollHandler
        }, this.props.children)

        return createReactElement('div', {
            id: this.props.id,
            className: this.getPopupsRootClassName(),
            key: this.props.id,
            style: {
                overflow: null
            }
        }, [wrapper])
    }
}

PopupRoot.displayName = 'WixPopupRoot'
PopupRoot.compType = 'PopupRoot'
PopupRoot.propTypes = {
    id: PropTypes.string.isRequired,
    children: PropTypes.node,
    onScrollHandler: PropTypes.func,
    currentPopupId: santaTypesDefinitions.currentPopupId.isRequired,
    isMobileView: santaTypesDefinitions.isMobileView.isRequired,
    isMesh: santaTypesDefinitions.Layout.isMeshLayoutMechanism.isRequired,
    siteWidth: santaTypesDefinitions.siteWidth.isRequired,
    getScreenHeight: santaTypesDefinitions.getScreenHeight.isRequired,
    isResponsive: santaTypesDefinitions.RendererModel.isResponsive
}

module.exports = PopupRoot