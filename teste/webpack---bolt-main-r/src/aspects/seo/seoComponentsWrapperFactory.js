module.exports = {
    initSeoWrapper: boltComponents => (baseClass, componentType) => {
        const tpaCompTypes = [
            'wysiwyg.viewer.components.tpapps.TPASection',
            'wysiwyg.viewer.components.tpapps.TPAMultiSection',
            'wysiwyg.viewer.components.tpapps.TPAWidget',
            'wysiwyg.viewer.components.tpapps.TPAGluedWidget'
        ]

        const galleryCompTypes = [
            'tpa.viewer.components.Masonry',
            'tpa.viewer.components.Honeycomb',
            'tpa.viewer.components.Freestyle',
            'tpa.viewer.components.Accordion',
            'tpa.viewer.components.Collage',
            'tpa.viewer.components.Impress',
            'tpa.viewer.components.StripShowcase',
            'tpa.viewer.components.StripSlideshow',
            'tpa.viewer.components.Thumbnails',
            'wysiwyg.viewer.components.tpapps.TPA3DGallery',
            'wysiwyg.viewer.components.tpapps.TPA3DCarousel'
        ]

        const wrappedBaseClass = tpaCompTypes.some(tpaType => tpaType === componentType) ?
            boltComponents.tpaSeoHOC(baseClass) :
            baseClass

        return galleryCompTypes.some(tpaType => tpaType === componentType) ?
            boltComponents.gallerySeoHOC(wrappedBaseClass) :
            wrappedBaseClass
    }
}