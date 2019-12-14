const PRECONNECTS = {
    'Wix Blog': {},
    'Wix Forum': {},
    'Wix Bookings': {},
    'Wix Video': {
        topology: 'basePublicUrl'
    },
    'Wix Restaurants Menus': {},
    'Wix Get Subscribers': {
        widgetId: '1375babd-6f2b-87ed-ff19-5778602c8b86'
    },
    'Instagram Feed': {
        widgetId: '14635280-8c8d-5346-b643-691f84f48973'
    },
    'Wix Events': {
        widgetId: '1440e92d-47d8-69be-ade7-e6de40127106'
    },
    'Wix FAQ': {
        widgetId: '14c92de1-0e02-cbe5-98e9-c3de44d63a55'
    }
}

function resourceHint(document, rel, url, {
    as,
    crossorigin
} = {}) {
    const link = document.createElement('link')
    link.setAttribute('rel', rel)
    link.setAttribute('href', url)
    if (as) {
        link.setAttribute('as', as)
    }
    if (crossorigin) {
        link.setAttribute('crossorigin', crossorigin)
    }
    return document.head.appendChild(link)
}

function preload(document, url) {
    return resourceHint(document, 'preload', url, {
        as: 'script',
        crossorigin: 'anonymous'
    })
}

function preconnectApp(document, serviceTopology, spec) {
    const preconnect = PRECONNECTS[spec.appDefinitionName]
    if (preconnect) {
        const {
            topology
        } = preconnect
        let url = serviceTopology[topology]
        if (!url) {
            const {
                widgetId
            } = preconnect
            if (widgetId && spec.widgets) {
                const widget = spec.widgets[widgetId]
                if (widget) {
                    url = widget.widgetUrl || widget.mobileUrl
                }
            }
            if (!url) {
                url = spec.sectionUrl || spec.sectionMobileUrl
                if (!url && spec.appWorkerUrl) {
                    url = spec.appWorkerUrl.replace(/[^/]+$/, '')
                }
            }
        }
        if (url) {
            resourceHint(document, 'preconnect', url)
        }
    }
}

function preloadPackage(document, requirejs, name) {
    if (requirejs && requirejs.toUrl) {
        preload(document, `${requirejs.toUrl(name)}.js`)
    }
}

export function resourceHints(chunkNames, {
    document
}, boltBase, rendererModel, serviceTopology, requirejs) {
    chunkNames.map(name => `${boltBase}/bolt-main/app/bolt-main-r.${name}.js`).forEach(preload.bind(this, document))
    preloadPackage(document, requirejs, 'bolt-main')

    if (rendererModel) {
        const {
            clientSpecMap
        } = rendererModel
        if (clientSpecMap) {
            const specs = Object.values(clientSpecMap)
            specs.forEach(preconnectApp.bind(this, document, serviceTopology))
        }
    }
}

export function resourceHintsExtra({
    document
}, requirejs, experimentInst) {
    preloadPackage(document, requirejs, 'santa-components')
    if (!experimentInst.isOpen('bv_initialize_host_instance_with_warmup_utils')) {
        preloadPackage(document, requirejs, 'warmupUtils')
    }
    preloadPackage(document, requirejs, 'skins')
    preloadPackage(document, requirejs, 'layout')
    preloadPackage(document, requirejs, 'bolt-components')
}