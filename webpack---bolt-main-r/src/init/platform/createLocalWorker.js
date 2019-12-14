const localhostRegex = /^https?:\/\/localhost($|:|\/)/

export function getWorkerUrlOverride(isInSSR, boltBase) {
    if (isInSSR || !window.URLSearchParams) {
        return null
    }
    const urlParams = new URLSearchParams(window.location.search)
    const value = urlParams.get('workerUrlOverride')
    if (!value) {
        return localhostRegex.test(boltBase) ? `${boltBase}/node_modules/viewer-platform-worker/dist/wixcode-worker.js` : null
    }

    if (!localhostRegex.test(value)) {
        console.error('workerUrlOverride should be a url served from localhost')
        return null
    }
    return value
}

export function createWorkerBlobUrl(workerUrlOverride) {
    console.log('fetching worker url from: ', workerUrlOverride)
    return fetch(workerUrlOverride)
        .then(res => new Response(res.body))
        .then(response => response.blob())
        .then(blob => URL.createObjectURL(blob))
}