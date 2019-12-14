/*eslint fp/no-mutation:0*/
const santaOptions = require('wix-santa/dist/options')
const {
    unpkgOrNode
} = require('santa-main-r/lib/lib/common/rjs-config-utils')
const getViewerRjsConfig = require('santa-main-r/lib/lib/viewer/get-rjs-config').default
const PackagesUtil = require('santa-main-r/lib/lib/common/PackagesUtil').default
const boltOptions = require('../gen/options')
const packagesList = require('wix-santa/dist/packagesList.json') // TODO get from node_modules/wix-santa/packages-bin/hashManifest.json?
const {
    isModernTarget
} = require('../bundle-targets')

const fixSantaPaths = (paths, santaBase) =>
    Object.keys(paths).reduce((acc, k) => {
        const def = paths[k]
        if (/^(?:\/\/)|(?:http)/.test(def)) {
            return { ...acc,
                [k]: def
            }
        }

        const nodeModule = /node_modules\/(.*?)\//.exec(def)
        const moduleName = nodeModule ? nodeModule[1] : k
        const isBoltModule = boltOptions.versions[moduleName]
        return { ...acc,
            [k]: isBoltModule ? def : `${santaBase}/${def}`
        }
    }, {})

/**
 * @param {string} boltBase
 * @param {string} santaBase santa base url or local path
 * @param serviceTopology
 * @param {object} configOptions
 * @param experiments
 * @param logger
 * @returns {*}
 */
const getRjsConfig = (boltBase, santaBase, serviceTopology, configOptions = {}, experiments, logger) => {
    const {
        local = false,
            debug = false,
            santaPackagesToDebug = [],
            ds = false
    } = configOptions

    const debugQuery = santaPackagesToDebug.length > 0 ? `debug=${santaPackagesToDebug.join(',')}` : ''
    const packagesUtil = new PackagesUtil(packagesList, debugQuery)
    const viewerRjsConfig = getViewerRjsConfig({ ...santaOptions.versions,
        ...boltOptions.versions
    }, serviceTopology, local, experiments)
    const {
        paths,
        packages,
        map,
        shim,
        bundles
    } = packagesUtil.buildConfig(viewerRjsConfig)

    const _unpkg = unpkgOrNode.bind(null, boltOptions.versions, local)

    const pr = process.env.DEV_SERVER === 'true' ? '' : 'bolt-main/app/'
    const isProd = process.env.BOLT_ENV === 'production' || !debug
    const mode = isProd ? 'prod' : 'devel'
    const dsSuffix = ds ? '-ds' : ''
    let modernSuffix = ''
    if (isProd) {
        const shouldUseModernBundle = isModernTarget() && experiments && experiments.isOpen('useModernBundle')
        modernSuffix = shouldUseModernBundle ? '' : '-old'
        if (logger) {
            logger.setGlobalsForErrors({
                tags: {
                    modernBundle: shouldUseModernBundle
                }
            })
        }
    }

    return {
        baseUrl: boltBase,
        paths: {
            ...fixSantaPaths(paths, santaBase),
            'bolt-main': `${pr}bolt-main${dsSuffix}-${mode}${modernSuffix}`,
            'bolt-main-responsive': `${pr}bolt-main-responsive${dsSuffix}-${mode}${modernSuffix}`,
            'bolt-components': _unpkg('bolt-components', 'dist/bolt-components'),
            'wix-dom-sanitizer': _unpkg('wix-dom-sanitizer', 'dist/wix-dom-sanitizer')
        },
        packages: packages.map(p => ({ ...p,
            location: `${santaBase}/${p.location}`
        })),
        map,
        shim,
        bundles,
        waitSeconds: 0
    }
}

module.exports = {
    getRjsConfig
}