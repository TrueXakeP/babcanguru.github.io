'use strict'

const _ = require('lodash')
const createReactClass = require('create-react-class')
const PropTypes = require('prop-types')
const santaTypesDefinitions = require('../../definitions/santaTypesDefinitions')
const skinBasedComp = require('../../mixins/skinBasedComp')
const imageCommon = require('../../components/imageCommon/imageCommon')
const skinsJson = require('../../components/image/imageSkins/skins.json.js')

const imageElements = imageCommon.imageElements

const getComponentSkins = () => _.pick(skinsJson, [
    'skins.core.ImageNewSkinZoomable',
    ..._.keys(skinsJson)
])

function getStyleString(styleObj) {
    return _.transform(styleObj, function(result, value, key) {
        if (!_.isEmpty(value)) {
            result.push(`${_.kebabCase(key)}:${value}`)
        }
        return result
    }, []).join(';')
}

function filterProps(props) {
    const allowed = _.keyBy(['onKeyDown', 'onKeyPress', 'onKeyUp', 'onFocus', 'onBlur', 'onChange', 'onInput', 'onSubmit', 'onClick', 'onContextMenu',
        'onDoubleClick', 'onDrag', 'onDragEnd', 'onDragEnter', 'onDragExit', 'onDragLeave', 'onDragOver', 'onDragStart', 'onDrop', 'onMouseDown',
        'onMouseEnter', 'onMouseLeave', 'onMouseMove', 'onMouseOut', 'onMouseOver', 'onMouseUp', 'onSelect', 'onTouchCancel', 'onTouchEnd',
        'onTouchMove', 'onTouchStart', 'onScroll', 'onWheel', 'onAbort', 'onCanPlay', 'onCanPlayThrough', 'onDurationChange', 'onEmptied', 'onEncrypted',
        'onEnded', 'onError', 'onLoadedData', 'onLoadedMetadata', 'onLoadStart', 'onPause', 'onPlay', 'onPlaying', 'onProgress', 'onRateChange', 'onSeeked',
        'onSeeking', 'onStalled', 'onSuspend', 'onTimeUpdate', 'onVolumeChange', 'onWaiting', 'onAnimationStart', 'onAnimationEnd', 'onAnimationIteration',
        'onTransitionEnd', 'onCompositionEnd', 'onCompositionStart', 'onCompositionUpdate', 'onCopy', 'onCut', 'onPaste'
    ])


    return _.reduce(props, function(res, value, prop) {
        if (_.startsWith(prop, 'data-') || _.startsWith(prop, 'aria-') || _.has(allowed, prop)) {
            res[prop] = value
        }
        return res
    }, {})
}

/**
 * @class components.ZoomedImage
 */

