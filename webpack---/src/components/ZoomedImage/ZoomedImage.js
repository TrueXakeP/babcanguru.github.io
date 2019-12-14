'use strict'

const _ = require('lodash')
const createReactClass = require('create-react-class')
const PropTypes = require('prop-types')
const ReactDOM = require('react-dom')
const coreUtilsLib = require('santa-core-utils')
const santaTypesDefinitions = require('../../definitions/santaTypesDefinitions')
const imageCommon = require('../imageCommon/imageCommon')
const skinBasedComp = require('../../mixins/skinBasedComp')
const animationsMixin = require('../../mixins/animationsMixin')
const skinsJson = require('../image/imageSkins/skins.json.js')

const imageElements = imageCommon.imageElements
const DURATION = 0.2

const componentSkins = _.pick(skinsJson, [
    'skins.core.ImageNewSkinZoomable'
])

const getComponentSkins = () => componentSkins

/**
 * @class components.ZoomedImage
 */

const ZoomedImage = createReactClass({
    mixins: [skinBasedComp(componentSkins), animationsMixin],
    displayName: 'ZoomedImage',
    propTypes: {
        cssFiltersSupported: santaTypesDefinitions.BrowserFlags.cssFiltersSupported.isRequired,
        currentUrl: santaTypesDefinitions.currentUrl,
        getMediaFullStaticUrl: santaTypesDefinitions.ServiceTopology.getMediaFullStaticUrl,
        staticMediaUrl: santaTypesDefinitions.ServiceTopology.staticMediaUrl,
        reportBI: santaTypesDefinitions.reportBI,
        devicePixelRatio: santaTypesDefinitions.Device.devicePixelRatio,
        renderType: santaTypesDefinitions.PublicModel.renderType,
        id: PropTypes.string,
        containerWidth: PropTypes.number.isRequired,
        containerHeight: PropTypes.number.isRequired,
        imageData: PropTypes.object.isRequired,
        maskData: PropTypes.object,
        displayMode: PropTypes.string,
        filterEffect: PropTypes.object,
        initialClickPosition: PropTypes.object,
        autoLayout: PropTypes.bool,
        wixImageLayout: PropTypes.bool,
        containerId: PropTypes.string,
        style: PropTypes.object,
        'data-type': PropTypes.string
    },

    statics: {
        useSantaTypes: true,
        getComponentSkins,
        compType: 'core.components.ZoomedImage'
    },

    shouldZoom: true,
    shouldDrag: false,
    sequenceId: '',
    animatableElement: 'image',

    getInitialState() {
        this.eventsToAssign = {}
        this.imageForLoadEvents = null
        return {}
    },

    //zoomedimage
    componentDidMount() {
        this.assignLoadEvents()
    },

    //zoomedimage
    componentDidUpdate() {
        this.assignLoadEvents()
    },

    hasEffect() {
        return this.props.filterEffect && this.props.filterEffect.effectType !== 'none'
    },

    getTargetPosition(event) {
        this.clientRect = this.clientRect || coreUtilsLib.domMeasurements.getBoundingRect(ReactDOM.findDOMNode(this))

        const containerSize = {
            height: this.props.containerHeight,
            width: this.props.containerWidth
        }
        const mouseX = event.clientX - this.clientRect.left
        const mouseY = event.clientY - this.clientRect.top
        return {
            x: -(this.props.imageData.width - containerSize.width) * (mouseX / containerSize.width),
            y: -(this.props.imageData.height - containerSize.height) * (mouseY / containerSize.height)
        }
    },

    zoomOut(callback) {
        this.stopSequence(this.sequenceId)
        callback()
    },

    zoomIn() {
        this.shouldDrag = this.shouldZoom
        const targetPosition = this.getTargetPosition(this.props.initialClickPosition)
        this.animate(this.animatableElement, 'BasePosition', 0, 0, {
            to: {
                x: -(this.props.imageData.width / 2 - this.props.containerWidth / 2),
                y: -(this.props.imageData.height / 2 - this.props.containerHeight / 2)
            }
        })
        this.sequenceId = this.animate(this.animatableElement, 'BasePosition', DURATION, 0, {
            to: targetPosition
        })
    },

    drag(event) {
        if (this.shouldDrag) {
            const targetPosition = this.getTargetPosition(event)
            this.animate(this.animatableElement, 'BasePosition', 0.5, 0, {
                to: targetPosition
            })
        }
    },

    // zoomedImage
    assignLoadEvents() {
        if (_.isEmpty(this.eventsToAssign)) {
            return
        }
        const readyCallback = this.eventsToAssign.readyCallback
        const errorCallback = this.eventsToAssign.errorCallback
        const uri = this.eventsToAssign.uri
        this.eventsToAssign = {}

        if (!this.imageForLoadEvents) {
            this.imageForLoadEvents = new window.Image()
            if (readyCallback) {
                this.imageForLoadEvents.onload = readyCallback
            }
            if (errorCallback) {
                this.imageForLoadEvents.onerror = errorCallback
            }
        }

        this.imageForLoadEvents.src = uri
    },

    getOnloadUrl(imageTransformObject) {
        this.eventsToAssign = {
            uri: imageTransformObject.uri,
            readyCallback: this.zoomIn
        }
    },

    getSkinProperties() {
        const altText = _.get(this, 'props.imageData.alt', '')
        // For IE/Edge
        const isSvgFallbackForFilters = this.hasEffect() && !this.props.cssFiltersSupported
        const isSvgMask = !!_.get(this.props, ['maskData', 'svgString'])
        const isSvgImage = isSvgFallbackForFilters || isSvgMask

        const imageProps = _.assign({
            containerWidth: this.props.imageData.width,
            containerHeight: this.props.imageData.height,
            imageData: this.props.imageData,
            displayMode: this.props.displayMode,
            fittingType: this.props.displayMode
        }, this.props)
        //get image transform data
        const imagePropsForUri = _.defaults({
            shouldRenderSrc: true,
            imageUrlPreMeasureParams: {
                width: this.props.imageData.width,
                height: this.props.imageData.height
            }
        }, imageProps)
        const imageTransformData = imageElements.getImageTransformAttributes(imagePropsForUri, isSvgFallbackForFilters)

        const imageComponents = imageElements.getImageComponents(imageProps, altText, isSvgFallbackForFilters, this.getOnloadUrl, imageTransformData)

        const containerStyle = _.assign({
            width: this.props.containerWidth,
            height: this.props.containerHeight,
            WebkitTransform: 'translateZ(0)',
            transform: 'translateZ(0)',
            position: 'relative'
        })

        // For IE/Edge
        if (isSvgFallbackForFilters) {
            this.animatableElement = 'svg'
        }
        if (!this.props.cssFiltersSupported) {
            containerStyle.overflow = 'hidden'
        }

        const isWixImageLayout = this.props.wixImageLayout && this.props.renderType === 'bolt'
        const isAutoLayout = this.props.autoLayout && !isWixImageLayout

        const rootProps = _.defaults({
            style: containerStyle,
            onMouseMove: this.drag,
            addChildren: imageComponents,
            tagName: isWixImageLayout ? 'wix-image' : 'div',
            'data-image-zoomed': true
        })

        if (isAutoLayout || isWixImageLayout) {
            const imageInfo = _.pick(this.props, ['imageData', 'containerId', 'alignType', 'displayMode'])
            //TODO: remove this when displayMode as imageData prop is no longer needed in patchNodeImage impl.
            imageInfo.imageData.displayMode = imageInfo.displayMode
            rootProps['data-image-info'] = JSON.stringify(imageInfo)
            rootProps['data-style'] = this.props['data-style']
            rootProps['data-has-bg-scroll-effect'] = this.props['data-has-bg-scroll-effect']
            rootProps['data-is-svg'] = isSvgImage
        }

        return {
            '': rootProps
        }
    }
})

module.exports = ZoomedImage