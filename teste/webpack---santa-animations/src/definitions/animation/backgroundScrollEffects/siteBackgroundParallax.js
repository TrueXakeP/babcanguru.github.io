'use strict'

const name = 'SiteBackgroundParallax'
const properties = {
    hideOnStart: false,
    getMaxTravel(elementMeasure, viewportHeight, siteHeight) {
        return Math.max(siteHeight - viewportHeight, 0)
    },
    groups: ['animation', 'background'],
    schema: {
        duration: {
            type: 'number',
            min: 0,
            default: 0
        },
        delay: {
            type: 'number',
            min: 0,
            default: 0
        },
        speedFactor: {
            type: 'number',
            min: 0,
            default: 0.2
        }
    }
}

function register({
    factory
}, frame) {
    /**
     * Move an element vertically (from y:0)
     * @param {Array<HTMLElement>|HTMLElement} elements DOM element to animate
     * @param {Number} [duration]
     * @param {Number} [delay]
     * @param {Object} [params] Timeline optional parameters (Tween values cannot be changed here, use BaseFade).
     * @param {Number} [params.speedFactor=1] the parallax movement factor, lower is slower tan scroll speed
     * @param {Number} [params.maxScroll=document.body.scrollHeight] the parallax movement factor, lower is slower tan scroll speed
     * @returns {TimelineMax}
     */
    function animation(elements, duration, delay, {
        speedFactor = 0.2,
        ...params
    } = {}) {
        const sequence = factory.sequence(params)

        const maxY = Math.max(frame.document.body.scrollHeight * speedFactor, 0)
        const desiredY = frame.innerHeight * speedFactor
        const y = Math.min(maxY, desiredY)

        sequence.add(factory.animate('BasePosition', elements, duration, delay, {
            from: {
                y: 0
            },
            to: {
                y: -y
            },
            force3D: true,
            ease: 'Linear.easeNone'
        }))

        return sequence.get()
    }

    factory.registerAnimation(name, animation, properties)
}

module.exports = {
    name,
    properties,
    register
}