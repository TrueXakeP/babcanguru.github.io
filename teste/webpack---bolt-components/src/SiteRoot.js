const React = require('react')
const PropTypes = require('prop-types')
const {
    utils: {
        createReactElement,
        createSantaTypesDefinitions
    }
} = require('santa-components')

const santaTypes = createSantaTypesDefinitions({
    siteRootStyle: PropTypes.object,
    siteRootAriaHidden: PropTypes.bool
}, 'SiteRoot')


/**
 * @class components.SiteRoot
 */
class SiteRoot extends React.Component {
    render() {
        const id = 'SITE_ROOT'
        return createReactElement('div', {
            id,
            key: id,
            className: id,
            style: this.props.siteRootStyle,
            'aria-hidden': this.props.siteRootAriaHidden
        }, this.props.children)
    }
}

SiteRoot.displayName = 'SiteRoot'
SiteRoot.santaTypesDefinitions = santaTypes
SiteRoot.compType = 'SITE_ROOT'
SiteRoot.propTypes = {
    children: PropTypes.node,
    siteRootStyle: santaTypes.siteRootStyle,
    siteRootAriaHidden: santaTypes.siteRootAriaHidden
}

module.exports = SiteRoot