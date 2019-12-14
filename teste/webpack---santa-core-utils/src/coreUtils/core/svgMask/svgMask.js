'use strict'

function getMask(maskId, svgId, svg, attributes, isClip) {
    const {
        width,
        height,
        x,
        y,
        transform,
        style
    } = attributes
    const transformStr = transform ? ` transform="${transform}"` : ''
    const styleStr = style ? ` style="${style}"` : ''
    return `${isClip ? `<style>#${svgId} * {fill: #fff; stroke: #fff; stroke-width: 0;}</style>` : ''}
<mask id="${maskId}">
    <use id="${svgId}-use" xlink:href="#${svgId}" width="${width}" height="${height}" x="${x}" y="${y}"${transformStr}${styleStr}></use>
</mask>
${svg}
`
}

module.exports = {
    getMask
}