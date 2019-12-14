'use strict'

const _ = require('lodash')
const MeshDockedLayer = require('santa-mesh/cjs/src/MeshDockedLayer')
const createReactElement = require('./createReactElement')

const getGridVariant = browser => browser.ie ? 'ms' : 'standard'

module.exports = {
    createLightboxLayer({
        id,
        children,
        childrenMeshParams,
        browser
    }) {
        if (_.isEmpty(children)) {
            return null
        }

        const elementId = `${id}-lightbox-layer`
        return createReactElement(MeshDockedLayer.default, {
            id: elementId,
            key: elementId,
            childrenMeshLayout: childrenMeshParams,
            marginTop: 0,
            isFixedLayer: false,
            growToContent: true,
            cssGridVariant: getGridVariant(browser)
        }, ...children)
    }
}