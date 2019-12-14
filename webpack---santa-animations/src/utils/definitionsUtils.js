'use strict'

/**
 * Get clipPath values by direction
 * @param {{top: number, left: number, width: number, height: number}} compRect Component bounding rect
 * @param {{top: number, left: number, width: number, height: number}} contentRect Component children bounding rect
 * @param {'initial'|'top'|'left'|'bottom'|'right'|'center'} direction
 * @param {number} [scaleX=1]
 * @param {number} [scaleY=1]
 * @param {number} [minimum=0]
 * @returns {{clipPath: string}}
 */
function getClipParams(compRect, contentRect, direction, {
    scaleX = 1,
    scaleY = 1,
    minimum = 0
} = {}) {
    const top = (contentRect.top - compRect.top) / compRect.height * 100 + (1 - scaleY) / 2 * 100
    const left = (contentRect.left - compRect.left) / compRect.width * 100 + (1 - scaleX) / 2 * 100
    const right = (contentRect.width / compRect.width * 100 + left) - (1 - scaleX) * 100 // eslint-disable-line no-extra-parens
    const bottom = (contentRect.height / compRect.height * 100 + top) - (1 - scaleY) * 100 // eslint-disable-line no-extra-parens
    const center = `${(right + left) / 2}% ${(bottom + top) / 2}%`

    const clipParams = {
        initial: `${left}% ${top}%, ${right}% ${top}%, ${right}% ${bottom}%, ${left}% ${bottom}%`,
        top: `${left}% ${top}%, ${right}% ${top}%, ${right}% ${top + minimum}%, ${left}% ${top + minimum}%`,
        right: `${right - minimum}% ${top}%, ${right}% ${top}%, ${right}% ${bottom}%, ${right - minimum}% ${bottom}%`,
        center: `${center}, ${center}, ${center}, ${center}`,
        bottom: `${left}% ${bottom - minimum}%, ${right}% ${bottom - minimum}%, ${right}% ${bottom}%, ${left}% ${bottom}%`,
        left: `${left}% ${top}%, ${left + minimum}% ${top}%, ${left + minimum}% ${bottom}%, ${left}% ${bottom}%`
    }

    return {
        webkitClipPath: `polygon(${clipParams[direction]})`,
        clipPath: `polygon(${clipParams[direction]})`
    }
}
/**
Inset implementation, can't use because of GSAP bug https://github.com/greensock/GreenSock-JS/issues/299
 **/
/*
function getClipParams(compRect, contentRect, direction, {scaleX = 1, scaleY = 1, minimum = 0} = {}) {
    const {width, height} = contentRect
    const top = compRect.top - contentRect.top
    const left = compRect.left - contentRect.left
    const right = compRect.width - contentRect.width
    const bottom = compRect.height - contentRect.height

    const clipParams = {
        initial: `${top}px ${right}px ${bottom}px ${left}px`,
        top: `${top}px ${right}px ${height * (1 - minimum)}px ${left}px`,
        right: `${top}px ${right}px ${bottom}px ${width * (1 - minimum)}px`,
        center: `${(width - left) / 2}px ${(height - top) / 2}px`,
        bottom: `${height * (1 - minimum)}px ${right}px ${bottom}px ${left}px`,
        left: `${top}px ${width * (1 - minimum)}px ${bottom}px ${left}px`
    }

    return {
        webkitClipPath: `inset(${clipParams[direction]})`,
        clipPath: `inset(${clipParams[direction]})`
    }
}
*/

/**
 * Get ScaleX and ScaleY params for ClipPath fallback
 * @param direction
 * @returns {{}}
 */
function getClipFallbackParams(direction) {
    const fallbackParams = {
        initial: {
            scaleX: 1,
            scaleY: 1
        },
        top: {
            scaleX: 1,
            scaleY: 0
        },
        right: {
            scaleX: 0,
            scaleY: 1
        },
        center: {
            scaleY: 0,
            scaleX: 0
        },
        bottom: {
            scaleX: 1,
            scaleY: 0
        },
        left: {
            scaleX: 0,
            scaleY: 1
        }
    }

    return fallbackParams[direction]
}

/**
 * Adjust direction by angle from predefined list
 * @param {object<{idx: number}>} paramsMap A map of maximum 4 directions
 * @param {string} direction A direction as a key of paramsMap
 * @param {number} angle Angle in degrees
 * @returns {string}
 */
function getAdjustedDirection(paramsMap, direction, angle) {
    const directions = Object.keys(paramsMap)
    const index = paramsMap[direction].idx
    const shiftBy = Math.round(angle / 90)
    const newIndex = (index + (directions.length - 1) * shiftBy) % directions.length // eslint-disable-line no-mixed-operators
    return directions[newIndex]
}

