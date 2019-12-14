const fileUploaderNewOverrideDefinition = {
    overrideViewerType: 'wysiwyg.viewer.components.inputs.FileUploader',
    overrideDisplayName: 'FileUploader',
    overrideComponentSkin: 'wysiwyg.viewer.skins.FileUploaderDefaultSkin',

    viewerExperimentKey: 'useNewWUSUploadButton',
    editorExperimentKey: 'specs.wus.useNewUploadButton',

    newComponentViewerType: 'wixui.FileUploaderNew',
    newDisplayName: 'FileUploaderNew',
    newComponentSkin: 'wixui.skins.FileUploaderNew'
};

module.exports = fileUploaderNewOverrideDefinition;