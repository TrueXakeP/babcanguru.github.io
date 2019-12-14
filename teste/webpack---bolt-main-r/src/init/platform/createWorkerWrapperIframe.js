window.iframeMessages = []
module.exports = isDebug => async (url, workerUrl, setIframeWorkerWrapper, contextId) => {
    if (!contextId || !url) {
        return
    }
    let alreadyInitiated = false
    let isIframeReady = false
    let iFrame = null
    let listener = null
    let bufferedMessages = []
    let queuedMessages = []

    const addIFrameToDOM = iframe => {
        if (window.document.readyState !== 'loading') {
            prependIframeToBody()
        } else {
            window.document.addEventListener('DOMContentLoaded', () => {
                prependIframeToBody()
            })
        }

        function prependIframeToBody() {
            const body = window.document.body
            body.insertBefore(iframe, body.firstChild)
        }
    }
    const isIFrameEvent = message => iFrame ? message.source === iFrame.contentWindow : false

    const postMessage = (message, transfer) => {
        if (message) {
            if (isIframeReady) {
                iFrame.contentWindow.postMessage(message, '*', transfer)
                if (isDebug) {
                    const clone = JSON.parse(JSON.stringify(message))
                    window.iframeMessages.push({
                        direction: 'OUTGOING',
                        ...clone,
                        arg1: transfer,
                        timestamp: performance.now()
                    })
                }
            } else {
                queuedMessages.push({
                    message,
                    transfer
                })
            }
        }
    }

    const handleIFrameMessages = message => {
        if (!isIFrameEvent(message)) {
            return
        }
        if (message.data.type === 'IFRAME_LOADED') {
            isIframeReady = true
            queuedMessages.forEach(obj => postMessage(obj.message, obj.transfer))
            queuedMessages = []
            return
        }
        if (isDebug) {
            const copy = JSON.parse(JSON.stringify(message.data))
            window.iframeMessages.push({
                direction: 'INCOMING',
                ...copy,
                timestamp: performance.now()
            })
        }

        if (listener) {
            listener(message)
            return
        }
        bufferedMessages.push(message)
    }

    const terminate = () => {
        if (iFrame) {
            iFrame.parentNode.removeChild(iFrame)
            alreadyInitiated = false
            iFrame = undefined
            isIframeReady = false
        }
    }

    const addEventListener = (type, handler) => {
        if (type !== 'message') {
            throw new Error('cannot add event listener to message type which is not message')
        }
        if (listener !== null) {
            throw new Error('cannot add event listener twice')
        }

        if (isDebug) {
            console.log('bufferedMessages count', bufferedMessages.length)
        }

        bufferedMessages.forEach(message => handler(message))
        bufferedMessages = null

        listener = handler
    }


    const init = () => {
        if (alreadyInitiated) {
            return
        }
        iFrame = window.document.createElement('iframe')
        // The iframe is intentially visible since it may improve cpu/network priority for it
        iFrame.style.cssText = 'position: fixed; left: 0; right: 0; top: 0; bottom: 0; width: 1px; height: 1px; background: transparent; border: 0'
        iFrame.tabIndex = -1
        iFrame.setAttribute('aria-hidden', 'true')
        iFrame.src = `${url}?workerUrl=${workerUrl}&isDebug=${isDebug}`

        addIFrameToDOM(iFrame)
        window.addEventListener('message', handleIFrameMessages, false)
        alreadyInitiated = true
        setIframeWorkerWrapper({
            postMessage,
            terminate,
            addEventListener
        })
    }

    init(url)
}