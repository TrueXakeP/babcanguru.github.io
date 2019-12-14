! function(t, e) {
    if ("object" == typeof exports && "object" == typeof module) module.exports = e(require("lodash"), require("coreUtilsLib"), require("prop-types"), require("react"), require("create-react-class"), require("reactDOM"), require("skinUtils"), require("image-client-api"));
    else if ("function" == typeof define && define.amd) define(["lodash", "coreUtilsLib", "prop-types", "react", "create-react-class", "reactDOM", "skinUtils", "image-client-api"], e);
    else {
        var o = "object" == typeof exports ? e(require("lodash"), require("coreUtilsLib"), require("prop-types"), require("react"), require("create-react-class"), require("reactDOM"), require("skinUtils"), require("image-client-api")) : e(t.lodash, t.coreUtilsLib, t["prop-types"], t.react, t["create-react-class"], t.reactDOM, t.skinUtils, t["image-client-api"]);
        for (var r in o)("object" == typeof exports ? exports : t)[r] = o[r]
    }
}(this, (function(t, e, o, i, n, a, s, l) {
    return function(t) {
        var e = {};

        function o(r) {
            if (e[r]) return e[r].exports;
            var i = e[r] = {
                i: r,
                l: !1,
                exports: {}
            };
            return t[r].call(i.exports, i, i.exports, o), i.l = !0, i.exports
        }
        return o.m = t, o.c = e, o.d = function(t, e, r) {
            o.o(t, e) || Object.defineProperty(t, e, {
                enumerable: !0,
                get: r
            })
        }, o.r = function(t) {
            "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(t, Symbol.toStringTag, {
                value: "Module"
            }), Object.defineProperty(t, "__esModule", {
                value: !0
            })
        }, o.t = function(t, e) {
            if (1 & e && (t = o(t)), 8 & e) return t;
            if (4 & e && "object" == typeof t && t && t.__esModule) return t;
            var r = Object.create(null);
            if (o.r(r), Object.defineProperty(r, "default", {
                    enumerable: !0,
                    value: t
                }), 2 & e && "string" != typeof t)
                for (var i in t) o.d(r, i, function(e) {
                    return t[e]
                }.bind(null, i));
            return r
        }, o.n = function(t) {
            var e = t && t.__esModule ? function() {
                return t.default
            } : function() {
                return t
            };
            return o.d(e, "a", e), e
        }, o.o = function(t, e) {
            return Object.prototype.hasOwnProperty.call(t, e)
        }, o.p = "", o(o.s = 62)
    }([function(e, o) {
        e.exports = t
    }, function(t, e, o) {
        "use strict";
        var r = o(9),
            i = o(19).Definitions;
        t.exports = r(i)
    }, function(t, o) {
        t.exports = e
    }, function(t, e) {
        t.exports = o
    }, function(t, e) {
        t.exports = i
    }, function(t, e) {
        t.exports = n
    }, function(t, e, o) {
        "use strict";
        var r = o(0),
            i = o(4),
            n = o(17),
            a = Object.create(null),
            s = Object.create(null),
            l = ["a", "abbr", "address", "area", "article", "aside", "audio", "b", "base", "bdi", "bdo", "big", "blockquote", "body", "br", "button", "canvas", "caption", "cite", "code", "col", "colgroup", "data", "datalist", "dd", "del", "details", "dfn", "dialog", "div", "dl", "dt", "em", "embed", "fieldset", "figcaption", "figure", "footer", "form", "h1", "h2", "h3", "h4", "h5", "h6", "head", "header", "hgroup", "hr", "html", "i", "iframe", "img", "input", "ins", "kbd", "keygen", "label", "legend", "li", "link", "main", "map", "mark", "menu", "menuitem", "meta", "meter", "nav", "noscript", "object", "ol", "optgroup", "option", "output", "p", "param", "picture", "pre", "progress", "q", "rp", "rt", "ruby", "s", "samp", "script", "section", "select", "small", "source", "span", "strong", "style", "sub", "summary", "sup", "table", "tbody", "td", "textarea", "tfoot", "th", "thead", "time", "title", "tr", "track", "u", "ul", "var", "video", "wbr", "circle", "clipPath", "defs", "ellipse", "g", "image", "line", "linearGradient", "mask", "path", "pattern", "polygon", "polyline", "radialGradient", "rect", "stop", "svg", "text", "tspan"];
        l = r.concat(l, ["basefont", "font", "bgsound", "command", "nextid"], ["wix-image", "wix-bg-image", "wix-bg-media", "wix-video", "wix-dropdown-menu"]), r.forEach(l, (function(t) {
            s[t] = !0
        })), r.forEach(n, (function(t) {
            a[t] = !0
        })), t.exports = function() {
            for (var t = arguments.length, e = Array(t), o = 0; o < t; o++) e[o] = arguments[o];
            var n = e[0],
                l = e[1];
            if (r.isString(n)) {
                if (!s[n]) throw new Error('The tag "' + n + "\" is not a valid html tag, please check 'santaComponents.utils.createReactElement()'");
                l && (e[1] = r.pickBy(l, (function(t, e) {
                    return !a[e]
                })))
            }
            return i.createElement.apply(i, e)
        }
    }, function(t, e, o) {
        "use strict";

        function r(t, e, o) {
            return e in t ? Object.defineProperty(t, e, {
                value: o,
                enumerable: !0,
                configurable: !0,
                writable: !0
            }) : t[e] = o, t
        }
        var i = o(0),
            n = o(3),
            a = o(2),
            s = o(23),
            l = o(24),
            d = o(31),
            p = o(6),
            c = o(32),
            u = o(11),
            b = o(1);
        l.registerRenderPlugin(c);
        var g = "skins.core.VerySimpleSkin";

        function h() {
            var t = void 0;
            if (i.isFunction(this.getTransformedCssStates)) {
                var e = this.getTransformedCssStates();
                t = void 0 !== e ? e : this.state
            } else t = this.state;
            if (i.isFunction(this.getTransformedCssStatesForHeader) && (t = this.getTransformedCssStatesForHeader(t)), !t) return {};
            var o = {},
                r = [];
            return i.forOwn(t, (function(t, e) {
                0 === e.lastIndexOf("$", 0) && r.push(t)
            })), i.isEmpty(r) && t.hasOwnProperty("cssState") && (r = i.values(t.cssState)), i.isEmpty(r) || (o["data-state"] = r.join(" ")), o
        }

        function m(t, e) {
            var o = t.logger;
            if (t.isQAMode) throw new Error(e);
            var r = i.get(o, "warn");
            i.isFunction(r) && r(e)
        }

        function f(t, e, o) {
            if (!i.isNil(t)) {
                var r = e[t];
                if (!r && !i.startsWith(t, "svgshape."))
                    if (t === g) r = {
                        react: []
                    };
                    else {
                        var n = i(e).keys().head();
                        r = e[n], o("Fallback skin: " + t + " to " + n)
                    }
                return r
            }
        }

        function w(t, e) {
            var o = t.props,
                r = o.logger,
                n = o.isQAMode;
            return f(o.skin, e, i.partial(m, {
                logger: r,
                isQAMode: n
            }))
        }

        function _(t, e) {
            var o = t.props.skin,
                r = e.get(o, t.props.isExperimentOpen);
            return !r && t.getDefaultSkinName && (o = t.getDefaultSkinName(), r = e.get(o, t.props.isExperimentOpen)), r
        }

        function v(t) {
            var e = this;
            if (this.props.structure && this.props.structure.modes) {
                var o = i.find(this.props.structure.modes.definitions, {
                    type: a.siteConstants.COMP_MODES_TYPES.HOVER
                });
                if (o) {
                    var r = this.props.structure.id;
                    t[""].onMouseEnter = function() {
                        return e.props.activateModeById(r, e.props.rootId, o.modeId)
                    }, t[""].onMouseLeave = function() {
                        return e.props.deactivateModeById(r, e.props.rootId, o.modeId)
                    }
                }
            }
        }

        function x() {
            var t = this.getComponentPreviewState();
            if (t) return {
                "data-preview": t
            }
        }

        function y(t) {
            var e = this.getSkinProperties();
            i.isFunction(this.transformRefData) && this.transformRefData(e), this.props.transformSkinProperties && (e = this.props.transformSkinProperties(e)), e[""] || (e[""] = {}), this.props.isMobileDevice && function(t) {
                i(t).filter((function(t) {
                    return i.has(t, "onClick")
                })).forEach((function(t) {
                    t.style = i.assign(t.style || {}, {
                        cursor: "pointer"
                    })
                }))
            }(e), this.props.isMobileView || v.call(this, e), this.updateRootRefDataStyles(e[""]), i.assign(e[""], h.call(this), x.call(this));
            var o = e.inlineContent;
            return t.react && 0 !== t.react.length || (e[""] = i.defaults(e[""], i.has(o, "children") ? {
                addChildren: e.inlineContent.children
            } : o)), e
        }

        function k(t, e, o) {
            var n = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : e,
                a = o.getStyleData,
                s = o.themeData,
                d = o.siteZoomRatio,
                p = o.invertedZoomRatio,
                c = o.orientationZoomFix,
                u = o.mobileZoom,
                b = o.scriptsLocationMap,
                g = o.logger,
                h = o.isQAMode,
                w = {
                    siteZoomRatio: d,
                    invertedZoomRatio: p,
                    orientationZoomFix: c,
                    mobileZoom: u
                },
                _ = {
                    scriptsLocationMap: b
                },
                v = t.get ? function(e) {
                    return t.get(e)
                } : function(e) {
                    return f(e, t, i.partial(m, {
                        logger: g,
                        isQAMode: h
                    }))
                },
                x = a(e),
                y = l.createSkinCss(v(x.skin), i.get(x, "style.properties", {}), s, n, w, _, v);
            return y && r({}, e, y)
        }
        var R = {
                getStyleData: b.Component.getStyleData,
                themeData: b.Theme.THEME_DATA,
                siteZoomRatio: b.Mobile.siteZoomRatio,
                invertedZoomRatio: b.Mobile.invertedZoomRatio,
                orientationZoomFix: b.Mobile.orientationZoomFix,
                mobileZoom: b.Mobile.mobileZoom,
                scriptsLocationMap: b.ServiceTopology.scriptsLocationMap,
                logger: b.Utils.logger,
                isQAMode: b.isQAMode
            },
            O = function(t, e, o) {
                var n = o.getStyleData,
                    a = o.generalTheme,
                    l = o.logger,
                    d = o.isQAMode,
                    p = n ? i.reduce(e, (function(t, e) {
                        return i.assign(t, r({}, e, n(e)))
                    }), {}) : e,
                    c = t.get ? function(e) {
                        return t.get(e)
                    } : function(e) {
                        return f(e, t, i.partial(m, {
                            logger: l,
                            isQAMode: d
                        }))
                    };
                return s(p, a, c)
            },
            C = {
                getStyleData: b.Component.getStyleData,
                generalTheme: b.Theme.THEME_DATA,
                logger: b.Utils.logger,
                isQAMode: b.isQAMode
            };
        t.exports = function(t) {
            var e = t.get ? _ : w;
            return {
                mixins: [u.baseComp],
                statics: {
                    getCompCss: i.set(i.partial(k, t), "cssTypes", R),
                    getCompFonts: i.set(i.partial(O, t), "fontsTypes", C)
                },
                propTypes: {
                    isTouchDevice: b.Device.isTouchDevice,
                    isMobileView: b.isMobileView,
                    isMobileDevice: b.Device.isMobileDevice,
                    isDebugMode: b.isDebugMode,
                    isQAMode: b.isQAMode,
                    hideComponentsListForQa: b.hideComponentsListForQa,
                    structure: b.Component.structure,
                    id: b.Component.id,
                    rootId: b.Component.rootId,
                    currentUrlPageId: b.Component.currentUrlPageId,
                    styleId: b.Component.styleId,
                    skin: b.Component.skin,
                    logger: b.Utils.logger,
                    style: b.Component.style,
                    compProp: b.Component.compProp,
                    compData: b.Component.compData,
                    compActions: b.Component.compActions,
                    componentPreviewState: b.RenderFlags.componentPreviewState,
                    activateModeById: b.Modes.activateModeById,
                    deactivateModeById: b.Modes.deactivateModeById,
                    switchModesByIds: b.Modes.switchModesByIds,
                    transformSkinProperties: n.func,
                    isExperimentOpen: b.isExperimentOpen,
                    setCustomClickOccurred: b.setCustomClickOccurred,
                    renderFixedPosition: b.Component.renderFixedPosition
                },
                renderHelper: function() {
                    var o = e(this, t);
                    if (!o) {
                        var r = this.constructor.displayName || "";
                        throw Error("Skin [" + this.props.skin + "] not found for comp [" + r + "]")
                    }
                    var n = y.call(this, o),
                        a = new d;
                    return i.forEach(n, function(t) {
                        this.props.isTouchDevice && a.registerTouchEvents(t), a.removeCustomTouchEvents(t)
                    }.bind(this)), l.renderSkinHTML.call(this, o.react, n, this.props.styleId, this.props.id, this.props.structure, this.props, this.state, this.props.isQAMode, this.props.hideComponentsListForQa)
                },
                getRootRef: function() {
                    return this.refs[""]
                },
                getComponentPreviewState: function() {
                    return this.props.componentPreviewState
                },
                render: function() {
                    try {
                        return this.renderHelper()
                    } catch (e) {
                        if (this.props.isDebugMode) throw e;
                        this.props.logger.error("Cannot render component: " + this.constructor.displayName, e.stack, this.props.id);
                        var t = {
                            id: this.props.id,
                            style: i.defaults({
                                background: "transparent"
                            }, this.props.style),
                            "data-dead-comp": !0
                        };
                        return p("div", t)
                    }
                },
                getSkinExports: function() {
                    var o = e(this, t);
                    return o && o.exports
                },
                classSet: function(t) {
                    return a.classNames(i.reduce(t, function(t, e, o) {
                        return t[this.styleId + "_" + o] = e, t
                    }.bind(this.props), {}))
                },
                componentWillUpdate: function() {
                    this.props.onComponentWillUpdate && this.props.onComponentWillUpdate()
                }
            }
        }
    }, function(t, e) {
        t.exports = a
    }, function(t, e, o) {
        "use strict";
        var r = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(t) {
                return typeof t
            } : function(t) {
                return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t
            },
            i = o(0);
        t.exports = function t(e, o) {
            return i.reduce(e, (function(e, n, a) {
                var s, l, d = o ? o + "." + a : a;
                switch (void 0 === n ? "undefined" : r(n)) {
                    case "function":
                        return (l = (s = n).bind(null)).isRequired = s.isRequired.bind(null), (n = l).id = d, n.isRequired.id = d, i.set(e, a, n);
                    case "object":
                        return i.set(e, a, t(n, d));
                    default:
                        throw new Error("wtf:" + a)
                }
            }), {})
        }
    }, function(t, e, o) {
        "use strict";
        var r = o(0),
            i = o(1),
            n = o(65);
        t.exports = {
            statics: {
                meshContainer: !0
            },
            propTypes: {
                id: i.Component.id,
                fixedChildrenIDs: i.Component.fixedChildrenIDs,
                meshParams: i.Component.meshParams,
                isMeshLayoutMechanism: i.Layout.isMeshLayoutMechanism,
                isPreviewMode: i.isPreviewMode,
                browser: i.Browser.browser,
                reportBI: i.reportBI,
                isMobileView: i.isMobileView,
                isResponsive: i.RendererModel.isResponsive
            },
            ignoreDimensions: function() {
                return this.props.isMeshLayoutMechanism
            },
            getChildrenRenderer: function() {
                var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {},
                    e = t.overrides,
                    o = t.contentArea,
                    i = t.contentSkinPartId,
                    a = t.children,
                    s = this.props,
                    l = s.id,
                    d = s.meshParams,
                    p = s.isPreviewMode,
                    c = s.isMobileView,
                    u = s.children,
                    b = s.isMeshLayoutMechanism,
                    g = s.fixedChildrenIDs,
                    h = s.browser,
                    m = s.reportBI,
                    f = s.isResponsive,
                    w = !r.has(d, "id"),
                    _ = {
                        isMeshLayoutMechanism: b,
                        isPreviewMode: p,
                        isMobileView: c,
                        browser: h,
                        reportBI: m,
                        contentArea: o,
                        fixedChildrenIDs: g,
                        id: l,
                        adjustingId: r.get(d, "adjustingComp", null),
                        container: w ? null : r.assign(r.omit(d, "adjustingComp"), e),
                        children: a || u || [],
                        contentSkinPartId: i,
                        isResponsive: f,
                        meshResults: w ? r.assign({}, d, r.pick(e, ["components"])) : null
                    };
                return n(_)
            }
        }
    }, function(t, e, o) {
        "use strict";
        var r = o(0),
            i = o(8),
            n = o(3),
            a = o(2),
            s = o(12),
            l = o(13),
            d = o(1),
            p = o(15),
            c = o(16).BASE_COMP_ACTIONS,
            u = ["wysiwyg.viewer.components.SiteBackground"];

        function b(t) {
            var e = r.pick(t, r.values(c));
            if (r.get(this.props.compProp, "isDisabled")) return e;
            var o = r(this.props.compActions).pick(r.keys(c)).mapKeys((function(t, e) {
                return c[e]
            })).mapValues(function(t) {
                return this.handleAction.bind(this, t.name)
            }.bind(this)).value();
            return o.onClick && this.props.setCustomClickOccurred && (o.onClickCapture = function(t) {
                r.includes(t.target.id, this.props.id) && this.props.setCustomClickOccurred()
            }.bind(this)), r.assignWith(o, e, function(t, e) {
                var o = this;
                return function() {
                    t && t.apply(o, arguments), e && e.apply(o, arguments)
                }
            }.bind(this))
        }

        function g(t) {
            var e = !(!r.invoke(this, "isScreenWidth") && !this.props.isHorizontallyDocked),
                o = r.isFunction(this.ignoreDimensions) && this.ignoreDimensions(),
                i = t.style,
                n = e && p(this.props.isMobileView, this.props.siteWidth, r.get(this.props.structure, ["layout", "docked"])),
                a = r.omit(this.props.style, o && ["width", "height"]),
                s = r.defaults({}, i, n, a);
            return t["data-hidden"] && (s.visibility = "hidden"), t["data-collapsed"] && r.assign(s, {
                visibility: "hidden",
                overflow: "hidden",
                width: 0,
                minWidth: 0,
                height: 0,
                minHeight: 0
            }, this.props.isMeshLayoutMechanism ? {
                marginBottom: 0
            } : {
                top: 0,
                left: 0,
                position: "absolute"
            }), !r.get(this.props.compProp, "isDisabled") && r.has(this.props.compActions, "click") && (s.cursor = "pointer"), s
        }

        function h(t) {
            return r.compact([t, this.props.layoutComponentClassName, this.props.className]).join(" ")
        }
        var m = {
            mixins: [s, a.renderDoneMixin, l],
            propTypes: {
                id: d.Component.id.isRequired,
                className: n.string,
                structure: d.Component.structure,
                rotationInDegrees: d.Component.rotationInDegrees,
                siteWidth: d.siteWidth,
                style: d.Component.style,
                registerLayoutFunc: d.Layout.registerLayoutFunc,
                isCollapsed: d.Component.isCollapsed,
                compActions: d.Component.compActions,
                compBehaviors: d.Component.compBehaviors,
                isHorizontallyDocked: d.Component.isHorizontallyDocked,
                compProp: d.Component.compProp,
                registerReLayoutPending: d.Layout.registerReLayoutPending,
                reLayoutIfPending: d.Layout.reLayoutIfPending,
                isExperimentOpen: d.isExperimentOpen,
                isMobileView: d.isMobileView,
                shouldHideAnimatable: d.Component.shouldHideAnimatable,
                layoutComponentClassName: d.Layout.layoutComponentClassName,
                isMeshLayoutMechanism: d.Layout.isMeshLayoutMechanism,
                isResponsive: d.RendererModel.isResponsive
            },
            registerReLayout: function() {
                this.props.registerReLayoutPending && this.props.registerReLayoutPending(this.props.id)
            },
            componentDidUpdate: function() {
                this.props.reLayoutIfPending && this.callAfterRenderDone(this.props.reLayoutIfPending)
            },
            componentDidMount: function() {
                r.isFunction(this.measureComponent) && this.props.registerLayoutFunc(i.findDOMNode(this), this.measureComponent)
            },
            shouldComponentUpdate: function(t, e) {
                var o = !this.shouldComponentUpdateAnimatable || this.shouldComponentUpdateAnimatable(t, e),
                    i = t.structure && r.includes(u, t.structure.componentType),
                    n = !r.isFunction(this.componentSpecificShouldUpdate) || this.componentSpecificShouldUpdate(t, e);
                return o && n || i
            },
            updateRootRefDataStyles: function(t) {
                if (!r.get(this.props, "compProp.isHidden") && !this.props.isCollapsed) {
                    var e = b.call(this, t);
                    r.assign(t, e)
                }
                if ((r.get(this.props, "compProp.isHidden") || this.props.shouldHideAnimatable) && (t["data-hidden"] = !0), this.props.isCollapsed && (t["data-collapsed"] = !0), this.props.isResponsive) t["data-hidden"] && (t.style = {
                    visibility: "hidden"
                }), t["data-collapsed"] && (t.style = {
                    visibility: "hidden",
                    overflow: "hidden",
                    width: 0,
                    minWidth: 0,
                    height: 0,
                    minHeight: 0,
                    top: 0,
                    left: 0,
                    position: "absolute"
                });
                else {
                    t.style = g.call(this, t);
                    var o = this.props.rotationInDegrees;
                    o && (t["data-angle"] = o)
                }
                t.className = h.call(this, t.className)
            }
        };
        t.exports = {
            baseComp: m,
            _testActionsMap: c
        }
    }, function(t, e, o) {
        "use strict";
        var r = o(8),
            i = o(0);
        t.exports = {
            isAnimatable: !0,
            shouldChildrenUpdate: !0,
            componentWillMount: function() {
                this._animatableMixin = {
                    animationsCounter: 0,
                    deferredStates: []
                }, this._onAnimationEnded = i.noop
            },
            componentDidMount: function() {
                this._animatableMixin.setStateOrig = this.setState
            },
            componentWillUnmount: function() {
                this._animatableMixin.updateOnAnimationEnded = !1
            },
            animationStarted: function() {
                1 == ++this._animatableMixin.animationsCounter && (this.setState = this.setStateDeferred, this.isCurrentlyAnimating = !0), this.shouldChildrenUpdate || i(this.refs).filter("isAnimatable").invokeMap("animationStarted").value()
            },
            animationEnded: function(t) {
                t = !1 !== t, this.shouldChildrenUpdate || i(this.refs).filter("isAnimatable").invokeMap("animationEnded", !1).value();
                var e, o, n = this._animatableMixin;
                if (n.animationsCounter && 0 == --n.animationsCounter && (this.setState = n.setStateOrig, this.isCurrentlyAnimating = !1, i.invoke(this, "_onAnimationEnded")), t)
                    if (n.deferredStates.length) {
                        for (var a = n.deferredStates, s = 0; s < a.length; s += 2) n.setStateOrig.call(this, a[s], a[s + 1]);
                        a.length = 0
                    } else n.updateOnAnimationEnded && this.forceUpdate();
                n.updateOnAnimationEnded = !1, !0 === this.forceRedrawOnAnimationEnded && (e = r.findDOMNode(this), o = e.style.display, e.style.display = "none", e.offsetHeight, e.style.display = o)
            },
            setStateDeferred: function(t, e) {
                var o = this._animatableMixin.deferredStates,
                    r = o.length;
                0 === r || o[r - 1] || e ? (o.push(t), o.push(e)) : (i.assign(o[r - 2], t), o[r - 1] = e)
            },
            shouldComponentUpdateAnimatable: function() {
                var t = 0 === this._animatableMixin.animationsCounter;
                return t || (this._animatableMixin.updateOnAnimationEnded = !0), t
            },
            registerOnAnimationEnd: function(t) {
                this._onAnimationEnded = t
            },
            unregisterOnAnimationEnd: function() {
                this._onAnimationEnded = i.noop
            }
        }
    }, function(t, e, o) {
        "use strict";
        var r = o(14).getEvent,
            i = o(0),
            n = o(1);
        t.exports = {
            propTypes: {
                id: n.Component.id,
                handleAction: n.Behaviors.handleAction,
                compActions: n.Component.compActions,
                now: n.Utils.logging.performance.now
            },
            handleAction: function(t, e) {
                var o = i.get(this.props.compActions, t);
                o && this.props.handleAction(o, r.call(this, e))
            }
        }
    }, function(t, e, o) {
        "use strict";
        var r = o(0);
        e.getEvent = function(t) {
            var e = {
                id: r.get(t, "id") || this.props ? this.props.id : null,
                timeStamp: this.props && this.props.now ? this.props.now() : null
            };
            return t ? (e.timeStamp = t.timeStamp || e.timeStamp, r.defaults(e, t)) : e
        }
    }, function(t, e, o) {
        "use strict";
        var r = o(0),
            i = function(t, e) {
                var o = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : "px";
                return r.get(t, [e, o], 0)
            },
            n = function(t) {
                return r.hasIn(t, ["left"]) && r.hasIn(t, ["right"])
            },
            a = function(t) {
                return i(t, "left", "px") > 0 || i(t, "right", "px") > 0
            },
            s = function(t) {
                return i(t, "left", "vw") > 0 || i(t, "right", "vw") > 0
            },
            l = function(t) {
                return n(t) && function(t) {
                    return a(t) ? i(t, "left") + "px" : s(t) ? i(t, "left", "vw") + "vw" : null
                }(t) || "0"
            },
            d = function(t) {
                if (!n(t)) return "100%";
                var e = function(t) {
                    return a(t) ? i(t, "left") + i(t, "right") + "px" : s(t) ? i(t, "left", "vw") + i(t, "right", "vw") + "vw" : null
                }(t);
                return e ? "calc(100% - " + e + ")" : "100%"
            };
        t.exports = function(t, e, o) {
            return t ? {
                left: "0",
                marginLeft: "0",
                width: e + "px"
            } : {
                left: "0",
                marginLeft: l(o),
                width: d(o),
                minWidth: o ? "initial" : e + "px"
            }
        }
    }, function(t, e, o) {
        "use strict";
        t.exports = {
            BASE_COMP_ACTIONS: {
                click: "onClick",
                dblClick: "onDoubleClick",
                mouseenter: "onMouseEnter",
                mouseleave: "onMouseLeave"
            }
        }
    }, function(t, e, o) {
        "use strict";
        t.exports = ["hideComponentsListForQa", "activateModeById", "addCompAction", "addModeDefinition", "addModeOverride", "addSiteData", "animationProperties", "animations", "clickAction", "compActions", "compBehaviors", "compData", "compProp", "componentOpacity", "componentPreviewState", "componentViewMode", "contextProps", "cookie", "currentUrl", "currentUrlPageId", "deactivateModeById", "displayName", "externalScriptLoader", "fieldType", "forType", "formatName", "functionLibrary", "getActiveModes", "getRootIdsWhichShouldBeRendered", "getTransitionParams", "goToLinkText", "handleAction", "shouldHideAnimatable", "isAffectedByModeChanges", "isCollapsed", "isDebugMode", "isExperimentOpen", "isMobileDevice", "isMobileView", "isQAMode", "isSiteBusy", "isTouchDevice", "linkData", "logger", "logic", "logicEvents", "now", "pageId", "pageStub", "parentContextPath", "parentId", "pathToItems", "playerId", "position", "proxyLayout", "reLayoutIfPending", "refInParent", "registerLayoutFunc", "registerReLayout", "registerReLayoutPending", "renderFixedPosition", "rootId", "rootNavigationInfo", "rootWidth", "rotationInDegrees", "setCompData", "setCompProp", "setCustomClickOccurred", "setLayout", "setNodeStyle", "setProps", "setRuntimeCompData", "setRuntimeCompProps", "setSkin", "setThemeStyle", "siteWidth", "shouldHideComponent", "shouldShowComponentOnTop", "siteAPI", "siteData", "skin", "skinId", "skinsMap", "structure", "styleId", "switchModesByIds", "userLanguage", "viewContextMap", "viewDef", "viewId", "viewName", "viewProps", "visibilityClasses", "visibilityState", "windowScrollEventAspect", "wixComp"]
    }, function(t, e) {
        t.exports = s
    }, function(t, e, o) {
        "use strict";
        var r = o(3),
            i = r.shape({
                languageCode: r.string,
                name: r.string,
                iconUrl: r.string
            }),
            n = r.shape({
                bottom: r.oneOfType([r.string, r.number]),
                height: r.oneOfType([r.string, r.number]),
                left: r.oneOfType([r.string, r.number]),
                position: r.string,
                right: r.oneOfType([r.string, r.number]),
                top: r.oneOfType([r.string, r.number]),
                width: r.oneOfType([r.string, r.number])
            }),
            a = r.shape({
                px: r.number,
                vw: r.number
            }),
            s = r.objectOf(r.shape({
                id: r.string.isRequired,
                width: r.number.isRequired,
                height: r.number.isRequired,
                alignment: r.number.isRequired
            }));
        t.exports = {
            Definitions: {
                isInSSR: r.bool,
                isInSeo: r.bool,
                isMobileView: r.bool,
                isVisualFocusEnabled: r.bool,
                isDebugMode: r.bool,
                isQAMode: r.bool,
                hideComponentsListForQa: r.string,
                getRootIdsWhichShouldBeRendered: r.func,
                isExperimentOpen: r.func,
                getExperimentValue: r.func,
                setCustomClickOccurred: r.func,
                reportBI: r.func,
                currentUrl: r.shape({
                    query: r.shape({
                        lang: r.string
                    }),
                    host: r.string
                }),
                siteWidth: r.number,
                rootWidth: r.string,
                animations: r.object,
                isSiteBusy: r.func,
                isPreviewMode: r.bool,
                isCurrentPageLandingPage: r.bool,
                santaBase: r.string,
                RendererModel: {
                    multilingual: {
                        isEnabled: r.bool,
                        languages: r.arrayOf(i),
                        currentLanguage: i,
                        setCurrentLanguageCode: r.func,
                        originalLanguage: i
                    },
                    geo: r.string,
                    siteMetaData: {
                        contactInfo: r.object,
                        quickActions: {
                            configuration: r.object,
                            socialLinks: r.string,
                            colorScheme: r.string
                        }
                    },
                    documentType: r.string,
                    siteTitleSEO: r.string,
                    userId: r.string,
                    metaSiteId: r.string,
                    useSandboxInHTMLComp: r.bool,
                    siteId: r.string,
                    clientSpecMap: r.object,
                    languageCode: r.string,
                    siteMediaToken: r.string,
                    mediaAuthToken: r.string,
                    premiumFeatures: r.array,
                    isResponsive: r.bool,
                    currency: r.string,
                    timeZone: r.string
                },
                currentUrlPageId: r.string,
                Modes: {
                    getActiveModes: r.func,
                    activateModeById: r.func,
                    deactivateModeById: r.func,
                    switchModesByIds: r.func,
                    triggerFakeModeChange: r.func
                },
                Scrollable: {
                    registerToInnerScroll: r.func,
                    unregisterInnerScroll: r.func
                },
                SiteAspects: {
                    windowScrollEvent: r.object,
                    windowResizeEvent: r.object,
                    actionsAspect: r.object,
                    siteMembers: r.object,
                    siteScrollingBlocker: r.object,
                    svSessionChangeEvent: r.object,
                    siteMetadataChangeAspect: r.object,
                    windowFocusEvents: r.object,
                    windowKeyboardEvent: r.object,
                    windowTouchEvents: r.object,
                    windowClickEventAspect: r.object,
                    viewportChangeAspect: r.object,
                    anchorChangeEvent: r.object,
                    externalScriptLoader: r.object,
                    mediaAspect: r.object,
                    designDataChangeAspect: r.object,
                    tpaComponentsDomAspect: r.object,
                    tpaPageNavigationAspect: r.object,
                    dynamicClientSpecMapAspect: r.object,
                    fontsLoaderAspect: r.object
                },
                Media: {
                    shouldRenderSrc: r.bool,
                    imageUrlPreMeasureParams: r.object,
                    registerPlayer: r.func,
                    unregisterPlayer: r.func,
                    updatePlayerState: r.func,
                    globalImageQuality: r.object,
                    mediaQuality: r.string,
                    renderParts: r.object,
                    playbackUrl: r.string,
                    playbackFormat: r.string,
                    playbackConfig: r.object,
                    canVideoPlayInline: r.bool,
                    playerPlaybackState: r.string,
                    playbackState: r.string,
                    getIsPlaybackPlayIntent: r.func,
                    fullscreen: r.bool,
                    volume: r.number,
                    muted: r.bool,
                    controlsData: r.object,
                    enableBackgroundVideo: r.bool,
                    SiteBackground: {
                        data: r.object,
                        mediaQuality: r.string,
                        renderParts: r.object,
                        playbackUrl: r.string,
                        playbackFormat: r.string,
                        playbackConfig: r.object
                    },
                    Popup: {
                        data: r.object,
                        mediaQuality: r.string,
                        renderParts: r.object,
                        playbackUrl: r.string,
                        playbackFormat: r.string,
                        playbackConfig: r.object
                    }
                },
                MediaPlatform: {
                    uploadFile: r.func
                },
                NativeComponentSantaTypes: {
                    publicData: r.object,
                    sectionUrls: r.arrayOf(r.object),
                    widgetStyle: r.object,
                    instance: r.string,
                    resizeComponent: r.func,
                    viewMode: r.string,
                    formFactor: r.string,
                    deviceType: r.string,
                    appLoadBI: r.object,
                    getComponent: r.func,
                    loadFonts: r.func,
                    registerToSiteReady: r.func,
                    handleEvent: r.func,
                    deadComponentTranslations: r.object
                },
                ColumnsContainer: {
                    childrenData: s
                },
                Fonts: {
                    fontsMap: r.array
                },
                Popover: {
                    open: r.func,
                    close: r.func,
                    rootContentStyle: r.object,
                    onPopoverMouseIn: r.func,
                    onPopoverMouseOut: r.func,
                    onTargetMouseIn: r.func,
                    onTargetMouseOut: r.func,
                    targetBounds: r.object,
                    targetPortal: r.object
                },
                InlinePopup: {
                    open: r.func,
                    close: r.func,
                    isOpen: r.bool,
                    isTargetOpen: r.bool
                },
                DocumentClickEvent: {
                    registerToDocumentClickEvent: r.func,
                    unRegisterToDocumentClickEvent: r.func
                },
                Container: {
                    defaultBackgroundStyle: r.object,
                    defaultContentArea: r.object
                },
                Component: {
                    isCollapsed: r.bool,
                    isHorizontallyDocked: r.bool,
                    id: r.string,
                    refInParent: r.string,
                    rootId: r.string,
                    pageId: r.string,
                    compActions: r.object,
                    structure: r.shape({
                        componentType: r.string.isRequired,
                        dataQuery: r.oneOfType([r.string, r.object]),
                        propertyQuery: r.oneOfType([r.string, r.object]),
                        designQuery: r.oneOfType([r.string, r.object]),
                        behaviorQuery: r.oneOfType([r.string, r.object]),
                        components: r.array,
                        skin: r.string,
                        styleId: r.string,
                        id: r.string,
                        type: r.string
                    }),
                    styleParam: {
                        textAlignment: r.string,
                        colorScheme: r.string
                    },
                    childrenLayout: r.object,
                    childrenStyle: r.object,
                    fixedChildrenIDs: r.array,
                    pinnedChildrenIDs: r.object,
                    rootNavigationInfo: r.shape({
                        pageId: r.string.isRequired,
                        title: r.string,
                        pageAdditionalData: r.string,
                        pageItemId: r.string,
                        pageItemAdditionalData: r.string,
                        transition: r.string,
                        anchorData: r.string
                    }),
                    currentUrlPageId: r.string,
                    pageStub: r.bool,
                    styleId: r.string,
                    skin: r.string,
                    getStyleData: r.func,
                    compProp: r.object,
                    compData: r.object,
                    compDesign: r.object,
                    renderFixedPosition: r.bool,
                    layout: r.object,
                    style: n,
                    meshParams: r.object,
                    rotationInDegrees: r.number,
                    scale: r.number,
                    flip: r.string,
                    currentUrlPageTitle: r.string,
                    dimensions: r.shape({
                        x: r.number.isRequired,
                        y: r.number.isRequired,
                        width: r.number.isRequired,
                        height: r.number.isRequired
                    }),
                    compStaticBehaviors: r.array,
                    theme: r.object,
                    compBehaviors: r.array,
                    trackBehaviorsToExecute: r.func,
                    isHiddenOnStart: r.bool,
                    shouldHideAnimatable: r.bool
                },
                Theme: {
                    all: r.object,
                    colors: r.array,
                    colorsMap: r.array,
                    THEME_DATA: r.object
                },
                Behaviors: {
                    handleAction: r.func,
                    registerBehaviors: r.func,
                    setBehaviorsForActions: r.func,
                    convertBehaviors: r.func,
                    handleBehavior: r.func
                },
                Layout: {
                    reLayoutIfPending: r.func,
                    registerReLayoutPending: r.func,
                    registerLayoutFunc: r.func,
                    responsiveContainerClassName: r.string,
                    layoutContainerClassName: r.string,
                    layoutContainerWrapperClassName: r.string,
                    layoutComponentClassName: r.string,
                    isMeshLayoutMechanism: r.bool
                },
                Utils: {
                    logging: {
                        performance: {
                            now: r.func
                        }
                    },
                    logger: r.shape({
                        error: r.func.isRequired
                    })
                },
                Device: {
                    isTouchDevice: r.bool,
                    isMobileDevice: r.bool,
                    devicePixelRatio: r.number,
                    isTabletDevice: r.func,
                    isDesktopDevice: r.func
                },
                Mobile: {
                    cannotHideIframeWithinRoundedCorners: r.bool,
                    siteZoomRatio: r.number,
                    invertedZoomRatio: r.number,
                    orientationZoomFix: r.number,
                    mobileZoom: r.number
                },
                RenderFlags: {
                    all: r.object,
                    allowShowingFixedComponents: r.bool,
                    componentPreviewState: r.string,
                    componentViewMode: r.string,
                    hideSiteBackground: r.bool,
                    ignoreComponentCollapsedProperty: r.bool,
                    ignoreComponentHiddenProperty: r.bool,
                    isBackToTopButtonAllowed: r.bool,
                    isComponentTransitionAllowed: r.bool,
                    isComponentVisible: r.bool,
                    isExternalNavigationAllowed: r.bool,
                    isPlayingAllowed: r.bool,
                    isSlideShowGalleryClickAllowed: r.bool,
                    isSocialInteractionAllowed: r.bool,
                    isTinyMenuOpenAllowed: r.bool,
                    isWixAdsAllowed: r.bool,
                    isZoomAllowed: r.bool,
                    renderFixedPositionBackgrounds: r.bool,
                    renderFixedPositionContainers: r.bool,
                    siteScale: r.number,
                    shouldBlockGoogleMapInteraction: r.bool,
                    shouldRenderTPAsIframe: r.bool,
                    shouldResetComponent: r.bool,
                    shouldResetGalleryToOriginalState: r.bool,
                    shouldResetSlideShowNextPrevButtonsPosition: r.bool,
                    shouldResetSubscribeFormMinMaxWidth: r.bool,
                    shouldResetTinyMenuZIndex: r.bool,
                    showControllers: r.bool,
                    showHiddenComponents: r.bool
                },
                RenderRealtimeConfig: {
                    previewTooltipCallback: r.func,
                    shouldHideTextComponent: r.bool,
                    shouldHideComponent: r.bool,
                    shouldShowComponentOnTop: r.bool,
                    componentOpacity: r.number
                },
                RawSvg: {
                    getRawSVG: r.string
                },
                Animations: {
                    animationProperties: r.object
                },
                ServiceTopology: {
                    scriptsDomainUrl: r.string,
                    staticMediaUrl: r.string,
                    staticVideoUrl: r.string,
                    staticAudioUrl: r.string,
                    scriptsLocationMap: r.object,
                    getMediaFullStaticUrl: r.func,
                    adaptiveVideoDomain: r.string,
                    serviceTopology: r.object,
                    getStaticHTMLComponentUrl: r.string,
                    staticHTMLComponentUrl: r.string
                },
                Browser: {
                    browser: r.object
                },
                BrowserFlags: {
                    cssFiltersSupported: r.bool,
                    ios: r.func,
                    forceOverflowScroll: r.func,
                    animateTinyMenuIcon: r.func,
                    highlightAnchorsInMenu: r.func,
                    positionFixedShouldBeAbsoluteAtPageBottom: r.func,
                    mixBlendModeSupported: r.func,
                    webglCrossOriginSupported: r.func,
                    webglVideoTextureSupported: r.func,
                    clipParallaxWithWebkitClipPath: r.func,
                    fixedBackgroundColorBalata: r.bool,
                    fixedSiteBackground: r.bool
                },
                Images: {
                    onImageUnmount: r.func
                },
                __DangerousSantaTypes: {
                    getRenderedMasterPageHeight: r.func,
                    getWindowSize: r.func,
                    getSliderGalleryMeasures: r.func,
                    getPaginatedGridGalleryMeasures: r.func,
                    getCustomMeasureMap: r.func,
                    getWindowInnerHeight: r.func
                },
                DAL: {
                    setCompState: r.func,
                    setCompData: r.func,
                    setCompProps: r.func,
                    removeCompState: r.func
                },
                PageGroup: {
                    pagesToRender: r.array,
                    createPageProps: r.func,
                    stubifyPage: r.func
                },
                Repeater: {
                    templateLayout: r.shape({
                        repeaterWidth: r.number,
                        templateWidth: r.number,
                        docked: r.shape({
                            left: a,
                            top: a,
                            right: a,
                            bottom: a
                        }),
                        itemCount: r.number
                    }),
                    setDisplayedOnlyCompsTemplateId: r.func,
                    clearDisplayedOnlyCompsTemplateId: r.func
                },
                SiteButton: {
                    link: r.object,
                    impliedLink: r.object
                },
                Tags: {
                    tagList: r.array
                },
                WPhoto: {
                    Link: r.object
                },
                WRichText: {
                    Links: r.object
                },
                Link: {
                    renderedLink: r.object,
                    renderInfo: r.shape({
                        primaryPageId: r.string,
                        currentUrl: r.object,
                        currentUrlPageId: r.string,
                        urlFormat: r.string,
                        mainPageId: r.string,
                        externalBaseUrl: r.string,
                        unicodeExternalBaseUrl: r.string,
                        publicBaseUrl: r.string,
                        isFeedbackEndpoint: r.bool,
                        isSiteHistoryEndpoint: r.bool,
                        isViewerMode: r.bool,
                        isWixSite: r.bool,
                        languageCode: r.string,
                        isTemplate: r.bool,
                        isUsingSlashUrlFormat: r.bool,
                        isPremiumDomain: r.bool,
                        serviceTopology: r.shape({
                            staticDocsUrl: r.string,
                            basePublicUrl: r.string,
                            baseDomain: r.string
                        }),
                        rendererModel: r.shape({
                            runningExperiments: r.object
                        }),
                        cookie: r.string,
                        routersConfigMap: r.object,
                        allPageIds: r.array,
                        pagesDataItemsMap: r.object,
                        mapFromPageUriSeoToPageId: r.object,
                        isPermalink: r.func,
                        rootNavigationInfo: r.object
                    })
                },
                VectorImage: {
                    svgId: r.string,
                    link: r.object,
                    strokeWidth: r.number,
                    svgString: r.string,
                    svgStringFromCropData: r.string,
                    svgInfo: r.object,
                    legacySvgString: r.string,
                    legacySvgInfo: r.object,
                    svgType: r.string,
                    overrideColorsAsCss: r.array,
                    shapeStyle: r.object,
                    preserveViewBox: r.bool,
                    shouldScaleStroke: r.bool,
                    svgPropsForMemberLoginIconItems: r.object,
                    svgPropsMapForMediaControls: r.object,
                    flipTransformStyle: r.object
                },
                GoogleMap: {
                    locations: r.array,
                    imageId: r.string,
                    imageBaseUrl: r.string,
                    language: r.string
                },
                WixAds: {
                    wixTopAdsHeight: r.number
                },
                WixUserSantaTypes: {
                    userLanguage: r.string,
                    userLanguageDirection: r.string
                },
                JsonLd: {
                    renderer: r.func
                },
                Audio: {
                    isPlaying: r.bool,
                    isSoundManagerOnResetup: r.bool,
                    soundManagerReady: r.bool,
                    createAudioObj: r.func,
                    updatePlayingComp: r.func,
                    updatePausingComp: r.func,
                    onHTML5ErrorTryToReloadWithFlash: r.func
                },
                TPA: {
                    data: r.shape({
                        isModalOpen: r.bool,
                        queryParams: r.object
                    }),
                    showModal: r.func,
                    removeModal: r.func,
                    showPopup: r.func,
                    removePopup: r.func,
                    removeAllPopups: r.func,
                    deleteCompListeners: r.func,
                    initialClientSpecMap: r.object,
                    publish: r.func,
                    subscribe: r.func,
                    unsubscribe: r.func,
                    handleTPAMessage: r.func,
                    sendPostMessage: r.func,
                    callHandler: r.func,
                    seoHtmlContent: r.string,
                    loadingTranslation: r.string
                },
                AspectComponent: {
                    addComponent: r.func,
                    deleteComponent: r.func
                },
                SocialShareHandler: {
                    handleShareRequest: r.func,
                    shortenURL: r.func
                },
                VerticalAnchorsMenu: {
                    updateInformation: r.func,
                    updateImageInfo: r.func,
                    registerToMeanColor: r.func,
                    unregisterToMeanColor: r.func,
                    getOverlappingBackgroundBrightness: r.func,
                    activeAnchor: r.object,
                    getAnchorLinkItems: r.func,
                    registerToActiveAnchor: r.func,
                    unregisterToActiveAnchor: r.func
                },
                HtmlPostMessage: {
                    registerComponent: r.func,
                    unRegisterComponent: r.func
                },
                Pinterest: {
                    data: r.object
                },
                MemberLogin: {
                    language: r.string,
                    memberName: r.string,
                    memberAvatar: r.string,
                    memberDefaultAvatar: r.string,
                    isLoggedIn: r.bool,
                    isConnectedToLoginData: r.bool,
                    menuItems: r.array,
                    iconItems: r.array
                },
                AnchorChange: {
                    activeAnchorData: r.object,
                    activeAnchorId: r.object
                },
                AppController: {
                    isVisible: r.bool,
                    applicativeUIData: r.shape({
                        icon: r.string.isRequired
                    })
                },
                Activity: {
                    activityInfo: r.shape({
                        currentUrl: r.object,
                        hubSecurityToken: r.number,
                        metaSiteId: r.string,
                        svSession: r.string,
                        baseUrl: r.string
                    })
                },
                mobile: {
                    cannotHideIframeWithinRoundedCorners: r.func,
                    isZoomed: r.func,
                    isZoomedIn: r.func,
                    getInvertedZoomRatio: r.func,
                    isAndroidOldBrowser: r.bool,
                    isPortrait: r.func,
                    mobileZoomByScreen: r.func,
                    isLandscape: r.func
                },
                Navigation: {
                    updateUrlIfNeeded: r.func,
                    href: r.func,
                    navigateToRenderedLink: r.func
                },
                CompDesign: {
                    containerStyle: r.object
                },
                MediaPlayerDesign: {
                    containerStyle: r.object
                },
                Menu: {
                    siteMenuWithRenderForTinyMenu: r.array,
                    siteMenuWithRender: r.array,
                    menuItems: r.array
                },
                urlFormat: r.string,
                getMainPageUrl: r.func,
                getCurrentUrl: r.func,
                biData: r.object,
                biVisitorId: r.string,
                isViewerMode: r.bool,
                globalImageQuality: r.object,
                getScreenWidth: r.func,
                getScreenHeight: r.func,
                screenSize: r.object,
                getScrollBarWidth: r.func,
                forceBackground: r.func,
                disableForcedBackground: r.func,
                currentPopupId: r.string,
                isTemplate: r.bool,
                isPremiumUser: r.bool,
                popupPage: {
                    close: r.func
                },
                popup: {
                    open: r.func
                },
                NonPageItemZoom: {
                    zoom: r.func,
                    unzoom: r.func,
                    currentItem: r.object
                },
                scrollToAnchor: r.func,
                navigateToPage: r.func,
                passClickEvent: r.func,
                RequestModel: {
                    cookie: r.string,
                    language: r.string
                },
                PublicModel: {
                    externalBaseUrl: r.string,
                    siteRevision: r.number,
                    renderType: r.string
                },
                isZoomOpened: r.bool,
                isFacebookSite: r.bool,
                Location: {
                    origin: r.string
                },
                primaryPageId: r.string,
                getPrimaryPageId: r.func,
                mainPageId: r.string,
                reportBeatEvent: r.func,
                getExistingRootNavigationInfo: r.func,
                pageUrl: r.string,
                pageUrlWithHash: r.string,
                getClientSpecMapEntry: r.func,
                enterFullScreenMode: r.func,
                exitFullScreenMode: r.func,
                enterOverflowHiddenMode: r.func,
                exitOverflowHiddenMode: r.func,
                enterMediaZoomMode: r.func,
                exitMediaZoomMode: r.func,
                ContactFormSantaTypes: {
                    contactFormTranslations: r.object,
                    orderedFields: r.array,
                    errorMessage: r.string,
                    validationErrorMessage: r.string,
                    compMasterPageData: r.bool,
                    isDynamicContactForm: r.bool,
                    siteApiForPromoteAnalytics: r.object
                },
                SiteMembersSantaTypes: {
                    smSettings: r.object,
                    isSiteMembersDialogsOpenAllowed: r.bool,
                    siteMembersUrl: r.string,
                    forgotPasswordToken: r.string,
                    dialogToDisplay: r.string,
                    isSiteMembersDialogOpen: r.bool,
                    isLoggedIn: r.bool,
                    logout: r.func,
                    showAuthenticationDialog: r.func,
                    getMemberDetails: r.func,
                    memberDetails: r.string,
                    memberDetailsInPreview: r.string,
                    reportSiteMembersBi: r.func,
                    registerToMemberDetailsChange: r.func,
                    unRegisterMemberDetailsChange: r.func
                },
                StoreSantaTypes: {
                    loadBatch: r.func
                },
                QuickActions: {
                    dynamicActions: r.array,
                    structuredAction: r.object
                },
                viewerSessionId: r.string,
                isSinglePostPage: r.bool,
                rootPageTitle: r.object,
                getUniquePageId: r.func,
                Page: {
                    markVisitedPage: r.func,
                    isPopupPage: r.bool,
                    popupAlignment: r.object
                },
                viewportStates: r.bool,
                isClientAfterSSR: r.bool,
                isFirstRenderAfterSSR: r.bool,
                isTpaRenderedInSsr: r.bool,
                isGoogleBot: r.bool,
                isCacheable: r.bool,
                compFactoryRuntimeState: r.object,
                resetCustomClickOccurred: r.func,
                shouldEnableMobileAnimations: r.bool,
                LoginButton: {
                    language: r.string,
                    actionTitle: r.string,
                    memberTitle: r.string,
                    isReadyToShow: r.bool
                },
                Social: {
                    CurrentPageSocialUrl: r.string,
                    MainPageSocialUrl: r.string
                },
                VK: {
                    size: r.shape({
                        width: r.number
                    })
                },
                SlideShow: {
                    slideStyle: r.object,
                    canAutoPlay: r.bool,
                    slidesIndexes: r.array,
                    startAutoPlayInViewport: r.func,
                    stopAutoPlayInViewport: r.func
                },
                pageMinHeightDefault: r.number,
                Accessibility: {
                    languageCodeForAriaLabel: r.string,
                    getTranslatedAriaLabel: r.func,
                    prefersReducedMotion: r.bool
                },
                Translations: {
                    getTranslationAllKeys: r.func
                },
                Responsive: {
                    getBreakpointMediaQuery: r.func
                },
                HeaderContainer: {
                    isAfterScroll: r.bool
                }
            }
        }
    }, function(t, e) {
        t.exports = l
    }, function(t, e, o) {
        "use strict";
        var r = o(0),
            i = o(18),
            n = o(1),
            a = o(22);
        t.exports = function(t) {
            return {
                propTypes: {
                    skin: n.Component.skin,
                    structure: n.Component.structure,
                    compTheme: n.Component.theme,
                    themeColor: n.Theme.colors,
                    isExperimentOpen: n.isExperimentOpen
                },
                getParams: function(t, e) {
                    var o = this,
                        i = {};
                    return r.forEach(t, (function(t) {
                        i[t] = o.getParamFromDefaultSkin(t, e)
                    })), i
                },
                getParamFromDefaultSkin: function(t, e) {
                    return this.getParamFromSkin(t, e || this.props.skin)
                },
                getParamFromSkin: function(e, o) {
                    var n = r.get(this.props.compTheme, "style.properties") || {},
                        s = a(t, o, this.props.isExperimentOpen),
                        l = n[e] || s.paramsDefaults && s.paramsDefaults[e];
                    return r.isArray(l) && l.length > 1 && ((n = r.clone(n))[e] = this.getSumParamValue(e, o)), i.renderParam(e, s, n, this.props.themeColor)
                },
                getSumParamValue: function(e, o) {
                    var i = this,
                        n = this.getSkinExports(),
                        s = a(t, o, this.props.isExperimentOpen).paramsDefaults,
                        l = s && s[e];
                    if (!l) {
                        var d = n[e];
                        return d && Math.abs(parseInt(d, 10)) || 0
                    }
                    return Array.isArray(l) ? r.sumBy(l, (function(t) {
                        return Math.abs(parseInt(i.getParamFromSkin(t, o).value, 10))
                    })) : Math.abs(parseInt(l, 10)) || 0
                },
                getFromExports: function(t) {
                    var e = this.getSkinExports();
                    return e && e[t] || 0
                },
                getStyleData: function(t) {
                    return t = t || this.props, r.get(t.compTheme, "style.properties") || {}
                }
            }
        }
    }, function(t, e, o) {
        "use strict";
        var r = o(0);
        t.exports = function(t, e, o) {
            return t.get ? t.get(e, o) : function(t, e) {
                if (!r.isNil(e)) {
                    var o = t[e];
                    return o || r.find(t, (function() {
                        return !0
                    }))
                }
            }(t, e)
        }
    }, function(t, e, o) {
        "use strict";
        var r = o(0),
            i = o(2).fonts;
        t.exports = function(t, e, o) {
            return r.reduce(t, (function(t, n, a) {
                var s = o(n ? n.skin : a);
                return s ? t.concat(function t(e, o, n, a) {
                    var s = [];
                    if (o.exports && (s = r(o.exports).pickBy((function(t) {
                            return t.skin && a(t.skin)
                        })).flatMap((function(o) {
                            return t(e, a(o.skin), n, a)
                        })).value()), o.params) {
                        var l = r.keys(r.omitBy(o.params, (function(t) {
                            return "FONT" !== t
                        })));
                        r.has(n, "style.properties") && r.forEach(l, (function(t) {
                            var r = "",
                                a = n.style.properties[t] || o.paramsDefaults[t],
                                l = /^(font|color)_[0-9]+$/.test(a) ? "theme" : "value";
                            "value" === l ? r = i.parseFontStr(a).family.toLowerCase() : "theme" === l && (r = i.getFontFamilyByStyleId(e, a)), r && s.push(r.replace(/\u0000$/, ""))
                        }))
                    }
                    return s
                }(e, s, n, o)) : t
            }), [])
        }
    }, function(t, e, o) {
        "use strict";
        var r = o(0),
            i = o(4),
            n = o(6),
            a = o(2),
            s = o(30),
            l = o(17),
            d = o(18).createSkinCss,
            p = [],
            c = a.cssUtils,
            u = 0,
            b = 1,
            g = 2,
            h = 3,
            m = h + 1,
            f = {};

        function w(t, e, o, a) {
            for (var s = [], l = void 0, d = m; d < t.length; d++) {
                var p = t[d];
                r.isString(p) ? s.push(p) : "remove" !== e[l = p[1]] && s.push(w(t[d], e, o, a))
            }
            var c = n.bind(null, t[u]),
                _ = r.clone(t[h]),
                v = t[g];
            v = v ? r.clone(v) : [];
            var x = void 0;
            if (null !== (l = t[b])) {
                var y = e[l];
                if (y) {
                    if (i.isValidElement(y)) return y;
                    r.forEach(y, (function(t, e) {
                        switch (e) {
                            case "parentConst":
                                c = t;
                                break;
                            case "children":
                                s = t;
                                break;
                            case "addChildren":
                                s = r.concat(s, t);
                                break;
                            case "addChildBefore":
                                var o = r.findIndex(s, {
                                    props: {
                                        refInParent: t[1]
                                    }
                                }); - 1 !== o ? s.splice(o, 0, t[0]) : s = s.concat(t[0]);
                                break;
                            case "addChildrenBefore":
                                s = (t || []).concat(s);
                                break;
                            case "wrap":
                                x = t;
                                break;
                            case "tagName":
                                break;
                            default:
                                r.has(f, e) || (_[e] = t)
                        }
                    }))
                }
                _.ref = l, r.isString(l) && l.length > 0 && (_.key = _.key || l), _.id = _.id || a + l, v.push(l)
            }
            if (v.length) {
                var k = function(t, e) {
                    return r.map(t, (function(t) {
                        return r.startsWith(t, "_g!") ? t.substr("_g!".length) : e + t
                    })).join(" ")
                }(v, o);
                _.className = _.className ? _.className + " " + k : k
            }(function(t) {
                if (!t.includes("-")) return !1;
                switch (t) {
                    case "annotation-xml":
                    case "color-profile":
                    case "font-face":
                    case "font-face-src":
                    case "font-face-uri":
                    case "font-face-format":
                    case "font-face-name":
                    case "missing-glyph":
                        return !1;
                    default:
                        return !0
                }
            })(t[u]) && _.className && (_.class = _.className, delete _.className);
            var R = c.apply(null, [_].concat(s));
            return x && (R = x[0].apply(null, [x[1], R])), R
        }
        r.forEach(l, (function(t) {
            l[t] = !0
        })), t.exports = {
            createSkinCss: function t(e, o, i, n, a, l, p) {
                if (!e) return null;
                var u = {
                    renderingEnv: {},
                    evals: s
                };
                a && r.assign(u.renderingEnv, {
                    siteZoomRatio: a.siteZoomRatio,
                    invertedZoomRatio: a.invertedZoomRatio,
                    orientationZoomFix: a.orientationZoomFix,
                    mobileZoom: a.mobileZoom
                }), l && l.scriptsLocationMap.skins && r.assign(u.renderingEnv, {
                    baseThemeUrl: l.scriptsLocationMap.skins + "/images/wysiwyg/core/themes/base/",
                    webThemeUrl: l.scriptsLocationMap.skins + "/images/wysiwyg/core/themes/viewer/"
                });
                var b = r.pick(i, ["color", "font"]),
                    g = d(e, o, b, n, u);
                return e.exports && r.forEach(e.exports, (function(e, r) {
                    var s = p(e.skin);
                    e.skin && s && (g += "\n" + t(s, o, i, c.concatenateStyleIdToSkinPart(n, r), a, l, p))
                })), g
            },
            renderSkinHTML: function(t, e, o, i, n, a, s, l, d) {
                var c = this,
                    u = function(t, e) {
                        return [r.get(e, '[""].tagName', "div"), "", [], {}].concat(t || [])
                    }(t, e);
                return r.forEach(p, (function(t) {
                    t.call(c, e, u, n, a, s, l, d)
                })), w(u, e, o, i)
            },
            registerRenderPlugin: function(t) {
                "function" == typeof t && p.push(t)
            },
            TAG_INDEX: u,
            REF_INDEX: b,
            CLASS_INDEX: g,
            CHILDREN_START: m
        }
    }, function(t, e, o) {
        "use strict";
        Object.defineProperty(e, "__esModule", {
            value: !0
        });
        var r = o(0);
        e.top = function(t) {
            return t.top
        }, e.left = function(t) {
            return t.left
        }, e.bottom = function(t) {
            return t.top + t.height
        }, e.height = function(t) {
            return t.height
        }, e.fitToContentHeight = function(t) {
            return Boolean(t.fitToContentHeight)
        }, e.getContainerHeight = function(t) {
            return r.max([t.height || 0, t.minHeight || 0])
        }, e.isRotated = function(t) {
            return r.isNumber(t.rotationInDegrees) && 0 !== t.rotationInDegrees
        }
    }, function(t, e, o) {
        "use strict";
        var r = {
            "wysiwyg.viewer.skins.screenwidthcontainer.AfterScroll": {
                react: [
                    ["div", "screenWidthBackground", [], {}],
                    ["div", "centeredContent", [], {},
                        ["div", "inlineContent", [], {}]
                    ]
                ],
                params: {
                    bg: "BG_COLOR_ALPHA",
                    brwt: "BORDER_TOP_SIZE",
                    brd: "BORDER_COLOR_ALPHA",
                    brwb: "BORDER_BOTTOM_SIZE",
                    shd: "BOX_SHADOW",
                    "bg-scrl": "BG_COLOR_ALPHA",
                    "brwt-scrl": "BORDER_TOP_SIZE",
                    "brd-scrl": "BORDER_COLOR_ALPHA",
                    "brwb-scrl": "BORDER_BOTTOM_SIZE",
                    "shd-scrl": "BOX_SHADOW"
                },
                paramsDefaults: {
                    bg: "color_11",
                    brwt: "0",
                    brd: "color_15",
                    brwb: "0",
                    shd: "0 0 5px rgba(0, 0, 0, 0.5)",
                    "bg-scrl": "color_11",
                    "brwt-scrl": "0",
                    "brd-scrl": "color_15",
                    "brwb-scrl": "0",
                    "shd-scrl": "0 0 5px rgba(0, 0, 0, 0.5)"
                },
                css: {
                    "%screenWidthBackground": "position:absolute;top:0;right:0;bottom:0;left:0;position:absolute;top:0;right:0;bottom:0;left:0;background-color:[bg];border-top:[brwt] solid [brd];border-bottom:[brwb] solid [brd];[shd]",
                    '%[data-state~="fixedPosition"]': "position:fixed !important;left:auto !important;z-index:50;",
                    '%[data-state~="fixedPosition"]%_footer': "top:auto;bottom:0;",
                    '%[data-state~="scrolled"] %screenWidthBackground': "background-color:[bg-scrl];border-top:[brwt-scrl] solid [brd-scrl];border-bottom:[brwb-scrl] solid [brd-scrl];[shd-scrl]",
                    '%[data-state~="transition-allowed"] %screenWidthBackground': "transition:all 0.3s ease;",
                    "%inlineContent": "position:absolute;top:0;right:0;bottom:0;left:0;",
                    "%centeredContent": "position:absolute;top:0;right:0;bottom:0;left:0;"
                }
            },
            "wysiwyg.viewer.skins.screenwidthcontainer.AppleScreen": {
                react: [
                    ["div", "screenWidthBackground", [], {}],
                    ["div", "centeredContent", [], {},
                        ["div", "bg", [], {}],
                        ["div", "inlineContent", [], {}]
                    ]
                ],
                params: {
                    shd: "BOX_SHADOW",
                    bg: "BG_COLOR_ALPHA",
                    rd: "BORDER_RADIUS",
                    brw: "SIZE",
                    brd: "BORDER_COLOR_ALPHA",
                    tdr: "URL"
                },
                paramsDefaults: {
                    shd: "0 1px 3px rgba(0, 0, 0, 0.5)",
                    bg: "color_11",
                    rd: "0",
                    brw: "0",
                    brd: "color_15",
                    tdr: "BASE_THEME_DIRECTORY"
                },
                css: {
                    "%screenWidthBackground": "position:absolute;top:0;right:0;bottom:0;left:0;",
                    '%[data-state~="fixedPosition"]': "position:fixed !important;left:auto !important;z-index:50;",
                    '%[data-state~="fixedPosition"]%_footer': "top:auto;bottom:0;",
                    "%bg": "position:absolute;top:0;right:0;bottom:0;left:0;[shd]  background-color:[bg];[rd]  border:[brw] solid [brd];background-image:url([tdr]apple_box.png);background-repeat:repeat-x;background-position:0 0;",
                    "%inlineContent": "position:absolute;top:[brw];right:[brw];bottom:[brw];left:[brw];",
                    "%centeredContent": "position:absolute;top:0;right:0;bottom:0;left:0;"
                }
            },
            "wysiwyg.viewer.skins.screenwidthcontainer.BevelScreen": {
                react: [
                    ["div", "screenWidthBackground", [], {},
                        ["div", null, ["_bg"], {}]
                    ],
                    ["div", "centeredContent", [], {},
                        ["div", "bg", [], {}],
                        ["div", "inlineContent", [], {}]
                    ]
                ],
                params: {
                    shd: "BOX_SHADOW",
                    bg: "BG_COLOR_ALPHA",
                    brwt: "SIZE",
                    brd: "BORDER_COLOR_ALPHA",
                    brwb: "SIZE",
                    tdr: "URL"
                },
                paramsDefaults: {
                    shd: "inset 0 1px 1px rgba(255, 255, 255, 0.6), inset 0 -1px 1px rgba(0, 0, 0, 0.6), 0 0 5px rgba(0, 0, 0, 0.6)",
                    bg: "color_11",
                    brwt: "0",
                    brd: "color_15",
                    brwb: "0",
                    tdr: "BASE_THEME_DIRECTORY"
                },
                css: {
                    "%screenWidthBackground": "position:absolute;top:0;right:0;bottom:0;left:0;",
                    '%[data-state~="fixedPosition"]': "position:fixed !important;left:auto !important;z-index:50;",
                    '%[data-state~="fixedPosition"]%_footer': "top:auto;bottom:0;",
                    "%_bg": "position:absolute;top:0;right:0;bottom:0;left:0;[shd]  background-color:[bg];border-top:[brwt] solid [brd];border-bottom:[brwb] solid [brd];background-image:url([tdr]bevel_300.png);background-repeat:repeat-x;",
                    "%bg": "position:absolute;top:[brwt];right:0;bottom:[brwb];left:0;",
                    '%[data-state~="mobileView"] %bg': "left:10px;right:10px;",
                    "%inlineContent": "position:absolute;top:0;right:0;bottom:0;left:0;",
                    "%centeredContent": "position:absolute;top:0;right:0;bottom:0;left:0;"
                }
            },
            "wysiwyg.viewer.skins.screenwidthcontainer.BlankScreen": {
                react: [
                    ["div", "screenWidthBackground", [], {}],
                    ["div", "centeredContent", [], {},
                        ["div", "bg", [], {}],
                        ["div", "inlineContent", [], {}]
                    ]
                ],
                css: {
                    "%screenWidthBackground": "position:absolute;top:0;right:0;bottom:0;left:0;",
                    '%[data-state~="fixedPosition"]': "position:fixed !important;left:auto !important;z-index:50;",
                    '%[data-state~="fixedPosition"]%_footer': "top:auto;bottom:0;",
                    "%bg": "position:absolute;top:0;right:0;bottom:0;left:0;",
                    "%inlineContent": "position:absolute;top:0;right:0;bottom:0;left:0;",
                    "%centeredContent": "position:absolute;top:0;right:0;bottom:0;left:0;"
                }
            },
            "wysiwyg.viewer.skins.screenwidthcontainer.BoxScreen": {
                react: [
                    ["div", "screenWidthBackground", [], {}],
                    ["div", "centeredContent", [], {},
                        ["div", "bg", [], {}],
                        ["div", "inlineContent", [], {}]
                    ]
                ],
                params: {
                    shd: "BOX_SHADOW",
                    bg: "BG_COLOR_ALPHA",
                    rd: "BORDER_RADIUS",
                    brw: "SIZE",
                    brd: "BORDER_COLOR_ALPHA"
                },
                paramsDefaults: {
                    shd: "0 1px 3px rgba(0, 0, 0, 0.5)",
                    bg: "color_11",
                    rd: "0",
                    brw: "0",
                    brd: "color_15"
                },
                css: {
                    "%screenWidthBackground": "position:absolute;top:0;right:0;bottom:0;left:0;",
                    '%[data-state~="fixedPosition"]': "position:fixed !important;left:auto !important;z-index:50;",
                    '%[data-state~="fixedPosition"]%_footer': "top:auto;bottom:0;",
                    "%bg": "position:absolute;top:0;right:0;bottom:0;left:0;[shd]  background-color:[bg];[rd]  border:[brw] solid [brd];box-sizing:border-box;",
                    "%inlineContent": "position:absolute;top:[brw];right:[brw];bottom:[brw];left:[brw];",
                    "%centeredContent": "position:absolute;top:0;right:0;bottom:0;left:0;"
                }
            },
            "wysiwyg.viewer.skins.screenwidthcontainer.DefaultScreen": {
                react: [
                    ["div", "screenWidthBackground", [], {},
                        ["div", null, ["_bg"], {}]
                    ],
                    ["div", "centeredContent", [], {},
                        ["div", "bg", [], {},
                            ["div", null, ["_bg-center"], {}]
                        ],
                        ["div", "inlineContent", [], {}]
                    ]
                ],
                params: {
                    bg: "BG_COLOR_ALPHA",
                    shd: "BOX_SHADOW",
                    brwt: "SIZE",
                    brd: "BORDER_COLOR_ALPHA",
                    brwb: "SIZE",
                    bgctr: "BG_COLOR_ALPHA",
                    rd: "BORDER_RADIUS"
                },
                paramsDefaults: {
                    bg: "color_11",
                    shd: "0 0 5px rgba(0, 0, 0, 0.7)",
                    brwt: "0",
                    brd: "color_15",
                    brwb: "0",
                    bgctr: "color_11",
                    rd: "0"
                },
                css: {
                    "%screenWidthBackground": "position:absolute;top:0;right:0;bottom:0;left:0;",
                    '%[data-state~="fixedPosition"]': "position:fixed !important;left:auto !important;z-index:50;",
                    '%[data-state~="fixedPosition"]%_footer': "top:auto;bottom:0;",
                    "%_bg": "position:absolute;top:0;right:0;bottom:0;left:0;background-color:[bg];[shd]  border-top:[brwt] solid [brd];border-bottom:[brwb] solid [brd];",
                    "%bg": "position:absolute;top:0;right:0;bottom:0;left:0;",
                    '%[data-state~="mobileView"] %bg': "left:10px;right:10px;",
                    "%_bg-center": "position:absolute;top:[brwt];right:0;bottom:[brwb];left:0;background-color:[bgctr];[rd]",
                    "%inlineContent": "position:absolute;top:0;right:0;bottom:0;left:0;",
                    "%centeredContent": "position:absolute;top:0;right:0;bottom:0;left:0;"
                }
            },
            "wysiwyg.viewer.skins.screenwidthcontainer.DoubleBorderScreen": {
                react: [
                    ["div", "screenWidthBackground", [], {},
                        ["div", null, ["_bg"], {}],
                        ["div", null, ["_outer"], {},
                            ["div", null, ["_inner"], {}]
                        ]
                    ],
                    ["div", "centeredContent", [], {},
                        ["div", "inlineContent", [], {}]
                    ]
                ],
                params: {
                    bgPosition: "SIZE",
                    bg: "BG_COLOR_ALPHA",
                    shd: "BOX_SHADOW",
                    bordersPosition: "SIZE",
                    outerLineSize: "BORDER_SIZE",
                    brd: "BORDER_COLOR_ALPHA",
                    lineGap: "SIZE",
                    innerLineSize: "BORDER_SIZE",
                    brd2: "BORDER_COLOR_ALPHA"
                },
                paramsDefaults: {
                    bgPosition: "0",
                    bg: "color_11",
                    shd: "0 0 5px rgba(0, 0, 0, 0.7)",
                    bordersPosition: "6",
                    outerLineSize: "3",
                    brd: "color_15",
                    lineGap: "5",
                    innerLineSize: "1",
                    brd2: "color_14"
                },
                css: {
                    "%screenWidthBackground": "position:absolute;top:0;right:0;bottom:0;left:0;",
                    '%[data-state~="fixedPosition"]': "position:fixed !important;left:auto !important;z-index:50;",
                    '%[data-state~="fixedPosition"]%_footer': "top:auto;bottom:0;",
                    "%_bg": "position:absolute;top:[bgPosition];right:0;bottom:[bgPosition];left:0;background-color:[bg];[shd]",
                    "%_outer": "position:absolute;top:[bordersPosition];right:0;bottom:[bordersPosition];left:0;border-top:[outerLineSize] solid [brd];border-bottom:[outerLineSize] solid [brd];",
                    "%_inner": "position:absolute;top:[lineGap];right:0;bottom:[lineGap];left:0;border-top:[innerLineSize] solid [brd2];border-bottom:[innerLineSize] solid [brd2];",
                    "%inlineContent": "position:absolute;top:0;right:0;bottom:0;left:0;",
                    "%centeredContent": "position:absolute;top:0;right:0;bottom:0;left:0;"
                }
            },
            "wysiwyg.viewer.skins.screenwidthcontainer.GridScreen": {
                react: [
                    ["div", "screenWidthBackground", [], {}],
                    ["div", "centeredContent", [], {},
                        ["div", "bg", [], {}],
                        ["div", "inlineContent", [], {}]
                    ]
                ],
                params: {
                    bg: "BG_COLOR_ALPHA",
                    xxx: "BG_COLOR_ALPHA",
                    tdr: "URL"
                },
                paramsDefaults: {
                    bg: "color_11",
                    xxx: "color_1",
                    tdr: "BASE_THEME_DIRECTORY"
                },
                css: {
                    "%screenWidthBackground": "position:absolute;top:0;right:0;bottom:0;left:0;background-color:[bg];background:[xxx] url([tdr]net.png) center center repeat;",
                    '%[data-state~="fixedPosition"]': "position:fixed !important;left:auto !important;z-index:50;",
                    '%[data-state~="fixedPosition"]%_footer': "top:auto;bottom:0;",
                    "%bg": "position:absolute;top:0;right:0;bottom:0;left:0;background:#fff url([tdr]grid.png) repeat-y 50% 0;",
                    "%inlineContent": "position:absolute;top:0;right:0;bottom:0;left:0;",
                    "%centeredContent": "position:absolute;top:0;right:0;bottom:0;left:0;"
                }
            },
            "wysiwyg.viewer.skins.screenwidthcontainer.InnerShadowScreen": {
                react: [
                    ["div", "screenWidthBackground", [], {}],
                    ["div", "centeredContent", [], {},
                        ["div", "bg", ["_border"], {},
                            ["div", null, ["_bg"], {}]
                        ],
                        ["div", "inlineContent", [], {}]
                    ]
                ],
                params: {
                    brd: "BG_COLOR_ALPHA",
                    rd: "BORDER_RADIUS",
                    brw: "SIZE",
                    bg: "BG_COLOR_ALPHA",
                    shd: "BOX_SHADOW"
                },
                paramsDefaults: {
                    brd: "color_15",
                    rd: "0",
                    brw: "0",
                    bg: "color_11",
                    shd: "inset 0 1px 2px rgba(0, 0, 0, 0.6), inset 0 -1px 1px rgba(255, 255, 255, 0.75)"
                },
                css: {
                    "%screenWidthBackground": "position:absolute;top:0;right:0;bottom:0;left:0;",
                    '%[data-state~="fixedPosition"]': "position:fixed !important;left:auto !important;z-index:50;",
                    '%[data-state~="fixedPosition"]%_footer': "top:auto;bottom:0;",
                    "%_border": "position:absolute;top:0;right:0;bottom:0;left:0;background:[brd];[rd]",
                    '%[data-state~="mobileView"] %_border': "left:10px;right:10px;",
                    "%_bg": "position:absolute;top:[brw];right:[brw];bottom:[brw];left:[brw];background-color:[bg];[rd]  [shd]",
                    "%inlineContent": "position:absolute;top:0;right:0;bottom:0;left:0;",
                    "%centeredContent": "position:absolute;top:0;right:0;bottom:0;left:0;"
                }
            },
            "wysiwyg.viewer.skins.screenwidthcontainer.IronScreen": {
                react: [
                    ["div", "screenWidthBackground", [], {},
                        ["div", null, ["_bg"], {}]
                    ],
                    ["div", "centeredContent", [], {},
                        ["div", "inlineContent", [], {}]
                    ]
                ],
                params: {
                    bg: "BG_COLOR_ALPHA",
                    shd: "BOX_SHADOW",
                    tdr: "URL",
                    shadow: "BOX_SHADOW"
                },
                paramsDefaults: {
                    bg: "color_11",
                    shd: "0 0 5px rgba(0, 0, 0, 0.7)",
                    tdr: "BASE_THEME_DIRECTORY",
                    shadow: "inset 0 4px 6px -4px rgba(255, 255, 255, 0.59), inset 0 1px 0 0 rgba(255, 255, 255, 0.59), inset 0 -5px 5px -5px rgba(255, 255, 255, 0.9)"
                },
                css: {
                    "%screenWidthBackground": "position:absolute;top:0;right:0;bottom:0;left:0;background-color:[bg];[shd]  background-image:url([tdr]ironpatern.png);",
                    '%[data-state~="fixedPosition"]': "position:fixed !important;left:auto !important;z-index:50;",
                    '%[data-state~="fixedPosition"]%_footer': "top:auto;bottom:0;",
                    "%_bg": "[shadow]",
                    '%[data-state~="mobileView"] %_bg': "left:10px;right:10px;",
                    "%inlineContent,%centeredContent": "position:absolute;top:0;right:0;bottom:0;left:0;"
                }
            },
            "wysiwyg.viewer.skins.screenwidthcontainer.LiftedBottomScreen": {
                react: [
                    ["div", "screenWidthBackground", [], {}],
                    ["div", "centeredContent", [], {},
                        ["div", "bg", [], {},
                            ["div", null, ["_shadow", "_leftBottom"], {}],
                            ["div", null, ["_shadow", "_centerBottom"], {}],
                            ["div", null, ["_shadow", "_rightBottom"], {}],
                            ["div", null, ["_border"], {},
                                ["div", null, ["_bg"], {}]
                            ]
                        ],
                        ["div", "inlineContent", [], {}]
                    ]
                ],
                params: {
                    brd: "BG_COLOR_ALPHA",
                    brw: "SIZE",
                    bg: "BG_COLOR_ALPHA",
                    tdr: "URL"
                },
                paramsDefaults: {
                    brd: "color_15",
                    brw: "0",
                    bg: "color_11",
                    tdr: "BASE_THEME_DIRECTORY"
                },
                css: {
                    "%screenWidthBackground": "position:absolute;top:0;right:0;bottom:0;left:0;",
                    '%[data-state~="fixedPosition"]': "position:fixed !important;left:auto !important;z-index:50;",
                    '%[data-state~="fixedPosition"]%_footer': "top:auto;bottom:0;",
                    "%_border": "position:absolute;top:0;right:0;bottom:0;left:0;background:[brd];",
                    "%bg": "position:absolute;top:0;right:0;bottom:0;left:0;",
                    "%_bg": "position:absolute;top:[brw];right:[brw];bottom:[brw];left:[brw];background-color:[bg];",
                    "%_shadow": "position:absolute;top:-15px;bottom:-15px;background-image:url([tdr]shdbottom.png);background-repeat:no-repeat;pointer-events:none;",
                    "%_leftBottom": "left:-15px;background-position:left bottom;width:50px;",
                    "%_rightBottom": "right:-15px;background-position:right bottom;width:50px;",
                    "%_centerBottom": "right:35px;left:35px;background-position:center bottom;",
                    "%inlineContent": "position:absolute;top:0;right:0;bottom:0;left:0;",
                    "%centeredContent": "position:absolute;top:0;right:0;bottom:0;left:0;",
                    '%[data-state~="mobileView"] %_border': "left:10px;right:10px;",
                    '%[data-state~="mobileView"] %_shadow': "display:none;"
                }
            },
            "wysiwyg.viewer.skins.screenwidthcontainer.LiftedShadowScreen": {
                react: [
                    ["div", "screenWidthBackground", [], {}],
                    ["div", "centeredContent", [], {},
                        ["div", null, ["_left", "_shd"], {}],
                        ["div", null, ["_right", "_shd"], {}],
                        ["div", "bg", [], {}],
                        ["div", "inlineContent", [], {}]
                    ]
                ],
                params: {
                    shd: "BOX_SHADOW",
                    bg: "BG_COLOR_ALPHA",
                    rd: "BORDER_RADIUS",
                    brw: "SIZE",
                    brd: "BORDER_COLOR_ALPHA",
                    tdr: "URL"
                },
                paramsDefaults: {
                    shd: "0 1px 3px rgba(0, 0, 0, 0.5)",
                    bg: "color_11",
                    rd: "0",
                    brw: "0",
                    brd: "color_15",
                    tdr: "BASE_THEME_DIRECTORY"
                },
                css: {
                    "%screenWidthBackground": "position:absolute;top:0;right:0;bottom:0;left:0;",
                    '%[data-state~="fixedPosition"]': "position:fixed !important;left:auto !important;z-index:50;",
                    '%[data-state~="fixedPosition"]%_footer': "top:auto;bottom:0;",
                    "%bg": "position:absolute;top:0;right:0;bottom:0;left:0;[shd]  background-color:[bg];[rd]  border:[brw] solid [brd];",
                    "%_shd": "position:absolute;bottom:-26px;width:165px;height:26px;background-image:url([tdr]liftedshadow_medium.png);background-repeat:no-repeat;pointer-events:none;",
                    "%_left": "left:-20px;background-position:0 0;",
                    "%_right": "right:-20px;background-position:100% 0;",
                    "%inlineContent": "position:absolute;top:[brw];right:[brw];bottom:[brw];left:[brw];",
                    "%centeredContent": "position:absolute;top:0;right:0;bottom:0;left:0;"
                }
            },
            "wysiwyg.viewer.skins.screenwidthcontainer.LiftedTopScreen": {
                react: [
                    ["div", "screenWidthBackground", [], {}],
                    ["div", "centeredContent", [], {},
                        ["div", "bg", ["_border"], {},
                            ["div", null, ["_shadow", "_leftTop"], {}],
                            ["div", null, ["_shadow", "_centerTop"], {}],
                            ["div", null, ["_shadow", "_rightTop"], {}],
                            ["div", null, ["_bg"], {}]
                        ],
                        ["div", "inlineContent", [], {}]
                    ]
                ],
                params: {
                    brd: "BG_COLOR_ALPHA",
                    brw: "SIZE",
                    bg: "BG_COLOR_ALPHA",
                    tdr: "URL"
                },
                paramsDefaults: {
                    brd: "color_15",
                    brw: "0",
                    bg: "color_11",
                    tdr: "BASE_THEME_DIRECTORY"
                },
                css: {
                    "%screenWidthBackground": "position:absolute;top:0;right:0;bottom:0;left:0;",
                    '%[data-state~="fixedPosition"]': "position:fixed !important;left:auto !important;z-index:50;",
                    '%[data-state~="fixedPosition"]%_footer': "top:auto;bottom:0;",
                    "%_border": "position:absolute;top:0;right:0;bottom:0;left:0;background-color:[brd];",
                    "%_bg": "position:absolute;top:[brw];right:[brw];bottom:[brw];left:[brw];background-color:[bg];",
                    "%_shadow": "position:absolute;top:-15px;bottom:-15px;background-image:url([tdr]shdtop.png);background-repeat:no-repeat;pointer-events:none;",
                    "%_leftTop": "left:-15px;background-position:left top;width:50px;",
                    "%_rightTop": "right:-15px;background-position:right top;width:50px;",
                    "%_centerTop": "right:35px;left:35px;background-position:center top;",
                    "%inlineContent": "position:absolute;top:0;right:0;bottom:0;left:0;",
                    "%centeredContent": "position:absolute;top:0;right:0;bottom:0;left:0;",
                    '%[data-state~="mobileView"] %_border': "left:10px;right:10px;",
                    '%[data-state~="mobileView"] %_shadow': "display:none;"
                }
            },
            "wysiwyg.viewer.skins.screenwidthcontainer.LineBottomScreen": {
                react: [
                    ["div", "screenWidthBackground", [], {}],
                    ["div", "centeredContent", [], {},
                        ["div", "bg", [], {}],
                        ["div", "inlineContent", [], {}]
                    ]
                ],
                params: {
                    brd: "COLOR_ALPHA",
                    bg: "BG_COLOR_ALPHA",
                    xxx: "BG_COLOR_ALPHA",
                    tdr: "URL"
                },
                paramsDefaults: {
                    brd: "color_15",
                    bg: "color_11",
                    xxx: "color_11",
                    tdr: "BASE_THEME_DIRECTORY"
                },
                css: {
                    "%screenWidthBackground": "position:absolute;top:0;right:0;bottom:0;left:0;border-bottom:1px solid [brd];",
                    '%[data-state~="fixedPosition"]': "position:fixed !important;left:auto !important;z-index:50;",
                    '%[data-state~="fixedPosition"]%_footer': "top:auto;bottom:0;",
                    "%bg": "position:absolute;top:0;right:0;bottom:0;left:0;background-color:[bg];background:[xxx] url([tdr]net.png) center center repeat;",
                    "%inlineContent": "position:absolute;top:0;right:0;bottom:0;left:0;",
                    "%centeredContent": "position:absolute;top:0;right:0;bottom:0;left:0;"
                }
            },
            "wysiwyg.viewer.skins.screenwidthcontainer.LineTopScreen": {
                react: [
                    ["div", "screenWidthBackground", [], {}],
                    ["div", "centeredContent", [], {},
                        ["div", "bg", [], {}],
                        ["div", "inlineContent", [], {}]
                    ]
                ],
                params: {
                    brd: "COLOR_ALPHA",
                    xxx: "BG_COLOR_ALPHA",
                    tdr: "URL",
                    bg: "BG_COLOR_ALPHA"
                },
                paramsDefaults: {
                    brd: "color_15",
                    xxx: "color_11",
                    tdr: "BASE_THEME_DIRECTORY",
                    bg: "color_11"
                },
                css: {
                    "%screenWidthBackground": "position:absolute;top:0;right:0;bottom:0;left:0;border-top:1px solid [brd];background:[xxx] url([tdr]net.png) center center repeat;",
                    '%[data-state~="fixedPosition"]': "position:fixed !important;left:auto !important;z-index:50;",
                    '%[data-state~="fixedPosition"]%_footer': "top:auto;bottom:0;",
                    "%bg": "position:absolute;top:0;right:0;bottom:0;left:0;background-color:[bg];",
                    "%inlineContent": "position:absolute;top:0;right:0;bottom:0;left:0;",
                    "%centeredContent": "position:absolute;top:0;right:0;bottom:0;left:0;"
                }
            },
            "wysiwyg.viewer.skins.screenwidthcontainer.NoiseScreen": {
                react: [
                    ["div", "screenWidthBackground", [], {}],
                    ["div", "centeredContent", [], {},
                        ["div", "bg", [], {}],
                        ["div", "inlineContent", [], {}]
                    ]
                ],
                params: {
                    bgc: "BG_COLOR_ALPHA",
                    xxx: "BG_COLOR_ALPHA",
                    tdr: "URL"
                },
                paramsDefaults: {
                    bgc: "color_11",
                    xxx: "color_1",
                    tdr: "BASE_THEME_DIRECTORY"
                },
                css: {
                    "%screenWidthBackground": "position:absolute;top:0;right:0;bottom:0;left:0;background-color:[bgc];background:[xxx] url([tdr]net.png) center center repeat;",
                    '%[data-state~="fixedPosition"]': "position:fixed !important;left:auto !important;z-index:50;",
                    '%[data-state~="fixedPosition"]%_footer': "top:auto;bottom:0;",
                    "%bg": "position:absolute;top:0;right:0;bottom:0;left:0;",
                    "%inlineContent": "position:absolute;top:0;right:0;bottom:0;left:0;",
                    "%centeredContent": "position:absolute;top:0;right:0;bottom:0;left:0;"
                }
            },
            "wysiwyg.viewer.skins.screenwidthcontainer.ShadowBottomScreen": {
                react: [
                    ["div", "centerArea", [], {},
                        ["div", null, ["_left", "_ln"], {}],
                        ["div", null, ["_center", "_ln"], {}],
                        ["div", null, ["_right", "_ln"], {}]
                    ],
                    ["div", "screenWidthBackground", [], {},
                        ["div", null, ["_bg"], {}]
                    ],
                    ["div", "centeredContent", [], {},
                        ["div", "bg", [], {}],
                        ["div", "inlineContent", [], {}]
                    ]
                ],
                params: {
                    tdr: "URL",
                    bg: "BG_COLOR_ALPHA",
                    shd: "BOX_SHADOW",
                    brwt: "BORDER_TOP_SIZE",
                    brd: "BORDER_COLOR_ALPHA",
                    brwb: "BORDER_BOTTOM_SIZE",
                    bgctr: "BG_COLOR_ALPHA"
                },
                paramsDefaults: {
                    tdr: "BASE_THEME_DIRECTORY",
                    bg: "color_11",
                    shd: "0 0 5px rgba(0, 0, 0, 0.7)",
                    brwt: "0",
                    brd: "color_15",
                    brwb: "0",
                    bgctr: "color_11"
                },
                css: {
                    "%screenWidthBackground": "position:absolute;top:0;right:0;bottom:0;left:0;",
                    '%[data-state~="fixedPosition"]': "position:fixed !important;left:auto !important;z-index:50;",
                    '%[data-state~="fixedPosition"]%_footer': "top:auto;bottom:0;",
                    "%_ln": "bottom:-14px;height:14px;min-height:14px;background-image:url([tdr]shadowbottom.png);position:absolute;",
                    "%_left": "background-position:0 -29px;width:100px;left:0;",
                    "%_right": "background-position:100% -29px;width:100px;right:0;",
                    '%[data-state~="mobileView"] %centerArea': "width:320px;",
                    "%centerArea": "position:relative;width:980px;height:100%;margin:auto;",
                    "%_center": "background-position:0 0;right:100px;left:100px;",
                    "%_bg": "position:absolute;top:0;right:0;bottom:0;left:0;background-color:[bg];[shd]  border-top:[brwt] solid [brd];border-bottom:[brwb] solid [brd];",
                    "%bg": "position:absolute;left:0;right:0;top:[brwt];bottom:[brwb];background-color:[bgctr];",
                    "%inlineContent": "position:absolute;top:0;right:0;bottom:0;left:0;",
                    "%centeredContent": "position:absolute;top:0;right:0;bottom:0;left:0;",
                    '%[data-state~="mobileView"] %bg': "left:10px;right:10px;"
                }
            },
            "wysiwyg.viewer.skins.screenwidthcontainer.ShadowScreen": {
                react: [
                    ["div", "screenWidthBackground", [], {}],
                    ["div", "centeredContent", [], {},
                        ["div", "bg", [], {}],
                        ["div", "inlineContent", [], {}]
                    ]
                ],
                params: {
                    shd: "BOX_SHADOW",
                    bgc: "BG_COLOR_ALPHA",
                    clr: "BORDER_COLOR_ALPHA",
                    xxx: "BG_COLOR_ALPHA",
                    tdr: "URL"
                },
                paramsDefaults: {
                    shd: "0 0 5px rgba(0, 0, 0, 0.5)",
                    bgc: "color_11",
                    clr: "color_15",
                    xxx: "color_11",
                    tdr: "BASE_THEME_DIRECTORY"
                },
                css: {
                    "%screenWidthBackground": "position:absolute;top:0;right:0;bottom:0;left:0;",
                    '%[data-state~="fixedPosition"]': "position:fixed !important;left:auto !important;z-index:50;",
                    '%[data-state~="fixedPosition"]%_footer': "top:auto;bottom:0;",
                    "%bg": "position:absolute;top:0;right:0;bottom:0;left:0;[shd]  background-color:[bgc];border:1px solid [clr];background:[xxx] url([tdr]net.png) center center repeat;",
                    "%inlineContent": "position:absolute;top:0;right:0;bottom:0;left:0;",
                    "%centeredContent": "position:absolute;top:0;right:0;bottom:0;left:0;"
                }
            },
            "wysiwyg.viewer.skins.screenwidthcontainer.ShadowTopScreen": {
                react: [
                    ["div", "screenWidthBackground", [], {},
                        ["div", null, ["_bg"], {}]
                    ],
                    ["div", "centeredContent", [], {},
                        ["div", "bg", [], {},
                            ["div", null, ["_left", "_ln"], {}],
                            ["div", null, ["_center", "_ln"], {}],
                            ["div", null, ["_right", "_ln"], {}]
                        ],
                        ["div", "inlineContent", [], {}]
                    ]
                ],
                params: {
                    tdr: "URL",
                    bg: "BG_COLOR_ALPHA",
                    shd: "BOX_SHADOW",
                    brwt: "SIZE",
                    brd: "BORDER_COLOR_ALPHA",
                    brwb: "SIZE",
                    bgctr: "BG_COLOR_ALPHA"
                },
                paramsDefaults: {
                    tdr: "BASE_THEME_DIRECTORY",
                    bg: "color_11",
                    shd: "0 0 5px rgba(0, 0, 0, 0.7)",
                    brwt: "0",
                    brd: "color_15",
                    brwb: "0",
                    bgctr: "color_11"
                },
                css: {
                    "%screenWidthBackground": "position:absolute;top:0;right:0;bottom:0;left:0;",
                    '%[data-state~="fixedPosition"]': "position:fixed !important;left:auto !important;z-index:50;",
                    '%[data-state~="fixedPosition"]%_footer': "top:auto;bottom:0;",
                    "%_ln": "top:-14px;height:14px;min-height:14px;background-image:url([tdr]shadowtop.png);position:absolute;",
                    "%_left": "background-position:0 0;width:100px;left:0;",
                    "%_right": "background-position:100% 0;width:100px;right:0;",
                    "%_center": "background-position:0 14px;right:100px;left:100px;",
                    "%_bg": "position:absolute;top:0;right:0;bottom:0;left:0;background-color:[bg];[shd]  border-top:[brwt] solid [brd];border-bottom:[brwb] solid [brd];",
                    "%bg": "position:absolute;top:[brwt];right:0;bottom:[brwb];left:0;background-color:[bgctr];",
                    "%inlineContent": "position:absolute;top:0;right:0;bottom:0;left:0;",
                    "%centeredContent": "position:absolute;top:0;right:0;bottom:0;left:0;"
                }
            },
            "wysiwyg.viewer.skins.screenwidthcontainer.SolidScreen": {
                react: [
                    ["div", "screenWidthBackground", [], {}],
                    ["div", "centeredContent", [], {},
                        ["div", "bg", [], {}],
                        ["div", "inlineContent", [], {}]
                    ]
                ],
                params: {
                    bgc: "BG_COLOR_ALPHA",
                    xxx: "BG_COLOR_ALPHA",
                    tdr: "URL"
                },
                paramsDefaults: {
                    bgc: "color_11",
                    xxx: "color_1",
                    tdr: "BASE_THEME_DIRECTORY"
                },
                css: {
                    "%screenWidthBackground": "position:absolute;top:0;right:0;bottom:0;left:0;background-color:[bgc];background:[xxx] url([tdr]net.png) center center repeat;",
                    '%[data-state~="fixedPosition"]': "position:fixed !important;left:auto !important;z-index:50;",
                    '%[data-state~="fixedPosition"]%_footer': "top:auto;bottom:0;",
                    "%bg": "position:absolute;top:0;right:0;bottom:0;left:0;",
                    "%inlineContent": "position:absolute;top:0;right:0;bottom:0;left:0;",
                    "%centeredContent": "position:absolute;top:0;right:0;bottom:0;left:0;"
                }
            },
            "wysiwyg.viewer.skins.screenwidthcontainer.ThreeDeeScreen": {
                react: [
                    ["div", "screenWidthBackground", [], {}],
                    ["div", "centeredContent", [], {},
                        ["div", "bg", [], {},
                            ["div", null, ["_bg"], {},
                                ["div", null, ["_border"], {}]
                            ]
                        ],
                        ["div", "inlineContent", [], {}]
                    ]
                ],
                params: {
                    brd: "BG_COLOR_ALPHA",
                    rd: "BORDER_RADIUS",
                    brw: "SIZE",
                    bg: "BG_COLOR_ALPHA",
                    shc: "COLOR"
                },
                paramsDefaults: {
                    brd: "color_15",
                    rd: "0",
                    brw: "0",
                    bg: "color_11",
                    shc: ["bg"]
                },
                paramsMutators: {
                    shc: {
                        type: "brightness",
                        value: .5,
                        param: "bg"
                    }
                },
                css: {
                    "%screenWidthBackground": "position:absolute;top:0;right:0;bottom:0;left:0;",
                    '%[data-state~="fixedPosition"]': "position:fixed !important;left:auto !important;z-index:50;",
                    '%[data-state~="fixedPosition"]%_footer': "top:auto;bottom:0;",
                    "%_border": "position:absolute;top:0;right:0;bottom:0;left:0;background:[brd];[rd]  box-shadow:1px 1px [shc], 3px 3px [shc], 5px 5px [shc], 7px 7px [shc], 9px 9px [shc];",
                    '%[data-state~="mobileView"] %_bg': "left:10px;right:10px;",
                    "%_bg": "position:absolute;top:[brw];right:[brw];bottom:[brw];left:[brw];background-color:[bg];[rd]",
                    "%bg": "position:absolute;top:0;right:0;bottom:0;left:0;",
                    "%inlineContent,%centeredContent": "position:absolute;top:0;right:0;bottom:0;left:0;"
                }
            },
            "wysiwyg.viewer.skins.screenwidthcontainer.TransparentHalfScreen": {
                react: [
                    ["div", "screenWidthBackground", [], {}],
                    ["div", "centeredContent", [], {},
                        ["div", "bg", [], {}],
                        ["div", "inlineContent", [], {}]
                    ]
                ],
                params: {
                    xxx: "BG_COLOR_ALPHA",
                    tdr: "URL",
                    bgc1: "BG_COLOR",
                    bgc2: "BG_COLOR"
                },
                paramsDefaults: {
                    xxx: "color_1",
                    tdr: "BASE_THEME_DIRECTORY",
                    bgc1: "color_15",
                    bgc2: "color_15"
                },
                paramsMutators: {
                    bgc1: {
                        type: "alpha",
                        value: .1
                    },
                    bgc2: {
                        type: "alpha",
                        value: .5
                    }
                },
                css: {
                    "%screenWidthBackground": "position:absolute;top:0;right:0;bottom:0;left:0;background-color:[bgc1];background:[xxx] url([tdr]net.png) center center repeat;",
                    '%[data-state~="fixedPosition"]': "position:fixed !important;left:auto !important;z-index:50;",
                    '%[data-state~="fixedPosition"]%_footer': "top:auto;bottom:0;",
                    "%bg": "position:absolute;top:0;right:0;bottom:0;left:0;background-color:[bgc2];",
                    "%inlineContent": "position:absolute;top:0;right:0;bottom:0;left:0;",
                    "%centeredContent": "position:absolute;top:0;right:0;bottom:0;left:0;"
                }
            },
            "wysiwyg.viewer.skins.screenwidthcontainer.TransparentScreen": {
                react: [
                    ["div", "screenWidthBackground", [], {}],
                    ["div", "centeredContent", [], {},
                        ["div", "bg", [], {}],
                        ["div", "inlineContent", [], {}]
                    ]
                ],
                css: {
                    "%screenWidthBackground": "position:absolute;top:0;right:0;bottom:0;left:0;",
                    '%[data-state~="fixedPosition"]': "position:fixed !important;left:auto !important;z-index:50;",
                    '%[data-state~="fixedPosition"]%_footer': "top:auto;bottom:0;",
                    "%bg": "position:absolute;top:0;right:0;bottom:0;left:0;",
                    "%inlineContent": "position:absolute;top:0;right:0;bottom:0;left:0;",
                    "%centeredContent": "position:absolute;top:0;right:0;bottom:0;left:0;"
                }
            },
            "wysiwyg.viewer.skins.screenwidthcontainer.TwoColorScreen": {
                react: [
                    ["div", "screenWidthBackground", [], {}],
                    ["div", "centeredContent", [], {},
                        ["div", "bg", [], {},
                            ["div", "inlineContent", [], {}]
                        ]
                    ]
                ],
                params: {
                    bgc1: "BG_COLOR_ALPHA",
                    brw: "BORDER_TOP_SIZE",
                    brw1: "BORDER_BOTTOM_SIZE",
                    xxx: "BG_COLOR_ALPHA",
                    tdr: "URL",
                    bgc2: "BG_COLOR_ALPHA"
                },
                paramsDefaults: {
                    bgc1: "color_11",
                    brw: "1px",
                    brw1: "0",
                    xxx: "color_11",
                    tdr: "BASE_THEME_DIRECTORY",
                    bgc2: "color_11"
                },
                css: {
                    "%screenWidthBackground": "position:absolute;top:0;right:0;bottom:0;left:0;background-color:[bgc1];border-top:[brw] solid #f00;border-bottom:[brw1] solid #f00;overflow:hidden;background:[xxx] url([tdr]net.png) center center repeat;",
                    '%[data-state~="fixedPosition"]': "position:fixed !important;left:auto !important;z-index:50;",
                    '%[data-state~="fixedPosition"]%_footer': "top:auto;bottom:0;",
                    "%bg": "position:absolute;top:0;right:0;bottom:0;left:0;background-color:[bgc2];",
                    "%inlineContent": "position:absolute;top:0;right:0;bottom:0;left:0;",
                    "%centeredContent": "position:absolute;top:0;right:0;bottom:0;left:0;"
                }
            },
            "wysiwyg.viewer.skins.screenwidthcontainer.WoodScreen": {
                react: [
                    ["div", "screenWidthBackground", ["_wood"], {}],
                    ["div", "centeredContent", [], {},
                        ["div", "bg", [], {}],
                        ["div", "inlineContent", [], {}]
                    ]
                ],
                params: {
                    bgc: "BG_COLOR_ALPHA",
                    $BorderRadius: "BORDER_RADIUS",
                    $boxShadow: "BOX_SHADOW",
                    baseThemeDir: "URL"
                },
                paramsDefaults: {
                    bgc: "color_1",
                    $BorderRadius: "5px",
                    $boxShadow: "0 1px 3px rgba(0, 0, 0, 0.8)",
                    baseThemeDir: "BASE_THEME_DIRECTORY"
                },
                css: {
                    "%screenWidthBackground": "position:absolute;top:0;right:0;bottom:0;left:0;",
                    '%[data-state~="fixedPosition"]': "position:fixed !important;left:auto !important;z-index:50;",
                    '%[data-state~="fixedPosition"]%_footer': "top:auto;bottom:0;",
                    "%centeredContent": "position:absolute;height:100%;",
                    "%bg": "position:absolute;top:10px 0;right:10px;bottom:0;left:0;background-color:[bgc];[$BorderRadius]  [$boxShadow]",
                    "%inlineContent": "position:absolute;top:50px;right:0;bottom:50px;left:0;",
                    '%[data-state~="hidden"] %bg': "background:none !important;border:none none !important;box-shadow:none !important;",
                    "%_borderGreekFrame": "border-width:24px;top:100px;right:90px;bottom:100px;left:90px;border-image:url([baseThemeDir]border_greekFrame.png) 24 repeat repeat;",
                    "%_borderAncientFrame": "border-width:45px;border-image:url([baseThemeDir]border_ancientFrame.png) 45 repeat repeat;",
                    "%_borderVinietFrame": "border-width:45px;border-image:url([baseThemeDir]border_vinietFrame.png) 90 repeat repeat;",
                    "%_borderOldFrame": "border-width:25px;border-image:url([baseThemeDir]border_oldFrame.png) 25 repeat repeat;",
                    "%_borderWoodFrame": "border-width:20px;border-image:url([baseThemeDir]border_woodFrame.png) 20 repeat repeat;",
                    "%_net": "background-image:url([baseThemeDir]net.png);",
                    "%_paper": "background-image:url([baseThemeDir]paper.jpg);",
                    "%_grass": "background-image:url([baseThemeDir]bg_grass.jpg);",
                    "%_notePaper": "background-image:url([baseThemeDir]bg_NotePaper.png);",
                    "%_vichy": "background-image:url([baseThemeDir]vichy.png);",
                    "%_silverscales": "background-image:url([baseThemeDir]silver_scales.png);",
                    "%_leather": "background-image:url([baseThemeDir]leather.png);",
                    "%_oldmathematics": "background-image:url([baseThemeDir]old_mathematics.png);",
                    "%_paven": "background-image:url([baseThemeDir]paven.png);",
                    "%_polaroid": "background-image:url([baseThemeDir]polaroid.png);",
                    "%_realcf": "background-image:url([baseThemeDir]real_cf.png);",
                    "%_washi": "background-image:url([baseThemeDir]washi.png);",
                    "%_woven": "background-image:url([baseThemeDir]woven.png);",
                    "%_randomgreyvariations": "background-image:url([baseThemeDir]random_grey_variations.png);",
                    "%_inflicted": "background-image:url([baseThemeDir]inflicted.png);",
                    "%_crissXcross": "background-image:url([baseThemeDir]crissXcross.png);",
                    "%_cristals": "background-image:url([baseThemeDir]cristals.png);",
                    "%_damask": "background-image:url([baseThemeDir]damask.png);",
                    "%_darkbrickwall": "background-image:url([baseThemeDir]dark_brick_wall.png);",
                    "%_waves": "background-image:url([baseThemeDir]bg_waves.png);",
                    "%_wood": "background-image:url([baseThemeDir]bg_wood1.jpg);"
                }
            }
        };
        t.exports = r
    }, function(t, e, o) {
        "use strict";
        var r = o(0),
            i = o(1),
            n = o(54);

        function a(t) {
            this.comp = t, this.animations = [], this.callbacks = {}, this.id = r.uniqueId("seq_")
        }
        a.prototype.add = function(t, e, o, r, i, n) {
            return this.animations.push({
                refNames: t,
                animationName: e,
                duration: o,
                delay: r,
                params: i,
                position: n
            }), this
        }, a.prototype.onCompleteAll = function(t) {
            return this.callbacks.onComplete = t, this
        }, a.prototype.onReverseAll = function(t) {
            return this.callbacks.onReverseComplete = t, this
        }, a.prototype.onInterruptAll = function(t) {
            return this.callbacks.onInterrupt = t, this
        }, a.prototype.onStartAll = function(t) {
            return this.callbacks.onStart = t, this
        }, a.prototype.onInit = function(t) {
            this.callbacks.onInit = t
        }, a.prototype.execute = function(t) {
            return this.comp.executeAnimationsWhenPossible(this.comp, this.id, this.animations, this.callbacks, t), this.id
        }, a.prototype.getId = function() {
            return this.id
        }, a.prototype.hasAnimations = function() {
            return !r.isEmpty(this.animations)
        }, t.exports = {
            propTypes: {
                isSiteBusy: i.isSiteBusy,
                animations: i.animations,
                isDebugMode: i.isDebugMode
            },
            getInitialState: function() {
                return this._animationsQueue = [], this._liveSequences = {}, this._isBusy = !0, {}
            },
            executeAnimationsWhenPossible: function(t, e, o, i, a) {
                r.isEmpty(this._liveSequences) && (this._liveSequences = {}), r.isEmpty(this._animationsQueue) && (this._animationsQueue = []), this._animationsQueue.push({
                    comp: t,
                    id: e,
                    animations: o,
                    callbacks: i,
                    params: a
                }), this.isBusy() || n.flushQueue(this.getAnimations(), this._animationsQueue, this._liveSequences, this.props.isDebugMode)
            },
            componentWillUpdate: function() {
                this._isBusy = !0
            },
            componentDidUpdate: function() {
                this._isBusy = !1, this.isBusy() || n.flushQueue(this.getAnimations(), this._animationsQueue, this._liveSequences, this.props.isDebugMode)
            },
            componentDidMount: function() {
                this._isMounted = !0, this._isBusy = !1
            },
            componentDidLayoutAnimations: function() {
                n.flushQueue(this.getAnimations(), this._animationsQueue, this._liveSequences, this.props.isDebugMode)
            },
            componentWillUnmount: function() {
                this._isMounted = !1, this._isBusy = !0, this.clearAnimationsQueue(!1)
            },
            clearAnimationsQueue: function(t) {
                r.forEach(this._liveSequences, function(e) {
                    this.getAnimations().kill(e, t ? 1 : void 0)
                }.bind(this)), this._liveSequences = {}, this._animationsQueue = []
            },
            isBusy: function() {
                var t = this.props.isSiteBusy || this.props.siteAPI.isSiteBusy;
                return !this._isMounted || this._isBusy || t()
            },
            animate: function(t, e, o, r, i, n) {
                var a = this.sequence(t, e, o, r, i);
                return (n = n || {}).onStart && a.onStartAll(n.onStart), n.onInterrupt && a.onInterruptAll(n.onInterrupt), n.onComplete && a.onCompleteAll(n.onComplete), n.onReverseComplete && a.onReverseAll(n.onReverseComplete), a.execute()
            },
            transition: function(t, e, o, r, i, n, a) {
                return this.animate({
                    sourceRefs: t,
                    destRefs: e
                }, o, r, i, n, a)
            },
            sequence: function(t, e, o, r, i) {
                var n = new a(this);
                return arguments.length && n.add.apply(n, arguments), n
            },
            getSequence: function(t) {
                return t ? this._liveSequences[t] : null
            },
            stopSequence: function(t, e) {
                var o = this.getSequence(t);
                o && (this.getAnimations().kill(o, e), delete this._liveSequences[t])
            },
            reverseSequence: function(t) {
                var e = this.getSequence(t);
                e && e.reversed(!e.reversed())
            },
            easeStartSequence: function(t, e, o, r) {
                var i = this.getSequence(t);
                i && this.getAnimations().animateTimeScale(i, e, 0, 1, o, r)
            },
            easeStopSequence: function(t, e, o, r) {
                var i = this.getSequence(t),
                    n = void 0;
                i && (n = (r = r || {}).onComplete || function() {}, r.onComplete = function() {
                    n(), this.stopSequence(t)
                }.bind(this), i.paused() ? this.stopSequence(t) : this.getAnimations().animateTimeScale(i, e, 1, 0, o, r))
            },
            getAnimationProperties: function(t) {
                return this.getAnimations().getProperties(t)
            },
            addTickerEvent: function() {
                this.getAnimations().addTickerEvent.apply(null, arguments)
            },
            removeTickerEvent: function() {
                this.getAnimations().removeTickerEvent.apply(null, arguments)
            },
            getAnimations: function() {
                return this.props.animations || r.get(this.props, "siteData.animations")
            }
        }
    }, function(t, e, o) {
        "use strict";
        var r = o(0),
            i = o(2),
            n = o(1),
            a = o(21),
            s = o(22);

        function l(t) {
            return t.scale || 1
        }
        t.exports = function(t) {
            return {
                mixins: [a(t)],
                propTypes: {
                    compTheme: n.Component.theme,
                    scale: n.Component.scale,
                    skin: n.Component.skin,
                    isMobileView: n.isMobileView,
                    fontsMap: n.Fonts.fontsMap,
                    isExperimentOpen: n.isExperimentOpen
                },
                componentWillMount: function() {
                    this.lastScale = l(this.props)
                },
                componentWillReceiveProps: function() {
                    this.lastScale = l(this.props)
                },
                fontGetter: function(t) {
                    var e = t.split("_")[1];
                    return this.props.fontsMap[e]
                },
                getFontSize: function(t, e) {
                    var o = {};
                    if (this.props.isMobileView) {
                        var r = this.getDesktopFontSize(t);
                        if (r) {
                            var n = e || this.props.scale;
                            o.fontSize = function(t, e) {
                                return i.mobileUtils.convertFontSizeToMobile(t, e)
                            }(r, n) + "px"
                        }
                    }
                    return o
                },
                getDesktopFontSize: function(e) {
                    var o = this.props.compTheme,
                        n = e || "fnt",
                        a = r.get(o, ["style", "properties", n]) || r.get(s(t, this.props.skin, this.props.isExperimentOpen), ["paramsDefaults", n]) || function(t, e) {
                            var o = s(e, t.props.skin, t.props.isExperimentOpen),
                                i = o && o.exports,
                                n = r.find(i, (function(e) {
                                    var o = e.skin;
                                    return !r.isUndefined(t.getParamFromSkin("fnt", o).value)
                                }));
                            return n && t.getParamFromSkin("fnt", n.skin).value
                        }(this, t);
                    if (a) {
                        var l = this.fontGetter(a) || a;
                        return parseInt(i.fonts.parseFontStr(l).size, 10)
                    }
                }
            }
        }
    }, function(t, e, o) {
        "use strict";
        var r = o(0),
            i = {
                rootId: !0,
                rootNavigationInfo: !0,
                theme: !0,
                compDesign: !0
            },
            n = r.flatMap([
                ["Layout", "layoutComponentClassName"]
            ], (function(t) {
                return [t, t.concat(["isRequired"])]
            }));
        t.exports = function(t, e) {
            return r.every(e.RenderRealtimeConfig, (function(e) {
                return t !== e && t !== e.isRequired
            })) && r.every(e.Component, (function(e, o) {
                return i[o] || t !== e && t !== e.isRequired
            })) && ! function(t, e) {
                return r.some(n, (function(o) {
                    return t === r.get(e, o)
                }))
            }(t, e)
        }
    }, function(t, e, o) {
        "use strict";
        t.exports = {
            "(1 - strokewidth % 2) / 2": function(t) {
                return (1 - t % 2) / 2
            }
        }
    }, function(t, e, o) {
        "use strict";
        var r = o(0),
            i = {
                touched: !1,
                moved: !1,
                deltaCoords: {
                    x: 0,
                    y: 0
                },
                evObj: {}
            };
        Object.freeze(i);
        var n = ["onSwipeLeft", "onSwipeRight", "onSwipeUp", "onSwipeDown", "onTap"],
            a = {
                left: "onSwipeLeft",
                right: "onSwipeRight",
                up: "onSwipeUp",
                down: "onSwipeDown"
            };

        function s(t) {
            if (t.touches && t.touches.length) {
                var e = t.touches[0];
                return {
                    x: e.pageX,
                    y: e.pageY
                }
            }
        }

        function l() {
            this.data = {}
        }
        l.prototype = {
            onTouchStart: function(t) {
                this.data = r.defaults({
                    touched: !0,
                    numOfTouches: t.touches.length,
                    startCoords: s(t),
                    startTime: Date.now(),
                    evObj: r.clone(t)
                }, i)
            },
            onTouchMove: function(t) {
                var e = s(t);
                if (e) {
                    this.data.startCoords || (this.data.startCoords = e);
                    var o = this.data.startCoords.x - e.x,
                        r = this.data.startCoords.y - e.y;
                    this.data.moved = !0, this.data.deltaCoords = {
                        x: o,
                        y: r
                    }
                }
            },
            onTouchEnd: function(t) {
                if (this.data.endTime = Date.now(), !r.isEmpty(t))
                    if (this.isValidSwipe()) {
                        var e = this.getSwipeDirection(this.data.deltaCoords.x, this.data.deltaCoords.y),
                            o = a[e];
                        t[o] && t[o](this.data.evObj)
                    } else this.isValidTap() && t.onTap && t.onTap(this.data.evObj)
            },
            registerTouchEvents: function(t) {
                var e = r.pick(t, n);
                r.isEmpty(e) || (t.onTouchStart = this.onTouchStart.bind(this), t.onTouchMove = this.onTouchMove.bind(this), t.onTouchEnd = this.onTouchEnd.bind(this, e))
            },
            removeCustomTouchEvents: function(t) {
                t && n.forEach((function(e) {
                    return delete t[e]
                }))
            },
            isValidSwipe: function() {
                return this.data.moved && 1 === this.data.numOfTouches && this.data.endTime - this.data.startTime < 500 && (Math.abs(this.data.deltaCoords.x) > 100 || Math.abs(this.data.deltaCoords.y) > 60)
            },
            isValidTap: function() {
                return this.data.touched && !this.data.moved && 1 === this.data.numOfTouches
            },
            getSwipeDirection: function(t, e) {
                return Math.abs(t) > Math.abs(e) ? t > 0 ? "left" : "right" : e > 0 ? "up" : "down"
            }
        }, t.exports = l
    }, function(t, e, o) {
        "use strict";
        var r = o(0);
        t.exports = function(t, e, o, i) {
            if (t[""]) {
                var n = t[""].style;
                if (n && r.get(o, "layout.fixedPosition")) {
                    var a = i.renderFixedPosition ? 50 : 49;
                    n.zIndex = Math.max(n.zIndex || 0, a)
                }
            }
        }
    }, function(t, e, o) {
        "use strict";
        var r = o(82);
        t.exports = {
            imageElements: r
        }
    }, function(t, e, o) {
        "use strict";
        var r = o(0),
            i = o(6);
        var n = {
            generateStyleNode: function(t, e, o) {
                return o && (e = r.map(e.trim().split("\n"), (function(t) {
                    var e = t.split("{"),
                        i = e[0].split(",");
                    return e[0] = r.map(i, (function(t) {
                        return o + " " + t
                    })), e.join("{")
                })).join("\n")), i("style", {
                    type: "text/css",
                    "data-styleid": t,
                    key: t,
                    dangerouslySetInnerHTML: {
                        __html: (n = e, n && n.replace ? n.replace(/</g, "&lt;") : "")
                    }
                });
                var n
            }
        };
        t.exports = n
    }, function(t, e, o) {
        "use strict";
        var r = o(0),
            i = o(1),
            n = o(103);
        t.exports = {
            propTypes: {
                windowScrollEventAspect: i.SiteAspects.windowScrollEvent.isRequired,
                compActions: i.Component.compActions.isRequired,
                isMobileView: i.isMobileView
            },
            getMixinSkins: function() {
                return n
            },
            getInitialState: function() {
                return this.props.compActions.scroll && this.props.windowScrollEventAspect.registerToScroll(this), t = this.props.isMobileView, e = {}, t && (e.$mobile = "mobileView"), e;
                var t, e
            },
            componentWillReceiveProps: function(t) {
                this.props.compActions.scroll && r.isUndefined(t.compActions.scroll) && this.props.windowScrollEventAspect.unregisterToScroll(this), t.compActions.scroll && r.isUndefined(this.props.compActions.scroll) && t.windowScrollEventAspect.registerToScroll(this)
            },
            onScroll: function(t, e) {
                var o = {
                    left: t.x,
                    top: t.y,
                    direction: e
                };
                this.handleAction("scroll", o)
            }
        }
    }, function(t, e, o) {
        "use strict";
        var r = function() {
                function t(t, e) {
                    for (var o = 0; o < e.length; o++) {
                        var r = e[o];
                        r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(t, r.key, r)
                    }
                }
                return function(e, o, r) {
                    return o && t(e.prototype, o), r && t(e, r), e
                }
            }(),
            i = function t(e, o, r) {
                null === e && (e = Function.prototype);
                var i = Object.getOwnPropertyDescriptor(e, o);
                if (void 0 === i) {
                    var n = Object.getPrototypeOf(e);
                    return null === n ? void 0 : t(n, o, r)
                }
                if ("value" in i) return i.value;
                var a = i.get;
                return void 0 !== a ? a.call(r) : void 0
            };
        var n = o(0),
            a = o(1),
            s = function(t, e, o) {
                n.forEach(e, (function(e) {
                    var r = o[e.name];
                    if (r && n.isFunction(t[r.methodName])) {
                        var i = function(t, e) {
                            var o = n.map(t.params, (function(t) {
                                return n.isString(t) ? e.params[t] : n.get(e.params, t.name, t.defaultValue)
                            }));
                            return e.callback ? o.concat(e.callback) : o
                        }(r, e);
                        t[r.methodName].apply(t, i)
                    }
                }))
            };
        t.exports = function(t) {
            return function(e) {
                var o = function(e) {
                    function o() {
                        return function(t, e) {
                                if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
                            }(this, o),
                            function(t, e) {
                                if (!t) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                                return !e || "object" != typeof e && "function" != typeof e ? t : e
                            }(this, (o.__proto__ || Object.getPrototypeOf(o)).apply(this, arguments))
                    }
                    return function(t, e) {
                        if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function, not " + typeof e);
                        t.prototype = Object.create(e && e.prototype, {
                            constructor: {
                                value: t,
                                enumerable: !1,
                                writable: !0,
                                configurable: !0
                            }
                        }), e && (Object.setPrototypeOf ? Object.setPrototypeOf(t, e) : t.__proto__ = e)
                    }(o, e), r(o, [{
                        key: "componentWillMount",
                        value: function() {
                            var e = this;
                            n.isFunction(i(o.prototype.__proto__ || Object.getPrototypeOf(o.prototype), "componentWillMount", this)) && i(o.prototype.__proto__ || Object.getPrototypeOf(o.prototype), "componentWillMount", this).call(this), this.dispose = this.props.trackBehaviorsToExecute((function(o) {
                                return s(e, o, t)
                            }))
                        }
                    }, {
                        key: "componentWillUnmount",
                        value: function() {
                            n.isFunction(i(o.prototype.__proto__ || Object.getPrototypeOf(o.prototype), "componentWillUnmount", this)) && i(o.prototype.__proto__ || Object.getPrototypeOf(o.prototype), "componentWillUnmount", this).call(this), this.dispose()
                        }
                    }]), o
                }(e);
                return o.displayName = "withBehaviors(" + e.displayName + ")", o.propTypes = n.assign({
                    trackBehaviorsToExecute: a.Component.trackBehaviorsToExecute.isRequired
                }, e.propTypes), o
            }
        }
    }, function(t, e, o) {
        "use strict";
        var r = o(1),
            i = o(38),
            n = o(39),
            a = o(28),
            s = o(40),
            l = o(7),
            d = o(41),
            p = o(42),
            c = o(43),
            u = o(44),
            b = o(6),
            g = o(9),
            h = o(20),
            m = o(2);
        t.exports = {
            HOC: {
                withHandleAction: s
            },
            mixins: {
                compStateMixin: n,
                inputFocusMixin: d,
                runTimeCompData: p,
                skinBasedComp: l,
                textScaleMixin: a,
                validatableMixin: c,
                validatableWithSyncMixin: u
            },
            santaTypesDefinitions: r,
            utils: {
                imageClientApi: h,
                createReactElement: b,
                createSantaTypesDefinitions: g,
                santaTypesUtils: i
            },
            constants: {
                MEDIA: m.mediaConsts,
                SITE: m.siteConstants
            }
        }
    }, function(t, e, o) {
        "use strict";
        var r = o(0),
            i = o(29);

        function n(t) {
            return t.id || r.isFunction(t.fetch)
        }
        "undefined" != typeof WeakMap && (r.memoize.Cache = WeakMap);
        var a = r.memoize((function(t) {
                return r.pickBy(t, n)
            })),
            s = r.memoize((function(t) {
                var e = t.propTypes && a(t.propTypes);
                return function(t, o) {
                    return r.mapValues(e, (function(e) {
                        return e.fetch ? e.fetch(t, o) : t.fetchSantaType(e, t, o)
                    }))
                }
            })),
            l = r.memoize((function(t, e) {
                return t.propTypes && r.pickBy(a(t.propTypes), (function(t) {
                    return i(t, e)
                }))
            }));
        t.exports = {
            getSantaTypesFromPropTypes: a,
            getSantaTypesForChildComponentClass: l,
            getSantaPropsSelectorForReactClass: s,
            resolveComponentProps: function(t, e) {
                var o = e.siteData,
                    i = o.getExistingRootNavigationInfo(o.getFocusedRootId()),
                    a = {
                        fetchSantaType: function(t, o, r) {
                            return t.fetch ? t.fetch(o, r) : e.siteAPI.getSantaFetcher(t)(o, r)
                        },
                        stylesMap: e.loadedStyles,
                        siteData: e.siteData,
                        siteAPI: e.siteAPI
                    },
                    s = {
                        structure: e.structure,
                        hardcodedSkin: e.hardcodedSkin,
                        id: e.id,
                        rootId: e.rootId,
                        rootNavigationInfo: i,
                        compData: e.compData
                    },
                    l = r.pickBy(t, n),
                    d = r.mapValues(l, (function(t) {
                        return t.fetch ? t.fetch(a, s) : a.fetchSantaType(t, a, s)
                    }));
                return r.assign(d, r.pick(e, r.keys(t)))
            },
            getSantaTypesByDefinition: r.memoize((function(t) {
                return r.pickBy(function(t) {
                    var e = function(t) {
                            for (var e = [t], o = 0; o < e.length; o++) {
                                var r = e[o].mixins;
                                r && r.length && e.push.apply(e, r)
                            }
                            return e
                        }(t),
                        o = r.map(e, "propTypes");
                    return r.defaults.apply(r, [{}].concat(o))
                }(t), n)
            }))
        }
    }, function(t, e, o) {
        "use strict";
        var r = o(1);

        function i(t) {
            var e = {
                props: this.props.compProp,
                data: this.props.compData
            };
            return t.call(this, this.state, e)
        }
        t.exports = function(t) {
            return {
                statics: {
                    publicState: t
                },
                propTypes: {
                    setCompState: r.DAL.setCompState.isRequired,
                    removeCompState: r.DAL.removeCompState.isRequired,
                    id: r.Component.id.isRequired
                },
                componentWillUnmount: function() {
                    this.props.removeCompState(this.props.id)
                },
                componentDidMount: function() {
                    this.props.setCompState(this.props.id, i.call(this, t))
                },
                componentDidUpdate: function() {
                    this.props.setCompState(this.props.id, i.call(this, t))
                }
            }
        }
    }, function(t, e, o) {
        "use strict";
        var r = function() {
            function t(t, e) {
                for (var o = 0; o < e.length; o++) {
                    var r = e[o];
                    r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(t, r.key, r)
                }
            }
            return function(e, o, r) {
                return o && t(e.prototype, o), r && t(e, r), e
            }
        }();
        var i = o(0),
            n = o(4),
            a = o(1);
        t.exports = function(t, e) {
            var o = function(o) {
                function a() {
                    return function(t, e) {
                            if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
                        }(this, a),
                        function(t, e) {
                            if (!t) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                            return !e || "object" != typeof e && "function" != typeof e ? t : e
                        }(this, (a.__proto__ || Object.getPrototypeOf(a)).apply(this, arguments))
                }
                return function(t, e) {
                    if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function, not " + typeof e);
                    t.prototype = Object.create(e && e.prototype, {
                        constructor: {
                            value: t,
                            enumerable: !1,
                            writable: !0,
                            configurable: !0
                        }
                    }), e && (Object.setPrototypeOf ? Object.setPrototypeOf(t, e) : t.__proto__ = e)
                }(a, o), r(a, [{
                    key: "render",
                    value: function() {
                        var o, r, a, s = this,
                            l = i.mapValues(this.props.compActions, (function(t) {
                                return function(e) {
                                    return s.props.handleAction(t, function(t, e) {
                                        var o = e.id,
                                            r = e.now,
                                            n = {
                                                id: i.get(t, "id") || o,
                                                timeStamp: r()
                                            };
                                        return t ? (n.timeStamp = t.timeStamp || n.timeStamp, i.defaults(n, t)) : n
                                    }(e, s.props))
                                }
                            })),
                            d = i.defaults((a = l, (r = e) in (o = {}) ? Object.defineProperty(o, r, {
                                value: a,
                                enumerable: !0,
                                configurable: !0,
                                writable: !0
                            }) : o[r] = a, o), this.props);
                        return n.createElement(t, d)
                    }
                }]), a
            }(n.Component);
            return o.propTypes = i.assign({
                id: a.Component.id,
                handleAction: a.Behaviors.handleAction,
                compActions: a.Component.compActions,
                now: a.Utils.logging.performance.now
            }, t.propTypes), o
        }
    }, function(t, e, o) {
        "use strict";
        var r = o(0);
        t.exports = {
            INPUT_FOCUS_BEHAVIORS: {
                focus: {
                    methodName: "requestFocus"
                },
                blur: {
                    methodName: "requestBlur"
                }
            },
            requestFocus: function() {
                r.invoke(this, "focus")
            },
            requestBlur: function() {
                r.invoke(this, "blur")
            }
        }
    }, function(t, e, o) {
        "use strict";
        var r = o(1);
        t.exports = {
            propTypes: {
                id: r.Component.id.isRequired,
                setRuntimeCompData: r.DAL.setCompData.isRequired,
                setRuntimeCompProps: r.DAL.setCompProps.isRequired
            },
            updateData: function(t) {
                this.props.setRuntimeCompData(this.props.id, t)
            },
            updateProps: function(t) {
                this.props.setRuntimeCompProps(this.props.id, t)
            }
        }
    }, function(t, e, o) {
        "use strict";
        var r = o(0);
        t.exports = {
            validatable: {
                requestSetCustomValidity: function(t) {
                    this.setState({
                        customValidityToSet: t
                    })
                },
                componentDidUpdate: function() {
                    r.isString(this.state.customValidityToSet) && r.isFunction(this.setCustomValidity) && (this.setCustomValidity(this.state.customValidityToSet), this.setState({
                        customValidityToSet: null
                    }))
                },
                updateValidityIndication: function(t) {
                    this.setState({
                        shouldShowValidationIndication: t
                    })
                },
                showValidityIndication: function() {
                    this.updateValidityIndication(!0)
                },
                hideValidityIndication: function() {
                    this.updateValidityIndication(!1)
                },
                shouldShowValidityIndication: function() {
                    return this.state.shouldShowValidationIndication
                }
            },
            getPublicState: function(t) {
                return {
                    shouldShowValidationIndication: r.get(t, "shouldShowValidationIndication", !1),
                    customValidityToSet: null
                }
            },
            VALIDATABLE_BEHAVIORS: {
                setCustomValidity: {
                    methodName: "requestSetCustomValidity",
                    params: ["customValidity"]
                },
                updateValidityIndication: {
                    methodName: "updateValidityIndication",
                    params: ["value"]
                }
            }
        }
    }, function(t, e, o) {
        "use strict";
        var r = o(0);
        t.exports = {
            validatableWithSync: {
                getInitialState: function() {
                    return {
                        validateData: {}
                    }
                },
                isValid: function() {
                    return r.get(this.state, ["validateData", "validity", "valid"], !0)
                },
                getValidity: function() {
                    return r.get(this.state, ["validateData", "validity"])
                },
                syncValidationData: function(t) {
                    this.setState({
                        validateData: t
                    })
                },
                updateValidityIndication: function(t) {
                    this.setState({
                        shouldShowValidationIndication: t
                    })
                },
                showValidityIndication: function() {
                    this.updateValidityIndication(!0)
                },
                hideValidityIndication: function() {
                    this.updateValidityIndication(!1)
                },
                shouldShowValidityIndication: function() {
                    return this.state.shouldShowValidationIndication
                },
                resetValidity: function() {
                    this.setState({
                        validateData: {}
                    })
                }
            },
            getPublicState: function(t) {
                return {
                    shouldShowValidationIndication: r.get(t, "shouldShowValidationIndication", !1),
                    customValidityToSet: null
                }
            },
            VALIDATABLE_WITH_SYNC_BEHAVIORS: {
                updateValidityIndication: {
                    methodName: "updateValidityIndication",
                    params: ["value"]
                },
                syncValidationData: {
                    methodName: "syncValidationData",
                    params: ["validateData"]
                }
            }
        }
    }, function(t, e, o) {
        "use strict";
        Object.defineProperty(e, "__esModule", {
            value: !0
        });
        var r = o(0);
        var i = function(t, e) {
                return Math.abs(t.width * Math.cos(e)) + Math.abs(t.height * Math.sin(e))
            },
            n = function(t, e) {
                return Math.abs(t.width * Math.sin(e)) + Math.abs(t.height * Math.cos(e))
            },
            a = function(t, e) {
                return t.x - (e - t.width) / 2
            },
            s = function(t, e) {
                return t.y - (e - t.height) / 2
            };

        function l(t, e) {
            if (0 === e) return r.pick(t, ["x", "y", "width", "height"]);
            var o = e * Math.PI / 180,
                l = i(t, o),
                d = n(t, o);
            return {
                x: Math.floor(a(t, l)),
                y: Math.floor(s(t, d)),
                width: Math.ceil(l),
                height: Math.ceil(d)
            }
        }
        e.getComponentBoundingBox = function(t) {
            var e, o, i = l(e = function(t) {
                return r.assign({
                    x: t.left,
                    y: t.top
                }, r.pick(t, ["width", "height", "rotationInDegrees"]))
            }(t), e.rotationInDegrees || 0);
            return {
                left: (o = r.assign(i, {
                    rotationInDegrees: 0
                })).x,
                top: o.y,
                width: o.width,
                height: o.height,
                rotationInDegrees: o.rotationInDegrees
            }
        }
    }, function(t, e, o) {
        "use strict";
        var r = o(0),
            i = o(6);
        t.exports = function(t) {
            var e = t.id,
                o = t.stylesMap,
                n = "" + e;
            return i("style", {
                key: n,
                id: n,
                dangerouslySetInnerHTML: {
                    __html: "\n    " + r(o).map((function(t, e) {
                        return "\n#" + e + " {\n" + r(t).omitBy(r.isNil).map((function(t, e) {
                            return "    " + function(t) {
                                return "-" === r.head(t) ? t : r.kebabCase(t)
                            }(e) + ": " + t + ";"
                        })).join("\n") + "\n}"
                    })).join("\n")
                }
            })
        }
    }, function(t, e, o) {
        "use strict";
        var r = o(0),
            i = o(1);

        function n(t) {
            return "fixed" === r.get(t.style, "position")
        }

        function a(t) {
            return {
                $mobile: t.isMobileView ? "mobileView" : "",
                $fixed: n(t) ? "fixedPosition" : ""
            }
        }
        t.exports = {
            propTypes: {
                isMobileView: i.isMobileView.isRequired,
                style: i.Component.style.isRequired
            },
            getRootStyle: function(t) {
                return this.getRootPosition ? {
                    position: this.getRootPosition(t)
                } : {}
            },
            getInitialState: function() {
                return a(this.props)
            },
            componentWillReceiveProps: function(t) {
                var e = a(this.props),
                    o = a(t);
                r.isEqual(e, o) || this.setState(o)
            }
        }
    }, function(t, e, o) {
        "use strict";

        function r(t) {
            if (Array.isArray(t)) {
                for (var e = 0, o = Array(t.length); e < t.length; e++) o[e] = t[e];
                return o
            }
            return Array.from(t)
        }
        var i = o(0),
            n = o(49),
            a = o(79),
            s = o(6);
        t.exports = {
            createPinnedLayer: function(t) {
                var e = t.id,
                    o = t.children,
                    l = t.childrenMeshParams,
                    d = t.browser,
                    p = t.wixTopAdsHeight,
                    c = void 0 === p ? 0 : p;
                return i.isEmpty(o) ? null : d.ie ? s.apply(void 0, [a.default, {
                    id: e,
                    key: e,
                    childrenMeshLayout: l,
                    marginTop: c
                }].concat(r(o))) : s.apply(void 0, [n.default, {
                    id: e,
                    key: e,
                    childrenMeshLayout: l,
                    marginTop: c,
                    isFixedLayer: !0,
                    growToContent: !1,
                    cssGridVariant: "standard"
                }].concat(r(o)))
            }
        }
    }, function(t, e, o) {
        "use strict";
        var r, i = (r = Object.setPrototypeOf || {
                    __proto__: []
                }
                instanceof Array && function(t, e) {
                    t.__proto__ = e
                } || function(t, e) {
                    for (var o in e) e.hasOwnProperty(o) && (t[o] = e[o])
                },
                function(t, e) {
                    function o() {
                        this.constructor = t
                    }
                    r(t, e), t.prototype = null === e ? Object.create(e) : (o.prototype = e.prototype, new o)
                }),
            n = Object.assign || function(t) {
                for (var e, o = 1, r = arguments.length; o < r; o++)
                    for (var i in e = arguments[o]) Object.prototype.hasOwnProperty.call(e, i) && (t[i] = e[i]);
                return t
            };
        Object.defineProperty(e, "__esModule", {
            value: !0
        });
        var a = o(0),
            s = o(4),
            l = o(50),
            d = function(t, e, o, r, i) {
                var a, s;
                return n({
                    top: 0,
                    left: 0,
                    position: o ? "fixed" : "relative",
                    width: "100%",
                    height: r ? "auto" : "calc(100% - " + i + "px)",
                    "margin-top": i,
                    zIndex: 50,
                    display: e ? "-ms-grid" : "grid"
                }, ((a = {})[e ? "-ms-grid-columns" : "gridTemplateColumns"] = "1fr", a), ((s = {})[e ? "-ms-grid-rows" : "gridTemplateRows"] = t, s), {
                    pointerEvents: "none"
                })
            },
            p = function(t, e, o) {
                var r = n({
                    position: o ? "relative" : "absolute"
                }, function(t) {
                    return t ? {
                        "-ms-grid-column": "1",
                        "-ms-grid-column-span": "1",
                        "-ms-grid-row": "1",
                        "-ms-grid-row-span": "1"
                    } : {
                        gridArea: [1, 1, 2, 2].join(" / ")
                    }
                }(e), {
                    pointerEvents: "auto"
                });
                return a.reduce(t, (function(t, o) {
                    var i = l.getDockedStyleForGrid(o, e);
                    return t[o.id] = a.assign(i, r), t
                }), {})
            },
            c = function(t) {
                function e() {
                    return null !== t && t.apply(this, arguments) || this
                }
                return i(e, t), e.prototype.render = function() {
                    if (0 === s.Children.count(this.props.children)) return null;
                    var t = this.props,
                        e = t.id,
                        o = t.childrenMeshLayout,
                        r = t.marginTop,
                        i = t.children,
                        n = t.cssGridVariant,
                        a = t.isFixedLayer,
                        c = !a && this.props.growToContent,
                        u = c ? function(t) {
                            return t ? "minmax(calc(100vh - " + t + "px), 1fr)" : "minmax(100vh, 1fr)"
                        }(r) : "1fr",
                        b = "ms" === n,
                        g = e + "-style",
                        h = l.renderStyle({
                            id: g,
                            stylesMap: p(o, b, c)
                        }),
                        m = {
                            id: e,
                            key: e,
                            style: d(u, b, a, c, r)
                        };
                    return s.createElement("div", m, [h].concat(s.Children.toArray(i)))
                }, e
            }(s.Component);
        e.default = c
    }, function(t, e, o) {
        "use strict";
        Object.defineProperty(e, "__esModule", {
            value: !0
        });
        var r = o(0),
            i = o(4),
            n = function(t) {
                return !r.isEmpty(t.docked)
            },
            a = function(t, e) {
                var o, i = r.get(e, ["docked", t, "px"], 0);
                return 0 === i ? {} : ((o = {})["margin-" + t] = s(i), o)
            },
            s = function(t) {
                return t + "px"
            },
            l = {
                hCenter: {
                    POSITIVE: "margin-left",
                    NEGATIVE: "margin-right"
                },
                vCenter: {
                    POSITIVE: "margin-top",
                    NEGATIVE: "margin-bottom"
                }
            },
            d = function(t, e) {
                var o, i, n = r.get(e, ["docked", t, "px"], 0);
                return 0 === n ? {} : n > 0 ? ((o = {})[l[t].POSITIVE] = s(2 * n), o) : ((i = {})[l[t].NEGATIVE] = s(-2 * n), i)
            },
            p = {
                left: {
                    left: 0
                },
                right: {
                    right: 0
                },
                hCenter: {
                    left: "50%",
                    transform: "translateX(-50%)"
                },
                hStretch: {
                    left: 0,
                    width: "100%"
                },
                none: {}
            },
            c = {
                left: r.partial(a, "left"),
                right: r.partial(a, "right"),
                hCenter: r.partial(d, "hCenter"),
                hStretch: r.noop,
                top: r.partial(a, "top"),
                bottom: r.partial(a, "bottom"),
                vCenter: r.partial(d, "vCenter"),
                vStretch: r.noop,
                none: r.noop
            },
            u = function(t, e, o) {
                var i = function(t) {
                        return t.docked.left && t.docked.right ? "hStretch" : t.docked.hCenter ? "hCenter" : t.docked.left ? "left" : t.docked.right ? "right" : "none"
                    }(t),
                    n = e ? function(t) {
                        var e, o, r, i = t ? "-ms-grid-column-align" : "justify-self";
                        return {
                            left: (e = {}, e[i] = "start", e),
                            right: (o = {}, o[i] = "end", o),
                            hCenter: (r = {}, r[i] = "center", r),
                            hStretch: {
                                width: "100%"
                            },
                            none: {}
                        }
                    }(o)[i] : p[i],
                    a = c[i](t);
                return r.assign({}, n, a)
            },
            b = function(t, e, o, i) {
                var n = function(t) {
                        return t.docked.bottom && t.docked.top ? "vStretch" : t.docked.vCenter ? "vCenter" : t.docked.top ? "top" : t.docked.bottom ? "bottom" : "none"
                    }(t),
                    a = o ? function(t) {
                        var e, o, r, i = t ? "-ms-grid-row-align" : "align-self";
                        return {
                            top: (e = {}, e[i] = "start", e),
                            bottom: (o = {}, o[i] = "end", o),
                            vCenter: (r = {}, r[i] = "center", r),
                            vStretch: {
                                height: "100%"
                            },
                            none: {}
                        }
                    }(i)[n] : function(t) {
                        return {
                            top: {
                                top: t + "px"
                            },
                            bottom: {
                                bottom: 0
                            },
                            vCenter: {
                                top: "calc(50% + " + t / 2 + "px)",
                                transform: "translateY(-50%)"
                            },
                            vStretch: {
                                top: 0,
                                height: "100%"
                            },
                            none: {}
                        }
                    }(e)[n],
                    s = c[n](t);
                return r.assign({}, a, s)
            };
        e.getDockedStyleForGrid = function(t, e) {
            return n(t) ? r.assign({}, u(t, !0, e), b(t, 0, !0, e)) : {}
        }, e.getDockedStyleForFixedPosition = function(t, e) {
            return n(t) ? r.assign({
                position: "fixed"
            }, u(t, !1, !1), b(t, e, !1, !1)) : {}
        };
        e.renderStyle = function(t) {
            var e = t.id,
                o = t.stylesMap,
                n = "" + e;
            return i.createElement("style", {
                key: n,
                id: n,
                dangerouslySetInnerHTML: {
                    __html: "\n    " + r(o).map((function(t, e) {
                        return "\n#" + e + " {\n" + r(t).omitBy(r.isNil).map((function(t, e) {
                            return "    " + function(t) {
                                return "-" === r.head(t) ? t : r.kebabCase(t)
                            }(e) + ": " + t + ";"
                        })).join("\n") + "\n}"
                    })).join("\n")
                }
            })
        }
    }, function(t, e, o) {
        "use strict";
        var r = o(0),
            i = o(5),
            n = o(3),
            a = o(1),
            s = o(7),
            l = o(33),
            d = o(52),
            p = l.imageElements,
            c = function() {
                return r.pick(d, ["skins.core.ImageNewSkinZoomable"].concat(function(t) {
                    if (Array.isArray(t)) {
                        for (var e = 0, o = Array(t.length); e < t.length; e++) o[e] = t[e];
                        return o
                    }
                    return Array.from(t)
                }(r.keys(d))))
            };
        var u = i({
            displayName: "Image",
            mixins: [s(c())],
            propTypes: {
                id: n.string,
                staticMediaUrl: a.ServiceTopology.staticMediaUrl,
                reportBI: a.reportBI,
                cssFiltersSupported: a.BrowserFlags.cssFiltersSupported.isRequired,
                currentUrl: a.currentUrl,
                onImageUnmount: a.Images.onImageUnmount,
                getMediaFullStaticUrl: a.ServiceTopology.getMediaFullStaticUrl,
                devicePixelRatio: a.Device.devicePixelRatio,
                renderType: a.PublicModel.renderType,
                containerWidth: n.number.isRequired,
                containerHeight: n.number.isRequired,
                imageData: n.object.isRequired,
                style: n.object,
                quality: n.object,
                opacity: n.number,
                alignType: n.string,
                displayMode: n.string,
                fittingType: n.string,
                hasBgScrollEffect: n.bool,
                filterEffect: n.object,
                addItemProp: n.bool,
                imgStyle: n.object,
                "data-gallery-id": n.string,
                "data-page-desc": n.string,
                "data-query": n.string,
                "data-image-index": n.number,
                "data-type": n.string,
                onMouseEnter: n.func,
                onTouchStart: n.func,
                autoLayout: n.bool,
                wixImageLayout: n.bool,
                shouldRenderSrc: n.bool,
                imageUrlPreMeasureParams: n.object,
                containerId: n.string,
                maskData: n.object
            },
            statics: {
                useSantaTypes: !0,
                getComponentSkins: c,
                compType: "core.components.Image"
            },
            getInitialState: function() {
                return {
                    showPreloader: !1
                }
            },
            componentWillUnmount: function() {
                this.props.onImageUnmount(this.props.id)
            },
            hasEffect: function() {
                return this.props.filterEffect && "none" !== this.props.filterEffect.effectType
            },
            onImageMouseEnter: function() {
                "function" == typeof this.props.onMouseEnter && this.props.onMouseEnter(this.props.id)
            },
            onImageTouchStart: function() {
                "function" == typeof this.props.onTouchStart && this.props.onTouchStart(this.props.id)
            },
            updateRootStyle: function(t, e, o) {
                var i, n = ["visibility", "transform", "width", "height"],
                    a = r.pick(this.props.style, n.concat("position")),
                    s = r.omit(this.props.style, n);
                r.assign(a, {
                    width: r.get(this.props.style, "width", this.props.containerWidth),
                    height: r.get(this.props.style, "height", this.props.containerHeight)
                }, r.isNumber(o) && {
                    opacity: o
                }), this.props.shouldRenderSrc && r.defaults(a, {
                    top: 0,
                    left: 0
                }), r.assign(t, {
                    style: a,
                    "data-has-bg-scroll-effect": (this.props.hasBgScrollEffect || "").toString(),
                    "data-style": (i = s, r.transform(i, (function(t, e, o) {
                        return r.isEmpty(e) || t.push(r.kebabCase(o) + ":" + e), t
                    }), []).join(";"))
                })
            },
            getSkinProperties: function() {
                var t, e, o = r.get(this, "props.imageData.alt", ""),
                    i = this.hasEffect() && !this.props.cssFiltersSupported,
                    n = !!r.get(this.props, ["maskData", "svgString"]),
                    a = i || n,
                    s = p.getImageTransformAttributes(this.props, a),
                    l = p.getImageComponents(this.props, o, i, r.noop, s),
                    d = this.props.wixImageLayout && "bolt" === this.props.renderType,
                    c = this.props.autoLayout && !d,
                    u = {
                        addChildren: l,
                        tagName: d ? "wix-image" : "div"
                    };
                if (this.props.onMouseEnter && (u.onMouseEnter = this.onImageMouseEnter), this.props.onTouchStart && (u.onTouchStart = this.onImageTouchStart), this.updateRootStyle(u, s, r.get(this.props, ["imageData", "opacity"])), c || d) {
                    var b = r.pick(this.props, ["imageData", "containerId", "alignType", "displayMode"]);
                    b.imageData.displayMode = b.displayMode, u["data-image-info"] = JSON.stringify(b), u["data-style"] = this.props["data-style"], u["data-image-zoomed"] = this.props.isImageZoomed, u["data-has-bg-scroll-effect"] = (this.props.hasBgScrollEffect || "").toString(), u["data-is-svg"] = a
                }
                return r.defaults(u, (t = this.props, e = r.keyBy(["onKeyDown", "onKeyPress", "onKeyUp", "onFocus", "onBlur", "onChange", "onInput", "onSubmit", "onClick", "onContextMenu", "onDoubleClick", "onDrag", "onDragEnd", "onDragEnter", "onDragExit", "onDragLeave", "onDragOver", "onDragStart", "onDrop", "onMouseDown", "onMouseEnter", "onMouseLeave", "onMouseMove", "onMouseOut", "onMouseOver", "onMouseUp", "onSelect", "onTouchCancel", "onTouchEnd", "onTouchMove", "onTouchStart", "onScroll", "onWheel", "onAbort", "onCanPlay", "onCanPlayThrough", "onDurationChange", "onEmptied", "onEncrypted", "onEnded", "onError", "onLoadedData", "onLoadedMetadata", "onLoadStart", "onPause", "onPlay", "onPlaying", "onProgress", "onRateChange", "onSeeked", "onSeeking", "onStalled", "onSuspend", "onTimeUpdate", "onVolumeChange", "onWaiting", "onAnimationStart", "onAnimationEnd", "onAnimationIteration", "onTransitionEnd", "onCompositionEnd", "onCompositionStart", "onCompositionUpdate", "onCopy", "onCut", "onPaste"]), r.reduce(t, (function(t, o, i) {
                    return (r.startsWith(i, "data-") || r.startsWith(i, "aria-") || r.has(e, i)) && (t[i] = o), t
                }), {}))), {
                    "": u
                }
            }
        });
        t.exports = u
    }, function(t, e, o) {
        "use strict";
        var r = {
            "skins.core.ImageNewSkin": {
                react: [],
                css: {
                    "%": "overflow:hidden;",
                    "%image": "position:static;box-shadow:#000 0 0 0;"
                }
            },
            "skins.core.ImageNewSkinZoomable": {
                react: [],
                css: {
                    "%image": "position:static;box-shadow:#000 0 0 0;user-select:none;"
                }
            },
            "skins.core.ImageSkin": {
                react: [],
                css: {
                    "%image": "position:static;box-shadow:#000 0 0 0;user-select:none;"
                }
            },
            "skins.image.default": {
                react: []
            }
        };
        t.exports = r
    }, function(t, e, o) {
        "use strict";
        var r = o(0),
            i = o(5),
            n = o(3),
            a = o(8),
            s = o(2),
            l = o(1),
            d = o(33),
            p = o(7),
            c = o(27),
            u = o(52),
            b = d.imageElements,
            g = r.pick(u, ["skins.core.ImageNewSkinZoomable"]),
            h = i({
                mixins: [p(g), c],
                displayName: "ZoomedImage",
                propTypes: {
                    cssFiltersSupported: l.BrowserFlags.cssFiltersSupported.isRequired,
                    currentUrl: l.currentUrl,
                    getMediaFullStaticUrl: l.ServiceTopology.getMediaFullStaticUrl,
                    staticMediaUrl: l.ServiceTopology.staticMediaUrl,
                    reportBI: l.reportBI,
                    devicePixelRatio: l.Device.devicePixelRatio,
                    renderType: l.PublicModel.renderType,
                    id: n.string,
                    containerWidth: n.number.isRequired,
                    containerHeight: n.number.isRequired,
                    imageData: n.object.isRequired,
                    maskData: n.object,
                    displayMode: n.string,
                    filterEffect: n.object,
                    initialClickPosition: n.object,
                    autoLayout: n.bool,
                    wixImageLayout: n.bool,
                    containerId: n.string,
                    style: n.object,
                    "data-type": n.string
                },
                statics: {
                    useSantaTypes: !0,
                    getComponentSkins: function() {
                        return g
                    },
                    compType: "core.components.ZoomedImage"
                },
                shouldZoom: !0,
                shouldDrag: !1,
                sequenceId: "",
                animatableElement: "image",
                getInitialState: function() {
                    return this.eventsToAssign = {}, this.imageForLoadEvents = null, {}
                },
                componentDidMount: function() {
                    this.assignLoadEvents()
                },
                componentDidUpdate: function() {
                    this.assignLoadEvents()
                },
                hasEffect: function() {
                    return this.props.filterEffect && "none" !== this.props.filterEffect.effectType
                },
                getTargetPosition: function(t) {
                    this.clientRect = this.clientRect || s.domMeasurements.getBoundingRect(a.findDOMNode(this));
                    var e = this.props.containerHeight,
                        o = this.props.containerWidth,
                        r = t.clientX - this.clientRect.left,
                        i = t.clientY - this.clientRect.top;
                    return {
                        x: -(this.props.imageData.width - o) * (r / o),
                        y: -(this.props.imageData.height - e) * (i / e)
                    }
                },
                zoomOut: function(t) {
                    this.stopSequence(this.sequenceId), t()
                },
                zoomIn: function() {
                    this.shouldDrag = this.shouldZoom;
                    var t = this.getTargetPosition(this.props.initialClickPosition);
                    this.animate(this.animatableElement, "BasePosition", 0, 0, {
                        to: {
                            x: -(this.props.imageData.width / 2 - this.props.containerWidth / 2),
                            y: -(this.props.imageData.height / 2 - this.props.containerHeight / 2)
                        }
                    }), this.sequenceId = this.animate(this.animatableElement, "BasePosition", .2, 0, {
                        to: t
                    })
                },
                drag: function(t) {
                    if (this.shouldDrag) {
                        var e = this.getTargetPosition(t);
                        this.animate(this.animatableElement, "BasePosition", .5, 0, {
                            to: e
                        })
                    }
                },
                assignLoadEvents: function() {
                    if (!r.isEmpty(this.eventsToAssign)) {
                        var t = this.eventsToAssign.readyCallback,
                            e = this.eventsToAssign.errorCallback,
                            o = this.eventsToAssign.uri;
                        this.eventsToAssign = {}, this.imageForLoadEvents || (this.imageForLoadEvents = new window.Image, t && (this.imageForLoadEvents.onload = t), e && (this.imageForLoadEvents.onerror = e)), this.imageForLoadEvents.src = o
                    }
                },
                getOnloadUrl: function(t) {
                    this.eventsToAssign = {
                        uri: t.uri,
                        readyCallback: this.zoomIn
                    }
                },
                getSkinProperties: function() {
                    var t = r.get(this, "props.imageData.alt", ""),
                        e = this.hasEffect() && !this.props.cssFiltersSupported,
                        o = !!r.get(this.props, ["maskData", "svgString"]),
                        i = e || o,
                        n = r.assign({
                            containerWidth: this.props.imageData.width,
                            containerHeight: this.props.imageData.height,
                            imageData: this.props.imageData,
                            displayMode: this.props.displayMode,
                            fittingType: this.props.displayMode
                        }, this.props),
                        a = r.defaults({
                            shouldRenderSrc: !0,
                            imageUrlPreMeasureParams: {
                                width: this.props.imageData.width,
                                height: this.props.imageData.height
                            }
                        }, n),
                        s = b.getImageTransformAttributes(a, e),
                        l = b.getImageComponents(n, t, e, this.getOnloadUrl, s),
                        d = r.assign({
                            width: this.props.containerWidth,
                            height: this.props.containerHeight,
                            WebkitTransform: "translateZ(0)",
                            transform: "translateZ(0)",
                            position: "relative"
                        });
                    e && (this.animatableElement = "svg"), this.props.cssFiltersSupported || (d.overflow = "hidden");
                    var p = this.props.wixImageLayout && "bolt" === this.props.renderType,
                        c = this.props.autoLayout && !p,
                        u = r.defaults({
                            style: d,
                            onMouseMove: this.drag,
                            addChildren: l,
                            tagName: p ? "wix-image" : "div",
                            "data-image-zoomed": !0
                        });
                    if (c || p) {
                        var g = r.pick(this.props, ["imageData", "containerId", "alignType", "displayMode"]);
                        g.imageData.displayMode = g.displayMode, u["data-image-info"] = JSON.stringify(g), u["data-style"] = this.props["data-style"], u["data-has-bg-scroll-effect"] = this.props["data-has-bg-scroll-effect"], u["data-is-svg"] = i
                    }
                    return {
                        "": u
                    }
                }
            });
        t.exports = h
    }, function(t, e, o) {
        "use strict";
        var r = o(0),
            i = o(8),
            n = o(2);

        function a(t) {
            var e = t.comp;
            return r(t.animations).map((function(t) {
                var o = void 0;
                return r.isPlainObject(t.refNames) ? (o = u(e, t.refNames.sourceRefs), t.refNames.destRefs && (o = o.concat(u(e, t.refNames.destRefs)))) : o = u(e, t.refNames), o
            })).flattenDeep().compact().uniq().value()
        }

        function s(t) {
            return t.params ? r.isFunction(t.params) ? t.params() : n.objectUtils.cloneDeep(t.params) : {}
        }

        function l(t, e, o, i) {
            return r.forEach(e.animations, (function(e) {
                var n = s(e),
                    a = void 0,
                    l = void 0;
                r.isPlainObject(e.refNames) ? (a = b(o, e.refNames.sourceRefs), l = e.refNames.destRefs && b(o, e.refNames.destRefs)) : a = b(o, e.refNames);
                var d = void 0;
                l ? (d = t.transition(e.animationName, a, l, e.duration, e.delay, n)) && i.add(d, e.position) : (d = t.animate(e.animationName, a, e.duration, e.delay, n)) && i.add(d, e.position)
            })), i.get()
        }

        function d(t, e, o) {
            e.suppressReactRendering && r.invokeMap(t, "animationStarted"), o && o()
        }

        function p(t, e, o, i) {
            e.forgetSequenceOnComplete && delete i[e.id], e.suppressReactRendering && r.invokeMap(t, "animationEnded"), o && o()
        }

        function c(t, e) {
            return t.compRefs && t.compRefs[e] || t.refs[e]
        }

        function u(t, e) {
            return e = r.isArray(e) ? e : [e], r(e).flatMap((function(e) {
                return r.isArray(e) ? r.reduce(e, c, t) : r.isString(e) ? c(t, e) : e
            })).compact().value()
        }

        function b(t, e) {
            return r.map(u(t, e), i.findDOMNode)
        }
        t.exports = {
            flushQueue: function(t, e, o, r) {
                try {
                    ! function(t, e, o) {
                        for (; e.length > 0;) {
                            var r = e.pop();
                            r.callbacks = r.callbacks || {};
                            var i = a(r),
                                n = s(r),
                                c = {
                                    suppressReactRendering: !1 !== n.suppressReactRendering,
                                    forgetSequenceOnComplete: !1 !== n.forgetSequenceOnComplete,
                                    id: r.id
                                };
                            n.callbacks = {
                                onStart: r.callbacks.onStart,
                                onComplete: p.bind(null, i, c, r.callbacks.onComplete, o),
                                onReverseComplete: p.bind(null, i, c, r.callbacks.onReverseComplete, o),
                                onInterrupt: p.bind(null, i, c, r.callbacks.onInterrupt, o)
                            }, o[r.id] = l(t, r, r.comp, t.sequence(n)), r.callbacks.onInit && r.callbacks.onInit(o[r.id]), d(i, c)
                        }
                    }(t, e, o)
                } catch (t) {
                    if (r) throw t
                }
            },
            getElementsByRefs: b
        }
    }, function(t, e, o) {
        "use strict";
        var r = o(0),
            i = o(2),
            n = o(1),
            a = o(28);
        t.exports = function(t) {
            return {
                propTypes: {
                    compData: n.Component.compData,
                    scale: n.Component.scale,
                    compProp: n.Component.compProp
                },
                mixins: [a(t)],
                componentWillMount: function() {
                    this.currentStyle = this.props.theme, this.currentScale = this.props.scale || 1
                },
                componentWillReceiveProps: function(t) {
                    var e = t.theme,
                        o = t.scale || 1;
                    r.isEqual(this.currentStyle, e) && this.currentScale === o || (this.shouldRecalculateLineHeight = !0), this.currentStyle = e, this.currentScale = o
                },
                componentDidUpdate: function() {
                    this.shouldRecalculateLineHeight && (this.shouldRecalculateLineHeight = !1)
                },
                resetMinHeightIfNeeded: function(t) {
                    this.shouldRecalculateLineHeight && (t[""] = t[""] || {}, t[""].style = t[""].style || {}, t[""].style.minHeight = "")
                },
                getLabelStyle: function() {
                    var t, e, o = r.merge((t = this.props, e = {}, "center" !== t.compProp.align && (e["margin" + (t.compProp.align ? i.stringUtils.capitalize(t.compProp.align) : "")] = t.compProp.margin), e), function(t) {
                        var e = {};
                        return "" !== t.compProp.padding && (e.padding = t.compProp.padding), e
                    }(this.props), this.getFontSize(), this.shouldRecalculateLineHeight ? {
                        lineHeight: ""
                    } : {});
                    return r.omitBy(o, r.isUndefined)
                }
            }
        }
    }, function(t, e, o) {
        "use strict";
        var r = function() {
            function t(t, e) {
                for (var o = 0; o < e.length; o++) {
                    var r = e[o];
                    r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(t, r.key, r)
                }
            }
            return function(e, o, r) {
                return o && t(e.prototype, o), r && t(e, r), e
            }
        }();

        function i(t, e) {
            if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
        }

        function n(t, e) {
            if (!t) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return !e || "object" != typeof e && "function" != typeof e ? t : e
        }

        function a(t, e) {
            if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function, not " + typeof e);
            t.prototype = Object.create(e && e.prototype, {
                constructor: {
                    value: t,
                    enumerable: !1,
                    writable: !0,
                    configurable: !0
                }
            }), e && (Object.setPrototypeOf ? Object.setPrototypeOf(t, e) : t.__proto__ = e)
        }
        var s = o(0),
            l = o(4),
            d = o(3),
            p = o(2),
            c = o(1),
            u = o(6),
            b = o(99),
            g = o(100),
            h = function(t) {
                function e() {
                    return i(this, e), n(this, (e.__proto__ || Object.getPrototypeOf(e)).apply(this, arguments))
                }
                return a(e, t), r(e, [{
                    key: "render",
                    value: function() {
                        var t, e = s.compact((t = this.props, [u(b, s.assign({
                            key: "fontsStyleNode"
                        }, t)), u(g, s.assign({
                            key: "colorsStyleNode"
                        }, t))]));
                        return u.apply(void 0, ["div", {
                            key: "theme"
                        }].concat(function(t) {
                            if (Array.isArray(t)) {
                                for (var e = 0, o = Array(t.length); e < t.length; e++) o[e] = t[e];
                                return o
                            }
                            return Array.from(t)
                        }(e)))
                    }
                }]), e
            }(l.Component),
            m = function(t) {
                function e() {
                    return i(this, e), n(this, (e.__proto__ || Object.getPrototypeOf(e)).apply(this, arguments))
                }
                return a(e, t), r(e, null, [{
                    key: "getCompFonts",
                    value: function(t, e) {
                        return e.fontsMap.map((function(t) {
                            return p.cssUtils.parseFontStr(t).family
                        }))
                    }
                }]), e
            }(h);
        m.getCompFonts.fontsTypes = {
            fontsMap: c.Fonts.fontsMap
        }, h.displayName = "ThemeRenderer", h.useSantaTypes = !0, h.compType = "wysiwyg.viewer.components.ThemeRenderer", h.propTypes = s.assign({
            fontsMap: c.Fonts.fontsMap,
            colorsMap: c.Theme.colorsMap,
            styleRoot: d.string
        }, b.propTypes, g.propTypes), t.exports = h, t.exports.ThemeRendererWithFonts = m
    }, function(t, e, o) {
        "use strict";
        var r = {
            "platform.components.skins.AppWidgetLoaderSkin": {
                react: [
                    ["div", "loader", ["_control-preloader"], {}]
                ],
                css: {
                    "%": "display:flex;align-items:center;justify-content:center;",
                    "@-moz-document url-prefix()": ":invalid",
                    "": "box-shadow:none;",
                    ":-moz-submit-invalid": "box-shadow:none;",
                    ":-moz-ui-invalid": "box-shadow:none;",
                    "%_control-preloader": "width:36px;height:72px;margin-left:-18px;position:absolute;overflow:hidden;transform-origin:100% 50%;animation:semi-rotate 1s linear infinite;",
                    "%_control-preloader::before,%_control-preloader::after": "content:'';top:0;left:0;right:-100%;bottom:0;border:3px solid currentColor;border-color:currentColor transparent transparent currentColor;border-radius:50%;position:absolute;transform:rotate(-45deg);animation:inner-rotate 0.5s linear infinite alternate;",
                    "%_control-preloader::before": "color:#7fccf7;",
                    "%_control-preloader::after": "color:#3899ec;opacity:0;",
                    "@keyframes %semi-rotate": "0%{transform:rotate(180deg);animation-timing-function:ease-out;}45%{transform:rotate(198deg);}55%{transform:rotate(234deg);}100%{transform:rotate(540deg);}",
                    "@keyframes %inner-rotate": "% to{transform:rotate(115deg);opacity:1;}"
                }
            },
            "platform.components.skins.AppWidgetSkin": {
                react: [
                    ["div", "inlineContent", [], {}]
                ]
            },
            "skins.core.InlineSkin": {
                react: [
                    ["div", "inlineContent", [], {}]
                ]
            },
            "skins.viewer.area.ScotchDoubleHorizontalArea": {
                react: [
                    ["div", "bg", [], {}],
                    ["div", "inlineContent", [], {}],
                    ["div", null, ["_scotchT"], {}],
                    ["div", null, ["_scotchB"], {}]
                ],
                params: {
                    brw: "BORDER_SIZE",
                    brd: "BORDER_COLOR_ALPHA",
                    bg: "BG_COLOR_ALPHA",
                    rd: "BORDER_RADIUS",
                    shd: "BOX_SHADOW",
                    tdr: "URL"
                },
                paramsDefaults: {
                    brw: "10px",
                    brd: "color_15",
                    bg: "color_11",
                    rd: "0",
                    shd: "0 1px 4px rgba(0, 0, 0, 0.6)",
                    tdr: "BASE_THEME_DIRECTORY"
                },
                css: {
                    "%bg": "border:[brw] solid [brd];position:absolute;top:0;right:0;bottom:0;left:0;background-color:[bg];[rd]  [shd]",
                    "%inlineContent": "position:absolute;top:0;right:0;bottom:0;left:0;",
                    "%_scotchT": "position:absolute;display:inline-block;background:url([tdr]scotcht.png) no-repeat;width:78px;height:40px;top:-20px;left:50%;margin-left:-39px;",
                    "%_scotchB": "position:absolute;display:inline-block;background:url([tdr]scotchb.png) no-repeat;width:100px;height:48px;bottom:-20px;right:50%;margin-right:-50px;"
                }
            },
            "skins.viewer.area.ScotchDoubleVerticalArea": {
                react: [
                    ["div", "bg", [], {}],
                    ["div", "inlineContent", [], {}],
                    ["div", null, ["_scotchL"], {}],
                    ["div", null, ["_scotchR"], {}]
                ],
                params: {
                    brw: "BORDER_SIZE",
                    brd: "BORDER_COLOR_ALPHA",
                    bg: "BG_COLOR_ALPHA",
                    rd: "BORDER_RADIUS",
                    shd: "BOX_SHADOW",
                    tdr: "URL"
                },
                paramsDefaults: {
                    brw: "10px",
                    brd: "color_15",
                    bg: "color_11",
                    rd: "0",
                    shd: "0 1px 4px rgba(0, 0, 0, 0.6)",
                    tdr: "BASE_THEME_DIRECTORY"
                },
                css: {
                    "%bg": "border:[brw] solid [brd];position:absolute;top:0;right:0;bottom:0;left:0;background-color:[bg];[rd]  [shd]",
                    "%inlineContent": "position:absolute;top:0;right:0;bottom:0;left:0;",
                    "%_scotchL,%_scotchR": "position:absolute;display:inline-block;background-repeat:no-repeat;width:85px;height:86px;top:-20px;",
                    "%_scotchL": "background-image:url([tdr]scotchl.png);left:-30px;",
                    "%_scotchR": "background-image:url([tdr]scotchr.png);right:-30px;"
                }
            },
            "skins.viewer.area.ScotchTopArea": {
                react: [
                    ["div", "bg", [], {}],
                    ["div", "inlineContent", [], {}],
                    ["div", null, ["_scotch"], {}]
                ],
                params: {
                    brw: "BORDER_SIZE",
                    brd: "BORDER_COLOR_ALPHA",
                    bg: "BG_COLOR_ALPHA",
                    rd: "BORDER_RADIUS",
                    shd: "BOX_SHADOW",
                    tdr: "URL"
                },
                paramsDefaults: {
                    brw: "10px",
                    brd: "color_15",
                    bg: "color_11",
                    rd: "0",
                    shd: "0 1px 4px rgba(0, 0, 0, 0.6)",
                    tdr: "BASE_THEME_DIRECTORY"
                },
                css: {
                    "%bg": "border:[brw] solid [brd];position:absolute;top:0;right:0;bottom:0;left:0;background-color:[bg];[rd]  [shd]",
                    "%inlineContent": "position:absolute;top:0;right:0;bottom:0;left:0;",
                    "%_scotch": "position:absolute;display:inline-block;background:url([tdr]scotchvertical.png) no-repeat;width:42px;height:86px;top:-43px;left:50%;margin-left:-21px;"
                }
            },
            "wysiwyg.viewer.components.GroupSkin": {
                react: [
                    ["div", "inlineContent", [], {}]
                ],
                css: {
                    "%": "pointer-events:none;",
                    "%_ie10": "max-width:0;max-height:0;",
                    "%inlineContent": "pointer-events:all;"
                }
            },
            "wysiwyg.viewer.skins.FormContainerSkin": {
                react: [
                    ["form", "form", [], {}]
                ],
                params: {
                    rd: "BORDER_RADIUS",
                    shd: "BOX_SHADOW",
                    bg: "BG_COLOR_ALPHA",
                    brd: "BORDER_COLOR_ALPHA",
                    brw: "BORDER_SIZE"
                },
                paramsDefaults: {
                    rd: "0px",
                    shd: "0 0 0 rgba(0, 0, 0, 0)",
                    bg: "transparent",
                    brd: "#e3e3e3",
                    brw: "0"
                },
                css: {
                    "%": "display:flex;align-items:center;justify-content:center;",
                    "@-moz-document url-prefix()": ":invalid",
                    "": "box-shadow:none;",
                    ":-moz-submit-invalid": "box-shadow:none;",
                    ":-moz-ui-invalid": "box-shadow:none;",
                    "%form": "[rd]  [shd]  background-color:[bg];border:solid [brd] [brw];height:100%;width:100%;"
                }
            },
            "wysiwyg.viewer.skins.VerticalRepeaterEmptySkin": {
                react: [
                    ["div", "inlineContent", [], {}]
                ]
            },
            "wysiwyg.viewer.skins.VerticalRepeaterSkin": {
                react: [
                    ["div", "inlineContent", [], {}]
                ],
                params: {
                    brw: "BORDER_SIZE",
                    brd: "BORDER_COLOR_ALPHA",
                    bg: "BG_COLOR_ALPHA",
                    pad: "PADDING_SIZE",
                    bgh: "BG_COLOR_ALPHA"
                },
                paramsDefaults: {
                    brw: "1px",
                    brd: "color_15",
                    bg: "color_11",
                    pad: "10px 0",
                    bgh: "color_16"
                },
                css: {
                    "%inlineContent": "border:[brw] solid [brd];",
                    "%inlineContent > *": "border-bottom:[brw] solid [brd];background-color:[bg];padding:[pad] 0;",
                    '%inlineContent > *[data-islast="true"]': "border-bottom:transparent solid 0;",
                    "%inlineContent > *:hover": "background-color:[bgh];"
                }
            },
            "wysiwyg.viewer.skins.apps.DefaultBoxSkin": {
                react: [
                    ["div", "bg", [], {}],
                    ["div", "inlineContent", ["_olo"], {}]
                ],
                params: {
                    bg: "BG_COLOR_ALPHA",
                    rd: "BORDER_RADIUS",
                    shd: "BOX_SHADOW",
                    brw: "BORDER_SIZE",
                    brd: "BORDER_COLOR_ALPHA"
                },
                paramsDefaults: {
                    bg: "#fff",
                    rd: "0",
                    shd: "0 1px 1px rgba(0, 0, 0, 0)",
                    brw: "1px",
                    brd: "#333"
                },
                css: {
                    "%bg": "position:absolute;top:0;right:0;bottom:0;left:0;box-sizing:border-box !important;background-color:[bg];[rd]  [shd]  border:[brw] solid [brd];width:100%;height:100%;"
                }
            },
            "wysiwyg.viewer.skins.area.AppleArea": {
                react: [
                    ["div", "bg", [], {}],
                    ["div", "inlineContent", [], {}]
                ],
                params: {
                    bg: "BG_COLOR_ALPHA",
                    rd: "BORDER_RADIUS",
                    shd: "BOX_SHADOW",
                    brw: "BORDER_SIZE",
                    brd: "BORDER_COLOR_ALPHA",
                    tdr: "URL"
                },
                paramsDefaults: {
                    bg: "color_11",
                    rd: "5px",
                    shd: "0 1px 4px rgba(0, 0, 0, 0.6)",
                    brw: "1px",
                    brd: "color_15",
                    tdr: "BASE_THEME_DIRECTORY"
                },
                css: {
                    "%bg": "position:absolute;top:0;right:0;bottom:0;left:0;background-color:[bg];[rd]  [shd]  border:[brw] solid [brd];background-image:url([tdr]apple_box.png);background-repeat:repeat-x;background-position:0 0;",
                    "%inlineContent": "position:absolute;width:100%;height:100%;"
                }
            },
            "wysiwyg.viewer.skins.area.ArrowRightRibbon": {
                react: [
                    ["div", "bg", [], {}],
                    ["div", "inlineContent", [], {}]
                ],
                params: {
                    rb: "BORDER_COLOR_ALPHA",
                    bg: "BORDER_COLOR_ALPHA"
                },
                paramsDefaults: {
                    rb: "color_14",
                    bg: "color_11"
                },
                css: {
                    "%": "transform:scale(1);",
                    "%:before": 'border-width:0 20px 15px 0;bottom:0;position:absolute;content:"";left:0;border-style:solid;border-color:transparent [rb] transparent transparent;',
                    "%inlineContent": "position:absolute;top:0;right:0;bottom:0;left:0;",
                    "%bg": "position:absolute;top:0;right:0;bottom:15px;left:0;overflow:hidden;",
                    "%bg:after,%bg:before": 'position:absolute;content:"";overflow:hidden;right:0;width:100%;border-style:solid;border-color:[bg] transparent;',
                    "%bg:after": "border-width:0 350px 499px 0;bottom:50%;",
                    "%bg:before": "border-width:499px 350px 0 0;top:50%;"
                }
            },
            "wysiwyg.viewer.skins.area.BlankAreaSkin": {
                react: [
                    ["div", "bg", [], {}],
                    ["div", "inlineContent", [], {}]
                ],
                params: {
                    xxx: "BG_COLOR_ALPHA",
                    tdr: "URL"
                },
                paramsDefaults: {
                    xxx: "color_6",
                    tdr: "BASE_THEME_DIRECTORY"
                },
                css: {
                    "%bg,%inlineContent": "position:absolute;top:0;right:0;bottom:0;left:0;",
                    "%inlineContent": "background:[xxx] url([tdr]net.png) center center repeat;"
                }
            },
            "wysiwyg.viewer.skins.area.BorderDashDefaultAreaSkin": {
                react: [
                    ["div", "bg", [], {}],
                    ["div", "inlineContent", [], {}]
                ],
                params: {
                    brw: "BORDER_SIZE",
                    brd: "BORDER_COLOR_ALPHA",
                    bg: "BG_COLOR_ALPHA",
                    rd: "BORDER_RADIUS",
                    shd: "BOX_SHADOW"
                },
                paramsDefaults: {
                    brw: "1px",
                    brd: "color_15",
                    bg: "color_11",
                    rd: "5px",
                    shd: "0 1px 4px rgba(0, 0, 0, 0.6)"
                },
                css: {
                    "%bg": "border:[brw] dashed [brd];position:absolute;top:0;right:0;bottom:0;left:0;background-color:[bg];[rd]  [shd]",
                    "%inlineContent": "position:absolute;top:0;right:0;bottom:0;left:0;"
                }
            },
            "wysiwyg.viewer.skins.area.BubbleArea": {
                react: [
                    ["div", "bg", [], {}],
                    ["div", null, ["_arrow"], {}],
                    ["div", "inlineContent", [], {}]
                ],
                params: {
                    rd: "BORDER_RADIUS",
                    bg: "BG_COLOR_ALPHA",
                    shd: "BOX_SHADOW",
                    brw: "BORDER_SIZE",
                    brd: "BORDER_COLOR_ALPHA"
                },
                paramsDefaults: {
                    rd: "0",
                    bg: "color_11",
                    shd: "0 1px 4px rgba(0, 0, 0, 0.6)",
                    brw: "6px",
                    brd: "color_15"
                },
                css: {
                    "%bg": "[rd]  background-color:[bg];[shd]  border:[brw] solid [brd];position:absolute;top:0;right:0;bottom:10px;left:0;",
                    "%_arrow": "position:absolute;bottom:0;left:50%;margin-left:-10px;border:solid transparent;border-width:10px 10px 0;border-top-color:[brd];",
                    "%inlineContent": "[rd]  position:absolute;top:0;right:0;bottom:30px;left:0;"
                }
            },
            "wysiwyg.viewer.skins.area.BubbleAreaLeft": {
                react: [
                    ["div", "bg", [], {}],
                    ["div", null, ["_arrow"], {}],
                    ["div", "inlineContent", [], {}]
                ],
                params: {
                    rd: "BORDER_RADIUS",
                    bg: "BG_COLOR_ALPHA",
                    shd: "BOX_SHADOW",
                    brw: "BORDER_SIZE",
                    brd: "BORDER_COLOR_ALPHA"
                },
                paramsDefaults: {
                    rd: "0",
                    bg: "color_11",
                    shd: "0 1px 4px 2px rgba(0, 0, 0, 0.6)",
                    brw: "6px",
                    brd: "color_15"
                },
                css: {
                    "%bg": "[rd]  background-color:[bg];[shd]  border:[brw] solid [brd];position:absolute;top:0;right:0;bottom:0;left:10px;",
                    "%_arrow": "position:absolute;left:0;top:50%;margin-top:-10px;border:solid transparent;border-width:10px 10px 10px 0;border-right-color:[brd];",
                    "%inlineContent": "[rd]  position:absolute;top:0;right:0;bottom:10px;left:-10px;"
                }
            },
            "wysiwyg.viewer.skins.area.BubbleAreaRight": {
                react: [
                    ["div", "bg", [], {}],
                    ["div", null, ["_arrow"], {}],
                    ["div", "inlineContent", [], {}]
                ],
                params: {
                    rd: "BORDER_RADIUS",
                    bg: "BG_COLOR_ALPHA",
                    shd: "BOX_SHADOW",
                    brw: "BORDER_SIZE",
                    brd: "BORDER_COLOR_ALPHA"
                },
                paramsDefaults: {
                    rd: "0",
                    bg: "color_11",
                    shd: "0 1px 4px 2px rgba(0, 0, 0, 0.6)",
                    brw: "6px",
                    brd: "color_15"
                },
                css: {
                    "%bg": "[rd]  background-color:[bg];[shd]  border:[brw] solid [brd];position:absolute;top:0;right:10px;bottom:0;left:0;",
                    "%_arrow": "position:absolute;right:0;top:50%;margin-top:-10px;border:solid transparent;border-width:10px 0 10px 10px;border-left-color:[brd];",
                    "%inlineContent": "[rd]  position:absolute;top:0;right:-10px;bottom:10px;left:0;"
                }
            },
            "wysiwyg.viewer.skins.area.BubbleLeftArea": {
                react: [
                    ["div", "bg", [], {}],
                    ["div", null, ["_arrow"], {}],
                    ["div", "inlineContent", [], {}]
                ],
                params: {
                    rd: "BORDER_RADIUS",
                    bg: "BG_COLOR_ALPHA",
                    shd: "BOX_SHADOW",
                    brw: "BORDER_SIZE",
                    brd: "BORDER_COLOR_ALPHA"
                },
                paramsDefaults: {
                    rd: "0",
                    bg: "color_11",
                    shd: "0 1px 4px rgba(0, 0, 0, 0.6)",
                    brw: "6px",
                    brd: "color_15"
                },
                css: {
                    "%bg": "[rd]  background-color:[bg];[shd]  border:[brw] solid [brd];position:absolute;top:0;right:0;bottom:10px;left:0;",
                    "%_arrow": "position:absolute;bottom:0;left:10%;border:solid transparent;border-width:10px 10px 0;border-top-color:[brd];",
                    "%inlineContent": "[rd]  position:absolute;top:0;right:0;bottom:30px;left:0;"
                }
            },
            "wysiwyg.viewer.skins.area.CenterRibbon": {
                react: [
                    ["div", null, ["_container"], {},
                        ["div", null, ["_top"], {}],
                        ["div", null, ["_bot"], {}],
                        ["div", "bg", [], {}],
                        ["div", "inlineContent", [], {}]
                    ]
                ],
                params: {
                    shd: "BOX_SHADOW",
                    bg: "BG_COLOR_ALPHA",
                    brw: "BORDER_SIZE",
                    brd: "BORDER_COLOR_ALPHA",
                    rb2: "BORDER_COLOR_ALPHA",
                    rb1: "BORDER_COLOR_ALPHA"
                },
                paramsDefaults: {
                    shd: "0 1px 4px rgba(0, 0, 0, 0.6)",
                    bg: "color_11",
                    brw: "2px",
                    brd: "color_15",
                    rb2: "color_14",
                    rb1: "color_14"
                },
                css: {
                    "%_container": "top:0;right:0;bottom:0;left:0;min-width:80px !important;",
                    "%bg": "position:absolute;top:0;right:0;bottom:0;left:0;margin:0 40px;[shd]  background:[bg];border:[brw] solid [brd];",
                    "%inlineContent": "position:absolute;top:0;right:0;bottom:0;left:0;",
                    "%_top,%_bot": "overflow:hidden;",
                    "%_top:after,%_top:before,%_bot:after,%_bot:before": 'position:absolute;content:"";overflow:hidden;',
                    "%_top:after,%_bot:after": "left:0;border-left:60px solid transparent;border-right:0;",
                    "%_top:before,%_bot:before": "right:0;border-right:60px solid transparent;border-left:0;",
                    "%_top": "position:absolute;top:0;right:0;bottom:50%;left:0;margin-top:10px;",
                    "%_top:before,%_top:after": "top:0;border-top:100px solid;",
                    "%_top:before": "border-top-color:[rb2];",
                    "%_top:after": "border-top-color:[rb1];",
                    "%_bot": "position:absolute;top:50%;right:0;bottom:0;left:0;margin-bottom:10px;",
                    "%_bot:before,%_bot:after": "bottom:0;border-bottom:100px solid;",
                    "%_bot:before": "border-bottom-color:[rb2];",
                    "%_bot:after": "border-bottom-color:[rb1];"
                }
            },
            "wysiwyg.viewer.skins.area.CircleArea": {
                react: [
                    ["div", "bg", [], {}],
                    ["div", "inlineContent", [], {}]
                ],
                params: {
                    brw: "BORDER_SIZE",
                    brd: "BORDER_COLOR_ALPHA",
                    bg: "BG_COLOR_ALPHA",
                    shd: "BOX_SHADOW"
                },
                paramsDefaults: {
                    brw: "3px",
                    brd: "color_15",
                    bg: "color_11",
                    shd: "0 1px 4px rgba(0, 0, 0, 0.6)"
                },
                css: {
                    "%bg": "border:[brw] solid [brd];background-color:[bg];[shd]",
                    "%inlineContent,%bg": "position:absolute;top:0;right:0;bottom:0;left:0;border-radius:50%;"
                }
            },
            "wysiwyg.viewer.skins.area.CleanZoomAreaSkin": {
                react: [
                    ["div", "bg", [], {}],
                    ["div", "inlineContent", [], {}]
                ],
                css: {
                    "%inlineContent": "box-sizing:border-box !important;",
                    "%_wixAppsLink img": "cursor:pointer;"
                }
            },
            "wysiwyg.viewer.skins.area.CustomRibbonArea": {
                react: [
                    ["span", null, ["_left"], {}],
                    ["span", null, ["_right"], {}],
                    ["div", "bg", [], {}],
                    ["div", "inlineContent", [], {}]
                ],
                params: {
                    bg: "BG_COLOR_ALPHA",
                    rb3: "BORDER_COLOR_ALPHA",
                    rb1: "BORDER_COLOR_ALPHA",
                    rb2: "BORDER_COLOR_ALPHA"
                },
                paramsDefaults: {
                    bg: "color_11",
                    rb3: "color_15",
                    rb1: "color_14",
                    rb2: "color_15"
                },
                css: {
                    "%bg": "background:[bg];",
                    "%inlineContent,%bg": "position:absolute;top:0;right:25px;bottom:10px;left:25px;",
                    "%_left,%_right": 'content:"";position:absolute;width:0;height:0;bottom:0;border:20px solid;transform:rotate(360deg);',
                    "%_left:after,%_right:after": 'content:"";position:absolute;width:0;height:0;bottom:-20px;border:5px solid;border-color:[rb3] [rb3] transparent;',
                    "%_left": "left:0;border-color:[rb1];border-left:15px solid transparent;",
                    "%_left:after": "left:10px;border-left:5px solid transparent;",
                    "%_right": "right:0;border-color:[rb2];border-right:15px solid transparent;",
                    "%_right:after": "right:10px;border-right:5px solid transparent;"
                }
            },
            "wysiwyg.viewer.skins.area.DBDefaultAreaSkin": {
                react: [
                    ["div", "bg", [], {}],
                    ["div", "inlineContent", [], {}]
                ],
                params: {
                    sz1: "BORDER_SIZE",
                    brd: "BORDER_COLOR_ALPHA",
                    bg2: "BG_COLOR_ALPHA",
                    rd: "BORDER_RADIUS",
                    shd: "BOX_SHADOW",
                    sz2: "SIZE",
                    sz3: "BORDER_SIZE",
                    brd2: "BORDER_COLOR_ALPHA",
                    bg: "BG_COLOR_ALPHA"
                },
                paramsDefaults: {
                    sz1: "3px",
                    brd: "color_15",
                    bg2: "color_16",
                    rd: "0",
                    shd: "0 1px 3px rgba(0, 0, 0, 0.5)",
                    sz2: "5px",
                    sz3: "1px",
                    brd2: "color_14",
                    bg: "color_11"
                },
                css: {
                    "%bg": "border:[sz1] solid [brd];position:absolute;top:0;right:0;bottom:0;left:0;background-color:[bg2];[rd]  [shd]",
                    "%bg:after": 'position:absolute;top:[sz2];right:[sz2];bottom:[sz2];left:[sz2];content:"";[rd]    border:[sz3] solid [brd2];background-color:[bg];',
                    "%inlineContent": "position:absolute;top:0;right:0;bottom:0;left:0;"
                }
            },
            "wysiwyg.viewer.skins.area.DefaultAreaSkin": {
                react: [
                    ["div", "bg", [], {}],
                    ["div", "inlineContent", [], {}]
                ],
                params: {
                    brw: "BORDER_SIZE",
                    brd: "BORDER_COLOR_ALPHA",
                    bg: "BG_COLOR_ALPHA",
                    rd: "BORDER_RADIUS",
                    shd: "BOX_SHADOW"
                },
                paramsDefaults: {
                    brw: "1px",
                    brd: "color_15",
                    bg: "color_11",
                    rd: "5px",
                    shd: "0 1px 4px rgba(0, 0, 0, 0.6)"
                },
                css: {
                    "%bg": "border:[brw] solid [brd];background-color:[bg];[rd]  [shd]",
                    "%inlineContent,%bg": "position:absolute;top:0;right:0;bottom:0;left:0;"
                }
            },
            "wysiwyg.viewer.skins.area.ForkedRibbonArea": {
                react: [
                    ["div", null, ["_container"], {},
                        ["b", null, ["_top"], {}],
                        ["b", null, ["_bot"], {}],
                        ["b", null, ["_ctr"], {}],
                        ["div", "bg", [], {}],
                        ["div", "inlineContent", [], {}]
                    ]
                ],
                params: {
                    bg: "BG_COLOR_ALPHA",
                    shd: "BOX_SHADOW",
                    brw: "BORDER_SIZE",
                    brd: "BORDER_COLOR_ALPHA",
                    rb3: "BORDER_COLOR_ALPHA",
                    rb4: "BORDER_COLOR_ALPHA",
                    rb1: "BORDER_COLOR_ALPHA",
                    rb2: "BORDER_COLOR_ALPHA"
                },
                paramsDefaults: {
                    bg: "color_11",
                    shd: "0 1px 4px rgba(0, 0, 0, 0.6)",
                    brw: "2px",
                    brd: "color_14",
                    rb3: "color_15",
                    rb4: "color_15",
                    rb1: "color_14",
                    rb2: "color_14"
                },
                css: {
                    "%_container": "top:0;right:0;bottom:0;left:0;min-width:80px !important;",
                    "%bg": "box-sizing:border-box;position:absolute;top:0;right:0;bottom:0;left:0;background:[bg];margin:0 50px 14px;[shd]  border:[brw] solid [brd];",
                    "%inlineContent": "position:absolute;top:0;right:0;bottom:0;left:0;",
                    "% b%_ctr": "position:absolute;top:0;right:0;bottom:0;left:0;margin:0 50px 20px;",
                    "% b%_ctr:after,% b%_ctr:before": 'position:absolute;content:"";overflow:hidden;bottom:-20px;border-style:solid;',
                    "% b%_ctr:after": "left:0;border-width:0 20px 14px 0;border-color:transparent [rb3] transparent transparent;",
                    "% b%_ctr:before": "right:0;border-width:0 0 14px 20px;border-color:transparent transparent transparent [rb4];",
                    "% b%_top,% b%_bot": "overflow:hidden;position:absolute;left:0;right:0;",
                    "% b%_top:before,% b%_top:after,% b%_bot:before,% b%_bot:after": 'position:absolute;content:"";overflow:hidden;width:10px;',
                    "% b%_top:before,% b%_bot:before": "right:0;border-right:60px solid transparent;border-left:0;",
                    "% b%_top:after,% b%_bot:after": "left:0;border-left:60px solid transparent;border-right:0;",
                    "% b%_top": "top:14px;bottom:50%;margin-bottom:-7px;",
                    "% b%_top:after": "top:0;border-top:100px solid [rb1];",
                    "% b%_top:before": "top:0;border-top:100px solid [rb2];",
                    "% b%_bot": "top:50%;bottom:0;margin-top:7px;",
                    "% b%_bot:after": "bottom:0;border-bottom:100px solid [rb1];",
                    "% b%_bot:before": "bottom:0;border-bottom:100px solid [rb2];"
                }
            },
            "wysiwyg.viewer.skins.area.ForkedRightRibbon": {
                react: [
                    ["div", "bg", [], {},
                        ["div", null, ["_container", "_top"], {},
                            ["div", null, ["_ribbon"], {}]
                        ],
                        ["div", null, ["_container", "_bottom"], {},
                            ["div", null, ["_ribbon"], {}]
                        ]
                    ],
                    ["div", "inlineContent", [], {}]
                ],
                params: {
                    bg: "BORDER_COLOR_ALPHA",
                    rb1: "BORDER_COLOR_ALPHA"
                },
                paramsDefaults: {
                    bg: "color_11",
                    rb1: "color_14"
                },
                css: {
                    "%bg": "position:absolute;top:0;bottom:15px;left:0;width:50%;background-color:[bg];",
                    "%bg:after": 'border-width:0 20px 15px 0;bottom:-15px;position:absolute;content:"";left:0;border-style:solid;border-color:transparent [rb1] transparent transparent;',
                    "%_container": "height:50%;overflow:hidden;width:100%;left:100%;",
                    "%inlineContent": "position:absolute;top:0;right:0;bottom:0;left:0;",
                    "%_bottom": "bottom:0;",
                    "%_bottom %_ribbon": "bottom:0;border-color:transparent transparent transparent [bg];border-width:500px 0 0 0 500px 0;",
                    "%_ribbon": "position:absolute;width:0;height:0;right:0;border-style:solid;",
                    "%_top %_ribbon": "top:0;border-width:500px 0 500px 0 0 0;border-color:[bg] transparent transparent;"
                }
            },
            "wysiwyg.viewer.skins.area.GridArea": {
                react: [
                    ["div", "bg", [], {}],
                    ["div", "inlineContent", [], {}]
                ],
                params: {
                    tdr: "URL"
                },
                paramsDefaults: {
                    tdr: "BASE_THEME_DIRECTORY"
                },
                css: {
                    "%bg": "position:absolute;top:0;right:0;bottom:0;left:0;background:#fff url([tdr]grid.png) repeat-y 50% 0;",
                    "%inlineContent": "position:absolute;width:100%;height:100%;"
                }
            },
            "wysiwyg.viewer.skins.area.InnerMarginAreaSkin": {
                react: [
                    ["div", "bg", [], {}],
                    ["div", "inlineContent", [], {}]
                ],
                params: {
                    $BorderRadius: "BORDER_RADIUS",
                    $boxShadow: "BOX_SHADOW",
                    $bgColor: "BG_COLOR_ALPHA"
                },
                paramsDefaults: {
                    $BorderRadius: "10px",
                    $boxShadow: "inset 1px 1px 6px rgba(255, 255, 255, 0.9), inset -1px -1px 6px rgba(0, 0, 0, 0.9), 0 1px 2px rgba(0, 0, 0, 0.7)",
                    $bgColor: "#000"
                },
                css: {
                    "%bg": "position:absolute;top:0;right:0;bottom:0;left:0;[$BorderRadius]  [$boxShadow]  background-image:none;background-color:[$bgColor];",
                    "%inlineContent": "position:absolute;top:10px;bottom:10px;"
                }
            },
            "wysiwyg.viewer.skins.area.InnerShadowAreaSkin": {
                react: [
                    ["div", "bg", [], {}],
                    ["div", "inlineContent", [], {}]
                ],
                params: {
                    rd: "BORDER_RADIUS",
                    bg: "BG_COLOR_ALPHA",
                    brd: "BORDER_COLOR_ALPHA",
                    brw: "BORDER_SIZE",
                    shd: "BOX_SHADOW"
                },
                paramsDefaults: {
                    rd: "5px",
                    bg: "color_11",
                    brd: "color_15",
                    brw: "1px",
                    shd: "inset 0 1px 2px rgba(0, 0, 0, 0.6), inset 0 -1px 1px rgba(255, 255, 255, 0.75)"
                },
                css: {
                    "%bg": "[rd]  position:absolute;top:0;right:0;bottom:0;left:0;background-color:[bg];border:solid [brd] [brw];[shd]",
                    "%inlineContent": "position:absolute;width:100%;height:100%;"
                }
            },
            "wysiwyg.viewer.skins.area.IronBox": {
                react: [
                    ["div", "bg", [], {}],
                    ["div", "glow", [], {}],
                    ["div", null, ["_screwTL", "_screw"], {}],
                    ["div", null, ["_screwTR", "_screw"], {}],
                    ["div", null, ["_screwBL", "_screw"], {}],
                    ["div", null, ["_screwBR", "_screw"], {}],
                    ["div", "inlineContent", [], {}]
                ],
                params: {
                    bg: "BG_COLOR_ALPHA",
                    shd: "BOX_SHADOW",
                    rd: "BORDER_RADIUS",
                    tdr: "URL",
                    ishd: "BOX_SHADOW"
                },
                paramsDefaults: {
                    bg: "color_11",
                    shd: "0 2px 5px rgba(0, 0, 0, 0.53)",
                    rd: "2px",
                    tdr: "BASE_THEME_DIRECTORY",
                    ishd: "inset 0 0 6px 0 rgba(255, 255, 255, 0.59), inset 0 1px 0 0 rgba(255, 255, 255, 0.92), inset 0 0 5px 0 rgba(255, 255, 255, 0.2)"
                },
                css: {
                    "%inlineContent,%bg,%glow": "position:absolute;top:0;right:0;bottom:0;left:0;",
                    "%bg": "background-color:[bg];[shd]  [rd]  background-image:url([tdr]ironpatern.png);",
                    "%glow": "[ishd]  [rd]",
                    "%_screw": "display:inline-block;background:url([tdr]skrew.png) no-repeat;width:15px;height:15px;",
                    "%_screwTL,%_screwTR,%_screwBL,%_screwBR": "position:absolute;",
                    "%_screwTL": "top:5px;left:5px;",
                    "%_screwTR": "top:5px;right:5px;",
                    "%_screwBL": "bottom:5px;left:5px;",
                    "%_screwBR": "bottom:5px;right:5px;"
                }
            },
            "wysiwyg.viewer.skins.area.LeftTriangleArea": {
                react: [
                    ["div", "bg", [], {}],
                    ["div", null, ["_arrow"], {}],
                    ["div", "inlineContent", [], {}]
                ],
                params: {
                    bg: "BORDER_COLOR_ALPHA",
                    clr: "BORDER_COLOR_ALPHA"
                },
                paramsDefaults: {
                    bg: "color_11",
                    clr: ["bg"]
                },
                css: {
                    "%bg": "background-color:[bg];border:solid [bg];position:absolute;top:0;right:0;bottom:23px;left:0;",
                    "%_arrow": "position:absolute;bottom:-18px;left:0;border-top:18px solid [clr];border-bottom:23px solid transparent;border-right:23px solid transparent;",
                    "%inlineContent": "position:absolute;top:0;right:0;bottom:5px;left:0;"
                }
            },
            "wysiwyg.viewer.skins.area.LiftedBottomAreaSkin": {
                react: [
                    ["div", null, ["_shadow", "_leftBottom"], {}],
                    ["div", null, ["_shadow", "_centerBottom"], {}],
                    ["div", null, ["_shadow", "_rightBottom"], {}],
                    ["div", "bg", [], {}],
                    ["div", "inlineContent", [], {}]
                ],
                params: {
                    tdr: "URL",
                    bg: "BG_COLOR_ALPHA",
                    brw: "BORDER_SIZE",
                    brd: "BORDER_COLOR_ALPHA"
                },
                paramsDefaults: {
                    tdr: "BASE_THEME_DIRECTORY",
                    bg: "color_11",
                    brw: "1px",
                    brd: "color_15"
                },
                css: {
                    "%_shadow": "position:absolute;top:-15px;bottom:-15px;background:url([tdr]shdbottom.png) no-repeat;pointer-events:none;",
                    "%_leftBottom": "left:-15px;background-position:left bottom;width:50px;",
                    "%_rightBottom": "right:-15px;background-position:right bottom;width:50px;",
                    "%_centerBottom": "right:35px;left:35px;background-position:center bottom;",
                    "%bg": "position:absolute;top:0;right:0;bottom:0;left:0;background-color:[bg];border:[brw] solid [brd];",
                    "%inlineContent": "position:absolute;width:100%;height:100%;"
                }
            },
            "wysiwyg.viewer.skins.area.LiftedShadowArea": {
                react: [
                    ["div", null, ["_left", "_shd"], {}],
                    ["div", null, ["_right", "_shd"], {}],
                    ["div", "bg", [], {}],
                    ["div", "inlineContent", [], {}]
                ],
                params: {
                    bg: "BG_COLOR_ALPHA",
                    rd: "BORDER_RADIUS",
                    brw: "BORDER_SIZE",
                    brd: "BORDER_COLOR_ALPHA",
                    tdr: "URL"
                },
                paramsDefaults: {
                    bg: "color_11",
                    rd: "5px",
                    brw: "1px",
                    brd: "color_15",
                    tdr: "BASE_THEME_DIRECTORY"
                },
                css: {
                    "%bg": "position:absolute;top:0;right:0;bottom:0;left:0;background-color:[bg];[rd]  border:[brw] solid [brd];",
                    "%inlineContent": "position:absolute;top:0;right:0;bottom:0;left:0;",
                    "%_shd": "position:absolute;bottom:-26px;width:165px;height:26px;background:url([tdr]liftedshadow_medium.png) no-repeat;pointer-events:none;",
                    "%_left": "left:-20px;background-position:0 0;",
                    "%_right": "right:-20px;background-position:100% 0;"
                }
            },
            "wysiwyg.viewer.skins.area.LiftedTopAreaSkin": {
                react: [
                    ["div", null, ["_shadow", "_leftTop"], {}],
                    ["div", null, ["_shadow", "_centerTop"], {}],
                    ["div", null, ["_shadow", "_rightTop"], {}],
                    ["div", "bg", [], {}],
                    ["div", "inlineContent", [], {}]
                ],
                params: {
                    tdr: "URL",
                    bg: "BG_COLOR_ALPHA",
                    brw: "BORDER_SIZE",
                    brd: "BORDER_COLOR_ALPHA"
                },
                paramsDefaults: {
                    tdr: "BASE_THEME_DIRECTORY",
                    bg: "color_11",
                    brw: "1px",
                    brd: "color_15"
                },
                css: {
                    "%_shadow": "position:absolute;top:-15px;bottom:-15px;background-image:url([tdr]shdtop.png);background-repeat:no-repeat;pointer-events:none;",
                    "%_leftTop": "left:-15px;background-position:left top;width:50px;",
                    "%_rightTop": "right:-15px;background-position:right top;width:50px;",
                    "%_centerTop": "right:35px;left:35px;background-position:center top;",
                    "%bg": "position:absolute;top:0;right:0;bottom:0;left:0;background-color:[bg];border:[brw] solid [brd];",
                    "%inlineContent": "position:absolute;width:100%;height:100%;"
                }
            },
            "wysiwyg.viewer.skins.area.LinesAreaSkin": {
                react: [
                    ["div", "bg", [], {}],
                    ["div", "inlineContent", [], {}]
                ],
                params: {
                    brwT: "BORDER_TOP_SIZE",
                    brd: "BORDER_COLOR_ALPHA",
                    brwB: "BORDER_BOTTOM_SIZE",
                    bg: "BG_COLOR_ALPHA",
                    shd: "BOX_SHADOW"
                },
                paramsDefaults: {
                    brwT: "7px",
                    brd: "color_15",
                    brwB: "0",
                    bg: "color_11",
                    shd: "0 1px 4px rgba(0, 0, 0, 0.6)"
                },
                css: {
                    "%bg": "border-top:calc([brwT] * 4) solid [brd];border-bottom:calc([brwB] * 4) solid [brd];position:absolute;top:0;right:0;bottom:0;left:0;background-color:[bg];[shd]",
                    "%inlineContent": "position:absolute;top:0;right:0;bottom:0;left:0;"
                }
            },
            "wysiwyg.viewer.skins.area.PhotoArea": {
                react: [
                    ["div", null, ["_shadowImgTL", "_bgShadow"], {}],
                    ["div", null, ["_shadowImgTR", "_bgShadow"], {}],
                    ["div", null, ["_shadowImgBL", "_bgShadow"], {}],
                    ["div", null, ["_shadowImgBR", "_bgShadow"], {}],
                    ["div", "bg", [], {}],
                    ["div", "inlineContent", [], {}]
                ],
                params: {
                    bg: "BG_COLOR_ALPHA",
                    shd: "BOX_SHADOW",
                    brw: "BORDER_SIZE",
                    brd: "BORDER_COLOR_ALPHA",
                    tdr: "URL"
                },
                paramsDefaults: {
                    bg: "color_11",
                    shd: "0 1px 5px rgba(0, 0, 0, 0.1)",
                    brw: "10px",
                    brd: "color_15",
                    tdr: "BASE_THEME_DIRECTORY"
                },
                css: {
                    "%bg": "position:absolute;top:0;right:0;bottom:0;left:0;background-color:[bg];[shd]  border:[brw] solid [brd];",
                    "%_bgShadow": "background:url([tdr]shadow_photo.png) no-repeat;width:168px;height:154px;",
                    "%_shadowImgTL,%_shadowImgTR,%_shadowImgBL,%_shadowImgBR": "position:absolute;",
                    "%_shadowImgTL": "background-position:0 0;left:-13px;top:-15px;",
                    "%_shadowImgTR": "background-position:100% 0;right:-15px;top:-14px;",
                    "%_shadowImgBL": "background-position:0 100%;left:-14px;bottom:-13px;",
                    "%_shadowImgBR": "background-position:100% 100%;right:-16px;bottom:-14px;",
                    "%inlineContent": "position:absolute;width:100%;height:100%;"
                }
            },
            "wysiwyg.viewer.skins.area.RectangleArea": {
                react: [
                    ["div", "bg", [], {}],
                    ["div", "inlineContent", [], {}]
                ],
                params: {
                    bg: "BG_COLOR_ALPHA"
                },
                paramsDefaults: {
                    bg: "color_11"
                },
                css: {
                    "%bg": "overflow:hidden;position:absolute;top:0;right:0;bottom:0;left:0;background-color:[bg];",
                    "%inlineContent": "position:absolute;top:0;right:0;bottom:0;left:0;"
                }
            },
            "wysiwyg.viewer.skins.area.RibbonAreaSkin": {
                react: [
                    ["div", null, ["_fl", "_ribbon"], {}],
                    ["div", null, ["_fr", "_ribbon"], {}],
                    ["div", "bg", [], {}],
                    ["div", "inlineContent", [], {}]
                ],
                params: {
                    bg: "BG_COLOR_ALPHA",
                    shd: "BOX_SHADOW",
                    brw: "BORDER_SIZE",
                    brd: "BORDER_COLOR_ALPHA",
                    els: "BORDER_SIZE",
                    elm: "COLOR_ALPHA",
                    elm2: "COLOR_ALPHA"
                },
                paramsDefaults: {
                    bg: "color_11",
                    shd: "0 1px 4px rgba(0, 0, 0, 0.6)",
                    brw: "6px",
                    brd: "color_15",
                    els: "0",
                    elm: "color_15",
                    elm2: "color_15"
                },
                css: {
                    "%bg": "background-color:[bg];[shd]  border:[brw] solid [brd];position:absolute;top:0;right:0;bottom:0;left:0;bottom:calc([els] + 10px);",
                    "%_ribbon": "position:absolute;bottom:calc(-1 * ([els] + 10px));height:0;width:0;border:calc([els] + 10px) solid transparent;",
                    "%_fr": "border-top-color:[elm];border-left-width:0;right:0;",
                    "%_fl": "border-top-color:[elm2];border-right-width:0;left:0;",
                    "%inlineContent": "position:absolute;top:0;right:0;bottom:0;left:0;bottom:calc([els] + 10px);"
                }
            },
            "wysiwyg.viewer.skins.area.RightTriangleArea": {
                react: [
                    ["div", "bg", [], {}],
                    ["div", null, ["_arrow"], {}],
                    ["div", "inlineContent", [], {}]
                ],
                params: {
                    bg: "BORDER_COLOR_ALPHA",
                    clr: "BORDER_COLOR_ALPHA"
                },
                paramsDefaults: {
                    bg: "color_11",
                    clr: ["bg"]
                },
                css: {
                    "%bg": "background-color:[bg];border:solid [bg];position:absolute;top:0;right:0;bottom:23px;left:0;",
                    "%_arrow": "position:absolute;bottom:-18px;right:0;border-top:18px solid [clr];border-bottom:23px solid transparent;border-left:23px solid transparent;",
                    "%inlineContent": "position:absolute;top:0;right:0;bottom:5px;left:0;min-height:30px;min-width:25px;"
                }
            },
            "wysiwyg.viewer.skins.area.RoundArea": {
                react: [
                    ["div", "bg", [], {}],
                    ["div", "inlineContent", [], {}]
                ],
                params: {
                    brd: "BORDER_COLOR_ALPHA",
                    bg: "BG_COLOR_ALPHA",
                    rd: "BORDER_RADIUS",
                    xxx: "BG_COLOR_ALPHA",
                    tdr: "URL"
                },
                paramsDefaults: {
                    brd: "color_15",
                    bg: "color_11",
                    rd: "5px",
                    xxx: "color_11",
                    tdr: "BASE_THEME_DIRECTORY"
                },
                css: {
                    "%bg": "border:3px solid [brd];position:absolute;top:0;right:0;bottom:0;left:0;background-color:[bg];[rd]  background:[xxx] url([tdr]net.png) center center repeat;",
                    "%inlineContent": "position:absolute;top:0;right:0;bottom:0;left:0;"
                }
            },
            "wysiwyg.viewer.skins.area.RoundShadowArea": {
                react: [
                    ["div", "bg", [], {}],
                    ["div", "inlineContent", [], {}]
                ],
                params: {
                    brw: "BORDER_SIZE",
                    brd: "BORDER_COLOR_ALPHA",
                    bg: "BG_COLOR_ALPHA",
                    rd: "BORDER_RADIUS",
                    shd: "BOX_SHADOW",
                    xxx: "BG_COLOR_ALPHA",
                    tdr: "URL"
                },
                paramsDefaults: {
                    brw: "15px",
                    brd: "color_15",
                    bg: "color_11",
                    rd: "5px",
                    shd: "0 1px 4px rgba(0, 0, 0, 0.6)",
                    xxx: "color_11",
                    tdr: "BASE_THEME_DIRECTORY"
                },
                css: {
                    "%bg": "overflow:hidden;border:[brw] solid [brd];background-color:[bg];[rd]  [shd]  background:[xxx] url([tdr]net.png) center center repeat;",
                    "%inlineContent,%bg": "position:absolute;top:0;right:0;bottom:0;left:0;"
                }
            },
            "wysiwyg.viewer.skins.area.SandClockArea": {
                react: [
                    ["b", null, ["_tl"], {}],
                    ["b", null, ["_tr"], {}],
                    ["b", null, ["_bl"], {}],
                    ["b", null, ["_br"], {}],
                    ["div", "bg", [], {}],
                    ["div", "inlineContent", [], {}]
                ],
                params: {
                    bg: "BORDER_COLOR_ALPHA"
                },
                paramsDefaults: {
                    bg: "color_11"
                },
                css: {
                    "%inlineContent": "position:absolute;top:0;right:0;bottom:0;left:0;",
                    "% b": "position:absolute;width:50%;height:50%;overflow:hidden;",
                    "% b%_tr": "left:50%;",
                    "% b%_tr:after": "top:0;right:0;border-top-color:[bg];border-right-width:500px;",
                    "% b%_br": "top:50%;left:50%;",
                    "% b%_br:after": "bottom:0;right:0;border-bottom-color:[bg];border-right-width:500px;",
                    "% b%_bl": "top:50%;",
                    "% b%_bl:after": "bottom:0;left:0;border-bottom-color:[bg];border-left-width:500px;",
                    "% b%_tl:after": "top:0;left:0;border-top-color:[bg];border-left-width:500px;",
                    "% b:after": 'width:100%;height:100%;position:absolute;content:"";border:1000px solid transparent;'
                }
            },
            "wysiwyg.viewer.skins.area.SloopyArea": {
                react: [
                    ["div", "bg", [], {}],
                    ["div", null, ["_bg2"], {}],
                    ["div", "inlineContent", [], {}]
                ],
                params: {
                    bg: "BG_COLOR_ALPHA",
                    tdr: "URL"
                },
                paramsDefaults: {
                    bg: "color_11",
                    tdr: "BASE_THEME_DIRECTORY"
                },
                css: {
                    "%bg,%_bg2,%inlineContent": "position:absolute;top:3px;right:3px;bottom:3px;left:3px;",
                    "%bg": "background:[bg];",
                    "%bg:before,%bg:after": 'position:absolute;content:"";background:url([tdr]sloppyhoriz.png) repeat-x;left:-7px;right:-7px;height:10px;',
                    "%bg:before": "background-position:0 0;top:-7px;",
                    "%bg:after": "background-position:0 100%;bottom:-7px;",
                    "%_bg2:before,%_bg2:after": 'position:absolute;content:"";background:url([tdr]sloppyvertical.png) repeat-y;top:0;bottom:0;width:10px;',
                    "%_bg2:before": "background-position:0 0;left:-7px;",
                    "%_bg2:after": "background-position:100% 0;right:-7px;"
                }
            },
            "wysiwyg.viewer.skins.area.ThreeDeeAreaSkin": {
                react: [
                    ["div", "bg", [], {}],
                    ["div", "inlineContent", [], {}]
                ],
                params: {
                    rd: "BORDER_RADIUS",
                    bg: "BG_COLOR_ALPHA",
                    brd: "BORDER_COLOR_ALPHA",
                    brw: "BORDER_SIZE",
                    shc: "COLOR"
                },
                paramsDefaults: {
                    rd: "5px",
                    bg: "color_11",
                    brd: "color_15",
                    brw: "1px",
                    shc: ["bg"]
                },
                paramsMutators: {
                    shc: {
                        type: "brightness",
                        value: .5,
                        param: "bg"
                    }
                },
                css: {
                    "%bg": "[rd]  position:absolute;top:0;right:0;bottom:0;left:0;background-color:[bg];border:solid [brd] [brw];box-shadow:1px 1px [shc], 3px 3px [shc], 5px 5px [shc], 7px 7px [shc], 9px 9px [shc];",
                    "%inlineContent": "position:absolute;top:0;right:0;bottom:0;left:0;"
                }
            },
            "wysiwyg.viewer.skins.area.TiltedAreaSkin": {
                react: [
                    ["div", "bg", [], {}],
                    ["div", "inlineContent", [], {}]
                ],
                params: {
                    brw: "BORDER_SIZE",
                    brd: "BORDER_COLOR_ALPHA",
                    bg: "BG_COLOR_ALPHA",
                    rd: "BORDER_RADIUS",
                    shd: "BOX_SHADOW"
                },
                paramsDefaults: {
                    brw: "1px",
                    brd: "color_15",
                    bg: "color_11",
                    rd: "5px",
                    shd: "0 1px 4px rgba(0, 0, 0, 0.6)"
                },
                css: {
                    "%bg": "border:[brw] solid [brd];position:absolute;top:0;right:0;bottom:0;left:0;background-color:[bg];[rd]  [shd]",
                    "%inlineContent": "position:absolute;top:0;right:0;bottom:0;left:0;"
                }
            },
            "wysiwyg.viewer.skins.area.TransparentArea": {
                react: [
                    ["div", "bg", [], {}],
                    ["div", "inlineContent", [], {}]
                ],
                params: {
                    bg: "BG_COLOR_ALPHA",
                    rd: "BORDER_RADIUS",
                    xxx: "BG_COLOR_ALPHA",
                    tdr: "URL"
                },
                paramsDefaults: {
                    bg: "color_11",
                    rd: "5px",
                    xxx: "color_11",
                    tdr: "BASE_THEME_DIRECTORY"
                },
                css: {
                    "%bg": "overflow:hidden;position:absolute;top:0;right:0;bottom:0;left:0;background-color:[bg];[rd]  opacity:0.7;background:[xxx] url([tdr]net.png) center center repeat;",
                    "%inlineContent": "position:absolute;top:0;right:0;bottom:0;left:0;"
                }
            },
            "wysiwyg.viewer.skins.area.VerticalArrowArea": {
                react: [
                    ["div", "bg", [], {}],
                    ["b", null, [], {}],
                    ["div", "inlineContent", [], {}]
                ],
                params: {
                    bg: "BORDER_COLOR_ALPHA"
                },
                paramsDefaults: {
                    bg: "color_11"
                },
                css: {
                    "%bg": "position:absolute;top:0;right:0;bottom:200px;left:0;background:[bg];",
                    "%inlineContent": "position:absolute;top:0;right:0;bottom:0;left:0;",
                    "% b": "position:absolute;top:0;right:0;bottom:0;left:0;display:block;overflow:hidden;",
                    "% b:after,% b:before": 'position:absolute;content:"";border-style:solid;transform:rotate(360deg);bottom:0;',
                    "% b:after": "border-width:0 500px 200px 0;border-color:transparent [bg] transparent transparent;right:50%;",
                    "% b:before": "border-width:0 0 200px 500px;border-color:transparent transparent transparent [bg];left:50%;right:0;"
                }
            },
            "wysiwyg.viewer.skins.area.VerticalRibbonArea": {
                react: [
                    ["div", "bg", [], {}],
                    ["i", null, [], {},
                        ["b", null, ["_l"], {}],
                        ["b", null, ["_r"], {}]
                    ],
                    ["div", "inlineContent", [], {}]
                ],
                params: {
                    bg: "BORDER_COLOR_ALPHA"
                },
                paramsDefaults: {
                    bg: "color_11"
                },
                css: {
                    "%": "transform:rotate(360deg);",
                    "%bg": "position:absolute;top:0;right:0;bottom:0;left:0;bottom:315px;background:[bg];min-height:50%;",
                    "%inlineContent": "position:absolute;top:0;right:0;bottom:0;left:0;",
                    "% i": "position:absolute;top:50%;right:0;bottom:0;left:0;overflow:hidden;",
                    '%[data-state~="mobileView"] i': "margin-top:-1px;",
                    "% b": "position:absolute;display:block;top:100%;margin-top:-500px;overflow:hidden;bottom:0;",
                    "%_l": "left:0;right:50%;",
                    "%_l:after": "left:0;border-width:0 500px 315px 500px;border-color:[bg] transparent transparent [bg];",
                    "%_r": "right:0;left:50%;",
                    "%_r:before": "right:0;border-width:0 500px 315px 0;border-color:transparent [bg] transparent [bg];",
                    "%_l:after,%_r:before": 'position:absolute;bottom:0;content:"";border-style:solid;overflow:hidden;'
                }
            },
            "wysiwyg.viewer.skins.area.WrapperSkin": {
                react: [
                    ["div", "bg", [], {}],
                    ["div", "inlineContent", [], {}]
                ],
                params: {
                    bg: "BG_COLOR_ALPHA",
                    rd: "BORDER_RADIUS",
                    shd: "BOX_SHADOW",
                    brw: "BORDER_SIZE",
                    brd: "BORDER_COLOR"
                },
                paramsDefaults: {
                    bg: "#fff",
                    rd: "0",
                    shd: "0 1px 3px rgba(0, 0, 0, 0)",
                    brw: "1px",
                    brd: "#000"
                },
                css: {
                    "%": "background-color:[bg];[rd]  [shd]  box-sizing:border-box !important;border:[brw] solid [brd];position:relative;height:auto !important;",
                    "%bg": "display:none;",
                    "%inlineContent": "position:relative;"
                }
            }
        };
        t.exports = r
    }, function(t, e, o) {
        "use strict";
        var r = o(0),
            i = o(3),
            n = o(2),
            a = o(1),
            s = o(7),
            l = o(106),
            d = n.xssUtils.filterHtmlString;

        function p(t) {
            var e = t.compData,
                o = t.isInSSR,
                r = t.isExperimentOpen;
            if (!e) return [];
            if (e.usedFonts) return e.usedFonts;
            var i = o && r("ssrFontShortcut"),
                a = r("useRegExpForFontsParse");
            return n.fonts.collectFontsFromTextDataArray(e.text, {
                onlyUploaded: i,
                useRegExp: a
            })
        }

        function c() {
            return "wysiwyg.viewer.skins.WRichTextNewSkin"
        }
        p.fontsTypes = {
            compData: a.Component.compData,
            isInSSR: a.isInSSR.isRequired,
            isExperimentOpen: a.isExperimentOpen
        };
        var u = r.pick(l, ["wysiwyg.viewer.skins.WRichTextNewSkin"].concat(function(t) {
                if (Array.isArray(t)) {
                    for (var e = 0, o = Array(t.length); e < t.length; e++) o[e] = t[e];
                    return o
                }
                return Array.from(t)
            }(r.keys(l)))),
            b = s(u);
        b.statics.getCompFonts = p;
        var g = b.statics.getCompFonts;
        b.statics.getCompFonts = function(t, e) {
            var o = g(t, e),
                i = p(e);
            return r.union(o, i)
        }, b.statics.getCompFonts.fontsTypes = r.assign(p.fontsTypes, b.statics.getCompFonts.fontsTypes);
        var h = b.statics.getCompCss;

        function m(t, e, o) {
            var i = e.getStyleData,
                n = e.themeData,
                a = ["p", "h1", "h2", "h3", "h4", "h5", "h6", "ul", "ol"].map((function(t) {
                    return "." + o + " " + t
                })).join(","),
                s = {
                    color: function(t) {
                        return "color:" + (/color_/.test(t) ? n.color[t.split("color_")[1]] : t) + ";"
                    },
                    backgroundColor: function(t) {
                        return "background-color:" + (/color_/.test(t) ? n.color[t.split("color_")[1]] : t) + ";"
                    },
                    fontSize: function(t) {
                        return "font-size:" + t + ";"
                    },
                    fontFamily: function(t) {
                        return "font-family:" + t + ";"
                    },
                    fontWeight: function(t) {
                        return "font-weight:" + t + ";"
                    },
                    fontStyle: function(t) {
                        return "font-style:" + t + ";"
                    },
                    textDecoration: function(t) {
                        return "text-decoration:" + t + ";"
                    },
                    textAlign: function(t) {
                        return "text-align:" + t + ";"
                    },
                    letterSpacing: function(t) {
                        return "letter-spacing:" + t + ";"
                    },
                    lineHeight: function(t) {
                        return "line-height:" + t + ";"
                    }
                },
                l = r.get(i(t), ["style", "properties"], {}),
                d = r.keys(r.pick(l, r.keys(s))),
                p = r.map(d, (function(t) {
                    return s[t](l[t])
                })).join("");
            return r.isEmpty(p) ? "" : a + " {" + p + "}\n"
        }
        b.statics.getCompCss = function(t, e) {
            var o = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : t,
                r = h(t, e, o),
                i = m(t, e, o);
            return r && i && (r[t] = r[t] + "\n" + i), r
        }, b.statics.getCompCss.cssTypes = h.cssTypes, t.exports = {
            propTypes: {
                reportBI: a.reportBI,
                id: a.Component.id.isRequired,
                skin: a.Component.skin.isRequired,
                style: a.Component.style,
                scale: a.Component.scale,
                isPreviewMode: a.isPreviewMode,
                isMobileView: a.isMobileView.isRequired,
                componentViewMode: a.RenderFlags.componentViewMode,
                isResponsive: a.RendererModel.isResponsive,
                title: i.string
            },
            mixins: [b],
            statics: {
                getComponentSkins: function() {
                    return u
                }
            },
            getDefaultSkinName: c,
            componentWillMount: function() {
                this.updateHTML(this.props)
            },
            updateHTML: function(t) {
                this._componentHtml = d(t.compData.text || "", {
                    allowIframes: this.allowIframes
                }), this.convertCompDataTextToHTML(t)
            },
            componentWillReceiveProps: function(t) {
                this.updateHTML(t)
            },
            isPacked: function() {
                var t = this.props.isMobileView && this.props.isPreviewMode;
                return r.get(this.props.compProp, "packed", !1) || t
            },
            getRootStyle: function(t) {
                var e = r.clone(t || {});
                "hidden" !== (e["overflow-y"] || e.overflowY) && (e.height = "auto");
                var o = this.getMinHeight && this.getMinHeight();
                return o && (e.minHeight = o), e
            },
            getResponsiveRootProps: function(t) {
                var e = {};
                return "wysiwyg.viewer.skins.WRichTextNewSkin" === t && "editor" !== this.props.componentViewMode && (e.pointerEvents = "none"), r.assign({
                    style: e
                }, this.props.title && {
                    title: this.props.title
                })
            },
            getRootProps: function(t) {
                var e = this.getMinHeight && this.getMinHeight(),
                    o = this.getRootStyle(this.props.style);
                return "wysiwyg.viewer.skins.WRichTextNewSkin" === t && (o.pointerEvents = "none"), r.assign({
                    "data-packed": this.isPacked(),
                    style: o
                }, e && {
                    "data-min-height": e
                }, this.props.title && {
                    title: this.props.title
                })
            },
            getA11yProps: function() {
                var t = r.get(this.props, ["compData", "a11y"], {}),
                    e = ["label", "live", "atomic", "hidden", "level", "current"].reduce((function(e, o) {
                        return e["aria-" + o] = t[o], e
                    }), {});
                return r.assign({
                    role: t.role
                }, e)
            },
            getSkinProperties: function() {
                this.lastScale = this.props.scale || 1;
                var t = r.has(u, this.props.skin) ? this.props.skin : this.getDefaultSkinName(),
                    e = this.getA11yProps(),
                    o = this.props.isResponsive ? this.getResponsiveRootProps(t) : this.getRootProps(t),
                    i = {
                        "": r.assign(e, o)
                    },
                    n = void 0;
                n = "wysiwyg.viewer.skins.WRichTextSkin" === t || "wysiwyg.viewer.skins.WRichTextClickableSkin" === t ? i.richTextContainer = {} : i[""], r.isString(this._componentHtml) ? n.dangerouslySetInnerHTML = {
                    __html: this._componentHtml || ""
                } : n.children = this._componentHtml;
                var a = r.get(this.props, ["compProp", "overrideAlignment"]);
                return a && (n.className = this.classSet(r.zipObject(["override-" + a], [!0]))), i
            }
        }
    }, function(t, e, o) {
        "use strict";
        var r = o(0),
            i = o(107),
            n = o(2),
            a = n.anchorTagsGenerator,
            s = n.xssUtils.filterHtmlString;
        t.exports = {
            convertDataQueryLinksIntoHtmlAnchors: function(t, e, o) {
                if (!e) return t;
                if (!o) return t.replace(/<a ([^>]*)dataquery="([^"]+)"([^>]*)>/g, (function(t, o, i, n) {
                    return s("<a " + o + r.map(e[i], (function(t, e) {
                        return e + '="' + t + '"'
                    })).join(" ") + n + ">")
                }));
                var i = r.transform(e, (function(t, e) {
                    t["#" + e.id] = e
                }), {});
                return t.replace(/<a ([^>]*)dataquery="([^"]+)"([^>]*)>/g, (function(t, e, n, a) {
                    var l = o(i[n]);
                    return s("<a " + e + r.map(l, (function(t, e) {
                        return e + '="' + t + '"'
                    })).join(" ") + a + ">")
                }))
            },
            mobileTextTransformIfNeeded: function(t, e) {
                return e.isMobileView ? t = i.applyMobileAdjustments(t, e) : t
            },
            createImpliedLinks: function(t) {
                var e = t.isMobileView,
                    o = t.htmlContent,
                    r = t.useEarlyLinkCheck,
                    i = a.getIncludedPatterns(null, e);
                return a.generateAnchorsInHtml(o, i, {
                    useEarlyLinkCheck: r
                })
            },
            applyTextStyleMigrationAdjustments: function(t, e) {
                return i.applyTextStyleMigrationAdjustments(t, e)
            }
        }
    }, function(t, e, o) {
        "use strict";

        function r(t, e, o) {
            return e in t ? Object.defineProperty(t, e, {
                value: o,
                enumerable: !0,
                configurable: !0,
                writable: !0
            }) : t[e] = o, t
        }
        var i = o(0),
            n = o(2).imageUtils,
            a = o(20),
            s = o(61),
            l = o(51),
            d = o(53),
            p = o(6),
            c = o(1),
            u = o(27),
            b = o(7),
            g = o(114),
            h = o(21),
            m = o(9),
            f = o(3),
            w = m({
                Link: f.object
            }, "WPhoto"),
            _ = 1200,
            v = {
                fitWidthStrict: a.fittingTypes.LEGACY_FIT_WIDTH,
                fitHeightStrict: a.fittingTypes.LEGACY_FIT_HEIGHT
            };

        function x(t, e) {
            var o = s.getChildSantaTypes(t, this.props);
            return e = i.assign(o, e), p(t, e)
        }

        function y(t, e) {
            var o = s.getChildStyleDataFromSkinPart("img", this.getSkinExports(), this.props.styleId),
                r = t.compData,
                n = i.get(t.compProp, "overrideCrop");
            n && ((r = i.clone(t.compData)).crop = n);
            var a = i.assign({
                    svgString: t.svgString
                }, i.pick(r.crop || {}, ["flip", "rotate"])),
                l = !t.disableImageAutoLayout,
                d = {
                    id: t.id + "img",
                    ref: "img",
                    skin: o.skin,
                    styleId: o.styleId,
                    autoLayout: l,
                    wixImageLayout: l && (t.isExperimentOpen("bv_wixImagePhaseTwo") || t.isResponsive),
                    containerId: t.id,
                    shouldRenderSrc: t.shouldRenderSrc,
                    imageUrlPreMeasureParams: t.imageUrlPreMeasureParams,
                    displayMode: v[t.compProp.displayMode] || t.compProp.displayMode,
                    filterEffect: t.compProp.filterEffect,
                    imageData: r,
                    maskData: a,
                    addItemProp: t.addItemProp,
                    structure: {
                        componentType: "core.components.Image"
                    }
                };
            return e && (d.containerWidth = e.width, d.containerHeight = e.height), d
        }

        function k(t, e, o) {
            var r = void 0;
            return this.state.isInZoom ? (t.className = this.classSet({
                zoomedin: !0
            }), t.initialClickPosition = this.state.initialClickPosition, t.structure.componentType = "core.components.ZoomedImage", r = x.call(this, d, t), e.onMouseLeave = S.bind(this), e.onMouseEnter = A.bind(this)) : (t.className = this.classSet({
                zoomedout: !0
            }), r = x.call(this, l, t), e.onMouseLeave = i.noop, e.onMouseEnter = i.noop), i.assign(o, e), r
        }

        function R(t, e) {
            var o = y.call(this, this.props),
                r = {
                    onClick: C.bind(this)
                };
            return t ? k.call(this, o, r, e) : x.call(this, l, o)
        }

        function O(t, e, o, r) {
            var i = y.call(this, this.props, t),
                n = {
                    onClick: C.bind(this)
                };
            return !o || function(t, e) {
                return t.width < e.width || t.height < e.height
            }(e, t) ? x.call(this, l, i) : k.call(this, i, n, r)
        }

        function C(t) {
            var e = this,
                o = this.state.isInZoom;
            this.registerReLayout(), o ? this.refs.img.zoomOut((function() {
                e.setState({
                    isInZoom: !o
                })
            })) : this.setState({
                isInZoom: !o,
                initialClickPosition: {
                    clientX: t.clientX,
                    clientY: t.clientY
                }
            })
        }

        function S(t) {
            var e = this;
            A.call(this), this.zoomTimer = setTimeout((function() {
                C.apply(e, [t])
            }), _)
        }

        function A() {
            clearTimeout(this.zoomTimer)
        }

        function E() {
            return "wysiwyg.viewer.skins.photo.DefaultPhoto"
        }
        var L = i.assign({}, g, l.getComponentSkins());
        L = i.pick(L, ["wysiwyg.viewer.skins.photo.DefaultPhoto"].concat(function(t) {
            if (Array.isArray(t)) {
                for (var e = 0, o = Array(t.length); e < t.length; e++) o[e] = t[e];
                return o
            }
            return Array.from(t)
        }(i.keys(L))));
        var T = {
            displayName: "WPhoto",
            propTypes: i.assign({
                id: c.Component.id,
                compData: c.Component.compData.isRequired,
                compProp: c.Component.compProp.isRequired,
                structure: c.Component.structure,
                link: w.Link,
                shouldRenderSrc: c.Media.shouldRenderSrc,
                imageUrlPreMeasureParams: c.Media.imageUrlPreMeasureParams,
                svgString: c.VectorImage.svgStringFromCropData,
                isExperimentOpen: c.isExperimentOpen.isRequired,
                disableImageAutoLayout: f.bool,
                isResponsive: c.RendererModel.isResponsive
            }, i.pickBy(l.propTypes, "id"), i.pickBy(d.propTypes, "id")),
            mixins: [b(L), h(L), u],
            statics: {
                compType: "wysiwyg.viewer.components.WPhoto",
                santaTypeDefinitions: w,
                getComponentSkins: function() {
                    return L
                }
            },
            getInitialState: function() {
                return this.zoomTimer = null, {
                    isInZoom: !1
                }
            },
            getSkinProperties: function() {
                var t, e, o, s, l, d, c, u, b, g = void 0,
                    h = this.props.compProp.onClickBehavior,
                    m = function(t) {
                        var e, o = t.style,
                            n = t.compData,
                            a = t.compProp,
                            s = t.isResponsive,
                            l = (r(e = {
                                style: i.cloneDeep(o),
                                title: n.title
                            }, "data-is-responsive", s), r(e, "data-display-mode", i.get(a, "displayMode")), e),
                            d = i.get(a, "overrideCrop");
                        if (d && (l["data-override-crop"] = JSON.stringify(d)), a.filterEffect && "none" !== a.filterEffect.effectType) {
                            var p = l.style.transform,
                                c = (void 0 === p ? "" : p) + " translateZ(0)";
                            l.style.transform = c.trim()
                        }
                        return l
                    }(this.props),
                    f = (t = this.props.link, e = {
                        style: {}
                    }, t ? (e.style.cursor = "pointer", i.assign(e, t)) : e.parentConst = p.bind(null, "div"), e);
                if (this.props.isResponsive) g = R.call(this, "zoomAndPanMode" === h, m);
                else {
                    var w = this.props.compProp.displayMode,
                        _ = i.pick(this.props.style, ["width", "height"]),
                        x = {
                            width: this.props.compData.width,
                            height: this.props.compData.height
                        },
                        y = (o = this.getParams(["contentPaddingLeft", "contentPaddingRight", "contentPaddingBottom", "contentPaddingTop"]), s = this.getSkinExports(), l = {}, d = parseInt(o.contentPaddingLeft.value || 0, 10) + parseInt(s.contentPaddingLeft || 0, 10), c = parseInt(o.contentPaddingRight.value || 0, 10) + parseInt(s.contentPaddingRight || 0, 10), u = parseInt(o.contentPaddingTop.value || 0, 10) + parseInt(s.contentPaddingTop || 0, 10), b = parseInt(o.contentPaddingBottom.value || 0, 10) + parseInt(s.contentPaddingBottom || 0, 10), l.contentPaddingHorizontal = d + c, l.contentPaddingVertical = u + b, l),
                        k = n.getContainerSize(a, function(t, e) {
                            var o = t.width - e.contentPaddingHorizontal,
                                r = t.height - e.contentPaddingVertical;
                            return {
                                width: o > 0 ? o : 16,
                                height: r > 0 ? r : 16
                            }
                        }(_, y), x, v[w] || w);
                    ! function(t, e, o, r) {
                        t.style.width = e.width, t.style.height = e.height, t["data-content-padding-horizontal"] = r.contentPaddingHorizontal, t["data-content-padding-vertical"] = r.contentPaddingVertical, t["data-exact-height"] = e.exactHeight, o && (t["data-disable-image-auto-layout"] = "true")
                    }(m, function(t, e) {
                        return {
                            width: t.width + e.contentPaddingHorizontal,
                            height: t.height + e.contentPaddingVertical,
                            exactHeight: (t.exactHeight || t.height) + e.contentPaddingVertical
                        }
                    }(k, y), this.props.disableImageAutoLayout, y), g = O.call(this, k, x, "zoomAndPanMode" === h, m),
                        function(t, e) {
                            t.style.width = e.width, t.style.height = e.height
                        }(f, k)
                }
                return {
                    "": m,
                    img: g,
                    link: f
                }
            },
            getDefaultSkinName: E
        };
        t.exports = T
    }, function(t, e, o) {
        "use strict";
        var r = o(0),
            i = o(1),
            n = o(29);

        function a(t) {
            return t.id || r.isFunction(t.fetch)
        }
        var s = r.memoize((function(t) {
                return r.pickBy(t.propTypes, a)
            })),
            l = r.memoize((function(t) {
                return r.pickBy(s(t), (function(t) {
                    return n(t, i)
                }))
            }));
        t.exports = {
            getChildStyleDataFromSkinPart: function(t, e, o) {
                return {
                    skin: e[t].skin,
                    styleId: o + t
                }
            },
            getChildSantaTypes: function(t, e) {
                var o = l(t);
                return r.pick(e, r.keys(o))
            }
        }
    }, function(t, e, o) {
        "use strict";
        var r = o(0),
            i = o(63),
            n = o(12),
            a = o(27),
            s = o(55),
            l = o(13),
            d = o(11),
            p = o(10),
            c = o(47),
            u = o(48),
            b = o(116),
            g = o(21),
            h = o(54),
            m = o(61),
            f = o(117),
            w = o(23),
            _ = o(24),
            v = o(34),
            x = o(36),
            y = o(35),
            k = o(118),
            R = o(58),
            O = o(59),
            C = o(37),
            S = o(119);
        t.exports = r.merge({}, C, {
            components: i,
            mixins: {
                animatableMixin: n,
                animationsMixin: a,
                buttonMixin: s,
                compActionMixin: l,
                baseCompMixin: d.baseComp,
                inlineContentMixin: p,
                fixedPositionContainerMixin: c,
                skinInfoMixin: g,
                scrollMixin: y,
                timersMixins: k,
                textCompMixin: R
            },
            utils: {
                skinsRenderer: _,
                styleNodeUtils: v,
                collectFontsFromLoadedCompStyles: w,
                animationsQueueHandler: h,
                createChildComponentUtils: m,
                fixInvalidStyles: f,
                textComponentsUtils: O,
                pinnedLayerHelper: u,
                lightboxLayerHelper: b
            },
            HOC: {
                withBehaviors: x
            },
            SantaComponent: S
        })
    }, function(t, e, o) {
        "use strict";
        var r = o(64),
            i = o(77),
            n = o(78),
            a = o(51),
            s = o(53),
            l = o(85),
            d = o(87),
            p = o(89),
            c = o(91),
            u = o(92),
            b = o(93),
            g = b.PageGroup,
            h = b.BoltPageGroup,
            m = o(33),
            f = o(95),
            w = o(97),
            _ = o(56),
            v = o(101),
            x = v.FormContainer,
            y = v.GroupContainer,
            k = v.LegacyContainer,
            R = v.Container,
            O = v.AppWidget,
            C = v.RefComponent,
            S = v.Section,
            A = o(105),
            E = o(113),
            L = o(115),
            T = o(56).ThemeRendererWithFonts;
        t.exports = {
            HeaderContainer: r,
            FooterContainer: i,
            MasterPage: n,
            Image: a,
            ZoomedImage: s,
            Anchor: l,
            FiveGridLine: d,
            VerticalLine: p,
            ScreenWidthContainer: c,
            PagesContainer: u,
            PageGroup: g,
            BoltPageGroup: h,
            imageCommon: m,
            Video: f,
            SiteButton: w,
            ThemeRenderer: _,
            FormContainer: x,
            GroupContainer: y,
            LegacyContainer: k,
            Container: R,
            AppWidget: O,
            WRichText: A,
            WPhoto: E,
            ClipArt: L,
            ThemeRendererWithFonts: T,
            RefComponent: C,
            Section: S
        }
    }, function(t, e, o) {
        "use strict";
        var r = o(0),
            i = o(5),
            n = o(3),
            a = o(7),
            s = o(10),
            l = o(1),
            d = o(26),
            p = r.pick(d, ["wysiwyg.viewer.skins.screenwidthcontainer.DefaultScreen", "wysiwyg.viewer.skins.screenwidthcontainer.BevelScreen", "wysiwyg.viewer.skins.screenwidthcontainer.InnerShadowScreen", "wysiwyg.viewer.skins.screenwidthcontainer.ThreeDeeScreen", "wysiwyg.viewer.skins.screenwidthcontainer.TransparentScreen", "wysiwyg.viewer.skins.screenwidthcontainer.LiftedTopScreen", "wysiwyg.viewer.skins.screenwidthcontainer.LiftedBottomScreen", "wysiwyg.viewer.skins.screenwidthcontainer.ShadowBottomScreen", "wysiwyg.viewer.skins.screenwidthcontainer.IronScreen", "wysiwyg.viewer.skins.screenwidthcontainer.DoubleBorderScreen", "wysiwyg.viewer.skins.screenwidthcontainer.BoxScreen", "wysiwyg.viewer.skins.screenwidthcontainer.BlankScreen", "wysiwyg.viewer.skins.screenwidthcontainer.SolidScreen", "wysiwyg.viewer.skins.screenwidthcontainer.NoiseScreen", "wysiwyg.viewer.skins.screenwidthcontainer.LineBottomScreen", "wysiwyg.viewer.skins.screenwidthcontainer.WoodScreen", "wysiwyg.viewer.skins.screenwidthcontainer.AfterScroll"]),
            c = function() {
                return p
            },
            u = function(t, e, o, r, i) {
                var n = {};
                return t ? (n.position = "fixed", n.marginTop = o, n.top = 0) : r ? (n.position = "relative", n.marginTop = e) : n.position = "absolute", i && !t && (n.transform = ""), n
            },
            b = i({
                displayName: "HeaderContainer",
                mixins: [a(c()), s],
                propTypes: {
                    children: n.node,
                    defaultBackgroundStyle: l.Container.defaultBackgroundStyle.isRequired,
                    defaultContentArea: l.Container.defaultContentArea.isRequired,
                    style: l.Component.style.isRequired,
                    isMobileView: l.isMobileView.isRequired,
                    isExperimentOpen: l.isExperimentOpen,
                    isMeshLayoutMechanism: l.Layout.isMeshLayoutMechanism,
                    isMobileDevice: l.Device.isMobileDevice.isRequired,
                    siteWidth: l.siteWidth.isRequired,
                    structure: l.Component.structure.isRequired,
                    wixTopAdsHeight: l.WixAds.wixTopAdsHeight.isRequired,
                    isAfterScroll: l.HeaderContainer.isAfterScroll.isRequired,
                    isPlayingAllowed: l.RenderFlags.isPlayingAllowed.isRequired
                },
                isScreenWidth: function() {
                    return !0
                },
                statics: {
                    useSantaTypes: !0,
                    compSpecificIsDomOnlyOverride: function() {
                        return !1
                    },
                    getComponentSkins: c,
                    compType: "wysiwyg.viewer.components.HeaderContainer"
                },
                getInitialState: function() {
                    return {}
                },
                measureComponent: function(t) {
                    var e = r.defaults({
                        headerHeight: t.clientHeight,
                        bodyHeight: t.ownerDocument.body.clientHeight
                    }, this.state);
                    r.isEqual(e, this.state) || this.setState(e)
                },
                getSkinProperties: function() {
                    var t = this.props,
                        e = t.isMobileView,
                        o = t.isMobileDevice,
                        i = t.structure,
                        n = t.isMeshLayoutMechanism,
                        a = t.wixTopAdsHeight,
                        s = t.isAfterScroll,
                        l = t.isPlayingAllowed,
                        d = !o && !e,
                        p = this.state,
                        c = p.headerHeight,
                        b = p.bodyHeight,
                        g = r.get(this.props, "renderFixedPositionContainers", !0) && r.get(i, "layout.fixedPosition", !1) && (d || !r.isNumber(c) || c <= b / 2),
                        h = this.props.structure.layout.y;
                    return {
                        "": {
                            tagName: "header",
                            "data-is-mobile": e || o,
                            "data-state": r([g && "fixedPosition", e && "mobileView", s && "scrolled", l && "transition-allowed"]).compact().join(" "),
                            "data-site-width": this.props.siteWidth,
                            "data-header-top": h,
                            style: u(g, h, a, n, e)
                        },
                        screenWidthBackground: {
                            style: {
                                left: 0,
                                width: "100%"
                            }
                        },
                        bg: {
                            style: this.props.defaultBackgroundStyle
                        },
                        inlineContent: {
                            children: this.getChildrenRenderer({
                                contentArea: this.props.defaultContentArea
                            })
                        }
                    }
                }
            });
        t.exports = b
    }, function(t, e, o) {
        "use strict";

        function r(t) {
            if (Array.isArray(t)) {
                for (var e = 0, o = Array(t.length); e < t.length; e++) o[e] = t[e];
                return o
            }
            return Array.from(t)
        }
        var i = o(0),
            n = o(4),
            a = o(66),
            s = o(46),
            l = o(2).contentAreaUtil,
            d = function(t, e) {
                return t && !e
            },
            p = function(t, e, o, r) {
                var a = l.getContentAreaStyle(o.width, o.alignment),
                    d = i.transform(r, (function(t, e) {
                        t[e] = !0
                    }), {}),
                    p = n.Children.toArray(e).filter((function(t) {
                        var e = t.props.id;
                        return !d[e]
                    })).map((function(t) {
                        var e, o, r, n = t.props.id;
                        return e = {}, o = n, r = i.clone(a), o in e ? Object.defineProperty(e, o, {
                            value: r,
                            enumerable: !0,
                            configurable: !0,
                            writable: !0
                        }) : e[o] = r, e
                    })).reduce(i.assign, {});
                return i.isEmpty(p) ? [] : [s({
                    id: t + "-content-area-styles",
                    stylesMap: p
                })]
            };
        t.exports = function(t) {
            if (t.isResponsive) return t.children;
            var e = t.id,
                o = t.contentArea,
                s = t.isPreviewMode,
                c = t.isMobileView,
                u = t.isMeshLayoutMechanism,
                b = function(t, e, o) {
                    return d(t, e) && o
                }(o, c, s) ? [n.createElement.apply(null, l.getContentAreaMarkingElement(o, e))] : [],
                g = u ? function(t) {
                    var e = t.id,
                        o = t.container,
                        r = t.adjustingId,
                        n = t.isMobileView,
                        s = t.contentArea,
                        l = t.browser,
                        p = t.reportBI,
                        c = t.fixedChildrenIDs,
                        u = t.children,
                        b = t.contentSkinPartId,
                        g = t.meshResults;
                    return a(i.assign({
                        compId: i.get(o, ["id"]) || e,
                        adjustingId: r,
                        container: o,
                        browser: l,
                        reportBI: p,
                        fixedChildrenIDs: c,
                        children: u,
                        contentSkinPartId: b,
                        meshResults: g
                    }, d(s, n) && {
                        contentArea: s
                    }))
                }(t) : function(t) {
                    var e = t.id,
                        o = t.children,
                        i = t.contentArea,
                        n = t.isMobileView,
                        a = t.fixedChildrenIDs,
                        s = d(i, n) ? p(e, o, i, a) : [];
                    return [].concat(r(s), r(o))
                }(t);
            return [].concat(b, r(g))
        }
    }, function(t, e, o) {
        "use strict";
        var r = function(t, e) {
            if (Array.isArray(t)) return t;
            if (Symbol.iterator in Object(t)) return function(t, e) {
                var o = [],
                    r = !0,
                    i = !1,
                    n = void 0;
                try {
                    for (var a, s = t[Symbol.iterator](); !(r = (a = s.next()).done) && (o.push(a.value), !e || o.length !== e); r = !0);
                } catch (t) {
                    i = !0, n = t
                } finally {
                    try {
                        !r && s.return && s.return()
                    } finally {
                        if (i) throw n
                    }
                }
                return o
            }(t, e);
            throw new TypeError("Invalid attempt to destructure non-iterable instance")
        };

        function i(t, e, o) {
            return e in t ? Object.defineProperty(t, e, {
                value: o,
                enumerable: !0,
                configurable: !0,
                writable: !0
            }) : t[e] = o, t
        }
        var n = o(4),
            a = o(0),
            s = o(67),
            l = o(75),
            d = o(76),
            p = o(6),
            c = o(46),
            u = o(2),
            b = function(t) {
                return t.ie ? "ms" : "standard"
            },
            g = function(t, e) {
                return e ? u.displayedOnlyStructureUtil.getRepeaterTemplateId(t.props.id) : t.props.id
            },
            h = function(t, e) {
                return function(o) {
                    var r;
                    return c({
                        id: t + "-mesh-styles",
                        stylesMap: a.merge(o, (r = {}, i(r, "" + t + e, {
                            position: "relative"
                        }), i(r, t + "centeredContent", {
                            position: "relative"
                        }), i(r, "" + t + e + "-gridWrapper", {
                            "pointer-events": "none"
                        }), i(r, "" + t + e + "-gridContainer > *", {
                            "pointer-events": "auto"
                        }), i(r, "" + t + e + '-gridContainer > [id$="-rotated-wrapper"]', {
                            "pointer-events": "none"
                        }), i(r, "" + t + e + '-gridContainer > [id$="-rotated-wrapper"] > *', {
                            "pointer-events": "auto"
                        }), r))
                    })
                }
            },
            m = function(t) {
                return function() {
                    t(d.MORE_THAN_1000_ROWS)
                }
            };
        t.exports = function(t) {
            var e = t.compId,
                o = t.container,
                d = t.contentArea,
                c = t.adjustingId,
                u = t.browser,
                f = t.reportBI,
                w = t.fixedChildrenIDs,
                _ = t.children,
                v = t.contentSkinPartId,
                x = void 0 === v ? "inlineContent" : v,
                y = t.meshResults,
                k = w.map((function(t) {
                    return i({}, t, !0)
                })).reduce(a.assign, {}),
                R = (y || o).components.map((function(t) {
                    return i({}, t.id, !0)
                })).reduce(a.assign, {}),
                O = n.Children.toArray(_).filter(a.flow((function(t) {
                    return g(t, y)
                }), (function(t) {
                    return !!R[t]
                }))),
                C = a.partition(O, (function(t) {
                    return !!k[g(t, y)]
                })),
                S = r(C, 2),
                A = S[0],
                E = S[1],
                L = void 0;
            y || (L = Object.assign({}, o, {
                id: "" + e + x,
                components: o.components.filter((function(t) {
                    return !t.isFixed
                }))
            }, d && {
                width: "100%",
                contentArea: d
            }));
            return [].concat(function(t) {
                if (Array.isArray(t)) {
                    for (var e = 0, o = Array(t.length); e < t.length; e++) o[e] = t[e];
                    return o
                }
                return Array.from(t)
            }(A), [y ? p(l.default, {
                contentSkinPartId: x,
                key: e + "-MeshReact",
                containerId: e,
                meshResults: y
            }, E) : p(s.default, {
                container: L,
                adjustingId: c,
                key: e + "-MeshReact",
                reportWarning: m(f),
                options: {
                    cssGridVariant: b(u)
                },
                getStyle: h(e, x)
            }, E)])
        }
    }, function(t, e, o) {
        "use strict";
        var r, i = (r = Object.setPrototypeOf || {
                __proto__: []
            }
            instanceof Array && function(t, e) {
                t.__proto__ = e
            } || function(t, e) {
                for (var o in e) e.hasOwnProperty(o) && (t[o] = e[o])
            },
            function(t, e) {
                function o() {
                    this.constructor = t
                }
                r(t, e), t.prototype = null === e ? Object.create(e) : (o.prototype = e.prototype, new o)
            });
        Object.defineProperty(e, "__esModule", {
            value: !0
        });
        var n = o(0),
            a = o(4),
            s = o(68),
            l = o(69),
            d = o(70),
            p = function(t, e, o) {
                (function(t, e) {
                    var o = e + "-gridContainer";
                    return n.get(t, [o, "gridTemplateRows"], "").split(" ").length
                })(t.styles, e) > 1e3 && o()
            },
            c = function(t) {
                function e() {
                    var e = null !== t && t.apply(this, arguments) || this;
                    return e.state = {
                        container: null,
                        meshResult: null,
                        preAdjustmentLayout: null,
                        stylesMap: null
                    }, e
                }
                return i(e, t), e.getDerivedStateFromProps = function(t, e) {
                    var o = t.container,
                        r = t.adjustingId,
                        i = t.options,
                        a = t.reportWarning,
                        l = e || {};
                    if (n.isEqual(o, l.container)) return {};
                    var c = null,
                        u = null,
                        b = null,
                        g = r ? n.find(o.components, {
                            id: r
                        }) : null;
                    if (g) {
                        u = l.meshResult;
                        b = l.preAdjustmentLayout || n.find(l.container.components, {
                            id: r
                        }), c = s.adjustLayout(g, b, u.styles)
                    } else u = d.structure2mesh(o, i), p(u, o.id, a), c = u.styles;
                    return {
                        container: o,
                        meshResult: u,
                        preAdjustmentLayout: b,
                        stylesMap: c
                    }
                }, e.prototype.render = function() {
                    var t = this.props,
                        e = t.getStyle,
                        o = t.children;
                    return [e(this.state.stylesMap)].concat(l.MeshChildrenRenderer({
                        children: o,
                        meshChildren: this.state.meshResult.structure.children
                    }))
                }, e
            }(a.Component);
        e.default = c
    }, function(t, e, o) {
        "use strict";
        Object.defineProperty(e, "__esModule", {
            value: !0
        });
        var r = o(0);
        e.adjustLayout = function(t, e, o) {
            var i = function(t) {
                var e = t.preAdjustmentLayout,
                    o = t.adjustingComp,
                    i = t.style,
                    n = e.height === o.height ? null : o.height,
                    a = r.isNumber(o.top) && e.top === o.top ? null : Math.floor(o.top - e.top);
                return {
                    height: n,
                    marginTop: a ? parseInt(function(t) {
                        var e = t.margin,
                            o = void 0 === e ? "0 0 0 0" : e;
                        return t.marginTop || o.match(/([^ ]*) /)[1]
                    }(i), 10) + a : null
                }
            }({
                adjustingComp: t,
                preAdjustmentLayout: e,
                style: o[t.id]
            });
            return function(t) {
                var e, o = t.stylesMap,
                    i = t.adjustmentData;
                return r.merge({}, o, ((e = {})[i.id] = r(i.style).omitBy(r.isNil).mapValues((function(t) {
                    return t + "px"
                })).value(), e))
            }({
                stylesMap: o,
                adjustmentData: {
                    id: t.id,
                    style: i
                }
            })
        }
    }, function(t, e, o) {
        "use strict";
        Object.defineProperty(e, "__esModule", {
            value: !0
        });
        var r = o(0),
            i = o(4),
            n = function(t) {
                return function(e, o, i) {
                    return void 0 === i && (i = null), r.get(e, [o, t], i)
                }
            },
            a = n("reactComp"),
            s = n("index");
        e.MeshChildrenRenderer = function(t) {
            var e, o = t.children,
                n = void 0 === o ? [] : o,
                l = t.meshChildren,
                d = (e = i.Children.toArray(n), r.reduce(e, (function(t, e, o) {
                    var i, n;
                    return r.assign(t, ((i = {})[(n = e, n.props.id)] = {
                        reactComp: e,
                        index: o
                    }, i))
                }), {}));
            return function t(e) {
                return r(e).sortBy((function(t) {
                    return s(d, (e = t) ? (e.id || "").split("-rotated-wrapper")[0] : null);
                    var e
                })).map((function(e) {
                    var o = e.id,
                        r = e.children;
                    return a(d, o, i.createElement("div", {
                        id: o,
                        key: o,
                        "data-mesh-internal": !0
                    }, t(r)))
                })).value()
            }(l)
        }
    }, function(t, e, o) {
        "use strict";
        Object.defineProperty(e, "__esModule", {
            value: !0
        });
        var r = o(0),
            i = o(45),
            n = o(71),
            a = o(73),
            s = o(25),
            l = o(74),
            d = function(t) {
                return t + "-gridContainer"
            },
            p = function(t, e, o, i) {
                var n = i.minLockMargin,
                    a = r.get(o, "top", 0);
                return s.fitToContentHeight(t) ? r.isUndefined(t.minHeight) ? "auto" : l.unitize(t.minHeight + a) : t.height - e > n ? l.unitize(r.max([t.height, t.minHeight]) + a) : r.isUndefined(t.minHeight) ? "auto" : l.unitize(t.minHeight + a)
            },
            c = function(t) {
                var e, o;
                return {
                    id: t.id,
                    hierarchy: (e = {}, e[t.id] = [], e),
                    styles: (o = {}, o[t.id] = l.getLeafStyle(t), o)
                }
            },
            u = function(t, e) {
                var o = e.style,
                    r = e.id;
                return t.hierarchy[d(t.id)].push(r), t.styles[r] = o, t
            },
            b = function(t, e, o, i, n, a, d, p) {
                var c = [];
                r(o).forEach((function(o) {
                    if (s.isRotated(o)) g(c, t, o, e, i[o.id], n, d, p);
                    else {
                        var r = o.absolute ? l.getCompAbsoluteStyle(o, a) : l.getCompStyles(o, i[o.id], n, t, d, p);
                        c.push({
                            id: o.id,
                            style: r
                        })
                    }
                })), r.forEach(c, u.bind(null, e))
            },
            g = function(t, e, o, r, i, n, a, s) {
                var d = l.getRotatedComponentWrapperStyle(o, e, i, n, a, s),
                    p = o.id + "-rotated-wrapper";
                t.push({
                    id: p,
                    style: d
                }), r.hierarchy[p] = [o.id], r.styles[o.id] = l.getRotatedComponentStyle(o)
            },
            h = function(t, e, o) {
                var i = "ms" === o.cssGridVariant;
                r(e).pickBy((function(t) {
                    return t.isWedge
                })).map((function(e) {
                    return {
                        id: t.id + "-" + e.id,
                        style: l.getWedgeStyle(e, i)
                    }
                })).reduce(u, t)
            },
            m = function(t, e, o, r, i) {
                var n, a, s = i.cssGridVariant,
                    p = t.id,
                    c = function(t) {
                        return t + "-gridWrapper"
                    }(p),
                    u = d(p),
                    b = ((n = {})[p] = [c], n[c] = [u], n[u] = [], n),
                    g = l.getRootContainerStyle(t),
                    h = l.getGridWrapperStyle(r, "ms" === s),
                    m = t.fitToContentHeight,
                    f = void 0 !== m && m,
                    w = t.fitToContentPadding,
                    _ = void 0 === w ? 0 : w,
                    v = l.getGridContainerStyles(s, e, r, o, f, _);
                return {
                    id: p,
                    hierarchy: b,
                    styles: ((a = {})[p] = g, a[c] = h, a[u] = v, a)
                }
            },
            f = function(t, e, o) {
                var i, l = r(e).map(s.top).min(),
                    d = r(e).map(s.bottom).max(),
                    c = function(t, e, o) {
                        return {
                            top: r.min([0, e]),
                            bottom: r.max([t.height || 0, t.minHeight || 0, o])
                        }
                    }(t, l, d),
                    u = function(t, e) {
                        var o = 0 - e.top,
                            r = s.fitToContentHeight(t) ? 0 : e.bottom - s.getContainerHeight(t);
                        return o || r ? {
                            top: o,
                            bottom: r
                        } : null
                    }(t, c),
                    b = (i = e, r.reduce(i, (function(t, e) {
                        var o = t.negativeBottomTops,
                            n = t.nearestTopTopPusher,
                            a = {},
                            l = s.top(e),
                            d = s.bottom(e),
                            p = l + s.height(e) / 2;
                        return r.forEach(i, (function(t) {
                            e !== t && r.inRange(s.top(t), l + 1, d) && (s.bottom(t) > d ? r.inRange(s.top(t), p, d) && (o[e.id] = r.max([d - s.top(t), o[e.id]])) : (r.isUndefined(a[t.id]) || l > a[t.id]) && (a[t.id] = l, n[t.id] = e.id))
                        })), {
                            negativeBottomTops: o,
                            nearestTopTopPusher: n
                        }
                    }), {
                        negativeBottomTops: {},
                        nearestTopTopPusher: {}
                    })),
                    g = b.nearestTopTopPusher,
                    h = b.negativeBottomTops,
                    m = a.default(e, h),
                    f = n.default(m, c, g, o);
                return {
                    verticalArea: c,
                    numberOfRows: r(f).map("rowEnd").max() - 1,
                    compsGridData: f,
                    negativeBottomTops: h,
                    overflow: u,
                    containerMinHeight: p(t, d, u, o)
                }
            };

        function w(t, e) {
            if (r.isEmpty(t.components)) return c(t);
            var o = r(t.components).reject("absolute").map((function(t) {
                    return s.isRotated(t) ? r.assign({}, t, i.getComponentBoundingBox(t)) : t
                })).value(),
                n = f(t, o, e),
                a = n.numberOfRows,
                l = n.verticalArea,
                d = n.containerMinHeight,
                p = n.overflow,
                u = n.negativeBottomTops,
                g = n.compsGridData,
                w = m(t, a, d, p, e);
            return b(t, w, t.components, g, l, p, e, u), h(w, g, e), w
        }
        e.createMeshData = w, e.structure2mesh = function(t, e) {
            var o = void 0 === e ? {} : e,
                i = o.cssGridVariant,
                n = void 0 === i ? "standard" : i,
                a = o.softMargin,
                s = void 0 === a ? 10 : a,
                l = o.minLockMargin,
                d = void 0 === l ? 70 : l;
            r.isUndefined(t.id) && (t = r.defaults({
                id: "root"
            }, t));
            var p, c, u = w(t, {
                    cssGridVariant: n,
                    softMargin: s,
                    minLockMargin: d
                }),
                b = u.hierarchy,
                g = u.styles;
            return {
                structure: (p = b, c = t.id, function t(e, o) {
                    return void 0 === o && (o = []), {
                        id: e,
                        children: r.map(o, (function(e) {
                            return t(e, p[e])
                        }))
                    }
                }(c, p[c])),
                styles: g
            }
        }
    }, function(t, e, o) {
        "use strict";
        Object.defineProperty(e, "__esModule", {
            value: !0
        });
        var r = o(0),
            i = o(25),
            n = o(72),
            a = function(t, e, o, n, a, s, l) {
                var d = function(t, e, o, r) {
                    var i = r.softMargin,
                        n = e + o - t;
                    return n > r.minLockMargin ? i : n
                }(i.bottom(o), n, a, l);
                r.assign(t[o.id], {
                    rowEnd: e.count() + 1,
                    bottomParent: s,
                    marginBottom: d
                })
            },
            s = function(t, e, o, n, s, l) {
                var d = t.compsGridData,
                    p = t.rowsAPI,
                    c = function(t, e, o) {
                        var n = o.count();
                        return r(t).orderBy([i.top], ["desc"]).partition((function(t) {
                            var o = t.id;
                            return e[o].rowStart === n
                        })).value()
                    }(e, d, p),
                    u = c[0],
                    b = c[1];
                r.isEmpty(u) || (r.forEach(u, (function(t) {
                        return a(d, p, t, o, n, s, l)
                    })), p.markRowWithContent()),
                    function(t, e, o, i, n, s, l) {
                        r.isEmpty(t) || r.forEach(t, (function(t) {
                            o.createExtraRows(e[t.id].rowStart, i + n), a(e, o, t, i, n, s, l)
                        }))
                    }(b, d, p, o, n, s, l),
                    function(t, e, o) {
                        o || t.closeRow(e)
                    }(p, o + n, s)
            },
            l = function(t, e) {
                return r.find(t, (function(t, o) {
                    return r.some(e, (function(t) {
                        return t.id === o
                    }))
                }))
            };
        e.default = function(t, e, o, a) {
            var d = n.create(e.top);
            return r.reduce(t, (function(e, n, p) {
                var c = n.y,
                    u = n.pushingComps,
                    b = n.pushMargin,
                    g = n.startingComps,
                    h = p === t.length - 1;
                if (u) {
                    s(e, u, c, b, h, a);
                    var m = h ? [] : t[p + 1].startingComps;
                    ! function(t, e, o, r, i, n) {
                        var a = t.compsGridData,
                            s = t.rowsAPI;
                        (function(t, e, o, r) {
                            var i = r.minLockMargin;
                            t.last();
                            return t.isWedgePossible() && o > i
                        })(s, 0, o, n) && (! function(t, e, o, r, i) {
                            var n = function(t, e) {
                                    return e ? t[e].rowStart : 1
                                }(t, i),
                                a = n - 1,
                                s = e.get(a),
                                l = o + r,
                                d = "wedge-" + (e.count() + 1);
                            e.createExtraRows(n, l), t[d] = {
                                id: d,
                                isWedge: !0,
                                height: l - s,
                                rowStart: n,
                                rowEnd: e.count() + 1
                            }, e.closeRow(l)
                        }(a, s, e, o, l(r, i)), s.setNoWedge())
                    }(e, c, b, o, m, a)
                }
                return g && (! function(t, e) {
                    var o = t.compsGridData,
                        n = t.rowsAPI,
                        a = i.top(r.first(e)) - n.last(),
                        s = n.count();
                    r.forEach(e, (function(t) {
                        var e = t.id;
                        return function(t, e, o, r) {
                            t[e] = {
                                id: e,
                                marginTop: o,
                                rowStart: r,
                                rowEnd: null
                            }
                        }(o, e, a, s)
                    }))
                }(e, g), d.setNoWedge()), e
            }), {
                compsGridData: {},
                rowsAPI: d
            }).compsGridData
        }
    }, function(t, e, o) {
        "use strict";
        Object.defineProperty(e, "__esModule", {
            value: !0
        });
        var r = o(0);
        e.create = function(t) {
            var e = [t],
                o = {},
                i = {},
                n = {
                    count: function() {
                        return e.length
                    },
                    first: function() {
                        return r.first(e)
                    },
                    last: function() {
                        return r.last(e)
                    },
                    get: function(t) {
                        return e[t]
                    },
                    closeRow: function(t) {
                        e.push(t)
                    },
                    getRowAbove: function(t) {
                        return r.findLastIndex(e, (function(e) {
                            return e <= t
                        }))
                    },
                    isWedgePossible: function() {
                        return !i[n.last()]
                    },
                    setNoWedge: function() {
                        i[n.last()] = !0
                    },
                    markRowWithContent: function() {
                        o[n.count()] = o[n.count()] || 1
                    },
                    createExtraRows: function(t, i) {
                        var a = n.count() + 1 - t,
                            s = r.max(r.times(a, (function(e) {
                                return o[t + e] || 1
                            }))),
                            l = r.max([o[e.length] ? 1 : 0, s - a + 1]),
                            d = a + l;
                        r.times(a, (function(e) {
                            return o[t + e] = d
                        })), r.times(l, (function() {
                            n.closeRow(i), o[n.count()] = d
                        }))
                    }
                };
            return n
        }
    }, function(t, e, o) {
        "use strict";
        Object.defineProperty(e, "__esModule", {
            value: !0
        });
        var r = o(0),
            i = o(25),
            n = function(t, e) {
                return e[t] || (e[t] = {
                    y: t,
                    startingComps: [],
                    endingComps: []
                }), e[t]
            },
            a = function(t, e) {
                return r.reduce(t, (function(t, o) {
                    var r = i.top(o),
                        a = function(t, e) {
                            return i.bottom(t) - (e[t.id] || 0)
                        }(o, e);
                    return n(r, t).startingComps.push(o), i.height(o) > 0 && n(a, t).endingComps.push(o), t
                }), {})
            },
            s = function(t, e, o) {
                if (!r.isEmpty(o)) {
                    var i = {
                        y: e,
                        startingComps: o
                    };
                    t.push(i)
                }
            },
            l = function(t, e, o) {
                var i;
                if (!r.isEmpty(o)) {
                    var n = r.last(t);
                    if (!!r.get(n, "pushingComps", null))(i = n.pushingComps).push.apply(i, o), n.y = e;
                    else {
                        var a = {
                            y: e,
                            pushingComps: o,
                            pushMargin: 0
                        };
                        t.push(a)
                    }
                }
            };
        e.default = function(t, e) {
            var o = a(t, e),
                n = r.sortBy(o, "y"),
                d = r.reduce(n, (function(t, e, o) {
                    var n = r.partition(e.startingComps, (function(t) {
                            return 0 === i.height(t)
                        })),
                        a = n[0],
                        d = n[1];
                    return l(t, e.y, e.endingComps),
                        function(t, e, o) {
                            s(t, e, o), l(t, e, o)
                        }(t, e.y, a), s(t, e.y, d), t
                }), []);
            return function(t) {
                t.forEach((function(e, o) {
                    var r = o === t.length - 1;
                    if (e.pushingComps && !r) {
                        var i = t[o + 1];
                        e.pushMargin = i.y - e.y
                    }
                }))
            }(d), d
        }
    }, function(t, e, o) {
        "use strict";
        var r = Object.assign || function(t) {
            for (var e, o = 1, r = arguments.length; o < r; o++)
                for (var i in e = arguments[o]) Object.prototype.hasOwnProperty.call(e, i) && (t[i] = e[i]);
            return t
        };
        Object.defineProperty(e, "__esModule", {
            value: !0
        });
        var i = o(0),
            n = o(45),
            a = o(25),
            s = function(t) {
                return "ms" === t
            };
        e.unitize = function(t) {
            return i.isString(t) ? t : t + "px"
        }, e.getRootContainerStyle = function(t) {
            return {
                height: "auto",
                width: t.width ? e.unitize(t.width) : ""
            }
        };
        var l = {
            top: "marginTop",
            bottom: "marginBottom"
        };
        e.getGridWrapperStyle = function(t, e) {
            return t || e ? {
                display: e ? "-ms-flexbox" : "flex"
            } : {}
        };
        var d = function(t, o) {
            return t && (i.isNumber(o) || o) ? {
                paddingBottom: e.unitize(o),
                boxSizing: "border-box"
            } : {}
        };
        e.getGridContainerStyles = function(t, o, n, a, p, c) {
            var u, b = s(t);
            return r({
                position: "static",
                display: b ? "-ms-grid" : "grid",
                height: "auto",
                width: "100%",
                minHeight: a
            }, function(t) {
                return i(t).pickBy((function(t) {
                    return t > 0
                })).reduce((function(t, o, r) {
                    return t[l[r]] = e.unitize(-1 * o), t
                }), {})
            }(n), function(t, e) {
                var o;
                return (o = {})[e ? "-ms-grid-rows" : "gridTemplateRows"] = i.times(t - 1, i.constant("min-content")).concat("1fr").join(" "), o
            }(o, b), ((u = {})[b ? "-ms-grid-columns" : "gridTemplateColumns"] = "100%", u), d(p, c))
        };
        var p = function(t, e, o, r, i) {
                return i ? {
                    "-ms-grid-column": e.toString(),
                    "-ms-grid-column-span": (r - e).toString(),
                    "-ms-grid-row": t.toString(),
                    "-ms-grid-row-span": (o - t).toString()
                } : {
                    gridArea: [t, e, o, r].join(" / ")
                }
            },
            c = function(t) {
                if (!t) return null;
                var e = i.compact([t.px && t.px + "px", t.pct && t.pct + "%", t.vw && t.vw + "vw"]);
                switch (i.size(e)) {
                    case 0:
                        return "0";
                    case 1:
                        return e[0];
                    default:
                        return "calc(" + i.join(e, " + ") + ")"
                }
            },
            u = function(t) {
                var e = i.pick(t, ["left", "right"]) || {};
                return e.left && e.right ? "stretch" : e.right ? "end" : "start"
            };
        e.getWedgeStyle = function(t, o) {
            return r({
                visibility: "hidden",
                height: e.unitize(t.height),
                width: "0"
            }, p(t.rowStart, 1, t.rowEnd, 2, o))
        };
        var b = function(t, o, r, i, n, s) {
            return e.unitize(o.marginTop) + " " + function(t) {
                return c(t.docked && t.docked.right) || "0px"
            }(t) + " " + function(t, o, r, i, n, s) {
                var l = n.softMargin,
                    d = n.minLockMargin;
                if (o.bottomParent && !a.fitToContentHeight(i)) {
                    var p = r.bottom - a.bottom(t);
                    return e.unitize(p > d ? l : p)
                }
                return s[t.id] ? e.unitize(-1 * s[t.id]) : o.marginBottom ? e.unitize(o.marginBottom) : "0"
            }(t, o, i, r, n, s) + " " + function(t, e) {
                return c(t.docked && t.docked.left) || (e.contentArea ? "calc((100% - " + e.contentArea.width + "px) * " + e.contentArea.alignment + ")" : "0")
            }(t, r)
        };
        e.getCompStyles = function(t, o, n, l, d, c) {
            var g, h = s(d.cssGridVariant);
            return r({
                position: "relative",
                margin: b(t, o, l, n, d, c),
                left: i.has(t, "docked.left") ? 0 : e.unitize(a.left(t))
            }, p(o.rowStart, 1, o.rowEnd, 2, h), ((g = {})[h ? "-ms-grid-column-align" : "justifySelf"] = u(t.docked), g[h ? "-ms-grid-row-align" : "alignSelf"] = "start", g))
        }, e.getRotatedComponentWrapperStyle = function(t, o, a, l, d, c) {
            var g, h = s(d.cssGridVariant),
                m = i.assign({}, t, n.getComponentBoundingBox(t));
            return r({
                position: "static",
                height: e.unitize(Math.ceil(m.height)),
                width: "0",
                margin: b(m, a, o, l, d, c)
            }, p(a.rowStart, 1, a.rowEnd, 2, h), ((g = {})[h ? "-ms-grid-column-align" : "justifySelf"] = u(m.docked), g[h ? "-ms-grid-row-align" : "alignSelf"] = "start", g))
        }, e.getRotatedComponentStyle = function(t) {
            var o = n.getComponentBoundingBox(t);
            return {
                position: "relative",
                left: i.has(t, "docked.left") ? "0" : e.unitize(a.left(t)),
                top: e.unitize(a.top(t) - o.top)
            }
        }, e.getCompAbsoluteStyle = function(t, o) {
            var r = t.top;
            return {
                position: "absolute",
                top: e.unitize(r),
                left: e.unitize(t.left)
            }
        }, e.getLeafStyle = function(t) {
            var o = t.height,
                n = t.width,
                a = t.minHeight,
                s = t.fitToContentHeight,
                l = void 0 !== s && s,
                p = t.fitToContentPadding,
                c = void 0 === p ? 0 : p;
            return r({
                height: l ? "auto" : e.unitize(o),
                width: e.unitize(n),
                minHeight: i.isUndefined(a) ? "" : e.unitize(a)
            }, d(l, c))
        }
    }, function(t, e, o) {
        "use strict";
        var r, i = (r = Object.setPrototypeOf || {
                __proto__: []
            }
            instanceof Array && function(t, e) {
                t.__proto__ = e
            } || function(t, e) {
                for (var o in e) e.hasOwnProperty(o) && (t[o] = e[o])
            },
            function(t, e) {
                function o() {
                    this.constructor = t
                }
                r(t, e), t.prototype = null === e ? Object.create(e) : (o.prototype = e.prototype, new o)
            });
        Object.defineProperty(e, "__esModule", {
            value: !0
        });
        var n = o(4),
            a = function(t, e) {
                var o = {};
                return e.rotatedComponents.forEach((function(t) {
                    return o[t] = !0
                })), t.map((function(t) {
                    return o[t.props.id] ? function(t) {
                        return n.createElement("div", {
                            key: t.props.id + "-rotated-wrapper",
                            id: t.props.id + "-rotated-wrapper",
                            "data-mesh-internal": !0
                        }, t)
                    }(t) : t
                })).concat([e.wedges.map((function(t) {
                    return n.createElement("div", {
                        id: t,
                        key: t,
                        "data-mesh-internal": !0
                    })
                }))])
            },
            s = function(t) {
                function e() {
                    return null !== t && t.apply(this, arguments) || this
                }
                return i(e, t), e.prototype.render = function() {
                    var t = this.props,
                        e = t.meshResults,
                        o = t.containerId,
                        r = t.contentSkinPartId,
                        i = t.children;
                    return n.createElement("div", {
                        id: "" + o + r + "-gridWrapper",
                        key: "" + o + r + "-gridWrapper",
                        "data-mesh-internal": !0
                    }, n.createElement("div", {
                        id: "" + o + r + "-gridContainer",
                        key: "" + o + r + "-gridContainer",
                        "data-mesh-internal": !0
                    }, a(i, e)))
                }, e
            }(n.Component);
        e.default = s
    }, function(t, e, o) {
        "use strict";
        t.exports = {
            MORE_THAN_1000_ROWS: {
                eventId: 418,
                adapter: "ugc-viewer",
                params: {}
            }
        }
    }, function(t, e, o) {
        "use strict";
        var r = o(0),
            i = o(5),
            n = o(3),
            a = o(7),
            s = o(47),
            l = o(10),
            d = o(1),
            p = o(26),
            c = r.pick(p, ["wysiwyg.viewer.skins.screenwidthcontainer.DefaultScreen", "wysiwyg.viewer.skins.screenwidthcontainer.BevelScreen", "wysiwyg.viewer.skins.screenwidthcontainer.InnerShadowScreen", "wysiwyg.viewer.skins.screenwidthcontainer.ThreeDeeScreen", "wysiwyg.viewer.skins.screenwidthcontainer.TransparentScreen", "wysiwyg.viewer.skins.screenwidthcontainer.LiftedTopScreen", "wysiwyg.viewer.skins.screenwidthcontainer.LiftedBottomScreen", "wysiwyg.viewer.skins.screenwidthcontainer.ShadowTopScreen", "wysiwyg.viewer.skins.screenwidthcontainer.IronScreen", "wysiwyg.viewer.skins.screenwidthcontainer.DoubleBorderScreen", "wysiwyg.viewer.skins.screenwidthcontainer.BoxScreen", "wysiwyg.viewer.skins.screenwidthcontainer.BlankScreen", "wysiwyg.viewer.skins.screenwidthcontainer.SolidScreen", "wysiwyg.viewer.skins.screenwidthcontainer.NoiseScreen", "wysiwyg.viewer.skins.screenwidthcontainer.LineTopScreen", "wysiwyg.viewer.skins.screenwidthcontainer.WoodScreen"]),
            u = i({
                displayName: "FooterContainer",
                mixins: [a(c), s, l],
                propTypes: {
                    children: n.node,
                    defaultBackgroundStyle: d.Container.defaultBackgroundStyle.isRequired,
                    defaultContentArea: d.Container.defaultContentArea.isRequired,
                    isMobileDevice: d.Device.isMobileDevice.isRequired,
                    isMobileView: d.isMobileView.isRequired,
                    structure: d.Component.structure.isRequired,
                    siteWidth: d.siteWidth.isRequired,
                    style: d.Component.style
                },
                statics: {
                    compSpecificIsDomOnlyOverride: function() {
                        return !1
                    },
                    getComponentSkins: function() {
                        return c
                    },
                    compType: "wysiwyg.viewer.components.FooterContainer"
                },
                isScreenWidth: function() {
                    return !0
                },
                getSkinProperties: function() {
                    var t, e, o, i = this.props.isMobileView || this.props.isMobileDevice,
                        n = (t = this.props.structure, e = i, o = {}, r.get(t, "layout.fixedPosition", !1) ? o.top = "auto" : o.bottom = "auto", e && (o.left = 0), o);
                    return {
                        "": {
                            tagName: "footer",
                            style: r.assign(this.getRootStyle(this.props.style), n),
                            className: this.classSet({
                                footer: !0
                            }),
                            tabIndex: "-1",
                            "data-site-width": this.props.siteWidth,
                            "data-fixedposition": !!this.props.structure.layout.fixedPosition,
                            "data-isrunninginmobile": i
                        },
                        screenWidthBackground: {
                            style: {
                                left: 0,
                                width: "100%"
                            }
                        },
                        centeredContent: {
                            style: {
                                width: "100%"
                            }
                        },
                        bg: {
                            style: this.props.defaultBackgroundStyle
                        },
                        inlineContent: {
                            children: this.getChildrenRenderer({
                                contentArea: this.props.defaultContentArea
                            })
                        }
                    }
                }
            });
        t.exports = u
    }, function(t, e, o) {
        "use strict";

        function r(t, e, o) {
            return e in t ? Object.defineProperty(t, e, {
                value: o,
                enumerable: !0,
                configurable: !0,
                writable: !0
            }) : t[e] = o, t
        }
        var i = o(0),
            n = o(4),
            a = o(5),
            s = o(10),
            l = o(6),
            d = o(48),
            p = o(1),
            c = o(80),
            u = c.GROUP_TYPES,
            b = c.getMasterPageChildrenGroups,
            g = o(81),
            h = ["siteWidth", "fixedChildrenIDs", "isPreviewMode", "meshParams", "browser", "reportBI", "isMeshLayoutMechanism", "isMobileView", "compBehaviors", "componentViewMode", "defaultContentArea", "isInSSR", "childrenLayout", "isCurrentPageLandingPage", "wixTopAdsHeight", "isResponsive"],
            m = function(t, e) {
                return i.filter(t, (function(t) {
                    return i.includes(i.map(e, "props.id"), t.id)
                }))
            },
            f = {
                displayName: "WixMasterPage",
                mixins: [s],
                statics: {
                    compType: "mobile.core.components.MasterPage"
                },
                propTypes: {
                    compData: p.Component.compData,
                    style: p.Component.style,
                    childrenLayout: p.Component.childrenLayout,
                    compBehaviors: p.Component.compBehaviors,
                    componentViewMode: p.RenderFlags.componentViewMode.isRequired,
                    defaultContentArea: p.Container.defaultContentArea.isRequired,
                    isInSSR: p.isInSSR.isRequired,
                    isMeshLayoutMechanism: p.Layout.isMeshLayoutMechanism,
                    isMobileView: p.isMobileView,
                    siteWidth: p.siteWidth,
                    isCurrentPageLandingPage: p.isCurrentPageLandingPage,
                    meshParams: p.Component.meshParams,
                    wixTopAdsHeight: p.WixAds.wixTopAdsHeight
                },
                makeStructuralChildren: function(t) {
                    var e = this,
                        o = this.props,
                        r = o.isInSSR,
                        n = o.isCurrentPageLandingPage,
                        a = o.siteWidth;
                    return i(t).flatMap((function(t) {
                        var o = t.props.id;
                        return g[o] ? g[o](t, e.getChildStructureLayout(o), {
                            compId: o,
                            isInSSR: r,
                            isCurrentPageLandingPage: n,
                            siteWidth: a
                        }) : t
                    })).compact().value()
                },
                getChildStructureLayout: function(t) {
                    return this.props.childrenLayout[t] || {}
                },
                createSoapContainer: function(t) {
                    var e = this,
                        o = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : [],
                        n = function(t) {
                            var o = t.map((function(t) {
                                return r({}, t, !0)
                            })).reduce(i.assign);
                            return e.props.meshParams.components.filter((function(t) {
                                var e = t.id;
                                return o[e]
                            })).map((function(t) {
                                return i.assign({}, t, {
                                    top: t.top - e.getHeaderBottom()
                                })
                            }))
                        },
                        a = function() {
                            var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : [];
                            return t.map((function(t) {
                                return t.props.id
                            }))
                        },
                        s = i.flow(a, n);
                    return 0 === o.length ? null : l("div", {
                        key: t,
                        id: t
                    }, this.getChildrenRenderer({
                        contentArea: this.props.defaultContentArea,
                        overrides: {
                            id: t,
                            components: s(o),
                            fitToContentHeight: !0
                        }
                    }))
                },
                getHeaderBottom: function() {
                    var t = this.getChildStructureLayout("SITE_HEADER"),
                        e = t.fixedPosition ? 0 : t.y;
                    return t.height + e
                },
                renderMesh: function() {
                    var t = this,
                        e = this.props,
                        o = e.children,
                        r = e.isMobileView,
                        a = e.isCurrentPageLandingPage,
                        s = e.compData,
                        p = e.browser,
                        c = e.wixTopAdsHeight,
                        g = n.Children.toArray(o).map((function(t) {
                            return t.props.id
                        })),
                        h = b(g, this.props.childrenLayout, r),
                        f = i.keyBy(o, (function(t) {
                            return t.props.id
                        })),
                        w = i.flatMap(h, (function(e) {
                            var o = i.isEmpty(e.components) ? [] : i.map(e.components, (function(t) {
                                return f[t]
                            }));
                            switch (e.type) {
                                case u.STRUCTURAL:
                                    return t.makeStructuralChildren(o);
                                case u.SOAP:
                                    return t.createSoapContainer(e.id, o);
                                case u.PINNED:
                                    return d.createPinnedLayer({
                                        id: e.id,
                                        children: o,
                                        childrenMeshParams: m(t.props.meshParams.components, o),
                                        browser: p,
                                        wixTopAdsHeight: c
                                    });
                                case u.OTHER:
                                    return o;
                                default:
                                    return []
                            }
                        }));
                    return l("div", {
                        id: "masterPage",
                        className: "mesh-layout",
                        "data-mesh-layout": "grid"
                    }, w.concat(function(t, e, o) {
                        if (t || e) return null;
                        var r = "";
                        if (o) {
                            var a = o.layoutSettings || {};
                            a.headerToPagesGap && (r += "#PAGES_CONTAINER {margin-top:" + a.headerToPagesGap + "px;} "), a.pagesToFooterGap && (r += "#PAGES_CONTAINER {margin-bottom:" + a.pagesToFooterGap + "px;} ")
                        }
                        return !i.isEmpty(r) && n.createElement("style", {
                            key: "masterpage-legacy-gaps",
                            dangerouslySetInnerHTML: {
                                __html: r
                            }
                        })
                    }(r, a, s)))
                },
                render: function() {
                    return this.props.isMeshLayoutMechanism ? this.renderMesh() : l("div", i.omit(this.props || {}, h), this.getChildrenRenderer({
                        contentArea: this.props.defaultContentArea
                    }))
                }
            };
        t.exports = a(f)
    }, function(t, e, o) {
        "use strict";
        var r, i = (r = Object.setPrototypeOf || {
                __proto__: []
            }
            instanceof Array && function(t, e) {
                t.__proto__ = e
            } || function(t, e) {
                for (var o in e) e.hasOwnProperty(o) && (t[o] = e[o])
            },
            function(t, e) {
                function o() {
                    this.constructor = t
                }
                r(t, e), t.prototype = null === e ? Object.create(e) : (o.prototype = e.prototype, new o)
            });
        Object.defineProperty(e, "__esModule", {
            value: !0
        });
        var n = o(0),
            a = o(4),
            s = o(50),
            l = function(t) {
                return t + "-wrapper"
            },
            d = function(t) {
                function e() {
                    return null !== t && t.apply(this, arguments) || this
                }
                return i(e, t), e.prototype.render = function() {
                    if (0 === a.Children.count(this.props.children)) return null;
                    var t, e, o, r = this.props,
                        i = r.id,
                        d = r.childrenMeshLayout,
                        p = r.marginTop,
                        c = r.children,
                        u = i + "-style",
                        b = (t = d, e = p, o = {}, {
                            stylesMap: n.reduce(t, (function(t, r) {
                                var i = s.getDockedStyleForFixedPosition(r, e);
                                if (n.has(i, "transform")) {
                                    o[r.id] = !0;
                                    var a = ["top", "right", "bottom", "left", "transform", "position"],
                                        d = n.pick(i, a),
                                        p = n.omit(i, a);
                                    t[l(r.id)] = n.assign(d, {
                                        pointerEvents: "none",
                                        zIndex: 50
                                    }), t[r.id] = n.assign(p, {
                                        position: "relative",
                                        pointerEvents: "auto"
                                    })
                                } else t[r.id] = n.assign(i, {
                                    pointerEvents: "auto"
                                });
                                return t
                            }), {}),
                            compsNeedWrapper: o
                        }),
                        g = s.renderStyle({
                            id: u,
                            stylesMap: b.stylesMap
                        }),
                        h = {
                            id: i,
                            key: i,
                            style: {
                                top: 0,
                                left: 0,
                                pointerEvents: "none",
                                zIndex: 50
                            }
                        },
                        m = a.Children.map(c, (function(t) {
                            return b.compsNeedWrapper[t.props.id] ? a.createElement("div", {
                                id: l(t.props.id),
                                key: l(t.props.id)
                            }, t) : t
                        }));
                    return a.createElement("div", h, [g].concat(m))
                }, e
            }(a.Component);
        e.default = d
    }, function(t, e, o) {
        "use strict";
        var r = o(0),
            i = {
                LEGACY_GAPS: "LEGACY_GAPS",
                OTHER: "OTHER",
                PAGES_CONTAINER: "PAGES_CONTAINER",
                PINNED: "PINNED",
                SOAP: "SOAP",
                STRUCTURAL: "STRUCTURAL"
            },
            n = function(t) {
                return t && !!t.fixedPosition
            },
            a = function(t, e) {
                return {
                    type: i.PINNED,
                    components: t,
                    id: e
                }
            },
            s = function(t, e) {
                return {
                    type: i.SOAP,
                    components: t,
                    id: e
                }
            },
            l = function(t) {
                return "PAGES_CONTAINER" === t
            };
        t.exports = {
            GROUP_TYPES: i,
            getMasterPageChildrenGroups: function(t, e, o) {
                var d = o ? {
                        SITE_HEADER: !0,
                        SITE_FOOTER: !0,
                        PAGES_CONTAINER: !0,
                        BACK_TO_TOP_BUTTON: !0,
                        SOSP_CONTAINER_CUSTOM_ID: !0,
                        QUICK_ACTION_BAR: !0
                    } : {
                        SITE_HEADER: !0,
                        SITE_FOOTER: !0,
                        PAGES_CONTAINER: !0,
                        BACK_TO_TOP_BUTTON: !0
                    },
                    p = function(t) {
                        return !!d[t]
                    },
                    c = [],
                    u = [],
                    b = 0,
                    g = "",
                    h = t.reduce((function(t, o) {
                        return d = e[o], n(d) && d.docked && !p(o) ? (c.push(o), t) : (function(t, e) {
                            return !!l(t) || ("SITE_HEADER" === t || "SITE_FOOTER" === t) && n(e)
                        }(o, e[o]) && (g = o, r.isEmpty(c) || (t.push(a(c, "pinnedBefore" + o)), c = [])), l(o) && (r.isEmpty(u) || (t.push(s(u, "soapBeforePagesContainer")), u = []), b = t.length), p(o) ? t.push({
                            type: i.STRUCTURAL,
                            components: [o]
                        }) : n(e[o]) ? t.push(function(t) {
                            return {
                                type: i.OTHER,
                                components: t
                            }
                        }([o])) : u.push(o), t);
                        var d
                    }), []);
                if (r.isEmpty(c) || h.push(a(c, "pinnedAfter" + g)), !r.isEmpty(u)) {
                    var m = s(u, "soapAfterPagesContainer");
                    h.splice(b + 1, 0, m)
                }
                return h
            }
        }
    }, function(t, e, o) {
        "use strict";
        var r = o(0),
            i = o(4),
            n = o(6),
            a = function(t, e, o) {
                var r = o.compId,
                    i = o.isInSSR,
                    a = o.isCurrentPageLandingPage;
                return e.fixedPosition ? [t, n("div", {
                    key: r + "-placeholder",
                    id: r + "-placeholder",
                    style: {
                        height: i ? e.height + e.y : 0,
                        display: a ? "none" : "block"
                    }
                })] : t
            },
            s = {
                SITE_HEADER: a,
                SITE_FOOTER: a,
                BACK_TO_TOP_BUTTON: function(t, e, o) {
                    var n = o.siteWidth,
                        a = {
                            position: "fixed",
                            width: e.width,
                            height: e.height,
                            bottom: r.get(e, "docked.bottom.px")
                        },
                        s = r.has(e, "docked.right") ? "right" : "left";
                    return a[s] = "calc((100% - " + n + "px) / 2)", a[r.camelCase("margin-" + s)] = r.get(e, "docked." + s + ".px"), i.cloneElement(t, {
                        style: a
                    })
                }
            };
        t.exports = s
    }, function(t, e, o) {
        "use strict";
        var r = o(0),
            i = o(2),
            n = o(83),
            a = o(6),
            s = o(20),
            l = i.svgFilters;

        function d(t) {
            return {
                WebkitFilter: "url(#" + t + ")",
                filter: "url(#" + t + ")",
                outline: "1px solid transparent"
            }
        }

        function p(t, e, o, i, n, a, s) {
            var l = r.get(o, ["attr", "img"], {}),
                d = {
                    id: t + "image",
                    ref: "image",
                    key: "image",
                    "data-type": e,
                    width: l.width || "100%",
                    height: l.height || "100%"
                };
            return i && (d.xlinkHref = o.uri), s && (d.fill = "url(#" + s + ")"), a && (d.mask = "url(#" + a + ")", d["data-svg-mask"] = a + "-svg"), n && (d.filter = "url(#" + n + ")"), d
        }

        function c(t, e) {
            return e = e || "", r.assign({
                ref: "svg" + e,
                key: "svg" + e,
                id: "svg" + e,
                version: "1.1"
            }, t)
        }

        function u(t, e, o) {
            return a("svg", c({
                style: {
                    width: 0,
                    height: 0,
                    left: 0,
                    top: 0,
                    overflow: "hidden",
                    position: "absolute"
                }
            }, t), a("defs", {
                ref: "defs",
                key: "defs" + t,
                dangerouslySetInnerHTML: {
                    __html: l.getFilter(t, e, o)
                }
            }))
        }

        function b(t, e, o, i, n, s, l) {
            var p = function(t, e, o, i, n, a, s, l) {
                var p = {
                    id: t + "image",
                    ref: "image",
                    key: "image" + i,
                    style: i ? d(i) : {},
                    alt: n,
                    "data-type": e,
                    itemProp: l.itemProp || "image",
                    "aria-labelledby": l.labelledById,
                    "aria-describedby": l.describedById
                };
                return a && (r.defaults(p.style, s, o.css.img), p.src = o.uri), r.omitBy(p, r.isUndefined)
            }(t, "image", e, o, i, n, s, l);
            return a("img", p)
        }

        function g(t, e, o, n, s, l, d, u, g) {
            var h = n.id,
                m = n.filterId,
                f = n.patternId,
                w = n.maskId;
            return r.isFunction(l) && l(t), s && s.svgString ? function(t, e, o, n, s, l, d) {
                var u = p(t, "image", e, o, n, s),
                    b = r.get(e, ["attr", "container"], {}),
                    g = r.get(e, ["attr", "img"], {}),
                    h = c(r.assign({
                        role: "img",
                        "aria-label": d
                    }, b), t),
                    m = s + "-svg",
                    f = function(t, e) {
                        var o = t.match(/<svg[^>]*>/);
                        if (o) {
                            var r = o[0],
                                i = r.match(/id="[-\w]+"/),
                                n = r.match(/preserveAspectRatio="[-\w\s]+"/);
                            r = n ? r.replace(n[0], 'preserveAspectRatio="none"') : r.replace("<svg ", '<svg preserveAspectRatio="none" '), r = i ? r.replace(i[0], 'id="' + e + '"') : r.replace("<svg ", '<svg id="' + e + '" '), t = t.replace(o[0], r)
                        }
                        return t
                    }(l.svgString, m),
                    w = r.assign({
                        width: "100%",
                        height: "100%",
                        x: 0,
                        y: 0
                    }, function(t, e) {
                        var o = "",
                            r = e.width,
                            i = e.height;
                        switch (t) {
                            case "x":
                                o = "translate(0 " + i + ") scale(1 -1)";
                                break;
                            case "y":
                                o = "translate(" + r + " 0) scale(-1 1)";
                                break;
                            case "xy":
                                o = "translate(" + r + " " + i + ") scale(-1 -1)"
                        }
                        return {
                            transform: o || null
                        }
                    }(l.flip, {
                        width: g.width,
                        height: g.height
                    }));
                return a("svg", h, [a("defs", {
                    key: "defs-" + t,
                    dangerouslySetInnerHTML: {
                        __html: i.svgMask.getMask(s, "" + m, f, w, !0)
                    }
                }), a("image", r.assign({}, g, u))])
            }(h, t, d, m, w, s, e) : o ? f ? function(t, e, o, i, n, s) {
                var l = p(t, "image", e, s, o, "", i),
                    d = r.get(e, ["attr", "container"], {}),
                    u = c(r.assign({
                        role: "img",
                        "aria-label": n
                    }, d), t);
                return a("svg", u, a("rect", l))
            }(h, t, m, f, e) : function(t, e, o, i, n) {
                var s = p(t, "image", e, o, i),
                    l = r.get(e, ["attr", "container"], {}),
                    d = c(r.assign({
                        role: "img",
                        "aria-label": n
                    }, l), t);
                return a("svg", d, a("image", s))
            }(h, t, d, m, e) : b(h, t, m, e, d, u, g)
        }
        t.exports = {
            getImageComponents: function(t, e, o, i, n) {
                var s = void 0,
                    l = void 0,
                    d = r.pick(t, ["fittingType", "displayMode"]),
                    p = d.fittingType || d.displayMode,
                    b = t.id,
                    h = t.filterEffect,
                    m = h && "none" !== h.effectType ? h.effectType : null,
                    f = o && "tile" === p,
                    w = {
                        svgString: r.get(t, ["maskData", "svgString"]) || "",
                        flip: r.get(t, ["imageData", "crop", "flip"]) || ""
                    },
                    _ = w && w.svgString && "mask-" + b,
                    v = m && m + "-" + b,
                    x = f && "pattern-" + b,
                    y = [];
                x && (l = function(t) {
                    return a("svg", c({
                        style: {
                            width: 0,
                            height: 0,
                            left: 0,
                            top: 0,
                            overflow: "hidden",
                            position: "absolute"
                        }
                    }, t), a("defs", {
                        ref: "defs",
                        key: "defs" + t
                    }, a("pattern", {
                        id: t,
                        patternUnits: "userSpaceOnUse",
                        x: "0",
                        y: "0"
                    }, a("image"))))
                }(x), y.push(l)), v && (s = u(v, m, r.omit(h, "effectType")), y.push(s));
                var k, R, O, C, S, A = r.assign({}, r.pick(t.style, ["width", "height"]), r.get(t, ["imageUrlPreMeasureParams", "imageCss"])),
                    E = g(n, e, o, {
                        id: b,
                        filterId: v,
                        patternId: x,
                        maskId: _
                    }, w, i, t.shouldRenderSrc, A, (R = (k = t).imageData, O = k.addItemProp, C = k.labelledById, S = k.describedById, {
                        itemProp: R.itemProp || O || "image",
                        "aria-labelledby": C,
                        "aria-describedby": S
                    }));
                return r.isEmpty(y) ? E : (y.push(E), y)
            },
            getImageTransformAttributes: function(t, e) {
                var o = r.pick(t, ["imageData", "containerWidth", "containerHeight", "fittingType", "alignType", "quality", "displayMode"]),
                    n = t.currentUrl,
                    a = t.getMediaFullStaticUrl,
                    l = e ? "svg" : "img",
                    d = "",
                    p = {
                        css: {},
                        uri: ""
                    };
                return r.isEmpty(t.imageUrlPreMeasureParams) ? p = i.imageUtils.getImageComputedProperties(s, o, a, n, t.devicePixelRatio, l) : (d = function(t, e, o, r) {
                    var n = t.imageUrlPreMeasureParams.devicePixelRatio;
                    return e.imageData.upscaleMethod = t.imageUrlPreMeasureParams.upscaleMethod, e.filters = t.imageUrlPreMeasureParams.filters, e.containerWidth = t.imageUrlPreMeasureParams.width, e.containerHeight = t.imageUrlPreMeasureParams.height, e.displayMode = t.imageUrlPreMeasureParams.fittingType, i.imageUtils.getImageComputedProperties(s, e, o, null, n, r).uri
                }(t, r.cloneDeep(o), a, l), (p = i.imageUtils.getImageComputedProperties(s, o, a, n, t.devicePixelRatio, l)).uri = d, r.assign(p.css.img, t.imageUrlPreMeasureParams.imageCss)), t.isExperimentOpen("sv_image_url_name") || r.omit(o.imageData, "name"), p
            },
            getFilterComponent: u,
            getValidFilterName: function(t, e) {
                var o = "";
                return t && "none" !== t.effectType && (l.isFilterExists(t.effectType) ? o = t.effectType : r.isFunction(e) && e(n.IMAGE_FILTER_NOT_VALID, {
                    filterName: t.effectType
                })), o
            },
            getCssStyleForFilterUse: d
        }
    }, function(t, e, o) {
        "use strict";
        var r = o(0),
            i = o(84);
        r.forEach(i, (function(t, e) {
            t.errorName = e, t.packageName = "components"
        })), t.exports = i
    }, function(t) {
        t.exports = JSON.parse('{"IMAGE_FILTER_NOT_VALID":{"errorName":"image_filter_not_valid","errorCode":556,"severity":"error","params":{"p1":"filterName"}}}')
    }, function(t, e, o) {
        "use strict";
        var r = o(86),
            i = function() {
                return r
            },
            n = o(5)({
                displayName: "Anchor",
                mixins: [o(7)(i())],
                statics: {
                    useSantaTypes: !0,
                    getComponentSkins: i,
                    compType: "wysiwyg.common.components.anchor.viewer.Anchor"
                },
                getSkinProperties: function() {
                    return {
                        "": {
                            tabIndex: -1,
                            role: "region",
                            "aria-label": this.props.compData.name,
                            children: " "
                        }
                    }
                }
            });
        t.exports = n
    }, function(t, e, o) {
        "use strict";
        var r = {
            AutoWidthAnchorSkin: {
                react: [],
                css: {
                    "%": "pointer-events:none !important;"
                }
            },
            "wysiwyg.common.components.anchor.viewer.skins.AnchorSkin": {
                react: [],
                css: {
                    "%": "visibility:hidden;pointer-events:none;width:0 !important;"
                }
            }
        };
        t.exports = r
    }, function(t, e, o) {
        "use strict";
        var r = o(0),
            i = o(88),
            n = o(5),
            a = o(1),
            s = o(7),
            l = ["wysiwyg.viewer.skins.line.ZigzagLineFlipSkin", "wysiwyg.viewer.skins.line.ZigzagLineSkin"],
            d = n({
                displayName: "FiveGridLine",
                mixins: [s(i)],
                propTypes: {
                    compProp: a.Component.compProp,
                    skin: a.Component.skin,
                    theme: a.Component.theme
                },
                statics: {
                    compSpecificIsDomOnlyOverride: function() {
                        return !1
                    },
                    getComponentSkins: function() {
                        return i
                    },
                    compType: "wysiwyg.viewer.components.FiveGridLine"
                },
                getSkinProperties: function() {
                    var t = r.get(this.props.theme, "style.properties.lnw", null),
                        e = null !== t ? parseFloat(t) / 2 + "px" : "center",
                        o = r.get(this.props.compProp, "fullScreenModeOn", !1),
                        i = r.includes(l, this.props.skin);
                    return {
                        "": r.assign({
                            "data-border-width": t,
                            style: {
                                transformOrigin: "center " + e
                            }
                        }, o ? {
                            "data-legacy-full-screen": !0
                        } : {}, i ? {
                            "data-force-3d": !0
                        } : {})
                    }
                }
            });
        t.exports = d
    }, function(t, e, o) {
        "use strict";
        var r = {
            "wysiwyg.viewer.skins.FiveGridLineSkin": {
                react: [
                    ["div", "line", [], {}]
                ],
                params: {
                    clr: "COLOR_ALPHA"
                },
                paramsDefaults: {
                    clr: "color_3"
                },
                css: {
                    "%": "border-bottom:2px solid [clr];min-height:5px;"
                }
            },
            "wysiwyg.viewer.skins.line.ArrowLine": {
                react: [
                    ["div", "line", [], {},
                        ["div", null, ["_arr"], {}]
                    ]
                ],
                params: {
                    brd: "BORDER_COLOR_ALPHA"
                },
                paramsDefaults: {
                    brd: "color_15"
                },
                css: {
                    "%": "box-sizing:border-box;border-top:1px solid [brd];position:absolute;top:0;height:0;",
                    "%_arr": "position:absolute;left:-5px;bottom:0;border-top:5px solid transparent;border-bottom:5px solid transparent;border-right:10px solid [brd];"
                }
            },
            "wysiwyg.viewer.skins.line.ArrowRightLine": {
                react: [
                    ["div", "line", [], {},
                        ["div", null, ["_arr"], {}]
                    ]
                ],
                params: {
                    brd: "BORDER_COLOR_ALPHA"
                },
                paramsDefaults: {
                    brd: "color_15"
                },
                css: {
                    "%": "box-sizing:border-box;border-top:1px solid [brd];position:absolute;top:0;height:0;",
                    "%_arr": "position:absolute;right:-5px;bottom:0;border-top:5px solid transparent;border-bottom:5px solid transparent;border-left:10px solid [brd];"
                }
            },
            "wysiwyg.viewer.skins.line.DashedLine": {
                react: [],
                exports: {
                    _maxHeight: 2
                },
                params: {
                    lnw: "BORDER_TOP_SIZE",
                    brd: "COLOR_ALPHA"
                },
                paramsDefaults: {
                    lnw: "2px",
                    brd: "color_15"
                },
                css: {
                    "%": "box-sizing:border-box;border-top:[lnw] dashed [brd];height:0;max-height:5;"
                }
            },
            "wysiwyg.viewer.skins.line.DottedLine": {
                react: [],
                params: {
                    lnw: "BORDER_TOP_SIZE",
                    brd: "COLOR_ALPHA"
                },
                paramsDefaults: {
                    lnw: "2px",
                    brd: "color_15"
                },
                css: {
                    "%": "box-sizing:border-box;border-top:[lnw] dotted [brd];height:0;"
                }
            },
            "wysiwyg.viewer.skins.line.DoubleLine": {
                react: [
                    ["div", "line", [], {}]
                ],
                params: {
                    lnw1: "BORDER_TOP_SIZE",
                    brd: "BORDER_COLOR_ALPHA",
                    lnw2: "BORDER_BOTTOM_SIZE",
                    dst: "PADDING_SIZE"
                },
                paramsDefaults: {
                    lnw1: "3px",
                    brd: "color_15",
                    lnw2: "1px",
                    dst: "5px"
                },
                css: {
                    "%line": "border-top:[lnw1] solid [brd];border-bottom:[lnw2] solid [brd];padding:[dst] 0 0 0;"
                }
            },
            "wysiwyg.viewer.skins.line.DoubleLine2": {
                react: [
                    ["div", "line", [], {},
                        ["div", null, ["_top"], {}],
                        ["div", null, ["_bottom"], {}]
                    ],
                    ["div", null, ["_xxx"], {}]
                ],
                exports: {
                    minH: 30
                },
                params: {
                    tdr: "URL"
                },
                paramsDefaults: {
                    tdr: "BASE_THEME_DIRECTORY"
                },
                css: {
                    "%_top": "border-bottom:1px solid #f00;margin:0 0 4px 0;height:0 !important;min-height:0 !important;",
                    "%_bottom": "border-bottom:5px solid #f00;",
                    "%_xxx": "position:absolute;top:0;right:0;bottom:0;left:0;background:url([tdr]net.png) center center repeat;"
                }
            },
            "wysiwyg.viewer.skins.line.DoubleLine3": {
                react: [
                    ["div", "line", [], {},
                        ["div", null, ["_top"], {}],
                        ["div", null, ["_bottom"], {}]
                    ],
                    ["div", null, ["_xxx"], {}]
                ],
                exports: {
                    minH: 30
                },
                params: {
                    tdr: "URL"
                },
                paramsDefaults: {
                    tdr: "BASE_THEME_DIRECTORY"
                },
                css: {
                    "%_top": "border-bottom:1px solid #f00;margin:0 0 3px 0;",
                    "%_bottom": "border-bottom:1px solid #f00;",
                    "%_xxx": "position:absolute;top:0;right:0;bottom:0;left:0;background:url([tdr]net.png) center center repeat;"
                }
            },
            "wysiwyg.viewer.skins.line.FadeLine": {
                react: [
                    ["div", "cont", [], {},
                        ["div", "line", [], {},
                            ["div", null, ["_left", "_ln"], {}],
                            ["div", null, ["_center", "_ln"], {}],
                            ["div", null, ["_right", "_ln"], {}]
                        ]
                    ]
                ],
                params: {
                    tdr: "URL"
                },
                paramsDefaults: {
                    tdr: "BASE_THEME_DIRECTORY"
                },
                css: {
                    "%": "height:29px !important;min-height:29px !important;max-height:29px !important;",
                    "%cont": "width:100%;overflow:hidden;position:relative;",
                    "%line": "height:29px;min-height:29px;min-width:90px !important;",
                    "%_ln": "height:29px;min-height:29px;background-image:url([tdr]fade_line.png);position:absolute;top:0;",
                    "%_left": "background-position:0 0;width:45px;left:0;",
                    "%_right": "background-position:100% 0;width:45px;right:0;",
                    "%_center": "background-position:0 -29px;right:45px;left:45px;"
                }
            },
            "wysiwyg.viewer.skins.line.FadeNotchBottomLine": {
                react: [
                    ["div", "cont", [], {},
                        ["div", "line", [], {}]
                    ]
                ],
                params: {
                    tdr: "URL"
                },
                paramsDefaults: {
                    tdr: "BASE_THEME_DIRECTORY"
                },
                css: {
                    "%cont": "width:100%;overflow:hidden;position:relative;",
                    "%cont:after": 'background-image:url([tdr]fadenotchlinenew.png);background-position:0 -60px;width:30px;height:30px;left:0;position:absolute;top:0;content:"";',
                    "%cont:before": 'background-image:url([tdr]fadenotchlinenew.png);background-position:100% -60px;width:30px;height:30px;right:0;position:absolute;top:0;content:"";',
                    "%line": "background-image:url([tdr]fadenotchlinenew.png);background-position:0 100%;margin:0 30px;height:30px;"
                }
            },
            "wysiwyg.viewer.skins.line.FadeNotchTopLine": {
                react: [
                    ["div", "cont", [], {},
                        ["div", "line", [], {}]
                    ]
                ],
                params: {
                    tdr: "URL"
                },
                paramsDefaults: {
                    tdr: "BASE_THEME_DIRECTORY"
                },
                css: {
                    "%cont": "width:100%;overflow:hidden;position:relative;",
                    "%cont:after": 'background-image:url([tdr]fadenotchlinenew.png);background-position:0 -30px;width:30px;height:30px;left:0;position:absolute;top:0;content:"";',
                    "%cont:before": 'background-image:url([tdr]fadenotchlinenew.png);background-position:100% -30px;width:30px;height:30px;right:0;position:absolute;top:0;content:"";',
                    "%line": "background-image:url([tdr]fadenotchlinenew.png);background-position:0 0;background-repeat:repeat-x;margin:0 30px;height:30px;"
                }
            },
            "wysiwyg.viewer.skins.line.FiveGridLine": {
                react: [
                    ["div", "lineCnt", [], {},
                        ["div", "line", [], {}]
                    ],
                    ["div", "leftKnobCnt", [], {},
                        ["div", "leftKnob", [], {}]
                    ],
                    ["div", "middleKnobCnt", [], {},
                        ["div", "middleKnob", [], {}]
                    ],
                    ["div", "rightKnobCnt", [], {},
                        ["div", "rightKnob", [], {}]
                    ]
                ],
                params: {
                    webThemeDir: "URL"
                },
                paramsDefaults: {
                    webThemeDir: "WEB_THEME_DIRECTORY"
                },
                css: {
                    "%": "position:relative;",
                    "%lineCnt": "position:absolute;right:4px;top:50%;height:70%;margin-top:-4px;left:4px;cursor:n-resize;",
                    "%line": "background-image:url([webThemeDir]line.png);background-repeat:repeat-x;width:100%;height:100%;",
                    "%leftKnob": "background-image:url([webThemeDir]square.png);background-repeat:no-repeat;width:100%;height:100%;background-size:100% 100%;",
                    "%middleKnob": "background-image:url([webThemeDir]square.png);background-repeat:no-repeat;width:100%;height:100%;background-size:100% 100%;",
                    "%rightKnob": "background-image:url([webThemeDir]square.png);background-repeat:no-repeat;width:100%;height:100%;background-size:100% 100%;",
                    "%middleKnobCnt": "position:absolute;top:50%;left:50%;margin-top:-4px;margin-left:-4px;width:9px;height:70%;",
                    "%leftKnobCnt": "position:absolute;top:50%;left:4px;margin-top:-4px;width:9px;height:70%;",
                    "%rightKnobCnt": "position:absolute;top:50%;margin-top:-4px;right:2px;width:9px;height:70%;"
                }
            },
            "wysiwyg.viewer.skins.line.IronLine": {
                react: [
                    ["div", "line", [], {}]
                ],
                params: {
                    lnw: "HEIGHT_SIZE",
                    clr: "BG_COLOR_ALPHA"
                },
                paramsDefaults: {
                    lnw: "6px",
                    clr: "color_15"
                },
                css: {
                    "%line": "min-height:2px;height:[lnw];border-radius:7px;background-color:[clr];box-shadow:0 1px 0 rgba(255, 255, 255, 0.1), inset 0 1px 0 rgba(0, 0, 0, 0.25);"
                }
            },
            "wysiwyg.viewer.skins.line.NotchDashedLine": {
                react: [
                    ["div", "line", [], {}]
                ],
                css: {
                    "%line": "border-bottom:1px dashed rgba(255, 255, 255, 0.5);border-top:1px dashed rgba(0, 0, 0, 0.35);height:0 !important;"
                }
            },
            "wysiwyg.viewer.skins.line.NotchLine": {
                react: [
                    ["div", "line", [], {}]
                ],
                css: {
                    "%line": "border-bottom:1px solid rgba(255, 255, 255, 0.35);border-top:1px solid rgba(0, 0, 0, 0.35);height:0 !important;"
                }
            },
            "wysiwyg.viewer.skins.line.ShadowBottomLine": {
                react: [
                    ["div", "cont", [], {},
                        ["div", "line", [], {}]
                    ]
                ],
                params: {
                    tdr: "URL"
                },
                paramsDefaults: {
                    tdr: "BASE_THEME_DIRECTORY"
                },
                css: {
                    "%cont": "width:100%;overflow:hidden;position:relative;",
                    "%cont:after": 'background-image:url([tdr]fade_line.png);background-position:0 -87px;height:29px;left:0;position:absolute;top:0;width:100px;content:"";',
                    "%cont:before": 'background-image:url([tdr]fade_line.png);background-position:100% -87px;height:29px;right:0;position:absolute;top:0;width:100px;content:"";',
                    "%line": "background-image:url([tdr]fade_line.png);background-position:0 58px;margin:0 100px;height:29px;"
                }
            },
            "wysiwyg.viewer.skins.line.ShadowTopLine": {
                react: [
                    ["div", "cont", [], {},
                        ["div", "line", [], {}]
                    ]
                ],
                params: {
                    tdr: "URL"
                },
                paramsDefaults: {
                    tdr: "BASE_THEME_DIRECTORY"
                },
                css: {
                    "%cont": "width:100%;overflow:hidden;position:relative;",
                    "%cont:after": 'background-image:url([tdr]fade_line.png);background-position:0 0;height:29px;left:0;position:absolute;top:0;width:100px;content:"";',
                    "%cont:before": 'background-image:url([tdr]fade_line.png);background-position:100% 0;height:29px;right:0;position:absolute;top:0;width:100px;content:"";',
                    "%line": "background-image:url([tdr]fade_line.png);background-position:0 -29px;margin:0 100px;height:29px;"
                }
            },
            "wysiwyg.viewer.skins.line.SloppyLine": {
                react: [
                    ["div", "line", [], {}]
                ],
                params: {
                    tdr: "URL"
                },
                paramsDefaults: {
                    tdr: "BASE_THEME_DIRECTORY"
                },
                css: {
                    "%line": "background-image:url([tdr]header-line.png);background-repeat:repeat-x;height:3px;min-height:3px;"
                }
            },
            "wysiwyg.viewer.skins.line.SolidLine": {
                react: [],
                params: {
                    lnw: "BORDER_TOP_SIZE",
                    brd: "COLOR_ALPHA"
                },
                paramsDefaults: {
                    lnw: "2px",
                    brd: "color_15"
                },
                css: {
                    "%": "box-sizing:border-box;border-top:[lnw] solid [brd];height:0;"
                }
            },
            "wysiwyg.viewer.skins.line.ZigzagLineFlipSkin": {
                react: [
                    ["div", "line", ["_zigzag"], {}],
                    ["div", null, ["_filler"], {}]
                ],
                params: {
                    zigzagsize: "BG_SIZE",
                    brd: "BG_COLOR_ALPHA"
                },
                paramsDefaults: {
                    zigzagsize: "10px",
                    brd: "color_15"
                },
                css: {
                    "%": "height:[zigzagsize];",
                    "%_zigzag": "width:100%;position:relative;top:-50%;height:[zigzagsize];background-image:linear-gradient(135deg, transparent [zigzagsize], [brd] [zigzagsize]), linear-gradient(-135deg, transparent [zigzagsize], [brd] [zigzagsize]);background-size:[zigzagsize] [zigzagsize];background-repeat:repeat-x;background-position:50% 50%;",
                    "%_filler": "width:100%;position:relative;bottom:50%;height:50%;background-color:[brd];"
                }
            },
            "wysiwyg.viewer.skins.line.ZigzagLineSkin": {
                react: [
                    ["div", null, ["_filler"], {}],
                    ["div", "line", ["_zigzag"], {}]
                ],
                params: {
                    zigzagsize: "BG_SIZE",
                    brd: "BG_COLOR_ALPHA"
                },
                paramsDefaults: {
                    zigzagsize: "10px",
                    brd: "color_15"
                },
                css: {
                    "%": "height:[zigzagsize];",
                    "%_zigzag": "width:100%;height:[zigzagsize];background-image:linear-gradient(45deg, transparent [zigzagsize], [brd] [zigzagsize]), linear-gradient(-45deg, transparent [zigzagsize], [brd] [zigzagsize]);background-size:[zigzagsize] [zigzagsize];background-repeat:repeat-x;background-position:50% 50%;",
                    "%_filler": "width:100%;height:50%;background-color:[brd];"
                }
            }
        };
        t.exports = r
    }, function(t, e, o) {
        "use strict";
        var r = o(1),
            i = o(90),
            n = o(7),
            a = function() {
                return i
            },
            s = o(5)({
                displayName: "VerticalLine",
                propTypes: {
                    isResponsive: r.RendererModel.isResponsive
                },
                mixins: [n(a())],
                statics: {
                    useSantaTypes: !0,
                    getComponentSkins: a,
                    compType: "wysiwyg.viewer.components.VerticalLine"
                },
                getSkinProperties: function() {
                    return {
                        "": {
                            "data-is-responsive": this.props.isResponsive
                        }
                    }
                }
            });
        t.exports = s
    }, function(t, e, o) {
        "use strict";
        var r = {
            "wysiwyg.viewer.skins.VerticalLineSkin": {
                react: [
                    ["div", "lineCnt", [], {},
                        ["div", "line", [], {}]
                    ],
                    ["div", "topKnobCnt", [], {},
                        ["div", "topKnob", [], {}]
                    ],
                    ["div", "middleKnobCnt", [], {},
                        ["div", "middleKnob", [], {}]
                    ],
                    ["div", "bottomKnobCnt", [], {},
                        ["div", "bottomKnob", [], {}]
                    ]
                ],
                params: {
                    webThemeDir: "URL"
                },
                paramsDefaults: {
                    webThemeDir: "WEB_THEME_DIRECTORY"
                },
                css: {
                    "%lineCnt": "position:absolute;bottom:4px;left:50%;width:70%;margin-left:-4px;top:4px;cursor:n-resize;",
                    "%line": "background-image:url([webThemeDir]v-line.png);background-repeat:repeat-y;width:100%;height:100%;",
                    "%topKnob": "background-image:url([webThemeDir]square.png);background-repeat:no-repeat;width:100%;height:100%;background-size:100% 100%;",
                    "%middleKnob": "background-image:url([webThemeDir]square.png);background-repeat:no-repeat;width:100%;height:100%;background-size:100% 100%;",
                    "%bottomKnob": "background-image:url([webThemeDir]square.png);background-repeat:no-repeat;width:100%;height:100%;background-size:100% 100%;",
                    "%middleKnobCnt": "position:absolute;top:50%;left:50%;margin-top:-4px;margin-left:-4px;height:9px;width:70%;",
                    "%topKnobCnt": "position:absolute;left:50%;top:4px;margin-left:-4px;height:9px;width:70%;",
                    "%bottomKnobCnt": "position:absolute;left:50%;margin-left:-4px;bottom:2px;height:9px;width:70%;"
                }
            },
            "wysiwyg.viewer.skins.line.VerticalArrowLine": {
                react: [
                    ["div", "line", [], {},
                        ["div", null, ["_arr"], {}]
                    ]
                ],
                params: {
                    brd: "BORDER_COLOR_ALPHA"
                },
                paramsDefaults: {
                    brd: "color_15"
                },
                css: {
                    "%": "border-left:1px solid [brd];width:0 !important;min-width:0 !important;",
                    "%_arr": "bottom:0;left:-5px;bottom:-2px;border-right:5px solid transparent;border-left:5px solid transparent;border-top:10px solid [brd];position:absolute;"
                }
            },
            "wysiwyg.viewer.skins.line.VerticalArrowLineTop": {
                react: [
                    ["div", "line", [], {},
                        ["div", null, ["_arr"], {}]
                    ]
                ],
                params: {
                    brd: "BORDER_COLOR_ALPHA"
                },
                paramsDefaults: {
                    brd: "color_15"
                },
                css: {
                    "%": "border-left:1px solid [brd];width:0 !important;min-width:0 !important;",
                    "%_arr": "left:-5px;top:-2px;border-right:5px solid transparent;border-left:5px solid transparent;border-bottom:10px solid [brd];position:absolute;"
                }
            },
            "wysiwyg.viewer.skins.line.VerticalDashedLine": {
                react: [
                    ["div", "line", [], {}]
                ],
                params: {
                    lnw: "BORDER_LEFT_SIZE",
                    brd: "COLOR_ALPHA",
                    mrg: "SIZE"
                },
                paramsDefaults: {
                    lnw: "3px",
                    brd: "color_15",
                    mrg: ["lnw"]
                },
                paramsMutators: {
                    mrg: {
                        type: "multiply",
                        value: -.5,
                        param: "lnw"
                    }
                },
                css: {
                    "%[data-is-responsive=false]": "width:0 !important;min-width:0 !important;",
                    "%[data-is-responsive=false] %line": "margin-left:[mrg];width:100%;",
                    "%line": "border-left:[lnw] dashed [brd];height:100%;"
                }
            },
            "wysiwyg.viewer.skins.line.VerticalDottedLine": {
                react: [
                    ["div", "line", [], {}]
                ],
                params: {
                    lnw: "BORDER_LEFT_SIZE",
                    brd: "COLOR_ALPHA",
                    mrg: "SIZE"
                },
                paramsDefaults: {
                    lnw: "3px",
                    brd: "color_15",
                    mrg: ["lnw"]
                },
                paramsMutators: {
                    mrg: {
                        type: "multiply",
                        value: -.5,
                        param: "lnw"
                    }
                },
                css: {
                    "%[data-is-responsive=false]": "width:0 !important;min-width:0 !important;",
                    "%[data-is-responsive=false] %line": "margin-left:[mrg];width:100%;",
                    "%line": "border-left:[lnw] dotted [brd];height:100%;"
                }
            },
            "wysiwyg.viewer.skins.line.VerticalDoubleLine": {
                react: [
                    ["div", "line", [], {}]
                ],
                params: {
                    dst: "WIDTH_SIZE",
                    lnw1: "BORDER_LEFT_SIZE",
                    brd: "BORDER_COLOR_ALPHA",
                    mrg1: "BORDER_LEFT_SIZE",
                    lnw2: "BORDER_RIGHT_SIZE"
                },
                paramsDefaults: {
                    dst: "5px",
                    lnw1: "3px",
                    brd: "color_15",
                    mrg1: ["lnw1"],
                    lnw2: "1px"
                },
                css: {
                    "%": "width:[dst] !important;min-width:[dst] !important;",
                    "%line": "border-left:[lnw1] solid [brd];margin-left:calc((-1 * [mrg1]) - 2px);border-right:[lnw2] solid [brd];width:100%;height:100%;"
                }
            },
            "wysiwyg.viewer.skins.line.VerticalFadeNotchLeftLine": {
                react: [
                    ["div", "line", [], {}]
                ],
                params: {
                    tdr: "URL"
                },
                paramsDefaults: {
                    tdr: "BASE_THEME_DIRECTORY"
                },
                css: {
                    "%:before": 'background-image:url([tdr]fadenotchlineverticalnew.png);background-position:-60px 0;position:absolute;content:"";right:0;top:0;width:30px;height:30px;',
                    "%:after": 'background-image:url([tdr]fadenotchlineverticalnew.png);background-position:60px 100%;position:absolute;content:"";right:0;bottom:0;width:30px;height:30px;',
                    "%line": 'background-image:url([tdr]fadenotchlineverticalnew.png);background-position:-90px 0;background-repeat:repeat-y;width:30px;right:0;top:30px;bottom:30px;position:absolute;content:"";'
                }
            },
            "wysiwyg.viewer.skins.line.VerticalFadeNotchRightLine": {
                react: [
                    ["div", "line", [], {}]
                ],
                params: {
                    tdr: "URL"
                },
                paramsDefaults: {
                    tdr: "BASE_THEME_DIRECTORY"
                },
                css: {
                    "%:before": 'background-image:url([tdr]fadenotchlineverticalnew.png);background-position:-30px 0;position:absolute;content:"";top:0;width:30px;height:30px;',
                    "%:after": 'background-image:url([tdr]fadenotchlineverticalnew.png);background-position:-30px 100%;position:absolute;content:"";bottom:0;width:30px;height:30px;',
                    "%line": 'background-image:url([tdr]fadenotchlineverticalnew.png);background-position:0 0;background-repeat:repeat-y;width:30px;position:absolute;content:"";top:30px;bottom:30px;'
                }
            },
            "wysiwyg.viewer.skins.line.VerticalIronLine": {
                react: [
                    ["div", "line", [], {}]
                ],
                params: {
                    lnw: "WIDTH_SIZE",
                    clr: "BG_COLOR_ALPHA"
                },
                paramsDefaults: {
                    lnw: "6px",
                    clr: "color_15"
                },
                css: {
                    "%line": "box-shadow:inset 1px 1px 1px 1px rgba(0, 0, 0, 0.25), 1px 1px 0 0 rgba(255, 255, 255, 0.1);min-width:2px;width:[lnw];border-radius:7px;background-color:[clr];position:absolute;top:0;bottom:0;"
                }
            },
            "wysiwyg.viewer.skins.line.VerticalNotchDashedLine": {
                react: [
                    ["div", "line", [], {}]
                ],
                params: {
                    lnw: "BORDER_SIZE"
                },
                paramsDefaults: {
                    lnw: "1px"
                },
                css: {
                    "%": "border-right:[lnw] dashed rgba(255, 255, 255, 0.5);border-left:[lnw] dashed rgba(0, 0, 0, 0.35);width:0 !important;min-width:0 !important;"
                }
            },
            "wysiwyg.viewer.skins.line.VerticalNotchLine": {
                react: [
                    ["div", "line", [], {}]
                ],
                params: {
                    lnw: "BORDER_SIZE"
                },
                paramsDefaults: {
                    lnw: "1px"
                },
                css: {
                    "%": "border-right:[lnw] solid rgba(255, 255, 255, 0.35);border-left:[lnw] solid rgba(0, 0, 0, 0.35);width:0 !important;min-width:0 !important;"
                }
            },
            "wysiwyg.viewer.skins.line.VerticalShadowLeftLine": {
                react: [
                    ["div", "line", [], {}]
                ],
                params: {
                    tdr: "URL"
                },
                paramsDefaults: {
                    tdr: "BASE_THEME_DIRECTORY"
                },
                css: {
                    "%:before": 'background-image:url([tdr]fadelinevertical.png);background-position:0 0;position:absolute;left:-14px;width:29px;content:"";top:0;height:100px;',
                    "%:after": 'background-image:url([tdr]fadelinevertical.png);background-position:0 100%;position:absolute;left:-14px;width:29px;content:"";bottom:0;height:100px;',
                    "%line": 'background-image:url([tdr]fadelinevertical.png);background-position:87px 0;position:absolute;left:-14px;width:29px;content:"";top:100px;bottom:100px;'
                }
            },
            "wysiwyg.viewer.skins.line.VerticalShadowRightLine": {
                react: [
                    ["div", "line", [], {}]
                ],
                params: {
                    tdr: "URL"
                },
                paramsDefaults: {
                    tdr: "BASE_THEME_DIRECTORY"
                },
                css: {
                    "%:before": 'background-image:url([tdr]fadelinevertical.png);background-position:145px 0;position:absolute;left:-14px;width:29px;content:"";top:0;height:100px;',
                    "%:after": 'background-image:url([tdr]fadelinevertical.png);background-position:145px 100%;position:absolute;left:-14px;width:29px;content:"";bottom:0;height:100px;',
                    "%line": 'background-image:url([tdr]fadelinevertical.png);background-position:174px 0;position:absolute;left:-14px;width:29px;content:"";top:100px;bottom:100px;'
                }
            },
            "wysiwyg.viewer.skins.line.VerticalSloopyLine": {
                react: [
                    ["div", "line", [], {}]
                ],
                params: {
                    tdr: "URL"
                },
                paramsDefaults: {
                    tdr: "BASE_THEME_DIRECTORY"
                },
                css: {
                    "%": "background:url([tdr]linesloopyvertical.png) repeat-y 50% 0;width:3px;min-width:3px;"
                }
            },
            "wysiwyg.viewer.skins.line.VerticalSolidLine": {
                react: [
                    ["div", "line", [], {}]
                ],
                params: {
                    lnw: "BORDER_LEFT_SIZE",
                    brd: "COLOR_ALPHA",
                    mrg: "SIZE"
                },
                paramsDefaults: {
                    lnw: "3px",
                    brd: "color_15",
                    mrg: ["lnw"]
                },
                paramsMutators: {
                    mrg: {
                        type: "multiply",
                        value: -.5,
                        param: "lnw"
                    }
                },
                css: {
                    "%[data-is-responsive=false]": "width:0 !important;min-width:0 !important;",
                    "%[data-is-responsive=false] %line": "margin-left:[mrg];width:100%;",
                    "%line": "border-left:[lnw] solid [brd];height:100%;"
                }
            }
        };
        t.exports = r
    }, function(t, e, o) {
        "use strict";
        var r = o(0),
            i = o(5),
            n = o(3),
            a = o(1),
            s = o(7),
            l = o(10),
            d = o(26),
            p = r.pick(d, ["wysiwyg.viewer.skins.screenwidthcontainer.DefaultScreen", "wysiwyg.viewer.skins.screenwidthcontainer.BevelScreen", "wysiwyg.viewer.skins.screenwidthcontainer.IronScreen", "wysiwyg.viewer.skins.screenwidthcontainer.DoubleBorderScreen", "wysiwyg.viewer.skins.screenwidthcontainer.GridScreen", "wysiwyg.viewer.skins.screenwidthcontainer.TransparentHalfScreen", "wysiwyg.viewer.skins.screenwidthcontainer.TwoColorScreen", "wysiwyg.viewer.skins.screenwidthcontainer.LineBottomScreen", "wysiwyg.viewer.skins.screenwidthcontainer.ShadowScreen"]),
            c = i({
                displayName: "WixScreenWidthContainer",
                mixins: [s(p), l],
                propTypes: {
                    children: n.node,
                    defaultBackgroundStyle: a.Container.defaultBackgroundStyle.isRequired,
                    defaultContentArea: a.Container.defaultContentArea.isRequired,
                    isMobileView: a.isMobileView.isRequired,
                    isMobileDevice: a.Device.isMobileDevice.isRequired,
                    siteWidth: a.siteWidth.isRequired
                },
                statics: {
                    useSantaTypes: !0,
                    getComponentSkins: function() {
                        return p
                    },
                    compType: "wysiwyg.viewer.components.ScreenWidthContainer"
                },
                isScreenWidth: function() {
                    return !0
                },
                getInitialState: function() {
                    return {
                        $displayDevice: this.props.isMobileView ? "mobileView" : ""
                    }
                },
                getSkinProperties: function() {
                    return {
                        "": {
                            "data-is-mobile": this.props.isMobileView || this.props.isMobileDevice,
                            "data-site-width": this.props.siteWidth,
                            style: {
                                left: 0
                            }
                        },
                        bg: {
                            style: this.props.defaultBackgroundStyle
                        },
                        inlineContent: {
                            children: this.getChildrenRenderer({
                                contentArea: this.props.defaultContentArea
                            })
                        }
                    }
                }
            });
        t.exports = c
    }, function(t, e, o) {
        "use strict";
        var r = o(0),
            i = o(5),
            n = o(3),
            a = o(1),
            s = o(7),
            l = o(26),
            d = r.pick(l, ["wysiwyg.viewer.skins.screenwidthcontainer.TransparentScreen", "wysiwyg.viewer.skins.screenwidthcontainer.DefaultScreen", "wysiwyg.viewer.skins.screenwidthcontainer.BevelScreen", "wysiwyg.viewer.skins.screenwidthcontainer.BoxScreen", "wysiwyg.viewer.skins.screenwidthcontainer.LiftedShadowScreen", "wysiwyg.viewer.skins.screenwidthcontainer.AppleScreen", "wysiwyg.viewer.skins.screenwidthcontainer.BlankScreen", "wysiwyg.viewer.skins.screenwidthcontainer.GridScreen", "wysiwyg.viewer.skins.screenwidthcontainer.TransparentHalfScreen", "wysiwyg.viewer.skins.screenwidthcontainer.TwoColorScreen", "wysiwyg.viewer.skins.screenwidthcontainer.LineBottomScreen", "wysiwyg.viewer.skins.screenwidthcontainer.ShadowScreen"]),
            p = i({
                displayName: "PagesContainer",
                mixins: [s(d)],
                propTypes: {
                    children: n.node,
                    isMobileView: a.isMobileView.isRequired,
                    siteWidth: a.siteWidth.isRequired,
                    isMobileDevice: a.Device.isMobileDevice.isRequired,
                    isResponsive: a.RendererModel.isResponsive.isRequired,
                    isMeshLayoutMechanism: a.Layout.isMeshLayoutMechanism.isRequired
                },
                statics: {
                    useSantaTypes: !0,
                    getComponentSkins: function() {
                        return d
                    },
                    compSpecificIsDomOnlyOverride: function() {
                        return !1
                    },
                    compType: "wysiwyg.viewer.components.PagesContainer"
                },
                isScreenWidth: function() {
                    return !0
                },
                ignoreDimensions: function() {
                    return this.props.isMeshLayoutMechanism
                },
                getInitialState: function() {
                    return {
                        $displayDevice: this.props.isMobileView ? "mobileView" : ""
                    }
                },
                getSkinProperties: function() {
                    var t = !(!this.props.isMobileView && !this.props.isMobileDevice),
                        e = this.props,
                        o = e.isMeshLayoutMechanism,
                        i = e.isResponsive,
                        n = r.assign({
                            "": {
                                tagName: "main",
                                tabIndex: "-1",
                                "data-is-mobile": t,
                                "data-is-mesh": o,
                                "data-site-width": this.props.siteWidth
                            },
                            screenWidthBackground: {
                                style: {
                                    left: 0
                                }
                            },
                            inlineContent: {
                                children: this.props.children
                            }
                        }, {
                            bg: {
                                style: {
                                    display: "none"
                                }
                            }
                        });
                    return (o || i) && (n.centeredContent = {
                        style: {
                            position: "relative"
                        }
                    }, n.inlineContent.style = {
                        position: "relative"
                    }), n
                }
            });
        t.exports = p
    }, function(t, e, o) {
        "use strict";
        var r = o(0),
            i = o(4),
            n = o(5),
            a = o(6),
            s = o(3),
            l = o(1),
            d = o(7),
            p = o(27),
            c = o(94),
            u = {
                outIn: "OutIn",
                crossfade: "CrossFade",
                shrinkfade: "CrossFade",
                swipeHorizontal: "SlideHorizontal",
                swipeHorizontalFullScreen: "SlideHorizontal",
                swipeVertical: "SlideVertical",
                swipeVerticalFullScreen: "SlideVertical",
                none: "NoTransition"
            };
        var b = r.pick(c, ["wysiwyg.viewer.skins.PageGroupSkin"]),
            g = n({
                displayName: "PageGroup",
                mixins: [d(b), p],
                propTypes: {
                    pageClass: s.any,
                    createPageProps: l.PageGroup.createPageProps.isRequired,
                    getRenderedMasterPageHeight: l.__DangerousSantaTypes.getRenderedMasterPageHeight.isRequired,
                    getWindowSize: l.__DangerousSantaTypes.getWindowSize.isRequired,
                    actionsAspect: l.SiteAspects.actionsAspect.isRequired,
                    siteWidth: l.siteWidth.isRequired,
                    stubifyPage: l.PageGroup.stubifyPage.isRequired,
                    currentUrlPageId: l.currentUrlPageId.isRequired,
                    rootNavigationInfo: l.Component.rootNavigationInfo.isRequired,
                    compProp: l.Component.compProp.isRequired,
                    pagesToRender: l.PageGroup.pagesToRender.isRequired,
                    isMeshLayoutMechanism: l.Layout.isMeshLayoutMechanism.isRequired,
                    isExperimentOpen: l.isExperimentOpen
                },
                statics: {
                    useSantaTypes: !0,
                    getComponentSkins: function() {
                        return b
                    },
                    compSpecificIsDomOnlyOverride: function() {
                        return !1
                    },
                    compType: "wysiwyg.viewer.components.PageGroup"
                },
                ignoreDimensions: function() {
                    return this.props.isMeshLayoutMechanism
                },
                componentWillReceiveProps: function(t) {
                    var e = this,
                        o = this.props.currentUrlPageId,
                        r = t.currentUrlPageId,
                        i = u[t.rootNavigationInfo.transition || this.props.compProp.transition] || u.none;
                    if (o !== r) {
                        this.refs[o].clearAnimationsQueue(!0);
                        var n = this.getAnimationProperties(i).defaultDuration || 0,
                            a = function(t, e, o, r) {
                                return function() {
                                    var i = e();
                                    switch (t) {
                                        case "SlideHorizontal":
                                            return {
                                                siteWidth: o,
                                                width: i.width,
                                                ease: "Cubic.easeOut"
                                            };
                                        case "SlideVertical":
                                            var n = Math.max(i.height, r());
                                            return {
                                                screenHeight: i.height,
                                                height: n,
                                                reverse: !0,
                                                ease: "Cubic.easeInOut"
                                            };
                                        case "OutIn":
                                            return {
                                                sourceEase: "Strong.easeOut",
                                                destEase: "Strong.easeIn"
                                            };
                                        case "CrossFade":
                                            return {
                                                sourceEase: "Sine.easeInOut",
                                                destEase: "Quad.easeInOut"
                                            };
                                        default:
                                            return {}
                                    }
                                }
                            }(i, this.props.getWindowSize, this.props.siteWidth, this.props.getRenderedMasterPageHeight),
                            s = {
                                onComplete: function() {
                                    ! function(t, e, o, r) {
                                        t.refs[e] ? t.props.currentUrlPageId !== e && (r(e), t.refs[e].forceUpdate((function() {
                                            t.refs[o].updateVisibility(), t.refs[e].hide()
                                        }))) : t.refs[o].updateVisibility()
                                    }(e, o, r, e.props.stubifyPage), e.props.actionsAspect.handlePageTransitionComplete(o, r)
                                }
                            };
                        this.props.actionsAspect.registerNextPageTransition(this, o, r, i, n, 0, a, s)
                    }
                },
                createPage: function(t) {
                    var e = 1 === this.props.pagesToRender.length,
                        o = this.props.createPageProps(this.props.pageClass, t, e);
                    return a(this.props.pageClass, o)
                },
                getSkinProperties: function() {
                    return {
                        "": {
                            "data-is-mesh": this.props.isMeshLayoutMechanism,
                            children: r.map(this.props.pagesToRender, this.createPage),
                            style: {
                                width: "100%"
                            }
                        }
                    }
                }
            }),
            h = function(t) {
                return i.createElement("div", {
                    id: t.id,
                    style: {
                        width: "100%"
                    }
                }, t.children)
            };
        h.compType = "wysiwyg.viewer.components.PageGroup", h.displayName = "BoltPageGroup", t.exports = {
            PageGroup: g,
            BoltPageGroup: h
        }
    }, function(t, e, o) {
        "use strict";
        var r = {
            "wysiwyg.viewer.skins.PageGroupSkin": {
                react: []
            }
        };
        t.exports = r
    }, function(t, e, o) {
        "use strict";
        var r = o(0),
            i = o(3),
            n = o(5),
            a = o(2),
            s = o(8),
            l = o(6),
            d = o(1),
            p = o(7),
            c = o(96);

        function u(t, e, o) {
            if ("100%" === o) return "100%";
            var r = g(),
                i = t ? r[t].hMinSize : 0;
            return "YOUTUBE" === t && "always_show" === e && (i += 20), Math.max(o, i)
        }

        function b(t, e) {
            if ("100%" === e) return "100%";
            var o = g(),
                r = t ? o[t].wMinSize : 0;
            return Math.max(e, r)
        }

        function g() {
            return {
                YOUTUBE: {
                    url: r.template("//www.youtube.com/embed/${videoId}?"),
                    getParams: h,
                    hMinSize: 200,
                    wMinSize: 200,
                    title: "External YouTube"
                },
                VIMEO: {
                    url: r.template("//player.vimeo.com/video/${videoId}?"),
                    getParams: f,
                    hMinSize: 100,
                    wMinSize: 100,
                    title: "External Vimeo"
                },
                DAILYMOTION: {
                    url: r.template("//www.dailymotion.com/embed/video/${videoId}?"),
                    getParams: w,
                    hMinSize: 100,
                    wMinSize: 100,
                    title: "External Daily Motion"
                },
                FACEBOOK: {
                    url: r.template("//www.facebook.com/plugins/video.php?href=https://www.facebook.com/${videoId}&"),
                    getParams: m,
                    hMinSize: 100,
                    wMinSize: 100,
                    title: "External Facebook"
                }
            }
        }

        function h(t, e, o) {
            var r = t.showControls,
                i = t.autoplay && !0,
                n = t.enablejsapi || 0,
                a = t.lightTheme,
                s = t.loop,
                l = t.showinfo,
                d = e.videoId || "";
            return {
                wmode: "transparent",
                autoplay: i && o ? "1" : "0",
                theme: a ? "light" : "dark",
                controls: "always_hide" !== r ? "1" : "0",
                autohide: "temp_show" === r ? "1" : "0",
                loop: s ? "1" : "0",
                showinfo: l ? "1" : "0",
                rel: "0",
                playlist: !!s && d,
                enablejsapi: n
            }
        }

        function m(t, e, o, r) {
            return {
                autoplay: t.autoplay && o,
                width: r.width,
                height: r.height
            }
        }

        function f(t, e, o) {
            return {
                autoplay: t.autoplay && o,
                loop: t.loop,
                byline: t.showinfo,
                portrait: t.showinfo,
                title: t.showinfo
            }
        }

        function w(t, e, o) {
            return {
                autoplay: t.autoplay && o,
                "ui-start-screen-info": t.showinfo ? "1" : "0",
                controls: "temp_show" === t.showControls ? "1" : "0",
                "sharing-enable": "0",
                "ui-logo": "0"
            }
        }

        function _(t, e, o, i) {
            var n = t.videoId,
                a = t.videoType;
            if (!a || !n) return "";
            var s = g()[a],
                l = s.getParams(e, t, o, i);
            return s.url({
                videoId: n
            }) + r.map(l, (function(t, e) {
                return e + "=" + t
            })).join("&")
        }

        function v(t, e, o) {
            return {
                width: b(t, o.width),
                height: u(t, e, o.height)
            }
        }
        var x = n({
            displayName: "Video",
            mixins: [p(c)],
            statics: {
                useSantaTypes: !0,
                getComponentSkins: function() {
                    return c
                },
                compType: "wysiwyg.viewer.components.Video"
            },
            propTypes: {
                addItemProp: i.bool,
                isPlayingAllowed: d.RenderFlags.isPlayingAllowed.isRequired,
                compData: d.Component.compData.isRequired,
                compProp: d.Component.compProp.isRequired,
                style: d.Component.style.isRequired
            },
            componentWillMount: function() {
                this.canPlayVideo = this.props.isPlayingAllowed
            },
            componentDidUpdate: function() {
                if (this.canPlayVideo !== this.props.isPlayingAllowed) {
                    this.canPlayVideo = this.props.isPlayingAllowed;
                    var t = s.findDOMNode(this.refs.videoFrame).querySelector("iframe"),
                        e = v(this.props.compData.videoType, this.props.compProp.showControls, this.props.style);
                    t.src = "", t.src = _(this.props.compData, this.props.compProp, this.props.isPlayingAllowed, e)
                }
            },
            getSkinProperties: function() {
                var t, e = v(this.props.compData.videoType, this.props.compProp.showControls, this.props.style),
                    o = _(this.props.compData, this.props.compProp, this.props.isPlayingAllowed, e),
                    r = (t = this.props.compData.videoType) ? g()[t].title : "",
                    i = {
                        height: "100%",
                        width: "100%",
                        allowFullScreen: !0,
                        frameBorder: "0",
                        title: r,
                        "aria-label": r
                    };
                return a.validationUtils.isValidUrl(o) && (i["data-src"] = o), this.props.addItemProp && (i.itemProp = "image"), {
                    "": {
                        style: {
                            height: e.height,
                            width: e.width
                        }
                    },
                    videoFrame: {
                        children: l("iframe", i)
                    },
                    preview: {
                        style: {
                            display: "none"
                        }
                    }
                }
            }
        });
        t.exports = x
    }, function(t, e, o) {
        "use strict";
        var r = {
            "wysiwyg.viewer.skins.VideoSkin": {
                react: [
                    ["div", "videoFrame", [], {
                        tabIndex: 0
                    }],
                    ["div", "preview", [], {}]
                ],
                css: {
                    "%videoFrame": "position:relative;width:100% !important;height:100% !important;display:block;",
                    "%_hidden": "display:none !important;"
                }
            },
            "wysiwyg.viewer.skins.video.VideoDefault": {
                react: [
                    ["div", "videoFrame", [], {
                        tabIndex: 0
                    }],
                    ["div", "preview", [], {}]
                ],
                params: {
                    brd: "BG_COLOR_ALPHA",
                    rd: "BORDER_RADIUS",
                    shd: "BOX_SHADOW",
                    brw: "SIZE"
                },
                paramsDefaults: {
                    brd: "color_15",
                    rd: "0",
                    shd: "0 1px 4px rgba(0, 0, 0, 0.6)",
                    brw: "0"
                },
                css: {
                    "%_hidden": "display:none !important;",
                    "%": "background-color:[brd];[rd]  [shd]",
                    "% iframe": "width:100% !important;height:100% !important;",
                    "%videoFrame": "overflow:hidden;position:absolute;[rd]  position:absolute;top:[brw];right:[brw];bottom:[brw];left:[brw];display:block;"
                }
            },
            "wysiwyg.viewer.skins.video.VideoLiftedShadow": {
                react: [
                    ["div", null, ["_left", "_shd"], {}],
                    ["div", null, ["_right", "_shd"], {}],
                    ["div", "videoFrame", [], {
                        tabIndex: 0
                    }],
                    ["div", "preview", [], {}]
                ],
                params: {
                    brd: "BG_COLOR_ALPHA",
                    rd: "BORDER_RADIUS",
                    shd: "BOX_SHADOW",
                    tdr: "URL",
                    brw: "SIZE"
                },
                paramsDefaults: {
                    brd: "color_15",
                    rd: "0",
                    shd: "0 1px 4px rgba(0, 0, 0, 0.6)",
                    tdr: "BASE_THEME_DIRECTORY",
                    brw: "0"
                },
                css: {
                    "%": "background-color:[brd];[rd]  [shd]",
                    "%_shd": "position:absolute;bottom:-26px;width:165px;height:26px;background-image:url([tdr]liftedshadow_medium.png);background-repeat:no-repeat;",
                    "%_left": "left:-20px;background-position:0 0;",
                    "%_right": "right:-20px;background-position:100% 0;",
                    "%videoFrame": "overflow:hidden;position:absolute;[rd]  position:absolute;top:[brw];right:[brw];bottom:[brw];left:[brw];display:block;",
                    "% iframe": "width:100% !important;height:100% !important;",
                    "%_hidden": "display:none !important;"
                }
            },
            "wysiwyg.viewer.skins.video.VideoSloppy": {
                react: [
                    ["div", null, ["_brd", "_one"], {}],
                    ["div", null, ["_brd", "_two"], {}],
                    ["div", "videoFrame", [], {
                        tabIndex: 0
                    }],
                    ["div", "preview", [], {}]
                ],
                params: {
                    tdr: "URL"
                },
                paramsDefaults: {
                    tdr: "BASE_THEME_DIRECTORY"
                },
                css: {
                    "%_brd": "background-image:url([tdr]sloppyframe.png);background-repeat:no-repeat;position:absolute;top:0;right:0;bottom:0;left:0;",
                    "%_one": "background-position:0 0;bottom:3px;right:3px;",
                    "%_two": "background-position:100% 100%;top:3px;left:3px;",
                    "%videoFrame": "position:absolute;top:9px;right:9px;bottom:9px;left:9px;display:block;",
                    "% iframe": "width:100% !important;height:100% !important;",
                    "%_hidden": "display:none !important;"
                }
            }
        };
        t.exports = r
    }, function(t, e, o) {
        "use strict";
        var r = o(0),
            i = o(98),
            n = o(55),
            a = o(7),
            s = o(1),
            l = o(6),
            d = o(2),
            p = o(5),
            c = o(9),
            u = o(3),
            b = c({
                link: u.object,
                impliedLink: u.object
            }, "SiteButton"),
            g = p({
                displayName: "SiteButton",
                mixins: [a(i), n(i)],
                propTypes: {
                    structure: s.Component.structure.isRequired,
                    compData: s.Component.compData,
                    registerLayoutFunc: s.Layout.registerLayoutFunc.isRequired,
                    isMobileDevice: s.Device.isMobileDevice,
                    isMobileView: s.isMobileView,
                    link: b.link,
                    impliedLink: b.impliedLink
                },
                statics: {
                    compSpecificIsDomOnlyOverride: function() {
                        return !1
                    },
                    getComponentSkins: function() {
                        return i
                    },
                    compType: "wysiwyg.viewer.components.SiteButton",
                    santaTypeDefinitions: b
                },
                getDefaultProps: function() {
                    return {
                        shouldUseFlex: !0
                    }
                },
                getInitialState: function() {
                    return {
                        $mobile: this.props.isMobileDevice ? "mobile" : "desktop",
                        $shouldUseFlex: this.props.shouldUseFlex ? "shouldUseFlex" : "",
                        $align: this.props.compProp.align
                    }
                },
                componentWillReceiveProps: function(t) {
                    this.state.$align !== t.compProp.align && this.setState({
                        $align: t.compProp.align
                    })
                },
                getImpliedLink: function() {
                    return this.props.impliedLink
                },
                isClickActionDefinedInWixCode: function() {
                    return r.get(this.props, "compActions.click")
                },
                getLinkSkinPart: function() {
                    var t = this.props.compProp,
                        e = {
                            parentConst: l.bind(null, "div")
                        };
                    if (t.isDisabled) return e;
                    if (this.isClickActionDefinedInWixCode()) return {
                        parentConst: l.bind(null, "button"),
                        style: {
                            cursor: "pointer"
                        }
                    };
                    if (this.props.link) {
                        var o = this.props.link,
                            i = {
                                onKeyDown: d.accessibility.keyboardInteractions.activateBySpaceButton
                            };
                        return o.parentConstType && (i.parentConst = l.bind(null, o.parentConstType), delete o.parentConstType), r.assign(o, i)
                    }
                    return this.getImpliedLink() || e
                },
                getWrapperSkinPart: function(t) {
                    var e = {
                        id: this.props.id,
                        key: "f" + this.getDesktopFontSize() * this.currentScale,
                        ref: this.props.id,
                        "data-align": this.props.compProp.align,
                        "data-disabled": t,
                        "data-margin": this.props.compProp.margin,
                        "data-should-use-flex": this.props.shouldUseFlex,
                        "data-width": r.get(this.props.structure, "layout.width", 0),
                        "data-height": r.get(this.props.structure, "layout.height", 0)
                    };
                    if (t) return e["aria-disabled"] = !0, e.tabIndex = -1, e.role = "button", e;
                    var o = {},
                        i = !!this.props.link,
                        n = this.isClickActionDefinedInWixCode(),
                        a = i && "PageLink" === r.get(this.props.compData.link, ["type"]) && r.get(this.props.compData.link, ["pageId", "isPopup"]);
                    return n || i && !a || (o.role = "button", o.tabIndex = 0), r.assign(e, o)
                },
                getSkinProperties: function() {
                    this.lastScale = this.props.scale || 1;
                    var t = !!this.props.compProp.isDisabled,
                        e = this.getWrapperSkinPart(t),
                        o = this.getLinkSkinPart();
                    this.props.shouldUseFlex || (o.style = o.style || {}, o.style.textAlign = this.props.compProp.align);
                    var r = {
                        "": e,
                        label: {
                            children: [this.props.compData.label],
                            style: this.getLabelStyle()
                        },
                        link: o
                    };
                    return this.props.onClick && !t && (r[""].onClick = this.props.onClick), this.resetMinHeightIfNeeded(r), r
                }
            });
        t.exports = g
    }, function(t, e, o) {
        "use strict";
        var r = {
            "wysiwyg.viewer.skins.button.AddProductButton": {
                react: [
                    ["a", "link", [], {},
                        ["span", "label", [], {}]
                    ]
                ],
                params: {
                    rd: "BORDER_RADIUS",
                    bg: "BG_COLOR_ALPHA",
                    trans1: "TRANSITION",
                    brd: "BORDER_COLOR",
                    brw: "BORDER_SIZE",
                    fnt: "FONT",
                    trans2: "TRANSITION",
                    txt: "TEXT_COLOR",
                    bgh: "BG_COLOR_ALPHA",
                    brdh: "BORDER_COLOR",
                    txth: "TEXT_COLOR"
                },
                paramsDefaults: {
                    rd: "0",
                    bg: "color_17",
                    trans1: "border-color 0.4s ease 0s, background-color 0.4s ease 0s",
                    brd: "color_15",
                    brw: "0",
                    fnt: "font_7",
                    trans2: "color 0.4s ease 0s",
                    txt: "color_15",
                    bgh: "color_18",
                    brdh: "color_16",
                    txth: "color_15"
                },
                css: {
                    "%link": "[rd]  position:absolute;top:0;right:0;bottom:0;left:0;background-color:[bg];[trans1]  border:solid [brd] [brw];cursor:pointer !important;",
                    "%label": "[fnt]  [trans2]  color:[txt];white-space:nowrap;margin:calc(-1 * [brw]) [brw] 0 [brw];display:inline-block;position:relative;",
                    "%:hover %link": "background-color:[bgh];border-color:[brdh];[trans1]",
                    "%:hover %label": "color:[txth];[trans2]"
                }
            },
            "wysiwyg.viewer.skins.button.ApplyButtonEcom": {
                react: [
                    ["a", "link", [], {},
                        ["span", "label", [], {}]
                    ]
                ],
                params: {
                    rd: "BORDER_RADIUS",
                    bg: "BG_COLOR_ALPHA",
                    brw: "BORDER_SIZE",
                    brd: "BORDER_COLOR_ALPHA",
                    fnt: "FONT",
                    txt: "TEXT_COLOR",
                    bgh: "BG_COLOR_ALPHA",
                    brdh: "BORDER_COLOR_ALPHA",
                    txth: "TEXT_COLOR"
                },
                paramsDefaults: {
                    rd: "0",
                    bg: "color_17",
                    brw: "0",
                    brd: "color_15",
                    fnt: "font_8",
                    txt: "color_15",
                    bgh: "color_18",
                    brdh: "color_15",
                    txth: "color_15"
                },
                css: {
                    "%link": "[rd]  position:absolute;top:0;right:0;bottom:0;left:0;background-color:[bg];border:[brw] [brd] solid;cursor:pointer !important;",
                    "%label": "[fnt]  color:[txt];white-space:nowrap;margin:1px [brw] 0 [brw];display:inline-block;position:relative;",
                    "%:hover %link": "background-color:[bgh];border-color:[brdh];",
                    "%:hover %label": "color:[txth];"
                }
            },
            "wysiwyg.viewer.skins.button.BasicButton": {
                react: [
                    ["a", "link", ["_g!g-transparent-a"], {},
                        ["span", "label", [], {}]
                    ]
                ],
                params: {
                    rd: "BORDER_RADIUS",
                    trans1: "TRANSITION",
                    shd: "BOX_SHADOW",
                    fnt: "FONT",
                    trans2: "TRANSITION",
                    txt: "TEXT_COLOR",
                    brw: "BORDER_SIZE",
                    bg: "BG_COLOR_ALPHA",
                    brd: "BORDER_COLOR_ALPHA",
                    bgh: "BG_COLOR_ALPHA",
                    brdh: "BORDER_COLOR_ALPHA",
                    txth: "TEXT_COLOR",
                    bgd: "BG_COLOR_ALPHA",
                    brdd: "BORDER_COLOR_ALPHA",
                    txtd: "TEXT_COLOR"
                },
                paramsDefaults: {
                    rd: "0",
                    trans1: "border-color 0.4s ease 0s, background-color 0.4s ease 0s",
                    shd: "0 1px 4px rgba(0, 0, 0, 0.6)",
                    fnt: "font_5",
                    trans2: "color 0.4s ease 0s",
                    txt: "color_15",
                    brw: "0",
                    bg: "color_17",
                    brd: "color_15",
                    bgh: "color_18",
                    brdh: "color_15",
                    txth: "color_15",
                    bgd: "#CCCCCC",
                    brdd: "color_15",
                    txtd: "#FFFFFF"
                },
                css: {
                    "% button%link": "width:100%;",
                    '%[data-state~="shouldUseFlex"] %link,%[data-state~="shouldUseFlex"] %labelwrapper': "text-align:initial;display:flex;align-items:center;",
                    '%[data-state~="shouldUseFlex"][data-state~="center"] %link,%[data-state~="shouldUseFlex"][data-state~="center"] %labelwrapper': "justify-content:center;",
                    '%[data-state~="shouldUseFlex"][data-state~="left"] %link,%[data-state~="shouldUseFlex"][data-state~="left"] %labelwrapper': "justify-content:flex-start;",
                    '%[data-state~="shouldUseFlex"][data-state~="right"] %link,%[data-state~="shouldUseFlex"][data-state~="right"] %labelwrapper': "justify-content:flex-end;",
                    "%link": "[rd]  position:absolute;top:0;right:0;bottom:0;left:0;[trans1]  [shd]",
                    "%label": "[fnt]  [trans2]  color:[txt];display:inline-block;margin:calc(-1 * [brw]) [brw] 0;position:relative;white-space:nowrap;",
                    '%[data-state~="shouldUseFlex"] %label': "margin:0;",
                    '%[data-disabled="false"] %link': "background-color:[bg];border:solid [brd] [brw];cursor:pointer !important;",
                    '%[data-disabled="false"]:active[data-state~="mobile"] %link,%[data-disabled="false"]:hover[data-state~="desktop"] %link,%[data-disabled="false"][data-preview~="hover"] %link': "background-color:[bgh];border-color:[brdh];",
                    '%[data-disabled="false"]:active[data-state~="mobile"] %label,%[data-disabled="false"]:hover[data-state~="desktop"] %label,%[data-disabled="false"][data-preview~="hover"] %label': "color:[txth];",
                    '%[data-disabled="true"] %link,%[data-preview~="disabled"] %link': "background-color:[bgd];border:solid [brdd] [brw];",
                    '%[data-disabled="true"] %label,%[data-preview~="disabled"] %label': "color:[txtd];"
                }
            },
            "wysiwyg.viewer.skins.button.BorderButton": {
                react: [
                    ["div", null, ["_bg"], {}],
                    ["a", "link", [], {},
                        ["span", "label", [], {}]
                    ]
                ],
                params: {
                    rd: "BORDER_RADIUS",
                    rd2: "BORDER_RADIUS",
                    bg: "BG_COLOR_ALPHA",
                    xxx: "BG_COLOR_ALPHA",
                    tdr: "URL",
                    fnt: "FONT",
                    txt: "TEXT_COLOR",
                    brdh: "BG_COLOR_ALPHA",
                    bgh: "BG_COLOR_ALPHA",
                    txth: "TEXT_COLOR",
                    brdd: "BORDER_COLOR_ALPHA",
                    brw: "BORDER_SIZE",
                    bgd: "BG_COLOR_ALPHA",
                    txtd: "TEXT_COLOR",
                    brd: "BG_COLOR"
                },
                paramsDefaults: {
                    rd: "10px",
                    rd2: "5px",
                    bg: "color_1",
                    xxx: "color_1",
                    tdr: "BASE_THEME_DIRECTORY",
                    fnt: "font_5",
                    txt: "color_5",
                    brdh: "color_6",
                    bgh: "color_2",
                    txth: "color_6",
                    brdd: "color_6",
                    brw: "0",
                    bgd: "#CCCCCC",
                    txtd: "#FFFFFF",
                    brd: "color_5"
                },
                paramsMutators: {
                    brd: {
                        type: "alpha",
                        value: .6
                    }
                },
                css: {
                    "% button%link": "width:100%;",
                    '%[data-state~="shouldUseFlex"] %link,%[data-state~="shouldUseFlex"] %labelwrapper': "text-align:initial;display:flex;align-items:center;",
                    '%[data-state~="shouldUseFlex"][data-state~="center"] %link,%[data-state~="shouldUseFlex"][data-state~="center"] %labelwrapper': "justify-content:center;",
                    '%[data-state~="shouldUseFlex"][data-state~="left"] %link,%[data-state~="shouldUseFlex"][data-state~="left"] %labelwrapper': "justify-content:flex-start;",
                    '%[data-state~="shouldUseFlex"][data-state~="right"] %link,%[data-state~="shouldUseFlex"][data-state~="right"] %labelwrapper': "justify-content:flex-end;",
                    "%": "[rd]  background-color:[brd];",
                    "%_bg": "[rd2]  background-color:[bg];position:absolute;top:5px;bottom:5px;left:5px;right:5px;background:[xxx] url([tdr]net.png) center center repeat;",
                    "%link": "position:absolute;top:0;right:0;bottom:0;left:0;",
                    "%label": "position:relative;[fnt]  color:[txt];white-space:nowrap;padding:15px;",
                    '%[data-disabled="false"]': "cursor:pointer;",
                    '%[data-disabled="false"]:active[data-state~="mobile"],%[data-disabled="false"]:hover[data-state~="desktop"],%[data-disabled="false"][data-preview~="hover"]': "background-color:[brdh];",
                    '%[data-disabled="false"]:active[data-state~="mobile"] %_bg,%[data-disabled="false"]:hover[data-state~="desktop"] %_bg,%[data-disabled="false"][data-preview~="hover"] %_bg': "background-color:[bgh];",
                    '%[data-disabled="false"]:active[data-state~="mobile"] %label,%[data-disabled="false"]:hover[data-state~="desktop"] %label,%[data-disabled="false"][data-preview~="hover"] %label': "color:[txth];",
                    '%[data-disabled="true"],%[data-preview~="disabled"]': "border:solid [brdd] [brw];",
                    '%[data-disabled="true"] %_bg,%[data-preview~="disabled"] %_bg': "background-color:[bgd];",
                    '%[data-disabled="true"] %label,%[data-preview~="disabled"] %label': "color:[txtd];"
                }
            },
            "wysiwyg.viewer.skins.button.BrandButton": {
                react: [
                    ["a", "link", [], {},
                        ["span", "label", [], {}]
                    ]
                ],
                params: {
                    rd: "BORDER_RADIUS",
                    bg: "BG_COLOR_ALPHA",
                    shadowColor: "BOX_SHADOW_COLOR_ALPHA",
                    shadowColor2: "BOX_SHADOW_COLOR_ALPHA",
                    brd: "BORDER_COLOR_ALPHA",
                    brw: "BORDER_SIZE",
                    trans1: "TRANSITION",
                    fnt: "FONT",
                    txt: "TEXT_COLOR",
                    trans2: "TRANSITION",
                    bgh: "BG_COLOR_ALPHA",
                    brdh: "BORDER_COLOR_ALPHA",
                    txth: "TEXT_COLOR",
                    bga: "BG_COLOR_ALPHA",
                    brda: "BORDER_COLOR_ALPHA",
                    txta: "TEXT_COLOR",
                    bgd: "BG_COLOR_ALPHA",
                    brdd: "BORDER_COLOR_ALPHA",
                    txtd: "TEXT_COLOR"
                },
                paramsDefaults: {
                    rd: "0",
                    bg: "color_17",
                    shadowColor: "#000102",
                    shadowColor2: "#000102",
                    brd: "color_15",
                    brw: "0",
                    trans1: "border-color 0.2s ease 0s, background-color 0.2s ease 0s",
                    fnt: "font_5",
                    txt: "color_15",
                    trans2: "color 0.2s ease 0s",
                    bgh: "color_18",
                    brdh: "color_15",
                    txth: "color_15",
                    bga: "color_17",
                    brda: "color_15",
                    txta: "color_15",
                    bgd: "#CCCCCC",
                    brdd: "color_15",
                    txtd: "#FFFFFF"
                },
                css: {
                    "% button%link": "width:100%;",
                    '%[data-state~="shouldUseFlex"] %link,%[data-state~="shouldUseFlex"] %labelwrapper': "text-align:initial;display:flex;align-items:center;",
                    '%[data-state~="shouldUseFlex"][data-state~="center"] %link,%[data-state~="shouldUseFlex"][data-state~="center"] %labelwrapper': "justify-content:center;",
                    '%[data-state~="shouldUseFlex"][data-state~="left"] %link,%[data-state~="shouldUseFlex"][data-state~="left"] %labelwrapper': "justify-content:flex-start;",
                    '%[data-state~="shouldUseFlex"][data-state~="right"] %link,%[data-state~="shouldUseFlex"][data-state~="right"] %labelwrapper': "justify-content:flex-end;",
                    "%link": "[rd]  position:absolute;top:0;right:0;bottom:0;left:0;background-color:[bg];box-shadow:0px 1px 1px 0px [shadowColor], 0px 4px 6px 0px [shadowColor2];border:solid [brd] [brw];[trans1]",
                    "%label": "[fnt]  color:[txt];display:inline-block;margin:calc(-1 * [brw]) [brw] 0;position:relative;white-space:nowrap;[trans2]",
                    '%[data-disabled="false"]': "cursor:pointer !important;",
                    '%[data-disabled="false"]:active[data-state~="mobile"] %link,%[data-disabled="false"]:hover[data-state~="desktop"] %link,%[data-disabled="false"][data-preview~="hover"] %link': "background-color:[bgh];border:solid [brdh] [brw];",
                    '%[data-disabled="false"]:active[data-state~="mobile"] %label,%[data-disabled="false"]:hover[data-state~="desktop"] %label,%[data-disabled="false"][data-preview~="hover"] %label': "color:[txth];",
                    '%[data-disabled="false"]:active[data-state~="desktop"] %link': "background-color:[bga];border:solid [brda] [brw];transition:none;",
                    '%[data-disabled="false"]:active[data-state~="desktop"] %label': "color:[txta];transition:none;",
                    '%[data-disabled="true"] %link,%[data-preview~="disabled"] %link': "background-color:[bgd];border:solid [brdd] [brw];",
                    '%[data-disabled="true"] %label,%[data-preview~="disabled"] %label': "color:[txtd];"
                }
            },
            "wysiwyg.viewer.skins.button.ButtonArrow": {
                react: [
                    ["div", null, ["_arr", "_top"], {}],
                    ["div", null, ["_arr", "_bottom"], {}],
                    ["div", null, ["_bg"], {}],
                    ["a", "link", [], {},
                        ["span", "label", [], {}]
                    ]
                ],
                exports: {
                    maxH: 100
                },
                params: {
                    bgh: "BORDER_COLOR_ALPHA",
                    txth: "TEXT_COLOR",
                    brw: "BORDER_SIZE",
                    bg: "BORDER_COLOR_ALPHA",
                    fnt: "FONT",
                    txt: "TEXT_COLOR",
                    bgd: "BORDER_COLOR_ALPHA",
                    txtd: "TEXT_COLOR",
                    brdd: "BORDER_COLOR_ALPHA"
                },
                paramsDefaults: {
                    bgh: "color_18",
                    txth: "color_15",
                    brw: "0",
                    bg: "color_17",
                    fnt: "font_5",
                    txt: "color_15",
                    bgd: "#CCCCCC",
                    txtd: "#FFFFFF",
                    brdd: "color_18"
                },
                css: {
                    "% button%link": "width:100%;",
                    '%[data-state~="shouldUseFlex"] %link,%[data-state~="shouldUseFlex"] %labelwrapper': "text-align:initial;display:flex;align-items:center;",
                    '%[data-state~="shouldUseFlex"][data-state~="center"] %link,%[data-state~="shouldUseFlex"][data-state~="center"] %labelwrapper': "justify-content:center;",
                    '%[data-state~="shouldUseFlex"][data-state~="left"] %link,%[data-state~="shouldUseFlex"][data-state~="left"] %labelwrapper': "justify-content:flex-start;",
                    '%[data-state~="shouldUseFlex"][data-state~="right"] %link,%[data-state~="shouldUseFlex"][data-state~="right"] %labelwrapper': "justify-content:flex-end;",
                    "%": "overflow:hidden;",
                    '%[data-disabled="false"]': "cursor:pointer !important;",
                    '%[data-disabled="false"]:active[data-state~="mobile"] %_bg,%[data-disabled="false"]:hover[data-state~="desktop"] %_bg,%[data-disabled="false"][data-preview~="hover"] %_bg': "background:[bgh];",
                    '%[data-disabled="false"]:active[data-state~="mobile"] %label,%[data-disabled="false"]:hover[data-state~="desktop"] %label,%[data-disabled="false"][data-preview~="hover"] %label': "color:[txth];",
                    '%[data-disabled="false"]:active[data-state~="mobile"] %_top,%[data-disabled="false"]:hover[data-state~="desktop"] %_top,%[data-disabled="false"][data-preview~="hover"] %_top': "border-bottom-color:[bgh] !important;border:[brw] solid;",
                    '%[data-disabled="false"]:active[data-state~="mobile"] %_bottom,%[data-disabled="false"]:hover[data-state~="desktop"] %_bottom,%[data-disabled="false"][data-preview~="hover"] %_bottom': "border-top-color:[bgh] !important;border:[brw] solid;",
                    "%_bg": "background:[bg];position:absolute;top:0;right:50px;bottom:0;left:0;",
                    "%link": "position:absolute;top:0;right:0;bottom:0;left:0;",
                    "%label": "[fnt]  color:[txt];display:inline-block;position:relative;white-space:nowrap;",
                    "%_top,%_bottom": "border-left:0;border-right:50px solid transparent;position:absolute;right:0;",
                    '%[data-state~="mobile"] %_top,%[data-state~="mobile"] %_bottom': "right:1px;",
                    "%_top": "border-bottom:50px solid [bg];bottom:50% !important;",
                    '%[data-state~="mobile"] %_top': "transform:scale(1.01);",
                    "%_bottom": "border-top:50px solid [bg];top:50% !important;",
                    '%[data-disabled="true"] %_bg,%[data-preview~="disabled"] %_bg': "background:[bgd];",
                    '%[data-disabled="true"] %label,%[data-preview~="disabled"] %label': "color:[txtd];",
                    '%[data-disabled="true"] %_top,%[data-preview~="disabled"] %_top': "border-bottom-color:[brdd];border:[brw] solid;",
                    '%[data-disabled="true"] %_bottom,%[data-preview~="disabled"] %_bottom': "border-top-color:[brdd];border:[brw] solid;"
                }
            },
            "wysiwyg.viewer.skins.button.ButtonArrowLeft": {
                react: [
                    ["div", null, ["_arr", "_top"], {}],
                    ["div", null, ["_arr", "_bottom"], {}],
                    ["div", null, ["_bg"], {}],
                    ["a", "link", [], {},
                        ["span", "label", [], {}]
                    ]
                ],
                params: {
                    bgh: "BORDER_COLOR_ALPHA",
                    txth: "TEXT_COLOR",
                    brw: "BORDER_SIZE",
                    bg: "BORDER_COLOR_ALPHA",
                    fnt: "FONT",
                    txt: "TEXT_COLOR",
                    bgd: "BORDER_COLOR_ALPHA",
                    txtd: "TEXT_COLOR",
                    brdd: "BORDER_COLOR_ALPHA"
                },
                paramsDefaults: {
                    bgh: "color_18",
                    txth: "color_15",
                    brw: "0",
                    bg: "color_17",
                    fnt: "font_5",
                    txt: "color_15",
                    bgd: "#CCCCCC",
                    txtd: "#FFFFFF",
                    brdd: "color_17"
                },
                css: {
                    "% button%link": "width:100%;",
                    '%[data-state~="shouldUseFlex"] %link,%[data-state~="shouldUseFlex"] %labelwrapper': "text-align:initial;display:flex;align-items:center;",
                    '%[data-state~="shouldUseFlex"][data-state~="center"] %link,%[data-state~="shouldUseFlex"][data-state~="center"] %labelwrapper': "justify-content:center;",
                    '%[data-state~="shouldUseFlex"][data-state~="left"] %link,%[data-state~="shouldUseFlex"][data-state~="left"] %labelwrapper': "justify-content:flex-start;",
                    '%[data-state~="shouldUseFlex"][data-state~="right"] %link,%[data-state~="shouldUseFlex"][data-state~="right"] %labelwrapper': "justify-content:flex-end;",
                    "%": "overflow:hidden;transform:rotate(360deg);",
                    '%[data-disabled="false"]': "cursor:pointer !important;",
                    '%[data-disabled="false"]:active[data-state~="mobile"] %_bg,%[data-disabled="false"]:hover[data-state~="desktop"] %_bg,%[data-disabled="false"][data-preview~="hover"] %_bg': "background:[bgh];",
                    '%[data-disabled="false"]:active[data-state~="mobile"] %label,%[data-disabled="false"]:hover[data-state~="desktop"] %label,%[data-disabled="false"][data-preview~="hover"] %label': "color:[txth];",
                    '%[data-disabled="false"]:active[data-state~="mobile"] %_top,%[data-disabled="false"]:hover[data-state~="desktop"] %_top,%[data-disabled="false"][data-preview~="hover"] %_top': "border-bottom-color:[bgh] !important;border:[brw] solid;",
                    '%[data-disabled="false"]:active[data-state~="mobile"] %_bottom,%[data-disabled="false"]:hover[data-state~="desktop"] %_bottom,%[data-disabled="false"][data-preview~="hover"] %_bottom': "border-top-color:[bgh] !important;border:[brw] solid;",
                    "%_bg": "background:[bg];position:absolute;top:0;right:0;bottom:0;left:50px;",
                    "%link": "position:absolute;top:0;right:0;bottom:0;left:0;",
                    "%label": "[fnt]  color:[txt];display:inline-block;position:relative;white-space:nowrap;",
                    "%_top,%_bottom": "border-left:50px solid transparent;border-right:0;left:0;position:absolute;",
                    '%[data-state~="mobile"] %_top,%[data-state~="mobile"] %_bottom': "left:1px;",
                    "%_top": "border-bottom:50px solid [bg];bottom:50%;",
                    '%[data-state~="mobile"] %_top': "transform:scale(1.01);",
                    "%_bottom": "border-top:50px solid [bg];top:50%;",
                    '%[data-disabled="true"] %_bg,%[data-preview~="disabled"] %_bg': "background:[bgd];",
                    '%[data-disabled="true"] %label,%[data-preview~="disabled"] %label': "color:[txtd];",
                    '%[data-disabled="true"] %_top,%[data-preview~="disabled"] %_top': "border-bottom-color:[brdd];border:[brw] solid;",
                    '%[data-disabled="true"] %_bottom,%[data-preview~="disabled"] %_bottom': "border-top-color:[brdd];border:[brw] solid;"
                }
            },
            "wysiwyg.viewer.skins.button.ButtonDoubleArrowLeft": {
                react: [
                    ["div", null, ["_wrapper"], {},
                        ["div", null, ["_container", "_left"], {},
                            ["div", null, ["_ribbon"], {}]
                        ],
                        ["div", null, ["_container", "_top", "_right"], {},
                            ["div", null, ["_ribbon"], {}]
                        ],
                        ["div", null, ["_container", "_bottom", "_right"], {},
                            ["div", null, ["_ribbon"], {}]
                        ],
                        ["div", null, ["_filler"], {}]
                    ],
                    ["a", "link", [], {},
                        ["span", "label", [], {}]
                    ]
                ],
                params: {
                    bg: "BORDER_COLOR_ALPHA",
                    fnt: "FONT",
                    txt: "TEXT_COLOR",
                    txth: "TEXT_COLOR",
                    bgh: "BORDER_COLOR_ALPHA"
                },
                paramsDefaults: {
                    bg: "color_17",
                    fnt: "font_5",
                    txt: "color_15",
                    txth: "color_15",
                    bgh: "color_18"
                },
                css: {
                    "% button%link": "width:100%;",
                    '%[data-state~="shouldUseFlex"] %link,%[data-state~="shouldUseFlex"] %labelwrapper': "text-align:initial;display:flex;align-items:center;",
                    '%[data-state~="shouldUseFlex"][data-state~="center"] %link,%[data-state~="shouldUseFlex"][data-state~="center"] %labelwrapper': "justify-content:center;",
                    '%[data-state~="shouldUseFlex"][data-state~="left"] %link,%[data-state~="shouldUseFlex"][data-state~="left"] %labelwrapper': "justify-content:flex-start;",
                    '%[data-state~="shouldUseFlex"][data-state~="right"] %link,%[data-state~="shouldUseFlex"][data-state~="right"] %labelwrapper': "justify-content:flex-end;",
                    "%_wrapper": "position:absolute;top:0;right:0;bottom:0;left:0;width:50%;",
                    "%_container": "position:absolute;height:50%;overflow:hidden;width:80%;",
                    "%_left": "height:100%;",
                    "%_left %_ribbon": "height:100%;border:0;",
                    "%_right": "left:120%;",
                    "%_bottom": "bottom:0;",
                    "%_ribbon": "position:absolute;width:100%;height:0;border-style:solid;",
                    "%_right %_ribbon": "right:0;",
                    "%_top %_ribbon": "top:0;",
                    "%_bottom %_ribbon": "bottom:0;",
                    "%_top%_right %_ribbon": "border-color:[bg] transparent transparent transparent;border-width:500px 500px 0 0;",
                    "%_bottom%_right %_ribbon": "border-color:transparent transparent [bg] transparent;border-width:0 500px 500px 0;",
                    "%_left %_ribbon:before": 'border-width:500px;position:absolute;content:"";overflow:hidden;left:0;width:100%;border-style:solid;border-color:[bg] transparent;top:50%;',
                    "%_left %_ribbon:after": 'border-width:500px;position:absolute;content:"";overflow:hidden;left:0;width:100%;border-style:solid;border-color:[bg] transparent;bottom:50%;',
                    "%_filler": "position:absolute;background-color:[bg];width:40%;height:100%;left:80%;",
                    "%link": "position:absolute;top:0;right:0;bottom:0;left:0;overflow:hidden;height:100%;cursor:pointer !important;",
                    "%label": "[fnt]  color:[txt];white-space:nowrap;display:inline-block;position:relative;",
                    '%:active[data-state~="mobile"] %label,%:hover[data-state~="desktop"] %label,%[data-preview~="hover"] %label': "color:[txth];",
                    '%:active[data-state~="mobile"] %_top%_right %_ribbon,%:hover[data-state~="desktop"] %_top%_right %_ribbon,%[data-preview~="hover"] %_top%_right %_ribbon': "border-top-color:[bgh];",
                    '%:active[data-state~="mobile"] %_bottom%_right %_ribbon,%:hover[data-state~="desktop"] %_bottom%_right %_ribbon,%[data-preview~="hover"] %_bottom%_right %_ribbon': "border-bottom-color:[bgh];",
                    '%:active[data-state~="mobile"] %_left %_ribbon:before,%:hover[data-state~="desktop"] %_left %_ribbon:before,%[data-preview~="hover"] %_left %_ribbon:before': "border-color:[bgh] transparent;",
                    '%:active[data-state~="mobile"] %_left %_ribbon:after,%:hover[data-state~="desktop"] %_left %_ribbon:after,%[data-preview~="hover"] %_left %_ribbon:after': "border-color:[bgh] transparent;",
                    '%:active[data-state~="mobile"] %_filler,%:hover[data-state~="desktop"] %_filler,%[data-preview~="hover"] %_filler': "background-color:[bgh];"
                }
            },
            "wysiwyg.viewer.skins.button.ButtonDoubleArrowRight": {
                react: [
                    ["div", null, ["_wrapper"], {},
                        ["div", null, ["_container", "_top", "_left"], {},
                            ["div", null, ["_ribbon"], {}]
                        ],
                        ["div", null, ["_container", "_bottom", "_left"], {},
                            ["div", null, ["_ribbon"], {}]
                        ],
                        ["div", null, ["_container", "_right"], {},
                            ["div", null, ["_ribbon"], {}]
                        ],
                        ["div", null, ["_filler"], {}]
                    ],
                    ["a", "link", [], {},
                        ["span", "label", [], {}]
                    ]
                ],
                params: {
                    bg: "BORDER_COLOR_ALPHA",
                    fnt: "FONT",
                    txt: "TEXT_COLOR",
                    txth: "TEXT_COLOR",
                    bgh: "BORDER_COLOR_ALPHA"
                },
                paramsDefaults: {
                    bg: "color_17",
                    fnt: "font_5",
                    txt: "color_15",
                    txth: "color_15",
                    bgh: "color_18"
                },
                css: {
                    "% button%link": "width:100%;",
                    '%[data-state~="shouldUseFlex"] %link,%[data-state~="shouldUseFlex"] %labelwrapper': "text-align:initial;display:flex;align-items:center;",
                    '%[data-state~="shouldUseFlex"][data-state~="center"] %link,%[data-state~="shouldUseFlex"][data-state~="center"] %labelwrapper': "justify-content:center;",
                    '%[data-state~="shouldUseFlex"][data-state~="left"] %link,%[data-state~="shouldUseFlex"][data-state~="left"] %labelwrapper': "justify-content:flex-start;",
                    '%[data-state~="shouldUseFlex"][data-state~="right"] %link,%[data-state~="shouldUseFlex"][data-state~="right"] %labelwrapper': "justify-content:flex-end;",
                    "%_wrapper": "position:absolute;top:0;right:0;bottom:0;left:0;width:50%;",
                    "%_container": "position:absolute;height:50%;overflow:hidden;width:80%;",
                    "%_right": "left:120%;height:100%;",
                    "%_bottom": "bottom:0;",
                    "%_ribbon": "position:absolute;width:0;height:0;border-style:solid;",
                    "%_right %_ribbon": "right:0;height:100%;",
                    "%_top %_ribbon": "top:0;",
                    "%_bottom %_ribbon": "bottom:0;",
                    "%_top%_left %_ribbon": "border-color:transparent [bg] transparent transparent;border-width:0 500px 500px 0;",
                    "%_bottom%_left %_ribbon": "border-color:transparent transparent [bg] transparent;border-width:0 0 500px 500px;",
                    "%_right %_ribbon:before": 'position:absolute;content:"";overflow:hidden;right:0;width:100%;border-style:solid;border-color:[bg] transparent;border-width:500px 500px 0 0;top:50%;',
                    "%_right %_ribbon:after": 'position:absolute;content:"";overflow:hidden;right:0;width:100%;border-style:solid;border-color:[bg] transparent;border-width:0 500px 500px 0;bottom:50%;',
                    "%_filler": "position:absolute;width:50%;background-color:[bg];width:40%;height:100%;left:80%;",
                    "%link": "position:absolute;top:0;right:0;bottom:0;left:0;overflow:hidden;height:100%;cursor:pointer !important;",
                    "%label": "[fnt]  color:[txt];white-space:nowrap;display:inline-block;position:relative;",
                    '%:active[data-state~="mobile"] %label,%:hover[data-state~="desktop"] %label,%[data-preview~="hover"] %label': "color:[txth];",
                    '%:active[data-state~="mobile"] %_top%_left %_ribbon,%:hover[data-state~="desktop"] %_top%_left %_ribbon,%[data-preview~="hover"] %_top%_left %_ribbon': "border-right-color:[bgh];",
                    '%:active[data-state~="mobile"] %_bottom%_left %_ribbon,%:hover[data-state~="desktop"] %_bottom%_left %_ribbon,%[data-preview~="hover"] %_bottom%_left %_ribbon': "border-bottom-color:[bgh];",
                    '%:active[data-state~="mobile"] %_right %_ribbon:before,%:hover[data-state~="desktop"] %_right %_ribbon:before,%[data-preview~="hover"] %_right %_ribbon:before': "border-color:[bgh] transparent;",
                    '%:active[data-state~="mobile"] %_right %_ribbon:after,%:hover[data-state~="desktop"] %_right %_ribbon:after,%[data-preview~="hover"] %_right %_ribbon:after': "border-color:[bgh] transparent;",
                    '%:active[data-state~="mobile"] %_filler,%:hover[data-state~="desktop"] %_filler,%[data-preview~="hover"] %_filler': "background-color:[bgh];"
                }
            },
            "wysiwyg.viewer.skins.button.ButtonForkedLeft": {
                react: [
                    ["div", null, ["_wrapper"], {},
                        ["div", null, ["_container", "_top"], {},
                            ["div", null, ["_ribbon"], {}]
                        ],
                        ["div", null, ["_container", "_bottom"], {},
                            ["div", null, ["_ribbon"], {}]
                        ]
                    ],
                    ["a", "link", [], {},
                        ["span", "label", [], {}]
                    ]
                ],
                params: {
                    bg: "BORDER_COLOR_ALPHA",
                    fnt: "FONT",
                    txt: "TEXT_COLOR",
                    txth: "TEXT_COLOR",
                    bgh: "BORDER_COLOR_ALPHA"
                },
                paramsDefaults: {
                    bg: "color_17",
                    fnt: "font_5",
                    txt: "color_15",
                    txth: "color_15",
                    bgh: "color_18"
                },
                css: {
                    "% button%link": "width:100%;",
                    '%[data-state~="shouldUseFlex"] %link,%[data-state~="shouldUseFlex"] %labelwrapper': "text-align:initial;display:flex;align-items:center;",
                    '%[data-state~="shouldUseFlex"][data-state~="center"] %link,%[data-state~="shouldUseFlex"][data-state~="center"] %labelwrapper': "justify-content:center;",
                    '%[data-state~="shouldUseFlex"][data-state~="left"] %link,%[data-state~="shouldUseFlex"][data-state~="left"] %labelwrapper': "justify-content:flex-start;",
                    '%[data-state~="shouldUseFlex"][data-state~="right"] %link,%[data-state~="shouldUseFlex"][data-state~="right"] %labelwrapper': "justify-content:flex-end;",
                    "%_wrapper": "position:absolute;top:0;bottom:0;right:0;width:50%;background-color:[bg];",
                    "%_container": "position:absolute;height:50%;overflow:hidden;width:100%;right:100%;",
                    "%_bottom": "bottom:0;",
                    "%_ribbon": "position:absolute;width:0;height:0;left:0;border-style:solid;",
                    "%_top %_ribbon": "top:0;border-width:0 500px 500px 0;border-color:transparent [bg] transparent transparent;",
                    "%_bottom %_ribbon": "bottom:0;border-color:transparent transparent [bg] transparent;border-width:0 0 500px 500px;",
                    "%link": "position:absolute;top:0;right:0;bottom:0;left:0;overflow:hidden;height:100%;cursor:pointer !important;",
                    "%label": "[fnt]  color:[txt];white-space:nowrap;display:inline-block;position:relative;",
                    '%:active[data-state~="mobile"] %label,%:hover[data-state~="desktop"] %label,%[data-preview~="hover"] %label': "color:[txth];",
                    '%:active[data-state~="mobile"] %_top %_ribbon,%:hover[data-state~="desktop"] %_top %_ribbon,%[data-preview~="hover"] %_top %_ribbon': "border-right-color:[bgh];",
                    '%:active[data-state~="mobile"] %_bottom %_ribbon,%:hover[data-state~="desktop"] %_bottom %_ribbon,%[data-preview~="hover"] %_bottom %_ribbon': "border-bottom-color:[bgh];",
                    '%:active[data-state~="mobile"] %_wrapper,%:hover[data-state~="desktop"] %_wrapper,%[data-preview~="hover"] %_wrapper': "background-color:[bgh];"
                }
            },
            "wysiwyg.viewer.skins.button.ButtonForkedRight": {
                react: [
                    ["div", null, ["_wrapper"], {},
                        ["div", null, ["_container", "_top"], {},
                            ["div", null, ["_ribbon"], {}]
                        ],
                        ["div", null, ["_container", "_bottom"], {},
                            ["div", null, ["_ribbon"], {}]
                        ]
                    ],
                    ["a", "link", [], {},
                        ["span", "label", [], {}]
                    ]
                ],
                params: {
                    bg: "BORDER_COLOR_ALPHA",
                    fnt: "FONT",
                    txt: "TEXT_COLOR",
                    txth: "TEXT_COLOR",
                    bgh: "BORDER_COLOR_ALPHA"
                },
                paramsDefaults: {
                    bg: "color_17",
                    fnt: "font_5",
                    txt: "color_15",
                    txth: "color_15",
                    bgh: "color_18"
                },
                css: {
                    "% button%link": "width:100%;",
                    '%[data-state~="shouldUseFlex"] %link,%[data-state~="shouldUseFlex"] %labelwrapper': "text-align:initial;display:flex;align-items:center;",
                    '%[data-state~="shouldUseFlex"][data-state~="center"] %link,%[data-state~="shouldUseFlex"][data-state~="center"] %labelwrapper': "justify-content:center;",
                    '%[data-state~="shouldUseFlex"][data-state~="left"] %link,%[data-state~="shouldUseFlex"][data-state~="left"] %labelwrapper': "justify-content:flex-start;",
                    '%[data-state~="shouldUseFlex"][data-state~="right"] %link,%[data-state~="shouldUseFlex"][data-state~="right"] %labelwrapper': "justify-content:flex-end;",
                    "%_wrapper": "position:absolute;top:0;right:0;bottom:0;left:0;width:50%;background-color:[bg];",
                    "%_container": "position:absolute;height:50%;overflow:hidden;width:100%;left:100%;",
                    "%_bottom": "bottom:0;",
                    "%_ribbon": "position:absolute;width:0;height:0;right:0;border-style:solid;",
                    "%_top %_ribbon": "top:0;border-width:500px 500px 0 0;border-color:[bg] transparent transparent transparent;",
                    "%_bottom %_ribbon": "bottom:0;border-color:transparent transparent transparent [bg];border-width:500px 0 0 500px;",
                    "%link": "position:absolute;top:0;right:0;bottom:0;left:0;overflow:hidden;height:100%;cursor:pointer !important;",
                    "%label": "[fnt]  color:[txt];white-space:nowrap;display:inline-block;position:relative;",
                    '%:active[data-state~="mobile"] %label,%:hover[data-state~="desktop"] %label,%[data-preview~="hover"] %label': "color:[txth];",
                    '%:active[data-state~="mobile"] %_top %_ribbon,%:hover[data-state~="desktop"] %_top %_ribbon,%[data-preview~="hover"] %_top %_ribbon': "border-top-color:[bgh];",
                    '%:active[data-state~="mobile"] %_bottom %_ribbon,%:hover[data-state~="desktop"] %_bottom %_ribbon,%[data-preview~="hover"] %_bottom %_ribbon': "border-left-color:[bgh];",
                    '%:active[data-state~="mobile"] %_wrapper,%:hover[data-state~="desktop"] %_wrapper,%[data-preview~="hover"] %_wrapper': "background-color:[bgh];"
                }
            },
            "wysiwyg.viewer.skins.button.ButtonInnerShadow": {
                react: [
                    ["a", "link", [], {},
                        ["span", "label", [], {}]
                    ]
                ],
                params: {
                    rd: "BORDER_RADIUS",
                    bg: "BG_COLOR_ALPHA",
                    trans1: "TRANSITION",
                    brd: "BORDER_COLOR_ALPHA",
                    brw: "BORDER_SIZE",
                    fnt: "FONT",
                    trans2: "TRANSITION",
                    txt: "TEXT_COLOR",
                    bgh: "BG_COLOR_ALPHA",
                    brdh: "BORDER_COLOR_ALPHA",
                    txth: "TEXT_COLOR",
                    bgd: "BG_COLOR_ALPHA",
                    brdd: "BORDER_COLOR_ALPHA",
                    txtd: "TEXT_COLOR"
                },
                paramsDefaults: {
                    rd: "5px",
                    bg: "color_17",
                    trans1: "border-color 0.4s ease 0s, background-color 0.4s ease 0s",
                    brd: "color_15",
                    brw: "0",
                    fnt: "font_5",
                    trans2: "color 0.4s ease 0s",
                    txt: "color_15",
                    bgh: "color_18",
                    brdh: "color_15",
                    txth: "color_15",
                    bgd: "#CCCCCC",
                    brdd: "color_15",
                    txtd: "#FFFFFF"
                },
                css: {
                    "% button%link": "width:100%;",
                    '%[data-state~="shouldUseFlex"] %link,%[data-state~="shouldUseFlex"] %labelwrapper': "text-align:initial;display:flex;align-items:center;",
                    '%[data-state~="shouldUseFlex"][data-state~="center"] %link,%[data-state~="shouldUseFlex"][data-state~="center"] %labelwrapper': "justify-content:center;",
                    '%[data-state~="shouldUseFlex"][data-state~="left"] %link,%[data-state~="shouldUseFlex"][data-state~="left"] %labelwrapper': "justify-content:flex-start;",
                    '%[data-state~="shouldUseFlex"][data-state~="right"] %link,%[data-state~="shouldUseFlex"][data-state~="right"] %labelwrapper': "justify-content:flex-end;",
                    "%link": "[rd]  position:absolute;top:0;right:0;bottom:0;left:0;background-color:[bg];[trans1]  border:solid [brd] [brw];box-shadow:inset 0 1px 2px rgba(0, 0, 0, 0.6), inset 0 -1px 1px rgba(255, 255, 255, 0.75);",
                    "%label": "[fnt]  [trans2]  color:[txt];display:inline-block;margin:calc(-1 * [brw]) [brw] 0;position:relative;white-space:nowrap;",
                    '%[data-disabled="false"]': "cursor:pointer !important;",
                    '%[data-disabled="false"]:active[data-state~="mobile"] %link,%[data-disabled="false"]:hover[data-state~="desktop"] %link,%[data-disabled="false"][data-preview~="hover"] %link': "background-color:[bgh];border:solid [brdh] [brw];[trans1]",
                    '%[data-disabled="false"]:active[data-state~="mobile"] %label,%[data-disabled="false"]:hover[data-state~="desktop"] %label,%[data-disabled="false"][data-preview~="hover"] %label': "color:[txth];[trans2]",
                    '%[data-disabled="true"] %link,%[data-preview~="disabled"] %link': "background-color:[bgd];border:solid [brdd] [brw];",
                    '%[data-disabled="true"] %label,%[data-preview~="disabled"] %label': "color:[txtd];"
                }
            },
            "wysiwyg.viewer.skins.button.ButtonLiftedShadow": {
                react: [
                    ["div", null, ["_left", "_shd"], {}],
                    ["div", null, ["_right", "_shd"], {}],
                    ["a", "link", [], {},
                        ["span", "label", [], {}]
                    ]
                ],
                params: {
                    rd: "BORDER_RADIUS",
                    bg: "BG_COLOR_ALPHA",
                    trans1: "TRANSITION",
                    shd: "BOX_SHADOW",
                    brd: "BORDER_COLOR_ALPHA",
                    brw: "BORDER_SIZE",
                    fnt: "FONT",
                    trans2: "TRANSITION",
                    txt: "TEXT_COLOR",
                    tdr: "URL",
                    bgh: "BG_COLOR_ALPHA",
                    brdh: "BORDER_COLOR_ALPHA",
                    txth: "TEXT_COLOR",
                    bgd: "BG_COLOR_ALPHA",
                    brdd: "BORDER_COLOR_ALPHA",
                    txtd: "TEXT_COLOR"
                },
                paramsDefaults: {
                    rd: "0",
                    bg: "color_17",
                    trans1: "border-color 0.4s ease 0s, background-color 0.4s ease 0s",
                    shd: "0 1px 4px rgba(0, 0, 0, 0.6)",
                    brd: "color_15",
                    brw: "0",
                    fnt: "font_5",
                    trans2: "color 0.4s ease 0s",
                    txt: "color_15",
                    tdr: "BASE_THEME_DIRECTORY",
                    bgh: "color_18",
                    brdh: "color_15",
                    txth: "color_15",
                    bgd: "#CCCCCC",
                    brdd: "color_15",
                    txtd: "#FFFFFF"
                },
                css: {
                    "% button%link": "width:100%;",
                    '%[data-state~="shouldUseFlex"] %link,%[data-state~="shouldUseFlex"] %labelwrapper': "text-align:initial;display:flex;align-items:center;",
                    '%[data-state~="shouldUseFlex"][data-state~="center"] %link,%[data-state~="shouldUseFlex"][data-state~="center"] %labelwrapper': "justify-content:center;",
                    '%[data-state~="shouldUseFlex"][data-state~="left"] %link,%[data-state~="shouldUseFlex"][data-state~="left"] %labelwrapper': "justify-content:flex-start;",
                    '%[data-state~="shouldUseFlex"][data-state~="right"] %link,%[data-state~="shouldUseFlex"][data-state~="right"] %labelwrapper': "justify-content:flex-end;",
                    "%link": "[rd]  position:absolute;top:0;right:0;bottom:0;left:0;background-color:[bg];[trans1]  [shd]  border:solid [brd] [brw];",
                    "%label": "[fnt]  [trans2]  color:[txt];display:inline-block;margin:calc(-1 * [brw]) [brw] 0;position:relative;white-space:nowrap;",
                    "%_shd": "background:url([tdr]liftedshadow_medium.png) no-repeat;bottom:-26px;height:26px;position:absolute;width:165px;pointer-events:none;",
                    "%_left": "background-position:0 0;left:-20px;",
                    "%_right": "background-position:100% 0;right:-20px;",
                    '%[data-disabled="false"]': "cursor:pointer !important;",
                    '%[data-disabled="false"]:active[data-state~="mobile"] %link,%[data-disabled="false"]:hover[data-state~="desktop"] %link,%[data-disabled="false"][data-preview~="hover"] %link': "background-color:[bgh];border-color:[brdh];[trans1]",
                    '%[data-disabled="false"]:active[data-state~="mobile"] %label,%[data-disabled="false"]:hover[data-state~="desktop"] %label,%[data-disabled="false"][data-preview~="hover"] %label': "color:[txth];[trans2]",
                    '%[data-disabled="true"] %link,%[data-preview~="disabled"] %link': "background-color:[bgd];border:solid [brdd] [brw];",
                    '%[data-disabled="true"] %label,%[data-preview~="disabled"] %label': "color:[txtd];"
                }
            },
            "wysiwyg.viewer.skins.button.ButtonSandclock": {
                react: [
                    ["div", null, ["_wrapper"], {},
                        ["div", null, ["_container", "_top", "_left"], {},
                            ["div", null, ["_ribbon"], {}]
                        ],
                        ["div", null, ["_container", "_bottom", "_left"], {},
                            ["div", null, ["_ribbon"], {}]
                        ],
                        ["div", null, ["_container", "_top", "_right"], {},
                            ["div", null, ["_ribbon"], {}]
                        ],
                        ["div", null, ["_container", "_bottom", "_right"], {},
                            ["div", null, ["_ribbon"], {}]
                        ],
                        ["div", null, ["_filler"], {}]
                    ],
                    ["a", "link", [], {},
                        ["span", "label", [], {}]
                    ]
                ],
                params: {
                    bg: "BORDER_COLOR_ALPHA",
                    fnt: "FONT",
                    txt: "TEXT_COLOR",
                    txth: "TEXT_COLOR",
                    bgh: "BORDER_COLOR_ALPHA"
                },
                paramsDefaults: {
                    bg: "color_17",
                    fnt: "font_5",
                    txt: "color_15",
                    txth: "color_15",
                    bgh: "color_18"
                },
                css: {
                    "% button%link": "width:100%;",
                    '%[data-state~="shouldUseFlex"] %link,%[data-state~="shouldUseFlex"] %labelwrapper': "text-align:initial;display:flex;align-items:center;",
                    '%[data-state~="shouldUseFlex"][data-state~="center"] %link,%[data-state~="shouldUseFlex"][data-state~="center"] %labelwrapper': "justify-content:center;",
                    '%[data-state~="shouldUseFlex"][data-state~="left"] %link,%[data-state~="shouldUseFlex"][data-state~="left"] %labelwrapper': "justify-content:flex-start;",
                    '%[data-state~="shouldUseFlex"][data-state~="right"] %link,%[data-state~="shouldUseFlex"][data-state~="right"] %labelwrapper': "justify-content:flex-end;",
                    "%": "transform:rotate(360deg);",
                    "%_wrapper": "position:absolute;top:0;right:0;bottom:0;left:0;width:50%;",
                    "%_container": "position:absolute;height:50%;overflow:hidden;width:80%;",
                    "%_right": "left:120%;",
                    "%_bottom": "bottom:0;",
                    "%_ribbon": "position:absolute;width:0;height:0;border-style:solid;",
                    "%_right %_ribbon": "right:0;",
                    "%_top %_ribbon": "top:0;",
                    "%_bottom %_ribbon": "bottom:0;",
                    "%_top%_left %_ribbon": "border-color:transparent [bg] transparent transparent;border-width:0 500px 500px 0;",
                    "%_bottom%_left %_ribbon": "border-color:transparent transparent [bg] transparent;border-width:0 0 500px 500px;",
                    "%_top%_right %_ribbon": "border-color:[bg] transparent transparent transparent;border-width:500px 500px 0 0;",
                    "%_bottom%_right %_ribbon": "border-color:transparent transparent transparent [bg];border-width:500px 0 0 500px;",
                    "%_filler": "position:absolute;width:50%;background-color:[bg];width:40%;height:100%;left:80%;",
                    "%link": "position:absolute;top:0;right:0;bottom:0;left:0;overflow:hidden;height:100%;cursor:pointer !important;",
                    "%label": "[fnt]  color:[txt];white-space:nowrap;display:inline-block;position:relative;",
                    '%:active[data-state~="mobile"] %label,%:hover[data-state~="desktop"] %label,%[data-preview~="hover"] %label': "color:[txth];",
                    '%:active[data-state~="mobile"] %_top%_left %_ribbon,%:hover[data-state~="desktop"] %_top%_left %_ribbon,%[data-preview~="hover"] %_top%_left %_ribbon': "border-right-color:[bgh];",
                    '%:active[data-state~="mobile"] %_bottom%_left %_ribbon,%:hover[data-state~="desktop"] %_bottom%_left %_ribbon,%[data-preview~="hover"] %_bottom%_left %_ribbon': "border-bottom-color:[bgh];",
                    '%:active[data-state~="mobile"] %_top%_right %_ribbon,%:hover[data-state~="desktop"] %_top%_right %_ribbon,%[data-preview~="hover"] %_top%_right %_ribbon': "border-top-color:[bgh];",
                    '%:active[data-state~="mobile"] %_bottom%_right %_ribbon,%:hover[data-state~="desktop"] %_bottom%_right %_ribbon,%[data-preview~="hover"] %_bottom%_right %_ribbon': "border-left-color:[bgh];",
                    '%:active[data-state~="mobile"] %_filler,%:hover[data-state~="desktop"] %_filler,%[data-preview~="hover"] %_filler': "background-color:[bgh];"
                }
            },
            "wysiwyg.viewer.skins.button.ButtonShadowLeft": {
                react: [
                    ["div", null, ["_shd"], {}],
                    ["a", "link", [], {},
                        ["span", "label", [], {}]
                    ]
                ],
                params: {
                    rd: "BORDER_RADIUS",
                    bg: "BG_COLOR_ALPHA",
                    trans1: "TRANSITION",
                    shd: "BOX_SHADOW",
                    brd: "BORDER_COLOR_ALPHA",
                    brw: "BORDER_SIZE",
                    fnt: "FONT",
                    trans2: "TRANSITION",
                    txt: "TEXT_COLOR",
                    tdr: "URL",
                    bgh: "BG_COLOR_ALPHA",
                    brdh: "BORDER_COLOR_ALPHA",
                    txth: "TEXT_COLOR",
                    bgd: "BG_COLOR_ALPHA",
                    brdd: "BORDER_COLOR_ALPHA",
                    txtd: "TEXT_COLOR"
                },
                paramsDefaults: {
                    rd: "0",
                    bg: "color_17",
                    trans1: "border-color 0.4s ease 0s, background-color 0.4s ease 0s",
                    shd: "0 1px 4px rgba(0, 0, 0, 0.6)",
                    brd: "color_15",
                    brw: "0",
                    fnt: "font_5",
                    trans2: "color 0.4s ease 0s",
                    txt: "color_15",
                    tdr: "BASE_THEME_DIRECTORY",
                    bgh: "color_18",
                    brdh: "color_15",
                    txth: "color_15",
                    bgd: "#CCCCCC",
                    brdd: "color_15",
                    txtd: "#FFFFFF"
                },
                css: {
                    "% button%link": "width:100%;",
                    '%[data-state~="shouldUseFlex"] %link,%[data-state~="shouldUseFlex"] %labelwrapper': "text-align:initial;display:flex;align-items:center;",
                    '%[data-state~="shouldUseFlex"][data-state~="center"] %link,%[data-state~="shouldUseFlex"][data-state~="center"] %labelwrapper': "justify-content:center;",
                    '%[data-state~="shouldUseFlex"][data-state~="left"] %link,%[data-state~="shouldUseFlex"][data-state~="left"] %labelwrapper': "justify-content:flex-start;",
                    '%[data-state~="shouldUseFlex"][data-state~="right"] %link,%[data-state~="shouldUseFlex"][data-state~="right"] %labelwrapper': "justify-content:flex-end;",
                    "%link": "[rd]  position:absolute;top:0;right:0;bottom:0;left:0;background-color:[bg];[trans1]  [shd]  border:solid [brd] [brw];",
                    "%label": "[fnt]  [trans2]  color:[txt];display:inline-block;margin:calc(-1 * [brw]) [brw] 0;position:relative;white-space:nowrap;",
                    "%_shd": "background:url([tdr]liftedshadow_medium.png) no-repeat 0 0;bottom:-26px;height:26px;left:-20px;position:absolute;width:165px;",
                    '%[data-disabled="false"]': "cursor:pointer !important;",
                    '%[data-disabled="false"]:active[data-state~="mobile"] %link,%[data-disabled="false"]:hover[data-state~="desktop"] %link,%[data-disabled="false"][data-preview~="hover"] %link': "background-color:[bgh];border:solid [brdh] [brw];[trans1]",
                    '%[data-disabled="false"]:active[data-state~="mobile"] %label,%[data-disabled="false"]:hover[data-state~="desktop"] %label,%[data-disabled="false"][data-preview~="hover"] %label': "color:[txth];[trans2]",
                    '%[data-disabled="true"] %link,%[data-preview~="disabled"] %link': "background-color:[bgd];border:solid [brdd] [brw];",
                    '%[data-disabled="true"] %label,%[data-preview~="disabled"] %label': "color:[txtd];"
                }
            },
            "wysiwyg.viewer.skins.button.ButtonShadowRight": {
                react: [
                    ["div", null, ["_shd"], {}],
                    ["a", "link", [], {},
                        ["span", "label", [], {}]
                    ]
                ],
                params: {
                    rd: "BORDER_RADIUS",
                    bg: "BG_COLOR_ALPHA",
                    trans1: "TRANSITION",
                    shd: "BOX_SHADOW",
                    brd: "BORDER_COLOR_ALPHA",
                    brw: "BORDER_SIZE",
                    fnt: "FONT",
                    trans2: "TRANSITION",
                    txt: "TEXT_COLOR",
                    tdr: "URL",
                    bgh: "BG_COLOR_ALPHA",
                    brdh: "BORDER_COLOR_ALPHA",
                    txth: "TEXT_COLOR",
                    bgd: "BG_COLOR_ALPHA",
                    brdd: "BORDER_COLOR_ALPHA",
                    txtd: "TEXT_COLOR"
                },
                paramsDefaults: {
                    rd: "0",
                    bg: "color_17",
                    trans1: "border-color 0.4s ease 0s, background-color 0.4s ease 0s",
                    shd: "0 1px 4px rgba(0, 0, 0, 0.6)",
                    brd: "color_15",
                    brw: "0",
                    fnt: "font_5",
                    trans2: "color 0.4s ease 0s",
                    txt: "color_15",
                    tdr: "BASE_THEME_DIRECTORY",
                    bgh: "color_18",
                    brdh: "color_15",
                    txth: "color_15",
                    bgd: "#CCCCCC",
                    brdd: "color_15",
                    txtd: "#FFFFFF"
                },
                css: {
                    "% button%link": "width:100%;",
                    '%[data-state~="shouldUseFlex"] %link,%[data-state~="shouldUseFlex"] %labelwrapper': "text-align:initial;display:flex;align-items:center;",
                    '%[data-state~="shouldUseFlex"][data-state~="center"] %link,%[data-state~="shouldUseFlex"][data-state~="center"] %labelwrapper': "justify-content:center;",
                    '%[data-state~="shouldUseFlex"][data-state~="left"] %link,%[data-state~="shouldUseFlex"][data-state~="left"] %labelwrapper': "justify-content:flex-start;",
                    '%[data-state~="shouldUseFlex"][data-state~="right"] %link,%[data-state~="shouldUseFlex"][data-state~="right"] %labelwrapper': "justify-content:flex-end;",
                    "%link": "[rd]  position:absolute;top:0;right:0;bottom:0;left:0;background-color:[bg];[trans1]  [shd]  border:solid [brd] [brw];",
                    "%label": "[fnt]  [trans2]  color:[txt];display:inline-block;margin:calc(-1 * [brw]) [brw] 0;position:relative;white-space:nowrap;",
                    "%_shd": "background:url([tdr]liftedshadow_medium.png) no-repeat 100% 0;bottom:-26px;height:26px;position:absolute;right:-20px;width:165px;",
                    '%[data-disabled="false"]': "cursor:pointer !important;",
                    '%[data-disabled="false"]:active[data-state~="mobile"] %link,%[data-disabled="false"]:hover[data-state~="desktop"] %link,%[data-disabled="false"][data-preview~="hover"] %link': "background-color:[bgh];border:solid [brdh] [brw];[trans1]",
                    '%[data-disabled="false"]:active[data-state~="mobile"] %label,%[data-disabled="false"]:hover[data-state~="desktop"] %label,%[data-disabled="false"][data-preview~="hover"] %label': "color:[txth];[trans2]",
                    '%[data-disabled="true"] %link,%[data-preview~="disabled"] %link': "background-color:[bgd];border:solid [brdd] [brw];",
                    '%[data-disabled="true"] %label,%[data-preview~="disabled"] %label': "color:[txtd];"
                }
            },
            "wysiwyg.viewer.skins.button.ButtonThreeD": {
                react: [
                    ["a", "link", [], {},
                        ["span", "label", [], {}]
                    ]
                ],
                params: {
                    rd: "BORDER_RADIUS",
                    bg: "BG_COLOR_ALPHA",
                    brd: "BORDER_COLOR_ALPHA",
                    brw: "BORDER_SIZE",
                    trans: "TRANSITION",
                    fnt: "FONT",
                    txt: "TEXT_COLOR",
                    bgh: "BG_COLOR_ALPHA",
                    brdh: "BORDER_COLOR_ALPHA",
                    txth: "TEXT_COLOR",
                    bgd: "BG_COLOR_ALPHA",
                    brdd: "BORDER_COLOR_ALPHA",
                    txtd: "TEXT_COLOR",
                    shc: "COLOR"
                },
                paramsDefaults: {
                    rd: "5px",
                    bg: "color_17",
                    brd: "color_15",
                    brw: "0",
                    trans: "all 0.12s ease 0s",
                    fnt: "font_5",
                    txt: "color_15",
                    bgh: "color_18",
                    brdh: "color_15",
                    txth: "color_15",
                    bgd: "#CCCCCC",
                    brdd: "color_15",
                    txtd: "#FFFFFF",
                    shc: ["bg"]
                },
                paramsMutators: {
                    shc: {
                        type: "brightness",
                        value: .5,
                        param: "bg"
                    }
                },
                css: {
                    "% button%link": "width:100%;",
                    '%[data-state~="shouldUseFlex"] %link,%[data-state~="shouldUseFlex"] %labelwrapper': "text-align:initial;display:flex;align-items:center;",
                    '%[data-state~="shouldUseFlex"][data-state~="center"] %link,%[data-state~="shouldUseFlex"][data-state~="center"] %labelwrapper': "justify-content:center;",
                    '%[data-state~="shouldUseFlex"][data-state~="left"] %link,%[data-state~="shouldUseFlex"][data-state~="left"] %labelwrapper': "justify-content:flex-start;",
                    '%[data-state~="shouldUseFlex"][data-state~="right"] %link,%[data-state~="shouldUseFlex"][data-state~="right"] %labelwrapper': "justify-content:flex-end;",
                    "%link": "[rd]  position:absolute;top:0;right:0;bottom:0;left:0;background-color:[bg];border:solid [brd] [brw];box-shadow:1px 1px [shc], 3px 3px [shc], 5px 5px [shc], 7px 7px [shc], 9px 9px [shc];[trans]",
                    "%label": "[fnt]  [trans]  color:[txt];display:inline-block;margin-top:calc(-1 * [brw]);position:relative;white-space:nowrap;",
                    '%[data-state~="shouldUseFlex"] %label': "margin-top:0;",
                    '%[data-disabled="false"]': "cursor:pointer !important;",
                    '%[data-disabled="false"]:active[data-state~="mobile"] %link,%[data-disabled="false"]:hover[data-state~="desktop"] %link,%[data-disabled="false"][data-preview~="hover"] %link': "background-color:[bgh];border:solid [brdh] [brw];bottom:-9px;box-shadow:0 0 [shc];left:9px;right:-9px;top:9px;",
                    '%[data-disabled="false"]:active[data-state~="mobile"] %label,%[data-disabled="false"]:hover[data-state~="desktop"] %label,%[data-disabled="false"][data-preview~="hover"] %label': "color:[txth];",
                    '%[data-disabled="true"] %link,%[data-preview~="disabled"] %link': "background-color:[bgd];border:solid [brdd] [brw];",
                    '%[data-disabled="true"] %label,%[data-preview~="disabled"] %label': "color:[txtd];"
                }
            },
            "wysiwyg.viewer.skins.button.CircleButton": {
                react: [
                    ["a", "link", [], {},
                        ["span", "label", [], {}]
                    ]
                ],
                params: {
                    bg: "BG_COLOR_ALPHA",
                    trans1: "TRANSITION",
                    shd: "BOX_SHADOW",
                    brd: "BORDER_COLOR_ALPHA",
                    brw: "BORDER_SIZE",
                    rd: "BORDER_RADIUS",
                    fnt: "FONT",
                    trans2: "TRANSITION",
                    txt: "TEXT_COLOR",
                    bgh: "BG_COLOR_ALPHA",
                    brdh: "BORDER_COLOR_ALPHA",
                    txth: "TEXT_COLOR",
                    bgd: "BG_COLOR_ALPHA",
                    brdd: "BORDER_COLOR_ALPHA",
                    txtd: "TEXT_COLOR",
                    s: "SIZE"
                },
                paramsDefaults: {
                    bg: "color_17",
                    trans1: "border 0.4s ease 0s, background-color 0.4s ease 0s",
                    shd: "0 1px 4px rgba(0, 0, 0, 0.6)",
                    brd: "color_15",
                    brw: "0",
                    rd: "50%",
                    fnt: "font_5",
                    trans2: "color 0.4s ease 0s",
                    txt: "color_15",
                    bgh: "color_18",
                    brdh: "color_15",
                    txth: "color_15",
                    bgd: "#CCCCCC",
                    brdd: "color_15",
                    txtd: "#FFFFFF",
                    s: ["brw"]
                },
                paramsMutators: {
                    s: {
                        type: "decrease",
                        value: 5,
                        param: "brw"
                    }
                },
                css: {
                    "% button%link": "width:100%;",
                    '%[data-state~="shouldUseFlex"] %link,%[data-state~="shouldUseFlex"] %labelwrapper': "text-align:initial;display:flex;align-items:center;",
                    '%[data-state~="shouldUseFlex"][data-state~="center"] %link,%[data-state~="shouldUseFlex"][data-state~="center"] %labelwrapper': "justify-content:center;",
                    '%[data-state~="shouldUseFlex"][data-state~="left"] %link,%[data-state~="shouldUseFlex"][data-state~="left"] %labelwrapper': "justify-content:flex-start;",
                    '%[data-state~="shouldUseFlex"][data-state~="right"] %link,%[data-state~="shouldUseFlex"][data-state~="right"] %labelwrapper': "justify-content:flex-end;",
                    "%link": "position:absolute;top:0;right:0;bottom:0;left:0;background-color:[bg];[trans1]  [shd]  border:solid [brd] [brw];[rd]",
                    "%label": "[fnt]  [trans2]  color:[txt];display:inline-block;margin:calc(-1 * [brw]) [brw] 0;position:relative;white-space:nowrap;",
                    '%[data-disabled="false"]': "cursor:pointer !important;",
                    '%[data-disabled="false"]:active[data-state~="mobile"] %link,%[data-disabled="false"]:hover[data-state~="desktop"] %link,%[data-disabled="false"][data-preview~="hover"] %link': "background-color:[bgh];border:solid [brdh] [s];[trans1]",
                    '%[data-disabled="false"]:active[data-state~="mobile"] %label,%[data-disabled="false"]:hover[data-state~="desktop"] %label,%[data-disabled="false"][data-preview~="hover"] %label': "color:[txth];[trans2]",
                    '%[data-disabled="true"] %link,%[data-preview~="disabled"] %link': "background-color:[bgd];border:solid [brdd] [brw];",
                    '%[data-disabled="true"] %label,%[data-preview~="disabled"] %label': "color:[txtd];"
                }
            },
            "wysiwyg.viewer.skins.button.DisabledLayerButton": {
                react: [
                    ["a", "link", [], {},
                        ["span", "label", [], {}]
                    ]
                ],
                params: {
                    rd: "BORDER_RADIUS",
                    bg: "BG_COLOR_ALPHA",
                    trans1: "TRANSITION",
                    shd: "BOX_SHADOW",
                    brd: "BORDER_COLOR_ALPHA",
                    brw: "BORDER_SIZE",
                    fnt: "FONT",
                    trans2: "TRANSITION",
                    txt: "TEXT_COLOR"
                },
                paramsDefaults: {
                    rd: "0",
                    bg: "color_17",
                    trans1: "border-color 0.4s ease 0s, background-color 0.4s ease 0s",
                    shd: "0 1px 4px rgba(0, 0, 0, 0.6)",
                    brd: "color_15",
                    brw: "0",
                    fnt: "font_5",
                    trans2: "color 0.4s ease 0s",
                    txt: "color_15"
                },
                css: {
                    "% button%link": "width:100%;",
                    '%[data-state~="shouldUseFlex"] %link,%[data-state~="shouldUseFlex"] %labelwrapper': "text-align:initial;display:flex;align-items:center;",
                    '%[data-state~="shouldUseFlex"][data-state~="center"] %link,%[data-state~="shouldUseFlex"][data-state~="center"] %labelwrapper': "justify-content:center;",
                    '%[data-state~="shouldUseFlex"][data-state~="left"] %link,%[data-state~="shouldUseFlex"][data-state~="left"] %labelwrapper': "justify-content:flex-start;",
                    '%[data-state~="shouldUseFlex"][data-state~="right"] %link,%[data-state~="shouldUseFlex"][data-state~="right"] %labelwrapper': "justify-content:flex-end;",
                    "%link": "[rd]  position:absolute;top:0;right:0;bottom:0;left:0;background-color:[bg];[trans1]  [shd]  border:solid [brd] [brw];cursor:pointer !important;",
                    "%label": "[fnt]  [trans2]  color:[txt];white-space:nowrap;margin:1px [brw] 0 [brw];display:inline-block;position:relative;",
                    '%:active[data-state~="mobile"] %link,%:hover[data-state~="desktop"] %link,%[data-preview~="hover"] %link': "[trans1]",
                    '%:active[data-state~="mobile"] %label,%:hover[data-state~="desktop"] %label,%[data-preview~="hover"] %label': "[trans2]",
                    '%[data-disabled~="disabled"] %link': "opacity:0.5;cursor:not-allowed !important;"
                }
            },
            "wysiwyg.viewer.skins.button.EcomFeedbackCheckoutButton": {
                react: [
                    ["a", "link", [], {},
                        ["span", "label", [], {}]
                    ]
                ],
                params: {
                    rd: "BORDER_RADIUS",
                    bg: "BG_COLOR_ALPHA",
                    trans1: "TRANSITION",
                    brd: "BORDER_COLOR",
                    brw: "BORDER_SIZE",
                    fnt: "FONT",
                    trans2: "TRANSITION",
                    txt: "TEXT_COLOR",
                    bgh: "BG_COLOR_ALPHA",
                    brdh: "BORDER_COLOR",
                    txth: "TEXT_COLOR"
                },
                paramsDefaults: {
                    rd: "0",
                    bg: "color_15",
                    trans1: "border-color 0.4s ease 0s, background-color 0.4s ease 0s",
                    brd: "color_15",
                    brw: "0",
                    fnt: "font_8",
                    trans2: "color 0.4s ease 0s",
                    txt: "color_11",
                    bgh: "color_14",
                    brdh: "color_14",
                    txth: "color_11"
                },
                css: {
                    "%link": "[rd]  position:absolute;top:0;right:0;bottom:0;left:0;background-color:[bg];[trans1]  border:solid [brd] [brw];cursor:pointer !important;",
                    "%label": "[fnt]  [trans2]  color:[txt];white-space:nowrap;margin:calc(-1 * [brw]) [brw] 0 [brw];display:inline-block;position:relative;",
                    "%:hover %link": "background-color:[bgh];border-color:[brdh];[trans1]",
                    "%:hover %label": "color:[txth];[trans2]"
                }
            },
            "wysiwyg.viewer.skins.button.EcomFeedbackContinueShopping": {
                react: [
                    ["a", "link", [], {},
                        ["span", "label", [], {}]
                    ]
                ],
                params: {
                    rd: "BORDER_RADIUS",
                    bg: "BG_COLOR_ALPHA",
                    trans1: "TRANSITION",
                    brd: "BORDER_COLOR",
                    brw: "BORDER_SIZE",
                    fnt: "FONT",
                    trans2: "TRANSITION",
                    txt: "TEXT_COLOR",
                    bgh: "BG_COLOR_ALPHA",
                    brdh: "BORDER_COLOR",
                    txth: "TEXT_COLOR"
                },
                paramsDefaults: {
                    rd: "0",
                    bg: "color_14",
                    trans1: "border-color 0.4s ease 0s, background-color 0.4s ease 0s",
                    brd: "color_14",
                    brw: "0",
                    fnt: "font_8",
                    trans2: "color 0.4s ease 0s",
                    txt: "color_11",
                    bgh: "color_13",
                    brdh: "color_13",
                    txth: "color_11"
                },
                css: {
                    "%link": "[rd]  position:absolute;top:0;right:0;bottom:0;left:0;background-color:[bg];[trans1]  border:solid [brd] [brw];cursor:pointer !important;",
                    "%label": "[fnt]  [trans2]  color:[txt];white-space:nowrap;margin:calc(-1 * [brw]) [brw] 0 [brw];display:inline-block;position:relative;",
                    "%:hover %link": "background-color:[bgh];border-color:[brdh];[trans1]",
                    "%:hover %label": "color:[txth];[trans2]"
                }
            },
            "wysiwyg.viewer.skins.button.EcomFeedbackContinueShopping2": {
                react: [
                    ["a", "link", [], {},
                        ["span", "label", [], {}]
                    ]
                ],
                params: {
                    rd: "BORDER_RADIUS",
                    bg: "BG_COLOR_ALPHA",
                    trans1: "TRANSITION",
                    brd: "BORDER_COLOR",
                    brw: "BORDER_SIZE",
                    fnt: "FONT",
                    trans2: "TRANSITION",
                    txt: "TEXT_COLOR",
                    bgh: "BG_COLOR_ALPHA",
                    brdh: "BORDER_COLOR",
                    txth: "TEXT_COLOR"
                },
                paramsDefaults: {
                    rd: "0",
                    bg: "color_11",
                    trans1: "border-color 0.4s ease 0s, background-color 0.4s ease 0s",
                    brd: "color_11",
                    brw: "0",
                    fnt: "font_8",
                    trans2: "color 0.4s ease 0s",
                    txt: "color_15",
                    bgh: "color_11",
                    brdh: "color_11",
                    txth: "color_14"
                },
                css: {
                    "%link": "[rd]  position:absolute;top:0;right:0;bottom:0;left:0;background-color:[bg];[trans1]  border:solid [brd] [brw];cursor:pointer !important;",
                    "%label": "[fnt]  [trans2]  color:[txt];white-space:nowrap;margin:calc(-1 * [brw]) [brw] 0 [brw];display:inline-block;position:relative;",
                    "%:hover %link": "background-color:[bgh];border-color:[brdh];[trans1]",
                    "%:hover %label": "color:[txth];[trans2]"
                }
            },
            "wysiwyg.viewer.skins.button.FixedFontButton": {
                react: [
                    ["a", "link", [], {},
                        ["span", "label", [], {}]
                    ]
                ],
                params: {
                    bg: "BG_COLOR_ALPHA",
                    rd: "BORDER_RADIUS",
                    txt: "TEXT_COLOR",
                    brd: "BORDER_COLOR",
                    brw: "BORDER_SIZE",
                    txth: "TEXT_COLOR",
                    brdh: "BORDER_COLOR",
                    bgh: "BG_COLOR_ALPHA",
                    trans: "TRANSITION"
                },
                paramsDefaults: {
                    bg: "#ffffff",
                    rd: "0",
                    txt: "#000000",
                    brd: "#000000",
                    brw: "0",
                    txth: "#000000",
                    brdh: "#000000",
                    bgh: "#ffffff",
                    trans: "color 0.4s ease 0s, border-color 0.4s ease 0s, background-color 0.4s ease 0s"
                },
                css: {
                    "% button%link": "width:100%;",
                    '%[data-state~="shouldUseFlex"] %link,%[data-state~="shouldUseFlex"] %labelwrapper': "text-align:initial;display:flex;align-items:center;",
                    '%[data-state~="shouldUseFlex"][data-state~="center"] %link,%[data-state~="shouldUseFlex"][data-state~="center"] %labelwrapper': "justify-content:center;",
                    '%[data-state~="shouldUseFlex"][data-state~="left"] %link,%[data-state~="shouldUseFlex"][data-state~="left"] %labelwrapper': "justify-content:flex-start;",
                    '%[data-state~="shouldUseFlex"][data-state~="right"] %link,%[data-state~="shouldUseFlex"][data-state~="right"] %labelwrapper': "justify-content:flex-end;",
                    "%link": "position:absolute;top:0;right:0;bottom:0;left:0;background-color:[bg];[rd]  color:[txt];border:solid [brd] [brw];cursor:pointer !important;",
                    "%label": "display:block;margin:-10px 0 0 -10px;text-align:center;width:20px;height:20px;line-height:20px;position:absolute;top:50%;left:50%;white-space:nowrap;font-size:12px !important;font-family:Arial;",
                    '%:active[data-state~="mobile"] %link,%:hover[data-state~="desktop"] %link,%[data-preview~="hover"] %link': "color:[txth];border-color:[brdh];background-color:[bgh];[trans]",
                    '%:active[data-state~="mobile"] %label,%:hover[data-state~="desktop"] %label,%[data-preview~="hover"] %label': "color:[txth];[trans]",
                    "%_justx": "width:20px;height:20px;",
                    "%_justx %link": "font-size:16px !important;",
                    "%_circle": "width:20px;height:20px;",
                    "%_circle %link": "border-radius:50% !important;"
                }
            },
            "wysiwyg.viewer.skins.button.GamingButton": {
                react: [
                    ["a", "link", [], {},
                        ["span", null, ["_left"], {}],
                        ["span", null, ["_right"], {}],
                        ["span", "label", [], {}],
                        ["div", null, ["_shineOnYouCrazyDiamond"], {}]
                    ]
                ],
                params: {
                    bgh: "BG_COLOR_ALPHA",
                    trans1: "TRANSITION",
                    txth: "TEXT_COLOR",
                    rd: "BORDER_RADIUS",
                    tdr: "URL",
                    bg: "BG_COLOR_ALPHA",
                    fnt: "FONT",
                    txt: "TEXT_COLOR",
                    bgd: "BG_COLOR_ALPHA",
                    txtd: "TEXT_COLOR"
                },
                paramsDefaults: {
                    bgh: "color_18",
                    trans1: "background-color 0.4s ease 0s",
                    txth: "color_15",
                    rd: "12px",
                    tdr: "BASE_THEME_DIRECTORY",
                    bg: "color_17",
                    fnt: "font_6",
                    txt: "color_15",
                    bgd: "#CCCCCC",
                    txtd: "#FFFFFF"
                },
                css: {
                    "% button%link": "width:100%;",
                    '%[data-state~="shouldUseFlex"] %link,%[data-state~="shouldUseFlex"] %labelwrapper': "text-align:initial;display:flex;align-items:center;",
                    '%[data-state~="shouldUseFlex"][data-state~="center"] %link,%[data-state~="shouldUseFlex"][data-state~="center"] %labelwrapper': "justify-content:center;",
                    '%[data-state~="shouldUseFlex"][data-state~="left"] %link,%[data-state~="shouldUseFlex"][data-state~="left"] %labelwrapper': "justify-content:flex-start;",
                    '%[data-state~="shouldUseFlex"][data-state~="right"] %link,%[data-state~="shouldUseFlex"][data-state~="right"] %labelwrapper': "justify-content:flex-end;",
                    '%[data-disabled="false"]': "overflow:visible !important;cursor:pointer !important;",
                    '%[data-disabled="false"]:active[data-state~="mobile"] %link,%[data-disabled="false"]:hover[data-state~="desktop"] %link,%[data-disabled="false"][data-preview~="hover"] %link': "background-color:[bgh];[trans1]",
                    '%[data-disabled="false"]:active[data-state~="mobile"] %label,%[data-disabled="false"]:hover[data-state~="desktop"] %label,%[data-disabled="false"][data-preview~="hover"] %label': "color:[txth];",
                    "%link": "position:absolute;top:0;right:0;bottom:0;left:0;[rd]  [trans1]  background:url([tdr]gaming_pattern.png) repeat 0 0;background-color:[bg];border:solid #000 2px;box-shadow:rgba(255, 255, 255, 0.3) 0 3px 6px 0 inset, rgba(0, 0, 0, 0.6) -2px -3px 6px 0 inset, rgba(0, 0, 0, 0.6) 1px 1px 6px 1px, rgba(255, 255, 255, 0.3) 1px 1px 3px 0;width:100%;",
                    "%_left,%_right": "background-position:0 center;background-repeat:no-repeat;height:100%;position:absolute;width:66px;",
                    "%_left": "background-image:url([tdr]darknessleft.png);border-radius:10px 0 0 10px;left:0;",
                    "%_right": "background-image:url([tdr]darknessright.png);border-radius:0 10px 10px 0;right:0;",
                    "%label": "[fnt]  color:[txt];display:inline-block;margin-top:-1px;position:relative;white-space:nowrap;",
                    "%_shineOnYouCrazyDiamond": "bottom:50%;top:0;left:0;background:url([tdr]whitegradient.png) repeat-x 0 100%;overflow:hidden;border-radius:12px 12px 0 0;width:100%;content:'';position:absolute;",
                    '%[data-disabled="true"] %link,%[data-preview~="disabled"] %link': "background-color:[bgd];",
                    '%[data-disabled="true"] %label,%[data-preview~="disabled"] %label': "color:[txtd];"
                }
            },
            "wysiwyg.viewer.skins.button.IronButton": {
                react: [
                    ["a", "link", [], {},
                        ["div", null, ["_glow"], {}],
                        ["div", null, ["_screw-tl", "_screw"], {}],
                        ["div", null, ["_screw-tr", "_screw"], {}],
                        ["div", null, ["_screw-bt", "_screw"], {}],
                        ["div", null, ["_screw-br", "_screw"], {}],
                        ["span", "label", [], {}]
                    ]
                ],
                params: {
                    rd: "BORDER_RADIUS",
                    bg: "BG_COLOR_ALPHA",
                    trans1: "TRANSITION",
                    shd: "BOX_SHADOW",
                    tdr: "URL",
                    txt: "TEXT_COLOR",
                    ishd: "BOX_SHADOW",
                    fnt: "FONT",
                    bgh: "BG_COLOR_ALPHA",
                    txth: "TEXT_COLOR",
                    bgd: "BG_COLOR_ALPHA",
                    txtd: "TEXT_COLOR"
                },
                paramsDefaults: {
                    rd: "2",
                    bg: "color_17",
                    trans1: "border-color 0.4s ease 0s, background-color 0.4s ease 0s, color 0.4s ease 0s",
                    shd: "0 2px 5px rgba(0, 0, 0, 0.53)",
                    tdr: "BASE_THEME_DIRECTORY",
                    txt: "color_15",
                    ishd: "rgba(255, 255, 255, 0.59) 0 0 6px 0 inset, rgba(255, 255, 255, 0.92) 0 1px 0 0 inset, rgba(255, 255, 255, 0.2) 0 0 5px 0 inset",
                    fnt: "font_5",
                    bgh: "color_17",
                    txth: "color_15",
                    bgd: "#CCCCCC",
                    txtd: "#FFFFFF"
                },
                css: {
                    "% button%link": "width:100%;",
                    '%[data-state~="shouldUseFlex"] %link,%[data-state~="shouldUseFlex"] %labelwrapper': "text-align:initial;display:flex;align-items:center;",
                    '%[data-state~="shouldUseFlex"][data-state~="center"] %link,%[data-state~="shouldUseFlex"][data-state~="center"] %labelwrapper': "justify-content:center;",
                    '%[data-state~="shouldUseFlex"][data-state~="left"] %link,%[data-state~="shouldUseFlex"][data-state~="left"] %labelwrapper': "justify-content:flex-start;",
                    '%[data-state~="shouldUseFlex"][data-state~="right"] %link,%[data-state~="shouldUseFlex"][data-state~="right"] %labelwrapper': "justify-content:flex-end;",
                    "%link": "[rd]  position:absolute;top:0;right:0;bottom:0;left:0;background-color:[bg];[trans1]  [shd]  background-image:url([tdr]ironpatern.png);color:[txt];",
                    "%_glow": "position:absolute;top:0;right:0;bottom:0;left:0;[ishd]  [rd]",
                    "%label": "[fnt]  [trans1]  color:[txt];display:inline-block;position:relative;white-space:nowrap;",
                    "%_screw": "width:15px;height:15px;background-image:url([tdr]skrew.png);background-repeat:no-repeat;display:inline-block;",
                    "%_screw-tl,%_screw-tr,%_screw-bt,%_screw-br": "position:absolute;",
                    "%_screw-tl": "left:2px;top:2px;",
                    "%_screw-tr": "right:2px;top:2px;",
                    "%_screw-bt": "bottom:2px;left:2px;",
                    "%_screw-br": "bottom:2px;right:2px;",
                    '%[data-disabled="false"]': "cursor:pointer !important;",
                    '%[data-disabled="false"]:active[data-state~="mobile"] %link,%[data-disabled="false"]:hover[data-state~="desktop"] %link,%[data-disabled="false"][data-preview~="hover"] %link': "background-color:[bgh];",
                    '%[data-disabled="false"]:active[data-state~="mobile"] %label,%[data-disabled="false"]:hover[data-state~="desktop"] %label,%[data-disabled="false"][data-preview~="hover"] %label': "color:[txth];",
                    '%[data-disabled="true"] %link,%[data-preview~="disabled"] %link': "background-color:[bgd];",
                    '%[data-disabled="true"] %label,%[data-preview~="disabled"] %label': "color:[txtd];"
                }
            },
            "wysiwyg.viewer.skins.button.PillButton": {
                react: [
                    ["a", "link", ["_lnk"], {},
                        ["span", "label", [], {}]
                    ]
                ],
                params: {
                    bg: "BG_COLOR_ALPHA",
                    rd: "BORDER_RADIUS",
                    xxx: "BG_COLOR_ALPHA",
                    tdr: "URL",
                    fnt: "FONT",
                    txt: "TEXT_COLOR",
                    bgh: "BG_COLOR_ALPHA",
                    txth: "TEXT_COLOR"
                },
                paramsDefaults: {
                    bg: "color_1",
                    rd: "80px",
                    xxx: "color_1",
                    tdr: "BASE_THEME_DIRECTORY",
                    fnt: "font_5",
                    txt: "color_5",
                    bgh: "color_2",
                    txth: "color_6"
                },
                css: {
                    "% button%link": "width:100%;",
                    '%[data-state~="shouldUseFlex"] %link,%[data-state~="shouldUseFlex"] %labelwrapper': "text-align:initial;display:flex;align-items:center;",
                    '%[data-state~="shouldUseFlex"][data-state~="center"] %link,%[data-state~="shouldUseFlex"][data-state~="center"] %labelwrapper': "justify-content:center;",
                    '%[data-state~="shouldUseFlex"][data-state~="left"] %link,%[data-state~="shouldUseFlex"][data-state~="left"] %labelwrapper': "justify-content:flex-start;",
                    '%[data-state~="shouldUseFlex"][data-state~="right"] %link,%[data-state~="shouldUseFlex"][data-state~="right"] %labelwrapper': "justify-content:flex-end;",
                    "%link": "position:absolute;top:0;right:0;bottom:0;left:0;background-color:[bg];[rd]  background:[xxx] url([tdr]net.png) center center repeat;",
                    "%label": "[fnt]  color:[txt];white-space:nowrap;padding:0 10px;",
                    '%:active[data-state~="mobile"] %link,%:hover[data-state~="desktop"] %link,%[data-preview~="hover"] %link': "background-color:[bgh];",
                    '%:active[data-state~="mobile"] %label,%:hover[data-state~="desktop"] %label,%[data-preview~="hover"] %label': "color:[txth];"
                }
            },
            "wysiwyg.viewer.skins.button.PlasticButton": {
                react: [
                    ["div", null, ["_pose", "_mainColor"], {}],
                    ["div", null, ["_pose", "_grd1"], {}],
                    ["div", null, ["_pose", "_topper"], {}],
                    ["a", "link", [], {},
                        ["span", "label", [], {}]
                    ],
                    ["div", null, ["_pose", "_bord"], {}]
                ],
                exports: {
                    _maxWidth: 400,
                    _maxHeight: 400
                },
                params: {
                    txt: "TEXT_COLOR",
                    fnt: "FONT",
                    txth: "TEXT_COLOR",
                    bgh: "BG_COLOR_ALPHA",
                    rd: "BORDER_RADIUS",
                    bg: "BG_COLOR_ALPHA",
                    xxx: "BG_COLOR_ALPHA",
                    tdr: "URL"
                },
                paramsDefaults: {
                    txt: "color_5",
                    fnt: "font_5",
                    txth: "color_6",
                    bgh: "color_2",
                    rd: "15px",
                    bg: "color_1",
                    xxx: "color_1",
                    tdr: "BASE_THEME_DIRECTORY"
                },
                css: {
                    "% button%link": "width:100%;",
                    '%[data-state~="shouldUseFlex"] %link,%[data-state~="shouldUseFlex"] %labelwrapper': "text-align:initial;display:flex;align-items:center;",
                    '%[data-state~="shouldUseFlex"][data-state~="center"] %link,%[data-state~="shouldUseFlex"][data-state~="center"] %labelwrapper': "justify-content:center;",
                    '%[data-state~="shouldUseFlex"][data-state~="left"] %link,%[data-state~="shouldUseFlex"][data-state~="left"] %labelwrapper': "justify-content:flex-start;",
                    '%[data-state~="shouldUseFlex"][data-state~="right"] %link,%[data-state~="shouldUseFlex"][data-state~="right"] %labelwrapper': "justify-content:flex-end;",
                    "%": "text-align:center;",
                    "%label": "position:relative;color:[txt];[fnt]  white-space:nowrap;padding:15px 10px;",
                    '%:active[data-state~="mobile"] %label,%:hover[data-state~="desktop"] %label,%[data-preview~="hover"] %label': "color:[txth];",
                    '%:active[data-state~="mobile"] %_mainColor,%:hover[data-state~="desktop"] %_mainColor,%[data-preview~="hover"] %_mainColor': "background-color:[bgh];",
                    "%_pose": "position:absolute;top:0;right:0;bottom:0;left:0;[rd]",
                    "%_mainColor": "background-color:[bg];background:[xxx] url([tdr]net.png) center center repeat;",
                    "%_topper": "background:url([tdr]transparent_arc.png) center center;",
                    "%_oval": "background:#00f;width:200%;height:50%;",
                    "%_bord": "border-width:11px;border-image:url([tdr]plastic_highlight_border.png) 11 stretch stretch;"
                }
            },
            "wysiwyg.viewer.skins.button.RibbonButton": {
                react: [
                    ["a", "link", [], {},
                        ["span", "label", [], {}]
                    ],
                    ["div", null, ["_tail"], {},
                        ["div", null, ["_tri"], {}],
                        ["div", null, ["_tri"], {}],
                        ["div", null, ["_tri"], {}],
                        ["div", null, ["_tri"], {}],
                        ["div", null, ["_tri"], {}],
                        ["div", null, ["_tri"], {}],
                        ["div", null, ["_tri"], {}],
                        ["div", null, ["_tri"], {}],
                        ["div", null, ["_tri"], {}],
                        ["div", null, ["_tri"], {}],
                        ["div", null, ["_tri"], {}],
                        ["div", null, ["_tri"], {}],
                        ["div", null, ["_tri"], {}],
                        ["div", null, ["_tri"], {}],
                        ["div", null, ["_tri"], {}],
                        ["div", null, ["_tri"], {}],
                        ["div", null, ["_tri"], {}],
                        ["div", null, ["_tri"], {}]
                    ]
                ],
                exports: {
                    maxH: 170
                },
                params: {
                    bg: "BG_COLOR_ALPHA",
                    bgh: "BG_COLOR_ALPHA",
                    txth: "TEXT_COLOR",
                    clrh: "COLOR_ALPHA",
                    brw: "BORDER_SIZE",
                    fnt: "FONT",
                    txt: "TEXT_COLOR",
                    clr: "COLOR_ALPHA",
                    bgd: "BG_COLOR_ALPHA",
                    txtd: "TEXT_COLOR",
                    clrd: "COLOR_ALPHA"
                },
                paramsDefaults: {
                    bg: "color_17",
                    bgh: "color_18",
                    txth: "color_15",
                    clrh: ["bgh"],
                    brw: "0",
                    fnt: "font_5",
                    txt: "color_15",
                    clr: ["bg"],
                    bgd: "#CCCCCC",
                    txtd: "#FFFFFF",
                    clrd: ["bgd"]
                },
                css: {
                    "% button%link": "width:100%;width:calc(100% - 5px);",
                    '%[data-state~="shouldUseFlex"] %link,%[data-state~="shouldUseFlex"] %labelwrapper': "text-align:initial;display:flex;align-items:center;",
                    '%[data-state~="shouldUseFlex"][data-state~="center"] %link,%[data-state~="shouldUseFlex"][data-state~="center"] %labelwrapper': "justify-content:center;",
                    '%[data-state~="shouldUseFlex"][data-state~="left"] %link,%[data-state~="shouldUseFlex"][data-state~="left"] %labelwrapper': "justify-content:flex-start;",
                    '%[data-state~="shouldUseFlex"][data-state~="right"] %link,%[data-state~="shouldUseFlex"][data-state~="right"] %labelwrapper': "justify-content:flex-end;",
                    "%link": "background-color:[bg];position:absolute;top:0;right:5px;bottom:0;left:0;",
                    '%[data-disabled="false"]': "cursor:pointer !important;max-height:170px !important;",
                    '%[data-disabled="false"]:active[data-state~="mobile"] %link,%[data-disabled="false"]:hover[data-state~="desktop"] %link,%[data-disabled="false"][data-preview~="hover"] %link': "background-color:[bgh];",
                    '%[data-disabled="false"]:active[data-state~="mobile"] %label,%[data-disabled="false"]:hover[data-state~="desktop"] %label,%[data-disabled="false"][data-preview~="hover"] %label': "color:[txth];",
                    '%[data-disabled="false"]:active[data-state~="mobile"] %_tri,%[data-disabled="false"]:hover[data-state~="desktop"] %_tri,%[data-disabled="false"][data-preview~="hover"] %_tri': "border-left-color:[clrh];border:solid [brw];",
                    "%label": "[fnt]  color:[txt];display:inline-block;max-height:170px !important;padding:5px 10px;white-space:nowrap;",
                    "%_tail": "overflow:hidden;width:5px;position:absolute;top:0;right:0;bottom:0;left:auto;",
                    "%_tri": "border:solid 5px transparent;border-left-color:[clr];",
                    "%_tri:first-child": "margin-top:-5px;",
                    '%[data-disabled="true"] %link,%[data-preview~="disabled"] %link': "background-color:[bgd];",
                    '%[data-disabled="true"] %label,%[data-preview~="disabled"] %label': "color:[txtd];",
                    '%[data-disabled="true"] %_tri,%[data-preview~="disabled"] %_tri': "border-left-color:[clrd];border:solid [brw];"
                }
            },
            "wysiwyg.viewer.skins.button.ScotchTapeButton": {
                react: [
                    ["div", null, ["_left"], {}],
                    ["a", "link", [], {},
                        ["span", "label", [], {}]
                    ],
                    ["div", null, ["_right"], {}]
                ],
                params: {
                    txth: "TEXT_COLOR",
                    trans2: "TRANSITION",
                    tdr: "URL",
                    fnt: "FONT",
                    txt: "TEXT_COLOR",
                    txtd: "TEXT_COLOR",
                    brd2: "COLOR_ALPHA",
                    bg: "COLOR_ALPHA",
                    brd: "COLOR_ALPHA"
                },
                paramsDefaults: {
                    txth: "color_15",
                    trans2: "color 0.4s ease 0s",
                    tdr: "BASE_THEME_DIRECTORY",
                    fnt: "font_5",
                    txt: "color_15",
                    txtd: "#FFFFFF",
                    brd2: "#fff",
                    bg: "#000",
                    brd: "#000"
                },
                paramsMutators: {
                    brd2: {
                        type: "alpha",
                        value: .12
                    },
                    bg: {
                        type: "alpha",
                        value: .01
                    },
                    brd: {
                        type: "alpha",
                        value: .13
                    }
                },
                css: {
                    "% button%link": "width:100%;",
                    '%[data-state~="shouldUseFlex"] %link,%[data-state~="shouldUseFlex"] %labelwrapper': "text-align:initial;display:flex;align-items:center;",
                    '%[data-state~="shouldUseFlex"][data-state~="center"] %link,%[data-state~="shouldUseFlex"][data-state~="center"] %labelwrapper': "justify-content:center;",
                    '%[data-state~="shouldUseFlex"][data-state~="left"] %link,%[data-state~="shouldUseFlex"][data-state~="left"] %labelwrapper': "justify-content:flex-start;",
                    '%[data-state~="shouldUseFlex"][data-state~="right"] %link,%[data-state~="shouldUseFlex"][data-state~="right"] %labelwrapper': "justify-content:flex-end;",
                    "%:before,%:after": "border-bottom:solid 1px [brd2];content:'';display:block;height:7px;left:1px;position:absolute;right:1px;",
                    "%:before": "top:-7px;",
                    "%:after": "bottom:-7px;",
                    '%[data-disabled="false"]': "cursor:pointer;",
                    '%[data-disabled="false"]:active[data-state~="mobile"] %label,%[data-disabled="false"]:hover[data-state~="desktop"] %label,%[data-disabled="false"][data-preview~="hover"] %label': "color:[txth];[trans2]",
                    "%link": "position:absolute;top:0;right:0;bottom:0;left:0;background:[bg];border-bottom:solid 1px [brd];border-top:solid 1px [brd];display:block;",
                    "%_left,%_right": "background:transparent url([tdr]scotchtape_edges.png) repeat-y;bottom:0;content:'';display:block;position:absolute;top:0;width:10px;",
                    "%_left": "background-position:right -2px;left:-7px;",
                    "%_right": "background-position:left -2px;right:-7px;",
                    "%label": "[fnt]  [trans2]  color:[txt];display:inline-block;position:relative;white-space:nowrap;",
                    '%[data-disabled="true"] %label,%[data-preview~="disabled"] %label': "color:[txtd];"
                }
            },
            "wysiwyg.viewer.skins.button.ShineButton": {
                react: [
                    ["a", "link", ["_lnk"], {},
                        ["span", "label", [], {}]
                    ]
                ],
                params: {
                    bg: "BG_COLOR_ALPHA",
                    rd: "BORDER_RADIUS",
                    tdr: "URL",
                    xxx: "BG_COLOR_ALPHA",
                    fnt: "FONT",
                    txt: "TEXT_COLOR",
                    bgh: "BG_COLOR_ALPHA",
                    txth: "TEXT_COLOR"
                },
                paramsDefaults: {
                    bg: "color_1",
                    rd: "5px",
                    tdr: "BASE_THEME_DIRECTORY",
                    xxx: "color_1",
                    fnt: "font_5",
                    txt: "color_5",
                    bgh: "color_2",
                    txth: "color_6"
                },
                css: {
                    "% button%link": "width:100%;",
                    '%[data-state~="shouldUseFlex"] %link,%[data-state~="shouldUseFlex"] %labelwrapper': "text-align:initial;display:flex;align-items:center;",
                    '%[data-state~="shouldUseFlex"][data-state~="center"] %link,%[data-state~="shouldUseFlex"][data-state~="center"] %labelwrapper': "justify-content:center;",
                    '%[data-state~="shouldUseFlex"][data-state~="left"] %link,%[data-state~="shouldUseFlex"][data-state~="left"] %labelwrapper': "justify-content:flex-start;",
                    '%[data-state~="shouldUseFlex"][data-state~="right"] %link,%[data-state~="shouldUseFlex"][data-state~="right"] %labelwrapper': "justify-content:flex-end;",
                    "%link": "position:absolute;top:0;right:0;bottom:0;left:0;background-color:[bg];[rd]  background-image:url([tdr]apple_menu.png);background-position:0 50%;background-repeat:repeat-x;background:[xxx] url([tdr]net.png) center center repeat;",
                    "%label": "[fnt]  color:[txt];white-space:nowrap;padding:0 10px;",
                    '%:active[data-state~="mobile"] %link,%:hover[data-state~="desktop"] %link,%[data-preview~="hover"] %link': "background-color:[bgh];",
                    '%:active[data-state~="mobile"] %label,%:hover[data-state~="desktop"] %label,%[data-preview~="hover"] %label': "color:[txth];"
                }
            },
            "wysiwyg.viewer.skins.button.ShinyButtonIISkin": {
                react: [
                    ["a", "link", [], {},
                        ["span", "label", [], {}]
                    ]
                ],
                params: {
                    rd: "BORDER_RADIUS",
                    trans1: "TRANSITION",
                    shd: "BOX_SHADOW",
                    bg: "BG_COLOR_ALPHA",
                    tdr: "URL",
                    brd: "BORDER_COLOR_ALPHA",
                    brw: "BORDER_SIZE",
                    fnt: "FONT",
                    trans2: "TRANSITION",
                    txt: "TEXT_COLOR",
                    bgh: "BG_COLOR_ALPHA",
                    brdh: "BORDER_COLOR_ALPHA",
                    txth: "TEXT_COLOR",
                    bgd: "BG_COLOR_ALPHA",
                    brdd: "BORDER_COLOR_ALPHA",
                    txtd: "TEXT_COLOR"
                },
                paramsDefaults: {
                    rd: "5px",
                    trans1: "border-color 0.4s ease 0s, background-color 0.4s ease 0s",
                    shd: "0 1px 4px rgba(0, 0, 0, 0.6)",
                    bg: "color_17",
                    tdr: "BASE_THEME_DIRECTORY",
                    brd: "color_15",
                    brw: "0",
                    fnt: "font_5",
                    trans2: "color 0.4s ease 0s",
                    txt: "color_15",
                    bgh: "color_18",
                    brdh: "color_15",
                    txth: "color_15",
                    bgd: "#CCCCCC",
                    brdd: "color_15",
                    txtd: "#FFFFFF"
                },
                css: {
                    "% button%link": "width:100%;",
                    '%[data-state~="shouldUseFlex"] %link,%[data-state~="shouldUseFlex"] %labelwrapper': "text-align:initial;display:flex;align-items:center;",
                    '%[data-state~="shouldUseFlex"][data-state~="center"] %link,%[data-state~="shouldUseFlex"][data-state~="center"] %labelwrapper': "justify-content:center;",
                    '%[data-state~="shouldUseFlex"][data-state~="left"] %link,%[data-state~="shouldUseFlex"][data-state~="left"] %labelwrapper': "justify-content:flex-start;",
                    '%[data-state~="shouldUseFlex"][data-state~="right"] %link,%[data-state~="shouldUseFlex"][data-state~="right"] %labelwrapper': "justify-content:flex-end;",
                    "%link": "position:absolute;top:0;right:0;bottom:0;left:0;[rd]  [trans1]  [shd]  background:[bg] url([tdr]shiny2button_bg.png) center top repeat-x;border:solid [brd] [brw];",
                    "%label": "[fnt]  [trans2]  color:[txt];display:inline-block;margin-top:calc(-1 * [brw]);position:relative;white-space:nowrap;",
                    '%[data-state~="shouldUseFlex"] %label': "margin-top:0;",
                    '%[data-disabled="false"]': "cursor:pointer !important;",
                    '%[data-disabled="false"]:active[data-state~="mobile"] %link,%[data-disabled="false"]:hover[data-state~="desktop"] %link,%[data-disabled="false"][data-preview~="hover"] %link': "background-color:[bgh];border:solid [brdh] [brw];",
                    '%[data-disabled="false"]:active[data-state~="mobile"] %label,%[data-disabled="false"]:hover[data-state~="desktop"] %label,%[data-disabled="false"][data-preview~="hover"] %label': "color:[txth];",
                    '%[data-disabled="true"] %link,%[data-preview~="disabled"] %link': "background-color:[bgd];border:solid [brdd] [brw];",
                    '%[data-disabled="true"] %label,%[data-preview~="disabled"] %label': "color:[txtd];"
                }
            },
            "wysiwyg.viewer.skins.button.ShinyButtonISkin": {
                react: [
                    ["a", "link", [], {},
                        ["span", "label", [], {}]
                    ]
                ],
                params: {
                    rd: "BORDER_RADIUS",
                    trans1: "TRANSITION",
                    shd: "BOX_SHADOW",
                    bg: "BG_COLOR_ALPHA",
                    tdr: "URL",
                    brd: "BORDER_COLOR_ALPHA",
                    brw: "BORDER_SIZE",
                    fnt: "FONT",
                    trans2: "TRANSITION",
                    txt: "TEXT_COLOR",
                    bgh: "BG_COLOR_ALPHA",
                    brdh: "BORDER_COLOR_ALPHA",
                    txth: "TEXT_COLOR",
                    bgd: "BG_COLOR_ALPHA",
                    brdd: "BORDER_COLOR_ALPHA",
                    txtd: "TEXT_COLOR"
                },
                paramsDefaults: {
                    rd: "5px",
                    trans1: "border-color 0.4s ease 0s, background-color 0.4s ease 0s",
                    shd: "0 1px 4px rgba(0, 0, 0, 0.6)",
                    bg: "color_17",
                    tdr: "BASE_THEME_DIRECTORY",
                    brd: "color_15",
                    brw: "0",
                    fnt: "font_5",
                    trans2: "color 0.4s ease 0s",
                    txt: "color_15",
                    bgh: "color_18",
                    brdh: "color_15",
                    txth: "color_15",
                    bgd: "#CCCCCC",
                    brdd: "color_15",
                    txtd: "#FFFFFF"
                },
                css: {
                    "% button%link": "width:100%;",
                    '%[data-state~="shouldUseFlex"] %link,%[data-state~="shouldUseFlex"] %labelwrapper': "text-align:initial;display:flex;align-items:center;",
                    '%[data-state~="shouldUseFlex"][data-state~="center"] %link,%[data-state~="shouldUseFlex"][data-state~="center"] %labelwrapper': "justify-content:center;",
                    '%[data-state~="shouldUseFlex"][data-state~="left"] %link,%[data-state~="shouldUseFlex"][data-state~="left"] %labelwrapper': "justify-content:flex-start;",
                    '%[data-state~="shouldUseFlex"][data-state~="right"] %link,%[data-state~="shouldUseFlex"][data-state~="right"] %labelwrapper': "justify-content:flex-end;",
                    "%link": "position:absolute;top:0;right:0;bottom:0;left:0;[rd]  [trans1]  [shd]  background:[bg] url([tdr]shiny1button_bg.png) 50% 50% repeat-x;border:solid [brd] [brw];",
                    "%label": "[fnt]  [trans2]  color:[txt];display:inline-block;margin-top:calc(-1 * [brw]);position:relative;white-space:nowrap;",
                    '%[data-state~="shouldUseFlex"] %label': "margin-top:0;",
                    '%[data-disabled="false"]': "cursor:pointer !important;",
                    '%[data-disabled="false"]:active[data-state~="mobile"] %link,%[data-disabled="false"]:hover[data-state~="desktop"] %link,%[data-disabled="false"][data-preview~="hover"] %link': "[trans1]    background-color:[bgh];border:solid [brdh] [brw];",
                    '%[data-disabled="false"]:active[data-state~="mobile"] %label,%[data-disabled="false"]:hover[data-state~="desktop"] %label,%[data-disabled="false"][data-preview~="hover"] %label': "[trans2]    color:[txth];",
                    '%[data-disabled="true"] %link,%[data-preview~="disabled"] %link': "background-color:[bgd];border:solid [brdd] [brw];",
                    '%[data-disabled="true"] %label,%[data-preview~="disabled"] %label': "color:[txtd];"
                }
            },
            "wysiwyg.viewer.skins.button.ShinyButtonInverted": {
                react: [
                    ["a", "link", [], {},
                        ["div", "labelwrapper", [], {},
                            ["span", "label", [], {}]
                        ]
                    ]
                ],
                params: {
                    rd: "BORDER_RADIUS",
                    trans1: "TRANSITION",
                    shd: "BOX_SHADOW",
                    bg: "BG_COLOR_ALPHA",
                    tdr: "URL",
                    brd: "BORDER_COLOR_ALPHA",
                    brw: "BORDER_SIZE",
                    fnt: "FONT",
                    trans2: "TRANSITION",
                    txt: "TEXT_COLOR",
                    bgh: "BG_COLOR_ALPHA",
                    brdh: "BORDER_COLOR_ALPHA",
                    txth: "TEXT_COLOR",
                    bgd: "BG_COLOR_ALPHA",
                    brdd: "BORDER_COLOR_ALPHA",
                    txtd: "TEXT_COLOR"
                },
                paramsDefaults: {
                    rd: "5px",
                    trans1: "border-color 0.4s ease 0s, background-color 0.4s ease 0s",
                    shd: "0 1px 4px rgba(0, 0, 0, 0.6)",
                    bg: "color_17",
                    tdr: "BASE_THEME_DIRECTORY",
                    brd: "color_15",
                    brw: "0",
                    fnt: "font_5",
                    trans2: "color 0.4s ease 0s",
                    txt: "color_15",
                    bgh: "color_18",
                    brdh: "color_15",
                    txth: "color_15",
                    bgd: "#CCCCCC",
                    brdd: "color_15",
                    txtd: "#FFFFFF"
                },
                css: {
                    "% button%link": "width:100%;",
                    '%[data-state~="shouldUseFlex"] %link,%[data-state~="shouldUseFlex"] %labelwrapper': "text-align:initial;display:flex;align-items:center;",
                    '%[data-state~="shouldUseFlex"][data-state~="center"] %link,%[data-state~="shouldUseFlex"][data-state~="center"] %labelwrapper': "justify-content:center;",
                    '%[data-state~="shouldUseFlex"][data-state~="left"] %link,%[data-state~="shouldUseFlex"][data-state~="left"] %labelwrapper': "justify-content:flex-start;",
                    '%[data-state~="shouldUseFlex"][data-state~="right"] %link,%[data-state~="shouldUseFlex"][data-state~="right"] %labelwrapper': "justify-content:flex-end;",
                    "%link": "position:absolute;top:0;right:0;bottom:0;left:0;[rd]  [trans1]  [shd]  background-color:[bg];background-image:url([tdr]indented_bg.png);background-position:0 0;background-repeat:repeat-x;border:solid [brd] [brw];",
                    "%labelwrapper": "position:absolute;top:0;right:0;bottom:0;left:0;[rd]  background:url([tdr]indented_bg.png) 0 100% repeat-x;",
                    "%label": "[fnt]  [trans2]  color:[txt];display:inline-block;margin-top:calc(-1 * [brw]);position:relative;white-space:nowrap;",
                    '%[data-state~="shouldUseFlex"] %label': "margin-top:0;",
                    '%[data-disabled="false"]': "cursor:pointer !important;",
                    '%[data-disabled="false"]:active[data-state~="mobile"] %link,%[data-disabled="false"]:hover[data-state~="desktop"] %link,%[data-disabled="false"][data-preview~="hover"] %link': "background-color:[bgh];border:solid [brdh] [brw];",
                    '%[data-disabled="false"]:active[data-state~="mobile"] %label,%[data-disabled="false"]:hover[data-state~="desktop"] %label,%[data-disabled="false"][data-preview~="hover"] %label': "[trans2]    color:[txth];",
                    '%[data-disabled="true"] %link,%[data-preview~="disabled"] %link': "background-color:[bgd];border:solid [brdd] [brw];",
                    '%[data-disabled="true"] %label,%[data-preview~="disabled"] %label': "color:[txtd];"
                }
            },
            "wysiwyg.viewer.skins.button.ShinyGradientButton": {
                react: [
                    ["div", null, ["_pose", "_mainColor"], {}],
                    ["div", null, ["_pose", "_grd1"], {}],
                    ["div", null, ["_pose", "_topper"], {}],
                    ["a", "link", [], {},
                        ["span", "label", [], {}]
                    ],
                    ["div", null, ["_pose", "_bord"], {}]
                ],
                exports: {
                    _maxWidth: 400,
                    _maxHeight: 400
                },
                params: {
                    txt: "TEXT_COLOR",
                    fnt: "FONT",
                    txth: "TEXT_COLOR",
                    bgh: "BG_COLOR_ALPHA",
                    rd: "BORDER_RADIUS",
                    xxx: "BG_COLOR_ALPHA",
                    tdr: "URL"
                },
                paramsDefaults: {
                    txt: "color_5",
                    fnt: "font_5",
                    txth: "color_6",
                    bgh: "color_2",
                    rd: "15px",
                    xxx: "color_1",
                    tdr: "BASE_THEME_DIRECTORY"
                },
                css: {
                    "% button%link": "width:100%;",
                    '%[data-state~="shouldUseFlex"] %link,%[data-state~="shouldUseFlex"] %labelwrapper': "text-align:initial;display:flex;align-items:center;",
                    '%[data-state~="shouldUseFlex"][data-state~="center"] %link,%[data-state~="shouldUseFlex"][data-state~="center"] %labelwrapper': "justify-content:center;",
                    '%[data-state~="shouldUseFlex"][data-state~="left"] %link,%[data-state~="shouldUseFlex"][data-state~="left"] %labelwrapper': "justify-content:flex-start;",
                    '%[data-state~="shouldUseFlex"][data-state~="right"] %link,%[data-state~="shouldUseFlex"][data-state~="right"] %labelwrapper': "justify-content:flex-end;",
                    "%": "text-align:center;",
                    "%label": "position:relative;color:[txt];[fnt]  white-space:nowrap;padding:15px 10px;display:inline-block;",
                    '%:active[data-state~="mobile"] %label,%:hover[data-state~="desktop"] %label,%[data-preview~="hover"] %label': "color:[txth];",
                    '%:active[data-state~="mobile"] %_mainColor,%:hover[data-state~="desktop"] %_mainColor,%[data-preview~="hover"] %_mainColor': "background-color:[bgh];",
                    "%_pose": "position:absolute;top:0;right:0;bottom:0;left:0;[rd]",
                    "%_mainColor": "background:[xxx] url([tdr]net.png) center center repeat;",
                    "%_topper": "background:url([tdr]transparent_arc.png) center center;",
                    "%_oval": "background:#00f;width:200%;height:50%;",
                    "%_bord": "border-width:11px;border-image:url([tdr]plastic_highlight_border.png) 11 stretch stretch;"
                }
            },
            "wysiwyg.viewer.skins.button.ShinyPillButton": {
                react: [
                    ["a", "link", ["_lnk"], {},
                        ["span", "label", [], {}]
                    ]
                ],
                params: {
                    bg: "BG_COLOR_ALPHA",
                    rd: "BORDER_RADIUS",
                    tdr: "URL",
                    xxx: "BG_COLOR_ALPHA",
                    fnt: "FONT",
                    txt: "TEXT_COLOR",
                    bgh: "BG_COLOR_ALPHA",
                    txth: "TEXT_COLOR"
                },
                paramsDefaults: {
                    bg: "color_1",
                    rd: "80px",
                    tdr: "BASE_THEME_DIRECTORY",
                    xxx: "color_1",
                    fnt: "font_5",
                    txt: "color_5",
                    bgh: "color_2",
                    txth: "color_6"
                },
                css: {
                    "% button%link": "width:100%;",
                    '%[data-state~="shouldUseFlex"] %link,%[data-state~="shouldUseFlex"] %labelwrapper': "text-align:initial;display:flex;align-items:center;",
                    '%[data-state~="shouldUseFlex"][data-state~="center"] %link,%[data-state~="shouldUseFlex"][data-state~="center"] %labelwrapper': "justify-content:center;",
                    '%[data-state~="shouldUseFlex"][data-state~="left"] %link,%[data-state~="shouldUseFlex"][data-state~="left"] %labelwrapper': "justify-content:flex-start;",
                    '%[data-state~="shouldUseFlex"][data-state~="right"] %link,%[data-state~="shouldUseFlex"][data-state~="right"] %labelwrapper': "justify-content:flex-end;",
                    "%link": "position:absolute;top:0;right:0;bottom:0;left:0;background-color:[bg];[rd]  background-image:url([tdr]apple_menu.png);background-position:0 50%;background-repeat:repeat-x;background:[xxx] url([tdr]net.png) center center repeat;",
                    "%label": "[fnt]  color:[txt];white-space:nowrap;padding:0 10px;display:inline-block;",
                    '%:active[data-state~="mobile"] %link,%:hover[data-state~="desktop"] %link,%[data-preview~="hover"] %link': "background-color:[bgh];",
                    '%:active[data-state~="mobile"] %label,%:hover[data-state~="desktop"] %label,%[data-preview~="hover"] %label': "color:[txth];"
                }
            },
            "wysiwyg.viewer.skins.button.SiteButtonBlueSkin": {
                react: [
                    ["a", "link", [], {},
                        ["span", "label", [], {}]
                    ]
                ],
                params: {
                    borderColor: "BORDER_COLOR",
                    rd: "BORDER_RADIUS",
                    bgColor: "BG_COLOR_ALPHA",
                    borderColorOver: "BORDER_COLOR",
                    bgColorOver: "BG_COLOR_ALPHA",
                    shadowColor: "BOX_SHADOW_COLOR_ALPHA",
                    shadowInsetColorOver: "BOX_SHADOW_COLOR_ALPHA",
                    labelColor: "TEXT_COLOR"
                },
                paramsDefaults: {
                    borderColor: "#5b8fa7",
                    rd: "4px",
                    bgColor: "#2aa7ea",
                    borderColorOver: "#237aa7",
                    bgColorOver: "#179ce1",
                    shadowColor: "0, 0, 0, 0.2",
                    shadowInsetColorOver: "68, 175, 233, 0.7",
                    labelColor: "#ffffff"
                },
                css: {
                    "% button%link": "width:100%;",
                    '%[data-state~="shouldUseFlex"] %link,%[data-state~="shouldUseFlex"] %labelwrapper': "text-align:initial;display:flex;align-items:center;",
                    '%[data-state~="shouldUseFlex"][data-state~="center"] %link,%[data-state~="shouldUseFlex"][data-state~="center"] %labelwrapper': "justify-content:center;",
                    '%[data-state~="shouldUseFlex"][data-state~="left"] %link,%[data-state~="shouldUseFlex"][data-state~="left"] %labelwrapper': "justify-content:flex-start;",
                    '%[data-state~="shouldUseFlex"][data-state~="right"] %link,%[data-state~="shouldUseFlex"][data-state~="right"] %labelwrapper': "justify-content:flex-end;",
                    "%": "padding:0 8px;border:1px solid [borderColor];[rd]  background-color:[bgColor];position:relative;text-align:center;cursor:pointer;",
                    '%:active[data-state~="mobile"],%:hover[data-state~="desktop"],%[data-preview~="hover"]': "border:1px solid [borderColorOver];background:[bgColorOver] none;box-shadow:0 2px 3px 0 [shadowColor], 0 1px 2px 0 [shadowInsetColorOver] inset;",
                    "%label": "color:[labelColor];height:1.8em;line-height:1.8em;display:inline-block;"
                }
            },
            "wysiwyg.viewer.skins.button.SiteButtonSkin": {
                react: [
                    ["a", "link", [], {},
                        ["span", "label", [], {}]
                    ]
                ],
                params: {
                    xxx: "BG_COLOR_ALPHA",
                    tdr: "URL",
                    fnt: "FONT",
                    clr: "TEXT_COLOR"
                },
                paramsDefaults: {
                    xxx: "color_1",
                    tdr: "BASE_THEME_DIRECTORY",
                    fnt: "font_5",
                    clr: "color_1"
                },
                css: {
                    "% button%link": "width:100%;",
                    '%[data-state~="shouldUseFlex"] %link,%[data-state~="shouldUseFlex"] %labelwrapper': "text-align:initial;display:flex;align-items:center;",
                    '%[data-state~="shouldUseFlex"][data-state~="center"] %link,%[data-state~="shouldUseFlex"][data-state~="center"] %labelwrapper': "justify-content:center;",
                    '%[data-state~="shouldUseFlex"][data-state~="left"] %link,%[data-state~="shouldUseFlex"][data-state~="left"] %labelwrapper': "justify-content:flex-start;",
                    '%[data-state~="shouldUseFlex"][data-state~="right"] %link,%[data-state~="shouldUseFlex"][data-state~="right"] %labelwrapper': "justify-content:flex-end;",
                    "%link": "position:absolute;top:0;right:0;bottom:0;left:0;background:[xxx] url([tdr]net.png) center center repeat;",
                    "%label": "[fnt]  color:[clr];white-space:nowrap;display:inline-block;"
                }
            },
            "wysiwyg.viewer.skins.button.SloopyButton": {
                react: [
                    ["div", null, ["_brd", "_top"], {}],
                    ["div", null, ["_brd", "_bot"], {}],
                    ["a", "link", [], {},
                        ["span", "label", [], {}]
                    ]
                ],
                params: {
                    bgh: "BG_COLOR_ALPHA",
                    trans1: "TRANSITION",
                    txth: "TEXT_COLOR",
                    trans2: "TRANSITION",
                    tdr: "URL",
                    bg: "BG_COLOR_ALPHA",
                    fnt: "FONT",
                    txt: "TEXT_COLOR",
                    bgd: "BG_COLOR_ALPHA",
                    txtd: "TEXT_COLOR"
                },
                paramsDefaults: {
                    bgh: "color_18",
                    trans1: "border-color 0.4s ease 0s, background-color 0.4s ease 0s",
                    txth: "color_15",
                    trans2: "color 0.4s ease 0s",
                    tdr: "BASE_THEME_DIRECTORY",
                    bg: "color_17",
                    fnt: "font_5",
                    txt: "color_15",
                    bgd: "#CCCCCC",
                    txtd: "#FFFFFF"
                },
                css: {
                    "% button%link": "width:100%;",
                    '%[data-state~="shouldUseFlex"] %link,%[data-state~="shouldUseFlex"] %labelwrapper': "text-align:initial;display:flex;align-items:center;",
                    '%[data-state~="shouldUseFlex"][data-state~="center"] %link,%[data-state~="shouldUseFlex"][data-state~="center"] %labelwrapper': "justify-content:center;",
                    '%[data-state~="shouldUseFlex"][data-state~="left"] %link,%[data-state~="shouldUseFlex"][data-state~="left"] %labelwrapper': "justify-content:flex-start;",
                    '%[data-state~="shouldUseFlex"][data-state~="right"] %link,%[data-state~="shouldUseFlex"][data-state~="right"] %labelwrapper': "justify-content:flex-end;",
                    '%[data-disabled="false"]': "overflow:visible !important;cursor:pointer !important;",
                    '%[data-disabled="false"]:active[data-state~="mobile"] %link,%[data-disabled="false"]:hover[data-state~="desktop"] %link,%[data-disabled="false"][data-preview~="hover"] %link': "background-color:[bgh];[trans1]",
                    '%[data-disabled="false"]:active[data-state~="mobile"] %label,%[data-disabled="false"]:hover[data-state~="desktop"] %label,%[data-disabled="false"][data-preview~="hover"] %label': "color:[txth];[trans2]",
                    "%_brd": "background:url([tdr]sloppyframe.png) no-repeat;position:absolute;",
                    "%_top": "top:-4px;right:0;bottom:0;left:-4px;background-position:0 0;",
                    "%_bot": "top:0;right:-4px;bottom:-4px;left:0;background-position:100% 100%;",
                    "%link": "position:absolute;top:4px;right:4px;bottom:4px;left:4px;[trans1]  background-color:[bg];",
                    "%label": "[fnt]  [trans2]  color:[txt];display:inline-block;margin:-4px 0 0 -4px;position:relative;white-space:nowrap;",
                    '%[data-disabled="true"] %link,%[data-preview~="disabled"] %link': "background-color:[bgd];",
                    '%[data-disabled="true"] %label,%[data-preview~="disabled"] %label': "color:[txtd];"
                }
            },
            "wysiwyg.viewer.skins.button.TextOnlyButtonSkin": {
                react: [
                    ["a", "link", [], {},
                        ["span", "label", [], {}]
                    ]
                ],
                params: {
                    txth: "TEXT_COLOR",
                    trans: "TRANSITION",
                    fnt: "FONT",
                    txt: "TEXT_COLOR",
                    txtd: "TEXT_COLOR"
                },
                paramsDefaults: {
                    txth: "color_15",
                    trans: "color 0.4s ease 0s",
                    fnt: "font_5",
                    txt: "color_15",
                    txtd: "#FFFFFF"
                },
                css: {
                    "% button%link": "width:100%;",
                    '%[data-state~="shouldUseFlex"] %link,%[data-state~="shouldUseFlex"] %labelwrapper': "text-align:initial;display:flex;align-items:center;",
                    '%[data-state~="shouldUseFlex"][data-state~="center"] %link,%[data-state~="shouldUseFlex"][data-state~="center"] %labelwrapper': "justify-content:center;",
                    '%[data-state~="shouldUseFlex"][data-state~="left"] %link,%[data-state~="shouldUseFlex"][data-state~="left"] %labelwrapper': "justify-content:flex-start;",
                    '%[data-state~="shouldUseFlex"][data-state~="right"] %link,%[data-state~="shouldUseFlex"][data-state~="right"] %labelwrapper': "justify-content:flex-end;",
                    '%[data-disabled="false"]': "cursor:pointer;",
                    '%[data-disabled="false"]:active[data-state~="mobile"] %label,%[data-disabled="false"]:hover[data-state~="desktop"] %label,%[data-disabled="false"][data-preview~="hover"] %label': "color:[txth];[trans]",
                    "%link": "position:absolute;top:0;right:0;bottom:0;left:0;",
                    "%label": "[fnt]  [trans]  color:[txt];white-space:nowrap;display:inline-block;",
                    '%[data-disabled="true"] %label,%[data-preview~="disabled"] %label': "color:[txtd];"
                }
            },
            "wysiwyg.viewer.skins.button.ViewerButtonBlueSkin": {
                react: [
                    ["div", "caption", [], {}]
                ],
                params: {
                    borderColor: "BORDER_COLOR",
                    $borderRadius: "BORDER_RADIUS",
                    bgColor: "BG_COLOR_ALPHA",
                    borderColorOver: "BORDER_COLOR",
                    bgColorOver: "BG_COLOR_ALPHA",
                    shadowColor: "BOX_SHADOW_COLOR_ALPHA",
                    shadowInsetColorOver: "BOX_SHADOW_COLOR_ALPHA",
                    shadowInsetColor: "BOX_SHADOW_COLOR_ALPHA",
                    labelColor: "TEXT_COLOR",
                    borderGrayColor: "BORDER_COLOR",
                    brw: "BORDER_SIZE",
                    bgGrayColor: "BG_COLOR_ALPHA",
                    borderGrayColorOver: "BORDER_COLOR",
                    bgGrayColorOver: "BG_COLOR_ALPHA",
                    labelGrayColor: "TEXT_COLOR",
                    bgDisabledColor: "BG_COLOR_ALPHA",
                    brdd: "BORDER_COLOR_ALPHA",
                    labelDisabledColor: "TEXT_COLOR"
                },
                paramsDefaults: {
                    borderColor: "#5b8fa7",
                    $borderRadius: "4px",
                    bgColor: "#2aa7ea",
                    borderColorOver: "#237aa7",
                    bgColorOver: "#179ce1",
                    shadowColor: "0, 0, 0, 0.2",
                    shadowInsetColorOver: "68, 175, 233, 0.7",
                    shadowInsetColor: "0, 0, 0, 0.7",
                    labelColor: "#ffffff",
                    borderGrayColor: "#c4c4c4",
                    brw: "0",
                    bgGrayColor: "#f9fafc",
                    borderGrayColorOver: "#89a4af",
                    bgGrayColorOver: "#f2f3f5",
                    labelGrayColor: "#24a0c4",
                    bgDisabledColor: "#f9fafc",
                    brdd: "#d5d5d5",
                    labelDisabledColor: "#c4c4c4"
                },
                css: {
                    "% button%link": "width:100%;",
                    '%[data-state~="shouldUseFlex"] %link,%[data-state~="shouldUseFlex"] %labelwrapper': "text-align:initial;display:flex;align-items:center;",
                    '%[data-state~="shouldUseFlex"][data-state~="center"] %link,%[data-state~="shouldUseFlex"][data-state~="center"] %labelwrapper': "justify-content:center;",
                    '%[data-state~="shouldUseFlex"][data-state~="left"] %link,%[data-state~="shouldUseFlex"][data-state~="left"] %labelwrapper': "justify-content:flex-start;",
                    '%[data-state~="shouldUseFlex"][data-state~="right"] %link,%[data-state~="shouldUseFlex"][data-state~="right"] %labelwrapper': "justify-content:flex-end;",
                    "%": "padding:0 8px;border:1px solid [borderColor];[$borderRadius]  background-color:[bgColor];position:relative;text-align:center;cursor:pointer;",
                    '%[data-state~="over"]': "border:1px solid [borderColorOver];background:[bgColorOver] none;box-shadow:0 2px 3px 0 [shadowColor], 0 1px 2px 0 [shadowInsetColorOver] inset;",
                    '%[data-state~="pressed"]': "background:[bgColor] none;border-color:transparent;box-shadow:0 1px 3px 0 [shadowInsetColor] inset;",
                    "%caption": "color:[labelColor];height:1.8em;line-height:1.8em;",
                    '%[data-state~="grayed"]': "border:solid [borderGrayColor] [brw];background-color:[bgGrayColor];",
                    '%[data-state~="grayed"][data-state~="over"]': "border:solid [borderGrayColorOver] [brw];background-color:[bgGrayColorOver];box-shadow:0 2px 3px 0 [shadowColor], 0 1px 2px 0 #ffffff inset;",
                    '%[data-state~="grayed"][data-state~="pressed"]': "border-color:transparent;background-color:[bgGrayColor];",
                    '%[data-state~="grayed"] %caption': "color:[labelGrayColor];",
                    "%[disabled]": "background-color:[bgDisabledColor];border:solid [brdd] [brw];",
                    "%[disabled] %caption": "color:[labelDisabledColor];"
                }
            },
            "wysiwyg.viewer.skins.button.WrappingButton": {
                react: [
                    ["a", "link", [], {},
                        ["span", "label", [], {}]
                    ]
                ],
                params: {
                    rd: "BORDER_RADIUS",
                    trans1: "TRANSITION",
                    shd: "BOX_SHADOW",
                    horizontalPadding: "PADDING_SIZE",
                    verticalPadding: "PADDING_SIZE",
                    fnt: "FONT",
                    trans2: "TRANSITION",
                    txt: "TEXT_COLOR",
                    bg: "BG_COLOR_ALPHA",
                    brd: "BORDER_COLOR_ALPHA",
                    brw: "BORDER_SIZE",
                    bgh: "BG_COLOR_ALPHA",
                    brdh: "BORDER_COLOR_ALPHA",
                    txth: "TEXT_COLOR",
                    bgd: "BG_COLOR_ALPHA",
                    brdd: "BORDER_COLOR_ALPHA",
                    txtd: "TEXT_COLOR"
                },
                paramsDefaults: {
                    rd: "0",
                    trans1: "border-color 0.4s ease 0s, background-color 0.4s ease 0s",
                    shd: "0 1px 4px rgba(0, 0, 0, 0.6)",
                    horizontalPadding: "0",
                    verticalPadding: "0",
                    fnt: "font_5",
                    trans2: "color 0.4s ease 0s",
                    txt: "color_15",
                    bg: "color_17",
                    brd: "color_15",
                    brw: "0",
                    bgh: "color_18",
                    brdh: "color_15",
                    txth: "color_15",
                    bgd: "#CCCCCC",
                    brdd: "color_15",
                    txtd: "#FFFFFF"
                },
                css: {
                    "% button%link": "width:100%;",
                    '%[data-state~="shouldUseFlex"] %link,%[data-state~="shouldUseFlex"] %labelwrapper': "text-align:initial;display:flex;align-items:center;",
                    '%[data-state~="shouldUseFlex"][data-state~="center"] %link,%[data-state~="shouldUseFlex"][data-state~="center"] %labelwrapper': "justify-content:center;",
                    '%[data-state~="shouldUseFlex"][data-state~="left"] %link,%[data-state~="shouldUseFlex"][data-state~="left"] %labelwrapper': "justify-content:flex-start;",
                    '%[data-state~="shouldUseFlex"][data-state~="right"] %link,%[data-state~="shouldUseFlex"][data-state~="right"] %labelwrapper': "justify-content:flex-end;",
                    "%": "display:grid;grid-template-columns:minmax(0, 1fr);",
                    "%link": "[rd]  [trans1]  [shd]  position:relative;padding-left:[horizontalPadding];padding-right:[horizontalPadding];padding-top:[verticalPadding];padding-bottom:[verticalPadding];",
                    "%label": "[fnt]  [trans2]  position:relative;color:[txt];",
                    '%[data-disabled="false"] %link': "background-color:[bg];border:solid [brd] [brw];cursor:pointer !important;",
                    '%[data-disabled="false"]:active[data-state~="mobile"] %link,%[data-disabled="false"]:hover[data-state~="desktop"] %link,%[data-disabled="false"][data-preview~="hover"] %link': "background-color:[bgh];border-color:[brdh];",
                    '%[data-disabled="false"]:active[data-state~="mobile"] %label,%[data-disabled="false"]:hover[data-state~="desktop"] %label,%[data-disabled="false"][data-preview~="hover"] %label': "color:[txth];",
                    '%[data-disabled="true"] %link,%[data-preview~="disabled"] %link': "background-color:[bgd];border:solid [brdd] [brw];",
                    '%[data-disabled="true"] %label,%[data-preview~="disabled"] %label': "color:[txtd];",
                    '%[data-state~="center"] %label': "text-align:center;",
                    '%[data-state~="left"] %label': "text-align:left;",
                    '%[data-state~="right"] %label': "text-align:right;"
                }
            }
        };
        t.exports = r
    }, function(t, e, o) {
        "use strict";
        var r = o(3),
            i = o(34),
            n = o(1),
            a = o(2).fonts,
            s = function(t) {
                return t.colorsMap && t.fontsMap ? i.generateStyleNode("theme_fonts", a.getThemeFontsCss(t.fontsMap, t.colorsMap), t.styleRoot) : null
            };
        s.displayName = "WixFontsStyleNode", s.propTypes = {
            fontsMap: n.Fonts.fontsMap,
            colorsMap: n.Theme.colorsMap,
            styleRoot: r.string
        }, t.exports = s
    }, function(t, e, o) {
        "use strict";
        var r = o(3),
            i = o(34),
            n = o(1),
            a = o(2).cssUtils,
            s = function(t) {
                return t.colorsMap ? i.generateStyleNode("theme_colors", a.getColorsCssString(t.colorsMap), t.styleRoot) : null
            };
        s.displayName = "WixColorsStyleNode", s.propTypes = {
            colorsMap: n.Theme.colorsMap,
            styleRoot: r.string
        }, t.exports = s
    }, function(t, e, o) {
        "use strict";
        var r = o(102),
            i = o(104),
            n = r({
                compType: "wixapps.integration.components.Area",
                defaultSkinName: "wysiwyg.viewer.skins.area.DefaultAreaSkin",
                legacyInlineContent: !0,
                includeScrollMixin: !0
            }),
            a = r({
                displayName: "WixGroupContainer",
                compType: "wysiwyg.viewer.components.Group",
                defaultSkinName: "wysiwyg.viewer.components.GroupSkin",
                includeScrollMixin: !1,
                pointerEventsNone: !0
            }),
            s = r({
                compType: "mobile.core.components.Container",
                defaultSkinName: "wysiwyg.viewer.skins.area.DefaultAreaSkin",
                includeScrollMixin: !0
            }),
            l = r({
                displayName: "AppWidget",
                compType: "platform.components.AppWidget",
                defaultSkinName: "platform.components.skins.AppWidgetSkin",
                includeScrollMixin: !0
            }),
            d = r({
                displayName: "RefComponent",
                compType: "wysiwyg.viewer.components.RefComponent",
                defaultSkinName: "skins.core.InlineSkin",
                includeScrollMixin: !0,
                childrenRendererParams: {
                    overrides: {
                        fitToContentHeight: !0
                    }
                }
            }),
            p = r({
                displayName: "Section",
                compType: "responsive.components.Section",
                defaultSkinName: "skins.core.InlineSkin"
            });
        t.exports = {
            FormContainer: i,
            GroupContainer: a,
            LegacyContainer: n,
            Container: s,
            RefComponent: d,
            AppWidget: l,
            Section: p
        }
    }, function(t, e, o) {
        "use strict";

        function r(t) {
            if (Array.isArray(t)) {
                for (var e = 0, o = Array(t.length); e < t.length; e++) o[e] = t[e];
                return o
            }
            return Array.from(t)
        }
        var i = o(0),
            n = o(1),
            a = o(10),
            s = o(35),
            l = o(57),
            d = o(7),
            p = o(5),
            c = o(3);
        t.exports = function(t) {
            var e = t.defaultSkinName,
                o = t.compType,
                u = t.displayName,
                b = void 0 === u ? "WixContainer" : u,
                g = t.includeScrollMixin,
                h = void 0 !== g && g,
                m = t.legacyInlineContent,
                f = void 0 !== m && m,
                w = t.pointerEventsNone,
                _ = void 0 !== w && w,
                v = t.childrenRendererParams,
                x = i.pick(l, [e].concat(r(i.keys(l))));
            return p({
                displayName: b,
                mixins: [].concat(r(h ? [s] : []), [d(x)], r(f ? [] : [a])),
                propTypes: {
                    isListItem: c.bool,
                    isMeshLayoutMechanism: n.Layout.isMeshLayoutMechanism,
                    layoutContainerClassName: n.Layout.layoutContainerClassName
                },
                statics: {
                    getComponentSkins: function() {
                        return x
                    },
                    compType: o
                },
                getA11yProps: function() {
                    var t = i.get(this.props, ["compData", "a11y"], {}),
                        e = ["label", "live", "atomic", "current", "hidden"].reduce((function(e, o) {
                            return e["aria-" + o] = t[o], e
                        }), {}),
                        o = t.role,
                        r = t.tabindex;
                    return i.omitBy(i.assign({
                        role: o,
                        tabIndex: r
                    }, e), i.isUndefined)
                },
                getSkinProperties: function() {
                    var t = this.props.isMeshLayoutMechanism,
                        e = this.getA11yProps(),
                        o = {
                            style: t && _ ? {
                                pointerEvents: "none"
                            } : {}
                        };
                    return {
                        "": i.assign(o, this.props.isListItem && {
                            role: "listitem"
                        }, e),
                        loader: {
                            style: t && _ ? {
                                pointerEvents: "none"
                            } : {}
                        },
                        inlineContent: {
                            className: this.props.layoutContainerClassName,
                            style: t && _ ? {
                                pointerEvents: "none"
                            } : {},
                            children: f ? this.props.children : this.getChildrenRenderer(v)
                        }
                    }
                }
            })
        }
    }, function(t, e, o) {
        "use strict";
        var r = {
            "wysiwyg.viewer.skins.mediaContainer.DefaultMediaContainer": {
                react: [
                    ["div", "container", [], {},
                        ["div", "background", [], {}],
                        ["div", "inlineContentParent", [], {},
                            ["div", "inlineContent", [], {}]
                        ]
                    ]
                ],
                css: {
                    "%:not([data-mobile-responsive]) %inlineContent,%:not([data-mobile-responsive]) %container": "position:absolute;top:0;right:0;bottom:0;left:0;"
                }
            },
            "wysiwyg.viewer.skins.mediaContainer.MediaBox": {
                react: [
                    ["div", "container", [], {},
                        ["div", "background", [], {}]
                    ],
                    ["div", "inlineContentParent", [], {},
                        ["div", "inlineContent", [], {}]
                    ]
                ],
                css: {
                    "%:not([data-mobile-responsive]) %inlineContent": "position:absolute;top:0;right:0;bottom:0;left:0;",
                    "%:not([data-mobile-responsive]) %container": "position:absolute;top:0;right:0;bottom:0;left:0;position:absolute !important;"
                }
            },
            "wysiwyg.viewer.skins.screenwidthcontainer.GradientBottomScreen": {
                react: [
                    ["div", "screenWidthBackground", [], {}],
                    ["div", "centeredContent", [], {},
                        ["div", "bg", [], {}],
                        ["div", "inlineContent", [], {}]
                    ]
                ],
                params: {
                    tdr: "URL",
                    bgc: "BG_COLOR_ALPHA"
                },
                paramsDefaults: {
                    tdr: "BASE_THEME_DIRECTORY",
                    bgc: "color_11"
                },
                css: {
                    "%screenWidthBackground": "position:absolute;top:0;right:0;bottom:0;left:0;background-image:url([tdr]gradient_bottom_white.png);background-repeat:repeat-x;background-position:0 100%;background-color:[bgc];",
                    '%[data-state~="fixedPosition"]': "position:fixed !important;left:auto !important;z-index:50;",
                    '%[data-state~="fixedPosition"]%_footer': "top:auto;bottom:0;",
                    "%bg": "position:absolute;top:0;right:0;bottom:0;left:0;",
                    "%inlineContent": "position:absolute;top:0;right:0;bottom:0;left:0;",
                    "%centeredContent": "position:absolute;top:0;right:0;bottom:0;left:0;"
                }
            },
            "wysiwyg.viewer.skins.screenwidthcontainer.GradientTopScreen": {
                react: [
                    ["div", "screenWidthBackground", [], {}],
                    ["div", "centeredContent", [], {},
                        ["div", "bg", [], {}],
                        ["div", "inlineContent", [], {}]
                    ]
                ],
                params: {
                    tdr: "URL",
                    bgc: "BG_COLOR_ALPHA"
                },
                paramsDefaults: {
                    tdr: "BASE_THEME_DIRECTORY",
                    bgc: "color_11"
                },
                css: {
                    "%screenWidthBackground": "position:absolute;top:0;right:0;bottom:0;left:0;background-image:url([tdr]gradient_top_white.png);background-repeat:repeat-x;background-color:[bgc];",
                    '%[data-state~="fixedPosition"]': "position:fixed !important;left:auto !important;z-index:50;",
                    '%[data-state~="fixedPosition"]%_footer': "top:auto;bottom:0;",
                    "%bg": "position:absolute;top:0;right:0;bottom:0;left:0;",
                    "%inlineContent": "position:absolute;top:0;right:0;bottom:0;left:0;",
                    "%centeredContent": "position:absolute;top:0;right:0;bottom:0;left:0;"
                }
            },
            "wysiwyg.viewer.skins.screenwidthcontainer.GrassScreen": {
                react: [
                    ["div", "screenWidthBackground", ["_grass"], {}],
                    ["div", "centeredContent", [], {},
                        ["div", "bg", [], {}],
                        ["div", "inlineContent", [], {}]
                    ]
                ],
                params: {
                    bgc: "BG_COLOR_ALPHA",
                    $BorderRadius: "BORDER_RADIUS",
                    $boxShadow: "BOX_SHADOW",
                    baseThemeDir: "URL"
                },
                paramsDefaults: {
                    bgc: "color_11",
                    $BorderRadius: "10px",
                    $boxShadow: "0 1px 3px rgba(0, 0, 0, 0.8)",
                    baseThemeDir: "BASE_THEME_DIRECTORY"
                },
                css: {
                    "%screenWidthBackground": "position:absolute;top:0;right:0;bottom:0;left:0;",
                    '%[data-state~="fixedPosition"]': "position:fixed !important;left:auto !important;z-index:50;",
                    '%[data-state~="fixedPosition"]%_footer': "top:auto;bottom:0;",
                    "%centeredContent": "position:absolute;left:0;height:100%;",
                    "%bg": "position:absolute;top:10px;right:0;bottom:10px;left:0;background-color:[bgc];[$BorderRadius]  [$boxShadow]",
                    "%inlineContent": "position:absolute;top:50px;right:0;bottom:50px;left:0;",
                    "%_grass": "background-image:url([baseThemeDir]bg_grass.jpg);"
                }
            },
            "wysiwyg.viewer.skins.screenwidthcontainer.PopupContainer": {
                react: [
                    ["div", "background", [], {}],
                    ["div", "inlineContent", [], {}]
                ],
                css: {
                    "%inlineContent,%background": "position:absolute;top:0;right:0;bottom:0;left:0;"
                }
            },
            "wysiwyg.viewer.skins.screenwidthcontainer.PopupOverlayContainer": {
                react: [
                    ["div", "background", [], {}],
                    ["div", "inlineContent", [], {}]
                ],
                css: {
                    "%inlineContent,%background": "position:absolute;top:0;right:0;bottom:0;left:0;"
                }
            },
            "wysiwyg.viewer.skins.screenwidthcontainer.SimpleScreen": {
                react: [
                    ["div", "screenWidthBackground", [], {}],
                    ["div", "centeredContent", [], {},
                        ["div", "bg", [], {}],
                        ["div", "inlineContent", [], {}]
                    ]
                ],
                params: {
                    bgc1: "BG_COLOR_ALPHA",
                    bgc2: "BG_COLOR_ALPHA",
                    rd: "BORDER_RADIUS",
                    shd: "BOX_SHADOW"
                },
                paramsDefaults: {
                    bgc1: "color_11",
                    bgc2: "color_11",
                    rd: "5px",
                    shd: "0 1px 3px rgba(0, 0, 0, 0.5)"
                },
                css: {
                    "%screenWidthBackground": "position:absolute;top:0;right:0;bottom:0;left:0;background-color:[bgc1];",
                    '%[data-state~="fixedPosition"]': "position:fixed !important;left:auto !important;z-index:50;",
                    '%[data-state~="fixedPosition"]%_footer': "top:auto;bottom:0;",
                    "%centeredContent": "position:absolute;left:0;height:100%;",
                    "%bg": "position:absolute;top:10px;right:0;bottom:10px;left:0;background-color:[bgc2];[rd]  [shd]",
                    "%inlineContent": "position:absolute;top:20px;right:20px;bottom:20px;left:20px;"
                }
            },
            "wysiwyg.viewer.skins.stripContainer.DefaultStripContainer": {
                react: [
                    ["div", "background", [], {}],
                    ["div", "inlineContent", [], {}]
                ],
                css: {
                    "%:not([data-mobile-responsive]) > %inlineContent": "position:absolute;top:0;right:0;bottom:0;left:0;",
                    "%[data-mobile-responsive] > %inlineContent": "position:relative;",
                    "%[data-responsive]": "display:-ms-grid;display:grid;justify-content:center;grid-template-columns:100%;grid-template-rows:1fr;-ms-grid-columns:100%;-ms-grid-rows:1fr;",
                    "%[data-responsive] > %inlineContent": "display:flex;",
                    "%[data-responsive] > *": "position:relative;grid-row-start:1;grid-column-start:1;grid-row-end:2;grid-column-end:2;-ms-grid-row-span:1;-ms-grid-column-span:1;margin:0 auto;"
                }
            }
        };
        t.exports = r
    }, function(t, e, o) {
        "use strict";
        var r = o(0),
            i = o(10),
            n = o(35),
            a = o(57),
            s = o(7),
            l = o(5),
            d = r.pick(a, ["wysiwyg.viewer.skins.FormContainerSkin"]);
        t.exports = l({
            displayName: "FormContainer",
            mixins: [s(d), n, i],
            statics: {
                compType: "wysiwyg.viewer.components.FormContainer"
            },
            getSkinProperties: function() {
                return {
                    "": {
                        style: {}
                    },
                    form: {
                        onSubmit: function(t) {
                            return t.preventDefault()
                        },
                        children: this.getChildrenRenderer({
                            contentSkinPartId: "form"
                        })
                    }
                }
            }
        })
    }, function(t, e, o) {
        "use strict";
        var r = o(0),
            i = o(1),
            n = o(58),
            a = o(59),
            s = o(5)({
                displayName: "WRichText",
                statics: {
                    compType: "wysiwyg.viewer.components.WRichText",
                    santaTypeDefinitions: o(9)({
                        Links: o(3).object
                    }, "WRichText")
                },
                propTypes: {
                    compData: i.Component.compData.isRequired,
                    scale: i.Component.scale,
                    compProp: i.Component.compProp,
                    links: i.WRichText.Links,
                    colorsMap: i.Theme.colorsMap.isRequired,
                    fontsMap: i.Fonts.fontsMap.isRequired,
                    isMobileView: i.isMobileView,
                    isMeshLayoutMechanism: i.Layout.isMeshLayoutMechanism,
                    isPreviewMode: i.isPreviewMode,
                    isExperimentOpen: i.isExperimentOpen
                },
                mixins: [n],
                allowIframes: !1,
                fontGetter: function(t) {
                    var e = t.split("_")[1];
                    return this.props.fontsMap[e]
                },
                colorGetter: function(t) {
                    var e = t.split("_")[1];
                    return this.props.colorsMap[e] || t
                },
                getMinHeight: function() {
                    if (this.props.rotationInDegrees) return 0;
                    var t = this.props.isMobileView ? 0 : r.toNumber(r.get(this.props.compProp, "minHeight", 0));
                    return this.props.isMeshLayoutMechanism && !this.isPacked() ? t || this.props.style.height : t
                },
                convertCompDataTextToHTML: function(t) {
                    if (this._componentHtml) {
                        this._componentHtml = a.convertDataQueryLinksIntoHtmlAnchors(this._componentHtml, t.links);
                        var e = r.get(t, ["compProp", "overrideColor"]);
                        e = e && this.colorGetter(e), this._componentHtml = a.mobileTextTransformIfNeeded(this._componentHtml, {
                            brightness: r.get(t, "compProp.brightness"),
                            overrideColor: e,
                            isMobileView: t.isMobileView,
                            scale: t.scale,
                            fontGetter: this.fontGetter,
                            colorGetter: this.colorGetter
                        }), t.noAutoLinkGeneration || this.props.isPreviewMode || (this._componentHtml = a.createImpliedLinks({
                            htmlContent: this._componentHtml,
                            isMobileView: this.props.isMobileView,
                            useEarlyLinkCheck: this.props.isExperimentOpen("useEarlyLinkCheck")
                        }))
                    }
                }
            });
        t.exports = s
    }, function(t, e, o) {
        "use strict";
        var r = {
            "wysiwyg.viewer.skins.WRichTextClickableSkin": {
                react: [
                    ["div", "richTextContainer", ["_richTextContainer"], {}]
                ],
                css: {
                    "%richTextContainer": "position:relative;width:100%;height:100%;word-wrap:break-word;",
                    "%richTextContainer%_override-left *": "text-align:left !important;",
                    "%richTextContainer%_override-right *": "text-align:right !important;",
                    "%richTextContainer%_override-center *": "text-align:center !important;",
                    "%richTextContainer%_override-justify *": "text-align:justify !important;",
                    "%richTextContainer ol,%richTextContainer ul": "padding-left:1.3em;margin-left:.5em;line-height:normal;letter-spacing:normal;",
                    '%richTextContainer ol[dir="rtl"],%richTextContainer ul[dir="rtl"]': "padding-right:1.3em;margin-right:.5em;",
                    "%richTextContainer ul": "list-style-type:disc;",
                    "%richTextContainer ol": "list-style-type:decimal;",
                    '%richTextContainer ul[dir="rtl"]': "padding-right:1.3em;margin-right:.5em;",
                    '%richTextContainer ol[dir="rtl"]': "padding-right:1.3em;margin-right:.5em;",
                    "%richTextContainer ul ul": "list-style-type:circle;line-height:normal;",
                    "%richTextContainer ol ul": "list-style-type:circle;line-height:normal;",
                    "%richTextContainer ol ol ul": "list-style-type:square;line-height:normal;",
                    "%richTextContainer ol ul ul": "list-style-type:square;line-height:normal;",
                    "%richTextContainer ul ol ul": "list-style-type:square;line-height:normal;",
                    "%richTextContainer ul ul ul": "list-style-type:square;line-height:normal;",
                    "%richTextContainer li": "font-style:inherit;font-weight:inherit;line-height:inherit;letter-spacing:normal;",
                    "%richTextContainer p": "margin:0;line-height:normal;letter-spacing:normal;",
                    "%richTextContainer h1": "margin:0;line-height:normal;letter-spacing:normal;",
                    "%richTextContainer h2": "margin:0;line-height:normal;letter-spacing:normal;",
                    "%richTextContainer h3": "margin:0;line-height:normal;letter-spacing:normal;",
                    "%richTextContainer h4": "margin:0;line-height:normal;letter-spacing:normal;",
                    "%richTextContainer h5": "margin:0;line-height:normal;letter-spacing:normal;",
                    "%richTextContainer h6": "margin:0;line-height:normal;letter-spacing:normal;",
                    "%richTextContainer a": "color:inherit;"
                }
            },
            "wysiwyg.viewer.skins.WRichTextNewSkin": {
                react: [],
                css: {
                    "%": "word-wrap:break-word;text-align:start;",
                    "%_override-left *": "text-align:left !important;",
                    "%_override-right *": "text-align:right !important;",
                    "%_override-center *": "text-align:center !important;",
                    "%_override-justify *": "text-align:justify !important;",
                    "% > *": "pointer-events:auto;",
                    "% li": "font-style:inherit;font-weight:inherit;line-height:inherit;letter-spacing:normal;",
                    "% ol,% ul": "padding-left:1.3em;padding-right:0;margin-left:0.5em;margin-right:0;line-height:normal;letter-spacing:normal;",
                    "% ul": "list-style-type:disc;",
                    "% ol": "list-style-type:decimal;",
                    "% ul ul,% ol ul": "list-style-type:circle;",
                    "% ul ul ul,% ol ul ul": "list-style-type:square;",
                    "% ul ol ul,% ol ol ul": "list-style-type:square;",
                    '% ul[dir="rtl"],% ol[dir="rtl"]': "padding-left:0;padding-right:1.3em;margin-left:0;margin-right:0.5em;",
                    '% ul[dir="rtl"] ul,% ul[dir="rtl"] ol,% ol[dir="rtl"] ul,% ol[dir="rtl"] ol': "padding-left:0;padding-right:1.3em;margin-left:0;margin-right:0.5em;",
                    "% p": "margin:0;line-height:normal;letter-spacing:normal;",
                    "% h1": "margin:0;line-height:normal;letter-spacing:normal;",
                    "% h2": "margin:0;line-height:normal;letter-spacing:normal;",
                    "% h3": "margin:0;line-height:normal;letter-spacing:normal;",
                    "% h4": "margin:0;line-height:normal;letter-spacing:normal;",
                    "% h5": "margin:0;line-height:normal;letter-spacing:normal;",
                    "% h6": "margin:0;line-height:normal;letter-spacing:normal;",
                    "% a": "color:inherit;"
                }
            },
            "wysiwyg.viewer.skins.WRichTextSkin": {
                react: [
                    ["div", "richTextContainer", ["_richTextContainer"], {}]
                ],
                css: {
                    "%richTextContainer": "position:relative;width:100%;height:100%;word-wrap:break-word;",
                    "%richTextContainer%_override-left *": "text-align:left !important;",
                    "%richTextContainer%_override-right *": "text-align:right !important;",
                    "%richTextContainer%_override-center *": "text-align:center !important;",
                    "%richTextContainer%_override-justify *": "text-align:justify !important;",
                    "%richTextContainer ul": "list-style:disc inside;",
                    "%richTextContainer li": "margin-bottom:12px;"
                }
            }
        };
        t.exports = r
    }, function(t, e, o) {
        "use strict";
        var r = o(0),
            i = o(2),
            n = o(108),
            a = i.cssUtils,
            s = i.fragment;

        function l(t) {
            var e = parseFloat(t);
            if (!isNaN(e)) return e
        }

        function d(t) {
            if (t) return r.head(t.split(","))
        }

        function p(t) {
            if (t) return new n(a.normalizeColorStr(t))
        }

        function c(t, e, o) {
            var r = t.getAttribute("style") || "",
                i = r.replace(new RegExp("(?:(^|;)\\s*)" + e + "\\s*:\\s*(?:.*?)\\s*(?:;|$)"), "$1") + ("" !== r && ";" !== r[r.length - 1] ? ";" : "") + e + ":" + o;
            t.setAttribute("style", i)
        }

        function u(t, e, o) {
            if (e.fontSize && e.fontSize % 1 == 0 && (t.style.fontSize || m(t, o))) {
                var r = parseFloat(o.scale);
                c(t, "font-size", Math.round(i.mobileUtils.convertFontSizeToMobile(e.fontSize, r)) + "px")
            }
        }

        function b(t, e, o) {
            if (function(t) {
                    if ("a" !== t.tagName.toLowerCase()) return;
                    var e = function t(e) {
                        var o = e.parentElement;
                        if (o && "span" === o.tagName.toLowerCase() && 1 === o.childNodes.length) return function(t) {
                            return !r.isEmpty(t.style.color) || t.className.match(/\bcolor_\d+\b/)
                        }(o) ? o : t(o);
                        return null
                    }(t);
                    if (e) ! function(t, e) {
                        t.style.color = e, t.className = t.className.replace(/\bcolor_\d+\b/, ""), r.isEmpty(t.className) && t.removeAttribute("class")
                    }(e, "#0000FF");
                    else {
                        var o = t.ownerDocument.createElement("span");
                        o.style.color = "#0000FF",
                            function(t, e) {
                                var o = t.parentNode,
                                    r = function(t) {
                                        for (var e = t.parentNode, o = 0; o < e.childNodes.length; o++)
                                            if (e.childNodes[o] === t) return o
                                    }(t);
                                e.appendChild(t), o.insertBefore(e, o.childNodes[r])
                            }(t, o)
                    }
                }(t), !(i = t) || !r.includes(["ol", "ul"], i.tagName.toLowerCase())) {
                var i, n = m(t, o);
                n && (r.includes(t.getAttribute("style"), "line-height") || c(t, "line-height", n.lineHeight))
            }
        }

        function g(t, e, o) {
            if (e.color) {
                var r = m(t, o);
                if (t.style.color || f(t, r, o)) {
                    var i = parseFloat(o.brightness);
                    c(t, "color", function(t, e) {
                        var o = "#000000" !== t.hexString() ? t.clone() : new n("#121212");
                        return o.lightness(o.hslArray()[2] * (e || 1)), o
                    }(e.color, i).rgbaString())
                }
            }
        }

        function h(t, e, o) {
            var r = m(t, o);
            (t.style.color || f(t, r, o) || function(t) {
                return !(!t || !t.color)
            }(r)) && c(t, "color", o.overrideColor.replace(/(^\d+,\d+,\d+,\d+$)/, "rgba($1)"))
        }

        function m(t, e) {
            var o = /(?:\s|^)(font_\d+)(?:\s|$)/g.exec(t.className);
            if (o) {
                var r = e.fontGetter && e.fontGetter(o[1]);
                return r ? a.parseFontStr(r) : void 0
            }
        }

        function f(t, e, o) {
            var i = function(t) {
                var e = /(?:\s|^)(color_\d+)(?:\s|$)/g.exec(t.className);
                if (e) return e[1]
            }(t) || function(t) {
                var e = /^{(color_\d+)}$/.exec(r.get(t, "color"));
                if (e) return e[1]
            }(e);
            if (i) {
                var n = o.colorGetter && o.colorGetter(i);
                return n || void 0
            }
        }

        function w(t, e, o, i) {
            var n = r.defaults(function(t) {
                var e = r(t.style).pick(["fontSize", "fontFamily", "color"]).omitBy(r.isEmpty).value();
                return {
                    fontSize: l(e.fontSize),
                    fontName: d(e.fontFamily),
                    color: p(e.color)
                }
            }(t), function(t, e) {
                var o = m(t, e),
                    i = f(t, o, e);
                return {
                    fontSize: l(r.get(o, "size")),
                    fontName: d(r.get(o, "family")),
                    color: p(i)
                }
            }(t, i), e);
            r.forEach(t.children, (function(t) {
                w(t, n, o, i)
            })), r.invokeMap(o, "call", null, t, n)
        }

        function _(t, e, o) {
            w(t, {
                characterCount: t.textContent.length
            }, e, o)
        }

        function v(t, e) {
            var o = function(t) {
                var e = [];
                return t.overrideColor ? e.push(r.partial(h, r, r, t)) : t.brightness && 1 !== parseFloat(t.brightness) && e.push(r.partial(g, r, r, t)), t.scale && e.push(r.partial(u, r, r, t)), t.fixMigratedStyle && e.push(r.partial(b, r, r, t)), e
            }(e);
            if (0 === o.length) return t;
            var i = s.document.createDocumentFragment().appendChild(s.document.createElement("div"));
            return i.innerHTML = t, r.forEach(i.children, r.partial(_, r, o, e)), i.innerHTML
        }
        t.exports = {
            applyMobileAdjustments: v,
            applyTextStyleMigrationAdjustments: function(t, e) {
                return v(t, {
                    fontGetter: e,
                    fixMigratedStyle: !0
                })
            }
        }
    }, function(t, e, o) {
        "use strict";
        var r = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(t) {
                return typeof t
            } : function(t) {
                return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t
            },
            i = o(109),
            n = o(111),
            a = function t(e) {
                if (e instanceof t) return e;
                if (!(this instanceof t)) return new t(e);
                var o;
                if (this.values = {
                        rgb: [0, 0, 0],
                        hsl: [0, 0, 0],
                        hsv: [0, 0, 0],
                        hwb: [0, 0, 0],
                        cmyk: [0, 0, 0, 0],
                        alpha: 1
                    }, "string" == typeof e)
                    if (o = n.getRgba(e)) this.setValues("rgb", o);
                    else if (o = n.getHsla(e)) this.setValues("hsl", o);
                else {
                    if (!(o = n.getHwb(e))) throw new Error('Unable to parse color from string "' + e + '"');
                    this.setValues("hwb", o)
                } else if ("object" === (void 0 === e ? "undefined" : r(e)))
                    if (void 0 !== (o = e).r || void 0 !== o.red) this.setValues("rgb", o);
                    else if (void 0 !== o.l || void 0 !== o.lightness) this.setValues("hsl", o);
                else if (void 0 !== o.v || void 0 !== o.value) this.setValues("hsv", o);
                else if (void 0 !== o.w || void 0 !== o.whiteness) this.setValues("hwb", o);
                else {
                    if (void 0 === o.c && void 0 === o.cyan) throw new Error("Unable to parse color from object " + JSON.stringify(e));
                    this.setValues("cmyk", o)
                }
            };
        (a.prototype = {
            rgb: function() {
                return this.setSpace("rgb", arguments)
            },
            hsl: function() {
                return this.setSpace("hsl", arguments)
            },
            hsv: function() {
                return this.setSpace("hsv", arguments)
            },
            hwb: function() {
                return this.setSpace("hwb", arguments)
            },
            cmyk: function() {
                return this.setSpace("cmyk", arguments)
            },
            rgbArray: function() {
                return this.values.rgb
            },
            hslArray: function() {
                return this.values.hsl
            },
            hsvArray: function() {
                return this.values.hsv
            },
            hwbArray: function() {
                return 1 !== this.values.alpha ? this.values.hwb.concat([this.values.alpha]) : this.values.hwb
            },
            cmykArray: function() {
                return this.values.cmyk
            },
            rgbaArray: function() {
                return this.values.rgb.concat([this.values.alpha])
            },
            hslaArray: function() {
                return this.values.hsl.concat([this.values.alpha])
            },
            alpha: function(t) {
                return void 0 === t ? this.values.alpha : (this.setValues("alpha", t), this)
            },
            red: function(t) {
                return this.setChannel("rgb", 0, t)
            },
            green: function(t) {
                return this.setChannel("rgb", 1, t)
            },
            blue: function(t) {
                return this.setChannel("rgb", 2, t)
            },
            hue: function(t) {
                return t && (t = (t %= 360) < 0 ? 360 + t : t), this.setChannel("hsl", 0, t)
            },
            saturation: function(t) {
                return this.setChannel("hsl", 1, t)
            },
            lightness: function(t) {
                return this.setChannel("hsl", 2, t)
            },
            saturationv: function(t) {
                return this.setChannel("hsv", 1, t)
            },
            whiteness: function(t) {
                return this.setChannel("hwb", 1, t)
            },
            blackness: function(t) {
                return this.setChannel("hwb", 2, t)
            },
            value: function(t) {
                return this.setChannel("hsv", 2, t)
            },
            cyan: function(t) {
                return this.setChannel("cmyk", 0, t)
            },
            magenta: function(t) {
                return this.setChannel("cmyk", 1, t)
            },
            yellow: function(t) {
                return this.setChannel("cmyk", 2, t)
            },
            black: function(t) {
                return this.setChannel("cmyk", 3, t)
            },
            hexString: function() {
                return n.hexString(this.values.rgb)
            },
            rgbString: function() {
                return n.rgbString(this.values.rgb, this.values.alpha)
            },
            rgbaString: function() {
                return n.rgbaString(this.values.rgb, this.values.alpha)
            },
            percentString: function() {
                return n.percentString(this.values.rgb, this.values.alpha)
            },
            hslString: function() {
                return n.hslString(this.values.hsl, this.values.alpha)
            },
            hslaString: function() {
                return n.hslaString(this.values.hsl, this.values.alpha)
            },
            hwbString: function() {
                return n.hwbString(this.values.hwb, this.values.alpha)
            },
            keyword: function() {
                return n.keyword(this.values.rgb, this.values.alpha)
            },
            rgbNumber: function() {
                return this.values.rgb[0] << 16 | this.values.rgb[1] << 8 | this.values.rgb[2]
            },
            luminosity: function() {
                for (var t = this.values.rgb, e = [], o = 0; o < t.length; o++) {
                    var r = t[o] / 255;
                    e[o] = r <= .03928 ? r / 12.92 : Math.pow((r + .055) / 1.055, 2.4)
                }
                return .2126 * e[0] + .7152 * e[1] + .0722 * e[2]
            },
            contrast: function(t) {
                var e = this.luminosity(),
                    o = t.luminosity();
                return e > o ? (e + .05) / (o + .05) : (o + .05) / (e + .05)
            },
            level: function(t) {
                var e = this.contrast(t);
                return e >= 7.1 ? "AAA" : e >= 4.5 ? "AA" : ""
            },
            dark: function() {
                var t = this.values.rgb;
                return (299 * t[0] + 587 * t[1] + 114 * t[2]) / 1e3 < 128
            },
            light: function() {
                return !this.dark()
            },
            negate: function() {
                for (var t = [], e = 0; e < 3; e++) t[e] = 255 - this.values.rgb[e];
                return this.setValues("rgb", t), this
            },
            lighten: function(t) {
                return this.values.hsl[2] += this.values.hsl[2] * t, this.setValues("hsl", this.values.hsl), this
            },
            darken: function(t) {
                return this.values.hsl[2] -= this.values.hsl[2] * t, this.setValues("hsl", this.values.hsl), this
            },
            saturate: function(t) {
                return this.values.hsl[1] += this.values.hsl[1] * t, this.setValues("hsl", this.values.hsl), this
            },
            desaturate: function(t) {
                return this.values.hsl[1] -= this.values.hsl[1] * t, this.setValues("hsl", this.values.hsl), this
            },
            whiten: function(t) {
                return this.values.hwb[1] += this.values.hwb[1] * t, this.setValues("hwb", this.values.hwb), this
            },
            blacken: function(t) {
                return this.values.hwb[2] += this.values.hwb[2] * t, this.setValues("hwb", this.values.hwb), this
            },
            greyscale: function() {
                var t = this.values.rgb,
                    e = .3 * t[0] + .59 * t[1] + .11 * t[2];
                return this.setValues("rgb", [e, e, e]), this
            },
            clearer: function(t) {
                return this.setValues("alpha", this.values.alpha - this.values.alpha * t), this
            },
            opaquer: function(t) {
                return this.setValues("alpha", this.values.alpha + this.values.alpha * t), this
            },
            rotate: function(t) {
                var e = this.values.hsl[0];
                return e = (e = (e + t) % 360) < 0 ? 360 + e : e, this.values.hsl[0] = e, this.setValues("hsl", this.values.hsl), this
            },
            mix: function(t, e) {
                var o = t,
                    r = void 0 === e ? .5 : e,
                    i = 2 * r - 1,
                    n = this.alpha() - o.alpha(),
                    a = ((i * n == -1 ? i : (i + n) / (1 + i * n)) + 1) / 2,
                    s = 1 - a;
                return this.rgb(a * this.red() + s * o.red(), a * this.green() + s * o.green(), a * this.blue() + s * o.blue()).alpha(this.alpha() * r + o.alpha() * (1 - r))
            },
            toJSON: function() {
                return this.rgb()
            },
            clone: function() {
                return new a(this.rgb())
            }
        }).getValues = function(t) {
            for (var e = {}, o = 0; o < t.length; o++) e[t.charAt(o)] = this.values[t][o];
            return 1 !== this.values.alpha && (e.a = this.values.alpha), e
        }, a.prototype.setValues = function(t, e) {
            var o, r, n = {
                    rgb: ["red", "green", "blue"],
                    hsl: ["hue", "saturation", "lightness"],
                    hsv: ["hue", "saturation", "value"],
                    hwb: ["hue", "whiteness", "blackness"],
                    cmyk: ["cyan", "magenta", "yellow", "black"]
                },
                a = {
                    rgb: [255, 255, 255],
                    hsl: [360, 100, 100],
                    hsv: [360, 100, 100],
                    hwb: [360, 100, 100],
                    cmyk: [100, 100, 100, 100]
                },
                s = 1;
            if ("alpha" === t) s = e;
            else if (e.length) this.values[t] = e.slice(0, t.length), s = e[t.length];
            else if (void 0 !== e[t.charAt(0)]) {
                for (o = 0; o < t.length; o++) this.values[t][o] = e[t.charAt(o)];
                s = e.a
            } else if (void 0 !== e[n[t][0]]) {
                var l = n[t];
                for (o = 0; o < t.length; o++) this.values[t][o] = e[l[o]];
                s = e.alpha
            }
            if (this.values.alpha = Math.max(0, Math.min(1, void 0 === s ? this.values.alpha : s)), "alpha" === t) return !1;
            for (o = 0; o < t.length; o++) r = Math.max(0, Math.min(a[t][o], this.values[t][o])), this.values[t][o] = Math.round(r);
            for (var d in n)
                for (d !== t && (this.values[d] = i[t][d](this.values[t])), o = 0; o < d.length; o++) r = Math.max(0, Math.min(a[d][o], this.values[d][o])), this.values[d][o] = Math.round(r);
            return !0
        }, a.prototype.setSpace = function(t, e) {
            var o = e[0];
            return void 0 === o ? this.getValues(t) : ("number" == typeof o && (o = Array.prototype.slice.call(e)), this.setValues(t, o), this)
        }, a.prototype.setChannel = function(t, e, o) {
            return void 0 === o ? this.values[t][e] : o === this.values[t][e] ? this : (this.values[t][e] = o, this.setValues(t, this.values[t]), this)
        }, t.exports = a
    }, function(t, e, o) {
        "use strict";
        var r = o(110),
            i = function() {
                return new d
            };
        for (var n in r) {
            i[n + "Raw"] = function(t) {
                return function(e) {
                    return "number" == typeof e && (e = Array.prototype.slice.call(arguments)), r[t](e)
                }
            }(n);
            var a = /(\w+)2(\w+)/.exec(n),
                s = a[1],
                l = a[2];
            (i[s] = i[s] || {})[l] = i[n] = function(t) {
                return function(e) {
                    "number" == typeof e && (e = Array.prototype.slice.call(arguments));
                    var o = r[t](e);
                    if ("string" == typeof o || void 0 === o) return o;
                    for (var i = 0; i < o.length; i++) o[i] = Math.round(o[i]);
                    return o
                }
            }(n)
        }
        var d = function() {
            this.convs = {}
        };
        d.prototype.routeSpace = function(t, e) {
            var o = e[0];
            return void 0 === o ? this.getValues(t) : ("number" == typeof o && (o = Array.prototype.slice.call(e)), this.setValues(t, o))
        }, d.prototype.setValues = function(t, e) {
            return this.space = t, this.convs = {}, this.convs[t] = e, this
        }, d.prototype.getValues = function(t) {
            var e = this.convs[t];
            if (!e) {
                var o = this.space,
                    r = this.convs[o];
                e = i[o][t](r), this.convs[t] = e
            }
            return e
        }, ["rgb", "hsl", "hsv", "cmyk", "keyword"].forEach((function(t) {
            d.prototype[t] = function(e) {
                return this.routeSpace(t, arguments)
            }
        })), t.exports = i
    }, function(t, e, o) {
        "use strict";

        function i(t) {
            var e, o, r = t[0] / 255,
                i = t[1] / 255,
                n = t[2] / 255,
                a = Math.min(r, i, n),
                s = Math.max(r, i, n),
                l = s - a;
            return s == a ? e = 0 : r == s ? e = (i - n) / l : i == s ? e = 2 + (n - r) / l : n == s && (e = 4 + (r - i) / l), (e = Math.min(60 * e, 360)) < 0 && (e += 360), o = (a + s) / 2, [e, 100 * (s == a ? 0 : o <= .5 ? l / (s + a) : l / (2 - s - a)), 100 * o]
        }

        function n(t) {
            var e, o, r = t[0],
                i = t[1],
                n = t[2],
                a = Math.min(r, i, n),
                s = Math.max(r, i, n),
                l = s - a;
            return o = 0 == s ? 0 : l / s * 1e3 / 10, s == a ? e = 0 : r == s ? e = (i - n) / l : i == s ? e = 2 + (n - r) / l : n == s && (e = 4 + (r - i) / l), (e = Math.min(60 * e, 360)) < 0 && (e += 360), [e, o, s / 255 * 1e3 / 10]
        }

        function a(t) {
            var e = t[0],
                o = t[1],
                r = t[2];
            return [i(t)[0], 100 * (1 / 255 * Math.min(e, Math.min(o, r))), 100 * (r = 1 - 1 / 255 * Math.max(e, Math.max(o, r)))]
        }

        function s(t) {
            var e, o = t[0] / 255,
                r = t[1] / 255,
                i = t[2] / 255;
            return [100 * ((1 - o - (e = Math.min(1 - o, 1 - r, 1 - i))) / (1 - e) || 0), 100 * ((1 - r - e) / (1 - e) || 0), 100 * ((1 - i - e) / (1 - e) || 0), 100 * e]
        }

        function l(t) {
            return O[JSON.stringify(t)]
        }

        function d(t) {
            var e = t[0] / 255,
                o = t[1] / 255,
                r = t[2] / 255;
            return [100 * (.4124 * (e = e > .04045 ? Math.pow((e + .055) / 1.055, 2.4) : e / 12.92) + .3576 * (o = o > .04045 ? Math.pow((o + .055) / 1.055, 2.4) : o / 12.92) + .1805 * (r = r > .04045 ? Math.pow((r + .055) / 1.055, 2.4) : r / 12.92)), 100 * (.2126 * e + .7152 * o + .0722 * r), 100 * (.0193 * e + .1192 * o + .9505 * r)]
        }

        function p(t) {
            var e = d(t),
                o = e[0],
                r = e[1],
                i = e[2];
            return r /= 100, i /= 108.883, o = (o /= 95.047) > .008856 ? Math.pow(o, 1 / 3) : 7.787 * o + 16 / 116, [116 * (r = r > .008856 ? Math.pow(r, 1 / 3) : 7.787 * r + 16 / 116) - 16, 500 * (o - r), 200 * (r - (i = i > .008856 ? Math.pow(i, 1 / 3) : 7.787 * i + 16 / 116))]
        }

        function c(t) {
            var e, o, r, i, n, a = t[0] / 360,
                s = t[1] / 100,
                l = t[2] / 100;
            if (0 == s) return [n = 255 * l, n, n];
            e = 2 * l - (o = l < .5 ? l * (1 + s) : l + s - l * s), i = [0, 0, 0];
            for (var d = 0; d < 3; d++)(r = a + 1 / 3 * -(d - 1)) < 0 && r++, r > 1 && r--, n = 6 * r < 1 ? e + 6 * (o - e) * r : 2 * r < 1 ? o : 3 * r < 2 ? e + (o - e) * (2 / 3 - r) * 6 : e, i[d] = 255 * n;
            return i
        }

        function u(t) {
            var e = t[0] / 60,
                o = t[1] / 100,
                r = t[2] / 100,
                i = Math.floor(e) % 6,
                n = e - Math.floor(e),
                a = 255 * r * (1 - o),
                s = 255 * r * (1 - o * n),
                l = 255 * r * (1 - o * (1 - n));
            r *= 255;
            switch (i) {
                case 0:
                    return [r, l, a];
                case 1:
                    return [s, r, a];
                case 2:
                    return [a, r, l];
                case 3:
                    return [a, s, r];
                case 4:
                    return [l, a, r];
                case 5:
                    return [r, a, s]
            }
        }

        function h(t) {
            var e, o, i, n, a = t[0] / 360,
                s = t[1] / 100,
                l = t[2] / 100,
                d = s + l;
            switch (d > 1 && (s /= d, l /= d), i = 6 * a - (e = Math.floor(6 * a)), 0 != (1 & e) && (i = 1 - i), n = s + i * ((o = 1 - l) - s), e) {
                default:
                    case 6:
                    case 0:
                    r = o,
                g = n,
                b = s;
                break;
                case 1:
                        r = n,
                    g = o,
                    b = s;
                    break;
                case 2:
                        r = s,
                    g = o,
                    b = n;
                    break;
                case 3:
                        r = s,
                    g = n,
                    b = o;
                    break;
                case 4:
                        r = n,
                    g = s,
                    b = o;
                    break;
                case 5:
                        r = o,
                    g = s,
                    b = n
            }
            return [255 * r, 255 * g, 255 * b]
        }

        function m(t) {
            var e = t[0] / 100,
                o = t[1] / 100,
                r = t[2] / 100,
                i = t[3] / 100;
            return [255 * (1 - Math.min(1, e * (1 - i) + i)), 255 * (1 - Math.min(1, o * (1 - i) + i)), 255 * (1 - Math.min(1, r * (1 - i) + i))]
        }

        function f(t) {
            var e, o, r, i = t[0] / 100,
                n = t[1] / 100,
                a = t[2] / 100;
            return o = -.9689 * i + 1.8758 * n + .0415 * a, r = .0557 * i + -.204 * n + 1.057 * a, e = (e = 3.2406 * i + -1.5372 * n + -.4986 * a) > .0031308 ? 1.055 * Math.pow(e, 1 / 2.4) - .055 : e *= 12.92, o = o > .0031308 ? 1.055 * Math.pow(o, 1 / 2.4) - .055 : o *= 12.92, r = r > .0031308 ? 1.055 * Math.pow(r, 1 / 2.4) - .055 : r *= 12.92, [255 * (e = Math.min(Math.max(0, e), 1)), 255 * (o = Math.min(Math.max(0, o), 1)), 255 * (r = Math.min(Math.max(0, r), 1))]
        }

        function w(t) {
            var e = t[0],
                o = t[1],
                r = t[2];
            return o /= 100, r /= 108.883, e = (e /= 95.047) > .008856 ? Math.pow(e, 1 / 3) : 7.787 * e + 16 / 116, [116 * (o = o > .008856 ? Math.pow(o, 1 / 3) : 7.787 * o + 16 / 116) - 16, 500 * (e - o), 200 * (o - (r = r > .008856 ? Math.pow(r, 1 / 3) : 7.787 * r + 16 / 116))]
        }

        function _(t) {
            var e, o, r, i, n = t[0],
                a = t[1],
                s = t[2];
            return n <= 8 ? i = (o = 100 * n / 903.3) / 100 * 7.787 + 16 / 116 : (o = 100 * Math.pow((n + 16) / 116, 3), i = Math.pow(o / 100, 1 / 3)), [e = e / 95.047 <= .008856 ? e = 95.047 * (a / 500 + i - 16 / 116) / 7.787 : 95.047 * Math.pow(a / 500 + i, 3), o, r = r / 108.883 <= .008859 ? r = 108.883 * (i - s / 200 - 16 / 116) / 7.787 : 108.883 * Math.pow(i - s / 200, 3)]
        }

        function v(t) {
            var e, o = t[0],
                r = t[1],
                i = t[2];
            return (e = 360 * Math.atan2(i, r) / 2 / Math.PI) < 0 && (e += 360), [o, Math.sqrt(r * r + i * i), e]
        }

        function x(t) {
            return f(_(t))
        }

        function y(t) {
            var e, o = t[0],
                r = t[1];
            return e = t[2] / 360 * 2 * Math.PI, [o, r * Math.cos(e), r * Math.sin(e)]
        }

        function k(t) {
            return R[t]
        }
        t.exports = {
            rgb2hsl: i,
            rgb2hsv: n,
            rgb2hwb: a,
            rgb2cmyk: s,
            rgb2keyword: l,
            rgb2xyz: d,
            rgb2lab: p,
            rgb2lch: function(t) {
                return v(p(t))
            },
            hsl2rgb: c,
            hsl2hsv: function(t) {
                var e = t[0],
                    o = t[1] / 100,
                    r = t[2] / 100;
                if (0 === r) return [0, 0, 0];
                return [e, 100 * (2 * (o *= (r *= 2) <= 1 ? r : 2 - r) / (r + o)), 100 * ((r + o) / 2)]
            },
            hsl2hwb: function(t) {
                return a(c(t))
            },
            hsl2cmyk: function(t) {
                return s(c(t))
            },
            hsl2keyword: function(t) {
                return l(c(t))
            },
            hsv2rgb: u,
            hsv2hsl: function(t) {
                var e, o, r = t[0],
                    i = t[1] / 100,
                    n = t[2] / 100;
                return e = i * n, [r, 100 * (e = (e /= (o = (2 - i) * n) <= 1 ? o : 2 - o) || 0), 100 * (o /= 2)]
            },
            hsv2hwb: function(t) {
                return a(u(t))
            },
            hsv2cmyk: function(t) {
                return s(u(t))
            },
            hsv2keyword: function(t) {
                return l(u(t))
            },
            hwb2rgb: h,
            hwb2hsl: function(t) {
                return i(h(t))
            },
            hwb2hsv: function(t) {
                return n(h(t))
            },
            hwb2cmyk: function(t) {
                return s(h(t))
            },
            hwb2keyword: function(t) {
                return l(h(t))
            },
            cmyk2rgb: m,
            cmyk2hsl: function(t) {
                return i(m(t))
            },
            cmyk2hsv: function(t) {
                return n(m(t))
            },
            cmyk2hwb: function(t) {
                return a(m(t))
            },
            cmyk2keyword: function(t) {
                return l(m(t))
            },
            keyword2rgb: k,
            keyword2hsl: function(t) {
                return i(k(t))
            },
            keyword2hsv: function(t) {
                return n(k(t))
            },
            keyword2hwb: function(t) {
                return a(k(t))
            },
            keyword2cmyk: function(t) {
                return s(k(t))
            },
            keyword2lab: function(t) {
                return p(k(t))
            },
            keyword2xyz: function(t) {
                return d(k(t))
            },
            xyz2rgb: f,
            xyz2lab: w,
            xyz2lch: function(t) {
                return v(w(t))
            },
            lab2xyz: _,
            lab2rgb: x,
            lab2lch: v,
            lch2lab: y,
            lch2xyz: function(t) {
                return _(y(t))
            },
            lch2rgb: function(t) {
                return x(y(t))
            }
        };
        var R = {
                aliceblue: [240, 248, 255],
                antiquewhite: [250, 235, 215],
                aqua: [0, 255, 255],
                aquamarine: [127, 255, 212],
                azure: [240, 255, 255],
                beige: [245, 245, 220],
                bisque: [255, 228, 196],
                black: [0, 0, 0],
                blanchedalmond: [255, 235, 205],
                blue: [0, 0, 255],
                blueviolet: [138, 43, 226],
                brown: [165, 42, 42],
                burlywood: [222, 184, 135],
                cadetblue: [95, 158, 160],
                chartreuse: [127, 255, 0],
                chocolate: [210, 105, 30],
                coral: [255, 127, 80],
                cornflowerblue: [100, 149, 237],
                cornsilk: [255, 248, 220],
                crimson: [220, 20, 60],
                cyan: [0, 255, 255],
                darkblue: [0, 0, 139],
                darkcyan: [0, 139, 139],
                darkgoldenrod: [184, 134, 11],
                darkgray: [169, 169, 169],
                darkgreen: [0, 100, 0],
                darkgrey: [169, 169, 169],
                darkkhaki: [189, 183, 107],
                darkmagenta: [139, 0, 139],
                darkolivegreen: [85, 107, 47],
                darkorange: [255, 140, 0],
                darkorchid: [153, 50, 204],
                darkred: [139, 0, 0],
                darksalmon: [233, 150, 122],
                darkseagreen: [143, 188, 143],
                darkslateblue: [72, 61, 139],
                darkslategray: [47, 79, 79],
                darkslategrey: [47, 79, 79],
                darkturquoise: [0, 206, 209],
                darkviolet: [148, 0, 211],
                deeppink: [255, 20, 147],
                deepskyblue: [0, 191, 255],
                dimgray: [105, 105, 105],
                dimgrey: [105, 105, 105],
                dodgerblue: [30, 144, 255],
                firebrick: [178, 34, 34],
                floralwhite: [255, 250, 240],
                forestgreen: [34, 139, 34],
                fuchsia: [255, 0, 255],
                gainsboro: [220, 220, 220],
                ghostwhite: [248, 248, 255],
                gold: [255, 215, 0],
                goldenrod: [218, 165, 32],
                gray: [128, 128, 128],
                green: [0, 128, 0],
                greenyellow: [173, 255, 47],
                grey: [128, 128, 128],
                honeydew: [240, 255, 240],
                hotpink: [255, 105, 180],
                indianred: [205, 92, 92],
                indigo: [75, 0, 130],
                ivory: [255, 255, 240],
                khaki: [240, 230, 140],
                lavender: [230, 230, 250],
                lavenderblush: [255, 240, 245],
                lawngreen: [124, 252, 0],
                lemonchiffon: [255, 250, 205],
                lightblue: [173, 216, 230],
                lightcoral: [240, 128, 128],
                lightcyan: [224, 255, 255],
                lightgoldenrodyellow: [250, 250, 210],
                lightgray: [211, 211, 211],
                lightgreen: [144, 238, 144],
                lightgrey: [211, 211, 211],
                lightpink: [255, 182, 193],
                lightsalmon: [255, 160, 122],
                lightseagreen: [32, 178, 170],
                lightskyblue: [135, 206, 250],
                lightslategray: [119, 136, 153],
                lightslategrey: [119, 136, 153],
                lightsteelblue: [176, 196, 222],
                lightyellow: [255, 255, 224],
                lime: [0, 255, 0],
                limegreen: [50, 205, 50],
                linen: [250, 240, 230],
                magenta: [255, 0, 255],
                maroon: [128, 0, 0],
                mediumaquamarine: [102, 205, 170],
                mediumblue: [0, 0, 205],
                mediumorchid: [186, 85, 211],
                mediumpurple: [147, 112, 219],
                mediumseagreen: [60, 179, 113],
                mediumslateblue: [123, 104, 238],
                mediumspringgreen: [0, 250, 154],
                mediumturquoise: [72, 209, 204],
                mediumvioletred: [199, 21, 133],
                midnightblue: [25, 25, 112],
                mintcream: [245, 255, 250],
                mistyrose: [255, 228, 225],
                moccasin: [255, 228, 181],
                navajowhite: [255, 222, 173],
                navy: [0, 0, 128],
                oldlace: [253, 245, 230],
                olive: [128, 128, 0],
                olivedrab: [107, 142, 35],
                orange: [255, 165, 0],
                orangered: [255, 69, 0],
                orchid: [218, 112, 214],
                palegoldenrod: [238, 232, 170],
                palegreen: [152, 251, 152],
                paleturquoise: [175, 238, 238],
                palevioletred: [219, 112, 147],
                papayawhip: [255, 239, 213],
                peachpuff: [255, 218, 185],
                peru: [205, 133, 63],
                pink: [255, 192, 203],
                plum: [221, 160, 221],
                powderblue: [176, 224, 230],
                purple: [128, 0, 128],
                rebeccapurple: [102, 51, 153],
                red: [255, 0, 0],
                rosybrown: [188, 143, 143],
                royalblue: [65, 105, 225],
                saddlebrown: [139, 69, 19],
                salmon: [250, 128, 114],
                sandybrown: [244, 164, 96],
                seagreen: [46, 139, 87],
                seashell: [255, 245, 238],
                sienna: [160, 82, 45],
                silver: [192, 192, 192],
                skyblue: [135, 206, 235],
                slateblue: [106, 90, 205],
                slategray: [112, 128, 144],
                slategrey: [112, 128, 144],
                snow: [255, 250, 250],
                springgreen: [0, 255, 127],
                steelblue: [70, 130, 180],
                tan: [210, 180, 140],
                teal: [0, 128, 128],
                thistle: [216, 191, 216],
                tomato: [255, 99, 71],
                turquoise: [64, 224, 208],
                violet: [238, 130, 238],
                wheat: [245, 222, 179],
                white: [255, 255, 255],
                whitesmoke: [245, 245, 245],
                yellow: [255, 255, 0],
                yellowgreen: [154, 205, 50]
            },
            O = {};
        for (var C in R) O[JSON.stringify(R[C])] = C
    }, function(t, e, o) {
        "use strict";
        var r = o(112);

        function i(t) {
            if (t) {
                var e = [0, 0, 0],
                    o = 1,
                    i = t.match(/^#([a-fA-F0-9]{3})$/);
                if (i) {
                    i = i[1];
                    for (var n = 0; n < e.length; n++) e[n] = parseInt(i[n] + i[n], 16)
                } else if (i = t.match(/^#([a-fA-F0-9]{6})$/)) {
                    i = i[1];
                    for (n = 0; n < e.length; n++) e[n] = parseInt(i.slice(2 * n, 2 * n + 2), 16)
                } else if (i = t.match(/^rgba?\(\s*([+-]?\d+)\s*,\s*([+-]?\d+)\s*,\s*([+-]?\d+)\s*(?:,\s*([+-]?[\d\.]+)\s*)?\)$/)) {
                    for (n = 0; n < e.length; n++) e[n] = parseInt(i[n + 1]);
                    o = parseFloat(i[4])
                } else if (i = t.match(/^rgba?\(\s*([+-]?[\d\.]+)\%\s*,\s*([+-]?[\d\.]+)\%\s*,\s*([+-]?[\d\.]+)\%\s*(?:,\s*([+-]?[\d\.]+)\s*)?\)$/)) {
                    for (n = 0; n < e.length; n++) e[n] = Math.round(2.55 * parseFloat(i[n + 1]));
                    o = parseFloat(i[4])
                } else if (i = t.match(/(\D+)/)) {
                    if ("transparent" == i[1]) return [0, 0, 0, 0];
                    if (!(e = r[i[1]])) return
                }
                for (n = 0; n < e.length; n++) e[n] = p(e[n], 0, 255);
                return o = o || 0 == o ? p(o, 0, 1) : 1, e[3] = o, e
            }
        }

        function n(t) {
            if (t) {
                var e = t.match(/^hsla?\(\s*([+-]?\d+)(?:deg)?\s*,\s*([+-]?[\d\.]+)%\s*,\s*([+-]?[\d\.]+)%\s*(?:,\s*([+-]?[\d\.]+)\s*)?\)/);
                if (e) {
                    var o = parseFloat(e[4]);
                    return [p(parseInt(e[1]), 0, 360), p(parseFloat(e[2]), 0, 100), p(parseFloat(e[3]), 0, 100), p(isNaN(o) ? 1 : o, 0, 1)]
                }
            }
        }

        function a(t) {
            if (t) {
                var e = t.match(/^hwb\(\s*([+-]?\d+)(?:deg)?\s*,\s*([+-]?[\d\.]+)%\s*,\s*([+-]?[\d\.]+)%\s*(?:,\s*([+-]?[\d\.]+)\s*)?\)/);
                if (e) {
                    var o = parseFloat(e[4]);
                    return [p(parseInt(e[1]), 0, 360), p(parseFloat(e[2]), 0, 100), p(parseFloat(e[3]), 0, 100), p(isNaN(o) ? 1 : o, 0, 1)]
                }
            }
        }

        function s(t, e) {
            return void 0 === e && (e = void 0 !== t[3] ? t[3] : 1), "rgba(" + t[0] + ", " + t[1] + ", " + t[2] + ", " + e + ")"
        }

        function l(t, e) {
            return "rgba(" + Math.round(t[0] / 255 * 100) + "%, " + Math.round(t[1] / 255 * 100) + "%, " + Math.round(t[2] / 255 * 100) + "%, " + (e || t[3] || 1) + ")"
        }

        function d(t, e) {
            return void 0 === e && (e = void 0 !== t[3] ? t[3] : 1), "hsla(" + t[0] + ", " + t[1] + "%, " + t[2] + "%, " + e + ")"
        }

        function p(t, e, o) {
            return Math.min(Math.max(e, t), o)
        }

        function c(t) {
            var e = t.toString(16).toUpperCase();
            return e.length < 2 ? "0" + e : e
        }
        t.exports = {
            getRgba: i,
            getHsla: n,
            getRgb: function(t) {
                var e = i(t);
                return e && e.slice(0, 3)
            },
            getHsl: function(t) {
                var e = n(t);
                return e && e.slice(0, 3)
            },
            getHwb: a,
            getAlpha: function(t) {
                var e = i(t);
                if (e) return e[3];
                if (e = n(t)) return e[3];
                if (e = a(t)) return e[3]
            },
            hexString: function(t) {
                return "#" + c(t[0]) + c(t[1]) + c(t[2])
            },
            rgbString: function(t, e) {
                if (e < 1 || t[3] && t[3] < 1) return s(t, e);
                return "rgb(" + t[0] + ", " + t[1] + ", " + t[2] + ")"
            },
            rgbaString: s,
            percentString: function(t, e) {
                if (e < 1 || t[3] && t[3] < 1) return l(t, e);
                var o = Math.round(t[0] / 255 * 100),
                    r = Math.round(t[1] / 255 * 100),
                    i = Math.round(t[2] / 255 * 100);
                return "rgb(" + o + "%, " + r + "%, " + i + "%)"
            },
            percentaString: l,
            hslString: function(t, e) {
                if (e < 1 || t[3] && t[3] < 1) return d(t, e);
                return "hsl(" + t[0] + ", " + t[1] + "%, " + t[2] + "%)"
            },
            hslaString: d,
            hwbString: function(t, e) {
                void 0 === e && (e = void 0 !== t[3] ? t[3] : 1);
                return "hwb(" + t[0] + ", " + t[1] + "%, " + t[2] + "%" + (void 0 !== e && 1 !== e ? ", " + e : "") + ")"
            },
            keyword: function(t) {
                return u[t.slice(0, 3)]
            }
        };
        var u = {};
        for (var b in r) u[r[b]] = b
    }, function(t, e, o) {
        "use strict";
        t.exports = {
            aliceblue: [240, 248, 255],
            antiquewhite: [250, 235, 215],
            aqua: [0, 255, 255],
            aquamarine: [127, 255, 212],
            azure: [240, 255, 255],
            beige: [245, 245, 220],
            bisque: [255, 228, 196],
            black: [0, 0, 0],
            blanchedalmond: [255, 235, 205],
            blue: [0, 0, 255],
            blueviolet: [138, 43, 226],
            brown: [165, 42, 42],
            burlywood: [222, 184, 135],
            cadetblue: [95, 158, 160],
            chartreuse: [127, 255, 0],
            chocolate: [210, 105, 30],
            coral: [255, 127, 80],
            cornflowerblue: [100, 149, 237],
            cornsilk: [255, 248, 220],
            crimson: [220, 20, 60],
            cyan: [0, 255, 255],
            darkblue: [0, 0, 139],
            darkcyan: [0, 139, 139],
            darkgoldenrod: [184, 134, 11],
            darkgray: [169, 169, 169],
            darkgreen: [0, 100, 0],
            darkgrey: [169, 169, 169],
            darkkhaki: [189, 183, 107],
            darkmagenta: [139, 0, 139],
            darkolivegreen: [85, 107, 47],
            darkorange: [255, 140, 0],
            darkorchid: [153, 50, 204],
            darkred: [139, 0, 0],
            darksalmon: [233, 150, 122],
            darkseagreen: [143, 188, 143],
            darkslateblue: [72, 61, 139],
            darkslategray: [47, 79, 79],
            darkslategrey: [47, 79, 79],
            darkturquoise: [0, 206, 209],
            darkviolet: [148, 0, 211],
            deeppink: [255, 20, 147],
            deepskyblue: [0, 191, 255],
            dimgray: [105, 105, 105],
            dimgrey: [105, 105, 105],
            dodgerblue: [30, 144, 255],
            firebrick: [178, 34, 34],
            floralwhite: [255, 250, 240],
            forestgreen: [34, 139, 34],
            fuchsia: [255, 0, 255],
            gainsboro: [220, 220, 220],
            ghostwhite: [248, 248, 255],
            gold: [255, 215, 0],
            goldenrod: [218, 165, 32],
            gray: [128, 128, 128],
            green: [0, 128, 0],
            greenyellow: [173, 255, 47],
            grey: [128, 128, 128],
            honeydew: [240, 255, 240],
            hotpink: [255, 105, 180],
            indianred: [205, 92, 92],
            indigo: [75, 0, 130],
            ivory: [255, 255, 240],
            khaki: [240, 230, 140],
            lavender: [230, 230, 250],
            lavenderblush: [255, 240, 245],
            lawngreen: [124, 252, 0],
            lemonchiffon: [255, 250, 205],
            lightblue: [173, 216, 230],
            lightcoral: [240, 128, 128],
            lightcyan: [224, 255, 255],
            lightgoldenrodyellow: [250, 250, 210],
            lightgray: [211, 211, 211],
            lightgreen: [144, 238, 144],
            lightgrey: [211, 211, 211],
            lightpink: [255, 182, 193],
            lightsalmon: [255, 160, 122],
            lightseagreen: [32, 178, 170],
            lightskyblue: [135, 206, 250],
            lightslategray: [119, 136, 153],
            lightslategrey: [119, 136, 153],
            lightsteelblue: [176, 196, 222],
            lightyellow: [255, 255, 224],
            lime: [0, 255, 0],
            limegreen: [50, 205, 50],
            linen: [250, 240, 230],
            magenta: [255, 0, 255],
            maroon: [128, 0, 0],
            mediumaquamarine: [102, 205, 170],
            mediumblue: [0, 0, 205],
            mediumorchid: [186, 85, 211],
            mediumpurple: [147, 112, 219],
            mediumseagreen: [60, 179, 113],
            mediumslateblue: [123, 104, 238],
            mediumspringgreen: [0, 250, 154],
            mediumturquoise: [72, 209, 204],
            mediumvioletred: [199, 21, 133],
            midnightblue: [25, 25, 112],
            mintcream: [245, 255, 250],
            mistyrose: [255, 228, 225],
            moccasin: [255, 228, 181],
            navajowhite: [255, 222, 173],
            navy: [0, 0, 128],
            oldlace: [253, 245, 230],
            olive: [128, 128, 0],
            olivedrab: [107, 142, 35],
            orange: [255, 165, 0],
            orangered: [255, 69, 0],
            orchid: [218, 112, 214],
            palegoldenrod: [238, 232, 170],
            palegreen: [152, 251, 152],
            paleturquoise: [175, 238, 238],
            palevioletred: [219, 112, 147],
            papayawhip: [255, 239, 213],
            peachpuff: [255, 218, 185],
            peru: [205, 133, 63],
            pink: [255, 192, 203],
            plum: [221, 160, 221],
            powderblue: [176, 224, 230],
            purple: [128, 0, 128],
            rebeccapurple: [102, 51, 153],
            red: [255, 0, 0],
            rosybrown: [188, 143, 143],
            royalblue: [65, 105, 225],
            saddlebrown: [139, 69, 19],
            salmon: [250, 128, 114],
            sandybrown: [244, 164, 96],
            seagreen: [46, 139, 87],
            seashell: [255, 245, 238],
            sienna: [160, 82, 45],
            silver: [192, 192, 192],
            skyblue: [135, 206, 235],
            slateblue: [106, 90, 205],
            slategray: [112, 128, 144],
            slategrey: [112, 128, 144],
            snow: [255, 250, 250],
            springgreen: [0, 255, 127],
            steelblue: [70, 130, 180],
            tan: [210, 180, 140],
            teal: [0, 128, 128],
            thistle: [216, 191, 216],
            tomato: [255, 99, 71],
            turquoise: [64, 224, 208],
            violet: [238, 130, 238],
            wheat: [245, 222, 179],
            white: [255, 255, 255],
            whitesmoke: [245, 245, 245],
            yellow: [255, 255, 0],
            yellowgreen: [154, 205, 50]
        }
    }, function(t, e, o) {
        "use strict";
        var r = o(5)(o(60));
        t.exports = r
    }, function(t, e, o) {
        "use strict";
        var r = {
            "wysiwyg.viewer.skins.ClipArtSkin": {
                react: [
                    ["div", "outerFrame", [], {},
                        ["a", "link", [], {},
                            ["div", "wrp", [], {},
                                ["div", "img", [], {}]
                            ]
                        ]
                    ]
                ],
                exports: {
                    img: {
                        skin: "mobile.core.skins.ImageNewSkin"
                    }
                },
                css: {
                    "%wrp": "position:absolute;top:0;right:0;bottom:0;left:0;",
                    "%img": "height:100%;"
                }
            },
            "wysiwyg.viewer.skins.photo.CirclePhoto": {
                react: [
                    ["a", "link", [], {},
                        ["div", "img", [], {}]
                    ]
                ],
                exports: {
                    img: {
                        skin: "skins.core.ImageNewSkinZoomable"
                    }
                },
                params: {
                    tdr: "URL",
                    shd: "BOX_SHADOW",
                    brw: "BORDER_SIZE",
                    brd: "BORDER_COLOR_ALPHA",
                    contentPaddingLeft: "BORDER_SIZE",
                    contentPaddingRight: "BORDER_SIZE",
                    contentPaddingBottom: "BORDER_SIZE",
                    contentPaddingTop: "BORDER_SIZE"
                },
                paramsDefaults: {
                    tdr: "BASE_THEME_DIRECTORY",
                    shd: "0 1px 3px rgba(0, 0, 0, 0.5)",
                    brw: "2px",
                    brd: "color_11",
                    contentPaddingLeft: ["brw"],
                    contentPaddingRight: ["brw"],
                    contentPaddingBottom: ["brw"],
                    contentPaddingTop: ["brw"]
                },
                css: {
                    "%_zoomedin": "cursor:url([tdr]cursor_zoom_out.png), url([tdr]cursor_zoom_out.cur), auto;overflow:hidden;display:block;",
                    "%_zoomedout": "cursor:url([tdr]cursor_zoom_in.png), url([tdr]cursor_zoom_in.cur), auto;",
                    "%link": "display:block;[shd]  border-radius:50%;border:[brw] solid [brd];background-color:[brd];overflow:hidden;",
                    "%img": "border-radius:50%;overflow:hidden;"
                }
            },
            "wysiwyg.viewer.skins.photo.DefaultPhoto": {
                react: [
                    ["a", "link", [], {},
                        ["div", "img", [], {}]
                    ]
                ],
                exports: {
                    contentPaddingLeft: 0,
                    contentPaddingRight: 0,
                    contentPaddingTop: 0,
                    contentPaddingBottom: 0,
                    img: {
                        skin: "skins.core.ImageNewSkinZoomable"
                    }
                },
                params: {
                    tdr: "URL"
                },
                paramsDefaults: {
                    tdr: "BASE_THEME_DIRECTORY"
                },
                css: {
                    "%_zoomedin": "cursor:url([tdr]cursor_zoom_out.png), url([tdr]cursor_zoom_out.cur), auto;overflow:hidden;display:block;",
                    "%_zoomedout": "cursor:url([tdr]cursor_zoom_in.png), url([tdr]cursor_zoom_in.cur), auto;",
                    "%link": "display:block;overflow:hidden;",
                    "%img": "overflow:hidden;"
                }
            },
            "wysiwyg.viewer.skins.photo.DoubleBorderCirclePhoto": {
                react: [
                    ["a", "link", [], {},
                        ["div", "img", [], {}]
                    ]
                ],
                exports: {
                    img: {
                        skin: "skins.core.ImageNewSkinZoomable"
                    }
                },
                params: {
                    bg: "BG_COLOR_ALPHA",
                    sz1: "BORDER_SIZE",
                    brd1: "BORDER_COLOR_ALPHA",
                    rd: "BORDER_RADIUS",
                    shd: "BOX_SHADOW",
                    sz2: "MARGIN_SIZE",
                    sz4: "MARGIN_SIZE",
                    sz3: "BORDER_SIZE",
                    brd2: "BORDER_COLOR_ALPHA",
                    contentPaddingLeft: "MARGIN_SIZE",
                    contentPaddingRight: "MARGIN_SIZE",
                    contentPaddingBottom: "MARGIN_SIZE",
                    contentPaddingTop: "MARGIN_SIZE"
                },
                paramsDefaults: {
                    bg: "color_11",
                    sz1: "4px",
                    brd1: "color_14",
                    rd: "50%",
                    shd: "0 1px 3px rgba(0, 0, 0, 0.5)",
                    sz2: "6px",
                    sz4: "10px",
                    sz3: "8px",
                    brd2: "color_14",
                    contentPaddingLeft: ["sz2"],
                    contentPaddingRight: ["sz2"],
                    contentPaddingBottom: ["sz2"],
                    contentPaddingTop: ["sz2"]
                },
                css: {
                    "%": "background-color:[bg];border:[sz1] solid [brd1];box-sizing:border-box !important;[rd]  [shd]",
                    "%link": "box-sizing:border-box !important;position:relative;margin:[sz2];display:block;[rd]  overflow:hidden;height:100%;",
                    "%:after": 'position:absolute;content:"";top:[sz4];bottom:[sz4];left:[sz4];right:[sz4];border:[sz3] solid [brd2];[rd]',
                    "%img": "box-sizing:border-box !important;overflow:hidden;"
                }
            },
            "wysiwyg.viewer.skins.photo.DoubleBorderPhoto": {
                react: [
                    ["a", "link", [], {},
                        ["div", null, ["_wrap"], {},
                            ["div", "img", [], {}]
                        ],
                        ["b", null, ["_one"], {}],
                        ["b", null, ["_two"], {}],
                        ["b", null, ["_three"], {}]
                    ]
                ],
                exports: {
                    img: {
                        skin: "skins.core.ImageNewSkinZoomable"
                    }
                },
                params: {
                    tdr: "URL",
                    bg: "BG_COLOR_ALPHA",
                    rd: "BORDER_RADIUS",
                    shd: "BOX_SHADOW",
                    mrg1: "MARGIN_SIZE",
                    brd1: "BORDER_COLOR_ALPHA",
                    sz1: "BORDER_SIZE",
                    brd2: "BORDER_COLOR_ALPHA",
                    sz2: "BORDER_SIZE",
                    mrg2: "MARGIN_SIZE",
                    contentPaddingLeft: "MARGIN_SIZE",
                    contentPaddingRight: "MARGIN_SIZE",
                    contentPaddingBottom: "MARGIN_SIZE",
                    contentPaddingTop: "MARGIN_SIZE"
                },
                paramsDefaults: {
                    tdr: "BASE_THEME_DIRECTORY",
                    bg: "color_11",
                    rd: "0",
                    shd: "0 1px 3px rgba(0, 0, 0, 0.5)",
                    mrg1: "7px",
                    brd1: "color_15",
                    sz1: "3px",
                    brd2: "color_14",
                    sz2: "1px",
                    mrg2: "5px",
                    contentPaddingLeft: ["mrg1"],
                    contentPaddingRight: ["mrg1"],
                    contentPaddingBottom: ["mrg1"],
                    contentPaddingTop: ["mrg1"]
                },
                css: {
                    "%_zoomedin": "cursor:url([tdr]cursor_zoom_out.png), url([tdr]cursor_zoom_out.cur), auto;overflow:hidden;display:block;",
                    "%_zoomedout": "cursor:url([tdr]cursor_zoom_in.png), url([tdr]cursor_zoom_in.cur), auto;",
                    "%": "background-color:[bg];[rd]  [shd]",
                    "%inlineContent": "position:absolute;top:0;right:0;bottom:0;left:0;",
                    "%_wrap": "[rd]  box-sizing:border-box !important;display:block;overflow:hidden;position:absolute;top:[mrg1];bottom:[mrg1];left:[mrg1];right:[mrg1];",
                    "%img": "[rd]  box-sizing:border-box !important;display:block;position:absolute;overflow:hidden;",
                    "% b": "display:block;position:absolute;top:0;right:0;bottom:0;left:0;border-style:solid;[rd]  pointer-events:none;",
                    "%_one": "border-color:[brd1];border-width:[sz1];",
                    "%_two": "border-color:[brd2];border-width:[sz2];margin:[mrg2];",
                    "%_three": "[rd]  box-sizing:border-box !important;display:block;overflow:hidden;position:absolute;top:0;right:0;bottom:0;left:0;"
                }
            },
            "wysiwyg.viewer.skins.photo.GlowLinePhoto": {
                react: [
                    ["a", "link", [], {},
                        ["div", "img", [], {}],
                        ["div", null, ["_imgGlow"], {}]
                    ]
                ],
                exports: {
                    img: {
                        skin: "skins.core.ImageNewSkinZoomable"
                    }
                },
                params: {
                    tdr: "URL",
                    rd: "BORDER_RADIUS",
                    shd: "BOX_SHADOW",
                    contentPaddingLeft: "SIZE",
                    contentPaddingRight: "SIZE",
                    contentPaddingTop: "SIZE",
                    contentPaddingBottom: "SIZE"
                },
                paramsDefaults: {
                    tdr: "BASE_THEME_DIRECTORY",
                    rd: "2px",
                    shd: "0 2px 5px rgba(0, 0, 0, 0.53)",
                    contentPaddingLeft: "0",
                    contentPaddingRight: "0",
                    contentPaddingTop: "0",
                    contentPaddingBottom: "0"
                },
                css: {
                    "%_zoomedin": "cursor:url([tdr]cursor_zoom_out.png), url([tdr]cursor_zoom_out.cur), auto;overflow:hidden;display:block;",
                    "%_zoomedout": "cursor:url([tdr]cursor_zoom_in.png), url([tdr]cursor_zoom_in.cur), auto;",
                    "%link": "display:block;[rd]  [shd]  overflow:hidden;height:100%;position:relative;",
                    "%_imgGlow": "box-shadow:rgba(255, 255, 255, 0.59) 0 0 6px 0 inset, rgba(255, 255, 255, 0.92) 0 1px 0 0 inset, rgba(255, 255, 255, 0.2) 0 0 5px 0 inset;[rd]  position:absolute;top:0;right:0;bottom:0;left:0;pointer-events:none;",
                    "%img": "[rd]  overflow:hidden;"
                }
            },
            "wysiwyg.viewer.skins.photo.IronPhoto": {
                react: [
                    ["a", "link", [], {},
                        ["div", "img", [], {}],
                        ["div", null, ["_imgGlow"], {}],
                        ["div", null, ["_screwTL", "_screw"], {}],
                        ["div", null, ["_screwTR", "_screw"], {}],
                        ["div", null, ["_screwBL", "_screw"], {}],
                        ["div", null, ["_screwBR", "_screw"], {}]
                    ]
                ],
                exports: {
                    img: {
                        skin: "skins.core.ImageNewSkinZoomable"
                    }
                },
                params: {
                    tdr: "URL",
                    rd: "BORDER_RADIUS",
                    bg: "BG_COLOR_ALPHA",
                    shd: "BOX_SHADOW",
                    contentPaddingLeft: "SIZE",
                    contentPaddingRight: "SIZE",
                    contentPaddingBottom: "SIZE",
                    contentPaddingTop: "SIZE"
                },
                paramsDefaults: {
                    tdr: "BASE_THEME_DIRECTORY",
                    rd: "2px",
                    bg: "color_11",
                    shd: "0 2px 5px rgba(0, 0, 0, 0.53)",
                    contentPaddingLeft: "12px",
                    contentPaddingRight: "12px",
                    contentPaddingBottom: "12px",
                    contentPaddingTop: "12px"
                },
                css: {
                    "%_zoomedin": "cursor:url([tdr]cursor_zoom_out.png), url([tdr]cursor_zoom_out.cur), auto;overflow:hidden;display:block;",
                    "%_zoomedout": "cursor:url([tdr]cursor_zoom_in.png), url([tdr]cursor_zoom_in.cur), auto;",
                    "%link": "display:block;[rd]  background-color:[bg];[shd]  overflow:hidden;height:100% !important;width:100% !important;background-image:url([tdr]ironpatern.png);position:relative;",
                    "%_imgGlow": "box-shadow:rgba(255, 255, 255, 0.59) 0 0 6px 0 inset, rgba(255, 255, 255, 0.92) 0 1px 0 0 inset, rgba(255, 255, 255, 0.2) 0 0 5px 0 inset;[rd]  position:absolute;top:0;right:0;bottom:0;left:0;pointer-events:none;",
                    "%img": "[rd]  overflow:hidden;overflow:hidden;margin:12px;",
                    "%_screw": "display:inline-block;background-image:url([tdr]skrew.png);background-repeat:no-repeat;width:15px;height:15px;pointer-events:none;",
                    "%_screwTL": "position:absolute;top:5px;left:5px;",
                    "%_screwTR": "position:absolute;top:5px;right:5px;",
                    "%_screwBL": "position:absolute;bottom:5px;left:5px;",
                    "%_screwBR": "position:absolute;bottom:5px;right:5px;"
                }
            },
            "wysiwyg.viewer.skins.photo.LiftedShadowPhoto": {
                react: [
                    ["div", null, ["_left", "_shd"], {}],
                    ["div", null, ["_right", "_shd"], {}],
                    ["a", "link", [], {},
                        ["div", "img", [], {}]
                    ]
                ],
                exports: {
                    img: {
                        skin: "skins.core.ImageNewSkinZoomable"
                    }
                },
                params: {
                    tdr: "URL",
                    rd: "BORDER_RADIUS",
                    brd: "BORDER_COLOR_ALPHA",
                    brw: "BORDER_SIZE",
                    sizeRd: "SIZE",
                    sizeBrw: "SIZE",
                    contentPaddingLeft: "BORDER_SIZE",
                    contentPaddingRight: "BORDER_SIZE",
                    contentPaddingBottom: "BORDER_SIZE",
                    contentPaddingTop: "BORDER_SIZE"
                },
                paramsDefaults: {
                    tdr: "BASE_THEME_DIRECTORY",
                    rd: "3px",
                    brd: "color_15",
                    brw: "2px",
                    sizeRd: ["rd"],
                    sizeBrw: ["brw"],
                    contentPaddingLeft: ["brw"],
                    contentPaddingRight: ["brw"],
                    contentPaddingBottom: ["brw"],
                    contentPaddingTop: ["brw"]
                },
                css: {
                    "%_zoomedin": "cursor:url([tdr]cursor_zoom_out.png), url([tdr]cursor_zoom_out.cur), auto;overflow:hidden;display:block;",
                    "%_zoomedout": "cursor:url([tdr]cursor_zoom_in.png), url([tdr]cursor_zoom_in.cur), auto;",
                    "%link": "display:block;[rd]  box-shadow:0 0 3px rgba(0, 0, 0, 0.5);background-color:[brd];border:[brw] solid [brd];overflow:hidden;",
                    "%img": "overflow:hidden;border-radius:calc([sizeRd] - [sizeBrw]);",
                    "%_shd": "position:absolute;bottom:-26px;width:165px;height:26px;background-image:url([tdr]liftedshadow_medium.png);background-repeat:no-repeat;",
                    "%_left": "left:-20px;background-position:0 0;",
                    "%_right": "right:-20px;background-position:100% 0;"
                }
            },
            "wysiwyg.viewer.skins.photo.LiftedTopPhoto": {
                react: [
                    ["div", null, ["_left", "_shd"], {}],
                    ["div", null, ["_right", "_shd"], {}],
                    ["a", "link", [], {},
                        ["div", "img", [], {}]
                    ]
                ],
                exports: {
                    img: {
                        skin: "skins.core.ImageNewSkinZoomable"
                    }
                },
                params: {
                    tdr: "URL",
                    rd: "BORDER_RADIUS",
                    brd: "BORDER_COLOR_ALPHA",
                    brw: "BORDER_SIZE",
                    sizeRd: "SIZE",
                    sizeBrw: "SIZE",
                    contentPaddingLeft: "BORDER_SIZE",
                    contentPaddingRight: "BORDER_SIZE",
                    contentPaddingBottom: "BORDER_SIZE",
                    contentPaddingTop: "BORDER_SIZE"
                },
                paramsDefaults: {
                    tdr: "BASE_THEME_DIRECTORY",
                    rd: "3px",
                    brd: "color_15",
                    brw: "2px",
                    sizeRd: ["rd"],
                    sizeBrw: ["brw"],
                    contentPaddingLeft: ["brw"],
                    contentPaddingRight: ["brw"],
                    contentPaddingBottom: ["brw"],
                    contentPaddingTop: ["brw"]
                },
                css: {
                    "%_zoomedin": "cursor:url([tdr]cursor_zoom_out.png), url([tdr]cursor_zoom_out.cur), auto;overflow:hidden;display:block;",
                    "%_zoomedout": "cursor:url([tdr]cursor_zoom_in.png), url([tdr]cursor_zoom_in.cur), auto;",
                    "%link": "display:block;[rd]  box-shadow:0 0 5px rgba(0, 0, 0, 0.1);background-color:[brd];border:[brw] solid [brd];overflow:hidden;",
                    "%img": "overflow:hidden;border-radius:calc([sizeRd] - [sizeBrw]);",
                    "%link:after": 'content:"";position:absolute;height:2px;left:0;right:0;bottom:-2px;background:url([tdr]lifted_top_shades.png) center top no-repeat;',
                    "%_shd": "position:absolute;bottom:4%;top:0;width:24px;background-image:url([tdr]lifted_top_shades.png);background-repeat:no-repeat;",
                    "%_left": "left:-24px;background-position:100% 100%;",
                    "%_right": "right:-24px;background-position:0 100%;"
                }
            },
            "wysiwyg.viewer.skins.photo.MouseOverPhoto": {
                react: [
                    ["a", "link", [], {},
                        ["div", "img", [], {}],
                        ["div", "rollover", [], {}]
                    ]
                ],
                exports: {
                    img: {
                        skin: "skins.core.ImageNewSkinZoomable"
                    }
                },
                params: {
                    tdr: "URL",
                    rd: "BORDER_RADIUS",
                    shd: "BOX_SHADOW",
                    brd: "BORDER_COLOR_ALPHA",
                    brw: "BORDER_SIZE",
                    sizeRd: "SIZE",
                    sizeBrw: "SIZE",
                    trans: "TRANSITION",
                    bgh: "BG_COLOR_ALPHA",
                    contentPaddingLeft: "BORDER_SIZE",
                    contentPaddingRight: "BORDER_SIZE",
                    contentPaddingBottom: "BORDER_SIZE",
                    contentPaddingTop: "BORDER_SIZE"
                },
                paramsDefaults: {
                    tdr: "BASE_THEME_DIRECTORY",
                    rd: "5px",
                    shd: "0 1px 3px rgba(0, 0, 0, 0.5)",
                    brd: "color_11",
                    brw: "2px",
                    sizeRd: ["rd"],
                    sizeBrw: ["brw"],
                    trans: "opacity 0.4s ease 0s",
                    bgh: "color_15",
                    contentPaddingLeft: ["brw"],
                    contentPaddingRight: ["brw"],
                    contentPaddingBottom: ["brw"],
                    contentPaddingTop: ["brw"]
                },
                css: {
                    "%_zoomedin": "cursor:url([tdr]cursor_zoom_out.png), url([tdr]cursor_zoom_out.cur), auto;overflow:hidden;display:block;",
                    "%_zoomedout": "cursor:url([tdr]cursor_zoom_in.png), url([tdr]cursor_zoom_in.cur), auto;",
                    "%link": "[rd]  [shd]  display:block;background-color:[brd];border:[brw] solid [brd];overflow:hidden;height:100%;",
                    "%img": "overflow:hidden;border-radius:calc([sizeRd] - [sizeBrw]);",
                    "%rollover": "[rd]  [trans]  background-color:[bgh];position:absolute;top:0;left:0;width:100%;height:100%;display:block;opacity:0;pointer-events:none;",
                    "%:hover %rollover": "opacity:1;"
                }
            },
            "wysiwyg.viewer.skins.photo.NewPolaroidPhoto": {
                react: [
                    ["div", null, ["_shadowImgTL", "_bgShadow"], {}],
                    ["div", null, ["_shadowImgTR", "_bgShadow"], {}],
                    ["div", null, ["_shadowImgBL", "_bgShadow"], {}],
                    ["div", null, ["_shadowImgBR", "_bgShadow"], {}],
                    ["a", "link", [], {},
                        ["div", "img", [], {}]
                    ]
                ],
                exports: {
                    contentPaddingBottom: "50px",
                    img: {
                        skin: "skins.core.ImageNewSkinZoomable"
                    }
                },
                params: {
                    tdr: "URL",
                    shd: "BOX_SHADOW",
                    bg: "BG_COLOR_ALPHA",
                    brw: "BORDER_SIZE",
                    contentPaddingLeft: "BORDER_SIZE",
                    contentPaddingRight: "BORDER_SIZE",
                    contentPaddingTop: "BORDER_SIZE",
                    contentPaddingBottom: "BORDER_SIZE"
                },
                paramsDefaults: {
                    tdr: "BASE_THEME_DIRECTORY",
                    shd: "0 1px 2px 1px rgba(0, 0, 0, 0.1)",
                    bg: "color_11",
                    brw: "10px",
                    contentPaddingLeft: ["brw"],
                    contentPaddingRight: ["brw"],
                    contentPaddingTop: ["brw"],
                    contentPaddingBottom: ["brw"]
                },
                css: {
                    "%_zoomedin": "cursor:url([tdr]cursor_zoom_out.png), url([tdr]cursor_zoom_out.cur), auto;overflow:hidden;display:block;",
                    "%_zoomedout": "cursor:url([tdr]cursor_zoom_in.png), url([tdr]cursor_zoom_in.cur), auto;",
                    "%link": "display:block;position:absolute;top:0;right:0;bottom:0;left:0;[shd]  background-color:[bg];border:[brw] solid transparent;overflow:hidden;padding:0 0 50px;",
                    "%_bgShadow": "background:url([tdr]shadow_photo.png) no-repeat;width:168px;height:154px;opacity:0.8;",
                    "%img": "overflow:hidden;",
                    "%_shadowImgTL,%_shadowImgTR,%_shadowImgBL,%_shadowImgBR": "position:absolute;",
                    "%_shadowImgTL": "background-position:0 0;left:-13px;top:-15px;",
                    "%_shadowImgTR": "background-position:100% 0;right:-15px;top:-14px;",
                    "%_shadowImgBL": "background-position:0 100%;left:-14px;bottom:-13px;",
                    "%_shadowImgBR": "background-position:100% 100%;right:-16px;bottom:-14px;"
                }
            },
            "wysiwyg.viewer.skins.photo.NoSkinPhoto": {
                react: [
                    ["a", "link", [], {},
                        ["div", "img", [], {}]
                    ]
                ],
                exports: {
                    img: {
                        skin: "skins.core.ImageNewSkinZoomable"
                    }
                },
                params: {
                    tdr: "URL",
                    contentPaddingLeft: "SIZE",
                    contentPaddingRight: "SIZE",
                    contentPaddingTop: "SIZE",
                    contentPaddingBottom: "SIZE"
                },
                paramsDefaults: {
                    tdr: "BASE_THEME_DIRECTORY",
                    contentPaddingLeft: "0",
                    contentPaddingRight: "0",
                    contentPaddingTop: "0",
                    contentPaddingBottom: "0"
                },
                css: {
                    "%_zoomedin": "cursor:url([tdr]cursor_zoom_out.png), url([tdr]cursor_zoom_out.cur), auto;overflow:hidden;display:block;",
                    "%_zoomedout": "cursor:url([tdr]cursor_zoom_in.png), url([tdr]cursor_zoom_in.cur), auto;",
                    "%link": "display:block;overflow:hidden;",
                    "%img": "overflow:hidden;",
                    "%[data-is-responsive=true] %link,%[data-is-responsive=true] %img,%[data-is-responsive=true] wix-image": "position:absolute;top:0;right:0;bottom:0;left:0;"
                }
            },
            "wysiwyg.viewer.skins.photo.PaperclipPhoto": {
                react: [
                    ["a", "link", [], {},
                        ["div", "outerFrame", [], {},
                            ["div", "wrp", [], {},
                                ["div", "img", [], {}]
                            ]
                        ],
                        ["div", null, ["_xxx"], {}]
                    ],
                    ["div", "clip", [], {}]
                ],
                exports: {
                    img: {
                        skin: "skins.core.ImageNewSkin"
                    }
                },
                params: {
                    shd: "BOX_SHADOW",
                    bg: "BG_COLOR_ALPHA",
                    tdr: "URL"
                },
                paramsDefaults: {
                    shd: "0 1px 3px rgba(0, 0, 0, 0.5)",
                    bg: "color_11",
                    tdr: "BASE_THEME_DIRECTORY"
                },
                css: {
                    "%link": "display:block;position:absolute;top:0;right:0;bottom:0;left:0;",
                    "%wrp": "position:absolute;top:0;right:0;bottom:0;left:0;padding:10px;[shd]  background-color:[bg];",
                    "%img": "position:absolute;width:100%;height:100%;",
                    "%_xxx": "position:absolute;top:0;right:0;bottom:0;left:0;background:url([tdr]net.png) center center repeat;",
                    "%clip": "position:absolute;top:-65px;right:50%;margin-right:-32px;width:65px;height:87px;background-image:url([tdr]icon_clip.png);"
                }
            },
            "wysiwyg.viewer.skins.photo.PolaroidPhoto": {
                react: [
                    ["a", "link", [], {},
                        ["div", "img", [], {}]
                    ]
                ],
                exports: {
                    contentPaddingBottom: "30px",
                    img: {
                        skin: "skins.core.ImageNewSkinZoomable"
                    }
                },
                params: {
                    tdr: "URL",
                    rd: "BORDER_RADIUS",
                    shd: "BOX_SHADOW",
                    brd: "BORDER_COLOR_ALPHA",
                    brw: "BORDER_SIZE",
                    sizeRd: "SIZE",
                    sizeBrw: "SIZE",
                    contentPaddingLeft: "BORDER_SIZE",
                    contentPaddingRight: "BORDER_SIZE",
                    contentPaddingTop: "BORDER_SIZE",
                    contentPaddingBottom: "BORDER_SIZE"
                },
                paramsDefaults: {
                    tdr: "BASE_THEME_DIRECTORY",
                    rd: "5px",
                    shd: "0 1px 3px rgba(0, 0, 0, 0.5)",
                    brd: "color_15",
                    brw: "2px",
                    sizeRd: ["rd"],
                    sizeBrw: ["brw"],
                    contentPaddingLeft: ["brw"],
                    contentPaddingRight: ["brw"],
                    contentPaddingTop: ["brw"],
                    contentPaddingBottom: ["brw"]
                },
                css: {
                    "%_zoomedin": "cursor:url([tdr]cursor_zoom_out.png), url([tdr]cursor_zoom_out.cur), auto;overflow:hidden;display:block;",
                    "%_zoomedout": "cursor:url([tdr]cursor_zoom_in.png), url([tdr]cursor_zoom_in.cur), auto;",
                    "%link": "display:block;[rd]  [shd]  background-color:[brd];border:[brw] solid [brd];overflow:hidden;padding:0 0 30px 0;",
                    "%img": "overflow:hidden;border-radius:calc([sizeRd] - [sizeBrw]);"
                }
            },
            "wysiwyg.viewer.skins.photo.RoundPhoto": {
                react: [
                    ["a", "link", [], {},
                        ["div", "img", [], {}]
                    ]
                ],
                exports: {
                    img: {
                        skin: "skins.core.ImageNewSkinZoomable"
                    }
                },
                params: {
                    tdr: "URL",
                    rd: "BORDER_RADIUS",
                    shd: "BOX_SHADOW",
                    brd: "BORDER_COLOR_ALPHA",
                    brw: "BORDER_SIZE",
                    sizeRd: "SIZE",
                    sizeBrw: "SIZE",
                    contentPaddingLeft: "BORDER_SIZE",
                    contentPaddingRight: "BORDER_SIZE",
                    contentPaddingBottom: "BORDER_SIZE",
                    contentPaddingTop: "BORDER_SIZE"
                },
                paramsDefaults: {
                    tdr: "BASE_THEME_DIRECTORY",
                    rd: "5px",
                    shd: "0 1px 3px rgba(0, 0, 0, 0.5)",
                    brd: "color_11",
                    brw: "2px",
                    sizeRd: ["rd"],
                    sizeBrw: ["brw"],
                    contentPaddingLeft: ["brw"],
                    contentPaddingRight: ["brw"],
                    contentPaddingBottom: ["brw"],
                    contentPaddingTop: ["brw"]
                },
                css: {
                    "%_zoomedin": "cursor:url([tdr]cursor_zoom_out.png), url([tdr]cursor_zoom_out.cur), auto;overflow:hidden;display:block;",
                    "%_zoomedout": "cursor:url([tdr]cursor_zoom_in.png), url([tdr]cursor_zoom_in.cur), auto;",
                    "%link": "display:block;[rd]  [shd]  background-color:[brd];border:[brw] solid [brd];overflow:hidden;height:100%;",
                    "%img": "overflow:hidden;border-radius:calc([sizeRd] - [sizeBrw]);"
                }
            },
            "wysiwyg.viewer.skins.photo.RoundShadowPhoto": {
                react: [
                    ["a", "link", [], {},
                        ["div", "img", [], {}]
                    ]
                ],
                exports: {
                    img: {
                        skin: "skins.core.ImageNewSkinZoomable"
                    }
                },
                params: {
                    tdr: "URL",
                    rd: "BORDER_RADIUS",
                    shd: "BOX_SHADOW",
                    brd: "BORDER_COLOR_ALPHA",
                    brw: "BORDER_SIZE",
                    contentPaddingLeft: "BORDER_SIZE",
                    contentPaddingRight: "BORDER_SIZE",
                    contentPaddingBottom: "BORDER_SIZE",
                    contentPaddingTop: "BORDER_SIZE"
                },
                paramsDefaults: {
                    tdr: "BASE_THEME_DIRECTORY",
                    rd: "5px",
                    shd: "0 1px 3px rgba(0, 0, 0, 0.5)",
                    brd: "color_15",
                    brw: "2px",
                    contentPaddingLeft: ["brw"],
                    contentPaddingRight: ["brw"],
                    contentPaddingBottom: ["brw"],
                    contentPaddingTop: ["brw"]
                },
                css: {
                    "%": "background:url([tdr]net.png) center center repeat;",
                    "%link": "display:block;[rd]  [shd]  background-color:[brd];border:[brw] solid [brd];overflow:hidden;height:100%;",
                    "%img": "[rd]  overflow:hidden;"
                }
            },
            "wysiwyg.viewer.skins.photo.ScotchDoubleHorizontal": {
                react: [
                    ["a", "link", [], {},
                        ["div", "img", [], {}]
                    ],
                    ["div", null, ["_ScotchT"], {}],
                    ["div", null, ["_ScotchB"], {}]
                ],
                exports: {
                    img: {
                        skin: "skins.core.ImageNewSkinZoomable"
                    }
                },
                params: {
                    tdr: "URL",
                    rd: "BORDER_RADIUS",
                    shd: "BOX_SHADOW",
                    brw: "BORDER_SIZE",
                    brd: "BORDER_COLOR_ALPHA",
                    sizeRd: "SIZE",
                    sizeBrw: "SIZE",
                    contentPaddingLeft: "BORDER_SIZE",
                    contentPaddingRight: "BORDER_SIZE",
                    contentPaddingBottom: "BORDER_SIZE",
                    contentPaddingTop: "BORDER_SIZE"
                },
                paramsDefaults: {
                    tdr: "BASE_THEME_DIRECTORY",
                    rd: "0",
                    shd: "0 2px 5px rgba(0, 0, 0, 0.15)",
                    brw: "10px",
                    brd: "color_11",
                    sizeRd: ["rd"],
                    sizeBrw: ["brw"],
                    contentPaddingLeft: ["brw"],
                    contentPaddingRight: ["brw"],
                    contentPaddingBottom: ["brw"],
                    contentPaddingTop: ["brw"]
                },
                css: {
                    "%_zoomedin": "cursor:url([tdr]cursor_zoom_out.png), url([tdr]cursor_zoom_out.cur), auto;overflow:hidden;display:block;",
                    "%_zoomedout": "cursor:url([tdr]cursor_zoom_in.png), url([tdr]cursor_zoom_in.cur), auto;",
                    "%link": "display:block;[rd]  [shd]  overflow:hidden;height:100%;border:[brw] solid [brd];position:relative;",
                    "%_imgGlow": "box-shadow:inset 0 2px 0 rgba(255, 255, 255, 0.21), inset 0 1px 4px 1px rgba(255, 255, 255, 0.2);[rd]  position:absolute;top:0;right:0;bottom:0;left:0;",
                    "%img": "overflow:hidden;border-radius:calc([sizeRd] - [sizeBrw]);",
                    "%_ScotchT": "position:absolute;display:inline-block;background-image:url([tdr]scotcht.png);background-repeat:no-repeat;width:78px;height:40px;top:-20px;left:50%;margin-left:-39px;",
                    "%_ScotchB": "position:absolute;display:inline-block;background-image:url([tdr]scotchb.png);background-repeat:no-repeat;width:100px;height:48px;bottom:-20px;right:50%;margin-right:-50px;"
                }
            },
            "wysiwyg.viewer.skins.photo.ScotchDoubleVertical": {
                react: [
                    ["a", "link", [], {},
                        ["div", "img", [], {}]
                    ],
                    ["div", null, ["_ScotchL"], {}],
                    ["div", null, ["_ScotchR"], {}]
                ],
                exports: {
                    img: {
                        skin: "skins.core.ImageNewSkinZoomable"
                    }
                },
                params: {
                    tdr: "URL",
                    rd: "BORDER_RADIUS",
                    shd: "BOX_SHADOW",
                    brw: "BORDER_SIZE",
                    brd: "BORDER_COLOR_ALPHA",
                    sizeRd: "SIZE",
                    sizeBrw: "SIZE",
                    contentPaddingLeft: "BORDER_SIZE",
                    contentPaddingRight: "BORDER_SIZE",
                    contentPaddingBottom: "BORDER_SIZE",
                    contentPaddingTop: "BORDER_SIZE"
                },
                paramsDefaults: {
                    tdr: "BASE_THEME_DIRECTORY",
                    rd: "0",
                    shd: "0 2px 5px rgba(0, 0, 0, 0.15)",
                    brw: "10px",
                    brd: "color_11",
                    sizeRd: ["rd"],
                    sizeBrw: ["brw"],
                    contentPaddingLeft: ["brw"],
                    contentPaddingRight: ["brw"],
                    contentPaddingBottom: ["brw"],
                    contentPaddingTop: ["brw"]
                },
                css: {
                    "%_zoomedin": "cursor:url([tdr]cursor_zoom_out.png), url([tdr]cursor_zoom_out.cur), auto;overflow:hidden;display:block;",
                    "%_zoomedout": "cursor:url([tdr]cursor_zoom_in.png), url([tdr]cursor_zoom_in.cur), auto;",
                    "%link": "display:block;[rd]  [shd]  overflow:hidden;height:100%;border:[brw] solid [brd];position:relative;",
                    "%_imgGlow": "box-shadow:inset 0 2px 0 rgba(255, 255, 255, 0.21), inset 0 1px 4px 1px rgba(255, 255, 255, 0.2);[rd]  position:absolute;top:0;right:0;bottom:0;left:0;",
                    "%img": "overflow:hidden;border-radius:calc([sizeRd] - [sizeBrw]);",
                    "%_ScotchL": "position:absolute;display:inline-block;background-image:url([tdr]scotchl.png);background-repeat:no-repeat;width:85px;height:86px;top:-20px;left:-30px;",
                    "%_ScotchR": "position:absolute;display:inline-block;background-image:url([tdr]scotchr.png);background-repeat:no-repeat;width:85px;height:86px;top:-20px;right:-30px;"
                }
            },
            "wysiwyg.viewer.skins.photo.ScotchTapePhoto": {
                react: [
                    ["a", "link", [], {},
                        ["div", "outerFrame", [], {},
                            ["div", "wrp", [], {},
                                ["div", "img", [], {}]
                            ],
                            ["div", "left", [], {}],
                            ["div", "right", [], {}]
                        ],
                        ["div", null, ["_xxx"], {}]
                    ]
                ],
                exports: {
                    img: {
                        skin: "skins.core.ImageNewSkin"
                    }
                },
                params: {
                    shd: "BOX_SHADOW",
                    bg: "BG_COLOR_ALPHA",
                    tdr: "URL"
                },
                paramsDefaults: {
                    shd: "0 1px 3px rgba(0, 0, 0, 0.5)",
                    bg: "color_11",
                    tdr: "BASE_THEME_DIRECTORY"
                },
                css: {
                    "%link": "display:block;position:absolute;top:0;right:0;bottom:0;left:0;",
                    "%wrp": "position:absolute;top:0;right:0;bottom:0;left:0;padding:10px;[shd]  background-color:[bg];",
                    "%_xxx": "position:absolute;top:0;right:0;bottom:0;left:0;background:url([tdr]net.png) center center repeat;",
                    "%left": "position:absolute;top:-20px;left:-30px;width:120px;height:86px;background-image:url([tdr]scotch_tape.png);background-repeat:no-repeat;background-position:0 0;",
                    "%right": "position:absolute;top:-20px;right:-30px;width:120px;height:88px;background-image:url([tdr]scotch_tape.png);background-repeat:no-repeat;background-position:100% 100%;"
                }
            },
            "wysiwyg.viewer.skins.photo.ScotchTopPhoto": {
                react: [
                    ["a", "link", [], {},
                        ["div", "img", [], {}]
                    ],
                    ["div", null, ["_Scotch"], {}]
                ],
                exports: {
                    img: {
                        skin: "skins.core.ImageNewSkinZoomable"
                    }
                },
                params: {
                    tdr: "URL",
                    rd: "BORDER_RADIUS",
                    shd: "BOX_SHADOW",
                    brw: "BORDER_SIZE",
                    brd: "BORDER_COLOR_ALPHA",
                    sizeRd: "SIZE",
                    sizeBrw: "SIZE",
                    contentPaddingLeft: "BORDER_SIZE",
                    contentPaddingRight: "BORDER_SIZE",
                    contentPaddingBottom: "BORDER_SIZE",
                    contentPaddingTop: "BORDER_SIZE"
                },
                paramsDefaults: {
                    tdr: "BASE_THEME_DIRECTORY",
                    rd: "0",
                    shd: "0 2px 5px rgba(0, 0, 0, 0.15)",
                    brw: "10px",
                    brd: "color_11",
                    sizeRd: ["rd"],
                    sizeBrw: ["brw"],
                    contentPaddingLeft: ["brw"],
                    contentPaddingRight: ["brw"],
                    contentPaddingBottom: ["brw"],
                    contentPaddingTop: ["brw"]
                },
                css: {
                    "%_zoomedin": "cursor:url([tdr]cursor_zoom_out.png), url([tdr]cursor_zoom_out.cur), auto;overflow:hidden;display:block;",
                    "%_zoomedout": "cursor:url([tdr]cursor_zoom_in.png), url([tdr]cursor_zoom_in.cur), auto;",
                    "%link": "display:block;[rd]  [shd]  overflow:hidden;height:100%;border:[brw] solid [brd];position:relative;",
                    "%_imgGlow": "box-shadow:inset 0 2px 0 rgba(255, 255, 255, 0.21), inset 0 1px 4px 1px rgba(255, 255, 255, 0.2);[rd]  position:absolute;top:0;right:0;bottom:0;left:0;",
                    "%img": "overflow:hidden;border-radius:calc([sizeRd] - [sizeBrw]);",
                    "%_Scotch": "position:absolute;display:inline-block;background-image:url([tdr]scotchvertical.png);background-repeat:no-repeat;width:42px;height:86px;top:-43px;left:50%;margin-left:-21px;"
                }
            },
            "wysiwyg.viewer.skins.photo.SloppyPhoto": {
                react: [
                    ["div", null, ["_brd"], {}],
                    ["a", "link", [], {},
                        ["div", "img", [], {}]
                    ]
                ],
                exports: {
                    img: {
                        skin: "skins.core.ImageNewSkinZoomable"
                    }
                },
                params: {
                    tdr: "URL",
                    contentPaddingLeft: "SIZE",
                    contentPaddingRight: "SIZE",
                    contentPaddingBottom: "SIZE",
                    contentPaddingTop: "SIZE"
                },
                paramsDefaults: {
                    tdr: "BASE_THEME_DIRECTORY",
                    contentPaddingLeft: "9px",
                    contentPaddingRight: "9px",
                    contentPaddingBottom: "9px",
                    contentPaddingTop: "9px"
                },
                css: {
                    "%_zoomedin": "cursor:url([tdr]cursor_zoom_out.png), url([tdr]cursor_zoom_out.cur), auto;overflow:hidden;display:block;",
                    "%_zoomedout": "cursor:url([tdr]cursor_zoom_in.png), url([tdr]cursor_zoom_in.cur), auto;",
                    "%link": "width:calc(100% - 5px) !important;height:calc(100% - 5px) !important;position:absolute;background:url([tdr]sloppyframe.png) no-repeat 0 0;display:block;",
                    "%_brd": "position:absolute;top:5px;bottom:0;left:5px;right:0;background:url([tdr]sloppyframe.png) no-repeat 100% 100%;",
                    "%img": "overflow:hidden;margin:9px;"
                }
            },
            "wysiwyg.viewer.skins.photo.VintagePhoto": {
                react: [
                    ["a", "link", [], {},
                        ["div", null, ["_container"], {},
                            ["div", "img", [], {}]
                        ],
                        ["div", null, ["_tl", "_corner"], {}],
                        ["div", null, ["_tr", "_corner"], {}],
                        ["div", null, ["_bl", "_corner"], {}],
                        ["div", null, ["_br", "_corner"], {}]
                    ]
                ],
                exports: {
                    contentPaddingLeft: "30px",
                    contentPaddingRight: "30px",
                    contentPaddingTop: "30px",
                    contentPaddingBottom: "30px",
                    img: {
                        skin: "skins.core.ImageNewSkinZoomable"
                    }
                },
                params: {
                    tdr: "URL",
                    brw: "BORDER_SIZE",
                    clr: "BORDER_COLOR_ALPHA",
                    pad: "PADDING_SIZE",
                    contentPaddingLeft: "SIZE",
                    contentPaddingRight: "SIZE",
                    contentPaddingTop: "SIZE",
                    contentPaddingBottom: "SIZE"
                },
                paramsDefaults: {
                    tdr: "BASE_THEME_DIRECTORY",
                    brw: "10px",
                    clr: "color_15",
                    pad: "15px",
                    contentPaddingLeft: ["pad", "brw"],
                    contentPaddingRight: ["pad", "brw"],
                    contentPaddingTop: ["pad", "brw"],
                    contentPaddingBottom: ["pad", "brw"]
                },
                css: {
                    "%_zoomedin": "cursor:url([tdr]cursor_zoom_out.png), url([tdr]cursor_zoom_out.cur), auto;overflow:hidden;display:block;",
                    "%_zoomedout": "cursor:url([tdr]cursor_zoom_in.png), url([tdr]cursor_zoom_in.cur), auto;",
                    "%link": "display:block;position:absolute;overflow:hidden;padding:30px;box-sizing:border-box;width:100% !important;height:100% !important;",
                    "%_container": "border:[brw] solid [clr];padding:[pad];",
                    "%img": "position:relative;overflow:hidden;",
                    "%_corner": "width:29px;height:27px;border-color:[clr];border-style:solid;position:absolute;",
                    "%_tl": "top:3px;left:1px;border-width:0 [brw] [brw] 0;",
                    "%_bl": "bottom:3px;left:1px;border-width:[brw] [brw] 0 0;",
                    "%_br": "bottom:3px;right:1px;border-width:[brw] 0 0 [brw];",
                    "%_tr": "top:3px;right:1px;border-width:0 0 [brw] [brw];"
                }
            }
        };
        t.exports = r
    }, function(t, e, o) {
        "use strict";
        var r = o(60),
            i = o(5)(o(0).defaults({
                displayName: "ClipArt"
            }, r));
        t.exports = i
    }, function(t, e, o) {
        "use strict";
        var r = o(0),
            i = o(49),
            n = o(6),
            a = function(t) {
                return t.ie ? "ms" : "standard"
            };
        t.exports = {
            createLightboxLayer: function(t) {
                var e = t.id,
                    o = t.children,
                    s = t.childrenMeshParams,
                    l = t.browser;
                if (r.isEmpty(o)) return null;
                var d = e + "-lightbox-layer";
                return n.apply(void 0, [i.default, {
                    id: d,
                    key: d,
                    childrenMeshLayout: s,
                    marginTop: 0,
                    isFixedLayer: !1,
                    growToContent: !0,
                    cssGridVariant: a(l)
                }].concat(function(t) {
                    if (Array.isArray(t)) {
                        for (var e = 0, o = Array(t.length); e < t.length; e++) o[e] = t[e];
                        return o
                    }
                    return Array.from(t)
                }(o)))
            }
        }
    }, function(t, e, o) {
        "use strict";
        var r = o(0),
            i = r.reduce(["min-height", "background-color", "margin-top", "box-flex", "padding-bottom", "min-width", "max-width"], (function(t, e) {
                return t[e] = r.camelCase(e), t
            }), {});
        t.exports = function(t) {
            return r.mapKeys(t, (function(t, e) {
                return r.defaultTo(i[e], e)
            }))
        }
    }, function(t, e, o) {
        "use strict";
        var r = o(0),
            i = {
                componentWillMount: function() {
                    this.intervals = {}
                },
                componentWillUnmount: function() {
                    var t = this;
                    r.forEach(this.intervals, (function(e, o) {
                        t.clearIntervalNamed(o)
                    }))
                },
                setIntervalNamed: function(t, e, o) {
                    var r = this;
                    this.intervals.hasOwnProperty(t) && this.clearIntervalNamed(t), this.intervals[t] = setInterval((function() {
                        delete r.intervals[t], e()
                    }), o)
                },
                setInterval: function(t, e) {
                    this.setIntervalNamed("default", t, e)
                },
                clearIntervalNamed: function(t) {
                    clearInterval(this.intervals[t]), delete this.intervals[t]
                },
                clearInterval: function() {
                    this.clearIntervalNamed("default")
                }
            },
            n = {
                componentWillMount: function() {
                    this.timeouts = {}
                },
                componentWillUnmount: function() {
                    var t = this;
                    r.forEach(this.timeouts, (function(e, o) {
                        t.clearTimeoutNamed(o)
                    }))
                },
                setTimeoutNamed: function(t, e, o) {
                    var r = this;
                    this.timeouts.hasOwnProperty(t) && this.clearTimeoutNamed(t), this.timeouts[t] = setTimeout((function() {
                        delete r.timeouts[t], e()
                    }), o)
                },
                setTimeout: function(t, e) {
                    this.setTimeoutNamed("default", t, e)
                },
                clearTimeoutNamed: function(t) {
                    this.timeouts[t] && (clearTimeout(this.timeouts[t]), delete this.timeouts[t])
                },
                clearTimeout: function() {
                    this.clearTimeoutNamed("default")
                }
            };
        t.exports = {
            timeoutsMixin: n,
            intervalsMixin: i
        }
    }, function(t, e, o) {
        "use strict";
        var r = function() {
            function t(t, e) {
                for (var o = 0; o < e.length; o++) {
                    var r = e[o];
                    r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(t, r.key, r)
                }
            }
            return function(e, o, r) {
                return o && t(e.prototype, o), r && t(e, r), e
            }
        }();
        var i = o(4),
            n = o(0),
            a = o(3),
            s = o(14).getEvent,
            l = o(15),
            d = o(1),
            p = o(16).BASE_COMP_ACTIONS,
            c = {
                visibility: "hidden",
                overflow: "hidden",
                width: 0,
                minWidth: 0,
                height: 0,
                minHeight: 0
            },
            u = {
                marginBottom: 0
            },
            b = {
                top: 0,
                left: 0,
                position: "absolute"
            },
            g = function(t, e, o) {
                var r = e.id,
                    i = e.handleAction,
                    a = e.compActions,
                    l = e.setCustomClickOccurred,
                    d = o.eventHandlers,
                    c = o.isDisabled,
                    u = Object.keys(p).filter((function(t) {
                        return !(!a || !a[t]) || !(!d || !d[p[t]])
                    })).reduce((function(e, o) {
                        var r = p[o];
                        return e[r] = function(e) {
                            c || (a && a[o] && i(a[o], s.call(t, e)), d && d[r] && d[r](e))
                        }, e
                    }), {});
                return u.onClick && l && (u.onClickCapture = function(t) {
                    n.includes(t.target.id, r) && l()
                }), u
            };

        function h(t) {
            var e = this.props,
                o = e.id,
                r = e.componentPreviewState,
                i = e.renderedLink,
                a = e.compProp,
                s = e.rotationInDegrees,
                d = a ? a.isDisabled : null,
                p = {
                    id: o
                };
            return d && (p.disabled = d), r && (p["data-preview"] = r), s && (p["data-angle"] = s), i && n.assign(p, i), this.props.isResponsive || (p.style = function(t) {
                var e = t.compProp,
                    o = t.compActions,
                    r = t.style,
                    i = t.isHorizontallyDocked,
                    a = t.isMeshLayoutMechanism,
                    s = t.isMobileView,
                    d = t.siteWidth,
                    p = t.structure;
                if (e) {
                    var g = !!i && l(s, d, n.get(p, ["layout", "docked"])),
                        h = n.defaults({}, g, r);
                    if (e.isCollapsed) {
                        var m = a ? u : b;
                        return n.assign(h, c, m)
                    }
                    return e.isHidden && (h.visibility = "hidden"), !e.isDisabled && o && o.click && (h.cursor = "pointer"), h
                }
            }(this.props)), n.assign(p, g(this, this.props, {
                isDisabled: d,
                eventHandlers: t
            })), p
        }
        var m = function(t) {
            function e(t) {
                ! function(t, e) {
                    if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
                }(this, e);
                var o = function(t, e) {
                    if (!t) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                    return !e || "object" != typeof e && "function" != typeof e ? t : e
                }(this, (e.__proto__ || Object.getPrototypeOf(e)).call(this, t));
                return o.getRequiredProps = h.bind(o), o
            }
            return function(t, e) {
                if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function, not " + typeof e);
                t.prototype = Object.create(e && e.prototype, {
                    constructor: {
                        value: t,
                        enumerable: !1,
                        writable: !0,
                        configurable: !0
                    }
                }), e && (Object.setPrototypeOf ? Object.setPrototypeOf(t, e) : t.__proto__ = e)
            }(e, t), r(e, [{
                key: "updateData",
                value: function(t) {
                    this.props.setRuntimeCompData(this.props.id, t)
                }
            }, {
                key: "updateProps",
                value: function(t) {
                    this.props.setRuntimeCompProps(this.props.id, t)
                }
            }]), e
        }(i.Component);
        m.propTypes = {
            isTouchDevice: d.Device.isTouchDevice,
            isMobileView: d.isMobileView,
            isMobileDevice: d.Device.isMobileDevice,
            isDebugMode: d.isDebugMode,
            isQAMode: d.isQAMode,
            hideComponentsListForQa: d.hideComponentsListForQa,
            structure: d.Component.structure,
            rootId: d.Component.rootId,
            currentUrlPageId: d.Component.currentUrlPageId,
            styleId: d.Component.styleId,
            skin: d.Component.skin,
            logger: d.Utils.logger,
            style: d.Component.style,
            compProp: d.Component.compProp,
            compData: d.Component.compData,
            compActions: d.Component.compActions,
            componentPreviewState: d.RenderFlags.componentPreviewState,
            activateModeById: d.Modes.activateModeById,
            deactivateModeById: d.Modes.deactivateModeById,
            switchModesByIds: d.Modes.switchModesByIds,
            transformSkinProperties: a.func,
            isExperimentOpen: d.isExperimentOpen,
            setCustomClickOccurred: d.setCustomClickOccurred,
            renderFixedPosition: d.Component.renderFixedPosition,
            id: d.Component.id.isRequired,
            className: a.string,
            rotationInDegrees: d.Component.rotationInDegrees,
            siteWidth: d.siteWidth,
            isCollapsed: d.Component.isCollapsed,
            compBehaviors: d.Component.compBehaviors,
            isHorizontallyDocked: d.Component.isHorizontallyDocked,
            shouldHideAnimatable: d.Component.shouldHideAnimatable,
            isMeshLayoutMechanism: d.Layout.isMeshLayoutMechanism,
            isResponsive: d.RendererModel.isResponsive.isRequired,
            setRuntimeCompData: d.DAL.setCompData,
            setRuntimeCompProps: d.DAL.setCompProps
        }, t.exports = m
    }])
}));
//# sourceMappingURL=santa-components.prod.js.map