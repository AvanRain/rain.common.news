var TouTiao = {};
!function () {
    function e(e) {
        var o = !0, n = document.querySelector("header #toggle_img"),
            i = document.querySelectorAll(".relate_video img"), r = t();
        if (("0" == e || "none" == e) && (o = !1), n && (n.style.display = o ? "none" : "block"), r.length && o) {
            for (var a = 0, c = i.length; c > a; a++) {
                var s = i[a], d = s.getAttribute("alt_src");
                d && (s.src = d)
            }
            for (var l = 0, u = r.length; u > l; l++) {
                var f = r[l], m = f.getAttribute("alt_src");
                m && (f.src = m)
            }
        }
    }

    function t() {
        var e = document.querySelectorAll("article img"), t = e.length,
            o = document.querySelector("header #toggle_img");
        if (!t) return o && (o.style.display = "none"), [];
        var n = document.querySelector("article").offsetWidth;
        /Android 2.3/g.test(N) && (n = 290), n || (n = 200);
        for (var i = 0; t > i; i++) {
            var r = e[i], a = r.getAttribute("alt_width") || r.getAttribute("width"), c = r.getAttribute("alt");
            if (r.removeAttribute("style"), a) {
                var s = r.getAttribute("alt_height") || r.getAttribute("height");
                if (!s) continue;
                if ("100%" === a && "auto" === s) continue;
                a = parseInt(a);
                var d = n > a ? a : n, l = parseInt(s * d / a);
                r.setAttribute("width", d), r.setAttribute("height", l)
            }
            c || r.setAttribute("alt", "图片")
        }
        return e
    }

    function o(e) {
        function t(e) {
            for (var t = i.querySelectorAll(e), o = t.length, n = o - 1; n >= 0; n--) {
                var r = t[n];
                r.innerHTML = r.innerHTML.trim(), r.removeAttribute("style")
            }
        }

        function o(e) {
            for (var t = i.querySelectorAll(e), o = t.length, n = 0; o > n; n++) {
                var r = t[n];
                r.outerHTML = r.innerHTML.trim()
            }
        }

        var n = document.querySelector(e), i = null;
        if (n) {
            i = n.cloneNode(!0), t("p"), t("span"), t("strong"), o("font"), o("br");
            var r = i.querySelectorAll("a"), a = r.length;
            if (/m2\.people\.cn/.test(location.hostname)) {
                if (M && j) for (var c = 0; a > c; c++) {
                    var s = r[c], d = s.href;
                    /^http/.test(d) && s.setAttribute("href", "sslocal://webview?url=" + encodeURIComponent(d))
                }
            } else for (var c = 0; a > c; c++) {
                var s = r[c], d = s.href;
                /^http/.test(d) && (s.removeAttribute("href"), s.outerHTML = s.innerHTML)
            }
            n.innerHTML = i.innerHTML.replace(/&nbsp;*/g, "")
        }
    }

    function n() {
        function e() {
            if (t && clearTimeout(t), t = setTimeout(e, 200), window.ToutiaoJSBridge) {
                var n = document.documentElement.offsetHeight;
                n !== o && (o = n, window.ToutiaoJSBridge.call("webviewContentResize", {height: o}))
            }
        }

        var t, o = 0;
        e()
    }

    function i() {
        if (is_inStockApp) {
            var e = "https://s3.pstatp.com/caijing/pure_resource/js/NMDefault.js?_t=" + Math.random();
            return y(e), !1
        }
        if ("open" === v("app")) {
            var i = "https://s3.pstatp.com/mercury/pure_resource/js/OPENDefault.js?_t=" + Math.random();
            y(i)
        }
        var l = "none", u = !1, f = document.referrer.indexOf("nativeapp.toutiao.com") < 0,
            m = document.querySelector("article"), p = h(), g = 300 * parseInt((new Date).getTime() / 1e3 / 300);
        if (m && (l = "article"), document.querySelector("video") && (u = !0), "article" == l) {
            if (p && (4.8 >= p ? b(document.body, "tt-ui-48") : 5.4 >= p && b(document.body, "tt-ui-49")), t(), o("article"), d(), !M && f ? (TouTiao.articleId = v("tt_group_id"), is_PC ? (_("/static/css/TT_PCRelated.css"), y("/static/js/TT_PCRelated.js")) : (y("https://s3.pstatp.com/growth/fe_sdk/diversionsdk/loader.js?t=" + g), _("https://s0.pstatp.com/css/toutiao/wap_flow.css"), y("/static/js/TTRelateJS.js"))) : M && p >= 4.5 && y("https://s0.pstatp.com/inapp/toutiao.js?ver=20150410", function () {
                var e = !0;
                !j && 5.2 > p && (e = !1), e && r()
            }), u && q) for (var w = document.querySelectorAll("video"), T = 0, E = w.length; E > T; T++) w[T].parentNode.removeChild(w[T]); else if (u && M) {
                var S = !1;
                !j && p >= 4.5 && (S = !0), S ? (I.app45plusinit(), "function" == typeof videoAutoPlayCallback && videoAutoPlayCallback()) : I.TTVideoInit()
            }
            x(m), c(), /huanqiu\.com|people\.cn/.test(location.hostname) && b(document.body, "save-iframe-ad")
        }
        M && !q && (location.href = "bytedance://domReady", a(), C()), j && s(function () {
            return "object" == typeof window.ToutiaoJSBridge
        }, n, 10)
    }

    function r() {
        var e = document.querySelector("article");
        e.addEventListener("click", function (e) {
            if (e.target && "IMG" === e.target.tagName) {
                for (var t = document.querySelectorAll("article img"), o = [], n = 0, i = t.length; i > n; n++) {
                    var r = t[n], a = r.src;
                    a && o.push(a)
                }
                var c = e.target.src || "";
                index = o.indexOf(c), -1 != index && ToutiaoJSBridge.call("gallery", {images: o, index: index})
            }
        }, !1)
    }

    function a() {
        var e = location.href, t = "";
        -1 != e.indexOf("sports.letv.com/ttlive") ? t = "live_leshi_long" : -1 != e.indexOf("lives.sina.cn/live/live") ? t = "live_pic_sina_long" : -1 != e.indexOf("m.ssports.smgbb.cn") && (t = "live_xinying_long"), t && setTimeout(function () {
            var e = "bytedance://" + (j ? "log_event" : "custom_event") + "?category=umeng&tag=widget&label=" + t;
            location.href = e
        }, 3e4)
    }

    function c() {
        var e = document.querySelector(".long-star"), t = /^(0|[1-9]|10)$/, o = "", n = "";
        if (e) if (t.test(e.innerHTML)) {
            for (var i = e.innerHTML || 0, r = Math.floor(i / 2), a = i % 2 == 1 ? 1 : 0, c = 5 - r - a, s = 1 == a ? '<a class="star halfstar"></a>' : "", d = 0; r > d; d++) o += '<a class="star fullstar"></a>';
            for (var l = 0; c > l; l++) n += '<a class="star nullstar"></a>';
            e.innerHTML = o + s + n
        } else {
            for (var l = 0; 5 > l; l++) n += '<a class="star nullstar"></a>';
            e.innerHTML = n
        }
    }

    function s(e, t, o) {
        var n, i = e(), r = 0;
        i ? t(i) : n = setInterval(function () {
            i = e(), r++, (i || r > o) && (clearInterval(n), i && t(i))
        }, 200)
    }

    function d() {
        var t = g("tt_daymode"), o = g("tt_font"), n = g("tt_image") || "", i = g("pic_top_grid");
        u(t ? t : "1"), o && l(o), e(n), i && f(i)
    }

    function l(e) {
        e && (e = e.split("_")[0], ["s", "m", "l", "xl"].indexOf(e) > -1 && (T(L, "font_s font_m font_l font_xl"), b(L, "font_" + e)))
    }

    function u(e, t) {
        ["0", "1", 0, 1].indexOf(e) < 0 || (e = parseInt(e), e ? (T(L, "night"), b(L, "day")) : (T(L, "day"), b(L, "night")), t && t(e))
    }

    function f(e) {
        if (!(["0", "1", 0, 1].indexOf(e) < 0)) {
            e = parseInt(e), e ? b(L, "abtest") : T(L, "abtest");
            for (var t = document.querySelectorAll("article p"), o = document.querySelectorAll("article p img"), n = 0; n < t.length; n++) for (var i = 0; i < o.length; i++) {
                if (m(t[n], o[i])) {
                    b(t[n], "contain-img");
                    break
                }
                T(t[n], "contain-img")
            }
        }
    }

    function m(e, t, o) {
        if (e == t) return !0;
        if (!t || !t.nodeType || 1 != t.nodeType) return !1;
        if (e.contains) return e.contains(t);
        if (e.compareDocumentPosition) return !!(16 & e.compareDocumentPosition(t));
        for (var n = t.parentNode; n && n != o;) {
            if (n == e) return !0;
            n = n.parentNode
        }
        return !1
    }

    function p() {
        var e = document.querySelector("#TouTiaoBar");
        e && (e.style.display = "none")
    }

    function h() {
        var e = 0, t = /NewsArticle\/(\d\.\d)/i.exec(navigator.userAgent);
        return t && (e = +t[1]), e
    }

    function v(e) {
        var t = location.search.substr(1), o = {};
        if (t) for (var n = t.split("&"), i = 0; i < n.length; i++) {
            var r = n[i].split("=");
            o[r[0]] = r[1]
        }
        return o[e.toLowerCase()] || ""
    }

    function g(e) {
        var t = location.hash.substr(1), o = {};
        if (t) for (var n = t.split("&"), i = 0; i < n.length; i++) {
            var r = n[i].split("=");
            o[r[0]] = r[1]
        }
        if ("string" == typeof e) return o[e];
        if ("object" == typeof e) {
            for (var a in e) o[a] = e[a];
            var c = "";
            for (var s in o) c += s + "=" + o[s] + "&";
            location.href = "#" + c.substring(0, c.length - 1)
        }
    }

    function y(e, t) {
        var o, n = document.head;
        o = document.createElement("script"), o.async = !1, o.type = "text/javascript", o.charset = "utf-8", o.src = e, n.insertBefore(o, n.firstChild), t && o.addEventListener("load", t, !1)
    }

    function _(e, t) {
        var o, n = document.head;
        o = document.createElement("link"), o.rel = "stylesheet", o.type = "text/css", o.href = e, n.insertBefore(o, n.firstChild), t && o.addEventListener("load", t, !1)
    }

    function w(e, t) {
        var o = new RegExp("(\\s|^)" + t + "(\\s|$)");
        return o.test(e.className)
    }

    function b(e, t) {
        t.split(/\s+/).forEach(function (t) {
            w(e, t) || (e.className += " " + t)
        })
    }

    function T(e, t) {
        t.split(/\s+/).forEach(function (t) {
            var o = new RegExp("(\\s|^)" + t + "(\\s|$)");
            e.className = e.className.replace(o, " ")
        })
    }

    function E(e) {
        "object" == typeof TTAndroidObject ? TTAndroidObject.reportLocalEvent(e) : console.log(e)
    }

    function S() {
        this.style.opacity = "0"
    }

    function A() {
        this.style.opacity = "1"
    }

    function x(e) {
        function t(e) {
            e && 0 == this.scrollLeft && (e.style.opacity = 1)
        }

        if (e) {
            var o = e.querySelectorAll("table"), n = o.length, i = 0;
            if (0 != n) {
                i = e.offsetWidth;
                for (var r = 0; n > r; r++) {
                    var a = o[r], c = a.getBoundingClientRect(), s = c.right - c.left;
                    if (s > i) {
                        var d = document.createElement("div"), l = a.cloneNode(!0), u = document.createElement("div");
                        l.className += " border", d.className = "horizontal_scroll", d.appendChild(l), a.parentNode.replaceChild(d, a), u.className = "swipe_tip", u.innerHTML = "左滑查看更多", d.appendChild(u), d.addEventListener("touchstart", function () {
                            u.style.opacity = 0
                        }, !1), d.addEventListener("scroll", function () {
                            t.call(this, u)
                        }, !1), d.addEventListener("touchend", function () {
                            t.call(this, u)
                        }, !1), M && j && console.log("bytedance://disable_swipe")
                    }
                }
            }
        }
    }

    function C() {
        try {
            !function (e, t, o, n, i, r, a) {
                e.SlardarMonitorObject = i, e[i] = e[i] || function () {
                    (e[i].q = e[i].q || []).push(arguments)
                }, e[i].l = 1 * new Date, r = t.createElement(o), a = t.getElementsByTagName(o)[0], r.async = 1, r.src = n, a.parentNode.insertBefore(r, a)
            }(window, document, "script", "https://i.snssdk.com/slardar/sdk.js?bid=toutiao_article_outer", "Slardar"), window.Slardar("config", {
                bid: "toutiao_article_outer",
                pid: location.host
            })
        } catch (e) {
        }
    }

    var N = navigator.userAgent, L = document.querySelector("body"), j = /Android/i.test(N),
        M = /(news|explore)[_]?article/i.test(N), q = window.top !== window;
    is_inStockApp = /CaijingStock/i.test(N), is_PC = !/Android|SymbianOS|Windows Phone|iPhone|iPad|iPod/gi.test(N);
    var I = {
        autoplayed: !1, valid_videos: [], TTVideoInit: function () {
            if (j && M) for (var e = document.querySelectorAll(".video_container"), t = '<a class="cover"><img src="${poster_url}"/></a><a class="trigger" href="bytedance://video?json=0&play_url=${play_url}"></a>', o = 0, n = e.length; n > o; o++) {
                var i = e[o], r = i.querySelector("video"), a = t;
                r && (r.getAttribute("live") || s(function () {
                    return r.getAttribute("src")
                }, function (e) {
                    var t = {play_url: encodeURIComponent(e), poster_url: r.getAttribute("poster") || ""};
                    for (k in t) a = a.replace("${" + k + "}", t[k]);
                    i.innerHTML = a
                }, 10))
            }
        }, TTVideoInitPro: function () {
            var e = this, t = document.querySelectorAll(".video_container"), o = t.length,
                n = document.body.clientWidth, i = "56.25%";
            n && (i = parseInt(.5625 * n) + "px");
            for (var r = 0; o > r; r++) {
                var a = t[r], c = a.querySelector("video");
                c && s(function () {
                    return c.getAttribute("src")
                }, function (t) {
                    if (t) {
                        t = encodeURIComponent(t);
                        var o = c.getAttribute("poster") || "";
                        if (a.style.cssText = "padding-bottom:" + i + ";height:0;overflow:hidden;background:#000 no-repeat center;background-size:contain;", a.setAttribute("data-url", t), a.innerHTML = '<a class="trigger"></a>', o) {
                            var n = new Image;
                            n.onload = function () {
                                a.style.backgroundImage = "url(" + o + ")"
                            }, n.src = o
                        }
                        e.valid_videos.push(a), a.addEventListener("click", function () {
                            I.playVideo(this, 0)
                        }, !1)
                    }
                }, 10)
            }
        }, playVideo: function (e, t) {
            var o, n, i = this, r = e.getAttribute("data-url");
            s(function () {
                return "object" == typeof window.ToutiaoJSBridge
            }, function () {
                o = e.getBoundingClientRect(), n = [o.left, e.offsetTop, o.width, o.height], r = decodeURIComponent(r), !j && /huanqiu\.com|hubpd\.com/.test(location.hostname) && /^https/.test(r) && (r = r.replace(/^https/, "http")), window.ToutiaoJSBridge.call("playVideo", {
                    url: r,
                    frame: n
                }, j ? i.video_cb : null)
            }, 10), t || (i.autoplayed = !0)
        }, video_cb: function (e) {
            if (1 == e.code) {
                var t = document.querySelector('[data-url="' + e.url + '"]');
                t && (t.style.display = "none", document.body.style.marginTop = e.height + "px")
            }
        }, appCloseVideoNoticeWeb: function (e) {
            var t = document.querySelector('[data-url="' + e + '"]');
            t && (t.style.display = "block", document.body.style.marginTop = "0px")
        }, _videoInView: function (e) {
            var t = e.getBoundingClientRect(), o = t.height || 100;
            return (t.top >= 0 && t.left >= 0 && t.top) <= (window.innerHeight || document.documentElement.clientHeight) - o
        }, videoAutoPlay: function () {
            s(function () {
                return I.valid_videos.length
            }, function (e) {
                if (e) if (I.autoplayed) document.removeEventListener("scroll", I.videoAutoPlay, !1); else {
                    var t = I.valid_videos[0];
                    I._videoInView(t) ? (I.playVideo(t, 1), I.autoplayed = !0) : document.addEventListener("scroll", I.videoAutoPlay, !1)
                }
            }, 10)
        }, app45plusinit: function () {
            window.videoAutoPlay = this.videoAutoPlay, window.appCloseVideoNoticeWeb = this.appCloseVideoNoticeWeb, this.TTVideoInitPro()
        }
    };
    document.addEventListener("DOMContentLoaded", i, !1), is_inStockApp || (window.onhashchange = d, window.errorimg = S, window.loadimg = A, window.androidReportEvent = E), TouTiao.showImage = e, TouTiao.setFontSize = l, TouTiao.setDayMode = u, TouTiao.hideBar = p, TouTiao.hash = g
}(), !function () {
    function e(e) {
        e = e || {};
        for (var o = document.documentElement.firstElementChild; o;) {
            var n = o.tagName.toLowerCase();
            switch (n) {
                case"head":
                    break;
                case"body":
                    for (var i = document.body.firstElementChild; i;) t(i, e), i = i.nextElementSibling;
                    break;
                default:
                    t(o, e)
            }
            o = o.nextElementSibling
        }
    }

    function t(e, n) {
        if (e && e.nodeType === x.ELEMENT_NODE_TYPE && !c(e)) {
            n = n || {};
            var i = "";
            if (o(e)) return i = a(e, !0), void p(n, i);
            if (e.childElementCount) for (var r = e.firstElementChild; r;) t(r, n), r = r.nextElementSibling
        }
    }

    function o(e) {
        var t = e.tagName.toLowerCase();
        if ("iframe" === t) {
            var o = n(e);
            return o || h(e, "iframe"), o
        }
        var r = e.childElementCount && i(e);
        return r
    }

    function n(e) {
        if (!e || e.nodeType !== x.ELEMENT_NODE_TYPE) return !1;
        if ("iframe" !== e.tagName.toLowerCase()) return !1;
        var t = !1, o = e, n = o.src, i = n.split("?")[0], r = o.id;
        return -1 === j.indexOf(r) && (s(o) ? t = !0 : i && q.test(i) && (t = !0)), t
    }

    function i(e) {
        if (!e || e.nodeType !== x.ELEMENT_NODE_TYPE) return !1;
        if (A && s(e)) return !0;
        var t = /ad_\d+$|_g_g|icon_0|^\d{3,}$|BAIDU_SSP_|ad_survey_ad_slot|baiduimageplus|tanxmobile-|imageplus-append/;
        if (s(e, t)) return !0;
        var o = 9999, n = 99999999, i = e.style, r = +i.zIndex, a = i.position, c = "fixed" === a;
        if (r >= n) return !0;
        if (c) return r > o ? !0 : (h(e, "fixed"), !1);
        var d = getComputedStyle(e);
        return r = +d.zIndex, c = !a && "fixed" === d.position, r >= n ? !0 : !1
    }

    function r() {
        var e = window["toutiao.fe.anti_hijack/v2/rules"],
            t = e ? e.selector : ["#BAIDU_DUP_fp_wrapper", "#everDiv", "#icon_0", "#topBannerText", "#mzyyxf", "#mzyc1", "#_embed_v3_hd_r", "#_embed_v3_main", "#bottomAd", "#adStaticLog65535", "#fh_top_item", ".imageplus-append-neiwen", ".imageplus-append", ".baiduimageplusm-icon-only", ".baiduimageplusm-title-img-only", ".float-ad", ".adsbygoogle", ".TopHead_Huayu_Ssp", ".tlbs", ".duiba-media-yn-container", "[id^=autoInsertWapper]", "[id^=topBannerChapin_wrapper]", "[id^=imageplus-append]", "[id^=ad_2]", "[id*=alm_rich_flash_div]", "[id^=bmsh_]", "[id^=_embed_v3_dc]", '[cid="jsydadbottomdiv"]', "a.gg_hl_click", 'a[href^="http://cpro.baidu.com"]', 'a[href^="https://cpro.baidu.com"]', 'a[href^="http://luflow.baidu.com"]', 'a[href^="https://luflow.baidu.com"]', 'a[href^="http://m.baidu.com/mobads"]', 'a[href*="mobaders.com"]', 'a[href^="/tg/xz/"]', 'a[href^="http://adv.lywf.me/adv/site/click"]', 'a[href^="http://passport.fanli.com/mark"]', 'a[href^="http://www.qt58.cn"]', 'a[href^="http://sy.journalforum.org/j/duilian_mfwz"]', 'a[href^="https://sj3.2345.cn/download/8157581/2345zhushouduan"]', 'a[href^="http://sj3.2345.cn/download/8157581/2345zhushouduan"]', 'a[href*=".100msh.com//adretrieval/redirect"]', 'a[href^="http://gzads.clicks.100msh.com"]'],
            o = e ? e.iframe : ['iframe[src^="http://pos.baidu.com"]', 'iframe[src^="http://m.lu.sogou.com"]', 'iframe[id$="btiframe"]', 'iframe[src^="http://newsb.0831519.com"]', 'iframe[src^="http://l4.fwt0.com"]', 'iframe[src^="http://l2.fwt0.com"]', 'iframe[src*="/jsmi.ashx?"]', 'iframe[src^="http://mht.1kmb.cn"]', 'iframe[src^="http://42.51.146."]', 'iframe[src^="https://tiantongyuan.top/gg/p_auto.html"]', 'iframe[src^="http://sb.wmxyx.com/js/IOS.html"]', 'iframe[click_js^="http"]', 'iframe[src^="http://gd.189.cn/sz/push/"]', 'iframe[src^="http://gd.189.cn/gz/push/"]', 'iframe[src^="http://gd.189.cn/dg/push/"]', 'iframe[src^="http://gd.189.cn/push/"]', 'iframe[src^="http://www.xinhuanet.com/tech/ent/20160408/proxy_a.html"]', 'iframe[src^="http://ad.2345daohang.net"]', 'iframe[src^="http://new.pingannian.com"]', 'iframe[src^="http://ad.zhiong.net"]', 'iframe[src^="http://vi1.mzy2014.com"]', 'iframe[src^="http://ioc1.157w.com"]', 'iframe[src^="http://ad.aociaol.com"]', 'iframe[src^="http://analysis.zmedia.cn"]', 'iframe[src^="http://w736.54wl.com/ad/"]', 'iframe[src^="https://ads.360366.net"]', 'iframe[src^="http://ads.360366.net"]', 'iframe[src^="http://un.winasdaq.com"]', 'iframe[src^="http://dh.fuyun123.net"]', 'iframe[src^="//ssp.yidianzixun.com"]', 'iframe[src^="http://g.arealx.com"]', 'iframe[src^="http://cpupc.ss89.pw"]', 'iframe[src^="http://pic.ggxt.net"]', 'iframe[src^="http://juju.popupad.cn:2525/adauto/ads/"]'];
        if (/huanqiu\.com|people\.cn/.test(_) || (t = t.concat(o)), t.length) {
            var n = document.createElement("style"),
                i = "{display:none !important;visibility:hidden !important;opacity:0 !important;height:0 !important;width:0 !important;overflow:hidden !important;}";
            i += "body::after{background-image:none !important;} ", n.innerHTML = t.join(",") + i, document.head.appendChild(n)
        }
    }

    function a(e, t) {
        if (e && e.nodeType === x.ELEMENT_NODE_TYPE) {
            var o = e.parentNode, n = e.tagName.toLowerCase(), i = "iframe" !== n && 0 === e.childElementCount;
            if (t && (e.className += " " + C), "none" !== e.style.display && !i) return e.style.display = "none", t || o.removeChild(e), n;
            t || o.removeChild(e)
        }
    }

    function c(e) {
        if (!e || e.nodeType !== x.ELEMENT_NODE_TYPE) return !0;
        var t = e.getAttribute(k);
        switch (t) {
            case"0":
                return !1;
            case null:
                break;
            default:
                return !0
        }
        var o = e.tagName.toLowerCase(), n = e.id, i = e.className, r = !1;
        return S && (/huanqiu\.com/.test(_) ? n && /ad_survey_ad_slot_/.test(n) && (r = !0) : /people\.cn/.test(_) && i && /code_ad/.test(i) && (r = !0)), r || (r = L.elTags.indexOf(o) >= 0), r || (r = n && L.elIds.indexOf(n) >= 0), r || (r = i && L.elClassReg.test(i)), r ? e.setAttribute(k, 1) : e.setAttribute(k, 0), r
    }

    function s(e, t) {
        var o = t || N, n = !1;
        if (e && e.nodeType === x.ELEMENT_NODE_TYPE) {
            var i = e.id, r = e.className;
            if (i && (n = o.test(i)), !n && r) for (var a = r.split(/\s+/), c = 0, s = a.length; s > c && !(n = o.test(a[c])); c++) ;
        }
        return n
    }

    function d() {
        var e = document.querySelector("#gallery"), t = document.querySelector(".pswp");
        return e || t ? !0 : void 0
    }

    function l() {
        var t = {};
        e(t);
        for (var o = document.querySelectorAll("." + C), n = o.length, i = 0; n > i; i++) {
            var r = o[i];
            r.parentNode.removeChild(r)
        }
        for (var a in t) t.hasOwnProperty(a) && g(a, t[a]);
        if (0 === Math.floor(100 * Math.random())) {
            for (var c in I) if (("iframe" !== c || 0 === Math.floor(100 * Math.random())) && I.hasOwnProperty(c)) for (var s = I[c], d = 0, n = s.length; n > d; d++) g("suspicious_" + c, 1, JSON.stringify(s[d]));
            I = {}
        }
    }

    function u() {
        function e() {
            l(), ++i < t ? n = setTimeout(function () {
                e()
            }, o) : clearTimeout(n)
        }

        var t = 15, o = 200, n = 0, i = 0;
        e()
    }

    function f() {
        if (E) {
            var e = new T(function (e) {
                for (var t = !1, o = e.length, n = 0; o > n; n++) {
                    var i = e[n], r = i.addedNodes, a = r.length;
                    a && (t = !0)
                }
                t && l()
            }), t = {attributes: !1, childList: !0, characterData: !1, subtree: !0};
            e.observe(document.body, t)
        }
    }

    function m() {
        f()
    }

    function p(e, t) {
        t && (e = e || {}, e[t] ? e[t]++ : e[t] = 1)
    }

    function h(e, t) {
        if (e) {
            !!e.setAttribute && e.setAttribute(k, 1), I[t] = I[t] || [];
            var o = {};
            o.html = e.outerHTML, "iframe" === t && (v(e.src, e.getAttribute("id")) ? o = null : o.src = e.src), o && I[t].push(o)
        }
    }

    function v(e, t) {
        if (-1 !== ["__ToutiaoJSBridgeIframe", "__ToutiaoJSBridgeIframe_SetResult"].indexOf(t)) return !0;
        if (!e) return !1;
        for (var o = [], n = !1, i = 0, r = o.length; r > i; i++) if (0 === e.indexOf(o[i])) {
            n = !0;
            break
        }
        return n || 0 === e.indexOf("http") || (n = !0), n
    }

    function g(e, t, o) {
        if (e && t) {
            var n = ["deltype=" + e, "delnum=" + t, "extra=" + (o ? o : "-"), "tm=" + (new Date).getTime()];
            n = P.concat(n);
            var i = new Image, r = [O, n.join("&")].join("?");
            setTimeout(function () {
                i.src = r
            }, 200)
        }
    }

    function y() {
        var e = navigator.userAgent, t = /CaijingStock/i.test(e);
        if (t) return !1;
        try {
            var o = new Date,
                n = [o.getFullYear(), ("00" + (o.getMonth() + 1)).slice(-2), o.getDate(), o.getHours()].join(""),
                i = o.getMinutes(), a = i / 10, c = 0;
            a >= 2 && 4 > a ? c = 1 : a >= 4 && (c = 2);
            var s = n + ("0" + c), d = Math.random().toString().slice(2, 7);
            s += d;
            var l = document.createElement("script");
            l.src = "/static/js/toutiao.fe.anti_hijack-v2-rules.js?t=" + s, document.head.appendChild(l);
            var f = function () {
                if (window["toutiao.fe.anti_hijack/v2/rules"]) try {
                    r(), u(), m(), window.console && window.console.log("bytedance://anti_hijack_works")
                } catch (e) {
                    window.console && window.console.error(e)
                } else setTimeout(f, 50)
            }, p = setTimeout(f, 50);
            setTimeout(function () {
                clearTimeout(p)
            }, 3e3)
        } catch (h) {
        }
    }

    if (!window.TTAdblock_v5) {
        window.TTAdblock_v5 = !0;
        var _ = (document.body, document.documentElement, location.hostname), w = /complete|loaded|interactive/, b = {},
            T = (b.toString, window.MutationObserver || window.WebKitMutationObserver), E = !!T,
            S = !!document.querySelector("#TouTiaoBar"), A = d(), x = {ELEMENT_NODE_TYPE: 1}, C = "tt-wait-remove",
            N = /^ad[_-\d+]|[_-]ad$|[-_]ad[-_]|[-_]gg[-_]|^gg[-_]|[-_]ads[_-\d+]|_adp_|tanxssp/i, L = {
                elTags: ["head", "article", "script", "style", "header", "img"],
                elIds: ["TouTiaoBar", "article", "main"],
                elClassReg: new RegExp("header|pswp|mpl-bar|mpl-nav|modal-cover")
            }, k = "tt-ignored-node", j = ["__ToutiaoJSBridgeIframe_SetResult", "__ToutiaoJSBridgeIframe"],
            M = ["\\.baidu\\.com", "\\.sogou\\.com", "ts\\.szdzbx\\.com", "\\.1kmb\\.cn", "sc\\.idoman\\.net", "\\.mobaders\\.com", "\\.upaiyun\\.com", "\\.alicdn\\.com", "(\\d+\\.){3}\\d+(:\\d+)?/"],
            q = new RegExp(M.join("|")), I = {}, //O = "http://www.toutiao.com/__utm.gif",
            P = ["logtype=anti_hijack", "pathname=flows", "host=" + location.hostname, "location=" + encodeURIComponent(location.href)];
        w.test(document.readyState) ? y() : document.addEventListener("DOMContentLoaded", y, !1)
    }
}(), !function (e) {
    var t = navigator.userAgent, o = /CaijingStock/i.test(t);
    if (o) return !1;
    var n = e.document, i = e.location, r = function (e) {
        for (var t = e; t && "A" !== t.tagName;) t = t.parentNode;
        return t
    }, a = {
        "m.huanqiu.com": function () {
            e.addEventListener("DOMContentLoaded", function () {
                var e = n.getElementsByClassName("code_ad");
                if (e.length) for (var t = 0, o = e.length; o > t; t++) {
                    var a = e[t];
                    a.addEventListener("click", function (e) {
                        var t = r(e.target);
                        t && (e.preventDefault(), e.stopPropagation(), i.href = "sslocal://webview?url=" + encodeURIComponent(t.getAttribute("href")))
                    })
                }
            })
        }
    }, c = i.hostname;
    a[c] && a[c]()
}(window);