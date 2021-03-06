!function (e, t) {
    "use strict";

    function n(e) {
        var t = $(0), n = e.trim().slice(t.length).match(/^\s*(\S+?)\s*(?:,\s*(\S+))?\s+in\s+(.+)$/);
        return n ? {key: n[1], pos: n[2], val: t + n[3]} : {val: e}
    }

    function r(e, t, n) {
        var r = {};
        return r[e.key] = t, e.pos && (r[e.pos] = n), r
    }

    function i(e, t, i) {
        d(e, "each");
        var o, a = v(e), s = e.outerHTML, c = !!K[a], l = K[a] || {tmpl: s}, f = e.parentNode,
            p = document.createComment("riot placeholder"), h = [], g = m(e);
        f.insertBefore(p, e), i = n(i), t.one("premount", function () {
            f.stub && (f = t.root), e.parentNode.removeChild(e)
        }).on("update", function () {
            var n = V(i.val, t);
            z(n) || (o = n ? JSON.stringify(n) : "", n = n ? Object.keys(n).map(function (e) {
                return r(i, e, n[e])
            }) : []);
            for (var s = document.createDocumentFragment(), d = h.length, m = n.length; d > m;) h[--d].unmount(), h.splice(d, 1);
            for (d = 0; m > d; ++d) {
                var v = !o && i.key ? r(i, n[d], d) : n[d];
                h[d] ? h[d].update(v) : ((h[d] = new u(l, {
                    parent: t,
                    isLoop: !0,
                    hasImpl: c,
                    root: D.test(a) ? f : e.cloneNode(),
                    item: v
                }, e.innerHTML)).mount(), s.appendChild(h[d].root)), h[d]._item = v
            }
            f.insertBefore(s, p), g && (t.tags[a] = h)
        }).one("updated", function () {
            var e = Object.keys(t);
            _(f, function (n) {
                1 != n.nodeType || n.isLoop || n._looped || (n._visited = !1, n._looped = !0, E(n, t, e))
            })
        })
    }

    function o(e, t, n) {
        _(e, function (e) {
            if (1 == e.nodeType) {
                e.isLoop = e.isLoop || e.parentNode && e.parentNode.isLoop || e.getAttribute("each") ? 1 : 0;
                var r = m(e);
                r && !e.isLoop && n.push(h(r, e, t)), e.isLoop || E(e, t, [])
            }
        })
    }

    function a(e, t, n) {
        function r(e, t, r) {
            if (t.indexOf($(0)) >= 0) {
                var i = {dom: e, expr: t};
                n.push(y(i, r))
            }
        }

        _(e, function (e) {
            var n = e.nodeType;
            if (3 == n && "STYLE" != e.parentNode.tagName && r(e, e.nodeValue), 1 == n) {
                var o = e.getAttribute("each");
                return o ? (i(e, t, o), !1) : (f(e.attributes, function (t) {
                    var n = t.name, i = n.split("__")[1];
                    return r(e, t.value, {attr: i || n, bool: i}), i ? (d(e, n), !1) : void 0
                }), m(e) ? !1 : void 0)
            }
        })
    }

    function u(e, n, r) {
        function i() {
            var e = k && _ ? d : v || d;
            f(H.attributes, function (t) {
                m[t.name] = V(t.value, e)
            }), f(Object.keys(L), function (t) {
                m[t] = V(L[t], e)
            })
        }

        function u(e) {
            for (var t in j) typeof d[t] !== P && (d[t] = e[t])
        }

        function s() {
            d.parent && _ && f(Object.keys(d.parent), function (e) {
                var t = !~I.indexOf(e) && ~R.indexOf(e);
                (typeof d[e] === P || t) && (t || R.push(e), d[e] = d.parent[e])
            })
        }

        function c(e) {
            if (f(E, function (t) {
                t[e ? "mount" : "unmount"]()
            }), v) {
                var t = e ? "on" : "off";
                _ ? v[t]("unmount", d.unmount) : v[t]("update", d.update)[t]("unmount", d.unmount)
            }
        }

        var d = M.observable(this), m = C(n.opts) || {}, h = J(e.tmpl), v = n.parent, _ = n.isLoop, k = n.hasImpl,
            j = b(n.item), T = [], E = [], H = n.root, S = e.fn, q = H.tagName.toLowerCase(), L = {}, R = [];
        S && H._tag && H._tag.unmount(!0), this.isMounted = !1, H.isLoop = _, H._tag = this, this._id = O++, y(this, {
            parent: v,
            root: H,
            opts: m,
            tags: {}
        }, j), f(H.attributes, function (e) {
            var t = e.value;
            $(/{.*}/).test(t) && (L[e.name] = t)
        }), h.innerHTML && !/^(select|optgroup|table|tbody|tr|col(?:group)?)$/.test(q) && (h.innerHTML = A(h.innerHTML, r)), this.update = function (e) {
            e = b(e), s(), e && typeof j === F && (u(e), j = e), y(d, e), i(), d.trigger("update", e), l(T, d), d.trigger("updated")
        }, this.mixin = function () {
            f(arguments, function (e) {
                e = typeof e === N ? M.mixin(e) : e, f(Object.keys(e), function (t) {
                    "init" != t && (d[t] = p(e[t]) ? e[t].bind(d) : e[t])
                }), e.init && e.init.bind(d)()
            })
        }, this.mount = function () {
            if (i(), S && S.call(d, m), a(h, d, T), c(!0), (e.attrs || k) && (w(e.attrs, function (e, t) {
                H.setAttribute(e, t)
            }), a(d.root, d, T)), (!d.parent || _) && d.update(j), d.trigger("premount"), _ && !k) d.root = H = h.firstChild; else {
                for (; h.firstChild;) H.appendChild(h.firstChild);
                H.stub && (d.root = H = v.root)
            }
            !d.parent || d.parent.isMounted ? (d.isMounted = !0, d.trigger("mount")) : d.parent.one("mount", function () {
                x(d.root) || (d.parent.isMounted = d.isMounted = !0, d.trigger("mount"))
            })
        }, this.unmount = function (e) {
            var n, r = H, i = r.parentNode;
            if (i) {
                if (v) n = g(v), z(n.tags[q]) ? f(n.tags[q], function (e, t) {
                    e._id == d._id && n.tags[q].splice(t, 1)
                }) : n.tags[q] = t; else for (; r.firstChild;) r.removeChild(r.firstChild);
                e ? i.removeAttribute("riot-tag") : i.removeChild(r)
            }
            d.trigger("unmount"), c(), d.off("*"), H._tag = null
        }, o(h, this, E)
    }

    function s(t, n, r, i) {
        r[t] = function (t) {
            var o, a = i._item, u = i.parent;
            if (!a) for (; u && !a;) a = u._item, u = u.parent;
            t = t || e.event;
            try {
                t.currentTarget = r, t.target || (t.target = t.srcElement), t.which || (t.which = t.charCode || t.keyCode)
            } catch (s) {
            }
            t.item = a, n.call(i, t) === !0 || /radio|check/.test(r.type) || (t.preventDefault && t.preventDefault(), t.returnValue = !1), t.preventUpdate || (o = a ? g(u) : i, o.update())
        }
    }

    function c(e, t, n) {
        e && (e.insertBefore(n, t), e.removeChild(t))
    }

    function l(e, t) {
        f(e, function (e) {
            var n = e.dom, r = e.attr, i = V(e.expr, t), o = e.dom.parentNode;
            if (e.bool ? i = i ? r : !1 : null == i && (i = ""), o && "TEXTAREA" == o.tagName && (i = ("" + i).replace(/riot-/g, "")), e.value !== i) {
                if (e.value = i, !r) return void (n.nodeValue = "" + i);
                if (d(n, r), p(i)) s(r, i, n, t); else if ("if" == r) {
                    var a = e.stub, u = function () {
                        c(a.parentNode, a, n)
                    }, l = function () {
                        c(n.parentNode, n, a)
                    };
                    i ? a && (u(), n.inStub = !1, x(n) || _(n, function (e) {
                        e._tag && !e._tag.isMounted && (e._tag.isMounted = !!e._tag.trigger("mount"))
                    })) : (a = e.stub = a || document.createTextNode(""), n.parentNode ? l() : (t.parent || t).one("updated", l), n.inStub = !0)
                } else if (/^(show|hide)$/.test(r)) "hide" == r && (i = !i), n.style.display = i ? "" : "none"; else if ("value" == r) n.value = i; else if (H(r, L) && r != R) i && n.setAttribute(r.slice(L.length), i); else {
                    if (e.bool && (n[r] = i, !i)) return;
                    typeof i !== F && n.setAttribute(r, i)
                }
            }
        })
    }

    function f(e, t) {
        for (var n, r = 0, i = (e || []).length; i > r; r++) n = e[r], null != n && t(n, r) === !1 && r--;
        return e
    }

    function p(e) {
        return typeof e === B || !1
    }

    function d(e, t) {
        e.removeAttribute(t)
    }

    function m(e) {
        return e.tagName && K[e.getAttribute(R) || e.tagName.toLowerCase()]
    }

    function h(e, t, n) {
        var r, i = new u(e, {root: t, parent: n}, t.innerHTML), o = v(t), a = g(n);
        return i.parent = a, r = a.tags[o], r ? (z(r) || (a.tags[o] = [r]), ~a.tags[o].indexOf(i) || a.tags[o].push(i)) : a.tags[o] = i, t.innerHTML = "", i
    }

    function g(e) {
        for (var t = e; !m(t.root) && t.parent;) t = t.parent;
        return t
    }

    function v(e) {
        var t = m(e), n = e.getAttribute("name"),
            r = n && n.indexOf($(0)) < 0 ? n : t ? t.name : e.tagName.toLowerCase();
        return r
    }

    function y(e) {
        for (var t, n = arguments, r = 1; r < n.length; ++r) if (t = n[r]) for (var i in t) e[i] = t[i];
        return e
    }

    function b(e) {
        if (!(e instanceof u || e && typeof e.trigger == B)) return e;
        var t = {};
        for (var n in e) ~I.indexOf(n) || (t[n] = e[n]);
        return t
    }

    function _(e, t) {
        if (e) {
            if (t(e) === !1) return;
            for (e = e.firstChild; e;) _(e, t), e = e.nextSibling
        }
    }

    function w(e, t) {
        for (var n, r = /([-\w]+) ?= ?(?:"([^"]*)|'([^']*)|({[^}]*}))/g; n = r.exec(e);) t(n[1].toLowerCase(), n[2] || n[3] || n[4])
    }

    function x(e) {
        for (; e;) {
            if (e.inStub) return !0;
            e = e.parentNode
        }
        return !1
    }

    function k(e) {
        return document.createElement(e)
    }

    function A(e, t) {
        return e.replace(/<(yield)\/?>(<\/\1>)?/gi, t || "")
    }

    function j(e, t) {
        return (t || document).querySelectorAll(e)
    }

    function T(e, t) {
        return (t || document).querySelector(e)
    }

    function C(e) {
        function t() {
        }

        return t.prototype = e, new t
    }

    function E(e, t, n) {
        if (!e._visited) {
            var r, i = e.getAttribute("id") || e.getAttribute("name");
            i && (n.indexOf(i) < 0 && (r = t[i], r ? z(r) ? r.push(e) : t[i] = [r, e] : t[i] = e), e._visited = !0)
        }
    }

    function H(e, t) {
        return e.slice(0, t.length) === t
    }

    function S(e) {
        if (!M.render) {
            X || (X = k("style"), X.setAttribute("type", "text/css"));
            var t = document.head || document.getElementsByTagName("head")[0];
            if (X.styleSheet ? X.styleSheet.cssText += e : X.innerHTML += e, !X._rendered) if (X.styleSheet) document.body.appendChild(X); else {
                var n = T("style[type=riot]");
                n ? (n.parentNode.insertBefore(X, n), n.parentNode.removeChild(n)) : t.appendChild(X)
            }
            X._rendered = !0
        }
    }

    function q(e, t, n) {
        var r = K[t], i = e._innerHTML = e._innerHTML || e.innerHTML;
        return e.innerHTML = "", r && e && (r = new u(r, {
            root: e,
            opts: n
        }, i)), r && r.mount ? (r.mount(), U.push(r), r.on("unmount", function () {
            U.splice(U.indexOf(r), 1)
        })) : void 0
    }

    var M = {version: "v2.2.4", settings: {}}, O = 0, L = "riot-", R = L + "tag", N = "string", F = "object",
        P = "undefined", B = "function", D = /^(?:opt(ion|group)|tbody|col|t[rhd])$/,
        I = ["_item", "_id", "update", "root", "mount", "unmount", "mixin", "isMounted", "isLoop", "tags", "parent", "opts", "trigger", "on", "off", "one"],
        W = 0 | (e && e.document || {}).documentMode, z = Array.isArray;
    M.observable = function (e) {
        e = e || {};
        var t = {}, n = 0;
        return e.on = function (r, i) {
            return p(i) && (typeof i.id === P && (i._id = n++), r.replace(/\S+/g, function (e, n) {
                (t[e] = t[e] || []).push(i), i.typed = n > 0
            })), e
        }, e.off = function (n, r) {
            return "*" == n ? t = {} : n.replace(/\S+/g, function (e) {
                if (r) for (var n, i = t[e], o = 0; n = i && i[o]; ++o) n._id == r._id && i.splice(o--, 1); else t[e] = []
            }), e
        }, e.one = function (t, n) {
            function r() {
                e.off(t, r), n.apply(e, arguments)
            }

            return e.on(t, r)
        }, e.trigger = function (n) {
            for (var r, i = [].slice.call(arguments, 1), o = t[n] || [], a = 0; r = o[a]; ++a) r.busy || (r.busy = 1, r.apply(e, r.typed ? [n].concat(i) : i), o[a] !== r && a--, r.busy = 0);
            return t.all && "all" != n && e.trigger.apply(e, ["all", n].concat(i)), e
        }, e
    }, M.mixin = function () {
        var e = {};
        return function (t, n) {
            return n ? void (e[t] = n) : e[t]
        }
    }(), function (e, t, n) {
        function r() {
            return u.href.split("#")[1] || ""
        }

        function i(e) {
            return e.split("/")
        }

        function o(e) {
            e.type && (e = r()), e != a && (s.trigger.apply(null, ["H"].concat(i(e))), a = e)
        }

        if (n) {
            var a, u = n.location, s = e.observable(), c = !1, l = e.route = function (e) {
                e[0] ? (u.hash = e, o(e)) : s.on("H", e)
            };
            l.exec = function (e) {
                e.apply(null, i(r()))
            }, l.parser = function (e) {
                i = e
            }, l.stop = function () {
                c && (n.removeEventListener ? n.removeEventListener(t, o, !1) : n.detachEvent("on" + t, o), s.off("*"), c = !1)
            }, l.start = function () {
                c || (n.addEventListener ? n.addEventListener(t, o, !1) : n.attachEvent("on" + t, o), c = !0)
            }, l.start()
        }
    }(M, "hashchange", e);
    var X, $ = function (e) {
        var t, n, r, i = /[{}]/g;
        return function (o) {
            var a = M.settings.brackets || e;
            return t !== a && (t = a, r = a.split(" "), n = r.map(function (e) {
                return e.replace(/(?=.)/g, "\\")
            })), o instanceof RegExp ? a === e ? o : new RegExp(o.source.replace(i, function (e) {
                return n[~~("}" === e)]
            }), o.global ? "g" : "") : r[o]
        }
    }("{ }"), V = function () {
        function t(e, t) {
            return e.indexOf($(0)) < 0 ? (e = e.replace(/\n|\r\n?/g, "\n"), function () {
                return e
            }) : (e = e.replace($(/\\{/g), "￰").replace($(/\\}/g), "￱"), t = i(e, o(e, $(/{/), $(/}/))), e = 2 !== t.length || t[0] ? "[" + t.map(function (e, t) {
                return t % 2 ? n(e, !0) : '"' + e.replace(/\n|\r\n?/g, "\\n").replace(/"/g, '\\"') + '"'
            }).join(",") + '].join("")' : n(t[1]), new Function("d", "return " + e.replace(/\uFFF0/g, $(0)).replace(/\uFFF1/g, $(1)) + ";"))
        }

        function n(e, t) {
            return e = e.replace(/\n|\r\n?/g, " ").replace($(/^[{ ]+|[ }]+$|\/\*.+?\*\//g), ""), /^\s*[\w- "']+ *:/.test(e) ? "[" + o(e, /["' ]*[\w- ]+["' ]*:/, /,(?=["' ]*[\w- ]+["' ]*:)|}|$/).map(function (e) {
                return e.replace(/^[ "']*(.+?)[ "']*: *(.+?),? *$/, function (e, t, n) {
                    return n.replace(/[^&|=!><]+/g, r) + '?"' + t + '":"",'
                })
            }).join("") + '].join(" ").trim()' : r(e, t)
        }

        function r(e, t) {
            return e = e.trim(), e ? "(function(v){try{v=" + e.replace(s, function (e, t, n) {
                return n ? '(("' + n + u + n + ")" : e
            }) + "}catch(e){}return " + (t === !0 ? '!v&&v!==0?"":v' : "v") + "}).call(d)" : ""
        }

        function i(e, t) {
            var n = [];
            return t.map(function (t, r) {
                r = e.indexOf(t), n.push(e.slice(0, r), t), e = e.slice(r + t.length)
            }), e && n.push(e), n
        }

        function o(e, t, n) {
            var r, i = 0, o = [], a = new RegExp("(" + t.source + ")|(" + n.source + ")", "g");
            return e.replace(a, function (t, n, a, u) {
                !i && n && (r = u), i += n ? 1 : -1, i || null == a || o.push(e.slice(r, u + a.length))
            }), o
        }

        var a = {}, u = '"in d?d:' + (e ? "window)." : "global)."),
            s = /(['"\/])(?:[^\\]*?|\\.|.)*?\1|\.\w*|\w*:|\b(?:(?:new|typeof|in|instanceof) |(?:this|true|false|null|undefined)\b|function\s*\()|([A-Za-z_$]\w*)/g;
        return function (e, n) {
            return e && (a[e] || (a[e] = t(e)))(n)
        }
    }(), J = function (e) {
        function t(t) {
            var o = t && t.match(/^\s*<([-\w]+)/), a = o && o[1].toLowerCase(), u = r[a] || i, s = k(u);
            return s.stub = !0, e && a && (o = a.match(D)) ? n(s, t, a, !!o[1]) : s.innerHTML = t, s
        }

        function n(e, t, n, r) {
            var o, a = k(i), u = r ? "select>" : "table>";
            a.innerHTML = "<" + u + t + "</" + u, o = a.getElementsByTagName(n)[0], o && e.appendChild(o)
        }

        var r = {tr: "tbody", th: "tr", td: "tr", tbody: "table", col: "colgroup"}, i = "div";
        return e = e && 10 > e, t
    }(W), U = [], K = {};
    M.tag = function (e, t, n, r, i) {
        return p(r) && (i = r, /^[\w\-]+\s?=/.test(n) ? (r = n, n = "") : r = ""), n && (p(n) ? i = n : S(n)), K[e] = {
            name: e,
            tmpl: t,
            attrs: r,
            fn: i
        }, e
    }, M.mount = function (e, t, n) {
        function r(e) {
            var t = "";
            return f(e, function (e) {
                t += ", *[" + R + '="' + e.trim() + '"]'
            }), t
        }

        function i() {
            var e = Object.keys(K);
            return e + r(e)
        }

        function o(e) {
            var r;
            if (e.tagName) {
                !t || (r = e.getAttribute(R)) && r == t || e.setAttribute(R, t);
                var i = q(e, t || e.getAttribute(R) || e.tagName.toLowerCase(), n);
                i && s.push(i)
            } else e.length && f(e, o)
        }

        var a, u, s = [];
        if (typeof t === F && (n = t, t = 0), typeof e === N ? ("*" === e ? e = u = i() : e += r(e.split(",")), a = j(e)) : a = e, "*" === t) {
            if (t = u || i(), a.tagName) a = j(t, a); else {
                var c = [];
                f(a, function (e) {
                    c.push(j(t, e))
                }), a = c
            }
            t = 0
        }
        return a.tagName ? o(a) : f(a, o), s
    }, M.update = function () {
        return f(U, function (e) {
            e.update()
        })
    }, M.mountTo = M.mount, M.util = {
        brackets: $,
        tmpl: V
    }, typeof exports === F ? module.exports = M : "function" == typeof define && define.amd ? define("static/js/lib/riot", ["require"], function () {
        return e.riot = M
    }) : e.riot = M
}("undefined" != typeof window ? window : void 0), !function (e, t, n) {
    "undefined" != typeof module && module.exports ? module.exports = n() : "function" == typeof define && define.amd ? define("static/js/lib/http", [], n) : t[e] = n()
}("http", this, function () {
    function succeed(e) {
        var t = protocolRe.exec(e.url);
        return t = t && t[1] || context.location.protocol, httpsRe.test(t) ? twoHundo.test(e.request.status) : !!e.request.response
    }

    function handleReadyState(e, t, n) {
        return function () {
            return e._aborted ? n(e.request) : e._timedOut ? n(e.request, "Request is aborted: timeout") : void (e.request && 4 == e.request[readyState] && (e.request.onreadystatechange = noop, succeed(e) ? t(e.request) : n(e.request)))
        }
    }

    function setHeaders(e, t) {
        var n, r = t.headers || {};
        r.Accept = r.Accept || defaultHeaders.accept[t.type] || defaultHeaders.accept["*"];
        var i = "undefined" != typeof FormData && t.data instanceof FormData;
        t.crossOrigin || r[requestedWith] || (r[requestedWith] = defaultHeaders.requestedWith), r[contentType] || i || (r[contentType] = t.contentType || defaultHeaders.contentType);
        for (n in r) r.hasOwnProperty(n) && "setRequestHeader" in e && e.setRequestHeader(n, r[n])
    }

    function setCredentials(e, t) {
        "undefined" != typeof t.withCredentials && "undefined" != typeof e.withCredentials && (e.withCredentials = !!t.withCredentials)
    }

    function generalCallback(e) {
        lastValue = e
    }

    function urlappend(e, t) {
        return e + (/\?/.test(e) ? "&" : "?") + t
    }

    function handleJsonp(e, t, n, r) {
        var i = uniqid++, o = e.jsonpCallback || "callback", a = e.jsonpCallbackName || reqwest.getcallbackPrefix(i),
            u = new RegExp("((^|\\?|&)" + o + ")=([^&]+)"), s = r.match(u), c = doc.createElement("script"), l = 0,
            f = -1 !== navigator.userAgent.indexOf("MSIE 10.0");
        return s ? "?" === s[3] ? r = r.replace(u, "$1=" + a) : a = s[3] : r = urlappend(r, o + "=" + a), context[a] = generalCallback, c.type = "text/javascript", c.src = r, c.async = !0, "undefined" == typeof c.onreadystatechange || f || (c.htmlFor = c.id = "_reqwest_" + i), c.onload = c.onreadystatechange = function () {
            return c[readyState] && "complete" !== c[readyState] && "loaded" !== c[readyState] || l ? !1 : (c.onload = c.onreadystatechange = null, c.onclick && c.onclick(), t(lastValue), lastValue = void 0, head.removeChild(c), void (l = 1))
        }, head.appendChild(c), {
            abort: function () {
                c.onload = c.onreadystatechange = null, n({}, "Request is aborted: timeout", {}), lastValue = void 0, head.removeChild(c), l = 1
            }
        }
    }

    function getRequest(e, t) {
        var n, r = this.o, i = (r.method || "GET").toUpperCase(), o = "string" == typeof r ? r : r.url,
            a = r.processData !== !1 && r.data && "string" != typeof r.data ? reqwest.toQueryString(r.data) : r.data || null,
            u = !1;
        return "jsonp" != r.type && "GET" != i || !a || (o = urlappend(o, a), a = null), "jsonp" == r.type ? handleJsonp(r, e, t, o) : (n = r.xhr && r.xhr(r) || xhr(r), n.open(i, o, r.async === !1 ? !1 : !0), setHeaders(n, r), setCredentials(n, r), context[xDomainRequest] && n instanceof context[xDomainRequest] ? (n.onload = e, n.onerror = t, n.onprogress = function () {
        }, u = !0) : n.onreadystatechange = handleReadyState(this, e, t), r.before && r.before(n), u ? setTimeout(function () {
            n.send(a)
        }, 200) : n.send(a), n)
    }

    function Reqwest(e, t) {
        this.o = e, this.fn = t, init.apply(this, arguments)
    }

    function setType(e) {
        return null === e ? void 0 : e.match("json") ? "json" : e.match("javascript") ? "js" : e.match("text") ? "html" : e.match("xml") ? "xml" : void 0
    }

    function init(o, fn) {
        function complete(e) {
            for (o.timeout && clearTimeout(self.timeout), self.timeout = null; self._completeHandlers.length > 0;) self._completeHandlers.shift()(e)
        }

        function success(resp) {
            var type = o.type || resp && setType(resp.getResponseHeader("Content-Type"));
            resp = "jsonp" !== type ? self.request : resp;
            var filteredResponse = globalSetupOptions.dataFilter(resp.responseText, type), r = filteredResponse;
            try {
                resp.responseText = r
            } catch (e) {
            }
            if (r) switch (type) {
                case"json":
                    try {
                        resp = context.JSON ? context.JSON.parse(r) : eval("(" + r + ")")
                    } catch (err) {
                        return error(resp, "Could not parse JSON in response", err)
                    }
                    break;
                case"js":
                    resp = eval(r);
                    break;
                case"html":
                    resp = r;
                    break;
                case"xml":
                    resp = resp.responseXML && resp.responseXML.parseError && resp.responseXML.parseError.errorCode && resp.responseXML.parseError.reason ? null : resp.responseXML
            }
            for (self._responseArgs.resp = resp, self._fulfilled = !0, fn(resp), self._successHandler(resp); self._fulfillmentHandlers.length > 0;) resp = self._fulfillmentHandlers.shift()(resp);
            complete(resp)
        }

        function timedOut() {
            self._timedOut = !0, self.request.abort()
        }

        function error(e, t, n) {
            for (e = self.request, self._responseArgs.resp = e, self._responseArgs.msg = t, self._responseArgs.t = n, self._erred = !0; self._errorHandlers.length > 0;) self._errorHandlers.shift()(e, t, n);
            complete(e)
        }

        this.url = "string" == typeof o ? o : o.url, this.timeout = null, this._fulfilled = !1, this._successHandler = function () {
        }, this._fulfillmentHandlers = [], this._errorHandlers = [], this._completeHandlers = [], this._erred = !1, this._responseArgs = {};
        var self = this;
        fn = fn || function () {
        }, o.timeout && (this.timeout = setTimeout(function () {
            timedOut()
        }, o.timeout)), o.success && (this._successHandler = function () {
            o.success.apply(o, arguments)
        }), o.error && this._errorHandlers.push(function () {
            o.error.apply(o, arguments)
        }), o.complete && this._completeHandlers.push(function () {
            o.complete.apply(o, arguments)
        }), this.request = getRequest.call(this, success, error)
    }

    function reqwest(e, t) {
        return new Reqwest(e, t)
    }

    function normalize(e) {
        return e ? e.replace(/\r?\n/g, "\r\n") : ""
    }

    function serial(e, t) {
        var n, r, i, o, a = e.name, u = e.tagName.toLowerCase(), s = function (e) {
            e && !e.disabled && t(a, normalize(e.attributes.value && e.attributes.value.specified ? e.value : e.text))
        };
        if (!e.disabled && a) switch (u) {
            case"input":
                /reset|button|image|file/i.test(e.type) || (n = /checkbox/i.test(e.type), r = /radio/i.test(e.type), i = e.value, (!(n || r) || e.checked) && t(a, normalize(n && "" === i ? "on" : i)));
                break;
            case"textarea":
                t(a, normalize(e.value));
                break;
            case"select":
                if ("select-one" === e.type.toLowerCase()) s(e.selectedIndex >= 0 ? e.options[e.selectedIndex] : null); else for (o = 0; e.length && o < e.length; o++) e.options[o].selected && s(e.options[o])
        }
    }

    function eachFormElement() {
        var e, t, n = this, r = function (e, t) {
            var r, i, o;
            for (r = 0; r < t.length; r++) for (o = e[byTag](t[r]), i = 0; i < o.length; i++) serial(o[i], n)
        };
        for (t = 0; t < arguments.length; t++) e = arguments[t], /input|select|textarea/i.test(e.tagName) && serial(e, n), r(e, ["input", "select", "textarea"])
    }

    function serializeQueryString() {
        return reqwest.toQueryString(reqwest.serializeArray.apply(null, arguments))
    }

    function serializeHash() {
        var e = {};
        return eachFormElement.apply(function (t, n) {
            t in e ? (e[t] && !isArray(e[t]) && (e[t] = [e[t]]), e[t].push(n)) : e[t] = n
        }, arguments), e
    }

    function buildParams(e, t, n, r) {
        var i, o, a, u = /\[\]$/;
        if (isArray(t)) for (o = 0; t && o < t.length; o++) a = t[o], n || u.test(e) ? r(e, a) : buildParams(e + "[" + ("object" == typeof a ? o : "") + "]", a, n, r); else if (t && "[object Object]" === t.toString()) for (i in t) buildParams(e + "[" + i + "]", t[i], n, r); else r(e, t)
    }

    var context = this;
    if ("window" in context) var doc = document, byTag = "getElementsByTagName", head = doc[byTag]("head")[0]; else {
        var XHR2;
        try {
            XHR2 = require("xhr2")
        } catch (ex) {
            throw new Error("Peer dependency `xhr2` required! Please npm install xhr2")
        }
    }
    var httpsRe = /^http/, protocolRe = /(^\w+):\/\//, twoHundo = /^(20\d|1223)$/, readyState = "readyState",
        contentType = "Content-Type", requestedWith = "X-Requested-With", uniqid = 0,
        callbackPrefix = "reqwest_" + +new Date, lastValue, xmlHttpRequest = "XMLHttpRequest",
        xDomainRequest = "XDomainRequest", noop = function () {
        }, isArray = "function" == typeof Array.isArray ? Array.isArray : function (e) {
            return e instanceof Array
        }, defaultHeaders = {
            contentType: "application/x-www-form-urlencoded",
            requestedWith: xmlHttpRequest,
            accept: {
                "*": "text/javascript, text/html, application/xml, text/xml, */*",
                xml: "application/xml, text/xml",
                html: "text/html",
                text: "text/plain",
                json: "application/json, text/javascript",
                js: "application/javascript, text/javascript"
            }
        }, xhr = function (e) {
            if (e.crossOrigin === !0) {
                var t = context[xmlHttpRequest] ? new XMLHttpRequest : null;
                if (t && "withCredentials" in t) return t;
                if (context[xDomainRequest]) return new XDomainRequest;
                throw new Error("Browser does not support cross-origin requests")
            }
            return context[xmlHttpRequest] ? new XMLHttpRequest : XHR2 ? new XHR2 : new ActiveXObject("Microsoft.XMLHTTP")
        }, globalSetupOptions = {
            dataFilter: function (e) {
                return e
            }
        };
    return Reqwest.prototype = {
        abort: function () {
            this._aborted = !0, this.request.abort()
        }, retry: function () {
            init.call(this, this.o, this.fn)
        }, then: function (e, t) {
            return e = e || function () {
            }, t = t || function () {
            }, this._fulfilled ? this._responseArgs.resp = e(this._responseArgs.resp) : this._erred ? t(this._responseArgs.resp, this._responseArgs.msg, this._responseArgs.t) : (this._fulfillmentHandlers.push(e), this._errorHandlers.push(t)), this
        }, always: function (e) {
            return this._fulfilled || this._erred ? e(this._responseArgs.resp) : this._completeHandlers.push(e), this
        }, fail: function (e) {
            return this._erred ? e(this._responseArgs.resp, this._responseArgs.msg, this._responseArgs.t) : this._errorHandlers.push(e), this
        }, "catch": function (e) {
            return this.fail(e)
        }
    }, reqwest.serializeArray = function () {
        var e = [];
        return eachFormElement.apply(function (t, n) {
            e.push({name: t, value: n})
        }, arguments), e
    }, reqwest.serialize = function () {
        if (0 === arguments.length) return "";
        var e, t, n = Array.prototype.slice.call(arguments, 0);
        return e = n.pop(), e && e.nodeType && n.push(e) && (e = null), e && (e = e.type), t = "map" == e ? serializeHash : "array" == e ? reqwest.serializeArray : serializeQueryString, t.apply(null, n)
    }, reqwest.toQueryString = function (e, t) {
        var n, r, i = t || !1, o = [], a = encodeURIComponent, u = function (e, t) {
            t = "function" == typeof t ? t() : null == t ? "" : t, o[o.length] = a(e) + "=" + a(t)
        };
        if (isArray(e)) for (r = 0; e && r < e.length; r++) u(e[r].name, e[r].value); else for (n in e) e.hasOwnProperty(n) && buildParams(n, e[n], i, u);
        return o.join("&").replace(/%20/g, "+")
    }, reqwest.getcallbackPrefix = function () {
        return callbackPrefix
    }, reqwest.compat = function (e, t) {
        return e && (e.type && (e.method = e.type) && delete e.type, e.dataType && (e.type = e.dataType), e.jsonpCallback && (e.jsonpCallbackName = e.jsonpCallback) && delete e.jsonpCallback, e.jsonp && (e.jsonpCallback = e.jsonp)), new Reqwest(e, t)
    }, reqwest.ajaxSetup = function (e) {
        e = e || {};
        for (var t in e) globalSetupOptions[t] = e[t]
    }, reqwest
}), !function () {
    var e = "object" == typeof self && self.self === self && self || "object" == typeof global && global.global === global && global || this,
        t = e._, n = Array.prototype, r = Object.prototype, i = "undefined" != typeof Symbol ? Symbol.prototype : null,
        o = n.push, a = n.slice, u = r.toString, s = r.hasOwnProperty, c = Array.isArray, l = Object.keys,
        f = Object.create, p = function () {
        }, d = function (e) {
            return e instanceof d ? e : this instanceof d ? void (this._wrapped = e) : new d(e)
        };
    "undefined" == typeof exports || exports.nodeType ? e._ = d : ("undefined" != typeof module && !module.nodeType && module.exports && (exports = module.exports = d), exports._ = d), d.VERSION = "1.8.3";
    var m, h = function (e, t, n) {
        if (void 0 === t) return e;
        switch (null == n ? 3 : n) {
            case 1:
                return function (n) {
                    return e.call(t, n)
                };
            case 3:
                return function (n, r, i) {
                    return e.call(t, n, r, i)
                };
            case 4:
                return function (n, r, i, o) {
                    return e.call(t, n, r, i, o)
                }
        }
        return function () {
            return e.apply(t, arguments)
        }
    }, g = function (e, t, n) {
        return d.iteratee !== m ? d.iteratee(e, t) : null == e ? d.identity : d.isFunction(e) ? h(e, t, n) : d.isObject(e) ? d.matcher(e) : d.property(e)
    };
    d.iteratee = m = function (e, t) {
        return g(e, t, 1 / 0)
    };
    var v = function (e, t) {
        return t = null == t ? e.length - 1 : +t, function () {
            for (var n = Math.max(arguments.length - t, 0), r = Array(n), i = 0; n > i; i++) r[i] = arguments[i + t];
            switch (t) {
                case 0:
                    return e.call(this, r);
                case 1:
                    return e.call(this, arguments[0], r);
                case 2:
                    return e.call(this, arguments[0], arguments[1], r)
            }
            var o = Array(t + 1);
            for (i = 0; t > i; i++) o[i] = arguments[i];
            return o[t] = r, e.apply(this, o)
        }
    }, y = function (e) {
        if (!d.isObject(e)) return {};
        if (f) return f(e);
        p.prototype = e;
        var t = new p;
        return p.prototype = null, t
    }, b = function (e) {
        return function (t) {
            return null == t ? void 0 : t[e]
        }
    }, _ = Math.pow(2, 53) - 1, w = b("length"), x = function (e) {
        var t = w(e);
        return "number" == typeof t && t >= 0 && _ >= t
    };
    d.each = d.forEach = function (e, t, n) {
        t = h(t, n);
        var r, i;
        if (x(e)) for (r = 0, i = e.length; i > r; r++) t(e[r], r, e); else {
            var o = d.keys(e);
            for (r = 0, i = o.length; i > r; r++) t(e[o[r]], o[r], e)
        }
        return e
    }, d.map = d.collect = function (e, t, n) {
        t = g(t, n);
        for (var r = !x(e) && d.keys(e), i = (r || e).length, o = Array(i), a = 0; i > a; a++) {
            var u = r ? r[a] : a;
            o[a] = t(e[u], u, e)
        }
        return o
    };
    var k = function (e) {
        var t = function (t, n, r, i) {
            var o = !x(t) && d.keys(t), a = (o || t).length, u = e > 0 ? 0 : a - 1;
            for (i || (r = t[o ? o[u] : u], u += e); u >= 0 && a > u; u += e) {
                var s = o ? o[u] : u;
                r = n(r, t[s], s, t)
            }
            return r
        };
        return function (e, n, r, i) {
            var o = arguments.length >= 3;
            return t(e, h(n, i, 4), r, o)
        }
    };
    d.reduce = d.foldl = d.inject = k(1), d.reduceRight = d.foldr = k(-1), d.find = d.detect = function (e, t, n) {
        var r = x(e) ? d.findIndex : d.findKey, i = r(e, t, n);
        return void 0 !== i && -1 !== i ? e[i] : void 0
    }, d.filter = d.select = function (e, t, n) {
        var r = [];
        return t = g(t, n), d.each(e, function (e, n, i) {
            t(e, n, i) && r.push(e)
        }), r
    }, d.reject = function (e, t, n) {
        return d.filter(e, d.negate(g(t)), n)
    }, d.every = d.all = function (e, t, n) {
        t = g(t, n);
        for (var r = !x(e) && d.keys(e), i = (r || e).length, o = 0; i > o; o++) {
            var a = r ? r[o] : o;
            if (!t(e[a], a, e)) return !1
        }
        return !0
    }, d.some = d.any = function (e, t, n) {
        t = g(t, n);
        for (var r = !x(e) && d.keys(e), i = (r || e).length, o = 0; i > o; o++) {
            var a = r ? r[o] : o;
            if (t(e[a], a, e)) return !0
        }
        return !1
    }, d.contains = d.includes = d.include = function (e, t, n, r) {
        return x(e) || (e = d.values(e)), ("number" != typeof n || r) && (n = 0), d.indexOf(e, t, n) >= 0
    }, d.invoke = v(function (e, t, n) {
        var r = d.isFunction(t);
        return d.map(e, function (e) {
            var i = r ? t : e[t];
            return null == i ? i : i.apply(e, n)
        })
    }), d.pluck = function (e, t) {
        return d.map(e, d.property(t))
    }, d.where = function (e, t) {
        return d.filter(e, d.matcher(t))
    }, d.findWhere = function (e, t) {
        return d.find(e, d.matcher(t))
    }, d.max = function (e, t, n) {
        var r, i, o = -1 / 0, a = -1 / 0;
        if (null == t || "number" == typeof t && "object" != typeof e[0] && null != e) {
            e = x(e) ? e : d.values(e);
            for (var u = 0, s = e.length; s > u; u++) r = e[u], null != r && r > o && (o = r)
        } else t = g(t, n), d.each(e, function (e, n, r) {
            i = t(e, n, r), (i > a || i === -1 / 0 && o === -1 / 0) && (o = e, a = i)
        });
        return o
    }, d.min = function (e, t, n) {
        var r, i, o = 1 / 0, a = 1 / 0;
        if (null == t || "number" == typeof t && "object" != typeof e[0] && null != e) {
            e = x(e) ? e : d.values(e);
            for (var u = 0, s = e.length; s > u; u++) r = e[u], null != r && o > r && (o = r)
        } else t = g(t, n), d.each(e, function (e, n, r) {
            i = t(e, n, r), (a > i || 1 / 0 === i && 1 / 0 === o) && (o = e, a = i)
        });
        return o
    }, d.shuffle = function (e) {
        return d.sample(e, 1 / 0)
    }, d.sample = function (e, t, n) {
        if (null == t || n) return x(e) || (e = d.values(e)), e[d.random(e.length - 1)];
        var r = x(e) ? d.clone(e) : d.values(e), i = w(r);
        t = Math.max(Math.min(t, i), 0);
        for (var o = i - 1, a = 0; t > a; a++) {
            var u = d.random(a, o), s = r[a];
            r[a] = r[u], r[u] = s
        }
        return r.slice(0, t)
    }, d.sortBy = function (e, t, n) {
        var r = 0;
        return t = g(t, n), d.pluck(d.map(e, function (e, n, i) {
            return {value: e, index: r++, criteria: t(e, n, i)}
        }).sort(function (e, t) {
            var n = e.criteria, r = t.criteria;
            if (n !== r) {
                if (n > r || void 0 === n) return 1;
                if (r > n || void 0 === r) return -1
            }
            return e.index - t.index
        }), "value")
    };
    var A = function (e, t) {
        return function (n, r, i) {
            var o = t ? [[], []] : {};
            return r = g(r, i), d.each(n, function (t, i) {
                var a = r(t, i, n);
                e(o, t, a)
            }), o
        }
    };
    d.groupBy = A(function (e, t, n) {
        d.has(e, n) ? e[n].push(t) : e[n] = [t]
    }), d.indexBy = A(function (e, t, n) {
        e[n] = t
    }), d.countBy = A(function (e, t, n) {
        d.has(e, n) ? e[n]++ : e[n] = 1
    });
    var j = /[^\ud800-\udfff]|[\ud800-\udbff][\udc00-\udfff]|[\ud800-\udfff]/g;
    d.toArray = function (e) {
        return e ? d.isArray(e) ? a.call(e) : d.isString(e) ? e.match(j) : x(e) ? d.map(e, d.identity) : d.values(e) : []
    }, d.size = function (e) {
        return null == e ? 0 : x(e) ? e.length : d.keys(e).length
    }, d.partition = A(function (e, t, n) {
        e[n ? 0 : 1].push(t)
    }, !0), d.first = d.head = d.take = function (e, t, n) {
        return null == e || e.length < 1 ? void 0 : null == t || n ? e[0] : d.initial(e, e.length - t)
    }, d.initial = function (e, t, n) {
        return a.call(e, 0, Math.max(0, e.length - (null == t || n ? 1 : t)))
    }, d.last = function (e, t, n) {
        return null == e || e.length < 1 ? void 0 : null == t || n ? e[e.length - 1] : d.rest(e, Math.max(0, e.length - t))
    }, d.rest = d.tail = d.drop = function (e, t, n) {
        return a.call(e, null == t || n ? 1 : t)
    }, d.compact = function (e) {
        return d.filter(e, Boolean)
    };
    var T = function (e, t, n, r) {
        r = r || [];
        for (var i = r.length, o = 0, a = w(e); a > o; o++) {
            var u = e[o];
            if (x(u) && (d.isArray(u) || d.isArguments(u))) if (t) for (var s = 0, c = u.length; c > s;) r[i++] = u[s++]; else T(u, t, n, r), i = r.length; else n || (r[i++] = u)
        }
        return r
    };
    d.flatten = function (e, t) {
        return T(e, t, !1)
    }, d.without = v(function (e, t) {
        return d.difference(e, t)
    }), d.uniq = d.unique = function (e, t, n, r) {
        d.isBoolean(t) || (r = n, n = t, t = !1), null != n && (n = g(n, r));
        for (var i = [], o = [], a = 0, u = w(e); u > a; a++) {
            var s = e[a], c = n ? n(s, a, e) : s;
            t ? (a && o === c || i.push(s), o = c) : n ? d.contains(o, c) || (o.push(c), i.push(s)) : d.contains(i, s) || i.push(s)
        }
        return i
    }, d.union = v(function (e) {
        return d.uniq(T(e, !0, !0))
    }), d.intersection = function (e) {
        for (var t = [], n = arguments.length, r = 0, i = w(e); i > r; r++) {
            var o = e[r];
            if (!d.contains(t, o)) {
                var a;
                for (a = 1; n > a && d.contains(arguments[a], o); a++) ;
                a === n && t.push(o)
            }
        }
        return t
    }, d.difference = v(function (e, t) {
        return t = T(t, !0, !0), d.filter(e, function (e) {
            return !d.contains(t, e)
        })
    }), d.unzip = function (e) {
        for (var t = e && d.max(e, w).length || 0, n = Array(t), r = 0; t > r; r++) n[r] = d.pluck(e, r);
        return n
    }, d.zip = v(d.unzip), d.object = function (e, t) {
        for (var n = {}, r = 0, i = w(e); i > r; r++) t ? n[e[r]] = t[r] : n[e[r][0]] = e[r][1];
        return n
    };
    var C = function (e) {
        return function (t, n, r) {
            n = g(n, r);
            for (var i = w(t), o = e > 0 ? 0 : i - 1; o >= 0 && i > o; o += e) if (n(t[o], o, t)) return o;
            return -1
        }
    };
    d.findIndex = C(1), d.findLastIndex = C(-1), d.sortedIndex = function (e, t, n, r) {
        n = g(n, r, 1);
        for (var i = n(t), o = 0, a = w(e); a > o;) {
            var u = Math.floor((o + a) / 2);
            n(e[u]) < i ? o = u + 1 : a = u
        }
        return o
    };
    var E = function (e, t, n) {
        return function (r, i, o) {
            var u = 0, s = w(r);
            if ("number" == typeof o) e > 0 ? u = o >= 0 ? o : Math.max(o + s, u) : s = o >= 0 ? Math.min(o + 1, s) : o + s + 1; else if (n && o && s) return o = n(r, i), r[o] === i ? o : -1;
            if (i !== i) return o = t(a.call(r, u, s), d.isNaN), o >= 0 ? o + u : -1;
            for (o = e > 0 ? u : s - 1; o >= 0 && s > o; o += e) if (r[o] === i) return o;
            return -1
        }
    };
    d.indexOf = E(1, d.findIndex, d.sortedIndex), d.lastIndexOf = E(-1, d.findLastIndex), d.range = function (e, t, n) {
        null == t && (t = e || 0, e = 0), n || (n = e > t ? -1 : 1);
        for (var r = Math.max(Math.ceil((t - e) / n), 0), i = Array(r), o = 0; r > o; o++, e += n) i[o] = e;
        return i
    }, d.chunk = function (e, t) {
        if (null == t || 1 > t) return [];
        for (var n = [], r = 0, i = e.length; i > r;) n.push(a.call(e, r, r += t));
        return n
    };
    var H = function (e, t, n, r, i) {
        if (!(r instanceof t)) return e.apply(n, i);
        var o = y(e.prototype), a = e.apply(o, i);
        return d.isObject(a) ? a : o
    };
    d.bind = v(function (e, t, n) {
        if (!d.isFunction(e)) throw new TypeError("Bind must be called on a function");
        var r = v(function (i) {
            return H(e, r, t, this, n.concat(i))
        });
        return r
    }), d.partial = v(function (e, t) {
        var n = d.partial.placeholder, r = function () {
            for (var i = 0, o = t.length, a = Array(o), u = 0; o > u; u++) a[u] = t[u] === n ? arguments[i++] : t[u];
            for (; i < arguments.length;) a.push(arguments[i++]);
            return H(e, r, this, this, a)
        };
        return r
    }), d.partial.placeholder = d, d.bindAll = v(function (e, t) {
        t = T(t, !1, !1);
        var n = t.length;
        if (1 > n) throw new Error("bindAll must be passed function names");
        for (; n--;) {
            var r = t[n];
            e[r] = d.bind(e[r], e)
        }
    }), d.memoize = function (e, t) {
        var n = function (r) {
            var i = n.cache, o = "" + (t ? t.apply(this, arguments) : r);
            return d.has(i, o) || (i[o] = e.apply(this, arguments)), i[o]
        };
        return n.cache = {}, n
    }, d.delay = v(function (e, t, n) {
        return setTimeout(function () {
            return e.apply(null, n)
        }, t)
    }), d.defer = d.partial(d.delay, d, 1), d.throttle = function (e, t, n) {
        var r, i, o, a, u = 0;
        n || (n = {});
        var s = function () {
            u = n.leading === !1 ? 0 : d.now(), r = null, a = e.apply(i, o), r || (i = o = null)
        }, c = function () {
            var c = d.now();
            u || n.leading !== !1 || (u = c);
            var l = t - (c - u);
            return i = this, o = arguments, 0 >= l || l > t ? (r && (clearTimeout(r), r = null), u = c, a = e.apply(i, o), r || (i = o = null)) : r || n.trailing === !1 || (r = setTimeout(s, l)), a
        };
        return c.cancel = function () {
            clearTimeout(r), u = 0, r = i = o = null
        }, c
    }, d.debounce = function (e, t, n) {
        var r, i, o = function (t, n) {
            r = null, n && (i = e.apply(t, n))
        }, a = v(function (a) {
            if (r && clearTimeout(r), n) {
                var u = !r;
                r = setTimeout(o, t), u && (i = e.apply(this, a))
            } else r = d.delay(o, t, this, a);
            return i
        });
        return a.cancel = function () {
            clearTimeout(r), r = null
        }, a
    }, d.wrap = function (e, t) {
        return d.partial(t, e)
    }, d.negate = function (e) {
        return function () {
            return !e.apply(this, arguments)
        }
    }, d.compose = function () {
        var e = arguments, t = e.length - 1;
        return function () {
            for (var n = t, r = e[t].apply(this, arguments); n--;) r = e[n].call(this, r);
            return r
        }
    }, d.after = function (e, t) {
        return function () {
            return --e < 1 ? t.apply(this, arguments) : void 0
        }
    }, d.before = function (e, t) {
        var n;
        return function () {
            return --e > 0 && (n = t.apply(this, arguments)), 1 >= e && (t = null), n
        }
    }, d.once = d.partial(d.before, 2), d.restArgs = v;
    var S = !{toString: null}.propertyIsEnumerable("toString"),
        q = ["valueOf", "isPrototypeOf", "toString", "propertyIsEnumerable", "hasOwnProperty", "toLocaleString"],
        M = function (e, t) {
            var n = q.length, i = e.constructor, o = d.isFunction(i) && i.prototype || r, a = "constructor";
            for (d.has(e, a) && !d.contains(t, a) && t.push(a); n--;) a = q[n], a in e && e[a] !== o[a] && !d.contains(t, a) && t.push(a)
        };
    d.keys = function (e) {
        if (!d.isObject(e)) return [];
        if (l) return l(e);
        var t = [];
        for (var n in e) d.has(e, n) && t.push(n);
        return S && M(e, t), t
    }, d.allKeys = function (e) {
        if (!d.isObject(e)) return [];
        var t = [];
        for (var n in e) t.push(n);
        return S && M(e, t), t
    }, d.values = function (e) {
        for (var t = d.keys(e), n = t.length, r = Array(n), i = 0; n > i; i++) r[i] = e[t[i]];
        return r
    }, d.mapObject = function (e, t, n) {
        t = g(t, n);
        for (var r = d.keys(e), i = r.length, o = {}, a = 0; i > a; a++) {
            var u = r[a];
            o[u] = t(e[u], u, e)
        }
        return o
    }, d.pairs = function (e) {
        for (var t = d.keys(e), n = t.length, r = Array(n), i = 0; n > i; i++) r[i] = [t[i], e[t[i]]];
        return r
    }, d.invert = function (e) {
        for (var t = {}, n = d.keys(e), r = 0, i = n.length; i > r; r++) t[e[n[r]]] = n[r];
        return t
    }, d.functions = d.methods = function (e) {
        var t = [];
        for (var n in e) d.isFunction(e[n]) && t.push(n);
        return t.sort()
    };
    var O = function (e, t) {
        return function (n) {
            var r = arguments.length;
            if (t && (n = Object(n)), 2 > r || null == n) return n;
            for (var i = 1; r > i; i++) for (var o = arguments[i], a = e(o), u = a.length, s = 0; u > s; s++) {
                var c = a[s];
                t && void 0 !== n[c] || (n[c] = o[c])
            }
            return n
        }
    };
    d.extend = O(d.allKeys), d.extendOwn = d.assign = O(d.keys), d.findKey = function (e, t, n) {
        t = g(t, n);
        for (var r, i = d.keys(e), o = 0, a = i.length; a > o; o++) if (r = i[o], t(e[r], r, e)) return r
    };
    var L = function (e, t, n) {
        return t in n
    };
    d.pick = v(function (e, t) {
        var n = {}, r = t[0];
        if (null == e) return n;
        d.isFunction(r) ? (t.length > 1 && (r = h(r, t[1])), t = d.allKeys(e)) : (r = L, t = T(t, !1, !1), e = Object(e));
        for (var i = 0, o = t.length; o > i; i++) {
            var a = t[i], u = e[a];
            r(u, a, e) && (n[a] = u)
        }
        return n
    }), d.omit = v(function (e, t) {
        var n, r = t[0];
        return d.isFunction(r) ? (r = d.negate(r), t.length > 1 && (n = t[1])) : (t = d.map(T(t, !1, !1), String), r = function (e, n) {
            return !d.contains(t, n)
        }), d.pick(e, r, n)
    }), d.defaults = O(d.allKeys, !0), d.create = function (e, t) {
        var n = y(e);
        return t && d.extendOwn(n, t), n
    }, d.clone = function (e) {
        return d.isObject(e) ? d.isArray(e) ? e.slice() : d.extend({}, e) : e
    }, d.tap = function (e, t) {
        return t(e), e
    }, d.isMatch = function (e, t) {
        var n = d.keys(t), r = n.length;
        if (null == e) return !r;
        for (var i = Object(e), o = 0; r > o; o++) {
            var a = n[o];
            if (t[a] !== i[a] || !(a in i)) return !1
        }
        return !0
    };
    var R, N;
    R = function (e, t, n, r) {
        if (e === t) return 0 !== e || 1 / e === 1 / t;
        if (null == e || null == t) return e === t;
        if (e !== e) return t !== t;
        var i = typeof e;
        return "function" !== i && "object" !== i && "object" != typeof t ? !1 : N(e, t, n, r)
    }, N = function (e, t, n, r) {
        e instanceof d && (e = e._wrapped), t instanceof d && (t = t._wrapped);
        var o = u.call(e);
        if (o !== u.call(t)) return !1;
        switch (o) {
            case"[object RegExp]":
            case"[object String]":
                return "" + e == "" + t;
            case"[object Number]":
                return +e !== +e ? +t !== +t : 0 === +e ? 1 / +e === 1 / t : +e === +t;
            case"[object Date]":
            case"[object Boolean]":
                return +e === +t;
            case"[object Symbol]":
                return i.valueOf.call(e) === i.valueOf.call(t)
        }
        var a = "[object Array]" === o;
        if (!a) {
            if ("object" != typeof e || "object" != typeof t) return !1;
            var s = e.constructor, c = t.constructor;
            if (s !== c && !(d.isFunction(s) && s instanceof s && d.isFunction(c) && c instanceof c) && "constructor" in e && "constructor" in t) return !1
        }
        n = n || [], r = r || [];
        for (var l = n.length; l--;) if (n[l] === e) return r[l] === t;
        if (n.push(e), r.push(t), a) {
            if (l = e.length, l !== t.length) return !1;
            for (; l--;) if (!R(e[l], t[l], n, r)) return !1
        } else {
            var f, p = d.keys(e);
            if (l = p.length, d.keys(t).length !== l) return !1;
            for (; l--;) if (f = p[l], !d.has(t, f) || !R(e[f], t[f], n, r)) return !1
        }
        return n.pop(), r.pop(), !0
    }, d.isEqual = function (e, t) {
        return R(e, t)
    }, d.isEmpty = function (e) {
        return null == e ? !0 : x(e) && (d.isArray(e) || d.isString(e) || d.isArguments(e)) ? 0 === e.length : 0 === d.keys(e).length
    }, d.isElement = function (e) {
        return !(!e || 1 !== e.nodeType)
    }, d.isArray = c || function (e) {
        return "[object Array]" === u.call(e)
    }, d.isObject = function (e) {
        var t = typeof e;
        return "function" === t || "object" === t && !!e
    }, d.each(["Arguments", "Function", "String", "Number", "Date", "RegExp", "Error", "Symbol", "Map", "WeakMap", "Set", "WeakSet"], function (e) {
        d["is" + e] = function (t) {
            return u.call(t) === "[object " + e + "]"
        }
    }), d.isArguments(arguments) || (d.isArguments = function (e) {
        return d.has(e, "callee")
    });
    var F = e.document && e.document.childNodes;
    "function" != typeof /./ && "object" != typeof Int8Array && "function" != typeof F && (d.isFunction = function (e) {
        return "function" == typeof e || !1
    }), d.isFinite = function (e) {
        return !d.isSymbol(e) && isFinite(e) && !isNaN(parseFloat(e))
    }, d.isNaN = function (e) {
        return d.isNumber(e) && isNaN(e)
    }, d.isBoolean = function (e) {
        return e === !0 || e === !1 || "[object Boolean]" === u.call(e)
    }, d.isNull = function (e) {
        return null === e
    }, d.isUndefined = function (e) {
        return void 0 === e
    }, d.has = function (e, t) {
        return null != e && s.call(e, t)
    }, d.noConflict = function () {
        return e._ = t, this
    }, d.identity = function (e) {
        return e
    }, d.constant = function (e) {
        return function () {
            return e
        }
    }, d.noop = function () {
    }, d.property = b, d.propertyOf = function (e) {
        return null == e ? function () {
        } : function (t) {
            return e[t]
        }
    }, d.matcher = d.matches = function (e) {
        return e = d.extendOwn({}, e), function (t) {
            return d.isMatch(t, e)
        }
    }, d.times = function (e, t, n) {
        var r = Array(Math.max(0, e));
        t = h(t, n, 1);
        for (var i = 0; e > i; i++) r[i] = t(i);
        return r
    }, d.random = function (e, t) {
        return null == t && (t = e, e = 0), e + Math.floor(Math.random() * (t - e + 1))
    }, d.now = Date.now || function () {
        return (new Date).getTime()
    };
    var P = {"&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#x27;", "'": "&#39;", "`": "&#x60;"},
        B = d.invert(P), D = function (e) {
            var t = function (t) {
                return e[t]
            }, n = "(?:" + d.keys(e).join("|") + ")", r = RegExp(n), i = RegExp(n, "g");
            return function (e) {
                return e = null == e ? "" : "" + e, r.test(e) ? e.replace(i, t) : e
            }
        };
    d.escape = D(P), d.unescape = D(B), d.result = function (e, t, n) {
        var r = null == e ? void 0 : e[t];
        return void 0 === r && (r = n), d.isFunction(r) ? r.call(e) : r
    };
    var I = 0;
    d.uniqueId = function (e) {
        var t = ++I + "";
        return e ? e + t : t
    }, d.templateSettings = {evaluate: /<%([\s\S]+?)%>/g, interpolate: /<%=([\s\S]+?)%>/g, escape: /<%-([\s\S]+?)%>/g};
    var W = /(.)^/, z = {"'": "'", "\\": "\\", "\r": "r", "\n": "n", "\u2028": "u2028", "\u2029": "u2029"},
        X = /\\|'|\r|\n|\u2028|\u2029/g, $ = function (e) {
            return "\\" + z[e]
        };
    d.template = function (e, t, n) {
        !t && n && (t = n), t = d.defaults({}, t, d.templateSettings);
        var r = RegExp([(t.escape || W).source, (t.interpolate || W).source, (t.evaluate || W).source].join("|") + "|$", "g"),
            i = 0, o = "__p+='";
        e.replace(r, function (t, n, r, a, u) {
            return o += e.slice(i, u).replace(X, $), i = u + t.length, n ? o += "'+\n((__t=(" + n + "))==null?'':_.escape(__t))+\n'" : r ? o += "'+\n((__t=(" + r + "))==null?'':__t)+\n'" : a && (o += "';\n" + a + "\n__p+='"), t
        }), o += "';\n", t.variable || (o = "with(obj||{}){\n" + o + "}\n"), o = "var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};\n" + o + "return __p;\n";
        var a;
        try {
            a = new Function(t.variable || "obj", "_", o)
        } catch (u) {
            throw u.source = o, u
        }
        var s = function (e) {
            return a.call(this, e, d)
        }, c = t.variable || "obj";
        return s.source = "function(" + c + "){\n" + o + "}", s
    }, d.chain = function (e) {
        var t = d(e);
        return t._chain = !0, t
    };
    var V = function (e, t) {
        return e._chain ? d(t).chain() : t
    };
    d.mixin = function (e) {
        return d.each(d.functions(e), function (t) {
            var n = d[t] = e[t];
            d.prototype[t] = function () {
                var e = [this._wrapped];
                return o.apply(e, arguments), V(this, n.apply(d, e))
            }
        }), d
    }, d.mixin(d), d.each(["pop", "push", "reverse", "shift", "sort", "splice", "unshift"], function (e) {
        var t = n[e];
        d.prototype[e] = function () {
            var n = this._wrapped;
            return t.apply(n, arguments), "shift" !== e && "splice" !== e || 0 !== n.length || delete n[0], V(this, n)
        }
    }), d.each(["concat", "join", "slice"], function (e) {
        var t = n[e];
        d.prototype[e] = function () {
            return V(this, t.apply(this._wrapped, arguments))
        }
    }), d.prototype.value = function () {
        return this._wrapped
    }, d.prototype.valueOf = d.prototype.toJSON = d.prototype.value, d.prototype.toString = function () {
        return String(this._wrapped)
    }, "function" == typeof define && define.amd && define("static/js/lib/underscore", ["require"], function () {
        return d
    })
}();
var utils = {
    getEvent: function (e) {
        return e || window.event
    }, getTarget: function (e) {
        return e.target || e.srcElement
    }, getAttribute: function (e, t) {
        if (!e) return "";
        var n = e.getAttribute(t);
        return n ? n : ""
    }, setAttribute: function (e, t, n) {
        e && e.setAttribute(t, n)
    }, on: function (e, t, n) {
        if (e.addEventListener) return e.addEventListener(t, n, !1), n;
        if (e.attachEvent) {
            var r = function () {
                var t = window.event;
                t.target = t.srcElement, n.call(e, t)
            };
            return e.attachEvent("on" + t, r), r
        }
    }, off: function (e, t, n) {
        e.removeEventListener ? e.removeEventListener(t, n, !1) : e.detachEvent && e.detachEvent("on" + t, n)
    }, preventDefault: function (e) {
        e.preventDefault ? e.preventDefault() : "returnValue" in e && (e.returnValue = !1)
    }, stopPropagation: function (e) {
        e.stopPropagation ? e.stopPropagation() : "cancelBubble" in e && (e.cancelBubble = !0)
    }, getChar: function (e) {
        return null == e.which ? String.fromCharCode(e.keyCode) : 0 != e.which && 0 != e.charCode ? String.fromCharCode(e.which) : null
    }, getKeyCode: function (e) {
        return e.which || e.keyCode
    }, offset: function (e) {
        for (var t = 0, n = 0, r = e; null != r && r != document.body;) t += r.offsetLeft, n += r.offsetTop, r = r.offsetParent;
        return {left: t, top: n}
    }, scrollTop: function () {
        return "undefined" != typeof window.pageYOffset ? window.pageYOffset : document.documentElement.scrollTop ? document.documentElement.scrollTop : document.body.scrollTop ? document.body.scrollTop : 0
    }, setStyle: function (e, t, n) {
        e.style.cssText += ";" + (t + ":" + n)
    }, getElementsByClassName: function (e, t) {
        if (document.getElementsByClassName) return document.getElementsByClassName(t);
        for (var n = [], r = new RegExp("(^| )" + t + "( |$)"), i = e.getElementsByTagName("*"), o = 0, a = i.length; a > o; o++) r.test(i[o].className) && n.push(i[o]);
        return n
    }, hasClass: function (e, t) {
        return t = t || "", 0 == t.replace(/\s/g, "").length ? !1 : new RegExp(" " + t + " ").test(" " + e.className + " ")
    }, addClass: function (e, t) {
        this.hasClass(e, t) || (e.className = "" == e.className ? t : e.className + " " + t)
    }, removeClass: function (e, t) {
        if (this.hasClass(e, t)) {
            for (var n = " " + e.className.replace(/[\t\r\n]/g, "") + " "; n.indexOf(" " + t + " ") >= 0;) n = n.replace(" " + t + " ", " ");
            e.className = n.replace(/^\s+|\s+$/g, "")
        }
    }, toggleClass: function (e, t) {
        this.hasClass(e, t) ? this.removeClass(e, t) : this.addClass(e, t)
    }, getWinSize: function () {
        return window.innerHeight && window.innerWidth ? {
            winWidth: window.innerWidth,
            winHeight: window.innerHeight
        } : document.documentElement && document.documentElement.clientHeight && document.documentElement.clientWidth ? {
            winWidth: document.documentElement.clientWidth,
            winHeight: document.documentElement.clientHeight
        } : void 0
    }, isAllInView: function (e) {
        var t = e.getBoundingClientRect(), n = this.getWinSize();
        return t.top >= 0 && t.left >= 0 && t.bottom <= n.winHeight && t.right <= n.winWidth
    }, isContentInView: function (e, t) {
        var n = e.getBoundingClientRect(), r = this.getWinSize(), t = t || 0;
        return n.top + t < r.winHeight && n.bottom > t
    }, some: function (e, t) {
        for (var n = 0, r = e.length; r > n; n++) if (t(e[n], n)) return !0;
        return !1
    }, hasProp: function (e) {
        var t = document.createElement("div");
        return this.some(e, function (e) {
            return void 0 !== t.style[e]
        })
    }, cssAnimationSupport: function () {
        var e = this.hasProp(["perspectiveProperty", "WebkitPerspective", "MozPerspective", "OPerspective", "msPerspective"]),
            t = this.hasProp(["transformProperty", "WebkitTransform", "MozTransform", "OTransform", "msTransform"]),
            n = this.hasProp(["transitionProperty", "WebkitTransitionProperty", "MozTransitionProperty", "OTransitionProperty", "msTransitionProperty"]);
        return (e || t) && n
    }, isIE: function () {
        var e = document.createElement("b");
        return e.innerHTML = "<!--[if IE]><i></i><![endif]-->", 1 === e.getElementsByTagName("i").length
    }, isFileSupport: function () {
        return !(!window.FormData || !File)
    }, timeAgo: function (e) {
        "object" != typeof e && (e = new Date(1e3 * e));
        var t, n = Math.floor((new Date - e) / 1e3), r = Math.floor(n / 31536e3);
        return r >= 1 ? t = "年" : (r = Math.floor(n / 2592e3), r >= 1 ? t = "月" : (r = Math.floor(n / 86400), r >= 1 ? t = "天" : (r = Math.floor(n / 3600), r >= 1 ? t = "小时" : (r = Math.floor(n / 60), r >= 1 ? t = "分钟" : (r = n, t = "秒"))))), "秒" === t ? "刚刚" : r + t + "前"
    }, numFormat: function (e, t, n) {
        var e = +e, t = void 0 === t ? 0 : t, n = "en" === n ? "w" : "万", r = 1e4;
        return "[object Number]" === Object.prototype.toString.call(e) ? r > e ? e : r * r > e ? (e / r).toFixed(t) + n : (e / (r * r)).toFixed(t) + "亿" : 0
    }, numCutByComma: function (e) {
        return "[object Number]" === Object.prototype.toString.call(+e) ? (e + "").split("").reverse().join("").replace(/(\d{3})(?=[^$])/g, "$1,").split("").reverse().join("") : void 0
    }, getSearchParams: function () {
        for (var e = location.search.slice(1), t = {}, n = e.split("&"), r = 0, i = n.length; i > r; r++) {
            var o, a = n[r];
            "" !== a.replace(/^\s+|\s+$/g, "") && (o = a.split("="), t[o[0]] = o[1])
        }
        return t
    }, getHashValue: function (e) {
        var t, n = window.location.hash;
        return n ? (t = n.split("="), t[0] == e ? t[1] : "") : ""
    }, generateRandomAlphaNum: function (e) {
        for (var t = ""; t.length < e; t += Math.random().toString(36).substr(2)) ;
        return t.substr(0, e)
    }, highlightText: function (e, t) {
        for (var n, r, i = t && t.length || 0; i && (n = t[--i], !(r && r[0] <= n[0] + n[1] - 1));) r = n, e = e.slice(0, n[0]) + '<em class="highlight">' + e.slice(n[0], n[0] + n[1]) + "</em>" + e.slice(n[0] + n[1]);
        return e || ""
    }, loadScript: function (e, t, n) {
        var r = document.createElement("script");
        r.src = e, r.crossOrigin = "anonymous", r.onload = function () {
            t && t.call()
        }, r.onerror = function () {
            n && n.call()
        }, document.body.appendChild(r)
    }
};
!function (e) {
    "use strict";

    function t(e, t) {
        var n = (65535 & e) + (65535 & t), r = (e >> 16) + (t >> 16) + (n >> 16);
        return r << 16 | 65535 & n
    }

    function n(e, t) {
        return e << t | e >>> 32 - t
    }

    function r(e, r, i, o, a, u) {
        return t(n(t(t(r, e), t(o, u)), a), i)
    }

    function i(e, t, n, i, o, a, u) {
        return r(t & n | ~t & i, e, t, o, a, u)
    }

    function o(e, t, n, i, o, a, u) {
        return r(t & i | n & ~i, e, t, o, a, u)
    }

    function a(e, t, n, i, o, a, u) {
        return r(t ^ n ^ i, e, t, o, a, u)
    }

    function u(e, t, n, i, o, a, u) {
        return r(n ^ (t | ~i), e, t, o, a, u)
    }

    function s(e, n) {
        e[n >> 5] |= 128 << n % 32, e[(n + 64 >>> 9 << 4) + 14] = n;
        var r, s, c, l, f, p = 1732584193, d = -271733879, m = -1732584194, h = 271733878;
        for (r = 0; r < e.length; r += 16) s = p, c = d, l = m, f = h, p = i(p, d, m, h, e[r], 7, -680876936), h = i(h, p, d, m, e[r + 1], 12, -389564586), m = i(m, h, p, d, e[r + 2], 17, 606105819), d = i(d, m, h, p, e[r + 3], 22, -1044525330), p = i(p, d, m, h, e[r + 4], 7, -176418897), h = i(h, p, d, m, e[r + 5], 12, 1200080426), m = i(m, h, p, d, e[r + 6], 17, -1473231341), d = i(d, m, h, p, e[r + 7], 22, -45705983), p = i(p, d, m, h, e[r + 8], 7, 1770035416), h = i(h, p, d, m, e[r + 9], 12, -1958414417), m = i(m, h, p, d, e[r + 10], 17, -42063), d = i(d, m, h, p, e[r + 11], 22, -1990404162), p = i(p, d, m, h, e[r + 12], 7, 1804603682), h = i(h, p, d, m, e[r + 13], 12, -40341101), m = i(m, h, p, d, e[r + 14], 17, -1502002290), d = i(d, m, h, p, e[r + 15], 22, 1236535329), p = o(p, d, m, h, e[r + 1], 5, -165796510), h = o(h, p, d, m, e[r + 6], 9, -1069501632), m = o(m, h, p, d, e[r + 11], 14, 643717713), d = o(d, m, h, p, e[r], 20, -373897302), p = o(p, d, m, h, e[r + 5], 5, -701558691), h = o(h, p, d, m, e[r + 10], 9, 38016083), m = o(m, h, p, d, e[r + 15], 14, -660478335), d = o(d, m, h, p, e[r + 4], 20, -405537848), p = o(p, d, m, h, e[r + 9], 5, 568446438), h = o(h, p, d, m, e[r + 14], 9, -1019803690), m = o(m, h, p, d, e[r + 3], 14, -187363961), d = o(d, m, h, p, e[r + 8], 20, 1163531501), p = o(p, d, m, h, e[r + 13], 5, -1444681467), h = o(h, p, d, m, e[r + 2], 9, -51403784), m = o(m, h, p, d, e[r + 7], 14, 1735328473), d = o(d, m, h, p, e[r + 12], 20, -1926607734), p = a(p, d, m, h, e[r + 5], 4, -378558), h = a(h, p, d, m, e[r + 8], 11, -2022574463), m = a(m, h, p, d, e[r + 11], 16, 1839030562), d = a(d, m, h, p, e[r + 14], 23, -35309556), p = a(p, d, m, h, e[r + 1], 4, -1530992060), h = a(h, p, d, m, e[r + 4], 11, 1272893353), m = a(m, h, p, d, e[r + 7], 16, -155497632), d = a(d, m, h, p, e[r + 10], 23, -1094730640), p = a(p, d, m, h, e[r + 13], 4, 681279174), h = a(h, p, d, m, e[r], 11, -358537222), m = a(m, h, p, d, e[r + 3], 16, -722521979), d = a(d, m, h, p, e[r + 6], 23, 76029189), p = a(p, d, m, h, e[r + 9], 4, -640364487), h = a(h, p, d, m, e[r + 12], 11, -421815835), m = a(m, h, p, d, e[r + 15], 16, 530742520), d = a(d, m, h, p, e[r + 2], 23, -995338651), p = u(p, d, m, h, e[r], 6, -198630844), h = u(h, p, d, m, e[r + 7], 10, 1126891415), m = u(m, h, p, d, e[r + 14], 15, -1416354905), d = u(d, m, h, p, e[r + 5], 21, -57434055), p = u(p, d, m, h, e[r + 12], 6, 1700485571), h = u(h, p, d, m, e[r + 3], 10, -1894986606), m = u(m, h, p, d, e[r + 10], 15, -1051523), d = u(d, m, h, p, e[r + 1], 21, -2054922799), p = u(p, d, m, h, e[r + 8], 6, 1873313359), h = u(h, p, d, m, e[r + 15], 10, -30611744), m = u(m, h, p, d, e[r + 6], 15, -1560198380), d = u(d, m, h, p, e[r + 13], 21, 1309151649), p = u(p, d, m, h, e[r + 4], 6, -145523070), h = u(h, p, d, m, e[r + 11], 10, -1120210379), m = u(m, h, p, d, e[r + 2], 15, 718787259), d = u(d, m, h, p, e[r + 9], 21, -343485551), p = t(p, s), d = t(d, c), m = t(m, l), h = t(h, f);
        return [p, d, m, h]
    }

    function c(e) {
        var t, n = "";
        for (t = 0; t < 32 * e.length; t += 8) n += String.fromCharCode(e[t >> 5] >>> t % 32 & 255);
        return n
    }

    function l(e) {
        var t, n = [];
        for (n[(e.length >> 2) - 1] = void 0, t = 0; t < n.length; t += 1) n[t] = 0;
        for (t = 0; t < 8 * e.length; t += 8) n[t >> 5] |= (255 & e.charCodeAt(t / 8)) << t % 32;
        return n
    }

    function f(e) {
        return c(s(l(e), 8 * e.length))
    }

    function p(e, t) {
        var n, r, i = l(e), o = [], a = [];
        for (o[15] = a[15] = void 0, i.length > 16 && (i = s(i, 8 * e.length)), n = 0; 16 > n; n += 1) o[n] = 909522486 ^ i[n], a[n] = 1549556828 ^ i[n];
        return r = s(o.concat(l(t)), 512 + 8 * t.length), c(s(a.concat(r), 640))
    }

    function d(e) {
        var t, n, r = "0123456789abcdef", i = "";
        for (n = 0; n < e.length; n += 1) t = e.charCodeAt(n), i += r.charAt(t >>> 4 & 15) + r.charAt(15 & t);
        return i
    }

    function m(e) {
        return unescape(encodeURIComponent(e))
    }

    function h(e) {
        return f(m(e))
    }

    function g(e) {
        return d(h(e))
    }

    function v(e, t) {
        return p(m(e), m(t))
    }

    function y(e, t) {
        return d(v(e, t))
    }

    function b(e, t, n) {
        return t ? n ? v(t, e) : y(t, e) : n ? h(e) : g(e)
    }

    "function" == typeof define && define.amd ? define("static/js/lib/md5", ["require"], function () {
        return b
    }) : "object" == typeof module && module.exports ? module.exports = b : e.md5 = b
}(this), !function (e) {
    var t = {};
    t.getHoney = function () {
        var e = Math.floor((new Date).getTime() / 1e3), t = e.toString(16).toUpperCase(),
            n = md5(e).toString().toUpperCase();
        if (8 != t.length) return {as: "479BB4B7254C150", cp: "7E0AC8874BB0985"};
        for (var r = n.slice(0, 5), i = n.slice(-5), o = "", a = 0; 5 > a; a++) o += r[a] + t[a];
        for (var u = "", s = 0; 5 > s; s++) u += t[s + 3] + i[s];
        return {as: "A1" + o + t.slice(-3), cp: t.slice(0, 3) + u + "E1"}
    }, e.ascp = t
}(window, document), !function (e, t) {
    function n(e) {
        var n, r = new RegExp("(^| )" + e + "=([^;]*)(;|$)");
        return (n = t.cookie.match(r)) ? unescape(n[2]) : null
    }

    function r() {
        return (new Date).getTime()
    }

    function i(e, t, n) {
        var i, o, a, u, s = 0;
        n || (n = {});
        var c = function () {
            s = n.leading === !1 ? 0 : r(), i = null, u = e.apply(o, a), i || (o = a = null)
        }, l = function () {
            var l = r();
            s || n.leading !== !1 || (s = l);
            var f = t - (l - s);
            return o = this, a = arguments, 0 >= f || f > t ? (i && (clearTimeout(i), i = null), s = l, u = e.apply(o, a), i || (o = a = null)) : i || n.trailing === !1 || (i = setTimeout(c, f)), u
        };
        return l.cancel = function () {
            clearTimeout(i), s = 0, i = o = a = null
        }, l
    }

    function o(e, t, n) {
        if (e.addEventListener) return e.addEventListener(t, n, !1), n;
        if (e.attachEvent) {
            var r = function () {
                var t = window.event;
                t.target = t.srcElement, n.call(e, t)
            };
            return e.attachEvent("on" + t, r), r
        }
    }

    function a(e, t) {
        if (!e) return "";
        var n = e.getAttribute(t);
        return n ? n : ""
    }

    function u(e, t, n) {
        e && e.setAttribute(t, n)
    }

    function s() {
        return window.innerHeight && window.innerWidth ? {
            winWidth: window.innerWidth,
            winHeight: window.innerHeight
        } : document.documentElement && document.documentElement.clientHeight && document.documentElement.clientWidth ? {
            winWidth: document.documentElement.clientWidth,
            winHeight: document.documentElement.clientHeight
        } : void 0
    }

    function c(e) {
        var t = e.getBoundingClientRect();
        return t.top + 16 < v.winHeight && t.bottom > 16
    }

    function l(e) {
        var t = XMLHttpRequest ? new XMLHttpRequest : new ActiveXObject("Microsoft.XMLHTTP"),
            n = (e.type || "get").toUpperCase(), r = e.url, i = e.data;
        if (r) {
            var o = [];
            for (var a in i) o.push(a + "=" + i[a]);
            "GET" === n ? (r = r + "?" + o.join("&") + "&_=" + Math.random(), t.open(n, r, !0), t.send()) : (t.open(n, r, !0), t.setRequestHeader("X-Requested-With", "XMLHttpRequest"), t.setRequestHeader("Content-type", "application/x-www-form-urlencoded"), t.send(o.join("&"))), t.onload = function () {
                (t.status >= 200 && t.status < 300 || 304 == t.status) && e.success && e.success.call(t, t.responseText)
            }
        }
    }

    function f(e) {
        l({
            url: h,
            type: "POST",
            data: {
                value: e.value,
                tag: "embeded_ad",
                label: e.label,
                is_ad_event: "1",
                log_extra: e.extra,
                category: "web",
                utm_source: n("utm_source"),
                csrfmiddlewaretoken: n("csrftoken")
            },
            success: function () {
            }
        }), taAnalysis && taAnalysis.send("event", {ev: "feed_ad_" + e.label})
    }

    function p(e) {
        var t = new Image;
        t.src = e
    }

    function d() {
        for (var e, t = 0, n = g.length; n > t; t++) {
            var r = g[t];
            c(r) ? 1 != a(r, "ad_show") && (u(r, "ad_show", 1), e = {
                value: a(r, "ad_id"),
                extra: a(r, "ad_extra") || m(r),
                label: "show",
                track: a(r, "ad_track")
            }, e.track && p(e.track), f(e)) : u(r, "ad_show", 0)
        }
    }

    function m(e) {
        if (!e) return "";
        var t = e.querySelectorAll("#ad_extra")[0];
        return t.innerText || ""
    }

    var h = "/action_log/", g = [], v = s(), y = {};
    y.setAds = function (e) {
        g = e, d()
    }, y.sendMsg = function (e) {
        f(e)
    }, o(e, "scroll", i(function () {
        d()
    }, 150)), o(e, "resize", i(function () {
        v = s()
    }, 150)), e.tAdMonitor = y
}(window, document), !function (e, t) {
    function n(e) {
        var t = o("__tasessionId");
        return t ? t && e && (a("__tasessionId", t, {expires: 1800}), l = !1) : (c = (new Date).getTime(), t = "" + r(9) + (new Date).getTime(), a("__tasessionId", t, {expires: 1800}), l = !0), t
    }

    function r(e) {
        for (var t = ""; t.length < e; t += Math.random().toString(36).substr(2)) ;
        return t.substr(0, e)
    }

    function i(e) {
        for (var t, n, r = 1, i = arguments.length; i > r; r++) {
            t = arguments[r];
            for (n in t) Object.prototype.hasOwnProperty.call(t, n) && (e[n] = t[n])
        }
        return e
    }

    function o(e) {
        var n, r = new RegExp("(^| )" + e + "=([^;]*)(;|$)");
        return (n = t.cookie.match(r)) ? unescape(n[2]) : null
    }

    function a(e, n, r) {
        var o, a = {path: "/"};
        i(a, r), a.expires && (o = new Date, o.setTime(o.getTime() + 1e3 * r.expires)), t.cookie = [e, "=", escape(n), a.expires ? "; expires=" + o.toUTCString() : "", a.path ? "; path=" + a.path : "", a.domain ? "; domain=" + a.domain : "", a.secure ? "; secure" : ""].join("")
    }

    var u = {}, s = {}, c = (new Date).getTime(), l = !1;
    u.setup = function (e) {
        i(s, e)
    }, u.send = function (t, r) {
        var o = "//www.toutiao.com/api/article/user_log/?", a = [], u = {};
        if (i(u, s, r, {sid: n("event" === t), type: t}), "close" !== t || (u.st = (new Date).getTime() - c, !l)) {
            for (k in u) a.push(k + "=" + u[k]);
            a.push("t=" + (new Date).getTime()), e._ta_log_img_ = new Image, e._ta_log_img_.src = o + a.join("&")
        }
    }, e.onbeforeunload = function () {
        u.send("close", {})
    }, e.taAnalysis = u
}(window, document, void 0), riot.tag("loading", '<div if="{options.cssAnimation}" class="loading ball-pulse"> <div></div> <div></div> <div></div> <span>{options.msg}&sdot;&sdot;&sdot;</span> </div> <div if="{!options.cssAnimation}" class="loading loading-normal"> <img src="//s3b.pstatp.com/toutiao/resource/toutiao_web/static/style/image/loading_50c5e3e.gif" alt=""> <span>{options.msg}&sdot;&sdot;&sdot;</span> </div>', function (e) {
    var t = utils.cssAnimationSupport();
    this.options = {cssAnimation: t, msg: e.msg || "推荐中"}
}), riot.tag("relatedFeed", '<div class="relatedFeed"> <ul> <li class="item {J_add: item.ad_id} {item-hidden: item.honey} {item-hidden: item.ugc_data}" each="{item, i in opts.list}" ga_event="{item.article_genre}_item_click" ad_id="{item.ad_id}" ad_track="{item.ad_track_url}" onclick="{onItemClick}"> <span id="ad_extra" style="display:none;">{item.log_extra}</span> <div if="{!item.feedMsg}" class="item-inner y-box"> <div class="normal {rbox: item.single_mode} {no-image: !item.single_mode&&!item.has_gallery}"> <div class="rbox-inner"> <div class="title-box" ga_event="{item.article_genre}_title_click"> <a class="link title" href="{item.source_url}" target="_blank"> {item.title} </a> </div> <div if="{item.has_gallery}" class="img-list y-box" ga_event="{item.article_genre}_img_click"> <a each="{imgItem, j in item.image_list}" class="img-wrap" href="{item.source_url}" target="_blank"> <img riot-src="{imgItem.url}" alt=""> </a> <a if="{item.image_list.length < 4}" class="img-wrap" href="{item.source_url}" target="_blank"> <span class="add-info">查看详情&nbsp;<i class="y-icon icon-next-page"></i></span> </a> <span if="{!item.ad_id}" class="img-num">{item.gallary_image_count}图</span> </div> <div class="y-box footer"> <div class="y-left"> <div class="y-left" if="{!item.media_url}"> <a class="lbtn media-avatar avatar-bg-{parent.sourceFlag(item.source, i)}" href="/search/?keyword={item.source}" ga_event="{item.article_genre}_avatar_click" target="_blank">{parent.sourceHandle(item.source)}</a> <a class="lbtn source" href="//www.toutiao.com/search/?keyword={item.source}" ga_event="{item.article_genre}_name_click" target="_blank">&nbsp;{item.source}&nbsp;</a> </div> <div class="y-left" if="{item.media_url}"> <a class="lbtn media-avatar" ga_event="{item.article_genre}_avatar_click" href="{item.media_url}" target="_blank"> <img riot-src="{item.media_avatar_url}" alt=""> </a> <a class="lbtn source" ga_event="{item.article_genre}_name_click" href="{item.media_url}" target="_blank">&nbsp;{item.source}&nbsp;</a> </div> <a class="lbtn comment" ga_event="{item.article_genre}_comment_click" href="{item.source_url}/#comment_area" target="_blank">&sdot;&nbsp;{item.comments_count}评论&nbsp;</a> <span if="{item.timeago}" class="lbtn">&sdot;&nbsp;{item.timeago}</span> <span if="{item.is_related}" class="lbtn recommend">相关</span> <span if="{item.hot}" class="lbtn tag-hot">热</span> <span if="{item.ad_id}" class="lbtn recommend">{item.ad_label}</span> </div> <div class="y-right"> <span class="dislike" data-groupid="{item.group_id}" ga_event="{item.article_genre}_dislike_click" onclick="{onDislikeClick}"> 不感兴趣 <i class="y-icon icon-dislikenewfeed"></i> </span> </div> </div> </div> </div> <div if="{item.single_mode}" class="lbox" ga_event="{item.article_genre}_img_click"> <a class="img-wrap" href="{item.source_url}" target="_blank"> <img riot-src="{item.image_url}" alt=""> <i if="{item.has_video && item.video_duration_str}" class="ftype video"> <span>{item.video_duration_str}</span> </i> </a> </div> </div> </li> </ul> </div>', function (e) {
    var t = this, n = (e.abtype, {});
    this.onDislikeClick = function (e) {
        user.checkLogin({
            successCb: function () {
                t._dislike(e.item)
            }, errorCb: function () {
                window.trigger("login", {
                    successCb: function (n) {
                        window.trigger("userChange", n), t._dislike(e.item)
                    }
                })
            }
        })
    }.bind(this), this._dislike = function (n) {
        http({
            url: "/api/dislike/",
            data: {group_id: n.item.group_id, action: "dislike", app_name: "toutiao_web"},
            method: "post",
            success: function (r) {
                "success" === r.message && (e.list.splice(n.i, 1), t.update())
            }
        })
    }.bind(this), this.onItemClick = function (e) {
        var t = e.item.item;
        return t.ad_id && tAdMonitor && tAdMonitor.sendMsg({
            label: "click",
            value: t.ad_id,
            extra: t.log_extra
        }), t.is_diversion_page && taAnalysis && taAnalysis.send("event", {ev: "diversion_page_click"}), window.ba_event && "头条问答" == t.source && ba_event("Visit_Wenda", "From_Related"), !0
    }.bind(this), this.sourceFlag = function (e, t) {
        return (e = e.replace(/\s*/gi, "")) ? (void 0 === n[e] && (n[e] = t % 6), n[e]) : 0
    }.bind(this), this.sourceHandle = function (e) {
        return e = e.replace(/\s*/gi, ""), e ? e.slice(0, 1) : ""
    }.bind(this), this.on("updated", function () {
        if (tAdMonitor) {
            var e = document.querySelectorAll(".relatedFeed .J_add");
            e && tAdMonitor.setAds(e)
        }
    })
}), riot.tag("feedBox", '<div class="feedBox" name="feedbox"> <div class="tt-declare">以下内容由今日头条提供</div> <div class="tt-related-title">相关推荐</div> <div if="{options.isRefresh}" riot-tag="loading"></div> <div riot-tag="relatedFeed" list="{options.list}"></div> <div if="{options.isLoadmore}" riot-tag="loading"></div>  </div>', function (e) {
    function t() {
        var e = a.options.siblingList.length;
        e > 0 && (a.options.list = a.options.siblingList, i(), a.update()), 5 >= e && a.loadMoreClick()
    }

    function n(e, t) {
        if (!u) {
            u = !0;
            var n = r();
            http({
                url: s, method: "get", data: n, type: c, success: function (n) {
                    "success" === n.message && ("refresh" === e && (a.options.list = []), a.options.list = a.options.list.concat(n.data), i(), a.params.max_behot_time = n.next && n.next.max_behot_time || 0), u = !1, t && t(n), a.update()
                }
            })
        }
    }

    function r() {
        var e, t = ascp.getHoney(), n = "";
        return window.TAC && (n = TAC.sign(a.params.max_behot_time)), e = _.extend({}, a.params, {
            as: t.as,
            cp: t.cp,
            _signature: n
        })
    }

    function i() {
        for (var e = 0; e < a.options.list.length; e++) {
            var t = a.options.list[e];
            t.timeago = utils.timeAgo(t.behot_time)
        }
    }

    function o() {
        var e = a.feedbox, t = utils.offset(e).top;
        window.scrollTo(0, t - 20)
    }

    riot.observable(this);
    var a = this, u = !1, s = "/api/pc/feed/", c = "json";
    this.options = {
        siblingList: e.siblingList,
        list: [],
        isRefresh: !1,
        isLoadmore: !1
    }, this.params = {
        category: "__all__",
        utm_source: "toutiao",
        max_behot_time: 0,
        widen: 1
    }, this.on("mount", function () {
        e.group_id && (s = "//www.toutiao.com/api/article/related/", c = "jsonp", this.params.group_id = e.group_id), t(), !e.group_id && utils.on(window, "scroll", _.throttle(function () {
            var e = utils.scrollTop(), t = a.feedbox.clientHeight, n = utils.offset(a.feedbox).top,
                r = window.screen.height;
            600 > t + n - e - r && a.loadMoreClick()
        }, 350))
    }), window.on("feedTagChange", function (e) {
        a.params.category = e, a.params.max_behot_time = 0, o(), "__all__" === e ? t() : (a.options.isRefresh = !0, a.update(), n("refresh", function () {
            a.options.isRefresh = !1
        }))
    }), this.loadMoreClick = function () {
        a.options.isLoadmore = !0, a.update(), n("loadmore", function () {
            a.options.isLoadmore = !1
        })
    }.bind(this)
}), function () {
    taAnalysis && taAnalysis.setup({c: "diversion_page"}), taAnalysis && taAnalysis.send("pageview", {});
    var e = document.querySelector("body"), t = document.createElement("div"),
        n = utils.getSearchParams().tt_group_id || 0;
    e.style.cssText = "max-width: 660px; margin: 0 auto; background-color: #fff;", t.setAttribute("riot-tag", "feedBox"), e.appendChild(t), riot.observable(window), n && riot.mount("feedBox", {
        siblingList: [],
        group_id: n
    })
}(window, document);