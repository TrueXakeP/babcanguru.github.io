'use strict'

const HeaderContainer = require('./headerContainer/headerContainer')
const FooterContainer = require('./footerContainer/footerContainer')
const MasterPage = require('./MasterPage/MasterPage')
const Image = require('./image/image')
const ZoomedImage = require('./ZoomedImage/ZoomedImage')
const Anchor = require('./Anchor/Anchor')
const FiveGridLine = require('./FiveGridLine/FiveGridLine')
const VerticalLine = require('./VerticalLine/VerticalLine')
const ScreenWidthContainer = require('./ScreenWidthContainer/ScreenWidthContainer')
const PagesContainer = require('./ScreenWidthContainer/PagesContainer')
const {
    PageGroup,
    BoltPageGroup
} = require('./PageGroup/PageGroup')
const imageCommon = require('./imageCommon/imageCommon')
const Video = require('./Video/Video')
const SiteButton = require('./SiteButton/SiteButton')
const ThemeRenderer = require('./ThemeRenderer/ThemeRenderer')
const {
    FormContainer,
    GroupContainer,
    LegacyContainer,
    Container,
    AppWidget,
    RefComponent,
    Section
} = require('./Container/containers')
const WRichText = require('./WRichText/WRichText')
const WPhoto = require('./WPhoto/WPhoto')
const ClipArt = require('./WPhoto/ClipArt')
const {
    ThemeRendererWithFonts
} = require('./ThemeRenderer/ThemeRenderer')

module.exports = {
    HeaderContainer,
    FooterContainer,
    MasterPage,
    Image,
    ZoomedImage,
    Anchor,
    FiveGridLine,
    VerticalLine,
    ScreenWidthContainer,
    PagesContainer,
    PageGroup,
    BoltPageGroup,
    imageCommon,
    Video,
    SiteButton,
    ThemeRenderer,
    FormContainer,
    GroupContainer,
    LegacyContainer,
    Container,
    AppWidget,
    WRichText,
    WPhoto,
    ClipArt,
    ThemeRendererWithFonts,
    RefComponent,
    Section
}