const Image = createReactClass({
    displayName: 'Image',

    mixins: [skinBasedComp(getComponentSkins())],

    propTypes: {
        id: PropTypes.string,
        staticMediaUrl: santaTypesDefinitions.ServiceTopology.staticMediaUrl,
        reportBI: santaTypesDefinitions.reportBI,
        cssFiltersSupported: santaTypesDefinitions.BrowserFlags.cssFiltersSupported.isRequired,
        currentUrl: santaTypesDefinitions.currentUrl,
        onImageUnmount: santaTypesDefinitions.Images.onImageUnmount,
        getMediaFullStaticUrl: santaTypesDefinitions.ServiceTopology.getMediaFullStaticUrl,
        devicePixelRatio: santaTypesDefinitions.Device.devicePixelRatio,
        renderType: santaTypesDefinitions.PublicModel.renderType,
        containerWidth: PropTypes.number.isRequired,
        containerHeight: PropTypes.number.isRequired,
        imageData: PropTypes.object.isRequired,
        style: PropTypes.object,
        quality: PropTypes.object,
        opacity: PropTypes.number,
        alignType: PropTypes.string,
        displayMode: PropTypes.string,
        fittingType: PropTypes.string,
        hasBgScrollEffect: PropTypes.bool,
        filterEffect: PropTypes.object,
        addItemProp: PropTypes.bool,
        imgStyle: PropTypes.object,
        'data-gallery-id': PropTypes.string,
        'data-page-desc': PropTypes.string,
        'data-query': PropTypes.string,
        'data-image-index': PropTypes.number,
        'data-type': PropTypes.string,
        onMouseEnter: PropTypes.func,
        onTouchStart: PropTypes.func,
        autoLayout: PropTypes.bool,
        wixImageLayout: PropTypes.bool,
        shouldRenderSrc: PropTypes.bool,
        imageUrlPreMeasureParams: PropTypes.object,
        containerId: PropTypes.string,
        maskData: PropTypes.object
    },

    statics: {
        useSantaTypes: true,
        getComponentSkins,
        compType: 'core.components.Image'
    },

    getInitialState() {
        return {
            showPreloader: false
        }
    },

    componentWillUnmount() {
        this.props.onImageUnmount(this.props.id)
    },

    hasEffect() {
        return this.props.filterEffect && this.props.filterEffect.effectType !== 'none'
    },

    onImageMouseEnter() {
        if (typeof this.props.onMouseEnter === 'function') {
            this.props.onMouseEnter(this.props.id)
        }
    },

    onImageTouchStart() {
        if (typeof this.props.onTouchStart === 'function') {
            this.props.onTouchStart(this.props.id)
        }
    },

    updateRootStyle(rootProps, imageTransformData, opacity) {
        // 'visibility', 'transform'  Breaks animations if moved only to layout (CLNT-9508)
        const styleAttributesToRender = ['visibility', 'transform', 'width', 'height']
        //preserve position
        const styleToRender = _.pick(this.props.style, styleAttributesToRender.concat('position'))
        const styleForLayout = _.omit(this.props.style, styleAttributesToRender)

        _.assign(styleToRender, {
            width: _.get(this.props.style, 'width', this.props.containerWidth),
            height: _.get(this.props.style, 'height', this.props.containerHeight)
        }, _.isNumber(opacity) && {
            opacity
        })

        if (this.props.shouldRenderSrc) {
            _.defaults(styleToRender, {
                top: 0,
                left: 0
            })
        }

        _.assign(rootProps, {
            style: styleToRender,
            'data-has-bg-scroll-effect': (this.props.hasBgScrollEffect || '').toString(),
            'data-style': getStyleString(styleForLayout)
        })
    },

    getSkinProperties() {
        const altText = _.get(this, 'props.imageData.alt', '')
        // For IE/Edge
        const isSvgFallbackForFilters = this.hasEffect() && !this.props.cssFiltersSupported
        const isSvgMask = !!_.get(this.props, ['maskData', 'svgString'])
        const isSvgImage = isSvgFallbackForFilters || isSvgMask
        //get image transform data,(src and css)
        const imageTransformData = imageElements.getImageTransformAttributes(this.props, isSvgImage)

        const imageComponents = imageElements.getImageComponents(this.props, altText, isSvgFallbackForFilters, _.noop, imageTransformData)

        const isWixImageLayout = this.props.wixImageLayout && this.props.renderType === 'bolt'
        const isAutoLayout = this.props.autoLayout && !isWixImageLayout

        const rootProps = {
            addChildren: imageComponents,
            tagName: isWixImageLayout ? 'wix-image' : 'div'
        }

        if (this.props.onMouseEnter) {
            rootProps.onMouseEnter = this.onImageMouseEnter
        }

        if (this.props.onTouchStart) {
            rootProps.onTouchStart = this.onImageTouchStart
        }

        this.updateRootStyle(rootProps, imageTransformData, _.get(this.props, ['imageData', 'opacity']))

        if (isAutoLayout || isWixImageLayout) {
            const imageInfo = _.pick(this.props, ['imageData', 'containerId', 'alignType', 'displayMode'])
            //TODO: remove this when displayMode as imageData prop is no longer needed in patchNodeImage impl.
            imageInfo.imageData.displayMode = imageInfo.displayMode
            rootProps['data-image-info'] = JSON.stringify(imageInfo)
            rootProps['data-style'] = this.props['data-style']
            rootProps['data-image-zoomed'] = this.props.isImageZoomed
            rootProps['data-has-bg-scroll-effect'] = (this.props.hasBgScrollEffect || '').toString()
            rootProps['data-is-svg'] = isSvgImage
        }

        _.defaults(
            rootProps,
            filterProps(this.props)
        )

        return {
            '': rootProps
        }
    }
})

module.exports = Image