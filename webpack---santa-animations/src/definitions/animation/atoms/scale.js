'use strict'
const name = 'Scale'
const properties = {
    groups: ['animation'],
    schema: {
        duration: {
            type: 'integer',
            min: 0,
            default: 0
        },
        delay: {
            type: 'integer',
            min: 0,
            default: 0
        },
        from: {
            type: 'object',
            properties: {
                scale: {
                    type: 'number',
                    min: 0
                },
                scaleX: {
                    type: 'number',
                    min: 0
                },
                scaleY: {
                    type: 'number',
                    min: 0
                }
            }
        },
        to: {
            type: 'object',
            properties: {
                scale: {
                    type: 'number',
                    min: 0
                },
                scaleX: {
                    type: 'number',
                    min: 0
                },
                scaleY: {
                    type: 'number',
                    min: 0
                }
            }
        }
    }
}

function register({
    factory
}) {
    /**
     * Scale animation object
     * Defaults to Sine.easeIn
     * @param {Array<HTMLElement>|HTMLElement} elements DOM element to animate
     * @param {Number} [duration]
     * @param {Number} [delay]
     * @param {Object} [params] Timeline optional parameters (Tween values cannot be changed here, use BaseFade).
     * @param {Object} [to] Timeline optional parameters.
     * @param {Object} [from] Timeline optional parameters.
     * @param {Object} [ease] Timeline optional parameters.
     * @returns {TimelineMax}
     */
    function animation(elements, duration, delay, {
        from = {},
        to = {},
        ease = 'Sine.easeIn',
        ...params
    } = {}) {
        const sequence = factory.sequence(params)

        sequence.add(factory.animate('BaseScale', elements, duration, delay, {
            from,
            to,
            ease
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