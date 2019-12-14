'use strict'

const _ = require('lodash')

const createReactElement = require('../../utils/createReactElement')
const stylePropName = key => _.head(key) === '-' ? key : _.kebabCase(key)
const renderStyle = ({
    id,
    stylesMap
}) => {
    const styleElementID = `${id}`
    const styleElement = createReactElement('style', {
        key: styleElementID,
        id: styleElementID,
        dangerouslySetInnerHTML: {
            __html: `
    ${_(stylesMap).map((compStyle, compId) => `
#${compId} {
${_(compStyle).omitBy(_.isNil).map((value, key) => `    ${stylePropName(key)}: ${value};`).join('\n')}
}`).join('\n')}`
        }
    })

    return styleElement
}

module.exports = renderStyle