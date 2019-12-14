! function(e, t) {
    if ("object" == typeof exports && "object" == typeof module) module.exports = t(require("lodash"));
    else if ("function" == typeof define && define.amd) define(["lodash"], t);
    else {
        var n = "object" == typeof exports ? t(require("lodash")) : t(e.lodash);
        for (var r in n)("object" == typeof exports ? exports : e)[r] = n[r]
    }
}(this, (function(e) {
    return function(e) {
        var t = {};

        function n(r) {
            if (t[r]) return t[r].exports;
            var i = t[r] = {
                i: r,
                l: !1,
                exports: {}
            };
            return e[r].call(i.exports, i, i.exports, n), i.l = !0, i.exports
        }
        return n.m = e, n.c = t, n.d = function(e, t, r) {
            n.o(e, t) || Object.defineProperty(e, t, {
                enumerable: !0,
                get: r
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
            var r = Object.create(null);
            if (n.r(r), Object.defineProperty(r, "default", {
                    enumerable: !0,
                    value: e
                }), 2 & t && "string" != typeof e)
                for (var i in e) n.d(r, i, function(t) {
                    return e[t]
                }.bind(null, i));
            return r
        }, n.n = function(e) {
            var t = e && e.__esModule ? function() {
                return e.default
            } : function() {
                return e
            };
            return n.d(t, "a", t), t
        }, n.o = function(e, t) {
            return Object.prototype.hasOwnProperty.call(e, t)
        }, n.p = "", n(n.s = 120)
    }({
        0: function(t, n) {
            t.exports = e
        },
        120: function(e, t, n) {
            "use strict";
            var r = n(121);
            e.exports = {
                siteButtonLayout: r
            }
        },
        121: function(e, t, n) {
            "use strict";
            var r = n(0),
                i = new WeakMap,
                a = function(e) {
                    var t, n, a, o = e.getAttribute("id"),
                        u = e.querySelector("#" + o + "label"),
                        l = (t = e, {
                            data: function(e) {
                                return t.dataset[e]
                            },
                            attr: function(e) {
                                return t.getAttribute(e)
                            }
                        }),
                        d = l.data("width"),
                        f = l.data("height"),
                        s = i.get(e) || {},
                        p = s.prevWidth,
                        c = s.prevMinWidth,
                        g = s.prevText,
                        m = u.offsetHeight,
                        h = u.offsetWidth,
                        v = u.innerHTML,
                        b = l.data("shouldUseFlex"),
                        y = window.getComputedStyle(e),
                        x = window.getComputedStyle(u),
                        j = (n = y).minHeight && Boolean(parseInt(n.minHeight, 10)) ? parseInt(y.minHeight, 10) : m,
                        w = b ? h : h + (a = x, parseInt(a.marginRight, 10) + parseInt(a.marginLeft, 10)),
                        M = l.data("shouldPreventWidthMeasurement"),
                        S = d,
                        P = f,
                        I = Math.max(P, j),
                        O = S;
                    M || (O = v !== g && w < c && p === c && h > 0 ? w : Math.max(O, w));
                    var T = {
                            align: l.attr("data-align"),
                            margin: parseInt(l.attr("data-margin"), 10),
                            text: v,
                            label: {
                                verticalPadding: function(e) {
                                    return parseInt(e.paddingTop, 10) + parseInt(e.paddingBottom, 10)
                                }(x)
                            }
                        },
                        W = h + T.margin > O;
                    if ("center" !== T.align) {
                        var H = b ? "margin" : "margin-" + T.align;
                        T.label[H] = W ? O - h : T.margin
                    }
                    var _ = {
                        height: I,
                        minHeight: j
                    };
                    M || (_.width = O);
                    return i.set(e, {
                        prevText: T.text,
                        prevMinWidth: w,
                        prevWidth: O
                    }), [{
                        node: e,
                        type: "css",
                        changes: _
                    }, {
                        node: u,
                        type: "css",
                        changes: function() {
                            var e = void 0;
                            if (b) {
                                e = {};
                                var t = T.align;
                                return "center" !== t && T.label.margin && (e["margin-" + t] = T.label.margin), e
                            }
                            return e = {
                                "line-height": I - T.label.verticalPadding + "px"
                            }, r.reduce(["margin-left", "margin-right"], (function(e, t) {
                                return r.isUndefined(T.label[t]) || (e[t] = T.label[t]), e
                            }), e)
                        }()
                    }]
                };
            a.compType = "wysiwyg.viewer.components.SiteButton", e.exports = a
        }
    })
}));
//# sourceMappingURL=santa-components-layout.prod.js.map