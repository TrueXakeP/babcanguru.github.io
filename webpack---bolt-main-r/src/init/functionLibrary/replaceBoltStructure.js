const _ = require('lodash')
/**
 * Determine whether or not to replace the entire structure and do so
 *
 * This function checks if there is a mismatch between `pagesVersion` and `boltInstance.viewModeSwitchCount`
 * If a mismatch exists it replaces the structure, sets viewModeSwitchCount to match `pagesVersion` and returns true
 * If not it returns false without doing anything
 *
 * @param boltInstance
 * @param initialPages
 * @param {boolean} isMobileView
 * @param {number} pagesVersion
 * @returns {boolean} Whether or not the structure was replaced
 */
module.exports = (boltInstance, initialPages, isMobileView, pagesVersion) => {
    const viewModeSwitchCount = boltInstance.viewModeSwitchCount
    if (pagesVersion === 1 || viewModeSwitchCount === pagesVersion) {
        return false
    }

    const pages = _.sortBy(initialPages, v => v.structure.masterPage ? 1 : 0) //see test BOLT-830
    const structure = _.merge(...pages.map(p => p.structure))
    boltInstance.$runInBatch(() => {
        boltInstance.replaceStructure(structure)
        boltInstance.setViewModeSwitchCount(pagesVersion)
        boltInstance.setIsMobileView(isMobileView)
    })
    return true
}