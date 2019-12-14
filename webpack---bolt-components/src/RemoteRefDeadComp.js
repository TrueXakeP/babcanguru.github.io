const React = require('react')
const PropTypes = require('prop-types')
const {
    utils: {
        createSantaTypesDefinitions
    },
    santaTypesDefinitions
} = require('santa-components')


const compType = 'REMOTE_REF_DEAD_COMP'
const privateSantaTypes = createSantaTypesDefinitions({
    deadCompText: PropTypes.object
}, 'RemoteRefDeadComp')

const icon = < svg width = "22px"
height = "23px"
viewBox = "0 0 22 23"
version = "1.1"
className = {
        `${compType}-icon`
    } >
    <
    g id = "Page-1"
stroke = "none"
strokeWidth = "1"
fill = "none"
fillRule = "evenodd" >
    <
    g id = "Error-Message"
transform = "translate(-308.000000, -690.000000)"
fill = "#174165"
fillRule = "nonzero" >
    <
    g id = "Group-3"
transform = "translate(66.000000, 75.000000)" >
    <
    g id = "Group-Copy"
transform = "translate(110.000000, 429.000000)" >
    <
    g id = "Group-2"
transform = "translate(128.000000, 186.000000)" >
    <
    path d = "M13.5652174,6 L16.4347826,6 L16.4347826,10.0908203 L15.9602582,13 L14.1082817,13 L13.5652174,10.0638428 L13.5652174,6 Z M13.5652174,14 L16.4347826,14 L16.4347826,17 L13.5652174,17 L13.5652174,14 Z M14.5217391,2 C9.76728781,2 5.91304348,6.02943725 5.91304348,11 L5.91304348,12 C5.91304348,16.9705627 9.76728781,21 14.5217391,21 L15.4782609,21 C20.2327122,21 24.0869565,16.9705627 24.0869565,12 L24.0869565,11 C24.0869565,6.02943725 20.2327122,2 15.4782609,2 L14.5217391,2 Z M14.5217391,0 L15.4782609,0 C21.2892569,0 26,4.92486775 26,11 L26,12 C26,18.0751322 21.2892569,23 15.4782609,23 L14.5217391,23 C8.71074307,23 4,18.0751322 4,12 L4,11 C4,4.92486775 8.71074307,0 14.5217391,0 Z"
id = "!" > < /path> <
    /g> <
    /g> <
    /g> <
    /g> <
    /g> <
    /svg>

const containerStyle = {
    margin: '0 auto',
    width: 'fit-content'
}

const textAttributes = {
    lengthAdjust: 'spacingAndGlyphs',
    fontSize: '5'
}

/**
 * @class components.RemoteRefDeadComp
 */
class RemoteRefDeadComp extends React.Component {
    render() {
        const {
            id,
            deadCompText
        } = this.props
        const {
            title,
            desc
        } = deadCompText
        return ( <
            div id = {
                id
            }
            style = {
                {
                    width: '100%',
                    height: '100%'
                }
            } >
            <
            div style = {
                containerStyle
            } > {
                icon
            } <
            svg viewBox = "0 0 100 100"
            style = {
                {
                    width: '100%',
                    height: '100%'
                }
            } >
            <
            text x = "0"
            y = "10"
            className = {
                `${compType}-title`
            } { ...textAttributes
            }
            style = {
                {
                    fontWeight: 'bold'
                }
            } > {
                title
            } <
            /text> <
            text x = "0"
            dy = "20"
            className = {
                `${compType}-desc`
            } { ...textAttributes
            } > {
                desc
            } <
            /text> <
            /svg> <
            /div> <
            /div>
        )
    }
}

RemoteRefDeadComp.compType = compType
RemoteRefDeadComp.displayName = 'RemoteRefDeadComp'
RemoteRefDeadComp.santaTypesDefinitions = privateSantaTypes
RemoteRefDeadComp.propTypes = {
    id: santaTypesDefinitions.Component.id,
    deadCompText: privateSantaTypes.deadCompText
}
module.exports = RemoteRefDeadComp