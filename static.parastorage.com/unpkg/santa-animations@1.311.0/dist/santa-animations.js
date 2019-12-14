! function(e, t) {
    "object" == typeof exports && "object" == typeof module ? module.exports = t() : "function" == typeof define && define.amd ? define([], t) : "object" == typeof exports ? exports["santa-animations"] = t() : e["santa-animations"] = t()
}(this, (function() {
    return function(e) {
        var t = {};

        function n(a) {
            if (t[a]) return t[a].exports;
            var r = t[a] = {
                i: a,
                l: !1,
                exports: {}
            };
            return e[a].call(r.exports, r, r.exports, n), r.l = !0, r.exports
        }
        return n.m = e, n.c = t, n.d = function(e, t, a) {
            n.o(e, t) || Object.defineProperty(e, t, {
                enumerable: !0,
                get: a
            })
        }, n.r = function(e) {
            "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(e, Symbol.toStringTag, {
                value: "Module"
            }), Object.defineProperty(e, "__esModule", {
                value: !0
            })
        }, n.t = function(e, t) {
            if (1 & t && (e = n(e)), 8 & t) return e;
            if (4 & t && "object" == typeof e && e && e.__esModule) return e;
            var a = Object.create(null);
            if (n.r(a), Object.defineProperty(a, "default", {
                    enumerable: !0,
                    value: e
                }), 2 & t && "string" != typeof e)
                for (var r in e) n.d(a, r, function(t) {
                    return e[t]
                }.bind(null, r));
            return a
        }, n.n = function(e) {
            var t = e && e.__esModule ? function() {
                return e.default
            } : function() {
                return e
            };
            return n.d(t, "a", t), t
        }, n.o = function(e, t) {
            return Object.prototype.hasOwnProperty.call(e, t)
        }, n.p = "", n(n.s = 2)
    }([function(e, t, n) {
        "use strict";
        e.exports = {
            getClipParams: function(e, t, n) {
                var a = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : {},
                    r = a.scaleX,
                    i = void 0 === r ? 1 : r,
                    o = a.scaleY,
                    s = void 0 === o ? 1 : o,
                    d = a.minimum,
                    u = void 0 === d ? 0 : d,
                    c = (t.top - e.top) / e.height * 100 + (1 - s) / 2 * 100,
                    m = (t.left - e.left) / e.width * 100 + (1 - i) / 2 * 100,
                    l = t.width / e.width * 100 + m - 100 * (1 - i),
                    f = t.height / e.height * 100 + c - 100 * (1 - s),
                    p = (l + m) / 2 + "% " + (f + c) / 2 + "%",
                    g = {
                        initial: m + "% " + c + "%, " + l + "% " + c + "%, " + l + "% " + f + "%, " + m + "% " + f + "%",
                        top: m + "% " + c + "%, " + l + "% " + c + "%, " + l + "% " + (c + u) + "%, " + m + "% " + (c + u) + "%",
                        right: l - u + "% " + c + "%, " + l + "% " + c + "%, " + l + "% " + f + "%, " + (l - u) + "% " + f + "%",
                        center: p + ", " + p + ", " + p + ", " + p,
                        bottom: m + "% " + (f - u) + "%, " + l + "% " + (f - u) + "%, " + l + "% " + f + "%, " + m + "% " + f + "%",
                        left: m + "% " + c + "%, " + (m + u) + "% " + c + "%, " + (m + u) + "% " + f + "%, " + m + "% " + f + "%"
                    };
                return {
                    webkitClipPath: "polygon(" + g[n] + ")",
                    clipPath: "polygon(" + g[n] + ")"
                }
            },
            getClipFallbackParams: function(e) {
                return {
                    initial: {
                        scaleX: 1,
                        scaleY: 1
                    },
                    top: {
                        scaleX: 1,
                        scaleY: 0
                    },
                    right: {
                        scaleX: 0,
                        scaleY: 1
                    },
                    center: {
                        scaleY: 0,
                        scaleX: 0
                    },
                    bottom: {
                        scaleX: 1,
                        scaleY: 0
                    },
                    left: {
                        scaleX: 0,
                        scaleY: 1
                    }
                }[e]
            },
            getAdjustedDirection: function(e, t, n) {
                var a = Object.keys(e),
                    r = e[t].idx,
                    i = Math.round(n / 90);
                return a[(r + (a.length - 1) * i) % a.length]
            },
            getPositionParams: function(e, t) {
                var n = arguments.length > 2 && void 0 !== arguments[2] && arguments[2] ? function(e, t) {
                    var n = e.width,
                        a = e.height;
                    return {
                        x: (t.width - n) / 2,
                        y: (t.height - a) / 2
                    }
                }(e, t) : {
                    x: 0,
                    y: 0
                };
                return {
                    x: t.left - e.left + n.x,
                    y: t.top - e.top + n.y
                }
            },
            getScaleParams: function(e, t) {
                return {
                    scaleX: t.width / e.width,
                    scaleY: t.height / e.height
                }
            },
            getElementTransformedPosition: function(e, t, n) {
                var a = t.width / 2,
                    r = t.height / 2,
                    i = t.width * parseInt(e.x, 10) / 100,
                    o = t.height * parseInt(e.y, 10) / 100,
                    s = a - a * Math.cos(n) + r * Math.sin(n),
                    d = r - a * Math.sin(n) - r * Math.cos(n);
                return {
                    x: s - (i - i * Math.cos(n) + o * Math.sin(n)),
                    y: d - (o - i * Math.sin(n) - o * Math.cos(n))
                }
            },
            getTransformOriginTweenParams: function(e, t, n) {
                return t.left + t.width * (parseInt(n.x, 10) / 100) - e.left + "px " + (t.top + t.height * (parseInt(n.y, 10) / 100) - e.top) + "px"
            },
            getTransformTweenParams: function(e, t, n) {
                var a = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : 1,
                    r = e.width * a,
                    i = e.height * a;
                return {
                    x: t.dy * i * Math.sin(-n) + t.dx * r * Math.cos(n),
                    y: t.dy * i * Math.cos(-n) + t.dx * r * Math.sin(n)
                }
            },
            translatePoint: function(e, t, n) {
                var a = n * Math.PI / 180;
                return {
                    x: e * Math.cos(a) - t * Math.sin(a),
                    y: e * Math.sin(a) + t * Math.cos(a)
                }
            },
            getElementsAsArray: function(e) {
                return e ? "string" == typeof e || void 0 === e.length && "function" != typeof e[Symbol.iterator] ? [e] : Array.from(e) : []
            }
        }
    }, function(e, t, n) {
        "use strict";
        e.exports = {
            ZOOM_SELECTORS: [".bgImage", ".bgVideo"],
            PARALLAX_SELECTORS: [".bgImage", ".bgVideo"],
            REVEAL_SELECTORS: [".bgImage", ".bgVideo"]
        }
    }, function(e, t, n) {
        "use strict";
        var a = Object.assign || function(e) {
            for (var t = 1; t < arguments.length; t++) {
                var n = arguments[t];
                for (var a in n) Object.prototype.hasOwnProperty.call(n, a) && (e[a] = n[a])
            }
            return e
        };
        var r = n(3),
            i = n(4),
            o = n(86),
            s = o.getAllAnimationProperties,
            d = o.getAnimationDefsByViewMode,
            u = o.getAnimationMode,
            c = n(87).validateSchema;

        function m(e, t, n, a, r) {
            var i = e.defaults,
                o = function(e, t) {
                    var n = {};
                    for (var a in e) t.indexOf(a) >= 0 || Object.prototype.hasOwnProperty.call(e, a) && (n[a] = e[a]);
                    return n
                }(e, ["defaults"]),
                s = u(t);
            d(i, o[s]).forEach((function(e) {
                e.register({
                    engine: n,
                    factory: a
                }, r)
            }))
        }

        function l(e, t, n) {
            var a = n.getAllProperties();
            return a[e] ? c(a[e].schema || {}, t) : (console.log('No such animation "' + e + '"'), !1)
        }

        function f(e) {
            return function(t, n, r, i) {
                var o = arguments.length > 4 && void 0 !== arguments[4] ? arguments[4] : {};
                return l(t, a({
                    duration: r,
                    delay: i
                }, o), e) ? e.animate(t, n, r, i, o) : e.animate("BaseNone", n, 0, 0, {})
            }
        }

        function p(e) {
            return function(t, n, r, i, o) {
                var s = arguments.length > 5 && void 0 !== arguments[5] ? arguments[5] : {};
                return l(t, a({
                    duration: i,
                    delay: o
                }, s), e) ? e.transition(t, n, r, i, o, s) : e.transition("noTransition", n, r, 0, 0, {})
            }
        }
        e.exports = {
            animationProperties: s(i),
            create: function(e) {
                var t = e.engine,
                    n = e.factory,
                    a = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : window,
                    o = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : "desktop",
                    s = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : i;
                return t.adjustLagSmoothing(500, 33), t.useRAF(!0), m(s, o, t, n, a), {
                    animate: f(n),
                    transition: p(n),
                    sequence: n.sequence,
                    getProperties: n.getProperties,
                    addTickerEvent: t.addTickerEvent,
                    removeTickerEvent: t.removeTickerEvent,
                    kill: t.kill,
                    delayedCall: t.delayedCall,
                    animateTimeScale: t.animateTimeScale,
                    viewerDefaults: r,
                    updateViewMode: function(e) {
                        n.resetRegistrations(), m(s, e, t, n, a)
                    },
                    validate: c
                }
            }
        }
    }, function(e, t, n) {
        "use strict";
        e.exports = [{
            action: "screenIn",
            name: "FadeIn",
            params: {
                delay: 0,
                duration: 1.2
            }
        }, {
            name: "FadeOut",
            params: {
                delay: 0,
                duration: 1.2
            }
        }, {
            action: "screenIn",
            name: "FloatIn",
            params: {
                delay: 0,
                duration: 1.2,
                direction: "right"
            }
        }, {
            name: "FloatOut",
            params: {
                delay: 0,
                duration: 1.2,
                direction: "right"
            }
        }, {
            action: "screenIn",
            name: "ExpandIn",
            params: {
                delay: 0,
                duration: 1.2,
                direction: "right"
            }
        }, {
            action: "screenIn",
            name: "SpinIn",
            params: {
                delay: 0,
                duration: 1.2,
                cycles: 2,
                direction: "cw"
            }
        }, {
            name: "SpinOut",
            params: {
                delay: 0,
                duration: 1.2,
                cycles: 2,
                direction: "cw"
            }
        }, {
            action: "screenIn",
            name: "FlyIn",
            params: {
                delay: .4,
                duration: 1.2,
                direction: "right"
            }
        }, {
            name: "FlyOut",
            params: {
                delay: .4,
                duration: 1.2,
                direction: "right"
            }
        }, {
            action: "screenIn",
            name: "TurnIn",
            params: {
                delay: 0,
                duration: 1.2,
                direction: "right"
            }
        }, {
            name: "TurnOut",
            params: {
                delay: 0,
                duration: 1.2,
                direction: "right"
            }
        }, {
            action: "screenIn",
            name: "ArcIn",
            params: {
                delay: 0,
                duration: 1.2,
                direction: "right"
            }
        }, {
            name: "ArcOut",
            params: {
                delay: 0,
                duration: 1.2,
                direction: "right"
            }
        }, {
            name: "Conceal",
            params: {
                delay: 0,
                duration: 1.2,
                direction: "right"
            }
        }, {
            name: "CollapseOut",
            params: {
                delay: 0,
                duration: 1.2
            }
        }, {
            name: "PopOut",
            params: {
                delay: 0,
                duration: 1.2
            }
        }, {
            action: "screenIn",
            name: "DropIn",
            params: {
                delay: 0,
                duration: 1.2
            }
        }, {
            action: "screenIn",
            name: "FlipIn",
            params: {
                delay: 0,
                duration: 1.2,
                direction: "left"
            }
        }, {
            name: "FlipOut",
            params: {
                delay: 0,
                duration: 1.2,
                direction: "left"
            }
        }, {
            action: "screenIn",
            name: "FoldIn",
            params: {
                delay: 0,
                duration: 1.2,
                direction: "left"
            }
        }, {
            name: "FoldOut",
            params: {
                delay: 0,
                duration: 1.2,
                direction: "left"
            }
        }, {
            action: "screenIn",
            name: "Reveal",
            params: {
                delay: 0,
                duration: 1.2,
                direction: "left"
            }
        }, {
            action: "screenIn",
            name: "SlideIn",
            params: {
                delay: 0,
                duration: 1.2,
                direction: "left"
            }
        }, {
            name: "SlideOut",
            params: {
                delay: 0,
                duration: 3,
                direction: "left"
            }
        }, {
            action: "screenIn",
            name: "BounceIn",
            params: {
                delay: 0,
                duration: 1.2,
                direction: "top left",
                bounce: "medium"
            }
        }, {
            action: "screenIn",
            name: "GlideIn",
            params: {
                delay: 0,
                duration: 1.2,
                angle: 0,
                distance: 150
            }
        }, {
            name: "BounceOut",
            params: {
                delay: 0,
                duration: 1.2,
                direction: "top left",
                bounce: "medium"
            }
        }, {
            name: "GlideOut",
            params: {
                delay: 0,
                duration: 1.2,
                angle: 0,
                distance: 150
            }
        }, {
            action: "modeChange",
            name: "ModesMotion",
            params: {
                delay: 0,
                duration: .5
            }
        }, {
            action: "modeIn",
            name: "FadeIn",
            params: {
                delay: 0,
                duration: 1.2
            }
        }, {
            action: "modeIn",
            name: "FloatIn",
            params: {
                delay: 0,
                duration: 1.2,
                direction: "right"
            }
        }, {
            action: "modeIn",
            name: "ExpandIn",
            params: {
                delay: 0,
                duration: 1.2,
                direction: "right"
            }
        }, {
            action: "modeIn",
            name: "SpinIn",
            params: {
                delay: 0,
                duration: 1.2,
                cycles: 2,
                direction: "cw"
            }
        }, {
            action: "modeIn",
            name: "FlyIn",
            params: {
                delay: 0,
                duration: 1.2,
                direction: "right"
            }
        }, {
            action: "modeIn",
            name: "TurnIn",
            params: {
                delay: 0,
                duration: 1.2,
                direction: "right"
            }
        }, {
            action: "modeIn",
            name: "ArcIn",
            params: {
                delay: 0,
                duration: 1.2,
                direction: "right"
            }
        }, {
            action: "modeIn",
            name: "DropIn",
            params: {
                delay: 0,
                duration: 1.2
            }
        }, {
            action: "modeIn",
            name: "FlipIn",
            params: {
                delay: 0,
                duration: 1.2,
                direction: "left"
            }
        }, {
            action: "modeIn",
            name: "FoldIn",
            params: {
                delay: 0,
                duration: 1.2,
                direction: "left"
            }
        }, {
            action: "modeIn",
            name: "Reveal",
            params: {
                delay: 0,
                duration: 1.2,
                direction: "left"
            }
        }, {
            action: "modeIn",
            name: "SlideIn",
            params: {
                delay: 0,
                duration: 1.2,
                direction: "left"
            }
        }]
    }, function(e, t, n) {
        "use strict";
        var a = {
            defaults: [n(5), n(6), n(7), n(8), n(9), n(10), n(11), n(12), n(13), n(14), n(15), n(16), n(17), n(18), n(19), n(20), n(21), n(22), n(23), n(24), n(25), n(26), n(27), n(28), n(29), n(30), n(31), n(32), n(33), n(34), n(35), n(36), n(37), n(38), n(39), n(40), n(41), n(42), n(43), n(44), n(45), n(46), n(47), n(48), n(49), n(50), n(51), n(52), n(53), n(54), n(55), n(56), n(57), n(58), n(59), n(60), n(61), n(62), n(63), n(64), n(65), n(66), n(67), n(68), n(69), n(70)],
            mobile: [n(71), n(72), n(73), n(74), n(75), n(76), n(77), n(78), n(79), n(80), n(81), n(82), n(83), n(84), n(85)]
        };
        e.exports = a
    }, function(e, t, n) {
        "use strict";
        var a = "BaseSequence",
            r = {};
        e.exports = {
            name: a,
            properties: r,
            register: function(e) {
                var t = e.engine;
                e.factory.registerAnimation(a, (function(e) {
                    return t.timeline(e, [])
                }), r)
            }
        }
    }, function(e, t, n) {
        "use strict";
        var a = Object.assign || function(e) {
                for (var t = 1; t < arguments.length; t++) {
                    var n = arguments[t];
                    for (var a in n) Object.prototype.hasOwnProperty.call(n, a) && (e[a] = n[a])
                }
                return e
            },
            r = "BaseNone",
            i = {};
        e.exports = {
            name: r,
            properties: i,
            register: function(e) {
                var t = e.engine;
                e.factory.registerAnimation(r, (function(e) {
                    var n = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 0,
                        r = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : 0,
                        i = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : {};
                    return t.tween(e, a({
                        duration: n,
                        delay: r
                    }, i, {
                        to: {}
                    }), [])
                }), i)
            }
        }
    }, function(e, t, n) {
        "use strict";
        var a = Object.assign || function(e) {
            for (var t = 1; t < arguments.length; t++) {
                var n = arguments[t];
                for (var a in n) Object.prototype.hasOwnProperty.call(n, a) && (e[a] = n[a])
            }
            return e
        };
        var r = "BaseFade",
            i = {};
        e.exports = {
            name: r,
            properties: i,
            register: function(e) {
                var t = e.engine;
                e.factory.registerAnimation(r, (function(e) {
                    var n = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 0,
                        r = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : 0,
                        i = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : {},
                        o = i.lazy,
                        s = void 0 !== o && o,
                        d = i.to,
                        u = void 0 === d ? {} : d,
                        c = i.from,
                        m = void 0 === c ? {} : c,
                        l = function(e, t) {
                            var n = {};
                            for (var a in e) t.indexOf(a) >= 0 || Object.prototype.hasOwnProperty.call(e, a) && (n[a] = e[a]);
                            return n
                        }(i, ["lazy", "to", "from"]);
                    return u.opacity > 0 && (u.autoAlpha = u.opacity, delete u.opacity), m.opacity > 0 && (m.autoAlpha = m.opacity, delete m.opacity), t.tween(e, a({
                        duration: n,
                        delay: r,
                        lazy: s,
                        to: u,
                        from: m
                    }, l), ["opacity", "autoAlpha"])
                }), i)
            }
        }
    }, function(e, t, n) {
        "use strict";
        var a = Object.assign || function(e) {
                for (var t = 1; t < arguments.length; t++) {
                    var n = arguments[t];
                    for (var a in n) Object.prototype.hasOwnProperty.call(n, a) && (e[a] = n[a])
                }
                return e
            },
            r = "BasePosition",
            i = {};
        e.exports = {
            name: r,
            properties: i,
            register: function(e) {
                var t = e.engine;
                e.factory.registerAnimation(r, (function(e) {
                    var n = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 0,
                        r = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : 0,
                        i = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : {};
                    return t.tween(e, a({
                        duration: n,
                        delay: r
                    }, i), ["left", "top", "x", "y", "z", "bezier"])
                }), i)
            }
        }
    }, function(e, t, n) {
        "use strict";
        var a = Object.assign || function(e) {
                for (var t = 1; t < arguments.length; t++) {
                    var n = arguments[t];
                    for (var a in n) Object.prototype.hasOwnProperty.call(n, a) && (e[a] = n[a])
                }
                return e
            },
            r = "BaseScale",
            i = {};
        e.exports = {
            name: r,
            properties: i,
            register: function(e) {
                var t = e.engine;
                e.factory.registerAnimation(r, (function(e) {
                    var n = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 0,
                        r = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : 0,
                        i = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : {};
                    return t.tween(e, a({
                        duration: n,
                        delay: r
                    }, i), ["scale", "scaleX", "scaleY"])
                }), i)
            }
        }
    }, function(e, t, n) {
        "use strict";
        var a = Object.assign || function(e) {
                for (var t = 1; t < arguments.length; t++) {
                    var n = arguments[t];
                    for (var a in n) Object.prototype.hasOwnProperty.call(n, a) && (e[a] = n[a])
                }
                return e
            },
            r = "BaseSkew",
            i = {};
        e.exports = {
            name: r,
            properties: i,
            register: function(e) {
                var t = e.engine;
                e.factory.registerAnimation(r, (function(e) {
                    var n = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 0,
                        r = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : 0,
                        i = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : {};
                    return t.tween(e, a({
                        duration: n,
                        delay: r
                    }, i), ["skewX", "skewY"])
                }), i)
            }
        }
    }, function(e, t, n) {
        "use strict";
        var a = Object.assign || function(e) {
                for (var t = 1; t < arguments.length; t++) {
                    var n = arguments[t];
                    for (var a in n) Object.prototype.hasOwnProperty.call(n, a) && (e[a] = n[a])
                }
                return e
            },
            r = "BaseRotate",
            i = {};
        e.exports = {
            name: r,
            properties: i,
            register: function(e) {
                var t = e.engine;
                e.factory.registerAnimation(r, (function(e) {
                    var n = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 0,
                        r = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : 0,
                        i = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : {};
                    return t.tween(e, a({
                        duration: n,
                        delay: r
                    }, i), ["rotation"])
                }), i)
            }
        }
    }, function(e, t, n) {
        "use strict";
        var a = Object.assign || function(e) {
            for (var t = 1; t < arguments.length; t++) {
                var n = arguments[t];
                for (var a in n) Object.prototype.hasOwnProperty.call(n, a) && (e[a] = n[a])
            }
            return e
        };
        var r = n(0).getElementsAsArray,
            i = "BaseRotate3D",
            o = {};
        e.exports = {
            name: i,
            properties: o,
            register: function(e) {
                var t = e.engine,
                    n = e.factory;
                n.registerAnimation(i, (function(e) {
                    var i = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 0,
                        o = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : 0,
                        s = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : {},
                        d = s.perspective,
                        u = function(e, t) {
                            var n = {};
                            for (var a in e) t.indexOf(a) >= 0 || Object.prototype.hasOwnProperty.call(e, a) && (n[a] = e[a]);
                            return n
                        }(s, ["perspective"]);
                    e = r(e);
                    var c = new Set(e.map((function(e) {
                            return e.parentNode
                        }))),
                        m = n.sequence();
                    return function(e) {
                            e.forEach((function(e) {
                                var t = e.getAttribute("data-z-counter");
                                t = t ? Number(t) : 0, e.setAttribute("data-z-counter", t + 1)
                            }))
                        }(c), m.add(t.set(e, {
                            transformPerspective: d
                        }), 0).add(t.tween(e, a({
                            duration: i,
                            delay: o
                        }, u), ["rotationX", "rotationY", "rotationZ"])),
                        function(e, t, n) {
                            e.forEach((function(e) {
                                return t.add(n.set(e, {
                                    attr: {
                                        "data-z-counter": "-=1"
                                    },
                                    immediateRender: !1
                                }))
                            }))
                        }(c, m, t), m.get()
                }), o)
            }
        }
    }, function(e, t, n) {
        "use strict";
        var a = Object.assign || function(e) {
            for (var t = 1; t < arguments.length; t++) {
                var n = arguments[t];
                for (var a in n) Object.prototype.hasOwnProperty.call(n, a) && (e[a] = n[a])
            }
            return e
        };
        var r = n(0).getElementsAsArray,
            i = "BaseClip",
            o = {};
        e.exports = {
            name: i,
            properties: o,
            register: function(e) {
                var t = e.engine;
                e.factory.registerAnimation(i, (function(e) {
                    var n = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 0,
                        i = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : 0,
                        o = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : {},
                        s = o.to,
                        d = void 0 === s ? {} : s,
                        u = o.from,
                        c = void 0 === u ? {} : u,
                        m = function(e, t) {
                            var n = {};
                            for (var a in e) t.indexOf(a) >= 0 || Object.prototype.hasOwnProperty.call(e, a) && (n[a] = e[a]);
                            return n
                        }(o, ["to", "from"]);
                    e = r(e);
                    var l = function(e, t) {
                        var n = t.top - e.top,
                            a = t.left - e.left;
                        return "rect(" + [n, t.width + a, t.height + n, a].join("px,") + "px)"
                    }(t.getBoundingRect(e[0]), t.getBoundingContentRect(e[0]));
                    return d.clip || (d.clip = l), c.clip || (c.clip = l), t.tween(e, a({
                        duration: n,
                        delay: i,
                        from: c,
                        to: d
                    }, m), ["clip"])
                }), o)
            }
        }
    }, function(e, t, n) {
        "use strict";
        var a = Object.assign || function(e) {
            for (var t = 1; t < arguments.length; t++) {
                var n = arguments[t];
                for (var a in n) Object.prototype.hasOwnProperty.call(n, a) && (e[a] = n[a])
            }
            return e
        };
        var r = n(0),
            i = r.getClipParams,
            o = r.getElementsAsArray,
            s = "BaseClipPath",
            d = {};
        e.exports = {
            name: s,
            properties: d,
            register: function(e) {
                var t = e.engine,
                    n = e.factory;
                n.registerAnimation(s, (function(e) {
                    var r = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 0,
                        s = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : 0,
                        d = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : {},
                        u = d.to,
                        c = void 0 === u ? {} : u,
                        m = d.from,
                        l = void 0 === m ? {} : m,
                        f = function(e, t) {
                            var n = {};
                            for (var a in e) t.indexOf(a) >= 0 || Object.prototype.hasOwnProperty.call(e, a) && (n[a] = e[a]);
                            return n
                        }(d, ["to", "from"]);
                    e = o(e);
                    var p = n.sequence();
                    return e.forEach((function(e) {
                        var n = t.getBoundingRect(e),
                            o = t.getBoundingContentRect(e),
                            d = i(n, o, "initial");
                        p.add(t.tween(e, a({
                            duration: r,
                            delay: s,
                            to: a({}, d, c),
                            from: a({}, d, l)
                        }, f), ["clipPath", "webkitClipPath"]), 0)
                    })), p.get()
                }), d)
            }
        }
    }, function(e, t, n) {
        "use strict";
        var a = Object.assign || function(e) {
                for (var t = 1; t < arguments.length; t++) {
                    var n = arguments[t];
                    for (var a in n) Object.prototype.hasOwnProperty.call(n, a) && (e[a] = n[a])
                }
                return e
            },
            r = "BaseDimensions",
            i = {};
        e.exports = {
            name: r,
            properties: i,
            register: function(e) {
                var t = e.engine;
                e.factory.registerAnimation(r, (function(e) {
                    var n = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 0,
                        r = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : 0,
                        i = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : {};
                    return t.tween(e, a({
                        duration: n,
                        delay: r
                    }, i), ["width", "height", "top", "left", "maxWidth", "maxHeight", "minWidth", "minHeight", "bottom", "right", "margin", "padding", "marginTop", "marginBottom", "marginLeft", "marginRight", "paddingTop", "paddingBottom", "paddingRight", "paddingLeft", "zIndex"])
                }), i)
            }
        }
    }, function(e, t, n) {
        "use strict";
        var a = Object.assign || function(e) {
            for (var t = 1; t < arguments.length; t++) {
                var n = arguments[t];
                for (var a in n) Object.prototype.hasOwnProperty.call(n, a) && (e[a] = n[a])
            }
            return e
        };
        var r = "BaseScroll",
            i = {};
        e.exports = {
            name: r,
            properties: i,
            register: function(e) {
                var t = e.engine,
                    n = e.factory;
                n.registerAnimation(r, (function(e) {
                    var r = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 0,
                        i = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : 0,
                        o = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : {},
                        s = o.x,
                        d = void 0 === s ? 0 : s,
                        u = o.y,
                        c = void 0 === u ? 0 : u,
                        m = o.autoKill,
                        l = void 0 !== m && m,
                        f = function(e, t) {
                            var n = {};
                            for (var a in e) t.indexOf(a) >= 0 || Object.prototype.hasOwnProperty.call(e, a) && (n[a] = e[a]);
                            return n
                        }(o, ["x", "y", "autoKill"]),
                        p = {
                            x: d,
                            y: c,
                            autoKill: l
                        },
                        g = n.sequence();
                    return g.add(t.tween(e, a({
                        duration: r,
                        delay: i,
                        scrollTo: p
                    }, f), ["scrollTo", "autoKill"]), 0), g.get()
                }), i)
            }
        }
    }, function(e, t, n) {
        "use strict";
        var a = Object.assign || function(e) {
                for (var t = 1; t < arguments.length; t++) {
                    var n = arguments[t];
                    for (var a in n) Object.prototype.hasOwnProperty.call(n, a) && (e[a] = n[a])
                }
                return e
            },
            r = "BaseAttribute",
            i = {};
        e.exports = {
            name: r,
            properties: i,
            register: function(e) {
                var t = e.engine;
                e.factory.registerAnimation(r, (function(e) {
                    var n = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 0,
                        r = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : 0,
                        i = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : {};
                    return t.tween(e, a({
                        duration: n,
                        delay: r
                    }, i), ["attr"])
                }), i)
            }
        }
    }, function(e, t, n) {
        "use strict";
        var a = Object.assign || function(e) {
                for (var t = 1; t < arguments.length; t++) {
                    var n = arguments[t];
                    for (var a in n) Object.prototype.hasOwnProperty.call(n, a) && (e[a] = n[a])
                }
                return e
            },
            r = n(0).getElementsAsArray,
            i = "BaseObjectProps",
            o = {};
        e.exports = {
            name: i,
            properties: o,
            register: function(e) {
                var t = e.engine;
                e.factory.registerAnimation(i, (function(e) {
                    var n = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 0,
                        i = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : 0,
                        o = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : {};
                    e = r(e);
                    var s = new Set(e.reduce((function(e, t) {
                            return e.concat(Object.keys(t))
                        }), [])),
                        d = Array.from(s);
                    return t.tween(e, a({
                        duration: n,
                        delay: i
                    }, o), d)
                }), o)
            }
        }
    }, function(e, t, n) {
        "use strict";
        var a = Object.assign || function(e) {
            for (var t = 1; t < arguments.length; t++) {
                var n = arguments[t];
                for (var a in n) Object.prototype.hasOwnProperty.call(n, a) && (e[a] = n[a])
            }
            return e
        };
        var r = n(0).getElementsAsArray,
            i = "BaseClear",
            o = {},
            s = [{
                domAttr: "data-angle",
                gsapAttr: "rotation"
            }, {
                domAttr: "data-scale",
                gsapAttr: "scale"
            }];
        e.exports = {
            name: i,
            properties: o,
            register: function(e) {
                var t = e.engine,
                    n = e.factory;
                n.registerAnimation(i, (function(e) {
                    var i = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 0,
                        o = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : 0,
                        d = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : {},
                        u = d.props,
                        c = void 0 === u ? "" : u,
                        m = d.parentProps,
                        l = void 0 === m ? "" : m,
                        f = d.to,
                        p = void 0 === f ? {} : f,
                        g = function(e, t) {
                            var n = {};
                            for (var a in e) t.indexOf(a) >= 0 || Object.prototype.hasOwnProperty.call(e, a) && (n[a] = e[a]);
                            return n
                        }(d, ["props", "parentProps", "to"]);
                    e = r(e);
                    var y = new Set(e.map((function(e) {
                            return e.parentNode
                        }))),
                        h = Array.from(y),
                        v = a({
                            duration: i,
                            delay: o,
                            to: p,
                            clearProps: c
                        }, g),
                        b = l ? a({}, v, {
                            clearProps: l
                        }) : null,
                        x = n.sequence({
                            callbacks: {
                                onComplete: function() {
                                    return function(e) {
                                        e.forEach((function(e) {
                                            return delete e._gsTransform
                                        }))
                                    }(e)
                                }
                            }
                        });
                    return x.add(t.tween(e, v, [])), b && x.add(t.tween(h, b, []), 0),
                        function(e, t, n) {
                            e.forEach((function(e) {
                                var r = {};
                                s.forEach((function(t) {
                                    var n = e.getAttribute(t.domAttr);
                                    n && (r[t.gsapAttr] = n)
                                })), Object.keys(r).length && t.add(n.tween(e, a({}, r, {
                                    duration: 0,
                                    delay: 0,
                                    immediateRender: !1
                                }), Object.keys(r)))
                            }))
                        }(e, x, t), x.get()
                }), o)
            }
        }
    }, function(e, t, n) {
        "use strict";
        var a = "Fade",
            r = {
                groups: ["animation"],
                schema: {
                    duration: {
                        type: "integer",
                        min: 0,
                        default: 0
                    },
                    delay: {
                        type: "integer",
                        min: 0,
                        default: 0
                    },
                    from: {
                        type: "object",
                        properties: {
                            opacity: {
                                type: "number",
                                min: 0,
                                max: 1
                            },
                            autoAlpha: {
                                type: "number",
                                min: 0,
                                max: 1
                            }
                        }
                    },
                    to: {
                        type: "object",
                        properties: {
                            opacity: {
                                type: "number",
                                min: 0,
                                max: 1
                            },
                            autoAlpha: {
                                type: "number",
                                min: 0,
                                max: 1,
                                default: 1
                            }
                        }
                    }
                }
            };
        e.exports = {
            name: a,
            properties: r,
            register: function(e) {
                var t = e.factory;
                t.registerAnimation(a, (function(e, n, a) {
                    var i = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : {},
                        o = i.from,
                        s = void 0 === o ? {} : o,
                        d = i.to,
                        u = void 0 === d ? {} : d,
                        c = i.ease,
                        m = void 0 === c ? "Sine.easeIn" : c,
                        l = function(e, t) {
                            var n = {};
                            for (var a in e) t.indexOf(a) >= 0 || Object.prototype.hasOwnProperty.call(e, a) && (n[a] = e[a]);
                            return n
                        }(i, ["from", "to", "ease"]),
                        f = t.sequence(l);
                    return void 0 === u.opacity && void 0 === u.autoAlpha && (u.autoAlpha = r.schema.to.properties.autoAlpha.default), f.add(t.animate("BaseFade", e, n, a, {
                        from: s,
                        to: u,
                        ease: m
                    })), f.get()
                }), r)
            }
        }
    }, function(e, t, n) {
        "use strict";
        var a = "Position",
            r = {
                groups: ["animation"],
                schema: {
                    duration: {
                        type: "integer",
                        min: 0,
                        default: 0
                    },
                    delay: {
                        type: "integer",
                        min: 0,
                        default: 0
                    },
                    from: {
                        type: "object",
                        properties: {
                            left: {
                                type: "numberLike"
                            },
                            top: {
                                type: "numberLike"
                            },
                            x: {
                                type: "numberLike"
                            },
                            y: {
                                type: "numberLike"
                            },
                            z: {
                                type: "numberLike"
                            },
                            bezier: {
                                type: "numberLike"
                            }
                        }
                    },
                    to: {
                        type: "object",
                        properties: {
                            left: {
                                type: "numberLike"
                            },
                            top: {
                                type: "numberLike"
                            },
                            x: {
                                type: "numberLike"
                            },
                            y: {
                                type: "numberLike"
                            },
                            z: {
                                type: "numberLike"
                            },
                            bezier: {
                                type: "string"
                            }
                        }
                    }
                }
            };
        e.exports = {
            name: a,
            properties: r,
            register: function(e) {
                var t = e.factory;
                t.registerAnimation(a, (function(e, n, a) {
                    var r = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : {},
                        i = r.from,
                        o = void 0 === i ? {} : i,
                        s = r.to,
                        d = void 0 === s ? {} : s,
                        u = r.ease,
                        c = void 0 === u ? "Sine.easeIn" : u,
                        m = function(e, t) {
                            var n = {};
                            for (var a in e) t.indexOf(a) >= 0 || Object.prototype.hasOwnProperty.call(e, a) && (n[a] = e[a]);
                            return n
                        }(r, ["from", "to", "ease"]),
                        l = t.sequence(m);
                    return l.add(t.animate("BasePosition", e, n, a, {
                        from: o,
                        to: d,
                        ease: c
                    })), l.get()
                }), r)
            }
        }
    }, function(e, t, n) {
        "use strict";
        var a = "Scale",
            r = {
                groups: ["animation"],
                schema: {
                    duration: {
                        type: "integer",
                        min: 0,
                        default: 0
                    },
                    delay: {
                        type: "integer",
                        min: 0,
                        default: 0
                    },
                    from: {
                        type: "object",
                        properties: {
                            scale: {
                                type: "number",
                                min: 0
                            },
                            scaleX: {
                                type: "number",
                                min: 0
                            },
                            scaleY: {
                                type: "number",
                                min: 0
                            }
                        }
                    },
                    to: {
                        type: "object",
                        properties: {
                            scale: {
                                type: "number",
                                min: 0
                            },
                            scaleX: {
                                type: "number",
                                min: 0
                            },
                            scaleY: {
                                type: "number",
                                min: 0
                            }
                        }
                    }
                }
            };
        e.exports = {
            name: a,
            properties: r,
            register: function(e) {
                var t = e.factory;
                t.registerAnimation(a, (function(e, n, a) {
                    var r = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : {},
                        i = r.from,
                        o = void 0 === i ? {} : i,
                        s = r.to,
                        d = void 0 === s ? {} : s,
                        u = r.ease,
                        c = void 0 === u ? "Sine.easeIn" : u,
                        m = function(e, t) {
                            var n = {};
                            for (var a in e) t.indexOf(a) >= 0 || Object.prototype.hasOwnProperty.call(e, a) && (n[a] = e[a]);
                            return n
                        }(r, ["from", "to", "ease"]),
                        l = t.sequence(m);
                    return l.add(t.animate("BaseScale", e, n, a, {
                        from: o,
                        to: d,
                        ease: c
                    })), l.get()
                }), r)
            }
        }
    }, function(e, t, n) {
        "use strict";

        function a(e, t) {
            var n = {};
            for (var a in e) t.indexOf(a) >= 0 || Object.prototype.hasOwnProperty.call(e, a) && (n[a] = e[a]);
            return n
        }
        var r = "Rotate",
            i = {
                groups: ["animation"],
                schema: {
                    duration: {
                        type: "integer",
                        min: 0,
                        default: 0
                    },
                    delay: {
                        type: "integer",
                        min: 0,
                        default: 0
                    },
                    from: {
                        type: "object",
                        properties: {
                            rotation: {
                                type: "number"
                            }
                        }
                    },
                    to: {
                        type: "object",
                        properties: {
                            rotation: {
                                type: "numberLike",
                                default: 360
                            }
                        }
                    }
                }
            },
            o = {
                cw: !0,
                ccw: !0,
                short: !0
            };
        e.exports = {
            name: r,
            properties: i,
            register: function(e) {
                var t = e.factory;
                t.registerAnimation(r, (function(e, n, r) {
                    var s = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : {},
                        d = s.from,
                        u = void 0 === d ? {} : d,
                        c = s.to,
                        m = (c = void 0 === c ? {} : c).direction,
                        l = a(c, ["direction"]),
                        f = s.ease,
                        p = void 0 === f ? "Sine.easeIn" : f,
                        g = a(s, ["from", "to", "ease"]),
                        y = t.sequence(g);
                    return l.rotation = l.rotation || i.schema.to.properties.rotation.default, o[m] && (l.rotation = l.rotation + "_" + m), y.add(t.animate("BaseRotate", e, n, r, {
                        from: u,
                        to: l,
                        ease: p
                    })), y.get()
                }), i)
            }
        }
    }, function(e, t, n) {
        "use strict";
        var a = Object.assign || function(e) {
            for (var t = 1; t < arguments.length; t++) {
                var n = arguments[t];
                for (var a in n) Object.prototype.hasOwnProperty.call(n, a) && (e[a] = n[a])
            }
            return e
        };
        var r = "Sequence",
            i = {
                groups: ["animation"],
                schema: {
                    delay: {
                        type: "integer",
                        min: 0,
                        default: 0
                    },
                    animations: {
                        type: "array"
                    },
                    repeat: {
                        type: "integer",
                        min: -1
                    },
                    repeatDelay: {
                        type: "number",
                        min: 0
                    },
                    yoyo: {
                        type: "boolean"
                    }
                }
            };
        e.exports = {
            name: r,
            properties: i,
            register: function(e) {
                var t = e.factory;
                t.registerAnimation(r, (function(e, n) {
                    var r = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : 0,
                        i = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : {},
                        o = i.animations,
                        s = function(e, t) {
                            var n = {};
                            for (var a in e) t.indexOf(a) >= 0 || Object.prototype.hasOwnProperty.call(e, a) && (n[a] = e[a]);
                            return n
                        }(i, ["animations"]),
                        d = t.sequence(a({
                            delay: r
                        }, s));
                    return o.forEach((function(n) {
                        var a = n.name,
                            r = n.duration,
                            i = n.delay,
                            o = n.offset,
                            s = n.from,
                            u = void 0 === s ? {} : s,
                            c = n.to,
                            m = void 0 === c ? {} : c,
                            l = n.ease;
                        d.add(t.animate(a, e, r, i, {
                            from: u,
                            to: m,
                            ease: l
                        }), o)
                    })), d.get()
                }), i)
            }
        }
    }, function(e, t, n) {
        "use strict";
        var a = n(0).getElementsAsArray,
            r = "ClearSequence",
            i = {
                groups: ["animation"],
                schema: {}
            };
        e.exports = {
            name: r,
            properties: i,
            register: function(e) {
                var t = e.factory,
                    n = e.engine;
                t.registerAnimation(r, (function(e, r, i) {
                    var o = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : {};
                    (e = a(e)).reduce((function(e, t) {
                        return e.concat(n.getTweensOf(t))
                    }), []).forEach((function(e) {
                        return n.kill(e)
                    }));
                    var s = t.sequence(o);
                    return s.add(t.animate("BaseNone", e, 0, 0, {})), s.get()
                }), i)
            }
        }
    }, function(e, t, n) {
        "use strict";
        var a = n(0),
            r = a.getAdjustedDirection,
            i = a.getElementsAsArray,
            o = "ArcIn",
            s = {
                hideOnStart: !0,
                viewportThreshold: .15,
                groups: ["3d", "entrance", "animation"],
                schema: {
                    duration: {
                        type: "number",
                        min: 0,
                        default: 0
                    },
                    delay: {
                        type: "number",
                        min: 0,
                        default: 0
                    },
                    direction: {
                        type: "string",
                        enum: ["right", "left"],
                        default: "left"
                    }
                }
            },
            d = {
                pseudoRight: {
                    angleX: "180",
                    angleY: "0",
                    idx: 0
                },
                right: {
                    angleX: "0",
                    angleY: "180",
                    idx: 1
                },
                pseudoLeft: {
                    angleX: "-180",
                    angleY: "0",
                    idx: 2
                },
                left: {
                    angleX: "0",
                    angleY: "-180",
                    idx: 3
                }
            };
        e.exports = {
            properties: s,
            name: o,
            register: function(e) {
                var t = e.engine,
                    n = e.factory;
                n.registerAnimation(o, (function(e, a, o) {
                    var u = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : {},
                        c = u.direction,
                        m = void 0 === c ? s.schema.direction.default : c,
                        l = function(e, t) {
                            var n = {};
                            for (var a in e) t.indexOf(a) >= 0 || Object.prototype.hasOwnProperty.call(e, a) && (n[a] = e[a]);
                            return n
                        }(u, ["direction"]);
                    e = i(e);
                    var f = n.sequence(l);
                    return f.add(n.animate("BaseFade", e, a, o, {
                        from: {
                            opacity: 0
                        },
                        to: {
                            opacity: 1
                        },
                        ease: "Sine.easeInOut"
                    })), e.forEach((function(e) {
                        var i = e.getAttribute("data-angle") || 0,
                            s = function(e) {
                                return {
                                    rotationX: d[e].angleX,
                                    rotationY: d[e].angleY
                                }
                            }(r(d, m, i)),
                            u = function(e) {
                                return "50% 50% " + -1.5 * e.offsetWidth
                            }(e);
                        f.add(t.set(e, {
                            transformOrigin: u
                        }), 0).add(n.animate("BaseRotate3D", e, a, o, {
                            from: s,
                            perspective: 200,
                            fallbackFor3D: !1,
                            ease: "Sine.easeInOut"
                        }), 0)
                    })), f.get()
                }), s)
            }
        }
    }, function(e, t, n) {
        "use strict";
        var a = "DropIn",
            r = {
                hideOnStart: !0,
                viewportThreshold: .15,
                groups: ["entrance", "animation"],
                schema: {
                    duration: {
                        type: "number",
                        min: 0,
                        default: 0
                    },
                    delay: {
                        type: "number",
                        min: 0,
                        default: 0
                    },
                    power: {
                        type: "string",
                        enum: ["soft", "medium", "hard"],
                        default: "hard"
                    }
                }
            },
            i = {
                soft: 1.2,
                medium: 3.6,
                hard: 6
            };
        e.exports = {
            name: a,
            properties: r,
            register: function(e) {
                var t = e.factory;
                t.registerAnimation(a, (function(e, n, a) {
                    var o = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : {},
                        s = o.power,
                        d = void 0 === s ? r.schema.power.default : s,
                        u = function(e, t) {
                            var n = {};
                            for (var a in e) t.indexOf(a) >= 0 || Object.prototype.hasOwnProperty.call(e, a) && (n[a] = e[a]);
                            return n
                        }(o, ["power"]),
                        c = t.sequence(u),
                        m = i[d];
                    return c.add([t.animate("BaseFade", e, .25 * n, a, {
                        from: {
                            opacity: 0
                        },
                        to: {
                            opacity: 1
                        },
                        ease: "Sine.easeIn"
                    }), t.animate("BaseScale", e, n, a, {
                        from: {
                            scale: m
                        },
                        ease: "Sine.easeIn"
                    })]), c.get()
                }), r)
            }
        }
    }, function(e, t, n) {
        "use strict";
        var a = "ExpandIn",
            r = {
                hideOnStart: !0,
                viewportThreshold: .15,
                groups: ["entrance", "animation"],
                schema: {
                    duration: {
                        type: "number",
                        min: 0,
                        default: 0
                    },
                    delay: {
                        type: "number",
                        min: 0,
                        default: 0
                    },
                    power: {
                        type: "string",
                        enum: ["soft", "medium", "hard"],
                        default: "hard"
                    }
                }
            },
            i = {
                soft: .85,
                medium: .4,
                hard: 0
            };
        e.exports = {
            name: a,
            properties: r,
            register: function(e) {
                var t = e.factory;
                t.registerAnimation(a, (function(e, n, a) {
                    var o = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : {},
                        s = o.power,
                        d = void 0 === s ? r.schema.power.default : s,
                        u = function(e, t) {
                            var n = {};
                            for (var a in e) t.indexOf(a) >= 0 || Object.prototype.hasOwnProperty.call(e, a) && (n[a] = e[a]);
                            return n
                        }(o, ["power"]),
                        c = t.sequence(u),
                        m = i[d];
                    return c.add(t.animate("BaseFade", e, 0, 0, {
                        to: {
                            opacity: .01
                        }
                    })), c.add([t.animate("BaseFade", e, n, a, {
                        to: {
                            opacity: 1
                        },
                        ease: "Cubic.easeIn"
                    }), t.animate("BaseScale", e, n, a, {
                        from: {
                            scale: m
                        },
                        ease: "Sine.easeIn",
                        immediateRender: !1
                    })]), c.get()
                }), r)
            }
        }
    }, function(e, t, n) {
        "use strict";
        var a = "FadeIn",
            r = {
                hideOnStart: !0,
                viewportThreshold: .15,
                groups: ["entrance", "animation"],
                schema: {
                    duration: {
                        type: "number",
                        min: 0,
                        default: 0
                    },
                    delay: {
                        type: "number",
                        min: 0,
                        default: 0
                    }
                }
            };
        e.exports = {
            name: a,
            properties: r,
            register: function(e) {
                var t = e.factory;
                t.registerAnimation(a, (function(e, n, a, r) {
                    var i = t.sequence(r);
                    return i.add(t.animate("BaseFade", e, n, a, {
                        from: {
                            opacity: 0
                        },
                        to: {
                            opacity: 1
                        },
                        ease: "Cubic.easeIn"
                    })), i.get()
                }), r)
            }
        }
    }, function(e, t, n) {
        "use strict";
        var a = n(0),
            r = a.getAdjustedDirection,
            i = a.getElementsAsArray,
            o = "FlipIn",
            s = {
                hideOnStart: !0,
                viewportThreshold: .15,
                groups: ["3d", "entrance", "animation"],
                schema: {
                    duration: {
                        type: "number",
                        min: 0,
                        default: 0
                    },
                    delay: {
                        type: "number",
                        min: 0,
                        default: 0
                    },
                    direction: {
                        type: "string",
                        enum: ["top", "right", "bottom", "left"],
                        default: "left"
                    }
                }
            },
            d = {
                top: {
                    angleX: "90",
                    angleY: "0",
                    idx: 0
                },
                right: {
                    angleX: "0",
                    angleY: "90",
                    idx: 1
                },
                bottom: {
                    angleX: "-90",
                    angleY: "0",
                    idx: 2
                },
                left: {
                    angleX: "0",
                    angleY: "-90",
                    idx: 3
                }
            };
        e.exports = {
            name: o,
            properties: s,
            register: function(e) {
                var t = e.factory;
                t.registerAnimation(o, (function(e, n, a) {
                    var o = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : {},
                        u = o.direction,
                        c = void 0 === u ? s.schema.direction.default : u,
                        m = function(e, t) {
                            var n = {};
                            for (var a in e) t.indexOf(a) >= 0 || Object.prototype.hasOwnProperty.call(e, a) && (n[a] = e[a]);
                            return n
                        }(o, ["direction"]);
                    e = i(e);
                    var l = t.sequence(m);
                    return l.add(t.animate("BaseFade", e, 0, 0, {
                        to: {
                            opacity: .01
                        }
                    })), l.add(t.animate("BaseFade", e, .25 * n, a, {
                        to: {
                            opacity: 1
                        },
                        ease: "Strong.easeIn"
                    }), "animation-start"), e.forEach((function(e) {
                        var i = e.getAttribute("data-angle") || 0,
                            o = r(d, c, i),
                            s = {
                                rotationX: d[o].angleX,
                                rotationY: d[o].angleY
                            };
                        l.add(t.animate("BaseRotate3D", e, .75 * n, a, {
                            from: s,
                            perspective: 800,
                            ease: "Strong.easeIn",
                            immediateRender: !1
                        }), "animation-start")
                    })), l.get()
                }), s)
            }
        }
    }, function(e, t, n) {
        "use strict";
        var a = n(0).getElementsAsArray,
            r = "FloatIn",
            i = {
                hideOnStart: !0,
                viewportThreshold: .15,
                groups: ["entrance", "animation"],
                schema: {
                    duration: {
                        type: "number",
                        min: 0,
                        default: 0
                    },
                    delay: {
                        type: "number",
                        min: 0,
                        default: 0
                    },
                    direction: {
                        type: "string",
                        enum: ["top", "right", "bottom", "left"],
                        default: "right"
                    }
                }
            },
            o = {
                top: {
                    dx: "0",
                    dy: "-1",
                    distance: "60"
                },
                right: {
                    dx: "1",
                    dy: "0",
                    distance: "120"
                },
                bottom: {
                    dx: "0",
                    dy: "1",
                    distance: "60"
                },
                left: {
                    dx: "-1",
                    dy: "0",
                    distance: "120"
                }
            };
        e.exports = {
            name: r,
            properties: i,
            register: function(e, t) {
                var n = e.engine,
                    s = e.factory;
                s.registerAnimation(r, (function(e, r, d) {
                    var u = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : {},
                        c = u.direction,
                        m = void 0 === c ? i.schema.direction.default : c,
                        l = function(e, t) {
                            var n = {};
                            for (var a in e) t.indexOf(a) >= 0 || Object.prototype.hasOwnProperty.call(e, a) && (n[a] = e[a]);
                            return n
                        }(u, ["direction"]);
                    e = a(e);
                    var f = o[m],
                        p = t.innerWidth,
                        g = (t.innerHeight, s.sequence(l));
                    return g.add(s.animate("BaseFade", e, r, d, {
                        from: {
                            opacity: 0
                        },
                        to: {
                            opacity: 1
                        },
                        ease: "Cubic.easeIn"
                    })), e.forEach((function(e) {
                        var t = n.getBoundingRect(e),
                            a = void 0,
                            i = f.dy * f.distance;
                        a = f.dx > 0 ? f.dx * Math.max(0, Math.min(p - t.right, f.distance)) : f.dx * Math.max(0, Math.min(t.left, f.distance)), g.add(s.animate("BasePosition", e, r, d, {
                            from: {
                                x: a,
                                y: i
                            },
                            ease: "Sine.easeOut"
                        }), 0)
                    })), g.get()
                }), i)
            }
        }
    }, function(e, t, n) {
        "use strict";
        var a = n(0).getElementsAsArray,
            r = "FlyIn",
            i = {
                hideOnStart: !0,
                viewportThreshold: .15,
                groups: ["entrance", "animation"],
                schema: {
                    duration: {
                        type: "number",
                        min: 0,
                        default: 0
                    },
                    delay: {
                        type: "number",
                        min: 0,
                        default: 0
                    },
                    direction: {
                        type: "string",
                        enum: ["top", "top left", "top right", "left", "bottom", "bottom left", "bottom right", "right"],
                        default: "right"
                    }
                }
            },
            o = {
                top: {
                    dy: "-1"
                },
                right: {
                    dx: "1"
                },
                bottom: {
                    dy: "1"
                },
                left: {
                    dx: "-1"
                }
            };
        e.exports = {
            name: r,
            properties: i,
            register: function(e, t) {
                var n = e.engine,
                    s = e.factory;
                s.registerAnimation(r, (function(e, r, d) {
                    var u = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : {},
                        c = u.direction,
                        m = void 0 === c ? i.schema.direction.default : c,
                        l = function(e, t) {
                            var n = {};
                            for (var a in e) t.indexOf(a) >= 0 || Object.prototype.hasOwnProperty.call(e, a) && (n[a] = e[a]);
                            return n
                        }(u, ["direction"]);
                    e = a(e);
                    var f = function(e) {
                            var t = {
                                dx: 0,
                                dy: 0
                            };
                            return e.forEach((function(e) {
                                o[e] && Object.assign(t, o[e])
                            })), t
                        }(m.split(" ")),
                        p = t.innerWidth,
                        g = t.innerHeight,
                        y = s.sequence(l);
                    return y.add(s.animate("BaseFade", e, r, d, {
                        from: {
                            opacity: 0
                        },
                        to: {
                            opacity: 1
                        },
                        ease: "Linear.easeIn"
                    })), e.forEach((function(e) {
                        var t = n.getBoundingRect(e),
                            a = f.dx > 0 ? p - t.right : f.dx * t.left,
                            i = f.dy > 0 ? g - t.top : f.dy * t.bottom;
                        y.add(s.animate("BasePosition", e, r, d, {
                            from: {
                                x: a,
                                y: i
                            },
                            ease: "Sine.easeOut"
                        }), 0)
                    })), y.get()
                }), i)
            }
        }
    }, function(e, t, n) {
        "use strict";
        var a = n(0),
            r = a.getAdjustedDirection,
            i = a.getElementTransformedPosition,
            o = a.getTransformOriginTweenParams,
            s = a.getElementsAsArray,
            d = "FoldIn",
            u = {
                hideOnStart: !0,
                viewportThreshold: .15,
                groups: ["3d", "entrance", "animation"],
                schema: {
                    duration: {
                        type: "number",
                        min: 0,
                        default: 0
                    },
                    delay: {
                        type: "number",
                        min: 0,
                        default: 0
                    },
                    direction: {
                        type: "string",
                        enum: ["top", "right", "bottom", "left"],
                        default: "left"
                    }
                }
            },
            c = {
                top: {
                    angleX: "-90",
                    angleY: "0",
                    origin: {
                        x: "50%",
                        y: "0"
                    },
                    idx: 0
                },
                right: {
                    angleX: "0",
                    angleY: "-90",
                    origin: {
                        x: "100%",
                        y: "50%"
                    },
                    idx: 1
                },
                bottom: {
                    angleX: "90",
                    angleY: "0",
                    origin: {
                        x: "50%",
                        y: "100%"
                    },
                    idx: 2
                },
                left: {
                    angleX: "0",
                    angleY: "90",
                    origin: {
                        x: "0",
                        y: "50%"
                    },
                    idx: 3
                }
            };
        e.exports = {
            name: d,
            properties: u,
            register: function(e) {
                var t = e.engine,
                    n = e.factory;
                n.registerAnimation(d, (function(e, a, d) {
                    var m = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : {},
                        l = m.direction,
                        f = void 0 === l ? u.schema.direction.default : l,
                        p = function(e, t) {
                            var n = {};
                            for (var a in e) t.indexOf(a) >= 0 || Object.prototype.hasOwnProperty.call(e, a) && (n[a] = e[a]);
                            return n
                        }(m, ["direction"]);
                    e = s(e);
                    var g = n.sequence(p);
                    return g.add(n.animate("BaseFade", e, 0, 0, {
                        to: {
                            opacity: .01
                        }
                    })), g.add(n.animate("BaseFade", e, .25 * a, d, {
                        to: {
                            opacity: 1
                        },
                        ease: "Cubic.easeInOut"
                    }), "animation-start"), e.forEach((function(e) {
                        var s = e.getAttribute("data-angle") || 0,
                            u = s * Math.PI / 180,
                            m = r(c, f, s),
                            l = t.getBoundingRect(e),
                            p = t.getBoundingContentRect(e),
                            y = i(c[m].origin, p, u),
                            h = y.x,
                            v = y.y,
                            b = o(l, p, c[m].origin),
                            x = {
                                rotationX: c[m].angleX,
                                rotationY: c[m].angleY
                            };
                        g.add([n.animate("BasePosition", e, 0, d, {
                            transformOrigin: b,
                            x: h,
                            y: v,
                            immediateRender: !1
                        }), n.animate("BaseRotate3D", e, a, d, {
                            from: x,
                            perspective: 800,
                            ease: "Cubic.easeInOut",
                            immediateRender: !1
                        })], "animation-start")
                    })), g.get()
                }), u)
            }
        }
    }, function(e, t, n) {
        "use strict";
        var a = n(0),
            r = a.getClipParams,
            i = a.getClipFallbackParams,
            o = a.getAdjustedDirection,
            s = a.getTransformTweenParams,
            d = a.getElementsAsArray,
            u = "Reveal",
            c = {
                hideOnStart: !0,
                viewportThreshold: .15,
                groups: ["mask", "entrance", "animation"],
                schema: {
                    duration: {
                        type: "number",
                        min: 0,
                        default: 0
                    },
                    delay: {
                        type: "number",
                        min: 0,
                        default: 0
                    },
                    direction: {
                        type: "string",
                        enum: ["top", "right", "center", "bottom", "left"],
                        default: "left"
                    }
                }
            },
            m = {
                top: {
                    dx: 0,
                    dy: -1,
                    idx: 0
                },
                right: {
                    dx: 1,
                    dy: 0,
                    idx: 1
                },
                bottom: {
                    dx: 0,
                    dy: 1,
                    idx: 2
                },
                left: {
                    dx: -1,
                    dy: 0,
                    idx: 3
                }
            };
        e.exports = {
            name: u,
            properties: c,
            register: function(e) {
                var t = e.engine,
                    n = e.factory;
                n.registerAnimation(u, (function(e, a, u) {
                    var l = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : {},
                        f = l.direction,
                        p = void 0 === f ? c.schema.direction.default : f,
                        g = function(e, t) {
                            var n = {};
                            for (var a in e) t.indexOf(a) >= 0 || Object.prototype.hasOwnProperty.call(e, a) && (n[a] = e[a]);
                            return n
                        }(l, ["direction"]);
                    e = d(e);
                    var y = n.sequence(g);
                    return y.add(n.animate("BaseFade", e, .25 * a, u, {
                        from: {
                            opacity: 0
                        },
                        to: {
                            opacity: 1
                        },
                        ease: "Cubic.easeInOut"
                    })), e.forEach((function(e) {
                        var d = t.getBoundingRect(e),
                            c = t.getBoundingContentRect(e),
                            l = e.getAttribute("data-angle") || 0,
                            f = l * Math.PI / 180,
                            g = "center" !== p ? o(m, p, l) : p;
                        if (void 0 === e.style.clipPath) {
                            var h = i(g),
                                v = m[g] || {
                                    dx: 0,
                                    dy: 0
                                },
                                b = {
                                    dx: v.dx / 2,
                                    dy: v.dy / 2
                                },
                                x = s(c, b, f);
                            y.add([n.animate("BaseScale", e, a, u, {
                                from: h,
                                ease: "Cubic.easeInOut"
                            }), n.animate("BasePosition", e, a, u, {
                                from: x,
                                ease: "Cubic.easeInOut"
                            })], 0)
                        } else {
                            var O = r(d, c, g);
                            y.add(n.animate("BaseClipPath", e, a, u, {
                                from: O,
                                ease: "Cubic.easeInOut"
                            }), 0)
                        }
                    })), y.get()
                }), c)
            }
        }
    }, function(e, t, n) {
        "use strict";
        var a = n(0),
            r = a.getClipParams,
            i = a.getClipFallbackParams,
            o = a.getAdjustedDirection,
            s = a.getTransformTweenParams,
            d = a.getElementsAsArray,
            u = "SlideIn",
            c = {
                hideOnStart: !0,
                viewportThreshold: .15,
                groups: ["mask", "entrance", "animation"],
                schema: {
                    duration: {
                        type: "number",
                        min: 0,
                        default: 0
                    },
                    delay: {
                        type: "number",
                        min: 0,
                        default: 0
                    },
                    direction: {
                        type: "string",
                        enum: ["top", "right", "bottom", "left"],
                        default: "left"
                    },
                    power: {
                        type: "string",
                        enum: ["soft", "medium", "hard"],
                        default: "hard"
                    }
                }
            },
            m = {
                top: {
                    dx: 0,
                    dy: -1,
                    idx: 0,
                    clip: "bottom"
                },
                right: {
                    dx: 1,
                    dy: 0,
                    idx: 1,
                    clip: "left"
                },
                bottom: {
                    dx: 0,
                    dy: 1,
                    idx: 2,
                    clip: "top"
                },
                left: {
                    dx: -1,
                    dy: 0,
                    idx: 3,
                    clip: "right"
                }
            },
            l = {
                soft: 70,
                medium: 35,
                hard: 0
            };
        e.exports = {
            name: u,
            properties: c,
            register: function(e) {
                var t = e.engine,
                    n = e.factory;
                n.registerAnimation(u, (function(e, a, u) {
                    var f = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : {},
                        p = f.direction,
                        g = void 0 === p ? c.schema.direction.default : p,
                        y = f.power,
                        h = void 0 === y ? c.schema.power.default : y,
                        v = function(e, t) {
                            var n = {};
                            for (var a in e) t.indexOf(a) >= 0 || Object.prototype.hasOwnProperty.call(e, a) && (n[a] = e[a]);
                            return n
                        }(f, ["direction", "power"]);
                    e = d(e);
                    var b = n.sequence(v);
                    return b.add(n.animate("BaseFade", e, .25 * a, u, {
                        from: {
                            opacity: 0
                        },
                        to: {
                            opacity: 1
                        },
                        ease: "Cubic.easeInOut"
                    })), e.forEach((function(e) {
                        var d = t.getBoundingRect(e),
                            c = t.getBoundingContentRect(e),
                            f = e.getAttribute("data-angle") || 0,
                            p = f * Math.PI / 180,
                            y = o(m, g, f);
                        if (void 0 === e.style.clipPath) {
                            var v = i(y),
                                x = {
                                    dx: m[y].dx / 2,
                                    dy: m[y].dy / 2
                                },
                                O = s(c, x, p);
                            b.add([n.animate("BaseScale", e, a, u, {
                                from: v,
                                ease: "Cubic.easeInOut"
                            }), n.animate("BasePosition", e, a, u, {
                                from: O,
                                ease: "Cubic.easeInOut"
                            })], 0)
                        } else {
                            var A = r(d, c, m[y].clip, {
                                    minimum: l[h]
                                }),
                                w = s(c, m[y], p, (100 - l[h]) / 100);
                            b.add([n.animate("BaseClipPath", e, a, u, {
                                from: A,
                                ease: "Cubic.easeInOut"
                            }), n.animate("BasePosition", e, a, u, {
                                from: w,
                                ease: "Cubic.easeInOut"
                            })], 0)
                        }
                    })), b.get()
                }), c)
            }
        }
    }, function(e, t, n) {
        "use strict";
        var a = "SpinIn",
            r = {
                hideOnStart: !0,
                viewportThreshold: .15,
                groups: ["entrance", "animation"],
                schema: {
                    duration: {
                        type: "number",
                        min: 0,
                        default: 0
                    },
                    delay: {
                        type: "number",
                        min: 0,
                        default: 0
                    },
                    cycles: {
                        type: "number",
                        min: 0,
                        default: 5
                    },
                    direction: {
                        type: "string",
                        enum: ["cw", "ccw"],
                        default: "cw"
                    },
                    power: {
                        type: "string",
                        enum: ["soft", "medium", "hard"],
                        default: "hard"
                    }
                }
            },
            i = {
                cw: {
                    direction: "-1"
                },
                ccw: {
                    direction: "1"
                }
            },
            o = {
                soft: .8,
                medium: .5,
                hard: 0
            };
        e.exports = {
            name: a,
            properties: r,
            register: function(e) {
                var t = e.factory;
                t.registerAnimation(a, (function(e, n, a) {
                    var s = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : {},
                        d = s.direction,
                        u = void 0 === d ? r.schema.direction.default : d,
                        c = s.cycles,
                        m = void 0 === c ? r.schema.cycles.default : c,
                        l = s.power,
                        f = void 0 === l ? r.schema.power.default : l,
                        p = function(e, t) {
                            var n = {};
                            for (var a in e) t.indexOf(a) >= 0 || Object.prototype.hasOwnProperty.call(e, a) && (n[a] = e[a]);
                            return n
                        }(s, ["direction", "cycles", "power"]),
                        g = o[f],
                        y = (i[u].direction > 0 ? "+=" : "-=") + 360 * m,
                        h = t.sequence(p);
                    return h.add(t.animate("BaseFade", e, 0, 0, {
                        to: {
                            opacity: .01
                        }
                    })), h.add([t.animate("BaseFade", e, n, a, {
                        to: {
                            opacity: 1
                        },
                        ease: "Sine.easeIn"
                    }), t.animate("BaseScale", e, n, a, {
                        from: {
                            scale: g
                        },
                        ease: "Sine.easeOut",
                        immediateRender: !1
                    }), t.animate("BaseRotate", e, n, a, {
                        from: {
                            rotation: y
                        },
                        ease: "Sine.easeIn"
                    })]), h.get()
                }), r)
            }
        }
    }, function(e, t, n) {
        "use strict";
        var a = n(0).getElementsAsArray,
            r = "TurnIn",
            i = {
                hideOnStart: !0,
                viewportThreshold: .15,
                groups: ["entrance", "animation"],
                schema: {
                    duration: {
                        type: "number",
                        min: 0,
                        default: 0
                    },
                    delay: {
                        type: "number",
                        min: 0,
                        default: 0
                    },
                    direction: {
                        type: "string",
                        enum: ["right", "left"],
                        default: "left"
                    }
                }
            },
            o = {
                left: {
                    dx: "-1",
                    angle: "90"
                },
                right: {
                    dx: "1",
                    angle: "90"
                }
            };
        e.exports = {
            name: r,
            properties: i,
            register: function(e, t) {
                var n = e.engine,
                    s = e.factory;
                s.registerAnimation(r, (function(e, r, d) {
                    var u = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : {},
                        c = u.direction,
                        m = void 0 === c ? i.schema.direction.default : c,
                        l = function(e, t) {
                            var n = {};
                            for (var a in e) t.indexOf(a) >= 0 || Object.prototype.hasOwnProperty.call(e, a) && (n[a] = e[a]);
                            return n
                        }(u, ["direction"]);
                    e = a(e);
                    var f = o[m],
                        p = t.innerWidth,
                        g = (t.innerHeight, s.sequence(l));
                    return g.add(s.animate("BaseFade", e, r, d, {
                        from: {
                            opacity: 0
                        },
                        to: {
                            opacity: 1
                        },
                        ease: "Linear.easeIn"
                    })), e.forEach((function(e) {
                        var t = n.getBoundingRect(e),
                            a = f.dx > 0 ? p - t.right : f.dx * t.left,
                            i = Math.min(-1.5 * t.height, Math.max(-300, -5.5 * t.height)),
                            o = (f.dx > 0 ? "+=" : "-=") + f.angle,
                            u = [{
                                x: f.dx * t.width,
                                y: i
                            }, {
                                x: a,
                                y: i
                            }];
                        g.add([s.animate("BasePosition", e, r, d, {
                            from: {
                                bezier: {
                                    values: u,
                                    type: "soft"
                                }
                            },
                            ease: "Sine.easeOut",
                            immediateRender: !1
                        }), s.animate("BaseRotate", e, r, d, {
                            from: {
                                rotation: o
                            },
                            ease: "Sine.easeOut",
                            immediateRender: !1
                        })], 0)
                    })), g.get()
                }), i)
            }
        }
    }, function(e, t, n) {
        "use strict";
        var a = n(0),
            r = a.translatePoint,
            i = a.getAdjustedDirection,
            o = a.getElementsAsArray,
            s = "BounceIn",
            d = {
                hideOnStart: !0,
                viewportThreshold: .15,
                groups: ["entrance", "animation"],
                schema: {
                    duration: {
                        type: "number",
                        min: 0,
                        default: 0
                    },
                    delay: {
                        type: "number",
                        min: 0,
                        default: 0
                    },
                    bounce: {
                        type: "string",
                        enum: ["soft", "medium", "hard"],
                        default: "medium"
                    },
                    direction: {
                        type: "string",
                        enum: ["top left", "top right", "center", "bottom right", "bottom left"],
                        default: "top left"
                    }
                }
            },
            u = {
                "top left": {
                    y: -1.1,
                    x: -1.1,
                    idx: 0
                },
                "top right": {
                    y: -1.1,
                    x: 1.1,
                    idx: 1
                },
                "bottom right": {
                    y: 1.1,
                    x: 1.1,
                    idx: 2
                },
                "bottom left": {
                    y: 1.1,
                    x: -1.1,
                    idx: 3
                }
            },
            c = {
                y: 0,
                x: 0
            },
            m = {
                soft: [.6, .25],
                medium: [.9, .22],
                hard: [1.3, .2]
            };
        e.exports = {
            name: s,
            properties: d,
            register: function(e) {
                var t = e.engine,
                    n = e.factory;
                n.registerAnimation(s, (function(e, a, s) {
                    var l = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : {},
                        f = l.direction,
                        p = void 0 === f ? d.schema.direction.default : f,
                        g = l.bounce,
                        y = void 0 === g ? d.schema.bounce.default : g,
                        h = function(e, t) {
                            var n = {};
                            for (var a in e) t.indexOf(a) >= 0 || Object.prototype.hasOwnProperty.call(e, a) && (n[a] = e[a]);
                            return n
                        }(l, ["direction", "bounce"]);
                    e = o(e);
                    var v = .3 * a,
                        b = a - v,
                        x = n.sequence(h);
                    return x.add(n.animate("BaseFade", e, 0, 0, {
                        to: {
                            opacity: .01
                        }
                    })), x.add(n.animate("BaseFade", e, v, s, {
                        to: {
                            opacity: 1
                        },
                        ease: "Cubic.easeIn"
                    }), "animation-start"), e.forEach((function(e) {
                        var a = t.getElementRect(e),
                            o = e.getAttribute("data-angle") || 0,
                            d = "center" !== p ? i(u, p, o) : p,
                            l = u[d] || c,
                            f = r(a.width / 2 * l.x, a.height / 2 * l.y, o),
                            g = r(a.width / 3 * l.x, a.height / 3 * l.y, o);
                        x.add([n.animate("BasePosition", e, v, s, {
                            from: {
                                x: f.x,
                                y: f.y
                            },
                            to: {
                                x: g.x,
                                y: g.y
                            },
                            ease: "Expo.easeIn"
                        }), n.animate("BaseScale", e, v, s, {
                            from: {
                                scale: 0
                            },
                            to: {
                                scale: .3
                            },
                            ease: "Expo.easeIn",
                            immediateRender: !1
                        })], "animation-start"), x.add([n.animate("BasePosition", e, b, 0, {
                            to: {
                                x: 0,
                                y: 0
                            },
                            ease: "Elastic.easeOut",
                            easeParams: m[y]
                        }), n.animate("BaseScale", e, b, 0, {
                            to: {
                                scale: 1
                            },
                            ease: "Elastic.easeOut",
                            easeParams: m[y]
                        })])
                    })), x.get()
                }), d)
            }
        }
    }, function(e, t, n) {
        "use strict";
        var a = "GlideIn",
            r = {
                hideOnStart: !0,
                viewportThreshold: .15,
                groups: ["entrance", "animation"],
                schema: {
                    duration: {
                        type: "number",
                        min: 0,
                        default: 0
                    },
                    delay: {
                        type: "number",
                        min: 0,
                        default: 0
                    },
                    angle: {
                        type: "number",
                        min: 0,
                        max: 360,
                        default: 0
                    },
                    distance: {
                        type: "number",
                        min: 0,
                        default: 0
                    }
                }
            };
        e.exports = {
            name: a,
            properties: r,
            register: function(e) {
                var t = e.factory;
                t.registerAnimation(a, (function(e, n, a) {
                    var i = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : {},
                        o = i.angle,
                        s = void 0 === o ? r.schema.angle.default : o,
                        d = i.distance,
                        u = void 0 === d ? r.schema.distance.default : d,
                        c = function(e, t) {
                            var n = {};
                            for (var a in e) t.indexOf(a) >= 0 || Object.prototype.hasOwnProperty.call(e, a) && (n[a] = e[a]);
                            return n
                        }(i, ["angle", "distance"]),
                        m = s * Math.PI / 180,
                        l = Math.sin(m) * u,
                        f = Math.cos(m) * u * -1,
                        p = t.sequence(c);
                    return p.add([t.animate("BaseFade", e, 0, 0, {
                        from: {
                            opacity: 0
                        },
                        to: {
                            opacity: 1
                        },
                        ease: "Sine.easeIn"
                    }), t.animate("BasePosition", e, n, a, {
                        from: {
                            x: l,
                            y: f
                        },
                        ease: "Sine.easeInOut"
                    })], 0), p.get()
                }), r)
            }
        }
    }, function(e, t, n) {
        "use strict";
        var a = n(0),
            r = a.getAdjustedDirection,
            i = a.getElementsAsArray,
            o = "ArcOut",
            s = {
                groups: ["3d", "exit", "animation"],
                schema: {
                    duration: {
                        type: "number",
                        min: 0,
                        default: 0
                    },
                    delay: {
                        type: "number",
                        min: 0,
                        default: 0
                    },
                    direction: {
                        type: "string",
                        enum: ["right", "left"],
                        default: "left"
                    }
                }
            },
            d = {
                pseudoRight: {
                    angleX: "180",
                    angleY: "0",
                    idx: 0
                },
                right: {
                    angleX: "0",
                    angleY: "180",
                    idx: 1
                },
                pseudoLeft: {
                    angleX: "-180",
                    angleY: "0",
                    idx: 2
                },
                left: {
                    angleX: "0",
                    angleY: "-180",
                    idx: 3
                }
            };
        e.exports = {
            name: o,
            properties: s,
            register: function(e) {
                var t = e.engine,
                    n = e.factory;
                n.registerAnimation(o, (function(e, a, o, u) {
                    var c = u.direction,
                        m = void 0 === c ? s.schema.direction.default : c,
                        l = u.params;
                    e = i(e);
                    var f = n.sequence(l);
                    return f.add(n.animate("BaseFade", e, a, o, {
                        from: {
                            opacity: 1
                        },
                        to: {
                            autoAlpha: 0
                        },
                        ease: "Sine.easeInOut"
                    })), e.forEach((function(e) {
                        var i = e.getAttribute("data-angle") || 0,
                            s = function(e) {
                                return {
                                    rotationX: d[e].angleX,
                                    rotationY: d[e].angleY
                                }
                            }(r(d, m, i)),
                            u = function(e) {
                                return "50% 50% " + -1.5 * e.offsetWidth
                            }(e);
                        f.add(t.set(e, {
                            transformOrigin: u
                        }), 0).add(n.animate("BaseRotate3D", e, a, o, {
                            to: s,
                            perspective: 200,
                            fallbackFor3D: !1,
                            ease: "Sine.easeInOut"
                        }), 0)
                    })), f.get()
                }), s)
            }
        }
    }, function(e, t, n) {
        "use strict";
        var a = "PopOut",
            r = {
                groups: ["exit", "animation"],
                schema: {
                    duration: {
                        type: "number",
                        min: 0,
                        default: 0
                    },
                    delay: {
                        type: "number",
                        min: 0,
                        default: 0
                    },
                    power: {
                        type: "string",
                        enum: ["soft", "medium", "hard"],
                        default: "hard"
                    }
                }
            },
            i = {
                soft: .8,
                medium: 2.4,
                hard: 4
            };
        e.exports = {
            name: a,
            properties: r,
            register: function(e) {
                var t = e.factory;
                t.registerAnimation(a, (function(e, n, a) {
                    var o = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : {},
                        s = o.power,
                        d = void 0 === s ? r.schema.power.default : s,
                        u = function(e, t) {
                            var n = {};
                            for (var a in e) t.indexOf(a) >= 0 || Object.prototype.hasOwnProperty.call(e, a) && (n[a] = e[a]);
                            return n
                        }(o, ["power"]),
                        c = t.sequence(u),
                        m = i[d];
                    return c.add([t.animate("BaseFade", e, .75 * n, a + .25 * n, {
                        from: {
                            opacity: 1
                        },
                        to: {
                            autoAlpha: 0
                        },
                        ease: "Sine.easeOut"
                    }), t.animate("BaseScale", e, n, a, {
                        to: {
                            scale: m
                        },
                        ease: "Sine.easeOut"
                    })]), c.get()
                }), r)
            }
        }
    }, function(e, t, n) {
        "use strict";
        var a = "CollapseOut",
            r = {
                groups: ["exit", "animation"],
                schema: {
                    duration: {
                        type: "number",
                        min: 0,
                        default: 0
                    },
                    delay: {
                        type: "number",
                        min: 0,
                        default: 0
                    },
                    power: {
                        type: "string",
                        enum: ["soft", "medium", "hard"],
                        default: "hard"
                    }
                }
            },
            i = {
                soft: .85,
                medium: .4,
                hard: 0
            };
        e.exports = {
            name: a,
            properties: r,
            register: function(e) {
                var t = e.factory;
                t.registerAnimation(a, (function(e, n, a) {
                    var o = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : {},
                        s = o.power,
                        d = void 0 === s ? r.schema.power.default : s,
                        u = function(e, t) {
                            var n = {};
                            for (var a in e) t.indexOf(a) >= 0 || Object.prototype.hasOwnProperty.call(e, a) && (n[a] = e[a]);
                            return n
                        }(o, ["power"]),
                        c = t.sequence(u),
                        m = i[d];
                    return c.add([t.animate("BaseFade", e, n, a, {
                        from: {
                            opacity: 1
                        },
                        to: {
                            autoAlpha: 0
                        },
                        ease: "Cubic.easeOut"
                    }), t.animate("BaseScale", e, n, a, {
                        to: {
                            scale: m
                        },
                        ease: "Sine.easeOut"
                    })]), c.get()
                }), r)
            }
        }
    }, function(e, t, n) {
        "use strict";
        var a = "FadeOut",
            r = {
                groups: ["exit", "animation"],
                schema: {
                    duration: {
                        type: "number",
                        min: 0,
                        default: 0
                    },
                    delay: {
                        type: "number",
                        min: 0,
                        default: 0
                    }
                }
            };
        e.exports = {
            name: a,
            properties: r,
            register: function(e) {
                var t = e.factory;
                t.registerAnimation(a, (function(e, n, a, r) {
                    var i = t.sequence(r);
                    return i.add(t.animate("BaseFade", e, n, a, {
                        to: {
                            autoAlpha: 0
                        },
                        ease: "Cubic.easeIn"
                    })), i.get()
                }), r)
            }
        }
    }, function(e, t, n) {
        "use strict";
        var a = n(0),
            r = a.getAdjustedDirection,
            i = a.getElementsAsArray,
            o = "FlipOut",
            s = {
                groups: ["3d", "exit", "animation"],
                schema: {
                    duration: {
                        type: "number",
                        min: 0,
                        default: 0
                    },
                    delay: {
                        type: "number",
                        min: 0,
                        default: 0
                    },
                    direction: {
                        type: "string",
                        enum: ["top", "right", "bottom", "left"],
                        default: "left"
                    }
                }
            },
            d = {
                top: {
                    angleX: "90",
                    angleY: "0",
                    idx: 0
                },
                right: {
                    angleX: "0",
                    angleY: "90",
                    idx: 1
                },
                bottom: {
                    angleX: "-90",
                    angleY: "0",
                    idx: 2
                },
                left: {
                    angleX: "0",
                    angleY: "-90",
                    idx: 3
                }
            };
        e.exports = {
            name: o,
            properties: s,
            register: function(e) {
                var t = e.factory;
                t.registerAnimation(o, (function(e, n, a) {
                    var o = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : {},
                        u = o.direction,
                        c = void 0 === u ? s.schema.direction.default : u,
                        m = function(e, t) {
                            var n = {};
                            for (var a in e) t.indexOf(a) >= 0 || Object.prototype.hasOwnProperty.call(e, a) && (n[a] = e[a]);
                            return n
                        }(o, ["direction"]);
                    e = i(e);
                    var l = t.sequence(m);
                    return l.add(t.animate("BaseFade", e, .75 * n, a + .25 * n, {
                        from: {
                            opacity: 1
                        },
                        to: {
                            autoAlpha: 0
                        },
                        ease: "Sine.easeOut"
                    })), e.forEach((function(e) {
                        var i = e.getAttribute("data-angle") || 0,
                            o = r(d, c, i),
                            s = {
                                rotationX: d[o].angleX,
                                rotationY: d[o].angleY
                            };
                        l.add(t.animate("BaseRotate3D", e, .75 * n, a, {
                            to: s,
                            perspective: 800,
                            fallbackFor3D: !0,
                            ease: "Strong.easeOut"
                        }), 0)
                    })), l.get()
                }), s)
            }
        }
    }, function(e, t, n) {
        "use strict";
        var a = n(0).getElementsAsArray,
            r = "FloatOut",
            i = {
                groups: ["exit", "animation"],
                schema: {
                    duration: {
                        type: "number",
                        min: 0,
                        default: 0
                    },
                    delay: {
                        type: "number",
                        min: 0,
                        default: 0
                    },
                    direction: {
                        type: "string",
                        enum: ["top", "right", "bottom", "left"],
                        default: "right"
                    }
                }
            },
            o = {
                top: {
                    dx: "0",
                    dy: "-1",
                    distance: "60"
                },
                right: {
                    dx: "1",
                    dy: "0",
                    distance: "120"
                },
                bottom: {
                    dx: "0",
                    dy: "1",
                    distance: "60"
                },
                left: {
                    dx: "-1",
                    dy: "0",
                    distance: "120"
                }
            };
        e.exports = {
            name: r,
            properties: i,
            register: function(e, t) {
                var n = e.engine,
                    s = e.factory;
                s.registerAnimation(r, (function(e, r, d) {
                    var u = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : {},
                        c = u.direction,
                        m = void 0 === c ? i.schema.direction.default : c,
                        l = function(e, t) {
                            var n = {};
                            for (var a in e) t.indexOf(a) >= 0 || Object.prototype.hasOwnProperty.call(e, a) && (n[a] = e[a]);
                            return n
                        }(u, ["direction"]);
                    e = a(e);
                    var f = o[m],
                        p = t.innerWidth,
                        g = (t.innerHeight, s.sequence(l));
                    return g.add(s.animate("BaseFade", e, r, d, {
                        from: {
                            opacity: 1
                        },
                        to: {
                            autoAlpha: 0
                        },
                        ease: "Cubic.easeOut"
                    })), e.forEach((function(e) {
                        var t = n.getBoundingRect(e),
                            a = void 0,
                            i = f.dy * f.distance;
                        a = f.dx > 0 ? f.dx * Math.max(0, Math.min(p - t.right, f.distance)) : f.dx * Math.max(0, Math.min(t.left, f.distance)), g.add(s.animate("BasePosition", e, r, d, {
                            to: {
                                x: a,
                                y: i
                            },
                            ease: "Sine.easeIn"
                        }), 0)
                    })), g.get()
                }), i)
            }
        }
    }, function(e, t, n) {
        "use strict";
        var a = n(0).getElementsAsArray,
            r = "FlyOut",
            i = {
                groups: ["exit", "animation"],
                schema: {
                    duration: {
                        type: "number",
                        min: 0,
                        default: 0
                    },
                    delay: {
                        type: "number",
                        min: 0,
                        default: 0
                    },
                    direction: {
                        type: "string",
                        enum: ["top", "top left", "top right", "left", "bottom", "bottom left", "bottom right", "right"],
                        default: "right"
                    }
                }
            },
            o = {
                top: {
                    dy: "-1"
                },
                right: {
                    dx: "1"
                },
                bottom: {
                    dy: "1"
                },
                left: {
                    dx: "-1"
                }
            };
        e.exports = {
            name: r,
            properties: i,
            register: function(e, t) {
                var n = e.engine,
                    s = e.factory;
                s.registerAnimation(r, (function(e, r, d) {
                    var u = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : {},
                        c = u.direction,
                        m = void 0 === c ? i.schema.direction.default : c,
                        l = function(e, t) {
                            var n = {};
                            for (var a in e) t.indexOf(a) >= 0 || Object.prototype.hasOwnProperty.call(e, a) && (n[a] = e[a]);
                            return n
                        }(u, ["direction"]);
                    e = a(e);
                    var f = function(e) {
                            var t = {
                                dx: 0,
                                dy: 0
                            };
                            return e.forEach((function(e) {
                                o[e] && Object.assign(t, o[e])
                            })), t
                        }(m.split(" ")),
                        p = t.innerWidth,
                        g = t.innerHeight,
                        y = s.sequence(l);
                    return y.add(s.animate("BaseFade", e, r, d, {
                        from: {
                            opacity: 1
                        },
                        to: {
                            autoAlpha: 0
                        },
                        ease: "Linear.easeIn"
                    })), e.forEach((function(e) {
                        var t = n.getBoundingRect(e),
                            a = f.dx > 0 ? p - t.right : f.dx * t.left,
                            i = f.dy > 0 ? g - t.top : f.dy * t.bottom;
                        y.add(s.animate("BasePosition", e, r, d, {
                            to: {
                                x: a,
                                y: i
                            },
                            ease: "Sine.easeIn"
                        }), 0)
                    })), y.get()
                }), i)
            }
        }
    }, function(e, t, n) {
        "use strict";
        var a = n(0),
            r = a.getAdjustedDirection,
            i = a.getTransformOriginTweenParams,
            o = a.getElementTransformedPosition,
            s = a.getElementsAsArray,
            d = "FoldOut",
            u = {
                groups: ["3d", "exit", "animation"],
                schema: {
                    duration: {
                        type: "number",
                        min: 0,
                        default: 0
                    },
                    delay: {
                        type: "number",
                        min: 0,
                        default: 0
                    },
                    direction: {
                        type: "string",
                        enum: ["top", "right", "bottom", "left"],
                        default: "left"
                    }
                }
            },
            c = {
                top: {
                    angleX: "-90",
                    angleY: "0",
                    origin: {
                        x: "50%",
                        y: "0"
                    },
                    idx: 0
                },
                right: {
                    angleX: "0",
                    angleY: "-90",
                    origin: {
                        x: "100%",
                        y: "50%"
                    },
                    idx: 1
                },
                bottom: {
                    angleX: "90",
                    angleY: "0",
                    origin: {
                        x: "50%",
                        y: "100%"
                    },
                    idx: 2
                },
                left: {
                    angleX: "0",
                    angleY: "90",
                    origin: {
                        x: "0",
                        y: "50%"
                    },
                    idx: 3
                }
            };
        e.exports = {
            name: d,
            properties: u,
            register: function(e) {
                var t = e.engine,
                    n = e.factory;
                n.registerAnimation(d, (function(e, a, d) {
                    var m = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : {},
                        l = m.direction,
                        f = void 0 === l ? u.schema.direction.default : l,
                        p = function(e, t) {
                            var n = {};
                            for (var a in e) t.indexOf(a) >= 0 || Object.prototype.hasOwnProperty.call(e, a) && (n[a] = e[a]);
                            return n
                        }(m, ["direction"]);
                    e = s(e);
                    var g = n.sequence(p);
                    return g.add(n.animate("BaseFade", e, .75 * a, d + .25 * a, {
                        from: {
                            opacity: 1
                        },
                        to: {
                            autoAlpha: 0
                        },
                        ease: "Sine.easeInOut"
                    })), e.forEach((function(e) {
                        var s = e.getAttribute("data-angle") || 0,
                            u = s * Math.PI / 180,
                            m = r(c, f, s),
                            l = t.getBoundingRect(e),
                            p = t.getBoundingContentRect(e),
                            y = o(c[m].origin, p, u),
                            h = i(l, p, c[m].origin),
                            v = {
                                rotationX: c[m].angleX,
                                rotationY: c[m].angleY
                            };
                        g.add([n.animate("BasePosition", e, 0, d, {
                            from: {
                                transformOrigin: h,
                                x: y.x,
                                y: y.y
                            }
                        }), n.animate("BaseRotate3D", e, a, d, {
                            to: v,
                            perspective: 800,
                            fallbackFor3D: !0,
                            ease: "Cubic.easeInOut"
                        })], 0)
                    })), g.get()
                }), u)
            }
        }
    }, function(e, t, n) {
        "use strict";
        var a = n(0),
            r = a.getClipParams,
            i = a.getClipFallbackParams,
            o = a.getAdjustedDirection,
            s = a.getTransformTweenParams,
            d = a.getElementsAsArray,
            u = "Conceal",
            c = {
                groups: ["mask", "exit", "animation"],
                schema: {
                    duration: {
                        type: "number",
                        min: 0,
                        default: 0
                    },
                    delay: {
                        type: "number",
                        min: 0,
                        default: 0
                    },
                    direction: {
                        type: "string",
                        enum: ["top", "right", "center", "bottom", "left"],
                        default: "left"
                    }
                }
            },
            m = {
                top: {
                    dx: 0,
                    dy: -1,
                    idx: 0
                },
                right: {
                    dx: 1,
                    dy: 0,
                    idx: 1
                },
                bottom: {
                    dx: 0,
                    dy: 1,
                    idx: 2
                },
                left: {
                    dx: -1,
                    dy: 0,
                    idx: 3
                }
            };
        e.exports = {
            name: u,
            properties: c,
            register: function(e) {
                var t = e.engine,
                    n = e.factory;
                n.registerAnimation(u, (function(e, a, u) {
                    var l = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : {},
                        f = l.direction,
                        p = void 0 === f ? c.schema.direction.default : f,
                        g = function(e, t) {
                            var n = {};
                            for (var a in e) t.indexOf(a) >= 0 || Object.prototype.hasOwnProperty.call(e, a) && (n[a] = e[a]);
                            return n
                        }(l, ["direction"]);
                    e = d(e);
                    var y = n.sequence(g);
                    return y.add(n.animate("BaseFade", e, .75 * a, u + .25 * a, {
                        from: {
                            opacity: 1
                        },
                        to: {
                            autoAlpha: 0
                        },
                        ease: "Cubic.easeInOut"
                    })), e.forEach((function(e) {
                        var d = t.getBoundingRect(e),
                            c = t.getBoundingContentRect(e),
                            l = e.getAttribute("data-angle") || 0,
                            f = l * Math.PI / 180,
                            g = "center" !== p ? o(m, p, l) : p;
                        if (void 0 === e.style.clipPath) {
                            var h = i(g),
                                v = m[g] || {
                                    dx: 0,
                                    dy: 0
                                },
                                b = {
                                    dx: v.dx / 2,
                                    dy: v.dy / 2
                                },
                                x = s(c, b, f);
                            y.add([n.animate("BaseScale", e, a, u, {
                                to: h,
                                ease: "Cubic.easeInOut"
                            }), n.animate("BasePosition", e, a, u, {
                                to: x,
                                ease: "Cubic.easeInOut"
                            })], 0)
                        } else {
                            var O = r(d, c, g);
                            y.add(n.animate("BaseClipPath", e, a, u, {
                                to: O,
                                ease: "Cubic.easeInOut"
                            }), 0)
                        }
                    })), y.get()
                }), c)
            }
        }
    }, function(e, t, n) {
        "use strict";
        var a = n(0),
            r = a.getClipParams,
            i = a.getClipFallbackParams,
            o = a.getAdjustedDirection,
            s = a.getTransformTweenParams,
            d = a.getElementsAsArray,
            u = "SlideOut",
            c = {
                groups: ["mask", "exit", "animation"],
                schema: {
                    duration: {
                        type: "number",
                        min: 0,
                        default: 0
                    },
                    delay: {
                        type: "number",
                        min: 0,
                        default: 0
                    },
                    direction: {
                        type: "string",
                        enum: ["top", "right", "bottom", "left"],
                        default: "left"
                    },
                    power: {
                        type: "string",
                        enum: ["soft", "medium", "hard"],
                        default: "hard"
                    }
                }
            },
            m = {
                top: {
                    dx: 0,
                    dy: -1,
                    idx: 0,
                    clip: "bottom"
                },
                right: {
                    dx: 1,
                    dy: 0,
                    idx: 1,
                    clip: "left"
                },
                bottom: {
                    dx: 0,
                    dy: 1,
                    idx: 2,
                    clip: "top"
                },
                left: {
                    dx: -1,
                    dy: 0,
                    idx: 3,
                    clip: "right"
                }
            },
            l = {
                soft: 70,
                medium: 35,
                hard: 0
            };
        e.exports = {
            name: u,
            properties: c,
            register: function(e) {
                var t = e.engine,
                    n = e.factory;
                n.registerAnimation(u, (function(e, a, u) {
                    var f = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : {},
                        p = f.direction,
                        g = void 0 === p ? c.schema.direction.default : p,
                        y = f.power,
                        h = void 0 === y ? c.schema.power.default : y,
                        v = function(e, t) {
                            var n = {};
                            for (var a in e) t.indexOf(a) >= 0 || Object.prototype.hasOwnProperty.call(e, a) && (n[a] = e[a]);
                            return n
                        }(f, ["direction", "power"]);
                    e = d(e);
                    var b = (u || 0) + .75 * a,
                        x = .25 * a,
                        O = n.sequence(v);
                    return O.add(n.animate("BaseFade", e, x, b, {
                        from: {
                            opacity: 1
                        },
                        to: {
                            autoAlpha: 0
                        },
                        ease: "Cubic.easeInOut"
                    })), e.forEach((function(e) {
                        var d = t.getBoundingRect(e),
                            c = t.getBoundingContentRect(e),
                            f = e.getAttribute("data-angle") || 0,
                            p = f * Math.PI / 180,
                            y = o(m, g, f);
                        if (void 0 === e.style.clipPath) {
                            var v = i(y),
                                b = {
                                    dx: m[y].dx / 2,
                                    dy: m[y].dy / 2
                                },
                                x = s(c, b, p);
                            O.add([n.animate("BaseScale", e, a, u, {
                                to: v,
                                ease: "Cubic.easeInOut"
                            }), n.animate("BasePosition", e, a, u, {
                                to: x,
                                ease: "Cubic.easeInOut"
                            })], 0)
                        } else {
                            var A = r(d, c, m[y].clip, {
                                    minimum: l[h]
                                }),
                                w = s(c, m[y], p, (100 - l[h]) / 100);
                            O.add([n.animate("BaseClipPath", e, a, u, {
                                to: A,
                                ease: "Cubic.easeInOut"
                            }), n.animate("BasePosition", e, a, u, {
                                to: w,
                                ease: "Cubic.easeInOut"
                            })], 0)
                        }
                    })), O.get()
                }), c)
            }
        }
    }, function(e, t, n) {
        "use strict";
        var a = "SpinOut",
            r = {
                groups: ["entrance", "animation"],
                schema: {
                    duration: {
                        type: "number",
                        min: 0,
                        default: 0
                    },
                    delay: {
                        type: "number",
                        min: 0,
                        default: 0
                    },
                    cycles: {
                        type: "number",
                        min: 0,
                        default: 5
                    },
                    direction: {
                        type: "string",
                        enum: ["cw", "ccw"],
                        default: "cw"
                    },
                    power: {
                        type: "string",
                        enum: ["soft", "medium", "hard"],
                        default: "hard"
                    }
                }
            },
            i = {
                cw: {
                    direction: "-1"
                },
                ccw: {
                    direction: "1"
                }
            },
            o = {
                soft: .8,
                medium: .5,
                hard: 0
            };
        e.exports = {
            name: a,
            properties: r,
            register: function(e) {
                var t = e.factory;
                t.registerAnimation(a, (function(e, n, a) {
                    var s = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : {},
                        d = s.direction,
                        u = void 0 === d ? r.schema.direction.default : d,
                        c = s.cycles,
                        m = void 0 === c ? r.schema.cycles.default : c,
                        l = s.power,
                        f = void 0 === l ? r.schema.power.default : l,
                        p = function(e, t) {
                            var n = {};
                            for (var a in e) t.indexOf(a) >= 0 || Object.prototype.hasOwnProperty.call(e, a) && (n[a] = e[a]);
                            return n
                        }(s, ["direction", "cycles", "power"]),
                        g = o[f],
                        y = (i[u].direction > 0 ? "+=" : "-=") + 360 * m,
                        h = t.sequence(p);
                    return h.add([t.animate("BaseFade", e, n, a, {
                        from: {
                            opacity: 1
                        },
                        to: {
                            autoAlpha: 0
                        },
                        ease: "Sine.easeIn"
                    }), t.animate("BaseScale", e, n, a, {
                        to: {
                            scale: g
                        },
                        ease: "Sine.easeIn"
                    }), t.animate("BaseRotate", e, n, a, {
                        to: {
                            rotation: y
                        },
                        ease: "Sine.easeOut"
                    })]), h.get()
                }), r)
            }
        }
    }, function(e, t, n) {
        "use strict";
        var a = n(0).getElementsAsArray,
            r = "TurnOut",
            i = {
                groups: ["entrance", "animation"],
                schema: {
                    duration: {
                        type: "number",
                        min: 0,
                        default: 0
                    },
                    delay: {
                        type: "number",
                        min: 0,
                        default: 0
                    },
                    direction: {
                        type: "string",
                        enum: ["right", "left"],
                        default: "right"
                    }
                }
            },
            o = {
                left: {
                    dx: "-1",
                    angle: "90"
                },
                right: {
                    dx: "1",
                    angle: "90"
                }
            };
        e.exports = {
            name: r,
            properties: i,
            register: function(e, t) {
                var n = e.engine,
                    s = e.factory;
                s.registerAnimation(r, (function(e, r, d) {
                    var u = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : {},
                        c = u.direction,
                        m = void 0 === c ? i.schema.direction.default : c,
                        l = function(e, t) {
                            var n = {};
                            for (var a in e) t.indexOf(a) >= 0 || Object.prototype.hasOwnProperty.call(e, a) && (n[a] = e[a]);
                            return n
                        }(u, ["direction"]);
                    e = a(e);
                    var f = o[m],
                        p = t.innerWidth,
                        g = (t.innerHeight, s.sequence(l));
                    return g.add(s.animate("BaseFade", e, r, d, {
                        from: {
                            opacity: 1
                        },
                        to: {
                            autoAlpha: 0
                        },
                        ease: "Linear.easeIn"
                    })), e.forEach((function(e) {
                        var t = n.getBoundingRect(e),
                            a = f.dx > 0 ? p - t.right : f.dx * t.left,
                            i = Math.min(-1.5 * t.height, Math.max(-300, -5.5 * t.height)),
                            o = (f.dx > 0 ? "+=" : "-=") + f.angle,
                            u = [{
                                x: a,
                                y: i
                            }, {
                                x: f.dx * t.width,
                                y: i
                            }];
                        g.add([s.animate("BasePosition", e, r, d, {
                            to: {
                                bezier: {
                                    values: u,
                                    type: "soft"
                                }
                            },
                            ease: "Sine.easeIn"
                        }), s.animate("BaseRotate", e, r, d, {
                            to: {
                                rotation: o
                            },
                            ease: "Sine.easeIn"
                        })], 0)
                    })), g.get()
                }), i)
            }
        }
    }, function(e, t, n) {
        "use strict";
        var a = "BounceOut",
            r = {
                groups: ["exit", "animation"],
                schema: {
                    duration: {
                        type: "number",
                        min: 0,
                        default: 0
                    },
                    delay: {
                        type: "number",
                        min: 0,
                        default: 0
                    },
                    bounce: {
                        type: "string",
                        enum: ["soft", "medium", "hard"],
                        default: "medium"
                    },
                    direction: {
                        type: "string",
                        enum: ["top left", "top right", "center", "bottom right", "bottom left"],
                        default: "top left"
                    }
                }
            },
            i = {
                "top left": "0 0",
                "top right": "100% 0",
                "bottom left": "0 100%",
                "bottom right": "100% 100%",
                center: "50% 50%"
            },
            o = {
                soft: [.6],
                medium: [1],
                hard: [1.5]
            };
        e.exports = {
            name: a,
            properties: r,
            register: function(e) {
                var t = e.factory;
                t.registerAnimation(a, (function(e, n, a) {
                    var s = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : {},
                        d = s.direction,
                        u = void 0 === d ? r.schema.direction.default : d,
                        c = s.bounce,
                        m = void 0 === c ? r.schema.bounce.default : c,
                        l = function(e, t) {
                            var n = {};
                            for (var a in e) t.indexOf(a) >= 0 || Object.prototype.hasOwnProperty.call(e, a) && (n[a] = e[a]);
                            return n
                        }(s, ["direction", "bounce"]),
                        f = i[u],
                        p = t.sequence(l);
                    return p.add(t.animate("BaseNone", e, 0, 0, {
                        transformOrigin: f
                    }), 0).add(t.animate("BaseScale", e, n, a, {
                        to: {
                            scale: 0
                        },
                        ease: "Quint.easeIn",
                        easeParams: o[m]
                    }), 0).add(t.animate("BaseFade", e, .15, a, {
                        to: {
                            autoAlpha: 0
                        },
                        ease: "Sine.easeOut"
                    }), "-=0.15"), p.get()
                }), r)
            }
        }
    }, function(e, t, n) {
        "use strict";
        var a = "GlideOut",
            r = {
                groups: ["exit", "animation"],
                schema: {
                    duration: {
                        type: "number",
                        min: 0,
                        default: 0
                    },
                    delay: {
                        type: "number",
                        min: 0,
                        default: 0
                    },
                    angle: {
                        type: "number",
                        min: 0,
                        max: 360,
                        default: 0
                    },
                    distance: {
                        type: "number",
                        min: 0,
                        default: 0
                    }
                }
            };
        e.exports = {
            name: a,
            properties: r,
            register: function(e) {
                var t = e.factory;
                t.registerAnimation(a, (function(e, n, a) {
                    var i = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : {},
                        o = i.angle,
                        s = void 0 === o ? r.schema.angle.default : o,
                        d = i.distance,
                        u = void 0 === d ? r.schema.distance.default : d,
                        c = function(e, t) {
                            var n = {};
                            for (var a in e) t.indexOf(a) >= 0 || Object.prototype.hasOwnProperty.call(e, a) && (n[a] = e[a]);
                            return n
                        }(i, ["angle", "distance"]),
                        m = s * Math.PI / 180,
                        l = Math.sin(m) * u,
                        f = Math.cos(m) * u * -1,
                        p = t.sequence(c);
                    return p.add(t.animate("BasePosition", e, n, a, {
                        to: {
                            x: l,
                            y: f
                        },
                        ease: "Sine.easeInOut"
                    }), 0).add(t.animate("BaseFade", e, .1, 0, {
                        from: {
                            opacity: 1
                        },
                        to: {
                            autoAlpha: 0
                        },
                        ease: "Sine.easeOut",
                        immediateRender: !1
                    }), "-=0.1"), p.get()
                }), r)
            }
        }
    }, function(e, t, n) {
        "use strict";
        var a = n(0),
            r = a.getPositionParams,
            i = a.getElementsAsArray,
            o = "ModesMotionNoScale",
            s = {
                groups: ["entrance", "animation"],
                schema: {
                    duration: {
                        type: "number",
                        min: 0,
                        default: 0
                    },
                    delay: {
                        type: "number",
                        min: 0,
                        default: 0
                    }
                }
            };
        e.exports = {
            name: o,
            properties: s,
            register: function(e) {
                var t = e.engine,
                    n = e.factory;
                n.registerAnimation(o, (function(e, a, o, s) {
                    var d = s.from,
                        u = function(e, t) {
                            var n = {};
                            for (var a in e) t.indexOf(a) >= 0 || Object.prototype.hasOwnProperty.call(e, a) && (n[a] = e[a]);
                            return n
                        }(s, ["from"]);
                    e = i(e);
                    var c = n.sequence(u),
                        m = d.width,
                        l = d.height,
                        f = d.rotation;
                    return e.forEach((function(e) {
                        var i = t.getBoundingRect(e),
                            s = r(i, d);
                        c.add(n.animate("BasePosition", e, a, o, {
                            from: s,
                            ease: "Cubic.easeInOut"
                        }), 0), c.add(n.animate("BaseDimensions", e, a, o, {
                            from: {
                                width: m,
                                height: l
                            },
                            ease: "Cubic.easeInOut"
                        }), 0), c.add(n.animate("BaseRotate", e, a, o, {
                            from: {
                                rotation: f
                            },
                            ease: "Cubic.easeInOut"
                        }), 0)
                    })), c.get()
                }), s)
            }
        }
    }, function(e, t, n) {
        "use strict";
        var a = n(0),
            r = a.getPositionParams,
            i = a.getElementsAsArray,
            o = "ModesMotionNoDimensions",
            s = {
                groups: ["entrance", "animation"],
                schema: {
                    duration: {
                        type: "number",
                        min: 0,
                        default: 0
                    },
                    delay: {
                        type: "number",
                        min: 0,
                        default: 0
                    }
                }
            };
        e.exports = {
            name: o,
            properties: s,
            register: function(e) {
                var t = e.engine,
                    n = e.factory;
                n.registerAnimation(o, (function(e, a, o, s) {
                    var d = s.from,
                        u = function(e, t) {
                            var n = {};
                            for (var a in e) t.indexOf(a) >= 0 || Object.prototype.hasOwnProperty.call(e, a) && (n[a] = e[a]);
                            return n
                        }(s, ["from"]);
                    e = i(e);
                    var c = n.sequence(u);
                    return e.forEach((function(e) {
                        var i = t.getBoundingRect(e),
                            s = r(i, d);
                        c.add(n.animate("BasePosition", e, a, o, {
                            from: s,
                            ease: "Cubic.easeInOut"
                        }), 0), c.add(n.animate("BaseRotate", e, a, o, {
                            from: {
                                rotation: d.rotation
                            },
                            ease: "Cubic.easeInOut"
                        }), 0)
                    })), c.get()
                }), s)
            }
        }
    }, function(e, t, n) {
        "use strict";
        var a = n(0),
            r = a.getPositionParams,
            i = a.getScaleParams,
            o = a.getElementsAsArray,
            s = "ModesMotionScale",
            d = {
                groups: ["entrance", "animation"],
                schema: {
                    duration: {
                        type: "number",
                        min: 0,
                        default: 0
                    },
                    delay: {
                        type: "number",
                        min: 0,
                        default: 0
                    }
                }
            };
        e.exports = {
            name: s,
            properties: d,
            register: function(e) {
                var t = e.engine,
                    n = e.factory;
                n.registerAnimation(s, (function(e, a, s, d) {
                    var u = d.from,
                        c = function(e, t) {
                            var n = {};
                            for (var a in e) t.indexOf(a) >= 0 || Object.prototype.hasOwnProperty.call(e, a) && (n[a] = e[a]);
                            return n
                        }(d, ["from"]);
                    e = o(e);
                    var m = n.sequence(c);
                    return e.forEach((function(e) {
                        var o = t.getBoundingRect(e),
                            d = r(o, u, !0),
                            c = i(o, u);
                        m.add(n.animate("BasePosition", e, a, s, {
                            from: d,
                            ease: "Cubic.easeInOut"
                        }), 0), m.add(n.animate("BaseScale", e, a, s, {
                            from: c,
                            ease: "Cubic.easeInOut"
                        }), 0), m.add(n.animate("BaseRotate", e, a, s, {
                            from: {
                                rotation: u.rotation
                            },
                            ease: "Cubic.easeInOut"
                        }), 0)
                    })), m.get()
                }), d)
            }
        }
    }, function(e, t, n) {
        "use strict";
        var a = "SiteBackgroundParallax",
            r = {
                hideOnStart: !1,
                getMaxTravel: function(e, t, n) {
                    return Math.max(n - t, 0)
                },
                groups: ["animation", "background"],
                schema: {
                    duration: {
                        type: "number",
                        min: 0,
                        default: 0
                    },
                    delay: {
                        type: "number",
                        min: 0,
                        default: 0
                    },
                    speedFactor: {
                        type: "number",
                        min: 0,
                        default: .2
                    }
                }
            };
        e.exports = {
            name: a,
            properties: r,
            register: function(e, t) {
                var n = e.factory;
                n.registerAnimation(a, (function(e, a, r) {
                    var i = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : {},
                        o = i.speedFactor,
                        s = void 0 === o ? .2 : o,
                        d = function(e, t) {
                            var n = {};
                            for (var a in e) t.indexOf(a) >= 0 || Object.prototype.hasOwnProperty.call(e, a) && (n[a] = e[a]);
                            return n
                        }(i, ["speedFactor"]),
                        u = n.sequence(d),
                        c = Math.max(t.document.body.scrollHeight * s, 0),
                        m = t.innerHeight * s,
                        l = Math.min(c, m);
                    return u.add(n.animate("BasePosition", e, a, r, {
                        from: {
                            y: 0
                        },
                        to: {
                            y: -l
                        },
                        force3D: !0,
                        ease: "Linear.easeNone"
                    })), u.get()
                }), r)
            }
        }
    }, function(e, t, n) {
        "use strict";
        var a = n(0).getElementsAsArray,
            r = n(1),
            i = "BackgroundReveal",
            o = {
                hideOnStart: !1,
                shouldDisableSmoothScrolling: !0,
                getMaxTravel: function(e, t) {
                    return t + e.height
                },
                groups: ["animation", "background"],
                schema: {
                    duration: {
                        type: "number",
                        min: 0,
                        default: 0
                    },
                    delay: {
                        type: "number",
                        min: 0,
                        default: 0
                    },
                    viewPortHeight: {
                        type: "number",
                        min: 0,
                        default: 1
                    },
                    browserFlags: {
                        type: "object"
                    },
                    componentHeight: {
                        type: "number",
                        min: 0,
                        default: 1
                    }
                }
            };
        e.exports = {
            name: i,
            properties: o,
            register: function(e) {
                var t = e.factory;
                t.registerAnimation(i, (function(e, n, i) {
                    var o = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : {},
                        s = o.viewPortHeight,
                        d = void 0 === s ? 1 : s,
                        u = o.browserFlags,
                        c = void 0 === u ? {} : u,
                        m = o.componentHeight,
                        l = void 0 === m ? 1 : m,
                        f = function(e, t) {
                            var n = {};
                            for (var a in e) t.indexOf(a) >= 0 || Object.prototype.hasOwnProperty.call(e, a) && (n[a] = e[a]);
                            return n
                        }(o, ["viewPortHeight", "browserFlags", "componentHeight"]);
                    e = a(e);
                    var p = t.sequence(f),
                        g = void 0;
                    return c.animateRevealScrubAction ? e.forEach((function(e) {
                        g = r.REVEAL_SELECTORS.map((function(t) {
                            return e.querySelector(t)
                        })), p.add([t.animate("BasePosition", e, n, i, {
                            from: {
                                y: d
                            },
                            to: {
                                y: -l
                            },
                            force3D: !0,
                            immediateRender: !0
                        }), t.animate("BasePosition", g, n, i, {
                            from: {
                                y: -d
                            },
                            to: {
                                y: l
                            },
                            force3D: !0,
                            immediateRender: !0
                        })])
                    })) : e.forEach((function(n) {
                        g = r.REVEAL_SELECTORS.map((function(e) {
                            return n.querySelector(e)
                        })), p.add(t.animate("BaseNone", e, 0, 0, {
                            transformStyle: "preserve-3d",
                            force3D: !0
                        }), t.animate("BaseNone", g, 0, 0, {
                            transformStyle: "preserve-3d",
                            force3D: !0
                        }))
                    })), p.get()
                }), o)
            }
        }
    }, function(e, t, n) {
        "use strict";
        var a = n(0).getElementsAsArray,
            r = n(1),
            i = "BackgroundParallax",
            o = {
                hideOnStart: !1,
                shouldDisableSmoothScrolling: !0,
                getMaxTravel: function(e, t) {
                    return t + e.height
                },
                groups: ["animation", "background"],
                schema: {
                    duration: {
                        type: "number",
                        min: 0,
                        default: 0
                    },
                    delay: {
                        type: "number",
                        min: 0,
                        default: 0
                    },
                    speedFactor: {
                        type: "number",
                        min: 0,
                        default: .2
                    },
                    viewPortHeight: {
                        type: "number",
                        min: 0,
                        default: 1
                    },
                    browserFlags: {
                        type: "object"
                    },
                    componentHeight: {
                        type: "number",
                        min: 0,
                        default: 1
                    }
                }
            };
        e.exports = {
            name: i,
            properties: o,
            register: function(e) {
                var t = e.factory;
                t.registerAnimation(i, (function(e, n, i) {
                    var o = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : {},
                        s = o.speedFactor,
                        d = void 0 === s ? .2 : s,
                        u = o.viewPortHeight,
                        c = void 0 === u ? 1 : u,
                        m = o.browserFlags,
                        l = void 0 === m ? {} : m,
                        f = o.componentHeight,
                        p = void 0 === f ? 1 : f,
                        g = function(e, t) {
                            var n = {};
                            for (var a in e) t.indexOf(a) >= 0 || Object.prototype.hasOwnProperty.call(e, a) && (n[a] = e[a]);
                            return n
                        }(o, ["speedFactor", "viewPortHeight", "browserFlags", "componentHeight"]);
                    e = a(e);
                    var y = t.sequence(g),
                        h = void 0;
                    if (l.animateParallaxScrubAction) e.forEach((function(e) {
                        h = r.PARALLAX_SELECTORS.map((function(t) {
                            return e.querySelector(t)
                        })), y.add([t.animate("BasePosition", e, n, i, {
                            from: {
                                y: c
                            },
                            to: {
                                y: -p
                            },
                            force3D: !0,
                            immediateRender: !0
                        }), t.animate("BasePosition", h, n, i, {
                            from: {
                                y: c * (d - 1)
                            },
                            to: {
                                y: p * (1 - d)
                            },
                            force3D: !0,
                            immediateRender: !0
                        })])
                    }));
                    else {
                        var v = {};
                        l.preserve3DParallaxScrubAction && (v = {
                            transformStyle: "preserve-3d"
                        }), y.add(t.animate("BaseNone", e, 0, 0, v)), e.forEach((function(e) {
                            h = r.PARALLAX_SELECTORS.map((function(t) {
                                return e.querySelector(t)
                            })), y.add(t.animate("BasePosition", h, n, i, {
                                from: {
                                    y: c * d
                                },
                                to: {
                                    y: 0 - p * d
                                },
                                ease: "Linear.easeNone",
                                force3D: !0,
                                immediateRender: !0
                            }))
                        }))
                    }
                    return y.get()
                }), o)
            }
        }
    }, function(e, t, n) {
        "use strict";
        var a = n(0).getElementsAsArray,
            r = n(1),
            i = "BackgroundZoom",
            o = {
                hideOnStart: !1,
                shouldDisableSmoothScrolling: !0,
                getMaxTravel: function(e, t) {
                    return t + e.height
                },
                groups: ["animation", "background"],
                schema: {
                    duration: {
                        type: "number",
                        min: 0,
                        default: 0
                    },
                    delay: {
                        type: "number",
                        min: 0,
                        default: 0
                    }
                }
            };
        e.exports = {
            name: i,
            properties: o,
            register: function(e) {
                var t = e.factory;
                t.registerAnimation(i, (function(e, n, i) {
                    var o = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : {};
                    e = a(e);
                    var s = t.sequence(o);
                    return e.forEach((function(e) {
                        var a = r.ZOOM_SELECTORS.map((function(t) {
                            return e.querySelector(t)
                        }));
                        s.add([t.animate("BasePosition", e, 0, i, {
                            perspective: 100,
                            force3D: !0,
                            immediateRender: !0
                        }), t.animate("BasePosition", a, n, i, {
                            force3D: !0,
                            from: {
                                z: 0
                            },
                            to: {
                                z: 40
                            },
                            ease: "Sine.easeIn",
                            immediateRender: !0
                        })])
                    })), s.get()
                }), o)
            }
        }
    }, function(e, t, n) {
        "use strict";
        var a = "BackgroundFadeIn",
            r = {
                hideOnStart: !1,
                getMaxTravel: function(e, t, n) {
                    return Math.min(n - e.top, (t + e.height) / 2, .9 * t)
                },
                groups: ["animation", "background"],
                schema: {
                    duration: {
                        type: "number",
                        min: 0,
                        default: 0
                    },
                    delay: {
                        type: "number",
                        min: 0,
                        default: 0
                    }
                }
            };
        e.exports = {
            name: a,
            properties: r,
            register: function(e) {
                var t = e.factory;
                t.registerAnimation(a, (function(e, n, a) {
                    var r = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : {},
                        i = t.sequence(r);
                    return i.add(t.animate("BaseFade", e, n, a, {
                        from: {
                            opacity: 0
                        },
                        to: {
                            opacity: 1
                        },
                        ease: "Circ.easeIn",
                        force3D: !0,
                        immediateRender: !0
                    })), i.get()
                }), r)
            }
        }
    }, function(e, t, n) {
        "use strict";
        var a = n(0).getElementsAsArray,
            r = "BackgroundBlurIn",
            i = {
                hideOnStart: !1,
                getMaxTravel: function(e, t, n) {
                    return Math.min(n - e.top, (t + e.height) / 2, .9 * t)
                },
                groups: ["animation", "background"],
                schema: {
                    duration: {
                        type: "number",
                        min: 0,
                        default: 0
                    },
                    delay: {
                        type: "number",
                        min: 0,
                        default: 0
                    },
                    blur: {
                        type: "number",
                        min: 0,
                        default: 20
                    }
                }
            };
        e.exports = {
            name: r,
            properties: i,
            register: function(e) {
                var t = e.engine,
                    n = e.factory;
                n.registerAnimation(r, (function(e, r, o) {
                    var s = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : {},
                        d = s.blur,
                        u = void 0 === d ? i.schema.blur.default : d,
                        c = function(e, t) {
                            var n = {};
                            for (var a in e) t.indexOf(a) >= 0 || Object.prototype.hasOwnProperty.call(e, a) && (n[a] = e[a]);
                            return n
                        }(s, ["blur"]);
                    e = a(e);
                    var m = n.sequence(c),
                        l = void 0 !== e[0].style.WebkitFilter;
                    return e.forEach((function(e) {
                        e.setAttribute("data-blur", 0), n.animate("BaseNone", e, 0, 0, {
                            force3D: !0
                        }), m.add(n.animate("BaseAttribute", e, r, o, {
                            from: {
                                attr: {
                                    "data-blur": u
                                }
                            },
                            to: {
                                attr: {
                                    "data-blur": 0
                                }
                            },
                            ease: "Circ.easeIn",
                            immediateRender: !0,
                            callbacks: {
                                onUpdate: function() {
                                    var n = e.getAttribute("data-blur");
                                    t.tween(e, {
                                        duration: 0,
                                        delay: 0,
                                        WebkitFilter: "blur(" + n + "px)",
                                        filter: "blur(" + n + "px)"
                                    }, l ? ["WebkitFilter", "filter"] : ["filter"])
                                }
                            }
                        }))
                    })), m.get()
                }), i)
            }
        }
    }, function(e, t, n) {
        "use strict";
        var a = "HeaderHideToTop",
            r = {
                schema: {
                    duration: {
                        type: "number",
                        min: 0,
                        default: 0
                    },
                    delay: {
                        type: "number",
                        min: 0,
                        default: 0
                    },
                    compMeasures: {
                        type: "object",
                        properties: {
                            height: {
                                type: "number"
                            }
                        }
                    }
                }
            },
            i = 5;
        e.exports = {
            name: a,
            properties: r,
            register: function(e) {
                var t = e.factory;
                t.registerAnimation(a, (function(e, n, a, r) {
                    var o = r.compMeasures,
                        s = function(e, t) {
                            var n = {};
                            for (var a in e) t.indexOf(a) >= 0 || Object.prototype.hasOwnProperty.call(e, a) && (n[a] = e[a]);
                            return n
                        }(r, ["compMeasures"]),
                        d = t.sequence(s),
                        u = o.height;
                    return d.add(t.animate("BasePosition", e, n, a, {
                        ease: "Linear.easeNone",
                        from: {
                            y: 0
                        },
                        to: {
                            y: -1 * (u + i)
                        }
                    })), d.add(t.animate("BaseFade", e, .2, .1, {
                        ease: "Linear.easeIn",
                        to: {
                            autoAlpha: 0
                        }
                    })), d.get()
                }), r)
            }
        }
    }, function(e, t, n) {
        "use strict";
        var a = "HeaderFadeOut",
            r = {
                schema: {
                    duration: {
                        type: "number",
                        min: 0,
                        default: 0
                    },
                    delay: {
                        type: "number",
                        min: 0,
                        default: 0
                    }
                }
            };
        e.exports = {
            name: a,
            properties: r,
            register: function(e) {
                var t = e.factory;
                t.registerAnimation(a, (function(e, n, a, r) {
                    var i = t.sequence(r);
                    return i.add(t.animate("BaseFade", e, n, a, {
                        ease: "Quart.easeIn",
                        to: {
                            autoAlpha: 0
                        }
                    })), i.get()
                }), r)
            }
        }
    }, function(e, t, n) {
        "use strict";
        var a = "NoTransition",
            r = {
                defaultDuration: 0,
                schema: {
                    duration: {
                        type: "number",
                        min: 0,
                        default: 0
                    },
                    delay: {
                        type: "number",
                        min: 0,
                        default: 0
                    }
                }
            };
        e.exports = {
            name: a,
            properties: r,
            register: function(e) {
                var t = e.factory;
                t.registerTransition(a, (function(e, n, a, r, i) {
                    var o = t.sequence(i);
                    return o.add([t.animate("BaseNone", e, a, r), t.animate("BaseNone", n, a, r)]), o.get()
                }), r)
            }
        }
    }, function(e, t, n) {
        "use strict";
        var a = "CrossFade",
            r = {
                defaultDuration: .6,
                schema: {
                    duration: {
                        type: "number",
                        min: 0,
                        default: 0
                    },
                    delay: {
                        type: "number",
                        min: 0,
                        default: 0
                    },
                    stagger: {
                        type: "number",
                        default: 0
                    }
                }
            };
        e.exports = {
            name: a,
            properties: r,
            register: function(e) {
                var t = e.factory;
                t.registerTransition(a, (function(e, n, a, r) {
                    var i = arguments.length > 4 && void 0 !== arguments[4] ? arguments[4] : {},
                        o = i.stagger,
                        s = void 0 === o ? 0 : o,
                        d = i.sourceEase,
                        u = void 0 === d ? "Sine.easeInOut" : d,
                        c = i.destEase,
                        m = void 0 === c ? "Sine.easeInOut" : c,
                        l = function(e, t) {
                            var n = {};
                            for (var a in e) t.indexOf(a) >= 0 || Object.prototype.hasOwnProperty.call(e, a) && (n[a] = e[a]);
                            return n
                        }(i, ["stagger", "sourceEase", "destEase"]),
                        f = t.sequence(l);
                    return f.add([t.animate("BaseFade", e, a, r, {
                        from: {
                            opacity: 1
                        },
                        to: {
                            opacity: 0
                        },
                        ease: u,
                        stagger: s
                    }), t.animate("BaseFade", n, a, r, {
                        from: {
                            opacity: 0
                        },
                        to: {
                            opacity: 1
                        },
                        ease: m,
                        stagger: s
                    })]), f.get()
                }), r)
            }
        }
    }, function(e, t, n) {
        "use strict";
        var a = "OutIn",
            r = {
                defaultDuration: .7,
                schema: {
                    duration: {
                        type: "number",
                        min: 0,
                        default: 0
                    },
                    delay: {
                        type: "number",
                        min: 0,
                        default: 0
                    },
                    stagger: {
                        type: "number",
                        default: 0
                    }
                }
            };
        e.exports = {
            name: a,
            properties: r,
            register: function(e) {
                var t = e.factory;
                t.registerTransition(a, (function(e, n, a, r) {
                    var i = arguments.length > 4 && void 0 !== arguments[4] ? arguments[4] : {},
                        o = i.stagger,
                        s = void 0 === o ? 0 : o,
                        d = i.sourceEase,
                        u = void 0 === d ? "Strong.easeOut" : d,
                        c = i.destEase,
                        m = void 0 === c ? "Strong.easeIn" : c,
                        l = function(e, t) {
                            var n = {};
                            for (var a in e) t.indexOf(a) >= 0 || Object.prototype.hasOwnProperty.call(e, a) && (n[a] = e[a]);
                            return n
                        }(i, ["stagger", "sourceEase", "destEase"]),
                        f = t.sequence(l);
                    return f.add([t.animate("BaseFade", e, a, r, {
                        from: {
                            opacity: 1
                        },
                        to: {
                            opacity: 0
                        },
                        ease: u,
                        stagger: s
                    }), t.animate("BaseFade", n, a, r, {
                        from: {
                            opacity: 0
                        },
                        to: {
                            opacity: 1
                        },
                        ease: m,
                        stagger: s
                    })]), f.get()
                }), r)
            }
        }
    }, function(e, t, n) {
        "use strict";
        var a = "SlideHorizontal",
            r = {
                defaultDuration: .6,
                schema: {
                    duration: {
                        type: "number",
                        min: 0,
                        default: 0
                    },
                    delay: {
                        type: "number",
                        min: 0,
                        default: 0
                    },
                    reverse: {
                        type: "boolean",
                        default: !1
                    },
                    width: {
                        type: "number",
                        min: 0
                    }
                }
            };
        e.exports = {
            name: a,
            properties: r,
            register: function(e) {
                var t = e.factory;
                t.registerTransition(a, (function(e, n, a, i) {
                    var o = arguments.length > 4 && void 0 !== arguments[4] ? arguments[4] : {},
                        s = o.reverse,
                        d = void 0 === s ? r.schema.reverse.default : s,
                        u = o.width,
                        c = o.ease,
                        m = void 0 === c ? "Strong.easeInOut" : c,
                        l = function(e, t) {
                            var n = {};
                            for (var a in e) t.indexOf(a) >= 0 || Object.prototype.hasOwnProperty.call(e, a) && (n[a] = e[a]);
                            return n
                        }(o, ["reverse", "width", "ease"]),
                        f = d ? -1 : 1;
                    u = u || (e.length ? e[0].offsetWidth : e.offsetWidth);
                    var p = t.sequence(l);
                    return p.add([t.animate("BaseFade", n, 0, i, {
                        to: {
                            opacity: 1
                        },
                        immediateRender: !1
                    }), t.animate("BasePosition", e, a, i, {
                        from: {
                            x: 0
                        },
                        to: {
                            x: -u * f
                        },
                        ease: m
                    }), t.animate("BasePosition", n, a, i, {
                        from: {
                            x: u * f
                        },
                        to: {
                            x: 0
                        },
                        ease: m
                    })]), p.get()
                }), r)
            }
        }
    }, function(e, t, n) {
        "use strict";
        var a = "SlideVertical",
            r = {
                defaultDuration: .6,
                schema: {
                    duration: {
                        type: "number",
                        min: 0,
                        default: 0
                    },
                    delay: {
                        type: "number",
                        min: 0,
                        default: 0
                    },
                    reverse: {
                        type: "boolean",
                        default: !1
                    },
                    height: {
                        type: "number",
                        min: 0
                    }
                }
            };
        e.exports = {
            name: a,
            properties: r,
            register: function(e) {
                var t = e.factory;
                t.registerTransition(a, (function(e, n, a, r) {
                    var i = arguments.length > 4 && void 0 !== arguments[4] ? arguments[4] : {},
                        o = i.reverse,
                        s = void 0 !== o && o,
                        d = i.height,
                        u = i.ease,
                        c = void 0 === u ? "Strong.easeInOut" : u,
                        m = function(e, t) {
                            var n = {};
                            for (var a in e) t.indexOf(a) >= 0 || Object.prototype.hasOwnProperty.call(e, a) && (n[a] = e[a]);
                            return n
                        }(i, ["reverse", "height", "ease"]),
                        l = s ? -1 : 1;
                    d = d || (e.length ? e[0].offsetHeight : e.offsetHeight);
                    var f = t.sequence(m);
                    return f.add([t.animate("BaseFade", n, 0, r, {
                        to: {
                            opacity: 1
                        },
                        immediateRender: !1
                    }), t.animate("BasePosition", e, a, r, {
                        from: {
                            y: 0
                        },
                        to: {
                            y: -d * l
                        },
                        ease: c
                    }), t.animate("BasePosition", n, a, r, {
                        from: {
                            y: d * l
                        },
                        to: {
                            y: 0
                        },
                        ease: c
                    })]), f.get()
                }), r)
            }
        }
    }, function(e, t, n) {
        "use strict";
        var a = "Shrink",
            r = {
                defaultDuration: .6,
                schema: {
                    duration: {
                        type: "number",
                        min: 0,
                        default: 0
                    },
                    delay: {
                        type: "number",
                        min: 0,
                        default: 0
                    },
                    stagger: {
                        type: "number",
                        default: 0
                    }
                }
            };
        e.exports = {
            name: a,
            properties: r,
            register: function(e) {
                var t = e.factory;
                t.registerTransition(a, (function(e, n, a, r) {
                    var i = arguments.length > 4 && void 0 !== arguments[4] ? arguments[4] : {},
                        o = i.stagger,
                        s = void 0 === o ? 0 : o,
                        d = i.sourceEase,
                        u = void 0 === d ? "Sine.easeInOut" : d,
                        c = function(e, t) {
                            var n = {};
                            for (var a in e) t.indexOf(a) >= 0 || Object.prototype.hasOwnProperty.call(e, a) && (n[a] = e[a]);
                            return n
                        }(i, ["stagger", "sourceEase"]),
                        m = t.sequence(c);
                    return m.add(t.animate("BaseFade", n, 0, r, {
                        to: {
                            opacity: 1
                        },
                        clearProps: "clip,clipPath,webkitClipPath,scale"
                    })), void 0 === e[0].style.clipPath ? m.add(t.animate("BaseScale", e, a, r, {
                        to: {
                            scale: 0
                        },
                        ease: u,
                        stagger: s
                    })) : m.add(t.animate("BaseClipPath", e, a, r, {
                        to: {
                            webkitClipPath: "polygon(50% 50%, 50% 50%, 50% 50%, 50% 50%)",
                            clipPath: "polygon(50% 50%, 50% 50%, 50% 50%, 50% 50%)"
                        },
                        ease: u,
                        stagger: s
                    })), m.get()
                }), r)
            }
        }
    }, function(e, t, n) {
        "use strict";
        var a = n(0),
            r = a.getAdjustedDirection,
            i = a.getElementsAsArray,
            o = "ArcIn",
            s = {
                hideOnStart: !0,
                mobile: !0,
                viewportThreshold: .15,
                groups: ["3d", "entrance", "animation"],
                schema: {
                    duration: {
                        type: "number",
                        min: 0,
                        default: 0
                    },
                    delay: {
                        type: "number",
                        min: 0,
                        default: 0
                    },
                    direction: {
                        type: "string",
                        enum: ["right", "left"],
                        default: "left"
                    }
                }
            },
            d = {
                pseudoRight: {
                    angleX: "135",
                    angleY: "0",
                    idx: 0
                },
                right: {
                    angleX: "0",
                    angleY: "135",
                    idx: 1
                },
                pseudoLeft: {
                    angleX: "-135",
                    angleY: "0",
                    idx: 2
                },
                left: {
                    angleX: "0",
                    angleY: "-135",
                    idx: 3
                }
            };
        e.exports = {
            properties: s,
            name: o,
            register: function(e) {
                var t = e.engine,
                    n = e.factory;
                n.registerAnimation(o, (function(e, a, o) {
                    var u = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : {},
                        c = u.direction,
                        m = void 0 === c ? s.schema.direction.default : c,
                        l = function(e, t) {
                            var n = {};
                            for (var a in e) t.indexOf(a) >= 0 || Object.prototype.hasOwnProperty.call(e, a) && (n[a] = e[a]);
                            return n
                        }(u, ["direction"]);
                    e = i(e);
                    var f = n.sequence(l);
                    return f.add(n.animate("BaseFade", e, a, o, {
                        from: {
                            opacity: 0
                        },
                        to: {
                            opacity: 1
                        },
                        ease: "Quad.easeOut"
                    })), e.forEach((function(e) {
                        var i = e.getAttribute("data-angle") || 0,
                            s = function(e) {
                                return {
                                    rotationX: d[e].angleX,
                                    rotationY: d[e].angleY
                                }
                            }(r(d, m, i)),
                            u = function(e) {
                                return "50% 50% " + -.5 * e.offsetWidth
                            }(e);
                        f.add(t.set(e, {
                            transformOrigin: u
                        }), 0).add(n.animate("BaseRotate3D", e, a, o, {
                            from: s,
                            perspective: 200,
                            ease: "Quad.easeOut"
                        }), 0)
                    })), f.get()
                }), s)
            }
        }
    }, function(e, t, n) {
        "use strict";
        var a = "DropIn",
            r = {
                hideOnStart: !0,
                mobile: !0,
                viewportThreshold: .15,
                groups: ["entrance", "animation"],
                schema: {
                    duration: {
                        type: "number",
                        min: 0,
                        default: 0
                    },
                    delay: {
                        type: "number",
                        min: 0,
                        default: 0
                    },
                    power: {
                        type: "string",
                        enum: ["soft", "medium", "hard"],
                        default: "soft"
                    }
                }
            },
            i = {
                soft: 1.2,
                medium: 3.6,
                hard: 6
            };
        e.exports = {
            name: a,
            properties: r,
            register: function(e) {
                var t = e.factory;
                t.registerAnimation(a, (function(e, n, a) {
                    var o = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : {},
                        s = o.power,
                        d = void 0 === s ? r.schema.power.default : s,
                        u = function(e, t) {
                            var n = {};
                            for (var a in e) t.indexOf(a) >= 0 || Object.prototype.hasOwnProperty.call(e, a) && (n[a] = e[a]);
                            return n
                        }(o, ["power"]),
                        c = t.sequence(u),
                        m = i[d];
                    return c.add([t.animate("BaseFade", e, n, a, {
                        from: {
                            opacity: 0
                        },
                        to: {
                            opacity: 1
                        },
                        ease: "Circ.easeOut"
                    }), t.animate("BaseScale", e, n, a, {
                        from: {
                            scale: m
                        },
                        ease: "Quad.easeOut"
                    })]), c.get()
                }), r)
            }
        }
    }, function(e, t, n) {
        "use strict";
        var a = "ExpandIn",
            r = {
                hideOnStart: !0,
                mobile: !0,
                viewportThreshold: .15,
                groups: ["entrance", "animation"],
                schema: {
                    duration: {
                        type: "number",
                        min: 0,
                        default: 0
                    },
                    delay: {
                        type: "number",
                        min: 0,
                        default: 0
                    },
                    power: {
                        type: "string",
                        enum: ["soft", "medium", "hard"],
                        default: "soft"
                    }
                }
            },
            i = {
                soft: .85,
                medium: .4,
                hard: 0
            };
        e.exports = {
            name: a,
            properties: r,
            register: function(e) {
                var t = e.factory;
                t.registerAnimation(a, (function(e, n, a) {
                    var o = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : {},
                        s = o.power,
                        d = void 0 === s ? r.schema.power.default : s,
                        u = function(e, t) {
                            var n = {};
                            for (var a in e) t.indexOf(a) >= 0 || Object.prototype.hasOwnProperty.call(e, a) && (n[a] = e[a]);
                            return n
                        }(o, ["power"]),
                        c = t.sequence(u),
                        m = i[d];
                    return c.add(t.animate("BaseFade", e, 0, 0, {
                        to: {
                            opacity: .01
                        }
                    })), c.add([t.animate("BaseFade", e, n, a, {
                        to: {
                            opacity: 1
                        },
                        ease: "Circ.easeOut"
                    }), t.animate("BaseScale", e, n, a, {
                        from: {
                            scale: m
                        },
                        ease: "Quad.easeOut",
                        immediateRender: !1
                    })]), c.get()
                }), r)
            }
        }
    }, function(e, t, n) {
        "use strict";
        var a = "FadeIn",
            r = {
                hideOnStart: !0,
                mobile: !0,
                viewportThreshold: .15,
                groups: ["entrance", "animation"],
                schema: {
                    duration: {
                        type: "number",
                        min: 0,
                        default: 0
                    },
                    delay: {
                        type: "number",
                        min: 0,
                        default: 0
                    }
                }
            };
        e.exports = {
            name: a,
            properties: r,
            register: function(e) {
                var t = e.factory;
                t.registerAnimation(a, (function(e, n, a, r) {
                    var i = t.sequence(r);
                    return i.add(t.animate("BaseFade", e, n, a, {
                        from: {
                            opacity: 0
                        },
                        to: {
                            opacity: 1
                        },
                        ease: "Cubic.easeInOut"
                    })), i.get()
                }), r)
            }
        }
    }, function(e, t, n) {
        "use strict";
        var a = n(0),
            r = a.getAdjustedDirection,
            i = a.getElementsAsArray,
            o = "FlipIn",
            s = {
                hideOnStart: !0,
                mobile: !0,
                viewportThreshold: .15,
                groups: ["3d", "entrance", "animation"],
                schema: {
                    duration: {
                        type: "number",
                        min: 0,
                        default: 0
                    },
                    delay: {
                        type: "number",
                        min: 0,
                        default: 0
                    },
                    direction: {
                        type: "string",
                        enum: ["top", "right", "bottom", "left"],
                        default: "left"
                    }
                }
            },
            d = {
                top: {
                    angleX: "90",
                    angleY: "0",
                    idx: 0
                },
                right: {
                    angleX: "0",
                    angleY: "90",
                    idx: 1
                },
                bottom: {
                    angleX: "-90",
                    angleY: "0",
                    idx: 2
                },
                left: {
                    angleX: "0",
                    angleY: "-90",
                    idx: 3
                }
            };
        e.exports = {
            name: o,
            properties: s,
            register: function(e) {
                var t = e.factory;
                t.registerAnimation(o, (function(e, n, a) {
                    var o = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : {},
                        u = o.direction,
                        c = void 0 === u ? s.schema.direction.default : u,
                        m = function(e, t) {
                            var n = {};
                            for (var a in e) t.indexOf(a) >= 0 || Object.prototype.hasOwnProperty.call(e, a) && (n[a] = e[a]);
                            return n
                        }(o, ["direction"]);
                    e = i(e);
                    var l = t.sequence(m);
                    return l.add(t.animate("BaseFade", e, 0, 0, {
                        to: {
                            opacity: .01
                        }
                    })), l.add(t.animate("BaseFade", e, .25 * n, a, {
                        to: {
                            opacity: 1
                        },
                        ease: "Quad.easeOut"
                    }), "animation-start"), e.forEach((function(e) {
                        var i = e.getAttribute("data-angle") || 0,
                            o = r(d, c, i),
                            s = {
                                rotationX: d[o].angleX,
                                rotationY: d[o].angleY
                            };
                        l.add(t.animate("BaseRotate3D", e, .75 * n, a, {
                            from: s,
                            perspective: 800,
                            fallbackFor3D: !0,
                            ease: "Quad.easeOut"
                        }), "animation-start")
                    })), l.get()
                }), s)
            }
        }
    }, function(e, t, n) {
        "use strict";
        var a = n(0).getElementsAsArray,
            r = "FloatIn",
            i = {
                hideOnStart: !0,
                mobile: !0,
                viewportThreshold: .15,
                groups: ["entrance", "animation"],
                schema: {
                    duration: {
                        type: "number",
                        min: 0,
                        default: 0
                    },
                    delay: {
                        type: "number",
                        min: 0,
                        default: 0
                    },
                    direction: {
                        type: "string",
                        enum: ["top", "right", "bottom", "left"],
                        default: "right"
                    }
                }
            },
            o = {
                top: {
                    dx: "0",
                    dy: "-1",
                    distance: "50"
                },
                right: {
                    dx: "1",
                    dy: "0",
                    distance: "50"
                },
                bottom: {
                    dx: "0",
                    dy: "1",
                    distance: "50"
                },
                left: {
                    dx: "-1",
                    dy: "0",
                    distance: "50"
                }
            };
        e.exports = {
            name: r,
            properties: i,
            register: function(e) {
                var t = e.factory;
                t.registerAnimation(r, (function(e, n, r) {
                    var s = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : {},
                        d = s.direction,
                        u = void 0 === d ? i.schema.direction.default : d,
                        c = function(e, t) {
                            var n = {};
                            for (var a in e) t.indexOf(a) >= 0 || Object.prototype.hasOwnProperty.call(e, a) && (n[a] = e[a]);
                            return n
                        }(s, ["direction"]);
                    e = a(e);
                    var m = o[u],
                        l = t.sequence(c);
                    return l.add(t.animate("BaseFade", e, n, r, {
                        from: {
                            opacity: 0
                        },
                        to: {
                            opacity: 1
                        },
                        ease: "Cubic.easeInOut"
                    })), e.forEach((function(e) {
                        var a = m.dx * m.distance,
                            i = m.dy * m.distance;
                        l.add(t.animate("BasePosition", e, n, r, {
                            from: {
                                x: a,
                                y: i
                            },
                            ease: "Quad.easeInOut"
                        }), 0)
                    })), l.get()
                }), i)
            }
        }
    }, function(e, t, n) {
        "use strict";
        var a = n(0).getElementsAsArray,
            r = "FlyIn",
            i = {
                hideOnStart: !0,
                mobile: !0,
                viewportThreshold: .15,
                groups: ["entrance", "animation"],
                schema: {
                    duration: {
                        type: "number",
                        min: 0,
                        default: 0
                    },
                    delay: {
                        type: "number",
                        min: 0,
                        default: 0
                    },
                    direction: {
                        type: "string",
                        enum: ["top", "top left", "top right", "left", "bottom", "bottom left", "bottom right", "right"],
                        default: "right"
                    }
                }
            },
            o = {
                top: {
                    dy: "-1"
                },
                right: {
                    dx: "1"
                },
                bottom: {
                    dy: "1"
                },
                left: {
                    dx: "-1"
                }
            };
        e.exports = {
            name: r,
            properties: i,
            register: function(e, t) {
                var n = e.engine,
                    s = e.factory;
                s.registerAnimation(r, (function(e, r, d) {
                    var u = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : {},
                        c = u.direction,
                        m = void 0 === c ? i.schema.direction.default : c,
                        l = function(e, t) {
                            var n = {};
                            for (var a in e) t.indexOf(a) >= 0 || Object.prototype.hasOwnProperty.call(e, a) && (n[a] = e[a]);
                            return n
                        }(u, ["direction"]);
                    e = a(e);
                    var f = function(e) {
                            var t = {
                                dx: 0,
                                dy: 0
                            };
                            return e.forEach((function(e) {
                                o[e] && Object.assign(t, o[e])
                            })), t
                        }(m.split(" ")),
                        p = t.innerWidth,
                        g = t.innerHeight,
                        y = s.sequence(l);
                    return y.add(s.animate("BaseFade", e, r, d, {
                        from: {
                            opacity: 0
                        },
                        to: {
                            opacity: 1
                        },
                        ease: "Linear.easeIn"
                    })), e.forEach((function(e) {
                        var t = n.getBoundingRect(e),
                            a = f.dx > 0 ? p - t.left : f.dx * t.right,
                            i = f.dy > 0 ? g - t.top : f.dy * t.bottom;
                        y.add(s.animate("BasePosition", e, r, d, {
                            from: {
                                x: a,
                                y: i
                            },
                            ease: "Sine.easeOut"
                        }), 0)
                    })), y.get()
                }), i)
            }
        }
    }, function(e, t, n) {
        "use strict";
        var a = n(0),
            r = a.getAdjustedDirection,
            i = a.getElementTransformedPosition,
            o = a.getTransformOriginTweenParams,
            s = a.getElementsAsArray,
            d = "FoldIn",
            u = {
                hideOnStart: !0,
                mobile: !0,
                viewportThreshold: .15,
                groups: ["3d", "entrance", "animation"],
                schema: {
                    duration: {
                        type: "number",
                        min: 0,
                        default: 0
                    },
                    delay: {
                        type: "number",
                        min: 0,
                        default: 0
                    },
                    direction: {
                        type: "string",
                        enum: ["top", "right", "bottom", "left"],
                        default: "left"
                    }
                }
            },
            c = {
                top: {
                    angleX: "-45",
                    angleY: "0",
                    origin: {
                        x: "50%",
                        y: "0"
                    },
                    idx: 0
                },
                right: {
                    angleX: "0",
                    angleY: "-45",
                    origin: {
                        x: "100%",
                        y: "50%"
                    },
                    idx: 1
                },
                bottom: {
                    angleX: "45",
                    angleY: "0",
                    origin: {
                        x: "50%",
                        y: "100%"
                    },
                    idx: 2
                },
                left: {
                    angleX: "0",
                    angleY: "45",
                    origin: {
                        x: "0",
                        y: "50%"
                    },
                    idx: 3
                }
            };
        e.exports = {
            name: d,
            properties: u,
            register: function(e) {
                var t = e.engine,
                    n = e.factory;
                n.registerAnimation(d, (function(e, a, d) {
                    var m = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : {},
                        l = m.direction,
                        f = void 0 === l ? u.schema.direction.default : l,
                        p = function(e, t) {
                            var n = {};
                            for (var a in e) t.indexOf(a) >= 0 || Object.prototype.hasOwnProperty.call(e, a) && (n[a] = e[a]);
                            return n
                        }(m, ["direction"]);
                    e = s(e);
                    var g = n.sequence(p);
                    return g.add(n.animate("BaseFade", e, 0, 0, {
                        to: {
                            opacity: .01
                        }
                    })), g.add(n.animate("BaseFade", e, .5 * a, d, {
                        to: {
                            opacity: 1
                        },
                        ease: "Quad.easeOut"
                    }), "animation-start"), e.forEach((function(e) {
                        var s = e.getAttribute("data-angle") || 0,
                            u = s * Math.PI / 180,
                            m = r(c, f, s),
                            l = t.getBoundingRect(e),
                            p = t.getBoundingContentRect(e),
                            y = i(c[m].origin, p, u),
                            h = y.x,
                            v = y.y,
                            b = o(l, p, c[m].origin),
                            x = {
                                rotationX: c[m].angleX,
                                rotationY: c[m].angleY
                            };
                        g.add([n.animate("BasePosition", e, 0, d, {
                            transformOrigin: b,
                            x: h,
                            y: v,
                            immediateRender: !1
                        }), n.animate("BaseRotate3D", e, a, d, {
                            from: x,
                            perspective: 800,
                            ease: "Quad.easeOut",
                            immediateRender: !1
                        })], "animation-start")
                    })), g.get()
                }), u)
            }
        }
    }, function(e, t, n) {
        "use strict";
        var a = n(0),
            r = a.getClipParams,
            i = a.getClipFallbackParams,
            o = a.getAdjustedDirection,
            s = a.getTransformTweenParams,
            d = a.getElementsAsArray,
            u = "Reveal",
            c = {
                hideOnStart: !0,
                mobile: !0,
                viewportThreshold: .15,
                groups: ["mask", "entrance", "animation"],
                schema: {
                    duration: {
                        type: "number",
                        min: 0,
                        default: 0
                    },
                    delay: {
                        type: "number",
                        min: 0,
                        default: 0
                    },
                    direction: {
                        type: "string",
                        enum: ["top", "right", "center", "bottom", "left"],
                        default: "left"
                    }
                }
            },
            m = {
                top: {
                    dx: 0,
                    dy: -1,
                    idx: 0
                },
                right: {
                    dx: 1,
                    dy: 0,
                    idx: 1
                },
                bottom: {
                    dx: 0,
                    dy: 1,
                    idx: 2
                },
                left: {
                    dx: -1,
                    dy: 0,
                    idx: 3
                }
            };
        e.exports = {
            name: u,
            properties: c,
            register: function(e) {
                var t = e.engine,
                    n = e.factory;
                n.registerAnimation(u, (function(e, a, u) {
                    var l = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : {},
                        f = l.direction,
                        p = void 0 === f ? c.schema.direction.default : f,
                        g = function(e, t) {
                            var n = {};
                            for (var a in e) t.indexOf(a) >= 0 || Object.prototype.hasOwnProperty.call(e, a) && (n[a] = e[a]);
                            return n
                        }(l, ["direction"]);
                    e = d(e);
                    var y = n.sequence(g);
                    return y.add(n.animate("BaseFade", e, .1, u, {
                        from: {
                            opacity: 0
                        },
                        to: {
                            opacity: 1
                        },
                        ease: "Cubic.easeInOut"
                    })), e.forEach((function(e) {
                        var d = t.getBoundingRect(e),
                            c = t.getBoundingContentRect(e),
                            l = e.getAttribute("data-angle") || 0,
                            f = l * Math.PI / 180,
                            g = "center" !== p ? o(m, p, l) : p;
                        if (void 0 === e.style.clipPath) {
                            var h = i(g),
                                v = m[g] || {
                                    dx: 0,
                                    dy: 0
                                },
                                b = {
                                    dx: v.dx / 2,
                                    dy: v.dy / 2
                                },
                                x = s(c, b, f);
                            y.add([n.animate("BaseScale", e, a, u, {
                                from: h,
                                ease: "Cubic.easeOut"
                            }), n.animate("BasePosition", e, a, u, {
                                from: x,
                                ease: "Cubic.easeOut"
                            })], 0)
                        } else {
                            var O = r(d, c, g);
                            y.add(n.animate("BaseClipPath", e, a, u, {
                                from: O,
                                ease: "Cubic.easeOut"
                            }), 0)
                        }
                    })), y.get()
                }), c)
            }
        }
    }, function(e, t, n) {
        "use strict";
        var a = n(0),
            r = a.getClipParams,
            i = a.getClipFallbackParams,
            o = a.getAdjustedDirection,
            s = a.getTransformTweenParams,
            d = a.getElementsAsArray,
            u = "SlideIn",
            c = {
                hideOnStart: !0,
                mobile: !0,
                viewportThreshold: .15,
                groups: ["mask", "entrance", "animation"],
                schema: {
                    duration: {
                        type: "number",
                        min: 0,
                        default: 0
                    },
                    delay: {
                        type: "number",
                        min: 0,
                        default: 0
                    },
                    direction: {
                        type: "string",
                        enum: ["top", "right", "bottom", "left"],
                        default: "bottom"
                    },
                    power: {
                        type: "string",
                        enum: ["soft", "medium", "hard"],
                        default: "soft"
                    }
                }
            },
            m = {
                top: {
                    dx: 0,
                    dy: -1,
                    idx: 0,
                    clip: "bottom"
                },
                right: {
                    dx: 1,
                    dy: 0,
                    idx: 1,
                    clip: "left"
                },
                bottom: {
                    dx: 0,
                    dy: 1,
                    idx: 2,
                    clip: "top"
                },
                left: {
                    dx: -1,
                    dy: 0,
                    idx: 3,
                    clip: "right"
                }
            },
            l = {
                soft: 70,
                medium: 35,
                hard: 0
            };
        e.exports = {
            name: u,
            properties: c,
            register: function(e) {
                var t = e.engine,
                    n = e.factory;
                n.registerAnimation(u, (function(e, a, u) {
                    var f = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : {},
                        p = f.direction,
                        g = void 0 === p ? c.schema.direction.default : p,
                        y = f.power,
                        h = void 0 === y ? c.schema.power.default : y,
                        v = function(e, t) {
                            var n = {};
                            for (var a in e) t.indexOf(a) >= 0 || Object.prototype.hasOwnProperty.call(e, a) && (n[a] = e[a]);
                            return n
                        }(f, ["direction", "power"]);
                    e = d(e);
                    var b = n.sequence(v);
                    return b.add(n.animate("BaseFade", e, .35 * a, u, {
                        from: {
                            opacity: 0
                        },
                        to: {
                            opacity: 1
                        },
                        ease: "Cubic.easeOut"
                    })), e.forEach((function(e) {
                        var d = t.getBoundingRect(e),
                            c = t.getBoundingContentRect(e),
                            f = e.getAttribute("data-angle") || 0,
                            p = f * Math.PI / 180,
                            y = o(m, g, f);
                        if (void 0 === e.style.clipPath) {
                            var v = i(y),
                                x = {
                                    dx: m[y].dx / 2,
                                    dy: m[y].dy / 2
                                },
                                O = s(c, x, p);
                            b.add([n.animate("BaseScale", e, a, u, {
                                from: v,
                                ease: "Cubic.easeInOut"
                            }), n.animate("BasePosition", e, a, u, {
                                from: O,
                                ease: "Cubic.easeInOut"
                            })], 0)
                        } else {
                            var A = r(d, c, m[y].clip, {
                                    minimum: l[h]
                                }),
                                w = s(c, m[y], p, (100 - l[h]) / 100);
                            b.add([n.animate("BaseClipPath", e, a, u, {
                                from: A,
                                ease: "Cubic.easeOut"
                            }), n.animate("BasePosition", e, a, u, {
                                from: w,
                                ease: "Cubic.easeOut"
                            })], 0)
                        }
                    })), b.get()
                }), c)
            }
        }
    }, function(e, t, n) {
        "use strict";
        var a = "SpinIn",
            r = {
                hideOnStart: !0,
                mobile: !0,
                viewportThreshold: .15,
                groups: ["entrance", "animation"],
                schema: {
                    duration: {
                        type: "number",
                        min: 0,
                        default: 0
                    },
                    delay: {
                        type: "number",
                        min: 0,
                        default: 0
                    },
                    cycles: {
                        type: "number",
                        min: 0,
                        default: 1
                    },
                    direction: {
                        type: "string",
                        enum: ["cw", "ccw"],
                        default: "cw"
                    },
                    power: {
                        type: "string",
                        enum: ["soft", "medium", "hard"],
                        default: "medium"
                    }
                }
            },
            i = {
                cw: {
                    direction: "-1"
                },
                ccw: {
                    direction: "1"
                }
            },
            o = {
                soft: .8,
                medium: .5,
                hard: 0
            };
        e.exports = {
            name: a,
            properties: r,
            register: function(e) {
                var t = e.factory;
                t.registerAnimation(a, (function(e, n, a) {
                    var s = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : {},
                        d = s.direction,
                        u = void 0 === d ? r.schema.direction.default : d,
                        c = s.cycles,
                        m = void 0 === c ? r.schema.cycles.default : c,
                        l = s.power,
                        f = void 0 === l ? r.schema.power.default : l,
                        p = function(e, t) {
                            var n = {};
                            for (var a in e) t.indexOf(a) >= 0 || Object.prototype.hasOwnProperty.call(e, a) && (n[a] = e[a]);
                            return n
                        }(s, ["direction", "cycles", "power"]),
                        g = o[f],
                        y = (i[u].direction > 0 ? "+=" : "-=") + 360 * m,
                        h = t.sequence(p);
                    return h.add(t.animate("BaseFade", e, 0, 0, {
                        to: {
                            opacity: .01
                        }
                    })), h.add([t.animate("BaseFade", e, n, a, {
                        to: {
                            opacity: 1
                        },
                        ease: "Quad.easeOut"
                    }), t.animate("BaseScale", e, n, a, {
                        from: {
                            scale: g
                        },
                        ease: "Quad.easeOut",
                        immediateRender: !1
                    }), t.animate("BaseRotate", e, n, a, {
                        from: {
                            rotation: y
                        },
                        ease: "Quad.easeOut"
                    })]), h.get()
                }), r)
            }
        }
    }, function(e, t, n) {
        "use strict";
        var a = n(0).getElementsAsArray,
            r = "TurnIn",
            i = {
                hideOnStart: !0,
                mobile: !0,
                viewportThreshold: .15,
                groups: ["entrance", "animation"],
                schema: {
                    duration: {
                        type: "number",
                        min: 0,
                        default: 0
                    },
                    delay: {
                        type: "number",
                        min: 0,
                        default: 0
                    },
                    direction: {
                        type: "string",
                        enum: ["right", "left"],
                        default: "right"
                    }
                }
            },
            o = {
                left: {
                    dx: "-1",
                    angle: "90"
                },
                right: {
                    dx: "1",
                    angle: "90"
                }
            };
        e.exports = {
            name: r,
            properties: i,
            register: function(e, t) {
                var n = e.engine,
                    s = e.factory;
                s.registerAnimation(r, (function(e, r, d) {
                    var u = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : {},
                        c = u.direction,
                        m = void 0 === c ? i.schema.direction.default : c,
                        l = function(e, t) {
                            var n = {};
                            for (var a in e) t.indexOf(a) >= 0 || Object.prototype.hasOwnProperty.call(e, a) && (n[a] = e[a]);
                            return n
                        }(u, ["direction"]);
                    e = a(e);
                    var f = o[m],
                        p = t.innerWidth,
                        g = (t.innerHeight, s.sequence(l));
                    return g.add(s.animate("BaseFade", e, r, d, {
                        from: {
                            opacity: 0
                        },
                        to: {
                            opacity: 1
                        },
                        ease: "Linear.easeIn"
                    })), e.forEach((function(e) {
                        var t = n.getBoundingRect(e),
                            a = f.dx > 0 ? p - t.left : -t.right,
                            i = Math.min(-1.5 * t.height, Math.max(-300, -5.5 * t.height)),
                            o = (f.dx > 0 ? "+=" : "-=") + f.angle,
                            u = [{
                                x: f.dx * t.width,
                                y: i
                            }, {
                                x: a,
                                y: i
                            }];
                        g.add([s.animate("BasePosition", e, r, d, {
                            from: {
                                bezier: {
                                    values: u,
                                    type: "soft"
                                }
                            },
                            ease: "Sine.easeOut",
                            immediateRender: !1
                        }), s.animate("BaseRotate", e, r, d, {
                            from: {
                                rotation: o
                            },
                            ease: "Sine.easeOut",
                            immediateRender: !1
                        })], 0)
                    })), g.get()
                }), i)
            }
        }
    }, function(e, t, n) {
        "use strict";
        var a = n(0),
            r = a.translatePoint,
            i = a.getAdjustedDirection,
            o = a.getElementsAsArray,
            s = "BounceIn",
            d = {
                hideOnStart: !0,
                mobile: !0,
                viewportThreshold: .15,
                groups: ["entrance", "animation"],
                schema: {
                    duration: {
                        type: "number",
                        min: 0,
                        default: 0
                    },
                    delay: {
                        type: "number",
                        min: 0,
                        default: 0
                    },
                    bounce: {
                        type: "string",
                        enum: ["soft", "medium", "hard"],
                        default: "medium"
                    },
                    direction: {
                        type: "string",
                        enum: ["top left", "top right", "center", "bottom right", "bottom left"],
                        default: "top left"
                    }
                }
            },
            u = {
                "top left": {
                    y: -1.1,
                    x: -1.1,
                    idx: 0
                },
                "top right": {
                    y: -1.1,
                    x: 1.1,
                    idx: 1
                },
                "bottom right": {
                    y: 1.1,
                    x: 1.1,
                    idx: 2
                },
                "bottom left": {
                    y: 1.1,
                    x: -1.1,
                    idx: 3
                }
            },
            c = {
                y: 0,
                x: 0
            },
            m = {
                soft: [.6, .25],
                medium: [.9, .22],
                hard: [1.3, .2]
            };
        e.exports = {
            name: s,
            properties: d,
            register: function(e) {
                var t = e.engine,
                    n = e.factory;
                n.registerAnimation(s, (function(e, a, s) {
                    var l = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : {},
                        f = l.direction,
                        p = void 0 === f ? d.schema.direction.default : f,
                        g = l.bounce,
                        y = void 0 === g ? d.schema.bounce.default : g,
                        h = function(e, t) {
                            var n = {};
                            for (var a in e) t.indexOf(a) >= 0 || Object.prototype.hasOwnProperty.call(e, a) && (n[a] = e[a]);
                            return n
                        }(l, ["direction", "bounce"]);
                    e = o(e);
                    var v = .3 * a,
                        b = a - v,
                        x = n.sequence(h);
                    return x.add(n.animate("BaseFade", e, 0, 0, {
                        to: {
                            opacity: .01
                        }
                    })), x.add(n.animate("BaseFade", e, v, s, {
                        to: {
                            opacity: 1
                        },
                        ease: "Cubic.easeIn"
                    }), "animation-start"), e.forEach((function(e) {
                        var a = t.getElementRect(e),
                            o = e.getAttribute("data-angle") || 0,
                            d = "center" !== p ? i(u, p, o) : p,
                            l = u[d] || c,
                            f = r(a.width / 2 * l.x, a.height / 2 * l.y, o),
                            g = r(a.width / 3 * l.x, a.height / 3 * l.y, o);
                        x.add([n.animate("BasePosition", e, v, s, {
                            from: {
                                x: f.x,
                                y: f.y
                            },
                            to: {
                                x: g.x,
                                y: g.y
                            },
                            ease: "Expo.easeIn"
                        }), n.animate("BaseScale", e, v, s, {
                            from: {
                                scale: 0
                            },
                            to: {
                                scale: .3
                            },
                            ease: "Expo.easeIn"
                        })], "animation-start"), x.add([n.animate("BasePosition", e, b, 0, {
                            to: {
                                x: 0,
                                y: 0
                            },
                            ease: "Elastic.easeOut",
                            easeParams: m[y]
                        }), n.animate("BaseScale", e, b, 0, {
                            to: {
                                scale: 1
                            },
                            ease: "Elastic.easeOut",
                            easeParams: m[y]
                        })])
                    })), x.get()
                }), d)
            }
        }
    }, function(e, t, n) {
        "use strict";
        var a = "GlideIn",
            r = {
                hideOnStart: !0,
                mobile: !0,
                viewportThreshold: .15,
                groups: ["entrance", "animation"],
                schema: {
                    duration: {
                        type: "number",
                        min: 0,
                        default: 0
                    },
                    delay: {
                        type: "number",
                        min: 0,
                        default: 0
                    },
                    angle: {
                        type: "number",
                        min: 0,
                        max: 360,
                        default: 0
                    },
                    distance: {
                        type: "number",
                        min: 0,
                        default: 0
                    }
                }
            };
        e.exports = {
            name: a,
            properties: r,
            register: function(e) {
                var t = e.factory;
                t.registerAnimation(a, (function(e, n, a) {
                    var i = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : {},
                        o = i.angle,
                        s = void 0 === o ? r.schema.angle.default : o,
                        d = i.distance,
                        u = void 0 === d ? r.schema.distance.default : d,
                        c = function(e, t) {
                            var n = {};
                            for (var a in e) t.indexOf(a) >= 0 || Object.prototype.hasOwnProperty.call(e, a) && (n[a] = e[a]);
                            return n
                        }(i, ["angle", "distance"]),
                        m = s * Math.PI / 180,
                        l = Math.sin(m) * u,
                        f = Math.cos(m) * u * -1,
                        p = t.sequence(c);
                    return p.add([t.animate("BaseFade", e, 0, 0, {
                        from: {
                            opacity: 0
                        },
                        to: {
                            opacity: 1
                        },
                        ease: "Sine.easeIn"
                    }), t.animate("BasePosition", e, n, a, {
                        from: {
                            x: l,
                            y: f
                        },
                        ease: "Cubic.easeOut"
                    })], 0), p.get()
                }), r)
            }
        }
    }, function(e, t, n) {
        "use strict";
        var a = n(0),
            r = a.getClipParams,
            i = a.getElementsAsArray,
            o = "DropClipIn",
            s = {
                hideOnStart: !0,
                mobile: !0,
                viewportThreshold: .15,
                groups: ["entrance", "animation"],
                schema: {
                    duration: {
                        type: "number",
                        min: 0,
                        default: 0
                    },
                    delay: {
                        type: "number",
                        min: 0,
                        default: 0
                    },
                    power: {
                        type: "string",
                        enum: ["soft", "medium", "hard"],
                        default: "soft"
                    }
                }
            },
            d = {
                soft: 1.2,
                medium: 3.6,
                hard: 6
            };
        e.exports = {
            name: o,
            properties: s,
            register: function(e) {
                var t = e.factory,
                    n = e.engine;
                t.registerAnimation(o, (function(e, a, o) {
                    var u = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : {},
                        c = u.power,
                        m = void 0 === c ? s.schema.power.default : c,
                        l = function(e, t) {
                            var n = {};
                            for (var a in e) t.indexOf(a) >= 0 || Object.prototype.hasOwnProperty.call(e, a) && (n[a] = e[a]);
                            return n
                        }(u, ["power"]);
                    e = i(e);
                    var f = d[m],
                        p = t.sequence(l);
                    return p.add(t.animate("BaseFade", e, a, o, {
                        from: {
                            opacity: 0
                        },
                        to: {
                            opacity: 1
                        },
                        ease: "Circ.easeOut"
                    })), e.forEach((function(e) {
                        var i = n.getBoundingRect(e),
                            s = n.getBoundingContentRect(e),
                            d = r(i, s, "initial", {
                                scaleX: 1 / f,
                                scaleY: 1 / f
                            });
                        p.add([t.animate("BaseClipPath", e, a, o, {
                            from: d,
                            ease: "Quad.easeOut"
                        }), t.animate("BaseScale", e, a, o, {
                            from: {
                                scale: f
                            },
                            ease: "Quad.easeOut"
                        })], 0)
                    })), p.get()
                }), s)
            }
        }
    }, function(e, t, n) {
        "use strict";
        e.exports = {
            getAllAnimationProperties: function(e) {
                var t = e.defaults,
                    n = function(e, t) {
                        var n = {};
                        for (var a in e) t.indexOf(a) >= 0 || Object.prototype.hasOwnProperty.call(e, a) && (n[a] = e[a]);
                        return n
                    }(e, ["defaults"]),
                    a = t.reduce((function(e, t) {
                        return e[t.name] = t.properties, e
                    }), {}),
                    r = Object.keys(n).map((function(e) {
                        return n[e].reduce((function(e, t) {
                            return a[t.name] || (e[t.name] = t.properties), e
                        }), {})
                    }));
                return Object.assign.apply(Object, [{}, a].concat(r))
            },
            getAnimationDefsByViewMode: function(e) {
                var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : [],
                    n = t.map((function(e) {
                        return e.name
                    }));
                return e.filter((function(e) {
                    return !n.includes(e.name)
                })).concat(t)
            },
            getAnimationMode: function() {
                var e = (arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "").toLowerCase();
                return "desktop" !== e ? e : "defaults"
            }
        }
    }, function(e, t, n) {
        "use strict";
        var a = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
            return typeof e
        } : function(e) {
            return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
        };

        function r(e) {
            return !Number.isNaN(e) && Number.isFinite(e)
        }

        function i(e) {
            var t = void 0 === e ? "undefined" : a(e);
            return "function" === t || "object" === t && !Array.isArray(e) && !!e
        }
        var o = {
            string: function(e, t, n) {
                return "string" == typeof n && (!t.enum || t.enum.includes(n))
            },
            number: function(e, t, n) {
                if (!r(n)) return !1;
                var a = t.min,
                    i = void 0 === a ? Number.MIN_SAFE_INTEGER : a,
                    o = t.max,
                    s = void 0 === o ? Number.MAX_SAFE_INTEGER : o;
                return n >= i && n <= s && (!t.enum || t.enum.includes(n))
            },
            integer: function(e, t, n) {
                return o.number(e, t, n) && parseInt(n, 10) === n
            },
            numberLike: function(e, t, n) {
                return r(+(a = n)) || function(e) {
                    return "string" == typeof e && /^(-|[+-]=)?\d*\.?\d+$/.test(e)
                }(a);
                var a
            },
            boolean: function(e, t, n) {
                return "boolean" == typeof n
            },
            object: function(e, t, n) {
                return !!i(n) && (!i(t.properties) || s(t.properties, n))
            },
            array: function(e, t, n) {
                return Array.isArray(n)
            }
        };

        function s(e, t, n) {
            var a = Object.entries(e).map((function(e) {
                var n = e[0],
                    a = e[1],
                    r = t[n],
                    i = o[a.type];
                return !(void 0 === r || !i || i(n, a, r)) && {
                    key: n,
                    value: JSON.stringify(r),
                    expected: a
                }
            })).filter((function(e) {
                return e
            }));
            return n && n(a), !a.length
        }
        e.exports = {
            validateSchema: s
        }
    }])
}));
//# sourceMappingURL=santa-animations.js.map