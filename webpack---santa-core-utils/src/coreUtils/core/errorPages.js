/*eslint quotes:0*/
'use strict'
const _ = require('lodash')
let isFixingDisplayedMasterPage = false // eslint-disable-line santa/no-module-state
function createFakePageMasterData(id) {
    return {
        "type": "Page",
        id,
        "metaData": {
            "isPreset": false,
            "schemaVersion": "1.0",
            "isHidden": false
        },
        "title": "not found",
        "hideTitle": false,
        "icon": "",
        "descriptionSEO": "",
        "metaKeywordsSEO": "",
        "pageTitleSEO": "",
        "pageUriSEO": `@_${id}`,
        "hidePage": true,
        "underConstruction": false,
        "tpaApplicationId": 0,
        "pageSecurity": {
            "requireLogin": false
        },
        "isPopup": false,
        "indexable": false,
        "isLandingPage": true,
        "pageBackgrounds": {
            "desktop": {
                "custom": true,
                "ref": "#customBgImg3vn",
                "isPreset": true
            },
            "mobile": {
                "custom": true,
                "ref": "#customBgImg24ta",
                "isPreset": true
            }
        },
        "translationData": {
            "uriSEOTranslated": false
        },
        "ignoreBottomBottomAnchors": true
    }
}

const errorPages = {
    '__403__dp': {
        json: '/static/errorPages/403.json',
        masterPageData: createFakePageMasterData('__403__dp'),
        themeData: {
            "__403__dp": {
                "type": "TopLevelStyle",
                "id": "__403__dp",
                "metaData": {
                    "isPreset": false,
                    "schemaVersion": "1.0",
                    "isHidden": false
                },
                "style": {
                    "properties": {
                        "alpha-bg": "1",
                        "bg": "#ffffff"
                    },
                    "propertiesSource": {
                        "bg": "value"
                    },
                    "groups": {

                    }
                },
                "componentClassName": "mobile.core.components.Page",
                "pageId": "",
                "compId": "",
                "styleType": "custom",
                "skin": "wysiwyg.viewer.skins.page.BasicPageSkin"
            },
            "style-ivs76437": {
                "type": "TopLevelStyle",
                "id": "style-ivs76437",
                "metaData": {
                    "isPreset": false,
                    "schemaVersion": "1.0",
                    "isHidden": false
                },
                "style": {
                    "properties": {
                        "alpha-bg": "0",
                        "alpha-bgh": "1",
                        "alpha-brd": "1",
                        "alpha-brdh": "0",
                        "alpha-txt": "1",
                        "alpha-txth": "1",
                        "bg": "#3EB8EA",
                        "bgh": "#EF7E6B",
                        "boxShadowToggleOn-shd": "false",
                        "brd": "#EF7E6B",
                        "brdh": "#3D9BE9",
                        "brw": "2",
                        "fnt": "normal normal normal 22px/1.4em helvetica-w01-light",
                        "rd": "40px",
                        "shd": "0px 1px 4px 0px rgba(0,0,0,0.6)",
                        "txt": "#EF7E6B",
                        "txth": "#FFFFF1"
                    },
                    "propertiesSource": {
                        "alpha-bg": "value",
                        "alpha-brdh": "value",
                        "bg": "value",
                        "bgh": "value",
                        "brd": "value",
                        "brdh": "value",
                        "brw": "value",
                        "fnt": "value",
                        "rd": "value",
                        "shd": "value",
                        "txt": "value",
                        "txth": "value"
                    },
                    "groups": {

                    }
                },
                "componentClassName": "wysiwyg.viewer.components.SiteButton",
                "pageId": "",
                "compId": "",
                "styleType": "custom",
                "skin": "wysiwyg.viewer.skins.button.BasicButton"
            }
        }
    },
    '__404__dp': {
        json: '/static/errorPages/404.json',
        masterPageData: createFakePageMasterData('__404__dp'),
        themeData: {
            "__404__dp_style": {
                "type": "TopLevelStyle",
                "id": "__404__dp_style",
                "metaData": {
                    "isPreset": false,
                    "schemaVersion": "1.0",
                    "isHidden": false
                },
                "style": {
                    "properties": {
                        "alpha-bg": "1",
                        "bg": "#ffffff"
                    },
                    "propertiesSource": {
                        "bg": "value"
                    },
                    "groups": {

                    }
                },
                "componentClassName": "mobile.core.components.Page",
                "pageId": "",
                "compId": "",
                "styleType": "custom",
                "skin": "wysiwyg.viewer.skins.page.BasicPageSkin"
            },
            "style-ivs5pjao": {
                "type": "TopLevelStyle",
                "id": "style-ivs5pjao",
                "metaData": {
                    "isPreset": false,
                    "schemaVersion": "1.0",
                    "isHidden": false
                },
                "style": {
                    "properties": {
                        "alpha-bg": "0",
                        "alpha-bgh": "1",
                        "alpha-brd": "1",
                        "alpha-brdh": "0",
                        "alpha-txt": "1",
                        "alpha-txth": "1",
                        "bg": "#3EB8EA",
                        "bgh": "#4EB7F5",
                        "boxShadowToggleOn-shd": "false",
                        "brd": "#4EB7F5",
                        "brdh": "#3D9BE9",
                        "brw": "2",
                        "fnt": "normal normal normal 22px/1.4em helvetica-w01-light",
                        "rd": "40px",
                        "shd": "0px 1px 4px 0px rgba(0,0,0,0.6)",
                        "txt": "#4EB7F5",
                        "txth": "#FFFFF1"
                    },
                    "propertiesSource": {
                        "alpha-bg": "value",
                        "alpha-brdh": "value",
                        "bg": "value",
                        "bgh": "value",
                        "brd": "value",
                        "brdh": "value",
                        "brw": "value",
                        "fnt": "value",
                        "rd": "value",
                        "shd": "value",
                        "txt": "value",
                        "txth": "value"
                    },
                    "groups": {

                    }
                },
                "componentClassName": "wysiwyg.viewer.components.SiteButton",
                "pageId": "",
                "compId": "",
                "styleType": "custom",
                "skin": "wysiwyg.viewer.skins.button.BasicButton"
            }
        }
    },
    '__500__dp': {
        json: '/static/errorPages/500.json',
        masterPageData: createFakePageMasterData('__500__dp'),
        themeData: {
            "__500__dp_style": {
                "type": "TopLevelStyle",
                "id": "__500__dp_style",
                "metaData": {
                    "isPreset": false,
                    "schemaVersion": "1.0",
                    "isHidden": false
                },
                "style": {
                    "properties": {
                        "alpha-bg": "1",
                        "bg": "#ffffff"
                    },
                    "propertiesSource": {
                        "bg": "value"
                    },
                    "groups": {

                    }
                },
                "componentClassName": "mobile.core.components.Page",
                "pageId": "",
                "compId": "",
                "styleType": "custom",
                "skin": "wysiwyg.viewer.skins.page.BasicPageSkin"
            },
            "style-ivs7k3ls": {
                "type": "TopLevelStyle",
                "id": "style-ivs7k3ls",
                "metaData": {
                    "isPreset": false,
                    "schemaVersion": "1.0",
                    "isHidden": false
                },
                "style": {
                    "properties": {
                        "alpha-bg": "0",
                        "alpha-bgh": "1",
                        "alpha-brd": "1",
                        "alpha-brdh": "0",
                        "alpha-txt": "1",
                        "alpha-txth": "1",
                        "bg": "#3EB8EA",
                        "bgh": "#F6A23B",
                        "boxShadowToggleOn-shd": "false",
                        "brd": "#F6A23B",
                        "brdh": "#3D9BE9",
                        "brw": "2",
                        "fnt": "normal normal normal 22px/1.4em helvetica-w01-light",
                        "rd": "40px",
                        "shd": "0px 1px 4px 0px rgba(0,0,0,0.6)",
                        "txt": "#F6A23B",
                        "txth": "#FFFFF1"
                    },
                    "propertiesSource": {
                        "alpha-bg": "value",
                        "alpha-brdh": "value",
                        "bg": "value",
                        "bgh": "value",
                        "brd": "value",
                        "brdh": "value",
                        "brw": "value",
                        "fnt": "value",
                        "rd": "value",
                        "shd": "value",
                        "txt": "value",
                        "txth": "value"
                    },
                    "groups": {

                    }
                },
                "componentClassName": "wysiwyg.viewer.components.SiteButton",
                "pageId": "",
                "compId": "",
                "styleType": "custom",
                "skin": "wysiwyg.viewer.skins.button.BasicButton"
            }
        }
    },
    '__uknown_error__dp': {
        json: '/static/errorPages/uknownError.json',
        masterPageData: createFakePageMasterData('__uknown_error__dp'),
        themeData: {
            "style-ivs5pjao": {
                "type": "TopLevelStyle",
                "id": "style-ivs5pjao",
                "metaData": {
                    "isPreset": false,
                    "schemaVersion": "1.0",
                    "isHidden": false
                },
                "style": {
                    "properties": {
                        "alpha-bg": "0",
                        "alpha-bgh": "1",
                        "alpha-brd": "1",
                        "alpha-brdh": "0",
                        "alpha-txt": "1",
                        "alpha-txth": "1",
                        "bg": "#3EB8EA",
                        "bgh": "#4EB7F5",
                        "boxShadowToggleOn-shd": "false",
                        "brd": "#4EB7F5",
                        "brdh": "#3D9BE9",
                        "brw": "2",
                        "fnt": "normal normal normal 22px/1.4em helvetica-w01-light",
                        "rd": "40px",
                        "shd": "0px 1px 4px 0px rgba(0,0,0,0.6)",
                        "txt": "#4EB7F5",
                        "txth": "#FFFFF1"
                    },
                    "propertiesSource": {
                        "alpha-bg": "value",
                        "alpha-brdh": "value",
                        "bg": "value",
                        "bgh": "value",
                        "brd": "value",
                        "brdh": "value",
                        "brw": "value",
                        "fnt": "value",
                        "rd": "value",
                        "shd": "value",
                        "txt": "value",
                        "txth": "value"
                    },
                    "groups": {

                    }
                },
                "componentClassName": "wysiwyg.viewer.components.SiteButton",
                "pageId": "",
                "compId": "",
                "styleType": "custom",
                "skin": "wysiwyg.viewer.skins.button.BasicButton"
            }
        }
    }
}

function isErrorPage(pageId) {
    return _.includes(_.keys(errorPages), pageId)
}

function getJSONS(siteData, id) {
    return [siteData.santaBase + errorPages[id].json]
}

function setIsFixingDisplayedMasterPage() {
    isFixingDisplayedMasterPage = true
}

function updateErrorPageMasterData(rootId, masterPage) {
    if (isFixingDisplayedMasterPage && rootId === 'masterPage') {
        _.forEach(errorPages, function(value, key) {
            masterPage.data.document_data[key] = value.masterPageData
            _.assign(masterPage.data.theme_data, value.themeData)
        })
    }
}

function getErrorPageMasterData(rootId) {
    return _.pick(errorPages[rootId], ['masterPageData', 'themeData'])
}

module.exports = {
    updateErrorPageMasterData,
    isErrorPage,
    getJSONS,
    setIsFixingDisplayedMasterPage,
    getErrorPageMasterData,
    IDS: {
        FORBIDDEN: '__403__dp',
        NOT_FOUND: '__404__dp',
        INTERNAL_ERROR: '__500__dp',
        UKNOWN_ERROR: '__uknown_error__dp'
    }
}