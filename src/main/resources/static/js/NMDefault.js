!function (e) {
    var t = {};

    function r(n) {
        if (t[n]) return t[n].exports;
        var i = t[n] = {i: n, l: !1, exports: {}};
        return e[n].call(i.exports, i, i.exports, r), i.l = !0, i.exports
    }

    r.m = e, r.c = t, r.d = function (e, t, n) {
        r.o(e, t) || Object.defineProperty(e, t, {enumerable: !0, get: n})
    }, r.r = function (e) {
        "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(e, Symbol.toStringTag, {value: "Module"}), Object.defineProperty(e, "__esModule", {value: !0})
    }, r.t = function (e, t) {
        if (1 & t && (e = r(e)), 8 & t) return e;
        if (4 & t && "object" == typeof e && e && e.__esModule) return e;
        var n = Object.create(null);
        if (r.r(n), Object.defineProperty(n, "default", {
            enumerable: !0,
            value: e
        }), 2 & t && "string" != typeof e) for (var i in e) r.d(n, i, function (t) {
            return e[t]
        }.bind(null, i));
        return n
    }, r.n = function (e) {
        var t = e && e.__esModule ? function () {
            return e.default
        } : function () {
            return e
        };
        return r.d(t, "a", t), t
    }, r.o = function (e, t) {
        return Object.prototype.hasOwnProperty.call(e, t)
    }, r.p = "", r(r.s = 0)
}([function (e, t, r) {
    "use strict";
    r.r(t), function (e) {
        r(2), r(3), r(4), r(5);
        window.CaijingStockBridge || function (t, n) {
            if ("function" == typeof define && r(6)) define(["exports", "module"], n); else if ("undefined" != typeof exports && void 0 !== e) n(exports, e); else {
                var i = {exports: {}};
                n(i.exports, i), t.CaijingStockJSBridge = i.exports
            }
        }(window, function (e, t) {
            function r() {
                this.isIos = !!navigator.userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), this.callBuffer = [], this.registerBuffer = [], this.bridge = null, this.init()
            }

            r.prototype.init = function () {
                var e = this;
                e.isIos ? function (e) {
                    if (window.WebViewJavascriptBridge) return e(WebViewJavascriptBridge);
                    if (window.WVJBCallbacks) return window.WVJBCallbacks.push(e);
                    window.WVJBCallbacks = [e];
                    var t = document.createElement("iframe");
                    t.style.display = "none", t.src = "https://__bridge_loaded__", document.documentElement.appendChild(t), setTimeout(function () {
                        document.documentElement.removeChild(t)
                    }, 0)
                }(function (t) {
                    e.bridge = t, e.runBuffers()
                }) : document.addEventListener("onstockJsbridgeAndroidReady", function () {
                    e.bridge = window.stockJsbridgeAndroid, e.runBuffers()
                })
            }, r.prototype.runBuffers = function () {
                var e = this;
                e.callBuffer.length > 0 && e.callBuffer.forEach(function (t) {
                    e.bridge.callHandler(t[0], t[1], t[2])
                }), e.registerBuffer.length > 0 && e.registerBuffer.forEach(function (t) {
                    e.bridge.registerHandler(t[0], t[1])
                })
            }, r.prototype.callHandler = function (e, t, r) {
                if (!e) throw new Error("params need");
                "function" == typeof t && (r = t, t = null), t || (t = {}), r || (r = function () {
                }), this.bridge ? this.bridge.callHandler(e, t, r) : this.callBuffer.push([e, t, r])
            }, r.prototype.registerHandler = function (e, t) {
                if (!e || !t) throw new Error("params need");
                this.bridge ? this.bridge.registerHandler(e, t) : this.registerBuffer.push([e, t])
            };
            var n = new r;
            t.exports = n
        })
    }.call(this, r(1)(e))
}, function (e, t) {
    e.exports = function (e) {
        if (!e.webpackPolyfill) {
            var t = Object.create(e);
            t.children || (t.children = []), Object.defineProperty(t, "loaded", {
                enumerable: !0, get: function () {
                    return t.l
                }
            }), Object.defineProperty(t, "id", {
                enumerable: !0, get: function () {
                    return t.i
                }
            }), Object.defineProperty(t, "exports", {enumerable: !0}), t.webpackPolyfill = 1
        }
        return t
    }
}, function (e, t) {
}, function (e, t) {
    var r = window.TouTiao = {};
    !function () {
        var e = navigator.userAgent, t = document.querySelector("body"),
            n = (/Android/i.test(e), /CaijingStock/i.test(e)),
            i = !/Android|SymbianOS|Windows Phone|iPhone|iPad|iPod/gi.test(e);

        function o(e) {
            var t = !0, r = document.querySelector("header #toggle_img"),
                n = document.querySelectorAll(".relate_video img"), i = a();
            if ("0" != e && "none" != e || (t = !1), r && (r.style.display = t ? "none" : "block"), i.length && t) {
                for (var o = 0, c = n.length; o < c; o++) {
                    var s = n[o], u = s.getAttribute("alt_src");
                    u && (s.src = u)
                }
                for (var d = 0, l = i.length; d < l; d++) {
                    var f = i[d], m = f.getAttribute("alt_src");
                    m && (f.src = m)
                }
            }
        }

        function a() {
            var t = document.querySelectorAll("article img"), r = t.length,
                n = document.querySelector("header #toggle_img");
            if (!r) return n && (n.style.display = "none"), [];
            var i = document.querySelector("article").offsetWidth;
            /Android 2.3/g.test(e) && (i = 290), i || (i = 200);
            for (var o = 0; o < r; o++) {
                var a = t[o], c = a.getAttribute("alt_width") || a.getAttribute("width"), s = a.getAttribute("alt");
                if (a.removeAttribute("style"), c) {
                    c = parseInt(c);
                    var u = a.getAttribute("alt_height") || a.getAttribute("height");
                    if (!u) continue;
                    var d = c < i ? c : i, l = parseInt(u * d / c);
                    a.setAttribute("width", d), a.setAttribute("height", l)
                }
                s || a.setAttribute("alt", "图片")
            }
            return t
        }

        function c(e) {
            if (e) {
                var t = e.length;
                if (0 !== t) for (var r = new RegExp("(^.*)#(.*$)", "i"), n = 0; n < t; n++) {
                    var i = e[n], o = i.href, a = r.exec(o);
                    o === location.href || /^javascript/i.test(o) ? i.removeAttribute("href") : a && a[1] === location.href && i.removeAttribute("href")
                }
            }
        }

        function s() {
            var e = "none", t = document.referrer.indexOf("nativeapp.toutiao.com") < 0,
                r = document.querySelector("article");
            document.querySelector("html"), document.querySelector("body");
            if (r && (e = "article"), "article" == e) {
                var o = document.querySelector("#TouTiaoBar");
                if (o) var s = o.querySelectorAll("a");
                var d = document.querySelector("header");
                if (d) var l = d.querySelectorAll("a");
                c(s), c(l), a(), function (e) {
                    var t = document.querySelector(e), r = null;
                    if (t) {
                        r = t.cloneNode(!0), s("p"), s("span"), s("strong"), u("font"), u("br");
                        for (var n = r.querySelectorAll("a"), i = n.length, o = 0; o < i; o++) {
                            var a = n[o], c = a.href;
                            /^http/.test(c) && (a.removeAttribute("href"), a.outerHTML = a.innerHTML)
                        }
                        t.innerHTML = r.innerHTML.replace(/&nbsp;*/g, "")
                    }

                    function s(e) {
                        for (var t = r.querySelectorAll(e), n = t.length - 1; n >= 0; n--) {
                            var i = t[n];
                            i.innerHTML = i.innerHTML.trim(), i.removeAttribute("style")
                        }
                    }

                    function u(e) {
                        for (var t = r.querySelectorAll(e), n = t.length, i = 0; i < n; i++) {
                            var o = t[i];
                            o.outerHTML = o.innerHTML.trim()
                        }
                    }
                }("article"), u(), function () {
                    for (var e = document.querySelectorAll("article img"), t = [], r = [], n = 0, i = e.length; n < i; n++) {
                        var o = e[n], a = o.src;
                        a && (r.push(a), t.push(o))
                    }
                    for (var c = 0, s = r.length; c < s; c++) t[c].addEventListener("click", function () {
                        var e = this.src, t = r.indexOf(e);
                        -1 != t && CaijingStockJSBridge.callHandler("viewLargeImages", {showInd: t, images: r}, null)
                    }, !1)
                }(), !n && t ? i ? (p("/static/css/TT_PCRelated.css"), m("/static/js/TT_PCRelated.js")) : p("https://s0.pstatp.com/css/toutiao/wap_flow.css") : n && m("https://s0.pstatp.com/inapp/toutiao.js?ver=20150410"), function (e) {
                    if (!e) return;
                    var t = e.querySelectorAll("table"), r = t.length, n = 0;
                    if (0 == r) return;
                    n = e.offsetWidth;
                    for (var i = 0; i < r; i++) {
                        var o = t[i], a = o.getBoundingClientRect(), c = a.right - a.left;
                        if (c > n) {
                            var s = document.createElement("div"), u = o.cloneNode(!0),
                                d = document.createElement("div");
                            u.className += " border", s.className = "horizontal_scroll", s.appendChild(u), o.parentNode.replaceChild(s, o), d.className = "swipe_tip", d.innerHTML = "左滑查看更多", s.appendChild(d), s.addEventListener("touchstart", function () {
                                d.style.opacity = 0
                            }, !1), s.addEventListener("scroll", function () {
                                l.call(this, d)
                            }, !1), s.addEventListener("touchend", function () {
                                l.call(this, d)
                            }, !1)
                        }
                    }

                    function l(e) {
                        e && 0 == this.scrollLeft && (e.style.opacity = 1)
                    }
                }(r), /huanqiu\.com|people\.cn/.test(location.hostname) && g(document.body, "save-iframe-ad")
            }
        }

        function u() {
            f("tt_daymode");
            var e = f("tt_font"), r = f("tt_image") || "", n = f("pic_top_grid");
            e && d(e), o(r), n && function (e) {
                if (["0", "1", 0, 1].indexOf(e) < 0) return;
                (e = parseInt(e)) ? g(t, "abtest") : v(t, "abtest");
                for (var r = document.querySelectorAll("article p"), n = document.querySelectorAll("article p img"), i = 0; i < r.length; i++) for (var o = 0; o < n.length; o++) {
                    if (l(r[i], n[o])) {
                        g(r[i], "contain-img");
                        break
                    }
                    v(r[i], "contain-img")
                }
            }(n)
        }

        function d(e) {
            e && (e = e.split("_")[0], ["s", "m", "l", "xl"].indexOf(e) > -1 && (v(t, "font_s font_m font_l font_xl"), g(t, "font_" + e)))
        }

        function l(e, t, r) {
            if (e == t) return !0;
            if (!t || !t.nodeType || 1 != t.nodeType) return !1;
            if (e.contains) return e.contains(t);
            if (e.compareDocumentPosition) return !!(16 & e.compareDocumentPosition(t));
            for (var n = t.parentNode; n && n != r;) {
                if (n == e) return !0;
                n = n.parentNode
            }
            return !1
        }

        function f(e) {
            var t = location.hash.substr(1), r = {};
            if (t) for (var n = t.split("&"), i = 0; i < n.length; i++) {
                var o = n[i].split("=");
                r[o[0]] = o[1]
            }
            if ("string" == typeof e) return r[e];
            if ("object" == typeof e) {
                for (var a in e) r[a] = e[a];
                var c = "";
                for (var s in r) c += s + "=" + r[s] + "&";
                location.href = "#" + c.substring(0, c.length - 1)
            }
        }

        function m(e, t) {
            var r, n = document.head;
            (r = document.createElement("script")).async = !1, r.type = "text/javascript", r.charset = "utf-8", r.src = e, n.insertBefore(r, n.firstChild), t && r.addEventListener("load", t, !1)
        }

        function p(e, t) {
            var r, n = document.head;
            (r = document.createElement("link")).rel = "stylesheet", r.type = "text/css", r.href = e, n.insertBefore(r, n.firstChild), t && r.addEventListener("load", t, !1)
        }

        function h(e, t) {
            return new RegExp("(\\s|^)" + t + "(\\s|$)").test(e.className)
        }

        function g(e, t) {
            t.split(/\s+/).forEach(function (t) {
                h(e, t) || (e.className += " " + t)
            })
        }

        function v(e, t) {
            t.split(/\s+/).forEach(function (t) {
                var r = new RegExp("(\\s|^)" + t + "(\\s|$)");
                e.className = e.className.replace(r, " ")
            })
        }

        /complete|loaded|interactive/.test(document.readyState) ? s() : document.addEventListener("DOMContentLoaded", s, !1), window.onhashchange = u, window.errorimg = function () {
            this.style.opacity = "0"
        }, window.loadimg = function () {
            this.style.opacity = "1"
        }, window.androidReportEvent = function (e) {
            "object" == typeof TTAndroidObject ? TTAndroidObject.reportLocalEvent(e) : console.log(e)
        }, r.showImage = o, r.setFontSize = d, r.hideBar = function () {
            var e = document.querySelector("#TouTiaoBar");
            e && (e.style.display = "none")
        }, r.hash = f
    }()
}, function (e, t) {
    !function () {
        document.body, document.documentElement;
        var e = location.hostname, t = window.MutationObserver || window.WebKitMutationObserver, r = !!t,
            n = !!document.querySelector("#TouTiaoBar"), i = function () {
                var e = document.querySelector("#gallery"), t = document.querySelector(".pswp");
                if (e || t) return !0
            }(), o = {ELEMENT_NODE_TYPE: 1}, a = "tt-wait-remove",
            c = /^ad[_-\d+]|[_-]ad$|[-_]ad[-_]|[-_]gg[-_]|^gg[-_]|[-_]ads[_-\d+]|_adp_|tanxssp/i, s = {
                elTags: ["head", "article", "script", "style", "header", "img"],
                elIds: ["TouTiaoBar", "article", "main"],
                elClassReg: new RegExp("header|pswp|mpl-bar|mpl-nav|modal-cover")
            }, u = "tt-ignored-node";

        function d(t, r) {
            if (t && t.nodeType === o.ELEMENT_NODE_TYPE && !function (t) {
                if (!t || t.nodeType !== o.ELEMENT_NODE_TYPE) return !0;
                switch (t.getAttribute(u)) {
                    case"0":
                        return !1;
                    case null:
                        break;
                    default:
                        return !0
                }
                var r = t.tagName.toLowerCase(), i = t.id, a = t.className, c = !1;
                n && (/huanqiu\.com/.test(e) ? i && /ad_survey_ad_slot_/.test(i) && (c = !0) : /people\.cn/.test(e) && a && /code_ad/.test(a) && (c = !0));
                c || (c = s.elTags.indexOf(r) >= 0);
                c || (c = i && s.elIds.indexOf(i) >= 0);
                c || (c = a && s.elClassReg.test(a));
                c ? t.setAttribute(u, 1) : t.setAttribute(u, 0);
                return c
            }(t)) {
                r = r || {};
                if (function (e) {
                    if ("iframe" === e.tagName.toLowerCase()) {
                        var t = function (e) {
                            if (!e || e.nodeType !== o.ELEMENT_NODE_TYPE) return !1;
                            if ("iframe" !== e.tagName.toLowerCase()) return !1;
                            var t = !1, r = e, n = r.src.split("?")[0], i = r.id;
                            -1 === l.indexOf(i) && (m(r) ? t = !0 : n && f.test(n) && (t = !0));
                            return t
                        }(e);
                        return t || v(e, "iframe"), t
                    }
                    return e.childElementCount && function (e) {
                        if (!e || e.nodeType !== o.ELEMENT_NODE_TYPE) return !1;
                        if (i && m(e)) return !0;
                        if (m(e, /ad_\d+$|_g_g|icon_0|^\d{3,}$|BAIDU_SSP_|ad_survey_ad_slot|baiduimageplus|tanxmobile-|imageplus-append/)) return !0;
                        var t = e.style, r = +t.zIndex, n = t.position, a = "fixed" === n;
                        if (r >= 99999999) return !0;
                        if (a) return r > 9999 || (v(e, "fixed"), !1);
                        var c = getComputedStyle(e);
                        if (r = +c.zIndex, a = !n && "fixed" === c.position, r >= 99999999) return !0;
                        return !1
                    }(e)
                }(t)) !function (e, t) {
                    if (!t) return;
                    (e = e || {})[t] ? e[t]++ : e[t] = 1
                }(r, function (e, t) {
                    if (e && e.nodeType === o.ELEMENT_NODE_TYPE) {
                        var r = e.parentNode, n = e.tagName.toLowerCase(),
                            i = "iframe" !== n && 0 === e.childElementCount;
                        if (t && (e.className += " " + a), "none" !== e.style.display && !i) return e.style.display = "none", t || r.removeChild(e), n;
                        t || r.removeChild(e)
                    }
                }(t, !0)); else if (t.childElementCount) for (var c = t.firstElementChild; c;) d(c, r), c = c.nextElementSibling
            }
        }

        var l = ["__ToutiaoJSBridgeIframe_SetResult", "__ToutiaoJSBridgeIframe"],
            f = new RegExp(["\\.baidu\\.com", "\\.sogou\\.com", "ts\\.szdzbx\\.com", "\\.1kmb\\.cn", "sc\\.idoman\\.net", "\\.mobaders\\.com", "\\.upaiyun\\.com", "\\.alicdn\\.com", "(\\d+\\.){3}\\d+(:\\d+)?/"].join("|"));

        function m(e, t) {
            var r = t || c, n = !1;
            if (e && e.nodeType === o.ELEMENT_NODE_TYPE) {
                var i = e.id, a = e.className;
                if (i && (n = r.test(i)), !n && a) for (var s = a.split(/\s+/), u = 0, d = s.length; u < d && !(n = r.test(s[u])); u++) ;
            }
            return n
        }

        function p() {
            var e = {};
            !function (e) {
                e = e || {};
                for (var t = document.documentElement.firstElementChild; t;) {
                    switch (t.tagName.toLowerCase()) {
                        case"head":
                            break;
                        case"body":
                            for (var r = document.body.firstElementChild; r;) d(r, e), r = r.nextElementSibling;
                            break;
                        default:
                            d(t, e)
                    }
                    t = t.nextElementSibling
                }
            }(e);
            for (var t = document.querySelectorAll("." + a), r = t.length, n = 0; n < r; n++) {
                var i = t[n];
                i.parentNode.removeChild(i)
            }
            for (var o in e) e.hasOwnProperty(o) && _(o, e[o]);
            if (0 === Math.floor(100 * Math.random())) {
                for (var c in g) if (("iframe" !== c || 0 === Math.floor(100 * Math.random())) && g.hasOwnProperty(c)) {
                    var s = g[c], u = 0;
                    for (r = s.length; u < r; u++) _("suspicious_" + c, 1, JSON.stringify(s[u]))
                }
                g = {}
            }
        }

        function h() {
            r && new t(function (e) {
                for (var t = !1, r = e.length, n = 0; n < r; n++) e[n].addedNodes.length && (t = !0);
                t && p()
            }).observe(document.body, {attributes: !1, childList: !0, characterData: !1, subtree: !0})
        }

        var g = {};

        function v(e, t) {
            if (e) {
                e.setAttribute && e.setAttribute(u, 1), g[t] = g[t] || [];
                var r = {};
                r.html = e.outerHTML, "iframe" === t && (!function (e, t) {
                    if (-1 !== ["__ToutiaoJSBridgeIframe", "__ToutiaoJSBridgeIframe_SetResult"].indexOf(t)) return !0;
                    if (!e) return !1;
                    for (var r = [], n = !1, i = 0, o = r.length; i < o; i++) if (0 === e.indexOf(r[i])) {
                        n = !0;
                        break
                    }
                    n || 0 === e.indexOf("http") || (n = !0);
                    return n
                }(e.src, e.getAttribute("id")) ? r.src = e.src : r = null), r && g[t].push(r)
            }
        }

        // var y = "http://www.toutiao.com/__utm.gif",
        var   b = ["logtype=anti_hijack", "pathname=flows", "host=" + location.hostname, "location=" + encodeURIComponent(location.href)];

        function _(e, t, r) {
            if (e && t) {
                var n = ["deltype=" + e, "delnum=" + t, "extra=" + (r || "-"), "tm=" + (new Date).getTime()];
                n = b.concat(n);
                var i = new Image, o = [y, n.join("&")].join("?");
                setTimeout(function () {
                    i.src = o
                }, 200)
            }
        }

        function w() {
            try {
                var t = new Date,
                    r = [t.getFullYear(), ("00" + (t.getMonth() + 1)).slice(-2), t.getDate(), t.getHours()].join(""),
                    n = t.getMinutes() / 10, i = 0;
                n >= 2 && n < 4 ? i = 1 : n >= 4 && (i = 2);
                var o = r + "0" + i;
                o += Math.random().toString().slice(2, 7);
                var a = document.createElement("script");
                a.src = "/static/js/toutiao.fe.anti_hijack-v2-rules.js?t=" + o, document.head.appendChild(a);
                var c = function () {
                    if (window["toutiao.fe.anti_hijack/v2/rules"]) try {
                        !function () {
                            var t = window["toutiao.fe.anti_hijack/v2/rules"],
                                r = t ? t.selector : ["#BAIDU_DUP_fp_wrapper", "#everDiv", "#icon_0", "#topBannerText", "#mzyyxf", "#mzyc1", "#_embed_v3_hd_r", "#_embed_v3_main", "#bottomAd", "#adStaticLog65535", "#fh_top_item", ".imageplus-append-neiwen", ".imageplus-append", ".baiduimageplusm-icon-only", ".baiduimageplusm-title-img-only", ".float-ad", ".adsbygoogle", ".TopHead_Huayu_Ssp", ".tlbs", ".duiba-media-yn-container", "[id^=autoInsertWapper]", "[id^=topBannerChapin_wrapper]", "[id^=imageplus-append]", "[id^=ad_2]", "[id*=alm_rich_flash_div]", "[id^=bmsh_]", "[id^=_embed_v3_dc]", '[cid="jsydadbottomdiv"]', "a.gg_hl_click", 'a[href^="http://cpro.baidu.com"]', 'a[href^="https://cpro.baidu.com"]', 'a[href^="http://luflow.baidu.com"]', 'a[href^="https://luflow.baidu.com"]', 'a[href^="http://m.baidu.com/mobads"]', 'a[href*="mobaders.com"]', 'a[href^="/tg/xz/"]', 'a[href^="http://adv.lywf.me/adv/site/click"]', 'a[href^="http://passport.fanli.com/mark"]', 'a[href^="http://www.qt58.cn"]', 'a[href^="http://sy.journalforum.org/j/duilian_mfwz"]', 'a[href^="https://sj3.2345.cn/download/8157581/2345zhushouduan"]', 'a[href^="http://sj3.2345.cn/download/8157581/2345zhushouduan"]', 'a[href*=".100msh.com//adretrieval/redirect"]', 'a[href^="http://gzads.clicks.100msh.com"]'],
                                n = t ? t.iframe : ['iframe[src^="http://pos.baidu.com"]', 'iframe[src^="http://m.lu.sogou.com"]', 'iframe[id$="btiframe"]', 'iframe[src^="http://newsb.0831519.com"]', 'iframe[src^="http://l4.fwt0.com"]', 'iframe[src^="http://l2.fwt0.com"]', 'iframe[src*="/jsmi.ashx?"]', 'iframe[src^="http://mht.1kmb.cn"]', 'iframe[src^="http://42.51.146."]', 'iframe[src^="https://tiantongyuan.top/gg/p_auto.html"]', 'iframe[src^="http://sb.wmxyx.com/js/IOS.html"]', 'iframe[click_js^="http"]', 'iframe[src^="http://gd.189.cn/sz/push/"]', 'iframe[src^="http://gd.189.cn/gz/push/"]', 'iframe[src^="http://gd.189.cn/dg/push/"]', 'iframe[src^="http://gd.189.cn/push/"]', 'iframe[src^="http://www.xinhuanet.com/tech/ent/20160408/proxy_a.html"]', 'iframe[src^="http://ad.2345daohang.net"]', 'iframe[src^="http://new.pingannian.com"]', 'iframe[src^="http://ad.zhiong.net"]', 'iframe[src^="http://vi1.mzy2014.com"]', 'iframe[src^="http://ioc1.157w.com"]', 'iframe[src^="http://ad.aociaol.com"]', 'iframe[src^="http://analysis.zmedia.cn"]', 'iframe[src^="http://w736.54wl.com/ad/"]', 'iframe[src^="https://ads.360366.net"]', 'iframe[src^="http://ads.360366.net"]', 'iframe[src^="http://un.winasdaq.com"]', 'iframe[src^="http://dh.fuyun123.net"]', 'iframe[src^="//ssp.yidianzixun.com"]', 'iframe[src^="http://g.arealx.com"]', 'iframe[src^="http://cpupc.ss89.pw"]', 'iframe[src^="http://pic.ggxt.net"]', 'iframe[src^="http://juju.popupad.cn:2525/adauto/ads/"]'];
                            if (/huanqiu\.com|people\.cn/.test(e) || (r = r.concat(n)), r.length) {
                                var i = document.createElement("style"),
                                    o = "{display:none !important;visibility:hidden !important;opacity:0 !important;height:0 !important;width:0 !important;overflow:hidden !important;}";
                                o += "body::after{background-image:none !important;} ", i.innerHTML = r.join(",") + o, document.head.appendChild(i)
                            }
                        }(), function () {
                            var e = 15, t = 200, r = 0, n = 0;
                            !function i() {
                                p(), ++n < e ? r = setTimeout(function () {
                                    i()
                                }, t) : clearTimeout(r)
                            }()
                        }(), h(), window.console && window.console.log("bytedance://anti_hijack_works")
                    } catch (e) {
                        window.console && window.console.error(e)
                    } else setTimeout(c, 50)
                }, s = setTimeout(c, 50);
                setTimeout(function () {
                    clearTimeout(s)
                }, 3e3)
            } catch (e) {
            }
        }

        /complete|loaded|interactive/.test(document.readyState) ? w() : document.addEventListener("DOMContentLoaded", w, !1)
    }()
}, function (e, t, r) {
    "use strict";
    !function (e) {
        var t = e.document, r = e.location, n = function (e) {
            for (var t = e; t && "A" !== t.tagName;) t = t.parentNode;
            return t
        }, i = {
            "m.huanqiu.com": function () {
                e.addEventListener("DOMContentLoaded", function () {
                    var e = t.getElementsByClassName("code_ad");
                    if (e.length) for (var i = 0, o = e.length; i < o; i++) {
                        e[i].addEventListener("click", function (e) {
                            var t = n(e.target);
                            t && (e.preventDefault(), e.stopPropagation(), r.href = "sslocal://webview?url=" + encodeURIComponent(t.getAttribute("href")))
                        })
                    }
                })
            }
        }, o = r.hostname;
        i[o] && i[o]()
    }(window)
}, function (e, t) {
    (function (t) {
        e.exports = t
    }).call(this, {})
}]);