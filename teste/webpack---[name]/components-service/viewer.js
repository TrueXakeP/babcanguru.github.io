import BaseService from './base-service';

const compsToPackages = {
    'wixui.RichTextBox': () => Promise.all([
        import ( /* webpackChunkName: "wixui.RichTextBox" */ '../legacy/components/RichTextBox')
    ]),
    'wixui.ToggleSwitch': () => Promise.all([
        import ( /* webpackChunkName: "wixui.ToggleSwitch" */ '../legacy/components/ToggleSwitch')
    ]),
    'wixui.Slider': () => Promise.all([
        import ( /* webpackChunkName: "wixui.Slider" */ '../components/Slider')
    ]),
    'wixui.SearchBox': () => Promise.all([
        import ( /* webpackChunkName: "wixui.SearchBox" */ '../components/SearchBox')
    ]),
    'wixui.Captcha': () => Promise.all([
        import ( /* webpackChunkName: "wixui.Captcha" */ '../components/Captcha')
    ]),
    'wixui.Pagination': () => Promise.all([
        import ( /* webpackChunkName: "wixui.Pagination" */ '../components/Pagination')
    ]),
    'wixui.AddressInput': () => Promise.all([
        import ( /* webpackChunkName: "wixui.AddressInput" */ '../components/AddressInput')
    ]),
    'wixui.StylableLine': () => Promise.all([
        import ( /* webpackChunkName: "wixui.StylableLine" */ '../components/StylableLine')
    ]),
    'wixui.Tags': () => Promise.all([
        import ( /* webpackChunkName: "wixui.Tags" */ '../components/Tags')
    ]),
    'wixui.RatingsInput': () => Promise.all([
        import ( /* webpackChunkName: "wixui.RatingsInput" */ '../components/RatingsInput')
    ]),
    'wixui.TimePicker': () => Promise.all([
        import ( /* webpackChunkName: "wixui.TimePicker" */ '../components/TimePicker')
    ]),
    'wixui.RatingsDisplay': () => Promise.all([
        import ( /* webpackChunkName: "wixui.RatingsDisplay" */ '../components/RatingsDisplay')
    ]),
    'wixui.VideoPlayer': () => Promise.all([
        import ( /* webpackChunkName: "wixui.VideoPlayer" */ '../components/VideoPlayer')
    ]),
    'wixui.LineShareButton': () => Promise.all([
        import ( /* webpackChunkName: "wixui.LineShareButton" */ '../components/LineShareButton')
    ]),
    'wixui.MusicPlayer': () => Promise.all([
        import ( /* webpackChunkName: "wixui.MusicPlayer" */ '../components/MusicPlayer')
    ]),
    'wixui.StylableButton': () => Promise.all([
        import ( /* webpackChunkName: "wixui.StylableButton" */ '../components/StylableButton')
    ]),
    'wixui.ProgressBar': () => Promise.all([
        import ( /* webpackChunkName: "wixui.ProgressBar" */ '../components/ProgressBar')
    ]),
    'wixui.Dropdown': () => Promise.all([
        import ( /* webpackChunkName: "wixui.Dropdown" */ '../components/Dropdown')
    ]),
    'wixui.BarChart': () => Promise.all([
        import ( /* webpackChunkName: "wixui.BarChart" */ '../components/BarChart')
    ]),
    'wixui.CustomElementComponent': () => Promise.all([
        import ( /* webpackChunkName: "wixui.CustomElement" */ '../components/CustomElement')
    ]),
    'wixui.SignatureInput': () => Promise.all([
        import ( /* webpackChunkName: "wixui.SignatureInput" */ '../components/SignatureInput')
    ]),
    'wixui.FileUploaderNew': () => Promise.all([
        import ( /* webpackChunkName: "wixui.FileUploaderNew" */ '../components/FileUploaderNew')
    ]),

    'wixui.SelectionTagsList': () => Promise.all([
        import ( /* webpackChunkName: "wixui.SelectionTagsList" */
            '../components/SelectionTagsList')
    ]),

    'wixui.StylableHorizontalMenu': () => Promise.all([
        import ( /* webpackChunkName: "wixui.StylableHorizontalMenu" */
            '../components/StylableHorizontalMenu')
    ]),

    'wixui.ImageX': () => Promise.all([
        import ( /* webpackChunkName: "wixui.ImageX" */
            '../components/ImageX')
    ])
};

module.exports = new BaseService(compsToPackages);