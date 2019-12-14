const _ = require('lodash')
const React = require('react')
const PropTypes = require('prop-types')

const id = 'CSS_CONTAINER'
const MASTER_PAGE_ID = 'masterPage'

const createPageStyle = (pageId, pageCss) => < style id = {
    `${pageId}_css`
}
key = {
    pageId
}
dangerouslySetInnerHTML = {
    {
        __html: pageCss
    }
}
/>

/**
 * @class components.CssContainer
 */
class CssContainer extends React.Component {
    render() {
        const {
            css
        } = this.props
        const masterPageCss = css[MASTER_PAGE_ID]
        const cssWithoutMasterPage = _.reduce(css, (result, pageCss, pageId) => {
            if (pageId !== MASTER_PAGE_ID) {
                result[pageId] = pageCss
            }
            return result
        }, {})

        return ( <
            div id = {
                id
            }
            key = {
                id
            } > {
                masterPageCss && createPageStyle(MASTER_PAGE_ID, masterPageCss)
            } {
                _.map(cssWithoutMasterPage, (pageCss, pageId) =>
                    createPageStyle(pageId, pageCss)
                )
            } <
            /div>
        )
    }
}

CssContainer.compType = id
CssContainer.displayName = 'CssContainer'

CssContainer.propTypes = {
    css: PropTypes.object
}

module.exports = CssContainer