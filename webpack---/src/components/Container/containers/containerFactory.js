'use strict'

const _ = require('lodash')
const santaTypesDefinitions = require('../../../definitions/santaTypesDefinitions')
const inlineContentMixin = require('../../../mixins/inlineContentMixin')
const scrollMixin = require('../../../mixins/scrollMixin/scrollMixin')
const skinsJson = require('../skins/skins.json')
const skinBasedComp = require('../../../mixins/skinBasedComp')
const createReactClass = require('create-react-class')
const PropTypes = require('prop-types')

module.exports = ({
    defaultSkinName,
    compType,
    displayName = 'WixContainer',
    includeScrollMixin = false,
    legacyInlineContent = false,
    pointerEventsNone = false,
    childrenRendererParams
}) => {
    // Create ordered skins where default skin is first
    const skins = _.pick(skinsJson, [defaultSkinName, ..._.keys(skinsJson)])

    return createReactClass({
        displayName,

        mixins: [
            ...includeScrollMixin ? [scrollMixin] : [],
            skinBasedComp(skins),
            ...legacyInlineContent ? [] : [inlineContentMixin]
        ],

        propTypes: {
            isListItem: PropTypes.bool,
            isMeshLayoutMechanism: santaTypesDefinitions.Layout.isMeshLayoutMechanism,
            layoutContainerClassName: santaTypesDefinitions.Layout.layoutContainerClassName
        },

        statics: {
            getComponentSkins: () => skins,
            compType
        },

        getA11yProps() {
            const a11y = _.get(this.props, ['compData', 'a11y'], {})
            const attributes = ['label', 'live', 'atomic', 'current', 'hidden'].reduce((acc, curr) => {
                acc[`aria-${curr}`] = a11y[curr]
                return acc
            }, {})
            const {
                role,
                tabindex: tabIndex
            } = a11y
            return _.omitBy(_.assign({
                role,
                tabIndex
            }, attributes), _.isUndefined)
        },

        getSkinProperties() {
            const {
                isMeshLayoutMechanism
            } = this.props
            const a11yProps = this.getA11yProps()
            const rootProps = {
                style: isMeshLayoutMechanism && pointerEventsNone ? {
                    pointerEvents: 'none'
                } : {}
            }
            return {
                '': _.assign(
                    rootProps,
                    this.props.isListItem && {
                        role: 'listitem'
                    },
                    a11yProps
                ),
                loader: {
                    style: isMeshLayoutMechanism && pointerEventsNone ? {
                        pointerEvents: 'none'
                    } : {}
                },
                inlineContent: {
                    className: this.props.layoutContainerClassName,
                    style: isMeshLayoutMechanism && pointerEventsNone ? {
                        pointerEvents: 'none'
                    } : {},
                    children: legacyInlineContent ? this.props.children : this.getChildrenRenderer(childrenRendererParams)
                }
            }
        }
    })
}