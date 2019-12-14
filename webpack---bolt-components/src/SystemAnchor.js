const React = require('react')
const PropTypes = require('prop-types')
const {
    utils: {
        createReactElement
    },
    santaTypesDefinitions
} = require('santa-components')

const ROLE = 'region'
const TRANSLATION_FEATURE = 'AriaLabels'

/**
 * @class components.SystemAnchor
 */

class SystemAnchor extends React.Component {
    render() {
        const {
            id,
            getTranslatedAriaLabel,
            ariaLabelKey,
            ariaLabelDefault
        } = this.props
        return createReactElement('div', {
            id,
            key: id,
            tabIndex: -1,
            'aria-label': getTranslatedAriaLabel(TRANSLATION_FEATURE, ariaLabelKey, ariaLabelDefault),
            role: ROLE,
            style: {
                height: 0
            }
        })
    }
}

SystemAnchor.displayName = 'SystemAnchor'
SystemAnchor.compType = 'SYSTEM_ANCHOR'
SystemAnchor.propTypes = {
    id: PropTypes.string,
    ariaLabelKey: PropTypes.string,
    ariaLabelDefault: PropTypes.string,
    getTranslatedAriaLabel: santaTypesDefinitions.Accessibility.getTranslatedAriaLabel.isRequired
}

module.exports = SystemAnchor