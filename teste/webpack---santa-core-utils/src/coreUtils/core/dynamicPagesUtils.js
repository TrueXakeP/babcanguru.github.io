'use strict'


function isSamePageNavigation(navigationInfo, prevNavigationInfo) {
    return navigationInfo.routerDefinition && prevNavigationInfo.routerDefinition && navigationInfo.routerDefinition.prefix === prevNavigationInfo.routerDefinition.prefix ||
        navigationInfo.pageId && prevNavigationInfo.pageId && navigationInfo.pageId === prevNavigationInfo.pageId && (navigationInfo.routerDefinition || prevNavigationInfo.routerDefinition)
}

function isInnerRouteChanged(navigationInfo, prevNavigationInfo) {
    return prevNavigationInfo.innerRoute !== navigationInfo.innerRoute || navigationInfo.routerDefinition !== prevNavigationInfo.routerDefinition
}

module.exports = {
    isSamePageNavigation,
    isInnerRouteChanged
}