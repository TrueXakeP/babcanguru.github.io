'use strict'
const templates = require('./svgFiltersTemplates')
const presets = require('./svgFilterPresets')

/**
 * Get a filter (SVG filter) string from filters list
 * @param {string} id
 * @param {string} name
 * @param {object} [overrides]
 * @returns {string} a compiled filter template
 */
function getFilter(id, name, overrides) {
    const filter = presets[name] || []
    return templates.interpolate(id, filter, overrides || {})
}

/**
 * Get an SVG shadow filter effect
 * @param {string} id
 * @param {{x: number, y: number, blur: number, color: string, opacity: number}} shadow
 * @return {string}
 */
function getShadow(id, shadow) {
    return templates.interpolate(id, [{
        key: 'shadow',
        value: shadow
    }], {})
}

/**
 * Get a filter properties
 * @param {string} name
 * @param {Object} overrides
 * @return {Object[]}
 */
function getProperties(name, overrides) {
    const filter = presets[name] || []
    return templates.getProperties(filter, overrides || {})
}

/**
 * checks if filter key exists
 * @param effectName
 * @returns {boolean}
 */
function isFilterExists(effectName) {
    return effectName in presets
}

module.exports = {
    getFilter,
    getProperties,
    getShadow,
    isFilterExists
}