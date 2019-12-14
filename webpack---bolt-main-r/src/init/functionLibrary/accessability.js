const prefersReducedMotion = windowObject => {
    // eslint-disable-next-line no-nested-ternary
    windowObject = windowObject ? windowObject : typeof window !== 'undefined' ? window : undefined
    return windowObject && windowObject.matchMedia ? windowObject.matchMedia('(prefers-reduced-motion: reduce)').matches : false
}

module.exports = {
    prefersReducedMotion
}