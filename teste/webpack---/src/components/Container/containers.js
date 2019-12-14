'use strict'

const containerFactory = require('./containers/containerFactory')

const FormContainer = require('./containers/FormContainer')

const LegacyContainer = containerFactory({
    compType: 'wixapps.integration.components.Area',
    defaultSkinName: 'wysiwyg.viewer.skins.area.DefaultAreaSkin',
    legacyInlineContent: true,
    includeScrollMixin: true
})

const GroupContainer = containerFactory({
    displayName: 'WixGroupContainer',
    compType: 'wysiwyg.viewer.components.Group',
    defaultSkinName: 'wysiwyg.viewer.components.GroupSkin',
    includeScrollMixin: false,
    pointerEventsNone: true
})

const Container = containerFactory({
    compType: 'mobile.core.components.Container',
    defaultSkinName: 'wysiwyg.viewer.skins.area.DefaultAreaSkin',
    includeScrollMixin: true
})

const AppWidget = containerFactory({
    displayName: 'AppWidget',
    compType: 'platform.components.AppWidget',
    defaultSkinName: 'platform.components.skins.AppWidgetSkin',
    includeScrollMixin: true
})

const RefComponent = containerFactory({
    displayName: 'RefComponent',
    compType: 'wysiwyg.viewer.components.RefComponent',
    defaultSkinName: 'skins.core.InlineSkin',
    includeScrollMixin: true,
    childrenRendererParams: {
        overrides: {
            fitToContentHeight: true
        }
    }
})

const Section = containerFactory({
    displayName: 'Section',
    compType: 'responsive.components.Section',
    defaultSkinName: 'skins.core.InlineSkin'
})

module.exports = {
    FormContainer,
    GroupContainer,
    LegacyContainer,
    Container,
    RefComponent,
    AppWidget,
    Section
}