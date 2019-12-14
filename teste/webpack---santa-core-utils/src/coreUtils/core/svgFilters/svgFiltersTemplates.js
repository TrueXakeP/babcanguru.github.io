'use strict'
const {
    hex2RgbNorm,
    getAlpha,
    getDoutone,
    getColor,
    getTint,
    getLumaMatrix,
    getBrightness,
    getSepia,
    getContrast
} = require('./svgFiltersParts')


function filterWrapperTemplate({
    id,
    content
}) {
    // the redundant identity <feComponentTransfer/> in start and end
    // are for fixing old Webkit bug that caused it to ignore color-interpolation-filters="sRGB"
    return `<filter id="${id}" color-interpolation-filters="sRGB">
    <feComponentTransfer result="srcRGB"/>
    ${content}
    <feComponentTransfer/>
</filter>`
}

function identity({
    inAttr
}) {
    return `<feColorMatrix ${inAttr ? `in="${inAttr}"` : ''}/>`
}

function contrast({
    value
}) {
    return `<feComponentTransfer>${getContrast(value)}</feComponentTransfer>`
}

function brightness({
    value,
    result
}) {
    return `<feComponentTransfer ${result ? `result="${result}"` : ''}>${getBrightness(value)}</feComponentTransfer>`
}

function saturation({
    value,
    inAttr,
    result
}) {
    return `<feColorMatrix type="saturate" values="${value}" ${inAttr ? `in="${inAttr}"` : ''}${result ? `result="${result}"` : ''}/>`
}

function sepia({
    value
}) {
    return `<feColorMatrix type="matrix" values="${getSepia(value)}"/>`
}

function hue({
    value
}) {
    return `<feColorMatrix type="hueRotate" values="${value}"/>`
}

function color({
    value,
    inAttr,
    result
}) {
    const hexColor = typeof value === 'string' ? value : value.color
    const opacity = typeof value.opacity === 'undefined' ? 1 : value.opacity

    return `<feColorMatrix type="matrix" values="${getColor(hex2RgbNorm(hexColor), opacity)}" ${inAttr ? `in="${inAttr}"` : ''}${result ? `result="${result}"` : ''}/>`
}

function tint({
    value
}) {
    return `<feColorMatrix type="matrix" values="${getTint(hex2RgbNorm(value))}"/>`
}

function blur({
    value,
    inAttr
}) {
    return `<feGaussianBlur stdDeviation="${value}" ${inAttr ? `in="${inAttr}"` : ''}/>`
}

function alpha({
    value,
    inAttr,
    result
}) {
    return `<feComponentTransfer ${inAttr ? `in="${inAttr}"` : ''}${result ? `result="${result}"` : ''}>${getAlpha(value)}</feComponentTransfer>`
}

function offset({
    value,
    inAttr,
    result
}) {
    return `<feOffset dx="${value.x}" dy="${value.y}" ${inAttr ? `in="${inAttr}"` : ''}${result ? `result="${result}"` : ''}/>`
}

function blend({
    value,
    inAttr,
    in2Attr,
    result
}) {
    return `<feBlend mode="${value}" in="${inAttr}" in2="${in2Attr}" ${result ? `result="${result}"` : ''}/>`
}

function composite({
    value,
    inAttr,
    in2Attr,
    result
}) {
    return `<feComposite operator="${value}" in="${inAttr}" in2="${in2Attr}" ${result ? `result="${result}"` : ''}/>`
}

function duotone({
    value: {
        dark,
        light
    },
    inAttr,
    result
}) {
    return `${saturation({value: 0})}
<feColorMatrix type="matrix" values="${getDoutone(hex2RgbNorm(light), hex2RgbNorm(dark))}" ${inAttr ? `in="${inAttr}"` : ''}${result ? `result="${result}"` : ''}/>`
}

function luma({
    value: {
        dark,
        light
    },
    result
}) {
    return `<feColorMatrix type="matrix" values="${getLumaMatrix(light, dark)}" ${result ? `result="${result}"` : ''}/>`
}

function shadow({
    value: {
        x,
        y,
        blurRadius,
        color: hexColor,
        opacity
    }
}) {
    return `${blur({value: blurRadius, inAttr: 'SourceAlpha'})}
${offset({value: {x, y}})}
${color({value: {color: hexColor, opacity}})}
<feMerge>
    <feMergeNode/>
    <feMergeNode in="SourceGraphic"/>
</feMerge>`
}

const filterComponentTempaltes = {
    identity,
    contrast,
    brightness,
    sepia,
    saturation,
    hue,
    tint,
    color,
    blur,
    alpha,
    offset,
    blend,
    composite,
    duotone,
    luma,
    shadow
}

function getValue(key, value, overrides = {}) {
    if (key === 'duotone') {
        return {
            light: overrides.duotoneLight || value.light,
            dark: overrides.duotoneDark || value.dark
        }
    } else if (key in overrides) {
        return overrides[key]
    }

    return value
}

function interpolate(id, filterDefinition, overrides) {
    const content = filterDefinition.map(effect => {
        const key = effect.key
        const value = getValue(key, effect.value, overrides)

        return filterComponentTempaltes[key]({ ...effect,
            value
        })
    }).join('\n')

    return filterWrapperTemplate({
        id,
        content
    })
}

function getProperties(filterDefinition, overrides) {
    return filterDefinition.map(effect => {
        const key = effect.key
        const value = getValue(key, effect.value, overrides)

        return {
            [key]: value
        }
    })
}

/**
 * https://docs.webplatform.org/wiki/svg/tutorials/smarter_svg_filters
 * @type {{interpolate:function, getProperties:function}}
 */
module.exports = {
    interpolate,
    getProperties
}