'use strict'

const eventMap = {
    'mousedown': {
        endEventSource: 'window',
        endEventName: 'mouseup'
    },
    'mouseenter': {
        endEventSource: 'eventSource',
        endEventName: 'mouseleave'
    }
}

/**
 * Set the drag state on drag start
 *
 * @param {MouseEvent} event mouse event
 * @param {{
 *      minX: number = 0,
 *      maxX: number = MAX_SAFE_INTEGER,
 *      offsetX: number = 0,
 *      minY: number = 0,
 *      maxY: number = MAX_SAFE_INTEGER,
 *      offsetY: number = 0
 * }} options
 *
 * @returns {{
 *      endX: number,
 *      minX: number,
 *      maxX: number,
 *      moveX: number,
 *      clientX: MouseEvent.clientX,
 *      endY: number,
 *      minY: number,
 *      maxY: number,
 *      moveY: number,
 *      clientY: MouseEvent.clientY,
 *      eventName: MouseEvent.type,
 *      eventSource: MouseEvent.currentTarget,
 *      dragging: boolean
 * }}
 */
function getInitialDragState(event, options) {
    const {
        minX = 0, maxX = Number.MAX_SAFE_INTEGER, offsetX: endX = 0, minY = 0, maxY = Number.MAX_SAFE_INTEGER, offsetY: endY = 0
    } = options
    const moveX = endX
    const moveY = endY
    const {
        clientX,
        clientY,
        type: eventName,
        currentTarget: eventSource
    } = event
    return {
        endX,
        minX,
        maxX,
        moveX,
        clientX,
        endY,
        minY,
        maxY,
        moveY,
        clientY,
        eventName,
        eventSource,
        dragging: true
    }
}

/**
 * A simple drag utility.
 * Initiate it with some params and callbacks and call start()
 * This utility does not actually drag things, rather than creates the mouse event and distances infrastructure
 *
 * @example
 *   var drag = SimpleDrag({
 *      minX: 0,
 *      maxX: 100,
 *      onDrag: (event, state) => event.target.left = `${state.endX}px`
 *      onDragEnd: (event, state) => console.log(`moved ${event.target.id} to x ${state.endX}`)
 *   })
 *   someDomElement.addEventListener('mousedown', drag.start)
 *
 * @param {{
 *      onDragStart: (function(event:MouseEvent, state:object)),
 *      onDragEnd: (function(event:MouseEvent, state:object)),
 *      onDrag: (function(event:MouseEvent, state:object)),
 *      minX: number = 0,
 *      maxX: number = MAX_SAFE_INTEGER,
 *      offsetX: number = 0,
 *      minY: number = 0,
 *      maxY: number = MAX_SAFE_INTEGER,
 *      offsetY: number = 0
 * }} options
 *
 * @returns {{
 *      start: (function(event:MouseEvent)) Start dragging,
 *      kill: (function()) Force removal of window events and reset drag state
 * }}
 */
module.exports = function SimpleDrag(options) {

    // Set callbacks
    const {
        onDragStart,
        onDragEnd,
        onDrag
    } = options

    // Create empty State
    let state = {}

    /**
     * Invoke to start dragging
     *
     * @param {MouseEvent} event
     */
    const dragStart = event => {
        state = getInitialDragState(event, options)

        const endEventName = eventMap[state.eventName].endEventName
        const endEventSource = eventMap[state.eventName].endEventSource === 'window' ? window : state.eventSource

        window.addEventListener('mousemove', dragging)
        endEventSource.addEventListener(endEventName, dragEnd)


        onDragStart && onDragStart(event, state) //eslint-disable-line no-unused-expressions
        event.stopPropagation()
        event.preventDefault()
    }

    /**
     * Invoke on mouse move while dragging
     *
     * @private
     * @param {MouseEvent} event
     */
    const dragEnd = event => {
        onDragEnd && onDragEnd(event, state) //eslint-disable-line no-unused-expressions

        kill()

        event.stopPropagation()
        event.preventDefault()
    }

    /**
     * Invoke on mouse up while dragging
     *
     * @private
     * @param {MouseEvent} event
     */
    const dragging = event => {
        const movementX = event.clientX - state.clientX
        const movementY = event.clientY - state.clientY

        state.moveX = movementX + state.moveX
        state.moveY = movementY + state.moveY

        state.endX = Math.min(Math.max(state.moveX, state.minX), state.maxX)
        state.endY = Math.min(Math.max(state.moveY, state.minY), state.maxY)

        state.clientX = event.clientX
        state.clientY = event.clientY

        onDrag && onDrag(event, state) //eslint-disable-line no-unused-expressions

        event.stopPropagation()
        event.preventDefault()
    }

    /**
     * Force removal of window events and reset drag state
     */
    const kill = () => {
        const endEventName = eventMap[state.eventName].endEventName
        const endEventSource = eventMap[state.eventName].endEventSource === 'window' ? window : state.eventSource

        window.removeEventListener('mousemove', dragging)
        endEventSource.removeEventListener(endEventName, dragEnd)

        state = {}
    }

    return {
        start: dragStart,
        kill
    }
}