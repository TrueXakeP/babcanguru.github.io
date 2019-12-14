'use strict'
const PropTypes = require('prop-types')

const language = PropTypes.shape({
    languageCode: PropTypes.string,
    name: PropTypes.string,
    iconUrl: PropTypes.string
})
const styleShape = PropTypes.shape({
    bottom: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number
    ]),
    height: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number
    ]),
    left: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number
    ]),
    position: PropTypes.string,
    right: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number
    ]),
    top: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number
    ]),
    width: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number
    ])
})

const dockMarginShape = PropTypes.shape({
    px: PropTypes.number,
    vw: PropTypes.number
})

const columnsContainerChildren = PropTypes.objectOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
    alignment: PropTypes.number.isRequired
}))

module.exports = {
    Definitions: {
        isInSSR: PropTypes.bool,
        isInSeo: PropTypes.bool,
        isMobileView: PropTypes.bool,
        isVisualFocusEnabled: PropTypes.bool,
        isDebugMode: PropTypes.bool,
        isQAMode: PropTypes.bool,
        hideComponentsListForQa: PropTypes.string,
        getRootIdsWhichShouldBeRendered: PropTypes.func,
        isExperimentOpen: PropTypes.func,
        getExperimentValue: PropTypes.func,
        setCustomClickOccurred: PropTypes.func,
        reportBI: PropTypes.func,
        currentUrl: PropTypes.shape({
            query: PropTypes.shape({
                lang: PropTypes.string
            }),
            host: PropTypes.string
        }),
        siteWidth: PropTypes.number,
        rootWidth: PropTypes.string,
        animations: PropTypes.object,
        isSiteBusy: PropTypes.func,
        isPreviewMode: PropTypes.bool,
        isCurrentPageLandingPage: PropTypes.bool,
        santaBase: PropTypes.string,
        RendererModel: {
            multilingual: {
                isEnabled: PropTypes.bool,
                languages: PropTypes.arrayOf(language),
                currentLanguage: language,
                setCurrentLanguageCode: PropTypes.func,
                originalLanguage: language
            },
            geo: PropTypes.string,
            siteMetaData: {
                contactInfo: PropTypes.object,
                quickActions: {
                    configuration: PropTypes.object,
                    socialLinks: PropTypes.string,
                    colorScheme: PropTypes.string
                }
            },
            documentType: PropTypes.string,
            siteTitleSEO: PropTypes.string,
            userId: PropTypes.string,
            metaSiteId: PropTypes.string,
            useSandboxInHTMLComp: PropTypes.bool,
            siteId: PropTypes.string,
            clientSpecMap: PropTypes.object,
            languageCode: PropTypes.string,
            siteMediaToken: PropTypes.string,
            mediaAuthToken: PropTypes.string,
            premiumFeatures: PropTypes.array,
            isResponsive: PropTypes.bool,
            currency: PropTypes.string,
            timeZone: PropTypes.string
        },
        currentUrlPageId: PropTypes.string,
        Modes: {
            getActiveModes: PropTypes.func,
            activateModeById: PropTypes.func,
            deactivateModeById: PropTypes.func,
            switchModesByIds: PropTypes.func,
            triggerFakeModeChange: PropTypes.func
        },
        Scrollable: {
            registerToInnerScroll: PropTypes.func,
            unregisterInnerScroll: PropTypes.func
        },
        SiteAspects: {
            windowScrollEvent: PropTypes.object,
            windowResizeEvent: PropTypes.object,
            actionsAspect: PropTypes.object,
            siteMembers: PropTypes.object,
            siteScrollingBlocker: PropTypes.object,
            svSessionChangeEvent: PropTypes.object,
            siteMetadataChangeAspect: PropTypes.object,
            windowFocusEvents: PropTypes.object,
            windowKeyboardEvent: PropTypes.object,
            windowTouchEvents: PropTypes.object,
            windowClickEventAspect: PropTypes.object,
            viewportChangeAspect: PropTypes.object,
            anchorChangeEvent: PropTypes.object,
            externalScriptLoader: PropTypes.object,
            mediaAspect: PropTypes.object,
            designDataChangeAspect: PropTypes.object,
            tpaComponentsDomAspect: PropTypes.object,
            tpaPageNavigationAspect: PropTypes.object,
            dynamicClientSpecMapAspect: PropTypes.object,
            fontsLoaderAspect: PropTypes.object
        },
        Media: {
            shouldRenderSrc: PropTypes.bool,
            imageUrlPreMeasureParams: PropTypes.object,
            registerPlayer: PropTypes.func,
            unregisterPlayer: PropTypes.func,
            updatePlayerState: PropTypes.func,
            globalImageQuality: PropTypes.object,
            mediaQuality: PropTypes.string,
            renderParts: PropTypes.object,
            playbackUrl: PropTypes.string,
            playbackFormat: PropTypes.string,
            playbackConfig: PropTypes.object,
            canVideoPlayInline: PropTypes.bool,
            playerPlaybackState: PropTypes.string,
            playbackState: PropTypes.string,
            getIsPlaybackPlayIntent: PropTypes.func,
            fullscreen: PropTypes.bool,
            volume: PropTypes.number,
            muted: PropTypes.bool,
            controlsData: PropTypes.object,
            enableBackgroundVideo: PropTypes.bool,
            SiteBackground: {
                data: PropTypes.object,
                mediaQuality: PropTypes.string,
                renderParts: PropTypes.object,
                playbackUrl: PropTypes.string,
                playbackFormat: PropTypes.string,
                playbackConfig: PropTypes.object
            },
            Popup: {
                data: PropTypes.object,
                mediaQuality: PropTypes.string,
                renderParts: PropTypes.object,
                playbackUrl: PropTypes.string,
                playbackFormat: PropTypes.string,
                playbackConfig: PropTypes.object
            }
        },
        MediaPlatform: {
            uploadFile: PropTypes.func
        },
        NativeComponentSantaTypes: {
            publicData: PropTypes.object,
            sectionUrls: PropTypes.arrayOf(PropTypes.object),
            widgetStyle: PropTypes.object,
            instance: PropTypes.string,
            resizeComponent: PropTypes.func,
            viewMode: PropTypes.string,
            formFactor: PropTypes.string,
            deviceType: PropTypes.string,
            appLoadBI: PropTypes.object,
            getComponent: PropTypes.func,
            loadFonts: PropTypes.func,
            registerToSiteReady: PropTypes.func,
            handleEvent: PropTypes.func,
            deadComponentTranslations: PropTypes.object
        },
        ColumnsContainer: {
            childrenData: columnsContainerChildren
        },
        Fonts: {
            fontsMap: PropTypes.array
        },
        Popover: {
            open: PropTypes.func,
            close: PropTypes.func,
            rootContentStyle: PropTypes.object,
            onPopoverMouseIn: PropTypes.func,
            onPopoverMouseOut: PropTypes.func,
            onTargetMouseIn: PropTypes.func,
            onTargetMouseOut: PropTypes.func,
            targetBounds: PropTypes.object,
            targetPortal: PropTypes.object
        },
        InlinePopup: {
            open: PropTypes.func,
            close: PropTypes.func,
            isOpen: PropTypes.bool,
            isTargetOpen: PropTypes.bool
        },
        DocumentClickEvent: {
            registerToDocumentClickEvent: PropTypes.func,
            unRegisterToDocumentClickEvent: PropTypes.func
        },
        Container: {
            defaultBackgroundStyle: PropTypes.object,
            defaultContentArea: PropTypes.object
        },
        Component: {
            isCollapsed: PropTypes.bool,
            isHorizontallyDocked: PropTypes.bool,
            id: PropTypes.string,
            refInParent: PropTypes.string,
            rootId: PropTypes.string,
            pageId: PropTypes.string,
            compActions: PropTypes.object,
            structure: PropTypes.shape({
                componentType: PropTypes.string.isRequired,
                dataQuery: PropTypes.oneOfType([
                    PropTypes.string,
                    PropTypes.object
                ]),
                propertyQuery: PropTypes.oneOfType([
                    PropTypes.string,
                    PropTypes.object
                ]),
                designQuery: PropTypes.oneOfType([
                    PropTypes.string,
                    PropTypes.object
                ]),
                behaviorQuery: PropTypes.oneOfType([
                    PropTypes.string,
                    PropTypes.object
                ]),
                components: PropTypes.array,
                skin: PropTypes.string,
                styleId: PropTypes.string,
                id: PropTypes.string,
                type: PropTypes.string
            }),
            styleParam: {
                textAlignment: PropTypes.string,
                colorScheme: PropTypes.string
            },
            childrenLayout: PropTypes.object,
            childrenStyle: PropTypes.object,
            fixedChildrenIDs: PropTypes.array,
            pinnedChildrenIDs: PropTypes.object,
            rootNavigationInfo: PropTypes.shape({
                pageId: PropTypes.string.isRequired,
                title: PropTypes.string,
                pageAdditionalData: PropTypes.string,
                pageItemId: PropTypes.string,
                pageItemAdditionalData: PropTypes.string,
                transition: PropTypes.string,
                anchorData: PropTypes.string
            }),
            currentUrlPageId: PropTypes.string,
            pageStub: PropTypes.bool,
            styleId: PropTypes.string,
            skin: PropTypes.string,
            getStyleData: PropTypes.func,
            compProp: PropTypes.object,
            compData: PropTypes.object,
            compDesign: PropTypes.object,
            renderFixedPosition: PropTypes.bool,
            layout: PropTypes.object,
            style: styleShape,
            meshParams: PropTypes.object,
            rotationInDegrees: PropTypes.number,
            scale: PropTypes.number,
            flip: PropTypes.string,
            currentUrlPageTitle: PropTypes.string,
            dimensions: PropTypes.shape({
                x: PropTypes.number.isRequired,
                y: PropTypes.number.isRequired,
                width: PropTypes.number.isRequired,
                height: PropTypes.number.isRequired
            }),
            compStaticBehaviors: PropTypes.array,
            theme: PropTypes.object,
            compBehaviors: PropTypes.array,
            trackBehaviorsToExecute: PropTypes.func,
            isHiddenOnStart: PropTypes.bool,
            shouldHideAnimatable: PropTypes.bool
        },
        Theme: {
            all: PropTypes.object,
            colors: PropTypes.array,
            colorsMap: PropTypes.array,
            THEME_DATA: PropTypes.object
        },
        Behaviors: {
            handleAction: PropTypes.func,
            registerBehaviors: PropTypes.func,
            setBehaviorsForActions: PropTypes.func,
            convertBehaviors: PropTypes.func,
            handleBehavior: PropTypes.func
        },
        Layout: {
            reLayoutIfPending: PropTypes.func,
            registerReLayoutPending: PropTypes.func,
            registerLayoutFunc: PropTypes.func,
            responsiveContainerClassName: PropTypes.string,
            layoutContainerClassName: PropTypes.string,
            layoutContainerWrapperClassName: PropTypes.string,
            layoutComponentClassName: PropTypes.string,
            isMeshLayoutMechanism: PropTypes.bool
        },
        Utils: {
            logging: {
                performance: {
                    now: PropTypes.func
                }
            },
            logger: PropTypes.shape({
                error: PropTypes.func.isRequired
            })
        },
        Device: {
            isTouchDevice: PropTypes.bool,
            isMobileDevice: PropTypes.bool,
            devicePixelRatio: PropTypes.number,
            isTabletDevice: PropTypes.func,
            isDesktopDevice: PropTypes.func
        },
        Mobile: {
            cannotHideIframeWithinRoundedCorners: PropTypes.bool,
            siteZoomRatio: PropTypes.number,
            invertedZoomRatio: PropTypes.number,
            orientationZoomFix: PropTypes.number,
            mobileZoom: PropTypes.number
        },
        RenderFlags: {
            all: PropTypes.object,
            allowShowingFixedComponents: PropTypes.bool,
            componentPreviewState: PropTypes.string,
            componentViewMode: PropTypes.string,
            hideSiteBackground: PropTypes.bool,
            ignoreComponentCollapsedProperty: PropTypes.bool,
            ignoreComponentHiddenProperty: PropTypes.bool,
            isBackToTopButtonAllowed: PropTypes.bool,
            isComponentTransitionAllowed: PropTypes.bool,
            isComponentVisible: PropTypes.bool,
            isExternalNavigationAllowed: PropTypes.bool,
            isPlayingAllowed: PropTypes.bool,
            isSlideShowGalleryClickAllowed: PropTypes.bool,
            isSocialInteractionAllowed: PropTypes.bool,
            isTinyMenuOpenAllowed: PropTypes.bool,
            isWixAdsAllowed: PropTypes.bool,
            isZoomAllowed: PropTypes.bool,
            renderFixedPositionBackgrounds: PropTypes.bool,
            renderFixedPositionContainers: PropTypes.bool,
            siteScale: PropTypes.number,
            shouldBlockGoogleMapInteraction: PropTypes.bool,
            shouldRenderTPAsIframe: PropTypes.bool,
            shouldResetComponent: PropTypes.bool,
            shouldResetGalleryToOriginalState: PropTypes.bool,
            shouldResetSlideShowNextPrevButtonsPosition: PropTypes.bool,
            shouldResetSubscribeFormMinMaxWidth: PropTypes.bool,
            shouldResetTinyMenuZIndex: PropTypes.bool,
            showControllers: PropTypes.bool,
            showHiddenComponents: PropTypes.bool
        },
        RenderRealtimeConfig: {
            previewTooltipCallback: PropTypes.func,
            shouldHideTextComponent: PropTypes.bool,
            shouldHideComponent: PropTypes.bool,
            shouldShowComponentOnTop: PropTypes.bool,
            componentOpacity: PropTypes.number
        },
        RawSvg: {
            getRawSVG: PropTypes.string
        },
        Animations: {
            animationProperties: PropTypes.object
        },
        ServiceTopology: {
            scriptsDomainUrl: PropTypes.string,
            staticMediaUrl: PropTypes.string,
            staticVideoUrl: PropTypes.string,
            staticAudioUrl: PropTypes.string,
            scriptsLocationMap: PropTypes.object,
            getMediaFullStaticUrl: PropTypes.func,
            adaptiveVideoDomain: PropTypes.string,
            serviceTopology: PropTypes.object,
            getStaticHTMLComponentUrl: PropTypes.string,
            staticHTMLComponentUrl: PropTypes.string
        },
        Browser: {
            browser: PropTypes.object
        },
        BrowserFlags: {
            cssFiltersSupported: PropTypes.bool,
            ios: PropTypes.func,
            forceOverflowScroll: PropTypes.func,
            animateTinyMenuIcon: PropTypes.func,
            highlightAnchorsInMenu: PropTypes.func,
            positionFixedShouldBeAbsoluteAtPageBottom: PropTypes.func,
            mixBlendModeSupported: PropTypes.func,
            webglCrossOriginSupported: PropTypes.func,
            webglVideoTextureSupported: PropTypes.func,
            clipParallaxWithWebkitClipPath: PropTypes.func,
            fixedBackgroundColorBalata: PropTypes.bool,
            fixedSiteBackground: PropTypes.bool
        },
        Images: {
            onImageUnmount: PropTypes.func
        },
        __DangerousSantaTypes: {
            getRenderedMasterPageHeight: PropTypes.func,
            getWindowSize: PropTypes.func,
            getSliderGalleryMeasures: PropTypes.func,
            getPaginatedGridGalleryMeasures: PropTypes.func,
            getCustomMeasureMap: PropTypes.func,
            getWindowInnerHeight: PropTypes.func
        },
        DAL: {
            setCompState: PropTypes.func,
            setCompData: PropTypes.func,
            setCompProps: PropTypes.func,
            removeCompState: PropTypes.func
        },
        PageGroup: {
            pagesToRender: PropTypes.array,
            createPageProps: PropTypes.func,
            stubifyPage: PropTypes.func
        },
        Repeater: {
            templateLayout: PropTypes.shape({
                repeaterWidth: PropTypes.number,
                templateWidth: PropTypes.number,
                docked: PropTypes.shape({
                    left: dockMarginShape,
                    top: dockMarginShape,
                    right: dockMarginShape,
                    bottom: dockMarginShape
                }),
                itemCount: PropTypes.number
            }),
            setDisplayedOnlyCompsTemplateId: PropTypes.func,
            clearDisplayedOnlyCompsTemplateId: PropTypes.func
        },
        SiteButton: {
            link: PropTypes.object,
            impliedLink: PropTypes.object
        },
        Tags: {
            tagList: PropTypes.array
        },
        WPhoto: {
            Link: PropTypes.object
        },
        WRichText: {
            Links: PropTypes.object
        },
        Link: {
            renderedLink: PropTypes.object,
            renderInfo: PropTypes.shape({
                // TODO: KADURI - split these to own object
                primaryPageId: PropTypes.string,
                currentUrl: PropTypes.object,
                currentUrlPageId: PropTypes.string,

                // TODO: KADURI - split these to own object
                urlFormat: PropTypes.string,
                mainPageId: PropTypes.string,
                externalBaseUrl: PropTypes.string,
                unicodeExternalBaseUrl: PropTypes.string,
                publicBaseUrl: PropTypes.string,
                isFeedbackEndpoint: PropTypes.bool,
                isSiteHistoryEndpoint: PropTypes.bool,
                isViewerMode: PropTypes.bool,
                isWixSite: PropTypes.bool,
                languageCode: PropTypes.string,
                isTemplate: PropTypes.bool,
                isUsingSlashUrlFormat: PropTypes.bool,
                isPremiumDomain: PropTypes.bool,
                serviceTopology: PropTypes.shape({
                    staticDocsUrl: PropTypes.string,
                    basePublicUrl: PropTypes.string,
                    baseDomain: PropTypes.string
                }),

                // TODO: KADURI - split these to own object
                rendererModel: PropTypes.shape({
                    runningExperiments: PropTypes.object
                }),
                cookie: PropTypes.string,
                routersConfigMap: PropTypes.object,
                allPageIds: PropTypes.array,
                pagesDataItemsMap: PropTypes.object,
                mapFromPageUriSeoToPageId: PropTypes.object,
                isPermalink: PropTypes.func,
                rootNavigationInfo: PropTypes.object
            })
        },
        VectorImage: {
            svgId: PropTypes.string,
            link: PropTypes.object,
            strokeWidth: PropTypes.number,
            svgString: PropTypes.string,
            svgStringFromCropData: PropTypes.string,
            svgInfo: PropTypes.object,
            legacySvgString: PropTypes.string,
            legacySvgInfo: PropTypes.object,
            svgType: PropTypes.string,
            overrideColorsAsCss: PropTypes.array,
            shapeStyle: PropTypes.object,
            preserveViewBox: PropTypes.bool,
            shouldScaleStroke: PropTypes.bool,
            svgPropsForMemberLoginIconItems: PropTypes.object,
            svgPropsMapForMediaControls: PropTypes.object,
            flipTransformStyle: PropTypes.object
        },
        GoogleMap: {
            locations: PropTypes.array,
            imageId: PropTypes.string,
            imageBaseUrl: PropTypes.string,
            language: PropTypes.string
        },
        WixAds: {
            wixTopAdsHeight: PropTypes.number
        },
        WixUserSantaTypes: {
            userLanguage: PropTypes.string,
            userLanguageDirection: PropTypes.string
        },
        JsonLd: {
            renderer: PropTypes.func
        },
        Audio: {
            isPlaying: PropTypes.bool,
            isSoundManagerOnResetup: PropTypes.bool,
            soundManagerReady: PropTypes.bool,
            createAudioObj: PropTypes.func,
            updatePlayingComp: PropTypes.func,
            updatePausingComp: PropTypes.func,
            onHTML5ErrorTryToReloadWithFlash: PropTypes.func
        },
        TPA: {
            data: PropTypes.shape({
                isModalOpen: PropTypes.bool,
                queryParams: PropTypes.object
            }),
            showModal: PropTypes.func,
            removeModal: PropTypes.func,
            showPopup: PropTypes.func,
            removePopup: PropTypes.func,
            removeAllPopups: PropTypes.func,
            deleteCompListeners: PropTypes.func,
            initialClientSpecMap: PropTypes.object,
            publish: PropTypes.func,
            subscribe: PropTypes.func,
            unsubscribe: PropTypes.func,
            handleTPAMessage: PropTypes.func,
            sendPostMessage: PropTypes.func,
            callHandler: PropTypes.func,
            seoHtmlContent: PropTypes.string,
            loadingTranslation: PropTypes.string
        },
        AspectComponent: {
            addComponent: PropTypes.func,
            deleteComponent: PropTypes.func
        },
        SocialShareHandler: {
            handleShareRequest: PropTypes.func,
            shortenURL: PropTypes.func
        },
        VerticalAnchorsMenu: {
            updateInformation: PropTypes.func,
            updateImageInfo: PropTypes.func,
            registerToMeanColor: PropTypes.func,
            unregisterToMeanColor: PropTypes.func,
            getOverlappingBackgroundBrightness: PropTypes.func,
            activeAnchor: PropTypes.object,
            getAnchorLinkItems: PropTypes.func,
            registerToActiveAnchor: PropTypes.func,
            unregisterToActiveAnchor: PropTypes.func
        },
        HtmlPostMessage: {
            registerComponent: PropTypes.func,
            unRegisterComponent: PropTypes.func
        },
        Pinterest: {
            data: PropTypes.object
        },
        MemberLogin: {
            language: PropTypes.string,
            memberName: PropTypes.string,
            memberAvatar: PropTypes.string,
            memberDefaultAvatar: PropTypes.string,
            isLoggedIn: PropTypes.bool,
            isConnectedToLoginData: PropTypes.bool,
            menuItems: PropTypes.array,
            iconItems: PropTypes.array
        },
        AnchorChange: {
            activeAnchorData: PropTypes.object,
            activeAnchorId: PropTypes.object
        },
        AppController: {
            isVisible: PropTypes.bool,
            applicativeUIData: PropTypes.shape({
                icon: PropTypes.string.isRequired
            })
        },
        Activity: {
            activityInfo: PropTypes.shape({
                currentUrl: PropTypes.object,
                hubSecurityToken: PropTypes.number,
                metaSiteId: PropTypes.string,
                svSession: PropTypes.string,
                baseUrl: PropTypes.string
            })
        },
        mobile: {
            cannotHideIframeWithinRoundedCorners: PropTypes.func,
            isZoomed: PropTypes.func,
            isZoomedIn: PropTypes.func,
            getInvertedZoomRatio: PropTypes.func,
            isAndroidOldBrowser: PropTypes.bool,
            isPortrait: PropTypes.func,
            mobileZoomByScreen: PropTypes.func,
            isLandscape: PropTypes.func
        },
        Navigation: {
            updateUrlIfNeeded: PropTypes.func,
            href: PropTypes.func,
            navigateToRenderedLink: PropTypes.func
        },
        CompDesign: {
            containerStyle: PropTypes.object
        },
        MediaPlayerDesign: {
            containerStyle: PropTypes.object
        },
        Menu: {
            siteMenuWithRenderForTinyMenu: PropTypes.array,
            siteMenuWithRender: PropTypes.array,
            menuItems: PropTypes.array
        },
        urlFormat: PropTypes.string,
        getMainPageUrl: PropTypes.func,
        getCurrentUrl: PropTypes.func,
        biData: PropTypes.object,
        biVisitorId: PropTypes.string,
        isViewerMode: PropTypes.bool,
        globalImageQuality: PropTypes.object,
        getScreenWidth: PropTypes.func,
        getScreenHeight: PropTypes.func,
        screenSize: PropTypes.object,
        getScrollBarWidth: PropTypes.func,
        forceBackground: PropTypes.func,
        disableForcedBackground: PropTypes.func,
        currentPopupId: PropTypes.string,
        isTemplate: PropTypes.bool,
        isPremiumUser: PropTypes.bool,
        popupPage: {
            close: PropTypes.func
        },
        popup: {
            open: PropTypes.func
        },
        NonPageItemZoom: {
            zoom: PropTypes.func,
            unzoom: PropTypes.func,
            currentItem: PropTypes.object
        },
        scrollToAnchor: PropTypes.func,
        navigateToPage: PropTypes.func,
        passClickEvent: PropTypes.func,
        RequestModel: {
            cookie: PropTypes.string,
            language: PropTypes.string
        },
        PublicModel: {
            externalBaseUrl: PropTypes.string,
            siteRevision: PropTypes.number,
            renderType: PropTypes.string
        },
        isZoomOpened: PropTypes.bool,
        isFacebookSite: PropTypes.bool,
        Location: {
            origin: PropTypes.string
        },
        primaryPageId: PropTypes.string,
        getPrimaryPageId: PropTypes.func,
        mainPageId: PropTypes.string,
        reportBeatEvent: PropTypes.func,
        getExistingRootNavigationInfo: PropTypes.func,
        pageUrl: PropTypes.string,
        pageUrlWithHash: PropTypes.string,
        getClientSpecMapEntry: PropTypes.func,
        enterFullScreenMode: PropTypes.func,
        exitFullScreenMode: PropTypes.func,
        enterOverflowHiddenMode: PropTypes.func,
        exitOverflowHiddenMode: PropTypes.func,
        enterMediaZoomMode: PropTypes.func,
        exitMediaZoomMode: PropTypes.func,
        ContactFormSantaTypes: {
            contactFormTranslations: PropTypes.object,
            orderedFields: PropTypes.array,
            errorMessage: PropTypes.string,
            validationErrorMessage: PropTypes.string,
            compMasterPageData: PropTypes.bool,
            isDynamicContactForm: PropTypes.bool,
            siteApiForPromoteAnalytics: PropTypes.object
        },
        SiteMembersSantaTypes: {
            smSettings: PropTypes.object,
            isSiteMembersDialogsOpenAllowed: PropTypes.bool,
            siteMembersUrl: PropTypes.string,
            forgotPasswordToken: PropTypes.string,
            dialogToDisplay: PropTypes.string,
            isSiteMembersDialogOpen: PropTypes.bool,
            isLoggedIn: PropTypes.bool,
            logout: PropTypes.func,
            showAuthenticationDialog: PropTypes.func,
            getMemberDetails: PropTypes.func,
            memberDetails: PropTypes.string,
            memberDetailsInPreview: PropTypes.string,
            reportSiteMembersBi: PropTypes.func,
            registerToMemberDetailsChange: PropTypes.func,
            unRegisterMemberDetailsChange: PropTypes.func
        },
        StoreSantaTypes: {
            loadBatch: PropTypes.func
        },
        QuickActions: {
            dynamicActions: PropTypes.array,
            structuredAction: PropTypes.object
        },
        viewerSessionId: PropTypes.string,
        isSinglePostPage: PropTypes.bool,
        rootPageTitle: PropTypes.object,
        getUniquePageId: PropTypes.func,
        Page: {
            markVisitedPage: PropTypes.func,
            isPopupPage: PropTypes.bool,
            popupAlignment: PropTypes.object
        },
        viewportStates: PropTypes.bool,
        isClientAfterSSR: PropTypes.bool,
        isFirstRenderAfterSSR: PropTypes.bool,
        isTpaRenderedInSsr: PropTypes.bool,
        isGoogleBot: PropTypes.bool,
        isCacheable: PropTypes.bool,
        compFactoryRuntimeState: PropTypes.object,
        resetCustomClickOccurred: PropTypes.func,
        shouldEnableMobileAnimations: PropTypes.bool,
        LoginButton: {
            language: PropTypes.string,
            actionTitle: PropTypes.string,
            memberTitle: PropTypes.string,
            isReadyToShow: PropTypes.bool
        },
        Social: {
            CurrentPageSocialUrl: PropTypes.string,
            MainPageSocialUrl: PropTypes.string
        },
        VK: {
            size: PropTypes.shape({
                width: PropTypes.number
            })
        },
        SlideShow: {
            slideStyle: PropTypes.object,
            canAutoPlay: PropTypes.bool,
            slidesIndexes: PropTypes.array,
            startAutoPlayInViewport: PropTypes.func,
            stopAutoPlayInViewport: PropTypes.func
        },
        pageMinHeightDefault: PropTypes.number,
        Accessibility: {
            languageCodeForAriaLabel: PropTypes.string,
            getTranslatedAriaLabel: PropTypes.func,
            prefersReducedMotion: PropTypes.bool
        },
        Translations: {
            getTranslationAllKeys: PropTypes.func
        },
        Responsive: {
            getBreakpointMediaQuery: PropTypes.func
        },
        HeaderContainer: {
            isAfterScroll: PropTypes.bool
        }
    }
}