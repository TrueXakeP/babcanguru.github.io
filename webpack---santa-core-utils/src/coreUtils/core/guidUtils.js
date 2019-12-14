'use strict'
const _ = require('lodash')
const seedrandom = require('seedrandom/lib/alea')
const GUID_FORMAT = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'
const _state = {
    lastGeneratedId: undefined,
    counter: 0
}
const hashUtils = require('./hashUtils')

const stringHash = str => {
    let hash = 5381,
        i = str.length

    while (i) {
        hash = hash * 33 ^ str.charCodeAt(--i)
    }
    return hash >>> 0
}

function randOrSeed(max, bucket) {
    return Seed.shouldUseSeed ? getSeedNextInteger(bucket) % max : Math.random() * max | 0
}

function randomizeChar(c, {
    bucket
} = {}) {
    const r = randOrSeed(16, bucket),
        v = c === 'x' ? r : r & 0x3 | 0x8
    return v.toString(16)
}

function getRandomLowercaseLetter({
    bucket
} = {}) {
    return String.fromCharCode(97 + randOrSeed(26, bucket))
}

function _getUniqueId(state, prefix, prefixDelimiter, dateNow) {
    prefix = prefix || ''
    prefixDelimiter = prefixDelimiter || ''
    const value = dateNow
    if (value === state.lastGeneratedId) {
        state.counter++
    } else {
        state.lastGeneratedId = value
        state.counter = 0
    }
    return prefix + prefixDelimiter + Number(state.lastGeneratedId).toString(36) + (state.counter || '')
}

const Seed = {
    initialSeed: 0,
    shouldUseSeed: false,
    currentVal: 0,
    srand: new seedrandom(0)
}

function setInitialSeed(initialSeed) {
    if (initialSeed === false) {
        Seed.shouldUseSeed = false
        return
    }

    Object.keys(Seed).forEach(key => delete Seed[key]) //reset all buckets
    Seed.initialSeed = initialSeed
    Seed.currentVal = 0
    Seed.shouldUseSeed = true
    Seed.srand = new seedrandom(initialSeed)
}

function getInitialSeed() {
    return Seed.initialSeed
}

function getSeedNextInteger(bucket) {
    if (bucket) {
        if (!_.get(Seed, [bucket, 'currentVal'])) {
            _.set(Seed, [bucket, 'currentVal'], stringHash(bucket))
        }
    }

    return Seed.initialSeed + (bucket ? ++Seed[bucket].currentVal : ++Seed.currentVal)
}

function getUniqueId(prefix, prefixDelimiter, {
    bucket
} = {}) {
    return _getUniqueId(_state, prefix, prefixDelimiter, Seed.shouldUseSeed ? getSeedNextInteger(bucket) : Date.now())
}

/**
 * @param {number} seed
 * @returns {{getUniqueId: (function(*=, *=): *)}}
 */
function getUniqueIdGenerator(seed) {
    let generatedIdCount = 0
    return {
        getUniqueId: (prefix, prefixDelimiter) => {
            const id = [seed, Number(generatedIdCount++).toString(36)].join('-')
            return [prefix, prefixDelimiter, id].join('')
        }
    }
}


/**
 * This is the same getGUID algorithm as in old client - we need this for BI, to keep a GUID in the normal GUID format
 * originally from http://stackoverflow.com/a/2117523
 */
function getGUID() {
    return GUID_FORMAT.replace(/[xy]/g, c => randomizeChar(c, {
        bucket: 'getGUID'
    }))
}

/**
 * Generate a page id
 *
 * @param {Array.string} existingPageIds array of existing page ids
 * @returns {*}
 */
function generateNewPageId(existingPageIds) {
    const pageIdBucket = {
        bucket: 'newPageId'
    }
    const generatedId = getRandomLowercaseLetter(pageIdBucket) +
        randOrSeed(36, pageIdBucket).toString(36) +
        randOrSeed(36, pageIdBucket).toString(36) +
        randOrSeed(36, pageIdBucket).toString(36) +
        randOrSeed(36, pageIdBucket).toString(36)
    if (_.includes(existingPageIds, generatedId)) {
        return this.generateNewPageId(existingPageIds)
    }
    return generatedId
}


/**
 * Generate a popup id
 *
 * @param {Array.string} existingPageIds array of existing page ids
 * @param {Array.string} popupIds array of existing popup ids
 * @returns {*}
 */
function generateNewPopupId(existingPageIds, popupIds) {
    const lastId = _(popupIds).sortBy().last()
    let newPopupId

    if (lastId) {
        newPopupId = lastId
        do {
            newPopupId = increaseId(newPopupId)
        } while (_.includes(existingPageIds, newPopupId))
        return newPopupId
    }
    return this.generateNewPageId(existingPageIds)

    function increaseId(id, charPos) {
        charPos = _.isUndefined(charPos) ? id.length - 1 : charPos
        let charCode = id.charCodeAt(charPos)

        if (charCode > 121) {
            id = increaseId(id, charPos - 1)
            charCode = 47
        } else if (charCode > 56 && charCode < 96) {
            charCode = 96
        }

        return id.substr(0, charPos) + String.fromCharCode(charCode + 1) + id.substr(charPos + 1)
    }
}

function nameUUIDFromString(str) {
    const digest = hashUtils.SHA256.hex_sha256(_.toString(str))
    return GUID_FORMAT.replace(/[xy]/g, (match, offset) =>
        match === 'x' ? digest[offset] : '89ab' [parseInt(digest[30], 16) % 4])
}

function random() {
    return Seed.shouldUseSeed ? Seed.srand() : Math.random()
}

module.exports = {
    random,
    getUniqueId,
    getUniqueIdGenerator,
    _getUniqueId,
    getGUID,
    generateNewPageId,
    generateNewPopupId,
    nameUUIDFromString,
    setInitialSeed,
    getInitialSeed
}