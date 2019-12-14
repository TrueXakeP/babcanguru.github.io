import {
    createWorkerBlobUrl,
    getWorkerUrlOverride
} from './createLocalWorker'

window.messages = {}


module.exports = (isDebug, isInSSR, boltBase) => async (url, pageId, callback) => {
    const workerUrlOverride = getWorkerUrlOverride(isInSSR, boltBase)
    if (workerUrlOverride) {
        url = await createWorkerBlobUrl(workerUrlOverride)
    }
    const worker = new Worker(url)
    if (isDebug) {
        console.log('created worker', url)
    }

    let listener = null
    let isTerminated = false
    let bufferedMessages = []

    const id = Object.keys(window.messages).length

    const thisWorkersMessages = window.messages[id] = []

    worker.addEventListener('message', message => {
        if (isDebug) {
            const copy = JSON.parse(JSON.stringify(message.data))
            thisWorkersMessages.push({
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
    })

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

    const terminate = () => {
        if (!isTerminated) {
            isTerminated = true
            worker.terminate()
        }
    }



    const postMessage = (message, transfer) => {
        worker.postMessage(message, transfer)
        if (isDebug) {
            const clone = JSON.parse(JSON.stringify(message))
            thisWorkersMessages.push({
                direction: 'OUTGOING',
                ...clone,
                arg1: transfer,
                timestamp: performance.now()
            })
        }
    }

    callback({
        postMessage,
        addEventListener,
        terminate
    })
}