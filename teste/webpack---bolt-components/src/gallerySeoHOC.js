const _ = require('lodash')
const React = require('react')
const PropTypes = require('prop-types')
const {
    utils: {
        createReactElement,
        createSantaTypesDefinitions
    },
    santaTypesDefinitions
} = require('santa-components')

const IMG_WIDTH = 250
const IMG_SPACING = 20

const gallerySeoHOC = GalleryCompClass => {
    function seoGallery(props) {
        return createReactElement(
            'table', {
                id: props.id,
                type: GalleryCompClass.displayName,
                style: _.assign({}, _.pick(props.style, ['position']), {
                    borderCollapse: 'separate',
                    borderSpacing: IMG_SPACING
                })
            },
            createTableBody(props))
    }

    const forwardRef = (props, ref) =>
        createReactElement(seoGallery, _.assign({
            forwardedRef: ref
        }, props))
    forwardRef.displayName = 'seoGallery'

    const ForwardRef = React.forwardRef(forwardRef)
    ForwardRef.displayName = 'ForwardRef(seoGallery)'
    ForwardRef.propTypes = _.assign({
            staticMediaUrl: santaTypesDefinitions.ServiceTopology.staticMediaUrl.isRequired,
            renderImageZoomLink: gallerySeoHOC.santaTypeDefinitions.renderImageZoomLink,
            renderLink: gallerySeoHOC.santaTypeDefinitions.renderLink
        },
        GalleryCompClass.propTypes)

    return ForwardRef

    function getLinkData(itemProps, props) {
        let linkData = {}
        switch (props.compProp.galleryImageOnClickAction) {
            case 'zoomMode':
                linkData = props.renderImageZoomLink(props.rootNavigationInfo, itemProps, props.compData.id, undefined, props.id)
                break
            case 'goToLink':
                if (itemProps.link) {
                    linkData = _.assign({}, props.renderLink(itemProps.link, props.rootNavigationInfo))
                }
                break
        }
        return linkData
    }

    function getItemData(itemProps, index, props) {
        const src = `${props.staticMediaUrl}/${itemProps.uri}`
        const linkData = getLinkData(itemProps, props)
        const textMode = props.compProp.textMode
        const sizeRatio = itemProps.width / itemProps.height
        const width = IMG_WIDTH
        const height = Math.floor(IMG_WIDTH / sizeRatio)
        return _.assign({}, itemProps, linkData, {
            index,
            src,
            width,
            height,
            textMode
        })
    }

    function divideItemsToRows(props) {
        const itemsPerRow = Math.floor(props.style.width / (IMG_WIDTH + IMG_SPACING))
        return _.chain(props)
            .get('compData.items')
            .map((item, index) => getItemData(item, index, props))
            .groupBy(value => Math.floor(value.index / itemsPerRow))
            .values()
            .value()
    }

    function createItemTitle(title) {
        return createReactElement('h2', {
            itemProp: 'name'
        }, title)
    }

    function createItemDescription(description) {
        return createReactElement('h3', {
            itemProp: 'description'
        }, description)
    }

    function shouldAddTitle(textMode) {
        return textMode === 'titleAndDescription' || textMode === 'titleOnly'
    }

    function shouldAddDescription(textMode) {
        return textMode === 'titleAndDescription' || textMode === 'descriptionOnly'
    }

    function createImageInfo(itemProps) {
        const children = []
        if (shouldAddTitle(itemProps.textMode)) {
            children.push(createItemTitle(itemProps.title))
        }
        if (shouldAddDescription(itemProps.textMode)) {
            children.push(createItemDescription(itemProps.description))
        }
        return createReactElement('div', null, ...children)
    }

    function createImage(itemProps) {
        return createReactElement(
            'img', {
                src: itemProps.src,
                alt: itemProps.title,
                itemProp: 'contentURL',
                width: itemProps.width,
                height: itemProps.height
            })
    }

    function createImageWithLink(itemProps) {
        return createReactElement(
            'a', {
                href: itemProps.href,
                target: itemProps.target
            },
            createImage(itemProps))
    }

    function createGalleryItem(itemProps) {
        const image = itemProps.href ? createImageWithLink(itemProps) : createImage(itemProps)
        const imageInfo = createImageInfo(itemProps)
        return createReactElement(
            'th', {
                key: itemProps.id,
                id: itemProps.id,
                itemScope: true,
                itemType: 'http://schema.org/ImageObject',
                style: {
                    verticalAlign: 'middle'
                }
            },
            image, imageInfo)
    }

    function createItemsRow(itemsProps, key) {
        return createReactElement(
            'tr', {
                key
            },
            _.map(itemsProps, itemProps => createGalleryItem(itemProps)))
    }

    function createTableBody(props) {
        const itemsByRow = divideItemsToRows(props)
        return createReactElement(
            'tbody',
            null,
            _.map(itemsByRow, (itemsProps, rowNum) => createItemsRow(itemsProps, rowNum)))
    }
}

const santaTypes = createSantaTypesDefinitions({
    renderImageZoomLink: PropTypes.func,
    renderLink: PropTypes.func
}, 'gallerySeoHOC')

gallerySeoHOC.santaTypeDefinitions = santaTypes
gallerySeoHOC.propTypes = {
    renderImageZoomLink: santaTypes.renderImageZoomLink.isRequired,
    renderLink: santaTypes.renderLink.isRequired
}

module.exports = gallerySeoHOC