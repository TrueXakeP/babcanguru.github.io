'use strict'

const _ = require('lodash')
const MeshDockedGridLayer = require('santa-mesh/cjs/src/MeshDockedLayer')
const MeshDockedFixedLayer = require('santa-mesh/cjs/src/MeshDockedFixedLayer')
const createReactElement = require('./createReactElement')

module.exports = {
    createPinnedLayer({
        id,
        children,
        childrenMeshParams,
        browser,
        wixTopAdsHeight = 0
    }) {
        if (_.isEmpty(children)) {
            return null
        }

        return browser.ie ? createReactElement(MeshDockedFixedLayer.default, {
            id,
            key: id,
            childrenMeshLayout: childrenMeshParams,
            marginTop: wixTopAdsHeight
        }, ...children) : createReactElement(MeshDockedGridLayer.default, {
            id,
            key: id,
            childrenMeshLayout: childrenMeshParams,
            marginTop: wixTopAdsHeight,
            isFixedLayer: true,
            growToContent: false,
            cssGridVariant: 'standard'
        }, ...children)
    }
}