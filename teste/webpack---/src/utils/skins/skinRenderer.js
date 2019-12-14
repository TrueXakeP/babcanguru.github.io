'use strict'
const _ = require('lodash')
const React = require('react')
const createReactElement = require('../../utils/createReactElement')
const utils = require('santa-core-utils')
const evals = require('../../utils/skins/evals')
const invalidAttributes = require('../../utils/invalidAttributes')
const skinUtils = require('santa-skin-utils')
const {
    createSkinCss: createCss
} = skinUtils
const plugins = []
const cssUtils = utils.cssUtils

const TAG_INDEX = 0
const REF_INDEX = 1
const CLASS_INDEX = 2
const PROPS_INDEX = 3
const CHILDREN_START = PROPS_INDEX + 1

const invalidDOMAttributes = {}
_.forEach(invalidAttributes, function(attr) {
    invalidAttributes[attr] = true
})

function scopeClassNames(classes, styleName) {
    const CLASS_PREFIX = '_'
    const GLOBAL_CLASS_PREFIX = `${CLASS_PREFIX}g!`
    return _.map(classes, function(cName) {
        if (_.startsWith(cName, GLOBAL_CLASS_PREFIX)) {
            return cName.substr(GLOBAL_CLASS_PREFIX.length)
        }
        return styleName + cName
    }).join(' ')
}

function isCustomComponent(tagName) {
    if (!tagName.includes('-')) {
        return false
    }
    switch (tagName) {
        // These are reserved SVG and MathML elements.
        // We don't mind this whitelist too much because we expect it to never grow.
        // The alternative is to track the namespace in a few places which is convoluted.
        // https://w3c.github.io/webcomponents/spec/custom/#custom-elements-core-concepts
        case 'annotation-xml':
        case 'color-profile':
        case 'font-face':
        case 'font-face-src':
        case 'font-face-uri':
        case 'font-face-format':
        case 'font-face-name':
        case 'missing-glyph':
            return false
        default:
            return true
    }
}

function renderSkinHtmlWithPlugins(skinTree, refData, styleName, rootId) {
    let children = []
    let skinPartName
    for (let i = CHILDREN_START; i < skinTree.length; i++) {
        const childSkinTree = skinTree[i]
        if (_.isString(childSkinTree)) {
            children.push(childSkinTree)
        } else {
            skinPartName = childSkinTree[1]
            if (refData[skinPartName] !== 'remove') {
                children.push(renderSkinHtmlWithPlugins(skinTree[i], refData, styleName, rootId))
            }
        }
    }
    let parentConstructor = createReactElement.bind(null, skinTree[TAG_INDEX])
    const parentProps = _.clone(skinTree[PROPS_INDEX])
    let classes = skinTree[CLASS_INDEX]
    if (classes) {
        classes = _.clone(classes)
    } else {
        classes = []
    }
    let wrap

    skinPartName = skinTree[REF_INDEX]
    if (skinPartName !== null) {
        const skinPart = refData[skinPartName]
        if (skinPart) {
            if (React.isValidElement(skinPart)) {
                return skinPart
            }
            _.forEach(skinPart, function(val, property) {
                switch (property) {
                    case 'parentConst':
                        parentConstructor = val
                        break
                    case 'children':
                        children = val
                        break
                    case 'addChildren':
                        children = _.concat(children, val)
                        break
                    case 'addChildBefore':
                        const indexToInsertBefore = _.findIndex(children, {
                            props: {
                                refInParent: val[1]
                            }
                        })
                        if (indexToInsertBefore !== -1) {
                            children.splice(indexToInsertBefore, 0, val[0])
                        } else {
                            children = children.concat(val[0])
                        }
                        break
                    case 'addChildrenBefore':
                        children = (val || []).concat(children)
                        break
                    case 'wrap':
                        wrap = val
                        break
                    case 'tagName':
                        break
                    default:
                        if (!_.has(invalidDOMAttributes, property)) {
                            parentProps[property] = val
                        }
                }
            })
        }
        parentProps.ref = skinPartName
        if (_.isString(skinPartName) && skinPartName.length > 0) {
            parentProps.key = parentProps.key || skinPartName
        }
        parentProps.id = parentProps.id || rootId + skinPartName
        classes.push(skinPartName)
    }

    if (classes.length) {
        const classesToAdd = scopeClassNames(classes, styleName)
        parentProps.className = parentProps.className ? `${parentProps.className} ${classesToAdd}` : classesToAdd
    }

    if (isCustomComponent(skinTree[TAG_INDEX]) && parentProps.className) {
        parentProps.class = parentProps.className
        delete parentProps.className
    }

    let res = parentConstructor.apply(null, [parentProps].concat(children))
    if (wrap) {
        res = wrap[0].apply(null, [wrap[1], res])
    }
    return res
}

