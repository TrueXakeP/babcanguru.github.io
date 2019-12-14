(this.webpackJsonp = this.webpackJsonp || []).push([
    [1], {
        141: function(e, t, n) {
            "use strict";
            var r = n(983),
                o = n(990).init,
                i = n(992).AnimationManager,
                a = null;
            e.exports = {
                runWarmupAnimations: function(e, t, n, s, c) {
                    var u, l = e["santa-animations"],
                        d = e.TweenMax,
                        f = e.TimelineMax;
                    return u = function() {
                        var e = r.create(d, f),
                            u = new i({
                                santaAnimations: l,
                                tweenEngineAndFactory: e
                            }, t),
                            p = window.warmupData && !n && window.warmupData.animationData || {},
                            m = window.rootNavigationInfo ? window.rootNavigationInfo.pageId : "",
                            h = !!Object.keys(p).length;
                        a = o({
                            manager: u,
                            model: p,
                            pageId: m
                        }), h && (a.start(), c(!0)), s(u)
                    }, void("loading" === document.readyState ? window.document.addEventListener("DOMContentLoaded", u) : Promise.resolve().then(u))
                },
                stopWarmupAnimations: function() {
                    return a && a.stop()
                }
            }
        },
        983: function(e, t, n) {
            "use strict";
            var r = n(984),
                o = n(988);
            e.exports = {
                create: function(e, t) {
                    var n = o.create(e, t);
                    return {
                        factory: r.create(),
                        engine: n
                    }
                }
            }
        },
        984: function(e, t, n) {
            "use strict";
            var r = n(133),
                o = n(985);
            e.exports = {
                create: function() {
                    var e = {
                        animations: {},
                        transitions: {},
                        properties: {}
                    };

                    function t(t) {
                        this.timeline = e.animations.BaseSequence(t ? r.cloneDeep(t) : {})
                    }
                    return t.prototype.add = function(e, t, n) {
                        return t = void 0 === t ? "+=0" : t, n = n || "normal", this.timeline.add(e, t, n), this
                    }, t.prototype.get = function() {
                        return this.timeline
                    }, {
                        animate: function(t, n, i, a, s) {
                            var c = e.animations[t];
                            return c ? c(n, i, a, s ? r.cloneDeep(s) : {}) : (o.error("Warning:", t, "is not a registered animation. skipping."), null)
                        },
                        transition: function(t, n, i, a, s, c) {
                            var u = e.transitions[t];
                            return u ? u(n, i, a, s, c ? r.cloneDeep(c) : {}) : (o.error("Warning:", t, "is not a registered transition. skipping."), null)
                        },
                        sequence: function(e) {
                            return new t(e)
                        },
                        registerAnimation: function(t, n, r) {
                            e.transitions[t] && o.error("Warning: there is already a transition with the name", t), e.animations[t] = n, e.properties[t] = r || {}
                        },
                        registerTransition: function(t, n, r) {
                            e.animations[t] && o.error("Warning: there is already an animation with the name", t), e.transitions[t] = n, e.properties[t] = r
                        },
                        getProperties: function(t) {
                            return e.properties[t] || {}
                        },
                        getAllProperties: function() {
                            return e.properties
                        },
                        getAnimationsDefs: function() {
                            return e.animations
                        },
                        getTransitionsDefs: function() {
                            return e.transitions
                        },
                        resetRegistrations: function() {
                            e.animations = {}, e.transitions = {}, e.properties = {}
                        }
                    }
                }
            }
        },
        985: function(e, t, n) {
            "use strict";
            var r = n(133),
                o = n(986),
                i = console.log.bind(console),
                a = console.warn.bind(console),
                s = l(),
                c = s ? i : r.noop,
                u = s ? a : r.noop;

            function l() {
                return "undefined" == typeof window || "all" === o.parseUrl(r.get(window, ["location", "href"], "")).query.debug
            }
            e.exports = {
                isDebug: l,
                verbose: c,
                info: i,
                warnVerbose: u,
                warn: a,
                error: console.error.bind(console),
                warnDeprecation: function(e) {
                    s && console.error.call(console, "DocumentServices|Deprecated|" + e)
                }
            }
        },
        986: function(e, t, n) {
            "use strict";
            var r = n(133),
                o = n(987),
                i = /\${(.*?)}/g;

            function a(e, t) {
                var n = /^(ftps|ftp|http|https):.*$/.test(e),
                    r = /^\/\//.test(e);
                return n ? e : (t = t || "https:", r ? t + e : t + "//" + e)
            }

            function s(e, t) {
                return r.map(e, function(e, n) {
                    return c(n, e, t)
                }).sort().join("&")
            }

            function c(e, t, n) {
                return e = encodeURIComponent(e), t || 0 === t || !1 === t ? (e += "=", r.isArray(t) ? r.map(t, function(t) {
                    return e + encodeURIComponent(t)
                }).join("&") : (n && "boolean" == typeof t ? t = t ? "1" : "0" : (o = t, i.test(o) || (t = encodeURIComponent(t))), e + t)) : e;
                var o
            }
            var u = 0;
            var l = null;
            var d = /((https?\:)\/\/)?([^\?\:\/#]+)(\:([0-9]+))?(\/[^\?\#]*)?(\?([^#]*))?(#.*)?/i;

            function f(e) {
                if (!e) return {};
                var t = e.match(d),
                    n = t[5] || "",
                    r = t[8] ? "?" + t[8] : "",
                    o = {
                        full: e,
                        protocol: t[2] || "http:",
                        host: t[3] + (n ? ":" + n : ""),
                        hostname: t[3],
                        port: n,
                        path: t[6] || "/",
                        search: r,
                        hash: t[9] || ""
                    };
                return "#" !== o.hash && "#!" !== o.hash || (o.hash = ""), o.query = m(t[8]), o
            }

            function p(e) {
                try {
                    return decodeURIComponent(e)
                } catch (t) {
                    return e
                }
            }

            function m(e) {
                for (var t = /([^&=]+)=([^&]*)/g, n = {}, o = void 0; null !== (o = t.exec(e));) {
                    var i = p(o[1]),
                        a = p(o[2]);
                    n[i] ? r.isArray(n[i]) ? n[i].push(a) : n[i] = [n[i], a] : n[i] = a
                }
                return n
            }

            function h(e, t) {
                var n = t ? null : e.search;
                n && (n = n.replace(/^[?]/, ""));
                var o, i = n || s(e.query || {});
                i && (i = (r.includes(e.path, "?") ? "&" : "?") + i);
                return o = e.full, /(^data)|(^blob)/.test(o) ? e.full : e.protocol + "//" + e.hostname + (e.port ? ":" + e.port : "") + e.path + (i || "") + e.hash
            }

            function v(e) {
                return /(^https?)|(^data)|(^blob)|(^\/\/)/.test(e)
            }

            function g(e) {
                return e && e.replace(/[?&#/]+$/, "").toLowerCase()
            }

            function y(e, t) {
                e = e.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
                var n = new RegExp("[\\?&]" + e + "=([^&#]*)", "i").exec(r.isUndefined(t) ? window.location.search : t);
                return null === n ? "" : p(n[1].replace(/\+/g, " "))
            }
            e.exports = {
                addProtocolIfMissing: a,
                toQueryString: s,
                toQueryParam: c,
                baseUrl: function(e) {
                    var t = f(e);
                    return t.protocol + "//" + t.host
                },
                getPath: function(e) {
                    return f(e).path
                },
                cacheKiller: function() {
                    return (new Date).getTime().toString() + u++
                },
                resetCacheKiller: function() {
                    u = 0
                },
                setPersistentCacheKiller: function(e) {
                    l = e
                },
                persistentCacheKiller: function() {
                    return l = l || (new Date).getTime().toString()
                },
                resetPersistentCacheKiller: function() {
                    l = null
                },
                removeUrlParam: function(e, t) {
                    var n = f(e);
                    return delete n.search, n.query && delete n.query[t], h(n)
                },
                removeUrlParams: function(e, t) {
                    var n = f(e);
                    return delete n.search, n.query && r.forEach(t, function(e) {
                        delete n.query[e]
                    }), h(n)
                },
                setUrlParam: function(e, t, n) {
                    var i = e.split("?"),
                        a = [],
                        s = !1;
                    if (i.length > 1) {
                        a = i[1].split("&");
                        var c = r.findIndex(a, function(e) {
                            return o.startsWith(e, t + "=")
                        }); - 1 !== c && (a[c] = t + "=" + String(n), s = !0)
                    }
                    return s || a.push(t + "=" + String(n)), i[1] = a.join("&"), e = i.join("?")
                },
                setUrlParams: function(e, t) {
                    var n = f(e);
                    return r.assign(n.query, t), h(n, !0)
                },
                isExternalUrl: v,
                isRelativeUrl: function(e) {
                    return /^\/(.*)/.test(e)
                },
                isUrlEmptyOrNone: function(e) {
                    return !e || !e.trim() || "none" === e.toLowerCase()
                },
                updateUrl: function(e) {
                    window.history && window.history.replaceState ? window.history.replaceState({}, "", e) : console.error("window.history is not supported in this OLD browser!")
                },
                parseUrl: f,
                parseUrlParams: m,
                buildFullUrl: h,
                isQueryParamOn: function(e, t) {
                    return r.has(e.query, t) && "false" !== e.query[t]
                },
                isTrue: function(e, t) {
                    return "true" === y(e, t)
                },
                isSame: function(e, t) {
                    return g(e) === g(t)
                },
                joinURL: function() {
                    for (var e = arguments[0], t = 1; t < arguments.length; ++t) e = e.replace(/\/$/, "") + "/" + arguments[t].replace(/^\//, "");
                    return e
                },
                getMediaUrlByContext: function(e, t, n) {
                    if (v(e)) return e;
                    var r = t + "/";
                    return e && (/^micons\//.test(e) ? r = n : "ico" === /[^.]+$/.exec(e)[0] && (r = r.replace("media", "ficons"))), r + e
                },
                origin: function(e) {
                    if (e) return e.protocol + "//" + e.hostname + e.port;
                    if ("undefined" != typeof window) {
                        if (window.location.origin) return window.location.origin;
                        var t = window.location.port ? ":" + window.location.port : "";
                        return window.location.protocol + "//" + window.location.hostname + t
                    }
                },
                getBaseUrlWithPath: function(e, t) {
                    var n = (e.path || e.pathname || "").split("/"),
                        o = r.compact(n.slice(0, (t || 0) + 1)),
                        i = e.protocol + "//" + e.hostname;
                    return r.isEmpty(o) || (i += "/" + o.join("/")), i
                },
                getParameterByName: y,
                isHostnameYandexWebvisor: function(e) {
                    return /^(.*\.)?(mtproxy|hghltd)\.yandex\.net$/.test(e)
                },
                setProtocol: function(e, t) {
                    if (!r.includes(["ftp:", "http:", "https:"], t)) return e;
                    if (e = a(e, t), !r.startsWith(e, t + "//")) {
                        var n = e.split("//");
                        e = [t, "//", n[1]].join("")
                    }
                    return e
                },
                getTemplateValuesFromUrl: function(e) {
                    for (var t = [], n = i.exec(e); n;) t.push(n[1]), n = i.exec(e);
                    return t
                }
            }
        },
        987: function(e, t, n) {
            "use strict";
            var r = n(133);
            e.exports = {
                capitalize: function(e, t) {
                    return r.upperFirst(t ? e.toLowerCase() : e)
                },
                startsWith: function e(t, n, o) {
                    return !!t && (o ? e(t.toLowerCase(), n.toLowerCase(), !1) : r.startsWith(t, n))
                },
                endsWith: function(e, t, n) {
                    return !!e && (n ? this.endsWith(e.toLowerCase(), t.toLowerCase(), !1) : r.endsWith(e, t))
                },
                isNullOrEmpty: function(e) {
                    return !e || !e.trim()
                },
                isTrue: function(e) {
                    return "true" === e
                }
            }
        },
        988: function(e, t, n) {
            "use strict";
            var r = n(133),
                o = n(989);
            e.exports = {
                create: function(e, t) {
                    var n = ["ease", "duration", "delay", "to", "from", "repeat", "yoyo", "repeatDelay", "easeParams", "stagger", "transformOrigin", "clearProps", "paused", "overwrite", "autoClear", "parseTransform", "fireUpdateCommand", "data", "elementClearParams", "perspective", "transformPerspective", "immediateRender", "callbacks", "force3D", "transformStyle"],
                        i = ["delay", "repeat", "yoyo", "repeatDelay", "stagger", "paused", "align", "tweens", "autoClear", "data", "elementClearParams", "callbacks"];

                    function a(e, t, o) {
                        return r.isArray(e) || (e = e instanceof window.NodeList ? r.toArray(e) : [e]), d(t = g(t = t || {}, [o, n])), (t.from && t.to ? l : t.from ? c : u)(e, t)
                    }

                    function s(e, n) {
                        return d(e = g(e || {}, [n, i])), new t(e)
                    }

                    function c(t, n) {
                        var o = void 0,
                            i = void 0,
                            a = void 0,
                            c = n.duration,
                            u = n.stagger,
                            l = n.delay,
                            d = r.defaults(n, n.from);
                        return d.data = d.data || {}, delete d.from, delete d.duration, delete d.stagger, void 0 !== u ? (a = d.data, d.data = {}, delete d.delay, o = e.staggerFrom(t, c, d, u), i = s({
                            data: a,
                            delay: l
                        }).add(o)) : o = e.from(t, c, d), i || o
                    }

                    function u(t, n) {
                        var o = void 0,
                            i = void 0,
                            a = void 0,
                            c = n.duration,
                            u = n.stagger,
                            l = n.delay,
                            d = r.defaults(n, n.to || {});
                        return d.data = d.data || {}, delete d.to, delete d.duration, delete d.stagger, void 0 !== u ? (a = d.data, d.data = {}, delete d.delay, o = e.staggerTo(t, c, d, u), i = s({
                            data: a,
                            delay: l
                        }).add(o)) : o = e.to(t, c, d), i || o
                    }

                    function l(t, n) {
                        var o = void 0,
                            i = void 0,
                            a = void 0,
                            c = void 0,
                            u = n.duration,
                            l = n.stagger,
                            d = n.delay,
                            f = n.from;
                        return (o = n.to).data = o.data || {}, delete n.to, delete n.from, delete n.duration, delete n.stagger, delete o.duration, delete o.stagger, o = r.merge(o, n), void 0 !== l ? (c = o.data, o.data = {}, delete o.delay, i = e.staggerFromTo(t, u, f, o, l), a = s({
                            data: c,
                            delay: d
                        }).add(i)) : i = e.fromTo(t, u, f, o), a || i
                    }

                    function d(e) {
                        return e.data = e.data || {}, e.callbacks && (e.data.callbacks = {}, e.callbacks.onComplete && (e.data.callbacks.onComplete = e.callbacks.onComplete, e.onComplete = f, e.onCompleteParams = ["{self}"]), e.callbacks.onReverseComplete && (e.data.callbacks.onReverseComplete = e.callbacks.onReverseComplete, e.onReverseComplete = p, e.onReverseCompleteParams = ["{self}"]), e.callbacks.onStart && (e.data.callbacks.onStart = e.callbacks.onStart, e.onStart = m, e.onStartParams = ["{self}"]), e.callbacks.onUpdate && (e.data.callbacks.onUpdate = e.callbacks.onUpdate, e.onUpdate = h, e.onUpdateParams = ["{self}"]), e.callbacks.onInterrupt && (e.data.callbacks.onInterrupt = e.callbacks.onInterrupt)), delete e.callbacks, e
                    }

                    function f(e) {
                        v(e, "onComplete")
                    }

                    function p(e) {
                        v(e, "onReverseComplete")
                    }

                    function m(e) {
                        v(e, "onStart")
                    }

                    function h(e) {
                        v(e, "onUpdate")
                    }

                    function v(e, t) {
                        r.isFunction(r.get(e, "data.callbacks." + t)) && e.data.callbacks[t](e)
                    }

                    function g(e, t) {
                        var n = r.union.apply(r, t);
                        return r.forEach(e, function(e, o, i) {
                            "to" === o || "from" === o ? g(i[o], t) : r.includes(n, o) || delete i[o]
                        }), e
                    }
                    return {
                        timeline: s,
                        tween: a,
                        set: function(e, t) {
                            return (t = t ? r.cloneDeep(t) : {}).duration = 0, t.delay = 0, t.to = t.to || {}, a(e, t, r.keys(t))
                        },
                        kill: function(e, t) {
                            e.paused() || (e.pause(), function(e) {
                                v(e, "onInterrupt")
                            }(e)), r.isNumber(t) && e.progress(t, !0), e.kill(), e.clear && e.clear()
                        },
                        addTickerEvent: function(t) {
                            e.ticker.addEventListener("tick", t)
                        },
                        removeTickerEvent: function(t) {
                            e.ticker.removeEventListener("tick", t)
                        },
                        isTweening: function(t) {
                            return e.isTweening(t)
                        },
                        getTweensOf: function(t, n) {
                            return e.getTweensOf(t, n)
                        },
                        getElementRect: o.getElementRect,
                        getContentRect: o.getContentRect,
                        getBoundingRect: o.getBoundingRect,
                        getBoundingContentRect: o.getBoundingContentRect,
                        delayedCall: function(t, n, r, o) {
                            return e.delayedCall(t, n, r, o)
                        },
                        animateTimeScale: function(t, n, o, i, a, s) {
                            var c = {
                                    timeScale: o
                                },
                                u = {
                                    timeScale: i,
                                    easing: a || "Linear.easeNone"
                                };
                            return s && r.assign(u, s), 0 === o && t.paused() && t.play(), e.fromTo(t, n, c, u)
                        },
                        adjustLagSmoothing: function(t, n) {
                            "function" == typeof e.lagSmoothing && e.lagSmoothing(t, n)
                        },
                        useRAF: function(t) {
                            e.ticker && "function" == typeof e.ticker.useRAF && e.ticker.useRAF(t)
                        }
                    }
                }
            }
        },
        989: function(e, t, n) {
            "use strict";

            function r(e) {
                var t = window.getComputedStyle(e);
                return {
                    top: parseFloat(t.getPropertyValue("border-top-width"), 10),
                    left: parseFloat(t.getPropertyValue("border-left-width"), 10)
                }
            }
            var o = function(e) {
                    return "visible" === window.getComputedStyle(e).getPropertyValue("overflow")
                },
                i = function(e, t) {
                    return Array.from(e.children).filter(function(e) {
                        return e.tagName.toLowerCase() === t
                    })
                };

            function a(e, t) {
                for (var n = e.offsetTop, o = e.offsetLeft, i = e.offsetWidth, a = e.offsetHeight; e.offsetParent;) {
                    var s = r(e = e.offsetParent);
                    if (n += s.top, o += s.left, t && e === t) break;
                    n += e.offsetTop, o += e.offsetLeft
                }
                return {
                    top: n,
                    left: o,
                    width: i,
                    height: a,
                    bottom: n + a,
                    right: o + i
                }
            }

            function s(e, t, n, r) {
                return r = r || a(e, t), (n = n || i(e, "div")).forEach(function(e) {
                    var n = a(e, t);
                    n.width > 0 && n.height > 0 && (n.left < r.left && (r.left = n.left), n.right > r.right && (r.right = n.right), n.top < r.top && (r.top = n.top), n.bottom > r.bottom && (r.bottom = n.bottom));
                    var c = i(e, "div");
                    c.length && o(e) && s(e, t, c, r)
                }), r.width = r.right - r.left, r.height = r.bottom - r.top, r
            }
            e.exports = {
                getElementRect: a,
                getBoundingRect: function(e, t, n) {
                    n = n || "undefined" != typeof window && window;
                    var r = a(e, t);
                    if (n) {
                        var o = n.scrollY || n.scrollTop || 0,
                            i = n.scrollX || n.scrollLeft || 0;
                        r.top -= o, r.bottom -= o, r.left -= i, r.right -= i
                    }
                    return r
                },
                getContentRect: s,
                getBoundingContentRect: function(e, t, n) {
                    n = n || "undefined" != typeof window && window;
                    var r = s(e, t);
                    if (n) {
                        var o = n.pageYOffset || n.scrollTop || 0,
                            i = n.pageXOffset || n.scrollLeft || 0;
                        r.top -= o, r.bottom -= o, r.left -= i, r.right -= i
                    }
                    return r
                }
            }
        },
        990: function(e, t, n) {
            "use strict";
            Object.defineProperty(t, "__esModule", {
                value: !0
            }), t.init = function(e) {
                var t = e.model,
                    n = e.manager,
                    r = e.pageId;
                return n.setDefinitions(t), n.initAction("screenIn", r), (0, o.default)({
                    model: t,
                    manager: n
                })
            };
            var r, o = (r = n(991)) && r.__esModule ? r : {
                default: r
            }
        },
        991: function(e, t, n) {
            "use strict";
            Object.defineProperty(t, "__esModule", {
                value: !0
            }), t.default = function(e) {
                var t = e.model,
                    n = e.manager,
                    r = "screenIn",
                    o = .01,
                    i = {};

                function a(e) {
                    var t = e.filter(function(e) {
                        return e.visible
                    }).map(function(e) {
                        return {
                            compId: e.id,
                            action: r
                        }
                    });
                    n.trigger(t)
                }

                function s(e, t) {
                    var n = i[t] || function(e, t) {
                        var n = {
                            root: null,
                            rootMargin: "0px",
                            threshold: [t]
                        };
                        return new window.IntersectionObserver(function(t, n) {
                            var r = t.map(function(e) {
                                return {
                                    visible: e.isIntersecting,
                                    ratio: e.intersectionRatio,
                                    rect: e.intersectionRect,
                                    id: e.target.id
                                }
                            });
                            t.forEach(function(e) {
                                return e.isIntersecting && n.unobserve(e.target)
                            }), e(r)
                        }, n)
                    }(a, t);
                    n.observe(e), i[t] || (i[t] = n)
                }
                return {
                    start: function() {
                        var e = window.innerHeight;
                        Object.keys(t).filter(function(e) {
                            return Object.keys(t[e]).indexOf(r) > -1
                        }).forEach(function(i) {
                            var a = document.getElementById(i);
                            if (a) {
                                var c = a.offsetHeight,
                                    u = c > e ? o : function(e, t, n) {
                                        var o = t[n][r][0].name;
                                        return e.animationProperties[o].viewportThreshold
                                    }(n, t, i);
                                s(a, u)
                            }
                        })
                    },
                    stop: function() {
                        Object.keys(i).forEach(function(e) {
                            return i[e].disconnect()
                        }), i = {}
                    }
                }
            }
        },
        992: function(e, t, n) {
            "use strict";

            function r(e, t) {
                if (null == e) return {};
                var n, r, o = function(e, t) {
                    if (null == e) return {};
                    var n, r, o = {},
                        i = Object.keys(e);
                    for (r = 0; r < i.length; r++) n = i[r], t.indexOf(n) >= 0 || (o[n] = e[n]);
                    return o
                }(e, t);
                if (Object.getOwnPropertySymbols) {
                    var i = Object.getOwnPropertySymbols(e);
                    for (r = 0; r < i.length; r++) n = i[r], t.indexOf(n) >= 0 || Object.prototype.propertyIsEnumerable.call(e, n) && (o[n] = e[n])
                }
                return o
            }

            function o(e, t) {
                for (var n = 0; n < t.length; n++) {
                    var r = t[n];
                    r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r)
                }
            }

            function i(e, t) {
                return function(e) {
                    if (Array.isArray(e)) return e
                }(e) || function(e, t) {
                    var n = [],
                        r = !0,
                        o = !1,
                        i = void 0;
                    try {
                        for (var a, s = e[Symbol.iterator](); !(r = (a = s.next()).done) && (n.push(a.value), !t || n.length !== t); r = !0);
                    } catch (e) {
                        o = !0, i = e
                    } finally {
                        try {
                            r || null == s.return || s.return()
                        } finally {
                            if (o) throw i
                        }
                    }
                    return n
                }(e, t) || function() {
                    throw new TypeError("Invalid attempt to destructure non-iterable instance")
                }()
            }
            Object.defineProperty(t, "__esModule", {
                value: !0
            }), t.AnimationManager = void 0;
            var a = function(e, t) {
                return "".concat(e, "-").concat(t)
            };
            var s = function() {
                function e(t, n) {
                    var r = t.santaAnimations,
                        o = t.tweenEngineAndFactory;
                    ! function(e, t) {
                        if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
                    }(this, e), this.animator = r.create(o, void 0, n), this.animationProperties = r.animationProperties, this.definitions = {}, this.sessionState = {
                        played: new Map,
                        running: new Map
                    }, this.localState = {
                        screenIn: {
                            played: new Map
                        }
                    }
                }
                var t, n, s;
                return t = e, (n = [{
                    key: "_shouldSkipPlayedAnimation",
                    value: function(e) {
                        var t = this.localState.screenIn.played.has(e),
                            n = this.sessionState.played.has(e),
                            r = this.sessionState.played.get(e) || {},
                            o = r.playOnce,
                            i = r.persistOnNav;
                        return t || n && (o || i)
                    }
                }, {
                    key: "_shouldHideComponent",
                    value: function(e, t) {
                        var n = this.definitions[e];
                        if (n) {
                            var r = n[t];
                            if (r) {
                                var o = this.animationProperties;
                                return r.some(function(e) {
                                    var t = e.name;
                                    return o[t] && o[t].hideOnStart
                                })
                            }
                        }
                        return !1
                    }
                }, {
                    key: "_hideComponent",
                    value: function(e) {
                        var t = document.querySelector("#".concat(e));
                        t && (t.style.opacity = 0)
                    }
                }, {
                    key: "_unhideComponent",
                    value: function(e) {
                        var t = document.querySelector("#".concat(e));
                        t && (t.style.opacity = "")
                    }
                }, {
                    key: "getAnimatorInstance",
                    value: function() {
                        return this.animator
                    }
                }, {
                    key: "setDefinitions",
                    value: function(e) {
                        this.definitions = e
                    }
                }, {
                    key: "_hideCompBeforeAnimation",
                    value: function(e, t) {
                        var n = a(e, t);
                        this._shouldSkipPlayedAnimation(n) || this._hideComponent(e)
                    }
                }, {
                    key: "hideBeforeAnimation",
                    value: function(e) {
                        var t = this;
                        (function(e, t, n) {
                            return Object.entries(e).reduce(function(e, r) {
                                var o = i(r, 2),
                                    a = o[0],
                                    s = o[1];
                                return (n ? [n] : Object.keys(s)).forEach(function(n) {
                                    (s[n] || []).some(function(e) {
                                        var n = e.name;
                                        return t[n] && t[n].hideOnStart
                                    }) && e.push([a, n])
                                }), e
                            }, [])
                        })(this.definitions, this.animationProperties, e).forEach(function(e) {
                            var n = i(e, 2),
                                r = n[0],
                                o = n[1];
                            t._hideCompBeforeAnimation(r, o)
                        })
                    }
                }, {
                    key: "resetLocalAndSessionStates",
                    value: function() {
                        [this.localState.screenIn.played, this.sessionState.played, this.sessionState.running].forEach(function(e) {
                            return e.clear()
                        })
                    }
                }, {
                    key: "trigger",
                    value: function() {
                        var e = this;
                        (arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : []).reduce(function(t, n) {
                            var r = n.compId,
                                o = n.action,
                                i = (e.definitions[r] || {})[o] || [];
                            return t.concat(i)
                        }, []).forEach(function(t) {
                            var n = t.action,
                                o = r(t, ["action"]);
                            return e.executeAnimation(n, o)
                        })
                    }
                }, {
                    key: "initAction",
                    value: function(e, t) {
                        switch (e) {
                            case "screenIn":
                                this.stopAnimations([e], {
                                    idToKeep: t
                                }), this.clearLocalStore(e, t), this.hideBeforeAnimation(e)
                        }
                    }
                }, {
                    key: "initComponentAction",
                    value: function(e, t, n) {
                        var r = n.clearStore;
                        (void 0 === r || r) && this.clearCompLocalStore(e, t), this._shouldHideComponent(e, t) && this._hideCompBeforeAnimation(e, t)
                    }
                }, {
                    key: "executeAnimation",
                    value: function(e, t) {
                        var n = this,
                            r = t.name,
                            o = t.targetId,
                            i = t.pageId,
                            s = t.duration,
                            c = void 0 === s ? 0 : s,
                            u = t.delay,
                            l = void 0 === u ? 0 : u,
                            d = t.playOnce,
                            f = void 0 !== d && d,
                            p = t.persistOnNav,
                            m = void 0 !== p && p,
                            h = t.params,
                            v = void 0 === h ? {} : h,
                            g = a(o, e);
                        switch (e) {
                            case "screenIn":
                                if (this._shouldSkipPlayedAnimation(g)) break;
                                var y = this.animator.sequence({
                                        callbacks: {
                                            onStart: function(t) {
                                                return n.sessionState.running.set(t, {
                                                    targetId: o,
                                                    action: e,
                                                    id: i
                                                })
                                            },
                                            onComplete: function(e) {
                                                return n.sessionState.running.delete(e)
                                            },
                                            onInterrupt: function(e) {
                                                return n.sessionState.running.delete(e)
                                            }
                                        }
                                    }),
                                    w = {
                                        props: "clip,clipPath,webkitClipPath,willChange,opacity,transform,transformOrigin",
                                        immediateRender: !1
                                    },
                                    b = document.querySelector("#".concat(o));
                                y.add(this.animator.animate(r, b, c, l, v), 0).add(this.animator.animate("BaseClear", b, 0, 0, w)), this.localState.screenIn.played.set(g, {
                                    targetId: o,
                                    id: i
                                }), this.sessionState.played.set(g, {
                                    playOnce: f,
                                    persistOnNav: m
                                })
                        }
                    }
                }, {
                    key: "preventPendingScreenInAnimation",
                    value: function(e) {
                        var t = a(e, "screenIn");
                        this.localState.screenIn.played.set(t, {
                            targetId: e
                        }), this._unhideComponent(e)
                    }
                }, {
                    key: "stopAnimations",
                    value: function() {
                        var e = this,
                            t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : [],
                            n = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {},
                            r = n.skipPersistent,
                            o = void 0 === r || r,
                            i = n.idToKeep;
                        this.sessionState.running.forEach(function(n, r) {
                            var s = n.targetId,
                                c = n.action,
                                u = n.id,
                                l = a(s, c),
                                d = !t.length || t.includes(c),
                                f = o && e.sessionState.played.get(l).persistOnNav;
                            d && !f && i !== u && e.animator.kill(r, 1)
                        })
                    }
                }, {
                    key: "clearLocalStore",
                    value: function(e, t) {
                        var n = this,
                            r = t.idToKeep,
                            o = this.localState[e];
                        o && o.played.forEach(function(e, t) {
                            var i = e.targetId,
                                a = e.id;
                            n.definitions[i] && r === a || o.played.delete(t)
                        })
                    }
                }, {
                    key: "clearCompLocalStore",
                    value: function(e, t) {
                        var n = this.localState[t];
                        if (n) {
                            var r = a(e, t);
                            n.played.delete(r)
                        }
                    }
                }]) && o(t.prototype, n), s && o(t, s), e
            }();
            t.AnimationManager = s
        }
    }
]);
//# sourceMappingURL=bolt-main-r.animations.js.map