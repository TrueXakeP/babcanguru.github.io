const React = require('react')
const PropTypes = require('prop-types')

const COMP_ID = 'popoverLayer'
const COMP_TYPE = 'PopoverLayer'

/**
 * @class components.PopoverLayer
 * Portal for popovers content
 */
class PopoverLayer extends React.Component {
    render() {
        const style = {
            position: 'absolute'
        }

        return ( <
            div style = {
                style
            }
            id = {
                COMP_ID
            }
            />
        )
    }

    componentDidMount() {
        this.props.setPopoversLayerMounted(COMP_ID)
    }
}

PopoverLayer.displayName = 'PopoverLayer'
PopoverLayer.compType = COMP_TYPE
PopoverLayer.propTypes = {
    setPopoversLayerMounted: PropTypes.func.isRequired
}

module.exports = PopoverLayer