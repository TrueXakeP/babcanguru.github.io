const React = require('react')
const PropTypes = require('prop-types')
const {
    utils: {
        createReactElement,
        createSantaTypesDefinitions
    }
} = require('santa-components')

const pageGroupCompType = 'wysiwyg.viewer.components.PageGroup'

const santaTypesDefinitions = createSantaTypesDefinitions({
    id: PropTypes.string,
    registerNextPageTransition: PropTypes.func,
    children: PropTypes.node
}, 'BoltPageGroup')
/**
 * @class components.BoltPageGroup
 */
class BoltPageGroup extends React.Component {
    componentWillReceiveProps(nextProps) {
        this.shouldPerformPageTransition = nextProps.isDuringPageTransition
    }

    componentDidLayout() {
        if (this.shouldPerformPageTransition) {
            this.props.registerNextPageTransition(true)
            this.shouldPerformPageTransition = false
        }
    }

    render() {
        return createReactElement('div', {
            id: this.props.id,
            style: {
                width: '100%'
            }
        }, this.props.children)
    }
}

BoltPageGroup.displayName = 'BoltPageGroup'
BoltPageGroup.compType = pageGroupCompType
BoltPageGroup.santaTypesDefinitions = santaTypesDefinitions
BoltPageGroup.propTypes = {
    id: santaTypesDefinitions.id,
    registerNextPageTransition: santaTypesDefinitions.registerNextPageTransition,
    isDuringPageTransition: PropTypes.bool,
    children: santaTypesDefinitions.children
}

module.exports = BoltPageGroup