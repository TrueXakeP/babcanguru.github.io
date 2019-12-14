const React = require('react')
const PropTypes = require('prop-types')

const id = 'MAX_Z_INDEX_COMPONENT'

/**
 * @class components.MaxZIndexComponent
 */
class MaxZIndexComponent extends React.Component {
    render() {
        const {
            css
        } = this.props
        return ( <
            style id = {
                id
            } > {
                css
            } < /style>
        )
    }
}

MaxZIndexComponent.compType = id
MaxZIndexComponent.displayName = 'MaxZIndexComponent'

MaxZIndexComponent.propTypes = {
    css: PropTypes.string
}

module.exports = MaxZIndexComponent