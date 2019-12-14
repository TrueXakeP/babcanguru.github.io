const React = require('react')
const PropTypes = require('prop-types')

/**
 * @class components.FontsContainer
 */
class FontsContainer extends React.Component {
    static displayName = 'FontsContainer'
    static compType = 'FONTS_CONTAINER'
    static propTypes = {
        fontsLinks: PropTypes.array
    }
    render() {
        const {
            fontsLinks
        } = this.props
        const id = 'FONTS_CONTAINER'
        return <div id = {
            id
        }
        key = {
                id
            } > {
                fontsLinks.map((url, key) => < link key = {
                        key
                    }
                    href = {
                        url
                    }
                    rel = "stylesheet"
                    type = "text/css" / > )
            } <
            /div>
    }
}

module.exports = FontsContainer