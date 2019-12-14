'use strict'

module.exports = function(rgba, opacity) {
    if (rgba !== 'transparent') {
        opacity /= 100
        const rgbaParts = rgba.split(',')
        const prevAlpha = parseFloat(rgbaParts[3])
        const prevValueWithoutAlpha = `${rgbaParts[0]},${rgbaParts[1]},${rgbaParts[2]}`

        const newAlpha = prevAlpha + opacity > 1 ? 1 : parseFloat((prevAlpha + opacity).toFixed(2))
        return `${prevValueWithoutAlpha}, ${newAlpha})`
    }
    return rgba
}