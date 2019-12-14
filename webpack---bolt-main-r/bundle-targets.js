const detectBrowser = require('detect-browser').detect

const modernTargetsConfig = {
    chrome: 60,
    firefox: 65,
    safari: 12,
    ios: 12,
    opera: 53
}

const MODERN_TARGETS = modernTargetsConfig
const OLD_TARGETS = '> 0.5%, last 2 versions, Firefox ESR, not dead, ie >= 11'

const isModernTarget = () => {
    const ua = detectBrowser()
    if (!ua) {
        return false
    }
    const {
        name,
        version
    } = ua
    const minSpecifiedVersion = modernTargetsConfig[name]
    return minSpecifiedVersion !== undefined && parseFloat(version) >= minSpecifiedVersion
}

const getTargetsForEnv = env => {
    switch (env) {
        // always transpile to current node for tests
        case 'test':
        case 'carmi':
            return 'current node'
            // transpile to modern browsers for faster development
        case 'development':
        case 'modern':
            return MODERN_TARGETS
            // transpile to all browsers for faster development
        case 'production':
        case 'old':
        default:
            return OLD_TARGETS
    }
}

module.exports = {
    modernTargetsConfig,
    getTargetsForEnv,
    isModernTarget
}