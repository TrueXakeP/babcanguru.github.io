const _ = require('lodash')

class MemoryStorage {
    setItem(key, value) {
        this[key] = String(value)
    }
    getItem(key) {
        return this[key] || null
    }
    removeItem(key) {
        delete this[key]
    }
    clear() {
        Object.keys(this)
            .forEach(key => this.removeItem(key))
    }
    toJSON() {
        return this.storage.toJSON()
    }
}

const prefix = 'platform_app_'

function getScopedValues(storage) {
    const scopedValues = {}
    const filteredKeys = Object.keys(storage).filter(keyName => typeof keyName === 'string' && _.startsWith(keyName, prefix))
    for (const keyName of filteredKeys) { //eslint-disable-line no-restricted-syntax
        scopedValues[keyName.replace(prefix, '')] = storage.getItem(keyName)
    }
    return scopedValues
}

module.exports = {
    get: (storageEnabled = false) => {
        const storageObject = storageEnabled ? {
            localStorage: window.localStorage,
            sessionStorage: window.sessionStorage,
            memoryStorage: new MemoryStorage()
        } : {
            localStorage: new MemoryStorage(),
            sessionStorage: new MemoryStorage(),
            memoryStorage: new MemoryStorage()
        }
        return {
            serialize() {
                return JSON.stringify({
                    local: getScopedValues(storageObject.localStorage),
                    session: getScopedValues(storageObject.sessionStorage),
                    memory: getScopedValues(storageObject.memoryStorage)
                })
            },
            setItem(type, key, value) {
                storageObject[type].setItem(prefix + key, value)
            }
        }
    }
}