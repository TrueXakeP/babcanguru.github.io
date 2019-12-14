const {
    compTypeToPackages
} = require('../compsToPackages')

const PACKAGES_CALLBACKS_MAP = {
    facebookShare: (facebookShareComp, registerComponent) => {
        registerComponent('wysiwyg.viewer.components.FacebookShare', facebookShareComp, true)
    },
    svgShape: (svgShapeComps, registerComponent) => {
        const {
            svgShape,
            vectorImage,
            popupCloseIconButton
        } = svgShapeComps
        registerComponent('wysiwyg.viewer.components.svgshape.SvgShape', svgShape)
        registerComponent('wysiwyg.viewer.components.VectorImage', vectorImage)
        registerComponent('wysiwyg.viewer.components.PopupCloseIconButton', popupCloseIconButton)
    },
    imageZoom: (imageZoomComps, registerComponent) => {
        const {
            imageZoom,
            imageZoomDisplayer,
            mediaZoom,
            mobileMediaZoom,
            touchMediaZoom,
            touchMediaZoomItem
        } = imageZoomComps
        registerComponent('wysiwyg.components.imageZoom', imageZoom)
        registerComponent('wysiwyg.components.ImageZoomDisplayer', imageZoomDisplayer)
        registerComponent('wysiwyg.viewer.components.MediaZoom', mediaZoom)
        registerComponent('wysiwyg.viewer.components.MobileMediaZoom', mobileMediaZoom)
        registerComponent('wysiwyg.viewer.components.TouchMediaZoom', touchMediaZoom)
        registerComponent('wysiwyg.viewer.components.TouchMediaZoomItem', touchMediaZoomItem)
    },
    slideShowGallery: (slideShowGalleryComp, registerComponent) => {
        registerComponent('wysiwyg.viewer.components.SlideShowGallery', slideShowGalleryComp, true)
    },
    'santa-components/popover': (popoverAssets, registerComponent) => {
        const {
            Component
        } = popoverAssets
        registerComponent('wysiwyg.viewer.components.Popover', Component)
    },
    'santa-components': ({
        components
    }, registerComponent, invalidate) => {
        //This is a hack: We need to invalidate the masterpage so that it will get recreated when we have extensions loaded.
        invalidate(components.MasterPage.compType)
        Object.values(components)
            .filter(comp => comp.compType && !comp.compType.includes('PageGroup')) //PageGroup is registered through bolt-components
            .forEach(comp => {
                registerComponent(comp.compType, comp)
                return comp.compType
            })
    },

    inlinePopup: (inlinePopupAssets, registerComponent) => {
        const {
            InlinePopup,
            MenuContainer,
            InlinePopupToggle,
            MenuToggle
        } = inlinePopupAssets
        registerComponent('wysiwyg.viewer.components.InlinePopup', InlinePopup)
        registerComponent('wysiwyg.viewer.components.InlinePopupToggle', InlinePopupToggle)
        registerComponent('wysiwyg.viewer.components.MenuContainer', MenuContainer)
        registerComponent('wysiwyg.viewer.components.MenuToggle', MenuToggle)
    },
    'bolt-components': (components, registerComponent) => Object.values(components)
        .filter(comp => comp.compType)
        .forEach(comp => {
            registerComponent(comp.compType, comp)
            return comp.compType
        })
}

const registerNewComponents = (compRegistrar, loadedPackages, boltInstance, invalidated = {}) => {
    const newlyRegisteredCompTypes = compRegistrar
        .keys()
        .filter(compType => !boltInstance.compClasses[compType] || invalidated[compType])
        .filter(compType => !compTypeToPackages[compType] || compTypeToPackages[compType].every(dep => loadedPackages[dep]))

    if (newlyRegisteredCompTypes.length) {
        newlyRegisteredCompTypes.forEach(componentType => {
            try {
                const compReactClass = compRegistrar.getCompReactClass(componentType, true, invalidated[componentType] === 'override' ? compRegistrar.generateRuntimeState() : null)
                boltInstance.updateCompClass(componentType, compReactClass)
            } catch (ex) {
                console.error('could not get component', componentType)
                boltInstance.updateCompClass(componentType, boltInstance.compClasses['mobile.core.components.Container'])
            }
        })
    }
}


const onPackageLoaded = (packageName, exports, compRegistrar, loadedPackages, boltInstance) => {
    const onCurrentPackageLoaded = PACKAGES_CALLBACKS_MAP[packageName]

    let invalidated
    if (onCurrentPackageLoaded) { // TODO @santa-ssr invoke once per server warmup
        invalidated = {}
        const invalidator = compType => {
            invalidated[compType] = 1
        }
        onCurrentPackageLoaded(exports, compRegistrar.register, invalidator)
    }

    registerNewComponents(compRegistrar, loadedPackages, boltInstance, invalidated)
}

const registerExternalComponent = ({
    santaComponent,
    componentType,
    component
}, {
    register
}, openExperiments) => {
    const componentToRegister = santaComponent || component
    if (componentToRegister) {
        register(componentType, componentToRegister)
        if (componentToRegister.componentOverride && openExperiments.includes(componentToRegister.componentOverride.viewerExperimentKey)) {
            register(componentToRegister.componentOverride.overrideViewerType, componentToRegister)
            return {
                [componentToRegister.componentOverride.overrideViewerType]: 'override'
            }
        }
    }
    return {}
    /*if (componentToRegister && componentToRegister.getComponentSkins) {
        skinRegistrar.addBatch(componentToRegister.getComponentSkins());
    }*/
}

const loadExternalComponent = (externalComponentsLoader, wixUiBase, compType, setExternalComponentPackage, compRegistrar, loadedPackages, boltInstance, openExperiments) => {
    let invalidated = {}

    externalComponentsLoader.load(compType, wixUiBase)
        .then(viewerBundles => {
            viewerBundles.forEach(viewerBundle => {
                invalidated = { ...invalidated,
                    ...registerExternalComponent(viewerBundle.default, compRegistrar, openExperiments)
                }
            })
            setExternalComponentPackage(viewerBundles)
            registerNewComponents(compRegistrar, loadedPackages, boltInstance, invalidated)
        })
    return compType
}

module.exports = {
    loadExternalComponent,
    onPackageLoaded
}