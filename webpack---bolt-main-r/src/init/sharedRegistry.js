import layoutUtils from 'carmi-host-extensions/src/layout/layoutUtils'

// remember to mark these libs as externals in bolt main webpack.config.js
const init = () => {
    window.define('layout-utils', [], () => layoutUtils)
    if (window.customElementsPackage && window.customElementsPackage.loadedModules) {
        Object.keys(window.customElementsPackage.loadedModules).forEach(moduleName =>
            window.define(moduleName, [], () => window.customElementsPackage.loadedModules[moduleName])
        )
    }
}

export {
    init
}