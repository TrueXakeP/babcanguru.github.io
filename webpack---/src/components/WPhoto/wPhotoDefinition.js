'use strict'

const _ = require('lodash')
const {
    imageUtils
} = require('santa-core-utils')
const imageClientLib = require('image-client-api/dist/imageClientApi')
const createChildComponentUtils = require('../../utils/createChildComponentUtils')
const Image = require('../image/image')
const ZoomedImage = require('../ZoomedImage/ZoomedImage')
const createReactElement = require('../../utils/createReactElement')
const santaTypesDefinitions = require('../../definitions/santaTypesDefinitions')
const animationsMixin = require('../../mixins/animationsMixin')
const skinBasedComp = require('../../mixins/skinBasedComp')
const skinsJson = require('./skins/skins.json.js')
const skinsInfoMixin = require('../../mixins/skinInfoMixin')
const createSantaTypesDefinitions = require('../../utils/createSantaTypesDefinitions')
const PropTypes = require('prop-types')

const privateSantaTypes = createSantaTypesDefinitions({
    Link: PropTypes.object
}, 'WPhoto')

const CANCEL_ZOOM_TIMEOUT = 1200
const convertedDisplayModes = {
    fitWidthStrict: imageClientLib.fittingTypes.LEGACY_FIT_WIDTH,
    fitHeightStrict: imageClientLib.fittingTypes.LEGACY_FIT_HEIGHT
}

function generateAdidtionalLinkPartProps(properties, imageCompSize) {
    properties.style.width = imageCompSize.width
    properties.style.height = imageCompSize.height
}

function generateLinkPartProps(link) {
    const properties = {
        style: {}
    }

    //todo Shimi_Liderman 8/21/14 16:31 Should the link be in the image's container size? - for example PolaroidSkin
    if (link) {
        properties.style.cursor = 'pointer'
        _.assign(properties, link)
    } else {
        properties.parentConst = createReactElement.bind(null, 'div')
    }

    return properties
}

function buildImage(compClass, imageProps) {
    const childSantaTypes = createChildComponentUtils.getChildSantaTypes(compClass, this.props)
    imageProps = _.assign(childSantaTypes, imageProps)
    return createReactElement(compClass, imageProps)
}

function getImageParams(photoProps, imageCompSize) {
    const childStyle = createChildComponentUtils.getChildStyleDataFromSkinPart('img', this.getSkinExports(), this.props.styleId)
    let imageData = photoProps.compData
    const overrideCropData = _.get(photoProps.compProp, 'overrideCrop')
    if (overrideCropData) {
        imageData = _.clone(photoProps.compData)
        imageData.crop = overrideCropData
    }
    const maskData = _.assign({
        svgString: photoProps.svgString
    }, _.pick(imageData.crop || {}, ['flip', 'rotate']))
    const autoLayout = !photoProps.disableImageAutoLayout

    const properties = {
        id: `${photoProps.id}img`,
        ref: 'img',
        skin: childStyle.skin,
        styleId: childStyle.styleId,
        autoLayout,
        wixImageLayout: autoLayout && (photoProps.isExperimentOpen('bv_wixImagePhaseTwo') || photoProps.isResponsive),
        containerId: photoProps.id,
        shouldRenderSrc: photoProps.shouldRenderSrc,
        imageUrlPreMeasureParams: photoProps.imageUrlPreMeasureParams,
        displayMode: convertedDisplayModes[photoProps.compProp.displayMode] || photoProps.compProp.displayMode,
        filterEffect: photoProps.compProp.filterEffect,
        imageData,
        maskData,
        addItemProp: photoProps.addItemProp,
        structure: {
            componentType: 'core.components.Image'
        }
    }

    if (imageCompSize) {
        properties.containerWidth = imageCompSize.width
        properties.containerHeight = imageCompSize.height
    }

    return properties
}

function buildZoomableImage(imageProps, eventListeners, photoProperties) {
    let imageComp
    if (this.state.isInZoom) {
        imageProps.className = this.classSet({
            zoomedin: true
        })
        imageProps.initialClickPosition = this.state.initialClickPosition
        imageProps.structure.componentType = 'core.components.ZoomedImage'
        imageComp = buildImage.call(this, ZoomedImage, imageProps)
        eventListeners.onMouseLeave = waitBeforeZoomOut.bind(this)
        eventListeners.onMouseEnter = cancelZoomOut.bind(this)
    } else {
        imageProps.className = this.classSet({
            zoomedout: true
        })
        imageComp = buildImage.call(this, Image, imageProps)
        eventListeners.onMouseLeave = _.noop
        eventListeners.onMouseEnter = _.noop
    }
    _.assign(photoProperties, eventListeners)

    return imageComp
}

