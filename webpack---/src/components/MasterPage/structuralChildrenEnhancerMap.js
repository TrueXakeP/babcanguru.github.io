'use strict'

const _ = require('lodash')
const React = require('react')
const createReactElement = require('../../utils/createReactElement')

const createPlaceholderIfNeeded = (structuralChildren, childLayout, {
    compId,
    isInSSR,
    isCurrentPageLandingPage
}) => {
    if (!childLayout.fixedPosition) {
        return structuralChildren
    }

    const placeholder = createReactElement('div', {
        key: `${compId}-placeholder`,
        id: `${compId}-placeholder`,
        style: {
            height: isInSSR ? childLayout.height + childLayout.y : 0,
            display: isCurrentPageLandingPage ? 'none' : 'block'
        }
    })
    return [structuralChildren, placeholder]
}

const positionBackToTopButton = (structuralChildren, childLayout, {
    siteWidth
}) => {
    const bttOverrideStyle = {
        position: 'fixed',
        width: childLayout.width,
        height: childLayout.height,
        bottom: _.get(childLayout, 'docked.bottom.px')
    }

    const dockedDirection = _.has(childLayout, 'docked.right') ? 'right' : 'left'
    bttOverrideStyle[dockedDirection] = `calc((100% - ${siteWidth}px) / 2)`
    bttOverrideStyle[_.camelCase(`margin-${dockedDirection}`)] = _.get(childLayout, `docked.${dockedDirection}.px`)

    return React.cloneElement(structuralChildren, {
        style: bttOverrideStyle
    })
}

const structuralChildrenEnhancerMap = {
    SITE_HEADER: createPlaceholderIfNeeded,
    SITE_FOOTER: createPlaceholderIfNeeded,
    BACK_TO_TOP_BUTTON: positionBackToTopButton
}

module.exports = structuralChildrenEnhancerMap