function getSkinTreeWithParent(skinTree, refData) {
    const wrapperTagName = _.get(refData, '[""].tagName', 'div')
    return [wrapperTagName, '', [], {}].concat(skinTree || [])
}

function renderSkinHTML(skinTree, refData, styleName, rootId, structure, props, state, isQAMode, hideComponentsListForQa) {
    const skinTreeWithParent = getSkinTreeWithParent(skinTree, refData)
    _.forEach(plugins, func => {
        func.call(this, refData, skinTreeWithParent, structure, props, state, isQAMode, hideComponentsListForQa)
    })
    return renderSkinHtmlWithPlugins(skinTreeWithParent, refData, styleName, rootId)
}

/**
 * Apply changes on a component from other plugins: preview, automation-qa, etc
 * @param func a function to run given the refData
 */
function registerRenderPlugin(func) {
    if (typeof func === 'function') {
        plugins.push(func)
    }
}

function createSkinCss(skinData, styleProps, themeData, styleId, mobileData, serviceTopology, getSkin) {
    if (!skinData) {
        return null
    }

    const skinRenderingConfig = {
        renderingEnv: {},
        evals
    }

    if (mobileData) {
        _.assign(skinRenderingConfig.renderingEnv, {
            siteZoomRatio: mobileData.siteZoomRatio,
            invertedZoomRatio: mobileData.invertedZoomRatio,
            orientationZoomFix: mobileData.orientationZoomFix,
            mobileZoom: mobileData.mobileZoom
        })
    }

    if (serviceTopology && serviceTopology.scriptsLocationMap.skins) {
        _.assign(skinRenderingConfig.renderingEnv, {
            baseThemeUrl: `${serviceTopology.scriptsLocationMap.skins}/images/wysiwyg/core/themes/base/`,
            webThemeUrl: `${serviceTopology.scriptsLocationMap.skins}/images/wysiwyg/core/themes/viewer/`
        })
    }

    const pickedTheme = _.pick(themeData, ['color', 'font'])
    let skinCss = createCss(skinData, styleProps, pickedTheme, styleId, skinRenderingConfig)

    if (skinData.exports) {
        _.forEach(skinData.exports, function(compVal, compName) {
            const skin = getSkin(compVal.skin)
            if (compVal.skin && skin) {
                skinCss += `\n${createSkinCss(skin, styleProps, themeData, cssUtils.concatenateStyleIdToSkinPart(styleId, compName), mobileData, serviceTopology, getSkin)}`
            }
        })
    }
    return skinCss
}

module.exports = {
    /***
     *
     * @param skinData
     * @param styleProps
     * @param themeData
     * @param styleId
     * @returns {string} the recursively-compiled css definitions for the skin (after applying params, media queries)
     */
    createSkinCss,

    /***
     * create React DOM for render
     * @param skinTree
     * @param refData
     * @param styleName
     * @param rootId
     * @returns {*}
     * @private
     */
    renderSkinHTML,
    /**
     * Apply changes on a component from other plugins: preview, automation-qa, etc
     * @param func a function to run given the refData
     *
     * When applying the plugin, func will be called with the following parameters:
     * func(refData, skinTree, structure, TAG_INDEX, REF_INDEX, CLASS_INDEX, CHILDREN_START)
     */
    registerRenderPlugin,
    TAG_INDEX,
    REF_INDEX,
    CLASS_INDEX,
    CHILDREN_START
}