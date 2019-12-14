module.exports = {
    resolve: (check, callback, ...args) => {
        if (args.length !== 0) {
            throw new Error('do not pass arguments directly to resolve, bind with extra params')
        }
        if (check) {
            return callback()
        }

        return null
    },
    invoke: (fn, ...params) => fn && fn(...params),
    invokeOn: (target, fnName, ...params) => target && target[fnName] && target[fnName](...params)
}