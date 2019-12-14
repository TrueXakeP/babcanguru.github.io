'use strict'

const parseValueByPropertyType = (value, type) => {
    switch (type) {
        case 'number':
            return parseFloat(value)
        case 'bool':
            return value === 'true'
        default:
            return value
    }
}

module.exports = parseValueByPropertyType