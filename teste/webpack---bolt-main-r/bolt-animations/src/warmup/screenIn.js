export default function init({
    model,
    manager
}) {
    const SCREEN_IN_ACTION = 'screenIn'
    const HIGHER_THAN_VIEWPORT_THRESHOLD = 0.01

    let observers = {}

    /**
     * Get screen in threshold from animation definition
     * @param animationManager
     * @param animationDefs
     * @param id
     * @returns {*}
     */
    function getAnimationThreshold(animationManager, animationDefs, id) {
        const animationName = animationDefs[id][SCREEN_IN_ACTION][0].name
        return animationManager.animationProperties[animationName].viewportThreshold
    }

    /**
     * build an intersection observer
     * @param callback
     * @param threshold
     * @returns {IntersectionObserver}
     */
    function getObserver(callback, threshold) {
        const options = {
            root: null, // document
            rootMargin: '0px',
            threshold: [threshold]
        }

        function handler(entries, observer) {
            const intersections = entries.map(entry => ({
                visible: entry.isIntersecting,
                ratio: entry.intersectionRatio,
                rect: entry.intersectionRect,
                id: entry.target.id
            }))

            entries.forEach(entry => entry.isIntersecting && observer.unobserve(entry.target))

            callback(intersections)
        }

        return new window.IntersectionObserver(handler, options)
    }

    /**
     * trigger animation when element is visible
     * @param intersections
     */
    function intersectionHandler(intersections) {
        const idsToTrigger = intersections.filter(inter => inter.visible)
            .map(inter => ({
                compId: inter.id,
                action: SCREEN_IN_ACTION
            }))

        manager.trigger(idsToTrigger)
    }

    /**
     * Observe elements and save to observers array
     * @param el
     * @param threshold
     */
    function observeElement(el, threshold) {
        const observer = observers[threshold] || getObserver(intersectionHandler, threshold)
        observer.observe(el)

        if (!observers[threshold]) {
            observers[threshold] = observer
        }
    }

    /**
     * Run on the list of animation defs and connect elements to intersection observer events
     */
    function traverseModel() {
        const screenHeight = window.innerHeight
        Object.keys(model)
            .filter(id => Object.keys(model[id]).indexOf(SCREEN_IN_ACTION) > -1) // eslint-disable-line lodash/prefer-includes
            .forEach(id => {
                const el = document.getElementById(id)
                if (el) {
                    const height = el.offsetHeight
                    const threshold = height > screenHeight ? HIGHER_THAN_VIEWPORT_THRESHOLD : getAnimationThreshold(manager, model, id)
                    observeElement(el, threshold)
                }
            })
    }

    /**
     * disconnect all observers and clear observers array
     */
    function disconnectObserver() {
        Object.keys(observers).forEach(key => observers[key].disconnect())
        observers = {}
    }

    return {
        start: traverseModel,
        stop: disconnectObserver
    }
}