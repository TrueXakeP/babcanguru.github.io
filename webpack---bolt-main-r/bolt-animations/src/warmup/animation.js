import screenInWarmup from './screenIn'

export function init({
    model,
    manager,
    pageId
}) {
    manager.setDefinitions(model)
    manager.initAction('screenIn', pageId)

    return screenInWarmup({
        model,
        manager
    })
}