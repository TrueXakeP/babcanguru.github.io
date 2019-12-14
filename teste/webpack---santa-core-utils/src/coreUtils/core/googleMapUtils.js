'use strict'

const _ = require('lodash')
const xssUtils = require('./xssUtils')
const DEFAULT_ZOOM = 14

function getDefaultLocation(componentPreviewState, isPreviewMode, defaultLocation) {
    if (componentPreviewState && isPreviewMode) {
        return _.toNumber(componentPreviewState)
    }
    return defaultLocation ? defaultLocation : 0
}

function buildLocations(locations) {
    return _.map(locations, location => _.assign(location, {
        icon: getIcon(location)
    }))
}


function getIcon(location) {
    if (!location.pinIcon && !location.pinColor) {
        return undefined
    }

    if (location.pinColor) {
        return {
            path: location.pinIcon,
            fillColor: location.pinColor,
            strokeColor: location.pinColor,
            fillOpacity: 1,
            scale: 0.5
        }
    }
    return location.pinIcon
}

function getGoogleMapsData(props) {
    return _.transform({
        locations: buildLocations(props.locations),
        defaultLocation: getDefaultLocation(props.componentPreviewState, props.isPreviewMode, props.compData.defaultLocation),
        mapType: props.compProp.mapType,
        mapInteractive: props.compProp.mapDragging,
        showZoom: props.compProp.showZoom,
        center: props.compProp.center,
        zoom: _.isNumber(props.compProp.zoom) ? props.compProp.zoom : DEFAULT_ZOOM,
        showDirectionsLink: props.compProp.showDirectionsLink,
        showStreetView: props.compProp.showStreetView,
        showMapType: props.compProp.showMapType,
        componentViewMode: props.componentViewMode,
        mapStyle: JSON.stringify(props.compData.mapStyle || []),
        isPreview: props.isPreviewMode
    }, function(result, value, key) {
        result[key] = _.isString(value) ? xssUtils.filterHtmlString(value) : value
    }, {})
}


module.exports = {
    getGoogleMapsData
}