// Transforms for clip

/**
 * Transform position to compensate existing rotate and transformOrigin
 * @param {{x: string, y: string}} origin in percent
 * @param {{top: number, left: number, width: number, height: number}} compRect
 * @param {number} angleInRad
 * @returns {{x: number, y: number}}
 */
function getElementTransformedPosition(origin, compRect, angleInRad) {
    const centerX = compRect.width / 2
    const centerY = compRect.height / 2

    const originX = compRect.width * parseInt(origin.x, 10) / 100
    const originY = compRect.height * parseInt(origin.y, 10) / 100

    const toX = centerX - centerX * Math.cos(angleInRad) + centerY * Math.sin(angleInRad) // eslint-disable-line no-mixed-operators
    const toY = centerY - centerX * Math.sin(angleInRad) - centerY * Math.cos(angleInRad) // eslint-disable-line no-mixed-operators

    const fromX = originX - originX * Math.cos(angleInRad) + originY * Math.sin(angleInRad) // eslint-disable-line no-mixed-operators
    const fromY = originY - originX * Math.sin(angleInRad) - originY * Math.cos(angleInRad) // eslint-disable-line no-mixed-operators

    const x = toX - fromX
    const y = toY - fromY

    return {
        x,
        y
    }
}

/**
 *
 * @param {{top: number, left: number, width: number, height: number}} compRect
 * @param {{top: number, left: number, width: number, height: number}} contentRect
 * @param {{x: string, y: string}} origin in percent
 * @returns {string} XXpx YYpx
 */
function getTransformOriginTweenParams(compRect, contentRect, origin) {
    const x = contentRect.left + contentRect.width * (parseInt(origin.x, 10) / 100) - compRect.left // eslint-disable-line no-mixed-operators
    const y = contentRect.top + contentRect.height * (parseInt(origin.y, 10) / 100) - compRect.top // eslint-disable-line no-mixed-operators

    return `${x}px ${y}px`
}

/**
 *
 * @param {{top: number, left: number, width: number, height: number}} contentRect
 * @param {{dx: number, dy: number}} originDirection (1, 0 ,-1)
 * @param {number} angleInRad
 * @param {number} [scale=1]
 * @returns {{x: number, y: number}}
 */
function getTransformTweenParams(contentRect, originDirection, angleInRad, scale = 1) {
    const width = contentRect.width * scale
    const height = contentRect.height * scale

    const x = originDirection.dy * height * Math.sin(-angleInRad) + originDirection.dx * width * Math.cos(angleInRad) // eslint-disable-line no-mixed-operators
    const y = originDirection.dy * height * Math.cos(-angleInRad) + originDirection.dx * width * Math.sin(angleInRad) // eslint-disable-line no-mixed-operators

    return {
        x,
        y
    }
}

/**
 * x' = x * cos (a) - y * sin (a)
 * y' = x * sin (a) + y * cos (a)
 * @param x
 * @param y
 * @param angleInDeg
 * @returns {{x: number, y: number}}
 */
function translatePoint(x, y, angleInDeg) {
    const angle = angleInDeg * Math.PI / 180
    return {
        x: x * Math.cos(angle) - y * Math.sin(angle), // eslint-disable-line no-mixed-operators
        y: x * Math.sin(angle) + y * Math.cos(angle) // eslint-disable-line no-mixed-operators
    }
}

// Modes calculations

function calculateScaleDeviation(compRect, from) {
    const to = {
        width: compRect.width,
        height: compRect.height
    }

    return {
        x: (from.width - to.width) / 2,
        y: (from.height - to.height) / 2
    }
}

function getPositionParams(compRect, from, calculateScale = false) {
    const defaultScale = {
        x: 0,
        y: 0
    }
    const scaleDeviation = calculateScale ? calculateScaleDeviation(compRect, from) : defaultScale

    const x = from.left - compRect.left + scaleDeviation.x
    const y = from.top - compRect.top + scaleDeviation.y

    return {
        x,
        y
    }
}

function getScaleParams(compRect, from) {
    const scaleX = from.width / compRect.width
    const scaleY = from.height / compRect.height

    return {
        scaleX,
        scaleY
    }
}

function getElementsAsArray(obj) {
    if (!obj) {
        return []
    }
    if (typeof obj === 'string' || typeof obj.length === 'undefined' && typeof obj[Symbol.iterator] !== 'function') {
        return [obj]
    }
    return Array.from(obj)
}

module.exports = {
    getClipParams,
    getClipFallbackParams,
    getAdjustedDirection,
    getPositionParams,
    getScaleParams,
    getElementTransformedPosition,
    getTransformOriginTweenParams,
    getTransformTweenParams,
    translatePoint,
    getElementsAsArray
}