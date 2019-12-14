const _ = require('lodash')

module.exports = {
    parseJSON: val => {
        try {
            return val && JSON.parse(val)
        } catch (e) {
            return null
        }
    },
    stringifyJSON: val => val && JSON.stringify(val),
    isString: _.isString,
    split: (str, delimiter) => str.split(delimiter),
    toLowerCase: str => str.toLowerCase()
}