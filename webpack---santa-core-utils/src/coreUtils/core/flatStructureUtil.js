'use strict'
const _ = require('lodash')

function buildDeepStructure(comp, map) {
    const children = comp.children || comp.components
    if (!_.isEmpty(children)) {
        const components = _.map(children, child => buildDeepStructure(map[child], map))
        return _(comp)
            .omit(['components', 'parent'])
            .defaults({
                [comp.id === 'masterPage' ? 'children' : 'components']: components
            })
            .value()
    }

    return _.omit(_.clone(comp), 'parent')
}

module.exports = {
    buildDeepStructure
}