function createResponsiveImageComponent(isZoomAndPanMode, photoProperties) {
    // src calculations based on static sizes - todo - check with yaniv / WOW
    const imageProps = getImageParams.call(this, this.props)
    const eventListeners = {
        onClick: toggleZoom.bind(this)
    }
    //isOriginalImageSmallerThanImageComp - todo - check with yaniv / WOW
    if (!isZoomAndPanMode) {
        return buildImage.call(
            this,
            Image,
            imageProps)
    }

    return buildZoomableImage.call(this, imageProps, eventListeners, photoProperties)
}

function createImageComponent(imageCompSize, imageOriginalSize, isZoomAndPanMode, photoProperties) {
    const imageProps = getImageParams.call(this, this.props, imageCompSize)
    const eventListeners = {
        onClick: toggleZoom.bind(this)
    }

    if (!isZoomAndPanMode || isOriginalImageSmallerThanImageComp(imageOriginalSize, imageCompSize)) {
        return buildImage.call(
            this,
            Image,
            imageProps)
    }

    return buildZoomableImage.call(this, imageProps, eventListeners, photoProperties)
}


function getBasePhotoProps({
    style,
    compData,
    compProp,
    isResponsive
}) {
    const properties = {
        style: _.cloneDeep(style),
        title: compData.title,
        ['data-is-responsive']: isResponsive,
        ['data-display-mode']: _.get(compProp, 'displayMode')
    }
    const overrideCrop = _.get(compProp, 'overrideCrop')
    if (overrideCrop) {
        properties['data-override-crop'] = JSON.stringify(overrideCrop)
    }
    const hasEffect = compProp.filterEffect && compProp.filterEffect.effectType !== 'none'
    if (hasEffect) {
        const {
            transform = ''
        } = properties.style
        const transformWithEffect = `${transform} translateZ(0)`
        properties.style.transform = transformWithEffect.trim()
    }
    return properties
}

function getAdditionalPhotoProps(properties, photoCompSize, disableImageAutoLayout, parsedSkinParams) {
    properties.style.width = photoCompSize.width
    properties.style.height = photoCompSize.height

    // adding exact size info to node, so that it'll be accessible from the layout
    properties['data-content-padding-horizontal'] = parsedSkinParams.contentPaddingHorizontal
    properties['data-content-padding-vertical'] = parsedSkinParams.contentPaddingVertical
    properties['data-exact-height'] = photoCompSize.exactHeight

    if (disableImageAutoLayout) {
        properties['data-disable-image-auto-layout'] = 'true'
    }
}

function toggleZoom(event) {
    const self = this
    const isInZoom = this.state.isInZoom

    this.registerReLayout()

    if (isInZoom) {
        this.refs.img.zoomOut(function() {
            self.setState({
                isInZoom: !isInZoom
            })
        })
    } else {
        this.setState({
            isInZoom: !isInZoom,
            initialClickPosition: {
                clientX: event.clientX,
                clientY: event.clientY
            }
        })
    }
}

function waitBeforeZoomOut(event) {
    const self = this
    cancelZoomOut.call(this)
    this.zoomTimer = setTimeout(function() {
        toggleZoom.apply(self, [event])
    }, CANCEL_ZOOM_TIMEOUT)
}

function cancelZoomOut() {
    clearTimeout(this.zoomTimer)
}

function isOriginalImageSmallerThanImageComp(imageOriginalSize, imageCompSize) {
    return imageOriginalSize.width < imageCompSize.width ||
        imageOriginalSize.height < imageCompSize.height
}

function parseSkinParams(skinParams, skinExports) { // eslint-disable-line complexity
    const parsedParams = {}
    const contentPaddingLeft = parseInt(skinParams.contentPaddingLeft.value || 0, 10) + parseInt(skinExports.contentPaddingLeft || 0, 10)
    const contentPaddingRight = parseInt(skinParams.contentPaddingRight.value || 0, 10) + parseInt(skinExports.contentPaddingRight || 0, 10)
    const contentPaddingTop = parseInt(skinParams.contentPaddingTop.value || 0, 10) + parseInt(skinExports.contentPaddingTop || 0, 10)
    const contentPaddingBottom = parseInt(skinParams.contentPaddingBottom.value || 0, 10) + parseInt(skinExports.contentPaddingBottom || 0, 10)

    parsedParams.contentPaddingHorizontal = contentPaddingLeft + contentPaddingRight
    parsedParams.contentPaddingVertical = contentPaddingTop + contentPaddingBottom

    return parsedParams
}

