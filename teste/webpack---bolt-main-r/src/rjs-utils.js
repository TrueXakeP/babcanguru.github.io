import requirejs from 'requirejs'

export const _import = async moduleName => new Promise((resolve, reject) => {
    requirejs([moduleName], module => {
        resolve(module)
    }, e => reject(e))
})

export const _define = eval('define') //eslint-disable-line no-eval