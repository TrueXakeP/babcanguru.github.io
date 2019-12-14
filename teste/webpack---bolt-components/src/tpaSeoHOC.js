const _ = require('lodash')
const React = require('react')
const {
    utils: {
        createReactElement
    },
    santaTypesDefinitions
} = require('santa-components')


const tpaSeoHOC = TpaCompClass => {
    function seoTpa(props) {
        let childElement

        if (props.seoHtmlContent) {
            childElement = createReactElement('div', {
                id: props.id,
                ref: props.forwardedRef,
                style: _.omit(props.style, 'height'),
                dangerouslySetInnerHTML: {
                    __html: props.seoHtmlContent
                }
            })
        } else {
            childElement = createReactElement(TpaCompClass, _.assign({}, props, {
                ref: props.forwardedRef
            }))
        }

        return childElement
    }

    const forwardRef = (props, ref) =>
        createReactElement(seoTpa, _.assign({
            forwardedRef: ref
        }, props))
    forwardRef.displayName = 'seoTpa'

    const ForwardRef = React.forwardRef(forwardRef)
    ForwardRef.displayName = 'ForwardRef(seoTpa)'
    ForwardRef.propTypes = _.assign({
        seoHtmlContent: santaTypesDefinitions.TPA.seoHtmlContent
    }, TpaCompClass.propTypes)

    return ForwardRef
}

module.exports = tpaSeoHOC