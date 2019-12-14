const React = require('react')
const PropTypes = require('prop-types')
const {
    utils: {
        createSantaTypesDefinitions
    }
} = require('santa-components')

const id = 'RESPONSIVE_STYLES_RENDERER'
/**
 * @class components.ResponsiveStylesRenderer
 */
class ResponsiveStylesRenderer extends React.Component {
    render() {
        const {
            layoutCss,
            layoutDsOverrides
        } = this.props
        return ( <
            div id = {
                id
            }
            key = {
                id
            } >
            <
            style id = 'responsive-layout-styles' > {
                layoutCss.join('\n')
            } <
            /style> <
            style id = 'responsive-layout-ds-styles-overrides' > {
                layoutDsOverrides.join('\n')
            } <
            /style> <
            /div>
        )
    }
}

ResponsiveStylesRenderer.compType = id
ResponsiveStylesRenderer.displayName = 'ResponsiveStylesRenderer'

ResponsiveStylesRenderer.santaTypesDefinitions = createSantaTypesDefinitions({
    layoutCss: PropTypes.array,
    layoutDsOverrides: PropTypes.array
}, ResponsiveStylesRenderer.displayName)

ResponsiveStylesRenderer.propTypes = {
    layoutCss: ResponsiveStylesRenderer.santaTypesDefinitions.layoutCss,
    layoutDsOverrides: ResponsiveStylesRenderer.santaTypesDefinitions.layoutDsOverrides
}

module.exports = ResponsiveStylesRenderer