'use strict'
const {
    getElementsAsArray
} = require('../../utils/definitionsUtils')

const name = 'BaseRotate3D'
const properties = {}

/**
 * Safari (All versions) has a bug with css 3d transforms -
 * it requires the animated element parent to have it's own rendering context or else the 3d animations
 * intersect with the background and with each other.
 *
 * With this hack we add a counter for the parent element of the animated elements that keeps track on
 * how many 3d animations happen right now inside this parent.
 * in viewer.css we have this code:
 *
 *   [data-z-counter]{z-index:0;}
 *   [data-z-counter="0"]{z-index:auto;}
 *
 * that adds z-index to the parent while 3d animations are running.
 * @param parents
 */
function increment3dAnimationsCounter(parents) {
    parents.forEach(parent => {
        let zCounter = parent.getAttribute('data-z-counter')
        zCounter = zCounter ? Number(zCounter) : 0
        parent.setAttribute('data-z-counter', zCounter + 1)
    })
}

/**
 * This is the second part of the Safari hack, this time we decrement the counter after the animation is complete.
 * @param parents
 * @param sequence
 * @param engine
 */
function decrement3dAnimationsCounter(parents, sequence, engine) {
    parents.forEach(parent => sequence.add(engine.set(parent, {
        attr: {
            'data-z-counter': '-=1'
        },
        immediateRender: false
    })))
}

function register({
    engine,
    factory
} /*, frame*/ ) {
    /**
     * Rotate 3D animation object
     * @param {Array<HTMLElement>|HTMLElement} elements DOM elements
     * @param {Number} [duration=1.0]
     * @param {Number} [delay=0]
     * @param {Object} params
     * @param {Number} [perspective]
     * @param {Number} [params.from.rotationX] in Deg
     * @param {Number} [params.from.rotationY] in Deg
     * @param {Number} [params.from.rotationZ] in Deg
     * @param {Number} [params.to.rotationX] in Deg
     * @param {Number} [params.to.rotationY] in Deg
     * @param {Number} [params.to.rotationZ] in Deg
     * @returns {TimelineMax}
     */
    function animation(elements, duration = 0, delay = 0, {
        perspective,
        ...params
    } = {}) {
        const allowedParams = ['rotationX', 'rotationY', 'rotationZ']
        //TODO: We need to fix or css cleaning technique.
        //TODO: this setting is actually never read
        elements = getElementsAsArray(elements)
        const parents = new Set(elements.map(element => element.parentNode))
        const sequence = factory.sequence()

        increment3dAnimationsCounter(parents)

        sequence
            .add(engine.set(elements, {
                transformPerspective: perspective
            }), 0)
            .add(engine.tween(elements, {
                duration,
                delay,
                ...params
            }, allowedParams))

        decrement3dAnimationsCounter(parents, sequence, engine)

        return sequence.get()
    }

    factory.registerAnimation(name, animation, properties)
}

module.exports = {
    name,
    properties,
    register
}