function getImageCompSizeBySkinParams(photoOriginalSize, parsedSkinParams) {
    const width = photoOriginalSize.width - parsedSkinParams.contentPaddingHorizontal


    const height = photoOriginalSize.height - parsedSkinParams.contentPaddingVertical
    return {
        width: width > 0 ? width : 16,
        height: height > 0 ? height : 16
    }
}

function getPhotoCompSizeBySkinParams(imageCompSize, parsedSkinParams) {
    return {
        width: imageCompSize.width + parsedSkinParams.contentPaddingHorizontal,
        height: imageCompSize.height + parsedSkinParams.contentPaddingVertical,
        exactHeight: (imageCompSize.exactHeight || imageCompSize.height) + parsedSkinParams.contentPaddingVertical
    }
}

function getDefaultSkinName() {
    return 'wysiwyg.viewer.skins.photo.DefaultPhoto'
}

let skinsMap = _.assign({}, skinsJson, Image.getComponentSkins())
skinsMap = _.pick(skinsMap, [getDefaultSkinName(), ..._.keys(skinsMap)])

const wPhotoDefinition = { //eslint-disable-line santa/no-module-state
    displayName: 'WPhoto',

    propTypes: _.assign({
        id: santaTypesDefinitions.Component.id,
        compData: santaTypesDefinitions.Component.compData.isRequired,
        compProp: santaTypesDefinitions.Component.compProp.isRequired,
        structure: santaTypesDefinitions.Component.structure,
        link: privateSantaTypes.Link,
        shouldRenderSrc: santaTypesDefinitions.Media.shouldRenderSrc,
        imageUrlPreMeasureParams: santaTypesDefinitions.Media.imageUrlPreMeasureParams,
        svgString: santaTypesDefinitions.VectorImage.svgStringFromCropData,
        isExperimentOpen: santaTypesDefinitions.isExperimentOpen.isRequired,
        disableImageAutoLayout: PropTypes.bool,
        isResponsive: santaTypesDefinitions.RendererModel.isResponsive
    }, _.pickBy(Image.propTypes, 'id'), _.pickBy(ZoomedImage.propTypes, 'id')),

    mixins: [skinBasedComp(skinsMap), skinsInfoMixin(skinsMap), animationsMixin],

    statics: {
        compType: 'wysiwyg.viewer.components.WPhoto',
        santaTypeDefinitions: privateSantaTypes,
        getComponentSkins: () => skinsMap
    },

    getInitialState() {
        this.zoomTimer = null
        return {
            isInZoom: false
        }
    },

    getSkinProperties() {
        let imageProperties
        const onClickBehavior = this.props.compProp.onClickBehavior
        const compProperties = getBasePhotoProps(this.props)
        const linkProperties = generateLinkPartProps(this.props.link)

        if (this.props.isResponsive) {
            imageProperties = createResponsiveImageComponent.call(this, onClickBehavior === 'zoomAndPanMode', compProperties)
        } else {
            const displayMode = this.props.compProp.displayMode
            const componentOriginalSize = _.pick(this.props.style, ['width', 'height'])
            const imageOriginalSize = {
                width: this.props.compData.width,
                height: this.props.compData.height
            }

            // computations
            const parsedSkinParams = parseSkinParams(
                this.getParams(['contentPaddingLeft', 'contentPaddingRight', 'contentPaddingBottom', 'contentPaddingTop']),
                this.getSkinExports())
            const imageCompSize = imageUtils.getContainerSize(
                imageClientLib,
                getImageCompSizeBySkinParams(componentOriginalSize, parsedSkinParams),
                imageOriginalSize,
                convertedDisplayModes[displayMode] || displayMode)
            const photoCompSize = getPhotoCompSizeBySkinParams(imageCompSize, parsedSkinParams)

            getAdditionalPhotoProps(compProperties, photoCompSize, this.props.disableImageAutoLayout, parsedSkinParams)
            imageProperties = createImageComponent.call(this, imageCompSize, imageOriginalSize, onClickBehavior === 'zoomAndPanMode', compProperties)
            generateAdidtionalLinkPartProps(linkProperties, imageCompSize)
        }

        return {
            '': compProperties,
            img: imageProperties,
            link: linkProperties
        }
    },

    getDefaultSkinName
}

module.exports = wPhotoDefinition