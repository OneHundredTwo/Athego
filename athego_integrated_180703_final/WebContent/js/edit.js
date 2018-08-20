define("wishbeen/dispatch", [], function() {
    function t(t, e, i, n) {
        n = n || function() {
            return !0
        };
        for (var o = {
            context: e,
            handler: i,
            checkFun: n
        }, a = 0; a < s.length; a++)
            for (var r = 0; r < s[t].length; r++) {
                var l = s[t][r].context;
                l === e && 0
            }
        s[t] ? s[t].push(o) : s[t] = [o]
    }

    function e(t, e, i) {
        for (var n = s[t] || [], o = 0; o < n.length; o++) {
            var a = n[o];
            if (a.context == e)
                if (i) {
                    if (a.handler == i) return void n.splice(o, 1)
                } else n.splice(o, 1)
        }
    }

    function i(t) {
        var e = s[t];
        if (!e) return void 0;
        for (var i = Array.prototype.slice.call(arguments, 1), n = 0; n < e.length; n++) {
            var o = e[n];
            if (o.checkFun.apply(o.context, i)) var a = o.handler.apply(o.context, i);
            if (0 == a) return
        }
    }

    function n(t) {
        var e = s[t];
        if (!e) return void 0;
        for (var i = 0; i < e.length; i++) 0
    }
    var s = {};
    return {
        addEventHandler: t,
        removeEventHandler: e,
        dispatchEvent: i,
        debugEventHandler: n
    }
});
var dateFormat = function() {
    var t = /d{1,4}|m{1,4}|yy(?:yy)?|([HhMsTt])\1?|[LloSZ]|"[^"]*"|'[^']*'/g,
        e = /\b(?:[PMCEA][SDP]T|(?:Pacific|Mountain|Central|Eastern|Atlantic) (?:Standard|Daylight|Prevailing) Time|(?:GMT|UTC)(?:[-+]\d{4})?)\b/g,
        i = /[^-+\dA-Z]/g,
        n = function(t, e) {
            for (t = String(t), e = e || 2; t.length < e;) t = "0" + t;
            return t
        };
    return function(s, o, a) {
        var r = dateFormat;
        if (1 != arguments.length || "[object String]" != Object.prototype.toString.call(s) || /\d/.test(s) || (o = s, s = void 0), s = s ? new Date(s) : new Date, isNaN(s)) throw SyntaxError("invalid date");
        o = String(r.masks[o] || o || r.masks["default"]), "UTC:" == o.slice(0, 4) && (o = o.slice(4), a = !0);
        var l = a ? "getUTC" : "get",
            h = s[l + "Date"](),
            c = s[l + "Day"](),
            u = s[l + "Month"](),
            d = s[l + "FullYear"](),
            p = s[l + "Hours"](),
            f = s[l + "Minutes"](),
            m = s[l + "Seconds"](),
            g = s[l + "Milliseconds"](),
            v = a ? 0 : s.getTimezoneOffset(),
            b = {
                d: h,
                dd: n(h),
                ddd: r.i18n.dayNames[c],
                dddd: r.i18n.dayNames[c + 7],
                m: u + 1,
                mm: n(u + 1),
                mmm: r.i18n.monthNames[u],
                mmmm: r.i18n.monthNames[u + 12],
                yy: String(d).slice(2),
                yyyy: d,
                h: p % 12 || 12,
                hh: n(p % 12 || 12),
                H: p,
                HH: n(p),
                M: f,
                MM: n(f),
                s: m,
                ss: n(m),
                l: n(g, 3),
                L: n(g > 99 ? Math.round(g / 10) : g),
                t: 12 > p ? "a" : "p",
                tt: 12 > p ? "am" : "pm",
                T: 12 > p ? "A" : "P",
                TT: 12 > p ? "AM" : "PM",
                Z: a ? "UTC" : (String(s).match(e) || [""]).pop().replace(i, ""),
                o: (v > 0 ? "-" : "+") + n(100 * Math.floor(Math.abs(v) / 60) + Math.abs(v) % 60, 4),
                S: ["th", "st", "nd", "rd"][h % 10 > 3 ? 0 : (h % 100 - h % 10 != 10) * h % 10]
            };
        return o.replace(t, function(t) {
            return t in b ? b[t] : t.slice(1, t.length - 1)
        })
    }
}();
dateFormat.masks = {
    "default": "ddd mmm dd yyyy HH:MM:ss",
    shortDate: "m/d/yy",
    mediumDate: "mmm d, yyyy",
    longDate: "mmmm d, yyyy",
    fullDate: "dddd, mmmm d, yyyy",
    shortTime: "h:MM TT",
    mediumTime: "h:MM:ss TT",
    longTime: "h:MM:ss TT Z",
    isoDate: "yyyy-mm-dd",
    isoTime: "HH:MM:ss",
    isoDateTime: "yyyy-mm-dd'T'HH:MM:ss",
    isoUtcDateTime: "UTC:yyyy-mm-dd'T'HH:MM:ss'Z'"
}, dateFormat.i18n = {
    dayNames: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
    monthNames: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec", "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
}, Date.prototype.format = function(t, e) {
    return dateFormat(this, t, e)
}, define("vendor/dateFormat", function() {}),
    function(t, e) {
        "object" == typeof exports ? module.exports = exports = e() : "function" == typeof define && define.amd ? define("crypto-js", [], e) : t.CryptoJS = e()
    }(this, function() {
        var t = t || function(t, e) {
            var i = Object.create || function() {
                    function t() {}
                    return function(e) {
                        var i;
                        return t.prototype = e, i = new t, t.prototype = null, i
                    }
                }(),
                n = {},
                s = n.lib = {},
                o = s.Base = function() {
                    return {
                        extend: function(t) {
                            var e = i(this);
                            return t && e.mixIn(t), e.hasOwnProperty("init") && this.init !== e.init || (e.init = function() {
                                e.$super.init.apply(this, arguments)
                            }), e.init.prototype = e, e.$super = this, e
                        },
                        create: function() {
                            var t = this.extend();
                            return t.init.apply(t, arguments), t
                        },
                        init: function() {},
                        mixIn: function(t) {
                            for (var e in t) t.hasOwnProperty(e) && (this[e] = t[e]);
                            t.hasOwnProperty("toString") && (this.toString = t.toString)
                        },
                        clone: function() {
                            return this.init.prototype.extend(this)
                        }
                    }
                }(),
                a = s.WordArray = o.extend({
                    init: function(t, i) {
                        t = this.words = t || [], i != e ? this.sigBytes = i : this.sigBytes = 4 * t.length
                    },
                    toString: function(t) {
                        return (t || l).stringify(this)
                    },
                    concat: function(t) {
                        var e = this.words,
                            i = t.words,
                            n = this.sigBytes,
                            s = t.sigBytes;
                        if (this.clamp(), n % 4)
                            for (var o = 0; s > o; o++) {
                                var a = i[o >>> 2] >>> 24 - o % 4 * 8 & 255;
                                e[n + o >>> 2] |= a << 24 - (n + o) % 4 * 8
                            } else
                            for (var o = 0; s > o; o += 4) e[n + o >>> 2] = i[o >>> 2];
                        return this.sigBytes += s, this
                    },
                    clamp: function() {
                        var e = this.words,
                            i = this.sigBytes;
                        e[i >>> 2] &= 4294967295 << 32 - i % 4 * 8, e.length = t.ceil(i / 4)
                    },
                    clone: function() {
                        var t = o.clone.call(this);
                        return t.words = this.words.slice(0), t
                    },
                    random: function(e) {
                        for (var i, n = [], s = function(e) {
                            var e = e,
                                i = 987654321,
                                n = 4294967295;
                            return function() {
                                i = 36969 * (65535 & i) + (i >> 16) & n, e = 18e3 * (65535 & e) + (e >> 16) & n;
                                var s = (i << 16) + e & n;
                                return s /= 4294967296, s += .5, s * (t.random() > .5 ? 1 : -1)
                            }
                        }, o = 0; e > o; o += 4) {
                            var r = s(4294967296 * (i || t.random()));
                            i = 987654071 * r(), n.push(4294967296 * r() | 0)
                        }
                        return new a.init(n, e)
                    }
                }),
                r = n.enc = {},
                l = r.Hex = {
                    stringify: function(t) {
                        for (var e = t.words, i = t.sigBytes, n = [], s = 0; i > s; s++) {
                            var o = e[s >>> 2] >>> 24 - s % 4 * 8 & 255;
                            n.push((o >>> 4).toString(16)), n.push((15 & o).toString(16))
                        }
                        return n.join("")
                    },
                    parse: function(t) {
                        for (var e = t.length, i = [], n = 0; e > n; n += 2) i[n >>> 3] |= parseInt(t.substr(n, 2), 16) << 24 - n % 8 * 4;
                        return new a.init(i, e / 2)
                    }
                },
                h = r.Latin1 = {
                    stringify: function(t) {
                        for (var e = t.words, i = t.sigBytes, n = [], s = 0; i > s; s++) {
                            var o = e[s >>> 2] >>> 24 - s % 4 * 8 & 255;
                            n.push(String.fromCharCode(o))
                        }
                        return n.join("")
                    },
                    parse: function(t) {
                        for (var e = t.length, i = [], n = 0; e > n; n++) i[n >>> 2] |= (255 & t.charCodeAt(n)) << 24 - n % 4 * 8;
                        return new a.init(i, e)
                    }
                },
                c = r.Utf8 = {
                    stringify: function(t) {
                        try {
                            return decodeURIComponent(escape(h.stringify(t)))
                        } catch (e) {
                            throw new Error("Malformed UTF-8 data")
                        }
                    },
                    parse: function(t) {
                        return h.parse(unescape(encodeURIComponent(t)))
                    }
                },
                u = s.BufferedBlockAlgorithm = o.extend({
                    reset: function() {
                        this._data = new a.init, this._nDataBytes = 0
                    },
                    _append: function(t) {
                        "string" == typeof t && (t = c.parse(t)), this._data.concat(t), this._nDataBytes += t.sigBytes
                    },
                    _process: function(e) {
                        var i = this._data,
                            n = i.words,
                            s = i.sigBytes,
                            o = this.blockSize,
                            r = 4 * o,
                            l = s / r;
                        l = e ? t.ceil(l) : t.max((0 | l) - this._minBufferSize, 0);
                        var h = l * o,
                            c = t.min(4 * h, s);
                        if (h) {
                            for (var u = 0; h > u; u += o) this._doProcessBlock(n, u);
                            var d = n.splice(0, h);
                            i.sigBytes -= c
                        }
                        return new a.init(d, c)
                    },
                    clone: function() {
                        var t = o.clone.call(this);
                        return t._data = this._data.clone(), t
                    },
                    _minBufferSize: 0
                }),
                d = (s.Hasher = u.extend({
                    cfg: o.extend(),
                    init: function(t) {
                        this.cfg = this.cfg.extend(t), this.reset()
                    },
                    reset: function() {
                        u.reset.call(this), this._doReset()
                    },
                    update: function(t) {
                        return this._append(t), this._process(), this
                    },
                    finalize: function(t) {
                        t && this._append(t);
                        var e = this._doFinalize();
                        return e
                    },
                    blockSize: 16,
                    _createHelper: function(t) {
                        return function(e, i) {
                            return new t.init(i).finalize(e)
                        }
                    },
                    _createHmacHelper: function(t) {
                        return function(e, i) {
                            return new d.HMAC.init(t, i).finalize(e)
                        }
                    }
                }), n.algo = {});
            return n
        }(Math);
        return function() {
            function e(t, e, i) {
                for (var n = [], o = 0, a = 0; e > a; a++)
                    if (a % 4) {
                        var r = i[t.charCodeAt(a - 1)] << a % 4 * 2,
                            l = i[t.charCodeAt(a)] >>> 6 - a % 4 * 2;
                        n[o >>> 2] |= (r | l) << 24 - o % 4 * 8, o++
                    }
                return s.create(n, o)
            }
            var i = t,
                n = i.lib,
                s = n.WordArray,
                o = i.enc;
            o.Base64 = {
                stringify: function(t) {
                    var e = t.words,
                        i = t.sigBytes,
                        n = this._map;
                    t.clamp();
                    for (var s = [], o = 0; i > o; o += 3)
                        for (var a = e[o >>> 2] >>> 24 - o % 4 * 8 & 255, r = e[o + 1 >>> 2] >>> 24 - (o + 1) % 4 * 8 & 255, l = e[o + 2 >>> 2] >>> 24 - (o + 2) % 4 * 8 & 255, h = a << 16 | r << 8 | l, c = 0; 4 > c && i > o + .75 * c; c++) s.push(n.charAt(h >>> 6 * (3 - c) & 63));
                    var u = n.charAt(64);
                    if (u)
                        for (; s.length % 4;) s.push(u);
                    return s.join("")
                },
                parse: function(t) {
                    var i = t.length,
                        n = this._map,
                        s = this._reverseMap;
                    if (!s) {
                        s = this._reverseMap = [];
                        for (var o = 0; o < n.length; o++) s[n.charCodeAt(o)] = o
                    }
                    var a = n.charAt(64);
                    if (a) {
                        var r = t.indexOf(a); - 1 !== r && (i = r)
                    }
                    return e(t, i, s)
                },
                _map: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/="
            }
        }(),
            function(e) {
                function i(t, e, i, n, s, o, a) {
                    var r = t + (e & i | ~e & n) + s + a;
                    return (r << o | r >>> 32 - o) + e
                }

                function n(t, e, i, n, s, o, a) {
                    var r = t + (e & n | i & ~n) + s + a;
                    return (r << o | r >>> 32 - o) + e
                }

                function s(t, e, i, n, s, o, a) {
                    var r = t + (e ^ i ^ n) + s + a;
                    return (r << o | r >>> 32 - o) + e
                }

                function o(t, e, i, n, s, o, a) {
                    var r = t + (i ^ (e | ~n)) + s + a;
                    return (r << o | r >>> 32 - o) + e
                }
                var a = t,
                    r = a.lib,
                    l = r.WordArray,
                    h = r.Hasher,
                    c = a.algo,
                    u = [];
                ! function() {
                    for (var t = 0; 64 > t; t++) u[t] = 4294967296 * e.abs(e.sin(t + 1)) | 0
                }();
                var d = c.MD5 = h.extend({
                    _doReset: function() {
                        this._hash = new l.init([1732584193, 4023233417, 2562383102, 271733878])
                    },
                    _doProcessBlock: function(t, e) {
                        for (var a = 0; 16 > a; a++) {
                            var r = e + a,
                                l = t[r];
                            t[r] = 16711935 & (l << 8 | l >>> 24) | 4278255360 & (l << 24 | l >>> 8)
                        }
                        var h = this._hash.words,
                            c = t[e + 0],
                            d = t[e + 1],
                            p = t[e + 2],
                            f = t[e + 3],
                            m = t[e + 4],
                            g = t[e + 5],
                            v = t[e + 6],
                            b = t[e + 7],
                            y = t[e + 8],
                            _ = t[e + 9],
                            w = t[e + 10],
                            k = t[e + 11],
                            C = t[e + 12],
                            x = t[e + 13],
                            E = t[e + 14],
                            T = t[e + 15],
                            S = h[0],
                            D = h[1],
                            A = h[2],
                            P = h[3];
                        S = i(S, D, A, P, c, 7, u[0]), P = i(P, S, D, A, d, 12, u[1]), A = i(A, P, S, D, p, 17, u[2]), D = i(D, A, P, S, f, 22, u[3]), S = i(S, D, A, P, m, 7, u[4]), P = i(P, S, D, A, g, 12, u[5]), A = i(A, P, S, D, v, 17, u[6]), D = i(D, A, P, S, b, 22, u[7]), S = i(S, D, A, P, y, 7, u[8]), P = i(P, S, D, A, _, 12, u[9]), A = i(A, P, S, D, w, 17, u[10]), D = i(D, A, P, S, k, 22, u[11]), S = i(S, D, A, P, C, 7, u[12]), P = i(P, S, D, A, x, 12, u[13]), A = i(A, P, S, D, E, 17, u[14]), D = i(D, A, P, S, T, 22, u[15]), S = n(S, D, A, P, d, 5, u[16]), P = n(P, S, D, A, v, 9, u[17]), A = n(A, P, S, D, k, 14, u[18]), D = n(D, A, P, S, c, 20, u[19]), S = n(S, D, A, P, g, 5, u[20]), P = n(P, S, D, A, w, 9, u[21]), A = n(A, P, S, D, T, 14, u[22]), D = n(D, A, P, S, m, 20, u[23]), S = n(S, D, A, P, _, 5, u[24]), P = n(P, S, D, A, E, 9, u[25]), A = n(A, P, S, D, f, 14, u[26]), D = n(D, A, P, S, y, 20, u[27]), S = n(S, D, A, P, x, 5, u[28]), P = n(P, S, D, A, p, 9, u[29]), A = n(A, P, S, D, b, 14, u[30]), D = n(D, A, P, S, C, 20, u[31]), S = s(S, D, A, P, g, 4, u[32]), P = s(P, S, D, A, y, 11, u[33]), A = s(A, P, S, D, k, 16, u[34]), D = s(D, A, P, S, E, 23, u[35]), S = s(S, D, A, P, d, 4, u[36]), P = s(P, S, D, A, m, 11, u[37]), A = s(A, P, S, D, b, 16, u[38]), D = s(D, A, P, S, w, 23, u[39]), S = s(S, D, A, P, x, 4, u[40]), P = s(P, S, D, A, c, 11, u[41]), A = s(A, P, S, D, f, 16, u[42]), D = s(D, A, P, S, v, 23, u[43]), S = s(S, D, A, P, _, 4, u[44]), P = s(P, S, D, A, C, 11, u[45]), A = s(A, P, S, D, T, 16, u[46]), D = s(D, A, P, S, p, 23, u[47]), S = o(S, D, A, P, c, 6, u[48]), P = o(P, S, D, A, b, 10, u[49]), A = o(A, P, S, D, E, 15, u[50]), D = o(D, A, P, S, g, 21, u[51]), S = o(S, D, A, P, C, 6, u[52]), P = o(P, S, D, A, f, 10, u[53]), A = o(A, P, S, D, w, 15, u[54]), D = o(D, A, P, S, d, 21, u[55]), S = o(S, D, A, P, y, 6, u[56]), P = o(P, S, D, A, T, 10, u[57]), A = o(A, P, S, D, v, 15, u[58]), D = o(D, A, P, S, x, 21, u[59]), S = o(S, D, A, P, m, 6, u[60]), P = o(P, S, D, A, k, 10, u[61]), A = o(A, P, S, D, p, 15, u[62]), D = o(D, A, P, S, _, 21, u[63]), h[0] = h[0] + S | 0, h[1] = h[1] + D | 0, h[2] = h[2] + A | 0, h[3] = h[3] + P | 0
                    },
                    _doFinalize: function() {
                        var t = this._data,
                            i = t.words,
                            n = 8 * this._nDataBytes,
                            s = 8 * t.sigBytes;
                        i[s >>> 5] |= 128 << 24 - s % 32;
                        var o = e.floor(n / 4294967296),
                            a = n;
                        i[(s + 64 >>> 9 << 4) + 15] = 16711935 & (o << 8 | o >>> 24) | 4278255360 & (o << 24 | o >>> 8), i[(s + 64 >>> 9 << 4) + 14] = 16711935 & (a << 8 | a >>> 24) | 4278255360 & (a << 24 | a >>> 8), t.sigBytes = 4 * (i.length + 1), this._process();
                        for (var r = this._hash, l = r.words, h = 0; 4 > h; h++) {
                            var c = l[h];
                            l[h] = 16711935 & (c << 8 | c >>> 24) | 4278255360 & (c << 24 | c >>> 8)
                        }
                        return r
                    },
                    clone: function() {
                        var t = h.clone.call(this);
                        return t._hash = this._hash.clone(), t
                    }
                });
                a.MD5 = h._createHelper(d), a.HmacMD5 = h._createHmacHelper(d)
            }(Math),
            function() {
                var e = t,
                    i = e.lib,
                    n = i.WordArray,
                    s = i.Hasher,
                    o = e.algo,
                    a = [],
                    r = o.SHA1 = s.extend({
                        _doReset: function() {
                            this._hash = new n.init([1732584193, 4023233417, 2562383102, 271733878, 3285377520])
                        },
                        _doProcessBlock: function(t, e) {
                            for (var i = this._hash.words, n = i[0], s = i[1], o = i[2], r = i[3], l = i[4], h = 0; 80 > h; h++) {
                                if (16 > h) a[h] = 0 | t[e + h];
                                else {
                                    var c = a[h - 3] ^ a[h - 8] ^ a[h - 14] ^ a[h - 16];
                                    a[h] = c << 1 | c >>> 31
                                }
                                var u = (n << 5 | n >>> 27) + l + a[h];
                                u += 20 > h ? (s & o | ~s & r) + 1518500249 : 40 > h ? (s ^ o ^ r) + 1859775393 : 60 > h ? (s & o | s & r | o & r) - 1894007588 : (s ^ o ^ r) - 899497514, l = r, r = o, o = s << 30 | s >>> 2, s = n, n = u
                            }
                            i[0] = i[0] + n | 0, i[1] = i[1] + s | 0, i[2] = i[2] + o | 0, i[3] = i[3] + r | 0, i[4] = i[4] + l | 0
                        },
                        _doFinalize: function() {
                            var t = this._data,
                                e = t.words,
                                i = 8 * this._nDataBytes,
                                n = 8 * t.sigBytes;
                            return e[n >>> 5] |= 128 << 24 - n % 32, e[(n + 64 >>> 9 << 4) + 14] = Math.floor(i / 4294967296), e[(n + 64 >>> 9 << 4) + 15] = i, t.sigBytes = 4 * e.length, this._process(), this._hash
                        },
                        clone: function() {
                            var t = s.clone.call(this);
                            return t._hash = this._hash.clone(), t
                        }
                    });
                e.SHA1 = s._createHelper(r), e.HmacSHA1 = s._createHmacHelper(r)
            }(),
            function(e) {
                var i = t,
                    n = i.lib,
                    s = n.WordArray,
                    o = n.Hasher,
                    a = i.algo,
                    r = [],
                    l = [];
                ! function() {
                    function t(t) {
                        for (var i = e.sqrt(t), n = 2; i >= n; n++)
                            if (!(t % n)) return !1;
                        return !0
                    }

                    function i(t) {
                        return 4294967296 * (t - (0 | t)) | 0
                    }
                    for (var n = 2, s = 0; 64 > s;) t(n) && (8 > s && (r[s] = i(e.pow(n, .5))), l[s] = i(e.pow(n, 1 / 3)), s++), n++
                }();
                var h = [],
                    c = a.SHA256 = o.extend({
                        _doReset: function() {
                            this._hash = new s.init(r.slice(0))
                        },
                        _doProcessBlock: function(t, e) {
                            for (var i = this._hash.words, n = i[0], s = i[1], o = i[2], a = i[3], r = i[4], c = i[5], u = i[6], d = i[7], p = 0; 64 > p; p++) {
                                if (16 > p) h[p] = 0 | t[e + p];
                                else {
                                    var f = h[p - 15],
                                        m = (f << 25 | f >>> 7) ^ (f << 14 | f >>> 18) ^ f >>> 3,
                                        g = h[p - 2],
                                        v = (g << 15 | g >>> 17) ^ (g << 13 | g >>> 19) ^ g >>> 10;
                                    h[p] = m + h[p - 7] + v + h[p - 16]
                                }
                                var b = r & c ^ ~r & u,
                                    y = n & s ^ n & o ^ s & o,
                                    _ = (n << 30 | n >>> 2) ^ (n << 19 | n >>> 13) ^ (n << 10 | n >>> 22),
                                    w = (r << 26 | r >>> 6) ^ (r << 21 | r >>> 11) ^ (r << 7 | r >>> 25),
                                    k = d + w + b + l[p] + h[p],
                                    C = _ + y;
                                d = u, u = c, c = r, r = a + k | 0, a = o, o = s, s = n, n = k + C | 0
                            }
                            i[0] = i[0] + n | 0, i[1] = i[1] + s | 0, i[2] = i[2] + o | 0, i[3] = i[3] + a | 0, i[4] = i[4] + r | 0, i[5] = i[5] + c | 0, i[6] = i[6] + u | 0, i[7] = i[7] + d | 0
                        },
                        _doFinalize: function() {
                            var t = this._data,
                                i = t.words,
                                n = 8 * this._nDataBytes,
                                s = 8 * t.sigBytes;
                            return i[s >>> 5] |= 128 << 24 - s % 32, i[(s + 64 >>> 9 << 4) + 14] = e.floor(n / 4294967296), i[(s + 64 >>> 9 << 4) + 15] = n, t.sigBytes = 4 * i.length, this._process(), this._hash
                        },
                        clone: function() {
                            var t = o.clone.call(this);
                            return t._hash = this._hash.clone(), t
                        }
                    });
                i.SHA256 = o._createHelper(c), i.HmacSHA256 = o._createHmacHelper(c)
            }(Math),
            function() {
                function e(t) {
                    return t << 8 & 4278255360 | t >>> 8 & 16711935
                }
                var i = t,
                    n = i.lib,
                    s = n.WordArray,
                    o = i.enc;
                o.Utf16 = o.Utf16BE = {
                    stringify: function(t) {
                        for (var e = t.words, i = t.sigBytes, n = [], s = 0; i > s; s += 2) {
                            var o = e[s >>> 2] >>> 16 - s % 4 * 8 & 65535;
                            n.push(String.fromCharCode(o))
                        }
                        return n.join("")
                    },
                    parse: function(t) {
                        for (var e = t.length, i = [], n = 0; e > n; n++) i[n >>> 1] |= t.charCodeAt(n) << 16 - n % 2 * 16;
                        return s.create(i, 2 * e)
                    }
                };
                o.Utf16LE = {
                    stringify: function(t) {
                        for (var i = t.words, n = t.sigBytes, s = [], o = 0; n > o; o += 2) {
                            var a = e(i[o >>> 2] >>> 16 - o % 4 * 8 & 65535);
                            s.push(String.fromCharCode(a))
                        }
                        return s.join("")
                    },
                    parse: function(t) {
                        for (var i = t.length, n = [], o = 0; i > o; o++) n[o >>> 1] |= e(t.charCodeAt(o) << 16 - o % 2 * 16);
                        return s.create(n, 2 * i)
                    }
                }
            }(),
            function() {
                if ("function" == typeof ArrayBuffer) {
                    var e = t,
                        i = e.lib,
                        n = i.WordArray,
                        s = n.init,
                        o = n.init = function(t) {
                            if (t instanceof ArrayBuffer && (t = new Uint8Array(t)), (t instanceof Int8Array || "undefined" != typeof Uint8ClampedArray && t instanceof Uint8ClampedArray || t instanceof Int16Array || t instanceof Uint16Array || t instanceof Int32Array || t instanceof Uint32Array || t instanceof Float32Array || t instanceof Float64Array) && (t = new Uint8Array(t.buffer, t.byteOffset, t.byteLength)), t instanceof Uint8Array) {
                                for (var e = t.byteLength, i = [], n = 0; e > n; n++) i[n >>> 2] |= t[n] << 24 - n % 4 * 8;
                                s.call(this, i, e)
                            } else s.apply(this, arguments)
                        };
                    o.prototype = n
                }
            }(),
            function(e) {
                function i(t, e, i) {
                    return t ^ e ^ i
                }

                function n(t, e, i) {
                    return t & e | ~t & i
                }

                function s(t, e, i) {
                    return (t | ~e) ^ i
                }

                function o(t, e, i) {
                    return t & i | e & ~i
                }

                function a(t, e, i) {
                    return t ^ (e | ~i)
                }

                function r(t, e) {
                    return t << e | t >>> 32 - e
                }
                var l = t,
                    h = l.lib,
                    c = h.WordArray,
                    u = h.Hasher,
                    d = l.algo,
                    p = c.create([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 7, 4, 13, 1, 10, 6, 15, 3, 12, 0, 9, 5, 2, 14, 11, 8, 3, 10, 14, 4, 9, 15, 8, 1, 2, 7, 0, 6, 13, 11, 5, 12, 1, 9, 11, 10, 0, 8, 12, 4, 13, 3, 7, 15, 14, 5, 6, 2, 4, 0, 5, 9, 7, 12, 2, 10, 14, 1, 3, 8, 11, 6, 15, 13]),
                    f = c.create([5, 14, 7, 0, 9, 2, 11, 4, 13, 6, 15, 8, 1, 10, 3, 12, 6, 11, 3, 7, 0, 13, 5, 10, 14, 15, 8, 12, 4, 9, 1, 2, 15, 5, 1, 3, 7, 14, 6, 9, 11, 8, 12, 2, 10, 0, 4, 13, 8, 6, 4, 1, 3, 11, 15, 0, 5, 12, 2, 13, 9, 7, 10, 14, 12, 15, 10, 4, 1, 5, 8, 7, 6, 2, 13, 14, 0, 3, 9, 11]),
                    m = c.create([11, 14, 15, 12, 5, 8, 7, 9, 11, 13, 14, 15, 6, 7, 9, 8, 7, 6, 8, 13, 11, 9, 7, 15, 7, 12, 15, 9, 11, 7, 13, 12, 11, 13, 6, 7, 14, 9, 13, 15, 14, 8, 13, 6, 5, 12, 7, 5, 11, 12, 14, 15, 14, 15, 9, 8, 9, 14, 5, 6, 8, 6, 5, 12, 9, 15, 5, 11, 6, 8, 13, 12, 5, 12, 13, 14, 11, 8, 5, 6]),
                    g = c.create([8, 9, 9, 11, 13, 15, 15, 5, 7, 7, 8, 11, 14, 14, 12, 6, 9, 13, 15, 7, 12, 8, 9, 11, 7, 7, 12, 7, 6, 15, 13, 11, 9, 7, 15, 11, 8, 6, 6, 14, 12, 13, 5, 14, 13, 13, 7, 5, 15, 5, 8, 11, 14, 14, 6, 14, 6, 9, 12, 9, 12, 5, 15, 8, 8, 5, 12, 9, 12, 5, 14, 6, 8, 13, 6, 5, 15, 13, 11, 11]),
                    v = c.create([0, 1518500249, 1859775393, 2400959708, 2840853838]),
                    b = c.create([1352829926, 1548603684, 1836072691, 2053994217, 0]),
                    y = d.RIPEMD160 = u.extend({
                        _doReset: function() {
                            this._hash = c.create([1732584193, 4023233417, 2562383102, 271733878, 3285377520])
                        },
                        _doProcessBlock: function(t, e) {
                            for (var l = 0; 16 > l; l++) {
                                var h = e + l,
                                    c = t[h];
                                t[h] = 16711935 & (c << 8 | c >>> 24) | 4278255360 & (c << 24 | c >>> 8)
                            }
                            var u, d, y, _, w, k, C, x, E, T, S = this._hash.words,
                                D = v.words,
                                A = b.words,
                                P = p.words,
                                I = f.words,
                                M = m.words,
                                N = g.words;
                            k = u = S[0], C = d = S[1], x = y = S[2], E = _ = S[3], T = w = S[4];
                            for (var H, l = 0; 80 > l; l += 1) H = u + t[e + P[l]] | 0, H += 16 > l ? i(d, y, _) + D[0] : 32 > l ? n(d, y, _) + D[1] : 48 > l ? s(d, y, _) + D[2] : 64 > l ? o(d, y, _) + D[3] : a(d, y, _) + D[4], H = 0 | H, H = r(H, M[l]), H = H + w | 0, u = w, w = _, _ = r(y, 10), y = d, d = H, H = k + t[e + I[l]] | 0, H += 16 > l ? a(C, x, E) + A[0] : 32 > l ? o(C, x, E) + A[1] : 48 > l ? s(C, x, E) + A[2] : 64 > l ? n(C, x, E) + A[3] : i(C, x, E) + A[4], H = 0 | H, H = r(H, N[l]), H = H + T | 0, k = T, T = E, E = r(x, 10), x = C, C = H;
                            H = S[1] + y + E | 0, S[1] = S[2] + _ + T | 0, S[2] = S[3] + w + k | 0, S[3] = S[4] + u + C | 0, S[4] = S[0] + d + x | 0, S[0] = H
                        },
                        _doFinalize: function() {
                            var t = this._data,
                                e = t.words,
                                i = 8 * this._nDataBytes,
                                n = 8 * t.sigBytes;
                            e[n >>> 5] |= 128 << 24 - n % 32, e[(n + 64 >>> 9 << 4) + 14] = 16711935 & (i << 8 | i >>> 24) | 4278255360 & (i << 24 | i >>> 8), t.sigBytes = 4 * (e.length + 1), this._process();
                            for (var s = this._hash, o = s.words, a = 0; 5 > a; a++) {
                                var r = o[a];
                                o[a] = 16711935 & (r << 8 | r >>> 24) | 4278255360 & (r << 24 | r >>> 8)
                            }
                            return s
                        },
                        clone: function() {
                            var t = u.clone.call(this);
                            return t._hash = this._hash.clone(), t
                        }
                    });
                l.RIPEMD160 = u._createHelper(y), l.HmacRIPEMD160 = u._createHmacHelper(y)
            }(Math),
            function() {
                var e = t,
                    i = e.lib,
                    n = i.Base,
                    s = e.enc,
                    o = s.Utf8,
                    a = e.algo;
                a.HMAC = n.extend({
                    init: function(t, e) {
                        t = this._hasher = new t.init, "string" == typeof e && (e = o.parse(e));
                        var i = t.blockSize,
                            n = 4 * i;
                        e.sigBytes > n && (e = t.finalize(e)), e.clamp();
                        for (var s = this._oKey = e.clone(), a = this._iKey = e.clone(), r = s.words, l = a.words, h = 0; i > h; h++) r[h] ^= 1549556828, l[h] ^= 909522486;
                        s.sigBytes = a.sigBytes = n, this.reset()
                    },
                    reset: function() {
                        var t = this._hasher;
                        t.reset(), t.update(this._iKey)
                    },
                    update: function(t) {
                        return this._hasher.update(t), this
                    },
                    finalize: function(t) {
                        var e = this._hasher,
                            i = e.finalize(t);
                        e.reset();
                        var n = e.finalize(this._oKey.clone().concat(i));
                        return n
                    }
                })
            }(),
            function() {
                var e = t,
                    i = e.lib,
                    n = i.Base,
                    s = i.WordArray,
                    o = e.algo,
                    a = o.SHA1,
                    r = o.HMAC,
                    l = o.PBKDF2 = n.extend({
                        cfg: n.extend({
                            keySize: 4,
                            hasher: a,
                            iterations: 1
                        }),
                        init: function(t) {
                            this.cfg = this.cfg.extend(t)
                        },
                        compute: function(t, e) {
                            for (var i = this.cfg, n = r.create(i.hasher, t), o = s.create(), a = s.create([1]), l = o.words, h = a.words, c = i.keySize, u = i.iterations; l.length < c;) {
                                var d = n.update(e).finalize(a);
                                n.reset();
                                for (var p = d.words, f = p.length, m = d, g = 1; u > g; g++) {
                                    m = n.finalize(m), n.reset();
                                    for (var v = m.words, b = 0; f > b; b++) p[b] ^= v[b]
                                }
                                o.concat(d), h[0]++
                            }
                            return o.sigBytes = 4 * c, o
                        }
                    });
                e.PBKDF2 = function(t, e, i) {
                    return l.create(i).compute(t, e)
                }
            }(),
            function() {
                var e = t,
                    i = e.lib,
                    n = i.Base,
                    s = i.WordArray,
                    o = e.algo,
                    a = o.MD5,
                    r = o.EvpKDF = n.extend({
                        cfg: n.extend({
                            keySize: 4,
                            hasher: a,
                            iterations: 1
                        }),
                        init: function(t) {
                            this.cfg = this.cfg.extend(t)
                        },
                        compute: function(t, e) {
                            for (var i = this.cfg, n = i.hasher.create(), o = s.create(), a = o.words, r = i.keySize, l = i.iterations; a.length < r;) {
                                h && n.update(h);
                                var h = n.update(t).finalize(e);
                                n.reset();
                                for (var c = 1; l > c; c++) h = n.finalize(h), n.reset();
                                o.concat(h)
                            }
                            return o.sigBytes = 4 * r, o
                        }
                    });
                e.EvpKDF = function(t, e, i) {
                    return r.create(i).compute(t, e)
                }
            }(),
            function() {
                var e = t,
                    i = e.lib,
                    n = i.WordArray,
                    s = e.algo,
                    o = s.SHA256,
                    a = s.SHA224 = o.extend({
                        _doReset: function() {
                            this._hash = new n.init([3238371032, 914150663, 812702999, 4144912697, 4290775857, 1750603025, 1694076839, 3204075428])
                        },
                        _doFinalize: function() {
                            var t = o._doFinalize.call(this);
                            return t.sigBytes -= 4, t
                        }
                    });
                e.SHA224 = o._createHelper(a), e.HmacSHA224 = o._createHmacHelper(a)
            }(),
            function(e) {
                var i = t,
                    n = i.lib,
                    s = n.Base,
                    o = n.WordArray,
                    a = i.x64 = {};
                a.Word = s.extend({
                    init: function(t, e) {
                        this.high = t, this.low = e
                    }
                }), a.WordArray = s.extend({
                    init: function(t, i) {
                        t = this.words = t || [], i != e ? this.sigBytes = i : this.sigBytes = 8 * t.length
                    },
                    toX32: function() {
                        for (var t = this.words, e = t.length, i = [], n = 0; e > n; n++) {
                            var s = t[n];
                            i.push(s.high), i.push(s.low)
                        }
                        return o.create(i, this.sigBytes)
                    },
                    clone: function() {
                        for (var t = s.clone.call(this), e = t.words = this.words.slice(0), i = e.length, n = 0; i > n; n++) e[n] = e[n].clone();
                        return t
                    }
                })
            }(),
            function(e) {
                var i = t,
                    n = i.lib,
                    s = n.WordArray,
                    o = n.Hasher,
                    a = i.x64,
                    r = a.Word,
                    l = i.algo,
                    h = [],
                    c = [],
                    u = [];
                ! function() {
                    for (var t = 1, e = 0, i = 0; 24 > i; i++) {
                        h[t + 5 * e] = (i + 1) * (i + 2) / 2 % 64;
                        var n = e % 5,
                            s = (2 * t + 3 * e) % 5;
                        t = n, e = s
                    }
                    for (var t = 0; 5 > t; t++)
                        for (var e = 0; 5 > e; e++) c[t + 5 * e] = e + (2 * t + 3 * e) % 5 * 5;
                    for (var o = 1, a = 0; 24 > a; a++) {
                        for (var l = 0, d = 0, p = 0; 7 > p; p++) {
                            if (1 & o) {
                                var f = (1 << p) - 1;
                                32 > f ? d ^= 1 << f : l ^= 1 << f - 32
                            }
                            128 & o ? o = o << 1 ^ 113 : o <<= 1
                        }
                        u[a] = r.create(l, d)
                    }
                }();
                var d = [];
                ! function() {
                    for (var t = 0; 25 > t; t++) d[t] = r.create()
                }();
                var p = l.SHA3 = o.extend({
                    cfg: o.cfg.extend({
                        outputLength: 512
                    }),
                    _doReset: function() {
                        for (var t = this._state = [], e = 0; 25 > e; e++) t[e] = new r.init;
                        this.blockSize = (1600 - 2 * this.cfg.outputLength) / 32
                    },
                    _doProcessBlock: function(t, e) {
                        for (var i = this._state, n = this.blockSize / 2, s = 0; n > s; s++) {
                            var o = t[e + 2 * s],
                                a = t[e + 2 * s + 1];
                            o = 16711935 & (o << 8 | o >>> 24) | 4278255360 & (o << 24 | o >>> 8), a = 16711935 & (a << 8 | a >>> 24) | 4278255360 & (a << 24 | a >>> 8);
                            var r = i[s];
                            r.high ^= a, r.low ^= o
                        }
                        for (var l = 0; 24 > l; l++) {
                            for (var p = 0; 5 > p; p++) {
                                for (var f = 0, m = 0, g = 0; 5 > g; g++) {
                                    var r = i[p + 5 * g];
                                    f ^= r.high, m ^= r.low
                                }
                                var v = d[p];
                                v.high = f, v.low = m
                            }
                            for (var p = 0; 5 > p; p++)
                                for (var b = d[(p + 4) % 5], y = d[(p + 1) % 5], _ = y.high, w = y.low, f = b.high ^ (_ << 1 | w >>> 31), m = b.low ^ (w << 1 | _ >>> 31), g = 0; 5 > g; g++) {
                                    var r = i[p + 5 * g];
                                    r.high ^= f, r.low ^= m
                                }
                            for (var k = 1; 25 > k; k++) {
                                var r = i[k],
                                    C = r.high,
                                    x = r.low,
                                    E = h[k];
                                if (32 > E) var f = C << E | x >>> 32 - E,
                                    m = x << E | C >>> 32 - E;
                                else var f = x << E - 32 | C >>> 64 - E,
                                    m = C << E - 32 | x >>> 64 - E;
                                var T = d[c[k]];
                                T.high = f, T.low = m
                            }
                            var S = d[0],
                                D = i[0];
                            S.high = D.high, S.low = D.low;
                            for (var p = 0; 5 > p; p++)
                                for (var g = 0; 5 > g; g++) {
                                    var k = p + 5 * g,
                                        r = i[k],
                                        A = d[k],
                                        P = d[(p + 1) % 5 + 5 * g],
                                        I = d[(p + 2) % 5 + 5 * g];
                                    r.high = A.high ^ ~P.high & I.high, r.low = A.low ^ ~P.low & I.low
                                }
                            var r = i[0],
                                M = u[l];
                            r.high ^= M.high, r.low ^= M.low
                        }
                    },
                    _doFinalize: function() {
                        var t = this._data,
                            i = t.words,
                            n = (8 * this._nDataBytes, 8 * t.sigBytes),
                            o = 32 * this.blockSize;
                        i[n >>> 5] |= 1 << 24 - n % 32, i[(e.ceil((n + 1) / o) * o >>> 5) - 1] |= 128, t.sigBytes = 4 * i.length, this._process();
                        for (var a = this._state, r = this.cfg.outputLength / 8, l = r / 8, h = [], c = 0; l > c; c++) {
                            var u = a[c],
                                d = u.high,
                                p = u.low;
                            d = 16711935 & (d << 8 | d >>> 24) | 4278255360 & (d << 24 | d >>> 8), p = 16711935 & (p << 8 | p >>> 24) | 4278255360 & (p << 24 | p >>> 8), h.push(p), h.push(d)
                        }
                        return new s.init(h, r)
                    },
                    clone: function() {
                        for (var t = o.clone.call(this), e = t._state = this._state.slice(0), i = 0; 25 > i; i++) e[i] = e[i].clone();
                        return t
                    }
                });
                i.SHA3 = o._createHelper(p), i.HmacSHA3 = o._createHmacHelper(p)
            }(Math),
            function() {
                function e() {
                    return a.create.apply(a, arguments)
                }
                var i = t,
                    n = i.lib,
                    s = n.Hasher,
                    o = i.x64,
                    a = o.Word,
                    r = o.WordArray,
                    l = i.algo,
                    h = [e(1116352408, 3609767458), e(1899447441, 602891725), e(3049323471, 3964484399), e(3921009573, 2173295548), e(961987163, 4081628472), e(1508970993, 3053834265), e(2453635748, 2937671579), e(2870763221, 3664609560), e(3624381080, 2734883394), e(310598401, 1164996542), e(607225278, 1323610764), e(1426881987, 3590304994), e(1925078388, 4068182383), e(2162078206, 991336113), e(2614888103, 633803317), e(3248222580, 3479774868), e(3835390401, 2666613458), e(4022224774, 944711139), e(264347078, 2341262773), e(604807628, 2007800933), e(770255983, 1495990901), e(1249150122, 1856431235), e(1555081692, 3175218132), e(1996064986, 2198950837), e(2554220882, 3999719339), e(2821834349, 766784016), e(2952996808, 2566594879), e(3210313671, 3203337956), e(3336571891, 1034457026), e(3584528711, 2466948901), e(113926993, 3758326383), e(338241895, 168717936), e(666307205, 1188179964), e(773529912, 1546045734), e(1294757372, 1522805485), e(1396182291, 2643833823), e(1695183700, 2343527390), e(1986661051, 1014477480), e(2177026350, 1206759142), e(2456956037, 344077627), e(2730485921, 1290863460), e(2820302411, 3158454273), e(3259730800, 3505952657), e(3345764771, 106217008), e(3516065817, 3606008344), e(3600352804, 1432725776), e(4094571909, 1467031594), e(275423344, 851169720), e(430227734, 3100823752), e(506948616, 1363258195), e(659060556, 3750685593), e(883997877, 3785050280), e(958139571, 3318307427), e(1322822218, 3812723403), e(1537002063, 2003034995), e(1747873779, 3602036899), e(1955562222, 1575990012), e(2024104815, 1125592928), e(2227730452, 2716904306), e(2361852424, 442776044), e(2428436474, 593698344), e(2756734187, 3733110249), e(3204031479, 2999351573), e(3329325298, 3815920427), e(3391569614, 3928383900), e(3515267271, 566280711), e(3940187606, 3454069534), e(4118630271, 4000239992), e(116418474, 1914138554), e(174292421, 2731055270), e(289380356, 3203993006), e(460393269, 320620315), e(685471733, 587496836), e(852142971, 1086792851), e(1017036298, 365543100), e(1126000580, 2618297676), e(1288033470, 3409855158), e(1501505948, 4234509866), e(1607167915, 987167468), e(1816402316, 1246189591)],
                    c = [];
                ! function() {
                    for (var t = 0; 80 > t; t++) c[t] = e()
                }();
                var u = l.SHA512 = s.extend({
                    _doReset: function() {
                        this._hash = new r.init([new a.init(1779033703, 4089235720), new a.init(3144134277, 2227873595), new a.init(1013904242, 4271175723), new a.init(2773480762, 1595750129), new a.init(1359893119, 2917565137), new a.init(2600822924, 725511199), new a.init(528734635, 4215389547), new a.init(1541459225, 327033209)])
                    },
                    _doProcessBlock: function(t, e) {
                        for (var i = this._hash.words, n = i[0], s = i[1], o = i[2], a = i[3], r = i[4], l = i[5], u = i[6], d = i[7], p = n.high, f = n.low, m = s.high, g = s.low, v = o.high, b = o.low, y = a.high, _ = a.low, w = r.high, k = r.low, C = l.high, x = l.low, E = u.high, T = u.low, S = d.high, D = d.low, A = p, P = f, I = m, M = g, N = v, H = b, B = y, F = _, L = w, O = k, R = C, z = x, W = E, j = T, U = S, q = D, K = 0; 80 > K; K++) {
                            var Y = c[K];
                            if (16 > K) var V = Y.high = 0 | t[e + 2 * K],
                                G = Y.low = 0 | t[e + 2 * K + 1];
                            else {
                                var X = c[K - 15],
                                    $ = X.high,
                                    Q = X.low,
                                    Z = ($ >>> 1 | Q << 31) ^ ($ >>> 8 | Q << 24) ^ $ >>> 7,
                                    J = (Q >>> 1 | $ << 31) ^ (Q >>> 8 | $ << 24) ^ (Q >>> 7 | $ << 25),
                                    tt = c[K - 2],
                                    et = tt.high,
                                    it = tt.low,
                                    nt = (et >>> 19 | it << 13) ^ (et << 3 | it >>> 29) ^ et >>> 6,
                                    st = (it >>> 19 | et << 13) ^ (it << 3 | et >>> 29) ^ (it >>> 6 | et << 26),
                                    ot = c[K - 7],
                                    at = ot.high,
                                    rt = ot.low,
                                    lt = c[K - 16],
                                    ht = lt.high,
                                    ct = lt.low,
                                    G = J + rt,
                                    V = Z + at + (J >>> 0 > G >>> 0 ? 1 : 0),
                                    G = G + st,
                                    V = V + nt + (st >>> 0 > G >>> 0 ? 1 : 0),
                                    G = G + ct,
                                    V = V + ht + (ct >>> 0 > G >>> 0 ? 1 : 0);
                                Y.high = V, Y.low = G
                            }
                            var ut = L & R ^ ~L & W,
                                dt = O & z ^ ~O & j,
                                pt = A & I ^ A & N ^ I & N,
                                ft = P & M ^ P & H ^ M & H,
                                mt = (A >>> 28 | P << 4) ^ (A << 30 | P >>> 2) ^ (A << 25 | P >>> 7),
                                gt = (P >>> 28 | A << 4) ^ (P << 30 | A >>> 2) ^ (P << 25 | A >>> 7),
                                vt = (L >>> 14 | O << 18) ^ (L >>> 18 | O << 14) ^ (L << 23 | O >>> 9),
                                bt = (O >>> 14 | L << 18) ^ (O >>> 18 | L << 14) ^ (O << 23 | L >>> 9),
                                yt = h[K],
                                _t = yt.high,
                                wt = yt.low,
                                kt = q + bt,
                                Ct = U + vt + (q >>> 0 > kt >>> 0 ? 1 : 0),
                                kt = kt + dt,
                                Ct = Ct + ut + (dt >>> 0 > kt >>> 0 ? 1 : 0),
                                kt = kt + wt,
                                Ct = Ct + _t + (wt >>> 0 > kt >>> 0 ? 1 : 0),
                                kt = kt + G,
                                Ct = Ct + V + (G >>> 0 > kt >>> 0 ? 1 : 0),
                                xt = gt + ft,
                                Et = mt + pt + (gt >>> 0 > xt >>> 0 ? 1 : 0);
                            U = W, q = j, W = R, j = z, R = L, z = O, O = F + kt | 0, L = B + Ct + (F >>> 0 > O >>> 0 ? 1 : 0) | 0, B = N, F = H, N = I, H = M, I = A, M = P, P = kt + xt | 0, A = Ct + Et + (kt >>> 0 > P >>> 0 ? 1 : 0) | 0
                        }
                        f = n.low = f + P, n.high = p + A + (P >>> 0 > f >>> 0 ? 1 : 0), g = s.low = g + M, s.high = m + I + (M >>> 0 > g >>> 0 ? 1 : 0), b = o.low = b + H, o.high = v + N + (H >>> 0 > b >>> 0 ? 1 : 0), _ = a.low = _ + F, a.high = y + B + (F >>> 0 > _ >>> 0 ? 1 : 0), k = r.low = k + O, r.high = w + L + (O >>> 0 > k >>> 0 ? 1 : 0), x = l.low = x + z, l.high = C + R + (z >>> 0 > x >>> 0 ? 1 : 0), T = u.low = T + j, u.high = E + W + (j >>> 0 > T >>> 0 ? 1 : 0), D = d.low = D + q, d.high = S + U + (q >>> 0 > D >>> 0 ? 1 : 0)
                    },
                    _doFinalize: function() {
                        var t = this._data,
                            e = t.words,
                            i = 8 * this._nDataBytes,
                            n = 8 * t.sigBytes;
                        e[n >>> 5] |= 128 << 24 - n % 32, e[(n + 128 >>> 10 << 5) + 30] = Math.floor(i / 4294967296), e[(n + 128 >>> 10 << 5) + 31] = i, t.sigBytes = 4 * e.length, this._process();
                        var s = this._hash.toX32();
                        return s
                    },
                    clone: function() {
                        var t = s.clone.call(this);
                        return t._hash = this._hash.clone(), t
                    },
                    blockSize: 32
                });
                i.SHA512 = s._createHelper(u), i.HmacSHA512 = s._createHmacHelper(u)
            }(),
            function() {
                var e = t,
                    i = e.x64,
                    n = i.Word,
                    s = i.WordArray,
                    o = e.algo,
                    a = o.SHA512,
                    r = o.SHA384 = a.extend({
                        _doReset: function() {
                            this._hash = new s.init([new n.init(3418070365, 3238371032), new n.init(1654270250, 914150663), new n.init(2438529370, 812702999), new n.init(355462360, 4144912697), new n.init(1731405415, 4290775857), new n.init(2394180231, 1750603025), new n.init(3675008525, 1694076839), new n.init(1203062813, 3204075428)])
                        },
                        _doFinalize: function() {
                            var t = a._doFinalize.call(this);
                            return t.sigBytes -= 16, t
                        }
                    });
                e.SHA384 = a._createHelper(r), e.HmacSHA384 = a._createHmacHelper(r)
            }(), t.lib.Cipher || function(e) {
            var i = t,
                n = i.lib,
                s = n.Base,
                o = n.WordArray,
                a = n.BufferedBlockAlgorithm,
                r = i.enc,
                l = (r.Utf8, r.Base64),
                h = i.algo,
                c = h.EvpKDF,
                u = n.Cipher = a.extend({
                    cfg: s.extend(),
                    createEncryptor: function(t, e) {
                        return this.create(this._ENC_XFORM_MODE, t, e)
                    },
                    createDecryptor: function(t, e) {
                        return this.create(this._DEC_XFORM_MODE, t, e)
                    },
                    init: function(t, e, i) {
                        this.cfg = this.cfg.extend(i), this._xformMode = t, this._key = e, this.reset()
                    },
                    reset: function() {
                        a.reset.call(this), this._doReset()
                    },
                    process: function(t) {
                        return this._append(t), this._process()
                    },
                    finalize: function(t) {
                        t && this._append(t);
                        var e = this._doFinalize();
                        return e
                    },
                    keySize: 4,
                    ivSize: 4,
                    _ENC_XFORM_MODE: 1,
                    _DEC_XFORM_MODE: 2,
                    _createHelper: function() {
                        function t(t) {
                            return "string" == typeof t ? C : _
                        }
                        return function(e) {
                            return {
                                encrypt: function(i, n, s) {
                                    return t(n).encrypt(e, i, n, s)
                                },
                                decrypt: function(i, n, s) {
                                    return t(n).decrypt(e, i, n, s)
                                }
                            }
                        }
                    }()
                }),
                d = (n.StreamCipher = u.extend({
                    _doFinalize: function() {
                        var t = this._process(!0);
                        return t
                    },
                    blockSize: 1
                }), i.mode = {}),
                p = n.BlockCipherMode = s.extend({
                    createEncryptor: function(t, e) {
                        return this.Encryptor.create(t, e)
                    },
                    createDecryptor: function(t, e) {
                        return this.Decryptor.create(t, e)
                    },
                    init: function(t, e) {
                        this._cipher = t, this._iv = e
                    }
                }),
                f = d.CBC = function() {
                    function t(t, i, n) {
                        var s = this._iv;
                        if (s) {
                            var o = s;
                            this._iv = e
                        } else var o = this._prevBlock;
                        for (var a = 0; n > a; a++) t[i + a] ^= o[a]
                    }
                    var i = p.extend();
                    return i.Encryptor = i.extend({
                        processBlock: function(e, i) {
                            var n = this._cipher,
                                s = n.blockSize;
                            t.call(this, e, i, s), n.encryptBlock(e, i), this._prevBlock = e.slice(i, i + s)
                        }
                    }), i.Decryptor = i.extend({
                        processBlock: function(e, i) {
                            var n = this._cipher,
                                s = n.blockSize,
                                o = e.slice(i, i + s);
                            n.decryptBlock(e, i), t.call(this, e, i, s), this._prevBlock = o
                        }
                    }), i
                }(),
                m = i.pad = {},
                g = m.Pkcs7 = {
                    pad: function(t, e) {
                        for (var i = 4 * e, n = i - t.sigBytes % i, s = n << 24 | n << 16 | n << 8 | n, a = [], r = 0; n > r; r += 4) a.push(s);
                        var l = o.create(a, n);
                        t.concat(l)
                    },
                    unpad: function(t) {
                        var e = 255 & t.words[t.sigBytes - 1 >>> 2];
                        t.sigBytes -= e
                    }
                },
                v = (n.BlockCipher = u.extend({
                    cfg: u.cfg.extend({
                        mode: f,
                        padding: g
                    }),
                    reset: function() {
                        u.reset.call(this);
                        var t = this.cfg,
                            e = t.iv,
                            i = t.mode;
                        if (this._xformMode == this._ENC_XFORM_MODE) var n = i.createEncryptor;
                        else {
                            var n = i.createDecryptor;
                            this._minBufferSize = 1
                        }
                        this._mode && this._mode.__creator == n ? this._mode.init(this, e && e.words) : (this._mode = n.call(i, this, e && e.words), this._mode.__creator = n)
                    },
                    _doProcessBlock: function(t, e) {
                        this._mode.processBlock(t, e)
                    },
                    _doFinalize: function() {
                        var t = this.cfg.padding;
                        if (this._xformMode == this._ENC_XFORM_MODE) {
                            t.pad(this._data, this.blockSize);
                            var e = this._process(!0)
                        } else {
                            var e = this._process(!0);
                            t.unpad(e)
                        }
                        return e
                    },
                    blockSize: 4
                }), n.CipherParams = s.extend({
                    init: function(t) {
                        this.mixIn(t)
                    },
                    toString: function(t) {
                        return (t || this.formatter).stringify(this)
                    }
                })),
                b = i.format = {},
                y = b.OpenSSL = {
                    stringify: function(t) {
                        var e = t.ciphertext,
                            i = t.salt;
                        if (i) var n = o.create([1398893684, 1701076831]).concat(i).concat(e);
                        else var n = e;
                        return n.toString(l)
                    },
                    parse: function(t) {
                        var e = l.parse(t),
                            i = e.words;
                        if (1398893684 == i[0] && 1701076831 == i[1]) {
                            var n = o.create(i.slice(2, 4));
                            i.splice(0, 4), e.sigBytes -= 16
                        }
                        return v.create({
                            ciphertext: e,
                            salt: n
                        })
                    }
                },
                _ = n.SerializableCipher = s.extend({
                    cfg: s.extend({
                        format: y
                    }),
                    encrypt: function(t, e, i, n) {
                        n = this.cfg.extend(n);
                        var s = t.createEncryptor(i, n),
                            o = s.finalize(e),
                            a = s.cfg;
                        return v.create({
                            ciphertext: o,
                            key: i,
                            iv: a.iv,
                            algorithm: t,
                            mode: a.mode,
                            padding: a.padding,
                            blockSize: t.blockSize,
                            formatter: n.format
                        })
                    },
                    decrypt: function(t, e, i, n) {
                        n = this.cfg.extend(n), e = this._parse(e, n.format);
                        var s = t.createDecryptor(i, n).finalize(e.ciphertext);
                        return s
                    },
                    _parse: function(t, e) {
                        return "string" == typeof t ? e.parse(t, this) : t
                    }
                }),
                w = i.kdf = {},
                k = w.OpenSSL = {
                    execute: function(t, e, i, n) {
                        n || (n = o.random(8));
                        var s = c.create({
                                keySize: e + i
                            }).compute(t, n),
                            a = o.create(s.words.slice(e), 4 * i);
                        return s.sigBytes = 4 * e, v.create({
                            key: s,
                            iv: a,
                            salt: n
                        })
                    }
                },
                C = n.PasswordBasedCipher = _.extend({
                    cfg: _.cfg.extend({
                        kdf: k
                    }),
                    encrypt: function(t, e, i, n) {
                        n = this.cfg.extend(n);
                        var s = n.kdf.execute(i, t.keySize, t.ivSize);
                        n.iv = s.iv;
                        var o = _.encrypt.call(this, t, e, s.key, n);
                        return o.mixIn(s), o
                    },
                    decrypt: function(t, e, i, n) {
                        n = this.cfg.extend(n), e = this._parse(e, n.format);
                        var s = n.kdf.execute(i, t.keySize, t.ivSize, e.salt);
                        n.iv = s.iv;
                        var o = _.decrypt.call(this, t, e, s.key, n);
                        return o
                    }
                })
        }(), t.mode.CFB = function() {
            function e(t, e, i, n) {
                var s = this._iv;
                if (s) {
                    var o = s.slice(0);
                    this._iv = void 0
                } else var o = this._prevBlock;
                n.encryptBlock(o, 0);
                for (var a = 0; i > a; a++) t[e + a] ^= o[a]
            }
            var i = t.lib.BlockCipherMode.extend();
            return i.Encryptor = i.extend({
                processBlock: function(t, i) {
                    var n = this._cipher,
                        s = n.blockSize;
                    e.call(this, t, i, s, n), this._prevBlock = t.slice(i, i + s)
                }
            }), i.Decryptor = i.extend({
                processBlock: function(t, i) {
                    var n = this._cipher,
                        s = n.blockSize,
                        o = t.slice(i, i + s);
                    e.call(this, t, i, s, n), this._prevBlock = o
                }
            }), i
        }(), t.mode.ECB = function() {
            var e = t.lib.BlockCipherMode.extend();
            return e.Encryptor = e.extend({
                processBlock: function(t, e) {
                    this._cipher.encryptBlock(t, e)
                }
            }), e.Decryptor = e.extend({
                processBlock: function(t, e) {
                    this._cipher.decryptBlock(t, e)
                }
            }), e
        }(), t.pad.AnsiX923 = {
            pad: function(t, e) {
                var i = t.sigBytes,
                    n = 4 * e,
                    s = n - i % n,
                    o = i + s - 1;
                t.clamp(), t.words[o >>> 2] |= s << 24 - o % 4 * 8, t.sigBytes += s
            },
            unpad: function(t) {
                var e = 255 & t.words[t.sigBytes - 1 >>> 2];
                t.sigBytes -= e
            }
        }, t.pad.Iso10126 = {
            pad: function(e, i) {
                var n = 4 * i,
                    s = n - e.sigBytes % n;
                e.concat(t.lib.WordArray.random(s - 1)).concat(t.lib.WordArray.create([s << 24], 1));
            },
            unpad: function(t) {
                var e = 255 & t.words[t.sigBytes - 1 >>> 2];
                t.sigBytes -= e
            }
        }, t.pad.Iso97971 = {
            pad: function(e, i) {
                e.concat(t.lib.WordArray.create([2147483648], 1)), t.pad.ZeroPadding.pad(e, i)
            },
            unpad: function(e) {
                t.pad.ZeroPadding.unpad(e), e.sigBytes--
            }
        }, t.mode.OFB = function() {
            var e = t.lib.BlockCipherMode.extend(),
                i = e.Encryptor = e.extend({
                    processBlock: function(t, e) {
                        var i = this._cipher,
                            n = i.blockSize,
                            s = this._iv,
                            o = this._keystream;
                        s && (o = this._keystream = s.slice(0), this._iv = void 0), i.encryptBlock(o, 0);
                        for (var a = 0; n > a; a++) t[e + a] ^= o[a]
                    }
                });
            return e.Decryptor = i, e
        }(), t.pad.NoPadding = {
            pad: function() {},
            unpad: function() {}
        },
            function(e) {
                var i = t,
                    n = i.lib,
                    s = n.CipherParams,
                    o = i.enc,
                    a = o.Hex,
                    r = i.format;
                r.Hex = {
                    stringify: function(t) {
                        return t.ciphertext.toString(a)
                    },
                    parse: function(t) {
                        var e = a.parse(t);
                        return s.create({
                            ciphertext: e
                        })
                    }
                }
            }(),
            function() {
                var e = t,
                    i = e.lib,
                    n = i.BlockCipher,
                    s = e.algo,
                    o = [],
                    a = [],
                    r = [],
                    l = [],
                    h = [],
                    c = [],
                    u = [],
                    d = [],
                    p = [],
                    f = [];
                ! function() {
                    for (var t = [], e = 0; 256 > e; e++) 128 > e ? t[e] = e << 1 : t[e] = e << 1 ^ 283;
                    for (var i = 0, n = 0, e = 0; 256 > e; e++) {
                        var s = n ^ n << 1 ^ n << 2 ^ n << 3 ^ n << 4;
                        s = s >>> 8 ^ 255 & s ^ 99, o[i] = s, a[s] = i;
                        var m = t[i],
                            g = t[m],
                            v = t[g],
                            b = 257 * t[s] ^ 16843008 * s;
                        r[i] = b << 24 | b >>> 8, l[i] = b << 16 | b >>> 16, h[i] = b << 8 | b >>> 24, c[i] = b;
                        var b = 16843009 * v ^ 65537 * g ^ 257 * m ^ 16843008 * i;
                        u[s] = b << 24 | b >>> 8, d[s] = b << 16 | b >>> 16, p[s] = b << 8 | b >>> 24, f[s] = b, i ? (i = m ^ t[t[t[v ^ m]]], n ^= t[t[n]]) : i = n = 1
                    }
                }();
                var m = [0, 1, 2, 4, 8, 16, 32, 64, 128, 27, 54],
                    g = s.AES = n.extend({
                        _doReset: function() {
                            if (!this._nRounds || this._keyPriorReset !== this._key) {
                                for (var t = this._keyPriorReset = this._key, e = t.words, i = t.sigBytes / 4, n = this._nRounds = i + 6, s = 4 * (n + 1), a = this._keySchedule = [], r = 0; s > r; r++)
                                    if (i > r) a[r] = e[r];
                                    else {
                                        var l = a[r - 1];
                                        r % i ? i > 6 && r % i == 4 && (l = o[l >>> 24] << 24 | o[l >>> 16 & 255] << 16 | o[l >>> 8 & 255] << 8 | o[255 & l]) : (l = l << 8 | l >>> 24, l = o[l >>> 24] << 24 | o[l >>> 16 & 255] << 16 | o[l >>> 8 & 255] << 8 | o[255 & l], l ^= m[r / i | 0] << 24), a[r] = a[r - i] ^ l
                                    }
                                for (var h = this._invKeySchedule = [], c = 0; s > c; c++) {
                                    var r = s - c;
                                    if (c % 4) var l = a[r];
                                    else var l = a[r - 4];
                                    4 > c || 4 >= r ? h[c] = l : h[c] = u[o[l >>> 24]] ^ d[o[l >>> 16 & 255]] ^ p[o[l >>> 8 & 255]] ^ f[o[255 & l]]
                                }
                            }
                        },
                        encryptBlock: function(t, e) {
                            this._doCryptBlock(t, e, this._keySchedule, r, l, h, c, o)
                        },
                        decryptBlock: function(t, e) {
                            var i = t[e + 1];
                            t[e + 1] = t[e + 3], t[e + 3] = i, this._doCryptBlock(t, e, this._invKeySchedule, u, d, p, f, a);
                            var i = t[e + 1];
                            t[e + 1] = t[e + 3], t[e + 3] = i
                        },
                        _doCryptBlock: function(t, e, i, n, s, o, a, r) {
                            for (var l = this._nRounds, h = t[e] ^ i[0], c = t[e + 1] ^ i[1], u = t[e + 2] ^ i[2], d = t[e + 3] ^ i[3], p = 4, f = 1; l > f; f++) {
                                var m = n[h >>> 24] ^ s[c >>> 16 & 255] ^ o[u >>> 8 & 255] ^ a[255 & d] ^ i[p++],
                                    g = n[c >>> 24] ^ s[u >>> 16 & 255] ^ o[d >>> 8 & 255] ^ a[255 & h] ^ i[p++],
                                    v = n[u >>> 24] ^ s[d >>> 16 & 255] ^ o[h >>> 8 & 255] ^ a[255 & c] ^ i[p++],
                                    b = n[d >>> 24] ^ s[h >>> 16 & 255] ^ o[c >>> 8 & 255] ^ a[255 & u] ^ i[p++];
                                h = m, c = g, u = v, d = b
                            }
                            var m = (r[h >>> 24] << 24 | r[c >>> 16 & 255] << 16 | r[u >>> 8 & 255] << 8 | r[255 & d]) ^ i[p++],
                                g = (r[c >>> 24] << 24 | r[u >>> 16 & 255] << 16 | r[d >>> 8 & 255] << 8 | r[255 & h]) ^ i[p++],
                                v = (r[u >>> 24] << 24 | r[d >>> 16 & 255] << 16 | r[h >>> 8 & 255] << 8 | r[255 & c]) ^ i[p++],
                                b = (r[d >>> 24] << 24 | r[h >>> 16 & 255] << 16 | r[c >>> 8 & 255] << 8 | r[255 & u]) ^ i[p++];
                            t[e] = m, t[e + 1] = g, t[e + 2] = v, t[e + 3] = b
                        },
                        keySize: 8
                    });
                e.AES = n._createHelper(g)
            }(),
            function() {
                function e(t, e) {
                    var i = (this._lBlock >>> t ^ this._rBlock) & e;
                    this._rBlock ^= i, this._lBlock ^= i << t
                }

                function i(t, e) {
                    var i = (this._rBlock >>> t ^ this._lBlock) & e;
                    this._lBlock ^= i, this._rBlock ^= i << t
                }
                var n = t,
                    s = n.lib,
                    o = s.WordArray,
                    a = s.BlockCipher,
                    r = n.algo,
                    l = [57, 49, 41, 33, 25, 17, 9, 1, 58, 50, 42, 34, 26, 18, 10, 2, 59, 51, 43, 35, 27, 19, 11, 3, 60, 52, 44, 36, 63, 55, 47, 39, 31, 23, 15, 7, 62, 54, 46, 38, 30, 22, 14, 6, 61, 53, 45, 37, 29, 21, 13, 5, 28, 20, 12, 4],
                    h = [14, 17, 11, 24, 1, 5, 3, 28, 15, 6, 21, 10, 23, 19, 12, 4, 26, 8, 16, 7, 27, 20, 13, 2, 41, 52, 31, 37, 47, 55, 30, 40, 51, 45, 33, 48, 44, 49, 39, 56, 34, 53, 46, 42, 50, 36, 29, 32],
                    c = [1, 2, 4, 6, 8, 10, 12, 14, 15, 17, 19, 21, 23, 25, 27, 28],
                    u = [{
                        0: 8421888,
                        268435456: 32768,
                        536870912: 8421378,
                        805306368: 2,
                        1073741824: 512,
                        1342177280: 8421890,
                        1610612736: 8389122,
                        1879048192: 8388608,
                        2147483648: 514,
                        2415919104: 8389120,
                        2684354560: 33280,
                        2952790016: 8421376,
                        3221225472: 32770,
                        3489660928: 8388610,
                        3758096384: 0,
                        4026531840: 33282,
                        134217728: 0,
                        402653184: 8421890,
                        671088640: 33282,
                        939524096: 32768,
                        1207959552: 8421888,
                        1476395008: 512,
                        1744830464: 8421378,
                        2013265920: 2,
                        2281701376: 8389120,
                        2550136832: 33280,
                        2818572288: 8421376,
                        3087007744: 8389122,
                        3355443200: 8388610,
                        3623878656: 32770,
                        3892314112: 514,
                        4160749568: 8388608,
                        1: 32768,
                        268435457: 2,
                        536870913: 8421888,
                        805306369: 8388608,
                        1073741825: 8421378,
                        1342177281: 33280,
                        1610612737: 512,
                        1879048193: 8389122,
                        2147483649: 8421890,
                        2415919105: 8421376,
                        2684354561: 8388610,
                        2952790017: 33282,
                        3221225473: 514,
                        3489660929: 8389120,
                        3758096385: 32770,
                        4026531841: 0,
                        134217729: 8421890,
                        402653185: 8421376,
                        671088641: 8388608,
                        939524097: 512,
                        1207959553: 32768,
                        1476395009: 8388610,
                        1744830465: 2,
                        2013265921: 33282,
                        2281701377: 32770,
                        2550136833: 8389122,
                        2818572289: 514,
                        3087007745: 8421888,
                        3355443201: 8389120,
                        3623878657: 0,
                        3892314113: 33280,
                        4160749569: 8421378
                    }, {
                        0: 1074282512,
                        16777216: 16384,
                        33554432: 524288,
                        50331648: 1074266128,
                        67108864: 1073741840,
                        83886080: 1074282496,
                        100663296: 1073758208,
                        117440512: 16,
                        134217728: 540672,
                        150994944: 1073758224,
                        167772160: 1073741824,
                        184549376: 540688,
                        201326592: 524304,
                        218103808: 0,
                        234881024: 16400,
                        251658240: 1074266112,
                        8388608: 1073758208,
                        25165824: 540688,
                        41943040: 16,
                        58720256: 1073758224,
                        75497472: 1074282512,
                        92274688: 1073741824,
                        109051904: 524288,
                        125829120: 1074266128,
                        142606336: 524304,
                        159383552: 0,
                        176160768: 16384,
                        192937984: 1074266112,
                        209715200: 1073741840,
                        226492416: 540672,
                        243269632: 1074282496,
                        260046848: 16400,
                        268435456: 0,
                        285212672: 1074266128,
                        301989888: 1073758224,
                        318767104: 1074282496,
                        335544320: 1074266112,
                        352321536: 16,
                        369098752: 540688,
                        385875968: 16384,
                        402653184: 16400,
                        419430400: 524288,
                        436207616: 524304,
                        452984832: 1073741840,
                        469762048: 540672,
                        486539264: 1073758208,
                        503316480: 1073741824,
                        520093696: 1074282512,
                        276824064: 540688,
                        293601280: 524288,
                        310378496: 1074266112,
                        327155712: 16384,
                        343932928: 1073758208,
                        360710144: 1074282512,
                        377487360: 16,
                        394264576: 1073741824,
                        411041792: 1074282496,
                        427819008: 1073741840,
                        444596224: 1073758224,
                        461373440: 524304,
                        478150656: 0,
                        494927872: 16400,
                        511705088: 1074266128,
                        528482304: 540672
                    }, {
                        0: 260,
                        1048576: 0,
                        2097152: 67109120,
                        3145728: 65796,
                        4194304: 65540,
                        5242880: 67108868,
                        6291456: 67174660,
                        7340032: 67174400,
                        8388608: 67108864,
                        9437184: 67174656,
                        10485760: 65792,
                        11534336: 67174404,
                        12582912: 67109124,
                        13631488: 65536,
                        14680064: 4,
                        15728640: 256,
                        524288: 67174656,
                        1572864: 67174404,
                        2621440: 0,
                        3670016: 67109120,
                        4718592: 67108868,
                        5767168: 65536,
                        6815744: 65540,
                        7864320: 260,
                        8912896: 4,
                        9961472: 256,
                        11010048: 67174400,
                        12058624: 65796,
                        13107200: 65792,
                        14155776: 67109124,
                        15204352: 67174660,
                        16252928: 67108864,
                        16777216: 67174656,
                        17825792: 65540,
                        18874368: 65536,
                        19922944: 67109120,
                        20971520: 256,
                        22020096: 67174660,
                        23068672: 67108868,
                        24117248: 0,
                        25165824: 67109124,
                        26214400: 67108864,
                        27262976: 4,
                        28311552: 65792,
                        29360128: 67174400,
                        30408704: 260,
                        31457280: 65796,
                        32505856: 67174404,
                        17301504: 67108864,
                        18350080: 260,
                        19398656: 67174656,
                        20447232: 0,
                        21495808: 65540,
                        22544384: 67109120,
                        23592960: 256,
                        24641536: 67174404,
                        25690112: 65536,
                        26738688: 67174660,
                        27787264: 65796,
                        28835840: 67108868,
                        29884416: 67109124,
                        30932992: 67174400,
                        31981568: 4,
                        33030144: 65792
                    }, {
                        0: 2151682048,
                        65536: 2147487808,
                        131072: 4198464,
                        196608: 2151677952,
                        262144: 0,
                        327680: 4198400,
                        393216: 2147483712,
                        458752: 4194368,
                        524288: 2147483648,
                        589824: 4194304,
                        655360: 64,
                        720896: 2147487744,
                        786432: 2151678016,
                        851968: 4160,
                        917504: 4096,
                        983040: 2151682112,
                        32768: 2147487808,
                        98304: 64,
                        163840: 2151678016,
                        229376: 2147487744,
                        294912: 4198400,
                        360448: 2151682112,
                        425984: 0,
                        491520: 2151677952,
                        557056: 4096,
                        622592: 2151682048,
                        688128: 4194304,
                        753664: 4160,
                        819200: 2147483648,
                        884736: 4194368,
                        950272: 4198464,
                        1015808: 2147483712,
                        1048576: 4194368,
                        1114112: 4198400,
                        1179648: 2147483712,
                        1245184: 0,
                        1310720: 4160,
                        1376256: 2151678016,
                        1441792: 2151682048,
                        1507328: 2147487808,
                        1572864: 2151682112,
                        1638400: 2147483648,
                        1703936: 2151677952,
                        1769472: 4198464,
                        1835008: 2147487744,
                        1900544: 4194304,
                        1966080: 64,
                        2031616: 4096,
                        1081344: 2151677952,
                        1146880: 2151682112,
                        1212416: 0,
                        1277952: 4198400,
                        1343488: 4194368,
                        1409024: 2147483648,
                        1474560: 2147487808,
                        1540096: 64,
                        1605632: 2147483712,
                        1671168: 4096,
                        1736704: 2147487744,
                        1802240: 2151678016,
                        1867776: 4160,
                        1933312: 2151682048,
                        1998848: 4194304,
                        2064384: 4198464
                    }, {
                        0: 128,
                        4096: 17039360,
                        8192: 262144,
                        12288: 536870912,
                        16384: 537133184,
                        20480: 16777344,
                        24576: 553648256,
                        28672: 262272,
                        32768: 16777216,
                        36864: 537133056,
                        40960: 536871040,
                        45056: 553910400,
                        49152: 553910272,
                        53248: 0,
                        57344: 17039488,
                        61440: 553648128,
                        2048: 17039488,
                        6144: 553648256,
                        10240: 128,
                        14336: 17039360,
                        18432: 262144,
                        22528: 537133184,
                        26624: 553910272,
                        30720: 536870912,
                        34816: 537133056,
                        38912: 0,
                        43008: 553910400,
                        47104: 16777344,
                        51200: 536871040,
                        55296: 553648128,
                        59392: 16777216,
                        63488: 262272,
                        65536: 262144,
                        69632: 128,
                        73728: 536870912,
                        77824: 553648256,
                        81920: 16777344,
                        86016: 553910272,
                        90112: 537133184,
                        94208: 16777216,
                        98304: 553910400,
                        102400: 553648128,
                        106496: 17039360,
                        110592: 537133056,
                        114688: 262272,
                        118784: 536871040,
                        122880: 0,
                        126976: 17039488,
                        67584: 553648256,
                        71680: 16777216,
                        75776: 17039360,
                        79872: 537133184,
                        83968: 536870912,
                        88064: 17039488,
                        92160: 128,
                        96256: 553910272,
                        100352: 262272,
                        104448: 553910400,
                        108544: 0,
                        112640: 553648128,
                        116736: 16777344,
                        120832: 262144,
                        124928: 537133056,
                        129024: 536871040
                    }, {
                        0: 268435464,
                        256: 8192,
                        512: 270532608,
                        768: 270540808,
                        1024: 268443648,
                        1280: 2097152,
                        1536: 2097160,
                        1792: 268435456,
                        2048: 0,
                        2304: 268443656,
                        2560: 2105344,
                        2816: 8,
                        3072: 270532616,
                        3328: 2105352,
                        3584: 8200,
                        3840: 270540800,
                        128: 270532608,
                        384: 270540808,
                        640: 8,
                        896: 2097152,
                        1152: 2105352,
                        1408: 268435464,
                        1664: 268443648,
                        1920: 8200,
                        2176: 2097160,
                        2432: 8192,
                        2688: 268443656,
                        2944: 270532616,
                        3200: 0,
                        3456: 270540800,
                        3712: 2105344,
                        3968: 268435456,
                        4096: 268443648,
                        4352: 270532616,
                        4608: 270540808,
                        4864: 8200,
                        5120: 2097152,
                        5376: 268435456,
                        5632: 268435464,
                        5888: 2105344,
                        6144: 2105352,
                        6400: 0,
                        6656: 8,
                        6912: 270532608,
                        7168: 8192,
                        7424: 268443656,
                        7680: 270540800,
                        7936: 2097160,
                        4224: 8,
                        4480: 2105344,
                        4736: 2097152,
                        4992: 268435464,
                        5248: 268443648,
                        5504: 8200,
                        5760: 270540808,
                        6016: 270532608,
                        6272: 270540800,
                        6528: 270532616,
                        6784: 8192,
                        7040: 2105352,
                        7296: 2097160,
                        7552: 0,
                        7808: 268435456,
                        8064: 268443656
                    }, {
                        0: 1048576,
                        16: 33555457,
                        32: 1024,
                        48: 1049601,
                        64: 34604033,
                        80: 0,
                        96: 1,
                        112: 34603009,
                        128: 33555456,
                        144: 1048577,
                        160: 33554433,
                        176: 34604032,
                        192: 34603008,
                        208: 1025,
                        224: 1049600,
                        240: 33554432,
                        8: 34603009,
                        24: 0,
                        40: 33555457,
                        56: 34604032,
                        72: 1048576,
                        88: 33554433,
                        104: 33554432,
                        120: 1025,
                        136: 1049601,
                        152: 33555456,
                        168: 34603008,
                        184: 1048577,
                        200: 1024,
                        216: 34604033,
                        232: 1,
                        248: 1049600,
                        256: 33554432,
                        272: 1048576,
                        288: 33555457,
                        304: 34603009,
                        320: 1048577,
                        336: 33555456,
                        352: 34604032,
                        368: 1049601,
                        384: 1025,
                        400: 34604033,
                        416: 1049600,
                        432: 1,
                        448: 0,
                        464: 34603008,
                        480: 33554433,
                        496: 1024,
                        264: 1049600,
                        280: 33555457,
                        296: 34603009,
                        312: 1,
                        328: 33554432,
                        344: 1048576,
                        360: 1025,
                        376: 34604032,
                        392: 33554433,
                        408: 34603008,
                        424: 0,
                        440: 34604033,
                        456: 1049601,
                        472: 1024,
                        488: 33555456,
                        504: 1048577
                    }, {
                        0: 134219808,
                        1: 131072,
                        2: 134217728,
                        3: 32,
                        4: 131104,
                        5: 134350880,
                        6: 134350848,
                        7: 2048,
                        8: 134348800,
                        9: 134219776,
                        10: 133120,
                        11: 134348832,
                        12: 2080,
                        13: 0,
                        14: 134217760,
                        15: 133152,
                        2147483648: 2048,
                        2147483649: 134350880,
                        2147483650: 134219808,
                        2147483651: 134217728,
                        2147483652: 134348800,
                        2147483653: 133120,
                        2147483654: 133152,
                        2147483655: 32,
                        2147483656: 134217760,
                        2147483657: 2080,
                        2147483658: 131104,
                        2147483659: 134350848,
                        2147483660: 0,
                        2147483661: 134348832,
                        2147483662: 134219776,
                        2147483663: 131072,
                        16: 133152,
                        17: 134350848,
                        18: 32,
                        19: 2048,
                        20: 134219776,
                        21: 134217760,
                        22: 134348832,
                        23: 131072,
                        24: 0,
                        25: 131104,
                        26: 134348800,
                        27: 134219808,
                        28: 134350880,
                        29: 133120,
                        30: 2080,
                        31: 134217728,
                        2147483664: 131072,
                        2147483665: 2048,
                        2147483666: 134348832,
                        2147483667: 133152,
                        2147483668: 32,
                        2147483669: 134348800,
                        2147483670: 134217728,
                        2147483671: 134219808,
                        2147483672: 134350880,
                        2147483673: 134217760,
                        2147483674: 134219776,
                        2147483675: 0,
                        2147483676: 133120,
                        2147483677: 2080,
                        2147483678: 131104,
                        2147483679: 134350848
                    }],
                    d = [4160749569, 528482304, 33030144, 2064384, 129024, 8064, 504, 2147483679],
                    p = r.DES = a.extend({
                        _doReset: function() {
                            for (var t = this._key, e = t.words, i = [], n = 0; 56 > n; n++) {
                                var s = l[n] - 1;
                                i[n] = e[s >>> 5] >>> 31 - s % 32 & 1
                            }
                            for (var o = this._subKeys = [], a = 0; 16 > a; a++) {
                                for (var r = o[a] = [], u = c[a], n = 0; 24 > n; n++) r[n / 6 | 0] |= i[(h[n] - 1 + u) % 28] << 31 - n % 6, r[4 + (n / 6 | 0)] |= i[28 + (h[n + 24] - 1 + u) % 28] << 31 - n % 6;
                                r[0] = r[0] << 1 | r[0] >>> 31;
                                for (var n = 1; 7 > n; n++) r[n] = r[n] >>> 4 * (n - 1) + 3;
                                r[7] = r[7] << 5 | r[7] >>> 27
                            }
                            for (var d = this._invSubKeys = [], n = 0; 16 > n; n++) d[n] = o[15 - n]
                        },
                        encryptBlock: function(t, e) {
                            this._doCryptBlock(t, e, this._subKeys)
                        },
                        decryptBlock: function(t, e) {
                            this._doCryptBlock(t, e, this._invSubKeys)
                        },
                        _doCryptBlock: function(t, n, s) {
                            this._lBlock = t[n], this._rBlock = t[n + 1], e.call(this, 4, 252645135), e.call(this, 16, 65535), i.call(this, 2, 858993459), i.call(this, 8, 16711935), e.call(this, 1, 1431655765);
                            for (var o = 0; 16 > o; o++) {
                                for (var a = s[o], r = this._lBlock, l = this._rBlock, h = 0, c = 0; 8 > c; c++) h |= u[c][((l ^ a[c]) & d[c]) >>> 0];
                                this._lBlock = l, this._rBlock = r ^ h
                            }
                            var p = this._lBlock;
                            this._lBlock = this._rBlock, this._rBlock = p, e.call(this, 1, 1431655765), i.call(this, 8, 16711935), i.call(this, 2, 858993459), e.call(this, 16, 65535), e.call(this, 4, 252645135), t[n] = this._lBlock, t[n + 1] = this._rBlock
                        },
                        keySize: 2,
                        ivSize: 2,
                        blockSize: 2
                    });
                n.DES = a._createHelper(p);
                var f = r.TripleDES = a.extend({
                    _doReset: function() {
                        var t = this._key,
                            e = t.words;
                        this._des1 = p.createEncryptor(o.create(e.slice(0, 2))), this._des2 = p.createEncryptor(o.create(e.slice(2, 4))), this._des3 = p.createEncryptor(o.create(e.slice(4, 6)))
                    },
                    encryptBlock: function(t, e) {
                        this._des1.encryptBlock(t, e), this._des2.decryptBlock(t, e), this._des3.encryptBlock(t, e)
                    },
                    decryptBlock: function(t, e) {
                        this._des3.decryptBlock(t, e), this._des2.encryptBlock(t, e), this._des1.decryptBlock(t, e)
                    },
                    keySize: 6,
                    ivSize: 2,
                    blockSize: 2
                });
                n.TripleDES = a._createHelper(f)
            }(),
            function() {
                function e() {
                    for (var t = this._S, e = this._i, i = this._j, n = 0, s = 0; 4 > s; s++) {
                        e = (e + 1) % 256, i = (i + t[e]) % 256;
                        var o = t[e];
                        t[e] = t[i], t[i] = o, n |= t[(t[e] + t[i]) % 256] << 24 - 8 * s
                    }
                    return this._i = e, this._j = i, n
                }
                var i = t,
                    n = i.lib,
                    s = n.StreamCipher,
                    o = i.algo,
                    a = o.RC4 = s.extend({
                        _doReset: function() {
                            for (var t = this._key, e = t.words, i = t.sigBytes, n = this._S = [], s = 0; 256 > s; s++) n[s] = s;
                            for (var s = 0, o = 0; 256 > s; s++) {
                                var a = s % i,
                                    r = e[a >>> 2] >>> 24 - a % 4 * 8 & 255;
                                o = (o + n[s] + r) % 256;
                                var l = n[s];
                                n[s] = n[o], n[o] = l
                            }
                            this._i = this._j = 0
                        },
                        _doProcessBlock: function(t, i) {
                            t[i] ^= e.call(this)
                        },
                        keySize: 8,
                        ivSize: 0
                    });
                i.RC4 = s._createHelper(a);
                var r = o.RC4Drop = a.extend({
                    cfg: a.cfg.extend({
                        drop: 192
                    }),
                    _doReset: function() {
                        a._doReset.call(this);
                        for (var t = this.cfg.drop; t > 0; t--) e.call(this)
                    }
                });
                i.RC4Drop = s._createHelper(r)
            }(), t.mode.CTRGladman = function() {
            function e(t) {
                if (255 === (t >> 24 & 255)) {
                    var e = t >> 16 & 255,
                        i = t >> 8 & 255,
                        n = 255 & t;
                    255 === e ? (e = 0, 255 === i ? (i = 0, 255 === n ? n = 0 : ++n) : ++i) : ++e, t = 0, t += e << 16, t += i << 8, t += n
                } else t += 1 << 24;
                return t
            }

            function i(t) {
                return 0 === (t[0] = e(t[0])) && (t[1] = e(t[1])), t
            }
            var n = t.lib.BlockCipherMode.extend(),
                s = n.Encryptor = n.extend({
                    processBlock: function(t, e) {
                        var n = this._cipher,
                            s = n.blockSize,
                            o = this._iv,
                            a = this._counter;
                        o && (a = this._counter = o.slice(0), this._iv = void 0), i(a);
                        var r = a.slice(0);
                        n.encryptBlock(r, 0);
                        for (var l = 0; s > l; l++) t[e + l] ^= r[l]
                    }
                });
            return n.Decryptor = s, n
        }(),
            function() {
                function e() {
                    for (var t = this._X, e = this._C, i = 0; 8 > i; i++) r[i] = e[i];
                    e[0] = e[0] + 1295307597 + this._b | 0, e[1] = e[1] + 3545052371 + (e[0] >>> 0 < r[0] >>> 0 ? 1 : 0) | 0, e[2] = e[2] + 886263092 + (e[1] >>> 0 < r[1] >>> 0 ? 1 : 0) | 0, e[3] = e[3] + 1295307597 + (e[2] >>> 0 < r[2] >>> 0 ? 1 : 0) | 0, e[4] = e[4] + 3545052371 + (e[3] >>> 0 < r[3] >>> 0 ? 1 : 0) | 0, e[5] = e[5] + 886263092 + (e[4] >>> 0 < r[4] >>> 0 ? 1 : 0) | 0, e[6] = e[6] + 1295307597 + (e[5] >>> 0 < r[5] >>> 0 ? 1 : 0) | 0, e[7] = e[7] + 3545052371 + (e[6] >>> 0 < r[6] >>> 0 ? 1 : 0) | 0, this._b = e[7] >>> 0 < r[7] >>> 0 ? 1 : 0;
                    for (var i = 0; 8 > i; i++) {
                        var n = t[i] + e[i],
                            s = 65535 & n,
                            o = n >>> 16,
                            a = ((s * s >>> 17) + s * o >>> 15) + o * o,
                            h = ((4294901760 & n) * n | 0) + ((65535 & n) * n | 0);
                        l[i] = a ^ h
                    }
                    t[0] = l[0] + (l[7] << 16 | l[7] >>> 16) + (l[6] << 16 | l[6] >>> 16) | 0, t[1] = l[1] + (l[0] << 8 | l[0] >>> 24) + l[7] | 0, t[2] = l[2] + (l[1] << 16 | l[1] >>> 16) + (l[0] << 16 | l[0] >>> 16) | 0, t[3] = l[3] + (l[2] << 8 | l[2] >>> 24) + l[1] | 0, t[4] = l[4] + (l[3] << 16 | l[3] >>> 16) + (l[2] << 16 | l[2] >>> 16) | 0, t[5] = l[5] + (l[4] << 8 | l[4] >>> 24) + l[3] | 0, t[6] = l[6] + (l[5] << 16 | l[5] >>> 16) + (l[4] << 16 | l[4] >>> 16) | 0, t[7] = l[7] + (l[6] << 8 | l[6] >>> 24) + l[5] | 0
                }
                var i = t,
                    n = i.lib,
                    s = n.StreamCipher,
                    o = i.algo,
                    a = [],
                    r = [],
                    l = [],
                    h = o.Rabbit = s.extend({
                        _doReset: function() {
                            for (var t = this._key.words, i = this.cfg.iv, n = 0; 4 > n; n++) t[n] = 16711935 & (t[n] << 8 | t[n] >>> 24) | 4278255360 & (t[n] << 24 | t[n] >>> 8);
                            var s = this._X = [t[0], t[3] << 16 | t[2] >>> 16, t[1], t[0] << 16 | t[3] >>> 16, t[2], t[1] << 16 | t[0] >>> 16, t[3], t[2] << 16 | t[1] >>> 16],
                                o = this._C = [t[2] << 16 | t[2] >>> 16, 4294901760 & t[0] | 65535 & t[1], t[3] << 16 | t[3] >>> 16, 4294901760 & t[1] | 65535 & t[2], t[0] << 16 | t[0] >>> 16, 4294901760 & t[2] | 65535 & t[3], t[1] << 16 | t[1] >>> 16, 4294901760 & t[3] | 65535 & t[0]];
                            this._b = 0;
                            for (var n = 0; 4 > n; n++) e.call(this);
                            for (var n = 0; 8 > n; n++) o[n] ^= s[n + 4 & 7];
                            if (i) {
                                var a = i.words,
                                    r = a[0],
                                    l = a[1],
                                    h = 16711935 & (r << 8 | r >>> 24) | 4278255360 & (r << 24 | r >>> 8),
                                    c = 16711935 & (l << 8 | l >>> 24) | 4278255360 & (l << 24 | l >>> 8),
                                    u = h >>> 16 | 4294901760 & c,
                                    d = c << 16 | 65535 & h;
                                o[0] ^= h, o[1] ^= u, o[2] ^= c, o[3] ^= d, o[4] ^= h, o[5] ^= u, o[6] ^= c, o[7] ^= d;
                                for (var n = 0; 4 > n; n++) e.call(this)
                            }
                        },
                        _doProcessBlock: function(t, i) {
                            var n = this._X;
                            e.call(this), a[0] = n[0] ^ n[5] >>> 16 ^ n[3] << 16, a[1] = n[2] ^ n[7] >>> 16 ^ n[5] << 16, a[2] = n[4] ^ n[1] >>> 16 ^ n[7] << 16, a[3] = n[6] ^ n[3] >>> 16 ^ n[1] << 16;
                            for (var s = 0; 4 > s; s++) a[s] = 16711935 & (a[s] << 8 | a[s] >>> 24) | 4278255360 & (a[s] << 24 | a[s] >>> 8), t[i + s] ^= a[s]
                        },
                        blockSize: 4,
                        ivSize: 2
                    });
                i.Rabbit = s._createHelper(h)
            }(), t.mode.CTR = function() {
            var e = t.lib.BlockCipherMode.extend(),
                i = e.Encryptor = e.extend({
                    processBlock: function(t, e) {
                        var i = this._cipher,
                            n = i.blockSize,
                            s = this._iv,
                            o = this._counter;
                        s && (o = this._counter = s.slice(0), this._iv = void 0);
                        var a = o.slice(0);
                        i.encryptBlock(a, 0), o[n - 1] = o[n - 1] + 1 | 0;
                        for (var r = 0; n > r; r++) t[e + r] ^= a[r]
                    }
                });
            return e.Decryptor = i, e
        }(),
            function() {
                function e() {
                    for (var t = this._X, e = this._C, i = 0; 8 > i; i++) r[i] = e[i];
                    e[0] = e[0] + 1295307597 + this._b | 0, e[1] = e[1] + 3545052371 + (e[0] >>> 0 < r[0] >>> 0 ? 1 : 0) | 0, e[2] = e[2] + 886263092 + (e[1] >>> 0 < r[1] >>> 0 ? 1 : 0) | 0, e[3] = e[3] + 1295307597 + (e[2] >>> 0 < r[2] >>> 0 ? 1 : 0) | 0, e[4] = e[4] + 3545052371 + (e[3] >>> 0 < r[3] >>> 0 ? 1 : 0) | 0, e[5] = e[5] + 886263092 + (e[4] >>> 0 < r[4] >>> 0 ? 1 : 0) | 0, e[6] = e[6] + 1295307597 + (e[5] >>> 0 < r[5] >>> 0 ? 1 : 0) | 0, e[7] = e[7] + 3545052371 + (e[6] >>> 0 < r[6] >>> 0 ? 1 : 0) | 0, this._b = e[7] >>> 0 < r[7] >>> 0 ? 1 : 0;
                    for (var i = 0; 8 > i; i++) {
                        var n = t[i] + e[i],
                            s = 65535 & n,
                            o = n >>> 16,
                            a = ((s * s >>> 17) + s * o >>> 15) + o * o,
                            h = ((4294901760 & n) * n | 0) + ((65535 & n) * n | 0);
                        l[i] = a ^ h
                    }
                    t[0] = l[0] + (l[7] << 16 | l[7] >>> 16) + (l[6] << 16 | l[6] >>> 16) | 0, t[1] = l[1] + (l[0] << 8 | l[0] >>> 24) + l[7] | 0, t[2] = l[2] + (l[1] << 16 | l[1] >>> 16) + (l[0] << 16 | l[0] >>> 16) | 0, t[3] = l[3] + (l[2] << 8 | l[2] >>> 24) + l[1] | 0, t[4] = l[4] + (l[3] << 16 | l[3] >>> 16) + (l[2] << 16 | l[2] >>> 16) | 0, t[5] = l[5] + (l[4] << 8 | l[4] >>> 24) + l[3] | 0, t[6] = l[6] + (l[5] << 16 | l[5] >>> 16) + (l[4] << 16 | l[4] >>> 16) | 0, t[7] = l[7] + (l[6] << 8 | l[6] >>> 24) + l[5] | 0
                }
                var i = t,
                    n = i.lib,
                    s = n.StreamCipher,
                    o = i.algo,
                    a = [],
                    r = [],
                    l = [],
                    h = o.RabbitLegacy = s.extend({
                        _doReset: function() {
                            var t = this._key.words,
                                i = this.cfg.iv,
                                n = this._X = [t[0], t[3] << 16 | t[2] >>> 16, t[1], t[0] << 16 | t[3] >>> 16, t[2], t[1] << 16 | t[0] >>> 16, t[3], t[2] << 16 | t[1] >>> 16],
                                s = this._C = [t[2] << 16 | t[2] >>> 16, 4294901760 & t[0] | 65535 & t[1], t[3] << 16 | t[3] >>> 16, 4294901760 & t[1] | 65535 & t[2], t[0] << 16 | t[0] >>> 16, 4294901760 & t[2] | 65535 & t[3], t[1] << 16 | t[1] >>> 16, 4294901760 & t[3] | 65535 & t[0]];
                            this._b = 0;
                            for (var o = 0; 4 > o; o++) e.call(this);
                            for (var o = 0; 8 > o; o++) s[o] ^= n[o + 4 & 7];
                            if (i) {
                                var a = i.words,
                                    r = a[0],
                                    l = a[1],
                                    h = 16711935 & (r << 8 | r >>> 24) | 4278255360 & (r << 24 | r >>> 8),
                                    c = 16711935 & (l << 8 | l >>> 24) | 4278255360 & (l << 24 | l >>> 8),
                                    u = h >>> 16 | 4294901760 & c,
                                    d = c << 16 | 65535 & h;
                                s[0] ^= h, s[1] ^= u, s[2] ^= c, s[3] ^= d, s[4] ^= h, s[5] ^= u, s[6] ^= c, s[7] ^= d;
                                for (var o = 0; 4 > o; o++) e.call(this)
                            }
                        },
                        _doProcessBlock: function(t, i) {
                            var n = this._X;
                            e.call(this), a[0] = n[0] ^ n[5] >>> 16 ^ n[3] << 16, a[1] = n[2] ^ n[7] >>> 16 ^ n[5] << 16, a[2] = n[4] ^ n[1] >>> 16 ^ n[7] << 16, a[3] = n[6] ^ n[3] >>> 16 ^ n[1] << 16;
                            for (var s = 0; 4 > s; s++) a[s] = 16711935 & (a[s] << 8 | a[s] >>> 24) | 4278255360 & (a[s] << 24 | a[s] >>> 8), t[i + s] ^= a[s]
                        },
                        blockSize: 4,
                        ivSize: 2
                    });
                i.RabbitLegacy = s._createHelper(h)
            }(), t.pad.ZeroPadding = {
            pad: function(t, e) {
                var i = 4 * e;
                t.clamp(), t.sigBytes += i - (t.sigBytes % i || i)
            },
            unpad: function(t) {
                for (var e = t.words, i = t.sigBytes - 1; !(e[i >>> 2] >>> 24 - i % 4 * 8 & 255);) i--;
                t.sigBytes = i + 1
            }
        }, t
    }), define("service/imageService", ["service/Base", "wishbeen/wishbeen", "crypto-js"], function(t, e, i) {
    var n = {};
    return n.isEncoded = function(t) {
        return "string" == typeof t && decodeURI(t) !== t
    }, n.getSafetyEncodeUrl = function(t) {
        try {
            return n.isEncoded(t) ? encodeURI(decodeURI(t)) : encodeURI(t)
        } catch (e) {
            return t
        }
    }, n.getImageUrl = function(t) {
        if (!t || !t.image || !t.image.original) return "";
        var e = this.getSafetyEncodeUrl(t.image.original.src);
        return e ? t.thumbnail || t.size ? n.getThumborUrl({
            src: e,
            size: t.size,
            upscale: t.upscale
        }) : e : ""
    }, n.getThumborUrl = function(t) {
        if (!t || !t.src) return "";
        if (t.src.indexOf("akamaized.net") < 0) return t.src;
        t.size && _.isNumber(t.size.width) || (t.size = {
            width: 640,
            height: 0
        }), _.isNumber(t.size.height) || (t.size.height = 0);
        var n = t.src,
            s = t.size.width + "x" + (t.size.height || ""),
            o = "smart",
            a = "";
        t.upscale || (a = "filters:no_upscale()/");
        var r = s + "/" + o + "/" + a,
            l = n.replace(/^https?:\/\//, ""),
            h = i.HmacSHA1(r + l, "WISHBEEN_SECURE_KEY").toString(i.enc.Base64);
        return h = h.replace(/\+/g, "-").replace(/\//g, "_"), e.getThumbnailServerUrl() + "/" + h + "/" + r + l
    }, n.getImageSize = function(t) {
        var e;
        if (t) return e = t.original, e && e.src && e.height && e.width ? {
            width: parseInt(e.width),
            height: parseInt(e.height)
        } : null
    }, n.getImagePosition = function(t) {
        return t && t.position ? t.position : {
            top: 0,
            left: 0
        }
    }, n
}), define("model/user/User", ["service/imageService", "wishbeen/wishbeen"], function(t, e) {
    function i(t) {
        if (t)
            for (var e in t) this[e] = t[e]
    }
    return i.prototype.getId = function() {
        return this._id ? this._id : this.user_id
    }, i.prototype.getThumbImage = function(e) {
        return e = e || {}, e.image = this.profileImg, t.getImageUrl(e)
    }, i.prototype.getMyPage = function() {
        return "/myPage/user/" + this.getId()
    }, i.prototype.getMyPlan = function() {
        return "/myPage/user/" + this.getId() + "?active=myPlan"
    }, i.prototype.getName = function() {
        return this.nickname
    }, i.prototype.getFacebookUrl = function() {
        return this.facebookUrl ? this.facebookUrl : !1
    }, i.prototype.getGoogleUrl = function() {
        return this.googleUrl ? this.googleUrl : !1
    }, i.prototype.getHomePageUrl = function() {
        return this.homepageUrl ? this.homepageUrl : !1
    }, i
}), define("model/user/Me", ["model/user/User", "controller/modalController"], function(t, e) {
    function i() {
        g_data.me && t.call(this, g_data.me)
    }
    return i.prototype = t.prototype, i.prototype.isLogin = function() {
        return g_isLogin
    }, i.prototype.openLoginModal = function(t) {
        0 == g_isLogin ? e.openModal("#login-modal", {
            controller: "controller/login/loginController",
            views: {
                url: "/modal/login",
                cache: !0
            }
        }) : t && t()
    }, new i
}), define("model/preview/Preview", ["service/imageService"], function(t) {
    function e(t) {
        if (t)
            for (var e in t) this[e] = t[e]
    }
    return e.LINK_TYPE = {
        YOUTUBE: "youtube",
        PLAN: "plan",
        SPOT: "spot",
        POST: "post",
        WEBSITE: "website"
    }, e.prototype.getUrl = function() {
        return this.url || ""
    }, e.prototype.getEmbedUrl = function() {
        return "https://www.youtube.com/embed/" + this.id
    }, e.prototype.getType = function() {
        return this.type
    }, e.prototype.getTitle = function() {
        return this.title || ""
    }, e.prototype.getId = function() {
        return this.id
    }, e.prototype.getImageUrl = function() {
        return t.getImageUrl({
            image: this.image
        })
    }, e.prototype.getDescription = function() {
        return this.description || ""
    }, e.prototype.getData = function() {
        return this.data || {}
    }, e.prototype.getPlanImagePosition = function(e) {
        var i, n = t.getImagePosition(this.image);
        return i = n.height && e ? {
            top: n.top / 2.38,
            left: n.left,
            height: n.height / 2.38
        } : n
    }, e
}), define("model/note/Note", ["vendor/dateFormat", "model/user/Me", "model/user/User", "model/preview/Preview", "service/imageService", "wishbeen/dispatch", "wishbeen/common"], function(t, e, i, n, s, o, a) {
    function r(t) {
        if (t) {
            for (var e in t) this[e] = t[e];
            this.author !== typeof i && this.author && (this.author = new i(this.author)), this.controllers = []
        }
        if (!this.typeOfEvent && this.getWroteAtPlan()) {
            var s = this.getWroteAtPlan();
            s && s.noteInfo && s.noteInfo.type && (this.typeOfEvent = s.noteInfo.type)
        }
        if (this.content && this.content.length > 0)
            for (var o = 0; o < this.content.length; o++) "preview" === this.content[o].type && (this.content[o].data = new n(this.content[o].data))
    }

    function l() {
        return h + c++
    }
    var h = "tempNote-",
        c = 0;
    return r.prototype.setToTempId = function() {
        this._id = l()
    }, r.prototype.setParent = function(t) {
        this.parent = t
    }, r.prototype.getId = function() {
        return this._id
    }, r.prototype.setId = function(t) {
        return this._id = t
    }, r.prototype.getType = function() {
        return this.type
    }, r.prototype.isTempNote = function() {
        var t = this._id.indexOf(h);
        return -1 === t
    }, r.prototype.setController = function(t) {
        this.controllers.push(t)
    }, r.prototype.getController = function() {
        return this.controllers.length > 0 ? this.controllers[this.controllers.length - 1] : void 0
    }, r.prototype.getAllController = function() {
        return this.controllers
    }, r.prototype.removeCurrentController = function() {
        this.controllers.length > 0 && this.controllers.splice(this.controllers.length - 1, 1)
    }, r.prototype.removeController = function(t) {
        var e = this.controllers.indexOf(t); - 1 !== e && this.controllers.splice(e, 1)
    }, r.prototype.getTitle = function() {
        return this.title ? this.title : ""
    }, r.prototype.isMine = function() {
        return this.author && e.getId() === this.author.getId()
    }, r.prototype.isOriginal = function() {
        return this.parent && this.parent.isOriginal && this.parent.isOriginal(this)
    }, r.prototype.enableSubtract = function() {
        return this.isOriginal() ? !1 : this.parent && this.parent.enableSubtractNote && this.parent.enableSubtractNote()
    }, r.prototype.hasSubInfo = function() {
        return this.costs && this.costs.length > 0 ? !0 : this.tags && this.tags.length > 0 ? !0 : !1
    }, r.prototype.getContent = function() {
        return this.content
    }, r.prototype.getContentImageData = function(t) {
        if (t >= this.content.length) return "";
        var e = this.content[t];
        return e && "image" == e.type ? e.data : ""
    }, r.prototype.getContentImageUrl = function(t) {
        t = t || {};
        var e = this.getContentImageData(t.index);
        return t.image = e, s.getImageUrl(t)
    }, r.prototype.getContentImageSize = function(t) {
        var e = this.getContentImageData(t),
            i = s.getImageSize(e);
        return i || {}
    }, r.prototype.getContentText = function(t) {
        if (t >= this.content.length) return "";
        var e = this.content[t];
        return e && "html" == e.type ? e.data : ""
    }, r.prototype.getCreatedTime = function() {
        if (!this.createdAt) return "";
        var t = new Date(this.createdAt);
        return t.format("yyyy/mm/dd HH:MM")
    }, r.prototype.getLikeCount = function() {
        return this.likeCount ? this.likeCount : 0
    }, r.prototype.setLikeCount = function(t) {
        this.likeCount = t
    }, r.prototype.getCommentCount = function() {
        return this.commentCount ? this.commentCount : 0
    }, r.prototype.setCommentCount = function(t) {
        this.commentCount = t
    }, r.prototype.getIsAlreadyLike = function() {
        return this.isAlreadyLike
    }, r.prototype.setIsAlreadyLike = function(t) {
        this.isAlreadyLike = t
    }, r.prototype.toggleLike = function() {
        this.isAlreadyLike ? (this.isAlreadyLike = !1, this.likeCount--) : (this.isAlreadyLike = !0, this.likeCount++)
    }, r.prototype.getCosts = function() {
        return this.costs ? this.costs : []
    }, r.prototype.getTags = function() {
        return this.tags
    }, r.prototype.getWroteAtSpot = function() {
        return this.wroteAtSpot
    }, r.prototype.getAddress = function() {
        return this.location && this.location.address ? this.location.address : !1
    }, r.prototype.setWroteAtSpot = function(t) {
        this.wroteAtSpot = {
            _id: t.id,
            name: t.name
        }
    }, r.prototype.setCreatedAt = function(t) {
        this.createdAt = t
    }, r.prototype.getCreatedAt = function() {
        return this.createdAt
    }, r.prototype.setUpdatedAt = function(t) {
        this.updatedAt = t
    }, r.prototype.getUpdatedAt = function() {
        return this.updatedAt
    }, r.prototype.setAddedAt = function(t) {
        this.addedAt = t
    }, r.prototype.getAddedAt = function() {
        return this.addedAt
    }, r.prototype.getIsAlreadyAdded = function() {
        return this.isAlreadyAdded
    }, r.prototype.setIsAlreadyAdded = function(t) {
        this.isAlreadyAdded = t
    }, r.prototype.setCmdToInsert = function() {
        this.cmd = "insert"
    }, r.prototype.setCmdToUpdate = function() {
        "insert" !== this.cmd && (this.cmd = "update")
    }, r.prototype.setCmdToDelete = function() {
        this.cmd = "delete"
    }, r.prototype.setCmdToAdded = function() {
        this.cmd = "added"
    }, r.prototype.setCmdToDeletePurge = function() {
        this.cmd = "deletePurge"
    }, r.prototype.getCommand = function(t) {
        return this.cmd
    }, r.prototype.setWroteAtPlan = function(t) {
        return t.id && t.name && !isNaN(t.day) && !isNaN(t.time) && t.type ? void(this.wroteAtPlan = {
            _id: t.id,
            name: t.name,
            noteInfo: {
                day: t.day + 1,
                time: t.time,
                type: t.type
            }
        }) : void 0
    }, r.prototype.isMySpot = function() {
        return this.wroteAtPlan && this.wroteAtPlan.noteInfo && "my-spot" == this.wroteAtPlan.noteInfo.type
    }, r.prototype.getWroteAtPlan = function() {
        return this.wroteAtPlan ? this.wroteAtPlan : void 0
    }, r.prototype.getWroteAtPlanName = function() {
        return this.wroteAtPlan && this.wroteAtPlan.name ? this.wroteAtPlan.name.replace(/\&amp;/g, "&") : ""
    }, r.prototype.setWroteAtSpot = function(t) {
        this.wroteAtSpot = t
    }, r.prototype.getWroteAtSpot = function() {
        return this.wroteAtSpot
    }, r.prototype.getWroteAtSpotName = function() {
        return this.wroteAtSpot && this.wroteAtSpot.name ? this.wroteAtSpot.name : ""
    }, r.prototype.setAuthorToMe = function() {
        this.author = e
    }, r.prototype.getWroteAtPlanDay = function() {
        var t = this.getWroteAtPlan();
        return t && t.noteInfo ? t.noteInfo.day - 1 : -1
    }, r.prototype.getWroteAtPlanTime = function() {
        var t = this.getWroteAtPlan();
        return t && t.noteInfo ? t.noteInfo.time : -1
    }, r.prototype.setWroteAtPlanDay = function(t) {
        var e = this.getWroteAtPlan();
        return e && e.noteInfo && (e.noteInfo.day = t + 1), !1
    }, r.prototype.setWroteAtPlanTime = function(t) {
        var e = this.getWroteAtPlan();
        return e && e.noteInfo && (e.noteInfo.time = t), !1
    }, r.prototype.equal = function(t) {
        return t && t.getId && this.getId() === t.getId() ? !0 : !1
    }, r.prototype.copy = function(t) {
        if (this !== t)
            for (var e in t) this[e] = t[e]
    }, r.prototype.getPlanUrl = function() {
        return this.wroteAtPlan && this.wroteAtPlan._id ? "/plan/" + this.wroteAtPlan._id : ""
    }, r.prototype.getSpotUrl = function() {
        return this.wroteAtSpot && this.wroteAtSpot._id ? "/spot/" + this.wroteAtSpot._id : ""
    }, r.prototype.getFinalSaveData = function() {
        var t = this.wroteAtSpot && this.wroteAtSpot._id ? this.wroteAtSpot._id : this.wroteAtSpot,
            e = {
                _id: this._id,
                type: this.type,
                title: this.title,
                createdAt: this.createdAt,
                updatedAt: this.updatedAt,
                costs: this.costs,
                tags: this.tags,
                location: this.location,
                locationWrote: this.locationWrote,
                content: this.content,
                wroteAtPlan: this.wroteAtPlan,
                wroteAtSpot: t,
                cmd: this.cmd,
                addedAt: this.addedAt
            };
        for (var i in e) {
            var n = e[i];
            (void 0 === n || null === n) && delete e[i]
        }
        return e
    }, r.prototype.updateTo = function(t) {
        this.copy(t), this.setCmdToUpdate(), o.dispatchEvent("UPDATED_NOTE_BY_NOTE_MODEL", this)
    }, r.prototype.getTypeOfEvent = function() {
        return this.typeOfEvent
    }, r.prototype.getReadCount = function() {
        return this.queryCount
    }, r.prototype.getUrlToShareByInfluencer = function(t) {
        return "https://" + window.location.hostname + "/post/" + this._id + "?ifId=" + t
    }, r.prototype.applySavedNote = function(t) {
        t && this.cmd && "delete" != this.cmd && "deletePurge" != this.cmd && a.getTimeForKey(t.addedAt) === a.getTimeForKey(this.addedAt) && ("insert" === this.cmd ? (delete this.cmd, this.createdAt = t.createdAt, this.updatedAt = t.updatedAt, this.setId(t._id), this.publish = t.publish, this.language = t.language) : "update" === this.cmd && (delete this.cmd, this.updatedAt = t.updatedAt))
    }, r
}), define("view/preview/PreviewView", ["jquery", "model/preview/Preview"], function(t, e) {
    function i(t) {
        t = t || {}, this.preview = t.model
    }
    return i.prototype.getYoutubePreviewHtml = function(t) {
        var e = "";
        return e = t ? '<img src="https://img.youtube.com/vi/' + this.preview.getId() + '/mqdefault.jpg">' : '<iframe width="100%" height="100%" src="' + this.preview.getEmbedUrl() + '" frameborder="0" allowfullscreen></iframe>', "<div class='preview media'>" + e + "</div>"
    }, i.prototype.getWebsitePreviewHtml = function() {
        var t = this.preview.getImageUrl() ? "" : "notimg",
            e = this.preview.getImageUrl() ? '<span class=thumb-nail><img src="' + this.preview.getImageUrl() + '" alt=""></span>' : "",
            i = '<div class="preview outer"><div class="preview-wrap ' + t + '"><a target="_blank" href="' + this.preview.getUrl() + '"><p class="tit">' + this.preview.getTitle() + '</p><p class="desc">' + this.preview.getDescription() + '</p><span class="link">' + this.preview.getUrl() + "</span>" + e + "</a></div></div>";
        return i
    }, i.prototype.getPreviewHtml = function(t, i) {
        var n = "",
            s = this.preview.getType();
        return s === e.LINK_TYPE.YOUTUBE ? n = this.getYoutubePreviewHtml(i) : s === e.LINK_TYPE.WEBSITE ? n = this.getWebsitePreviewHtml() : s === e.LINK_TYPE.PLAN ? n = this.getPlanPreviewHtml() : s === e.LINK_TYPE.POST ? n = this.getPostPreviewHtml() : s === e.LINK_TYPE.SPOT && (n = this.getSpotPreviewHtml()), t ? '<div class="medium-editor-url-preview" contenteditable="false" data-url="' + this.preview.getUrl() + '">' + n + "</div>" : n
    }, i.prototype.getPlanImagePositionString = function(t) {
        var e = this.preview.getPlanImagePosition(t),
            i = "";
        return _.isNumber(e.top) && (i += "top:" + parseInt(e.top) + "px;"), _.isNumber(e.left) && (i += "left:" + parseInt(e.left) + "px;"), _.isNumber(e.height) && (i += "height:" + parseInt(e.height) + "px;"), i
    }, i.prototype.getPlanPreviewHtml = function() {
        var t = "";
        return this.preview.getData().country && (t = "<span>" + this.preview.getData().country + "</span>"), '<div class="preview inner"><div class="preview-wrap content-slider"><div class="plan-contents"><a target="_blank" href="' + this.preview.getUrl() + '"><div class="cover-img"><img src="' + this.preview.getImageUrl() + '"><div class="tit"><p>' + this.preview.getTitle() + '</p><div class="desc">' + t + "<span>" + this.preview.getData().maxDay + g_localizedString._Days_ + "</span><span>" + this.preview.getData().tourState + "</span></div></div></div></a></div></div></div>"
    }, i.prototype.noteTypeToColorBtn = function(t) {
        var e = ["btn-talk", "btn-info", "btn-memo", "btn-journal", "btn-reviews", "btn-ask"];
        return e[t]
    }, i.prototype.getNoteTypeLabel = function(t) {
        var e = g_localizedString._Talk_;
        switch (t) {
            case 0:
                e = g_localizedString._Talk_;
                break;
            case 1:
                e = g_localizedString._Info_;
                break;
            case 2:
                e = g_localizedString._Memo_;
                break;
            case 3:
                e = g_localizedString._Journal_;
                break;
            case 4:
                e = g_localizedString._Review_;
                break;
            case 5:
                e = g_localizedString._Ask_
        }
        return e
    }, i.prototype.getPostPreviewHtml = function() {
        var t = this.preview.getImageUrl() ? "" : "notimg",
            e = this.preview.getImageUrl() ? '<span class="community-img"><img src="' + this.preview.getImageUrl() + '"></span>' : "";
        return '<div class="preview inner"><div class="preview-wrap content-slider"><div class="community-contents"><a target="_blank" href="' + this.preview.getUrl() + '">' + e + '<div class="community-info-box ' + t + '"><h4 class="community-tit"><span class="' + this.noteTypeToColorBtn(this.preview.getData().type) + '">' + this.getNoteTypeLabel(this.preview.getData().type) + "</span><span>" + this.preview.getTitle() + '</span></h4><div class="long-desc">' + this.preview.getDescription() + '</div><div class="user-name"><p>' + this.preview.getData().nickname + "</p></div></div></a></div></div></div>"
    }, i.prototype.getSpotPreviewHtml = function() {
        return '<div class="preview inner"><div class="preview-wrap content-slider"><div class="spot-contents"><a target="_blank" href="' + this.preview.getUrl() + '"><span class="spot-img"><img src="' + this.preview.getImageUrl() + '" alt="img"></span><div class="spot-info-box spot-type0' + this.preview.getData().cat1 + '"><h4 class="spot-name">' + this.preview.getTitle() + '</h4><span class="spot-state">' + this.preview.getDescription() + '</span><div class="desc"><span class="town">' + this.preview.getData().country + " " + this.preview.getData().city + '</span><span class="popular">' + g_localizedString._PopularCount_ + " " + this.preview.getData().popularity + '</span></div><div class="count-box"><span class="btn-post"><span>' + this.preview.getData().noteCount + "</span> " + g_localizedString._posts_ + "</span></div></div></a></div></div></div>"
    }, i
}), define("view/note/NoteView", ["jquery", "view/preview/PreviewView"], function(t, e) {
    function i(t) {
        t && t.noteModel && (this.note = t.noteModel, this.mode = t.mode)
    }
    return i.prototype.getTypeLabel = function(t) {
        t = t || this.note.type;
        var e = g_localizedString._Talk_;
        switch (t) {
            case 0:
                e = g_localizedString._Talk_;
                break;
            case 1:
                e = g_localizedString._Info_;
                break;
            case 2:
                e = g_localizedString._Memo_;
                break;
            case 3:
                e = g_localizedString._Journal_;
                break;
            case 4:
                e = g_localizedString._Review_;
                break;
            case 5:
                e = g_localizedString._Ask_
        }
        return e
    }, i.prototype.noteTypeToColorBtn = function(t) {
        var e = ["btn-talk", "btn-info", "btn-memo", "btn-journal", "btn-reviews", "btn-ask"];
        return e[t]
    }, i.prototype.getTagHtml = function() {
        if (this.note.tags && this.note.tags.length > 0) {
            for (var t = '<div class="note-info-inner-box tag">', e = 0; e < this.note.tags.length; e++) {
                var i = 0 === e ? "note-list tag" : "note-list";
                t += '<p class="' + i + '">' + this.note.tags[e] + "</p>"
            }
            t += "</div>"
        }
        return t || ""
    }, i.prototype.getImageHeight = function(t, e) {
        if (!e) return "auto";
        var i = this.note.getContentImageSize(t),
            n = e / i.width,
            s = i.height ? i.height * n + "px;" : "auto;";
        return s
    }, i.prototype.getImageHtml = function(t) {
        t = t || {};
        var e = this.note.getContentImageUrl(t),
            i = this.getImageHeight(t.index, t.containerWidth),
            n = '<div class="medium-insert-images ui-sortable" contenteditable="false"><figure class="editor-insert-image"><a class="editor-img-cnl hide"><img src="/images/btn-editor-img-cnl.png" alt=""/></a><img src="' + e + '" style="height: ' + i + '"></figure></div>';
        return n
    }, i.prototype.getContentHtml = function(t) {
        var i = "",
            n = this.note.getContent();
        if (!n) return "";
        for (var s = 0; s < n.length; s++)
            if ("html" === n[s].type) 0 !== n[s].data.indexOf("<") && (n[s].data = "<p>" + n[s].data + "</p>"), i += n[s].data;
            else if ("image" === n[s].type) i += this.getImageHtml({
                index: s,
                containerWidth: t,
                size: {
                    width: 880
                }
            });
            else if ("preview" === n[s].type) {
                var o = new e({
                    model: n[s].data
                });
                i += o.getPreviewHtml(!0)
            } else 0;
        return i
    }, i
}), define("view/note/NoteEditView", ["jquery", "view/note/NoteView"], function(t, e) {
    function i(i) {
        e.call(this, i), i && (this.noteModel = i.noteModel, this.mode = i.mode), this.element = t("#note-edit-modal")
    }
    var n = new e;
    return i.prototype = new e, i.prototype.getContentHtml = function() {
        var e = n.getContentHtml.call(this),
            i = t(e).first(),
            s = t(e).last();
        return (i.hasClass("medium-insert-images") || i.hasClass("medium-editor-url-preview")) && (e = "<p><br></p>" + e), (s.hasClass("medium-insert-images") || s.hasClass("medium-editor-url-preview")) && (e += "<p><br></p>"), e
    }, i.prototype.getTitleHtml = function() {
        var t = "";
        return t += '<div class="category dropdown">', t += '<a class="dropdown-toggle note-category-selected" data-toggle="dropdown" aria-expanded="true">', t += "</a>", t += '<div class="dropdown-menu"><ul class="note-category-options">', 2 !== this.noteModel.notType && (t += '<li><a data-value="2">' + g_localizedString._Memo_ + "</a></li>"), 1 !== this.noteModel.notType && (t += '<li><a data-value="1">' + g_localizedString._Information_ + "</a></li>"), 3 !== this.noteModel.notType && (t += '<li><a data-value="3">' + g_localizedString._Journal_ + "</a></li>"), 4 !== this.noteModel.notType && (t += '<li><a data-value="4">' + g_localizedString._Review_ + "</a></li>"), 0 !== this.noteModel.notType && (t += '<li><a data-value="0">' + g_localizedString._Talk_ + "</a></li>"), 5 !== this.noteModel.notType && (t += '<li><a data-value="5">' + g_localizedString._Ask_ + "</a></li>"), t += '</ul><span class="icon-dropdown"><img src="/images/icon-nav-dropdown.png" alt=""></span></div>', t += "</div>", t += '<div class="title"><div><p title="subject"><input type="text" name="" id="note-title-input" maxlength="200" placeholder="' + g_localizedString._Title_ + '" value="' + this.noteModel.getTitle() + '" /></p></div></div>'
    }, i.prototype.titleDraw = function() {
        var t, e = this.getTitleHtml(),
            i = this.noteModel.getType();
        i && 99 !== i || (i = 0), i || "spot" !== this.mode || (i = 4), this.element.find("#note_title_panel").empty(), this.element.find("#note_title_panel").append(e), t = this.element.find(".note-category-options > li > a[data-value=" + i + "]").text(), this.element.find(".note-category-selected").text(t)
    }, i.prototype.bindHandlers = function(e) {
        var i = this;
        e.changeNoteType && this.element.find(".note-category-options li a").unbind("click").click(function() {
            i.element.find(".note-category-selected").text(t(this).text()), e.changeNoteType(t(this).data("value"))
        }), e.clickNoteLocationButton && this.element.find("#note-location-button").unbind("click").click(function() {
            t(this).addClass("active"), e.clickNoteLocationButton(), WebTrackingSendEvent("writePost", "postSpot")
        }), e.clickNoteBudgetButton && this.element.find("#note-budget-button").unbind("click").click(function() {
            t(this).addClass("active"), e.clickNoteBudgetButton(), WebTrackingSendEvent("writePost", "postBudget")
        }), e.clickNoteTagButton && this.element.find("#note-tag-button").unbind("click").click(function() {
            t(this).addClass("active"), e.clickNoteTagButton(), WebTrackingSendEvent("writePost", "postTag")
        }), e.clickNoteSaveButton && this.element.find("#btn-save").unbind("click").click(function() {
            e.clickNoteSaveButton(), WebTrackingSendEvent("writePost", "postSave")
        }), e.clickNoteCancelButton && this.element.find(".btn-note-edit-cancel").unbind("click").click(function() {
            e.clickNoteCancelButton(), WebTrackingSendEvent("writePost", "postCancel")
        })
    }, i.prototype.triggerNoteLocationButton = function() {
        this.element.find("#note-location-button").trigger("click")
    }, i.prototype.triggerNoteBudgetButton = function() {
        this.element.find("#note-budget-button").trigger("click")
    }, i.prototype.triggerNoteTagButton = function() {
        this.element.find("#note-tag-button").trigger("click")
    }, i.prototype.getEditorParentId = function() {
        return "editor_panel"
    }, i.prototype.getNoteLocationParentId = function() {
        return "note_location_panel"
    }, i.prototype.getNoteBudgetParentId = function() {
        return "note_budget_panel"
    }, i.prototype.getNoteTagParentId = function() {
        return "note_tag_panel"
    }, i.prototype.getNoteTitleValue = function() {
        return this.element.find("#note-title-input").val()
    }, i.prototype.isHideNoteLocationParent = function() {
        return this.element.find("#" + this.getNoteLocationParentId()).hasClass("hide")
    }, i.prototype.isHideNoteBudgetParent = function() {
        return this.element.find("#" + this.getNoteBudgetParentId()).hasClass("hide")
    }, i.prototype.isHideNoteTagParent = function() {
        return this.element.find("#" + this.getNoteTagParentId()).hasClass("hide")
    }, i
}), define("view/note/partial/EditorView", ["jquery", "wishbeen/common"], function(t, e) {
    function i(t) {
        t && t.noteModel && (this.noteModel = t.noteModel)
    }
    return i.prototype.draw = function(e) {
        var i = e.contentHtml ? e.contentHtml : "";
        this.parentId = e.parentId, this.parentElement = t("#" + this.parentId), this.parentElement.append(i), this.checkAndActivePhotoButton()
    }, i.prototype.bindHandlers = function(e) {
        e.disableImageDrag && this.getEditorImages().mousedown(function() {
            return !1
        }), e.clickPhotoButton &&
        (e.clickPhotoButton(), WebTrackingSendEvent("writePost", "postPhoto")), e.clickDeleteImage
        && (this.parentElement.find("div.medium-insert-images a.editor-img-cnl").removeClass("hide"), this.parentElement.find("div.medium-insert-images a.editor-img-cnl").unbind("click").click(function() {
            var i = t(this).parents("div.medium-insert-images").attr("id");
            return t(this).parents("div.medium-insert-images").remove(), e.clickDeleteImage(i), !1
        }))
    }, i.prototype.setEditorImageId = function(t) {
        var e = this.parentElement.find(".medium-insert-images").eq(t);
        e.attr("id", "editor-image-" + t)
    }, i.prototype.makeImageHtml = function(t, e) {
        var i = '<div class="medium-insert-images" id="' + t + '" contenteditable="false"><figure contenteditable="false"><a href="" class="editor-img-cnl"><img src="/images/btn-editor-img-cnl.png" alt=""></a><img src="' + e + '" alt=""></figure></div><p class="focused-element"><br></p>';
        return i
    }, i.prototype.addEditorImage = function(t, e) {
        var i;
        0 === this.getFocusedElement().length && 0 === this.getEditorLastElement().length && (this.getParentElement().removeClass("medium-editor-placeholder"), this.getParentElement().append("<p></p>")), this.getFocusedElement().length > 1 && this.clearFocusedElement(), i = this.getFocusedElement().length > 0 ? this.getFocusedElement() : this.getEditorLastElement(), this.clearFocusedElement(), i.after(this.makeImageHtml(t, e))
    }, i.prototype.getEditorTextLength = function() {
        var e = 0;
        return this.getEditorData().each(function(i, n) {
            e += t(n).text().length
        }), e
    }, i.prototype.sanitizeEditor = function() {
        t("#" + this.parentId + " > div.medium-insert-images:not([id])").remove(), t("#" + this.parentId + " img").each(function() {
            0 === t(this).parents(".medium-insert-images").length && t(this).attr("src").indexOf("data:image") > -1 && t(this).remove()
        }), this.clearFocusedElement(), "" === t("#" + this.parentId).children("p").first().html() && t("#" + this.parentId).children("p").first().remove(), e.getBrowserType().indexOf("IE") > -1 && 0 === t("#" + this.parentId + " p").length && t("#" + this.parentId).append("<p></p>"), t("#" + this.parentId + " div.medium-insert-images[id]").each(function(e, i) {
            "DIV" !== t(this).parent()[0].tagName && t(this).parents("p").after(t(this))
        })
    }, i.prototype.checkAndActivePhotoButton = function() {
        this.parentElement.find(".medium-insert-images").length > 0 ? t("#note-photo-button").addClass("active") : t("#note-photo-button").removeClass("active")
    }, i.prototype.clearFocusedElement = function() {
        this.getParentElement().find(".focused-element").removeClass("focused-element")
    }, i.prototype.showImageLoading = function() {
        t(".note-loading").removeClass("hide")
    }, i.prototype.hideImageLoading = function() {
        t(".note-loading").addClass("hide")
    }, i.prototype.getParentElement = function() {
        return this.parentElement
    }, i.prototype.getEditorData = function() {
        return t("#" + this.parentId).children()
    }, i.prototype.getEditorImages = function() {
        return t("#" + this.parentId + " > div.medium-insert-images[id]")
    }, i.prototype.getEditorAElements = function() {
        return t("#" + this.parentId + " > p a")
    }, i.prototype.getFocusedElement = function() {
        return t("#" + this.parentId + " .focused-element")
    }, i.prototype.getEditorLastElement = function() {
        return t("#" + this.parentId + " > p:last")
    }, i
}), define("service/previewService", ["wishbeen/httpUtil"], function(t) {
    function e() {}
    return e.getPreview = function(e, i) {
        t.get("/v2.5/ajax/preview", {
            url: e
        }, function(t, e) {
            i && i(t, e)
        })
    }, e
}), "classList" in document.createElement("_") || ! function(t) {
    "use strict";
    if ("Element" in t) {
        var e = "classList",
            i = "prototype",
            n = t.Element[i],
            s = Object,
            o = String[i].trim || function() {
                return this.replace(/^\s+|\s+$/g, "")
            },
            a = Array[i].indexOf || function(t) {
                for (var e = 0, i = this.length; i > e; e++)
                    if (e in this && this[e] === t) return e;
                return -1
            },
            r = function(t, e) {
                this.name = t, this.code = DOMException[t], this.message = e
            },
            l = function(t, e) {
                if ("" === e) throw new r("SYNTAX_ERR", "An invalid or illegal string was specified");
                if (/\s/.test(e)) throw new r("INVALID_CHARACTER_ERR", "String contains an invalid character");
                return a.call(t, e)
            },
            h = function(t) {
                for (var e = o.call(t.getAttribute("class") || ""), i = e ? e.split(/\s+/) : [], n = 0, s = i.length; s > n; n++) this.push(i[n]);
                this._updateClassName = function() {
                    t.setAttribute("class", this.toString())
                }
            },
            c = h[i] = [],
            u = function() {
                return new h(this)
            };
        if (r[i] = Error[i], c.item = function(t) {
            return this[t] || null
        }, c.contains = function(t) {
            return t += "", -1 !== l(this, t)
        }, c.add = function() {
            var t, e = arguments,
                i = 0,
                n = e.length,
                s = !1;
            do t = e[i] + "", -1 === l(this, t) && (this.push(t), s = !0); while (++i < n);
            s && this._updateClassName()
        }, c.remove = function() {
            var t, e, i = arguments,
                n = 0,
                s = i.length,
                o = !1;
            do
                for (t = i[n] + "", e = l(this, t); - 1 !== e;) this.splice(e, 1), o = !0, e = l(this, t); while (++n < s);
            o && this._updateClassName()
        }, c.toggle = function(t, e) {
            t += "";
            var i = this.contains(t),
                n = i ? e !== !0 && "remove" : e !== !1 && "add";
            return n && this[n](t), e === !0 || e === !1 ? e : !i
        }, c.toString = function() {
            return this.join(" ")
        }, s.defineProperty) {
            var d = {
                get: u,
                enumerable: !0,
                configurable: !0
            };
            try {
                s.defineProperty(n, e, d)
            } catch (p) {
                -2146823252 === p.number && (d.enumerable = !1, s.defineProperty(n, e, d))
            }
        } else s[i].__defineGetter__ && n.__defineGetter__(e, u)
    }
}(self),
    function(t) {
        "use strict";
        if (t.URL = t.URL || t.webkitURL, t.Blob && t.URL) try {
            return void new Blob
        } catch (e) {}
        var i = t.BlobBuilder || t.WebKitBlobBuilder || t.MozBlobBuilder || function(t) {
            var e = function(t) {
                    return Object.prototype.toString.call(t).match(/^\[object\s(.*)\]$/)[1]
                },
                i = function() {
                    this.data = []
                },
                n = function(t, e, i) {
                    this.data = t, this.size = t.length, this.type = e, this.encoding = i
                },
                s = i.prototype,
                o = n.prototype,
                a = t.FileReaderSync,
                r = function(t) {
                    this.code = this[this.name = t]
                },
                l = "NOT_FOUND_ERR SECURITY_ERR ABORT_ERR NOT_READABLE_ERR ENCODING_ERR NO_MODIFICATION_ALLOWED_ERR INVALID_STATE_ERR SYNTAX_ERR".split(" "),
                h = l.length,
                c = t.URL || t.webkitURL || t,
                u = c.createObjectURL,
                d = c.revokeObjectURL,
                p = c,
                f = t.btoa,
                m = t.atob,
                g = t.ArrayBuffer,
                v = t.Uint8Array,
                b = /^[\w-]+:\/*\[?[\w\.:-]+\]?(?::[0-9]+)?/;
            for (n.fake = o.fake = !0; h--;) r.prototype[l[h]] = h + 1;
            return c.createObjectURL || (p = t.URL = function(t) {
                var e, i = document.createElementNS("http://www.w3.org/1999/xhtml", "a");
                return i.href = t, "origin" in i || ("data:" === i.protocol.toLowerCase() ? i.origin = null : (e = t.match(b), i.origin = e && e[1])), i
            }), p.createObjectURL = function(t) {
                var e, i = t.type;
                return null === i && (i = "application/octet-stream"), t instanceof n ? (e = "data:" + i, "base64" === t.encoding ? e + ";base64," + t.data : "URI" === t.encoding ? e + "," + decodeURIComponent(t.data) : f ? e + ";base64," + f(t.data) : e + "," + encodeURIComponent(t.data)) : u ? u.call(c, t) : void 0
            }, p.revokeObjectURL = function(t) {
                "data:" !== t.substring(0, 5) && d && d.call(c, t)
            }, s.append = function(t) {
                var i = this.data;
                if (v && (t instanceof g || t instanceof v)) {
                    for (var s = "", o = new v(t), l = 0, h = o.length; h > l; l++) s += String.fromCharCode(o[l]);
                    i.push(s)
                } else if ("Blob" === e(t) || "File" === e(t)) {
                    if (!a) throw new r("NOT_READABLE_ERR");
                    var c = new a;
                    i.push(c.readAsBinaryString(t))
                } else t instanceof n ? "base64" === t.encoding && m ? i.push(m(t.data)) : "URI" === t.encoding ? i.push(decodeURIComponent(t.data)) : "raw" === t.encoding && i.push(t.data) : ("string" != typeof t && (t += ""), i.push(unescape(encodeURIComponent(t))))
            }, s.getBlob = function(t) {
                return arguments.length || (t = null), new n(this.data.join(""), t, "raw")
            }, s.toString = function() {
                return "[object BlobBuilder]"
            }, o.slice = function(t, e, i) {
                var s = arguments.length;
                return 3 > s && (i = null), new n(this.data.slice(t, s > 1 ? e : this.data.length), i, this.encoding)
            }, o.toString = function() {
                return "[object Blob]"
            }, o.close = function() {
                this.size = 0, delete this.data
            }, i
        }(t);
        t.Blob = function(t, e) {
            var n = e ? e.type || "" : "",
                s = new i;
            if (t)
                for (var o = 0, a = t.length; a > o; o++) Uint8Array && t[o] instanceof Uint8Array ? s.append(t[o].buffer) : s.append(t[o]);
            var r = s.getBlob(n);
            return !r.slice && r.webkitSlice && (r.slice = r.webkitSlice), r
        };
        var n = Object.getPrototypeOf || function(t) {
            return t.__proto__
        };
        t.Blob.prototype = n(new t.Blob)
    }("undefined" != typeof self && self || "undefined" != typeof window && window || this.content || this),
    function(t, e) {
        "use strict";
        var i = "object" == typeof module && process && process.versions && process.versions.electron;
        i || "object" != typeof module ? "function" == typeof define && define.amd ? define("medium-editor", [], function() {
            return e
        }) : t.MediumEditor = e : module.exports = e
    }(this, function() {
        "use strict";

        function t(t, e) {
            return this.init(t, e)
        }
        return t.extensions = {},
            function(e) {
                function i(t, e) {
                    var i, n = Array.prototype.slice.call(arguments, 2);
                    e = e || {};
                    for (var s = 0; s < n.length; s++) {
                        var o = n[s];
                        if (o)
                            for (i in o) o.hasOwnProperty(i) && "undefined" != typeof o[i] && (t || e.hasOwnProperty(i) === !1) && (e[i] = o[i])
                    }
                    return e
                }
                var n = !1;
                try {
                    var s = document.createElement("div"),
                        o = document.createTextNode(" ");
                    s.appendChild(o), n = s.contains(o)
                } catch (a) {}
                var r = {
                    isIE: "Microsoft Internet Explorer" === navigator.appName || "Netscape" === navigator.appName && null !== new RegExp("Trident/.*rv:([0-9]{1,}[.0-9]{0,})").exec(navigator.userAgent),
                    isEdge: null !== /Edge\/\d+/.exec(navigator.userAgent),
                    isFF: navigator.userAgent.toLowerCase().indexOf("firefox") > -1,
                    isMac: e.navigator.platform.toUpperCase().indexOf("MAC") >= 0,
                    keyCode: {
                        BACKSPACE: 8,
                        TAB: 9,
                        ENTER: 13,
                        ESCAPE: 27,
                        SPACE: 32,
                        DELETE: 46,
                        K: 75,
                        M: 77,
                        V: 86
                    },
                    isMetaCtrlKey: function(t) {
                        return r.isMac && t.metaKey || !r.isMac && t.ctrlKey ? !0 : !1
                    },
                    isKey: function(t, e) {
                        var i = r.getKeyCode(t);
                        return !1 === Array.isArray(e) ? i === e : -1 === e.indexOf(i) ? !1 : !0
                    },
                    getKeyCode: function(t) {
                        var e = t.which;
                        return null === e && (e = null !== t.charCode ? t.charCode : t.keyCode), e
                    },
                    blockContainerElementNames: ["p", "h1", "h2", "h3", "h4", "h5", "h6", "blockquote", "pre", "ul", "li", "ol", "address", "article", "aside", "audio", "canvas", "dd", "dl", "dt", "fieldset", "figcaption", "figure", "footer", "form", "header", "hgroup", "main", "nav", "noscript", "output", "section", "video", "table", "thead", "tbody", "tfoot", "tr", "th", "td"],
                    emptyElementNames: ["br", "col", "colgroup", "hr", "img", "input", "source", "wbr"],
                    extend: function() {
                        var t = [!0].concat(Array.prototype.slice.call(arguments));
                        return i.apply(this, t)
                    },
                    defaults: function() {
                        var t = [!1].concat(Array.prototype.slice.call(arguments));
                        return i.apply(this, t)
                    },
                    createLink: function(t, e, i, n) {
                        var s = t.createElement("a");
                        return r.moveTextRangeIntoElement(e[0], e[e.length - 1], s), s.setAttribute("href", i), n && s.setAttribute("target", n), s
                    },
                    findOrCreateMatchingTextNodes: function(t, e, i) {
                        for (var n = t.createTreeWalker(e, NodeFilter.SHOW_ALL, null, !1), s = [], o = 0, a = !1, l = null, h = null; null !== (l = n.nextNode());)
                            if (!(l.nodeType > 3))
                                if (3 === l.nodeType) {
                                    if (!a && i.start < o + l.nodeValue.length && (a = !0, h = r.splitStartNodeIfNeeded(l, i.start, o)), a && r.splitEndNodeIfNeeded(l, h, i.end, o), a && o === i.end) break;
                                    if (a && o > i.end + 1) throw new Error("PerformLinking overshot the target!");
                                    a && s.push(h || l), o += l.nodeValue.length, null !== h && (o += h.nodeValue.length, n.nextNode()), h = null
                                } else "img" === l.tagName.toLowerCase() && (!a && i.start <= o && (a = !0), a && s.push(l));
                        return s
                    },
                    splitStartNodeIfNeeded: function(t, e, i) {
                        return e !== i ? t.splitText(e - i) : null
                    },
                    splitEndNodeIfNeeded: function(t, e, i, n) {
                        var s, o;
                        s = n + (e || t).nodeValue.length + (e ? t.nodeValue.length : 0) - 1, o = (e || t).nodeValue.length - (s + 1 - i), s >= i && n !== s && 0 !== o && (e || t).splitText(o)
                    },
                    splitByBlockElements: function(e) {
                        if (3 !== e.nodeType && 1 !== e.nodeType) return [];
                        var i = [],
                            n = t.util.blockContainerElementNames.join(",");
                        if (3 === e.nodeType || 0 === e.querySelectorAll(n).length) return [e];
                        for (var s = 0; s < e.childNodes.length; s++) {
                            var o = e.childNodes[s];
                            if (3 === o.nodeType) i.push(o);
                            else if (1 === o.nodeType) {
                                var a = o.querySelectorAll(n);
                                0 === a.length ? i.push(o) : i = i.concat(t.util.splitByBlockElements(o))
                            }
                        }
                        return i
                    },
                    findAdjacentTextNodeWithContent: function(t, e, i) {
                        var n, s = !1,
                            o = i.createNodeIterator(t, NodeFilter.SHOW_TEXT, null, !1);
                        for (n = o.nextNode(); n;) {
                            if (n === e) s = !0;
                            else if (s && 3 === n.nodeType && n.nodeValue && n.nodeValue.trim().length > 0) break;
                            n = o.nextNode()
                        }
                        return n
                    },
                    findPreviousSibling: function(t) {
                        if (!t || r.isMediumEditorElement(t)) return !1;
                        for (var e = t.previousSibling; !e && !r.isMediumEditorElement(t.parentNode);) t = t.parentNode, e = t.previousSibling;
                        return e
                    },
                    isDescendant: function(t, e, i) {
                        if (!t || !e) return !1;
                        if (t === e) return !!i;
                        if (1 !== t.nodeType) return !1;
                        if (n || 3 !== e.nodeType) return t.contains(e);
                        for (var s = e.parentNode; null !== s;) {
                            if (s === t) return !0;
                            s = s.parentNode
                        }
                        return !1
                    },
                    isElement: function(t) {
                        return !(!t || 1 !== t.nodeType)
                    },
                    throttle: function(t, e) {
                        var i, n, s, o = 50,
                            a = null,
                            r = 0,
                            l = function() {
                                r = Date.now(), a = null, s = t.apply(i, n), a || (i = n = null)
                            };
                        return e || 0 === e || (e = o),
                            function() {
                                var o = Date.now(),
                                    h = e - (o - r);
                                return i = this, n = arguments, 0 >= h || h > e ? (a && (clearTimeout(a), a = null), r = o, s = t.apply(i, n), a || (i = n = null)) : a || (a = setTimeout(l, h)), s
                            }
                    },
                    traverseUp: function(t, e) {
                        if (!t) return !1;
                        do {
                            if (1 === t.nodeType) {
                                if (e(t)) return t;
                                if (r.isMediumEditorElement(t)) return !1
                            }
                            t = t.parentNode
                        } while (t);
                        return !1
                    },
                    htmlEntities: function(t) {
                        return String(t).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;")
                    },
                    insertHTMLCommand: function(e, i) {
                        var n, s, o, a, l, h, c, u = !1,
                            d = ["insertHTML", !1, i];
                        if (!t.util.isEdge && e.queryCommandSupported("insertHTML")) try {
                            return e.execCommand.apply(e, d)
                        } catch (p) {}
                        if (n = e.getSelection(), n.rangeCount) {
                            if (s = n.getRangeAt(0), c = s.commonAncestorContainer, r.isMediumEditorElement(c) && !c.firstChild) s.selectNode(c.appendChild(e.createTextNode("")));
                            else if (3 === c.nodeType && 0 === s.startOffset && s.endOffset === c.nodeValue.length || 3 !== c.nodeType && c.innerHTML === s.toString()) {
                                for (; !r.isMediumEditorElement(c) && c.parentNode && 1 === c.parentNode.childNodes.length && !r.isMediumEditorElement(c.parentNode);) c = c.parentNode;
                                s.selectNode(c)
                            }
                            for (s.deleteContents(), o = e.createElement("div"), o.innerHTML = i, a = e.createDocumentFragment(); o.firstChild;) l = o.firstChild, h = a.appendChild(l);
                            s.insertNode(a), h && (s = s.cloneRange(), s.setStartAfter(h), s.collapse(!0), t.selection.selectRange(e, s)), u = !0
                        }
                        return e.execCommand.callListeners && e.execCommand.callListeners(d, u), u
                    },
                    execFormatBlock: function(e, i) {
                        var n, s = r.getTopBlockContainer(t.selection.getSelectionStart(e));
                        if ("blockquote" === i) {
                            if (s && (n = Array.prototype.slice.call(s.childNodes), n.some(function(t) {
                                return r.isBlockContainer(t)
                            }))) return e.execCommand("outdent", !1, null);
                            if (r.isIE) return e.execCommand("indent", !1, i)
                        }
                        if (s && i === s.nodeName.toLowerCase() && (i = "p"), r.isIE && (i = "<" + i + ">"), s && "blockquote" === s.nodeName.toLowerCase()) {
                            if (r.isIE && "<p>" === i) return e.execCommand("outdent", !1, i);
                            if ((r.isFF || r.isEdge) && "p" === i) return n = Array.prototype.slice.call(s.childNodes), n.some(function(t) {
                                return !r.isBlockContainer(t)
                            }) && e.execCommand("formatBlock", !1, i), e.execCommand("outdent", !1, i)
                        }
                        return e.execCommand("formatBlock", !1, i)
                    },
                    setTargetBlank: function(t, e) {
                        var i, n = e || !1;
                        if ("a" === t.nodeName.toLowerCase()) t.target = "_blank";
                        else
                            for (t = t.getElementsByTagName("a"), i = 0; i < t.length; i += 1)(!1 === n || n === t[i].attributes.href.value) && (t[i].target = "_blank")
                    },
                    removeTargetBlank: function(t, e) {
                        var i;
                        if ("a" === t.nodeName.toLowerCase()) t.removeAttribute("target");
                        else
                            for (t = t.getElementsByTagName("a"), i = 0; i < t.length; i += 1) e === t[i].attributes.href.value && t[i].removeAttribute("target")
                    },
                    addClassToAnchors: function(t, e) {
                        var i, n, s = e.split(" ");
                        if ("a" === t.nodeName.toLowerCase())
                            for (n = 0; n < s.length; n += 1) t.classList.add(s[n]);
                        else
                            for (t = t.getElementsByTagName("a"), i = 0; i < t.length; i += 1)
                                for (n = 0; n < s.length; n += 1) t[i].classList.add(s[n])
                    },
                    isListItem: function(t) {
                        if (!t) return !1;
                        if ("li" === t.nodeName.toLowerCase()) return !0;
                        for (var e = t.parentNode, i = e.nodeName.toLowerCase();
                             "li" === i || !r.isBlockContainer(e) && "div" !== i;) {
                            if ("li" === i) return !0;
                            if (e = e.parentNode, !e) return !1;
                            i = e.nodeName.toLowerCase()
                        }
                        return !1
                    },
                    cleanListDOM: function(e, i) {
                        if ("li" === i.nodeName.toLowerCase()) {
                            var n = i.parentElement;
                            "p" === n.parentElement.nodeName.toLowerCase() && (r.unwrap(n.parentElement, e), t.selection.moveCursor(e, i.firstChild, i.firstChild.textContent.length))
                        }
                    },
                    splitOffDOMTree: function(t, e, i) {
                        for (var n = e, s = null, o = !i; n !== t;) {
                            var a, r = n.parentNode,
                                l = r.cloneNode(!1),
                                h = o ? n : r.firstChild;
                            for (s && (o ? l.appendChild(s) : a = s), s = l; h;) {
                                var c = h.nextSibling;
                                h === n ? (h.hasChildNodes() ? h = h.cloneNode(!1) : h.parentNode.removeChild(h), h.textContent && s.appendChild(h), h = o ? c : null) : (h.parentNode.removeChild(h), (h.hasChildNodes() || h.textContent) && s.appendChild(h), h = c)
                            }
                            a && s.appendChild(a), n = r
                        }
                        return s
                    },
                    moveTextRangeIntoElement: function(t, e, i) {
                        if (!t || !e) return !1;
                        var n = r.findCommonRoot(t, e);
                        if (!n) return !1;
                        if (e === t) {
                            var s = t.parentNode,
                                o = t.nextSibling;
                            return s.removeChild(t), i.appendChild(t), o ? s.insertBefore(i, o) : s.appendChild(i), i.hasChildNodes()
                        }
                        for (var a, l, h, c = [], u = 0; u < n.childNodes.length; u++)
                            if (h = n.childNodes[u], a) {
                                if (r.isDescendant(h, e, !0)) {
                                    l = h;
                                    break
                                }
                                c.push(h)
                            } else r.isDescendant(h, t, !0) && (a = h);
                        var d = l.nextSibling,
                            p = n.ownerDocument.createDocumentFragment();
                        return a === t ? (a.parentNode.removeChild(a), p.appendChild(a)) : p.appendChild(r.splitOffDOMTree(a, t)), c.forEach(function(t) {
                            t.parentNode.removeChild(t), p.appendChild(t)
                        }), l === e ? (l.parentNode.removeChild(l), p.appendChild(l)) : p.appendChild(r.splitOffDOMTree(l, e, !0)), i.appendChild(p), l.parentNode === n ? n.insertBefore(i, l) : d ? n.insertBefore(i, d) : n.appendChild(i), i.hasChildNodes()
                    },
                    depthOfNode: function(t) {
                        for (var e = 0, i = t; null !== i.parentNode;) i = i.parentNode, e++;
                        return e
                    },
                    findCommonRoot: function(t, e) {
                        for (var i = r.depthOfNode(t), n = r.depthOfNode(e), s = t, o = e; i !== n;) i > n ? (s = s.parentNode, i -= 1) : (o = o.parentNode, n -= 1);
                        for (; s !== o;) s = s.parentNode, o = o.parentNode;
                        return s
                    },
                    isElementAtBeginningOfBlock: function(t) {
                        for (var e, i; !r.isBlockContainer(t) && !r.isMediumEditorElement(t);) {
                            for (i = t; i = i.previousSibling;)
                                if (e = 3 === i.nodeType ? i.nodeValue : i.textContent, e.length > 0) return !1;
                            t = t.parentNode
                        }
                        return !0
                    },
                    isMediumEditorElement: function(t) {
                        return t && t.getAttribute && !!t.getAttribute("data-medium-editor-element")
                    },
                    getContainerEditorElement: function(t) {
                        return r.traverseUp(t, function(t) {
                            return r.isMediumEditorElement(t)
                        })
                    },
                    isBlockContainer: function(t) {
                        return t && 3 !== t.nodeType && -1 !== r.blockContainerElementNames.indexOf(t.nodeName.toLowerCase())
                    },
                    getClosestBlockContainer: function(t) {
                        return r.traverseUp(t, function(t) {
                            return r.isBlockContainer(t) || r.isMediumEditorElement(t)
                        })
                    },
                    getTopBlockContainer: function(t) {
                        var e = r.isBlockContainer(t) ? t : !1;
                        return r.traverseUp(t, function(t) {
                            return r.isBlockContainer(t) && (e = t), !e && r.isMediumEditorElement(t) ? (e = t, !0) : !1
                        }), e
                    },
                    getFirstSelectableLeafNode: function(t) {
                        for (; t && t.firstChild;) t = t.firstChild;
                        if (t = r.traverseUp(t, function(t) {
                            return -1 === r.emptyElementNames.indexOf(t.nodeName.toLowerCase())
                        }), "table" === t.nodeName.toLowerCase()) {
                            var e = t.querySelector("th, td");
                            e && (t = e)
                        }
                        return t
                    },
                    getFirstTextNode: function(t) {
                        return r.warn("getFirstTextNode is deprecated and will be removed in version 6.0.0"), r._getFirstTextNode(t)
                    },
                    _getFirstTextNode: function(t) {
                        if (3 === t.nodeType) return t;
                        for (var e = 0; e < t.childNodes.length; e++) {
                            var i = r._getFirstTextNode(t.childNodes[e]);
                            if (null !== i) return i
                        }
                        return null
                    },
                    ensureUrlHasProtocol: function(t) {
                        return -1 === t.indexOf("://") ? "http://" + t : t
                    },
                    warn: function() {
                        void 0 !== e.console && "function" == typeof e.console.warn && e.console.warn.apply(e.console, arguments)
                    },
                    deprecated: function(t, e, i) {
                        var n = t + " is deprecated, please use " + e + " instead.";
                        i && (n += " Will be removed in " + i), r.warn(n)
                    },
                    deprecatedMethod: function(t, e, i, n) {
                        r.deprecated(t, e, n), "function" == typeof this[e] && this[e].apply(this, i)
                    },
                    cleanupAttrs: function(t, e) {
                        e.forEach(function(e) {
                            t.removeAttribute(e)
                        })
                    },
                    cleanupTags: function(t, e) {
                        e.forEach(function(e) {
                            t.nodeName.toLowerCase() === e && t.parentNode.removeChild(t)
                        })
                    },
                    getClosestTag: function(t, e) {
                        return r.traverseUp(t, function(t) {
                            return t.nodeName.toLowerCase() === e.toLowerCase()
                        })
                    },
                    unwrap: function(t, e) {
                        for (var i = e.createDocumentFragment(), n = Array.prototype.slice.call(t.childNodes), s = 0; s < n.length; s++) i.appendChild(n[s]);
                        i.childNodes.length ? t.parentNode.replaceChild(i, t) : t.parentNode.removeChild(t)
                    },
                    guid: function() {
                        function t() {
                            return Math.floor(65536 * (1 + Math.random())).toString(16).substring(1)
                        }
                        return t() + t() + "-" + t() + "-" + t() + "-" + t() + "-" + t() + t() + t()
                    }
                };
                t.util = r
            }(window),
            function() {
                var e = function(e) {
                    t.util.extend(this, e)
                };
                e.extend = function(e) {
                    var i, n = this;
                    i = e && e.hasOwnProperty("constructor") ? e.constructor : function() {
                        return n.apply(this, arguments)
                    }, t.util.extend(i, n);
                    var s = function() {
                        this.constructor = i
                    };
                    return s.prototype = n.prototype, i.prototype = new s, e && t.util.extend(i.prototype, e), i
                }, e.prototype = {
                    init: function() {},
                    base: void 0,
                    name: void 0,
                    checkState: void 0,
                    destroy: void 0,
                    queryCommandState: void 0,
                    isActive: void 0,
                    isAlreadyApplied: void 0,
                    setActive: void 0,
                    setInactive: void 0,
                    getInteractionElements: void 0,
                    window: void 0,
                    document: void 0,
                    getEditorElements: function() {
                        return this.base.elements
                    },
                    getEditorId: function() {
                        return this.base.id
                    },
                    getEditorOption: function(t) {
                        return this.base.options[t]
                    }
                }, ["execAction", "on", "off", "subscribe", "trigger"].forEach(function(t) {
                    e.prototype[t] = function() {
                        return this.base[t].apply(this.base, arguments)
                    }
                }), t.Extension = e
            }(),
            function() {
                function e(e) {
                    return t.util.isBlockContainer(e) ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_SKIP
                }
                var i = {
                    findMatchingSelectionParent: function(e, i) {
                        var n, s, o = i.getSelection();
                        return 0 === o.rangeCount ? !1 : (n = o.getRangeAt(0), s = n.commonAncestorContainer, t.util.traverseUp(s, e))
                    },
                    getSelectionElement: function(e) {
                        return this.findMatchingSelectionParent(function(e) {
                            return t.util.isMediumEditorElement(e)
                        }, e)
                    },
                    exportSelection: function(t, e) {
                        if (!t) return null;
                        var i = null,
                            n = e.getSelection();
                        if (n.rangeCount > 0) {
                            var s, o = n.getRangeAt(0),
                                a = o.cloneRange();
                            a.selectNodeContents(t), a.setEnd(o.startContainer, o.startOffset), s = a.toString().length, i = {
                                start: s,
                                end: s + o.toString().length
                            }, this.doesRangeStartWithImages(o, e) && (i.startsWithImage = !0);
                            var r = this.getTrailingImageCount(t, i, o.endContainer, o.endOffset);
                            if (r && (i.trailingImageCount = r), 0 !== s) {
                                var l = this.getIndexRelativeToAdjacentEmptyBlocks(e, t, o.startContainer, o.startOffset); - 1 !== l && (i.emptyBlocksIndex = l)
                            }
                        }
                        return i
                    },
                    importSelection: function(t, e, i, n) {
                        if (t && e) {
                            var s = i.createRange();
                            s.setStart(e, 0), s.collapse(!0);
                            var o, a = e,
                                r = [],
                                l = 0,
                                h = !1,
                                c = !1,
                                u = 0,
                                d = !1,
                                p = !1,
                                f = null;
                            for ((n || t.startsWithImage || "undefined" != typeof t.emptyBlocksIndex) && (p = !0); !d && a;)
                                if (a.nodeType > 3) a = r.pop();
                                else {
                                    if (3 !== a.nodeType || c) {
                                        if (t.trailingImageCount && c && ("img" === a.nodeName.toLowerCase() && u++, u === t.trailingImageCount)) {
                                            for (var m = 0; a.parentNode.childNodes[m] !== a;) m++;
                                            s.setEnd(a.parentNode, m + 1), d = !0
                                        }
                                        if (!d && 1 === a.nodeType)
                                            for (var g = a.childNodes.length - 1; g >= 0;) r.push(a.childNodes[g]), g -= 1
                                    } else o = l + a.length, !h && t.start >= l && t.start <= o && (p || t.start < o ? (s.setStart(a, t.start - l), h = !0) : f = a), h && t.end >= l && t.end <= o && (t.trailingImageCount ? c = !0 : (s.setEnd(a, t.end - l), d = !0)), l = o;
                                    d || (a = r.pop())
                                }!h && f && (s.setStart(f, f.length), s.setEnd(f, f.length)), "undefined" != typeof t.emptyBlocksIndex && (s = this.importSelectionMoveCursorPastBlocks(i, e, t.emptyBlocksIndex, s)), n && (s = this.importSelectionMoveCursorPastAnchor(t, s)), this.selectRange(i, s)
                        }
                    },
                    importSelectionMoveCursorPastAnchor: function(e, i) {
                        var n = function(t) {
                            return "a" === t.nodeName.toLowerCase()
                        };
                        if (e.start === e.end && 3 === i.startContainer.nodeType && i.startOffset === i.startContainer.nodeValue.length && t.util.traverseUp(i.startContainer, n)) {
                            for (var s = i.startContainer, o = i.startContainer.parentNode; null !== o && "a" !== o.nodeName.toLowerCase();) o.childNodes[o.childNodes.length - 1] !== s ? o = null : (s = o, o = o.parentNode);
                            if (null !== o && "a" === o.nodeName.toLowerCase()) {
                                for (var a = null, r = 0; null === a && r < o.parentNode.childNodes.length; r++) o.parentNode.childNodes[r] === o && (a = r);
                                i.setStart(o.parentNode, a + 1), i.collapse(!0)
                            }
                        }
                        return i
                    },
                    importSelectionMoveCursorPastBlocks: function(i, n, s, o) {
                        var a, r, l = i.createTreeWalker(n, NodeFilter.SHOW_ELEMENT, e, !1),
                            h = o.startContainer,
                            c = 0;
                        for (s = s || 1, a = 3 === h.nodeType && t.util.isBlockContainer(h.previousSibling) ? h.previousSibling : t.util.getClosestBlockContainer(h); l.nextNode();)
                            if (r) {
                                if (r = l.currentNode, c++, c === s) break;
                                if (r.textContent.length > 0) break
                            } else a === l.currentNode && (r = l.currentNode);
                        return r || (r = a), o.setStart(t.util.getFirstSelectableLeafNode(r), 0), o
                    },
                    getIndexRelativeToAdjacentEmptyBlocks: function(i, n, s, o) {
                        if (s.textContent.length > 0 && o > 0) return -1;
                        var a = s;
                        if (3 !== a.nodeType && (a = s.childNodes[o]), a) {
                            if (!t.util.isElementAtBeginningOfBlock(a)) return -1;
                            var r = t.util.findPreviousSibling(a);
                            if (!r) return -1;
                            if (r.nodeValue) return -1
                        }
                        for (var l = t.util.getClosestBlockContainer(s), h = i.createTreeWalker(n, NodeFilter.SHOW_ELEMENT, e, !1), c = 0; h.nextNode();) {
                            var u = "" === h.currentNode.textContent;
                            if ((u || c > 0) && (c += 1), h.currentNode === l) return c;
                            u || (c = 0)
                        }
                        return c
                    },
                    doesRangeStartWithImages: function(t, e) {
                        if (0 !== t.startOffset || 1 !== t.startContainer.nodeType) return !1;
                        if ("img" === t.startContainer.nodeName.toLowerCase()) return !0;
                        var i = t.startContainer.querySelector("img");
                        if (!i) return !1;
                        for (var n = e.createTreeWalker(t.startContainer, NodeFilter.SHOW_ALL, null, !1); n.nextNode();) {
                            var s = n.currentNode;
                            if (s === i) break;
                            if (s.nodeValue) return !1
                        }
                        return !0
                    },
                    getTrailingImageCount: function(t, e, i, n) {
                        if (0 === n || 1 !== i.nodeType) return 0;
                        if ("img" !== i.nodeName.toLowerCase() && !i.querySelector("img")) return 0;
                        for (var s = i.childNodes[n - 1]; s.hasChildNodes();) s = s.lastChild;
                        for (var o, a = t, r = [], l = 0, h = !1, c = !1, u = !1, d = 0; !u && a;)
                            if (a.nodeType > 3) a = r.pop();
                            else {
                                if (3 !== a.nodeType || c) {
                                    if ("img" === a.nodeName.toLowerCase() && d++, a === s) u = !0;
                                    else if (1 === a.nodeType)
                                        for (var p = a.childNodes.length - 1; p >= 0;) r.push(a.childNodes[p]), p -= 1
                                } else d = 0, o = l + a.length, !h && e.start >= l && e.start <= o && (h = !0), h && e.end >= l && e.end <= o && (c = !0), l = o;
                                u || (a = r.pop())
                            }
                        return d
                    },
                    selectionContainsContent: function(t) {
                        var e = t.getSelection();
                        if (!e || e.isCollapsed || !e.rangeCount) return !1;
                        if ("" !== e.toString().trim()) return !0;
                        var i = this.getSelectedParentElement(e.getRangeAt(0));
                        return i && ("img" === i.nodeName.toLowerCase() || 1 === i.nodeType && i.querySelector("img")) ? !0 : !1
                    },
                    selectionInContentEditableFalse: function(t) {
                        var e, i = this.findMatchingSelectionParent(function(t) {
                            var i = t && t.getAttribute("contenteditable");
                            return "true" === i && (e = !0), "#text" !== t.nodeName && "false" === i
                        }, t);
                        return !e && i
                    },
                    getSelectionHtml: function(t) {
                        var e, i, n, s = "",
                            o = t.getSelection();
                        if (o.rangeCount) {
                            for (n = t.createElement("div"), e = 0, i = o.rangeCount; i > e; e += 1) n.appendChild(o.getRangeAt(e).cloneContents());
                            s = n.innerHTML
                        }
                        return s
                    },
                    getCaretOffsets: function(t, e) {
                        var i, n;
                        return e || (e = window.getSelection().getRangeAt(0)), i = e.cloneRange(), n = e.cloneRange(), i.selectNodeContents(t), i.setEnd(e.endContainer, e.endOffset), n.selectNodeContents(t), n.setStart(e.endContainer, e.endOffset), {
                            left: i.toString().length,
                            right: n.toString().length
                        }
                    },
                    rangeSelectsSingleNode: function(t) {
                        var e = t.startContainer;
                        return e === t.endContainer && e.hasChildNodes() && t.endOffset === t.startOffset + 1
                    },
                    getSelectedParentElement: function(t) {
                        return t ? this.rangeSelectsSingleNode(t) && 3 !== t.startContainer.childNodes[t.startOffset].nodeType ? t.startContainer.childNodes[t.startOffset] : 3 === t.startContainer.nodeType ? t.startContainer.parentNode : t.startContainer : null
                    },
                    getSelectedElements: function(t) {
                        var e, i, n, s = t.getSelection();
                        if (!s.rangeCount || s.isCollapsed || !s.getRangeAt(0).commonAncestorContainer) return [];
                        if (e = s.getRangeAt(0), 3 === e.commonAncestorContainer.nodeType) {
                            for (i = [], n = e.commonAncestorContainer; n.parentNode && 1 === n.parentNode.childNodes.length;) i.push(n.parentNode), n = n.parentNode;
                            return i
                        }
                        return [].filter.call(e.commonAncestorContainer.getElementsByTagName("*"), function(t) {
                            return "function" == typeof s.containsNode ? s.containsNode(t, !0) : !0
                        })
                    },
                    selectNode: function(t, e) {
                        var i = e.createRange();
                        i.selectNodeContents(t), this.selectRange(e, i)
                    },
                    select: function(t, e, i, n, s) {
                        var o = t.createRange();
                        return o.setStart(e, i), n ? o.setEnd(n, s) : o.collapse(!0), this.selectRange(t, o), o
                    },
                    clearSelection: function(t, e) {
                        e ? t.getSelection().collapseToStart() : t.getSelection().collapseToEnd()
                    },
                    moveCursor: function(t, e, i) {
                        this.select(t, e, i)
                    },
                    getSelectionRange: function(t) {
                        var e = t.getSelection();
                        return 0 === e.rangeCount ? null : e.getRangeAt(0)
                    },
                    selectRange: function(t, e) {
                        var i = t.getSelection();
                        i.removeAllRanges(), i.addRange(e)
                    },
                    getSelectionStart: function(t) {
                        var e = t.getSelection().anchorNode,
                            i = e && 3 === e.nodeType ? e.parentNode : e;
                        return i
                    }
                };
                t.selection = i
            }(),
            function() {
                function e(e, i) {
                    return e.some(function(e) {
                        if ("function" != typeof e.getInteractionElements) return !1;
                        var n = e.getInteractionElements();
                        return n ? (Array.isArray(n) || (n = [n]), n.some(function(e) {
                            return t.util.isDescendant(e, i, !0)
                        })) : !1
                    })
                }
                var i = function(t) {
                    this.base = t, this.options = this.base.options, this.events = [], this.disabledEvents = {}, this.customEvents = {}, this.listeners = {}
                };
                i.prototype = {
                    InputEventOnContenteditableSupported: !t.util.isIE && !t.util.isEdge,
                    attachDOMEvent: function(e, i, n, s) {
                        e = t.util.isElement(e) || [window, document].indexOf(e) > -1 ? [e] : e, Array.prototype.forEach.call(e, function(t) {
                            t.addEventListener(i, n, s), this.events.push([t, i, n, s])
                        }.bind(this))
                    },
                    detachDOMEvent: function(e, i, n, s) {
                        var o, a;
                        e = t.util.isElement(e) || [window, document].indexOf(e) > -1 ? [e] : e, Array.prototype.forEach.call(e, function(t) {
                            o = this.indexOfListener(t, i, n, s), -1 !== o && (a = this.events.splice(o, 1)[0], a[0].removeEventListener(a[1], a[2], a[3]))
                        }.bind(this))
                    },
                    indexOfListener: function(t, e, i, n) {
                        var s, o, a;
                        for (s = 0, o = this.events.length; o > s; s += 1)
                            if (a = this.events[s], a[0] === t && a[1] === e && a[2] === i && a[3] === n) return s;
                        return -1
                    },
                    detachAllDOMEvents: function() {
                        for (var t = this.events.pop(); t;) t[0].removeEventListener(t[1], t[2], t[3]), t = this.events.pop()
                    },
                    detachAllEventsFromElement: function(t) {
                        for (var e = this.events.filter(function(e) {
                            return e && e[0].getAttribute && e[0].getAttribute("medium-editor-index") === t.getAttribute("medium-editor-index")
                        }), i = 0, n = e.length; n > i; i++) {
                            var s = e[i];
                            this.detachDOMEvent(s[0], s[1], s[2], s[3])
                        }
                    },
                    attachAllEventsToElement: function(t) {
                        this.listeners.editableInput && (this.contentCache[t.getAttribute("medium-editor-index")] = t.innerHTML), this.eventsCache && this.eventsCache.forEach(function(e) {
                            this.attachDOMEvent(t, e.name, e.handler.bind(this))
                        }, this)
                    },
                    enableCustomEvent: function(t) {
                        void 0 !== this.disabledEvents[t] && delete this.disabledEvents[t]
                    },
                    disableCustomEvent: function(t) {
                        this.disabledEvents[t] = !0
                    },
                    attachCustomEvent: function(t, e) {
                        this.setupListener(t), this.customEvents[t] || (this.customEvents[t] = []), this.customEvents[t].push(e)
                    },
                    detachCustomEvent: function(t, e) {
                        var i = this.indexOfCustomListener(t, e); - 1 !== i && this.customEvents[t].splice(i, 1)
                    },
                    indexOfCustomListener: function(t, e) {
                        return this.customEvents[t] && this.customEvents[t].length ? this.customEvents[t].indexOf(e) : -1
                    },
                    detachAllCustomEvents: function() {
                        this.customEvents = {}
                    },
                    triggerCustomEvent: function(t, e, i) {
                        this.customEvents[t] && !this.disabledEvents[t] && this.customEvents[t].forEach(function(t) {
                            t(e, i)
                        })
                    },
                    destroy: function() {
                        this.detachAllDOMEvents(), this.detachAllCustomEvents(), this.detachExecCommand(), this.base.elements && this.base.elements.forEach(function(t) {
                            t.removeAttribute("data-medium-focused")
                        })
                    },
                    attachToExecCommand: function() {
                        this.execCommandListener || (this.execCommandListener = function(t) {
                            this.handleDocumentExecCommand(t)
                        }.bind(this), this.wrapExecCommand(), this.options.ownerDocument.execCommand.listeners.push(this.execCommandListener))
                    },
                    detachExecCommand: function() {
                        var t = this.options.ownerDocument;
                        if (this.execCommandListener && t.execCommand.listeners) {
                            var e = t.execCommand.listeners.indexOf(this.execCommandListener); - 1 !== e && t.execCommand.listeners.splice(e, 1), t.execCommand.listeners.length || this.unwrapExecCommand()
                        }
                    },
                    wrapExecCommand: function() {
                        var t = this.options.ownerDocument;
                        if (!t.execCommand.listeners) {
                            var e = function(e, i) {
                                    t.execCommand.listeners && t.execCommand.listeners.forEach(function(t) {
                                        t({
                                            command: e[0],
                                            value: e[2],
                                            args: e,
                                            result: i
                                        })
                                    })
                                },
                                i = function() {
                                    var i = t.execCommand.orig.apply(this, arguments);
                                    if (!t.execCommand.listeners) return i;
                                    var n = Array.prototype.slice.call(arguments);
                                    return e(n, i), i
                                };
                            i.orig = t.execCommand, i.listeners = [], i.callListeners = e, t.execCommand = i
                        }
                    },
                    unwrapExecCommand: function() {
                        var t = this.options.ownerDocument;
                        t.execCommand.orig && (t.execCommand = t.execCommand.orig)
                    },
                    setupListener: function(t) {
                        if (!this.listeners[t]) {
                            switch (t) {
                                case "externalInteraction":
                                    this.attachDOMEvent(this.options.ownerDocument.body, "mousedown", this.handleBodyMousedown.bind(this), !0), this.attachDOMEvent(this.options.ownerDocument.body, "click", this.handleBodyClick.bind(this), !0), this.attachDOMEvent(this.options.ownerDocument.body, "focus", this.handleBodyFocus.bind(this), !0);
                                    break;
                                case "blur":
                                    this.setupListener("externalInteraction");
                                    break;
                                case "focus":
                                    this.setupListener("externalInteraction");
                                    break;
                                case "editableInput":
                                    this.contentCache = {}, this.base.elements.forEach(function(t) {
                                        this.contentCache[t.getAttribute("medium-editor-index")] = t.innerHTML
                                    }, this), this.InputEventOnContenteditableSupported && this.attachToEachElement("input", this.handleInput), this.InputEventOnContenteditableSupported || (this.setupListener("editableKeypress"), this.keypressUpdateInput = !0, this.attachDOMEvent(document, "selectionchange", this.handleDocumentSelectionChange.bind(this)), this.attachToExecCommand());
                                    break;
                                case "editableClick":
                                    this.attachToEachElement("click", this.handleClick);
                                    break;
                                case "editableBlur":
                                    this.attachToEachElement("blur", this.handleBlur);
                                    break;
                                case "editableKeypress":
                                    this.attachToEachElement("keypress", this.handleKeypress);
                                    break;
                                case "editableKeyup":
                                    this.attachToEachElement("keyup", this.handleKeyup);
                                    break;
                                case "editableKeydown":
                                    this.attachToEachElement("keydown", this.handleKeydown);
                                    break;
                                case "editableKeydownSpace":
                                    this.setupListener("editableKeydown");
                                    break;
                                case "editableKeydownEnter":
                                    this.setupListener("editableKeydown");
                                    break;
                                case "editableKeydownTab":
                                    this.setupListener("editableKeydown");
                                    break;
                                case "editableKeydownDelete":
                                    this.setupListener("editableKeydown");
                                    break;
                                case "editableMouseover":
                                    this.attachToEachElement("mouseover", this.handleMouseover);
                                    break;
                                case "editableDrag":
                                    this.attachToEachElement("dragover", this.handleDragging), this.attachToEachElement("dragleave", this.handleDragging);
                                    break;
                                case "editableDrop":
                                    this.attachToEachElement("drop", this.handleDrop);
                                    break;
                                case "editablePaste":
                                    this.attachToEachElement("paste", this.handlePaste)
                            }
                            this.listeners[t] = !0
                        }
                    },
                    attachToEachElement: function(t, e) {
                        this.eventsCache || (this.eventsCache = []), this.base.elements.forEach(function(i) {
                            this.attachDOMEvent(i, t, e.bind(this))
                        }, this), this.eventsCache.push({
                            name: t,
                            handler: e
                        })
                    },
                    cleanupElement: function(t) {
                        var e = t.getAttribute("medium-editor-index");
                        e && (this.detachAllEventsFromElement(t), this.contentCache && delete this.contentCache[e])
                    },
                    focusElement: function(t) {
                        t.focus(), this.updateFocus(t, {
                            target: t,
                            type: "focus"
                        })
                    },
                    updateFocus: function(i, n) {
                        var s, o = this.base.getFocusedElement();
                        o && "click" === n.type && this.lastMousedownTarget && (t.util.isDescendant(o, this.lastMousedownTarget, !0) || e(this.base.extensions, this.lastMousedownTarget)) && (s = o), s || this.base.elements.some(function(e) {
                            return !s && t.util.isDescendant(e, i, !0) && (s = e), !!s
                        }, this);
                        var a = !t.util.isDescendant(o, i, !0) && !e(this.base.extensions, i);
                        s !== o && (o && a && (o.removeAttribute("data-medium-focused"), this.triggerCustomEvent("blur", n, o)), s && (s.setAttribute("data-medium-focused", !0), this.triggerCustomEvent("focus", n, s))), a && this.triggerCustomEvent("externalInteraction", n)
                    },
                    updateInput: function(t, e) {
                        if (this.contentCache) {
                            var i = t.getAttribute("medium-editor-index"),
                                n = t.innerHTML;
                            n !== this.contentCache[i] && this.triggerCustomEvent("editableInput", e, t), this.contentCache[i] = n
                        }
                    },
                    handleDocumentSelectionChange: function(e) {
                        if (e.currentTarget && e.currentTarget.activeElement) {
                            var i, n = e.currentTarget.activeElement;
                            this.base.elements.some(function(e) {
                                return t.util.isDescendant(e, n, !0) ? (i = e, !0) : !1
                            }, this), i && this.updateInput(i, {
                                target: n,
                                currentTarget: i
                            })
                        }
                    },
                    handleDocumentExecCommand: function() {
                        var t = this.base.getFocusedElement();
                        t && this.updateInput(t, {
                            target: t,
                            currentTarget: t
                        })
                    },
                    handleBodyClick: function(t) {
                        this.updateFocus(t.target, t)
                    },
                    handleBodyFocus: function(t) {
                        this.updateFocus(t.target, t)
                    },
                    handleBodyMousedown: function(t) {
                        this.lastMousedownTarget = t.target
                    },
                    handleInput: function(t) {
                        this.updateInput(t.currentTarget, t)
                    },
                    handleClick: function(t) {
                        this.triggerCustomEvent("editableClick", t, t.currentTarget)
                    },
                    handleBlur: function(t) {
                        this.triggerCustomEvent("editableBlur", t, t.currentTarget)
                    },
                    handleKeypress: function(t) {
                        if (this.triggerCustomEvent("editableKeypress", t, t.currentTarget), this.keypressUpdateInput) {
                            var e = {
                                target: t.target,
                                currentTarget: t.currentTarget
                            };
                            setTimeout(function() {
                                this.updateInput(e.currentTarget, e)
                            }.bind(this), 0)
                        }
                    },
                    handleKeyup: function(t) {
                        this.triggerCustomEvent("editableKeyup", t, t.currentTarget)
                    },
                    handleMouseover: function(t) {
                        this.triggerCustomEvent("editableMouseover", t, t.currentTarget)
                    },
                    handleDragging: function(t) {
                        this.triggerCustomEvent("editableDrag", t, t.currentTarget)
                    },
                    handleDrop: function(t) {
                        this.triggerCustomEvent("editableDrop", t, t.currentTarget)
                    },
                    handlePaste: function(t) {
                        this.triggerCustomEvent("editablePaste", t, t.currentTarget)
                    },
                    handleKeydown: function(e) {
                        return this.triggerCustomEvent("editableKeydown", e, e.currentTarget), t.util.isKey(e, t.util.keyCode.SPACE) ? this.triggerCustomEvent("editableKeydownSpace", e, e.currentTarget) : t.util.isKey(e, t.util.keyCode.ENTER) || e.ctrlKey && t.util.isKey(e, t.util.keyCode.M) ? this.triggerCustomEvent("editableKeydownEnter", e, e.currentTarget) : t.util.isKey(e, t.util.keyCode.TAB) ? this.triggerCustomEvent("editableKeydownTab", e, e.currentTarget) : t.util.isKey(e, [t.util.keyCode.DELETE, t.util.keyCode.BACKSPACE]) ? this.triggerCustomEvent("editableKeydownDelete", e, e.currentTarget) : void 0
                    }
                }, t.Events = i
            }(),
            function() {
                var e = t.Extension.extend({
                    action: void 0,
                    aria: void 0,
                    tagNames: void 0,
                    style: void 0,
                    useQueryState: void 0,
                    contentDefault: void 0,
                    contentFA: void 0,
                    classList: void 0,
                    attrs: void 0,
                    constructor: function(i) {
                        e.isBuiltInButton(i) ? t.Extension.call(this, this.defaults[i]) : t.Extension.call(this, i)
                    },
                    init: function() {
                        t.Extension.prototype.init.apply(this, arguments), this.button = this.createButton(), this.on(this.button, "click", this.handleClick.bind(this))
                    },
                    getButton: function() {
                        return this.button
                    },
                    getAction: function() {
                        return "function" == typeof this.action ? this.action(this.base.options) : this.action
                    },
                    getAria: function() {
                        return "function" == typeof this.aria ? this.aria(this.base.options) : this.aria
                    },
                    getTagNames: function() {
                        return "function" == typeof this.tagNames ? this.tagNames(this.base.options) : this.tagNames
                    },
                    createButton: function() {
                        var t = this.document.createElement("button"),
                            e = this.contentDefault,
                            i = this.getAria(),
                            n = this.getEditorOption("buttonLabels");
                        return t.classList.add("medium-editor-action"), t.classList.add("medium-editor-action-" + this.name), this.classList && this.classList.forEach(function(e) {
                            t.classList.add(e)
                        }), t.setAttribute("data-action", this.getAction()), i && (t.setAttribute("title", i), t.setAttribute("aria-label", i)), this.attrs && Object.keys(this.attrs).forEach(function(e) {
                            t.setAttribute(e, this.attrs[e])
                        }, this), "fontawesome" === n && this.contentFA && (e = this.contentFA), t.innerHTML = e, t
                    },
                    handleClick: function(t) {
                        t.preventDefault(), t.stopPropagation();
                        var e = this.getAction();
                        e && this.execAction(e)
                    },
                    isActive: function() {
                        return this.button.classList.contains(this.getEditorOption("activeButtonClass"))
                    },
                    setInactive: function() {
                        this.button.classList.remove(this.getEditorOption("activeButtonClass")), delete this.knownState
                    },
                    setActive: function() {
                        this.button.classList.add(this.getEditorOption("activeButtonClass")), delete this.knownState
                    },
                    queryCommandState: function() {
                        var t = null;
                        return this.useQueryState && (t = this.base.queryCommandState(this.getAction())), t
                    },
                    isAlreadyApplied: function(t) {
                        var e, i, n = !1,
                            s = this.getTagNames();
                        return this.knownState === !1 || this.knownState === !0 ? this.knownState : (s && s.length > 0 && (n = -1 !== s.indexOf(t.nodeName.toLowerCase())), !n && this.style && (e = this.style.value.split("|"), i = this.window.getComputedStyle(t, null).getPropertyValue(this.style.prop), e.forEach(function(t) {
                            this.knownState || (n = -1 !== i.indexOf(t), (n || "text-decoration" !== this.style.prop) && (this.knownState = n))
                        }, this)), n)
                    }
                });
                e.isBuiltInButton = function(e) {
                    return "string" == typeof e && t.extensions.button.prototype.defaults.hasOwnProperty(e)
                }, t.extensions.button = e
            }(),
            function() {
                t.extensions.button.prototype.defaults = {
                    bold: {
                        name: "bold",
                        action: "bold",
                        aria: "bold",
                        tagNames: ["b", "strong"],
                        style: {
                            prop: "font-weight",
                            value: "700|bold"
                        },
                        useQueryState: !0,
                        contentDefault: "<b>B</b>",
                        contentFA: '<i class="fa fa-bold"></i>'
                    },
                    italic: {
                        name: "italic",
                        action: "italic",
                        aria: "italic",
                        tagNames: ["i", "em"],
                        style: {
                            prop: "font-style",
                            value: "italic"
                        },
                        useQueryState: !0,
                        contentDefault: "<b><i>I</i></b>",
                        contentFA: '<i class="fa fa-italic"></i>'
                    },
                    underline: {
                        name: "underline",
                        action: "underline",
                        aria: "underline",
                        tagNames: ["u"],
                        style: {
                            prop: "text-decoration",
                            value: "underline"
                        },
                        useQueryState: !0,
                        contentDefault: "<b><u>U</u></b>",
                        contentFA: '<i class="fa fa-underline"></i>'
                    },
                    strikethrough: {
                        name: "strikethrough",
                        action: "strikethrough",
                        aria: "strike through",
                        tagNames: ["strike"],
                        style: {
                            prop: "text-decoration",
                            value: "line-through"
                        },
                        useQueryState: !0,
                        contentDefault: "<s>A</s>",
                        contentFA: '<i class="fa fa-strikethrough"></i>'
                    },
                    superscript: {
                        name: "superscript",
                        action: "superscript",
                        aria: "superscript",
                        tagNames: ["sup"],
                        contentDefault: "<b>x<sup>1</sup></b>",
                        contentFA: '<i class="fa fa-superscript"></i>'
                    },
                    subscript: {
                        name: "subscript",
                        action: "subscript",
                        aria: "subscript",
                        tagNames: ["sub"],
                        contentDefault: "<b>x<sub>1</sub></b>",
                        contentFA: '<i class="fa fa-subscript"></i>'
                    },
                    image: {
                        name: "image",
                        action: "image",
                        aria: "image",
                        tagNames: ["img"],
                        contentDefault: "<b>image</b>",
                        contentFA: '<i class="fa fa-picture-o"></i>'
                    },
                    orderedlist: {
                        name: "orderedlist",
                        action: "insertorderedlist",
                        aria: "ordered list",
                        tagNames: ["ol"],
                        useQueryState: !0,
                        contentDefault: "<b>1.</b>",
                        contentFA: '<i class="fa fa-list-ol"></i>'
                    },
                    unorderedlist: {
                        name: "unorderedlist",
                        action: "insertunorderedlist",
                        aria: "unordered list",
                        tagNames: ["ul"],
                        useQueryState: !0,
                        contentDefault: "<b>&bull;</b>",
                        contentFA: '<i class="fa fa-list-ul"></i>'
                    },
                    indent: {
                        name: "indent",
                        action: "indent",
                        aria: "indent",
                        tagNames: [],
                        contentDefault: "<b>&rarr;</b>",
                        contentFA: '<i class="fa fa-indent"></i>'
                    },
                    outdent: {
                        name: "outdent",
                        action: "outdent",
                        aria: "outdent",
                        tagNames: [],
                        contentDefault: "<b>&larr;</b>",
                        contentFA: '<i class="fa fa-outdent"></i>'
                    },
                    justifyCenter: {
                        name: "justifyCenter",
                        action: "justifyCenter",
                        aria: "center justify",
                        tagNames: [],
                        style: {
                            prop: "text-align",
                            value: "center"
                        },
                        contentDefault: "<b>C</b>",
                        contentFA: '<i class="fa fa-align-center"></i>'
                    },
                    justifyFull: {
                        name: "justifyFull",
                        action: "justifyFull",
                        aria: "full justify",
                        tagNames: [],
                        style: {
                            prop: "text-align",
                            value: "justify"
                        },
                        contentDefault: "<b>J</b>",
                        contentFA: '<i class="fa fa-align-justify"></i>'
                    },
                    justifyLeft: {
                        name: "justifyLeft",
                        action: "justifyLeft",
                        aria: "left justify",
                        tagNames: [],
                        style: {
                            prop: "text-align",
                            value: "left"
                        },
                        contentDefault: "<b>L</b>",
                        contentFA: '<i class="fa fa-align-left"></i>'
                    },
                    justifyRight: {
                        name: "justifyRight",
                        action: "justifyRight",
                        aria: "right justify",
                        tagNames: [],
                        style: {
                            prop: "text-align",
                            value: "right"
                        },
                        contentDefault: "<b>R</b>",
                        contentFA: '<i class="fa fa-align-right"></i>'
                    },
                    removeFormat: {
                        name: "removeFormat",
                        aria: "remove formatting",
                        action: "removeFormat",
                        contentDefault: "<b>X</b>",
                        contentFA: '<i class="fa fa-eraser"></i>'
                    },
                    quote: {
                        name: "quote",
                        action: "append-blockquote",
                        aria: "blockquote",
                        tagNames: ["blockquote"],
                        contentDefault: "<b>&ldquo;</b>",
                        contentFA: '<i class="fa fa-quote-right"></i>'
                    },
                    pre: {
                        name: "pre",
                        action: "append-pre",
                        aria: "preformatted text",
                        tagNames: ["pre"],
                        contentDefault: "<b>0101</b>",
                        contentFA: '<i class="fa fa-code fa-lg"></i>'
                    },
                    h1: {
                        name: "h1",
                        action: "append-h1",
                        aria: "header type one",
                        tagNames: ["h1"],
                        contentDefault: "<b>H1</b>",
                        contentFA: '<i class="fa fa-header"><sup>1</sup>'
                    },
                    h2: {
                        name: "h2",
                        action: "append-h2",
                        aria: "header type two",
                        tagNames: ["h2"],
                        contentDefault: "<b>H2</b>",
                        contentFA: '<i class="fa fa-header"><sup>2</sup>'
                    },
                    h3: {
                        name: "h3",
                        action: "append-h3",
                        aria: "header type three",
                        tagNames: ["h3"],
                        contentDefault: "<b>H3</b>",
                        contentFA: '<i class="fa fa-header"><sup>3</sup>'
                    },
                    h4: {
                        name: "h4",
                        action: "append-h4",
                        aria: "header type four",
                        tagNames: ["h4"],
                        contentDefault: "<b>H4</b>",
                        contentFA: '<i class="fa fa-header"><sup>4</sup>'
                    },
                    h5: {
                        name: "h5",
                        action: "append-h5",
                        aria: "header type five",
                        tagNames: ["h5"],
                        contentDefault: "<b>H5</b>",
                        contentFA: '<i class="fa fa-header"><sup>5</sup>'
                    },
                    h6: {
                        name: "h6",
                        action: "append-h6",
                        aria: "header type six",
                        tagNames: ["h6"],
                        contentDefault: "<b>H6</b>",
                        contentFA: '<i class="fa fa-header"><sup>6</sup>'
                    }
                }
            }(),
            function() {
                var e = t.extensions.button.extend({
                    init: function() {
                        t.extensions.button.prototype.init.apply(this, arguments)
                    },
                    formSaveLabel: "&#10003;",
                    formCloseLabel: "&times;",
                    activeClass: "medium-editor-toolbar-form-active",
                    hasForm: !0,
                    getForm: function() {},
                    isDisplayed: function() {
                        return this.hasForm ? this.getForm().classList.contains(this.activeClass) : !1
                    },
                    showForm: function() {
                        this.hasForm && this.getForm().classList.add(this.activeClass)
                    },
                    hideForm: function() {
                        this.hasForm && this.getForm().classList.remove(this.activeClass)
                    },
                    showToolbarDefaultActions: function() {
                        var t = this.base.getExtensionByName("toolbar");
                        t && t.showToolbarDefaultActions()
                    },
                    hideToolbarDefaultActions: function() {
                        var t = this.base.getExtensionByName("toolbar");
                        t && t.hideToolbarDefaultActions()
                    },
                    setToolbarPosition: function() {
                        var t = this.base.getExtensionByName("toolbar");
                        t && t.setToolbarPosition()
                    }
                });
                t.extensions.form = e
            }(),
            function() {
                var e = t.extensions.form.extend({
                    customClassOption: null,
                    customClassOptionText: "Button",
                    linkValidation: !1,
                    placeholderText: "Paste or type a link",
                    targetCheckbox: !1,
                    targetCheckboxText: "Open in new window",
                    name: "anchor",
                    action: "createLink",
                    aria: "link",
                    tagNames: ["a"],
                    contentDefault: "<b>#</b>",
                    contentFA: '<i class="fa fa-link"></i>',
                    init: function() {
                        t.extensions.form.prototype.init.apply(this, arguments), this.subscribe("editableKeydown", this.handleKeydown.bind(this))
                    },
                    handleClick: function(e) {
                        e.preventDefault(), e.stopPropagation();
                        var i = t.selection.getSelectionRange(this.document);
                        return "a" === i.startContainer.nodeName.toLowerCase() || "a" === i.endContainer.nodeName.toLowerCase() || t.util.getClosestTag(t.selection.getSelectedParentElement(i), "a") ? this.execAction("unlink") : (this.isDisplayed() || this.showForm(), !1)
                    },
                    handleKeydown: function(e) {
                        t.util.isKey(e, t.util.keyCode.K) && t.util.isMetaCtrlKey(e) && !e.shiftKey && this.handleClick(e)
                    },
                    getForm: function() {
                        return this.form || (this.form = this.createForm()), this.form
                    },
                    getTemplate: function() {
                        var t = ['<input type="text" class="medium-editor-toolbar-input" placeholder="', this.placeholderText, '">'];
                        return t.push('<a href="#" class="medium-editor-toolbar-save">', "fontawesome" === this.getEditorOption("buttonLabels") ? '<i class="fa fa-check"></i>' : this.formSaveLabel, "</a>"), t.push('<a href="#" class="medium-editor-toolbar-close">', "fontawesome" === this.getEditorOption("buttonLabels") ? '<i class="fa fa-times"></i>' : this.formCloseLabel, "</a>"), this.targetCheckbox && t.push('<div class="medium-editor-toolbar-form-row">', '<input type="checkbox" class="medium-editor-toolbar-anchor-target">', "<label>", this.targetCheckboxText, "</label>", "</div>"), this.customClassOption && t.push('<div class="medium-editor-toolbar-form-row">', '<input type="checkbox" class="medium-editor-toolbar-anchor-button">', "<label>", this.customClassOptionText, "</label>", "</div>"), t.join("")
                    },
                    isDisplayed: function() {
                        return t.extensions.form.prototype.isDisplayed.apply(this)
                    },
                    hideForm: function() {
                        t.extensions.form.prototype.hideForm.apply(this), this.getInput().value = ""
                    },
                    showForm: function(e) {
                        var i = this.getInput(),
                            n = this.getAnchorTargetCheckbox(),
                            s = this.getAnchorButtonCheckbox();
                        if (e = e || {
                            value: ""
                        }, "string" == typeof e && (e = {
                            value: e
                        }), this.base.saveSelection(), this.hideToolbarDefaultActions(), t.extensions.form.prototype.showForm.apply(this), this.setToolbarPosition(), i.value = e.value, i.focus(), n && (n.checked = "_blank" === e.target), s) {
                            var o = e.buttonClass ? e.buttonClass.split(" ") : [];
                            s.checked = -1 !== o.indexOf(this.customClassOption)
                        }
                    },
                    destroy: function() {
                        return this.form ? (this.form.parentNode && this.form.parentNode.removeChild(this.form), void delete this.form) : !1
                    },
                    getFormOpts: function() {
                        var t = this.getAnchorTargetCheckbox(),
                            e = this.getAnchorButtonCheckbox(),
                            i = {
                                value: this.getInput().value.trim()
                            };
                        return this.linkValidation && (i.value = this.checkLinkFormat(i.value)), i.target = "_self", t && t.checked && (i.target = "_blank"), e && e.checked && (i.buttonClass = this.customClassOption), i
                    },
                    doFormSave: function() {
                        var t = this.getFormOpts();
                        this.completeFormSave(t)
                    },
                    completeFormSave: function(t) {
                        this.base.restoreSelection(), this.execAction(this.action, t), this.base.checkSelection()
                    },
                    checkLinkFormat: function(t) {
                        var e = /^([a-z]+:)?\/\/|^(mailto|tel|maps):/i,
                            i = /^\+?\s?\(?(?:\d\s?\-?\)?){3,20}$/;
                        return i.test(t) ? "tel:" + t : (e.test(t) ? "" : "http://") + encodeURI(t)
                    },
                    doFormCancel: function() {
                        this.base.restoreSelection(), this.base.checkSelection()
                    },
                    attachFormEvents: function(t) {
                        var e = t.querySelector(".medium-editor-toolbar-close"),
                            i = t.querySelector(".medium-editor-toolbar-save"),
                            n = t.querySelector(".medium-editor-toolbar-input");
                        this.on(t, "click", this.handleFormClick.bind(this)), this.on(n, "keyup", this.handleTextboxKeyup.bind(this)), this.on(e, "click", this.handleCloseClick.bind(this)), this.on(i, "click", this.handleSaveClick.bind(this), !0)
                    },
                    createForm: function() {
                        var t = this.document,
                            e = t.createElement("div");
                        return e.className = "medium-editor-toolbar-form", e.id = "medium-editor-toolbar-form-anchor-" + this.getEditorId(), e.innerHTML = this.getTemplate(), this.attachFormEvents(e), e
                    },
                    getInput: function() {
                        return this.getForm().querySelector("input.medium-editor-toolbar-input")
                    },
                    getAnchorTargetCheckbox: function() {
                        return this.getForm().querySelector(".medium-editor-toolbar-anchor-target")
                    },
                    getAnchorButtonCheckbox: function() {
                        return this.getForm().querySelector(".medium-editor-toolbar-anchor-button")
                    },
                    handleTextboxKeyup: function(e) {
                        return e.keyCode === t.util.keyCode.ENTER ? (e.preventDefault(), void this.doFormSave()) : void(e.keyCode === t.util.keyCode.ESCAPE && (e.preventDefault(), this.doFormCancel()))
                    },
                    handleFormClick: function(t) {
                        t.stopPropagation()
                    },
                    handleSaveClick: function(t) {
                        t.preventDefault(), this.doFormSave()
                    },
                    handleCloseClick: function(t) {
                        t.preventDefault(), this.doFormCancel()
                    }
                });
                t.extensions.anchor = e
            }(),
            function() {
                var e = t.Extension.extend({
                    name: "anchor-preview",
                    hideDelay: 500,
                    previewValueSelector: "a",
                    showWhenToolbarIsVisible: !1,
                    showOnEmptyLinks: !0,
                    init: function() {
                        this.anchorPreview = this.createPreview(), this.getEditorOption("elementsContainer").appendChild(this.anchorPreview), this.attachToEditables()
                    },
                    getInteractionElements: function() {
                        return this.getPreviewElement()
                    },
                    getPreviewElement: function() {
                        return this.anchorPreview
                    },
                    createPreview: function() {
                        var t = this.document.createElement("div");
                        return t.id = "medium-editor-anchor-preview-" + this.getEditorId(), t.className = "medium-editor-anchor-preview", t.innerHTML = this.getTemplate(), this.on(t, "click", this.handleClick.bind(this)), t
                    },
                    getTemplate: function() {
                        return '<div class="medium-editor-toolbar-anchor-preview" id="medium-editor-toolbar-anchor-preview">    <a class="medium-editor-toolbar-anchor-preview-inner"></a></div>'
                    },
                    destroy: function() {
                        this.anchorPreview && (this.anchorPreview.parentNode && this.anchorPreview.parentNode.removeChild(this.anchorPreview), delete this.anchorPreview)
                    },
                    hidePreview: function() {
                        this.anchorPreview.classList.remove("medium-editor-anchor-preview-active"), this.activeAnchor = null
                    },
                    showPreview: function(t) {
                        return this.anchorPreview.classList.contains("medium-editor-anchor-preview-active") || t.getAttribute("data-disable-preview") ? !0 : (this.previewValueSelector && (this.anchorPreview.querySelector(this.previewValueSelector).textContent = t.attributes.href.value, this.anchorPreview.querySelector(this.previewValueSelector).href = t.attributes.href.value), this.anchorPreview.classList.add("medium-toolbar-arrow-over"), this.anchorPreview.classList.remove("medium-toolbar-arrow-under"), this.anchorPreview.classList.contains("medium-editor-anchor-preview-active") || this.anchorPreview.classList.add("medium-editor-anchor-preview-active"), this.activeAnchor = t, this.positionPreview(), this.attachPreviewHandlers(), this)
                    },
                    positionPreview: function(t) {
                        t = t || this.activeAnchor;
                        var e, i, n = this.anchorPreview.offsetHeight,
                            s = t.getBoundingClientRect(),
                            o = (s.left + s.right) / 2,
                            a = this.diffLeft,
                            r = this.diffTop;
                        e = this.anchorPreview.offsetWidth / 2;
                        var l = this.base.getExtensionByName("toolbar");
                        l && (a = l.diffLeft, r = l.diffTop), i = a - e, this.anchorPreview.style.top = Math.round(n + s.bottom - r + this.window.pageYOffset - this.anchorPreview.offsetHeight) + "px", this.anchorPreview.style.right = "initial", e > o ? (this.anchorPreview.style.left = i + e + "px", this.anchorPreview.style.right = "initial") : this.window.innerWidth - o < e ? (this.anchorPreview.style.left = "auto", this.anchorPreview.style.right = 0) : (this.anchorPreview.style.left = i + o + "px", this.anchorPreview.style.right = "initial")
                    },
                    attachToEditables: function() {
                        this.subscribe("editableMouseover", this.handleEditableMouseover.bind(this)), this.subscribe("positionedToolbar", this.handlePositionedToolbar.bind(this))
                    },
                    handlePositionedToolbar: function() {
                        this.showWhenToolbarIsVisible || this.hidePreview()
                    },
                    handleClick: function(t) {
                        var e = this.base.getExtensionByName("anchor"),
                            i = this.activeAnchor;
                        e && i && (t.preventDefault(), this.base.selectElement(this.activeAnchor), this.base.delay(function() {
                            if (i) {
                                var t = {
                                    value: i.attributes.href.value,
                                    target: i.getAttribute("target"),
                                    buttonClass: i.getAttribute("class")
                                };
                                e.showForm(t), i = null
                            }
                        }.bind(this))), this.hidePreview()
                    },
                    handleAnchorMouseout: function() {
                        this.anchorToPreview = null, this.off(this.activeAnchor, "mouseout", this.instanceHandleAnchorMouseout), this.instanceHandleAnchorMouseout = null
                    },
                    handleEditableMouseover: function(e) {
                        var i = t.util.getClosestTag(e.target, "a");
                        if (!1 !== i) {
                            if (!this.showOnEmptyLinks && (!/href=["']\S+["']/.test(i.outerHTML) || /href=["']#\S+["']/.test(i.outerHTML))) return !0;
                            var n = this.base.getExtensionByName("toolbar");
                            if (!this.showWhenToolbarIsVisible && n && n.isDisplayed && n.isDisplayed()) return !0;
                            this.activeAnchor && this.activeAnchor !== i && this.detachPreviewHandlers(), this.anchorToPreview = i, this.instanceHandleAnchorMouseout = this.handleAnchorMouseout.bind(this), this.on(this.anchorToPreview, "mouseout", this.instanceHandleAnchorMouseout), this.base.delay(function() {
                                this.anchorToPreview && this.showPreview(this.anchorToPreview)
                            }.bind(this))
                        }
                    },
                    handlePreviewMouseover: function() {
                        this.lastOver = (new Date).getTime(), this.hovering = !0
                    },
                    handlePreviewMouseout: function(t) {
                        t.relatedTarget && /anchor-preview/.test(t.relatedTarget.className) || (this.hovering = !1)
                    },
                    updatePreview: function() {
                        if (this.hovering) return !0;
                        var t = (new Date).getTime() - this.lastOver;
                        t > this.hideDelay && this.detachPreviewHandlers()
                    },
                    detachPreviewHandlers: function() {
                        clearInterval(this.intervalTimer), this.instanceHandlePreviewMouseover && (this.off(this.anchorPreview, "mouseover", this.instanceHandlePreviewMouseover), this.off(this.anchorPreview, "mouseout", this.instanceHandlePreviewMouseout), this.activeAnchor && (this.off(this.activeAnchor, "mouseover", this.instanceHandlePreviewMouseover), this.off(this.activeAnchor, "mouseout", this.instanceHandlePreviewMouseout))), this.hidePreview(), this.hovering = this.instanceHandlePreviewMouseover = this.instanceHandlePreviewMouseout = null
                    },
                    attachPreviewHandlers: function() {
                        this.lastOver = (new Date).getTime(), this.hovering = !0, this.instanceHandlePreviewMouseover = this.handlePreviewMouseover.bind(this), this.instanceHandlePreviewMouseout = this.handlePreviewMouseout.bind(this), this.intervalTimer = setInterval(this.updatePreview.bind(this), 200), this.on(this.anchorPreview, "mouseover", this.instanceHandlePreviewMouseover), this.on(this.anchorPreview, "mouseout", this.instanceHandlePreviewMouseout), this.on(this.activeAnchor, "mouseover", this.instanceHandlePreviewMouseover), this.on(this.activeAnchor, "mouseout", this.instanceHandlePreviewMouseout)
                    }
                });
                t.extensions.anchorPreview = e
            }(),
            function() {
                function e(e) {
                    return !t.util.getClosestTag(e, "a")
                }
                var i, n, s, o;
                i = [" ", "	", "\n", "\r", " ", " ", " ", " ", " ", "\u2028", "\u2029"], n = "com|net|org|edu|gov|mil|aero|asia|biz|cat|coop|info|int|jobs|mobi|museum|name|post|pro|tel|travel|xxx|ac|ad|ae|af|ag|ai|al|am|an|ao|aq|ar|as|at|au|aw|ax|az|ba|bb|bd|be|bf|bg|bh|bi|bj|bm|bn|bo|br|bs|bt|bv|bw|by|bz|ca|cc|cd|cf|cg|ch|ci|ck|cl|cm|cn|co|cr|cs|cu|cv|cx|cy|cz|dd|de|dj|dk|dm|do|dz|ec|ee|eg|eh|er|es|et|eu|fi|fj|fk|fm|fo|fr|ga|gb|gd|ge|gf|gg|gh|gi|gl|gm|gn|gp|gq|gr|gs|gt|gu|gw|gy|hk|hm|hn|hr|ht|hu|id|ie|il|im|in|io|iq|ir|is|it|je|jm|jo|jp|ke|kg|kh|ki|km|kn|kp|kr|kw|ky|kz|la|lb|lc|li|lk|lr|ls|lt|lu|lv|ly|ma|mc|md|me|mg|mh|mk|ml|mm|mn|mo|mp|mq|mr|ms|mt|mu|mv|mw|mx|my|mz|na|nc|ne|nf|ng|ni|nl|no|np|nr|nu|nz|om|pa|pe|pf|pg|ph|pk|pl|pm|pn|pr|ps|pt|pw|py|qa|re|ro|rs|ru|rw|sa|sb|sc|sd|se|sg|sh|si|sj|ja|sk|sl|sm|sn|so|sr|ss|st|su|sv|sx|sy|sz|tc|td|tf|tg|th|tj|tk|tl|tm|tn|to|tp|tr|tt|tv|tw|tz|ua|ug|uk|us|uy|uz|va|vc|ve|vg|vi|vn|vu|wf|ws|ye|yt|yu|za|zm|zw",
                    s = "(((?:(https?://|ftps?://|nntp://)|www\\d{0,3}[.]|[a-z0-9.\\-]+[.](" + n + ")\\/)\\S+(?:[^\\s`!\\[\\]{};:'\".,?«»“”‘’])))|(([a-z0-9\\-]+\\.)?[a-z0-9\\-]+\\.(" + n + "))", o = new RegExp("^(" + n + ")$", "i");
                var a = t.Extension.extend({
                    init: function() {
                        t.Extension.prototype.init.apply(this, arguments), this.disableEventHandling = !1, this.subscribe("editableKeypress", this.onKeypress.bind(this)), this.subscribe("editableBlur", this.onBlur.bind(this)), this.document.execCommand("AutoUrlDetect", !1, !1)
                    },
                    isLastInstance: function() {
                        for (var t = 0, e = 0; e < this.window._mediumEditors.length; e++) {
                            var i = this.window._mediumEditors[e];
                            null !== i && void 0 !== i.getExtensionByName("autoLink") && t++
                        }
                        return 1 === t
                    },
                    destroy: function() {
                        this.document.queryCommandSupported("AutoUrlDetect") && this.isLastInstance() && this.document.execCommand("AutoUrlDetect", !1, !0)
                    },
                    onBlur: function(t, e) {
                        this.performLinking(e)
                    },
                    onKeypress: function(e) {
                        this.disableEventHandling || t.util.isKey(e, [t.util.keyCode.SPACE, t.util.keyCode.ENTER]) && (clearTimeout(this.performLinkingTimeout), this.performLinkingTimeout = setTimeout(function() {
                            try {
                                var t = this.base.exportSelection();
                                this.performLinking(e.target) && this.base.importSelection(t, !0)
                            } catch (i) {
                                window.console && window.console.error("Failed to perform linking", i), this.disableEventHandling = !0
                            }
                        }.bind(this), 0))
                    },
                    performLinking: function(e) {
                        var i = t.util.splitByBlockElements(e),
                            n = !1;
                        0 === i.length && (i = [e]);
                        for (var s = 0; s < i.length; s++) n = this.removeObsoleteAutoLinkSpans(i[s]) || n, n = this.performLinkingWithinElement(i[s]) || n;
                        return this.base.events.updateInput(e, {
                            target: e,
                            currentTarget: e
                        }), n
                    },
                    removeObsoleteAutoLinkSpans: function(i) {
                        if (!i || 3 === i.nodeType) return !1;
                        for (var n = i.querySelectorAll('span[data-auto-link="true"]'), s = !1, o = 0; o < n.length; o++) {
                            var a = n[o].textContent;
                            if (-1 === a.indexOf("://") && (a = t.util.ensureUrlHasProtocol(a)), n[o].getAttribute("data-href") !== a && e(n[o])) {
                                s = !0;
                                var r = a.replace(/\s+$/, "");
                                if (n[o].getAttribute("data-href") === r) {
                                    var l = a.length - r.length,
                                        h = t.util.splitOffDOMTree(n[o], this.splitTextBeforeEnd(n[o], l));
                                    n[o].parentNode.insertBefore(h, n[o].nextSibling)
                                } else t.util.unwrap(n[o], this.document)
                            }
                        }
                        return s
                    },
                    splitTextBeforeEnd: function(t, e) {
                        for (var i = this.document.createTreeWalker(t, NodeFilter.SHOW_TEXT, null, !1), n = !0; n;) n = null !== i.lastChild();
                        for (var s, o, a; e > 0 && null !== a;) s = i.currentNode, o = s.nodeValue, o.length > e ? (a = s.splitText(o.length - e), e = 0) : (a = i.previousNode(), e -= o.length);
                        return a
                    },
                    performLinkingWithinElement: function(e) {
                        for (var i = this.findLinkableText(e), n = !1, s = 0; s < i.length; s++) {
                            var o = t.util.findOrCreateMatchingTextNodes(this.document, e, i[s]);
                            this.shouldNotLink(o) || this.createAutoLink(o, i[s].href)
                        }
                        return n
                    },
                    shouldNotLink: function(e) {
                        for (var i = !1, n = 0; n < e.length && i === !1; n++) i = !!t.util.traverseUp(e[n], function(t) {
                            return "a" === t.nodeName.toLowerCase() || t.getAttribute && "true" === t.getAttribute("data-auto-link")
                        });
                        return i
                    },
                    findLinkableText: function(t) {
                        for (var e = new RegExp(s, "gi"), n = t.textContent, a = null, r = []; null !== (a = e.exec(n));) {
                            var l = !0,
                                h = a.index + a[0].length;
                            l = !(0 !== a.index && -1 === i.indexOf(n[a.index - 1]) || h !== n.length && -1 === i.indexOf(n[h])), l = l && (-1 !== a[0].indexOf("/") || o.test(a[0].split(".").pop().split("?").shift())), l && r.push({
                                href: a[0],
                                start: a.index,
                                end: h
                            })
                        }
                        return r
                    },
                    createAutoLink: function(e, i) {
                        i = t.util.ensureUrlHasProtocol(i);
                        var n = t.util.createLink(this.document, e, i, this.getEditorOption("targetBlank") ? "_blank" : null),
                            s = this.document.createElement("span");
                        for (s.setAttribute("data-auto-link", "true"), s.setAttribute("data-href", i), n.insertBefore(s, n.firstChild); n.childNodes.length > 1;) s.appendChild(n.childNodes[1])
                    }
                });
                t.extensions.autoLink = a
            }(),
            function() {
                function e(e) {
                    var n = t.util.getContainerEditorElement(e),
                        s = Array.prototype.slice.call(n.parentElement.querySelectorAll("." + i));
                    s.forEach(function(t) {
                        t.classList.remove(i)
                    })
                }
                var i = "medium-editor-dragover",
                    n = t.Extension.extend({
                        name: "fileDragging",
                        allowedTypes: ["image"],
                        init: function() {
                            t.Extension.prototype.init.apply(this, arguments), this.subscribe("editableDrag", this.handleDrag.bind(this)), this.subscribe("editableDrop", this.handleDrop.bind(this))
                        },
                        handleDrag: function(t) {
                            t.preventDefault(), t.dataTransfer.dropEffect = "copy";
                            var n = t.target.classList ? t.target : t.target.parentElement;
                            e(n), "dragover" === t.type && n.classList.add(i)
                        },
                        handleDrop: function(t) {
                            t.preventDefault(), t.stopPropagation(), this.base.selectElement(t.target);
                            var i = this.base.exportSelection();
                            i.start = i.end, this.base.importSelection(i), t.dataTransfer.files && Array.prototype.slice.call(t.dataTransfer.files).forEach(function(t) {
                                this.isAllowedFile(t) && t.type.match("image") && this.insertImageFile(t)
                            }, this), e(t.target)
                        },
                        isAllowedFile: function(t) {
                            return this.allowedTypes.some(function(e) {
                                return !!t.type.match(e)
                            })
                        },
                        insertImageFile: function(e) {
                            if ("function" == typeof FileReader) {
                                var i = new FileReader;
                                i.readAsDataURL(e), i.addEventListener("load", function(e) {
                                    var i = this.document.createElement("img");
                                    i.src = e.target.result, t.util.insertHTMLCommand(this.document, i.outerHTML)
                                }.bind(this))
                            }
                        }
                    });
                t.extensions.fileDragging = n
            }(),
            function() {
                var e = t.Extension.extend({
                    name: "keyboard-commands",
                    commands: [{
                        command: "bold",
                        key: "B",
                        meta: !0,
                        shift: !1,
                        alt: !1
                    }, {
                        command: "italic",
                        key: "I",
                        meta: !0,
                        shift: !1,
                        alt: !1
                    }, {
                        command: "underline",
                        key: "U",
                        meta: !0,
                        shift: !1,
                        alt: !1
                    }],
                    init: function() {
                        t.Extension.prototype.init.apply(this, arguments), this.subscribe("editableKeydown", this.handleKeydown.bind(this)), this.keys = {}, this.commands.forEach(function(t) {
                            var e = t.key.charCodeAt(0);
                            this.keys[e] || (this.keys[e] = []), this.keys[e].push(t)
                        }, this)
                    },
                    handleKeydown: function(e) {
                        var i = t.util.getKeyCode(e);
                        if (this.keys[i]) {
                            var n = t.util.isMetaCtrlKey(e),
                                s = !!e.shiftKey,
                                o = !!e.altKey;
                            this.keys[i].forEach(function(t) {
                                t.meta !== n || t.shift !== s || t.alt !== o && void 0 !== t.alt || (e.preventDefault(), e.stopPropagation(), "function" == typeof t.command ? t.command.apply(this) : !1 !== t.command && this.execAction(t.command))
                            }, this)
                        }
                    }
                });
                t.extensions.keyboardCommands = e
            }(),
            function() {
                var e = t.extensions.form.extend({
                    name: "fontname",
                    action: "fontName",
                    aria: "change font name",
                    contentDefault: "&#xB1;",
                    contentFA: '<i class="fa fa-font"></i>',
                    fonts: ["", "Arial", "Verdana", "Times New Roman"],
                    init: function() {
                        t.extensions.form.prototype.init.apply(this, arguments)
                    },
                    handleClick: function(t) {
                        if (t.preventDefault(), t.stopPropagation(), !this.isDisplayed()) {
                            var e = this.document.queryCommandValue("fontName") + "";
                            this.showForm(e)
                        }
                        return !1
                    },
                    getForm: function() {
                        return this.form || (this.form = this.createForm()), this.form
                    },
                    isDisplayed: function() {
                        return "block" === this.getForm().style.display
                    },
                    hideForm: function() {
                        this.getForm().style.display = "none", this.getSelect().value = ""
                    },
                    showForm: function(t) {
                        var e = this.getSelect();
                        this.base.saveSelection(), this.hideToolbarDefaultActions(), this.getForm().style.display = "block", this.setToolbarPosition(), e.value = t || "", e.focus()
                    },
                    destroy: function() {
                        return this.form ? (this.form.parentNode && this.form.parentNode.removeChild(this.form), void delete this.form) : !1
                    },
                    doFormSave: function() {
                        this.base.restoreSelection(), this.base.checkSelection()
                    },
                    doFormCancel: function() {
                        this.base.restoreSelection(), this.clearFontName(), this.base.checkSelection()
                    },
                    createForm: function() {
                        var t, e = this.document,
                            i = e.createElement("div"),
                            n = e.createElement("select"),
                            s = e.createElement("a"),
                            o = e.createElement("a");
                        i.className = "medium-editor-toolbar-form", i.id = "medium-editor-toolbar-form-fontname-" + this.getEditorId(), this.on(i, "click", this.handleFormClick.bind(this));
                        for (var a = 0; a < this.fonts.length; a++) t = e.createElement("option"), t.innerHTML = this.fonts[a], t.value = this.fonts[a], n.appendChild(t);
                        return n.className = "medium-editor-toolbar-select", i.appendChild(n), this.on(n, "change", this.handleFontChange.bind(this)), o.setAttribute("href", "#"), o.className = "medium-editor-toobar-save", o.innerHTML = "fontawesome" === this.getEditorOption("buttonLabels") ? '<i class="fa fa-check"></i>' : "&#10003;", i.appendChild(o), this.on(o, "click", this.handleSaveClick.bind(this), !0), s.setAttribute("href", "#"), s.className = "medium-editor-toobar-close", s.innerHTML = "fontawesome" === this.getEditorOption("buttonLabels") ? '<i class="fa fa-times"></i>' : "&times;", i.appendChild(s), this.on(s, "click", this.handleCloseClick.bind(this)), i
                    },
                    getSelect: function() {
                        return this.getForm().querySelector("select.medium-editor-toolbar-select")
                    },
                    clearFontName: function() {
                        t.selection.getSelectedElements(this.document).forEach(function(t) {
                            "font" === t.nodeName.toLowerCase() && t.hasAttribute("face") && t.removeAttribute("face")
                        })
                    },
                    handleFontChange: function() {
                        var t = this.getSelect().value;
                        "" === t ? this.clearFontName() : this.execAction("fontName", {
                            value: t
                        })
                    },
                    handleFormClick: function(t) {
                        t.stopPropagation()
                    },
                    handleSaveClick: function(t) {
                        t.preventDefault(), this.doFormSave()
                    },
                    handleCloseClick: function(t) {
                        t.preventDefault(), this.doFormCancel()
                    }
                });
                t.extensions.fontName = e
            }(),
            function() {
                var e = t.extensions.form.extend({
                    name: "fontsize",
                    action: "fontSize",
                    aria: "increase/decrease font size",
                    contentDefault: "&#xB1;",
                    contentFA: '<i class="fa fa-text-height"></i>',
                    init: function() {
                        t.extensions.form.prototype.init.apply(this, arguments)
                    },
                    handleClick: function(t) {
                        if (t.preventDefault(), t.stopPropagation(), !this.isDisplayed()) {
                            var e = this.document.queryCommandValue("fontSize") + "";
                            this.showForm(e)
                        }
                        return !1
                    },
                    getForm: function() {
                        return this.form || (this.form = this.createForm()), this.form
                    },
                    isDisplayed: function() {
                        return "block" === this.getForm().style.display
                    },
                    hideForm: function() {
                        this.getForm().style.display = "none", this.getInput().value = ""
                    },
                    showForm: function(t) {
                        var e = this.getInput();
                        this.base.saveSelection(), this.hideToolbarDefaultActions(), this.getForm().style.display = "block", this.setToolbarPosition(), e.value = t || "", e.focus()
                    },
                    destroy: function() {
                        return this.form ? (this.form.parentNode && this.form.parentNode.removeChild(this.form), void delete this.form) : !1
                    },
                    doFormSave: function() {
                        this.base.restoreSelection(), this.base.checkSelection()
                    },
                    doFormCancel: function() {
                        this.base.restoreSelection(), this.clearFontSize(), this.base.checkSelection()
                    },
                    createForm: function() {
                        var t = this.document,
                            e = t.createElement("div"),
                            i = t.createElement("input"),
                            n = t.createElement("a"),
                            s = t.createElement("a");
                        return e.className = "medium-editor-toolbar-form", e.id = "medium-editor-toolbar-form-fontsize-" + this.getEditorId(), this.on(e, "click", this.handleFormClick.bind(this)), i.setAttribute("type", "range"), i.setAttribute("min", "1"), i.setAttribute("max", "7"), i.className = "medium-editor-toolbar-input", e.appendChild(i), this.on(i, "change", this.handleSliderChange.bind(this)), s.setAttribute("href", "#"), s.className = "medium-editor-toobar-save", s.innerHTML = "fontawesome" === this.getEditorOption("buttonLabels") ? '<i class="fa fa-check"></i>' : "&#10003;", e.appendChild(s), this.on(s, "click", this.handleSaveClick.bind(this), !0), n.setAttribute("href", "#"), n.className = "medium-editor-toobar-close", n.innerHTML = "fontawesome" === this.getEditorOption("buttonLabels") ? '<i class="fa fa-times"></i>' : "&times;", e.appendChild(n), this.on(n, "click", this.handleCloseClick.bind(this)), e
                    },
                    getInput: function() {
                        return this.getForm().querySelector("input.medium-editor-toolbar-input")
                    },
                    clearFontSize: function() {
                        t.selection.getSelectedElements(this.document).forEach(function(t) {
                            "font" === t.nodeName.toLowerCase() && t.hasAttribute("size") && t.removeAttribute("size")
                        })
                    },
                    handleSliderChange: function() {
                        var t = this.getInput().value;
                        "4" === t ? this.clearFontSize() : this.execAction("fontSize", {
                            value: t
                        })
                    },
                    handleFormClick: function(t) {
                        t.stopPropagation()
                    },
                    handleSaveClick: function(t) {
                        t.preventDefault(), this.doFormSave()
                    },
                    handleCloseClick: function(t) {
                        t.preventDefault(), this.doFormCancel()
                    }
                });
                t.extensions.fontSize = e
            }(),
            function() {
                function e() {
                    return [
                        [new RegExp(/^[\s\S]*<body[^>]*>\s*|\s*<\/body[^>]*>[\s\S]*$/g), ""],
                        [new RegExp(/<!--StartFragment-->|<!--EndFragment-->/g), ""],
                        [new RegExp(/<br>$/i), ""],
                        [new RegExp(/<[^>]*docs-internal-guid[^>]*>/gi), ""],
                        [new RegExp(/<\/b>(<br[^>]*>)?$/gi), ""],
                        [new RegExp(/<span class="Apple-converted-space">\s+<\/span>/g), " "],
                        [new RegExp(/<br class="Apple-interchange-newline">/g), "<br>"],
                        [new RegExp(/<span[^>]*(font-style:italic;font-weight:bold|font-weight:bold;font-style:italic)[^>]*>/gi), '<span class="replace-with italic bold">'],
                        [new RegExp(/<span[^>]*font-style:italic[^>]*>/gi), '<span class="replace-with italic">'],
                        [new RegExp(/<span[^>]*font-weight:bold[^>]*>/gi), '<span class="replace-with bold">'],
                        [new RegExp(/&lt;(\/?)(i|b|a)&gt;/gi), "<$1$2>"],
                        [new RegExp(/&lt;a(?:(?!href).)+href=(?:&quot;|&rdquo;|&ldquo;|"|“|”)(((?!&quot;|&rdquo;|&ldquo;|"|“|”).)*)(?:&quot;|&rdquo;|&ldquo;|"|“|”)(?:(?!&gt;).)*&gt;/gi), '<a href="$1">'],
                        [new RegExp(/<\/p>\n+/gi), "</p>"],
                        [new RegExp(/\n+<p/gi), "<p"],
                        [new RegExp(/<\/?o:[a-z]*>/gi), ""],
                        [new RegExp(/<!\[if !supportLists\]>(((?!<!).)*)<!\[endif]\>/gi), "$1"]
                    ]
                }

                function i(t, e, i) {
                    var n = t.clipboardData || e.clipboardData || i.dataTransfer,
                        s = {};
                    if (!n) return s;
                    if (n.getData) {
                        var o = n.getData("Text");
                        o && o.length > 0 && (s["text/plain"] = o)
                    }
                    if (n.types)
                        for (var a = 0; a < n.types.length; a++) {
                            var r = n.types[a];
                            s[r] = n.getData(r)
                        }
                    return s
                }
                var n = "%ME_PASTEBIN%",
                    s = null,
                    o = null,
                    a = function(t) {
                        t.stopPropagation()
                    },
                    r = t.Extension.extend({
                        forcePlainText: !0,
                        cleanPastedHTML: !1,
                        preCleanReplacements: [],
                        cleanReplacements: [],
                        cleanAttrs: ["class", "style", "dir"],
                        cleanTags: ["meta"],
                        init: function() {
                            t.Extension.prototype.init.apply(this, arguments), (this.forcePlainText || this.cleanPastedHTML) && (this.subscribe("editableKeydown", this.handleKeydown.bind(this)), this.getEditorElements().forEach(function(t) {
                                this.on(t, "paste", this.handlePaste.bind(this))
                            }, this), this.subscribe("addElement", this.handleAddElement.bind(this)))
                        },
                        handleAddElement: function(t, e) {
                            this.on(e, "paste", this.handlePaste.bind(this))
                        },
                        destroy: function() {
                            (this.forcePlainText || this.cleanPastedHTML) && this.removePasteBin()
                        },
                        handlePaste: function(t, e) {
                            if (!t.defaultPrevented) {
                                var n = i(t, this.window, this.document),
                                    s = n["text/html"],
                                    o = n["text/plain"];
                                this.window.clipboardData && void 0 === t.clipboardData && !s && (s = o), (s || o) && (t.preventDefault(), this.doPaste(s, o, e))
                            }
                        },
                        doPaste: function(e, i, n) {
                            var s, o, a = "";
                            if (this.cleanPastedHTML && e) return this.cleanPaste(e);
                            if (this.getEditorOption("disableReturn") || n && n.getAttribute("data-disable-return")) a = t.util.htmlEntities(i);
                            else if (s = i.split(/[\r\n]+/g), s.length > 1)
                                for (o = 0; o < s.length; o += 1) "" !== s[o] && (a += "<p>" + t.util.htmlEntities(s[o]) + "</p>");
                            else a = t.util.htmlEntities(s[0]);
                            t.util.insertHTMLCommand(this.document, a)
                        },
                        handlePasteBinPaste: function(t) {
                            if (t.defaultPrevented) return void this.removePasteBin();
                            var e = i(t, this.window, this.document),
                                n = e["text/html"],
                                s = e["text/plain"],
                                a = o;
                            return !this.cleanPastedHTML || n ? (t.preventDefault(), this.removePasteBin(), this.doPaste(n, s, a), void this.trigger("editablePaste", {
                                currentTarget: a,
                                target: a
                            }, a)) : void setTimeout(function() {
                                this.cleanPastedHTML && (n = this.getPasteBinHtml()), this.removePasteBin(), this.doPaste(n, s, a), this.trigger("editablePaste", {
                                    currentTarget: a,
                                    target: a
                                }, a)
                            }.bind(this), 0)
                        },
                        handleKeydown: function(e, i) {
                            t.util.isKey(e, t.util.keyCode.V) && t.util.isMetaCtrlKey(e) && (e.stopImmediatePropagation(), this.removePasteBin(), this.createPasteBin(i))
                        },
                        createPasteBin: function(e) {
                            var i, r = t.selection.getSelectionRange(this.document),
                                l = this.window.pageYOffset;
                            o = e, r && (i = r.getClientRects(), l += i.length ? i[0].top : r.startContainer.getBoundingClientRect().top), s = r;
                            var h = this.document.createElement("div");
                            h.id = this.pasteBinId = "medium-editor-pastebin-" + +Date.now(), h.setAttribute("style", "border: 1px red solid; position: absolute; top: " + l + "px; width: 10px; height: 10px; overflow: hidden; opacity: 0"), h.setAttribute("contentEditable", !0), h.innerHTML = n, this.document.body.appendChild(h), this.on(h, "focus", a), this.on(h, "focusin", a), this.on(h, "focusout", a), h.focus(), t.selection.selectNode(h, this.document), this.boundHandlePaste || (this.boundHandlePaste = this.handlePasteBinPaste.bind(this)), this.on(h, "paste", this.boundHandlePaste)
                        },
                        removePasteBin: function() {
                            null !== s && (t.selection.selectRange(this.document, s), s = null), null !== o && (o = null);
                            var e = this.getPasteBin();
                            e && e && (this.off(e, "focus", a), this.off(e, "focusin", a), this.off(e, "focusout", a), this.off(e, "paste", this.boundHandlePaste), e.parentElement.removeChild(e))
                        },
                        getPasteBin: function() {
                            return this.document.getElementById(this.pasteBinId)
                        },
                        getPasteBinHtml: function() {
                            var t = this.getPasteBin();
                            if (!t) return !1;
                            if (t.firstChild && "mcepastebin" === t.firstChild.id) return !1;
                            var e = t.innerHTML;
                            return e && e !== n ? e : !1
                        },
                        cleanPaste: function(t) {
                            var i, n, s, o, a = /<p|<br|<div/.test(t),
                                r = [].concat(this.preCleanReplacements || [], e(), this.cleanReplacements || []);
                            for (i = 0; i < r.length; i += 1) t = t.replace(r[i][0], r[i][1]);
                            if (!a) return this.pasteHTML(t);
                            for (s = this.document.createElement("div"), s.innerHTML = "<p>" + t.split("<br><br>").join("</p><p>") + "</p>", n = s.querySelectorAll("a,p,div,br"), i = 0; i < n.length; i += 1) switch (o = n[i], o.innerHTML = o.innerHTML.replace(/\n/gi, " "), o.nodeName.toLowerCase()) {
                                case "p":
                                case "div":
                                    this.filterCommonBlocks(o);
                                    break;
                                case "br":
                                    this.filterLineBreak(o)
                            }
                            this.pasteHTML(s.innerHTML)
                        },
                        pasteHTML: function(e, i) {
                            i = t.util.defaults({}, i, {
                                cleanAttrs: this.cleanAttrs,
                                cleanTags: this.cleanTags
                            });
                            var n, s, o, a, r = this.document.createDocumentFragment();
                            for (r.appendChild(this.document.createElement("body")), a = r.querySelector("body"), a.innerHTML = e, this.cleanupSpans(a), n = a.querySelectorAll("*"), o = 0; o < n.length; o += 1) s = n[o], "a" === s.nodeName.toLowerCase() && this.getEditorOption("targetBlank") && t.util.setTargetBlank(s), t.util.cleanupAttrs(s, i.cleanAttrs), t.util.cleanupTags(s, i.cleanTags);
                            t.util.insertHTMLCommand(this.document, a.innerHTML.replace(/&nbsp;/g, " "))
                        },
                        isCommonBlock: function(t) {
                            return t && ("p" === t.nodeName.toLowerCase() || "div" === t.nodeName.toLowerCase())
                        },
                        filterCommonBlocks: function(t) {
                            /^\s*$/.test(t.textContent) && t.parentNode && t.parentNode.removeChild(t)
                        },
                        filterLineBreak: function(t) {
                            this.isCommonBlock(t.previousElementSibling) ? this.removeWithParent(t) : !this.isCommonBlock(t.parentNode) || t.parentNode.firstChild !== t && t.parentNode.lastChild !== t ? t.parentNode && 1 === t.parentNode.childElementCount && "" === t.parentNode.textContent && this.removeWithParent(t) : this.removeWithParent(t)
                        },
                        removeWithParent: function(t) {
                            t && t.parentNode && (t.parentNode.parentNode && 1 === t.parentNode.childElementCount ? t.parentNode.parentNode.removeChild(t.parentNode) : t.parentNode.removeChild(t))
                        },
                        cleanupSpans: function(e) {
                            var i, n, s, o = e.querySelectorAll(".replace-with"),
                                a = function(t) {
                                    return t && "#text" !== t.nodeName && "false" === t.getAttribute("contenteditable")
                                };
                            for (i = 0; i < o.length; i += 1) n = o[i], s = this.document.createElement(n.classList.contains("bold") ? "b" : "i"), n.classList.contains("bold") && n.classList.contains("italic") ? s.innerHTML = "<i>" + n.innerHTML + "</i>" : s.innerHTML = n.innerHTML, n.parentNode.replaceChild(s, n);
                            for (o = e.querySelectorAll("span"), i = 0; i < o.length; i += 1) {
                                if (n = o[i], t.util.traverseUp(n, a)) return !1;
                                t.util.unwrap(n, this.document)
                            }
                        }
                    });
                t.extensions.paste = r
            }(),
            function() {
                var e = t.Extension.extend({
                    name: "placeholder",
                    text: "Type your text",
                    hideOnClick: !0,
                    init: function() {
                        t.Extension.prototype.init.apply(this, arguments), this.initPlaceholders(), this.attachEventHandlers()
                    },
                    initPlaceholders: function() {
                        this.getEditorElements().forEach(this.initElement, this)
                    },
                    handleAddElement: function(t, e) {
                        this.initElement(e)
                    },
                    initElement: function(t) {
                        t.getAttribute("data-placeholder") || t.setAttribute("data-placeholder", this.text), this.updatePlaceholder(t)
                    },
                    destroy: function() {
                        this.getEditorElements().forEach(this.cleanupElement, this)
                    },
                    handleRemoveElement: function(t, e) {
                        this.cleanupElement(e)
                    },
                    cleanupElement: function(t) {
                        t.getAttribute("data-placeholder") === this.text && t.removeAttribute("data-placeholder")
                    },
                    showPlaceholder: function(e) {
                        e && (t.util.isFF && 0 === e.childNodes.length ? (e.classList.add("medium-editor-placeholder-relative"), e.classList.remove("medium-editor-placeholder")) : (e.classList.add("medium-editor-placeholder"), e.classList.remove("medium-editor-placeholder-relative")))
                    },
                    hidePlaceholder: function(t) {
                        t && (t.classList.remove("medium-editor-placeholder"), t.classList.remove("medium-editor-placeholder-relative"))
                    },
                    updatePlaceholder: function(t, e) {
                        return t.querySelector("img, blockquote, ul, ol, table") || "" !== t.textContent.replace(/^\s+|\s+$/g, "") ? this.hidePlaceholder(t) : void(e || this.showPlaceholder(t))
                    },
                    attachEventHandlers: function() {
                        this.hideOnClick && this.subscribe("focus", this.handleFocus.bind(this)), this.subscribe("editableInput", this.handleInput.bind(this)), this.subscribe("blur", this.handleBlur.bind(this)), this.subscribe("addElement", this.handleAddElement.bind(this)), this.subscribe("removeElement", this.handleRemoveElement.bind(this))
                    },
                    handleInput: function(t, e) {
                        var i = this.hideOnClick && e === this.base.getFocusedElement();
                        this.updatePlaceholder(e, i)
                    },
                    handleFocus: function(t, e) {
                        this.hidePlaceholder(e)
                    },
                    handleBlur: function(t, e) {
                        this.updatePlaceholder(e)
                    }
                });
                t.extensions.placeholder = e
            }(),
            function() {
                var e = t.Extension.extend({
                    name: "toolbar",
                    align: "center",
                    allowMultiParagraphSelection: !0,
                    buttons: ["bold", "italic", "underline", "anchor", "h2", "h3", "quote"],
                    diffLeft: 0,
                    diffTop: -10,
                    firstButtonClass: "medium-editor-button-first",
                    lastButtonClass: "medium-editor-button-last",
                    standardizeSelectionStart: !1,
                    "static": !1,
                    sticky: !1,
                    stickyTopOffset: 0,
                    updateOnEmptySelection: !1,
                    relativeContainer: null,
                    init: function() {
                        t.Extension.prototype.init.apply(this, arguments), this.initThrottledMethods(), this.relativeContainer ? this.relativeContainer.appendChild(this.getToolbarElement()) : this.getEditorOption("elementsContainer").appendChild(this.getToolbarElement())
                    },
                    forEachExtension: function(t, e) {
                        return this.base.extensions.forEach(function(i) {
                            return i !== this ? t.apply(e || this, arguments) : void 0
                        }, this)
                    },
                    createToolbar: function() {
                        var t = this.document.createElement("div");
                        return t.id = "medium-editor-toolbar-" + this.getEditorId(), t.className = "medium-editor-toolbar", this["static"] ? t.className += " static-toolbar" : this.relativeContainer ? t.className += " medium-editor-relative-toolbar" : t.className += " medium-editor-stalker-toolbar", t.appendChild(this.createToolbarButtons()), this.forEachExtension(function(e) {
                            e.hasForm && t.appendChild(e.getForm())
                        }), this.attachEventHandlers(), t
                    },
                    createToolbarButtons: function() {
                        var e, i, n, s, o, a, r = this.document.createElement("ul");
                        return r.id = "medium-editor-toolbar-actions" + this.getEditorId(), r.className = "medium-editor-toolbar-actions", r.style.display = "block", this.buttons.forEach(function(n) {
                            "string" == typeof n ? (o = n, a = null) : (o = n.name, a = n), s = this.base.addBuiltInExtension(o, a), s && "function" == typeof s.getButton && (i = s.getButton(this.base), e = this.document.createElement("li"), t.util.isElement(i) ? e.appendChild(i) : e.innerHTML = i, r.appendChild(e))
                        }, this), n = r.querySelectorAll("button"), n.length > 0 && (n[0].classList.add(this.firstButtonClass), n[n.length - 1].classList.add(this.lastButtonClass)), r
                    },
                    destroy: function() {
                        this.toolbar && (this.toolbar.parentNode && this.toolbar.parentNode.removeChild(this.toolbar), delete this.toolbar)
                    },
                    getInteractionElements: function() {
                        return this.getToolbarElement()
                    },
                    getToolbarElement: function() {
                        return this.toolbar || (this.toolbar = this.createToolbar()), this.toolbar
                    },
                    getToolbarActionsElement: function() {
                        return this.getToolbarElement().querySelector(".medium-editor-toolbar-actions")
                    },
                    initThrottledMethods: function() {
                        this.throttledPositionToolbar = t.util.throttle(function() {
                            this.base.isActive && this.positionToolbarIfShown()
                        }.bind(this))
                    },
                    attachEventHandlers: function() {
                        this.subscribe("blur", this.handleBlur.bind(this)), this.subscribe("focus", this.handleFocus.bind(this)), this.subscribe("editableClick", this.handleEditableClick.bind(this)), this.subscribe("editableKeyup", this.handleEditableKeyup.bind(this)), this.on(this.document.documentElement, "mouseup", this.handleDocumentMouseup.bind(this)), this["static"] && this.sticky && this.on(this.window, "scroll", this.handleWindowScroll.bind(this), !0), this.on(this.window, "resize", this.handleWindowResize.bind(this))
                    },
                    handleWindowScroll: function() {
                        this.positionToolbarIfShown()
                    },
                    handleWindowResize: function() {
                        this.throttledPositionToolbar()
                    },
                    handleDocumentMouseup: function(e) {
                        return e && e.target && t.util.isDescendant(this.getToolbarElement(), e.target) ? !1 : void this.checkState()
                    },
                    handleEditableClick: function() {
                        setTimeout(function() {
                            this.checkState()
                        }.bind(this), 0)
                    },
                    handleEditableKeyup: function() {
                        this.checkState()
                    },
                    handleBlur: function() {
                        clearTimeout(this.hideTimeout), clearTimeout(this.delayShowTimeout), this.hideTimeout = setTimeout(function() {
                            this.hideToolbar()
                        }.bind(this), 1)
                    },
                    handleFocus: function() {
                        this.checkState()
                    },
                    isDisplayed: function() {
                        return this.getToolbarElement().classList.contains("medium-editor-toolbar-active")
                    },
                    showToolbar: function() {
                        clearTimeout(this.hideTimeout), this.isDisplayed() || (this.getToolbarElement().classList.add("medium-editor-toolbar-active"), this.trigger("showToolbar", {}, this.base.getFocusedElement()))
                    },
                    hideToolbar: function() {
                        this.isDisplayed() && (this.getToolbarElement().classList.remove("medium-editor-toolbar-active"), this.trigger("hideToolbar", {}, this.base.getFocusedElement()))
                    },
                    isToolbarDefaultActionsDisplayed: function() {
                        return "block" === this.getToolbarActionsElement().style.display
                    },
                    hideToolbarDefaultActions: function() {
                        this.isToolbarDefaultActionsDisplayed() && (this.getToolbarActionsElement().style.display = "none")
                    },
                    showToolbarDefaultActions: function() {
                        this.hideExtensionForms(), this.isToolbarDefaultActionsDisplayed() || (this.getToolbarActionsElement().style.display = "block"), this.delayShowTimeout = this.base.delay(function() {
                            this.showToolbar()
                        }.bind(this))
                    },
                    hideExtensionForms: function() {
                        this.forEachExtension(function(t) {
                            t.hasForm && t.isDisplayed() && t.hideForm()
                        })
                    },
                    multipleBlockElementsSelected: function() {
                        var e = /<[^\/>][^>]*><\/[^>]+>/gim,
                            i = new RegExp("<(" + t.util.blockContainerElementNames.join("|") + ")[^>]*>", "g"),
                            n = t.selection.getSelectionHtml(this.document).replace(e, ""),
                            s = n.match(i);
                        return !!s && s.length > 1
                    },
                    modifySelection: function() {
                        var e = this.window.getSelection(),
                            i = e.getRangeAt(0);
                        if (this.standardizeSelectionStart && i.startContainer.nodeValue && i.startOffset === i.startContainer.nodeValue.length) {
                            var n = t.util.findAdjacentTextNodeWithContent(t.selection.getSelectionElement(this.window), i.startContainer, this.document);
                            if (n) {
                                for (var s = 0; 0 === n.nodeValue.substr(s, 1).trim().length;) s += 1;
                                i = t.selection.select(this.document, n, s, i.endContainer, i.endOffset)
                            }
                        }
                    },
                    checkState: function() {
                        if (!this.base.preventSelectionUpdates) {
                            if (!this.base.getFocusedElement() || t.selection.selectionInContentEditableFalse(this.window)) return this.hideToolbar();
                            var e = t.selection.getSelectionElement(this.window);
                            return !e || -1 === this.getEditorElements().indexOf(e) || e.getAttribute("data-disable-toolbar") ? this.hideToolbar() : this.updateOnEmptySelection && this["static"] ? this.showAndUpdateToolbar() : !t.selection.selectionContainsContent(this.document) || this.allowMultiParagraphSelection === !1 && this.multipleBlockElementsSelected() ? this.hideToolbar() : void this.showAndUpdateToolbar()
                        }
                    },
                    showAndUpdateToolbar: function() {
                        this.modifySelection(), this.setToolbarButtonStates(), this.trigger("positionToolbar", {}, this.base.getFocusedElement()), this.showToolbarDefaultActions(), this.setToolbarPosition()
                    },
                    setToolbarButtonStates: function() {
                        this.forEachExtension(function(t) {
                            "function" == typeof t.isActive && "function" == typeof t.setInactive && t.setInactive()
                        }), this.checkActiveButtons()
                    },
                    checkActiveButtons: function() {
                        var e, i = [],
                            n = null,
                            s = t.selection.getSelectionRange(this.document),
                            o = function(t) {
                                "function" == typeof t.checkState ? t.checkState(e) : "function" == typeof t.isActive && "function" == typeof t.isAlreadyApplied && "function" == typeof t.setActive && !t.isActive() && t.isAlreadyApplied(e) && t.setActive()
                            };
                        if (s && (this.forEachExtension(function(t) {
                            return "function" == typeof t.queryCommandState && (n = t.queryCommandState(), null !== n) ? void(n && "function" == typeof t.setActive && t.setActive()) : void i.push(t)
                        }), e = t.selection.getSelectedParentElement(s), this.getEditorElements().some(function(i) {
                            return t.util.isDescendant(i, e, !0)
                        })))
                            for (; e && (i.forEach(o), !t.util.isMediumEditorElement(e));) e = e.parentNode
                    },
                    positionToolbarIfShown: function() {
                        this.isDisplayed() && this.setToolbarPosition()
                    },
                    setToolbarPosition: function() {
                        var t = this.base.getFocusedElement(),
                            e = this.window.getSelection();
                        return t ? void((this["static"] || !e.isCollapsed) && (this.showToolbar(), this.relativeContainer || (this["static"] ? this.positionStaticToolbar(t) : this.positionToolbar(e)), this.trigger("positionedToolbar", {}, this.base.getFocusedElement()))) : this
                    },
                    positionStaticToolbar: function(t) {
                        this.getToolbarElement().style.left = "0";
                        var e, i = this.document.documentElement && this.document.documentElement.scrollTop || this.document.body.scrollTop,
                            n = this.window.innerWidth,
                            s = this.getToolbarElement(),
                            o = t.getBoundingClientRect(),
                            a = o.top + i,
                            r = o.left + o.width / 2,
                            l = s.offsetHeight,
                            h = s.offsetWidth,
                            c = h / 2;
                        switch (this.sticky ? i > a + t.offsetHeight - l - this.stickyTopOffset ? (s.style.top = a + t.offsetHeight - l + "px", s.classList.remove("medium-editor-sticky-toolbar")) : i > a - l - this.stickyTopOffset ? (s.classList.add("medium-editor-sticky-toolbar"), s.style.top = this.stickyTopOffset + "px") : (s.classList.remove("medium-editor-sticky-toolbar"), s.style.top = a - l + "px") : s.style.top = a - l + "px", this.align) {
                            case "left":
                                e = o.left;
                                break;
                            case "right":
                                e = o.right - h;
                                break;
                            case "center":
                                e = r - c
                        }
                        0 > e ? e = 0 : e + h > n && (e = n - Math.ceil(h) - 1), s.style.left = e + "px"
                    },
                    positionToolbar: function(t) {
                        this.getToolbarElement().style.left = "0", this.getToolbarElement().style.right = "initial";
                        var e = t.getRangeAt(0),
                            i = e.getBoundingClientRect();
                        (!i || 0 === i.height && 0 === i.width && e.startContainer === e.endContainer) && (i = 1 === e.startContainer.nodeType && e.startContainer.querySelector("img") ? e.startContainer.querySelector("img").getBoundingClientRect() : e.startContainer.getBoundingClientRect());
                        var n = this.window.innerWidth,
                            s = (i.left + i.right) / 2,
                            o = this.getToolbarElement(),
                            a = o.offsetHeight,
                            r = o.offsetWidth,
                            l = r / 2,
                            h = 50,
                            c = this.diffLeft - l;
                        i.top < h ? (o.classList.add("medium-toolbar-arrow-over"), o.classList.remove("medium-toolbar-arrow-under"), o.style.top = h + i.bottom - this.diffTop + this.window.pageYOffset - a + "px") : (o.classList.add("medium-toolbar-arrow-under"), o.classList.remove("medium-toolbar-arrow-over"), o.style.top = i.top + this.diffTop + this.window.pageYOffset - a + "px"), l > s ? (o.style.left = c + l + "px", o.style.right = "initial") : l > n - s ? (o.style.left = "auto", o.style.right = 0) : (o.style.left = c + s + "px", o.style.right = "initial")
                    }
                });
                t.extensions.toolbar = e
            }(),
            function() {
                var e = t.Extension.extend({
                    init: function() {
                        t.Extension.prototype.init.apply(this, arguments), this.subscribe("editableDrag", this.handleDrag.bind(this)), this.subscribe("editableDrop", this.handleDrop.bind(this))
                    },
                    handleDrag: function(t) {
                        var e = "medium-editor-dragover";
                        t.preventDefault(), t.dataTransfer.dropEffect = "copy", "dragover" === t.type ? t.target.classList.add(e) : "dragleave" === t.type && t.target.classList.remove(e)
                    },
                    handleDrop: function(e) {
                        var i, n = "medium-editor-dragover";
                        e.preventDefault(), e.stopPropagation(), e.dataTransfer.files && (i = Array.prototype.slice.call(e.dataTransfer.files, 0), i.some(function(e) {
                            if (e.type.match("image")) {
                                var i, n;
                                i = new FileReader, i.readAsDataURL(e), n = "medium-img-" + +new Date, t.util.insertHTMLCommand(this.document, '<img class="medium-editor-image-loading" id="' + n + '" />'), i.onload = function() {
                                    var t = this.document.getElementById(n);
                                    t && (t.removeAttribute("id"), t.removeAttribute("class"), t.src = i.result)
                                }.bind(this)
                            }
                        }.bind(this))), e.target.classList.remove(n)
                    }
                });
                t.extensions.imageDragging = e
            }(),
            function() {
                function e(e) {
                    var i = t.selection.getSelectionStart(this.options.ownerDocument),
                        n = i.textContent,
                        s = t.selection.getCaretOffsets(i);
                    (void 0 === n[s.left - 1] || "" === n[s.left - 1].trim() || void 0 !== n[s.left] && "" === n[s.left].trim()) && e.preventDefault()
                }

                function i(e, i) {
                    if (this.options.disableReturn || i.getAttribute("data-disable-return")) e.preventDefault();
                    else if (this.options.disableDoubleReturn || i.getAttribute("data-disable-double-return")) {
                        var n = t.selection.getSelectionStart(this.options.ownerDocument);
                        (n && "" === n.textContent.trim() && "li" !== n.nodeName.toLowerCase() || n.previousElementSibling && "br" !== n.previousElementSibling.nodeName.toLowerCase() && "" === n.previousElementSibling.textContent.trim()) && e.preventDefault()
                    }
                }

                function n(e) {
                    var i = t.selection.getSelectionStart(this.options.ownerDocument),
                        n = i && i.nodeName.toLowerCase();
                    "pre" === n && (e.preventDefault(), t.util.insertHTMLCommand(this.options.ownerDocument, "    ")), t.util.isListItem(i) && (e.preventDefault(), e.shiftKey ? this.options.ownerDocument.execCommand("outdent", !1, null) : this.options.ownerDocument.execCommand("indent", !1, null))
                }

                function s(e) {
                    var i, n = t.selection.getSelectionStart(this.options.ownerDocument),
                        s = n.nodeName.toLowerCase(),
                        o = /^(\s+|<br\/?>)?$/i,
                        a = /h\d/i;
                    t.util.isKey(e, [t.util.keyCode.BACKSPACE, t.util.keyCode.ENTER]) && n.previousElementSibling && a.test(s) && 0 === t.selection.getCaretOffsets(n).left ? t.util.isKey(e, t.util.keyCode.BACKSPACE) && o.test(n.previousElementSibling.innerHTML) ? (n.previousElementSibling.parentNode.removeChild(n.previousElementSibling), e.preventDefault()) : !this.options.disableDoubleReturn && t.util.isKey(e, t.util.keyCode.ENTER) && (i = this.options.ownerDocument.createElement("p"), i.innerHTML = "<br>", n.previousElementSibling.parentNode.insertBefore(i, n), e.preventDefault()) : t.util.isKey(e, t.util.keyCode.DELETE) && n.nextElementSibling && n.previousElementSibling && !a.test(s) && o.test(n.innerHTML) && a.test(n.nextElementSibling.nodeName.toLowerCase()) ? (t.selection.moveCursor(this.options.ownerDocument, n.nextElementSibling), n.previousElementSibling.parentNode.removeChild(n), e.preventDefault()) : t.util.isKey(e, t.util.keyCode.BACKSPACE) && "li" === s && o.test(n.innerHTML) && !n.previousElementSibling && !n.parentElement.previousElementSibling && n.nextElementSibling && "li" === n.nextElementSibling.nodeName.toLowerCase() ? (i = this.options.ownerDocument.createElement("p"), i.innerHTML = "<br>", n.parentElement.parentElement.insertBefore(i, n.parentElement), t.selection.moveCursor(this.options.ownerDocument, i), n.parentElement.removeChild(n), e.preventDefault()) : t.util.isKey(e, t.util.keyCode.BACKSPACE) && t.util.getClosestTag(n, "blockquote") !== !1 && 0 === t.selection.getCaretOffsets(n).left && (e.preventDefault(), t.util.execFormatBlock(this.options.ownerDocument, "p"))
                }

                function o(e) {
                    var i, n = t.selection.getSelectionStart(this.options.ownerDocument);
                    n && (t.util.isMediumEditorElement(n) && 0 === n.children.length && !t.util.isBlockContainer(n) && this.options.ownerDocument.execCommand("formatBlock", !1, "p"), !t.util.isKey(e, t.util.keyCode.ENTER) || t.util.isListItem(n) || t.util.isBlockContainer(n) || (i = n.nodeName.toLowerCase(), "a" === i ? this.options.ownerDocument.execCommand("unlink", !1, null) : e.shiftKey || e.ctrlKey || this.options.ownerDocument.execCommand("formatBlock", !1, "p")))
                }

                function a(t, e) {
                    var i = e.parentNode.querySelector('textarea[medium-editor-textarea-id="' + e.getAttribute("medium-editor-textarea-id") + '"]');
                    i && (i.value = e.innerHTML.trim())
                }

                function r(t) {
                    t._mediumEditors || (t._mediumEditors = [null]), this.id || (this.id = t._mediumEditors.length), t._mediumEditors[this.id] = this
                }

                function l(t) {
                    t._mediumEditors && t._mediumEditors[this.id] && (t._mediumEditors[this.id] = null)
                }

                function h(e, i, n) {
                    var s = [];
                    if (e || (e = []), "string" == typeof e && (e = i.querySelectorAll(e)), t.util.isElement(e) && (e = [e]), n)
                        for (var o = 0; o < e.length; o++) {
                            var a = e[o];
                            !t.util.isElement(a) || a.getAttribute("data-medium-editor-element") || a.getAttribute("medium-editor-textarea-id") || s.push(a)
                        } else s = Array.prototype.slice.apply(e);
                    return s
                }

                function c(t) {
                    var e = t.parentNode.querySelector('textarea[medium-editor-textarea-id="' + t.getAttribute("medium-editor-textarea-id") + '"]');
                    e && (e.classList.remove("medium-editor-hidden"), e.removeAttribute("medium-editor-textarea-id")), t.parentNode && t.parentNode.removeChild(t)
                }

                function u(t, e) {
                    return Object.keys(e).forEach(function(i) {
                        void 0 === t[i] && (t[i] = e[i])
                    }), t
                }

                function d(t, e, i) {
                    var n = {
                        window: i.options.contentWindow,
                        document: i.options.ownerDocument,
                        base: i
                    };
                    return t = u(t, n), "function" == typeof t.init && t.init(), t.name || (t.name = e), t
                }

                function p() {
                    return this.elements.every(function(t) {
                        return !!t.getAttribute("data-disable-toolbar")
                    }) ? !1 : this.options.toolbar !== !1
                }

                function f() {
                    return p.call(this) ? this.options.anchorPreview !== !1 : !1
                }

                function m() {
                    return this.options.placeholder !== !1
                }

                function g() {
                    return this.options.autoLink !== !1
                }

                function v() {
                    return this.options.imageDragging !== !1
                }

                function b() {
                    return this.options.keyboardCommands !== !1
                }

                function y() {
                    return !this.options.extensions.imageDragging
                }

                function _(t) {
                    for (var e = this.options.ownerDocument.createElement("div"), i = Date.now(), n = "medium-editor-" + i, s = t.attributes; this.options.ownerDocument.getElementById(n);) i++, n = "medium-editor-" + i;
                    e.className = t.className, e.id = n, e.innerHTML = t.value, t.setAttribute("medium-editor-textarea-id", n);
                    for (var o = 0, a = s.length; a > o; o++) e.hasAttribute(s[o].nodeName) || e.setAttribute(s[o].nodeName, s[o].nodeValue);
                    return t.form && this.on(t.form, "reset", function(t) {
                        t.defaultPrevented || this.resetContent(this.options.ownerDocument.getElementById(n))
                    }.bind(this)), t.classList.add("medium-editor-hidden"), t.parentNode.insertBefore(e, t), e
                }

                function w(e, n) {
                    if (!e.getAttribute("data-medium-editor-element")) {
                        "textarea" === e.nodeName.toLowerCase() && (e = _.call(this, e), this.instanceHandleEditableInput || (this.instanceHandleEditableInput = a.bind(this), this.subscribe("editableInput", this.instanceHandleEditableInput))), this.options.disableEditing || e.getAttribute("data-disable-editing") || (e.setAttribute("contentEditable", !0), e.setAttribute("spellcheck", this.options.spellcheck)), this.instanceHandleEditableKeydownEnter || (e.getAttribute("data-disable-return") || e.getAttribute("data-disable-double-return")) && (this.instanceHandleEditableKeydownEnter = i.bind(this), this.subscribe("editableKeydownEnter", this.instanceHandleEditableKeydownEnter)), this.options.disableReturn || e.getAttribute("data-disable-return") || this.on(e, "keyup", o.bind(this));
                        var s = t.util.guid();
                        e.setAttribute("data-medium-editor-element", !0), e.classList.add("medium-editor-element"), e.setAttribute("role", "textbox"), e.setAttribute("aria-multiline", !0), e.setAttribute("data-medium-editor-editor-index", n), e.setAttribute("medium-editor-index", s), S[s] = e.innerHTML, this.events.attachAllEventsToElement(e)
                    }
                    return e
                }

                function k() {
                    this.subscribe("editableKeydownTab", n.bind(this)), this.subscribe("editableKeydownDelete", s.bind(this)), this.subscribe("editableKeydownEnter", s.bind(this)), this.options.disableExtraSpaces && this.subscribe("editableKeydownSpace", e.bind(this)), this.instanceHandleEditableKeydownEnter || (this.options.disableReturn || this.options.disableDoubleReturn) && (this.instanceHandleEditableKeydownEnter = i.bind(this), this.subscribe("editableKeydownEnter", this.instanceHandleEditableKeydownEnter))
                }

                function C() {
                    if (this.extensions = [], Object.keys(this.options.extensions).forEach(function(t) {
                        "toolbar" !== t && this.options.extensions[t] && this.extensions.push(d(this.options.extensions[t], t, this))
                    }, this), y.call(this)) {
                        var e = this.options.fileDragging;
                        e || (e = {}, v.call(this) || (e.allowedTypes = [])), this.addBuiltInExtension("fileDragging", e)
                    }
                    var i = {
                        paste: !0,
                        "anchor-preview": f.call(this),
                        autoLink: g.call(this),
                        keyboardCommands: b.call(this),
                        placeholder: m.call(this)
                    };
                    Object.keys(i).forEach(function(t) {
                        i[t] && this.addBuiltInExtension(t)
                    }, this);
                    var n = this.options.extensions.toolbar;
                    if (!n && p.call(this)) {
                        var s = t.util.extend({}, this.options.toolbar, {
                            allowMultiParagraphSelection: this.options.allowMultiParagraphSelection
                        });
                        n = new t.extensions.toolbar(s)
                    }
                    n && this.extensions.push(d(n, "toolbar", this))
                }

                function x(e, i) {
                    var n = [
                        ["allowMultiParagraphSelection", "toolbar.allowMultiParagraphSelection"]
                    ];
                    return i && n.forEach(function(e) {
                        i.hasOwnProperty(e[0]) && void 0 !== i[e[0]] && t.util.deprecated(e[0], e[1], "v6.0.0")
                    }), t.util.defaults({}, i, e)
                }

                function E(e, i) {
                    var n, s, o = /^append-(.+)$/gi,
                        a = /justify([A-Za-z]*)$/g;
                    if (n = o.exec(e)) return t.util.execFormatBlock(this.options.ownerDocument, n[1]);
                    if ("fontSize" === e) return i.size && t.util.deprecated(".size option for fontSize command", ".value", "6.0.0"), s = i.value || i.size, this.options.ownerDocument.execCommand("fontSize", !1, s);
                    if ("fontName" === e) return i.name && t.util.deprecated(".name option for fontName command", ".value", "6.0.0"), s = i.value || i.name, this.options.ownerDocument.execCommand("fontName", !1, s);
                    if ("createLink" === e) return this.createLink(i);
                    if ("image" === e) {
                        var r = this.options.contentWindow.getSelection().toString().trim();
                        return this.options.ownerDocument.execCommand("insertImage", !1, r)
                    }
                    if (a.exec(e)) {
                        var l = this.options.ownerDocument.execCommand(e, !1, null),
                            h = t.selection.getSelectedParentElement(t.selection.getSelectionRange(this.options.ownerDocument));
                        return h && T.call(this, t.util.getTopBlockContainer(h)), l
                    }
                    return s = i && i.value, this.options.ownerDocument.execCommand(e, !1, s)
                }

                function T(e) {
                    if (e) {
                        var i, n = Array.prototype.slice.call(e.childNodes).filter(function(t) {
                            var e = "div" === t.nodeName.toLowerCase();
                            return e && !i && (i = t.style.textAlign), e
                        });
                        n.length && (this.saveSelection(), n.forEach(function(e) {
                            if (e.style.textAlign === i) {
                                var n = e.lastChild;
                                if (n) {
                                    t.util.unwrap(e, this.options.ownerDocument);
                                    var s = this.options.ownerDocument.createElement("BR");
                                    n.parentNode.insertBefore(s, n.nextSibling)
                                }
                            }
                        }, this), e.style.textAlign = i, this.restoreSelection())
                    }
                }
                var S = {};
                t.prototype = {
                    init: function(t, e) {
                        return this.options = x.call(this, this.defaults, e), this.origElements = t, this.options.elementsContainer || (this.options.elementsContainer = this.options.ownerDocument.body), this.setup()
                    },
                    setup: function() {
                        this.isActive || (r.call(this, this.options.contentWindow), this.events = new t.Events(this), this.elements = [], this.addElements(this.origElements), 0 !== this.elements.length && (this.isActive = !0, C.call(this), k.call(this)))
                    },
                    destroy: function() {
                        this.isActive && (this.isActive = !1, this.extensions.forEach(function(t) {
                            "function" == typeof t.destroy && t.destroy()
                        }, this), this.events.destroy(), this.elements.forEach(function(t) {
                            this.options.spellcheck && (t.innerHTML = t.innerHTML), t.removeAttribute("contentEditable"), t.removeAttribute("spellcheck"), t.removeAttribute("data-medium-editor-element"), t.classList.remove("medium-editor-element"), t.removeAttribute("role"), t.removeAttribute("aria-multiline"), t.removeAttribute("medium-editor-index"), t.removeAttribute("data-medium-editor-editor-index"), t.getAttribute("medium-editor-textarea-id") && c(t)
                        }, this), this.elements = [], this.instanceHandleEditableKeydownEnter = null, this.instanceHandleEditableInput = null, l.call(this, this.options.contentWindow))
                    },
                    on: function(t, e, i, n) {
                        return this.events.attachDOMEvent(t, e, i, n), this
                    },
                    off: function(t, e, i, n) {
                        return this.events.detachDOMEvent(t, e, i, n), this
                    },
                    subscribe: function(t, e) {
                        return this.events.attachCustomEvent(t, e), this
                    },
                    unsubscribe: function(t, e) {
                        return this.events.detachCustomEvent(t, e), this
                    },
                    trigger: function(t, e, i) {
                        return this.events.triggerCustomEvent(t, e, i), this
                    },
                    delay: function(t) {
                        var e = this;
                        return setTimeout(function() {
                            e.isActive && t()
                        }, this.options.delay)
                    },
                    serialize: function() {
                        var t, e, i = {},
                            n = this.elements.length;
                        for (t = 0; n > t; t += 1) e = "" !== this.elements[t].id ? this.elements[t].id : "element-" + t, i[e] = {
                            value: this.elements[t].innerHTML.trim()
                        };
                        return i
                    },
                    getExtensionByName: function(t) {
                        var e;
                        return this.extensions && this.extensions.length && this.extensions.some(function(i) {
                            return i.name === t ? (e = i, !0) : !1
                        }), e
                    },
                    addBuiltInExtension: function(e, i) {
                        var n, s = this.getExtensionByName(e);
                        if (s) return s;
                        switch (e) {
                            case "anchor":
                                n = t.util.extend({}, this.options.anchor, i), s = new t.extensions.anchor(n);
                                break;
                            case "anchor-preview":
                                s = new t.extensions.anchorPreview(this.options.anchorPreview);
                                break;
                            case "autoLink":
                                s = new t.extensions.autoLink;
                                break;
                            case "fileDragging":
                                s = new t.extensions.fileDragging(i);
                                break;
                            case "fontname":
                                s = new t.extensions.fontName(this.options.fontName);
                                break;
                            case "fontsize":
                                s = new t.extensions.fontSize(i);
                                break;
                            case "keyboardCommands":
                                s = new t.extensions.keyboardCommands(this.options.keyboardCommands);
                                break;
                            case "paste":
                                s = new t.extensions.paste(this.options.paste);
                                break;
                            case "placeholder":
                                s = new t.extensions.placeholder(this.options.placeholder);
                                break;
                            default:
                                t.extensions.button.isBuiltInButton(e) && (i ? (n = t.util.defaults({}, i, t.extensions.button.prototype.defaults[e]), s = new t.extensions.button(n)) : s = new t.extensions.button(e))
                        }
                        return s && this.extensions.push(d(s, e, this)), s
                    },
                    stopSelectionUpdates: function() {
                        this.preventSelectionUpdates = !0
                    },
                    startSelectionUpdates: function() {
                        this.preventSelectionUpdates = !1
                    },
                    checkSelection: function() {
                        var t = this.getExtensionByName("toolbar");
                        return t && t.checkState(), this
                    },
                    queryCommandState: function(t) {
                        var e, i = /^full-(.+)$/gi,
                            n = null;
                        e = i.exec(t), e && (t = e[1]);
                        try {
                            n = this.options.ownerDocument.queryCommandState(t)
                        } catch (s) {
                            n = null
                        }
                        return n
                    },
                    execAction: function(e, i) {
                        var n, s, o = /^full-(.+)$/gi;
                        return n = o.exec(e), n ? (this.saveSelection(), this.selectAllContents(), s = E.call(this, n[1], i), this.restoreSelection()) : s = E.call(this, e, i), ("insertunorderedlist" === e || "insertorderedlist" === e) && t.util.cleanListDOM(this.options.ownerDocument, this.getSelectedParentElement()), this.checkSelection(), s
                    },
                    getSelectedParentElement: function(e) {
                        return void 0 === e && (e = this.options.contentWindow.getSelection().getRangeAt(0)), t.selection.getSelectedParentElement(e)
                    },
                    selectAllContents: function() {
                        var e = t.selection.getSelectionElement(this.options.contentWindow);
                        if (e) {
                            for (; 1 === e.children.length;) e = e.children[0];
                            this.selectElement(e)
                        }
                    },
                    selectElement: function(e) {
                        t.selection.selectNode(e, this.options.ownerDocument);
                        var i = t.selection.getSelectionElement(this.options.contentWindow);
                        i && this.events.focusElement(i)
                    },
                    getFocusedElement: function() {
                        var t;
                        return this.elements.some(function(e) {
                            return !t && e.getAttribute("data-medium-focused") && (t = e), !!t
                        }, this), t
                    },
                    exportSelection: function() {
                        var e = t.selection.getSelectionElement(this.options.contentWindow),
                            i = this.elements.indexOf(e),
                            n = null;
                        return i >= 0 && (n = t.selection.exportSelection(e, this.options.ownerDocument)), null !== n && 0 !== i && (n.editableElementIndex = i), n
                    },
                    saveSelection: function() {
                        this.selectionState = this.exportSelection()
                    },
                    importSelection: function(e, i) {
                        if (e) {
                            var n = this.elements[e.editableElementIndex || 0];
                            t.selection.importSelection(e, n, this.options.ownerDocument, i)
                        }
                    },
                    restoreSelection: function() {
                        this.importSelection(this.selectionState)
                    },
                    createLink: function(e) {
                        var i, n = t.selection.getSelectionElement(this.options.contentWindow),
                            s = {};
                        if (-1 !== this.elements.indexOf(n)) {
                            try {
                                if (this.events.disableCustomEvent("editableInput"), e.url && t.util.deprecated(".url option for createLink", ".value", "6.0.0"), i = e.url || e.value, i && i.trim().length > 0) {
                                    var o = this.options.contentWindow.getSelection();
                                    if (o) {
                                        var a, r, l, h, c = o.getRangeAt(0),
                                            u = c.commonAncestorContainer;
                                        if (3 === c.endContainer.nodeType && 3 !== c.startContainer.nodeType && 0 === c.startOffset && c.startContainer.firstChild === c.endContainer && (u = c.endContainer), r = t.util.getClosestBlockContainer(c.startContainer), l = t.util.getClosestBlockContainer(c.endContainer), 3 !== u.nodeType && 0 !== u.textContent.length && r === l) {
                                            var d = r || n,
                                                p = this.options.ownerDocument.createDocumentFragment();
                                            this.execAction("unlink"), a = this.exportSelection(), p.appendChild(d.cloneNode(!0)), n === d ? t.selection.select(this.options.ownerDocument, d.firstChild, 0, d.lastChild, 3 === d.lastChild.nodeType ? d.lastChild.nodeValue.length : d.lastChild.childNodes.length) : t.selection.select(this.options.ownerDocument, d, 0, d, d.childNodes.length);
                                            var f = this.exportSelection();
                                            h = t.util.findOrCreateMatchingTextNodes(this.options.ownerDocument, p, {
                                                start: a.start - f.start,
                                                end: a.end - f.start,
                                                editableElementIndex: a.editableElementIndex
                                            }), 0 === h.length && (p = this.options.ownerDocument.createDocumentFragment(), p.appendChild(u.cloneNode(!0)), h = [p.firstChild.firstChild, p.firstChild.lastChild]), t.util.createLink(this.options.ownerDocument, h, i.trim());
                                            var m = (p.firstChild.innerHTML.match(/^\s+/) || [""])[0].length;
                                            t.util.insertHTMLCommand(this.options.ownerDocument, p.firstChild.innerHTML.replace(/^\s+/, "")), a.start -= m, a.end -= m, this.importSelection(a)
                                        } else this.options.ownerDocument.execCommand("createLink", !1, i);
                                        this.options.targetBlank || "_blank" === e.target ? t.util.setTargetBlank(t.selection.getSelectionStart(this.options.ownerDocument), i) : t.util.removeTargetBlank(t.selection.getSelectionStart(this.options.ownerDocument), i), e.buttonClass && t.util.addClassToAnchors(t.selection.getSelectionStart(this.options.ownerDocument), e.buttonClass)
                                    }
                                }
                                if (this.options.targetBlank || "_blank" === e.target || e.buttonClass) {
                                    s = this.options.ownerDocument.createEvent("HTMLEvents"), s.initEvent("input", !0, !0, this.options.contentWindow);
                                    for (var g = 0, v = this.elements.length; v > g; g += 1) this.elements[g].dispatchEvent(s)
                                }
                            } finally {
                                this.events.enableCustomEvent("editableInput")
                            }
                            this.events.triggerCustomEvent("editableInput", s, n)
                        }
                    },
                    cleanPaste: function(t) {
                        this.getExtensionByName("paste").cleanPaste(t)
                    },
                    pasteHTML: function(t, e) {
                        this.getExtensionByName("paste").pasteHTML(t, e)
                    },
                    setContent: function(t, e) {
                        if (e = e || 0, this.elements[e]) {
                            var i = this.elements[e];
                            i.innerHTML = t, this.checkContentChanged(i)
                        }
                    },
                    getContent: function(t) {
                        return t = t || 0, this.elements[t] ? this.elements[t].innerHTML.trim() : null
                    },
                    checkContentChanged: function(e) {
                        e = e || t.selection.getSelectionElement(this.options.contentWindow), this.events.updateInput(e, {
                            target: e,
                            currentTarget: e
                        })
                    },
                    resetContent: function(t) {
                        if (t) {
                            var e = this.elements.indexOf(t);
                            return void(-1 !== e && this.setContent(S[t.getAttribute("medium-editor-index")], e))
                        }
                        this.elements.forEach(function(t, e) {
                            this.setContent(S[t.getAttribute("medium-editor-index")], e)
                        }, this)
                    },
                    addElements: function(t) {
                        var e = h(t, this.options.ownerDocument, !0);
                        return 0 === e.length ? !1 : void e.forEach(function(t) {
                            t = w.call(this, t, this.id), this.elements.push(t), this.trigger("addElement", {
                                target: t,
                                currentTarget: t
                            }, t)
                        }, this)
                    },
                    removeElements: function(t) {
                        var e = h(t, this.options.ownerDocument),
                            i = e.map(function(t) {
                                return t.getAttribute("medium-editor-textarea-id") && t.parentNode ? t.parentNode.querySelector('div[medium-editor-textarea-id="' + t.getAttribute("medium-editor-textarea-id") + '"]') : t
                            });
                        this.elements = this.elements.filter(function(t) {
                            return -1 !== i.indexOf(t) ? (this.events.cleanupElement(t), t.getAttribute("medium-editor-textarea-id") && c(t), this.trigger("removeElement", {
                                target: t,
                                currentTarget: t
                            }, t), !1) : !0
                        }, this)
                    }
                }, t.getEditorFromElement = function(t) {
                    var e = t.getAttribute("data-medium-editor-editor-index"),
                        i = t && t.ownerDocument && (t.ownerDocument.defaultView || t.ownerDocument.parentWindow);
                    return i && i._mediumEditors && i._mediumEditors[e] ? i._mediumEditors[e] : null
                }
            }(),
            function() {
                t.prototype.defaults = {
                    activeButtonClass: "medium-editor-button-active",
                    buttonLabels: !1,
                    delay: 0,
                    disableReturn: !1,
                    disableDoubleReturn: !1,
                    disableExtraSpaces: !1,
                    disableEditing: !1,
                    autoLink: !1,
                    elementsContainer: !1,
                    contentWindow: window,
                    ownerDocument: document,
                    targetBlank: !1,
                    extensions: {},
                    spellcheck: !0
                }
            }(), t.parseVersionString = function(t) {
            var e = t.split("-"),
                i = e[0].split("."),
                n = e.length > 1 ? e[1] : "";
            return {
                major: parseInt(i[0], 10),
                minor: parseInt(i[1], 10),
                revision: parseInt(i[2], 10),
                preRelease: n,
                toString: function() {
                    return [i[0], i[1], i[2]].join(".") + (n ? "-" + n : "")
                }
            }
        }, t.version = t.parseVersionString.call(this, {
            version: "5.21.0"
        }.version), t
    }()), define("wishbeen/medium-editor-url-preview", ["medium-editor"], function(t) {
    function e(t) {
        return document.createElement("a").appendChild(document.createTextNode(t)).parentNode.innerHTML
    }

    function i(t, e) {
        var i = new RegExp("(\\s|^)" + e + "(\\s|$)");
        i.test(t.className) || (t.className += " " + e)
    }

    function n(t, e) {
        var i = new RegExp("(\\s|^)" + e + "(\\s|$)");
        t.className = t.className.replace(i, " ").trim()
    }
    var s = null,
        o = t.Extension.extend({
            name: "url-preview",
            init: function() {
                this.subscribe("editableInput", this.handlePreview.bind(this)), this.subscribe("editablePaste", this.handlePaste.bind(this)), s = this
            },
            destroy: function() {
                s = null, this.getEditorElements().forEach(function(t) {
                    for (var e = t.querySelectorAll(".medium-editor-url-preview"), i = 0; i < e.length; i++) {
                        var n = e[i];
                        n.className.indexOf("medium-editor-url-preview") > -1 && n.remove()
                    }
                }, this)
            },
            createPreview: function(t) {
                var e = this.document.createElement("div");
                return e.className = "medium-editor-url-preview", e.setAttribute("contenteditable", "false"), e.setAttribute("data-url", t.url), e.innerHTML = this.getPreviewHtml(t), e
            },
            handlePaste: function(t, i) {
                var n = "text/plain";
                if (t.clipboardData && t.clipboardData.getData && !t.defaultPrevented) {
                    var s = t.clipboardData.getData(n);
                    if (s && s.indexOf("iframe") > -1 && s.indexOf("youtube.com") > -1) {
                        t.preventDefault();
                        var o = this.base.getExtensionByName("paste");
                        return o.cleanPaste(e(s))
                    }
                }
            },
            handlePreview: function(e, s) {
                var o = this.base.options.ownerDocument.getSelection();
                if (o && o.baseNode) {
                    var a = o.baseNode.previousSibling;
                    if (a && a.querySelector) {
                        var r = a.querySelector('span[data-auto-link="true"]');
                        if (r && (r.parentNode || !r.parentNode.querySelector)) {
                            var l = a.querySelector(".medium-editor-url-preview");
                            if (r.textContent && !l && r.parentNode) {
                                var h = this;
                                h.base.events.disableCustomEvent("editableInput"), s.setAttribute("contenteditable", "false"), i(a, "medium-editor-loading"), h.getPreviewData(r.textContent, function(e, i) {
                                    if (n(a, "medium-editor-loading"), e) return h.base.events.enableCustomEvent("editableInput"), s.setAttribute("contenteditable", "true");
                                    var r = h.base.options.ownerDocument.createElement("p");
                                    r.innerHTML = "<br>", a.parentNode && (a.parentNode.insertBefore(r, a), a.parentNode.replaceChild(h.createPreview(i), a), s.setAttribute("contenteditable", "true"), t.selection.moveCursor(h.base.options.ownerDocument, o.baseNode)), h.base.events.enableCustomEvent("editableInput")
                                })
                            }
                        }
                    }
                }
            }
        });
    return o
}),
    function(t) {
        "function" == typeof define && define.amd ? define("jquery.ui.widget", ["jquery"], t) : t(jQuery)
    }(function(t) {
        var e = 0,
            i = Array.prototype.slice;
        t.cleanData = function(e) {
            return function(i) {
                var n, s, o;
                for (o = 0; null != (s = i[o]); o++) try {
                    n = t._data(s, "events"), n && n.remove && t(s).triggerHandler("remove")
                } catch (a) {}
                e(i)
            }
        }(t.cleanData), t.widget = function(e, i, n) {
            var s, o, a, r, l = {},
                h = e.split(".")[0];
            return e = e.split(".")[1], s = h + "-" + e, n || (n = i, i = t.Widget), t.expr[":"][s.toLowerCase()] = function(e) {
                return !!t.data(e, s)
            }, t[h] = t[h] || {}, o = t[h][e], a = t[h][e] = function(t, e) {
                return this._createWidget ? void(arguments.length && this._createWidget(t, e)) : new a(t, e)
            }, t.extend(a, o, {
                version: n.version,
                _proto: t.extend({}, n),
                _childConstructors: []
            }), r = new i, r.options = t.widget.extend({}, r.options), t.each(n, function(e, n) {
                return t.isFunction(n) ? void(l[e] = function() {
                    var t = function() {
                            return i.prototype[e].apply(this, arguments)
                        },
                        s = function(t) {
                            return i.prototype[e].apply(this, t)
                        };
                    return function() {
                        var e, i = this._super,
                            o = this._superApply;
                        return this._super = t, this._superApply = s, e = n.apply(this, arguments), this._super = i, this._superApply = o, e
                    }
                }()) : void(l[e] = n)
            }), a.prototype = t.widget.extend(r, {
                widgetEventPrefix: o ? r.widgetEventPrefix || e : e
            }, l, {
                constructor: a,
                namespace: h,
                widgetName: e,
                widgetFullName: s
            }), o ? (t.each(o._childConstructors, function(e, i) {
                var n = i.prototype;
                t.widget(n.namespace + "." + n.widgetName, a, i._proto)
            }), delete o._childConstructors) : i._childConstructors.push(a), t.widget.bridge(e, a), a
        }, t.widget.extend = function(e) {
            for (var n, s, o = i.call(arguments, 1), a = 0, r = o.length; r > a; a++)
                for (n in o[a]) s = o[a][n], o[a].hasOwnProperty(n) && void 0 !== s && (t.isPlainObject(s) ? e[n] = t.isPlainObject(e[n]) ? t.widget.extend({}, e[n], s) : t.widget.extend({}, s) : e[n] = s);
            return e
        }, t.widget.bridge = function(e, n) {
            var s = n.prototype.widgetFullName || e;
            t.fn[e] = function(o) {
                var a = "string" == typeof o,
                    r = i.call(arguments, 1),
                    l = this;
                return o = !a && r.length ? t.widget.extend.apply(null, [o].concat(r)) : o, a ? this.each(function() {
                    var i, n = t.data(this, s);
                    return "instance" === o ? (l = n, !1) : n ? t.isFunction(n[o]) && "_" !== o.charAt(0) ? (i = n[o].apply(n, r), i !== n && void 0 !== i ? (l = i && i.jquery ? l.pushStack(i.get()) : i, !1) : void 0) : t.error("no such method '" + o + "' for " + e + " widget instance") : t.error("cannot call methods on " + e + " prior to initialization; attempted to call method '" + o + "'")
                }) : this.each(function() {
                    var e = t.data(this, s);
                    e ? (e.option(o || {}), e._init && e._init()) : t.data(this, s, new n(o, this))
                }), l
            }
        }, t.Widget = function() {}, t.Widget._childConstructors = [], t.Widget.prototype = {
            widgetName: "widget",
            widgetEventPrefix: "",
            defaultElement: "<div>",
            options: {
                disabled: !1,
                create: null
            },
            _createWidget: function(i, n) {
                n = t(n || this.defaultElement || this)[0], this.element = t(n), this.uuid = e++, this.eventNamespace = "." + this.widgetName + this.uuid, this.options = t.widget.extend({}, this.options, this._getCreateOptions(), i), this.bindings = t(), this.hoverable = t(), this.focusable = t(), n !== this && (t.data(n, this.widgetFullName, this), this._on(!0, this.element, {
                    remove: function(t) {
                        t.target === n && this.destroy()
                    }
                }), this.document = t(n.style ? n.ownerDocument : n.document || n), this.window = t(this.document[0].defaultView || this.document[0].parentWindow)), this._create(), this._trigger("create", null, this._getCreateEventData()), this._init()
            },
            _getCreateOptions: t.noop,
            _getCreateEventData: t.noop,
            _create: t.noop,
            _init: t.noop,
            destroy: function() {
                this._destroy(), this.element.unbind(this.eventNamespace).removeData(this.widgetFullName).removeData(t.camelCase(this.widgetFullName)), this.widget().unbind(this.eventNamespace).removeAttr("aria-disabled").removeClass(this.widgetFullName + "-disabled ui-state-disabled"), this.bindings.unbind(this.eventNamespace), this.hoverable.removeClass("ui-state-hover"), this.focusable.removeClass("ui-state-focus")
            },
            _destroy: t.noop,
            widget: function() {
                return this.element
            },
            option: function(e, i) {
                var n, s, o, a = e;
                if (0 === arguments.length) return t.widget.extend({}, this.options);
                if ("string" == typeof e)
                    if (a = {}, n = e.split("."), e = n.shift(), n.length) {
                        for (s = a[e] = t.widget.extend({}, this.options[e]), o = 0; o < n.length - 1; o++) s[n[o]] = s[n[o]] || {}, s = s[n[o]];
                        if (e = n.pop(), 1 === arguments.length) return void 0 === s[e] ? null : s[e];
                        s[e] = i
                    } else {
                        if (1 === arguments.length) return void 0 === this.options[e] ? null : this.options[e];
                        a[e] = i
                    }
                return this._setOptions(a), this
            },
            _setOptions: function(t) {
                var e;
                for (e in t) this._setOption(e, t[e]);
                return this
            },
            _setOption: function(t, e) {
                return this.options[t] = e, "disabled" === t && (this.widget().toggleClass(this.widgetFullName + "-disabled", !!e), e && (this.hoverable.removeClass("ui-state-hover"), this.focusable.removeClass("ui-state-focus"))), this
            },
            enable: function() {
                return this._setOptions({
                    disabled: !1
                })
            },
            disable: function() {
                return this._setOptions({
                    disabled: !0
                })
            },
            _on: function(e, i, n) {
                var s, o = this;
                "boolean" != typeof e && (n = i, i = e, e = !1), n ? (i = s = t(i), this.bindings = this.bindings.add(i)) : (n = i, i = this.element, s = this.widget()), t.each(n, function(n, a) {
                    function r() {
                        return e || o.options.disabled !== !0 && !t(this).hasClass("ui-state-disabled") ? ("string" == typeof a ? o[a] : a).apply(o, arguments) : void 0
                    }
                    "string" != typeof a && (r.guid = a.guid = a.guid || r.guid || t.guid++);
                    var l = n.match(/^([\w:-]*)\s*(.*)$/),
                        h = l[1] + o.eventNamespace,
                        c = l[2];
                    c ? s.delegate(c, h, r) : i.bind(h, r)
                })
            },
            _off: function(t, e) {
                e = (e || "").split(" ").join(this.eventNamespace + " ") + this.eventNamespace, t.unbind(e).undelegate(e)
            },
            _delay: function(t, e) {
                function i() {
                    return ("string" == typeof t ? n[t] : t).apply(n, arguments)
                }
                var n = this;
                return setTimeout(i, e || 0)
            },
            _hoverable: function(e) {
                this.hoverable = this.hoverable.add(e), this._on(e, {
                    mouseenter: function(e) {
                        t(e.currentTarget).addClass("ui-state-hover")
                    },
                    mouseleave: function(e) {
                        t(e.currentTarget).removeClass("ui-state-hover")
                    }
                })
            },
            _focusable: function(e) {
                this.focusable = this.focusable.add(e), this._on(e, {
                    focusin: function(e) {
                        t(e.currentTarget).addClass("ui-state-focus")
                    },
                    focusout: function(e) {
                        t(e.currentTarget).removeClass("ui-state-focus")
                    }
                })
            },
            _trigger: function(e, i, n) {
                var s, o, a = this.options[e];
                if (n = n || {}, i = t.Event(i), i.type = (e === this.widgetEventPrefix ? e : this.widgetEventPrefix + e).toLowerCase(), i.target = this.element[0], o = i.originalEvent)
                    for (s in o) s in i || (i[s] = o[s]);
                return this.element.trigger(i, n), !(t.isFunction(a) && a.apply(this.element[0], [i].concat(n)) === !1 || i.isDefaultPrevented())
            }
        }, t.each({
            show: "fadeIn",
            hide: "fadeOut"
        }, function(e, i) {
            t.Widget.prototype["_" + e] = function(n, s, o) {
                "string" == typeof s && (s = {
                    effect: s
                });
                var a, r = s ? s === !0 || "number" == typeof s ? i : s.effect || i : e;
                s = s || {}, "number" == typeof s && (s = {
                    duration: s
                }), a = !t.isEmptyObject(s), s.complete = o, s.delay && n.delay(s.delay), a && t.effects && t.effects.effect[r] ? n[e](s) : r !== e && n[r] ? n[r](s.duration, s.easing, o) : n.queue(function(i) {
                    t(this)[e](), o && o.call(n[0]), i()
                })
            }
        });
        t.widget
    }),
    function(t) {
        "use strict";
        "function" == typeof define && define.amd ? define("jquery.iframe.transport", ["jquery"], t) : t(window.jQuery)
    }(function(t) {
        "use strict";
        var e = 0;
        t.ajaxTransport("iframe", function(i) {
            if (i.async) {
                var n, s, o, a = i.initialIframeSrc || "javascript:false;";
                return {
                    send: function(r, l) {
                        n = t('<form style="display:none;"></form>'), n.attr("accept-charset", i.formAcceptCharset), o = /\?/.test(i.url) ? "&" : "?", "DELETE" === i.type ? (i.url = i.url + o + "_method=DELETE", i.type = "POST") : "PUT" === i.type ? (i.url = i.url + o + "_method=PUT", i.type = "POST") : "PATCH" === i.type && (i.url = i.url + o + "_method=PATCH", i.type = "POST"), e += 1, s = t('<iframe src="' + a + '" name="iframe-transport-' + e + '"></iframe>').bind("load", function() {
                            var e, o = t.isArray(i.paramName) ? i.paramName : [i.paramName];
                            s.unbind("load").bind("load", function() {
                                var e;
                                try {
                                    if (e = s.contents(), !e.length || !e[0].firstChild) throw new Error
                                } catch (i) {
                                    e = void 0
                                }
                                l(200, "success", {
                                    iframe: e
                                }), t('<iframe src="' + a + '"></iframe>').appendTo(n), window.setTimeout(function() {
                                    n.remove()
                                }, 0)
                            }), n.prop("target", s.prop("name")).prop("action", i.url).prop("method", i.type), i.formData && t.each(i.formData, function(e, i) {
                                t('<input type="hidden"/>').prop("name", i.name).val(i.value).appendTo(n)
                            }), i.fileInput && i.fileInput.length && "POST" === i.type && (e = i.fileInput.clone(), i.fileInput.after(function(t) {
                                return e[t]
                            }), i.paramName && i.fileInput.each(function(e) {
                                t(this).prop("name", o[e] || i.paramName)
                            }), n.append(i.fileInput).prop("enctype", "multipart/form-data").prop("encoding", "multipart/form-data"), i.fileInput.removeAttr("form")), n.submit(), e && e.length && i.fileInput.each(function(i, n) {
                                var s = t(e[i]);
                                t(n).prop("name", s.prop("name")).attr("form", s.attr("form")), s.replaceWith(n)
                            })
                        }), n.append(s).appendTo(document.body)
                    },
                    abort: function() {
                        s && s.unbind("load").prop("src", a), n && n.remove()
                    }
                }
            }
        }), t.ajaxSetup({
            converters: {
                "iframe text": function(e) {
                    return e && t(e[0].body).text()
                },
                "iframe json": function(e) {
                    return e && t.parseJSON(t(e[0].body).text())
                },
                "iframe html": function(e) {
                    return e && t(e[0].body).html()
                },
                "iframe xml": function(e) {
                    var i = e && e[0];
                    return i && t.isXMLDoc(i) ? i : t.parseXML(i.XMLDocument && i.XMLDocument.xml || t(i.body).html())
                },
                "iframe script": function(e) {
                    return e && t.globalEval(t(e[0].body).text())
                }
            }
        })
    }),
    function(t) {
        "use strict";
        "function" == typeof define && define.amd ? define("jquery.fileupload", ["jquery", "jquery.ui.widget"], t) : t(window.jQuery)
    }(function(t) {
        "use strict";

        function e(e) {
            var i = "dragover" === e;
            return function(n) {
                n.dataTransfer = n.originalEvent && n.originalEvent.dataTransfer;
                var s = n.dataTransfer;
                s && -1 !== t.inArray("Files", s.types) && this._trigger(e, t.Event(e, {
                    delegatedEvent: n
                })) !== !1 && (n.preventDefault(), i && (s.dropEffect = "copy"))
            }
        }
        t.support.fileInput = !(new RegExp("(Android (1\\.[0156]|2\\.[01]))|(Windows Phone (OS 7|8\\.0))|(XBLWP)|(ZuneWP)|(WPDesktop)|(w(eb)?OSBrowser)|(webOS)|(Kindle/(1\\.0|2\\.[05]|3\\.0))").test(window.navigator.userAgent) || t('<input type="file">').prop("disabled")), t.support.xhrFileUpload = !(!window.ProgressEvent || !window.FileReader), t.support.xhrFormDataFileUpload = !!window.FormData, t.support.blobSlice = window.Blob && (Blob.prototype.slice || Blob.prototype.webkitSlice || Blob.prototype.mozSlice), t.widget("blueimp.fileupload", {
            options: {
                dropZone: t(document),
                pasteZone: void 0,
                fileInput: void 0,
                replaceFileInput: !0,
                paramName: void 0,
                singleFileUploads: !0,
                limitMultiFileUploads: void 0,
                limitMultiFileUploadSize: void 0,
                limitMultiFileUploadSizeOverhead: 512,
                sequentialUploads: !1,
                limitConcurrentUploads: void 0,
                forceIframeTransport: !1,
                redirect: void 0,
                redirectParamName: void 0,
                postMessage: void 0,
                multipart: !0,
                maxChunkSize: void 0,
                uploadedBytes: void 0,
                recalculateProgress: !0,
                progressInterval: 100,
                bitrateInterval: 500,
                autoUpload: !0,
                messages: {
                    uploadedBytes: "Uploaded bytes exceed file size"
                },
                i18n: function(e, i) {
                    return e = this.messages[e] || e.toString(), i && t.each(i, function(t, i) {
                        e = e.replace("{" + t + "}", i)
                    }), e
                },
                formData: function(t) {
                    return t.serializeArray()
                },
                add: function(e, i) {
                    return e.isDefaultPrevented() ? !1 : void((i.autoUpload || i.autoUpload !== !1 && t(this).fileupload("option", "autoUpload")) && i.process().done(function() {
                        i.submit()
                    }))
                },
                processData: !1,
                contentType: !1,
                cache: !1
            },
            _specialOptions: ["fileInput", "dropZone", "pasteZone", "multipart", "forceIframeTransport"],
            _blobSlice: t.support.blobSlice && function() {
                var t = this.slice || this.webkitSlice || this.mozSlice;
                return t.apply(this, arguments)
            },
            _BitrateTimer: function() {
                this.timestamp = Date.now ? Date.now() : (new Date).getTime(), this.loaded = 0, this.bitrate = 0, this.getBitrate = function(t, e, i) {
                    var n = t - this.timestamp;
                    return (!this.bitrate || !i || n > i) && (this.bitrate = (e - this.loaded) * (1e3 / n) * 8, this.loaded = e, this.timestamp = t), this.bitrate
                }
            },
            _isXHRUpload: function(e) {
                return !e.forceIframeTransport && (!e.multipart && t.support.xhrFileUpload || t.support.xhrFormDataFileUpload)
            },
            _getFormData: function(e) {
                var i;
                return "function" === t.type(e.formData) ? e.formData(e.form) : t.isArray(e.formData) ? e.formData : "object" === t.type(e.formData) ? (i = [], t.each(e.formData, function(t, e) {
                    i.push({
                        name: t,
                        value: e
                    })
                }), i) : []
            },
            _getTotal: function(e) {
                var i = 0;
                return t.each(e, function(t, e) {
                    i += e.size || 1
                }), i
            },
            _initProgressObject: function(e) {
                var i = {
                    loaded: 0,
                    total: 0,
                    bitrate: 0
                };
                e._progress ? t.extend(e._progress, i) : e._progress = i
            },
            _initResponseObject: function(t) {
                var e;
                if (t._response)
                    for (e in t._response) t._response.hasOwnProperty(e) && delete t._response[e];
                else t._response = {}
            },
            _onProgress: function(e, i) {
                if (e.lengthComputable) {
                    var n, s = Date.now ? Date.now() : (new Date).getTime();
                    if (i._time && i.progressInterval && s - i._time < i.progressInterval && e.loaded !== e.total) return;
                    i._time = s, n = Math.floor(e.loaded / e.total * (i.chunkSize || i._progress.total)) + (i.uploadedBytes || 0), this._progress.loaded += n - i._progress.loaded, this._progress.bitrate = this._bitrateTimer.getBitrate(s, this._progress.loaded, i.bitrateInterval), i._progress.loaded = i.loaded = n, i._progress.bitrate = i.bitrate = i._bitrateTimer.getBitrate(s, n, i.bitrateInterval), this._trigger("progress", t.Event("progress", {
                        delegatedEvent: e
                    }), i), this._trigger("progressall", t.Event("progressall", {
                        delegatedEvent: e
                    }), this._progress)
                }
            },
            _initProgressListener: function(e) {
                var i = this,
                    n = e.xhr ? e.xhr() : t.ajaxSettings.xhr();
                n.upload && (t(n.upload).bind("progress", function(t) {
                    var n = t.originalEvent;
                    t.lengthComputable = n.lengthComputable, t.loaded = n.loaded, t.total = n.total, i._onProgress(t, e)
                }), e.xhr = function() {
                    return n
                })
            },
            _isInstanceOf: function(t, e) {
                return Object.prototype.toString.call(e) === "[object " + t + "]"
            },
            _initXHRData: function(e) {
                var i, n = this,
                    s = e.files[0],
                    o = e.multipart || !t.support.xhrFileUpload,
                    a = "array" === t.type(e.paramName) ? e.paramName[0] : e.paramName;
                e.headers = t.extend({}, e.headers), e.contentRange && (e.headers["Content-Range"] = e.contentRange), o && !e.blob && this._isInstanceOf("File", s) || (e.headers["Content-Disposition"] = 'attachment; filename="' + encodeURI(s.name) + '"'), o ? t.support.xhrFormDataFileUpload && (e.postMessage ? (i = this._getFormData(e), e.blob ? i.push({
                    name: a,
                    value: e.blob
                }) : t.each(e.files, function(n, s) {
                    i.push({
                        name: "array" === t.type(e.paramName) && e.paramName[n] || a,
                        value: s
                    })
                })) : (n._isInstanceOf("FormData", e.formData) ? i = e.formData : (i = new FormData, t.each(this._getFormData(e), function(t, e) {
                    i.append(e.name, e.value)
                })), e.blob ? i.append(a, e.blob, s.name) : t.each(e.files, function(s, o) {
                    (n._isInstanceOf("File", o) || n._isInstanceOf("Blob", o)) && i.append("array" === t.type(e.paramName) && e.paramName[s] || a, o, o.uploadName || o.name)
                })), e.data = i) : (e.contentType = s.type || "application/octet-stream", e.data = e.blob || s), e.blob = null
            },
            _initIframeSettings: function(e) {
                var i = t("<a></a>").prop("href", e.url).prop("host");
                e.dataType = "iframe " + (e.dataType || ""), e.formData = this._getFormData(e), e.redirect && i && i !== location.host && e.formData.push({
                    name: e.redirectParamName || "redirect",
                    value: e.redirect
                })
            },
            _initDataSettings: function(t) {
                this._isXHRUpload(t) ? (this._chunkedUpload(t, !0) || (t.data || this._initXHRData(t), this._initProgressListener(t)), t.postMessage && (t.dataType = "postmessage " + (t.dataType || ""))) : this._initIframeSettings(t)
            },
            _getParamName: function(e) {
                var i = t(e.fileInput),
                    n = e.paramName;
                return n ? t.isArray(n) || (n = [n]) : (n = [], i.each(function() {
                    for (var e = t(this), i = e.prop("name") || "files[]", s = (e.prop("files") || [1]).length; s;) n.push(i), s -= 1
                }), n.length || (n = [i.prop("name") || "files[]"])), n
            },
            _initFormSettings: function(e) {
                e.form && e.form.length || (e.form = t(e.fileInput.prop("form")), e.form.length || (e.form = t(this.options.fileInput.prop("form")))), e.paramName = this._getParamName(e), e.url || (e.url = e.form.prop("action") || location.href), e.type = (e.type || "string" === t.type(e.form.prop("method")) && e.form.prop("method") || "").toUpperCase(), "POST" !== e.type && "PUT" !== e.type && "PATCH" !== e.type && (e.type = "POST"), e.formAcceptCharset || (e.formAcceptCharset = e.form.attr("accept-charset"))
            },
            _getAJAXSettings: function(e) {
                var i = t.extend({}, this.options, e);
                return this._initFormSettings(i), this._initDataSettings(i), i
            },
            _getDeferredState: function(t) {
                return t.state ? t.state() : t.isResolved() ? "resolved" : t.isRejected() ? "rejected" : "pending"
            },
            _enhancePromise: function(t) {
                return t.success = t.done, t.error = t.fail, t.complete = t.always, t
            },
            _getXHRPromise: function(e, i, n) {
                var s = t.Deferred(),
                    o = s.promise();
                return i = i || this.options.context || o, e === !0 ? s.resolveWith(i, n) : e === !1 && s.rejectWith(i, n), o.abort = s.promise, this._enhancePromise(o)
            },
            _addConvenienceMethods: function(e, i) {
                var n = this,
                    s = function(e) {
                        return t.Deferred().resolveWith(n, e).promise()
                    };
                i.process = function(e, o) {
                    return (e || o) && (i._processQueue = this._processQueue = (this._processQueue || s([this])).pipe(function() {
                        return i.errorThrown ? t.Deferred().rejectWith(n, [i]).promise() : s(arguments)
                    }).pipe(e, o)), this._processQueue || s([this])
                }, i.submit = function() {
                    return "pending" !== this.state() && (i.jqXHR = this.jqXHR = n._trigger("submit", t.Event("submit", {
                        delegatedEvent: e
                    }), this) !== !1 && n._onSend(e, this)), this.jqXHR || n._getXHRPromise()
                }, i.abort = function() {
                    return this.jqXHR ? this.jqXHR.abort() : (this.errorThrown = "abort", n._trigger("fail", null, this), n._getXHRPromise(!1))
                }, i.state = function() {
                    return this.jqXHR ? n._getDeferredState(this.jqXHR) : this._processQueue ? n._getDeferredState(this._processQueue) : void 0
                }, i.processing = function() {
                    return !this.jqXHR && this._processQueue && "pending" === n._getDeferredState(this._processQueue)
                }, i.progress = function() {
                    return this._progress
                }, i.response = function() {
                    return this._response
                }
            },
            _getUploadedBytes: function(t) {
                var e = t.getResponseHeader("Range"),
                    i = e && e.split("-"),
                    n = i && i.length > 1 && parseInt(i[1], 10);
                return n && n + 1
            },
            _chunkedUpload: function(e, i) {
                e.uploadedBytes = e.uploadedBytes || 0;
                var n, s, o = this,
                    a = e.files[0],
                    r = a.size,
                    l = e.uploadedBytes,
                    h = e.maxChunkSize || r,
                    c = this._blobSlice,
                    u = t.Deferred(),
                    d = u.promise();
                return this._isXHRUpload(e) && c && (l || r > h) && !e.data ? i ? !0 : l >= r ? (a.error = e.i18n("uploadedBytes"), this._getXHRPromise(!1, e.context, [null, "error", a.error])) : (s = function() {
                    var i = t.extend({}, e),
                        d = i._progress.loaded;
                    i.blob = c.call(a, l, l + h, a.type), i.chunkSize = i.blob.size, i.contentRange = "bytes " + l + "-" + (l + i.chunkSize - 1) + "/" + r, o._initXHRData(i), o._initProgressListener(i), n = (o._trigger("chunksend", null, i) !== !1 && t.ajax(i) || o._getXHRPromise(!1, i.context)).done(function(n, a, h) {
                        l = o._getUploadedBytes(h) || l + i.chunkSize, d + i.chunkSize - i._progress.loaded && o._onProgress(t.Event("progress", {
                            lengthComputable: !0,
                            loaded: l - i.uploadedBytes,
                            total: l - i.uploadedBytes
                        }), i), e.uploadedBytes = i.uploadedBytes = l, i.result = n, i.textStatus = a, i.jqXHR = h, o._trigger("chunkdone", null, i), o._trigger("chunkalways", null, i), r > l ? s() : u.resolveWith(i.context, [n, a, h])
                    }).fail(function(t, e, n) {
                        i.jqXHR = t, i.textStatus = e, i.errorThrown = n, o._trigger("chunkfail", null, i), o._trigger("chunkalways", null, i), u.rejectWith(i.context, [t, e, n])
                    })
                }, this._enhancePromise(d), d.abort = function() {
                    return n.abort()
                }, s(), d) : !1
            },
            _beforeSend: function(t, e) {
                0 === this._active && (this._trigger("start"), this._bitrateTimer = new this._BitrateTimer, this._progress.loaded = this._progress.total = 0, this._progress.bitrate = 0), this._initResponseObject(e), this._initProgressObject(e), e._progress.loaded = e.loaded = e.uploadedBytes || 0, e._progress.total = e.total = this._getTotal(e.files) || 1, e._progress.bitrate = e.bitrate = 0, this._active += 1, this._progress.loaded += e.loaded, this._progress.total += e.total
            },
            _onDone: function(e, i, n, s) {
                var o = s._progress.total,
                    a = s._response;
                s._progress.loaded < o && this._onProgress(t.Event("progress", {
                    lengthComputable: !0,
                    loaded: o,
                    total: o
                }), s), a.result = s.result = e, a.textStatus = s.textStatus = i, a.jqXHR = s.jqXHR = n, this._trigger("done", null, s)
            },
            _onFail: function(t, e, i, n) {
                var s = n._response;
                n.recalculateProgress && (this._progress.loaded -= n._progress.loaded, this._progress.total -= n._progress.total), s.jqXHR = n.jqXHR = t, s.textStatus = n.textStatus = e, s.errorThrown = n.errorThrown = i, this._trigger("fail", null, n)
            },
            _onAlways: function(t, e, i, n) {
                this._trigger("always", null, n)
            },
            _onSend: function(e, i) {
                i.submit || this._addConvenienceMethods(e, i);
                var n, s, o, a, r = this,
                    l = r._getAJAXSettings(i),
                    h = function() {
                        return r._sending += 1, l._bitrateTimer = new r._BitrateTimer, n = n || ((s || r._trigger("send", t.Event("send", {
                            delegatedEvent: e
                        }), l) === !1) && r._getXHRPromise(!1, l.context, s) || r._chunkedUpload(l) || t.ajax(l)).done(function(t, e, i) {
                            r._onDone(t, e, i, l)
                        }).fail(function(t, e, i) {
                            r._onFail(t, e, i, l)
                        }).always(function(t, e, i) {
                            if (r._onAlways(t, e, i, l), r._sending -= 1, r._active -= 1, l.limitConcurrentUploads && l.limitConcurrentUploads > r._sending)
                                for (var n = r._slots.shift(); n;) {
                                    if ("pending" === r._getDeferredState(n)) {
                                        n.resolve();
                                        break
                                    }
                                    n = r._slots.shift()
                                }
                            0 === r._active && r._trigger("stop")
                        })
                    };
                return this._beforeSend(e, l), this.options.sequentialUploads || this.options.limitConcurrentUploads && this.options.limitConcurrentUploads <= this._sending ? (this.options.limitConcurrentUploads > 1 ? (o = t.Deferred(), this._slots.push(o), a = o.pipe(h)) : (this._sequence = this._sequence.pipe(h, h), a = this._sequence), a.abort = function() {
                    return s = [void 0, "abort", "abort"], n ? n.abort() : (o && o.rejectWith(l.context, s), h())
                }, this._enhancePromise(a)) : h()
            },
            _onAdd: function(e, i) {
                var n, s, o, a, r = this,
                    l = !0,
                    h = t.extend({}, this.options, i),
                    c = i.files,
                    u = c.length,
                    d = h.limitMultiFileUploads,
                    p = h.limitMultiFileUploadSize,
                    f = h.limitMultiFileUploadSizeOverhead,
                    m = 0,
                    g = this._getParamName(h),
                    v = 0;
                if (!p || u && void 0 !== c[0].size || (p = void 0), (h.singleFileUploads || d || p) && this._isXHRUpload(h))
                    if (h.singleFileUploads || p || !d)
                        if (!h.singleFileUploads && p)
                            for (o = [], n = [], a = 0; u > a; a += 1) m += c[a].size + f, (a + 1 === u || m + c[a + 1].size + f > p || d && a + 1 - v >= d) && (o.push(c.slice(v, a + 1)), s = g.slice(v, a + 1), s.length || (s = g), n.push(s), v = a + 1, m = 0);
                        else n = g;
                    else
                        for (o = [], n = [], a = 0; u > a; a += d) o.push(c.slice(a, a + d)), s = g.slice(a, a + d), s.length || (s = g), n.push(s);
                else o = [c], n = [g];
                return i.originalFiles = c, t.each(o || c, function(s, a) {
                    var h = t.extend({}, i);
                    return h.files = o ? a : [a], h.paramName = n[s], r._initResponseObject(h), r._initProgressObject(h), r._addConvenienceMethods(e, h), l = r._trigger("add", t.Event("add", {
                        delegatedEvent: e
                    }), h)
                }), l
            },
            _replaceFileInput: function(e) {
                var i = e.fileInput,
                    n = i.clone(!0);
                e.fileInputClone = n, t("<form></form>").append(n)[0].reset(), i.after(n).detach(), t.cleanData(i.unbind("remove")), this.options.fileInput = this.options.fileInput.map(function(t, e) {
                    return e === i[0] ? n[0] : e
                }), i[0] === this.element[0] && (this.element = n)
            },
            _handleFileTreeEntry: function(e, i) {
                var n, s = this,
                    o = t.Deferred(),
                    a = function(t) {
                        t && !t.entry && (t.entry = e), o.resolve([t])
                    },
                    r = function(t) {
                        s._handleFileTreeEntries(t, i + e.name + "/").done(function(t) {
                            o.resolve(t)
                        }).fail(a)
                    },
                    l = function() {
                        n.readEntries(function(t) {
                            t.length ? (h = h.concat(t), l()) : r(h)
                        }, a)
                    },
                    h = [];
                return i = i || "", e.isFile ? e._file ? (e._file.relativePath = i, o.resolve(e._file)) : e.file(function(t) {
                    t.relativePath = i, o.resolve(t)
                }, a) : e.isDirectory ? (n = e.createReader(), l()) : o.resolve([]), o.promise()
            },
            _handleFileTreeEntries: function(e, i) {
                var n = this;
                return t.when.apply(t, t.map(e, function(t) {
                    return n._handleFileTreeEntry(t, i)
                })).pipe(function() {
                    return Array.prototype.concat.apply([], arguments)
                })
            },
            _getDroppedFiles: function(e) {
                e = e || {};
                var i = e.items;
                return i && i.length && (i[0].webkitGetAsEntry || i[0].getAsEntry) ? this._handleFileTreeEntries(t.map(i, function(t) {
                    var e;
                    return t.webkitGetAsEntry ? (e = t.webkitGetAsEntry(), e && (e._file = t.getAsFile()), e) : t.getAsEntry()
                })) : t.Deferred().resolve(t.makeArray(e.files)).promise()
            },
            _getSingleFileInputFiles: function(e) {
                e = t(e);
                var i, n, s = e.prop("webkitEntries") || e.prop("entries");
                if (s && s.length) return this._handleFileTreeEntries(s);
                if (i = t.makeArray(e.prop("files")), i.length) void 0 === i[0].name && i[0].fileName && t.each(i, function(t, e) {
                    e.name = e.fileName, e.size = e.fileSize
                });
                else {
                    if (n = e.prop("value"), !n) return t.Deferred().resolve([]).promise();
                    i = [{
                        name: n.replace(/^.*\\/, "")
                    }]
                }
                return t.Deferred().resolve(i).promise()
            },
            _getFileInputFiles: function(e) {
                return e instanceof t && 1 !== e.length ? t.when.apply(t, t.map(e, this._getSingleFileInputFiles)).pipe(function() {
                    return Array.prototype.concat.apply([], arguments)
                }) : this._getSingleFileInputFiles(e)
            },
            _onChange: function(e) {
                var i = this,
                    n = {
                        fileInput: t(e.target),
                        form: t(e.target.form)
                    };
                this._getFileInputFiles(n.fileInput).always(function(s) {
                    n.files = s, i.options.replaceFileInput && i._replaceFileInput(n), i._trigger("change", t.Event("change", {
                        delegatedEvent: e
                    }), n) !== !1 && i._onAdd(e, n)
                })
            },
            _onPaste: function(e) {
                var i = e.originalEvent && e.originalEvent.clipboardData && e.originalEvent.clipboardData.items,
                    n = {
                        files: []
                    };
                i && i.length && (t.each(i, function(t, e) {
                    var i = e.getAsFile && e.getAsFile();
                    i && n.files.push(i)
                }), this._trigger("paste", t.Event("paste", {
                    delegatedEvent: e
                }), n) !== !1 && this._onAdd(e, n))
            },
            _onDrop: function(e) {
                e.dataTransfer = e.originalEvent && e.originalEvent.dataTransfer;
                var i = this,
                    n = e.dataTransfer,
                    s = {};
                n && n.files && n.files.length && (e.preventDefault(), this._getDroppedFiles(n).always(function(n) {
                    s.files = n, i._trigger("drop", t.Event("drop", {
                        delegatedEvent: e
                    }), s) !== !1 && i._onAdd(e, s)
                }))
            },
            _onDragOver: e("dragover"),
            _onDragEnter: e("dragenter"),
            _onDragLeave: e("dragleave"),
            _initEventHandlers: function() {
                this._isXHRUpload(this.options) && (this._on(this.options.dropZone, {
                    dragover: this._onDragOver,
                    drop: this._onDrop,
                    dragenter: this._onDragEnter,
                    dragleave: this._onDragLeave
                }), this._on(this.options.pasteZone, {
                    paste: this._onPaste
                })), t.support.fileInput && this._on(this.options.fileInput, {
                    change: this._onChange
                })
            },
            _destroyEventHandlers: function() {
                this._off(this.options.dropZone, "dragenter dragleave dragover drop"), this._off(this.options.pasteZone, "paste"), this._off(this.options.fileInput, "change")
            },
            _setOption: function(e, i) {
                var n = -1 !== t.inArray(e, this._specialOptions);
                n && this._destroyEventHandlers(), this._super(e, i), n && (this._initSpecialOptions(), this._initEventHandlers())
            },
            _initSpecialOptions: function() {
                var e = this.options;
                void 0 === e.fileInput ? e.fileInput = this.element.is('input[type="file"]') ? this.element : this.element.find('input[type="file"]') : e.fileInput instanceof t || (e.fileInput = t(e.fileInput)), e.dropZone instanceof t || (e.dropZone = t(e.dropZone)), e.pasteZone instanceof t || (e.pasteZone = t(e.pasteZone))
            },
            _getRegExp: function(t) {
                var e = t.split("/"),
                    i = e.pop();
                return e.shift(), new RegExp(e.join("/"), i)
            },
            _isRegExpOption: function(e, i) {
                return "url" !== e && "string" === t.type(i) && /^\/.*\/[igm]{0,3}$/.test(i)
            },
            _initDataAttributes: function() {
                var e = this,
                    i = this.options,
                    n = t(this.element[0].cloneNode(!1));
                t.each(n.data(), function(t, s) {
                    var o = "data-" + t.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase();
                    n.attr(o) && (e._isRegExpOption(t, s) && (s = e._getRegExp(s)), i[t] = s)
                })
            },
            _create: function() {
                this._initDataAttributes(), this._initSpecialOptions(), this._slots = [], this._sequence = this._getXHRPromise(!0), this._sending = this._active = 0, this._initProgressObject(this), this._initEventHandlers()
            },
            active: function() {
                return this._active
            },
            progress: function() {
                return this._progress
            },
            add: function(e) {
                var i = this;
                e && !this.options.disabled && (e.fileInput && !e.files ? this._getFileInputFiles(e.fileInput).always(function(t) {
                    e.files = t, i._onAdd(null, e)
                }) : (e.files = t.makeArray(e.files), this._onAdd(null, e)))
            },
            send: function(e) {
                if (e && !this.options.disabled) {
                    if (e.fileInput && !e.files) {
                        var i, n, s = this,
                            o = t.Deferred(),
                            a = o.promise();
                        return a.abort = function() {
                            return n = !0, i ? i.abort() : (o.reject(null, "abort", "abort"), a)
                        }, this._getFileInputFiles(e.fileInput).always(function(t) {
                            if (!n) {
                                if (!t.length) return void o.reject();
                                e.files = t, i = s._onSend(null, e), i.then(function(t, e, i) {
                                    o.resolve(t, e, i)
                                }, function(t, e, i) {
                                    o.reject(t, e, i)
                                })
                            }
                        }), this._enhancePromise(a)
                    }
                    if (e.files = t.makeArray(e.files), e.files.length) return this._onSend(null, e)
                }
                return this._getXHRPromise(!1, e && e.context)
            }
        })
    }), define("controller/note/partial/EditorController", ["jquery", "wishbeen/common", "service/imageService", "service/previewService", "medium-editor", "wishbeen/medium-editor-url-preview", "jquery.fileupload", "model/preview/Preview", "view/preview/PreviewView"], function(t, e, i, n, s, o, a, r, l) {
    function h(t) {
        t && t.noteModel && (this.noteModel = t.noteModel), t && t.view && (this.view = t.view)
    }

    function c(e) {
        e && 0 !== e.length && ("html" === e[0].type && "" === t(e[0].data).text() && e.splice(0, 1), e.length > 0 && "html" === e[e.length - 1].type && "" === t(e[e.length - 1].data).text() && e.splice(e.length - 1, 1))
    }
    var u = 10,
        d = 1e4;
    return h.prototype.init = function(e) {
        var i = this;
        this.tmpIndex = 0, this.view.draw(e), this.editor = new s(".editable", {
            imageDragging: !1,
            anchorPreview: !1,
            autoLink: !0,
            targetBlank: !0,
            toolbar: {
                buttons: ["bold", "anchor"]
            },
            anchor: {
                placeholderText: "Type a link",
                linkValidation: !0
            },
            paste: {
                forcePlainText: !0,
                cleanPastedHTML: !1,
                cleanReplacements: [
                    [new RegExp(/&lt;\s*iframe(?:(?!src).)+src=(?:&quot;|&rdquo;|&ldquo;|"|“|”)(((?!&quot;|&rdquo;|&ldquo;|"|“|”).)*)(?:&quot;|&rdquo;|&ldquo;|"|“|”)(?:(?!&gt;).)*&gt;/gi), "$1"],
                    [new RegExp(/&lt;\s*(\/?)iframe(.*)&gt;/gi), ""]
                ],
                cleanAttrs: ["class", "style", "dir", "onclick"],
                cleanTags: ["meta", "script", "img", "iframe", "embed", "html", "span"]
            },
            extensions: {
                "url-preview": new o({
                    getPreviewHtml: function(t) {
                        var e = new r(t),
                            n = new l({
                                model: e
                            });
                        return i.addPreviewData(t.url, e), n.getPreviewHtml(!1)
                    },
                    getPreviewData: function(t, e) {
                        i.view.showImageLoading(), n.getPreview(t, function(t, n) {
                            i.view.hideImageLoading(), e(t, n)
                        })
                    }
                })
            }
        }), this.editor.subscribe("editableKeyup", function(e, n) {
            if (13 === e.keyCode || 38 === e.keyCode || 40 === e.keyCode) {
                var s = t(window.getSelection().getRangeAt(0).commonAncestorContainer);
                i.view.clearFocusedElement(), s[0].tagName ? s.addClass("focused-element") : s.parents("p").addClass("focused-element")
            }
            t(n).hasClass("medium-editor-placeholder") && t(n).removeClass("medium-editor-placeholder")
        }), t("#editor_panel").click(function(e) {
            var n = t(e.target);
            i.view.clearFocusedElement(), "P" !== n[0].tagName ? n.parents("p").addClass("focused-element") : n.addClass("focused-element")
        }), this.imgObjMap = i.makeImgObjMap(this.noteModel.getContent()), this.previewList = i.makePreviewList(this.noteModel.getContent()), i.bindHandlers()
    }, h.prototype.bindHandlers = function() {
        var n = this;
        this.view.bindHandlers({
            disableImageDrag: function() {},
            clickPhotoButton: function() {
                t("#note-img-upload").fileupload({
                    dataType: "json",
                    singleFileUploads: !1,
                    add: function(t, e) {
                        var i = /(\.|\/)(jpe?g|png|bmp|gif)$/i;
                        for (var s in e.files)
                            if (!i.test(e.files[s].name)) return alert(g_localizedString._EditorImageTypeError_), n.changeToEditMode(), !1;
                        n.view.showImageLoading(), e.submit()
                    },
                    fail: function(t, e) {
                        return 413 === e.jqXHR.status ? alert(g_localizedString._fileSizeIsToBigErr_) : alert(g_localizedString._validator_internalError_), n.changeToEditMode(), !1
                    },
                    done: function(t, s) {
                        var o, a;
                        if (a = e.getResultData(s.result), !a) return alert(e.getResultErrMsg(s.result)), void n.changeToEditMode();
                        for (var r = 0; r < a.length; r++) o = "editor-image-" + n.tmpIndex, n.view.addEditorImage(o, i.getImageUrl({
                            image: a[r]
                        })), n.addContentImage(o, a[r]), n.tmpIndex++;
                        n.view.checkAndActivePhotoButton(), n.changeToEditMode()
                    }
                })
            },
            clickDeleteImage: function(t) {
                n.view.checkAndActivePhotoButton(), delete n.imgObjMap[t]
            }
        })
    }, h.prototype.changeToEditMode = function() {
        this.view.hideImageLoading(), this.bindHandlers()
    }, h.prototype.makeImgObjMap = function(t) {
        var e, i, n = {};
        if (!t || 0 === t.length) return n;
        for (e = 0; e < t.length; e++) "image" === t[e].type && (i = "editor-image-" + this.tmpIndex, n[i] = t[e].data, this.view.setEditorImageId(this.tmpIndex), this.tmpIndex++);
        return n
    }, h.prototype.addContentImage = function(t, e) {
        this.imgObjMap[t] = e
    }, h.prototype.makePreviewList = function(t) {
        var e, i = [];
        if (!t || 0 === t.length) return i;
        for (e = 0; e < t.length; e++) "preview" === t[e].type && i.push(t[e].data);
        return i
    }, h.prototype.getPreviewData = function(t) {
        for (var e = 0; e < this.previewList.length; e++)
            if (this.previewList[e] && this.previewList[e].url === t) return this.previewList[e]
    }, h.prototype.addPreviewData = function(t, e) {
        for (var i = 0; i < this.previewList.length; i++)
            if (this.previewList[i] && this.previewList[i].url === t) return void(this.previewList[i] = e);
        this.previewList.push(e)
    }, h.prototype.makeContentArray = function() {
        var e, i, n, s, o, a = [];
        for (this.view.sanitizeEditor(), i = this.view.getEditorData(), n = "", e = 0; e < i.length; e++) {
            if (o = t(i[e]), o.hasClass("medium-insert-images")) "" !== n && (a.push(this.makeContentObj("html", n)), n = ""), s = o.attr("id"), s && a.push(this.makeContentObj("image", s));
            else if (o.hasClass("medium-editor-url-preview")) {
                "" !== n && (a.push(this.makeContentObj("html", n)), n = "");
                var r = o.data("url");
                a.push(this.makeContentObj("preview", r))
            } else o.find("a.editor-img-cnl").remove(), n += t("<div>").append(o.clone()).html();
            e === i.length - 1 && "" !== n && a.push(this.makeContentObj("html", n))
        }
        return a
    }, h.prototype.makeContentObj = function(t, e) {
        var i = {};
        switch (i.type = t, t) {
            case "html":
                i.data = e;
                break;
            case "image":
                i.data = this.imgObjMap[e];
                break;
            case "preview":
                i.data = this.getPreviewData(e)
        }
        return i
    }, h.prototype.validateContent = function() {
        var t = this.view.getEditorImages().length,
            e = this.view.getEditorTextLength();
        return t > u ? (alert(g_localizedString._EditorMaxImageError_), !1) : e > d ? (alert(g_localizedString._EditorMaxTextError_), !1) : !0
    }, h.prototype.getContent = function() {
        var t = [];
        if (1 === this.view.getEditorData().length) {
            var e = this.view.getEditorLastElement().text().replace(/\s/g, "") ? !0 : !1;
            e && (t = this.makeContentArray())
        } else t = this.makeContentArray();
        return c(t), t
    }, h.prototype.destroy = function() {
        this.editor.destroy(), delete this.editor
    }, h
}), define("view/note/partial/NoteLocationView", ["jquery"], function(t) {
    function e(t) {
        t && t.noteModel && (this.noteModel = t.noteModel)
    }
    return e.prototype.getHtml = function() {
        var t = '<div id="auto_search_spot_wrap" class="loca-wrap"><input id="note-location-search" type="text" name="" placeholder="' + g_localizedString._UGSpot_ + '"/><a class="btn-delete btn-location-delete"><img src="/images/btn-note-delete.png" alt=""/></a></div>';
        return t
    }, e.prototype.draw = function(e) {
        e.parentId ? (this.parentId = e.parentId, this.parentElement = t("#" + this.parentId)) : e.parentElement && (this.parentElement = e.parentElement), this.wroteAtSpot = e.wroteAtSpot, this.fixedLocationString = e.fixedLocationString;
        var i = this.getHtml();
        this.element = t(i), this.parentElement.append(this.element), this.parentElement.removeClass("hide"), this.wroteAtSpot && this.wroteAtSpot.name ? (this.getLocationSearchInput().val(this.wroteAtSpot.name), this.setLocationReadOnly(), this.hideLocationDelete()) : this.fixedLocationString && (this.getLocationSearchInput().val(this.fixedLocationString), this.setLocationReadOnly(), this.hideLocationDelete())
    }, e.prototype.bindHandlers = function(e) {
        var i = this;
        e.clickLocationDelete && this.element.find(".btn-location-delete").click(function() {
            i.element.remove(), t("#" + i.parentId).addClass("hide"), t("#note-location-button").removeClass("active"), e.clickLocationDelete()
        }), e.blurSpotInput && this.element.find("#note-location-search").blur(function() {
            e.blurSpotInput()
        })
    }, e.prototype.triggerLocationDelete = function() {
        this.element.find(".btn-location-delete").trigger("click")
    }, e.prototype.setLocationReadOnly = function() {
        this.getLocationSearchInput().attr("readonly", !0)
    }, e.prototype.hideLocationDelete = function() {
        this.element.find(".btn-location-delete").addClass("hide")
    }, e.prototype.getLocationSearchInput = function() {
        return this.element.find("#note-location-search")
    }, e.prototype.setLocationSearchInput = function(t) {
        this.element.find("#note-location-search").val(t)
    }, e
}),
    function(t) {
        "function" == typeof define && define.amd ? define("jquery.ui", ["jquery"], t) : t(jQuery)
    }(function(t) {
        function e(e, n) {
            var s, o, a, r = e.nodeName.toLowerCase();
            return "area" === r ? (s = e.parentNode, o = s.name, e.href && o && "map" === s.nodeName.toLowerCase() ? (a = t("img[usemap='#" + o + "']")[0], !!a && i(a)) : !1) : (/input|select|textarea|button|object/.test(r) ? !e.disabled : "a" === r ? e.href || n : n) && i(e)
        }

        function i(e) {
            return t.expr.filters.visible(e) && !t(e).parents().addBack().filter(function() {
                return "hidden" === t.css(this, "visibility")
            }).length
        }

        function n(t) {
            for (var e, i; t.length && t[0] !== document;) {
                if (e = t.css("position"), ("absolute" === e || "relative" === e || "fixed" === e) && (i = parseInt(t.css("zIndex"), 10), !isNaN(i) && 0 !== i)) return i;
                t = t.parent()
            }
            return 0
        }

        function s() {
            this._curInst = null, this._keyEvent = !1, this._disabledInputs = [], this._datepickerShowing = !1, this._inDialog = !1, this._mainDivId = "ui-datepicker-div", this._inlineClass = "ui-datepicker-inline", this._appendClass = "ui-datepicker-append", this._triggerClass = "ui-datepicker-trigger", this._dialogClass = "ui-datepicker-dialog", this._disableClass = "ui-datepicker-disabled", this._unselectableClass = "ui-datepicker-unselectable", this._currentClass = "ui-datepicker-current-day", this._dayOverClass = "ui-datepicker-days-cell-over", this.regional = [], this.regional[""] = {
                closeText: "Done",
                prevText: "Prev",
                nextText: "Next",
                currentText: "Today",
                monthNames: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
                monthNamesShort: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
                dayNames: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
                dayNamesShort: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
                dayNamesMin: ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"],
                weekHeader: "Wk",
                dateFormat: "mm/dd/yy",
                firstDay: 0,
                isRTL: !1,
                showMonthAfterYear: !1,
                yearSuffix: ""
            }, this._defaults = {
                showOn: "focus",
                showAnim: "fadeIn",
                showOptions: {},
                defaultDate: null,
                appendText: "",
                buttonText: "...",
                buttonImage: "",
                buttonImageOnly: !1,
                hideIfNoPrevNext: !1,
                navigationAsDateFormat: !1,
                gotoCurrent: !1,
                changeMonth: !1,
                changeYear: !1,
                yearRange: "c-10:c+10",
                showOtherMonths: !1,
                selectOtherMonths: !1,
                showWeek: !1,
                calculateWeek: this.iso8601Week,
                shortYearCutoff: "+10",
                minDate: null,
                maxDate: null,
                duration: "fast",
                beforeShowDay: null,
                beforeShow: null,
                onSelect: null,
                onChangeMonthYear: null,
                onClose: null,
                numberOfMonths: 1,
                showCurrentAtPos: 0,
                stepMonths: 1,
                stepBigMonths: 12,
                altField: "",
                altFormat: "",
                constrainInput: !0,
                showButtonPanel: !1,
                autoSize: !1,
                disabled: !1
            }, t.extend(this._defaults, this.regional[""]), this.regional.en = t.extend(!0, {}, this.regional[""]), this.regional["en-US"] = t.extend(!0, {}, this.regional.en), this.dpDiv = o(t("<div id='" + this._mainDivId + "' class='ui-datepicker ui-widget ui-widget-content ui-helper-clearfix ui-corner-all'></div>"))
        }

        function o(e) {
            var i = "button, .ui-datepicker-prev, .ui-datepicker-next, .ui-datepicker-calendar td a";
            return e.delegate(i, "mouseout", function() {
                t(this).removeClass("ui-state-hover"), -1 !== this.className.indexOf("ui-datepicker-prev") && t(this).removeClass("ui-datepicker-prev-hover"), -1 !== this.className.indexOf("ui-datepicker-next") && t(this).removeClass("ui-datepicker-next-hover")
            }).delegate(i, "mouseover", a)
        }

        function a() {
            t.datepicker._isDisabledDatepicker(v.inline ? v.dpDiv.parent()[0] : v.input[0]) || (t(this).parents(".ui-datepicker-calendar").find("a").removeClass("ui-state-hover"), t(this).addClass("ui-state-hover"), -1 !== this.className.indexOf("ui-datepicker-prev") && t(this).addClass("ui-datepicker-prev-hover"), -1 !== this.className.indexOf("ui-datepicker-next") && t(this).addClass("ui-datepicker-next-hover"))
        }

        function r(e, i) {
            t.extend(e, i);
            for (var n in i) null == i[n] && (e[n] = i[n]);
            return e
        }

        function l(t) {
            return function() {
                var e = this.element.val();
                t.apply(this, arguments), this._refresh(), e !== this.element.val() && this._trigger("change")
            }
        }
        t.ui = t.ui || {}, t.extend(t.ui, {
            version: "1.11.2",
            keyCode: {
                BACKSPACE: 8,
                COMMA: 188,
                DELETE: 46,
                DOWN: 40,
                END: 35,
                ENTER: 13,
                ESCAPE: 27,
                HOME: 36,
                LEFT: 37,
                PAGE_DOWN: 34,
                PAGE_UP: 33,
                PERIOD: 190,
                RIGHT: 39,
                SPACE: 32,
                TAB: 9,
                UP: 38
            }
        }), t.fn.extend({
            scrollParent: function(e) {
                var i = this.css("position"),
                    n = "absolute" === i,
                    s = e ? /(auto|scroll|hidden)/ : /(auto|scroll)/,
                    o = this.parents().filter(function() {
                        var e = t(this);
                        return n && "static" === e.css("position") ? !1 : s.test(e.css("overflow") + e.css("overflow-y") + e.css("overflow-x"))
                    }).eq(0);
                return "fixed" !== i && o.length ? o : t(this[0].ownerDocument || document)
            },
            uniqueId: function() {
                var t = 0;
                return function() {
                    return this.each(function() {
                        this.id || (this.id = "ui-id-" + ++t)
                    })
                }
            }(),
            removeUniqueId: function() {
                return this.each(function() {
                    /^ui-id-\d+$/.test(this.id) && t(this).removeAttr("id")
                })
            }
        }), t.extend(t.expr[":"], {
            data: t.expr.createPseudo ? t.expr.createPseudo(function(e) {
                return function(i) {
                    return !!t.data(i, e)
                }
            }) : function(e, i, n) {
                return !!t.data(e, n[3])
            },
            focusable: function(i) {
                return e(i, !isNaN(t.attr(i, "tabindex")))
            },
            tabbable: function(i) {
                var n = t.attr(i, "tabindex"),
                    s = isNaN(n);
                return (s || n >= 0) && e(i, !s)
            }
        }), t("<a>").outerWidth(1).jquery || t.each(["Width", "Height"], function(e, i) {
            function n(e, i, n, o) {
                return t.each(s, function() {
                    i -= parseFloat(t.css(e, "padding" + this)) || 0, n && (i -= parseFloat(t.css(e, "border" + this + "Width")) || 0), o && (i -= parseFloat(t.css(e, "margin" + this)) || 0)
                }), i
            }
            var s = "Width" === i ? ["Left", "Right"] : ["Top", "Bottom"],
                o = i.toLowerCase(),
                a = {
                    innerWidth: t.fn.innerWidth,
                    innerHeight: t.fn.innerHeight,
                    outerWidth: t.fn.outerWidth,
                    outerHeight: t.fn.outerHeight
                };
            t.fn["inner" + i] = function(e) {
                return void 0 === e ? a["inner" + i].call(this) : this.each(function() {
                    t(this).css(o, n(this, e) + "px")
                })
            }, t.fn["outer" + i] = function(e, s) {
                return "number" != typeof e ? a["outer" + i].call(this, e) : this.each(function() {
                    t(this).css(o, n(this, e, !0, s) + "px")
                })
            }
        }), t.fn.addBack || (t.fn.addBack = function(t) {
            return this.add(null == t ? this.prevObject : this.prevObject.filter(t))
        }), t("<a>").data("a-b", "a").removeData("a-b").data("a-b") && (t.fn.removeData = function(e) {
            return function(i) {
                return arguments.length ? e.call(this, t.camelCase(i)) : e.call(this)
            }
        }(t.fn.removeData)), t.ui.ie = !!/msie [\w.]+/.exec(navigator.userAgent.toLowerCase()), t.fn.extend({
            focus: function(e) {
                return function(i, n) {
                    return "number" == typeof i ? this.each(function() {
                        var e = this;
                        setTimeout(function() {
                            t(e).focus(), n && n.call(e)
                        }, i)
                    }) : e.apply(this, arguments)
                }
            }(t.fn.focus),
            disableSelection: function() {
                var t = "onselectstart" in document.createElement("div") ? "selectstart" : "mousedown";
                return function() {
                    return this.bind(t + ".ui-disableSelection", function(t) {
                        t.preventDefault()
                    })
                }
            }(),
            enableSelection: function() {
                return this.unbind(".ui-disableSelection")
            },
            zIndex: function(e) {
                if (void 0 !== e) return this.css("zIndex", e);
                if (this.length)
                    for (var i, n, s = t(this[0]); s.length && s[0] !== document;) {
                        if (i = s.css("position"), ("absolute" === i || "relative" === i || "fixed" === i) && (n = parseInt(s.css("zIndex"), 10), !isNaN(n) && 0 !== n)) return n;
                        s = s.parent()
                    }
                return 0
            }
        }), t.ui.plugin = {
            add: function(e, i, n) {
                var s, o = t.ui[e].prototype;
                for (s in n) o.plugins[s] = o.plugins[s] || [], o.plugins[s].push([i, n[s]])
            },
            call: function(t, e, i, n) {
                var s, o = t.plugins[e];
                if (o && (n || t.element[0].parentNode && 11 !== t.element[0].parentNode.nodeType))
                    for (s = 0; s < o.length; s++) t.options[o[s][0]] && o[s][1].apply(t.element, i)
            }
        };
        var h = 0,
            c = Array.prototype.slice;
        t.cleanData = function(e) {
            return function(i) {
                var n, s, o;
                for (o = 0; null != (s = i[o]); o++) try {
                    n = t._data(s, "events"), n && n.remove && t(s).triggerHandler("remove")
                } catch (a) {}
                e(i)
            }
        }(t.cleanData), t.widget = function(e, i, n) {
            var s, o, a, r, l = {},
                h = e.split(".")[0];
            return e = e.split(".")[1], s = h + "-" + e, n || (n = i, i = t.Widget), t.expr[":"][s.toLowerCase()] = function(e) {
                return !!t.data(e, s)
            }, t[h] = t[h] || {}, o = t[h][e], a = t[h][e] = function(t, e) {
                return this._createWidget ? void(arguments.length && this._createWidget(t, e)) : new a(t, e)
            }, t.extend(a, o, {
                version: n.version,
                _proto: t.extend({}, n),
                _childConstructors: []
            }), r = new i, r.options = t.widget.extend({}, r.options), t.each(n, function(e, n) {
                return t.isFunction(n) ? void(l[e] = function() {
                    var t = function() {
                            return i.prototype[e].apply(this, arguments)
                        },
                        s = function(t) {
                            return i.prototype[e].apply(this, t)
                        };
                    return function() {
                        var e, i = this._super,
                            o = this._superApply;
                        return this._super = t, this._superApply = s, e = n.apply(this, arguments), this._super = i, this._superApply = o, e
                    }
                }()) : void(l[e] = n)
            }), a.prototype = t.widget.extend(r, {
                widgetEventPrefix: o ? r.widgetEventPrefix || e : e
            }, l, {
                constructor: a,
                namespace: h,
                widgetName: e,
                widgetFullName: s
            }), o ? (t.each(o._childConstructors, function(e, i) {
                var n = i.prototype;
                t.widget(n.namespace + "." + n.widgetName, a, i._proto)
            }), delete o._childConstructors) : i._childConstructors.push(a), t.widget.bridge(e, a), a
        }, t.widget.extend = function(e) {
            for (var i, n, s = c.call(arguments, 1), o = 0, a = s.length; a > o; o++)
                for (i in s[o]) n = s[o][i], s[o].hasOwnProperty(i) && void 0 !== n && (t.isPlainObject(n) ? e[i] = t.isPlainObject(e[i]) ? t.widget.extend({}, e[i], n) : t.widget.extend({}, n) : e[i] = n);
            return e
        }, t.widget.bridge = function(e, i) {
            var n = i.prototype.widgetFullName || e;
            t.fn[e] = function(s) {
                var o = "string" == typeof s,
                    a = c.call(arguments, 1),
                    r = this;
                return s = !o && a.length ? t.widget.extend.apply(null, [s].concat(a)) : s, o ? this.each(function() {
                    var i, o = t.data(this, n);
                    return "instance" === s ? (r = o, !1) : o ? t.isFunction(o[s]) && "_" !== s.charAt(0) ? (i = o[s].apply(o, a), i !== o && void 0 !== i ? (r = i && i.jquery ? r.pushStack(i.get()) : i, !1) : void 0) : t.error("no such method '" + s + "' for " + e + " widget instance") : t.error("cannot call methods on " + e + " prior to initialization; attempted to call method '" + s + "'")
                }) : this.each(function() {
                    var e = t.data(this, n);
                    e ? (e.option(s || {}), e._init && e._init()) : t.data(this, n, new i(s, this))
                }), r
            }
        }, t.Widget = function() {}, t.Widget._childConstructors = [], t.Widget.prototype = {
            widgetName: "widget",
            widgetEventPrefix: "",
            defaultElement: "<div>",
            options: {
                disabled: !1,
                create: null
            },
            _createWidget: function(e, i) {
                i = t(i || this.defaultElement || this)[0], this.element = t(i), this.uuid = h++, this.eventNamespace = "." + this.widgetName + this.uuid, this.bindings = t(), this.hoverable = t(), this.focusable = t(), i !== this && (t.data(i, this.widgetFullName, this), this._on(!0, this.element, {
                    remove: function(t) {
                        t.target === i && this.destroy()
                    }
                }), this.document = t(i.style ? i.ownerDocument : i.document || i), this.window = t(this.document[0].defaultView || this.document[0].parentWindow)), this.options = t.widget.extend({}, this.options, this._getCreateOptions(), e), this._create(), this._trigger("create", null, this._getCreateEventData()), this._init()
            },
            _getCreateOptions: t.noop,
            _getCreateEventData: t.noop,
            _create: t.noop,
            _init: t.noop,
            destroy: function() {
                this._destroy(), this.element.unbind(this.eventNamespace).removeData(this.widgetFullName).removeData(t.camelCase(this.widgetFullName)), this.widget().unbind(this.eventNamespace).removeAttr("aria-disabled").removeClass(this.widgetFullName + "-disabled ui-state-disabled"), this.bindings.unbind(this.eventNamespace), this.hoverable.removeClass("ui-state-hover"), this.focusable.removeClass("ui-state-focus")
            },
            _destroy: t.noop,
            widget: function() {
                return this.element
            },
            option: function(e, i) {
                var n, s, o, a = e;
                if (0 === arguments.length) return t.widget.extend({}, this.options);
                if ("string" == typeof e)
                    if (a = {}, n = e.split("."), e = n.shift(), n.length) {
                        for (s = a[e] = t.widget.extend({}, this.options[e]), o = 0; o < n.length - 1; o++) s[n[o]] = s[n[o]] || {}, s = s[n[o]];
                        if (e = n.pop(), 1 === arguments.length) return void 0 === s[e] ? null : s[e];
                        s[e] = i
                    } else {
                        if (1 === arguments.length) return void 0 === this.options[e] ? null : this.options[e];
                        a[e] = i
                    }
                return this._setOptions(a), this
            },
            _setOptions: function(t) {
                var e;
                for (e in t) this._setOption(e, t[e]);
                return this
            },
            _setOption: function(t, e) {
                return this.options[t] = e, "disabled" === t && (this.widget().toggleClass(this.widgetFullName + "-disabled", !!e), e && (this.hoverable.removeClass("ui-state-hover"), this.focusable.removeClass("ui-state-focus"))), this
            },
            enable: function() {
                return this._setOptions({
                    disabled: !1
                })
            },
            disable: function() {
                return this._setOptions({
                    disabled: !0
                })
            },
            _on: function(e, i, n) {
                var s, o = this;
                "boolean" != typeof e && (n = i, i = e, e = !1), n ? (i = s = t(i), this.bindings = this.bindings.add(i)) : (n = i, i = this.element, s = this.widget()), t.each(n, function(n, a) {
                    function r() {
                        return e || o.options.disabled !== !0 && !t(this).hasClass("ui-state-disabled") ? ("string" == typeof a ? o[a] : a).apply(o, arguments) : void 0
                    }
                    "string" != typeof a && (r.guid = a.guid = a.guid || r.guid || t.guid++);
                    var l = n.match(/^([\w:-]*)\s*(.*)$/),
                        h = l[1] + o.eventNamespace,
                        c = l[2];
                    c ? s.delegate(c, h, r) : i.bind(h, r)
                })
            },
            _off: function(e, i) {
                i = (i || "").split(" ").join(this.eventNamespace + " ") + this.eventNamespace, e.unbind(i).undelegate(i), this.bindings = t(this.bindings.not(e).get()), this.focusable = t(this.focusable.not(e).get()), this.hoverable = t(this.hoverable.not(e).get())
            },
            _delay: function(t, e) {
                function i() {
                    return ("string" == typeof t ? n[t] : t).apply(n, arguments)
                }
                var n = this;
                return setTimeout(i, e || 0)
            },
            _hoverable: function(e) {
                this.hoverable = this.hoverable.add(e), this._on(e, {
                    mouseenter: function(e) {
                        t(e.currentTarget).addClass("ui-state-hover")
                    },
                    mouseleave: function(e) {
                        t(e.currentTarget).removeClass("ui-state-hover")
                    }
                })
            },
            _focusable: function(e) {
                this.focusable = this.focusable.add(e), this._on(e, {
                    focusin: function(e) {
                        t(e.currentTarget).addClass("ui-state-focus")
                    },
                    focusout: function(e) {
                        t(e.currentTarget).removeClass("ui-state-focus")
                    }
                })
            },
            _trigger: function(e, i, n) {
                var s, o, a = this.options[e];
                if (n = n || {}, i = t.Event(i), i.type = (e === this.widgetEventPrefix ? e : this.widgetEventPrefix + e).toLowerCase(), i.target = this.element[0], o = i.originalEvent)
                    for (s in o) s in i || (i[s] = o[s]);
                return this.element.trigger(i, n), !(t.isFunction(a) && a.apply(this.element[0], [i].concat(n)) === !1 || i.isDefaultPrevented())
            }
        }, t.each({
            show: "fadeIn",
            hide: "fadeOut"
        }, function(e, i) {
            t.Widget.prototype["_" + e] = function(n, s, o) {
                "string" == typeof s && (s = {
                    effect: s
                });
                var a, r = s ? s === !0 || "number" == typeof s ? i : s.effect || i : e;
                s = s || {}, "number" == typeof s && (s = {
                    duration: s
                }), a = !t.isEmptyObject(s), s.complete = o, s.delay && n.delay(s.delay), a && t.effects && t.effects.effect[r] ? n[e](s) : r !== e && n[r] ? n[r](s.duration, s.easing, o) : n.queue(function(i) {
                    t(this)[e](), o && o.call(n[0]), i()
                })
            }
        });
        var u = (t.widget, !1);
        t(document).mouseup(function() {
            u = !1
        });
        t.widget("ui.mouse", {
            version: "1.11.2",
            options: {
                cancel: "input,textarea,button,select,option",
                distance: 1,
                delay: 0
            },
            _mouseInit: function() {
                var e = this;
                this.element.bind("mousedown." + this.widgetName, function(t) {
                    return e._mouseDown(t)
                }).bind("click." + this.widgetName, function(i) {
                    return !0 === t.data(i.target, e.widgetName + ".preventClickEvent") ? (t.removeData(i.target, e.widgetName + ".preventClickEvent"), i.stopImmediatePropagation(), !1) : void 0
                }), this.started = !1
            },
            _mouseDestroy: function() {
                this.element.unbind("." + this.widgetName), this._mouseMoveDelegate && this.document.unbind("mousemove." + this.widgetName, this._mouseMoveDelegate).unbind("mouseup." + this.widgetName, this._mouseUpDelegate)
            },
            _mouseDown: function(e) {
                if (!u) {
                    this._mouseMoved = !1, this._mouseStarted && this._mouseUp(e), this._mouseDownEvent = e;
                    var i = this,
                        n = 1 === e.which,
                        s = "string" == typeof this.options.cancel && e.target.nodeName ? t(e.target).closest(this.options.cancel).length : !1;
                    return n && !s && this._mouseCapture(e) ? (this.mouseDelayMet = !this.options.delay, this.mouseDelayMet || (this._mouseDelayTimer = setTimeout(function() {
                        i.mouseDelayMet = !0
                    }, this.options.delay)), this._mouseDistanceMet(e) && this._mouseDelayMet(e) && (this._mouseStarted = this._mouseStart(e) !== !1, !this._mouseStarted) ? (e.preventDefault(), !0) : (!0 === t.data(e.target, this.widgetName + ".preventClickEvent") && t.removeData(e.target, this.widgetName + ".preventClickEvent"), this._mouseMoveDelegate = function(t) {
                        return i._mouseMove(t)
                    }, this._mouseUpDelegate = function(t) {
                        return i._mouseUp(t)
                    }, this.document.bind("mousemove." + this.widgetName, this._mouseMoveDelegate).bind("mouseup." + this.widgetName, this._mouseUpDelegate), e.preventDefault(), u = !0, !0)) : !0
                }
            },
            _mouseMove: function(e) {
                if (this._mouseMoved) {
                    if (t.ui.ie && (!document.documentMode || document.documentMode < 9) && !e.button) return this._mouseUp(e);
                    if (!e.which) return this._mouseUp(e)
                }
                return (e.which || e.button) && (this._mouseMoved = !0), this._mouseStarted ? (this._mouseDrag(e), e.preventDefault()) : (this._mouseDistanceMet(e) && this._mouseDelayMet(e) && (this._mouseStarted = this._mouseStart(this._mouseDownEvent, e) !== !1, this._mouseStarted ? this._mouseDrag(e) : this._mouseUp(e)), !this._mouseStarted)
            },
            _mouseUp: function(e) {
                return this.document.unbind("mousemove." + this.widgetName, this._mouseMoveDelegate).unbind("mouseup." + this.widgetName, this._mouseUpDelegate), this._mouseStarted && (this._mouseStarted = !1, e.target === this._mouseDownEvent.target && t.data(e.target, this.widgetName + ".preventClickEvent", !0), this._mouseStop(e)), u = !1, !1
            },
            _mouseDistanceMet: function(t) {
                return Math.max(Math.abs(this._mouseDownEvent.pageX - t.pageX), Math.abs(this._mouseDownEvent.pageY - t.pageY)) >= this.options.distance
            },
            _mouseDelayMet: function() {
                return this.mouseDelayMet
            },
            _mouseStart: function() {},
            _mouseDrag: function() {},
            _mouseStop: function() {},
            _mouseCapture: function() {
                return !0
            }
        });
        ! function() {
            function e(t, e, i) {
                return [parseFloat(t[0]) * (p.test(t[0]) ? e / 100 : 1), parseFloat(t[1]) * (p.test(t[1]) ? i / 100 : 1)]
            }

            function i(e, i) {
                return parseInt(t.css(e, i), 10) || 0
            }

            function n(e) {
                var i = e[0];
                return 9 === i.nodeType ? {
                    width: e.width(),
                    height: e.height(),
                    offset: {
                        top: 0,
                        left: 0
                    }
                } : t.isWindow(i) ? {
                    width: e.width(),
                    height: e.height(),
                    offset: {
                        top: e.scrollTop(),
                        left: e.scrollLeft()
                    }
                } : i.preventDefault ? {
                    width: 0,
                    height: 0,
                    offset: {
                        top: i.pageY,
                        left: i.pageX
                    }
                } : {
                    width: e.outerWidth(),
                    height: e.outerHeight(),
                    offset: e.offset()
                }
            }
            t.ui = t.ui || {};
            var s, o, a = Math.max,
                r = Math.abs,
                l = Math.round,
                h = /left|center|right/,
                c = /top|center|bottom/,
                u = /[\+\-]\d+(\.[\d]+)?%?/,
                d = /^\w+/,
                p = /%$/,
                f = t.fn.position;
            t.position = {
                scrollbarWidth: function() {
                    if (void 0 !== s) return s;
                    var e, i, n = t("<div style='display:block;position:absolute;width:50px;height:50px;overflow:hidden;'><div style='height:100px;width:auto;'></div></div>"),
                        o = n.children()[0];
                    return t("body").append(n), e = o.offsetWidth, n.css("overflow", "scroll"), i = o.offsetWidth, e === i && (i = n[0].clientWidth), n.remove(), s = e - i
                },
                getScrollInfo: function(e) {
                    var i = e.isWindow || e.isDocument ? "" : e.element.css("overflow-x"),
                        n = e.isWindow || e.isDocument ? "" : e.element.css("overflow-y"),
                        s = "scroll" === i || "auto" === i && e.width < e.element[0].scrollWidth,
                        o = "scroll" === n || "auto" === n && e.height < e.element[0].scrollHeight;
                    return {
                        width: o ? t.position.scrollbarWidth() : 0,
                        height: s ? t.position.scrollbarWidth() : 0
                    }
                },
                getWithinInfo: function(e) {
                    var i = t(e || window),
                        n = t.isWindow(i[0]),
                        s = !!i[0] && 9 === i[0].nodeType;
                    return {
                        element: i,
                        isWindow: n,
                        isDocument: s,
                        offset: i.offset() || {
                            left: 0,
                            top: 0
                        },
                        scrollLeft: i.scrollLeft(),
                        scrollTop: i.scrollTop(),
                        width: n || s ? i.width() : i.outerWidth(),
                        height: n || s ? i.height() : i.outerHeight()
                    }
                }
            }, t.fn.position = function(s) {
                if (!s || !s.of) return f.apply(this, arguments);
                s = t.extend({}, s);
                var p, m, g, v, b, y, _ = t(s.of),
                    w = t.position.getWithinInfo(s.within),
                    k = t.position.getScrollInfo(w),
                    C = (s.collision || "flip").split(" "),
                    x = {};
                return y = n(_), _[0].preventDefault && (s.at = "left top"), m = y.width, g = y.height, v = y.offset, b = t.extend({}, v), t.each(["my", "at"], function() {
                    var t, e, i = (s[this] || "").split(" ");
                    1 === i.length && (i = h.test(i[0]) ? i.concat(["center"]) : c.test(i[0]) ? ["center"].concat(i) : ["center", "center"]), i[0] = h.test(i[0]) ? i[0] : "center", i[1] = c.test(i[1]) ? i[1] : "center", t = u.exec(i[0]), e = u.exec(i[1]), x[this] = [t ? t[0] : 0, e ? e[0] : 0], s[this] = [d.exec(i[0])[0], d.exec(i[1])[0]]
                }), 1 === C.length && (C[1] = C[0]), "right" === s.at[0] ? b.left += m : "center" === s.at[0] && (b.left += m / 2), "bottom" === s.at[1] ? b.top += g : "center" === s.at[1] && (b.top += g / 2), p = e(x.at, m, g), b.left += p[0], b.top += p[1], this.each(function() {
                    var n, h, c = t(this),
                        u = c.outerWidth(),
                        d = c.outerHeight(),
                        f = i(this, "marginLeft"),
                        y = i(this, "marginTop"),
                        E = u + f + i(this, "marginRight") + k.width,
                        T = d + y + i(this, "marginBottom") + k.height,
                        S = t.extend({}, b),
                        D = e(x.my, c.outerWidth(), c.outerHeight());
                    "right" === s.my[0] ? S.left -= u : "center" === s.my[0] && (S.left -= u / 2), "bottom" === s.my[1] ? S.top -= d : "center" === s.my[1] && (S.top -= d / 2), S.left += D[0], S.top += D[1], o || (S.left = l(S.left), S.top = l(S.top)), n = {
                        marginLeft: f,
                        marginTop: y
                    }, t.each(["left", "top"], function(e, i) {
                        t.ui.position[C[e]] && t.ui.position[C[e]][i](S, {
                            targetWidth: m,
                            targetHeight: g,
                            elemWidth: u,
                            elemHeight: d,
                            collisionPosition: n,
                            collisionWidth: E,
                            collisionHeight: T,
                            offset: [p[0] + D[0], p[1] + D[1]],
                            my: s.my,
                            at: s.at,
                            within: w,
                            elem: c
                        })
                    }), s.using && (h = function(t) {
                        var e = v.left - S.left,
                            i = e + m - u,
                            n = v.top - S.top,
                            o = n + g - d,
                            l = {
                                target: {
                                    element: _,
                                    left: v.left,
                                    top: v.top,
                                    width: m,
                                    height: g
                                },
                                element: {
                                    element: c,
                                    left: S.left,
                                    top: S.top,
                                    width: u,
                                    height: d
                                },
                                horizontal: 0 > i ? "left" : e > 0 ? "right" : "center",
                                vertical: 0 > o ? "top" : n > 0 ? "bottom" : "middle"
                            };
                        u > m && r(e + i) < m && (l.horizontal = "center"), d > g && r(n + o) < g && (l.vertical = "middle"), a(r(e), r(i)) > a(r(n), r(o)) ? l.important = "horizontal" : l.important = "vertical", s.using.call(this, t, l)
                    }), c.offset(t.extend(S, {
                        using: h
                    }))
                })
            }, t.ui.position = {
                fit: {
                    left: function(t, e) {
                        var i, n = e.within,
                            s = n.isWindow ? n.scrollLeft : n.offset.left,
                            o = n.width,
                            r = t.left - e.collisionPosition.marginLeft,
                            l = s - r,
                            h = r + e.collisionWidth - o - s;
                        e.collisionWidth > o ? l > 0 && 0 >= h ? (i = t.left + l + e.collisionWidth - o - s, t.left += l - i) : h > 0 && 0 >= l ? t.left = s : l > h ? t.left = s + o - e.collisionWidth : t.left = s : l > 0 ? t.left += l : h > 0 ? t.left -= h : t.left = a(t.left - r, t.left)
                    },
                    top: function(t, e) {
                        var i, n = e.within,
                            s = n.isWindow ? n.scrollTop : n.offset.top,
                            o = e.within.height,
                            r = t.top - e.collisionPosition.marginTop,
                            l = s - r,
                            h = r + e.collisionHeight - o - s;
                        e.collisionHeight > o ? l > 0 && 0 >= h ? (i = t.top + l + e.collisionHeight - o - s, t.top += l - i) : h > 0 && 0 >= l ? t.top = s : l > h ? t.top = s + o - e.collisionHeight : t.top = s : l > 0 ? t.top += l : h > 0 ? t.top -= h : t.top = a(t.top - r, t.top)
                    }
                },
                flip: {
                    left: function(t, e) {
                        var i, n, s = e.within,
                            o = s.offset.left + s.scrollLeft,
                            a = s.width,
                            l = s.isWindow ? s.scrollLeft : s.offset.left,
                            h = t.left - e.collisionPosition.marginLeft,
                            c = h - l,
                            u = h + e.collisionWidth - a - l,
                            d = "left" === e.my[0] ? -e.elemWidth : "right" === e.my[0] ? e.elemWidth : 0,
                            p = "left" === e.at[0] ? e.targetWidth : "right" === e.at[0] ? -e.targetWidth : 0,
                            f = -2 * e.offset[0];
                        0 > c ? (i = t.left + d + p + f + e.collisionWidth - a - o, (0 > i || i < r(c)) && (t.left += d + p + f)) : u > 0 && (n = t.left - e.collisionPosition.marginLeft + d + p + f - l, (n > 0 || r(n) < u) && (t.left += d + p + f))
                    },
                    top: function(t, e) {
                        var i, n, s = e.within,
                            o = s.offset.top + s.scrollTop,
                            a = s.height,
                            l = s.isWindow ? s.scrollTop : s.offset.top,
                            h = t.top - e.collisionPosition.marginTop,
                            c = h - l,
                            u = h + e.collisionHeight - a - l,
                            d = "top" === e.my[1],
                            p = d ? -e.elemHeight : "bottom" === e.my[1] ? e.elemHeight : 0,
                            f = "top" === e.at[1] ? e.targetHeight : "bottom" === e.at[1] ? -e.targetHeight : 0,
                            m = -2 * e.offset[1];
                        0 > c ? (n = t.top + p + f + m + e.collisionHeight - a - o, t.top + p + f + m > c && (0 > n || n < r(c)) && (t.top += p + f + m)) : u > 0 && (i = t.top - e.collisionPosition.marginTop + p + f + m - l, t.top + p + f + m > u && (i > 0 || r(i) < u) && (t.top += p + f + m))
                    }
                },
                flipfit: {
                    left: function() {
                        t.ui.position.flip.left.apply(this, arguments), t.ui.position.fit.left.apply(this, arguments)
                    },
                    top: function() {
                        t.ui.position.flip.top.apply(this, arguments), t.ui.position.fit.top.apply(this, arguments)
                    }
                }
            },
                function() {
                    var e, i, n, s, a, r = document.getElementsByTagName("body")[0],
                        l = document.createElement("div");
                    e = document.createElement(r ? "div" : "body"), n = {
                        visibility: "hidden",
                        width: 0,
                        height: 0,
                        border: 0,
                        margin: 0,
                        background: "none"
                    }, r && t.extend(n, {
                        position: "absolute",
                        left: "-1000px",
                        top: "-1000px"
                    });
                    for (a in n) e.style[a] = n[a];
                    e.appendChild(l), i = r || document.documentElement, i.insertBefore(e, i.firstChild), l.style.cssText = "position: absolute; left: 10.7432222px;", s = t(l).offset().left, o = s > 10 && 11 > s, e.innerHTML = "", i.removeChild(e)
                }()
        }();
        t.ui.position;
        t.widget("ui.draggable", t.ui.mouse, {
            version: "1.11.2",
            widgetEventPrefix: "drag",
            options: {
                addClasses: !0,
                appendTo: "parent",
                axis: !1,
                connectToSortable: !1,
                containment: !1,
                cursor: "auto",
                cursorAt: !1,
                grid: !1,
                handle: !1,
                helper: "original",
                iframeFix: !1,
                opacity: !1,
                refreshPositions: !1,
                revert: !1,
                revertDuration: 500,
                scope: "default",
                scroll: !0,
                scrollSensitivity: 20,
                scrollSpeed: 20,
                snap: !1,
                snapMode: "both",
                snapTolerance: 20,
                stack: !1,
                zIndex: !1,
                drag: null,
                start: null,
                stop: null
            },
            _create: function() {
                "original" === this.options.helper && this._setPositionRelative(), this.options.addClasses && this.element.addClass("ui-draggable"), this.options.disabled && this.element.addClass("ui-draggable-disabled"), this._setHandleClassName(), this._mouseInit()
            },
            _setOption: function(t, e) {
                this._super(t, e), "handle" === t && (this._removeHandleClassName(), this._setHandleClassName())
            },
            _destroy: function() {
                return (this.helper || this.element).is(".ui-draggable-dragging") ? void(this.destroyOnClear = !0) : (this.element.removeClass("ui-draggable ui-draggable-dragging ui-draggable-disabled"), this._removeHandleClassName(), void this._mouseDestroy())
            },
            _mouseCapture: function(e) {
                var i = this.options;
                return this._blurActiveElement(e), this.helper || i.disabled || t(e.target).closest(".ui-resizable-handle").length > 0 ? !1 : (this.handle = this._getHandle(e), this.handle ? (this._blockFrames(i.iframeFix === !0 ? "iframe" : i.iframeFix), !0) : !1)
            },
            _blockFrames: function(e) {
                this.iframeBlocks = this.document.find(e).map(function() {
                    var e = t(this);
                    return t("<div>").css("position", "absolute").appendTo(e.parent()).outerWidth(e.outerWidth()).outerHeight(e.outerHeight()).offset(e.offset())[0]
                })
            },
            _unblockFrames: function() {
                this.iframeBlocks && (this.iframeBlocks.remove(), delete this.iframeBlocks)
            },
            _blurActiveElement: function(e) {
                var i = this.document[0];
                if (this.handleElement.is(e.target)) try {
                    i.activeElement && "body" !== i.activeElement.nodeName.toLowerCase() && t(i.activeElement).blur()
                } catch (n) {}
            },
            _mouseStart: function(e) {
                var i = this.options;
                return this.helper = this._createHelper(e), this.helper.addClass("ui-draggable-dragging"), this._cacheHelperProportions(), t.ui.ddmanager && (t.ui.ddmanager.current = this), this._cacheMargins(), this.cssPosition = this.helper.css("position"), this.scrollParent = this.helper.scrollParent(!0), this.offsetParent = this.helper.offsetParent(), this.hasFixedAncestor = this.helper.parents().filter(function() {
                    return "fixed" === t(this).css("position")
                }).length > 0, this.positionAbs = this.element.offset(), this._refreshOffsets(e), this.originalPosition = this.position = this._generatePosition(e, !1), this.originalPageX = e.pageX, this.originalPageY = e.pageY, i.cursorAt && this._adjustOffsetFromHelper(i.cursorAt), this._setContainment(), this._trigger("start", e) === !1 ? (this._clear(), !1) : (this._cacheHelperProportions(), t.ui.ddmanager && !i.dropBehaviour && t.ui.ddmanager.prepareOffsets(this, e), this._normalizeRightBottom(), this._mouseDrag(e, !0), t.ui.ddmanager && t.ui.ddmanager.dragStart(this, e), !0)
            },
            _refreshOffsets: function(t) {
                this.offset = {
                    top: this.positionAbs.top - this.margins.top,
                    left: this.positionAbs.left - this.margins.left,
                    scroll: !1,
                    parent: this._getParentOffset(),
                    relative: this._getRelativeOffset()
                }, this.offset.click = {
                    left: t.pageX - this.offset.left,
                    top: t.pageY - this.offset.top
                }
            },
            _mouseDrag: function(e, i) {
                if (this.hasFixedAncestor && (this.offset.parent = this._getParentOffset()), this.position = this._generatePosition(e, !0), this.positionAbs = this._convertPositionTo("absolute"), !i) {
                    var n = this._uiHash();
                    if (this._trigger("drag", e, n) === !1) return this._mouseUp({}), !1;
                    this.position = n.position
                }
                return this.helper[0].style.left = this.position.left + "px", this.helper[0].style.top = this.position.top + "px", t.ui.ddmanager && t.ui.ddmanager.drag(this, e), !1
            },
            _mouseStop: function(e) {
                var i = this,
                    n = !1;
                return t.ui.ddmanager && !this.options.dropBehaviour && (n = t.ui.ddmanager.drop(this, e)), this.dropped && (n = this.dropped, this.dropped = !1), "invalid" === this.options.revert && !n || "valid" === this.options.revert && n || this.options.revert === !0 || t.isFunction(this.options.revert) && this.options.revert.call(this.element, n) ? t(this.helper).animate(this.originalPosition, parseInt(this.options.revertDuration, 10), function() {
                    i._trigger("stop", e) !== !1 && i._clear()
                }) : this._trigger("stop", e) !== !1 && this._clear(), !1
            },
            _mouseUp: function(e) {
                return this._unblockFrames(), t.ui.ddmanager && t.ui.ddmanager.dragStop(this, e), this.handleElement.is(e.target) && this.element.focus(), t.ui.mouse.prototype._mouseUp.call(this, e)
            },
            cancel: function() {
                return this.helper.is(".ui-draggable-dragging") ? this._mouseUp({}) : this._clear(), this
            },
            _getHandle: function(e) {
                return this.options.handle ? !!t(e.target).closest(this.element.find(this.options.handle)).length : !0
            },
            _setHandleClassName: function() {
                this.handleElement = this.options.handle ? this.element.find(this.options.handle) : this.element, this.handleElement.addClass("ui-draggable-handle")
            },
            _removeHandleClassName: function() {
                this.handleElement.removeClass("ui-draggable-handle")
            },
            _createHelper: function(e) {
                var i = this.options,
                    n = t.isFunction(i.helper),
                    s = n ? t(i.helper.apply(this.element[0], [e])) : "clone" === i.helper ? this.element.clone().removeAttr("id") : this.element;
                return s.parents("body").length || s.appendTo("parent" === i.appendTo ? this.element[0].parentNode : i.appendTo), n && s[0] === this.element[0] && this._setPositionRelative(), s[0] === this.element[0] || /(fixed|absolute)/.test(s.css("position")) || s.css("position", "absolute"), s
            },
            _setPositionRelative: function() {
                /^(?:r|a|f)/.test(this.element.css("position")) || (this.element[0].style.position = "relative")
            },
            _adjustOffsetFromHelper: function(e) {
                "string" == typeof e && (e = e.split(" ")), t.isArray(e) && (e = {
                    left: +e[0],
                    top: +e[1] || 0
                }), "left" in e && (this.offset.click.left = e.left + this.margins.left), "right" in e && (this.offset.click.left = this.helperProportions.width - e.right + this.margins.left), "top" in e && (this.offset.click.top = e.top + this.margins.top), "bottom" in e && (this.offset.click.top = this.helperProportions.height - e.bottom + this.margins.top)
            },
            _isRootNode: function(t) {
                return /(html|body)/i.test(t.tagName) || t === this.document[0]
            },
            _getParentOffset: function() {
                var e = this.offsetParent.offset(),
                    i = this.document[0];
                return "absolute" === this.cssPosition && this.scrollParent[0] !== i && t.contains(this.scrollParent[0], this.offsetParent[0]) && (e.left += this.scrollParent.scrollLeft(), e.top += this.scrollParent.scrollTop()), this._isRootNode(this.offsetParent[0]) && (e = {
                    top: 0,
                    left: 0
                }), {
                    top: e.top + (parseInt(this.offsetParent.css("borderTopWidth"), 10) || 0),
                    left: e.left + (parseInt(this.offsetParent.css("borderLeftWidth"), 10) || 0)
                }
            },
            _getRelativeOffset: function() {
                if ("relative" !== this.cssPosition) return {
                    top: 0,
                    left: 0
                };
                var t = this.element.position(),
                    e = this._isRootNode(this.scrollParent[0]);
                return {
                    top: t.top - (parseInt(this.helper.css("top"), 10) || 0) + (e ? 0 : this.scrollParent.scrollTop()),
                    left: t.left - (parseInt(this.helper.css("left"), 10) || 0) + (e ? 0 : this.scrollParent.scrollLeft())
                }
            },
            _cacheMargins: function() {
                this.margins = {
                    left: parseInt(this.element.css("marginLeft"), 10) || 0,
                    top: parseInt(this.element.css("marginTop"), 10) || 0,
                    right: parseInt(this.element.css("marginRight"), 10) || 0,
                    bottom: parseInt(this.element.css("marginBottom"), 10) || 0
                }
            },
            _cacheHelperProportions: function() {
                this.helperProportions = {
                    width: this.helper.outerWidth(),
                    height: this.helper.outerHeight()
                }
            },
            _setContainment: function() {
                var e, i, n, s = this.options,
                    o = this.document[0];
                return this.relativeContainer = null, s.containment ? "window" === s.containment ? void(this.containment = [t(window).scrollLeft() - this.offset.relative.left - this.offset.parent.left, t(window).scrollTop() - this.offset.relative.top - this.offset.parent.top, t(window).scrollLeft() + t(window).width() - this.helperProportions.width - this.margins.left, t(window).scrollTop() + (t(window).height() || o.body.parentNode.scrollHeight) - this.helperProportions.height - this.margins.top]) : "document" === s.containment ? void(this.containment = [0, 0, t(o).width() - this.helperProportions.width - this.margins.left, (t(o).height() || o.body.parentNode.scrollHeight) - this.helperProportions.height - this.margins.top]) : s.containment.constructor === Array ? void(this.containment = s.containment) : ("parent" === s.containment && (s.containment = this.helper[0].parentNode), i = t(s.containment), n = i[0], void(n && (e = /(scroll|auto)/.test(i.css("overflow")), this.containment = [(parseInt(i.css("borderLeftWidth"), 10) || 0) + (parseInt(i.css("paddingLeft"), 10) || 0), (parseInt(i.css("borderTopWidth"), 10) || 0) + (parseInt(i.css("paddingTop"), 10) || 0), (e ? Math.max(n.scrollWidth, n.offsetWidth) : n.offsetWidth) - (parseInt(i.css("borderRightWidth"), 10) || 0) - (parseInt(i.css("paddingRight"), 10) || 0) - this.helperProportions.width - this.margins.left - this.margins.right, (e ? Math.max(n.scrollHeight, n.offsetHeight) : n.offsetHeight) - (parseInt(i.css("borderBottomWidth"), 10) || 0) - (parseInt(i.css("paddingBottom"), 10) || 0) - this.helperProportions.height - this.margins.top - this.margins.bottom], this.relativeContainer = i))) : void(this.containment = null)
            },
            _convertPositionTo: function(t, e) {
                e || (e = this.position);
                var i = "absolute" === t ? 1 : -1,
                    n = this._isRootNode(this.scrollParent[0]);
                return {
                    top: e.top + this.offset.relative.top * i + this.offset.parent.top * i - ("fixed" === this.cssPosition ? -this.offset.scroll.top : n ? 0 : this.offset.scroll.top) * i,
                    left: e.left + this.offset.relative.left * i + this.offset.parent.left * i - ("fixed" === this.cssPosition ? -this.offset.scroll.left : n ? 0 : this.offset.scroll.left) * i
                }
            },
            _generatePosition: function(t, e) {
                var i, n, s, o, a = this.options,
                    r = this._isRootNode(this.scrollParent[0]),
                    l = t.pageX,
                    h = t.pageY;
                return r && this.offset.scroll || (this.offset.scroll = {
                    top: this.scrollParent.scrollTop(),
                    left: this.scrollParent.scrollLeft()
                }), e && (this.containment && (this.relativeContainer ? (n = this.relativeContainer.offset(), i = [this.containment[0] + n.left, this.containment[1] + n.top, this.containment[2] + n.left, this.containment[3] + n.top]) : i = this.containment, t.pageX - this.offset.click.left < i[0] && (l = i[0] + this.offset.click.left), t.pageY - this.offset.click.top < i[1] && (h = i[1] + this.offset.click.top), t.pageX - this.offset.click.left > i[2] && (l = i[2] + this.offset.click.left), t.pageY - this.offset.click.top > i[3] && (h = i[3] + this.offset.click.top)), a.grid && (s = a.grid[1] ? this.originalPageY + Math.round((h - this.originalPageY) / a.grid[1]) * a.grid[1] : this.originalPageY, h = i ? s - this.offset.click.top >= i[1] || s - this.offset.click.top > i[3] ? s : s - this.offset.click.top >= i[1] ? s - a.grid[1] : s + a.grid[1] : s, o = a.grid[0] ? this.originalPageX + Math.round((l - this.originalPageX) / a.grid[0]) * a.grid[0] : this.originalPageX, l = i ? o - this.offset.click.left >= i[0] || o - this.offset.click.left > i[2] ? o : o - this.offset.click.left >= i[0] ? o - a.grid[0] : o + a.grid[0] : o), "y" === a.axis && (l = this.originalPageX), "x" === a.axis && (h = this.originalPageY)), {
                    top: h - this.offset.click.top - this.offset.relative.top - this.offset.parent.top + ("fixed" === this.cssPosition ? -this.offset.scroll.top : r ? 0 : this.offset.scroll.top),
                    left: l - this.offset.click.left - this.offset.relative.left - this.offset.parent.left + ("fixed" === this.cssPosition ? -this.offset.scroll.left : r ? 0 : this.offset.scroll.left)
                }
            },
            _clear: function() {
                this.helper.removeClass("ui-draggable-dragging"), this.helper[0] === this.element[0] || this.cancelHelperRemoval || this.helper.remove(), this.helper = null, this.cancelHelperRemoval = !1, this.destroyOnClear && this.destroy()
            },
            _normalizeRightBottom: function() {
                "y" !== this.options.axis && "auto" !== this.helper.css("right") && (this.helper.width(this.helper.width()), this.helper.css("right", "auto")), "x" !== this.options.axis && "auto" !== this.helper.css("bottom") && (this.helper.height(this.helper.height()), this.helper.css("bottom", "auto"))
            },
            _trigger: function(e, i, n) {
                return n = n || this._uiHash(), t.ui.plugin.call(this, e, [i, n, this], !0), /^(drag|start|stop)/.test(e) && (this.positionAbs = this._convertPositionTo("absolute"), n.offset = this.positionAbs), t.Widget.prototype._trigger.call(this, e, i, n)
            },
            plugins: {},
            _uiHash: function() {
                return {
                    helper: this.helper,
                    position: this.position,
                    originalPosition: this.originalPosition,
                    offset: this.positionAbs
                }
            }
        }), t.ui.plugin.add("draggable", "connectToSortable", {
            start: function(e, i, n) {
                var s = t.extend({}, i, {
                    item: n.element
                });
                n.sortables = [], t(n.options.connectToSortable).each(function() {
                    var i = t(this).sortable("instance");
                    i && !i.options.disabled && (n.sortables.push(i), i.refreshPositions(), i._trigger("activate", e, s))
                })
            },
            stop: function(e, i, n) {
                var s = t.extend({}, i, {
                    item: n.element
                });
                n.cancelHelperRemoval = !1, t.each(n.sortables, function() {
                    var t = this;
                    t.isOver ? (t.isOver = 0, n.cancelHelperRemoval = !0, t.cancelHelperRemoval = !1, t._storedCSS = {
                        position: t.placeholder.css("position"),
                        top: t.placeholder.css("top"),
                        left: t.placeholder.css("left")
                    }, t._mouseStop(e), t.options.helper = t.options._helper) : (t.cancelHelperRemoval = !0, t._trigger("deactivate", e, s))
                })
            },
            drag: function(e, i, n) {
                t.each(n.sortables, function() {
                    var s = !1,
                        o = this;
                    o.positionAbs = n.positionAbs, o.helperProportions = n.helperProportions, o.offset.click = n.offset.click, o._intersectsWith(o.containerCache) && (s = !0, t.each(n.sortables, function() {
                        return this.positionAbs = n.positionAbs, this.helperProportions = n.helperProportions, this.offset.click = n.offset.click, this !== o && this._intersectsWith(this.containerCache) && t.contains(o.element[0], this.element[0]) && (s = !1), s
                    })), s ? (o.isOver || (o.isOver = 1, o.currentItem = i.helper.appendTo(o.element).data("ui-sortable-item", !0), o.options._helper = o.options.helper, o.options.helper = function() {
                        return i.helper[0]
                    }, e.target = o.currentItem[0], o._mouseCapture(e, !0), o._mouseStart(e, !0, !0), o.offset.click.top = n.offset.click.top, o.offset.click.left = n.offset.click.left, o.offset.parent.left -= n.offset.parent.left - o.offset.parent.left, o.offset.parent.top -= n.offset.parent.top - o.offset.parent.top, n._trigger("toSortable", e), n.dropped = o.element, t.each(n.sortables, function() {
                        this.refreshPositions()
                    }), n.currentItem = n.element, o.fromOutside = n), o.currentItem && (o._mouseDrag(e), i.position = o.position)) : o.isOver && (o.isOver = 0, o.cancelHelperRemoval = !0, o.options._revert = o.options.revert, o.options.revert = !1, o._trigger("out", e, o._uiHash(o)), o._mouseStop(e, !0), o.options.revert = o.options._revert, o.options.helper = o.options._helper, o.placeholder && o.placeholder.remove(), n._refreshOffsets(e), i.position = n._generatePosition(e, !0), n._trigger("fromSortable", e), n.dropped = !1, t.each(n.sortables, function() {
                        this.refreshPositions()
                    }))
                })
            }
        }), t.ui.plugin.add("draggable", "cursor", {
            start: function(e, i, n) {
                var s = t("body"),
                    o = n.options;
                s.css("cursor") && (o._cursor = s.css("cursor")), s.css("cursor", o.cursor)
            },
            stop: function(e, i, n) {
                var s = n.options;
                s._cursor && t("body").css("cursor", s._cursor)
            }
        }), t.ui.plugin.add("draggable", "opacity", {
            start: function(e, i, n) {
                var s = t(i.helper),
                    o = n.options;
                s.css("opacity") && (o._opacity = s.css("opacity")), s.css("opacity", o.opacity)
            },
            stop: function(e, i, n) {
                var s = n.options;
                s._opacity && t(i.helper).css("opacity", s._opacity)
            }
        }), t.ui.plugin.add("draggable", "scroll", {
            start: function(t, e, i) {
                i.scrollParentNotHidden || (i.scrollParentNotHidden = i.helper.scrollParent(!1)), i.scrollParentNotHidden[0] !== i.document[0] && "HTML" !== i.scrollParentNotHidden[0].tagName && (i.overflowOffset = i.scrollParentNotHidden.offset())
            },
            drag: function(e, i, n) {
                var s = n.options,
                    o = !1,
                    a = n.scrollParentNotHidden[0],
                    r = n.document[0];
                a !== r && "HTML" !== a.tagName ? (s.axis && "x" === s.axis || (n.overflowOffset.top + a.offsetHeight - e.pageY < s.scrollSensitivity ? a.scrollTop = o = a.scrollTop + s.scrollSpeed : e.pageY - n.overflowOffset.top < s.scrollSensitivity && (a.scrollTop = o = a.scrollTop - s.scrollSpeed)), s.axis && "y" === s.axis || (n.overflowOffset.left + a.offsetWidth - e.pageX < s.scrollSensitivity ? a.scrollLeft = o = a.scrollLeft + s.scrollSpeed : e.pageX - n.overflowOffset.left < s.scrollSensitivity && (a.scrollLeft = o = a.scrollLeft - s.scrollSpeed))) : (s.axis && "x" === s.axis || (e.pageY - t(r).scrollTop() < s.scrollSensitivity ? o = t(r).scrollTop(t(r).scrollTop() - s.scrollSpeed) : t(window).height() - (e.pageY - t(r).scrollTop()) < s.scrollSensitivity && (o = t(r).scrollTop(t(r).scrollTop() + s.scrollSpeed))), s.axis && "y" === s.axis || (e.pageX - t(r).scrollLeft() < s.scrollSensitivity ? o = t(r).scrollLeft(t(r).scrollLeft() - s.scrollSpeed) : t(window).width() - (e.pageX - t(r).scrollLeft()) < s.scrollSensitivity && (o = t(r).scrollLeft(t(r).scrollLeft() + s.scrollSpeed)))), o !== !1 && t.ui.ddmanager && !s.dropBehaviour && t.ui.ddmanager.prepareOffsets(n, e)
            }
        }), t.ui.plugin.add("draggable", "snap", {
            start: function(e, i, n) {
                var s = n.options;
                n.snapElements = [], t(s.snap.constructor !== String ? s.snap.items || ":data(ui-draggable)" : s.snap).each(function() {
                    var e = t(this),
                        i = e.offset();
                    this !== n.element[0] && n.snapElements.push({
                        item: this,
                        width: e.outerWidth(),
                        height: e.outerHeight(),
                        top: i.top,
                        left: i.left
                    })
                })
            },
            drag: function(e, i, n) {
                var s, o, a, r, l, h, c, u, d, p, f = n.options,
                    m = f.snapTolerance,
                    g = i.offset.left,
                    v = g + n.helperProportions.width,
                    b = i.offset.top,
                    y = b + n.helperProportions.height;
                for (d = n.snapElements.length - 1; d >= 0; d--) l = n.snapElements[d].left - n.margins.left, h = l + n.snapElements[d].width, c = n.snapElements[d].top - n.margins.top, u = c + n.snapElements[d].height, l - m > v || g > h + m || c - m > y || b > u + m || !t.contains(n.snapElements[d].item.ownerDocument, n.snapElements[d].item) ? (n.snapElements[d].snapping && n.options.snap.release && n.options.snap.release.call(n.element, e, t.extend(n._uiHash(), {
                    snapItem: n.snapElements[d].item
                })), n.snapElements[d].snapping = !1) : ("inner" !== f.snapMode && (s = Math.abs(c - y) <= m, o = Math.abs(u - b) <= m, a = Math.abs(l - v) <= m, r = Math.abs(h - g) <= m, s && (i.position.top = n._convertPositionTo("relative", {
                    top: c - n.helperProportions.height,
                    left: 0
                }).top), o && (i.position.top = n._convertPositionTo("relative", {
                    top: u,
                    left: 0
                }).top), a && (i.position.left = n._convertPositionTo("relative", {
                    top: 0,
                    left: l - n.helperProportions.width
                }).left), r && (i.position.left = n._convertPositionTo("relative", {
                    top: 0,
                    left: h
                }).left)), p = s || o || a || r, "outer" !== f.snapMode && (s = Math.abs(c - b) <= m, o = Math.abs(u - y) <= m, a = Math.abs(l - g) <= m, r = Math.abs(h - v) <= m, s && (i.position.top = n._convertPositionTo("relative", {
                    top: c,
                    left: 0
                }).top), o && (i.position.top = n._convertPositionTo("relative", {
                    top: u - n.helperProportions.height,
                    left: 0
                }).top), a && (i.position.left = n._convertPositionTo("relative", {
                    top: 0,
                    left: l
                }).left), r && (i.position.left = n._convertPositionTo("relative", {
                    top: 0,
                    left: h - n.helperProportions.width
                }).left)), !n.snapElements[d].snapping && (s || o || a || r || p) && n.options.snap.snap && n.options.snap.snap.call(n.element, e, t.extend(n._uiHash(), {
                    snapItem: n.snapElements[d].item
                })), n.snapElements[d].snapping = s || o || a || r || p)
            }
        }), t.ui.plugin.add("draggable", "stack", {
            start: function(e, i, n) {
                var s, o = n.options,
                    a = t.makeArray(t(o.stack)).sort(function(e, i) {
                        return (parseInt(t(e).css("zIndex"), 10) || 0) - (parseInt(t(i).css("zIndex"), 10) || 0)
                    });
                a.length && (s = parseInt(t(a[0]).css("zIndex"), 10) || 0, t(a).each(function(e) {
                    t(this).css("zIndex", s + e)
                }), this.css("zIndex", s + a.length))
            }
        }), t.ui.plugin.add("draggable", "zIndex", {
            start: function(e, i, n) {
                var s = t(i.helper),
                    o = n.options;
                s.css("zIndex") && (o._zIndex = s.css("zIndex")), s.css("zIndex", o.zIndex)
            },
            stop: function(e, i, n) {
                var s = n.options;
                s._zIndex && t(i.helper).css("zIndex", s._zIndex)
            }
        });
        t.ui.draggable;
        t.widget("ui.droppable", {
            version: "1.11.2",
            widgetEventPrefix: "drop",
            options: {
                accept: "*",
                activeClass: !1,
                addClasses: !0,
                greedy: !1,
                hoverClass: !1,
                scope: "default",
                tolerance: "intersect",
                activate: null,
                deactivate: null,
                drop: null,
                out: null,
                over: null
            },
            _create: function() {
                var e, i = this.options,
                    n = i.accept;
                this.isover = !1, this.isout = !0, this.accept = t.isFunction(n) ? n : function(t) {
                    return t.is(n)
                }, this.proportions = function() {
                    return arguments.length ? void(e = arguments[0]) : e ? e : e = {
                        width: this.element[0].offsetWidth,
                        height: this.element[0].offsetHeight
                    }
                }, this._addToManager(i.scope), i.addClasses && this.element.addClass("ui-droppable")
            },
            _addToManager: function(e) {
                t.ui.ddmanager.droppables[e] = t.ui.ddmanager.droppables[e] || [], t.ui.ddmanager.droppables[e].push(this)
            },
            _splice: function(t) {
                for (var e = 0; e < t.length; e++) t[e] === this && t.splice(e, 1)
            },
            _destroy: function() {
                var e = t.ui.ddmanager.droppables[this.options.scope];
                this._splice(e), this.element.removeClass("ui-droppable ui-droppable-disabled")
            },
            _setOption: function(e, i) {
                if ("accept" === e) this.accept = t.isFunction(i) ? i : function(t) {
                    return t.is(i)
                };
                else if ("scope" === e) {
                    var n = t.ui.ddmanager.droppables[this.options.scope];
                    this._splice(n), this._addToManager(i)
                }
                this._super(e, i)
            },
            _activate: function(e) {
                var i = t.ui.ddmanager.current;
                this.options.activeClass && this.element.addClass(this.options.activeClass), i && this._trigger("activate", e, this.ui(i))
            },
            _deactivate: function(e) {
                var i = t.ui.ddmanager.current;
                this.options.activeClass && this.element.removeClass(this.options.activeClass), i && this._trigger("deactivate", e, this.ui(i))
            },
            _over: function(e) {
                var i = t.ui.ddmanager.current;
                i && (i.currentItem || i.element)[0] !== this.element[0] && this.accept.call(this.element[0], i.currentItem || i.element) && (this.options.hoverClass && this.element.addClass(this.options.hoverClass), this._trigger("over", e, this.ui(i)))
            },
            _out: function(e) {
                var i = t.ui.ddmanager.current;
                i && (i.currentItem || i.element)[0] !== this.element[0] && this.accept.call(this.element[0], i.currentItem || i.element) && (this.options.hoverClass && this.element.removeClass(this.options.hoverClass), this._trigger("out", e, this.ui(i)))
            },
            _drop: function(e, i) {
                var n = i || t.ui.ddmanager.current,
                    s = !1;
                return n && (n.currentItem || n.element)[0] !== this.element[0] ? (this.element.find(":data(ui-droppable)").not(".ui-draggable-dragging").each(function() {
                    var i = t(this).droppable("instance");
                    return i.options.greedy && !i.options.disabled && i.options.scope === n.options.scope && i.accept.call(i.element[0], n.currentItem || n.element) && t.ui.intersect(n, t.extend(i, {
                        offset: i.element.offset()
                    }), i.options.tolerance, e) ? (s = !0, !1) : void 0
                }), s ? !1 : this.accept.call(this.element[0], n.currentItem || n.element) ? (this.options.activeClass && this.element.removeClass(this.options.activeClass), this.options.hoverClass && this.element.removeClass(this.options.hoverClass), this._trigger("drop", e, this.ui(n)), this.element) : !1) : !1
            },
            ui: function(t) {
                return {
                    draggable: t.currentItem || t.element,
                    helper: t.helper,
                    position: t.position,
                    offset: t.positionAbs
                }
            }
        }), t.ui.intersect = function() {
            function t(t, e, i) {
                return t >= e && e + i > t
            }
            return function(e, i, n, s) {
                if (!i.offset) return !1;
                var o = (e.positionAbs || e.position.absolute).left + e.margins.left,
                    a = (e.positionAbs || e.position.absolute).top + e.margins.top,
                    r = o + e.helperProportions.width,
                    l = a + e.helperProportions.height,
                    h = i.offset.left,
                    c = i.offset.top,
                    u = h + i.proportions().width,
                    d = c + i.proportions().height;
                switch (n) {
                    case "fit":
                        return o >= h && u >= r && a >= c && d >= l;
                    case "intersect":
                        return h < o + e.helperProportions.width / 2 && r - e.helperProportions.width / 2 < u && c < a + e.helperProportions.height / 2 && l - e.helperProportions.height / 2 < d;
                    case "pointer":
                        return t(s.pageY, c, i.proportions().height) && t(s.pageX, h, i.proportions().width);
                    case "touch":
                        return (a >= c && d >= a || l >= c && d >= l || c > a && l > d) && (o >= h && u >= o || r >= h && u >= r || h > o && r > u);
                    default:
                        return !1
                }
            }
        }(), t.ui.ddmanager = {
            current: null,
            droppables: {
                "default": []
            },
            prepareOffsets: function(e, i) {
                var n, s, o = t.ui.ddmanager.droppables[e.options.scope] || [],
                    a = i ? i.type : null,
                    r = (e.currentItem || e.element).find(":data(ui-droppable)").addBack();
                t: for (n = 0; n < o.length; n++)
                    if (!(o[n].options.disabled || e && !o[n].accept.call(o[n].element[0], e.currentItem || e.element))) {
                        for (s = 0; s < r.length; s++)
                            if (r[s] === o[n].element[0]) {
                                o[n].proportions().height = 0;
                                continue t
                            }
                        o[n].visible = "none" !== o[n].element.css("display"), o[n].visible && ("mousedown" === a && o[n]._activate.call(o[n], i), o[n].offset = o[n].element.offset(), o[n].proportions({
                            width: o[n].element[0].offsetWidth,
                            height: o[n].element[0].offsetHeight
                        }))
                    }
            },
            drop: function(e, i) {
                var n = !1;
                return t.each((t.ui.ddmanager.droppables[e.options.scope] || []).slice(), function() {
                    this.options && (!this.options.disabled && this.visible && t.ui.intersect(e, this, this.options.tolerance, i) && (n = this._drop.call(this, i) || n), !this.options.disabled && this.visible && this.accept.call(this.element[0], e.currentItem || e.element) && (this.isout = !0, this.isover = !1, this._deactivate.call(this, i)))
                }), n
            },
            dragStart: function(e, i) {
                e.element.parentsUntil("body").bind("scroll.droppable", function() {
                    e.options.refreshPositions || t.ui.ddmanager.prepareOffsets(e, i)
                })
            },
            drag: function(e, i) {
                e.options.refreshPositions && t.ui.ddmanager.prepareOffsets(e, i), t.each(t.ui.ddmanager.droppables[e.options.scope] || [], function() {
                    if (!this.options.disabled && !this.greedyChild && this.visible) {
                        var n, s, o, a = t.ui.intersect(e, this, this.options.tolerance, i),
                            r = !a && this.isover ? "isout" : a && !this.isover ? "isover" : null;
                        r && (this.options.greedy && (s = this.options.scope, o = this.element.parents(":data(ui-droppable)").filter(function() {
                            return t(this).droppable("instance").options.scope === s
                        }), o.length && (n = t(o[0]).droppable("instance"), n.greedyChild = "isover" === r)), n && "isover" === r && (n.isover = !1, n.isout = !0, n._out.call(n, i)), this[r] = !0, this["isout" === r ? "isover" : "isout"] = !1, this["isover" === r ? "_over" : "_out"].call(this, i), n && "isout" === r && (n.isout = !1, n.isover = !0, n._over.call(n, i)))
                    }
                })
            },
            dragStop: function(e, i) {
                e.element.parentsUntil("body").unbind("scroll.droppable"), e.options.refreshPositions || t.ui.ddmanager.prepareOffsets(e, i)
            }
        };
        t.ui.droppable;
        t.widget("ui.resizable", t.ui.mouse, {
            version: "1.11.2",
            widgetEventPrefix: "resize",
            options: {
                alsoResize: !1,
                animate: !1,
                animateDuration: "slow",
                animateEasing: "swing",
                aspectRatio: !1,
                autoHide: !1,
                containment: !1,
                ghost: !1,
                grid: !1,
                handles: "e,s,se",
                helper: !1,
                maxHeight: null,
                maxWidth: null,
                minHeight: 10,
                minWidth: 10,
                zIndex: 90,
                resize: null,
                start: null,
                stop: null
            },
            _num: function(t) {
                return parseInt(t, 10) || 0
            },
            _isNumber: function(t) {
                return !isNaN(parseInt(t, 10))
            },
            _hasScroll: function(e, i) {
                if ("hidden" === t(e).css("overflow")) return !1;
                var n = i && "left" === i ? "scrollLeft" : "scrollTop",
                    s = !1;
                return e[n] > 0 ? !0 : (e[n] = 1, s = e[n] > 0, e[n] = 0, s)
            },
            _create: function() {
                var e, i, n, s, o, a = this,
                    r = this.options;
                if (this.element.addClass("ui-resizable"), t.extend(this, {
                    _aspectRatio: !!r.aspectRatio,
                    aspectRatio: r.aspectRatio,
                    originalElement: this.element,
                    _proportionallyResizeElements: [],
                    _helper: r.helper || r.ghost || r.animate ? r.helper || "ui-resizable-helper" : null
                }), this.element[0].nodeName.match(/canvas|textarea|input|select|button|img/i) && (this.element.wrap(t("<div class='ui-wrapper' style='overflow: hidden;'></div>").css({
                    position: this.element.css("position"),
                    width: this.element.outerWidth(),
                    height: this.element.outerHeight(),
                    top: this.element.css("top"),
                    left: this.element.css("left")
                })), this.element = this.element.parent().data("ui-resizable", this.element.resizable("instance")), this.elementIsWrapper = !0, this.element.css({
                    marginLeft: this.originalElement.css("marginLeft"),
                    marginTop: this.originalElement.css("marginTop"),
                    marginRight: this.originalElement.css("marginRight"),
                    marginBottom: this.originalElement.css("marginBottom")
                }), this.originalElement.css({
                    marginLeft: 0,
                    marginTop: 0,
                    marginRight: 0,
                    marginBottom: 0
                }), this.originalResizeStyle = this.originalElement.css("resize"), this.originalElement.css("resize", "none"), this._proportionallyResizeElements.push(this.originalElement.css({
                    position: "static",
                    zoom: 1,
                    display: "block"
                })), this.originalElement.css({
                    margin: this.originalElement.css("margin")
                }), this._proportionallyResize()), this.handles = r.handles || (t(".ui-resizable-handle", this.element).length ? {
                    n: ".ui-resizable-n",
                    e: ".ui-resizable-e",
                    s: ".ui-resizable-s",
                    w: ".ui-resizable-w",
                    se: ".ui-resizable-se",
                    sw: ".ui-resizable-sw",
                    ne: ".ui-resizable-ne",
                    nw: ".ui-resizable-nw"
                } : "e,s,se"), this.handles.constructor === String)
                    for ("all" === this.handles && (this.handles = "n,e,s,w,se,sw,ne,nw"), e = this.handles.split(","), this.handles = {}, i = 0; i < e.length; i++) n = t.trim(e[i]), o = "ui-resizable-" + n, s = t("<div class='ui-resizable-handle " + o + "'></div>"), s.css({
                        zIndex: r.zIndex
                    }), "se" === n && s.addClass("ui-icon ui-icon-gripsmall-diagonal-se"), this.handles[n] = ".ui-resizable-" + n, this.element.append(s);
                this._renderAxis = function(e) {
                    var i, n, s, o;
                    e = e || this.element;
                    for (i in this.handles) this.handles[i].constructor === String && (this.handles[i] = this.element.children(this.handles[i]).first().show()), this.elementIsWrapper && this.originalElement[0].nodeName.match(/textarea|input|select|button/i) && (n = t(this.handles[i], this.element), o = /sw|ne|nw|se|n|s/.test(i) ? n.outerHeight() : n.outerWidth(), s = ["padding", /ne|nw|n/.test(i) ? "Top" : /se|sw|s/.test(i) ? "Bottom" : /^e$/.test(i) ? "Right" : "Left"].join(""), e.css(s, o), this._proportionallyResize()), t(this.handles[i]).length
                }, this._renderAxis(this.element), this._handles = t(".ui-resizable-handle", this.element).disableSelection(), this._handles.mouseover(function() {
                    a.resizing || (this.className && (s = this.className.match(/ui-resizable-(se|sw|ne|nw|n|e|s|w)/i)), a.axis = s && s[1] ? s[1] : "se")
                }), r.autoHide && (this._handles.hide(), t(this.element).addClass("ui-resizable-autohide").mouseenter(function() {
                    r.disabled || (t(this).removeClass("ui-resizable-autohide"), a._handles.show())
                }).mouseleave(function() {
                    r.disabled || a.resizing || (t(this).addClass("ui-resizable-autohide"), a._handles.hide())
                })), this._mouseInit()
            },
            _destroy: function() {
                this._mouseDestroy();
                var e, i = function(e) {
                    t(e).removeClass("ui-resizable ui-resizable-disabled ui-resizable-resizing").removeData("resizable").removeData("ui-resizable").unbind(".resizable").find(".ui-resizable-handle").remove()
                };
                return this.elementIsWrapper && (i(this.element), e = this.element, this.originalElement.css({
                    position: e.css("position"),
                    width: e.outerWidth(),
                    height: e.outerHeight(),
                    top: e.css("top"),
                    left: e.css("left")
                }).insertAfter(e), e.remove()), this.originalElement.css("resize", this.originalResizeStyle), i(this.originalElement), this
            },
            _mouseCapture: function(e) {
                var i, n, s = !1;
                for (i in this.handles) n = t(this.handles[i])[0], (n === e.target || t.contains(n, e.target)) && (s = !0);
                return !this.options.disabled && s
            },
            _mouseStart: function(e) {
                var i, n, s, o = this.options,
                    a = this.element;
                return this.resizing = !0, this._renderProxy(), i = this._num(this.helper.css("left")), n = this._num(this.helper.css("top")), o.containment && (i += t(o.containment).scrollLeft() || 0, n += t(o.containment).scrollTop() || 0), this.offset = this.helper.offset(), this.position = {
                    left: i,
                    top: n
                }, this.size = this._helper ? {
                    width: this.helper.width(),
                    height: this.helper.height()
                } : {
                    width: a.width(),
                    height: a.height()
                }, this.originalSize = this._helper ? {
                    width: a.outerWidth(),
                    height: a.outerHeight()
                } : {
                    width: a.width(),
                    height: a.height()
                }, this.sizeDiff = {
                    width: a.outerWidth() - a.width(),
                    height: a.outerHeight() - a.height()
                }, this.originalPosition = {
                    left: i,
                    top: n
                }, this.originalMousePosition = {
                    left: e.pageX,
                    top: e.pageY
                }, this.aspectRatio = "number" == typeof o.aspectRatio ? o.aspectRatio : this.originalSize.width / this.originalSize.height || 1, s = t(".ui-resizable-" + this.axis).css("cursor"), t("body").css("cursor", "auto" === s ? this.axis + "-resize" : s), a.addClass("ui-resizable-resizing"), this._propagate("start", e), !0
            },
            _mouseDrag: function(e) {
                var i, n, s = this.originalMousePosition,
                    o = this.axis,
                    a = e.pageX - s.left || 0,
                    r = e.pageY - s.top || 0,
                    l = this._change[o];
                return this._updatePrevProperties(), l ? (i = l.apply(this, [e, a, r]), this._updateVirtualBoundaries(e.shiftKey), (this._aspectRatio || e.shiftKey) && (i = this._updateRatio(i, e)), i = this._respectSize(i, e), this._updateCache(i), this._propagate("resize", e), n = this._applyChanges(), !this._helper && this._proportionallyResizeElements.length && this._proportionallyResize(), t.isEmptyObject(n) || (this._updatePrevProperties(), this._trigger("resize", e, this.ui()), this._applyChanges()), !1) : !1
            },
            _mouseStop: function(e) {
                this.resizing = !1;
                var i, n, s, o, a, r, l, h = this.options,
                    c = this;
                return this._helper && (i = this._proportionallyResizeElements, n = i.length && /textarea/i.test(i[0].nodeName), s = n && this._hasScroll(i[0], "left") ? 0 : c.sizeDiff.height, o = n ? 0 : c.sizeDiff.width, a = {
                    width: c.helper.width() - o,
                    height: c.helper.height() - s
                }, r = parseInt(c.element.css("left"), 10) + (c.position.left - c.originalPosition.left) || null, l = parseInt(c.element.css("top"), 10) + (c.position.top - c.originalPosition.top) || null, h.animate || this.element.css(t.extend(a, {
                    top: l,
                    left: r
                })), c.helper.height(c.size.height), c.helper.width(c.size.width), this._helper && !h.animate && this._proportionallyResize()), t("body").css("cursor", "auto"), this.element.removeClass("ui-resizable-resizing"), this._propagate("stop", e), this._helper && this.helper.remove(), !1
            },
            _updatePrevProperties: function() {
                this.prevPosition = {
                    top: this.position.top,
                    left: this.position.left
                }, this.prevSize = {
                    width: this.size.width,
                    height: this.size.height
                }
            },
            _applyChanges: function() {
                var t = {};
                return this.position.top !== this.prevPosition.top && (t.top = this.position.top + "px"), this.position.left !== this.prevPosition.left && (t.left = this.position.left + "px"), this.size.width !== this.prevSize.width && (t.width = this.size.width + "px"), this.size.height !== this.prevSize.height && (t.height = this.size.height + "px"), this.helper.css(t), t
            },
            _updateVirtualBoundaries: function(t) {
                var e, i, n, s, o, a = this.options;
                o = {
                    minWidth: this._isNumber(a.minWidth) ? a.minWidth : 0,
                    maxWidth: this._isNumber(a.maxWidth) ? a.maxWidth : 1 / 0,
                    minHeight: this._isNumber(a.minHeight) ? a.minHeight : 0,
                    maxHeight: this._isNumber(a.maxHeight) ? a.maxHeight : 1 / 0
                }, (this._aspectRatio || t) && (e = o.minHeight * this.aspectRatio, n = o.minWidth / this.aspectRatio, i = o.maxHeight * this.aspectRatio, s = o.maxWidth / this.aspectRatio, e > o.minWidth && (o.minWidth = e), n > o.minHeight && (o.minHeight = n), i < o.maxWidth && (o.maxWidth = i), s < o.maxHeight && (o.maxHeight = s)), this._vBoundaries = o
            },
            _updateCache: function(t) {
                this.offset = this.helper.offset(), this._isNumber(t.left) && (this.position.left = t.left), this._isNumber(t.top) && (this.position.top = t.top), this._isNumber(t.height) && (this.size.height = t.height), this._isNumber(t.width) && (this.size.width = t.width)
            },
            _updateRatio: function(t) {
                var e = this.position,
                    i = this.size,
                    n = this.axis;
                return this._isNumber(t.height) ? t.width = t.height * this.aspectRatio : this._isNumber(t.width) && (t.height = t.width / this.aspectRatio), "sw" === n && (t.left = e.left + (i.width - t.width), t.top = null), "nw" === n && (t.top = e.top + (i.height - t.height), t.left = e.left + (i.width - t.width)), t
            },
            _respectSize: function(t) {
                var e = this._vBoundaries,
                    i = this.axis,
                    n = this._isNumber(t.width) && e.maxWidth && e.maxWidth < t.width,
                    s = this._isNumber(t.height) && e.maxHeight && e.maxHeight < t.height,
                    o = this._isNumber(t.width) && e.minWidth && e.minWidth > t.width,
                    a = this._isNumber(t.height) && e.minHeight && e.minHeight > t.height,
                    r = this.originalPosition.left + this.originalSize.width,
                    l = this.position.top + this.size.height,
                    h = /sw|nw|w/.test(i),
                    c = /nw|ne|n/.test(i);
                return o && (t.width = e.minWidth), a && (t.height = e.minHeight), n && (t.width = e.maxWidth), s && (t.height = e.maxHeight), o && h && (t.left = r - e.minWidth), n && h && (t.left = r - e.maxWidth), a && c && (t.top = l - e.minHeight), s && c && (t.top = l - e.maxHeight), t.width || t.height || t.left || !t.top ? t.width || t.height || t.top || !t.left || (t.left = null) : t.top = null, t
            },
            _getPaddingPlusBorderDimensions: function(t) {
                for (var e = 0, i = [], n = [t.css("borderTopWidth"), t.css("borderRightWidth"), t.css("borderBottomWidth"), t.css("borderLeftWidth")], s = [t.css("paddingTop"), t.css("paddingRight"), t.css("paddingBottom"), t.css("paddingLeft")]; 4 > e; e++) i[e] = parseInt(n[e], 10) || 0, i[e] += parseInt(s[e], 10) || 0;
                return {
                    height: i[0] + i[2],
                    width: i[1] + i[3]
                }
            },
            _proportionallyResize: function() {
                if (this._proportionallyResizeElements.length)
                    for (var t, e = 0, i = this.helper || this.element; e < this._proportionallyResizeElements.length; e++) t = this._proportionallyResizeElements[e], this.outerDimensions || (this.outerDimensions = this._getPaddingPlusBorderDimensions(t)), t.css({
                        height: i.height() - this.outerDimensions.height || 0,
                        width: i.width() - this.outerDimensions.width || 0
                    })
            },
            _renderProxy: function() {
                var e = this.element,
                    i = this.options;
                this.elementOffset = e.offset(), this._helper ? (this.helper = this.helper || t("<div style='overflow:hidden;'></div>"), this.helper.addClass(this._helper).css({
                    width: this.element.outerWidth() - 1,
                    height: this.element.outerHeight() - 1,
                    position: "absolute",
                    left: this.elementOffset.left + "px",
                    top: this.elementOffset.top + "px",
                    zIndex: ++i.zIndex
                }), this.helper.appendTo("body").disableSelection()) : this.helper = this.element
            },
            _change: {
                e: function(t, e) {
                    return {
                        width: this.originalSize.width + e
                    }
                },
                w: function(t, e) {
                    var i = this.originalSize,
                        n = this.originalPosition;
                    return {
                        left: n.left + e,
                        width: i.width - e
                    }
                },
                n: function(t, e, i) {
                    var n = this.originalSize,
                        s = this.originalPosition;
                    return {
                        top: s.top + i,
                        height: n.height - i
                    }
                },
                s: function(t, e, i) {
                    return {
                        height: this.originalSize.height + i
                    }
                },
                se: function(e, i, n) {
                    return t.extend(this._change.s.apply(this, arguments), this._change.e.apply(this, [e, i, n]))
                },
                sw: function(e, i, n) {
                    return t.extend(this._change.s.apply(this, arguments), this._change.w.apply(this, [e, i, n]))
                },
                ne: function(e, i, n) {
                    return t.extend(this._change.n.apply(this, arguments), this._change.e.apply(this, [e, i, n]))
                },
                nw: function(e, i, n) {
                    return t.extend(this._change.n.apply(this, arguments), this._change.w.apply(this, [e, i, n]))
                }
            },
            _propagate: function(e, i) {
                t.ui.plugin.call(this, e, [i, this.ui()]), "resize" !== e && this._trigger(e, i, this.ui())
            },
            plugins: {},
            ui: function() {
                return {
                    originalElement: this.originalElement,
                    element: this.element,
                    helper: this.helper,
                    position: this.position,
                    size: this.size,
                    originalSize: this.originalSize,
                    originalPosition: this.originalPosition
                }
            }
        }), t.ui.plugin.add("resizable", "animate", {
            stop: function(e) {
                var i = t(this).resizable("instance"),
                    n = i.options,
                    s = i._proportionallyResizeElements,
                    o = s.length && /textarea/i.test(s[0].nodeName),
                    a = o && i._hasScroll(s[0], "left") ? 0 : i.sizeDiff.height,
                    r = o ? 0 : i.sizeDiff.width,
                    l = {
                        width: i.size.width - r,
                        height: i.size.height - a
                    },
                    h = parseInt(i.element.css("left"), 10) + (i.position.left - i.originalPosition.left) || null,
                    c = parseInt(i.element.css("top"), 10) + (i.position.top - i.originalPosition.top) || null;
                i.element.animate(t.extend(l, c && h ? {
                    top: c,
                    left: h
                } : {}), {
                    duration: n.animateDuration,
                    easing: n.animateEasing,
                    step: function() {
                        var n = {
                            width: parseInt(i.element.css("width"), 10),
                            height: parseInt(i.element.css("height"), 10),
                            top: parseInt(i.element.css("top"), 10),
                            left: parseInt(i.element.css("left"), 10)
                        };
                        s && s.length && t(s[0]).css({
                            width: n.width,
                            height: n.height
                        }), i._updateCache(n), i._propagate("resize", e)
                    }
                })
            }
        }), t.ui.plugin.add("resizable", "containment", {
            start: function() {
                var e, i, n, s, o, a, r, l = t(this).resizable("instance"),
                    h = l.options,
                    c = l.element,
                    u = h.containment,
                    d = u instanceof t ? u.get(0) : /parent/.test(u) ? c.parent().get(0) : u;
                d && (l.containerElement = t(d), /document/.test(u) || u === document ? (l.containerOffset = {
                    left: 0,
                    top: 0
                }, l.containerPosition = {
                    left: 0,
                    top: 0
                }, l.parentData = {
                    element: t(document),
                    left: 0,
                    top: 0,
                    width: t(document).width(),
                    height: t(document).height() || document.body.parentNode.scrollHeight
                }) : (e = t(d), i = [], t(["Top", "Right", "Left", "Bottom"]).each(function(t, n) {
                    i[t] = l._num(e.css("padding" + n))
                }), l.containerOffset = e.offset(), l.containerPosition = e.position(), l.containerSize = {
                    height: e.innerHeight() - i[3],
                    width: e.innerWidth() - i[1]
                }, n = l.containerOffset, s = l.containerSize.height, o = l.containerSize.width, a = l._hasScroll(d, "left") ? d.scrollWidth : o, r = l._hasScroll(d) ? d.scrollHeight : s, l.parentData = {
                    element: d,
                    left: n.left,
                    top: n.top,
                    width: a,
                    height: r
                }))
            },
            resize: function(e) {
                var i, n, s, o, a = t(this).resizable("instance"),
                    r = a.options,
                    l = a.containerOffset,
                    h = a.position,
                    c = a._aspectRatio || e.shiftKey,
                    u = {
                        top: 0,
                        left: 0
                    },
                    d = a.containerElement,
                    p = !0;
                d[0] !== document && /static/.test(d.css("position")) && (u = l), h.left < (a._helper ? l.left : 0) && (a.size.width = a.size.width + (a._helper ? a.position.left - l.left : a.position.left - u.left), c && (a.size.height = a.size.width / a.aspectRatio, p = !1), a.position.left = r.helper ? l.left : 0), h.top < (a._helper ? l.top : 0) && (a.size.height = a.size.height + (a._helper ? a.position.top - l.top : a.position.top), c && (a.size.width = a.size.height * a.aspectRatio, p = !1), a.position.top = a._helper ? l.top : 0), s = a.containerElement.get(0) === a.element.parent().get(0), o = /relative|absolute/.test(a.containerElement.css("position")), s && o ? (a.offset.left = a.parentData.left + a.position.left, a.offset.top = a.parentData.top + a.position.top) : (a.offset.left = a.element.offset().left, a.offset.top = a.element.offset().top), i = Math.abs(a.sizeDiff.width + (a._helper ? a.offset.left - u.left : a.offset.left - l.left)), n = Math.abs(a.sizeDiff.height + (a._helper ? a.offset.top - u.top : a.offset.top - l.top)), i + a.size.width >= a.parentData.width && (a.size.width = a.parentData.width - i, c && (a.size.height = a.size.width / a.aspectRatio, p = !1)), n + a.size.height >= a.parentData.height && (a.size.height = a.parentData.height - n, c && (a.size.width = a.size.height * a.aspectRatio, p = !1)), p || (a.position.left = a.prevPosition.left, a.position.top = a.prevPosition.top, a.size.width = a.prevSize.width, a.size.height = a.prevSize.height)
            },
            stop: function() {
                var e = t(this).resizable("instance"),
                    i = e.options,
                    n = e.containerOffset,
                    s = e.containerPosition,
                    o = e.containerElement,
                    a = t(e.helper),
                    r = a.offset(),
                    l = a.outerWidth() - e.sizeDiff.width,
                    h = a.outerHeight() - e.sizeDiff.height;
                e._helper && !i.animate && /relative/.test(o.css("position")) && t(this).css({
                    left: r.left - s.left - n.left,
                    width: l,
                    height: h
                }), e._helper && !i.animate && /static/.test(o.css("position")) && t(this).css({
                    left: r.left - s.left - n.left,
                    width: l,
                    height: h
                })
            }
        }), t.ui.plugin.add("resizable", "alsoResize", {
            start: function() {
                var e = t(this).resizable("instance"),
                    i = e.options,
                    n = function(e) {
                        t(e).each(function() {
                            var e = t(this);
                            e.data("ui-resizable-alsoresize", {
                                width: parseInt(e.width(), 10),
                                height: parseInt(e.height(), 10),
                                left: parseInt(e.css("left"), 10),
                                top: parseInt(e.css("top"), 10)
                            })
                        })
                    };
                "object" != typeof i.alsoResize || i.alsoResize.parentNode ? n(i.alsoResize) : i.alsoResize.length ? (i.alsoResize = i.alsoResize[0], n(i.alsoResize)) : t.each(i.alsoResize, function(t) {
                    n(t)
                })
            },
            resize: function(e, i) {
                var n = t(this).resizable("instance"),
                    s = n.options,
                    o = n.originalSize,
                    a = n.originalPosition,
                    r = {
                        height: n.size.height - o.height || 0,
                        width: n.size.width - o.width || 0,
                        top: n.position.top - a.top || 0,
                        left: n.position.left - a.left || 0
                    },
                    l = function(e, n) {
                        t(e).each(function() {
                            var e = t(this),
                                s = t(this).data("ui-resizable-alsoresize"),
                                o = {},
                                a = n && n.length ? n : e.parents(i.originalElement[0]).length ? ["width", "height"] : ["width", "height", "top", "left"];
                            t.each(a, function(t, e) {
                                var i = (s[e] || 0) + (r[e] || 0);
                                i && i >= 0 && (o[e] = i || null)
                            }), e.css(o)
                        })
                    };
                "object" != typeof s.alsoResize || s.alsoResize.nodeType ? l(s.alsoResize) : t.each(s.alsoResize, function(t, e) {
                    l(t, e)
                })
            },
            stop: function() {
                t(this).removeData("resizable-alsoresize")
            }
        }), t.ui.plugin.add("resizable", "ghost", {
            start: function() {
                var e = t(this).resizable("instance"),
                    i = e.options,
                    n = e.size;
                e.ghost = e.originalElement.clone(), e.ghost.css({
                    opacity: .25,
                    display: "block",
                    position: "relative",
                    height: n.height,
                    width: n.width,
                    margin: 0,
                    left: 0,
                    top: 0
                }).addClass("ui-resizable-ghost").addClass("string" == typeof i.ghost ? i.ghost : ""), e.ghost.appendTo(e.helper)
            },
            resize: function() {
                var e = t(this).resizable("instance");
                e.ghost && e.ghost.css({
                    position: "relative",
                    height: e.size.height,
                    width: e.size.width
                })
            },
            stop: function() {
                var e = t(this).resizable("instance");
                e.ghost && e.helper && e.helper.get(0).removeChild(e.ghost.get(0))
            }
        }), t.ui.plugin.add("resizable", "grid", {
            resize: function() {
                var e, i = t(this).resizable("instance"),
                    n = i.options,
                    s = i.size,
                    o = i.originalSize,
                    a = i.originalPosition,
                    r = i.axis,
                    l = "number" == typeof n.grid ? [n.grid, n.grid] : n.grid,
                    h = l[0] || 1,
                    c = l[1] || 1,
                    u = Math.round((s.width - o.width) / h) * h,
                    d = Math.round((s.height - o.height) / c) * c,
                    p = o.width + u,
                    f = o.height + d,
                    m = n.maxWidth && n.maxWidth < p,
                    g = n.maxHeight && n.maxHeight < f,
                    v = n.minWidth && n.minWidth > p,
                    b = n.minHeight && n.minHeight > f;
                n.grid = l, v && (p += h), b && (f += c), m && (p -= h), g && (f -= c), /^(se|s|e)$/.test(r) ? (i.size.width = p, i.size.height = f) : /^(ne)$/.test(r) ? (i.size.width = p, i.size.height = f, i.position.top = a.top - d) : /^(sw)$/.test(r) ? (i.size.width = p, i.size.height = f, i.position.left = a.left - u) : ((0 >= f - c || 0 >= p - h) && (e = i._getPaddingPlusBorderDimensions(this)), f - c > 0 ? (i.size.height = f, i.position.top = a.top - d) : (f = c - e.height, i.size.height = f, i.position.top = a.top + o.height - f), p - h > 0 ? (i.size.width = p, i.position.left = a.left - u) : (p = c - e.height, i.size.width = p, i.position.left = a.left + o.width - p))
            }
        });
        t.ui.resizable, t.widget("ui.selectable", t.ui.mouse, {
            version: "1.11.2",
            options: {
                appendTo: "body",
                autoRefresh: !0,
                distance: 0,
                filter: "*",
                tolerance: "touch",
                selected: null,
                selecting: null,
                start: null,
                stop: null,
                unselected: null,
                unselecting: null
            },
            _create: function() {
                var e, i = this;
                this.element.addClass("ui-selectable"), this.dragged = !1, this.refresh = function() {
                    e = t(i.options.filter, i.element[0]), e.addClass("ui-selectee"), e.each(function() {
                        var e = t(this),
                            i = e.offset();
                        t.data(this, "selectable-item", {
                            element: this,
                            $element: e,
                            left: i.left,
                            top: i.top,
                            right: i.left + e.outerWidth(),
                            bottom: i.top + e.outerHeight(),
                            startselected: !1,
                            selected: e.hasClass("ui-selected"),
                            selecting: e.hasClass("ui-selecting"),
                            unselecting: e.hasClass("ui-unselecting")
                        })
                    })
                }, this.refresh(), this.selectees = e.addClass("ui-selectee"), this._mouseInit(), this.helper = t("<div class='ui-selectable-helper'></div>")
            },
            _destroy: function() {
                this.selectees.removeClass("ui-selectee").removeData("selectable-item"), this.element.removeClass("ui-selectable ui-selectable-disabled"), this._mouseDestroy()
            },
            _mouseStart: function(e) {
                var i = this,
                    n = this.options;
                this.opos = [e.pageX, e.pageY], this.options.disabled || (this.selectees = t(n.filter, this.element[0]), this._trigger("start", e), t(n.appendTo).append(this.helper), this.helper.css({
                    left: e.pageX,
                    top: e.pageY,
                    width: 0,
                    height: 0
                }), n.autoRefresh && this.refresh(), this.selectees.filter(".ui-selected").each(function() {
                    var n = t.data(this, "selectable-item");
                    n.startselected = !0, e.metaKey || e.ctrlKey || (n.$element.removeClass("ui-selected"), n.selected = !1, n.$element.addClass("ui-unselecting"), n.unselecting = !0, i._trigger("unselecting", e, {
                        unselecting: n.element
                    }))
                }), t(e.target).parents().addBack().each(function() {
                    var n, s = t.data(this, "selectable-item");
                    return s ? (n = !e.metaKey && !e.ctrlKey || !s.$element.hasClass("ui-selected"), s.$element.removeClass(n ? "ui-unselecting" : "ui-selected").addClass(n ? "ui-selecting" : "ui-unselecting"), s.unselecting = !n, s.selecting = n, s.selected = n, n ? i._trigger("selecting", e, {
                        selecting: s.element
                    }) : i._trigger("unselecting", e, {
                        unselecting: s.element
                    }), !1) : void 0
                }))
            },
            _mouseDrag: function(e) {
                if (this.dragged = !0, !this.options.disabled) {
                    var i, n = this,
                        s = this.options,
                        o = this.opos[0],
                        a = this.opos[1],
                        r = e.pageX,
                        l = e.pageY;
                    return o > r && (i = r, r = o, o = i), a > l && (i = l, l = a, a = i), this.helper.css({
                        left: o,
                        top: a,
                        width: r - o,
                        height: l - a
                    }), this.selectees.each(function() {
                        var i = t.data(this, "selectable-item"),
                            h = !1;
                        i && i.element !== n.element[0] && ("touch" === s.tolerance ? h = !(i.left > r || i.right < o || i.top > l || i.bottom < a) : "fit" === s.tolerance && (h = i.left > o && i.right < r && i.top > a && i.bottom < l), h ? (i.selected && (i.$element.removeClass("ui-selected"), i.selected = !1), i.unselecting && (i.$element.removeClass("ui-unselecting"), i.unselecting = !1), i.selecting || (i.$element.addClass("ui-selecting"), i.selecting = !0, n._trigger("selecting", e, {
                            selecting: i.element
                        }))) : (i.selecting && ((e.metaKey || e.ctrlKey) && i.startselected ? (i.$element.removeClass("ui-selecting"), i.selecting = !1, i.$element.addClass("ui-selected"), i.selected = !0) : (i.$element.removeClass("ui-selecting"), i.selecting = !1, i.startselected && (i.$element.addClass("ui-unselecting"), i.unselecting = !0), n._trigger("unselecting", e, {
                            unselecting: i.element
                        }))), i.selected && (e.metaKey || e.ctrlKey || i.startselected || (i.$element.removeClass("ui-selected"), i.selected = !1, i.$element.addClass("ui-unselecting"), i.unselecting = !0, n._trigger("unselecting", e, {
                            unselecting: i.element
                        })))))
                    }), !1
                }
            },
            _mouseStop: function(e) {
                var i = this;
                return this.dragged = !1, t(".ui-unselecting", this.element[0]).each(function() {
                    var n = t.data(this, "selectable-item");
                    n.$element.removeClass("ui-unselecting"), n.unselecting = !1, n.startselected = !1, i._trigger("unselected", e, {
                        unselected: n.element
                    })
                }), t(".ui-selecting", this.element[0]).each(function() {
                    var n = t.data(this, "selectable-item");
                    n.$element.removeClass("ui-selecting").addClass("ui-selected"), n.selecting = !1, n.selected = !0, n.startselected = !0, i._trigger("selected", e, {
                        selected: n.element
                    })
                }), this._trigger("stop", e), this.helper.remove(), !1
            }
        }), t.widget("ui.sortable", t.ui.mouse, {
            version: "1.11.2",
            widgetEventPrefix: "sort",
            ready: !1,
            options: {
                appendTo: "parent",
                axis: !1,
                connectWith: !1,
                containment: !1,
                cursor: "auto",
                cursorAt: !1,
                dropOnEmpty: !0,
                forcePlaceholderSize: !1,
                forceHelperSize: !1,
                grid: !1,
                handle: !1,
                helper: "original",
                items: "> *",
                opacity: !1,
                placeholder: !1,
                revert: !1,
                scroll: !0,
                scrollSensitivity: 20,
                scrollSpeed: 20,
                scope: "default",
                tolerance: "intersect",
                zIndex: 1e3,
                activate: null,
                beforeStop: null,
                change: null,
                deactivate: null,
                out: null,
                over: null,
                receive: null,
                remove: null,
                sort: null,
                start: null,
                stop: null,
                update: null
            },
            _isOverAxis: function(t, e, i) {
                return t >= e && e + i > t
            },
            _isFloating: function(t) {
                return /left|right/.test(t.css("float")) || /inline|table-cell/.test(t.css("display"))
            },
            _create: function() {
                var t = this.options;
                this.containerCache = {}, this.element.addClass("ui-sortable"), this.refresh(), this.floating = this.items.length ? "x" === t.axis || this._isFloating(this.items[0].item) : !1, this.offset = this.element.offset(), this._mouseInit(), this._setHandleClassName(), this.ready = !0
            },
            _setOption: function(t, e) {
                this._super(t, e), "handle" === t && this._setHandleClassName()
            },
            _setHandleClassName: function() {
                this.element.find(".ui-sortable-handle").removeClass("ui-sortable-handle"), t.each(this.items, function() {
                    (this.instance.options.handle ? this.item.find(this.instance.options.handle) : this.item).addClass("ui-sortable-handle")
                })
            },
            _destroy: function() {
                this.element.removeClass("ui-sortable ui-sortable-disabled").find(".ui-sortable-handle").removeClass("ui-sortable-handle"), this._mouseDestroy();
                for (var t = this.items.length - 1; t >= 0; t--) this.items[t].item.removeData(this.widgetName + "-item");
                return this
            },
            _mouseCapture: function(e, i) {
                var n = null,
                    s = !1,
                    o = this;
                return this.reverting ? !1 : this.options.disabled || "static" === this.options.type ? !1 : (this._refreshItems(e), t(e.target).parents().each(function() {
                    return t.data(this, o.widgetName + "-item") === o ? (n = t(this), !1) : void 0
                }), t.data(e.target, o.widgetName + "-item") === o && (n = t(e.target)), n && (!this.options.handle || i || (t(this.options.handle, n).find("*").addBack().each(function() {
                    this === e.target && (s = !0)
                }), s)) ? (this.currentItem = n, this._removeCurrentsFromItems(), !0) : !1)
            },
            _mouseStart: function(e, i, n) {
                var s, o, a = this.options;
                if (this.currentContainer = this, this.refreshPositions(), this.helper = this._createHelper(e), this._cacheHelperProportions(), this._cacheMargins(), this.scrollParent = this.helper.scrollParent(), this.offset = this.currentItem.offset(), this.offset = {
                    top: this.offset.top - this.margins.top,
                    left: this.offset.left - this.margins.left
                }, t.extend(this.offset, {
                    click: {
                        left: e.pageX - this.offset.left,
                        top: e.pageY - this.offset.top
                    },
                    parent: this._getParentOffset(),
                    relative: this._getRelativeOffset()
                }), this.helper.css("position", "absolute"), this.cssPosition = this.helper.css("position"), this.originalPosition = this._generatePosition(e), this.originalPageX = e.pageX, this.originalPageY = e.pageY, a.cursorAt && this._adjustOffsetFromHelper(a.cursorAt), this.domPosition = {
                    prev: this.currentItem.prev()[0],
                    parent: this.currentItem.parent()[0]
                }, this.helper[0] !== this.currentItem[0] && this.currentItem.hide(), this._createPlaceholder(), a.containment && this._setContainment(), a.cursor && "auto" !== a.cursor && (o = this.document.find("body"), this.storedCursor = o.css("cursor"), o.css("cursor", a.cursor), this.storedStylesheet = t("<style>*{ cursor: " + a.cursor + " !important; }</style>").appendTo(o)), a.opacity && (this.helper.css("opacity") && (this._storedOpacity = this.helper.css("opacity")), this.helper.css("opacity", a.opacity)), a.zIndex && (this.helper.css("zIndex") && (this._storedZIndex = this.helper.css("zIndex")), this.helper.css("zIndex", a.zIndex)), this.scrollParent[0] !== document && "HTML" !== this.scrollParent[0].tagName && (this.overflowOffset = this.scrollParent.offset()), this._trigger("start", e, this._uiHash()), this._preserveHelperProportions || this._cacheHelperProportions(), !n)
                    for (s = this.containers.length - 1; s >= 0; s--) this.containers[s]._trigger("activate", e, this._uiHash(this));
                return t.ui.ddmanager && (t.ui.ddmanager.current = this), t.ui.ddmanager && !a.dropBehaviour && t.ui.ddmanager.prepareOffsets(this, e), this.dragging = !0, this.helper.addClass("ui-sortable-helper"), this._mouseDrag(e), !0
            },
            _mouseDrag: function(e) {
                var i, n, s, o, a = this.options,
                    r = !1;
                for (this.position = this._generatePosition(e), this.positionAbs = this._convertPositionTo("absolute"), this.lastPositionAbs || (this.lastPositionAbs = this.positionAbs), this.options.scroll && (this.scrollParent[0] !== document && "HTML" !== this.scrollParent[0].tagName ? (this.overflowOffset.top + this.scrollParent[0].offsetHeight - e.pageY < a.scrollSensitivity ? this.scrollParent[0].scrollTop = r = this.scrollParent[0].scrollTop + a.scrollSpeed : e.pageY - this.overflowOffset.top < a.scrollSensitivity && (this.scrollParent[0].scrollTop = r = this.scrollParent[0].scrollTop - a.scrollSpeed),
                    this.overflowOffset.left + this.scrollParent[0].offsetWidth - e.pageX < a.scrollSensitivity ? this.scrollParent[0].scrollLeft = r = this.scrollParent[0].scrollLeft + a.scrollSpeed : e.pageX - this.overflowOffset.left < a.scrollSensitivity && (this.scrollParent[0].scrollLeft = r = this.scrollParent[0].scrollLeft - a.scrollSpeed)) : (e.pageY - t(document).scrollTop() < a.scrollSensitivity ? r = t(document).scrollTop(t(document).scrollTop() - a.scrollSpeed) : t(window).height() - (e.pageY - t(document).scrollTop()) < a.scrollSensitivity && (r = t(document).scrollTop(t(document).scrollTop() + a.scrollSpeed)), e.pageX - t(document).scrollLeft() < a.scrollSensitivity ? r = t(document).scrollLeft(t(document).scrollLeft() - a.scrollSpeed) : t(window).width() - (e.pageX - t(document).scrollLeft()) < a.scrollSensitivity && (r = t(document).scrollLeft(t(document).scrollLeft() + a.scrollSpeed))), r !== !1 && t.ui.ddmanager && !a.dropBehaviour && t.ui.ddmanager.prepareOffsets(this, e)), this.positionAbs = this._convertPositionTo("absolute"), this.options.axis && "y" === this.options.axis || (this.helper[0].style.left = this.position.left + "px"), this.options.axis && "x" === this.options.axis || (this.helper[0].style.top = this.position.top + "px"), i = this.items.length - 1; i >= 0; i--)
                    if (n = this.items[i], s = n.item[0], o = this._intersectsWithPointer(n), o && n.instance === this.currentContainer && s !== this.currentItem[0] && this.placeholder[1 === o ? "next" : "prev"]()[0] !== s && !t.contains(this.placeholder[0], s) && ("semi-dynamic" === this.options.type ? !t.contains(this.element[0], s) : !0)) {
                        if (this.direction = 1 === o ? "down" : "up", "pointer" !== this.options.tolerance && !this._intersectsWithSides(n)) break;
                        this._rearrange(e, n), this._trigger("change", e, this._uiHash());
                        break
                    }
                return this._contactContainers(e), t.ui.ddmanager && t.ui.ddmanager.drag(this, e), this._trigger("sort", e, this._uiHash()), this.lastPositionAbs = this.positionAbs, !1
            },
            _mouseStop: function(e, i) {
                if (e) {
                    if (t.ui.ddmanager && !this.options.dropBehaviour && t.ui.ddmanager.drop(this, e), this.options.revert) {
                        var n = this,
                            s = this.placeholder.offset(),
                            o = this.options.axis,
                            a = {};
                        o && "x" !== o || (a.left = s.left - this.offset.parent.left - this.margins.left + (this.offsetParent[0] === document.body ? 0 : this.offsetParent[0].scrollLeft)), o && "y" !== o || (a.top = s.top - this.offset.parent.top - this.margins.top + (this.offsetParent[0] === document.body ? 0 : this.offsetParent[0].scrollTop)), this.reverting = !0, t(this.helper).animate(a, parseInt(this.options.revert, 10) || 500, function() {
                            n._clear(e)
                        })
                    } else this._clear(e, i);
                    return !1
                }
            },
            cancel: function() {
                if (this.dragging) {
                    this._mouseUp({
                        target: null
                    }), "original" === this.options.helper ? this.currentItem.css(this._storedCSS).removeClass("ui-sortable-helper") : this.currentItem.show();
                    for (var e = this.containers.length - 1; e >= 0; e--) this.containers[e]._trigger("deactivate", null, this._uiHash(this)), this.containers[e].containerCache.over && (this.containers[e]._trigger("out", null, this._uiHash(this)), this.containers[e].containerCache.over = 0)
                }
                return this.placeholder && (this.placeholder[0].parentNode && this.placeholder[0].parentNode.removeChild(this.placeholder[0]), "original" !== this.options.helper && this.helper && this.helper[0].parentNode && this.helper.remove(), t.extend(this, {
                    helper: null,
                    dragging: !1,
                    reverting: !1,
                    _noFinalSort: null
                }), this.domPosition.prev ? t(this.domPosition.prev).after(this.currentItem) : t(this.domPosition.parent).prepend(this.currentItem)), this
            },
            serialize: function(e) {
                var i = this._getItemsAsjQuery(e && e.connected),
                    n = [];
                return e = e || {}, t(i).each(function() {
                    var i = (t(e.item || this).attr(e.attribute || "id") || "").match(e.expression || /(.+)[\-=_](.+)/);
                    i && n.push((e.key || i[1] + "[]") + "=" + (e.key && e.expression ? i[1] : i[2]))
                }), !n.length && e.key && n.push(e.key + "="), n.join("&")
            },
            toArray: function(e) {
                var i = this._getItemsAsjQuery(e && e.connected),
                    n = [];
                return e = e || {}, i.each(function() {
                    n.push(t(e.item || this).attr(e.attribute || "id") || "")
                }), n
            },
            _intersectsWith: function(t) {
                var e = this.positionAbs.left,
                    i = e + this.helperProportions.width,
                    n = this.positionAbs.top,
                    s = n + this.helperProportions.height,
                    o = t.left,
                    a = o + t.width,
                    r = t.top,
                    l = r + t.height,
                    h = this.offset.click.top,
                    c = this.offset.click.left,
                    u = "x" === this.options.axis || n + h > r && l > n + h,
                    d = "y" === this.options.axis || e + c > o && a > e + c,
                    p = u && d;
                return "pointer" === this.options.tolerance || this.options.forcePointerForContainers || "pointer" !== this.options.tolerance && this.helperProportions[this.floating ? "width" : "height"] > t[this.floating ? "width" : "height"] ? p : o < e + this.helperProportions.width / 2 && i - this.helperProportions.width / 2 < a && r < n + this.helperProportions.height / 2 && s - this.helperProportions.height / 2 < l
            },
            _intersectsWithPointer: function(t) {
                var e = "x" === this.options.axis || this._isOverAxis(this.positionAbs.top + this.offset.click.top, t.top, t.height),
                    i = "y" === this.options.axis || this._isOverAxis(this.positionAbs.left + this.offset.click.left, t.left, t.width),
                    n = e && i,
                    s = this._getDragVerticalDirection(),
                    o = this._getDragHorizontalDirection();
                return n ? this.floating ? o && "right" === o || "down" === s ? 2 : 1 : s && ("down" === s ? 2 : 1) : !1
            },
            _intersectsWithSides: function(t) {
                var e = this._isOverAxis(this.positionAbs.top + this.offset.click.top, t.top + t.height / 2, t.height),
                    i = this._isOverAxis(this.positionAbs.left + this.offset.click.left, t.left + t.width / 2, t.width),
                    n = this._getDragVerticalDirection(),
                    s = this._getDragHorizontalDirection();
                return this.floating && s ? "right" === s && i || "left" === s && !i : n && ("down" === n && e || "up" === n && !e)
            },
            _getDragVerticalDirection: function() {
                var t = this.positionAbs.top - this.lastPositionAbs.top;
                return 0 !== t && (t > 0 ? "down" : "up")
            },
            _getDragHorizontalDirection: function() {
                var t = this.positionAbs.left - this.lastPositionAbs.left;
                return 0 !== t && (t > 0 ? "right" : "left")
            },
            refresh: function(t) {
                return this._refreshItems(t), this._setHandleClassName(), this.refreshPositions(), this
            },
            _connectWith: function() {
                var t = this.options;
                return t.connectWith.constructor === String ? [t.connectWith] : t.connectWith
            },
            _getItemsAsjQuery: function(e) {
                function i() {
                    r.push(this)
                }
                var n, s, o, a, r = [],
                    l = [],
                    h = this._connectWith();
                if (h && e)
                    for (n = h.length - 1; n >= 0; n--)
                        for (o = t(h[n]), s = o.length - 1; s >= 0; s--) a = t.data(o[s], this.widgetFullName), a && a !== this && !a.options.disabled && l.push([t.isFunction(a.options.items) ? a.options.items.call(a.element) : t(a.options.items, a.element).not(".ui-sortable-helper").not(".ui-sortable-placeholder"), a]);
                for (l.push([t.isFunction(this.options.items) ? this.options.items.call(this.element, null, {
                    options: this.options,
                    item: this.currentItem
                }) : t(this.options.items, this.element).not(".ui-sortable-helper").not(".ui-sortable-placeholder"), this]), n = l.length - 1; n >= 0; n--) l[n][0].each(i);
                return t(r)
            },
            _removeCurrentsFromItems: function() {
                var e = this.currentItem.find(":data(" + this.widgetName + "-item)");
                this.items = t.grep(this.items, function(t) {
                    for (var i = 0; i < e.length; i++)
                        if (e[i] === t.item[0]) return !1;
                    return !0
                })
            },
            _refreshItems: function(e) {
                this.items = [], this.containers = [this];
                var i, n, s, o, a, r, l, h, c = this.items,
                    u = [
                        [t.isFunction(this.options.items) ? this.options.items.call(this.element[0], e, {
                            item: this.currentItem
                        }) : t(this.options.items, this.element), this]
                    ],
                    d = this._connectWith();
                if (d && this.ready)
                    for (i = d.length - 1; i >= 0; i--)
                        for (s = t(d[i]), n = s.length - 1; n >= 0; n--) o = t.data(s[n], this.widgetFullName), o && o !== this && !o.options.disabled && (u.push([t.isFunction(o.options.items) ? o.options.items.call(o.element[0], e, {
                            item: this.currentItem
                        }) : t(o.options.items, o.element), o]), this.containers.push(o));
                for (i = u.length - 1; i >= 0; i--)
                    for (a = u[i][1], r = u[i][0], n = 0, h = r.length; h > n; n++) l = t(r[n]), l.data(this.widgetName + "-item", a), c.push({
                        item: l,
                        instance: a,
                        width: 0,
                        height: 0,
                        left: 0,
                        top: 0
                    })
            },
            refreshPositions: function(e) {
                this.offsetParent && this.helper && (this.offset.parent = this._getParentOffset());
                var i, n, s, o;
                for (i = this.items.length - 1; i >= 0; i--) n = this.items[i], n.instance !== this.currentContainer && this.currentContainer && n.item[0] !== this.currentItem[0] || (s = this.options.toleranceElement ? t(this.options.toleranceElement, n.item) : n.item, e || (n.width = s.outerWidth(), n.height = s.outerHeight()), o = s.offset(), n.left = o.left, n.top = o.top);
                if (this.options.custom && this.options.custom.refreshContainers) this.options.custom.refreshContainers.call(this);
                else
                    for (i = this.containers.length - 1; i >= 0; i--) o = this.containers[i].element.offset(), this.containers[i].containerCache.left = o.left, this.containers[i].containerCache.top = o.top, this.containers[i].containerCache.width = this.containers[i].element.outerWidth(), this.containers[i].containerCache.height = this.containers[i].element.outerHeight();
                return this
            },
            _createPlaceholder: function(e) {
                e = e || this;
                var i, n = e.options;
                n.placeholder && n.placeholder.constructor !== String || (i = n.placeholder, n.placeholder = {
                    element: function() {
                        var n = e.currentItem[0].nodeName.toLowerCase(),
                            s = t("<" + n + ">", e.document[0]).addClass(i || e.currentItem[0].className + " ui-sortable-placeholder").removeClass("ui-sortable-helper");
                        return "tr" === n ? e.currentItem.children().each(function() {
                            t("<td>&#160;</td>", e.document[0]).attr("colspan", t(this).attr("colspan") || 1).appendTo(s)
                        }) : "img" === n && s.attr("src", e.currentItem.attr("src")), i || s.css("visibility", "hidden"), s
                    },
                    update: function(t, s) {
                        (!i || n.forcePlaceholderSize) && (s.height() || s.height(e.currentItem.innerHeight() - parseInt(e.currentItem.css("paddingTop") || 0, 10) - parseInt(e.currentItem.css("paddingBottom") || 0, 10)), s.width() || s.width(e.currentItem.innerWidth() - parseInt(e.currentItem.css("paddingLeft") || 0, 10) - parseInt(e.currentItem.css("paddingRight") || 0, 10)))
                    }
                }), e.placeholder = t(n.placeholder.element.call(e.element, e.currentItem)), e.currentItem.after(e.placeholder), n.placeholder.update(e, e.placeholder)
            },
            _contactContainers: function(e) {
                var i, n, s, o, a, r, l, h, c, u, d = null,
                    p = null;
                for (i = this.containers.length - 1; i >= 0; i--)
                    if (!t.contains(this.currentItem[0], this.containers[i].element[0]))
                        if (this._intersectsWith(this.containers[i].containerCache)) {
                            if (d && t.contains(this.containers[i].element[0], d.element[0])) continue;
                            d = this.containers[i], p = i
                        } else this.containers[i].containerCache.over && (this.containers[i]._trigger("out", e, this._uiHash(this)), this.containers[i].containerCache.over = 0);
                if (d)
                    if (1 === this.containers.length) this.containers[p].containerCache.over || (this.containers[p]._trigger("over", e, this._uiHash(this)), this.containers[p].containerCache.over = 1);
                    else {
                        for (s = 1e4, o = null, c = d.floating || this._isFloating(this.currentItem), a = c ? "left" : "top", r = c ? "width" : "height", u = c ? "clientX" : "clientY", n = this.items.length - 1; n >= 0; n--) t.contains(this.containers[p].element[0], this.items[n].item[0]) && this.items[n].item[0] !== this.currentItem[0] && (l = this.items[n].item.offset()[a], h = !1, e[u] - l > this.items[n][r] / 2 && (h = !0), Math.abs(e[u] - l) < s && (s = Math.abs(e[u] - l), o = this.items[n], this.direction = h ? "up" : "down"));
                        if (!o && !this.options.dropOnEmpty) return;
                        if (this.currentContainer === this.containers[p]) return void(this.currentContainer.containerCache.over || (this.containers[p]._trigger("over", e, this._uiHash()), this.currentContainer.containerCache.over = 1));
                        o ? this._rearrange(e, o, null, !0) : this._rearrange(e, null, this.containers[p].element, !0), this._trigger("change", e, this._uiHash()), this.containers[p]._trigger("change", e, this._uiHash(this)), this.currentContainer = this.containers[p], this.options.placeholder.update(this.currentContainer, this.placeholder), this.containers[p]._trigger("over", e, this._uiHash(this)), this.containers[p].containerCache.over = 1
                    }
            },
            _createHelper: function(e) {
                var i = this.options,
                    n = t.isFunction(i.helper) ? t(i.helper.apply(this.element[0], [e, this.currentItem])) : "clone" === i.helper ? this.currentItem.clone() : this.currentItem;
                return n.parents("body").length || t("parent" !== i.appendTo ? i.appendTo : this.currentItem[0].parentNode)[0].appendChild(n[0]), n[0] === this.currentItem[0] && (this._storedCSS = {
                    width: this.currentItem[0].style.width,
                    height: this.currentItem[0].style.height,
                    position: this.currentItem.css("position"),
                    top: this.currentItem.css("top"),
                    left: this.currentItem.css("left")
                }), (!n[0].style.width || i.forceHelperSize) && n.width(this.currentItem.width()), (!n[0].style.height || i.forceHelperSize) && n.height(this.currentItem.height()), n
            },
            _adjustOffsetFromHelper: function(e) {
                "string" == typeof e && (e = e.split(" ")), t.isArray(e) && (e = {
                    left: +e[0],
                    top: +e[1] || 0
                }), "left" in e && (this.offset.click.left = e.left + this.margins.left), "right" in e && (this.offset.click.left = this.helperProportions.width - e.right + this.margins.left), "top" in e && (this.offset.click.top = e.top + this.margins.top), "bottom" in e && (this.offset.click.top = this.helperProportions.height - e.bottom + this.margins.top)
            },
            _getParentOffset: function() {
                this.offsetParent = this.helper.offsetParent();
                var e = this.offsetParent.offset();
                return "absolute" === this.cssPosition && this.scrollParent[0] !== document && t.contains(this.scrollParent[0], this.offsetParent[0]) && (e.left += this.scrollParent.scrollLeft(), e.top += this.scrollParent.scrollTop()), (this.offsetParent[0] === document.body || this.offsetParent[0].tagName && "html" === this.offsetParent[0].tagName.toLowerCase() && t.ui.ie) && (e = {
                    top: 0,
                    left: 0
                }), {
                    top: e.top + (parseInt(this.offsetParent.css("borderTopWidth"), 10) || 0),
                    left: e.left + (parseInt(this.offsetParent.css("borderLeftWidth"), 10) || 0)
                }
            },
            _getRelativeOffset: function() {
                if ("relative" === this.cssPosition) {
                    var t = this.currentItem.position();
                    return {
                        top: t.top - (parseInt(this.helper.css("top"), 10) || 0) + this.scrollParent.scrollTop(),
                        left: t.left - (parseInt(this.helper.css("left"), 10) || 0) + this.scrollParent.scrollLeft()
                    }
                }
                return {
                    top: 0,
                    left: 0
                }
            },
            _cacheMargins: function() {
                this.margins = {
                    left: parseInt(this.currentItem.css("marginLeft"), 10) || 0,
                    top: parseInt(this.currentItem.css("marginTop"), 10) || 0
                }
            },
            _cacheHelperProportions: function() {
                this.helperProportions = {
                    width: this.helper.outerWidth(),
                    height: this.helper.outerHeight()
                }
            },
            _setContainment: function() {
                var e, i, n, s = this.options;
                "parent" === s.containment && (s.containment = this.helper[0].parentNode), ("document" === s.containment || "window" === s.containment) && (this.containment = [0 - this.offset.relative.left - this.offset.parent.left, 0 - this.offset.relative.top - this.offset.parent.top, t("document" === s.containment ? document : window).width() - this.helperProportions.width - this.margins.left, (t("document" === s.containment ? document : window).height() || document.body.parentNode.scrollHeight) - this.helperProportions.height - this.margins.top]), /^(document|window|parent)$/.test(s.containment) || (e = t(s.containment)[0], i = t(s.containment).offset(), n = "hidden" !== t(e).css("overflow"), this.containment = [i.left + (parseInt(t(e).css("borderLeftWidth"), 10) || 0) + (parseInt(t(e).css("paddingLeft"), 10) || 0) - this.margins.left, i.top + (parseInt(t(e).css("borderTopWidth"), 10) || 0) + (parseInt(t(e).css("paddingTop"), 10) || 0) - this.margins.top, i.left + (n ? Math.max(e.scrollWidth, e.offsetWidth) : e.offsetWidth) - (parseInt(t(e).css("borderLeftWidth"), 10) || 0) - (parseInt(t(e).css("paddingRight"), 10) || 0) - this.helperProportions.width - this.margins.left, i.top + (n ? Math.max(e.scrollHeight, e.offsetHeight) : e.offsetHeight) - (parseInt(t(e).css("borderTopWidth"), 10) || 0) - (parseInt(t(e).css("paddingBottom"), 10) || 0) - this.helperProportions.height - this.margins.top])
            },
            _convertPositionTo: function(e, i) {
                i || (i = this.position);
                var n = "absolute" === e ? 1 : -1,
                    s = "absolute" !== this.cssPosition || this.scrollParent[0] !== document && t.contains(this.scrollParent[0], this.offsetParent[0]) ? this.scrollParent : this.offsetParent,
                    o = /(html|body)/i.test(s[0].tagName);
                return {
                    top: i.top + this.offset.relative.top * n + this.offset.parent.top * n - ("fixed" === this.cssPosition ? -this.scrollParent.scrollTop() : o ? 0 : s.scrollTop()) * n,
                    left: i.left + this.offset.relative.left * n + this.offset.parent.left * n - ("fixed" === this.cssPosition ? -this.scrollParent.scrollLeft() : o ? 0 : s.scrollLeft()) * n
                }
            },
            _generatePosition: function(e) {
                var i, n, s = this.options,
                    o = e.pageX,
                    a = e.pageY,
                    r = "absolute" !== this.cssPosition || this.scrollParent[0] !== document && t.contains(this.scrollParent[0], this.offsetParent[0]) ? this.scrollParent : this.offsetParent,
                    l = /(html|body)/i.test(r[0].tagName);
                return "relative" !== this.cssPosition || this.scrollParent[0] !== document && this.scrollParent[0] !== this.offsetParent[0] || (this.offset.relative = this._getRelativeOffset()), this.originalPosition && (this.containment && (e.pageX - this.offset.click.left < this.containment[0] && (o = this.containment[0] + this.offset.click.left), e.pageY - this.offset.click.top < this.containment[1] && (a = this.containment[1] + this.offset.click.top), e.pageX - this.offset.click.left > this.containment[2] && (o = this.containment[2] + this.offset.click.left), e.pageY - this.offset.click.top > this.containment[3] && (a = this.containment[3] + this.offset.click.top)), s.grid && (i = this.originalPageY + Math.round((a - this.originalPageY) / s.grid[1]) * s.grid[1], a = this.containment ? i - this.offset.click.top >= this.containment[1] && i - this.offset.click.top <= this.containment[3] ? i : i - this.offset.click.top >= this.containment[1] ? i - s.grid[1] : i + s.grid[1] : i, n = this.originalPageX + Math.round((o - this.originalPageX) / s.grid[0]) * s.grid[0], o = this.containment ? n - this.offset.click.left >= this.containment[0] && n - this.offset.click.left <= this.containment[2] ? n : n - this.offset.click.left >= this.containment[0] ? n - s.grid[0] : n + s.grid[0] : n)), {
                    top: a - this.offset.click.top - this.offset.relative.top - this.offset.parent.top + ("fixed" === this.cssPosition ? -this.scrollParent.scrollTop() : l ? 0 : r.scrollTop()),
                    left: o - this.offset.click.left - this.offset.relative.left - this.offset.parent.left + ("fixed" === this.cssPosition ? -this.scrollParent.scrollLeft() : l ? 0 : r.scrollLeft())
                }
            },
            _rearrange: function(t, e, i, n) {
                i ? i[0].appendChild(this.placeholder[0]) : e.item[0].parentNode.insertBefore(this.placeholder[0], "down" === this.direction ? e.item[0] : e.item[0].nextSibling), this.counter = this.counter ? ++this.counter : 1;
                var s = this.counter;
                this._delay(function() {
                    s === this.counter && this.refreshPositions(!n)
                })
            },
            _clear: function(t, e) {
                function i(t, e, i) {
                    return function(n) {
                        i._trigger(t, n, e._uiHash(e))
                    }
                }
                this.reverting = !1;
                var n, s = [];
                if (!this._noFinalSort && this.currentItem.parent().length && this.placeholder.before(this.currentItem), this._noFinalSort = null, this.helper[0] === this.currentItem[0]) {
                    for (n in this._storedCSS)("auto" === this._storedCSS[n] || "static" === this._storedCSS[n]) && (this._storedCSS[n] = "");
                    this.currentItem.css(this._storedCSS).removeClass("ui-sortable-helper")
                } else this.currentItem.show();
                for (this.fromOutside && !e && s.push(function(t) {
                    this._trigger("receive", t, this._uiHash(this.fromOutside))
                }), !this.fromOutside && this.domPosition.prev === this.currentItem.prev().not(".ui-sortable-helper")[0] && this.domPosition.parent === this.currentItem.parent()[0] || e || s.push(function(t) {
                    this._trigger("update", t, this._uiHash())
                }), this !== this.currentContainer && (e || (s.push(function(t) {
                    this._trigger("remove", t, this._uiHash())
                }), s.push(function(t) {
                    return function(e) {
                        t._trigger("receive", e, this._uiHash(this))
                    }
                }.call(this, this.currentContainer)), s.push(function(t) {
                    return function(e) {
                        t._trigger("update", e, this._uiHash(this))
                    }
                }.call(this, this.currentContainer)))), n = this.containers.length - 1; n >= 0; n--) e || s.push(i("deactivate", this, this.containers[n])), this.containers[n].containerCache.over && (s.push(i("out", this, this.containers[n])), this.containers[n].containerCache.over = 0);
                if (this.storedCursor && (this.document.find("body").css("cursor", this.storedCursor), this.storedStylesheet.remove()), this._storedOpacity && this.helper.css("opacity", this._storedOpacity), this._storedZIndex && this.helper.css("zIndex", "auto" === this._storedZIndex ? "" : this._storedZIndex), this.dragging = !1, e || this._trigger("beforeStop", t, this._uiHash()), this.placeholder[0].parentNode.removeChild(this.placeholder[0]), this.cancelHelperRemoval || (this.helper[0] !== this.currentItem[0] && this.helper.remove(), this.helper = null), !e) {
                    for (n = 0; n < s.length; n++) s[n].call(this, t);
                    this._trigger("stop", t, this._uiHash())
                }
                return this.fromOutside = !1, !this.cancelHelperRemoval
            },
            _trigger: function() {
                t.Widget.prototype._trigger.apply(this, arguments) === !1 && this.cancel()
            },
            _uiHash: function(e) {
                var i = e || this;
                return {
                    helper: i.helper,
                    placeholder: i.placeholder || t([]),
                    position: i.position,
                    originalPosition: i.originalPosition,
                    offset: i.positionAbs,
                    item: i.currentItem,
                    sender: e ? e.element : null
                }
            }
        }), t.widget("ui.accordion", {
            version: "1.11.2",
            options: {
                active: 0,
                animate: {},
                collapsible: !1,
                event: "click",
                header: "> li > :first-child,> :not(li):even",
                heightStyle: "auto",
                icons: {
                    activeHeader: "ui-icon-triangle-1-s",
                    header: "ui-icon-triangle-1-e"
                },
                activate: null,
                beforeActivate: null
            },
            hideProps: {
                borderTopWidth: "hide",
                borderBottomWidth: "hide",
                paddingTop: "hide",
                paddingBottom: "hide",
                height: "hide"
            },
            showProps: {
                borderTopWidth: "show",
                borderBottomWidth: "show",
                paddingTop: "show",
                paddingBottom: "show",
                height: "show"
            },
            _create: function() {
                var e = this.options;
                this.prevShow = this.prevHide = t(), this.element.addClass("ui-accordion ui-widget ui-helper-reset").attr("role", "tablist"), e.collapsible || e.active !== !1 && null != e.active || (e.active = 0), this._processPanels(), e.active < 0 && (e.active += this.headers.length), this._refresh()
            },
            _getCreateEventData: function() {
                return {
                    header: this.active,
                    panel: this.active.length ? this.active.next() : t()
                }
            },
            _createIcons: function() {
                var e = this.options.icons;
                e && (t("<span>").addClass("ui-accordion-header-icon ui-icon " + e.header).prependTo(this.headers), this.active.children(".ui-accordion-header-icon").removeClass(e.header).addClass(e.activeHeader), this.headers.addClass("ui-accordion-icons"))
            },
            _destroyIcons: function() {
                this.headers.removeClass("ui-accordion-icons").children(".ui-accordion-header-icon").remove()
            },
            _destroy: function() {
                var t;
                this.element.removeClass("ui-accordion ui-widget ui-helper-reset").removeAttr("role"), this.headers.removeClass("ui-accordion-header ui-accordion-header-active ui-state-default ui-corner-all ui-state-active ui-state-disabled ui-corner-top").removeAttr("role").removeAttr("aria-expanded").removeAttr("aria-selected").removeAttr("aria-controls").removeAttr("tabIndex").removeUniqueId(), this._destroyIcons(), t = this.headers.next().removeClass("ui-helper-reset ui-widget-content ui-corner-bottom ui-accordion-content ui-accordion-content-active ui-state-disabled").css("display", "").removeAttr("role").removeAttr("aria-hidden").removeAttr("aria-labelledby").removeUniqueId(), "content" !== this.options.heightStyle && t.css("height", "")
            },
            _setOption: function(t, e) {
                return "active" === t ? void this._activate(e) : ("event" === t && (this.options.event && this._off(this.headers, this.options.event), this._setupEvents(e)), this._super(t, e), "collapsible" !== t || e || this.options.active !== !1 || this._activate(0), "icons" === t && (this._destroyIcons(), e && this._createIcons()), void("disabled" === t && (this.element.toggleClass("ui-state-disabled", !!e).attr("aria-disabled", e), this.headers.add(this.headers.next()).toggleClass("ui-state-disabled", !!e))))
            },
            _keydown: function(e) {
                if (!e.altKey && !e.ctrlKey) {
                    var i = t.ui.keyCode,
                        n = this.headers.length,
                        s = this.headers.index(e.target),
                        o = !1;
                    switch (e.keyCode) {
                        case i.RIGHT:
                        case i.DOWN:
                            o = this.headers[(s + 1) % n];
                            break;
                        case i.LEFT:
                        case i.UP:
                            o = this.headers[(s - 1 + n) % n];
                            break;
                        case i.SPACE:
                        case i.ENTER:
                            this._eventHandler(e);
                            break;
                        case i.HOME:
                            o = this.headers[0];
                            break;
                        case i.END:
                            o = this.headers[n - 1]
                    }
                    o && (t(e.target).attr("tabIndex", -1), t(o).attr("tabIndex", 0), o.focus(), e.preventDefault())
                }
            },
            _panelKeyDown: function(e) {
                e.keyCode === t.ui.keyCode.UP && e.ctrlKey && t(e.currentTarget).prev().focus()
            },
            refresh: function() {
                var e = this.options;
                this._processPanels(), e.active === !1 && e.collapsible === !0 || !this.headers.length ? (e.active = !1, this.active = t()) : e.active === !1 ? this._activate(0) : this.active.length && !t.contains(this.element[0], this.active[0]) ? this.headers.length === this.headers.find(".ui-state-disabled").length ? (e.active = !1, this.active = t()) : this._activate(Math.max(0, e.active - 1)) : e.active = this.headers.index(this.active), this._destroyIcons(), this._refresh()
            },
            _processPanels: function() {
                var t = this.headers,
                    e = this.panels;
                this.headers = this.element.find(this.options.header).addClass("ui-accordion-header ui-state-default ui-corner-all"), this.panels = this.headers.next().addClass("ui-accordion-content ui-helper-reset ui-widget-content ui-corner-bottom").filter(":not(.ui-accordion-content-active)").hide(), e && (this._off(t.not(this.headers)), this._off(e.not(this.panels)))
            },
            _refresh: function() {
                var e, i = this.options,
                    n = i.heightStyle,
                    s = this.element.parent();
                this.active = this._findActive(i.active).addClass("ui-accordion-header-active ui-state-active ui-corner-top").removeClass("ui-corner-all"), this.active.next().addClass("ui-accordion-content-active").show(), this.headers.attr("role", "tab").each(function() {
                    var e = t(this),
                        i = e.uniqueId().attr("id"),
                        n = e.next(),
                        s = n.uniqueId().attr("id");
                    e.attr("aria-controls", s), n.attr("aria-labelledby", i)
                }).next().attr("role", "tabpanel"), this.headers.not(this.active).attr({
                    "aria-selected": "false",
                    "aria-expanded": "false",
                    tabIndex: -1
                }).next().attr({
                    "aria-hidden": "true"
                }).hide(), this.active.length ? this.active.attr({
                    "aria-selected": "true",
                    "aria-expanded": "true",
                    tabIndex: 0
                }).next().attr({
                    "aria-hidden": "false"
                }) : this.headers.eq(0).attr("tabIndex", 0), this._createIcons(), this._setupEvents(i.event), "fill" === n ? (e = s.height(), this.element.siblings(":visible").each(function() {
                    var i = t(this),
                        n = i.css("position");
                    "absolute" !== n && "fixed" !== n && (e -= i.outerHeight(!0))
                }), this.headers.each(function() {
                    e -= t(this).outerHeight(!0)
                }), this.headers.next().each(function() {
                    t(this).height(Math.max(0, e - t(this).innerHeight() + t(this).height()))
                }).css("overflow", "auto")) : "auto" === n && (e = 0, this.headers.next().each(function() {
                    e = Math.max(e, t(this).css("height", "").height())
                }).height(e))
            },
            _activate: function(e) {
                var i = this._findActive(e)[0];
                i !== this.active[0] && (i = i || this.active[0], this._eventHandler({
                    target: i,
                    currentTarget: i,
                    preventDefault: t.noop
                }))
            },
            _findActive: function(e) {
                return "number" == typeof e ? this.headers.eq(e) : t()
            },
            _setupEvents: function(e) {
                var i = {
                    keydown: "_keydown"
                };
                e && t.each(e.split(" "), function(t, e) {
                    i[e] = "_eventHandler"
                }), this._off(this.headers.add(this.headers.next())), this._on(this.headers, i), this._on(this.headers.next(), {
                    keydown: "_panelKeyDown"
                }), this._hoverable(this.headers), this._focusable(this.headers)
            },
            _eventHandler: function(e) {
                var i = this.options,
                    n = this.active,
                    s = t(e.currentTarget),
                    o = s[0] === n[0],
                    a = o && i.collapsible,
                    r = a ? t() : s.next(),
                    l = n.next(),
                    h = {
                        oldHeader: n,
                        oldPanel: l,
                        newHeader: a ? t() : s,
                        newPanel: r
                    };
                e.preventDefault(), o && !i.collapsible || this._trigger("beforeActivate", e, h) === !1 || (i.active = a ? !1 : this.headers.index(s), this.active = o ? t() : s, this._toggle(h), n.removeClass("ui-accordion-header-active ui-state-active"), i.icons && n.children(".ui-accordion-header-icon").removeClass(i.icons.activeHeader).addClass(i.icons.header), o || (s.removeClass("ui-corner-all").addClass("ui-accordion-header-active ui-state-active ui-corner-top"), i.icons && s.children(".ui-accordion-header-icon").removeClass(i.icons.header).addClass(i.icons.activeHeader), s.next().addClass("ui-accordion-content-active")))
            },
            _toggle: function(e) {
                var i = e.newPanel,
                    n = this.prevShow.length ? this.prevShow : e.oldPanel;
                this.prevShow.add(this.prevHide).stop(!0, !0), this.prevShow = i, this.prevHide = n, this.options.animate ? this._animate(i, n, e) : (n.hide(), i.show(), this._toggleComplete(e)), n.attr({
                    "aria-hidden": "true"
                }), n.prev().attr("aria-selected", "false"), i.length && n.length ? n.prev().attr({
                    tabIndex: -1,
                    "aria-expanded": "false"
                }) : i.length && this.headers.filter(function() {
                    return 0 === t(this).attr("tabIndex")
                }).attr("tabIndex", -1), i.attr("aria-hidden", "false").prev().attr({
                    "aria-selected": "true",
                    tabIndex: 0,
                    "aria-expanded": "true"
                })
            },
            _animate: function(t, e, i) {
                var n, s, o, a = this,
                    r = 0,
                    l = t.length && (!e.length || t.index() < e.index()),
                    h = this.options.animate || {},
                    c = l && h.down || h,
                    u = function() {
                        a._toggleComplete(i)
                    };
                return "number" == typeof c && (o = c), "string" == typeof c && (s = c), s = s || c.easing || h.easing, o = o || c.duration || h.duration, e.length ? t.length ? (n = t.show().outerHeight(), e.animate(this.hideProps, {
                    duration: o,
                    easing: s,
                    step: function(t, e) {
                        e.now = Math.round(t)
                    }
                }), void t.hide().animate(this.showProps, {
                    duration: o,
                    easing: s,
                    complete: u,
                    step: function(t, i) {
                        i.now = Math.round(t), "height" !== i.prop ? r += i.now : "content" !== a.options.heightStyle && (i.now = Math.round(n - e.outerHeight() - r), r = 0)
                    }
                })) : e.animate(this.hideProps, o, s, u) : t.animate(this.showProps, o, s, u)
            },
            _toggleComplete: function(t) {
                var e = t.oldPanel;
                e.removeClass("ui-accordion-content-active").prev().removeClass("ui-corner-top").addClass("ui-corner-all"), e.length && (e.parent()[0].className = e.parent()[0].className), this._trigger("activate", null, t)
            }
        }), t.widget("ui.menu", {
            version: "1.11.2",
            defaultElement: "<ul>",
            delay: 300,
            options: {
                icons: {
                    submenu: "ui-icon-carat-1-e"
                },
                items: "> *",
                menus: "ul",
                position: {
                    my: "left-1 top",
                    at: "right top"
                },
                role: "menu",
                blur: null,
                focus: null,
                select: null
            },
            _create: function() {
                this.activeMenu = this.element, this.mouseHandled = !1, this.element.uniqueId().addClass("ui-menu ui-widget ui-widget-content").toggleClass("ui-menu-icons", !!this.element.find(".ui-icon").length).attr({
                    role: this.options.role,
                    tabIndex: 0
                }), this.options.disabled && this.element.addClass("ui-state-disabled").attr("aria-disabled", "true"), this._on({
                    "mousedown .ui-menu-item": function(t) {
                        t.preventDefault()
                    },
                    "click .ui-menu-item": function(e) {
                        var i = t(e.target);
                        !this.mouseHandled && i.not(".ui-state-disabled").length && (this.select(e), e.isPropagationStopped() || (this.mouseHandled = !0), i.has(".ui-menu").length ? this.expand(e) : !this.element.is(":focus") && t(this.document[0].activeElement).closest(".ui-menu").length && (this.element.trigger("focus", [!0]), this.active && 1 === this.active.parents(".ui-menu").length && clearTimeout(this.timer)))
                    },
                    "mouseenter .ui-menu-item": function(e) {
                        if (!this.previousFilter) {
                            var i = t(e.currentTarget);
                            i.siblings(".ui-state-active").removeClass("ui-state-active"), this.focus(e, i)
                        }
                    },
                    mouseleave: "collapseAll",
                    "mouseleave .ui-menu": "collapseAll",
                    focus: function(t, e) {
                        var i = this.active || this.element.find(this.options.items).eq(0);
                        e || this.focus(t, i)
                    },
                    blur: function(e) {
                        this._delay(function() {
                            t.contains(this.element[0], this.document[0].activeElement) || this.collapseAll(e)
                        })
                    },
                    keydown: "_keydown"
                }), this.refresh(), this._on(this.document, {
                    click: function(t) {
                        this._closeOnDocumentClick(t) && this.collapseAll(t), this.mouseHandled = !1
                    }
                })
            },
            _destroy: function() {
                this.element.removeAttr("aria-activedescendant").find(".ui-menu").addBack().removeClass("ui-menu ui-widget ui-widget-content ui-menu-icons ui-front").removeAttr("role").removeAttr("tabIndex").removeAttr("aria-labelledby").removeAttr("aria-expanded").removeAttr("aria-hidden").removeAttr("aria-disabled").removeUniqueId().show(), this.element.find(".ui-menu-item").removeClass("ui-menu-item").removeAttr("role").removeAttr("aria-disabled").removeUniqueId().removeClass("ui-state-hover").removeAttr("tabIndex").removeAttr("role").removeAttr("aria-haspopup").children().each(function() {
                    var e = t(this);
                    e.data("ui-menu-submenu-carat") && e.remove()
                }), this.element.find(".ui-menu-divider").removeClass("ui-menu-divider ui-widget-content")
            },
            _keydown: function(e) {
                var i, n, s, o, a = !0;
                switch (e.keyCode) {
                    case t.ui.keyCode.PAGE_UP:
                        this.previousPage(e);
                        break;
                    case t.ui.keyCode.PAGE_DOWN:
                        this.nextPage(e);
                        break;
                    case t.ui.keyCode.HOME:
                        this._move("first", "first", e);
                        break;
                    case t.ui.keyCode.END:
                        this._move("last", "last", e);
                        break;
                    case t.ui.keyCode.UP:
                        this.previous(e);
                        break;
                    case t.ui.keyCode.DOWN:
                        this.next(e);
                        break;
                    case t.ui.keyCode.LEFT:
                        this.collapse(e);
                        break;
                    case t.ui.keyCode.RIGHT:
                        this.active && !this.active.is(".ui-state-disabled") && this.expand(e);
                        break;
                    case t.ui.keyCode.ENTER:
                    case t.ui.keyCode.SPACE:
                        this._activate(e);
                        break;
                    case t.ui.keyCode.ESCAPE:
                        this.collapse(e);
                        break;
                    default:
                        a = !1, n = this.previousFilter || "", s = String.fromCharCode(e.keyCode), o = !1, clearTimeout(this.filterTimer), s === n ? o = !0 : s = n + s, i = this._filterMenuItems(s), i = o && -1 !== i.index(this.active.next()) ? this.active.nextAll(".ui-menu-item") : i, i.length || (s = String.fromCharCode(e.keyCode), i = this._filterMenuItems(s)), i.length ? (this.focus(e, i), this.previousFilter = s, this.filterTimer = this._delay(function() {
                            delete this.previousFilter
                        }, 1e3)) : delete this.previousFilter
                }
                a && e.preventDefault()
            },
            _activate: function(t) {
                this.active.is(".ui-state-disabled") || (this.active.is("[aria-haspopup='true']") ? this.expand(t) : this.select(t))
            },
            refresh: function() {
                var e, i, n = this,
                    s = this.options.icons.submenu,
                    o = this.element.find(this.options.menus);
                this.element.toggleClass("ui-menu-icons", !!this.element.find(".ui-icon").length), o.filter(":not(.ui-menu)").addClass("ui-menu ui-widget ui-widget-content ui-front").hide().attr({
                    role: this.options.role,
                    "aria-hidden": "true",
                    "aria-expanded": "false"
                }).each(function() {
                    var e = t(this),
                        i = e.parent(),
                        n = t("<span>").addClass("ui-menu-icon ui-icon " + s).data("ui-menu-submenu-carat", !0);
                    i.attr("aria-haspopup", "true").prepend(n), e.attr("aria-labelledby", i.attr("id"))
                }), e = o.add(this.element), i = e.find(this.options.items), i.not(".ui-menu-item").each(function() {
                    var e = t(this);
                    n._isDivider(e) && e.addClass("ui-widget-content ui-menu-divider");
                }), i.not(".ui-menu-item, .ui-menu-divider").addClass("ui-menu-item").uniqueId().attr({
                    tabIndex: -1,
                    role: this._itemRole()
                }), i.filter(".ui-state-disabled").attr("aria-disabled", "true"), this.active && !t.contains(this.element[0], this.active[0]) && this.blur()
            },
            _itemRole: function() {
                return {
                    menu: "menuitem",
                    listbox: "option"
                }[this.options.role]
            },
            _setOption: function(t, e) {
                "icons" === t && this.element.find(".ui-menu-icon").removeClass(this.options.icons.submenu).addClass(e.submenu), "disabled" === t && this.element.toggleClass("ui-state-disabled", !!e).attr("aria-disabled", e), this._super(t, e)
            },
            focus: function(t, e) {
                var i, n;
                this.blur(t, t && "focus" === t.type), this._scrollIntoView(e), this.active = e.first(), n = this.active.addClass("ui-state-focus").removeClass("ui-state-active"), this.options.role && this.element.attr("aria-activedescendant", n.attr("id")), this.active.parent().closest(".ui-menu-item").addClass("ui-state-active"), t && "keydown" === t.type ? this._close() : this.timer = this._delay(function() {
                    this._close()
                }, this.delay), i = e.children(".ui-menu"), i.length && t && /^mouse/.test(t.type) && this._startOpening(i), this.activeMenu = e.parent(), this._trigger("focus", t, {
                    item: e
                })
            },
            _scrollIntoView: function(e) {
                var i, n, s, o, a, r;
                this._hasScroll() && (i = parseFloat(t.css(this.activeMenu[0], "borderTopWidth")) || 0, n = parseFloat(t.css(this.activeMenu[0], "paddingTop")) || 0, s = e.offset().top - this.activeMenu.offset().top - i - n, o = this.activeMenu.scrollTop(), a = this.activeMenu.height(), r = e.outerHeight(), 0 > s ? this.activeMenu.scrollTop(o + s) : s + r > a && this.activeMenu.scrollTop(o + s - a + r))
            },
            blur: function(t, e) {
                e || clearTimeout(this.timer), this.active && (this.active.removeClass("ui-state-focus"), this.active = null, this._trigger("blur", t, {
                    item: this.active
                }))
            },
            _startOpening: function(t) {
                clearTimeout(this.timer), "true" === t.attr("aria-hidden") && (this.timer = this._delay(function() {
                    this._close(), this._open(t)
                }, this.delay))
            },
            _open: function(e) {
                var i = t.extend({ of: this.active
                }, this.options.position);
                clearTimeout(this.timer), this.element.find(".ui-menu").not(e.parents(".ui-menu")).hide().attr("aria-hidden", "true"), e.show().removeAttr("aria-hidden").attr("aria-expanded", "true").position(i)
            },
            collapseAll: function(e, i) {
                clearTimeout(this.timer), this.timer = this._delay(function() {
                    var n = i ? this.element : t(e && e.target).closest(this.element.find(".ui-menu"));
                    n.length || (n = this.element), this._close(n), this.blur(e), this.activeMenu = n
                }, this.delay)
            },
            _close: function(t) {
                t || (t = this.active ? this.active.parent() : this.element), t.find(".ui-menu").hide().attr("aria-hidden", "true").attr("aria-expanded", "false").end().find(".ui-state-active").not(".ui-state-focus").removeClass("ui-state-active")
            },
            _closeOnDocumentClick: function(e) {
                return !t(e.target).closest(".ui-menu").length
            },
            _isDivider: function(t) {
                return !/[^\-\u2014\u2013\s]/.test(t.text())
            },
            collapse: function(t) {
                var e = this.active && this.active.parent().closest(".ui-menu-item", this.element);
                e && e.length && (this._close(), this.focus(t, e))
            },
            expand: function(t) {
                var e = this.active && this.active.children(".ui-menu ").find(this.options.items).first();
                e && e.length && (this._open(e.parent()), this._delay(function() {
                    this.focus(t, e)
                }))
            },
            next: function(t) {
                this._move("next", "first", t)
            },
            previous: function(t) {
                this._move("prev", "last", t)
            },
            isFirstItem: function() {
                return this.active && !this.active.prevAll(".ui-menu-item").length
            },
            isLastItem: function() {
                return this.active && !this.active.nextAll(".ui-menu-item").length
            },
            _move: function(t, e, i) {
                var n;
                this.active && (n = "first" === t || "last" === t ? this.active["first" === t ? "prevAll" : "nextAll"](".ui-menu-item").eq(-1) : this.active[t + "All"](".ui-menu-item").eq(0)), n && n.length && this.active || (n = this.activeMenu.find(this.options.items)[e]()), this.focus(i, n)
            },
            nextPage: function(e) {
                var i, n, s;
                return this.active ? void(this.isLastItem() || (this._hasScroll() ? (n = this.active.offset().top, s = this.element.height(), this.active.nextAll(".ui-menu-item").each(function() {
                    return i = t(this), i.offset().top - n - s < 0
                }), this.focus(e, i)) : this.focus(e, this.activeMenu.find(this.options.items)[this.active ? "last" : "first"]()))) : void this.next(e)
            },
            previousPage: function(e) {
                var i, n, s;
                return this.active ? void(this.isFirstItem() || (this._hasScroll() ? (n = this.active.offset().top, s = this.element.height(), this.active.prevAll(".ui-menu-item").each(function() {
                    return i = t(this), i.offset().top - n + s > 0
                }), this.focus(e, i)) : this.focus(e, this.activeMenu.find(this.options.items).first()))) : void this.next(e)
            },
            _hasScroll: function() {
                return this.element.outerHeight() < this.element.prop("scrollHeight")
            },
            select: function(e) {
                this.active = this.active || t(e.target).closest(".ui-menu-item");
                var i = {
                    item: this.active
                };
                this.active.has(".ui-menu").length || this.collapseAll(e, !0), this._trigger("select", e, i)
            },
            _filterMenuItems: function(e) {
                var i = e.replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g, "\\$&"),
                    n = new RegExp("^" + i, "i");
                return this.activeMenu.find(this.options.items).filter(".ui-menu-item").filter(function() {
                    return n.test(t.trim(t(this).text()))
                })
            }
        });
        t.widget("ui.autocomplete", {
            version: "1.11.2",
            defaultElement: "<input>",
            options: {
                appendTo: null,
                autoFocus: !1,
                delay: 300,
                minLength: 1,
                position: {
                    my: "left top",
                    at: "left bottom",
                    collision: "none"
                },
                source: null,
                change: null,
                close: null,
                focus: null,
                open: null,
                response: null,
                search: null,
                select: null
            },
            requestIndex: 0,
            pending: 0,
            _create: function() {
                var e, i, n, s = this.element[0].nodeName.toLowerCase(),
                    o = "textarea" === s,
                    a = "input" === s;
                this.isMultiLine = o ? !0 : a ? !1 : this.element.prop("isContentEditable"), this.valueMethod = this.element[o || a ? "val" : "text"], this.isNewMenu = !0, this.element.addClass("ui-autocomplete-input").attr("autocomplete", "off"), this._on(this.element, {
                    keydown: function(s) {
                        if (this.element.prop("readOnly")) return e = !0, n = !0, void(i = !0);
                        e = !1, n = !1, i = !1;
                        var o = t.ui.keyCode;
                        switch (s.keyCode) {
                            case o.PAGE_UP:
                                e = !0, this._move("previousPage", s);
                                break;
                            case o.PAGE_DOWN:
                                e = !0, this._move("nextPage", s);
                                break;
                            case o.UP:
                                e = !0, this._keyEvent("previous", s);
                                break;
                            case o.DOWN:
                                e = !0, this._keyEvent("next", s);
                                break;
                            case o.ENTER:
                                this.menu.active && (e = !0, s.preventDefault(), this.menu.select(s));
                                break;
                            case o.TAB:
                                this.menu.active && this.menu.select(s);
                                break;
                            case o.ESCAPE:
                                this.menu.element.is(":visible") && (this.isMultiLine || this._value(this.term), this.close(s), s.preventDefault());
                                break;
                            default:
                                i = !0, this._searchTimeout(s)
                        }
                    },
                    keypress: function(n) {
                        if (e) return e = !1, void((!this.isMultiLine || this.menu.element.is(":visible")) && n.preventDefault());
                        if (!i) {
                            var s = t.ui.keyCode;
                            switch (n.keyCode) {
                                case s.PAGE_UP:
                                    this._move("previousPage", n);
                                    break;
                                case s.PAGE_DOWN:
                                    this._move("nextPage", n);
                                    break;
                                case s.UP:
                                    this._keyEvent("previous", n);
                                    break;
                                case s.DOWN:
                                    this._keyEvent("next", n)
                            }
                        }
                    },
                    input: function(t) {
                        return n ? (n = !1, void t.preventDefault()) : void this._searchTimeout(t)
                    },
                    focus: function() {
                        this.selectedItem = null, this.previous = this._value()
                    },
                    blur: function(t) {
                        return this.cancelBlur ? void delete this.cancelBlur : (clearTimeout(this.searching), this.close(t), void this._change(t))
                    }
                }), this._initSource(), this.menu = t("<ul>").addClass("ui-autocomplete ui-front").appendTo(this._appendTo()).menu({
                    role: null
                }).hide().menu("instance"), this._on(this.menu.element, {
                    mousedown: function(e) {
                        e.preventDefault(), this.cancelBlur = !0, this._delay(function() {
                            delete this.cancelBlur
                        });
                        var i = this.menu.element[0];
                        t(e.target).closest(".ui-menu-item").length || this._delay(function() {
                            var e = this;
                            this.document.one("mousedown", function(n) {
                                n.target === e.element[0] || n.target === i || t.contains(i, n.target) || e.close()
                            })
                        })
                    },
                    menufocus: function(e, i) {
                        var n, s;
                        return this.isNewMenu && (this.isNewMenu = !1, e.originalEvent && /^mouse/.test(e.originalEvent.type)) ? (this.menu.blur(), void this.document.one("mousemove", function() {
                            t(e.target).trigger(e.originalEvent)
                        })) : (s = i.item.data("ui-autocomplete-item"), !1 !== this._trigger("focus", e, {
                            item: s
                        }) && e.originalEvent && /^key/.test(e.originalEvent.type) && this._value(s.value), n = i.item.attr("aria-label") || s.value, void(n && t.trim(n).length && (this.liveRegion.children().hide(), t("<div>").text(n).appendTo(this.liveRegion))))
                    },
                    menuselect: function(t, e) {
                        var i = e.item.data("ui-autocomplete-item"),
                            n = this.previous;
                        this.element[0] !== this.document[0].activeElement && (this.element.focus(), this.previous = n, this._delay(function() {
                            this.previous = n, this.selectedItem = i
                        })), !1 !== this._trigger("select", t, {
                            item: i
                        }) && this._value(i.value), this.term = this._value(), this.close(t), this.selectedItem = i
                    }
                }), this.liveRegion = t("<span>", {
                    role: "status",
                    "aria-live": "assertive",
                    "aria-relevant": "additions"
                }).addClass("ui-helper-hidden-accessible").appendTo(this.document[0].body), this._on(this.window, {
                    beforeunload: function() {
                        this.element.removeAttr("autocomplete")
                    }
                })
            },
            _destroy: function() {
                clearTimeout(this.searching), this.element.removeClass("ui-autocomplete-input").removeAttr("autocomplete"), this.menu.element.remove(), this.liveRegion.remove()
            },
            _setOption: function(t, e) {
                this._super(t, e), "source" === t && this._initSource(), "appendTo" === t && this.menu.element.appendTo(this._appendTo()), "disabled" === t && e && this.xhr && this.xhr.abort()
            },
            _appendTo: function() {
                var e = this.options.appendTo;
                return e && (e = e.jquery || e.nodeType ? t(e) : this.document.find(e).eq(0)), e && e[0] || (e = this.element.closest(".ui-front")), e.length || (e = this.document[0].body), e
            },
            _initSource: function() {
                var e, i, n = this;
                t.isArray(this.options.source) ? (e = this.options.source, this.source = function(i, n) {
                    n(t.ui.autocomplete.filter(e, i.term))
                }) : "string" == typeof this.options.source ? (i = this.options.source, this.source = function(e, s) {
                    n.xhr && n.xhr.abort(), n.xhr = t.ajax({
                        url: i,
                        data: e,
                        dataType: "json",
                        success: function(t) {
                            s(t)
                        },
                        error: function() {
                            s([])
                        }
                    })
                }) : this.source = this.options.source
            },
            _searchTimeout: function(t) {
                clearTimeout(this.searching), this.searching = this._delay(function() {
                    var e = this.term === this._value(),
                        i = this.menu.element.is(":visible"),
                        n = t.altKey || t.ctrlKey || t.metaKey || t.shiftKey;
                    (!e || e && !i && !n) && (this.selectedItem = null, this.search(null, t))
                }, this.options.delay)
            },
            search: function(t, e) {
                return t = null != t ? t : this._value(), this.term = this._value(), t.length < this.options.minLength ? this.close(e) : this._trigger("search", e) !== !1 ? this._search(t) : void 0
            },
            _search: function(t) {
                this.pending++, this.element.addClass("ui-autocomplete-loading"), this.cancelSearch = !1, this.source({
                    term: t
                }, this._response())
            },
            _response: function() {
                var e = ++this.requestIndex;
                return t.proxy(function(t) {
                    e === this.requestIndex && this.__response(t), this.pending--, this.pending || this.element.removeClass("ui-autocomplete-loading")
                }, this)
            },
            __response: function(t) {
                t && (t = this._normalize(t)), this._trigger("response", null, {
                    content: t
                }), !this.options.disabled && t && t.length && !this.cancelSearch ? (this._suggest(t), this._trigger("open")) : this._close()
            },
            close: function(t) {
                this.cancelSearch = !0, this._close(t)
            },
            _close: function(t) {
                this.menu.element.is(":visible") && (this.menu.element.hide(), this.menu.blur(), this.isNewMenu = !0, this._trigger("close", t))
            },
            _change: function(t) {
                this.previous !== this._value() && this._trigger("change", t, {
                    item: this.selectedItem
                })
            },
            _normalize: function(e) {
                return e.length && e[0].label && e[0].value ? e : t.map(e, function(e) {
                    return "string" == typeof e ? {
                        label: e,
                        value: e
                    } : t.extend({}, e, {
                        label: e.label || e.value,
                        value: e.value || e.label
                    })
                })
            },
            _suggest: function(e) {
                var i = this.menu.element.empty();
                this._renderMenu(i, e), this.isNewMenu = !0, this.menu.refresh(), i.show(), this._resizeMenu(), i.position(t.extend({ of: this.element
                }, this.options.position)), this.options.autoFocus && this.menu.next()
            },
            _resizeMenu: function() {
                var t = this.menu.element;
                t.outerWidth(Math.max(t.width("").outerWidth() + 1, this.element.outerWidth()))
            },
            _renderMenu: function(e, i) {
                var n = this;
                t.each(i, function(t, i) {
                    n._renderItemData(e, i)
                })
            },
            _renderItemData: function(t, e) {
                return this._renderItem(t, e).data("ui-autocomplete-item", e)
            },
            _renderItem: function(e, i) {
                return t("<li>").text(i.label).appendTo(e)
            },
            _move: function(t, e) {
                return this.menu.element.is(":visible") ? this.menu.isFirstItem() && /^previous/.test(t) || this.menu.isLastItem() && /^next/.test(t) ? (this.isMultiLine || this._value(this.term), void this.menu.blur()) : void this.menu[t](e) : void this.search(null, e)
            },
            widget: function() {
                return this.menu.element
            },
            _value: function() {
                return this.valueMethod.apply(this.element, arguments)
            },
            _keyEvent: function(t, e) {
                (!this.isMultiLine || this.menu.element.is(":visible")) && (this._move(t, e), e.preventDefault())
            }
        }), t.extend(t.ui.autocomplete, {
            escapeRegex: function(t) {
                return t.replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g, "\\$&")
            },
            filter: function(e, i) {
                var n = new RegExp(t.ui.autocomplete.escapeRegex(i), "i");
                return t.grep(e, function(t) {
                    return n.test(t.label || t.value || t)
                })
            }
        }), t.widget("ui.autocomplete", t.ui.autocomplete, {
            options: {
                messages: {
                    noResults: "No search results.",
                    results: function(t) {
                        return t + (t > 1 ? " results are" : " result is") + " available, use up and down arrow keys to navigate."
                    }
                }
            },
            __response: function(e) {
                var i;
                this._superApply(arguments), this.options.disabled || this.cancelSearch || (i = e && e.length ? this.options.messages.results(e.length) : this.options.messages.noResults, this.liveRegion.children().hide(), t("<div>").text(i).appendTo(this.liveRegion))
            }
        });
        var d, p = (t.ui.autocomplete, "ui-button ui-widget ui-state-default ui-corner-all"),
            f = "ui-button-icons-only ui-button-icon-only ui-button-text-icons ui-button-text-icon-primary ui-button-text-icon-secondary ui-button-text-only",
            m = function() {
                var e = t(this);
                setTimeout(function() {
                    e.find(":ui-button").button("refresh")
                }, 1)
            },
            g = function(e) {
                var i = e.name,
                    n = e.form,
                    s = t([]);
                return i && (i = i.replace(/'/g, "\\'"), s = n ? t(n).find("[name='" + i + "'][type=radio]") : t("[name='" + i + "'][type=radio]", e.ownerDocument).filter(function() {
                    return !this.form
                })), s
            };
        t.widget("ui.button", {
            version: "1.11.2",
            defaultElement: "<button>",
            options: {
                disabled: null,
                text: !0,
                label: null,
                icons: {
                    primary: null,
                    secondary: null
                }
            },
            _create: function() {
                this.element.closest("form").unbind("reset" + this.eventNamespace).bind("reset" + this.eventNamespace, m), "boolean" != typeof this.options.disabled ? this.options.disabled = !!this.element.prop("disabled") : this.element.prop("disabled", this.options.disabled), this._determineButtonType(), this.hasTitle = !!this.buttonElement.attr("title");
                var e = this,
                    i = this.options,
                    n = "checkbox" === this.type || "radio" === this.type,
                    s = n ? "" : "ui-state-active";
                null === i.label && (i.label = "input" === this.type ? this.buttonElement.val() : this.buttonElement.html()), this._hoverable(this.buttonElement), this.buttonElement.addClass(p).attr("role", "button").bind("mouseenter" + this.eventNamespace, function() {
                    i.disabled || this === d && t(this).addClass("ui-state-active")
                }).bind("mouseleave" + this.eventNamespace, function() {
                    i.disabled || t(this).removeClass(s)
                }).bind("click" + this.eventNamespace, function(t) {
                    i.disabled && (t.preventDefault(), t.stopImmediatePropagation())
                }), this._on({
                    focus: function() {
                        this.buttonElement.addClass("ui-state-focus")
                    },
                    blur: function() {
                        this.buttonElement.removeClass("ui-state-focus")
                    }
                }), n && this.element.bind("change" + this.eventNamespace, function() {
                    e.refresh()
                }), "checkbox" === this.type ? this.buttonElement.bind("click" + this.eventNamespace, function() {
                    return i.disabled ? !1 : void 0
                }) : "radio" === this.type ? this.buttonElement.bind("click" + this.eventNamespace, function() {
                    if (i.disabled) return !1;
                    t(this).addClass("ui-state-active"), e.buttonElement.attr("aria-pressed", "true");
                    var n = e.element[0];
                    g(n).not(n).map(function() {
                        return t(this).button("widget")[0]
                    }).removeClass("ui-state-active").attr("aria-pressed", "false")
                }) : (this.buttonElement.bind("mousedown" + this.eventNamespace, function() {
                    return i.disabled ? !1 : (t(this).addClass("ui-state-active"), d = this, void e.document.one("mouseup", function() {
                        d = null
                    }))
                }).bind("mouseup" + this.eventNamespace, function() {
                    return i.disabled ? !1 : void t(this).removeClass("ui-state-active")
                }).bind("keydown" + this.eventNamespace, function(e) {
                    return i.disabled ? !1 : void((e.keyCode === t.ui.keyCode.SPACE || e.keyCode === t.ui.keyCode.ENTER) && t(this).addClass("ui-state-active"))
                }).bind("keyup" + this.eventNamespace + " blur" + this.eventNamespace, function() {
                    t(this).removeClass("ui-state-active")
                }), this.buttonElement.is("a") && this.buttonElement.keyup(function(e) {
                    e.keyCode === t.ui.keyCode.SPACE && t(this).click()
                })), this._setOption("disabled", i.disabled), this._resetButton()
            },
            _determineButtonType: function() {
                var t, e, i;
                this.element.is("[type=checkbox]") ? this.type = "checkbox" : this.element.is("[type=radio]") ? this.type = "radio" : this.element.is("input") ? this.type = "input" : this.type = "button", "checkbox" === this.type || "radio" === this.type ? (t = this.element.parents().last(), e = "label[for='" + this.element.attr("id") + "']", this.buttonElement = t.find(e), this.buttonElement.length || (t = t.length ? t.siblings() : this.element.siblings(), this.buttonElement = t.filter(e), this.buttonElement.length || (this.buttonElement = t.find(e))), this.element.addClass("ui-helper-hidden-accessible"), i = this.element.is(":checked"), i && this.buttonElement.addClass("ui-state-active"), this.buttonElement.prop("aria-pressed", i)) : this.buttonElement = this.element
            },
            widget: function() {
                return this.buttonElement
            },
            _destroy: function() {
                this.element.removeClass("ui-helper-hidden-accessible"), this.buttonElement.removeClass(p + " ui-state-active " + f).removeAttr("role").removeAttr("aria-pressed").html(this.buttonElement.find(".ui-button-text").html()), this.hasTitle || this.buttonElement.removeAttr("title")
            },
            _setOption: function(t, e) {
                return this._super(t, e), "disabled" === t ? (this.widget().toggleClass("ui-state-disabled", !!e), this.element.prop("disabled", !!e), void(e && ("checkbox" === this.type || "radio" === this.type ? this.buttonElement.removeClass("ui-state-focus") : this.buttonElement.removeClass("ui-state-focus ui-state-active")))) : void this._resetButton()
            },
            refresh: function() {
                var e = this.element.is("input, button") ? this.element.is(":disabled") : this.element.hasClass("ui-button-disabled");
                e !== this.options.disabled && this._setOption("disabled", e), "radio" === this.type ? g(this.element[0]).each(function() {
                    t(this).is(":checked") ? t(this).button("widget").addClass("ui-state-active").attr("aria-pressed", "true") : t(this).button("widget").removeClass("ui-state-active").attr("aria-pressed", "false")
                }) : "checkbox" === this.type && (this.element.is(":checked") ? this.buttonElement.addClass("ui-state-active").attr("aria-pressed", "true") : this.buttonElement.removeClass("ui-state-active").attr("aria-pressed", "false"))
            },
            _resetButton: function() {
                if ("input" === this.type) return void(this.options.label && this.element.val(this.options.label));
                var e = this.buttonElement.removeClass(f),
                    i = t("<span></span>", this.document[0]).addClass("ui-button-text").html(this.options.label).appendTo(e.empty()).text(),
                    n = this.options.icons,
                    s = n.primary && n.secondary,
                    o = [];
                n.primary || n.secondary ? (this.options.text && o.push("ui-button-text-icon" + (s ? "s" : n.primary ? "-primary" : "-secondary")), n.primary && e.prepend("<span class='ui-button-icon-primary ui-icon " + n.primary + "'></span>"), n.secondary && e.append("<span class='ui-button-icon-secondary ui-icon " + n.secondary + "'></span>"), this.options.text || (o.push(s ? "ui-button-icons-only" : "ui-button-icon-only"), this.hasTitle || e.attr("title", t.trim(i)))) : o.push("ui-button-text-only"), e.addClass(o.join(" "))
            }
        }), t.widget("ui.buttonset", {
            version: "1.11.2",
            options: {
                items: "button, input[type=button], input[type=submit], input[type=reset], input[type=checkbox], input[type=radio], a, :data(ui-button)"
            },
            _create: function() {
                this.element.addClass("ui-buttonset")
            },
            _init: function() {
                this.refresh()
            },
            _setOption: function(t, e) {
                "disabled" === t && this.buttons.button("option", t, e), this._super(t, e)
            },
            refresh: function() {
                var e = "rtl" === this.element.css("direction"),
                    i = this.element.find(this.options.items),
                    n = i.filter(":ui-button");
                i.not(":ui-button").button(), n.button("refresh"), this.buttons = i.map(function() {
                    return t(this).button("widget")[0]
                }).removeClass("ui-corner-all ui-corner-left ui-corner-right").filter(":first").addClass(e ? "ui-corner-right" : "ui-corner-left").end().filter(":last").addClass(e ? "ui-corner-left" : "ui-corner-right").end().end()
            },
            _destroy: function() {
                this.element.removeClass("ui-buttonset"), this.buttons.map(function() {
                    return t(this).button("widget")[0]
                }).removeClass("ui-corner-left ui-corner-right").end().button("destroy")
            }
        });
        t.ui.button;
        t.extend(t.ui, {
            datepicker: {
                version: "1.11.2"
            }
        });
        var v;
        t.extend(s.prototype, {
            markerClassName: "hasDatepicker",
            maxRows: 4,
            _widgetDatepicker: function() {
                return this.dpDiv
            },
            setDefaults: function(t) {
                return r(this._defaults, t || {}), this
            },
            _attachDatepicker: function(e, i) {
                var n, s, o;
                n = e.nodeName.toLowerCase(), s = "div" === n || "span" === n, e.id || (this.uuid += 1, e.id = "dp" + this.uuid), o = this._newInst(t(e), s), o.settings = t.extend({}, i || {}), "input" === n ? this._connectDatepicker(e, o) : s && this._inlineDatepicker(e, o)
            },
            _newInst: function(e, i) {
                var n = e[0].id.replace(/([^A-Za-z0-9_\-])/g, "\\\\$1");
                return {
                    id: n,
                    input: e,
                    selectedDay: 0,
                    selectedMonth: 0,
                    selectedYear: 0,
                    drawMonth: 0,
                    drawYear: 0,
                    inline: i,
                    dpDiv: i ? o(t("<div class='" + this._inlineClass + " ui-datepicker ui-widget ui-widget-content ui-helper-clearfix ui-corner-all'></div>")) : this.dpDiv
                }
            },
            _connectDatepicker: function(e, i) {
                var n = t(e);
                i.append = t([]), i.trigger = t([]), n.hasClass(this.markerClassName) || (this._attachments(n, i), n.addClass(this.markerClassName).keydown(this._doKeyDown).keypress(this._doKeyPress).keyup(this._doKeyUp), this._autoSize(i), t.data(e, "datepicker", i), i.settings.disabled && this._disableDatepicker(e))
            },
            _attachments: function(e, i) {
                var n, s, o, a = this._get(i, "appendText"),
                    r = this._get(i, "isRTL");
                i.append && i.append.remove(), a && (i.append = t("<span class='" + this._appendClass + "'>" + a + "</span>"), e[r ? "before" : "after"](i.append)), e.unbind("focus", this._showDatepicker), i.trigger && i.trigger.remove(), n = this._get(i, "showOn"), ("focus" === n || "both" === n) && e.focus(this._showDatepicker), ("button" === n || "both" === n) && (s = this._get(i, "buttonText"), o = this._get(i, "buttonImage"), i.trigger = t(this._get(i, "buttonImageOnly") ? t("<img/>").addClass(this._triggerClass).attr({
                    src: o,
                    alt: s,
                    title: s
                }) : t("<button type='button'></button>").addClass(this._triggerClass).html(o ? t("<img/>").attr({
                    src: o,
                    alt: s,
                    title: s
                }) : s)), e[r ? "before" : "after"](i.trigger), i.trigger.click(function() {
                    return t.datepicker._datepickerShowing && t.datepicker._lastInput === e[0] ? t.datepicker._hideDatepicker() : t.datepicker._datepickerShowing && t.datepicker._lastInput !== e[0] ? (t.datepicker._hideDatepicker(), t.datepicker._showDatepicker(e[0])) : t.datepicker._showDatepicker(e[0]), !1
                }))
            },
            _autoSize: function(t) {
                if (this._get(t, "autoSize") && !t.inline) {
                    var e, i, n, s, o = new Date(2009, 11, 20),
                        a = this._get(t, "dateFormat");
                    a.match(/[DM]/) && (e = function(t) {
                        for (i = 0, n = 0, s = 0; s < t.length; s++) t[s].length > i && (i = t[s].length, n = s);
                        return n
                    }, o.setMonth(e(this._get(t, a.match(/MM/) ? "monthNames" : "monthNamesShort"))), o.setDate(e(this._get(t, a.match(/DD/) ? "dayNames" : "dayNamesShort")) + 20 - o.getDay())), t.input.attr("size", this._formatDate(t, o).length)
                }
            },
            _inlineDatepicker: function(e, i) {
                var n = t(e);
                n.hasClass(this.markerClassName) || (n.addClass(this.markerClassName).append(i.dpDiv), t.data(e, "datepicker", i), this._setDate(i, this._getDefaultDate(i), !0), this._updateDatepicker(i), this._updateAlternate(i), i.settings.disabled && this._disableDatepicker(e), i.dpDiv.css("display", "block"))
            },
            _dialogDatepicker: function(e, i, n, s, o) {
                var a, l, h, c, u, d = this._dialogInst;
                return d || (this.uuid += 1, a = "dp" + this.uuid, this._dialogInput = t("<input type='text' id='" + a + "' style='position: absolute; top: -100px; width: 0px;'/>"), this._dialogInput.keydown(this._doKeyDown), t("body").append(this._dialogInput), d = this._dialogInst = this._newInst(this._dialogInput, !1), d.settings = {}, t.data(this._dialogInput[0], "datepicker", d)), r(d.settings, s || {}), i = i && i.constructor === Date ? this._formatDate(d, i) : i, this._dialogInput.val(i), this._pos = o ? o.length ? o : [o.pageX, o.pageY] : null, this._pos || (l = document.documentElement.clientWidth, h = document.documentElement.clientHeight, c = document.documentElement.scrollLeft || document.body.scrollLeft, u = document.documentElement.scrollTop || document.body.scrollTop, this._pos = [l / 2 - 100 + c, h / 2 - 150 + u]), this._dialogInput.css("left", this._pos[0] + 20 + "px").css("top", this._pos[1] + "px"), d.settings.onSelect = n, this._inDialog = !0, this.dpDiv.addClass(this._dialogClass), this._showDatepicker(this._dialogInput[0]), t.blockUI && t.blockUI(this.dpDiv), t.data(this._dialogInput[0], "datepicker", d), this
            },
            _destroyDatepicker: function(e) {
                var i, n = t(e),
                    s = t.data(e, "datepicker");
                n.hasClass(this.markerClassName) && (i = e.nodeName.toLowerCase(), t.removeData(e, "datepicker"), "input" === i ? (s.append.remove(), s.trigger.remove(), n.removeClass(this.markerClassName).unbind("focus", this._showDatepicker).unbind("keydown", this._doKeyDown).unbind("keypress", this._doKeyPress).unbind("keyup", this._doKeyUp)) : ("div" === i || "span" === i) && n.removeClass(this.markerClassName).empty())
            },
            _enableDatepicker: function(e) {
                var i, n, s = t(e),
                    o = t.data(e, "datepicker");
                s.hasClass(this.markerClassName) && (i = e.nodeName.toLowerCase(), "input" === i ? (e.disabled = !1, o.trigger.filter("button").each(function() {
                    this.disabled = !1
                }).end().filter("img").css({
                    opacity: "1.0",
                    cursor: ""
                })) : ("div" === i || "span" === i) && (n = s.children("." + this._inlineClass), n.children().removeClass("ui-state-disabled"), n.find("select.ui-datepicker-month, select.ui-datepicker-year").prop("disabled", !1)), this._disabledInputs = t.map(this._disabledInputs, function(t) {
                    return t === e ? null : t
                }))
            },
            _disableDatepicker: function(e) {
                var i, n, s = t(e),
                    o = t.data(e, "datepicker");
                s.hasClass(this.markerClassName) && (i = e.nodeName.toLowerCase(), "input" === i ? (e.disabled = !0, o.trigger.filter("button").each(function() {
                    this.disabled = !0
                }).end().filter("img").css({
                    opacity: "0.5",
                    cursor: "default"
                })) : ("div" === i || "span" === i) && (n = s.children("." + this._inlineClass), n.children().addClass("ui-state-disabled"), n.find("select.ui-datepicker-month, select.ui-datepicker-year").prop("disabled", !0)), this._disabledInputs = t.map(this._disabledInputs, function(t) {
                    return t === e ? null : t
                }), this._disabledInputs[this._disabledInputs.length] = e)
            },
            _isDisabledDatepicker: function(t) {
                if (!t) return !1;
                for (var e = 0; e < this._disabledInputs.length; e++)
                    if (this._disabledInputs[e] === t) return !0;
                return !1
            },
            _getInst: function(e) {
                try {
                    return t.data(e, "datepicker")
                } catch (i) {
                    throw "Missing instance data for this datepicker"
                }
            },
            _optionDatepicker: function(e, i, n) {
                var s, o, a, l, h = this._getInst(e);
                return 2 === arguments.length && "string" == typeof i ? "defaults" === i ? t.extend({}, t.datepicker._defaults) : h ? "all" === i ? t.extend({}, h.settings) : this._get(h, i) : null : (s = i || {}, "string" == typeof i && (s = {}, s[i] = n), void(h && (this._curInst === h && this._hideDatepicker(), o = this._getDateDatepicker(e, !0), a = this._getMinMaxDate(h, "min"), l = this._getMinMaxDate(h, "max"), r(h.settings, s), null !== a && void 0 !== s.dateFormat && void 0 === s.minDate && (h.settings.minDate = this._formatDate(h, a)), null !== l && void 0 !== s.dateFormat && void 0 === s.maxDate && (h.settings.maxDate = this._formatDate(h, l)), "disabled" in s && (s.disabled ? this._disableDatepicker(e) : this._enableDatepicker(e)), this._attachments(t(e), h), this._autoSize(h), this._setDate(h, o), this._updateAlternate(h), this._updateDatepicker(h))))
            },
            _changeDatepicker: function(t, e, i) {
                this._optionDatepicker(t, e, i)
            },
            _refreshDatepicker: function(t) {
                var e = this._getInst(t);
                e && this._updateDatepicker(e)
            },
            _setDateDatepicker: function(t, e) {
                var i = this._getInst(t);
                i && (this._setDate(i, e), this._updateDatepicker(i), this._updateAlternate(i))
            },
            _getDateDatepicker: function(t, e) {
                var i = this._getInst(t);
                return i && !i.inline && this._setDateFromField(i, e), i ? this._getDate(i) : null
            },
            _doKeyDown: function(e) {
                var i, n, s, o = t.datepicker._getInst(e.target),
                    a = !0,
                    r = o.dpDiv.is(".ui-datepicker-rtl");
                if (o._keyEvent = !0, t.datepicker._datepickerShowing) switch (e.keyCode) {
                    case 9:
                        t.datepicker._hideDatepicker(), a = !1;
                        break;
                    case 13:
                        return s = t("td." + t.datepicker._dayOverClass + ":not(." + t.datepicker._currentClass + ")", o.dpDiv), s[0] && t.datepicker._selectDay(e.target, o.selectedMonth, o.selectedYear, s[0]), i = t.datepicker._get(o, "onSelect"), i ? (n = t.datepicker._formatDate(o), i.apply(o.input ? o.input[0] : null, [n, o])) : t.datepicker._hideDatepicker(), !1;
                    case 27:
                        t.datepicker._hideDatepicker();
                        break;
                    case 33:
                        t.datepicker._adjustDate(e.target, e.ctrlKey ? -t.datepicker._get(o, "stepBigMonths") : -t.datepicker._get(o, "stepMonths"), "M");
                        break;
                    case 34:
                        t.datepicker._adjustDate(e.target, e.ctrlKey ? +t.datepicker._get(o, "stepBigMonths") : +t.datepicker._get(o, "stepMonths"), "M");
                        break;
                    case 35:
                        (e.ctrlKey || e.metaKey) && t.datepicker._clearDate(e.target), a = e.ctrlKey || e.metaKey;
                        break;
                    case 36:
                        (e.ctrlKey || e.metaKey) && t.datepicker._gotoToday(e.target), a = e.ctrlKey || e.metaKey;
                        break;
                    case 37:
                        (e.ctrlKey || e.metaKey) && t.datepicker._adjustDate(e.target, r ? 1 : -1, "D"), a = e.ctrlKey || e.metaKey, e.originalEvent.altKey && t.datepicker._adjustDate(e.target, e.ctrlKey ? -t.datepicker._get(o, "stepBigMonths") : -t.datepicker._get(o, "stepMonths"), "M");
                        break;
                    case 38:
                        (e.ctrlKey || e.metaKey) && t.datepicker._adjustDate(e.target, -7, "D"), a = e.ctrlKey || e.metaKey;
                        break;
                    case 39:
                        (e.ctrlKey || e.metaKey) && t.datepicker._adjustDate(e.target, r ? -1 : 1, "D"), a = e.ctrlKey || e.metaKey, e.originalEvent.altKey && t.datepicker._adjustDate(e.target, e.ctrlKey ? +t.datepicker._get(o, "stepBigMonths") : +t.datepicker._get(o, "stepMonths"), "M");
                        break;
                    case 40:
                        (e.ctrlKey || e.metaKey) && t.datepicker._adjustDate(e.target, 7, "D"), a = e.ctrlKey || e.metaKey;
                        break;
                    default:
                        a = !1
                } else 36 === e.keyCode && e.ctrlKey ? t.datepicker._showDatepicker(this) : a = !1;
                a && (e.preventDefault(), e.stopPropagation())
            },
            _doKeyPress: function(e) {
                var i, n, s = t.datepicker._getInst(e.target);
                return t.datepicker._get(s, "constrainInput") ? (i = t.datepicker._possibleChars(t.datepicker._get(s, "dateFormat")), n = String.fromCharCode(null == e.charCode ? e.keyCode : e.charCode), e.ctrlKey || e.metaKey || " " > n || !i || i.indexOf(n) > -1) : void 0
            },
            _doKeyUp: function(e) {
                var i, n = t.datepicker._getInst(e.target);
                if (n.input.val() !== n.lastVal) try {
                    i = t.datepicker.parseDate(t.datepicker._get(n, "dateFormat"), n.input ? n.input.val() : null, t.datepicker._getFormatConfig(n)), i && (t.datepicker._setDateFromField(n), t.datepicker._updateAlternate(n), t.datepicker._updateDatepicker(n))
                } catch (s) {}
                return !0
            },
            _showDatepicker: function(e) {
                if (e = e.target || e, "input" !== e.nodeName.toLowerCase() && (e = t("input", e.parentNode)[0]), !t.datepicker._isDisabledDatepicker(e) && t.datepicker._lastInput !== e) {
                    var i, s, o, a, l, h, c;
                    i = t.datepicker._getInst(e), t.datepicker._curInst && t.datepicker._curInst !== i && (t.datepicker._curInst.dpDiv.stop(!0, !0), i && t.datepicker._datepickerShowing && t.datepicker._hideDatepicker(t.datepicker._curInst.input[0])), s = t.datepicker._get(i, "beforeShow"), o = s ? s.apply(e, [e, i]) : {}, o !== !1 && (r(i.settings, o), i.lastVal = null, t.datepicker._lastInput = e, t.datepicker._setDateFromField(i), t.datepicker._inDialog && (e.value = ""), t.datepicker._pos || (t.datepicker._pos = t.datepicker._findPos(e), t.datepicker._pos[1] += e.offsetHeight), a = !1, t(e).parents().each(function() {
                        return a |= "fixed" === t(this).css("position"), !a
                    }), l = {
                        left: t.datepicker._pos[0],
                        top: t.datepicker._pos[1]
                    }, t.datepicker._pos = null, i.dpDiv.empty(), i.dpDiv.css({
                        position: "absolute",
                        display: "block",
                        top: "-1000px"
                    }), t.datepicker._updateDatepicker(i), l = t.datepicker._checkOffset(i, l, a), i.dpDiv.css({
                        position: t.datepicker._inDialog && t.blockUI ? "static" : a ? "fixed" : "absolute",
                        display: "none",
                        left: l.left + "px",
                        top: l.top + "px"
                    }), i.inline || (h = t.datepicker._get(i, "showAnim"), c = t.datepicker._get(i, "duration"), i.dpDiv.css("z-index", n(t(e)) + 1), t.datepicker._datepickerShowing = !0, t.effects && t.effects.effect[h] ? i.dpDiv.show(h, t.datepicker._get(i, "showOptions"), c) : i.dpDiv[h || "show"](h ? c : null), t.datepicker._shouldFocusInput(i) && i.input.focus(), t.datepicker._curInst = i))
                }
            },
            _updateDatepicker: function(e) {
                this.maxRows = 4, v = e, e.dpDiv.empty().append(this._generateHTML(e)), this._attachHandlers(e);
                var i, n = this._getNumberOfMonths(e),
                    s = n[1],
                    o = 17,
                    r = e.dpDiv.find("." + this._dayOverClass + " a");
                r.length > 0 && a.apply(r.get(0)), e.dpDiv.removeClass("ui-datepicker-multi-2 ui-datepicker-multi-3 ui-datepicker-multi-4").width(""), s > 1 && e.dpDiv.addClass("ui-datepicker-multi-" + s).css("width", o * s + "em"), e.dpDiv[(1 !== n[0] || 1 !== n[1] ? "add" : "remove") + "Class"]("ui-datepicker-multi"), e.dpDiv[(this._get(e, "isRTL") ? "add" : "remove") + "Class"]("ui-datepicker-rtl"), e === t.datepicker._curInst && t.datepicker._datepickerShowing && t.datepicker._shouldFocusInput(e) && e.input.focus(), e.yearshtml && (i = e.yearshtml, setTimeout(function() {
                    i === e.yearshtml && e.yearshtml && e.dpDiv.find("select.ui-datepicker-year:first").replaceWith(e.yearshtml), i = e.yearshtml = null
                }, 0))
            },
            _shouldFocusInput: function(t) {
                return t.input && t.input.is(":visible") && !t.input.is(":disabled") && !t.input.is(":focus")
            },
            _checkOffset: function(e, i, n) {
                var s = e.dpDiv.outerWidth(),
                    o = e.dpDiv.outerHeight(),
                    a = e.input ? e.input.outerWidth() : 0,
                    r = e.input ? e.input.outerHeight() : 0,
                    l = document.documentElement.clientWidth + (n ? 0 : t(document).scrollLeft()),
                    h = document.documentElement.clientHeight + (n ? 0 : t(document).scrollTop());
                return i.left -= this._get(e, "isRTL") ? s - a : 0, i.left -= n && i.left === e.input.offset().left ? t(document).scrollLeft() : 0, i.top -= n && i.top === e.input.offset().top + r ? t(document).scrollTop() : 0, i.left -= Math.min(i.left, i.left + s > l && l > s ? Math.abs(i.left + s - l) : 0), i.top -= Math.min(i.top, i.top + o > h && h > o ? Math.abs(o + r) : 0), i
            },
            _findPos: function(e) {
                for (var i, n = this._getInst(e), s = this._get(n, "isRTL"); e && ("hidden" === e.type || 1 !== e.nodeType || t.expr.filters.hidden(e));) e = e[s ? "previousSibling" : "nextSibling"];
                return i = t(e).offset(), [i.left, i.top]
            },
            _hideDatepicker: function(e) {
                var i, n, s, o, a = this._curInst;
                !a || e && a !== t.data(e, "datepicker") || this._datepickerShowing && (i = this._get(a, "showAnim"), n = this._get(a, "duration"), s = function() {
                    t.datepicker._tidyDialog(a)
                }, t.effects && (t.effects.effect[i] || t.effects[i]) ? a.dpDiv.hide(i, t.datepicker._get(a, "showOptions"), n, s) : a.dpDiv["slideDown" === i ? "slideUp" : "fadeIn" === i ? "fadeOut" : "hide"](i ? n : null, s), i || s(), this._datepickerShowing = !1, o = this._get(a, "onClose"), o && o.apply(a.input ? a.input[0] : null, [a.input ? a.input.val() : "", a]), this._lastInput = null, this._inDialog && (this._dialogInput.css({
                    position: "absolute",
                    left: "0",
                    top: "-100px"
                }), t.blockUI && (t.unblockUI(), t("body").append(this.dpDiv))), this._inDialog = !1)
            },
            _tidyDialog: function(t) {
                t.dpDiv.removeClass(this._dialogClass).unbind(".ui-datepicker-calendar")
            },
            _checkExternalClick: function(e) {
                if (t.datepicker._curInst) {
                    var i = t(e.target),
                        n = t.datepicker._getInst(i[0]);
                    (i[0].id !== t.datepicker._mainDivId && 0 === i.parents("#" + t.datepicker._mainDivId).length && !i.hasClass(t.datepicker.markerClassName) && !i.closest("." + t.datepicker._triggerClass).length && t.datepicker._datepickerShowing && (!t.datepicker._inDialog || !t.blockUI) || i.hasClass(t.datepicker.markerClassName) && t.datepicker._curInst !== n) && t.datepicker._hideDatepicker()
                }
            },
            _adjustDate: function(e, i, n) {
                var s = t(e),
                    o = this._getInst(s[0]);
                this._isDisabledDatepicker(s[0]) || (this._adjustInstDate(o, i + ("M" === n ? this._get(o, "showCurrentAtPos") : 0), n), this._updateDatepicker(o))
            },
            _gotoToday: function(e) {
                var i, n = t(e),
                    s = this._getInst(n[0]);
                this._get(s, "gotoCurrent") && s.currentDay ? (s.selectedDay = s.currentDay, s.drawMonth = s.selectedMonth = s.currentMonth, s.drawYear = s.selectedYear = s.currentYear) : (i = new Date, s.selectedDay = i.getDate(), s.drawMonth = s.selectedMonth = i.getMonth(), s.drawYear = s.selectedYear = i.getFullYear()), this._notifyChange(s), this._adjustDate(n)
            },
            _selectMonthYear: function(e, i, n) {
                var s = t(e),
                    o = this._getInst(s[0]);
                o["selected" + ("M" === n ? "Month" : "Year")] = o["draw" + ("M" === n ? "Month" : "Year")] = parseInt(i.options[i.selectedIndex].value, 10), this._notifyChange(o), this._adjustDate(s)
            },
            _selectDay: function(e, i, n, s) {
                var o, a = t(e);
                t(s).hasClass(this._unselectableClass) || this._isDisabledDatepicker(a[0]) || (o = this._getInst(a[0]), o.selectedDay = o.currentDay = t("a", s).html(), o.selectedMonth = o.currentMonth = i, o.selectedYear = o.currentYear = n, this._selectDate(e, this._formatDate(o, o.currentDay, o.currentMonth, o.currentYear)))
            },
            _clearDate: function(e) {
                var i = t(e);
                this._selectDate(i, "")
            },
            _selectDate: function(e, i) {
                var n, s = t(e),
                    o = this._getInst(s[0]);
                i = null != i ? i : this._formatDate(o), o.input && o.input.val(i), this._updateAlternate(o), n = this._get(o, "onSelect"), n ? n.apply(o.input ? o.input[0] : null, [i, o]) : o.input && o.input.trigger("change"), o.inline ? this._updateDatepicker(o) : (this._hideDatepicker(), this._lastInput = o.input[0], "object" != typeof o.input[0] && o.input.focus(), this._lastInput = null)
            },
            _updateAlternate: function(e) {
                var i, n, s, o = this._get(e, "altField");
                o && (i = this._get(e, "altFormat") || this._get(e, "dateFormat"), n = this._getDate(e), s = this.formatDate(i, n, this._getFormatConfig(e)), t(o).each(function() {
                    t(this).val(s)
                }))
            },
            noWeekends: function(t) {
                var e = t.getDay();
                return [e > 0 && 6 > e, ""]
            },
            iso8601Week: function(t) {
                var e, i = new Date(t.getTime());
                return i.setDate(i.getDate() + 4 - (i.getDay() || 7)), e = i.getTime(), i.setMonth(0), i.setDate(1), Math.floor(Math.round((e - i) / 864e5) / 7) + 1
            },
            parseDate: function(e, i, n) {
                if (null == e || null == i) throw "Invalid arguments";
                if (i = "object" == typeof i ? i.toString() : i + "", "" === i) return null;
                var s, o, a, r, l = 0,
                    h = (n ? n.shortYearCutoff : null) || this._defaults.shortYearCutoff,
                    c = "string" != typeof h ? h : (new Date).getFullYear() % 100 + parseInt(h, 10),
                    u = (n ? n.dayNamesShort : null) || this._defaults.dayNamesShort,
                    d = (n ? n.dayNames : null) || this._defaults.dayNames,
                    p = (n ? n.monthNamesShort : null) || this._defaults.monthNamesShort,
                    f = (n ? n.monthNames : null) || this._defaults.monthNames,
                    m = -1,
                    g = -1,
                    v = -1,
                    b = -1,
                    y = !1,
                    _ = function(t) {
                        var i = s + 1 < e.length && e.charAt(s + 1) === t;
                        return i && s++, i
                    },
                    w = function(t) {
                        var e = _(t),
                            n = "@" === t ? 14 : "!" === t ? 20 : "y" === t && e ? 4 : "o" === t ? 3 : 2,
                            s = "y" === t ? n : 1,
                            o = new RegExp("^\\d{" + s + "," + n + "}"),
                            a = i.substring(l).match(o);
                        if (!a) throw "Missing number at position " + l;
                        return l += a[0].length, parseInt(a[0], 10)
                    },
                    k = function(e, n, s) {
                        var o = -1,
                            a = t.map(_(e) ? s : n, function(t, e) {
                                return [
                                    [e, t]
                                ]
                            }).sort(function(t, e) {
                                return -(t[1].length - e[1].length)
                            });
                        if (t.each(a, function(t, e) {
                            var n = e[1];
                            return i.substr(l, n.length).toLowerCase() === n.toLowerCase() ? (o = e[0], l += n.length, !1) : void 0
                        }), -1 !== o) return o + 1;
                        throw "Unknown name at position " + l
                    },
                    C = function() {
                        if (i.charAt(l) !== e.charAt(s)) throw "Unexpected literal at position " + l;
                        l++
                    };
                for (s = 0; s < e.length; s++)
                    if (y) "'" !== e.charAt(s) || _("'") ? C() : y = !1;
                    else switch (e.charAt(s)) {
                        case "d":
                            v = w("d");
                            break;
                        case "D":
                            k("D", u, d);
                            break;
                        case "o":
                            b = w("o");
                            break;
                        case "m":
                            g = w("m");
                            break;
                        case "M":
                            g = k("M", p, f);
                            break;
                        case "y":
                            m = w("y");
                            break;
                        case "@":
                            r = new Date(w("@")), m = r.getFullYear(), g = r.getMonth() + 1, v = r.getDate();
                            break;
                        case "!":
                            r = new Date((w("!") - this._ticksTo1970) / 1e4), m = r.getFullYear(), g = r.getMonth() + 1, v = r.getDate();
                            break;
                        case "'":
                            _("'") ? C() : y = !0;
                            break;
                        default:
                            C()
                    }
                if (l < i.length && (a = i.substr(l), !/^\s+/.test(a))) throw "Extra/unparsed characters found in date: " + a;
                if (-1 === m ? m = (new Date).getFullYear() : 100 > m && (m += (new Date).getFullYear() - (new Date).getFullYear() % 100 + (c >= m ? 0 : -100)), b > -1)
                    for (g = 1, v = b;;) {
                        if (o = this._getDaysInMonth(m, g - 1), o >= v) break;
                        g++, v -= o
                    }
                if (r = this._daylightSavingAdjust(new Date(m, g - 1, v)), r.getFullYear() !== m || r.getMonth() + 1 !== g || r.getDate() !== v) throw "Invalid date";
                return r
            },
            ATOM: "yy-mm-dd",
            COOKIE: "D, dd M yy",
            ISO_8601: "yy-mm-dd",
            RFC_822: "D, d M y",
            RFC_850: "DD, dd-M-y",
            RFC_1036: "D, d M y",
            RFC_1123: "D, d M yy",
            RFC_2822: "D, d M yy",
            RSS: "D, d M y",
            TICKS: "!",
            TIMESTAMP: "@",
            W3C: "yy-mm-dd",
            _ticksTo1970: 24 * (718685 + Math.floor(492.5) - Math.floor(19.7) + Math.floor(4.925)) * 60 * 60 * 1e7,
            formatDate: function(t, e, i) {
                if (!e) return "";
                var n, s = (i ? i.dayNamesShort : null) || this._defaults.dayNamesShort,
                    o = (i ? i.dayNames : null) || this._defaults.dayNames,
                    a = (i ? i.monthNamesShort : null) || this._defaults.monthNamesShort,
                    r = (i ? i.monthNames : null) || this._defaults.monthNames,
                    l = function(e) {
                        var i = n + 1 < t.length && t.charAt(n + 1) === e;
                        return i && n++, i
                    },
                    h = function(t, e, i) {
                        var n = "" + e;
                        if (l(t))
                            for (; n.length < i;) n = "0" + n;
                        return n
                    },
                    c = function(t, e, i, n) {
                        return l(t) ? n[e] : i[e]
                    },
                    u = "",
                    d = !1;
                if (e)
                    for (n = 0; n < t.length; n++)
                        if (d) "'" !== t.charAt(n) || l("'") ? u += t.charAt(n) : d = !1;
                        else switch (t.charAt(n)) {
                            case "d":
                                u += h("d", e.getDate(), 2);
                                break;
                            case "D":
                                u += c("D", e.getDay(), s, o);
                                break;
                            case "o":
                                u += h("o", Math.round((new Date(e.getFullYear(), e.getMonth(), e.getDate()).getTime() - new Date(e.getFullYear(), 0, 0).getTime()) / 864e5), 3);
                                break;
                            case "m":
                                u += h("m", e.getMonth() + 1, 2);
                                break;
                            case "M":
                                u += c("M", e.getMonth(), a, r);
                                break;
                            case "y":
                                u += l("y") ? e.getFullYear() : (e.getYear() % 100 < 10 ? "0" : "") + e.getYear() % 100;
                                break;
                            case "@":
                                u += e.getTime();
                                break;
                            case "!":
                                u += 1e4 * e.getTime() + this._ticksTo1970;
                                break;
                            case "'":
                                l("'") ? u += "'" : d = !0;
                                break;
                            default:
                                u += t.charAt(n)
                        }
                return u
            },
            _possibleChars: function(t) {
                var e, i = "",
                    n = !1,
                    s = function(i) {
                        var n = e + 1 < t.length && t.charAt(e + 1) === i;
                        return n && e++, n
                    };
                for (e = 0; e < t.length; e++)
                    if (n) "'" !== t.charAt(e) || s("'") ? i += t.charAt(e) : n = !1;
                    else switch (t.charAt(e)) {
                        case "d":
                        case "m":
                        case "y":
                        case "@":
                            i += "0123456789";
                            break;
                        case "D":
                        case "M":
                            return null;
                        case "'":
                            s("'") ? i += "'" : n = !0;
                            break;
                        default:
                            i += t.charAt(e)
                    }
                return i
            },
            _get: function(t, e) {
                return void 0 !== t.settings[e] ? t.settings[e] : this._defaults[e]
            },
            _setDateFromField: function(t, e) {
                if (t.input.val() !== t.lastVal) {
                    var i = this._get(t, "dateFormat"),
                        n = t.lastVal = t.input ? t.input.val() : null,
                        s = this._getDefaultDate(t),
                        o = s,
                        a = this._getFormatConfig(t);
                    try {
                        o = this.parseDate(i, n, a) || s
                    } catch (r) {
                        n = e ? "" : n
                    }
                    t.selectedDay = o.getDate(), t.drawMonth = t.selectedMonth = o.getMonth(), t.drawYear = t.selectedYear = o.getFullYear(), t.currentDay = n ? o.getDate() : 0, t.currentMonth = n ? o.getMonth() : 0, t.currentYear = n ? o.getFullYear() : 0, this._adjustInstDate(t)
                }
            },
            _getDefaultDate: function(t) {
                return this._restrictMinMax(t, this._determineDate(t, this._get(t, "defaultDate"), new Date))
            },
            _determineDate: function(e, i, n) {
                var s = function(t) {
                        var e = new Date;
                        return e.setDate(e.getDate() + t), e
                    },
                    o = function(i) {
                        try {
                            return t.datepicker.parseDate(t.datepicker._get(e, "dateFormat"), i, t.datepicker._getFormatConfig(e))
                        } catch (n) {}
                        for (var s = (i.toLowerCase().match(/^c/) ? t.datepicker._getDate(e) : null) || new Date, o = s.getFullYear(), a = s.getMonth(), r = s.getDate(), l = /([+\-]?[0-9]+)\s*(d|D|w|W|m|M|y|Y)?/g, h = l.exec(i); h;) {
                            switch (h[2] || "d") {
                                case "d":
                                case "D":
                                    r += parseInt(h[1], 10);
                                    break;
                                case "w":
                                case "W":
                                    r += 7 * parseInt(h[1], 10);
                                    break;
                                case "m":
                                case "M":
                                    a += parseInt(h[1], 10), r = Math.min(r, t.datepicker._getDaysInMonth(o, a));
                                    break;
                                case "y":
                                case "Y":
                                    o += parseInt(h[1], 10), r = Math.min(r, t.datepicker._getDaysInMonth(o, a))
                            }
                            h = l.exec(i)
                        }
                        return new Date(o, a, r)
                    },
                    a = null == i || "" === i ? n : "string" == typeof i ? o(i) : "number" == typeof i ? isNaN(i) ? n : s(i) : new Date(i.getTime());
                return a = a && "Invalid Date" === a.toString() ? n : a, a && (a.setHours(0), a.setMinutes(0), a.setSeconds(0), a.setMilliseconds(0)), this._daylightSavingAdjust(a)
            },
            _daylightSavingAdjust: function(t) {
                return t ? (t.setHours(t.getHours() > 12 ? t.getHours() + 2 : 0), t) : null
            },
            _setDate: function(t, e, i) {
                var n = !e,
                    s = t.selectedMonth,
                    o = t.selectedYear,
                    a = this._restrictMinMax(t, this._determineDate(t, e, new Date));
                t.selectedDay = t.currentDay = a.getDate(), t.drawMonth = t.selectedMonth = t.currentMonth = a.getMonth(), t.drawYear = t.selectedYear = t.currentYear = a.getFullYear(), s === t.selectedMonth && o === t.selectedYear || i || this._notifyChange(t), this._adjustInstDate(t), t.input && t.input.val(n ? "" : this._formatDate(t))
            },
            _getDate: function(t) {
                var e = !t.currentYear || t.input && "" === t.input.val() ? null : this._daylightSavingAdjust(new Date(t.currentYear, t.currentMonth, t.currentDay));
                return e
            },
            _attachHandlers: function(e) {
                var i = this._get(e, "stepMonths"),
                    n = "#" + e.id.replace(/\\\\/g, "\\");
                e.dpDiv.find("[data-handler]").map(function() {
                    var e = {
                        prev: function() {
                            t.datepicker._adjustDate(n, -i, "M")
                        },
                        next: function() {
                            t.datepicker._adjustDate(n, +i, "M")
                        },
                        hide: function() {
                            t.datepicker._hideDatepicker()
                        },
                        today: function() {
                            t.datepicker._gotoToday(n)
                        },
                        selectDay: function() {
                            return t.datepicker._selectDay(n, +this.getAttribute("data-month"), +this.getAttribute("data-year"), this), !1
                        },
                        selectMonth: function() {
                            return t.datepicker._selectMonthYear(n, this, "M"), !1
                        },
                        selectYear: function() {
                            return t.datepicker._selectMonthYear(n, this, "Y"), !1
                        }
                    };
                    t(this).bind(this.getAttribute("data-event"), e[this.getAttribute("data-handler")])
                })
            },
            _generateHTML: function(t) {
                var e, i, n, s, o, a, r, l, h, c, u, d, p, f, m, g, v, b, y, _, w, k, C, x, E, T, S, D, A, P, I, M, N, H, B, F, L, O, R, z = new Date,
                    W = this._daylightSavingAdjust(new Date(z.getFullYear(), z.getMonth(), z.getDate())),
                    j = this._get(t, "isRTL"),
                    U = this._get(t, "showButtonPanel"),
                    q = this._get(t, "hideIfNoPrevNext"),
                    K = this._get(t, "navigationAsDateFormat"),
                    Y = this._getNumberOfMonths(t),
                    V = this._get(t, "showCurrentAtPos"),
                    G = this._get(t, "stepMonths"),
                    X = 1 !== Y[0] || 1 !== Y[1],
                    $ = this._daylightSavingAdjust(t.currentDay ? new Date(t.currentYear, t.currentMonth, t.currentDay) : new Date(9999, 9, 9)),
                    Q = this._getMinMaxDate(t, "min"),
                    Z = this._getMinMaxDate(t, "max"),
                    J = t.drawMonth - V,
                    tt = t.drawYear;
                if (0 > J && (J += 12, tt--), Z)
                    for (e = this._daylightSavingAdjust(new Date(Z.getFullYear(), Z.getMonth() - Y[0] * Y[1] + 1, Z.getDate())), e = Q && Q > e ? Q : e; this._daylightSavingAdjust(new Date(tt, J, 1)) > e;) J--, 0 > J && (J = 11, tt--);
                for (t.drawMonth = J, t.drawYear = tt, i = this._get(t, "prevText"), i = K ? this.formatDate(i, this._daylightSavingAdjust(new Date(tt, J - G, 1)), this._getFormatConfig(t)) : i, n = this._canAdjustMonth(t, -1, tt, J) ? "<a class='ui-datepicker-prev ui-corner-all' data-handler='prev' data-event='click' title='" + i + "'><span class='ui-icon ui-icon-circle-triangle-" + (j ? "e" : "w") + "'>" + i + "</span></a>" : q ? "" : "<a class='ui-datepicker-prev ui-corner-all ui-state-disabled' title='" + i + "'><span class='ui-icon ui-icon-circle-triangle-" + (j ? "e" : "w") + "'>" + i + "</span></a>", s = this._get(t, "nextText"), s = K ? this.formatDate(s, this._daylightSavingAdjust(new Date(tt, J + G, 1)), this._getFormatConfig(t)) : s, o = this._canAdjustMonth(t, 1, tt, J) ? "<a class='ui-datepicker-next ui-corner-all' data-handler='next' data-event='click' title='" + s + "'><span class='ui-icon ui-icon-circle-triangle-" + (j ? "w" : "e") + "'>" + s + "</span></a>" : q ? "" : "<a class='ui-datepicker-next ui-corner-all ui-state-disabled' title='" + s + "'><span class='ui-icon ui-icon-circle-triangle-" + (j ? "w" : "e") + "'>" + s + "</span></a>", a = this._get(t, "currentText"), r = this._get(t, "gotoCurrent") && t.currentDay ? $ : W, a = K ? this.formatDate(a, r, this._getFormatConfig(t)) : a, l = t.inline ? "" : "<button type='button' class='ui-datepicker-close ui-state-default ui-priority-primary ui-corner-all' data-handler='hide' data-event='click'>" + this._get(t, "closeText") + "</button>", h = U ? "<div class='ui-datepicker-buttonpane ui-widget-content'>" + (j ? l : "") + (this._isInRange(t, r) ? "<button type='button' class='ui-datepicker-current ui-state-default ui-priority-secondary ui-corner-all' data-handler='today' data-event='click'>" + a + "</button>" : "") + (j ? "" : l) + "</div>" : "", c = parseInt(this._get(t, "firstDay"), 10), c = isNaN(c) ? 0 : c, u = this._get(t, "showWeek"), d = this._get(t, "dayNames"), p = this._get(t, "dayNamesMin"), f = this._get(t, "monthNames"), m = this._get(t, "monthNamesShort"), g = this._get(t, "beforeShowDay"), v = this._get(t, "showOtherMonths"), b = this._get(t, "selectOtherMonths"), y = this._getDefaultDate(t), _ = "", k = 0; k < Y[0]; k++) {
                    for (C = "", this.maxRows = 4, x = 0; x < Y[1]; x++) {
                        if (E = this._daylightSavingAdjust(new Date(tt, J, t.selectedDay)), T = " ui-corner-all", S = "", X) {
                            if (S += "<div class='ui-datepicker-group", Y[1] > 1) switch (x) {
                                case 0:
                                    S += " ui-datepicker-group-first", T = " ui-corner-" + (j ? "right" : "left");
                                    break;
                                case Y[1] - 1:
                                    S += " ui-datepicker-group-last", T = " ui-corner-" + (j ? "left" : "right");
                                    break;
                                default:
                                    S += " ui-datepicker-group-middle", T = ""
                            }
                            S += "'>"
                        }
                        for (S += "<div class='ui-datepicker-header ui-widget-header ui-helper-clearfix" + T + "'>" + (/all|left/.test(T) && 0 === k ? j ? o : n : "") + (/all|right/.test(T) && 0 === k ? j ? n : o : "") + this._generateMonthYearHeader(t, J, tt, Q, Z, k > 0 || x > 0, f, m) + "</div><table class='ui-datepicker-calendar'><thead><tr>", D = u ? "<th class='ui-datepicker-week-col'>" + this._get(t, "weekHeader") + "</th>" : "", w = 0; 7 > w; w++) A = (w + c) % 7, D += "<th scope='col'" + ((w + c + 6) % 7 >= 5 ? " class='ui-datepicker-week-end'" : "") + "><span title='" + d[A] + "'>" + p[A] + "</span></th>";
                        for (S += D + "</tr></thead><tbody>", P = this._getDaysInMonth(tt, J), tt === t.selectedYear && J === t.selectedMonth && (t.selectedDay = Math.min(t.selectedDay, P)), I = (this._getFirstDayOfMonth(tt, J) - c + 7) % 7, M = Math.ceil((I + P) / 7), N = X && this.maxRows > M ? this.maxRows : M, this.maxRows = N, H = this._daylightSavingAdjust(new Date(tt, J, 1 - I)), B = 0; N > B; B++) {
                            for (S += "<tr>", F = u ? "<td class='ui-datepicker-week-col'>" + this._get(t, "calculateWeek")(H) + "</td>" : "", w = 0; 7 > w; w++) L = g ? g.apply(t.input ? t.input[0] : null, [H]) : [!0, ""], O = H.getMonth() !== J, R = O && !b || !L[0] || Q && Q > H || Z && H > Z, F += "<td class='" + ((w + c + 6) % 7 >= 5 ? " ui-datepicker-week-end" : "") + (O ? " ui-datepicker-other-month" : "") + (H.getTime() === E.getTime() && J === t.selectedMonth && t._keyEvent || y.getTime() === H.getTime() && y.getTime() === E.getTime() ? " " + this._dayOverClass : "") + (R ? " " + this._unselectableClass + " ui-state-disabled" : "") + (O && !v ? "" : " " + L[1] + (H.getTime() === $.getTime() ? " " + this._currentClass : "") + (H.getTime() === W.getTime() ? " ui-datepicker-today" : "")) + "'" + (O && !v || !L[2] ? "" : " title='" + L[2].replace(/'/g, "&#39;") + "'") + (R ? "" : " data-handler='selectDay' data-event='click' data-month='" + H.getMonth() + "' data-year='" + H.getFullYear() + "'") + ">" + (O && !v ? "&#xa0;" : R ? "<span class='ui-state-default'>" + H.getDate() + "</span>" : "<a class='ui-state-default" + (H.getTime() === W.getTime() ? " ui-state-highlight" : "") + (H.getTime() === $.getTime() ? " ui-state-active" : "") + (O ? " ui-priority-secondary" : "") + "' href='#'>" + H.getDate() + "</a>") + "</td>", H.setDate(H.getDate() + 1), H = this._daylightSavingAdjust(H);
                            S += F + "</tr>"
                        }
                        J++, J > 11 && (J = 0, tt++), S += "</tbody></table>" + (X ? "</div>" + (Y[0] > 0 && x === Y[1] - 1 ? "<div class='ui-datepicker-row-break'></div>" : "") : ""), C += S
                    }
                    _ += C
                }
                return _ += h, t._keyEvent = !1, _
            },
            _generateMonthYearHeader: function(t, e, i, n, s, o, a, r) {
                var l, h, c, u, d, p, f, m, g = this._get(t, "changeMonth"),
                    v = this._get(t, "changeYear"),
                    b = this._get(t, "showMonthAfterYear"),
                    y = "<div class='ui-datepicker-title'>",
                    _ = "";
                if (o || !g) _ += "<span class='ui-datepicker-month'>" + a[e] + "</span>";
                else {
                    for (l = n && n.getFullYear() === i, h = s && s.getFullYear() === i, _ += "<select class='ui-datepicker-month' data-handler='selectMonth' data-event='change'>", c = 0; 12 > c; c++)(!l || c >= n.getMonth()) && (!h || c <= s.getMonth()) && (_ += "<option value='" + c + "'" + (c === e ? " selected='selected'" : "") + ">" + r[c] + "</option>");
                    _ += "</select>"
                }
                if (b || (y += _ + (!o && g && v ? "" : "&#xa0;")), !t.yearshtml)
                    if (t.yearshtml = "", o || !v) y += "<span class='ui-datepicker-year'>" + i + "</span>";
                    else {
                        for (u = this._get(t, "yearRange").split(":"), d = (new Date).getFullYear(), p = function(t) {
                            var e = t.match(/c[+\-].*/) ? i + parseInt(t.substring(1), 10) : t.match(/[+\-].*/) ? d + parseInt(t, 10) : parseInt(t, 10);
                            return isNaN(e) ? d : e
                        }, f = p(u[0]), m = Math.max(f, p(u[1] || "")), f = n ? Math.max(f, n.getFullYear()) : f, m = s ? Math.min(m, s.getFullYear()) : m, t.yearshtml += "<select class='ui-datepicker-year' data-handler='selectYear' data-event='change'>"; m >= f; f++) t.yearshtml += "<option value='" + f + "'" + (f === i ? " selected='selected'" : "") + ">" + f + "</option>";
                        t.yearshtml += "</select>", y += t.yearshtml, t.yearshtml = null
                    }
                return y += this._get(t, "yearSuffix"), b && (y += (!o && g && v ? "" : "&#xa0;") + _), y += "</div>"
            },
            _adjustInstDate: function(t, e, i) {
                var n = t.drawYear + ("Y" === i ? e : 0),
                    s = t.drawMonth + ("M" === i ? e : 0),
                    o = Math.min(t.selectedDay, this._getDaysInMonth(n, s)) + ("D" === i ? e : 0),
                    a = this._restrictMinMax(t, this._daylightSavingAdjust(new Date(n, s, o)));
                t.selectedDay = a.getDate(), t.drawMonth = t.selectedMonth = a.getMonth(), t.drawYear = t.selectedYear = a.getFullYear(), ("M" === i || "Y" === i) && this._notifyChange(t)
            },
            _restrictMinMax: function(t, e) {
                var i = this._getMinMaxDate(t, "min"),
                    n = this._getMinMaxDate(t, "max"),
                    s = i && i > e ? i : e;
                return n && s > n ? n : s
            },
            _notifyChange: function(t) {
                var e = this._get(t, "onChangeMonthYear");
                e && e.apply(t.input ? t.input[0] : null, [t.selectedYear, t.selectedMonth + 1, t])
            },
            _getNumberOfMonths: function(t) {
                var e = this._get(t, "numberOfMonths");
                return null == e ? [1, 1] : "number" == typeof e ? [1, e] : e
            },
            _getMinMaxDate: function(t, e) {
                return this._determineDate(t, this._get(t, e + "Date"), null)
            },
            _getDaysInMonth: function(t, e) {
                return 32 - this._daylightSavingAdjust(new Date(t, e, 32)).getDate()
            },
            _getFirstDayOfMonth: function(t, e) {
                return new Date(t, e, 1).getDay()
            },
            _canAdjustMonth: function(t, e, i, n) {
                var s = this._getNumberOfMonths(t),
                    o = this._daylightSavingAdjust(new Date(i, n + (0 > e ? e : s[0] * s[1]), 1));
                return 0 > e && o.setDate(this._getDaysInMonth(o.getFullYear(), o.getMonth())), this._isInRange(t, o)
            },
            _isInRange: function(t, e) {
                var i, n, s = this._getMinMaxDate(t, "min"),
                    o = this._getMinMaxDate(t, "max"),
                    a = null,
                    r = null,
                    l = this._get(t, "yearRange");
                return l && (i = l.split(":"), n = (new Date).getFullYear(), a = parseInt(i[0], 10), r = parseInt(i[1], 10), i[0].match(/[+\-].*/) && (a += n), i[1].match(/[+\-].*/) && (r += n)), (!s || e.getTime() >= s.getTime()) && (!o || e.getTime() <= o.getTime()) && (!a || e.getFullYear() >= a) && (!r || e.getFullYear() <= r)
            },
            _getFormatConfig: function(t) {
                var e = this._get(t, "shortYearCutoff");
                return e = "string" != typeof e ? e : (new Date).getFullYear() % 100 + parseInt(e, 10), {
                    shortYearCutoff: e,
                    dayNamesShort: this._get(t, "dayNamesShort"),
                    dayNames: this._get(t, "dayNames"),
                    monthNamesShort: this._get(t, "monthNamesShort"),
                    monthNames: this._get(t, "monthNames")
                }
            },
            _formatDate: function(t, e, i, n) {
                e || (t.currentDay = t.selectedDay, t.currentMonth = t.selectedMonth, t.currentYear = t.selectedYear);
                var s = e ? "object" == typeof e ? e : this._daylightSavingAdjust(new Date(n, i, e)) : this._daylightSavingAdjust(new Date(t.currentYear, t.currentMonth, t.currentDay));
                return this.formatDate(this._get(t, "dateFormat"), s, this._getFormatConfig(t))
            }
        }), t.fn.datepicker = function(e) {
            if (!this.length) return this;
            t.datepicker.initialized || (t(document).mousedown(t.datepicker._checkExternalClick), t.datepicker.initialized = !0), 0 === t("#" + t.datepicker._mainDivId).length && t("body").append(t.datepicker.dpDiv);
            var i = Array.prototype.slice.call(arguments, 1);
            return "string" != typeof e || "isDisabled" !== e && "getDate" !== e && "widget" !== e ? "option" === e && 2 === arguments.length && "string" == typeof arguments[1] ? t.datepicker["_" + e + "Datepicker"].apply(t.datepicker, [this[0]].concat(i)) : this.each(function() {
                "string" == typeof e ? t.datepicker["_" + e + "Datepicker"].apply(t.datepicker, [this].concat(i)) : t.datepicker._attachDatepicker(this, e)
            }) : t.datepicker["_" + e + "Datepicker"].apply(t.datepicker, [this[0]].concat(i))
        }, t.datepicker = new s, t.datepicker.initialized = !1, t.datepicker.uuid = (new Date).getTime(), t.datepicker.version = "1.11.2";
        var b = (t.datepicker, t.widget("ui.dialog", {
                version: "1.11.2",
                options: {
                    appendTo: "body",
                    autoOpen: !0,
                    buttons: [],
                    closeOnEscape: !0,
                    closeText: "Close",
                    dialogClass: "",
                    draggable: !0,
                    hide: null,
                    height: "auto",
                    maxHeight: null,
                    maxWidth: null,
                    minHeight: 150,
                    minWidth: 150,
                    modal: !1,
                    position: {
                        my: "center",
                        at: "center",
                        of: window,
                        collision: "fit",
                        using: function(e) {
                            var i = t(this).css(e).offset().top;
                            0 > i && t(this).css("top", e.top - i)
                        }
                    },
                    resizable: !0,
                    show: null,
                    title: null,
                    width: 300,
                    beforeClose: null,
                    close: null,
                    drag: null,
                    dragStart: null,
                    dragStop: null,
                    focus: null,
                    open: null,
                    resize: null,
                    resizeStart: null,
                    resizeStop: null
                },
                sizeRelatedOptions: {
                    buttons: !0,
                    height: !0,
                    maxHeight: !0,
                    maxWidth: !0,
                    minHeight: !0,
                    minWidth: !0,
                    width: !0
                },
                resizableRelatedOptions: {
                    maxHeight: !0,
                    maxWidth: !0,
                    minHeight: !0,
                    minWidth: !0
                },
                _create: function() {
                    this.originalCss = {
                        display: this.element[0].style.display,
                        width: this.element[0].style.width,
                        minHeight: this.element[0].style.minHeight,
                        maxHeight: this.element[0].style.maxHeight,
                        height: this.element[0].style.height
                    }, this.originalPosition = {
                        parent: this.element.parent(),
                        index: this.element.parent().children().index(this.element)
                    }, this.originalTitle = this.element.attr("title"), this.options.title = this.options.title || this.originalTitle, this._createWrapper(), this.element.show().removeAttr("title").addClass("ui-dialog-content ui-widget-content").appendTo(this.uiDialog), this._createTitlebar(), this._createButtonPane(), this.options.draggable && t.fn.draggable && this._makeDraggable(), this.options.resizable && t.fn.resizable && this._makeResizable(), this._isOpen = !1, this._trackFocus()
                },
                _init: function() {
                    this.options.autoOpen && this.open()
                },
                _appendTo: function() {
                    var e = this.options.appendTo;
                    return e && (e.jquery || e.nodeType) ? t(e) : this.document.find(e || "body").eq(0)
                },
                _destroy: function() {
                    var t, e = this.originalPosition;
                    this._destroyOverlay(), this.element.removeUniqueId().removeClass("ui-dialog-content ui-widget-content").css(this.originalCss).detach(), this.uiDialog.stop(!0, !0).remove(), this.originalTitle && this.element.attr("title", this.originalTitle), t = e.parent.children().eq(e.index), t.length && t[0] !== this.element[0] ? t.before(this.element) : e.parent.append(this.element)
                },
                widget: function() {
                    return this.uiDialog
                },
                disable: t.noop,
                enable: t.noop,
                close: function(e) {
                    var i, n = this;
                    if (this._isOpen && this._trigger("beforeClose", e) !== !1) {
                        if (this._isOpen = !1, this._focusedElement = null, this._destroyOverlay(), this._untrackInstance(), !this.opener.filter(":focusable").focus().length) try {
                            i = this.document[0].activeElement, i && "body" !== i.nodeName.toLowerCase() && t(i).blur()
                        } catch (s) {}
                        this._hide(this.uiDialog, this.options.hide, function() {
                            n._trigger("close", e)
                        })
                    }
                },
                isOpen: function() {
                    return this._isOpen
                },
                moveToTop: function() {
                    this._moveToTop()
                },
                _moveToTop: function(e, i) {
                    var n = !1,
                        s = this.uiDialog.siblings(".ui-front:visible").map(function() {
                            return +t(this).css("z-index")
                        }).get(),
                        o = Math.max.apply(null, s);
                    return o >= +this.uiDialog.css("z-index") && (this.uiDialog.css("z-index", o + 1), n = !0), n && !i && this._trigger("focus", e), n
                },
                open: function() {
                    var e = this;
                    return this._isOpen ? void(this._moveToTop() && this._focusTabbable()) : (this._isOpen = !0, this.opener = t(this.document[0].activeElement), this._size(), this._position(), this._createOverlay(), this._moveToTop(null, !0), this.overlay && this.overlay.css("z-index", this.uiDialog.css("z-index") - 1), this._show(this.uiDialog, this.options.show, function() {
                        e._focusTabbable(), e._trigger("focus")
                    }), this._makeFocusTarget(), void this._trigger("open"))
                },
                _focusTabbable: function() {
                    var t = this._focusedElement;
                    t || (t = this.element.find("[autofocus]")), t.length || (t = this.element.find(":tabbable")), t.length || (t = this.uiDialogButtonPane.find(":tabbable")), t.length || (t = this.uiDialogTitlebarClose.filter(":tabbable")), t.length || (t = this.uiDialog), t.eq(0).focus()
                },
                _keepFocus: function(e) {
                    function i() {
                        var e = this.document[0].activeElement,
                            i = this.uiDialog[0] === e || t.contains(this.uiDialog[0], e);
                        i || this._focusTabbable()
                    }
                    e.preventDefault(), i.call(this), this._delay(i)
                },
                _createWrapper: function() {
                    this.uiDialog = t("<div>").addClass("ui-dialog ui-widget ui-widget-content ui-corner-all ui-front " + this.options.dialogClass).hide().attr({
                        tabIndex: -1,
                        role: "dialog"
                    }).appendTo(this._appendTo()), this._on(this.uiDialog, {
                        keydown: function(e) {
                            if (this.options.closeOnEscape && !e.isDefaultPrevented() && e.keyCode && e.keyCode === t.ui.keyCode.ESCAPE) return e.preventDefault(), void this.close(e);
                            if (e.keyCode === t.ui.keyCode.TAB && !e.isDefaultPrevented()) {
                                var i = this.uiDialog.find(":tabbable"),
                                    n = i.filter(":first"),
                                    s = i.filter(":last");
                                e.target !== s[0] && e.target !== this.uiDialog[0] || e.shiftKey ? e.target !== n[0] && e.target !== this.uiDialog[0] || !e.shiftKey || (this._delay(function() {
                                    s.focus()
                                }), e.preventDefault()) : (this._delay(function() {
                                    n.focus()
                                }), e.preventDefault())
                            }
                        },
                        mousedown: function(t) {
                            this._moveToTop(t) && this._focusTabbable()
                        }
                    }), this.element.find("[aria-describedby]").length || this.uiDialog.attr({
                        "aria-describedby": this.element.uniqueId().attr("id")
                    })
                },
                _createTitlebar: function() {
                    var e;
                    this.uiDialogTitlebar = t("<div>").addClass("ui-dialog-titlebar ui-widget-header ui-corner-all ui-helper-clearfix").prependTo(this.uiDialog), this._on(this.uiDialogTitlebar, {
                        mousedown: function(e) {
                            t(e.target).closest(".ui-dialog-titlebar-close") || this.uiDialog.focus()
                        }
                    }), this.uiDialogTitlebarClose = t("<button type='button'></button>").button({
                        label: this.options.closeText,
                        icons: {
                            primary: "ui-icon-closethick"
                        },
                        text: !1
                    }).addClass("ui-dialog-titlebar-close").appendTo(this.uiDialogTitlebar), this._on(this.uiDialogTitlebarClose, {
                        click: function(t) {
                            t.preventDefault(), this.close(t)
                        }
                    }), e = t("<span>").uniqueId().addClass("ui-dialog-title").prependTo(this.uiDialogTitlebar), this._title(e), this.uiDialog.attr({
                        "aria-labelledby": e.attr("id")
                    })
                },
                _title: function(t) {
                    this.options.title || t.html("&#160;"), t.text(this.options.title)
                },
                _createButtonPane: function() {
                    this.uiDialogButtonPane = t("<div>").addClass("ui-dialog-buttonpane ui-widget-content ui-helper-clearfix"), this.uiButtonSet = t("<div>").addClass("ui-dialog-buttonset").appendTo(this.uiDialogButtonPane), this._createButtons()
                },
                _createButtons: function() {
                    var e = this,
                        i = this.options.buttons;
                    return this.uiDialogButtonPane.remove(), this.uiButtonSet.empty(), t.isEmptyObject(i) || t.isArray(i) && !i.length ? void this.uiDialog.removeClass("ui-dialog-buttons") : (t.each(i, function(i, n) {
                        var s, o;
                        n = t.isFunction(n) ? {
                            click: n,
                            text: i
                        } : n, n = t.extend({
                            type: "button"
                        }, n), s = n.click, n.click = function() {
                            s.apply(e.element[0], arguments)
                        }, o = {
                            icons: n.icons,
                            text: n.showText
                        }, delete n.icons, delete n.showText, t("<button></button>", n).button(o).appendTo(e.uiButtonSet)
                    }), this.uiDialog.addClass("ui-dialog-buttons"), void this.uiDialogButtonPane.appendTo(this.uiDialog))
                },
                _makeDraggable: function() {
                    function e(t) {
                        return {
                            position: t.position,
                            offset: t.offset
                        }
                    }
                    var i = this,
                        n = this.options;
                    this.uiDialog.draggable({
                        cancel: ".ui-dialog-content, .ui-dialog-titlebar-close",
                        handle: ".ui-dialog-titlebar",
                        containment: "document",
                        start: function(n, s) {
                            t(this).addClass("ui-dialog-dragging"), i._blockFrames(), i._trigger("dragStart", n, e(s))
                        },
                        drag: function(t, n) {
                            i._trigger("drag", t, e(n))
                        },
                        stop: function(s, o) {
                            var a = o.offset.left - i.document.scrollLeft(),
                                r = o.offset.top - i.document.scrollTop();
                            n.position = {
                                my: "left top",
                                at: "left" + (a >= 0 ? "+" : "") + a + " top" + (r >= 0 ? "+" : "") + r,
                                of: i.window
                            }, t(this).removeClass("ui-dialog-dragging"), i._unblockFrames(), i._trigger("dragStop", s, e(o))
                        }
                    })
                },
                _makeResizable: function() {
                    function e(t) {
                        return {
                            originalPosition: t.originalPosition,
                            originalSize: t.originalSize,
                            position: t.position,
                            size: t.size
                        }
                    }
                    var i = this,
                        n = this.options,
                        s = n.resizable,
                        o = this.uiDialog.css("position"),
                        a = "string" == typeof s ? s : "n,e,s,w,se,sw,ne,nw";
                    this.uiDialog.resizable({
                        cancel: ".ui-dialog-content",
                        containment: "document",
                        alsoResize: this.element,
                        maxWidth: n.maxWidth,
                        maxHeight: n.maxHeight,
                        minWidth: n.minWidth,
                        minHeight: this._minHeight(),
                        handles: a,
                        start: function(n, s) {
                            t(this).addClass("ui-dialog-resizing"), i._blockFrames(), i._trigger("resizeStart", n, e(s))
                        },
                        resize: function(t, n) {
                            i._trigger("resize", t, e(n))
                        },
                        stop: function(s, o) {
                            var a = i.uiDialog.offset(),
                                r = a.left - i.document.scrollLeft(),
                                l = a.top - i.document.scrollTop();
                            n.height = i.uiDialog.height(), n.width = i.uiDialog.width(), n.position = {
                                my: "left top",
                                at: "left" + (r >= 0 ? "+" : "") + r + " top" + (l >= 0 ? "+" : "") + l,
                                of: i.window
                            }, t(this).removeClass("ui-dialog-resizing"), i._unblockFrames(), i._trigger("resizeStop", s, e(o))
                        }
                    }).css("position", o)
                },
                _trackFocus: function() {
                    this._on(this.widget(), {
                        focusin: function(e) {
                            this._makeFocusTarget(), this._focusedElement = t(e.target)
                        }
                    })
                },
                _makeFocusTarget: function() {
                    this._untrackInstance(), this._trackingInstances().unshift(this)
                },
                _untrackInstance: function() {
                    var e = this._trackingInstances(),
                        i = t.inArray(this, e); - 1 !== i && e.splice(i, 1)
                },
                _trackingInstances: function() {
                    var t = this.document.data("ui-dialog-instances");
                    return t || (t = [], this.document.data("ui-dialog-instances", t)), t
                },
                _minHeight: function() {
                    var t = this.options;
                    return "auto" === t.height ? t.minHeight : Math.min(t.minHeight, t.height)
                },
                _position: function() {
                    var t = this.uiDialog.is(":visible");
                    t || this.uiDialog.show(), this.uiDialog.position(this.options.position), t || this.uiDialog.hide()
                },
                _setOptions: function(e) {
                    var i = this,
                        n = !1,
                        s = {};
                    t.each(e, function(t, e) {
                        i._setOption(t, e), t in i.sizeRelatedOptions && (n = !0), t in i.resizableRelatedOptions && (s[t] = e)
                    }), n && (this._size(), this._position()), this.uiDialog.is(":data(ui-resizable)") && this.uiDialog.resizable("option", s)
                },
                _setOption: function(t, e) {
                    var i, n, s = this.uiDialog;
                    "dialogClass" === t && s.removeClass(this.options.dialogClass).addClass(e), "disabled" !== t && (this._super(t, e), "appendTo" === t && this.uiDialog.appendTo(this._appendTo()), "buttons" === t && this._createButtons(), "closeText" === t && this.uiDialogTitlebarClose.button({
                        label: "" + e
                    }), "draggable" === t && (i = s.is(":data(ui-draggable)"), i && !e && s.draggable("destroy"), !i && e && this._makeDraggable()), "position" === t && this._position(), "resizable" === t && (n = s.is(":data(ui-resizable)"), n && !e && s.resizable("destroy"), n && "string" == typeof e && s.resizable("option", "handles", e), n || e === !1 || this._makeResizable()), "title" === t && this._title(this.uiDialogTitlebar.find(".ui-dialog-title")))
                },
                _size: function() {
                    var t, e, i, n = this.options;
                    this.element.show().css({
                        width: "auto",
                        minHeight: 0,
                        maxHeight: "none",
                        height: 0
                    }), n.minWidth > n.width && (n.width = n.minWidth), t = this.uiDialog.css({
                        height: "auto",
                        width: n.width
                    }).outerHeight(), e = Math.max(0, n.minHeight - t), i = "number" == typeof n.maxHeight ? Math.max(0, n.maxHeight - t) : "none", "auto" === n.height ? this.element.css({
                        minHeight: e,
                        maxHeight: i,
                        height: "auto"
                    }) : this.element.height(Math.max(0, n.height - t)), this.uiDialog.is(":data(ui-resizable)") && this.uiDialog.resizable("option", "minHeight", this._minHeight())
                },
                _blockFrames: function() {
                    this.iframeBlocks = this.document.find("iframe").map(function() {
                        var e = t(this);
                        return t("<div>").css({
                            position: "absolute",
                            width: e.outerWidth(),
                            height: e.outerHeight()
                        }).appendTo(e.parent()).offset(e.offset())[0]
                    })
                },
                _unblockFrames: function() {
                    this.iframeBlocks && (this.iframeBlocks.remove(), delete this.iframeBlocks)
                },
                _allowInteraction: function(e) {
                    return t(e.target).closest(".ui-dialog").length ? !0 : !!t(e.target).closest(".ui-datepicker").length
                },
                _createOverlay: function() {
                    if (this.options.modal) {
                        var e = !0;
                        this._delay(function() {
                            e = !1
                        }), this.document.data("ui-dialog-overlays") || this._on(this.document, {
                            focusin: function(t) {
                                e || this._allowInteraction(t) || (t.preventDefault(), this._trackingInstances()[0]._focusTabbable())
                            }
                        }), this.overlay = t("<div>").addClass("ui-widget-overlay ui-front").appendTo(this._appendTo()), this._on(this.overlay, {
                            mousedown: "_keepFocus"
                        }), this.document.data("ui-dialog-overlays", (this.document.data("ui-dialog-overlays") || 0) + 1)
                    }
                },
                _destroyOverlay: function() {
                    if (this.options.modal && this.overlay) {
                        var t = this.document.data("ui-dialog-overlays") - 1;
                        t ? this.document.data("ui-dialog-overlays", t) : this.document.unbind("focusin").removeData("ui-dialog-overlays"), this.overlay.remove(), this.overlay = null
                    }
                }
            }), t.widget("ui.progressbar", {
                version: "1.11.2",
                options: {
                    max: 100,
                    value: 0,
                    change: null,
                    complete: null
                },
                min: 0,
                _create: function() {
                    this.oldValue = this.options.value = this._constrainedValue(), this.element.addClass("ui-progressbar ui-widget ui-widget-content ui-corner-all").attr({
                        role: "progressbar",
                        "aria-valuemin": this.min
                    }), this.valueDiv = t("<div class='ui-progressbar-value ui-widget-header ui-corner-left'></div>").appendTo(this.element), this._refreshValue()
                },
                _destroy: function() {
                    this.element.removeClass("ui-progressbar ui-widget ui-widget-content ui-corner-all").removeAttr("role").removeAttr("aria-valuemin").removeAttr("aria-valuemax").removeAttr("aria-valuenow"), this.valueDiv.remove()
                },
                value: function(t) {
                    return void 0 === t ? this.options.value : (this.options.value = this._constrainedValue(t), void this._refreshValue())
                },
                _constrainedValue: function(t) {
                    return void 0 === t && (t = this.options.value), this.indeterminate = t === !1, "number" != typeof t && (t = 0), this.indeterminate ? !1 : Math.min(this.options.max, Math.max(this.min, t))
                },
                _setOptions: function(t) {
                    var e = t.value;
                    delete t.value, this._super(t), this.options.value = this._constrainedValue(e), this._refreshValue()
                },
                _setOption: function(t, e) {
                    "max" === t && (e = Math.max(this.min, e)), "disabled" === t && this.element.toggleClass("ui-state-disabled", !!e).attr("aria-disabled", e), this._super(t, e)
                },
                _percentage: function() {
                    return this.indeterminate ? 100 : 100 * (this.options.value - this.min) / (this.options.max - this.min)
                },
                _refreshValue: function() {
                    var e = this.options.value,
                        i = this._percentage();
                    this.valueDiv.toggle(this.indeterminate || e > this.min).toggleClass("ui-corner-right", e === this.options.max).width(i.toFixed(0) + "%"), this.element.toggleClass("ui-progressbar-indeterminate", this.indeterminate), this.indeterminate ? (this.element.removeAttr("aria-valuenow"), this.overlayDiv || (this.overlayDiv = t("<div class='ui-progressbar-overlay'></div>").appendTo(this.valueDiv))) : (this.element.attr({
                        "aria-valuemax": this.options.max,
                        "aria-valuenow": e
                    }), this.overlayDiv && (this.overlayDiv.remove(), this.overlayDiv = null)), this.oldValue !== e && (this.oldValue = e, this._trigger("change")), e === this.options.max && this._trigger("complete")
                }
            }), t.widget("ui.selectmenu", {
                version: "1.11.2",
                defaultElement: "<select>",
                options: {
                    appendTo: null,
                    disabled: null,
                    icons: {
                        button: "ui-icon-triangle-1-s"
                    },
                    position: {
                        my: "left top",
                        at: "left bottom",
                        collision: "none"
                    },
                    width: null,
                    change: null,
                    close: null,
                    focus: null,
                    open: null,
                    select: null
                },
                _create: function() {
                    var t = this.element.uniqueId().attr("id");
                    this.ids = {
                        element: t,
                        button: t + "-button",
                        menu: t + "-menu"
                    }, this._drawButton(), this._drawMenu(), this.options.disabled && this.disable()
                },
                _drawButton: function() {
                    var e = this,
                        i = this.element.attr("tabindex");
                    this.label = t("label[for='" + this.ids.element + "']").attr("for", this.ids.button), this._on(this.label, {
                        click: function(t) {
                            this.button.focus(), t.preventDefault()
                        }
                    }), this.element.hide(), this.button = t("<span>", {
                        "class": "ui-selectmenu-button ui-widget ui-state-default ui-corner-all",
                        tabindex: i || this.options.disabled ? -1 : 0,
                        id: this.ids.button,
                        role: "combobox",
                        "aria-expanded": "false",
                        "aria-autocomplete": "list",
                        "aria-owns": this.ids.menu,
                        "aria-haspopup": "true"
                    }).insertAfter(this.element), t("<span>", {
                        "class": "ui-icon " + this.options.icons.button
                    }).prependTo(this.button), this.buttonText = t("<span>", {
                        "class": "ui-selectmenu-text"
                    }).appendTo(this.button), this._setText(this.buttonText, this.element.find("option:selected").text()), this._resizeButton(), this._on(this.button, this._buttonEvents), this.button.one("focusin", function() {
                        e.menuItems || e._refreshMenu()
                    }), this._hoverable(this.button), this._focusable(this.button)
                },
                _drawMenu: function() {
                    var e = this;
                    this.menu = t("<ul>", {
                        "aria-hidden": "true",
                        "aria-labelledby": this.ids.button,
                        id: this.ids.menu
                    }), this.menuWrap = t("<div>", {
                        "class": "ui-selectmenu-menu ui-front"
                    }).append(this.menu).appendTo(this._appendTo()), this.menuInstance = this.menu.menu({
                        role: "listbox",
                        select: function(t, i) {
                            t.preventDefault(), e._setSelection(), e._select(i.item.data("ui-selectmenu-item"), t)
                        },
                        focus: function(t, i) {
                            var n = i.item.data("ui-selectmenu-item");
                            null != e.focusIndex && n.index !== e.focusIndex && (e._trigger("focus", t, {
                                item: n
                            }), e.isOpen || e._select(n, t)), e.focusIndex = n.index, e.button.attr("aria-activedescendant", e.menuItems.eq(n.index).attr("id"))
                        }
                    }).menu("instance"), this.menu.addClass("ui-corner-bottom").removeClass("ui-corner-all"), this.menuInstance._off(this.menu, "mouseleave"), this.menuInstance._closeOnDocumentClick = function() {
                        return !1
                    }, this.menuInstance._isDivider = function() {
                        return !1
                    }
                },
                refresh: function() {
                    this._refreshMenu(), this._setText(this.buttonText, this._getSelectedItem().text()), this.options.width || this._resizeButton()
                },
                _refreshMenu: function() {
                    this.menu.empty();
                    var t, e = this.element.find("option");
                    e.length && (this._parseOptions(e), this._renderMenu(this.menu, this.items), this.menuInstance.refresh(), this.menuItems = this.menu.find("li").not(".ui-selectmenu-optgroup"), t = this._getSelectedItem(), this.menuInstance.focus(null, t), this._setAria(t.data("ui-selectmenu-item")), this._setOption("disabled", this.element.prop("disabled")))
                },
                open: function(t) {
                    this.options.disabled || (this.menuItems ? (this.menu.find(".ui-state-focus").removeClass("ui-state-focus"), this.menuInstance.focus(null, this._getSelectedItem())) : this._refreshMenu(), this.isOpen = !0, this._toggleAttr(), this._resizeMenu(), this._position(), this._on(this.document, this._documentClick), this._trigger("open", t))
                },
                _position: function() {
                    this.menuWrap.position(t.extend({ of: this.button
                    }, this.options.position))
                },
                close: function(t) {
                    this.isOpen && (this.isOpen = !1, this._toggleAttr(), this.range = null, this._off(this.document), this._trigger("close", t))
                },
                widget: function() {
                    return this.button
                },
                menuWidget: function() {
                    return this.menu
                },
                _renderMenu: function(e, i) {
                    var n = this,
                        s = "";
                    t.each(i, function(i, o) {
                        o.optgroup !== s && (t("<li>", {
                            "class": "ui-selectmenu-optgroup ui-menu-divider" + (o.element.parent("optgroup").prop("disabled") ? " ui-state-disabled" : ""),
                            text: o.optgroup
                        }).appendTo(e), s = o.optgroup), n._renderItemData(e, o)
                    })
                },
                _renderItemData: function(t, e) {
                    return this._renderItem(t, e).data("ui-selectmenu-item", e)
                },
                _renderItem: function(e, i) {
                    var n = t("<li>");
                    return i.disabled && n.addClass("ui-state-disabled"), this._setText(n, i.label), n.appendTo(e)
                },
                _setText: function(t, e) {
                    e ? t.text(e) : t.html("&#160;")
                },
                _move: function(t, e) {
                    var i, n, s = ".ui-menu-item";
                    this.isOpen ? i = this.menuItems.eq(this.focusIndex) : (i = this.menuItems.eq(this.element[0].selectedIndex), s += ":not(.ui-state-disabled)"), n = "first" === t || "last" === t ? i["first" === t ? "prevAll" : "nextAll"](s).eq(-1) : i[t + "All"](s).eq(0), n.length && this.menuInstance.focus(e, n)
                },
                _getSelectedItem: function() {
                    return this.menuItems.eq(this.element[0].selectedIndex)
                },
                _toggle: function(t) {
                    this[this.isOpen ? "close" : "open"](t)
                },
                _setSelection: function() {
                    var t;
                    this.range && (window.getSelection ? (t = window.getSelection(), t.removeAllRanges(), t.addRange(this.range)) : this.range.select(), this.button.focus())
                },
                _documentClick: {
                    mousedown: function(e) {
                        this.isOpen && (t(e.target).closest(".ui-selectmenu-menu, #" + this.ids.button).length || this.close(e))
                    }
                },
                _buttonEvents: {
                    mousedown: function() {
                        var t;
                        window.getSelection ? (t = window.getSelection(), t.rangeCount && (this.range = t.getRangeAt(0))) : this.range = document.selection.createRange()
                    },
                    click: function(t) {
                        this._setSelection(), this._toggle(t)
                    },
                    keydown: function(e) {
                        var i = !0;
                        switch (e.keyCode) {
                            case t.ui.keyCode.TAB:
                            case t.ui.keyCode.ESCAPE:
                                this.close(e), i = !1;
                                break;
                            case t.ui.keyCode.ENTER:
                                this.isOpen && this._selectFocusedItem(e);
                                break;
                            case t.ui.keyCode.UP:
                                e.altKey ? this._toggle(e) : this._move("prev", e);
                                break;
                            case t.ui.keyCode.DOWN:
                                e.altKey ? this._toggle(e) : this._move("next", e);
                                break;
                            case t.ui.keyCode.SPACE:
                                this.isOpen ? this._selectFocusedItem(e) : this._toggle(e);
                                break;
                            case t.ui.keyCode.LEFT:
                                this._move("prev", e);
                                break;
                            case t.ui.keyCode.RIGHT:
                                this._move("next", e);
                                break;
                            case t.ui.keyCode.HOME:
                            case t.ui.keyCode.PAGE_UP:
                                this._move("first", e);
                                break;
                            case t.ui.keyCode.END:
                            case t.ui.keyCode.PAGE_DOWN:
                                this._move("last", e);
                                break;
                            default:
                                this.menu.trigger(e), i = !1
                        }
                        i && e.preventDefault()
                    }
                },
                _selectFocusedItem: function(t) {
                    var e = this.menuItems.eq(this.focusIndex);
                    e.hasClass("ui-state-disabled") || this._select(e.data("ui-selectmenu-item"), t)
                },
                _select: function(t, e) {
                    var i = this.element[0].selectedIndex;
                    this.element[0].selectedIndex = t.index, this._setText(this.buttonText, t.label), this._setAria(t), this._trigger("select", e, {
                        item: t
                    }), t.index !== i && this._trigger("change", e, {
                        item: t
                    }), this.close(e)
                },
                _setAria: function(t) {
                    var e = this.menuItems.eq(t.index).attr("id");
                    this.button.attr({
                        "aria-labelledby": e,
                        "aria-activedescendant": e
                    }), this.menu.attr("aria-activedescendant", e)
                },
                _setOption: function(t, e) {
                    "icons" === t && this.button.find("span.ui-icon").removeClass(this.options.icons.button).addClass(e.button), this._super(t, e), "appendTo" === t && this.menuWrap.appendTo(this._appendTo()), "disabled" === t && (this.menuInstance.option("disabled", e), this.button.toggleClass("ui-state-disabled", e).attr("aria-disabled", e), this.element.prop("disabled", e), e ? (this.button.attr("tabindex", -1), this.close()) : this.button.attr("tabindex", 0)), "width" === t && this._resizeButton()
                },
                _appendTo: function() {
                    var e = this.options.appendTo;
                    return e && (e = e.jquery || e.nodeType ? t(e) : this.document.find(e).eq(0)), e && e[0] || (e = this.element.closest(".ui-front")), e.length || (e = this.document[0].body), e
                },
                _toggleAttr: function() {
                    this.button.toggleClass("ui-corner-top", this.isOpen).toggleClass("ui-corner-all", !this.isOpen).attr("aria-expanded", this.isOpen), this.menuWrap.toggleClass("ui-selectmenu-open", this.isOpen), this.menu.attr("aria-hidden", !this.isOpen)
                },
                _resizeButton: function() {
                    var t = this.options.width;
                    t || (t = this.element.show().outerWidth(), this.element.hide()), this.button.outerWidth(t)
                },
                _resizeMenu: function() {
                    this.menu.outerWidth(Math.max(this.button.outerWidth(), this.menu.width("").outerWidth() + 1))
                },
                _getCreateOptions: function() {
                    return {
                        disabled: this.element.prop("disabled")
                    }
                },
                _parseOptions: function(e) {
                    var i = [];
                    e.each(function(e, n) {
                        var s = t(n),
                            o = s.parent("optgroup");
                        i.push({
                            element: s,
                            index: e,
                            value: s.attr("value"),
                            label: s.text(),
                            optgroup: o.attr("label") || "",
                            disabled: o.prop("disabled") || s.prop("disabled")
                        })
                    }), this.items = i
                },
                _destroy: function() {
                    this.menuWrap.remove(), this.button.remove(), this.element.show(), this.element.removeUniqueId(), this.label.attr("for", this.ids.element)
                }
            }), t.widget("ui.slider", t.ui.mouse, {
                version: "1.11.2",
                widgetEventPrefix: "slide",
                options: {
                    animate: !1,
                    distance: 0,
                    max: 100,
                    min: 0,
                    orientation: "horizontal",
                    range: !1,
                    step: 1,
                    value: 0,
                    values: null,
                    change: null,
                    slide: null,
                    start: null,
                    stop: null
                },
                numPages: 5,
                _create: function() {
                    this._keySliding = !1, this._mouseSliding = !1, this._animateOff = !0, this._handleIndex = null, this._detectOrientation(), this._mouseInit(), this._calculateNewMax(), this.element.addClass("ui-slider ui-slider-" + this.orientation + " ui-widget ui-widget-content ui-corner-all"), this._refresh(), this._setOption("disabled", this.options.disabled), this._animateOff = !1
                },
                _refresh: function() {
                    this._createRange(), this._createHandles(), this._setupEvents(), this._refreshValue()
                },
                _createHandles: function() {
                    var e, i, n = this.options,
                        s = this.element.find(".ui-slider-handle").addClass("ui-state-default ui-corner-all"),
                        o = "<span class='ui-slider-handle ui-state-default ui-corner-all' tabindex='0'></span>",
                        a = [];
                    for (i = n.values && n.values.length || 1, s.length > i && (s.slice(i).remove(), s = s.slice(0, i)), e = s.length; i > e; e++) a.push(o);
                    this.handles = s.add(t(a.join("")).appendTo(this.element)), this.handle = this.handles.eq(0), this.handles.each(function(e) {
                        t(this).data("ui-slider-handle-index", e)
                    })
                },
                _createRange: function() {
                    var e = this.options,
                        i = "";
                    e.range ? (e.range === !0 && (e.values ? e.values.length && 2 !== e.values.length ? e.values = [e.values[0], e.values[0]] : t.isArray(e.values) && (e.values = e.values.slice(0)) : e.values = [this._valueMin(), this._valueMin()]), this.range && this.range.length ? this.range.removeClass("ui-slider-range-min ui-slider-range-max").css({
                        left: "",
                        bottom: ""
                    }) : (this.range = t("<div></div>").appendTo(this.element), i = "ui-slider-range ui-widget-header ui-corner-all"), this.range.addClass(i + ("min" === e.range || "max" === e.range ? " ui-slider-range-" + e.range : ""))) : (this.range && this.range.remove(), this.range = null)
                },
                _setupEvents: function() {
                    this._off(this.handles), this._on(this.handles, this._handleEvents), this._hoverable(this.handles), this._focusable(this.handles)
                },
                _destroy: function() {
                    this.handles.remove(), this.range && this.range.remove(), this.element.removeClass("ui-slider ui-slider-horizontal ui-slider-vertical ui-widget ui-widget-content ui-corner-all"), this._mouseDestroy()
                },
                _mouseCapture: function(e) {
                    var i, n, s, o, a, r, l, h, c = this,
                        u = this.options;
                    return u.disabled ? !1 : (this.elementSize = {
                        width: this.element.outerWidth(),
                        height: this.element.outerHeight()
                    }, this.elementOffset = this.element.offset(), i = {
                        x: e.pageX,
                        y: e.pageY
                    }, n = this._normValueFromMouse(i), s = this._valueMax() - this._valueMin() + 1, this.handles.each(function(e) {
                        var i = Math.abs(n - c.values(e));
                        (s > i || s === i && (e === c._lastChangedValue || c.values(e) === u.min)) && (s = i, o = t(this), a = e)
                    }), r = this._start(e, a), r === !1 ? !1 : (this._mouseSliding = !0, this._handleIndex = a, o.addClass("ui-state-active").focus(), l = o.offset(), h = !t(e.target).parents().addBack().is(".ui-slider-handle"), this._clickOffset = h ? {
                        left: 0,
                        top: 0
                    } : {
                        left: e.pageX - l.left - o.width() / 2,
                        top: e.pageY - l.top - o.height() / 2 - (parseInt(o.css("borderTopWidth"), 10) || 0) - (parseInt(o.css("borderBottomWidth"), 10) || 0) + (parseInt(o.css("marginTop"), 10) || 0)
                    }, this.handles.hasClass("ui-state-hover") || this._slide(e, a, n), this._animateOff = !0, !0))
                },
                _mouseStart: function() {
                    return !0
                },
                _mouseDrag: function(t) {
                    var e = {
                            x: t.pageX,
                            y: t.pageY
                        },
                        i = this._normValueFromMouse(e);
                    return this._slide(t, this._handleIndex, i), !1
                },
                _mouseStop: function(t) {
                    return this.handles.removeClass("ui-state-active"), this._mouseSliding = !1, this._stop(t, this._handleIndex), this._change(t, this._handleIndex), this._handleIndex = null, this._clickOffset = null, this._animateOff = !1, !1
                },
                _detectOrientation: function() {
                    this.orientation = "vertical" === this.options.orientation ? "vertical" : "horizontal"
                },
                _normValueFromMouse: function(t) {
                    var e, i, n, s, o;
                    return "horizontal" === this.orientation ? (e = this.elementSize.width, i = t.x - this.elementOffset.left - (this._clickOffset ? this._clickOffset.left : 0)) : (e = this.elementSize.height, i = t.y - this.elementOffset.top - (this._clickOffset ? this._clickOffset.top : 0)), n = i / e, n > 1 && (n = 1), 0 > n && (n = 0), "vertical" === this.orientation && (n = 1 - n), s = this._valueMax() - this._valueMin(), o = this._valueMin() + n * s, this._trimAlignValue(o)
                },
                _start: function(t, e) {
                    var i = {
                        handle: this.handles[e],
                        value: this.value()
                    };
                    return this.options.values && this.options.values.length && (i.value = this.values(e), i.values = this.values()), this._trigger("start", t, i)
                },
                _slide: function(t, e, i) {
                    var n, s, o;
                    this.options.values && this.options.values.length ? (n = this.values(e ? 0 : 1), 2 === this.options.values.length && this.options.range === !0 && (0 === e && i > n || 1 === e && n > i) && (i = n), i !== this.values(e) && (s = this.values(), s[e] = i, o = this._trigger("slide", t, {
                        handle: this.handles[e],
                        value: i,
                        values: s
                    }), n = this.values(e ? 0 : 1), o !== !1 && this.values(e, i))) : i !== this.value() && (o = this._trigger("slide", t, {
                        handle: this.handles[e],
                        value: i
                    }), o !== !1 && this.value(i))
                },
                _stop: function(t, e) {
                    var i = {
                        handle: this.handles[e],
                        value: this.value()
                    };
                    this.options.values && this.options.values.length && (i.value = this.values(e), i.values = this.values()), this._trigger("stop", t, i)
                },
                _change: function(t, e) {
                    if (!this._keySliding && !this._mouseSliding) {
                        var i = {
                            handle: this.handles[e],
                            value: this.value()
                        };
                        this.options.values && this.options.values.length && (i.value = this.values(e), i.values = this.values()), this._lastChangedValue = e, this._trigger("change", t, i)
                    }
                },
                value: function(t) {
                    return arguments.length ? (this.options.value = this._trimAlignValue(t), this._refreshValue(), void this._change(null, 0)) : this._value()
                },
                values: function(e, i) {
                    var n, s, o;
                    if (arguments.length > 1) return this.options.values[e] = this._trimAlignValue(i), this._refreshValue(), void this._change(null, e);
                    if (!arguments.length) return this._values();
                    if (!t.isArray(arguments[0])) return this.options.values && this.options.values.length ? this._values(e) : this.value();
                    for (n = this.options.values, s = arguments[0], o = 0; o < n.length; o += 1) n[o] = this._trimAlignValue(s[o]), this._change(null, o);
                    this._refreshValue()
                },
                _setOption: function(e, i) {
                    var n, s = 0;
                    switch ("range" === e && this.options.range === !0 && ("min" === i ? (this.options.value = this._values(0), this.options.values = null) : "max" === i && (this.options.value = this._values(this.options.values.length - 1), this.options.values = null)), t.isArray(this.options.values) && (s = this.options.values.length), "disabled" === e && this.element.toggleClass("ui-state-disabled", !!i), this._super(e, i), e) {
                        case "orientation":
                            this._detectOrientation(), this.element.removeClass("ui-slider-horizontal ui-slider-vertical").addClass("ui-slider-" + this.orientation), this._refreshValue(), this.handles.css("horizontal" === i ? "bottom" : "left", "");
                            break;
                        case "value":
                            this._animateOff = !0, this._refreshValue(), this._change(null, 0), this._animateOff = !1;
                            break;
                        case "values":
                            for (this._animateOff = !0, this._refreshValue(), n = 0; s > n; n += 1) this._change(null, n);
                            this._animateOff = !1;
                            break;
                        case "step":
                        case "min":
                        case "max":
                            this._animateOff = !0, this._calculateNewMax(), this._refreshValue(), this._animateOff = !1;
                            break;
                        case "range":
                            this._animateOff = !0, this._refresh(), this._animateOff = !1
                    }
                },
                _value: function() {
                    var t = this.options.value;
                    return t = this._trimAlignValue(t)
                },
                _values: function(t) {
                    var e, i, n;
                    if (arguments.length) return e = this.options.values[t], e = this._trimAlignValue(e);
                    if (this.options.values && this.options.values.length) {
                        for (i = this.options.values.slice(), n = 0; n < i.length; n += 1) i[n] = this._trimAlignValue(i[n]);
                        return i
                    }
                    return []
                },
                _trimAlignValue: function(t) {
                    if (t <= this._valueMin()) return this._valueMin();
                    if (t >= this._valueMax()) return this._valueMax();
                    var e = this.options.step > 0 ? this.options.step : 1,
                        i = (t - this._valueMin()) % e,
                        n = t - i;
                    return 2 * Math.abs(i) >= e && (n += i > 0 ? e : -e), parseFloat(n.toFixed(5))
                },
                _calculateNewMax: function() {
                    var t = (this.options.max - this._valueMin()) % this.options.step;
                    this.max = this.options.max - t
                },
                _valueMin: function() {
                    return this.options.min
                },
                _valueMax: function() {
                    return this.max
                },
                _refreshValue: function() {
                    var e, i, n, s, o, a = this.options.range,
                        r = this.options,
                        l = this,
                        h = this._animateOff ? !1 : r.animate,
                        c = {};
                    this.options.values && this.options.values.length ? this.handles.each(function(n) {
                        i = (l.values(n) - l._valueMin()) / (l._valueMax() - l._valueMin()) * 100, c["horizontal" === l.orientation ? "left" : "bottom"] = i + "%", t(this).stop(1, 1)[h ? "animate" : "css"](c, r.animate), l.options.range === !0 && ("horizontal" === l.orientation ? (0 === n && l.range.stop(1, 1)[h ? "animate" : "css"]({
                            left: i + "%"
                        }, r.animate), 1 === n && l.range[h ? "animate" : "css"]({
                            width: i - e + "%"
                        }, {
                            queue: !1,
                            duration: r.animate
                        })) : (0 === n && l.range.stop(1, 1)[h ? "animate" : "css"]({
                            bottom: i + "%"
                        }, r.animate), 1 === n && l.range[h ? "animate" : "css"]({
                            height: i - e + "%"
                        }, {
                            queue: !1,
                            duration: r.animate
                        }))), e = i
                    }) : (n = this.value(), s = this._valueMin(), o = this._valueMax(), i = o !== s ? (n - s) / (o - s) * 100 : 0, c["horizontal" === this.orientation ? "left" : "bottom"] = i + "%", this.handle.stop(1, 1)[h ? "animate" : "css"](c, r.animate), "min" === a && "horizontal" === this.orientation && this.range.stop(1, 1)[h ? "animate" : "css"]({
                        width: i + "%"
                    }, r.animate), "max" === a && "horizontal" === this.orientation && this.range[h ? "animate" : "css"]({
                        width: 100 - i + "%"
                    }, {
                        queue: !1,
                        duration: r.animate
                    }), "min" === a && "vertical" === this.orientation && this.range.stop(1, 1)[h ? "animate" : "css"]({
                        height: i + "%"
                    }, r.animate), "max" === a && "vertical" === this.orientation && this.range[h ? "animate" : "css"]({
                        height: 100 - i + "%"
                    }, {
                        queue: !1,
                        duration: r.animate
                    }))
                },
                _handleEvents: {
                    keydown: function(e) {
                        var i, n, s, o, a = t(e.target).data("ui-slider-handle-index");
                        switch (e.keyCode) {
                            case t.ui.keyCode.HOME:
                            case t.ui.keyCode.END:
                            case t.ui.keyCode.PAGE_UP:
                            case t.ui.keyCode.PAGE_DOWN:
                            case t.ui.keyCode.UP:
                            case t.ui.keyCode.RIGHT:
                            case t.ui.keyCode.DOWN:
                            case t.ui.keyCode.LEFT:
                                if (e.preventDefault(), !this._keySliding && (this._keySliding = !0, t(e.target).addClass("ui-state-active"), i = this._start(e, a), i === !1)) return
                        }
                        switch (o = this.options.step, n = s = this.options.values && this.options.values.length ? this.values(a) : this.value(), e.keyCode) {
                            case t.ui.keyCode.HOME:
                                s = this._valueMin();
                                break;
                            case t.ui.keyCode.END:
                                s = this._valueMax();
                                break;
                            case t.ui.keyCode.PAGE_UP:
                                s = this._trimAlignValue(n + (this._valueMax() - this._valueMin()) / this.numPages);
                                break;
                            case t.ui.keyCode.PAGE_DOWN:
                                s = this._trimAlignValue(n - (this._valueMax() - this._valueMin()) / this.numPages);
                                break;
                            case t.ui.keyCode.UP:
                            case t.ui.keyCode.RIGHT:
                                if (n === this._valueMax()) return;
                                s = this._trimAlignValue(n + o);
                                break;
                            case t.ui.keyCode.DOWN:
                            case t.ui.keyCode.LEFT:
                                if (n === this._valueMin()) return;
                                s = this._trimAlignValue(n - o)
                        }
                        this._slide(e, a, s)
                    },
                    keyup: function(e) {
                        var i = t(e.target).data("ui-slider-handle-index");
                        this._keySliding && (this._keySliding = !1, this._stop(e, i), this._change(e, i), t(e.target).removeClass("ui-state-active"))
                    }
                }
            }), t.widget("ui.spinner", {
                version: "1.11.2",
                defaultElement: "<input>",
                widgetEventPrefix: "spin",
                options: {
                    culture: null,
                    icons: {
                        down: "ui-icon-triangle-1-s",
                        up: "ui-icon-triangle-1-n"
                    },
                    incremental: !0,
                    max: null,
                    min: null,
                    numberFormat: null,
                    page: 10,
                    step: 1,
                    change: null,
                    spin: null,
                    start: null,
                    stop: null
                },
                _create: function() {
                    this._setOption("max", this.options.max), this._setOption("min", this.options.min), this._setOption("step", this.options.step), "" !== this.value() && this._value(this.element.val(), !0), this._draw(), this._on(this._events), this._refresh(), this._on(this.window, {
                        beforeunload: function() {
                            this.element.removeAttr("autocomplete")
                        }
                    })
                },
                _getCreateOptions: function() {
                    var e = {},
                        i = this.element;
                    return t.each(["min", "max", "step"], function(t, n) {
                        var s = i.attr(n);
                        void 0 !== s && s.length && (e[n] = s)
                    }), e
                },
                _events: {
                    keydown: function(t) {
                        this._start(t) && this._keydown(t) && t.preventDefault()
                    },
                    keyup: "_stop",
                    focus: function() {
                        this.previous = this.element.val()
                    },
                    blur: function(t) {
                        return this.cancelBlur ? void delete this.cancelBlur : (this._stop(), this._refresh(), void(this.previous !== this.element.val() && this._trigger("change", t)))
                    },
                    mousewheel: function(t, e) {
                        if (e) {
                            if (!this.spinning && !this._start(t)) return !1;
                            this._spin((e > 0 ? 1 : -1) * this.options.step, t), clearTimeout(this.mousewheelTimer), this.mousewheelTimer = this._delay(function() {
                                this.spinning && this._stop(t)
                            }, 100), t.preventDefault()
                        }
                    },
                    "mousedown .ui-spinner-button": function(e) {
                        function i() {
                            var t = this.element[0] === this.document[0].activeElement;
                            t || (this.element.focus(), this.previous = n, this._delay(function() {
                                this.previous = n
                            }))
                        }
                        var n;
                        n = this.element[0] === this.document[0].activeElement ? this.previous : this.element.val(), e.preventDefault(), i.call(this), this.cancelBlur = !0, this._delay(function() {
                            delete this.cancelBlur, i.call(this)
                        }), this._start(e) !== !1 && this._repeat(null, t(e.currentTarget).hasClass("ui-spinner-up") ? 1 : -1, e)
                    },
                    "mouseup .ui-spinner-button": "_stop",
                    "mouseenter .ui-spinner-button": function(e) {
                        return t(e.currentTarget).hasClass("ui-state-active") ? this._start(e) === !1 ? !1 : void this._repeat(null, t(e.currentTarget).hasClass("ui-spinner-up") ? 1 : -1, e) : void 0
                    },
                    "mouseleave .ui-spinner-button": "_stop"
                },
                _draw: function() {
                    var t = this.uiSpinner = this.element.addClass("ui-spinner-input").attr("autocomplete", "off").wrap(this._uiSpinnerHtml()).parent().append(this._buttonHtml());
                    this.element.attr("role", "spinbutton"), this.buttons = t.find(".ui-spinner-button").attr("tabIndex", -1).button().removeClass("ui-corner-all"), this.buttons.height() > Math.ceil(.5 * t.height()) && t.height() > 0 && t.height(t.height()), this.options.disabled && this.disable()
                },
                _keydown: function(e) {
                    var i = this.options,
                        n = t.ui.keyCode;
                    switch (e.keyCode) {
                        case n.UP:
                            return this._repeat(null, 1, e), !0;
                        case n.DOWN:
                            return this._repeat(null, -1, e), !0;
                        case n.PAGE_UP:
                            return this._repeat(null, i.page, e), !0;
                        case n.PAGE_DOWN:
                            return this._repeat(null, -i.page, e), !0
                    }
                    return !1
                },
                _uiSpinnerHtml: function() {
                    return "<span class='ui-spinner ui-widget ui-widget-content ui-corner-all'></span>"
                },
                _buttonHtml: function() {
                    return "<a class='ui-spinner-button ui-spinner-up ui-corner-tr'><span class='ui-icon " + this.options.icons.up + "'>&#9650;</span></a><a class='ui-spinner-button ui-spinner-down ui-corner-br'><span class='ui-icon " + this.options.icons.down + "'>&#9660;</span></a>"
                },
                _start: function(t) {
                    return this.spinning || this._trigger("start", t) !== !1 ? (this.counter || (this.counter = 1), this.spinning = !0, !0) : !1
                },
                _repeat: function(t, e, i) {
                    t = t || 500, clearTimeout(this.timer), this.timer = this._delay(function() {
                        this._repeat(40, e, i)
                    }, t), this._spin(e * this.options.step, i)
                },
                _spin: function(t, e) {
                    var i = this.value() || 0;
                    this.counter || (this.counter = 1), i = this._adjustValue(i + t * this._increment(this.counter)), this.spinning && this._trigger("spin", e, {
                        value: i
                    }) === !1 || (this._value(i), this.counter++)
                },
                _increment: function(e) {
                    var i = this.options.incremental;
                    return i ? t.isFunction(i) ? i(e) : Math.floor(e * e * e / 5e4 - e * e / 500 + 17 * e / 200 + 1) : 1
                },
                _precision: function() {
                    var t = this._precisionOf(this.options.step);
                    return null !== this.options.min && (t = Math.max(t, this._precisionOf(this.options.min))), t
                },
                _precisionOf: function(t) {
                    var e = t.toString(),
                        i = e.indexOf(".");
                    return -1 === i ? 0 : e.length - i - 1
                },
                _adjustValue: function(t) {
                    var e, i, n = this.options;
                    return e = null !== n.min ? n.min : 0, i = t - e, i = Math.round(i / n.step) * n.step, t = e + i, t = parseFloat(t.toFixed(this._precision())), null !== n.max && t > n.max ? n.max : null !== n.min && t < n.min ? n.min : t
                },
                _stop: function(t) {
                    this.spinning && (clearTimeout(this.timer), clearTimeout(this.mousewheelTimer), this.counter = 0, this.spinning = !1, this._trigger("stop", t))
                },
                _setOption: function(t, e) {
                    if ("culture" === t || "numberFormat" === t) {
                        var i = this._parse(this.element.val());
                        return this.options[t] = e, void this.element.val(this._format(i))
                    }("max" === t || "min" === t || "step" === t) && "string" == typeof e && (e = this._parse(e)), "icons" === t && (this.buttons.first().find(".ui-icon").removeClass(this.options.icons.up).addClass(e.up), this.buttons.last().find(".ui-icon").removeClass(this.options.icons.down).addClass(e.down)), this._super(t, e), "disabled" === t && (this.widget().toggleClass("ui-state-disabled", !!e), this.element.prop("disabled", !!e), this.buttons.button(e ? "disable" : "enable"))
                },
                _setOptions: l(function(t) {
                    this._super(t)
                }),
                _parse: function(t) {
                    return "string" == typeof t && "" !== t && (t = window.Globalize && this.options.numberFormat ? Globalize.parseFloat(t, 10, this.options.culture) : +t), "" === t || isNaN(t) ? null : t
                },
                _format: function(t) {
                    return "" === t ? "" : window.Globalize && this.options.numberFormat ? Globalize.format(t, this.options.numberFormat, this.options.culture) : t
                },
                _refresh: function() {
                    this.element.attr({
                        "aria-valuemin": this.options.min,
                        "aria-valuemax": this.options.max,
                        "aria-valuenow": this._parse(this.element.val())
                    })
                },
                isValid: function() {
                    var t = this.value();
                    return null === t ? !1 : t === this._adjustValue(t)
                },
                _value: function(t, e) {
                    var i;
                    "" !== t && (i = this._parse(t), null !== i && (e || (i = this._adjustValue(i)), t = this._format(i))), this.element.val(t), this._refresh()
                },
                _destroy: function() {
                    this.element.removeClass("ui-spinner-input").prop("disabled", !1).removeAttr("autocomplete").removeAttr("role").removeAttr("aria-valuemin").removeAttr("aria-valuemax").removeAttr("aria-valuenow"), this.uiSpinner.replaceWith(this.element)
                },
                stepUp: l(function(t) {
                    this._stepUp(t)
                }),
                _stepUp: function(t) {
                    this._start() && (this._spin((t || 1) * this.options.step), this._stop())
                },
                stepDown: l(function(t) {
                    this._stepDown(t)
                }),
                _stepDown: function(t) {
                    this._start() && (this._spin((t || 1) * -this.options.step), this._stop())
                },
                pageUp: l(function(t) {
                    this._stepUp((t || 1) * this.options.page)
                }),
                pageDown: l(function(t) {
                    this._stepDown((t || 1) * this.options.page)
                }),
                value: function(t) {
                    return arguments.length ? void l(this._value).call(this, t) : this._parse(this.element.val())
                },
                widget: function() {
                    return this.uiSpinner
                }
            }), t.widget("ui.tabs", {
                version: "1.11.2",
                delay: 300,
                options: {
                    active: null,
                    collapsible: !1,
                    event: "click",
                    heightStyle: "content",
                    hide: null,
                    show: null,
                    activate: null,
                    beforeActivate: null,
                    beforeLoad: null,
                    load: null
                },
                _isLocal: function() {
                    var t = /#.*$/;
                    return function(e) {
                        var i, n;
                        e = e.cloneNode(!1), i = e.href.replace(t, ""), n = location.href.replace(t, "");
                        try {
                            i = decodeURIComponent(i)
                        } catch (s) {}
                        try {
                            n = decodeURIComponent(n)
                        } catch (s) {}
                        return e.hash.length > 1 && i === n
                    }
                }(),
                _create: function() {
                    var e = this,
                        i = this.options;
                    this.running = !1, this.element.addClass("ui-tabs ui-widget ui-widget-content ui-corner-all").toggleClass("ui-tabs-collapsible", i.collapsible), this._processTabs(), i.active = this._initialActive(), t.isArray(i.disabled) && (i.disabled = t.unique(i.disabled.concat(t.map(this.tabs.filter(".ui-state-disabled"), function(t) {
                        return e.tabs.index(t)
                    }))).sort()), this.options.active !== !1 && this.anchors.length ? this.active = this._findActive(i.active) : this.active = t(), this._refresh(), this.active.length && this.load(i.active)
                },
                _initialActive: function() {
                    var e = this.options.active,
                        i = this.options.collapsible,
                        n = location.hash.substring(1);
                    return null === e && (n && this.tabs.each(function(i, s) {
                        return t(s).attr("aria-controls") === n ? (e = i, !1) : void 0
                    }), null === e && (e = this.tabs.index(this.tabs.filter(".ui-tabs-active"))), (null === e || -1 === e) && (e = this.tabs.length ? 0 : !1)), e !== !1 && (e = this.tabs.index(this.tabs.eq(e)), -1 === e && (e = i ? !1 : 0)), !i && e === !1 && this.anchors.length && (e = 0), e
                },
                _getCreateEventData: function() {
                    return {
                        tab: this.active,
                        panel: this.active.length ? this._getPanelForTab(this.active) : t()
                    }
                },
                _tabKeydown: function(e) {
                    var i = t(this.document[0].activeElement).closest("li"),
                        n = this.tabs.index(i),
                        s = !0;
                    if (!this._handlePageNav(e)) {
                        switch (e.keyCode) {
                            case t.ui.keyCode.RIGHT:
                            case t.ui.keyCode.DOWN:
                                n++;
                                break;
                            case t.ui.keyCode.UP:
                            case t.ui.keyCode.LEFT:
                                s = !1, n--;
                                break;
                            case t.ui.keyCode.END:
                                n = this.anchors.length - 1;
                                break;
                            case t.ui.keyCode.HOME:
                                n = 0;
                                break;
                            case t.ui.keyCode.SPACE:
                                return e.preventDefault(), clearTimeout(this.activating), void this._activate(n);
                            case t.ui.keyCode.ENTER:
                                return e.preventDefault(), clearTimeout(this.activating), void this._activate(n === this.options.active ? !1 : n);
                            default:
                                return
                        }
                        e.preventDefault(), clearTimeout(this.activating), n = this._focusNextTab(n, s), e.ctrlKey || (i.attr("aria-selected", "false"), this.tabs.eq(n).attr("aria-selected", "true"), this.activating = this._delay(function() {
                            this.option("active", n)
                        }, this.delay))
                    }
                },
                _panelKeydown: function(e) {
                    this._handlePageNav(e) || e.ctrlKey && e.keyCode === t.ui.keyCode.UP && (e.preventDefault(), this.active.focus())
                },
                _handlePageNav: function(e) {
                    return e.altKey && e.keyCode === t.ui.keyCode.PAGE_UP ? (this._activate(this._focusNextTab(this.options.active - 1, !1)), !0) : e.altKey && e.keyCode === t.ui.keyCode.PAGE_DOWN ? (this._activate(this._focusNextTab(this.options.active + 1, !0)), !0) : void 0
                },
                _findNextTab: function(e, i) {
                    function n() {
                        return e > s && (e = 0), 0 > e && (e = s), e
                    }
                    for (var s = this.tabs.length - 1; - 1 !== t.inArray(n(), this.options.disabled);) e = i ? e + 1 : e - 1;
                    return e
                },
                _focusNextTab: function(t, e) {
                    return t = this._findNextTab(t, e), this.tabs.eq(t).focus(), t
                },
                _setOption: function(t, e) {
                    return "active" === t ? void this._activate(e) : "disabled" === t ? void this._setupDisabled(e) : (this._super(t, e), "collapsible" === t && (this.element.toggleClass("ui-tabs-collapsible", e), e || this.options.active !== !1 || this._activate(0)), "event" === t && this._setupEvents(e), void("heightStyle" === t && this._setupHeightStyle(e)))
                },
                _sanitizeSelector: function(t) {
                    return t ? t.replace(/[!"$%&'()*+,.\/:;<=>?@\[\]\^`{|}~]/g, "\\$&") : ""
                },
                refresh: function() {
                    var e = this.options,
                        i = this.tablist.children(":has(a[href])");
                    e.disabled = t.map(i.filter(".ui-state-disabled"), function(t) {
                        return i.index(t)
                    }), this._processTabs(), e.active !== !1 && this.anchors.length ? this.active.length && !t.contains(this.tablist[0], this.active[0]) ? this.tabs.length === e.disabled.length ? (e.active = !1, this.active = t()) : this._activate(this._findNextTab(Math.max(0, e.active - 1), !1)) : e.active = this.tabs.index(this.active) : (e.active = !1, this.active = t()), this._refresh()
                },
                _refresh: function() {
                    this._setupDisabled(this.options.disabled), this._setupEvents(this.options.event), this._setupHeightStyle(this.options.heightStyle), this.tabs.not(this.active).attr({
                        "aria-selected": "false",
                        "aria-expanded": "false",
                        tabIndex: -1
                    }), this.panels.not(this._getPanelForTab(this.active)).hide().attr({
                        "aria-hidden": "true"
                    }), this.active.length ? (this.active.addClass("ui-tabs-active ui-state-active").attr({
                        "aria-selected": "true",
                        "aria-expanded": "true",
                        tabIndex: 0
                    }), this._getPanelForTab(this.active).show().attr({
                        "aria-hidden": "false"
                    })) : this.tabs.eq(0).attr("tabIndex", 0)
                },
                _processTabs: function() {
                    var e = this,
                        i = this.tabs,
                        n = this.anchors,
                        s = this.panels;
                    this.tablist = this._getList().addClass("ui-tabs-nav ui-helper-reset ui-helper-clearfix ui-widget-header ui-corner-all").attr("role", "tablist").delegate("> li", "mousedown" + this.eventNamespace, function(e) {
                        t(this).is(".ui-state-disabled") && e.preventDefault()
                    }).delegate(".ui-tabs-anchor", "focus" + this.eventNamespace, function() {
                        t(this).closest("li").is(".ui-state-disabled") && this.blur()
                    }), this.tabs = this.tablist.find("> li:has(a[href])").addClass("ui-state-default ui-corner-top").attr({
                        role: "tab",
                        tabIndex: -1
                    }), this.anchors = this.tabs.map(function() {
                        return t("a", this)[0]
                    }).addClass("ui-tabs-anchor").attr({
                        role: "presentation",
                        tabIndex: -1
                    }), this.panels = t(), this.anchors.each(function(i, n) {
                        var s, o, a, r = t(n).uniqueId().attr("id"),
                            l = t(n).closest("li"),
                            h = l.attr("aria-controls");
                        e._isLocal(n) ? (s = n.hash, a = s.substring(1), o = e.element.find(e._sanitizeSelector(s))) : (a = l.attr("aria-controls") || t({}).uniqueId()[0].id, s = "#" + a, o = e.element.find(s), o.length || (o = e._createPanel(a), o.insertAfter(e.panels[i - 1] || e.tablist)), o.attr("aria-live", "polite")), o.length && (e.panels = e.panels.add(o)), h && l.data("ui-tabs-aria-controls", h), l.attr({
                            "aria-controls": a,
                            "aria-labelledby": r
                        }), o.attr("aria-labelledby", r)
                    }), this.panels.addClass("ui-tabs-panel ui-widget-content ui-corner-bottom").attr("role", "tabpanel"), i && (this._off(i.not(this.tabs)), this._off(n.not(this.anchors)), this._off(s.not(this.panels)))
                },
                _getList: function() {
                    return this.tablist || this.element.find("ol,ul").eq(0)
                },
                _createPanel: function(e) {
                    return t("<div>").attr("id", e).addClass("ui-tabs-panel ui-widget-content ui-corner-bottom").data("ui-tabs-destroy", !0)
                },
                _setupDisabled: function(e) {
                    t.isArray(e) && (e.length ? e.length === this.anchors.length && (e = !0) : e = !1);
                    for (var i, n = 0; i = this.tabs[n]; n++) e === !0 || -1 !== t.inArray(n, e) ? t(i).addClass("ui-state-disabled").attr("aria-disabled", "true") : t(i).removeClass("ui-state-disabled").removeAttr("aria-disabled");
                    this.options.disabled = e
                },
                _setupEvents: function(e) {
                    var i = {};
                    e && t.each(e.split(" "), function(t, e) {
                        i[e] = "_eventHandler"
                    }), this._off(this.anchors.add(this.tabs).add(this.panels)), this._on(!0, this.anchors, {
                        click: function(t) {
                            t.preventDefault()
                        }
                    }), this._on(this.anchors, i), this._on(this.tabs, {
                        keydown: "_tabKeydown"
                    }), this._on(this.panels, {
                        keydown: "_panelKeydown"
                    }), this._focusable(this.tabs), this._hoverable(this.tabs)
                },
                _setupHeightStyle: function(e) {
                    var i, n = this.element.parent();
                    "fill" === e ? (i = n.height(), i -= this.element.outerHeight() - this.element.height(), this.element.siblings(":visible").each(function() {
                        var e = t(this),
                            n = e.css("position");
                        "absolute" !== n && "fixed" !== n && (i -= e.outerHeight(!0))
                    }), this.element.children().not(this.panels).each(function() {
                        i -= t(this).outerHeight(!0)
                    }), this.panels.each(function() {
                        t(this).height(Math.max(0, i - t(this).innerHeight() + t(this).height()))
                    }).css("overflow", "auto")) : "auto" === e && (i = 0, this.panels.each(function() {
                        i = Math.max(i, t(this).height("").height())
                    }).height(i))
                },
                _eventHandler: function(e) {
                    var i = this.options,
                        n = this.active,
                        s = t(e.currentTarget),
                        o = s.closest("li"),
                        a = o[0] === n[0],
                        r = a && i.collapsible,
                        l = r ? t() : this._getPanelForTab(o),
                        h = n.length ? this._getPanelForTab(n) : t(),
                        c = {
                            oldTab: n,
                            oldPanel: h,
                            newTab: r ? t() : o,
                            newPanel: l
                        };
                    e.preventDefault(), o.hasClass("ui-state-disabled") || o.hasClass("ui-tabs-loading") || this.running || a && !i.collapsible || this._trigger("beforeActivate", e, c) === !1 || (i.active = r ? !1 : this.tabs.index(o), this.active = a ? t() : o, this.xhr && this.xhr.abort(), h.length || l.length || t.error("jQuery UI Tabs: Mismatching fragment identifier."), l.length && this.load(this.tabs.index(o), e), this._toggle(e, c))
                },
                _toggle: function(e, i) {
                    function n() {
                        o.running = !1, o._trigger("activate", e, i)
                    }

                    function s() {
                        i.newTab.closest("li").addClass("ui-tabs-active ui-state-active"), a.length && o.options.show ? o._show(a, o.options.show, n) : (a.show(), n())
                    }
                    var o = this,
                        a = i.newPanel,
                        r = i.oldPanel;
                    this.running = !0, r.length && this.options.hide ? this._hide(r, this.options.hide, function() {
                        i.oldTab.closest("li").removeClass("ui-tabs-active ui-state-active"), s()
                    }) : (i.oldTab.closest("li").removeClass("ui-tabs-active ui-state-active"), r.hide(), s()), r.attr("aria-hidden", "true"), i.oldTab.attr({
                        "aria-selected": "false",
                        "aria-expanded": "false"
                    }), a.length && r.length ? i.oldTab.attr("tabIndex", -1) : a.length && this.tabs.filter(function() {
                        return 0 === t(this).attr("tabIndex")
                    }).attr("tabIndex", -1), a.attr("aria-hidden", "false"), i.newTab.attr({
                        "aria-selected": "true",
                        "aria-expanded": "true",
                        tabIndex: 0
                    })
                },
                _activate: function(e) {
                    var i, n = this._findActive(e);
                    n[0] !== this.active[0] && (n.length || (n = this.active), i = n.find(".ui-tabs-anchor")[0], this._eventHandler({
                        target: i,
                        currentTarget: i,
                        preventDefault: t.noop
                    }))
                },
                _findActive: function(e) {
                    return e === !1 ? t() : this.tabs.eq(e)
                },
                _getIndex: function(t) {
                    return "string" == typeof t && (t = this.anchors.index(this.anchors.filter("[href$='" + t + "']"))), t
                },
                _destroy: function() {
                    this.xhr && this.xhr.abort(), this.element.removeClass("ui-tabs ui-widget ui-widget-content ui-corner-all ui-tabs-collapsible"), this.tablist.removeClass("ui-tabs-nav ui-helper-reset ui-helper-clearfix ui-widget-header ui-corner-all").removeAttr("role"), this.anchors.removeClass("ui-tabs-anchor").removeAttr("role").removeAttr("tabIndex").removeUniqueId(), this.tablist.unbind(this.eventNamespace), this.tabs.add(this.panels).each(function() {
                        t.data(this, "ui-tabs-destroy") ? t(this).remove() : t(this).removeClass("ui-state-default ui-state-active ui-state-disabled ui-corner-top ui-corner-bottom ui-widget-content ui-tabs-active ui-tabs-panel").removeAttr("tabIndex").removeAttr("aria-live").removeAttr("aria-busy").removeAttr("aria-selected").removeAttr("aria-labelledby").removeAttr("aria-hidden").removeAttr("aria-expanded").removeAttr("role")
                    }), this.tabs.each(function() {
                        var e = t(this),
                            i = e.data("ui-tabs-aria-controls");
                        i ? e.attr("aria-controls", i).removeData("ui-tabs-aria-controls") : e.removeAttr("aria-controls")
                    }), this.panels.show(), "content" !== this.options.heightStyle && this.panels.css("height", "")
                },
                enable: function(e) {
                    var i = this.options.disabled;
                    i !== !1 && (void 0 === e ? i = !1 : (e = this._getIndex(e), i = t.isArray(i) ? t.map(i, function(t) {
                        return t !== e ? t : null
                    }) : t.map(this.tabs, function(t, i) {
                        return i !== e ? i : null
                    })), this._setupDisabled(i))
                },
                disable: function(e) {
                    var i = this.options.disabled;
                    if (i !== !0) {
                        if (void 0 === e) i = !0;
                        else {
                            if (e = this._getIndex(e), -1 !== t.inArray(e, i)) return;
                            i = t.isArray(i) ? t.merge([e], i).sort() : [e]
                        }
                        this._setupDisabled(i)
                    }
                },
                load: function(e, i) {
                    e = this._getIndex(e);
                    var n = this,
                        s = this.tabs.eq(e),
                        o = s.find(".ui-tabs-anchor"),
                        a = this._getPanelForTab(s),
                        r = {
                            tab: s,
                            panel: a
                        };
                    this._isLocal(o[0]) || (this.xhr = t.ajax(this._ajaxSettings(o, i, r)), this.xhr && "canceled" !== this.xhr.statusText && (s.addClass("ui-tabs-loading"), a.attr("aria-busy", "true"), this.xhr.success(function(t) {
                        setTimeout(function() {
                            a.html(t), n._trigger("load", i, r)
                        }, 1)
                    }).complete(function(t, e) {
                        setTimeout(function() {
                            "abort" === e && n.panels.stop(!1, !0), s.removeClass("ui-tabs-loading"), a.removeAttr("aria-busy"), t === n.xhr && delete n.xhr
                        }, 1)
                    })))
                },
                _ajaxSettings: function(e, i, n) {
                    var s = this;
                    return {
                        url: e.attr("href"),
                        beforeSend: function(e, o) {
                            return s._trigger("beforeLoad", i, t.extend({
                                jqXHR: e,
                                ajaxSettings: o
                            }, n))
                        }
                    }
                },
                _getPanelForTab: function(e) {
                    var i = t(e).attr("aria-controls");
                    return this.element.find(this._sanitizeSelector("#" + i))
                }
            }), "ui-effects-"),
            y = t;
        t.effects = {
            effect: {}
        },
            function(t, e) {
                function i(t, e, i) {
                    var n = u[e.type] || {};
                    return null == t ? i || !e.def ? null : e.def : (t = n.floor ? ~~t : parseFloat(t), isNaN(t) ? e.def : n.mod ? (t + n.mod) % n.mod : 0 > t ? 0 : n.max < t ? n.max : t)
                }

                function n(e) {
                    var i = h(),
                        n = i._rgba = [];
                    return e = e.toLowerCase(), f(l, function(t, s) {
                        var o, a = s.re.exec(e),
                            r = a && s.parse(a),
                            l = s.space || "rgba";
                        return r ? (o = i[l](r), i[c[l].cache] = o[c[l].cache], n = i._rgba = o._rgba, !1) : void 0
                    }), n.length ? ("0,0,0,0" === n.join() && t.extend(n, o.transparent), i) : o[e]
                }

                function s(t, e, i) {
                    return i = (i + 1) % 1, 1 > 6 * i ? t + (e - t) * i * 6 : 1 > 2 * i ? e : 2 > 3 * i ? t + (e - t) * (2 / 3 - i) * 6 : t
                }
                var o, a = "backgroundColor borderBottomColor borderLeftColor borderRightColor borderTopColor color columnRuleColor outlineColor textDecorationColor textEmphasisColor",
                    r = /^([\-+])=\s*(\d+\.?\d*)/,
                    l = [{
                        re: /rgba?\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*(?:,\s*(\d?(?:\.\d+)?)\s*)?\)/,
                        parse: function(t) {
                            return [t[1], t[2], t[3], t[4]]
                        }
                    }, {
                        re: /rgba?\(\s*(\d+(?:\.\d+)?)\%\s*,\s*(\d+(?:\.\d+)?)\%\s*,\s*(\d+(?:\.\d+)?)\%\s*(?:,\s*(\d?(?:\.\d+)?)\s*)?\)/,
                        parse: function(t) {
                            return [2.55 * t[1], 2.55 * t[2], 2.55 * t[3], t[4]]
                        }
                    }, {
                        re: /#([a-f0-9]{2})([a-f0-9]{2})([a-f0-9]{2})/,
                        parse: function(t) {
                            return [parseInt(t[1], 16), parseInt(t[2], 16), parseInt(t[3], 16)]
                        }
                    }, {
                        re: /#([a-f0-9])([a-f0-9])([a-f0-9])/,
                        parse: function(t) {
                            return [parseInt(t[1] + t[1], 16), parseInt(t[2] + t[2], 16), parseInt(t[3] + t[3], 16)]
                        }
                    }, {
                        re: /hsla?\(\s*(\d+(?:\.\d+)?)\s*,\s*(\d+(?:\.\d+)?)\%\s*,\s*(\d+(?:\.\d+)?)\%\s*(?:,\s*(\d?(?:\.\d+)?)\s*)?\)/,
                        space: "hsla",
                        parse: function(t) {
                            return [t[1], t[2] / 100, t[3] / 100, t[4]]
                        }
                    }],
                    h = t.Color = function(e, i, n, s) {
                        return new t.Color.fn.parse(e, i, n, s)
                    },
                    c = {
                        rgba: {
                            props: {
                                red: {
                                    idx: 0,
                                    type: "byte"
                                },
                                green: {
                                    idx: 1,
                                    type: "byte"
                                },
                                blue: {
                                    idx: 2,
                                    type: "byte"
                                }
                            }
                        },
                        hsla: {
                            props: {
                                hue: {
                                    idx: 0,
                                    type: "degrees"
                                },
                                saturation: {
                                    idx: 1,
                                    type: "percent"
                                },
                                lightness: {
                                    idx: 2,
                                    type: "percent"
                                }
                            }
                        }
                    },
                    u = {
                        "byte": {
                            floor: !0,
                            max: 255
                        },
                        percent: {
                            max: 1
                        },
                        degrees: {
                            mod: 360,
                            floor: !0
                        }
                    },
                    d = h.support = {},
                    p = t("<p>")[0],
                    f = t.each;
                p.style.cssText = "background-color:rgba(1,1,1,.5)", d.rgba = p.style.backgroundColor.indexOf("rgba") > -1, f(c, function(t, e) {
                    e.cache = "_" + t, e.props.alpha = {
                        idx: 3,
                        type: "percent",
                        def: 1
                    }
                }), h.fn = t.extend(h.prototype, {
                    parse: function(s, a, r, l) {
                        if (s === e) return this._rgba = [null, null, null, null], this;
                        (s.jquery || s.nodeType) && (s = t(s).css(a), a = e);
                        var u = this,
                            d = t.type(s),
                            p = this._rgba = [];
                        return a !== e && (s = [s, a, r, l], d = "array"), "string" === d ? this.parse(n(s) || o._default) : "array" === d ? (f(c.rgba.props, function(t, e) {
                            p[e.idx] = i(s[e.idx], e)
                        }), this) : "object" === d ? (s instanceof h ? f(c, function(t, e) {
                            s[e.cache] && (u[e.cache] = s[e.cache].slice())
                        }) : f(c, function(e, n) {
                            var o = n.cache;
                            f(n.props, function(t, e) {
                                if (!u[o] && n.to) {
                                    if ("alpha" === t || null == s[t]) return;
                                    u[o] = n.to(u._rgba)
                                }
                                u[o][e.idx] = i(s[t], e, !0)
                            }), u[o] && t.inArray(null, u[o].slice(0, 3)) < 0 && (u[o][3] = 1, n.from && (u._rgba = n.from(u[o])))
                        }), this) : void 0
                    },
                    is: function(t) {
                        var e = h(t),
                            i = !0,
                            n = this;
                        return f(c, function(t, s) {
                            var o, a = e[s.cache];
                            return a && (o = n[s.cache] || s.to && s.to(n._rgba) || [], f(s.props, function(t, e) {
                                return null != a[e.idx] ? i = a[e.idx] === o[e.idx] : void 0
                            })), i
                        }), i
                    },
                    _space: function() {
                        var t = [],
                            e = this;
                        return f(c, function(i, n) {
                            e[n.cache] && t.push(i)
                        }), t.pop()
                    },
                    transition: function(t, e) {
                        var n = h(t),
                            s = n._space(),
                            o = c[s],
                            a = 0 === this.alpha() ? h("transparent") : this,
                            r = a[o.cache] || o.to(a._rgba),
                            l = r.slice();
                        return n = n[o.cache], f(o.props, function(t, s) {
                            var o = s.idx,
                                a = r[o],
                                h = n[o],
                                c = u[s.type] || {};
                            null !== h && (null === a ? l[o] = h : (c.mod && (h - a > c.mod / 2 ? a += c.mod : a - h > c.mod / 2 && (a -= c.mod)), l[o] = i((h - a) * e + a, s)))
                        }), this[s](l)
                    },
                    blend: function(e) {
                        if (1 === this._rgba[3]) return this;
                        var i = this._rgba.slice(),
                            n = i.pop(),
                            s = h(e)._rgba;
                        return h(t.map(i, function(t, e) {
                            return (1 - n) * s[e] + n * t
                        }))
                    },
                    toRgbaString: function() {
                        var e = "rgba(",
                            i = t.map(this._rgba, function(t, e) {
                                return null == t ? e > 2 ? 1 : 0 : t
                            });
                        return 1 === i[3] && (i.pop(), e = "rgb("), e + i.join() + ")"
                    },
                    toHslaString: function() {
                        var e = "hsla(",
                            i = t.map(this.hsla(), function(t, e) {
                                return null == t && (t = e > 2 ? 1 : 0), e && 3 > e && (t = Math.round(100 * t) + "%"), t
                            });
                        return 1 === i[3] && (i.pop(), e = "hsl("), e + i.join() + ")"
                    },
                    toHexString: function(e) {
                        var i = this._rgba.slice(),
                            n = i.pop();
                        return e && i.push(~~(255 * n)), "#" + t.map(i, function(t) {
                            return t = (t || 0).toString(16), 1 === t.length ? "0" + t : t
                        }).join("")
                    },
                    toString: function() {
                        return 0 === this._rgba[3] ? "transparent" : this.toRgbaString()
                    }
                }), h.fn.parse.prototype = h.fn, c.hsla.to = function(t) {
                    if (null == t[0] || null == t[1] || null == t[2]) return [null, null, null, t[3]];
                    var e, i, n = t[0] / 255,
                        s = t[1] / 255,
                        o = t[2] / 255,
                        a = t[3],
                        r = Math.max(n, s, o),
                        l = Math.min(n, s, o),
                        h = r - l,
                        c = r + l,
                        u = .5 * c;
                    return e = l === r ? 0 : n === r ? 60 * (s - o) / h + 360 : s === r ? 60 * (o - n) / h + 120 : 60 * (n - s) / h + 240, i = 0 === h ? 0 : .5 >= u ? h / c : h / (2 - c), [Math.round(e) % 360, i, u, null == a ? 1 : a]
                }, c.hsla.from = function(t) {
                    if (null == t[0] || null == t[1] || null == t[2]) return [null, null, null, t[3]];
                    var e = t[0] / 360,
                        i = t[1],
                        n = t[2],
                        o = t[3],
                        a = .5 >= n ? n * (1 + i) : n + i - n * i,
                        r = 2 * n - a;
                    return [Math.round(255 * s(r, a, e + 1 / 3)), Math.round(255 * s(r, a, e)), Math.round(255 * s(r, a, e - 1 / 3)), o]
                }, f(c, function(n, s) {
                    var o = s.props,
                        a = s.cache,
                        l = s.to,
                        c = s.from;
                    h.fn[n] = function(n) {
                        if (l && !this[a] && (this[a] = l(this._rgba)), n === e) return this[a].slice();
                        var s, r = t.type(n),
                            u = "array" === r || "object" === r ? n : arguments,
                            d = this[a].slice();
                        return f(o, function(t, e) {
                            var n = u["object" === r ? t : e.idx];
                            null == n && (n = d[e.idx]), d[e.idx] = i(n, e)
                        }), c ? (s = h(c(d)), s[a] = d, s) : h(d)
                    }, f(o, function(e, i) {
                        h.fn[e] || (h.fn[e] = function(s) {
                            var o, a = t.type(s),
                                l = "alpha" === e ? this._hsla ? "hsla" : "rgba" : n,
                                h = this[l](),
                                c = h[i.idx];
                            return "undefined" === a ? c : ("function" === a && (s = s.call(this, c), a = t.type(s)), null == s && i.empty ? this : ("string" === a && (o = r.exec(s), o && (s = c + parseFloat(o[2]) * ("+" === o[1] ? 1 : -1))), h[i.idx] = s, this[l](h)))
                        })
                    })
                }), h.hook = function(e) {
                    var i = e.split(" ");
                    f(i, function(e, i) {
                        t.cssHooks[i] = {
                            set: function(e, s) {
                                var o, a, r = "";
                                if ("transparent" !== s && ("string" !== t.type(s) || (o = n(s)))) {
                                    if (s = h(o || s), !d.rgba && 1 !== s._rgba[3]) {
                                        for (a = "backgroundColor" === i ? e.parentNode : e;
                                             ("" === r || "transparent" === r) && a && a.style;) try {
                                            r = t.css(a, "backgroundColor"), a = a.parentNode
                                        } catch (l) {}
                                        s = s.blend(r && "transparent" !== r ? r : "_default")
                                    }
                                    s = s.toRgbaString()
                                }
                                try {
                                    e.style[i] = s
                                } catch (l) {}
                            }
                        }, t.fx.step[i] = function(e) {
                            e.colorInit || (e.start = h(e.elem, i), e.end = h(e.end), e.colorInit = !0), t.cssHooks[i].set(e.elem, e.start.transition(e.end, e.pos))
                        }
                    })
                }, h.hook(a), t.cssHooks.borderColor = {
                    expand: function(t) {
                        var e = {};
                        return f(["Top", "Right", "Bottom", "Left"], function(i, n) {
                            e["border" + n + "Color"] = t
                        }), e
                    }
                }, o = t.Color.names = {
                    aqua: "#00ffff",
                    black: "#000000",
                    blue: "#0000ff",
                    fuchsia: "#ff00ff",
                    gray: "#808080",
                    green: "#008000",
                    lime: "#00ff00",
                    maroon: "#800000",
                    navy: "#000080",
                    olive: "#808000",
                    purple: "#800080",
                    red: "#ff0000",
                    silver: "#c0c0c0",
                    teal: "#008080",
                    white: "#ffffff",
                    yellow: "#ffff00",
                    transparent: [null, null, null, 0],
                    _default: "#ffffff"
                }
            }(y),
            function() {
                function e(e) {
                    var i, n, s = e.ownerDocument.defaultView ? e.ownerDocument.defaultView.getComputedStyle(e, null) : e.currentStyle,
                        o = {};
                    if (s && s.length && s[0] && s[s[0]])
                        for (n = s.length; n--;) i = s[n], "string" == typeof s[i] && (o[t.camelCase(i)] = s[i]);
                    else
                        for (i in s) "string" == typeof s[i] && (o[i] = s[i]);
                    return o
                }

                function i(e, i) {
                    var n, o, a = {};
                    for (n in i) o = i[n], e[n] !== o && (s[n] || (t.fx.step[n] || !isNaN(parseFloat(o))) && (a[n] = o));
                    return a
                }
                var n = ["add", "remove", "toggle"],
                    s = {
                        border: 1,
                        borderBottom: 1,
                        borderColor: 1,
                        borderLeft: 1,
                        borderRight: 1,
                        borderTop: 1,
                        borderWidth: 1,
                        margin: 1,
                        padding: 1
                    };
                t.each(["borderLeftStyle", "borderRightStyle", "borderBottomStyle", "borderTopStyle"], function(e, i) {
                    t.fx.step[i] = function(t) {
                        ("none" !== t.end && !t.setAttr || 1 === t.pos && !t.setAttr) && (y.style(t.elem, i, t.end), t.setAttr = !0)
                    }
                }), t.fn.addBack || (t.fn.addBack = function(t) {
                    return this.add(null == t ? this.prevObject : this.prevObject.filter(t))
                }), t.effects.animateClass = function(s, o, a, r) {
                    var l = t.speed(o, a, r);
                    return this.queue(function() {
                        var o, a = t(this),
                            r = a.attr("class") || "",
                            h = l.children ? a.find("*").addBack() : a;
                        h = h.map(function() {
                            var i = t(this);
                            return {
                                el: i,
                                start: e(this)
                            }
                        }), o = function() {
                            t.each(n, function(t, e) {
                                s[e] && a[e + "Class"](s[e])
                            })
                        }, o(), h = h.map(function() {
                            return this.end = e(this.el[0]), this.diff = i(this.start, this.end), this
                        }), a.attr("class", r), h = h.map(function() {
                            var e = this,
                                i = t.Deferred(),
                                n = t.extend({}, l, {
                                    queue: !1,
                                    complete: function() {
                                        i.resolve(e)
                                    }
                                });
                            return this.el.animate(this.diff, n), i.promise()
                        }), t.when.apply(t, h.get()).done(function() {
                            o(), t.each(arguments, function() {
                                var e = this.el;
                                t.each(this.diff, function(t) {
                                    e.css(t, "")
                                })
                            }), l.complete.call(a[0])
                        })
                    })
                }, t.fn.extend({
                    addClass: function(e) {
                        return function(i, n, s, o) {
                            return n ? t.effects.animateClass.call(this, {
                                add: i
                            }, n, s, o) : e.apply(this, arguments)
                        }
                    }(t.fn.addClass),
                    removeClass: function(e) {
                        return function(i, n, s, o) {
                            return arguments.length > 1 ? t.effects.animateClass.call(this, {
                                remove: i
                            }, n, s, o) : e.apply(this, arguments)
                        }
                    }(t.fn.removeClass),
                    toggleClass: function(e) {
                        return function(i, n, s, o, a) {
                            return "boolean" == typeof n || void 0 === n ? s ? t.effects.animateClass.call(this, n ? {
                                add: i
                            } : {
                                remove: i
                            }, s, o, a) : e.apply(this, arguments) : t.effects.animateClass.call(this, {
                                toggle: i
                            }, n, s, o)
                        }
                    }(t.fn.toggleClass),
                    switchClass: function(e, i, n, s, o) {
                        return t.effects.animateClass.call(this, {
                            add: i,
                            remove: e
                        }, n, s, o)
                    }
                })
            }(),
            function() {
                function e(e, i, n, s) {
                    return t.isPlainObject(e) && (i = e, e = e.effect), e = {
                        effect: e
                    }, null == i && (i = {}), t.isFunction(i) && (s = i, n = null, i = {}), ("number" == typeof i || t.fx.speeds[i]) && (s = n, n = i, i = {}), t.isFunction(n) && (s = n, n = null), i && t.extend(e, i), n = n || i.duration, e.duration = t.fx.off ? 0 : "number" == typeof n ? n : n in t.fx.speeds ? t.fx.speeds[n] : t.fx.speeds._default, e.complete = s || i.complete, e
                }

                function i(e) {
                    return !e || "number" == typeof e || t.fx.speeds[e] ? !0 : "string" != typeof e || t.effects.effect[e] ? t.isFunction(e) ? !0 : "object" != typeof e || e.effect ? !1 : !0 : !0
                }
                t.extend(t.effects, {
                    version: "1.11.2",
                    save: function(t, e) {
                        for (var i = 0; i < e.length; i++) null !== e[i] && t.data(b + e[i], t[0].style[e[i]])
                    },
                    restore: function(t, e) {
                        var i, n;
                        for (n = 0; n < e.length; n++) null !== e[n] && (i = t.data(b + e[n]), void 0 === i && (i = ""), t.css(e[n], i))
                    },
                    setMode: function(t, e) {
                        return "toggle" === e && (e = t.is(":hidden") ? "show" : "hide"), e
                    },
                    getBaseline: function(t, e) {
                        var i, n;
                        switch (t[0]) {
                            case "top":
                                i = 0;
                                break;
                            case "middle":
                                i = .5;
                                break;
                            case "bottom":
                                i = 1;
                                break;
                            default:
                                i = t[0] / e.height
                        }
                        switch (t[1]) {
                            case "left":
                                n = 0;
                                break;
                            case "center":
                                n = .5;
                                break;
                            case "right":
                                n = 1;
                                break;
                            default:
                                n = t[1] / e.width
                        }
                        return {
                            x: n,
                            y: i
                        }
                    },
                    createWrapper: function(e) {
                        if (e.parent().is(".ui-effects-wrapper")) return e.parent();
                        var i = {
                                width: e.outerWidth(!0),
                                height: e.outerHeight(!0),
                                "float": e.css("float")
                            },
                            n = t("<div></div>").addClass("ui-effects-wrapper").css({
                                fontSize: "100%",
                                background: "transparent",
                                border: "none",
                                margin: 0,
                                padding: 0
                            }),
                            s = {
                                width: e.width(),
                                height: e.height()
                            },
                            o = document.activeElement;
                        try {
                            o.id
                        } catch (a) {
                            o = document.body
                        }
                        return e.wrap(n), (e[0] === o || t.contains(e[0], o)) && t(o).focus(), n = e.parent(), "static" === e.css("position") ? (n.css({
                            position: "relative"
                        }), e.css({
                            position: "relative"
                        })) : (t.extend(i, {
                            position: e.css("position"),
                            zIndex: e.css("z-index")
                        }), t.each(["top", "left", "bottom", "right"], function(t, n) {
                            i[n] = e.css(n), isNaN(parseInt(i[n], 10)) && (i[n] = "auto")
                        }), e.css({
                            position: "relative",
                            top: 0,
                            left: 0,
                            right: "auto",
                            bottom: "auto"
                        })), e.css(s), n.css(i).show()
                    },
                    removeWrapper: function(e) {
                        var i = document.activeElement;
                        return e.parent().is(".ui-effects-wrapper") && (e.parent().replaceWith(e), (e[0] === i || t.contains(e[0], i)) && t(i).focus()), e
                    },
                    setTransition: function(e, i, n, s) {
                        return s = s || {}, t.each(i, function(t, i) {
                            var o = e.cssUnit(i);
                            o[0] > 0 && (s[i] = o[0] * n + o[1])
                        }), s
                    }
                }), t.fn.extend({
                    effect: function() {
                        function i(e) {
                            function i() {
                                t.isFunction(o) && o.call(s[0]), t.isFunction(e) && e()
                            }
                            var s = t(this),
                                o = n.complete,
                                r = n.mode;
                            (s.is(":hidden") ? "hide" === r : "show" === r) ? (s[r](), i()) : a.call(s[0], n, i)
                        }
                        var n = e.apply(this, arguments),
                            s = n.mode,
                            o = n.queue,
                            a = t.effects.effect[n.effect];
                        return t.fx.off || !a ? s ? this[s](n.duration, n.complete) : this.each(function() {
                            n.complete && n.complete.call(this)
                        }) : o === !1 ? this.each(i) : this.queue(o || "fx", i)
                    },
                    show: function(t) {
                        return function(n) {
                            if (i(n)) return t.apply(this, arguments);
                            var s = e.apply(this, arguments);
                            return s.mode = "show", this.effect.call(this, s)
                        }
                    }(t.fn.show),
                    hide: function(t) {
                        return function(n) {
                            if (i(n)) return t.apply(this, arguments);
                            var s = e.apply(this, arguments);
                            return s.mode = "hide", this.effect.call(this, s)
                        }
                    }(t.fn.hide),
                    toggle: function(t) {
                        return function(n) {
                            if (i(n) || "boolean" == typeof n) return t.apply(this, arguments);
                            var s = e.apply(this, arguments);
                            return s.mode = "toggle", this.effect.call(this, s)
                        }
                    }(t.fn.toggle),
                    cssUnit: function(e) {
                        var i = this.css(e),
                            n = [];
                        return t.each(["em", "px", "%", "pt"], function(t, e) {
                            i.indexOf(e) > 0 && (n = [parseFloat(i), e])
                        }), n
                    }
                })
            }(),
            function() {
                var e = {};
                t.each(["Quad", "Cubic", "Quart", "Quint", "Expo"], function(t, i) {
                    e[i] = function(e) {
                        return Math.pow(e, t + 2)
                    }
                }), t.extend(e, {
                    Sine: function(t) {
                        return 1 - Math.cos(t * Math.PI / 2)
                    },
                    Circ: function(t) {
                        return 1 - Math.sqrt(1 - t * t)
                    },
                    Elastic: function(t) {
                        return 0 === t || 1 === t ? t : -Math.pow(2, 8 * (t - 1)) * Math.sin((80 * (t - 1) - 7.5) * Math.PI / 15)
                    },
                    Back: function(t) {
                        return t * t * (3 * t - 2)
                    },
                    Bounce: function(t) {
                        for (var e, i = 4; t < ((e = Math.pow(2, --i)) - 1) / 11;);
                        return 1 / Math.pow(4, 3 - i) - 7.5625 * Math.pow((3 * e - 2) / 22 - t, 2)
                    }
                }), t.each(e, function(e, i) {
                    t.easing["easeIn" + e] = i, t.easing["easeOut" + e] = function(t) {
                        return 1 - i(1 - t)
                    }, t.easing["easeInOut" + e] = function(t) {
                        return .5 > t ? i(2 * t) / 2 : 1 - i(-2 * t + 2) / 2
                    }
                })
            }();
        t.effects, t.effects.effect.blind = function(e, i) {
            var n, s, o, a = t(this),
                r = /up|down|vertical/,
                l = /up|left|vertical|horizontal/,
                h = ["position", "top", "bottom", "left", "right", "height", "width"],
                c = t.effects.setMode(a, e.mode || "hide"),
                u = e.direction || "up",
                d = r.test(u),
                p = d ? "height" : "width",
                f = d ? "top" : "left",
                m = l.test(u),
                g = {},
                v = "show" === c;
            a.parent().is(".ui-effects-wrapper") ? t.effects.save(a.parent(), h) : t.effects.save(a, h), a.show(), n = t.effects.createWrapper(a).css({
                overflow: "hidden"
            }), s = n[p](), o = parseFloat(n.css(f)) || 0, g[p] = v ? s : 0, m || (a.css(d ? "bottom" : "right", 0).css(d ? "top" : "left", "auto").css({
                position: "absolute"
            }), g[f] = v ? o : s + o), v && (n.css(p, 0), m || n.css(f, o + s)), n.animate(g, {
                duration: e.duration,
                easing: e.easing,
                queue: !1,
                complete: function() {
                    "hide" === c && a.hide(), t.effects.restore(a, h), t.effects.removeWrapper(a), i()
                }
            })
        }, t.effects.effect.bounce = function(e, i) {
            var n, s, o, a = t(this),
                r = ["position", "top", "bottom", "left", "right", "height", "width"],
                l = t.effects.setMode(a, e.mode || "effect"),
                h = "hide" === l,
                c = "show" === l,
                u = e.direction || "up",
                d = e.distance,
                p = e.times || 5,
                f = 2 * p + (c || h ? 1 : 0),
                m = e.duration / f,
                g = e.easing,
                v = "up" === u || "down" === u ? "top" : "left",
                b = "up" === u || "left" === u,
                y = a.queue(),
                _ = y.length;
            for ((c || h) && r.push("opacity"), t.effects.save(a, r), a.show(), t.effects.createWrapper(a), d || (d = a["top" === v ? "outerHeight" : "outerWidth"]() / 3), c && (o = {
                opacity: 1
            }, o[v] = 0, a.css("opacity", 0).css(v, b ? 2 * -d : 2 * d).animate(o, m, g)), h && (d /= Math.pow(2, p - 1)), o = {}, o[v] = 0, n = 0; p > n; n++) s = {}, s[v] = (b ? "-=" : "+=") + d, a.animate(s, m, g).animate(o, m, g), d = h ? 2 * d : d / 2;
            h && (s = {
                opacity: 0
            }, s[v] = (b ? "-=" : "+=") + d, a.animate(s, m, g)), a.queue(function() {
                h && a.hide(), t.effects.restore(a, r), t.effects.removeWrapper(a), i()
            }), _ > 1 && y.splice.apply(y, [1, 0].concat(y.splice(_, f + 1))), a.dequeue()
        }, t.effects.effect.clip = function(e, i) {
            var n, s, o, a = t(this),
                r = ["position", "top", "bottom", "left", "right", "height", "width"],
                l = t.effects.setMode(a, e.mode || "hide"),
                h = "show" === l,
                c = e.direction || "vertical",
                u = "vertical" === c,
                d = u ? "height" : "width",
                p = u ? "top" : "left",
                f = {};
            t.effects.save(a, r), a.show(), n = t.effects.createWrapper(a).css({
                overflow: "hidden"
            }), s = "IMG" === a[0].tagName ? n : a, o = s[d](), h && (s.css(d, 0), s.css(p, o / 2)), f[d] = h ? o : 0, f[p] = h ? 0 : o / 2, s.animate(f, {
                queue: !1,
                duration: e.duration,
                easing: e.easing,
                complete: function() {
                    h || a.hide(), t.effects.restore(a, r), t.effects.removeWrapper(a), i()
                }
            })
        }, t.effects.effect.drop = function(e, i) {
            var n, s = t(this),
                o = ["position", "top", "bottom", "left", "right", "opacity", "height", "width"],
                a = t.effects.setMode(s, e.mode || "hide"),
                r = "show" === a,
                l = e.direction || "left",
                h = "up" === l || "down" === l ? "top" : "left",
                c = "up" === l || "left" === l ? "pos" : "neg",
                u = {
                    opacity: r ? 1 : 0
                };
            t.effects.save(s, o), s.show(), t.effects.createWrapper(s), n = e.distance || s["top" === h ? "outerHeight" : "outerWidth"](!0) / 2, r && s.css("opacity", 0).css(h, "pos" === c ? -n : n), u[h] = (r ? "pos" === c ? "+=" : "-=" : "pos" === c ? "-=" : "+=") + n, s.animate(u, {
                queue: !1,
                duration: e.duration,
                easing: e.easing,
                complete: function() {
                    "hide" === a && s.hide(), t.effects.restore(s, o), t.effects.removeWrapper(s), i()
                }
            })
        }, t.effects.effect.explode = function(e, i) {
            function n() {
                y.push(this), y.length === u * d && s()
            }

            function s() {
                p.css({
                    visibility: "visible"
                }), t(y).remove(), m || p.hide(), i()
            }
            var o, a, r, l, h, c, u = e.pieces ? Math.round(Math.sqrt(e.pieces)) : 3,
                d = u,
                p = t(this),
                f = t.effects.setMode(p, e.mode || "hide"),
                m = "show" === f,
                g = p.show().css("visibility", "hidden").offset(),
                v = Math.ceil(p.outerWidth() / d),
                b = Math.ceil(p.outerHeight() / u),
                y = [];
            for (o = 0; u > o; o++)
                for (l = g.top + o * b, c = o - (u - 1) / 2, a = 0; d > a; a++) r = g.left + a * v, h = a - (d - 1) / 2, p.clone().appendTo("body").wrap("<div></div>").css({
                    position: "absolute",
                    visibility: "visible",
                    left: -a * v,
                    top: -o * b
                }).parent().addClass("ui-effects-explode").css({
                    position: "absolute",
                    overflow: "hidden",
                    width: v,
                    height: b,
                    left: r + (m ? h * v : 0),
                    top: l + (m ? c * b : 0),
                    opacity: m ? 0 : 1
                }).animate({
                    left: r + (m ? 0 : h * v),
                    top: l + (m ? 0 : c * b),
                    opacity: m ? 1 : 0
                }, e.duration || 500, e.easing, n)
        }, t.effects.effect.fade = function(e, i) {
            var n = t(this),
                s = t.effects.setMode(n, e.mode || "toggle");
            n.animate({
                opacity: s
            }, {
                queue: !1,
                duration: e.duration,
                easing: e.easing,
                complete: i
            })
        }, t.effects.effect.fold = function(e, i) {
            var n, s, o = t(this),
                a = ["position", "top", "bottom", "left", "right", "height", "width"],
                r = t.effects.setMode(o, e.mode || "hide"),
                l = "show" === r,
                h = "hide" === r,
                c = e.size || 15,
                u = /([0-9]+)%/.exec(c),
                d = !!e.horizFirst,
                p = l !== d,
                f = p ? ["width", "height"] : ["height", "width"],
                m = e.duration / 2,
                g = {},
                v = {};
            t.effects.save(o, a), o.show(), n = t.effects.createWrapper(o).css({
                overflow: "hidden"
            }), s = p ? [n.width(), n.height()] : [n.height(), n.width()], u && (c = parseInt(u[1], 10) / 100 * s[h ? 0 : 1]), l && n.css(d ? {
                height: 0,
                width: c
            } : {
                height: c,
                width: 0
            }), g[f[0]] = l ? s[0] : c, v[f[1]] = l ? s[1] : 0, n.animate(g, m, e.easing).animate(v, m, e.easing, function() {
                h && o.hide(), t.effects.restore(o, a), t.effects.removeWrapper(o), i()
            })
        }, t.effects.effect.highlight = function(e, i) {
            var n = t(this),
                s = ["backgroundImage", "backgroundColor", "opacity"],
                o = t.effects.setMode(n, e.mode || "show"),
                a = {
                    backgroundColor: n.css("backgroundColor")
                };
            "hide" === o && (a.opacity = 0), t.effects.save(n, s), n.show().css({
                backgroundImage: "none",
                backgroundColor: e.color || "#ffff99"
            }).animate(a, {
                queue: !1,
                duration: e.duration,
                easing: e.easing,
                complete: function() {
                    "hide" === o && n.hide(), t.effects.restore(n, s), i()
                }
            })
        }, t.effects.effect.size = function(e, i) {
            var n, s, o, a = t(this),
                r = ["position", "top", "bottom", "left", "right", "width", "height", "overflow", "opacity"],
                l = ["position", "top", "bottom", "left", "right", "overflow", "opacity"],
                h = ["width", "height", "overflow"],
                c = ["fontSize"],
                u = ["borderTopWidth", "borderBottomWidth", "paddingTop", "paddingBottom"],
                d = ["borderLeftWidth", "borderRightWidth", "paddingLeft", "paddingRight"],
                p = t.effects.setMode(a, e.mode || "effect"),
                f = e.restore || "effect" !== p,
                m = e.scale || "both",
                g = e.origin || ["middle", "center"],
                v = a.css("position"),
                b = f ? r : l,
                y = {
                    height: 0,
                    width: 0,
                    outerHeight: 0,
                    outerWidth: 0
                };
            "show" === p && a.show(), n = {
                height: a.height(),
                width: a.width(),
                outerHeight: a.outerHeight(),
                outerWidth: a.outerWidth()
            }, "toggle" === e.mode && "show" === p ? (a.from = e.to || y, a.to = e.from || n) : (a.from = e.from || ("show" === p ? y : n), a.to = e.to || ("hide" === p ? y : n)), o = {
                from: {
                    y: a.from.height / n.height,
                    x: a.from.width / n.width
                },
                to: {
                    y: a.to.height / n.height,
                    x: a.to.width / n.width
                }
            }, ("box" === m || "both" === m) && (o.from.y !== o.to.y && (b = b.concat(u), a.from = t.effects.setTransition(a, u, o.from.y, a.from), a.to = t.effects.setTransition(a, u, o.to.y, a.to)), o.from.x !== o.to.x && (b = b.concat(d), a.from = t.effects.setTransition(a, d, o.from.x, a.from), a.to = t.effects.setTransition(a, d, o.to.x, a.to))), ("content" === m || "both" === m) && o.from.y !== o.to.y && (b = b.concat(c).concat(h), a.from = t.effects.setTransition(a, c, o.from.y, a.from), a.to = t.effects.setTransition(a, c, o.to.y, a.to)), t.effects.save(a, b), a.show(), t.effects.createWrapper(a), a.css("overflow", "hidden").css(a.from), g && (s = t.effects.getBaseline(g, n), a.from.top = (n.outerHeight - a.outerHeight()) * s.y, a.from.left = (n.outerWidth - a.outerWidth()) * s.x, a.to.top = (n.outerHeight - a.to.outerHeight) * s.y, a.to.left = (n.outerWidth - a.to.outerWidth) * s.x), a.css(a.from), ("content" === m || "both" === m) && (u = u.concat(["marginTop", "marginBottom"]).concat(c), d = d.concat(["marginLeft", "marginRight"]), h = r.concat(u).concat(d), a.find("*[width]").each(function() {
                var i = t(this),
                    n = {
                        height: i.height(),
                        width: i.width(),
                        outerHeight: i.outerHeight(),
                        outerWidth: i.outerWidth()
                    };
                f && t.effects.save(i, h), i.from = {
                    height: n.height * o.from.y,
                    width: n.width * o.from.x,
                    outerHeight: n.outerHeight * o.from.y,
                    outerWidth: n.outerWidth * o.from.x
                }, i.to = {
                    height: n.height * o.to.y,
                    width: n.width * o.to.x,
                    outerHeight: n.height * o.to.y,
                    outerWidth: n.width * o.to.x
                }, o.from.y !== o.to.y && (i.from = t.effects.setTransition(i, u, o.from.y, i.from), i.to = t.effects.setTransition(i, u, o.to.y, i.to)), o.from.x !== o.to.x && (i.from = t.effects.setTransition(i, d, o.from.x, i.from), i.to = t.effects.setTransition(i, d, o.to.x, i.to)), i.css(i.from), i.animate(i.to, e.duration, e.easing, function() {
                    f && t.effects.restore(i, h)
                })
            })), a.animate(a.to, {
                queue: !1,
                duration: e.duration,
                easing: e.easing,
                complete: function() {
                    0 === a.to.opacity && a.css("opacity", a.from.opacity), "hide" === p && a.hide(), t.effects.restore(a, b), f || ("static" === v ? a.css({
                        position: "relative",
                        top: a.to.top,
                        left: a.to.left
                    }) : t.each(["top", "left"], function(t, e) {
                        a.css(e, function(e, i) {
                            var n = parseInt(i, 10),
                                s = t ? a.to.left : a.to.top;
                            return "auto" === i ? s + "px" : n + s + "px"
                        })
                    })), t.effects.removeWrapper(a), i()
                }
            })
        }, t.effects.effect.scale = function(e, i) {
            var n = t(this),
                s = t.extend(!0, {}, e),
                o = t.effects.setMode(n, e.mode || "effect"),
                a = parseInt(e.percent, 10) || (0 === parseInt(e.percent, 10) ? 0 : "hide" === o ? 0 : 100),
                r = e.direction || "both",
                l = e.origin,
                h = {
                    height: n.height(),
                    width: n.width(),
                    outerHeight: n.outerHeight(),
                    outerWidth: n.outerWidth()
                },
                c = {
                    y: "horizontal" !== r ? a / 100 : 1,
                    x: "vertical" !== r ? a / 100 : 1
                };
            s.effect = "size", s.queue = !1, s.complete = i, "effect" !== o && (s.origin = l || ["middle", "center"], s.restore = !0), s.from = e.from || ("show" === o ? {
                height: 0,
                width: 0,
                outerHeight: 0,
                outerWidth: 0
            } : h), s.to = {
                height: h.height * c.y,
                width: h.width * c.x,
                outerHeight: h.outerHeight * c.y,
                outerWidth: h.outerWidth * c.x
            }, s.fade && ("show" === o && (s.from.opacity = 0, s.to.opacity = 1), "hide" === o && (s.from.opacity = 1, s.to.opacity = 0)), n.effect(s)
        }, t.effects.effect.puff = function(e, i) {
            var n = t(this),
                s = t.effects.setMode(n, e.mode || "hide"),
                o = "hide" === s,
                a = parseInt(e.percent, 10) || 150,
                r = a / 100,
                l = {
                    height: n.height(),
                    width: n.width(),
                    outerHeight: n.outerHeight(),
                    outerWidth: n.outerWidth()
                };
            t.extend(e, {
                effect: "scale",
                queue: !1,
                fade: !0,
                mode: s,
                complete: i,
                percent: o ? a : 100,
                from: o ? l : {
                    height: l.height * r,
                    width: l.width * r,
                    outerHeight: l.outerHeight * r,
                    outerWidth: l.outerWidth * r
                }
            }), n.effect(e)
        }, t.effects.effect.pulsate = function(e, i) {
            var n, s = t(this),
                o = t.effects.setMode(s, e.mode || "show"),
                a = "show" === o,
                r = "hide" === o,
                l = a || "hide" === o,
                h = 2 * (e.times || 5) + (l ? 1 : 0),
                c = e.duration / h,
                u = 0,
                d = s.queue(),
                p = d.length;
            for ((a || !s.is(":visible")) && (s.css("opacity", 0).show(), u = 1), n = 1; h > n; n++) s.animate({
                opacity: u
            }, c, e.easing), u = 1 - u;
            s.animate({
                opacity: u
            }, c, e.easing), s.queue(function() {
                r && s.hide(), i()
            }), p > 1 && d.splice.apply(d, [1, 0].concat(d.splice(p, h + 1))), s.dequeue()
        }, t.effects.effect.shake = function(e, i) {
            var n, s = t(this),
                o = ["position", "top", "bottom", "left", "right", "height", "width"],
                a = t.effects.setMode(s, e.mode || "effect"),
                r = e.direction || "left",
                l = e.distance || 20,
                h = e.times || 3,
                c = 2 * h + 1,
                u = Math.round(e.duration / c),
                d = "up" === r || "down" === r ? "top" : "left",
                p = "up" === r || "left" === r,
                f = {},
                m = {},
                g = {},
                v = s.queue(),
                b = v.length;
            for (t.effects.save(s, o), s.show(), t.effects.createWrapper(s), f[d] = (p ? "-=" : "+=") + l, m[d] = (p ? "+=" : "-=") + 2 * l, g[d] = (p ? "-=" : "+=") + 2 * l, s.animate(f, u, e.easing), n = 1; h > n; n++) s.animate(m, u, e.easing).animate(g, u, e.easing);
            s.animate(m, u, e.easing).animate(f, u / 2, e.easing).queue(function() {
                "hide" === a && s.hide(), t.effects.restore(s, o), t.effects.removeWrapper(s), i()
            }), b > 1 && v.splice.apply(v, [1, 0].concat(v.splice(b, c + 1))), s.dequeue()
        }, t.effects.effect.slide = function(e, i) {
            var n, s = t(this),
                o = ["position", "top", "bottom", "left", "right", "width", "height"],
                a = t.effects.setMode(s, e.mode || "show"),
                r = "show" === a,
                l = e.direction || "left",
                h = "up" === l || "down" === l ? "top" : "left",
                c = "up" === l || "left" === l,
                u = {};
            t.effects.save(s, o), s.show(), n = e.distance || s["top" === h ? "outerHeight" : "outerWidth"](!0), t.effects.createWrapper(s).css({
                overflow: "hidden"
            }), r && s.css(h, c ? isNaN(n) ? "-" + n : -n : n), u[h] = (r ? c ? "+=" : "-=" : c ? "-=" : "+=") + n, s.animate(u, {
                queue: !1,
                duration: e.duration,
                easing: e.easing,
                complete: function() {
                    "hide" === a && s.hide(), t.effects.restore(s, o), t.effects.removeWrapper(s), i()
                }
            })
        }, t.effects.effect.transfer = function(e, i) {
            var n = t(this),
                s = t(e.to),
                o = "fixed" === s.css("position"),
                a = t("body"),
                r = o ? a.scrollTop() : 0,
                l = o ? a.scrollLeft() : 0,
                h = s.offset(),
                c = {
                    top: h.top - r,
                    left: h.left - l,
                    height: s.innerHeight(),
                    width: s.innerWidth()
                },
                u = n.offset(),
                d = t("<div class='ui-effects-transfer'></div>").appendTo(document.body).addClass(e.className).css({
                    top: u.top - r,
                    left: u.left - l,
                    height: n.innerHeight(),
                    width: n.innerWidth(),
                    position: o ? "fixed" : "absolute"
                }).animate(c, e.duration, e.easing, function() {
                    d.remove(), i()
                })
        }
    }), define("service/autoCompleteService", ["wishbeen/httpUtil"], function(t) {
    var e = {};
    return e.getCities = function(e, i, n) {
        if (e) {
            var s = {
                text: e
            };
            i && (s.language = i), t.get("/v2.5/ajax/autocomplete/city", s, function(t, e) {
                n(t, e)
            })
        }
    }, e.getPlaces = function(e, i, n) {
        if (e) {
            var s = {
                text: e
            };
            i && (s.language = i), t.get("/v2.5/ajax/autocomplete/place", s, function(t, e) {
                n(t, e)
            })
        }
    }, e.getSpots = function(e, i, n) {
        if (e) {
            var s = {
                text: e
            };
            i && (s.language = i), t.get("/v2.5/ajax/autocomplete/spot", s, function(t, e) {
                n(t, e)
            })
        }
    }, e.getTags = function(e, i) {
        if (e) {
            var n = {
                text: e
            };
            t.get("/v2.5/ajax/search/tags/suggest", n, function(t, e) {
                i(t, e)
            })
        }
    }, e
}), define("controller/autoComplete/autoSearchSpotController", ["jquery", "jquery.ui", "service/autoCompleteService", "wishbeen/common"], function(t, e, i, n) {
    function s() {}
    return s.init = function(e, s, o, a, r) {
        var l = !1,
            h = !1,
            c = !1;
        e.autocomplete({
            minLength: 1,
            appendTo: e.parent(),
            source: function(t, e) {
                return h || l ? (h = !1, void(l = !1)) : void i.getSpots(t.term, s, function(t, i) {
                    return t ? alert(t) : void(l ? (e([]), l = !1) : e(i))
                })
            },
            focus: function(t, i) {
                return e.val(i.item.name), !1
            },
            select: function(t, e) {
                return o(e.item), !1
            },
            change: function(t, i) {
                null === i.item && a && a(e.val())
            },
            search: function(t, i) {
                a && a(e.val())
            }
        }).unbind("keyup").keyup(function(t) {
            13 !== t.keyCode || c ? 40 === t.keyCode ? (h = !0, c = !0) : 13 === t.keyCode ? l = !0 : (l = !1, h = !1, c = !1) : (e.autocomplete("close"), e.data("ui-autocomplete")._trigger("select", "autocompleteselect", {
                item: {
                    name: e.val()
                }
            }), l = !0, c = !0), r && r(e.val())
        }).data("ui-autocomplete")._renderItem = function(i, s) {
            i.attr("id", "search_autocomplete");
            var o = '<a> <span class="event-ct-icon event-ct' + s.category + '"></span>' + n.addTagInText(s.name, e.val(), '<strong><font color="#0088cc">', "</font></strong>") + " - " + s.city + ", " + s.ccText + "</a>";
            return t("<li></li>").data("ui-autocomplete-item", s).append(o).appendTo(i)
        }
    }, s
}), define("controller/note/partial/NoteLocationController", ["jquery", "view/note/partial/NoteLocationView", "controller/autoComplete/autoSearchSpotController"], function(t, e, i) {
    function n(i) {
        this.tmpWroteAtSpot = null, i && i.noteModel && (this.noteModel = i.noteModel, this.tmpWroteAtSpot = t.extend(!0, {}, this.noteModel.getWroteAtSpot())), i && i.spotModel && (this.spotModel = i.spotModel), this.view = new e(i)
    }
    return n.prototype.init = function(t) {
        function e(t) {
            (!t || t.id) && (n.view.setLocationSearchInput(t.name), n.tmpWroteAtSpot = {
                _id: t.id,
                name: t.name
            }, n.view.setLocationReadOnly())
        }
        var n = this,
            s = !1;
        this.spotModel && (this.tmpWroteAtSpot = {
            _id: this.spotModel.getId(),
            name: this.spotModel.getName()
        }), t.wroteAtSpot = this.tmpWroteAtSpot, this.tmpWroteAtSpot && this.tmpWroteAtSpot._id && (s = !0), "my-spot" === this.noteModel.getTypeOfEvent() && (t.fixedLocationString = g_localizedString._MyEventDetail_, s = !0), this.view.draw(t), s || (i.init(this.view.getLocationSearchInput(), null, e), this.bindHandlers())
    }, n.prototype.bindHandlers = function() {
        var t = this;
        this.view.bindHandlers({
            clickLocationDelete: function() {
                t.tmpWroteAtSpot = null
            },
            blurSpotInput: function() {
                t.tmpWroteAtSpot && t.tmpWroteAtSpot._id || t.view.triggerLocationDelete()
            }
        })
    }, n.prototype.getWroteAtSpot = function() {
        return this.tmpWroteAtSpot
    }, n.prototype.destroy = function() {}, n
}), define("model/cost/Costs", [], function() {
    function t(t) {
        this.costs = t ? t : []
    }
    return t.prototype.getLength = function() {
        return this.costs.length
    }, t.prototype.insertCost = function(t) {
        this.costs.push(t)
    }, t.prototype.getCost = function(t) {
        return this.costs[t]
    }, t.prototype.deleteCost = function(t) {
        var e = this.costs.indexOf(t),
            i = t.getController();
        i.destroy(), -1 !== e && this.costs.splice(e, 1)
    }, t.prototype.reset = function() {
        this.costs = []
    }, t
}), define("service/currencyService", ["jquery", "service/Base", "wishbeen/common"], function(t, e, i) {
    function n(t, e) {
        m = t, f = e
    }

    function s() {
        return m
    }

    function o() {
        return f
    }

    function a(t) {
        return f = t
    }

    function r(t) {
        for (var e = 0; e < m.length; e++)
            if (m[e].value == t) return m[e].exchangeRate
    }

    function l(t, e, i) {
        if (void 0 == e || void 0 == i) return 0, 0;
        if (e == i) return t || 0;
        var n = r(e),
            s = r(i),
            o = t / n,
            a = o * s;
        return a || 0
    }

    function h(t, e) {
        if (!m) return 0, 0;
        for (var i = 0; i < m.length; i++) m[i].value == e && (f = m[i]);
        var n = r(e);
        return t * n
    }

    function c(t) {
        for (var e = 0; e < m.length; e++)
            if (m[e].value == t) return m[e].currency;
        return ""
    }

    function u(t) {
        for (var e = 0; e < m.length; e++)
            if (m[e].value == t) return m[e]
    }

    function d(t, e, n) {
        var s = "";
        switch (c(t)) {
            case "KRW":
                s = i.numberFormat(e, 0);
                break;
            case "USD":
                s = i.numberFormat(e, n);
                break;
            default:
                s = i.numberFormat(e, n)
        }
        return s
    }

    function p(t, e, n) {
        var s = "";
        switch (c(t)) {
            case "KRW":
                s = i.numberFormat(e, 0);
                break;
            case "USD":
                s = i.numberFormat(e, n);
                break;
            default:
                s = i.numberFormat(e, n)
        }
        return c(t) + " " + s
    }
    var f, m = [],
        g = new e("currencyService"),
        v = {
            init: n,
            getCurrencies: s,
            getUsedCurrency: o,
            setUsedCurrency: a,
            changeCurrency: h,
            changeToCurrency: l,
            getCurrencyStr: c,
            getCurrency: u,
            getCurrencyNumberFormat: d,
            getFormattedCost: p
        };
    return t.extend(g, v), g
}), define("service/categoryService", ["jquery", "underscore", "service/Base", "wishbeen/common"], function(t, e, i, n) {
    function s(t, e) {
        d || (o(t), m = e)
    }

    function o(t) {
        var e, i, n;
        d = {}, p = {}, f = {};
        for (var s = t, o = 0; o < s.length; o++) {
            e = s[o], d[e._id] = e;
            for (var a = 0; a < e.category2.length; a++) {
                i = e.category2[a], i.cat1Id = e._id, p[i._id] = i;
                for (var r = 0; r < i.category3.length; r++) n = i.category3[r], n.cat2Id = i._id, f[n._id] = n
            }
        }
    }

    function a(t) {
        g = t
    }

    function r(t) {
        var i = 7;
        return "undefined" == typeof t ? i : e.find(g, function(e) {
            return parseInt(e.category) === parseInt(t)
        }).moneyUsage
    }

    function l(t) {
        return d[t]
    }

    function h(t) {
        return p[t]
    }

    function c(t) {
        return f[t]
    }

    function u(t) {
        for (var e = 0; e < m.length; e++)
            if (m[e].value === t) return m[e];
        return {}
    }
    var d, p, f, m = [],
        g = [],
        v = {
            init: s,
            setSpotCategoryToMoneyUsage: a,
            getSpotCategoryToMoneyUsage: r,
            getCategories1: l,
            getCategories2: h,
            getCategories3: c,
            getCostType: u,
            getCostTypeList: function() {
                return m
            }
        },
        b = new i("categoryService");
    return t.extend(b, v), b
}), define("view/note/partial/cost/CostsView", ["jquery", "service/currencyService", "service/categoryService"], function(t, e, i) {
    function n(t) {
        "undefined" !== t.moneyUsage && (this.moneyUsage = t.moneyUsage)
    }
    return n.prototype.getHtml = function() {
        var t, n = i.getCostTypeList(),
            s = e.getCurrencies(),
            o = e.getUsedCurrency(),
            a = "";
        for (a += '<div id="cost_list_panel">', a += "</div>", a += '<div class="write-budget write-option">', a += '<div class="budget-wrap">', a += '<div class="select">', a += '<select id="selected-usage">', t = 0; t < n.length; t++) a += parseInt(n[t].value) === parseInt(this.moneyUsage) ? '<option value="' + n[t].value + '" selected="selected">' + n[t].name + "</option>" : '<option value="' + n[t].value + '">' + n[t].name + "</option>";
        for (a += "</select>", a += "</div>", a += '<div class="details"><input type="text" id="input-detail-text" placeholder="' + g_localizedString._InputMemo_ + '"/></div>', a += '<div class="select pay">', a += '<select id="selected-currency">', t = 0; t < s.length; t++) a += parseInt(o.value) === parseInt(s[t].value) ? '<option value="' + s[t].value + '" selected="selected">' + s[t].name + "</option>" : '<option value="' + s[t].value + '">' + s[t].name + "</option>";
        return a += "</select>", a += "</div>", a += '<div class="details pay"><input type="text" id="input-money-text" maxlength="13" /></div>', a += '<a class="btn-plus"><img class="add-budget" src="/images/btn-note-plus.png" alt=""/><img class="del-budget" src="/images/btn-note-delete.png" alt=""/></a>', a += "</div>", a += "</div>"
    }, n.prototype.draw = function(e) {
        e && e.parentId ? (this.parentId = e.parentId, this.parentElement = t("#" + this.parentId)) : e && e.parentElement && (this.parentElement = e.parentElement), this.element = t(this.getHtml()), this.parentElement.append(this.element), this.bindMoneyInputMask(), this.parentElement.removeClass("hide")
    }, n.prototype.bindMoneyInputMask = function() {
        this.getMoneyInput().unbind("inputmask").inputmask({
            alias: "numeric",
            autoGroup: !0,
            groupSeparator: ",",
            groupSize: 3,
            placeholder: "0",
            allowPlus: !1,
            allowMinus: !1
        })
    }, n.prototype.bindHandlers = function(e) {
        var i = this;
        e.clickAddButton && i.element.find(".add-budget").click(function() {
            var t = {
                moneyUsage: parseInt(i.element.find("#selected-usage").val()),
                detail: i.element.find("#input-detail-text").val(),
                money: parseFloat(parseFloat(i.getMoneyInput().inputmask("remove").val()).toFixed(2)),
                moneyType: parseInt(i.element.find("#selected-currency").val())
            };
            e.clickAddButton(t)
        }), e.clickDeleteButton && i.element.find(".del-budget").click(function() {
            i.element.remove(), i.parentElement.addClass("hide"), t("#note-budget-button").removeClass("active"), e.clickDeleteButton()
        })
    }, n.prototype.checkAndHideDelButton = function() {
        this.parentElement.find(".write-budget").length > 1 && this.element.find(".del-budget").addClass("hide")
    }, n.prototype.clearDetailAndMoney = function() {
        this.element.find("#input-detail-text").val(""), this.getMoneyInput().val(0), this.bindMoneyInputMask()
    }, n.prototype.getParentElementOfCosts = function() {
        return this.parentElement.find("#cost_list_panel")
    }, n.prototype.getMoneyInput = function() {
        return this.element.find("#input-money-text")
    }, n.prototype.getLastCostInput = function() {
        var t = {
            moneyUsage: parseInt(this.element.find("#selected-usage").val()),
            detail: this.element.find("#input-detail-text").val(),
            money: parseFloat(parseFloat(this.getMoneyInput().inputmask("remove").val()).toFixed(2)),
            moneyType: parseInt(this.element.find("#selected-currency").val())
        };
        return t
    }, n
}), define("model/cost/Cost", [], function() {
    function t(t) {
        if (t)
            for (var e in t) this[e] = t[e]
    }
    return t.prototype.getMoney = function() {
        return this.money
    }, t.prototype.getMoneyType = function() {
        return this.moneyType
    }, t.prototype.getMoneyUsage = function() {
        return this.moneyUsage
    }, t.prototype.getDetail = function() {
        return this.detail
    }, t.prototype.getController = function() {
        return this.controller
    }, t.prototype.setController = function(t) {
        this.controller = t
    }, t
}), ! function(t) {
    function e(t) {
        var e = document.createElement("input"),
            i = "on" + t,
            n = i in e;
        return n || (e.setAttribute(i, "return;"), n = "function" == typeof e[i]), e = null, n
    }

    function i(t) {
        var e = "text" == t || "tel" == t;
        if (!e) {
            var i = document.createElement("input");
            i.setAttribute("type", t), e = "text" === i.type, i = null
        }
        return e
    }

    function n(e, i, s) {
        var o = s.aliases[e];
        return o ? (o.alias && n(o.alias, void 0, s), t.extend(!0, s, o), t.extend(!0, s, i), !0) : !1
    }

    function s(e) {
        function i(i) {
            function n(t, e, i, n) {
                this.matches = [], this.isGroup = t || !1, this.isOptional = e || !1, this.isQuantifier = i || !1, this.isAlternator = n || !1, this.quantifier = {
                    min: 1,
                    max: 1
                }
            }

            function s(i, n, s) {
                var o = e.definitions[n],
                    a = 0 == i.matches.length;
                if (s = void 0 != s ? s : i.matches.length, o && !d) {
                    o.placeholder = t.isFunction(o.placeholder) ? o.placeholder.call(this, e) : o.placeholder;
                    for (var r = o.prevalidator, l = r ? r.length : 0, h = 1; h < o.cardinality; h++) {
                        var c = l >= h ? r[h - 1] : [],
                            u = c.validator,
                            p = c.cardinality;
                        i.matches.splice(s++, 0, {
                            fn: u ? "string" == typeof u ? new RegExp(u) : new function() {
                                this.test = u
                            } : new RegExp("."),
                            cardinality: p ? p : 1,
                            optionality: i.isOptional,
                            newBlockMarker: a,
                            casing: o.casing,
                            def: o.definitionSymbol || n,
                            placeholder: o.placeholder,
                            mask: n
                        })
                    }
                    i.matches.splice(s++, 0, {
                        fn: o.validator ? "string" == typeof o.validator ? new RegExp(o.validator) : new function() {
                            this.test = o.validator
                        } : new RegExp("."),
                        cardinality: o.cardinality,
                        optionality: i.isOptional,
                        newBlockMarker: a,
                        casing: o.casing,
                        def: o.definitionSymbol || n,
                        placeholder: o.placeholder,
                        mask: n
                    })
                } else i.matches.splice(s++, 0, {
                    fn: null,
                    cardinality: 0,
                    optionality: i.isOptional,
                    newBlockMarker: a,
                    casing: null,
                    def: n,
                    placeholder: void 0,
                    mask: n
                }), d = !1
            }
            for (var o, a, r, l, h, c, u = /(?:[?*+]|\{[0-9\+\*]+(?:,[0-9\+\*]*)?\})\??|[^.?*+^${[]()|\\]+|./g, d = !1, p = new n, f = [], m = []; o = u.exec(i);) switch (a = o[0], a.charAt(0)) {
                case e.optionalmarker.end:
                case e.groupmarker.end:
                    if (r = f.pop(), f.length > 0) {
                        if (l = f[f.length - 1], l.matches.push(r), l.isAlternator) {
                            h = f.pop();
                            for (var g = 0; g < h.matches.length; g++) h.matches[g].isGroup = !1;
                            f.length > 0 ? (l = f[f.length - 1], l.matches.push(h)) : p.matches.push(h)
                        }
                    } else p.matches.push(r);
                    break;
                case e.optionalmarker.start:
                    f.push(new n(!1, !0));
                    break;
                case e.groupmarker.start:
                    f.push(new n(!0));
                    break;
                case e.quantifiermarker.start:
                    var v = new n(!1, !1, !0);
                    a = a.replace(/[{}]/g, "");
                    var b = a.split(","),
                        y = isNaN(b[0]) ? b[0] : parseInt(b[0]),
                        _ = 1 == b.length ? y : isNaN(b[1]) ? b[1] : parseInt(b[1]);
                    if (("*" == _ || "+" == _) && (y = "*" == _ ? 0 : 1), v.quantifier = {
                        min: y,
                        max: _
                    }, f.length > 0) {
                        var w = f[f.length - 1].matches;
                        if (o = w.pop(), !o.isGroup) {
                            var k = new n(!0);
                            k.matches.push(o), o = k
                        }
                        w.push(o), w.push(v)
                    } else {
                        if (o = p.matches.pop(), !o.isGroup) {
                            var k = new n(!0);
                            k.matches.push(o), o = k
                        }
                        p.matches.push(o), p.matches.push(v)
                    }
                    break;
                case e.escapeChar:
                    d = !0;
                    break;
                case e.alternatormarker:
                    f.length > 0 ? (l = f[f.length - 1], c = l.matches.pop()) : c = p.matches.pop(), c.isAlternator ? f.push(c) : (h = new n(!1, !1, !1, !0), h.matches.push(c), f.push(h));
                    break;
                default:
                    if (f.length > 0) {
                        if (l = f[f.length - 1], l.matches.length > 0 && (c = l.matches[l.matches.length - 1], c.isGroup && (c.isGroup = !1, s(c, e.groupmarker.start, 0), s(c, e.groupmarker.end))), s(l, a), l.isAlternator) {
                            h = f.pop();
                            for (var g = 0; g < h.matches.length; g++) h.matches[g].isGroup = !1;
                            f.length > 0 ? (l = f[f.length - 1], l.matches.push(h)) : p.matches.push(h)
                        }
                    } else p.matches.length > 0 && (c = p.matches[p.matches.length - 1], c.isGroup && (c.isGroup = !1, s(c, e.groupmarker.start, 0), s(c, e.groupmarker.end))), s(p, a)
            }
            return p.matches.length > 0 && (c = p.matches[p.matches.length - 1], c.isGroup && (c.isGroup = !1, s(c, e.groupmarker.start, 0), s(c, e.groupmarker.end)), m.push(p)), m
        }

        function n(n, s) {
            if (void 0 != n && "" != n) {
                if (1 == n.length && 0 == e.greedy && 0 != e.repeat && (e.placeholder = ""), e.repeat > 0 || "*" == e.repeat || "+" == e.repeat) {
                    var o = "*" == e.repeat ? 0 : "+" == e.repeat ? 1 : e.repeat;
                    n = e.groupmarker.start + n + e.groupmarker.end + e.quantifiermarker.start + o + "," + e.repeat + e.quantifiermarker.end
                }
                return void 0 == t.inputmask.masksCache[n] && (t.inputmask.masksCache[n] = {
                    mask: n,
                    maskToken: i(n),
                    validPositions: {},
                    _buffer: void 0,
                    buffer: void 0,
                    tests: {},
                    metadata: s
                }), t.extend(!0, {}, t.inputmask.masksCache[n])
            }
        }

        function s(t) {
            if (t = t.toString(), e.numericInput) {
                t = t.split("").reverse();
                for (var i = 0; i < t.length; i++) t[i] == e.optionalmarker.start ? t[i] = e.optionalmarker.end : t[i] == e.optionalmarker.end ? t[i] = e.optionalmarker.start : t[i] == e.groupmarker.start ? t[i] = e.groupmarker.end : t[i] == e.groupmarker.end && (t[i] = e.groupmarker.start);
                t = t.join("")
            }
            return t
        }
        var o = void 0;
        if (t.isFunction(e.mask) && (e.mask = e.mask.call(this, e)), t.isArray(e.mask)) {
            if (e.mask.length > 1) {
                e.keepStatic = void 0 == e.keepStatic ? !0 : e.keepStatic;
                var a = "(";
                return t.each(e.mask, function(e, i) {
                    a.length > 1 && (a += ")|("), a += s(void 0 == i.mask || t.isFunction(i.mask) ? i : i.mask)
                }), a += ")", n(a, e.mask)
            }
            e.mask = e.mask.pop()
        }
        return e.mask && (o = void 0 == e.mask.mask || t.isFunction(e.mask.mask) ? n(s(e.mask), e.mask) : n(s(e.mask.mask), e.mask)), o
    }

    function o(n, s, o) {
        function a(t, e, i) {
            e = e || 0;
            var n, s, o, a = [],
                r = 0;
            do {
                if (t === !0 && c().validPositions[r]) {
                    var l = c().validPositions[r];
                    s = l.match, n = l.locator.slice(), a.push(i === !0 ? l.input : I(r, s))
                } else o = m(r, n, r - 1), s = o.match, n = o.locator.slice(), a.push(I(r, s));
                r++
            } while ((void 0 == nt || nt > r - 1) && null != s.fn || null == s.fn && "" != s.def || e >= r);
            return a.pop(), a
        }

        function c() {
            return s
        }

        function u(t) {
            var e = c();
            e.buffer = void 0, e.tests = {}, t !== !0 && (e._buffer = void 0, e.validPositions = {}, e.p = 0)
        }

        function d(t) {
            var e = c(),
                i = -1,
                n = e.validPositions;
            void 0 == t && (t = -1);
            var s = i,
                o = i;
            for (var a in n) {
                var r = parseInt(a);
                (-1 == t || null != n[r].match.fn) && (t >= r && (s = r), r >= t && (o = r))
            }
            return i = -1 != s && t - s > 1 || t > o ? s : o
        }

        function p(e, i, n) {
            if (o.insertMode && void 0 != c().validPositions[e] && void 0 == n) {
                var s, a = t.extend(!0, {}, c().validPositions),
                    r = d();
                for (s = e; r >= s; s++) delete c().validPositions[s];
                c().validPositions[e] = i;
                var l, h = !0;
                for (s = e; r >= s; s++) {
                    var u = a[s];
                    if (void 0 != u) {
                        var p = c().validPositions;
                        l = !o.keepStatic && p[s] && (void 0 != p[s + 1] && b(s + 1, p[s].locator.slice(), s).length > 1 || void 0 != p[s].alternation) ? s + 1 : S(s), h = v(l, u.match.def) ? h && x(l, u.input, !0, !0) !== !1 : null == u.match.fn
                    }
                    if (!h) break
                }
                if (!h) return c().validPositions = t.extend(!0, {}, a), !1
            } else c().validPositions[e] = i;
            return !0
        }

        function f(t, e, i, n) {
            var s, a = t;
            for (c().p = t, void 0 != c().validPositions[t] && c().validPositions[t].input == o.radixPoint && (e++, a++), s = a; e > s; s++) void 0 != c().validPositions[s] && (i === !0 || 0 != o.canClearPosition(c(), s, d(), n, o)) && delete c().validPositions[s];
            for (u(!0), s = a + 1; s <= d();) {
                for (; void 0 != c().validPositions[a];) a++;
                var r = c().validPositions[a];
                a > s && (s = a + 1);
                var l = c().validPositions[s];
                void 0 != l && void 0 == r ? (v(a, l.match.def) && x(a, l.input, !0) !== !1 && (delete c().validPositions[s], s++), a++) : s++
            }
            var h = d();
            h >= t && void 0 != c().validPositions[h] && c().validPositions[h].input == o.radixPoint && delete c().validPositions[h], u(!0)
        }

        function m(t, e, i) {
            for (var n, s = b(t, e, i), a = d(), r = c().validPositions[a] || b(0)[0], l = void 0 != r.alternation ? r.locator[r.alternation].split(",") : [], h = 0; h < s.length && (n = s[h], !(n.match && (o.greedy && n.match.optionalQuantifier !== !0 || (n.match.optionality === !1 || n.match.newBlockMarker === !1) && n.match.optionalQuantifier !== !0) && (void 0 == r.alternation || void 0 != n.locator[r.alternation] && C(n.locator[r.alternation].toString().split(","), l)))); h++);
            return n
        }

        function g(t) {
            return c().validPositions[t] ? c().validPositions[t].match : b(t)[0].match
        }

        function v(t, e) {
            for (var i = !1, n = b(t), s = 0; s < n.length; s++)
                if (n[s].match && n[s].match.def == e) {
                    i = !0;
                    break
                }
            return i
        }

        function b(e, i, n) {
            function s(i, n, o, r) {
                function u(o, r, p) {
                    if (a > 1e4) return alert("jquery.inputmask: There is probably an error in your mask definition or in the code. Create an issue on github with an example of the mask you are using. " + c().mask), !0;
                    if (a == e && void 0 == o.matches) return l.push({
                        match: o,
                        locator: r.reverse()
                    }), !0;
                    if (void 0 != o.matches) {
                        if (o.isGroup && p !== !0) {
                            if (o = u(i.matches[d + 1], r)) return !0
                        } else if (o.isOptional) {
                            var f = o;
                            if (o = s(o, n, r, p)) {
                                var m = l[l.length - 1].match,
                                    g = 0 == t.inArray(m, f.matches);
                                g && (h = !0), a = e
                            }
                        } else if (o.isAlternator) {
                            var v, b = o,
                                y = [],
                                _ = l.slice(),
                                w = r.length,
                                k = n.length > 0 ? n.shift() : -1;
                            if (-1 == k || "string" == typeof k) {
                                var C, x = a,
                                    E = n.slice();
                                "string" == typeof k && (C = k.split(","));
                                for (var T = 0; T < b.matches.length; T++) {
                                    l = [], o = u(b.matches[T], [T].concat(r), p) || o, v = l.slice(), a = x, l = [];
                                    for (var S = 0; S < E.length; S++) n[S] = E[S];
                                    for (var D = 0; D < v.length; D++)
                                        for (var A = v[D], P = 0; P < y.length; P++) {
                                            var I = y[P];
                                            if (A.match.mask == I.match.mask && ("string" != typeof k || -1 != t.inArray(A.locator[w].toString(), C))) {
                                                v.splice(D, 1), I.locator[w] = I.locator[w] + "," + A.locator[w], I.alternation = w;
                                                break
                                            }
                                        }
                                    y = y.concat(v)
                                }
                                "string" == typeof k && (y = t.map(y, function(e, i) {
                                    if (isFinite(i)) {
                                        var n, s = e.locator[w].toString().split(",");
                                        e.locator[w] = void 0, e.alternation = void 0;
                                        for (var o = 0; o < s.length; o++) n = -1 != t.inArray(s[o], C), n && (void 0 != e.locator[w] ? (e.locator[w] += ",", e.alternation = w, e.locator[w] += s[o]) : e.locator[w] = parseInt(s[o]));
                                        if (void 0 != e.locator[w]) return e
                                    }
                                })), l = _.concat(y), h = !0
                            } else o = u(b.matches[k], [k].concat(r), p);
                            if (o) return !0
                        } else if (o.isQuantifier && p !== !0)
                            for (var M = o, N = n.length > 0 && p !== !0 ? n.shift() : 0; N < (isNaN(M.quantifier.max) ? N + 1 : M.quantifier.max) && e >= a; N++) {
                                var H = i.matches[t.inArray(M, i.matches) - 1];
                                if (o = u(H, [N].concat(r), !0)) {
                                    var m = l[l.length - 1].match;
                                    m.optionalQuantifier = N > M.quantifier.min - 1;
                                    var g = 0 == t.inArray(m, H.matches);
                                    if (g) {
                                        if (N > M.quantifier.min - 1) {
                                            h = !0, a = e;
                                            break
                                        }
                                        return !0
                                    }
                                    return !0
                                }
                            } else if (o = s(o, n, r, p)) return !0
                    } else a++
                }
                for (var d = n.length > 0 ? n.shift() : 0; d < i.matches.length; d++)
                    if (i.matches[d].isQuantifier !== !0) {
                        var p = u(i.matches[d], [d].concat(o), r);
                        if (p && a == e) return p;
                        if (a > e) break
                    }
            }
            var o = c().maskToken,
                a = i ? n : 0,
                r = i || [0],
                l = [],
                h = !1;
            if (void 0 == i) {
                for (var u, d = e - 1; void 0 == (u = c().validPositions[d]) && d > -1;) d--;
                if (void 0 != u && d > -1) a = d, r = u.locator.slice();
                else {
                    for (d = e - 1; void 0 == (u = c().tests[d]) && d > -1;) d--;
                    void 0 != u && d > -1 && (a = d, r = u[0].locator.slice())
                }
            }
            for (var p = r.shift(); p < o.length; p++) {
                var f = s(o[p], r, [p]);
                if (f && a == e || a > e) break
            }
            return (0 == l.length || h) && l.push({
                match: {
                    fn: null,
                    cardinality: 0,
                    optionality: !0,
                    casing: null,
                    def: ""
                },
                locator: []
            }), c().tests[e] = t.extend(!0, [], l), c().tests[e]
        }

        function y() {
            return void 0 == c()._buffer && (c()._buffer = a(!1, 1)), c()._buffer
        }

        function _() {
            return void 0 == c().buffer && (c().buffer = a(!0, d(), !0)), c().buffer
        }

        function w(t, e, i) {
            if (i = i || _().slice(), t === !0) u(), t = 0, e = i.length;
            else
                for (var n = t; e > n; n++) delete c().validPositions[n], delete c().tests[n];
            for (var n = t; e > n; n++) i[n] != o.skipOptionalPartCharacter && x(n, i[n], !0, !0)
        }

        function k(t, e) {
            switch (e.casing) {
                case "upper":
                    t = t.toUpperCase();
                    break;
                case "lower":
                    t = t.toLowerCase()
            }
            return t
        }

        function C(e, i) {
            for (var n = o.greedy ? i : i.slice(0, 1), s = !1, a = 0; a < e.length; a++)
                if (-1 != t.inArray(e[a], n)) {
                    s = !0;
                    break
                }
            return s
        }

        function x(e, i, n, s) {
            function a(e, i, n, s) {
                var a = !1;
                return t.each(b(e), function(r, l) {
                    for (var h = l.match, m = i ? 1 : 0, g = "", v = (_(), h.cardinality); v > m; v--) g += A(e - (v - 1));
                    if (i && (g += i), a = null != h.fn ? h.fn.test(g, c(), e, n, o) : i != h.def && i != o.skipOptionalPartCharacter || "" == h.def ? !1 : {
                        c: h.def,
                        pos: e
                    }, a !== !1) {
                        var b = void 0 != a.c ? a.c : i;
                        b = b == o.skipOptionalPartCharacter && null === h.fn ? h.def : b;
                        var y = e;
                        if (void 0 != a.remove && f(a.remove, a.remove + 1, !0), a.refreshFromBuffer) {
                            var C = a.refreshFromBuffer;
                            if (n = !0, w(C === !0 ? C : C.start, C.end), void 0 == a.pos && void 0 == a.c) return a.pos = d(), !1;
                            if (y = void 0 != a.pos ? a.pos : e, y != e) return a = t.extend(a, x(y, b, !0)), !1
                        } else if (a !== !0 && void 0 != a.pos && a.pos != e && (y = a.pos, w(e, y), y != e)) return a = t.extend(a, x(y, b, !0)), !1;
                        return 1 != a && void 0 == a.pos && void 0 == a.c ? !1 : (r > 0 && u(!0), p(y, t.extend({}, l, {
                            input: k(b, h)
                        }), s) || (a = !1), !1)
                    }
                }), a
            }

            function r(e, i, n, s) {
                var a, r, l = t.extend(!0, {}, c().validPositions);
                for (a = d(); a >= 0; a--)
                    if (c().validPositions[a] && void 0 != c().validPositions[a].alternation) {
                        r = c().validPositions[a].alternation;
                        break
                    }
                if (void 0 != r)
                    for (var h in c().validPositions)
                        if (parseInt(h) > parseInt(a) && void 0 === c().validPositions[h].alternation) {
                            for (var p = c().validPositions[h], f = p.locator[r], m = c().validPositions[a].locator[r].split(","), g = 0; g < m.length; g++)
                                if (f < m[g]) {
                                    for (var v, b, y = h - 1; y >= 0; y--)
                                        if (v = c().validPositions[y], void 0 != v) {
                                            b = v.locator[r], v.locator[r] = m[g];
                                            break
                                        }
                                    if (f != v.locator[r]) {
                                        for (var w = _().slice(), k = h; k < d() + 1; k++) delete c().validPositions[k], delete c().tests[k];
                                        u(!0), o.keepStatic = !o.keepStatic;
                                        for (var k = h; k < w.length; k++) w[k] != o.skipOptionalPartCharacter && x(d() + 1, w[k], !1, !0);
                                        v.locator[r] = b;
                                        var C = x(e, i, n, s);
                                        if (o.keepStatic = !o.keepStatic, C) return C;
                                        u(), c().validPositions = t.extend(!0, {}, l)
                                    }
                                }
                            break
                        }
                return !1
            }

            function l(e, i) {
                for (var n = c().validPositions[i], s = n.locator, o = s.length, a = e; i > a; a++)
                    if (!E(a)) {
                        var r = b(a),
                            l = r[0],
                            h = -1;
                        t.each(r, function(t, e) {
                            for (var i = 0; o > i; i++) e.locator[i] && C(e.locator[i].toString().split(","), s[i].toString().split(",")) && i > h && (h = i, l = e)
                        }), p(a, t.extend({}, l, {
                            input: l.match.def
                        }), !0)
                    }
            }
            n = n === !0;
            for (var h = _(), m = e - 1; m > -1 && !c().validPositions[m]; m--);
            for (m++; e > m; m++) void 0 == c().validPositions[m] && ((!E(m) || h[m] != I(m)) && b(m).length > 1 || h[m] == o.radixPoint || "0" == h[m] && t.inArray(o.radixPoint, h) < m) && a(m, h[m], !0);
            var g = e,
                v = !1,
                y = t.extend(!0, {}, c().validPositions);
            if (g < T() && (v = a(g, i, n, s), !n && v === !1)) {
                var D = c().validPositions[g];
                if (!D || null != D.match.fn || D.match.def != i && i != o.skipOptionalPartCharacter) {
                    if ((o.insertMode || void 0 == c().validPositions[S(g)]) && !E(g))
                        for (var P = g + 1, M = S(g); M >= P; P++)
                            if (v = a(P, i, n, s), v !== !1) {
                                l(g, P), g = P;
                                break
                            }
                } else v = {
                    caret: S(g)
                }
            }
            if (v === !1 && o.keepStatic && R(h) && (v = r(e, i, n, s)), v === !0 && (v = {
                pos: g
            }), t.isFunction(o.postValidation) && 0 != v && !n) {
                u(!0);
                var N = o.postValidation(_(), o);
                if (!N) return u(!0), c().validPositions = t.extend(!0, {}, y), !1
            }
            return v
        }

        function E(t) {
            var e = g(t);
            return null != e.fn ? e.fn : !1
        }

        function T() {
            var t;
            nt = it.prop("maxLength"), -1 == nt && (nt = void 0);
            var e, i = d(),
                n = c().validPositions[i],
                s = void 0 != n ? n.locator.slice() : void 0;
            for (e = i + 1; void 0 == n || null != n.match.fn || null == n.match.fn && "" != n.match.def; e++) n = m(e, s, e - 1), s = n.locator.slice();
            return t = e, void 0 == nt || nt > t ? t : nt
        }

        function S(t) {
            var e = T();
            if (t >= e) return e;
            for (var i = t; ++i < e && !E(i) && (o.nojumps !== !0 || o.nojumpsThreshold > i););
            return i
        }

        function D(t) {
            var e = t;
            if (0 >= e) return 0;
            for (; --e > 0 && !E(e););
            return e
        }

        function A(t) {
            return void 0 == c().validPositions[t] ? I(t) : c().validPositions[t].input
        }

        function P(e, i, n, s, a) {
            if (s && t.isFunction(o.onBeforeWrite)) {
                var r = o.onBeforeWrite.call(e, s, i, n, o);
                if (r) {
                    if (r.refreshFromBuffer) {
                        var l = r.refreshFromBuffer;
                        w(l === !0 ? l : l.start, l.end, r.buffer), u(!0), i = _()
                    }
                    n = r.caret || n
                }
            }
            e._valueSet(i.join("")), void 0 != n && F(e, n), a === !0 && (at = !0, t(e).trigger("input"))
        }

        function I(t, e) {
            return e = e || g(t), void 0 != e.placeholder ? e.placeholder : null == e.fn ? e.def : o.placeholder.charAt(t % o.placeholder.length)
        }

        function M(e, i, n, s) {
            function o() {
                var t = !1,
                    e = y().slice(p, S(p)).join("").indexOf(h);
                if (-1 != e && !E(p)) {
                    t = !0;
                    for (var i = y().slice(p, p + e), n = 0; n < i.length; n++)
                        if (" " != i[n]) {
                            t = !1;
                            break
                        }
                }
                return t
            }
            var a = void 0 != s ? s.slice() : e._valueGet().split("");
            u(), c().p = S(-1), i && e._valueSet("");
            var r = y().slice(0, S(-1)).join(""),
                l = a.join("").match(new RegExp(N(r), "g"));
            l && l.length > 0 && a.splice(0, r.length * l.length);
            var h = "",
                p = 0;
            t.each(a, function(i, s) {
                var a = t.Event("keypress");
                a.which = s.charCodeAt(0), h += s;
                var r = d(),
                    l = c().validPositions[r],
                    u = m(r + 1, l ? l.locator.slice() : void 0, r);
                if (!o() || n) {
                    var f = n ? i : null == u.match.fn && u.match.optionality && r + 1 < c().p ? r + 1 : c().p;
                    K.call(e, a, !0, !1, n, f), p = f + 1, h = ""
                } else K.call(e, a, !0, !1, !0, r + 1)
            }), i && P(e, _(), t(e).is(":focus") ? S(d(0)) : void 0, t.Event("checkval"))
        }

        function N(e) {
            return t.inputmask.escapeRegex.call(this, e)
        }

        function H(e) {
            if (e.data("_inputmask") && !e.hasClass("hasDatepicker")) {
                var i = [],
                    n = c().validPositions;
                for (var s in n) n[s].match && null != n[s].match.fn && i.push(n[s].input);
                var a = (st ? i.reverse() : i).join(""),
                    r = (st ? _().slice().reverse() : _()).join("");
                return t.isFunction(o.onUnMask) && (a = o.onUnMask.call(e, r, a, o) || a), a
            }
            return e[0]._valueGet()
        }

        function B(t) {
            if (st && "number" == typeof t && (!o.greedy || "" != o.placeholder)) {
                var e = _().length;
                t = e - t
            }
            return t
        }

        function F(e, i, n) {
            var s, a = e.jquery && e.length > 0 ? e[0] : e;
            if ("number" != typeof i) return a.setSelectionRange ? (i = a.selectionStart, n = a.selectionEnd) : document.selection && document.selection.createRange && (s = document.selection.createRange(), i = 0 - s.duplicate().moveStart("character", -1e5), n = i + s.text.length), {
                begin: B(i),
                end: B(n)
            };
            if (i = B(i), n = B(n), n = "number" == typeof n ? n : i, t(a).is(":visible")) {
                var r = t(a).css("font-size").replace("px", "") * n;
                a.scrollLeft = r > a.scrollWidth ? r : 0, 0 == o.insertMode && i == n && n++, a.setSelectionRange ? (a.selectionStart = i, a.selectionEnd = n) : a.createTextRange && (s = a.createTextRange(), s.collapse(!0), s.moveEnd("character", n), s.moveStart("character", i), s.select())
            }
        }

        function L(e) {
            var i, n, s = _(),
                o = s.length,
                a = d(),
                r = {},
                l = c().validPositions[a],
                h = void 0 != l ? l.locator.slice() : void 0;
            for (i = a + 1; i < s.length; i++) n = m(i, h, i - 1), h = n.locator.slice(), r[i] = t.extend(!0, {}, n);
            var u = l && void 0 != l.alternation ? l.locator[l.alternation].split(",") : [];
            for (i = o - 1; i > a && (n = r[i].match, (n.optionality || n.optionalQuantifier || l && void 0 != l.alternation && void 0 != r[i].locator[l.alternation] && -1 != t.inArray(r[i].locator[l.alternation].toString(), u)) && s[i] == I(i, n)); i--) o--;
            return e ? {
                l: o,
                def: r[o] ? r[o].match : void 0
            } : o
        }

        function O(t) {
            for (var e = L(), i = t.length - 1; i > e && !E(i); i--);
            t.splice(e, i + 1 - e)
        }

        function R(e) {
            if (t.isFunction(o.isComplete)) return o.isComplete.call(it, e, o);
            if ("*" != o.repeat) {
                var i = !1,
                    n = L(!0),
                    s = D(n.l),
                    a = d();
                if (a == s && (void 0 == n.def || n.def.newBlockMarker || n.def.optionalQuantifier)) {
                    i = !0;
                    for (var r = 0; s >= r; r++) {
                        var l = E(r);
                        if (l && (void 0 == e[r] || e[r] == I(r)) || !l && e[r] != I(r)) {
                            i = !1;
                            break
                        }
                    }
                }
                return i
            }
        }

        function z(t, e) {
            return st ? t - e > 1 || t - e == 1 && o.insertMode : e - t > 1 || e - t == 1 && o.insertMode
        }

        function W(e) {
            var i = t._data(e).events;
            t.each(i, function(e, i) {
                t.each(i, function(t, e) {
                    if ("inputmask" == e.namespace && "setvalue" != e.type) {
                        var i = e.handler;
                        e.handler = function(t) {
                            if (!this.disabled && (!this.readOnly || "keydown" == t.type && t.ctrlKey && 67 == t.keyCode)) {
                                switch (t.type) {
                                    case "input":
                                        if (at === !0) return at = !1, t.preventDefault();
                                        break;
                                    case "keydown":
                                        ot = !1;
                                        break;
                                    case "keypress":
                                        if (ot === !0) return t.preventDefault();
                                        ot = !0;
                                        break;
                                    case "compositionstart":
                                        break;
                                    case "compositionupdate":
                                        at = !0;
                                        break;
                                    case "compositionend":
                                }
                                return i.apply(this, arguments)
                            }
                            t.preventDefault()
                        }
                    }
                })
            })
        }

        function j(e) {
            function i(e) {
                if (void 0 == t.valHooks[e] || 1 != t.valHooks[e].inputmaskpatch) {
                    var i = t.valHooks[e] && t.valHooks[e].get ? t.valHooks[e].get : function(t) {
                            return t.value
                        },
                        n = t.valHooks[e] && t.valHooks[e].set ? t.valHooks[e].set : function(t, e) {
                            return t.value = e, t
                        };
                    t.valHooks[e] = {
                        get: function(e) {
                            var n = t(e);
                            if (n.data("_inputmask")) {
                                if (n.data("_inputmask").opts.autoUnmask) return n.inputmask("unmaskedvalue");
                                var s = i(e),
                                    o = n.data("_inputmask"),
                                    a = o.maskset,
                                    r = a._buffer;
                                return r = r ? r.join("") : "", s != r ? s : ""
                            }
                            return i(e)
                        },
                        set: function(e, i) {
                            var s, o = t(e),
                                a = o.data("_inputmask");
                            return a ? (s = n(e, t.isFunction(a.opts.onBeforeMask) ? a.opts.onBeforeMask.call(pt, i, a.opts) || i : i), o.triggerHandler("setvalue.inputmask")) : s = n(e, i), s
                        },
                        inputmaskpatch: !0
                    }
                }
            }

            function n() {
                var e = t(this),
                    i = t(this).data("_inputmask");
                return i ? i.opts.autoUnmask ? e.inputmask("unmaskedvalue") : r.call(this) != y().join("") ? r.call(this) : "" : r.call(this)
            }

            function s(e) {
                var i = t(this).data("_inputmask");
                i ? (l.call(this, t.isFunction(i.opts.onBeforeMask) ? i.opts.onBeforeMask.call(pt, e, i.opts) || e : e), t(this).triggerHandler("setvalue.inputmask")) : l.call(this, e)
            }

            function a(e) {
                t(e).bind("mouseenter.inputmask", function() {
                    var e = t(this),
                        i = this,
                        n = i._valueGet();
                    "" != n && n != _().join("") && (this._valueSet(t.isFunction(o.onBeforeMask) ? o.onBeforeMask.call(pt, n, o) || n : n), e.triggerHandler("setvalue.inputmask"))
                });
                var i = t._data(e).events,
                    n = i.mouseover;
                if (n) {
                    for (var s = n[n.length - 1], a = n.length - 1; a > 0; a--) n[a] = n[a - 1];
                    n[0] = s
                }
            }
            var r, l;
            e._valueGet || (Object.getOwnPropertyDescriptor && Object.getOwnPropertyDescriptor(e, "value"), document.__lookupGetter__ && e.__lookupGetter__("value") ? (r = e.__lookupGetter__("value"), l = e.__lookupSetter__("value"), e.__defineGetter__("value", n), e.__defineSetter__("value", s)) : (r = function() {
                return e.value
            }, l = function(t) {
                e.value = t
            }, i(e.type), a(e)), e._valueGet = function(t) {
                return st && t !== !0 ? r.call(this).split("").reverse().join("") : r.call(this)
            }, e._valueSet = function(t) {
                l.call(this, st ? t.split("").reverse().join("") : t)
            })
        }

        function U(e, i, n, s) {
            function a() {
                if (o.keepStatic) {
                    u(!0);
                    var i, n = [];
                    for (i = d(); i >= 0; i--)
                        if (c().validPositions[i]) {
                            if (void 0 != c().validPositions[i].alternation) break;
                            n.push(c().validPositions[i].input), delete c().validPositions[i]
                        }
                    if (i > 0)
                        for (; n.length > 0;) {
                            c().p = S(d());
                            var s = t.Event("keypress");
                            s.which = n.pop().charCodeAt(0), K.call(e, s, !0, !1, !1, c().p)
                        }
                }
            }
            if ((o.numericInput || st) && (i == t.inputmask.keyCode.BACKSPACE ? i = t.inputmask.keyCode.DELETE : i == t.inputmask.keyCode.DELETE && (i = t.inputmask.keyCode.BACKSPACE), st)) {
                var r = n.end;
                n.end = n.begin, n.begin = r
            }
            if (i == t.inputmask.keyCode.BACKSPACE && (n.end - n.begin < 1 || 0 == o.insertMode) ? n.begin = D(n.begin) : i == t.inputmask.keyCode.DELETE && n.begin == n.end && (n.end = E(n.end) ? n.end + 1 : S(n.end) + 1), f(n.begin, n.end, !1, s), s !== !0) {
                a();
                var l = d(n.begin);
                l < n.begin ? (-1 == l && u(), c().p = S(l)) : c().p = n.begin
            }
        }

        function q(i) {
            var n = this,
                s = t(n),
                a = i.keyCode,
                l = F(n);
            a == t.inputmask.keyCode.BACKSPACE || a == t.inputmask.keyCode.DELETE || r && 127 == a || i.ctrlKey && 88 == a && !e("cut") ? (i.preventDefault(), 88 == a && (J = _().join("")), U(n, a, l), P(n, _(), c().p, i, J != _().join("")), n._valueGet() == y().join("") ? s.trigger("cleared") : R(_()) === !0 && s.trigger("complete"), o.showTooltip && s.prop("title", c().mask)) : a == t.inputmask.keyCode.END || a == t.inputmask.keyCode.PAGE_DOWN ? setTimeout(function() {
                var t = S(d());
                o.insertMode || t != T() || i.shiftKey || t--, F(n, i.shiftKey ? l.begin : t, t)
            }, 0) : a == t.inputmask.keyCode.HOME && !i.shiftKey || a == t.inputmask.keyCode.PAGE_UP ? F(n, 0, i.shiftKey ? l.begin : 0) : (o.undoOnEscape && a == t.inputmask.keyCode.ESCAPE || 90 == a && i.ctrlKey) && i.altKey !== !0 ? (M(n, !0, !1, J.split("")), s.click()) : a != t.inputmask.keyCode.INSERT || i.shiftKey || i.ctrlKey ? 0 != o.insertMode || i.shiftKey || (a == t.inputmask.keyCode.RIGHT ? setTimeout(function() {
                var t = F(n);
                F(n, t.begin)
            }, 0) : a == t.inputmask.keyCode.LEFT && setTimeout(function() {
                var t = F(n);
                F(n, st ? t.begin + 1 : t.begin - 1)
            }, 0)) : (o.insertMode = !o.insertMode, F(n, o.insertMode || l.begin != T() ? l.begin : l.begin - 1)), rt = -1 != t.inArray(a, o.ignorables)
        }

        function K(e, i, n, s, a) {
            var r = this,
                l = t(r),
                h = e.which || e.charCode || e.keyCode;
            if (!(i === !0 || e.ctrlKey && e.altKey) && (e.ctrlKey || e.metaKey || rt)) return !0;
            if (h) {
                46 == h && 0 == e.shiftKey && "," == o.radixPoint && (h = 44);
                var d, f = i ? {
                        begin: a,
                        end: a
                    } : F(r),
                    m = String.fromCharCode(h),
                    g = z(f.begin, f.end);
                g && (c().undoPositions = t.extend(!0, {}, c().validPositions), U(r, t.inputmask.keyCode.DELETE, f, !0), f.begin = c().p, o.insertMode || (o.insertMode = !o.insertMode, p(f.begin, s), o.insertMode = !o.insertMode), g = !o.multi), c().writeOutBuffer = !0;
                var v = st && !g ? f.end : f.begin,
                    y = x(v, m, s);
                if (y !== !1) {
                    if (y !== !0 && (v = void 0 != y.pos ? y.pos : v, m = void 0 != y.c ? y.c : m), u(!0), void 0 != y.caret) d = y.caret;
                    else {
                        var k = c().validPositions;
                        d = !o.keepStatic && (void 0 != k[v + 1] && b(v + 1, k[v].locator.slice(), v).length > 1 || void 0 != k[v].alternation) ? v + 1 : S(v)
                    }
                    c().p = d
                }
                if (n !== !1) {
                    var C = this;
                    if (setTimeout(function() {
                        o.onKeyValidation.call(C, y, o)
                    }, 0), c().writeOutBuffer && y !== !1) {
                        var E = _();
                        P(r, E, i ? void 0 : o.numericInput ? D(d) : d, e, i !== !0), i !== !0 && setTimeout(function() {
                            R(E) === !0 && l.trigger("complete")
                        }, 0)
                    } else g && (c().buffer = void 0, c().validPositions = c().undoPositions)
                } else g && (c().buffer = void 0, c().validPositions = c().undoPositions);
                if (o.showTooltip && l.prop("title", c().mask), i && t.isFunction(o.onBeforeWrite)) {
                    var T = o.onBeforeWrite.call(this, e, _(), d, o);
                    if (T && T.refreshFromBuffer) {
                        var A = T.refreshFromBuffer;
                        w(A === !0 ? A : A.start, A.end, T.buffer), u(!0), T.caret && (c().p = T.caret)
                    }
                }
                e.preventDefault()
            }
        }

        function Y(e) {
            var i = (t(this), e.keyCode, _());
            o.onKeyUp.call(this, e, i, o)
        }

        function V(e) {
            var i = this,
                n = t(i),
                s = i._valueGet(!0),
                a = F(i);
            if ("propertychange" == e.type && i._valueGet().length <= T()) return !0;
            if ("paste" == e.type) {
                var r = s.substr(0, a.begin),
                    l = s.substr(a.end, s.length);
                r == y().slice(0, a.begin).join("") && (r = ""), l == y().slice(a.end).join("") && (l = ""), window.clipboardData && window.clipboardData.getData ? s = r + window.clipboardData.getData("Text") + l : e.originalEvent && e.originalEvent.clipboardData && e.originalEvent.clipboardData.getData && (s = r + e.originalEvent.clipboardData.getData("text/plain") + l)
            }
            var h = s;
            if (t.isFunction(o.onBeforePaste)) {
                if (h = o.onBeforePaste.call(i, s, o), h === !1) return e.preventDefault(), !1;
                h || (h = s)
            }
            return M(i, !0, !1, st ? h.split("").reverse() : h.split("")), n.click(), R(_()) === !0 && n.trigger("complete"), !1
        }

        function G(e) {
            var i = this;
            M(i, !0, !1), R(_()) === !0 && t(i).trigger("complete"), e.preventDefault()
        }

        function X(t) {
            var e = this;
            J = _().join(""), ("" == et || 0 != t.originalEvent.data.indexOf(et)) && (tt = F(e))
        }

        function $(e) {
            var i = this,
                n = tt || F(i);
            0 == e.originalEvent.data.indexOf(et) && (u(), n = {
                begin: 0,
                end: 0
            });
            var s = e.originalEvent.data;
            F(i, n.begin, n.end);
            for (var a = 0; a < s.length; a++) {
                var r = t.Event("keypress");
                r.which = s.charCodeAt(a), ot = !1, rt = !1, K.call(i, r)
            }
            setTimeout(function() {
                var t = c().p;
                P(i, _(), o.numericInput ? D(t) : t)
            }, 0), et = e.originalEvent.data
        }

        function Q() {}

        function Z(e) {
            if (it = t(e), it.is(":input") && i(it.attr("type"))) {
                if (it.data("_inputmask", {
                    maskset: s,
                    opts: o,
                    isRTL: !1
                }), o.showTooltip && it.prop("title", c().mask), ("rtl" == e.dir || o.rightAlign) && it.css("text-align", "right"), "rtl" == e.dir || o.numericInput) {
                    e.dir = "ltr", it.removeAttr("dir");
                    var n = it.data("_inputmask");
                    n.isRTL = !0, it.data("_inputmask", n), st = !0
                }
                it.unbind(".inputmask"), it.closest("form").bind("submit", function() {
                    J != _().join("") && it.change(), it[0]._valueGet && it[0]._valueGet() == y().join("") && it[0]._valueSet(""), o.removeMaskOnSubmit && it.inputmask("remove")
                }).bind("reset", function() {
                    setTimeout(function() {
                        it.triggerHandler("setvalue.inputmask")
                    }, 0)
                }), it.bind("mouseenter.inputmask", function() {
                    var e = t(this),
                        i = this;
                    !e.is(":focus") && o.showMaskOnHover && i._valueGet() != _().join("") && P(i, _())
                }).bind("blur.inputmask", function(e) {
                    var i = t(this),
                        n = this;
                    if (i.data("_inputmask")) {
                        var s = n._valueGet(),
                            a = _().slice();
                        lt = !0, J != a.join("") && setTimeout(function() {
                            i.change(), J = a.join("")
                        }, 0), "" != s && (o.clearMaskOnLostFocus && (s == y().join("") ? a = [] : O(a)), R(a) === !1 && (i.trigger("incomplete"), o.clearIncomplete && (u(), a = o.clearMaskOnLostFocus ? [] : y().slice())), P(n, a, void 0, e))
                    }
                }).bind("focus.inputmask", function() {
                    var e = (t(this), this),
                        i = e._valueGet();
                    o.showMaskOnFocus && (!o.showMaskOnHover || o.showMaskOnHover && "" == i) && e._valueGet() != _().join("") && P(e, _(), S(d())), J = _().join("")
                }).bind("mouseleave.inputmask", function() {
                    var e = t(this),
                        i = this;
                    if (o.clearMaskOnLostFocus) {
                        var n = _().slice(),
                            s = i._valueGet();
                        e.is(":focus") || s == e.attr("placeholder") || "" == s || (s == y().join("") ? n = [] : O(n), P(i, n))
                    }
                }).bind("click.inputmask", function() {
                    var e = t(this),
                        i = this;
                    if (e.is(":focus")) {
                        var n = F(i);
                        if (n.begin == n.end)
                            if (o.radixFocus && "" != o.radixPoint && -1 != t.inArray(o.radixPoint, _()) && (lt || _().join("") == y().join(""))) F(i, t.inArray(o.radixPoint, _())), lt = !1;
                            else {
                                var s = st ? B(n.begin) : n.begin,
                                    a = S(d(s));
                                a > s ? F(i, E(s) ? s : S(s)) : F(i, a)
                            }
                    }
                }).bind("dblclick.inputmask", function() {
                    var t = this;
                    setTimeout(function() {
                        F(t, 0, S(d()))
                    }, 0)
                }).bind(h + ".inputmask dragdrop.inputmask drop.inputmask", V).bind("setvalue.inputmask", function() {
                    var t = this;
                    M(t, !0, !1), J = _().join(""), (o.clearMaskOnLostFocus || o.clearIncomplete) && t._valueGet() == y().join("") && t._valueSet("")
                }).bind("cut.inputmask", function(e) {
                    at = !0;
                    var i = this,
                        n = t(i),
                        s = F(i);
                    U(i, t.inputmask.keyCode.DELETE, s), P(i, _(), c().p, e, J != _().join("")), i._valueGet() == y().join("") && n.trigger("cleared"), o.showTooltip && n.prop("title", c().mask)
                }).bind("complete.inputmask", o.oncomplete).bind("incomplete.inputmask", o.onincomplete).bind("cleared.inputmask", o.oncleared), it.bind("keydown.inputmask", q).bind("keypress.inputmask", K).bind("keyup.inputmask", Y), l || it.bind("compositionstart.inputmask", X).bind("compositionupdate.inputmask", $).bind("compositionend.inputmask", Q), "paste" === h && it.bind("input.inputmask", G), j(e);
                var a = t.isFunction(o.onBeforeMask) ? o.onBeforeMask.call(e, e._valueGet(), o) || e._valueGet() : e._valueGet();
                M(e, !0, !1, a.split(""));
                var r = _().slice();
                J = r.join("");
                var p;
                try {
                    p = document.activeElement
                } catch (f) {}
                R(r) === !1 && o.clearIncomplete && u(), o.clearMaskOnLostFocus && (r.join("") == y().join("") ? r = [] : O(r)), P(e, r), p === e && F(e, S(d())), W(e)
            }
        }
        var J, tt, et, it, nt, st = !1,
            ot = !1,
            at = !1,
            rt = !1,
            lt = !0;
        if (void 0 != n) switch (n.action) {
            case "isComplete":
                return it = t(n.el), s = it.data("_inputmask").maskset, o = it.data("_inputmask").opts, R(n.buffer);
            case "unmaskedvalue":
                return it = n.$input, s = it.data("_inputmask").maskset, o = it.data("_inputmask").opts, st = n.$input.data("_inputmask").isRTL, H(n.$input);
            case "mask":
                J = _().join(""), Z(n.el);
                break;
            case "format":
                it = t({}), it.data("_inputmask", {
                    maskset: s,
                    opts: o,
                    isRTL: o.numericInput
                }), o.numericInput && (st = !0);
                var ht = (t.isFunction(o.onBeforeMask) ? o.onBeforeMask.call(it, n.value, o) || n.value : n.value).split("");
                return M(it, !1, !1, st ? ht.reverse() : ht), t.isFunction(o.onBeforeWrite) && o.onBeforeWrite.call(this, void 0, _(), 0, o), n.metadata ? {
                    value: st ? _().slice().reverse().join("") : _().join(""),
                    metadata: it.inputmask("getmetadata")
                } : st ? _().slice().reverse().join("") : _().join("");
            case "isValid":
                it = t({}), it.data("_inputmask", {
                    maskset: s,
                    opts: o,
                    isRTL: o.numericInput
                }), o.numericInput && (st = !0);
                var ht = n.value.split("");
                M(it, !1, !0, st ? ht.reverse() : ht);
                for (var ct = _(), ut = L(), dt = ct.length - 1; dt > ut && !E(dt); dt--);
                return ct.splice(ut, dt + 1 - ut), R(ct) && n.value == ct.join("");
            case "getemptymask":
                return it = t(n.el), s = it.data("_inputmask").maskset, o = it.data("_inputmask").opts, y();
            case "remove":
                var pt = n.el;
                it = t(pt), s = it.data("_inputmask").maskset, o = it.data("_inputmask").opts, pt._valueSet(H(it)), it.unbind(".inputmask"), it.removeData("_inputmask");
                var ft;
                Object.getOwnPropertyDescriptor && (ft = Object.getOwnPropertyDescriptor(pt, "value")), ft && ft.get ? pt._valueGet && Object.defineProperty(pt, "value", {
                    get: pt._valueGet,
                    set: pt._valueSet
                }) : document.__lookupGetter__ && pt.__lookupGetter__("value") && pt._valueGet && (pt.__defineGetter__("value", pt._valueGet), pt.__defineSetter__("value", pt._valueSet));
                try {
                    delete pt._valueGet, delete pt._valueSet
                } catch (mt) {
                    pt._valueGet = void 0, pt._valueSet = void 0
                }
                break;
            case "getmetadata":
                if (it = t(n.el), s = it.data("_inputmask").maskset, o = it.data("_inputmask").opts, t.isArray(s.metadata)) {
                    for (var gt, vt = d(), bt = vt; bt >= 0; bt--)
                        if (c().validPositions[bt] && void 0 != c().validPositions[bt].alternation) {
                            gt = c().validPositions[bt].alternation;
                            break
                        }
                    return void 0 != gt ? s.metadata[c().validPositions[vt].locator[gt]] : s.metadata[0]
                }
                return s.metadata
        }
    }
    if (void 0 === t.fn.inputmask) {
        var a = navigator.userAgent,
            r = null !== a.match(new RegExp("iphone", "i")),
            l = (null !== a.match(new RegExp("android.*safari.*", "i")), null !== a.match(new RegExp("android.*chrome.*", "i")), null !== a.match(new RegExp("android.*firefox.*", "i"))),
            h = (/Kindle/i.test(a) || /Silk/i.test(a) || /KFTT/i.test(a) || /KFOT/i.test(a) || /KFJWA/i.test(a) || /KFJWI/i.test(a) || /KFSOWI/i.test(a) || /KFTHWA/i.test(a) || /KFTHWI/i.test(a) || /KFAPWA/i.test(a) || /KFAPWI/i.test(a), e("paste") ? "paste" : e("input") ? "input" : "propertychange");
        t.inputmask = {
            defaults: {
                placeholder: "_",
                optionalmarker: {
                    start: "[",
                    end: "]"
                },
                quantifiermarker: {
                    start: "{",
                    end: "}"
                },
                groupmarker: {
                    start: "(",
                    end: ")"
                },
                alternatormarker: "|",
                escapeChar: "\\",
                mask: null,
                oncomplete: t.noop,
                onincomplete: t.noop,
                oncleared: t.noop,
                repeat: 0,
                greedy: !0,
                autoUnmask: !1,
                removeMaskOnSubmit: !1,
                clearMaskOnLostFocus: !0,
                insertMode: !0,
                clearIncomplete: !1,
                aliases: {},
                alias: null,
                onKeyUp: t.noop,
                onBeforeMask: void 0,
                onBeforePaste: void 0,
                onBeforeWrite: void 0,
                onUnMask: void 0,
                showMaskOnFocus: !0,
                showMaskOnHover: !0,
                onKeyValidation: t.noop,
                skipOptionalPartCharacter: " ",
                showTooltip: !1,
                numericInput: !1,
                rightAlign: !1,
                undoOnEscape: !0,
                radixPoint: "",
                radixFocus: !1,
                nojumps: !1,
                nojumpsThreshold: 0,
                keepStatic: void 0,
                definitions: {
                    9: {
                        validator: "[0-9]",
                        cardinality: 1,
                        definitionSymbol: "*"
                    },
                    a: {
                        validator: "[A-Za-zА-яЁёÀ-ÿµ]",
                        cardinality: 1,
                        definitionSymbol: "*"
                    },
                    "*": {
                        validator: "[0-9A-Za-zА-яЁёÀ-ÿµ]",
                        cardinality: 1
                    }
                },
                ignorables: [8, 9, 13, 19, 27, 33, 34, 35, 36, 37, 38, 39, 40, 45, 46, 93, 112, 113, 114, 115, 116, 117, 118, 119, 120, 121, 122, 123],
                isComplete: void 0,
                canClearPosition: t.noop,
                postValidation: void 0
            },
            keyCode: {
                ALT: 18,
                BACKSPACE: 8,
                CAPS_LOCK: 20,
                COMMA: 188,
                COMMAND: 91,
                COMMAND_LEFT: 91,
                COMMAND_RIGHT: 93,
                CONTROL: 17,
                DELETE: 46,
                DOWN: 40,
                END: 35,
                ENTER: 13,
                ESCAPE: 27,
                HOME: 36,
                INSERT: 45,
                LEFT: 37,
                MENU: 93,
                NUMPAD_ADD: 107,
                NUMPAD_DECIMAL: 110,
                NUMPAD_DIVIDE: 111,
                NUMPAD_ENTER: 108,
                NUMPAD_MULTIPLY: 106,
                NUMPAD_SUBTRACT: 109,
                PAGE_DOWN: 34,
                PAGE_UP: 33,
                PERIOD: 190,
                RIGHT: 39,
                SHIFT: 16,
                SPACE: 32,
                TAB: 9,
                UP: 38,
                WINDOWS: 91
            },
            masksCache: {},
            escapeRegex: function(t) {
                var e = ["/", ".", "*", "+", "?", "|", "(", ")", "[", "]", "{", "}", "\\", "$", "^"];
                return t.replace(new RegExp("(\\" + e.join("|\\") + ")", "gim"), "\\$1")
            },
            format: function(e, i, a) {
                var r = t.extend(!0, {}, t.inputmask.defaults, i);
                return n(r.alias, i, r), o({
                    action: "format",
                    value: e,
                    metadata: a
                }, s(r), r)
            },
            isValid: function(e, i) {
                var a = t.extend(!0, {}, t.inputmask.defaults, i);
                return n(a.alias, i, a), o({
                    action: "isValid",
                    value: e
                }, s(a), a)
            }
        }, t.fn.inputmask = function(e, i) {
            function a(e, i, s) {
                var o = t(e);
                o.data("inputmask-alias") && n(o.data("inputmask-alias"), {}, i);
                for (var a in i) {
                    var r = o.data("inputmask-" + a.toLowerCase());
                    void 0 != r && ("mask" == a && 0 == r.indexOf("[") ? (i[a] = r.replace(/[\s[\]]/g, "").split("','"), i[a][0] = i[a][0].replace("'", ""), i[a][i[a].length - 1] = i[a][i[a].length - 1].replace("'", "")) : i[a] = "boolean" == typeof r ? r : r.toString(), s && (s[a] = i[a]))
                }
                return i
            }
            var r, l = t.extend(!0, {}, t.inputmask.defaults, i);
            if ("string" == typeof e) switch (e) {
                case "mask":
                    return n(l.alias, i, l), r = s(l), void 0 == r ? this : this.each(function() {
                        o({
                            action: "mask",
                            el: this
                        }, t.extend(!0, {}, r), a(this, l))
                    });
                case "unmaskedvalue":
                    var h = t(this);
                    return h.data("_inputmask") ? o({
                        action: "unmaskedvalue",
                        $input: h
                    }) : h.val();
                case "remove":
                    return this.each(function() {
                        var e = t(this);
                        e.data("_inputmask") && o({
                            action: "remove",
                            el: this
                        })
                    });
                case "getemptymask":
                    return this.data("_inputmask") ? o({
                        action: "getemptymask",
                        el: this
                    }) : "";
                case "hasMaskedValue":
                    return this.data("_inputmask") ? !this.data("_inputmask").opts.autoUnmask : !1;
                case "isComplete":
                    return this.data("_inputmask") ? o({
                        action: "isComplete",
                        buffer: this[0]._valueGet().split(""),
                        el: this
                    }) : !0;
                case "getmetadata":
                    return this.data("_inputmask") ? o({
                        action: "getmetadata",
                        el: this
                    }) : void 0;
                default:
                    return n(l.alias, i, l), n(e, i, l) || (l.mask = e), r = s(l), void 0 == r ? this : this.each(function() {
                        o({
                            action: "mask",
                            el: this
                        }, t.extend(!0, {}, r), a(this, l))
                    })
            } else {
                if ("object" == typeof e) return l = t.extend(!0, {}, t.inputmask.defaults, e), n(l.alias, e, l), r = s(l), void 0 == r ? this : this.each(function() {
                    o({
                        action: "mask",
                        el: this
                    }, t.extend(!0, {}, r), a(this, l))
                });
                if (void 0 == e) return this.each(function() {
                    var e = t(this).attr("data-inputmask");
                    if (e && "" != e) try {
                        e = e.replace(new RegExp("'", "g"), '"');
                        var s = t.parseJSON("{" + e + "}");
                        t.extend(!0, s, i), l = t.extend(!0, {}, t.inputmask.defaults, s), l = a(this, l), n(l.alias, s, l), l.alias = void 0, t(this).inputmask("mask", l)
                    } catch (o) {}
                    if (t(this).attr("data-inputmask-mask") || t(this).attr("data-inputmask-alias")) {
                        l = t.extend(!0, {}, t.inputmask.defaults, {});
                        var r = {};
                        l = a(this, l, r), n(l.alias, r, l), l.alias = void 0, t(this).inputmask("mask", l)
                    }
                })
            }
        }
    }
    return t.fn.inputmask
}(jQuery),
    function(t) {
        return t.extend(t.inputmask.defaults.definitions, {
            h: {
                validator: "[01][0-9]|2[0-3]",
                cardinality: 2,
                prevalidator: [{
                    validator: "[0-2]",
                    cardinality: 1
                }]
            },
            s: {
                validator: "[0-5][0-9]",
                cardinality: 2,
                prevalidator: [{
                    validator: "[0-5]",
                    cardinality: 1
                }]
            },
            d: {
                validator: "0[1-9]|[12][0-9]|3[01]",
                cardinality: 2,
                prevalidator: [{
                    validator: "[0-3]",
                    cardinality: 1
                }]
            },
            m: {
                validator: "0[1-9]|1[012]",
                cardinality: 2,
                prevalidator: [{
                    validator: "[01]",
                    cardinality: 1
                }]
            },
            y: {
                validator: "(19|20)\\d{2}",
                cardinality: 4,
                prevalidator: [{
                    validator: "[12]",
                    cardinality: 1
                }, {
                    validator: "(19|20)",
                    cardinality: 2
                }, {
                    validator: "(19|20)\\d",
                    cardinality: 3
                }]
            }
        }), t.extend(t.inputmask.defaults.aliases, {
            "dd/mm/yyyy": {
                mask: "1/2/y",
                placeholder: "dd/mm/yyyy",
                regex: {
                    val1pre: new RegExp("[0-3]"),
                    val1: new RegExp("0[1-9]|[12][0-9]|3[01]"),
                    val2pre: function(e) {
                        var i = t.inputmask.escapeRegex.call(this, e);
                        return new RegExp("((0[1-9]|[12][0-9]|3[01])" + i + "[01])")
                    },
                    val2: function(e) {
                        var i = t.inputmask.escapeRegex.call(this, e);
                        return new RegExp("((0[1-9]|[12][0-9])" + i + "(0[1-9]|1[012]))|(30" + i + "(0[13-9]|1[012]))|(31" + i + "(0[13578]|1[02]))")
                    }
                },
                leapday: "29/02/",
                separator: "/",
                yearrange: {
                    minyear: 1900,
                    maxyear: 2099
                },
                isInYearRange: function(t, e, i) {
                    if (isNaN(t)) return !1;
                    var n = parseInt(t.concat(e.toString().slice(t.length))),
                        s = parseInt(t.concat(i.toString().slice(t.length)));
                    return (isNaN(n) ? !1 : n >= e && i >= n) || (isNaN(s) ? !1 : s >= e && i >= s)
                },
                determinebaseyear: function(t, e, i) {
                    var n = (new Date).getFullYear();
                    if (t > n) return t;
                    if (n > e) {
                        for (var s = e.toString().slice(0, 2), o = e.toString().slice(2, 4); s + i > e;) s--;
                        var a = s + o;
                        return t > a ? t : a
                    }
                    return n
                },
                onKeyUp: function(e) {
                    var i = t(this);
                    if (e.ctrlKey && e.keyCode == t.inputmask.keyCode.RIGHT) {
                        var n = new Date;
                        i.val(n.getDate().toString() + (n.getMonth() + 1).toString() + n.getFullYear().toString()), i.triggerHandler("setvalue.inputmask")
                    }
                },
                getFrontValue: function(t, e, i) {
                    for (var n = 0, s = 0, o = 0; o < t.length && "2" != t.charAt(o); o++) {
                        var a = i.definitions[t.charAt(o)];
                        a ? (n += s, s = a.cardinality) : s++
                    }
                    return e.join("").substr(n, s)
                },
                definitions: {
                    1: {
                        validator: function(t, e, i, n, s) {
                            var o = s.regex.val1.test(t);
                            return n || o || t.charAt(1) != s.separator && -1 == "-./".indexOf(t.charAt(1)) || !(o = s.regex.val1.test("0" + t.charAt(0))) ? o : (e.buffer[i - 1] = "0", {
                                refreshFromBuffer: {
                                    start: i - 1,
                                    end: i
                                },
                                pos: i,
                                c: t.charAt(0)
                            })
                        },
                        cardinality: 2,
                        prevalidator: [{
                            validator: function(t, e, i, n, s) {
                                isNaN(e.buffer[i + 1]) || (t += e.buffer[i + 1]);
                                var o = 1 == t.length ? s.regex.val1pre.test(t) : s.regex.val1.test(t);
                                return n || o || !(o = s.regex.val1.test("0" + t)) ? o : (e.buffer[i] = "0", i++, {
                                    pos: i
                                })
                            },
                            cardinality: 1
                        }]
                    },
                    2: {
                        validator: function(t, e, i, n, s) {
                            var o = s.getFrontValue(e.mask, e.buffer, s); - 1 != o.indexOf(s.placeholder[0]) && (o = "01" + s.separator);
                            var a = s.regex.val2(s.separator).test(o + t);
                            if (!n && !a && (t.charAt(1) == s.separator || -1 != "-./".indexOf(t.charAt(1))) && (a = s.regex.val2(s.separator).test(o + "0" + t.charAt(0)))) return e.buffer[i - 1] = "0", {
                                refreshFromBuffer: {
                                    start: i - 1,
                                    end: i
                                },
                                pos: i,
                                c: t.charAt(0)
                            };
                            if (s.mask.indexOf("2") == s.mask.length - 1 && a) {
                                var r = e.buffer.join("").substr(4, 4) + t;
                                if (r != s.leapday) return !0;
                                var l = parseInt(e.buffer.join("").substr(0, 4), 10);
                                return l % 4 === 0 ? l % 100 === 0 ? l % 400 === 0 ? !0 : !1 : !0 : !1
                            }
                            return a
                        },
                        cardinality: 2,
                        prevalidator: [{
                            validator: function(t, e, i, n, s) {
                                isNaN(e.buffer[i + 1]) || (t += e.buffer[i + 1]);
                                var o = s.getFrontValue(e.mask, e.buffer, s); - 1 != o.indexOf(s.placeholder[0]) && (o = "01" + s.separator);
                                var a = 1 == t.length ? s.regex.val2pre(s.separator).test(o + t) : s.regex.val2(s.separator).test(o + t);
                                return n || a || !(a = s.regex.val2(s.separator).test(o + "0" + t)) ? a : (e.buffer[i] = "0", i++, {
                                    pos: i
                                })
                            },
                            cardinality: 1
                        }]
                    },
                    y: {
                        validator: function(t, e, i, n, s) {
                            if (s.isInYearRange(t, s.yearrange.minyear, s.yearrange.maxyear)) {
                                var o = e.buffer.join("").substr(0, 6);
                                if (o != s.leapday) return !0;
                                var a = parseInt(t, 10);
                                return a % 4 === 0 ? a % 100 === 0 ? a % 400 === 0 ? !0 : !1 : !0 : !1
                            }
                            return !1
                        },
                        cardinality: 4,
                        prevalidator: [{
                            validator: function(t, e, i, n, s) {
                                var o = s.isInYearRange(t, s.yearrange.minyear, s.yearrange.maxyear);
                                if (!n && !o) {
                                    var a = s.determinebaseyear(s.yearrange.minyear, s.yearrange.maxyear, t + "0").toString().slice(0, 1);
                                    if (o = s.isInYearRange(a + t, s.yearrange.minyear, s.yearrange.maxyear)) return e.buffer[i++] = a.charAt(0), {
                                        pos: i
                                    };
                                    if (a = s.determinebaseyear(s.yearrange.minyear, s.yearrange.maxyear, t + "0").toString().slice(0, 2), o = s.isInYearRange(a + t, s.yearrange.minyear, s.yearrange.maxyear)) return e.buffer[i++] = a.charAt(0), e.buffer[i++] = a.charAt(1), {
                                        pos: i
                                    }
                                }
                                return o
                            },
                            cardinality: 1
                        }, {
                            validator: function(t, e, i, n, s) {
                                var o = s.isInYearRange(t, s.yearrange.minyear, s.yearrange.maxyear);
                                if (!n && !o) {
                                    var a = s.determinebaseyear(s.yearrange.minyear, s.yearrange.maxyear, t).toString().slice(0, 2);
                                    if (o = s.isInYearRange(t[0] + a[1] + t[1], s.yearrange.minyear, s.yearrange.maxyear)) return e.buffer[i++] = a.charAt(1), {
                                        pos: i
                                    };
                                    if (a = s.determinebaseyear(s.yearrange.minyear, s.yearrange.maxyear, t).toString().slice(0, 2), s.isInYearRange(a + t, s.yearrange.minyear, s.yearrange.maxyear)) {
                                        var r = e.buffer.join("").substr(0, 6);
                                        if (r != s.leapday) o = !0;
                                        else {
                                            var l = parseInt(t, 10);
                                            o = l % 4 === 0 ? l % 100 === 0 ? l % 400 === 0 ? !0 : !1 : !0 : !1
                                        }
                                    } else o = !1;
                                    if (o) return e.buffer[i - 1] = a.charAt(0), e.buffer[i++] = a.charAt(1), e.buffer[i++] = t.charAt(0), {
                                        refreshFromBuffer: {
                                            start: i - 3,
                                            end: i
                                        },
                                        pos: i
                                    }
                                }
                                return o
                            },
                            cardinality: 2
                        }, {
                            validator: function(t, e, i, n, s) {
                                return s.isInYearRange(t, s.yearrange.minyear, s.yearrange.maxyear)
                            },
                            cardinality: 3
                        }]
                    }
                },
                insertMode: !1,
                autoUnmask: !1
            },
            "mm/dd/yyyy": {
                placeholder: "mm/dd/yyyy",
                alias: "dd/mm/yyyy",
                regex: {
                    val2pre: function(e) {
                        var i = t.inputmask.escapeRegex.call(this, e);
                        return new RegExp("((0[13-9]|1[012])" + i + "[0-3])|(02" + i + "[0-2])")
                    },
                    val2: function(e) {
                        var i = t.inputmask.escapeRegex.call(this, e);
                        return new RegExp("((0[1-9]|1[012])" + i + "(0[1-9]|[12][0-9]))|((0[13-9]|1[012])" + i + "30)|((0[13578]|1[02])" + i + "31)")
                    },
                    val1pre: new RegExp("[01]"),
                    val1: new RegExp("0[1-9]|1[012]")
                },
                leapday: "02/29/",
                onKeyUp: function(e) {
                    var i = t(this);
                    if (e.ctrlKey && e.keyCode == t.inputmask.keyCode.RIGHT) {
                        var n = new Date;
                        i.val((n.getMonth() + 1).toString() + n.getDate().toString() + n.getFullYear().toString()), i.triggerHandler("setvalue.inputmask")
                    }
                }
            },
            "yyyy/mm/dd": {
                mask: "y/1/2",
                placeholder: "yyyy/mm/dd",
                alias: "mm/dd/yyyy",
                leapday: "/02/29",
                onKeyUp: function(e) {
                    var i = t(this);
                    if (e.ctrlKey && e.keyCode == t.inputmask.keyCode.RIGHT) {
                        var n = new Date;
                        i.val(n.getFullYear().toString() + (n.getMonth() + 1).toString() + n.getDate().toString()), i.triggerHandler("setvalue.inputmask")
                    }
                }
            },
            "dd.mm.yyyy": {
                mask: "1.2.y",
                placeholder: "dd.mm.yyyy",
                leapday: "29.02.",
                separator: ".",
                alias: "dd/mm/yyyy"
            },
            "dd-mm-yyyy": {
                mask: "1-2-y",
                placeholder: "dd-mm-yyyy",
                leapday: "29-02-",
                separator: "-",
                alias: "dd/mm/yyyy"
            },
            "mm.dd.yyyy": {
                mask: "1.2.y",
                placeholder: "mm.dd.yyyy",
                leapday: "02.29.",
                separator: ".",
                alias: "mm/dd/yyyy"
            },
            "mm-dd-yyyy": {
                mask: "1-2-y",
                placeholder: "mm-dd-yyyy",
                leapday: "02-29-",
                separator: "-",
                alias: "mm/dd/yyyy"
            },
            "yyyy.mm.dd": {
                mask: "y.1.2",
                placeholder: "yyyy.mm.dd",
                leapday: ".02.29",
                separator: ".",
                alias: "yyyy/mm/dd"
            },
            "yyyy-mm-dd": {
                mask: "y-1-2",
                placeholder: "yyyy-mm-dd",
                leapday: "-02-29",
                separator: "-",
                alias: "yyyy/mm/dd"
            },
            datetime: {
                mask: "1/2/y h:s",
                placeholder: "dd/mm/yyyy hh:mm",
                alias: "dd/mm/yyyy",
                regex: {
                    hrspre: new RegExp("[012]"),
                    hrs24: new RegExp("2[0-4]|1[3-9]"),
                    hrs: new RegExp("[01][0-9]|2[0-4]"),
                    ampm: new RegExp("^[a|p|A|P][m|M]"),
                    mspre: new RegExp("[0-5]"),
                    ms: new RegExp("[0-5][0-9]")
                },
                timeseparator: ":",
                hourFormat: "24",
                definitions: {
                    h: {
                        validator: function(t, e, i, n, s) {
                            if ("24" == s.hourFormat && 24 == parseInt(t, 10)) return e.buffer[i - 1] = "0", e.buffer[i] = "0", {
                                refreshFromBuffer: {
                                    start: i - 1,
                                    end: i
                                },
                                c: "0"
                            };
                            var o = s.regex.hrs.test(t);
                            if (!n && !o && (t.charAt(1) == s.timeseparator || -1 != "-.:".indexOf(t.charAt(1))) && (o = s.regex.hrs.test("0" + t.charAt(0)))) return e.buffer[i - 1] = "0", e.buffer[i] = t.charAt(0), i++, {
                                refreshFromBuffer: {
                                    start: i - 2,
                                    end: i
                                },
                                pos: i,
                                c: s.timeseparator
                            };
                            if (o && "24" !== s.hourFormat && s.regex.hrs24.test(t)) {
                                var a = parseInt(t, 10);
                                return 24 == a ? (e.buffer[i + 5] = "a", e.buffer[i + 6] = "m") : (e.buffer[i + 5] = "p", e.buffer[i + 6] = "m"), a -= 12, 10 > a ? (e.buffer[i] = a.toString(), e.buffer[i - 1] = "0") : (e.buffer[i] = a.toString().charAt(1), e.buffer[i - 1] = a.toString().charAt(0)), {
                                    refreshFromBuffer: {
                                        start: i - 1,
                                        end: i + 6
                                    },
                                    c: e.buffer[i]
                                }
                            }
                            return o
                        },
                        cardinality: 2,
                        prevalidator: [{
                            validator: function(t, e, i, n, s) {
                                var o = s.regex.hrspre.test(t);
                                return n || o || !(o = s.regex.hrs.test("0" + t)) ? o : (e.buffer[i] = "0", i++, {
                                    pos: i
                                })
                            },
                            cardinality: 1
                        }]
                    },
                    s: {
                        validator: "[0-5][0-9]",
                        cardinality: 2,
                        prevalidator: [{
                            validator: function(t, e, i, n, s) {
                                var o = s.regex.mspre.test(t);
                                return n || o || !(o = s.regex.ms.test("0" + t)) ? o : (e.buffer[i] = "0", i++, {
                                    pos: i
                                })
                            },
                            cardinality: 1
                        }]
                    },
                    t: {
                        validator: function(t, e, i, n, s) {
                            return s.regex.ampm.test(t + "m")
                        },
                        casing: "lower",
                        cardinality: 1
                    }
                },
                insertMode: !1,
                autoUnmask: !1
            },
            datetime12: {
                mask: "1/2/y h:s t\\m",
                placeholder: "dd/mm/yyyy hh:mm xm",
                alias: "datetime",
                hourFormat: "12"
            },
            "hh:mm t": {
                mask: "h:s t\\m",
                placeholder: "hh:mm xm",
                alias: "datetime",
                hourFormat: "12"
            },
            "h:s t": {
                mask: "h:s t\\m",
                placeholder: "hh:mm xm",
                alias: "datetime",
                hourFormat: "12"
            },
            "hh:mm:ss": {
                mask: "h:s:s",
                placeholder: "hh:mm:ss",
                alias: "datetime",
                autoUnmask: !1
            },
            "hh:mm": {
                mask: "h:s",
                placeholder: "hh:mm",
                alias: "datetime",
                autoUnmask: !1
            },
            date: {
                alias: "dd/mm/yyyy"
            },
            "mm/yyyy": {
                mask: "1/y",
                placeholder: "mm/yyyy",
                leapday: "donotuse",
                separator: "/",
                alias: "mm/dd/yyyy"
            }
        }), t.fn.inputmask
    }(jQuery),
    function(t) {
        return t.extend(t.inputmask.defaults.definitions, {
            A: {
                validator: "[A-Za-zА-яЁёÀ-ÿµ]",
                cardinality: 1,
                casing: "upper"
            },
            "#": {
                validator: "[0-9A-Za-zА-яЁёÀ-ÿµ]",
                cardinality: 1,
                casing: "upper"
            }
        }), t.extend(t.inputmask.defaults.aliases, {
            url: {
                mask: "ir",
                placeholder: "",
                separator: "",
                defaultPrefix: "http://",
                regex: {
                    urlpre1: new RegExp("[fh]"),
                    urlpre2: new RegExp("(ft|ht)"),
                    urlpre3: new RegExp("(ftp|htt)"),
                    urlpre4: new RegExp("(ftp:|http|ftps)"),
                    urlpre5: new RegExp("(ftp:/|ftps:|http:|https)"),
                    urlpre6: new RegExp("(ftp://|ftps:/|http:/|https:)"),
                    urlpre7: new RegExp("(ftp://|ftps://|http://|https:/)"),
                    urlpre8: new RegExp("(ftp://|ftps://|http://|https://)")
                },
                definitions: {
                    i: {
                        validator: function() {
                            return !0
                        },
                        cardinality: 8,
                        prevalidator: function() {
                            for (var t = [], e = 8, i = 0; e > i; i++) t[i] = function() {
                                var t = i;
                                return {
                                    validator: function(e, i, n, s, o) {
                                        if (o.regex["urlpre" + (t + 1)]) {
                                            var a, r = e;
                                            t + 1 - e.length > 0 && (r = i.buffer.join("").substring(0, t + 1 - e.length) + "" + r);
                                            var l = o.regex["urlpre" + (t + 1)].test(r);
                                            if (!s && !l) {
                                                for (n -= t, a = 0; a < o.defaultPrefix.length; a++) i.buffer[n] = o.defaultPrefix[a], n++;
                                                for (a = 0; a < r.length - 1; a++) i.buffer[n] = r[a], n++;
                                                return {
                                                    pos: n
                                                }
                                            }
                                            return l
                                        }
                                        return !1
                                    },
                                    cardinality: t
                                }
                            }();
                            return t
                        }()
                    },
                    r: {
                        validator: ".",
                        cardinality: 50
                    }
                },
                insertMode: !1,
                autoUnmask: !1
            },
            ip: {
                mask: "i[i[i]].i[i[i]].i[i[i]].i[i[i]]",
                definitions: {
                    i: {
                        validator: function(t, e, i) {
                            return i - 1 > -1 && "." != e.buffer[i - 1] ? (t = e.buffer[i - 1] + t, t = i - 2 > -1 && "." != e.buffer[i - 2] ? e.buffer[i - 2] + t : "0" + t) : t = "00" + t, new RegExp("25[0-5]|2[0-4][0-9]|[01][0-9][0-9]").test(t)
                        },
                        cardinality: 1
                    }
                }
            },
            email: {
                mask: "*{1,64}[.*{1,64}][.*{1,64}][.*{1,64}]@*{1,64}[.*{2,64}][.*{2,6}][.*{1,2}]",
                greedy: !1,
                onBeforePaste: function(t) {
                    return t = t.toLowerCase(), t.replace("mailto:", "")
                },
                definitions: {
                    "*": {
                        validator: "[0-9A-Za-z!#$%&'*+/=?^_`{|}~-]",
                        cardinality: 1,
                        casing: "lower"
                    }
                }
            }
        }), t.fn.inputmask
    }(jQuery),
    function(t) {
        return t.extend(t.inputmask.defaults.aliases, {
            numeric: {
                mask: function(t) {
                    function e(e) {
                        for (var i = "", n = 0; n < e.length; n++) i += t.definitions[e[n]] ? "\\" + e[n] : e[n];
                        return i
                    }
                    if (0 !== t.repeat && isNaN(t.integerDigits) && (t.integerDigits = t.repeat), t.repeat = 0, t.groupSeparator == t.radixPoint && (t.groupSeparator = "." == t.radixPoint ? "," : "," == t.radixPoint ? "." : ""), " " === t.groupSeparator && (t.skipOptionalPartCharacter = void 0), t.autoGroup = t.autoGroup && "" != t.groupSeparator, t.autoGroup && ("string" == typeof t.groupSize && isFinite(t.groupSize) && (t.groupSize = parseInt(t.groupSize)), isFinite(t.integerDigits))) {
                        var i = Math.floor(t.integerDigits / t.groupSize),
                            n = t.integerDigits % t.groupSize;
                        t.integerDigits = parseInt(t.integerDigits) + (0 == n ? i - 1 : i)
                    }
                    t.radixFocus = t.radixFocus && "0" == t.placeholder, t.definitions[";"] = t.definitions["~"];
                    var s = e(t.prefix);
                    return s += "[+]", s += "~{1," + t.integerDigits + "}", void 0 != t.digits && (isNaN(t.digits) || parseInt(t.digits) > 0) && (s += t.digitsOptional ? "[" + (t.decimalProtect ? ":" : t.radixPoint) + ";{" + t.digits + "}]" : (t.decimalProtect ? ":" : t.radixPoint) + ";{" + t.digits + "}"), s += e(t.suffix), s += "[-]", t.greedy = !1, s
                },
                placeholder: "",
                greedy: !1,
                digits: "*",
                digitsOptional: !0,
                groupSeparator: "",
                radixPoint: ".",
                radixFocus: !0,
                groupSize: 3,
                autoGroup: !1,
                allowPlus: !0,
                allowMinus: !0,
                negationSymbol: {
                    front: "-",
                    back: ""
                },
                integerDigits: "+",
                prefix: "",
                suffix: "",
                rightAlign: !0,
                decimalProtect: !0,
                min: void 0,
                max: void 0,
                postFormat: function(e, i, n, s) {
                    i = i >= e.length ? e.length - 1 : i < s.prefix.length ? s.prefix.length : i;
                    var o = !1,
                        a = e[i];
                    if ("" == s.groupSeparator || -1 != t.inArray(s.radixPoint, e) && i >= t.inArray(s.radixPoint, e) || new RegExp("[-+]").test(a)) return {
                        pos: i
                    };
                    var r = e.slice();
                    a == s.groupSeparator && (r.splice(i--, 1), a = r[i]), n ? r[i] = "?" : r.splice(i, 0, "?");
                    var l = r.join(""),
                        h = l;
                    if (l.length > 0 && s.autoGroup || n && -1 != l.indexOf(s.groupSeparator)) {
                        var c = t.inputmask.escapeRegex.call(this, s.groupSeparator);
                        o = 0 == l.indexOf(s.groupSeparator), l = l.replace(new RegExp(c, "g"), "");
                        var u = l.split(s.radixPoint);
                        if (l = "" == s.radixPoint ? l : u[0], l != s.prefix + "?0" && l.length >= s.groupSize + s.prefix.length)
                            for (var d = new RegExp("([-+]?[\\d?]+)([\\d?]{" + s.groupSize + "})"); d.test(l);) l = l.replace(d, "$1" + s.groupSeparator + "$2"), l = l.replace(s.groupSeparator + s.groupSeparator, s.groupSeparator);
                        "" != s.radixPoint && u.length > 1 && (l += s.radixPoint + u[1])
                    }
                    o = h != l, e.length = l.length;
                    for (var p = 0, f = l.length; f > p; p++) e[p] = l.charAt(p);
                    var m = t.inArray("?", e);
                    return n ? e[m] = a : e.splice(m, 1), {
                        pos: m,
                        refreshFromBuffer: o,
                        buffer: e
                    }
                },
                onBeforeWrite: function(e, i, n, s) {
                    if (e && "blur" == e.type) {
                        var o = i.join(""),
                            a = o.replace(s.prefix, "");
                        if (a = a.replace(s.suffix, ""), a = a.replace(new RegExp(t.inputmask.escapeRegex.call(this, s.groupSeparator), "g"), ""), a = a.replace(t.inputmask.escapeRegex.call(this, s.radixPoint), "."), isFinite(a) && isFinite(s.min) && parseFloat(a) < parseFloat(s.min)) return s.postFormat((s.prefix + s.min).split(""), 0, !0, s);
                        var r = "" != s.radixPoint ? i.join("").split(s.radixPoint) : [i.join("")],
                            l = r[0].match(s.regex.integerPart(s)),
                            h = 2 == r.length ? r[1].match(s.regex.integerNPart(s)) : void 0;
                        l && "-0" == l[0] && (void 0 == h || h[0].match(/^0+$/)) && i.splice(l.index, 1);
                        var c = t.inArray(s.radixPoint, i);
                        if (-1 != c && isFinite(s.digits) && !s.digitsOptional) {
                            for (var u = 1; u <= s.digits; u++)(void 0 == i[c + u] || i[c + u] == s.placeholder.charAt(0)) && (i[c + u] = "0");
                            return {
                                refreshFromBuffer: !0,
                                buffer: i
                            }
                        }
                    }
                    if (s.autoGroup) {
                        var d = s.postFormat(i, n - 1, !0, s);
                        return d.caret = n <= s.prefix.length ? d.pos : d.pos + 1, d
                    }
                },
                regex: {
                    integerPart: function(t) {
                        return new RegExp("[" + t.negationSymbol.front + "+]?\\d+")
                    },
                    integerNPart: function(e) {
                        return new RegExp("[\\d" + t.inputmask.escapeRegex.call(this, e.groupSeparator) + "]+")
                    }
                },
                signHandler: function(t, e, i, n, s) {
                    if (!n && s.allowMinus && "-" === t || s.allowPlus && "+" === t) {
                        var o = e.buffer.join("").match(s.regex.integerPart(s));
                        if (o && o[0].length > 0) return e.buffer[o.index] == ("-" === t ? "+" : s.negationSymbol.front) ? {
                            pos: o.index,
                            c: "-" === t ? s.negationSymbol.front : "+",
                            remove: o.index,
                            caret: i
                        } : e.buffer[o.index] == ("-" === t ? s.negationSymbol.front : "+") ? {
                            remove: o.index,
                            caret: i - 1
                        } : {
                            pos: o.index,
                            c: "-" === t ? s.negationSymbol.front : "+",
                            caret: i + 1
                        }
                    }
                    return !1
                },
                radixHandler: function(e, i, n, s, o) {
                    if (!s && e === o.radixPoint && o.digits > 0) {
                        var a = t.inArray(o.radixPoint, i.buffer),
                            r = i.buffer.join("").match(o.regex.integerPart(o));
                        if (-1 != a && i.validPositions[a]) return i.validPositions[a - 1] ? {
                            caret: a + 1
                        } : {
                            pos: r.index,
                            c: r[0],
                            caret: a + 1
                        };
                        if (!r || "0" == r[0] && r.index + 1 != n) return i.buffer[r ? r.index : n] = "0", {
                            pos: (r ? r.index : n) + 1
                        }
                    }
                    return !1
                },
                leadingZeroHandler: function(e, i, n, s, o) {
                    var a = i.buffer.join("").match(o.regex.integerNPart(o)),
                        r = t.inArray(o.radixPoint, i.buffer);
                    if (a && !s && (-1 == r || r >= n))
                        if (0 == a[0].indexOf("0")) {
                            n < o.prefix.length && (n = a.index);
                            var l = t.inArray(o.radixPoint, i._buffer),
                                h = i._buffer && i.buffer.slice(r).join("") == i._buffer.slice(l).join("") || 0 == parseInt(i.buffer.slice(r + 1).join("")),
                                c = i._buffer && i.buffer.slice(a.index, r).join("") == i._buffer.slice(o.prefix.length, l).join("") || "0" == i.buffer.slice(a.index, r).join("");
                            if (-1 == r || h && c) return i.buffer.splice(a.index, 1), n = n > a.index ? n - 1 : a.index, {
                                pos: n,
                                remove: a.index
                            };
                            if (a.index + 1 == n || "0" == e) return i.buffer.splice(a.index, 1), n = a.index, {
                                pos: n,
                                remove: a.index
                            }
                        } else if ("0" === e && n <= a.index) return !1;
                    return !0
                },
                postValidation: function(e, i) {
                    var n = !0,
                        s = e.join(""),
                        o = s.replace(i.prefix, "");
                    return o = o.replace(i.suffix, ""), o = o.replace(new RegExp(t.inputmask.escapeRegex.call(this, i.groupSeparator), "g"), ""), o = o.replace(t.inputmask.escapeRegex.call(this, i.radixPoint), "."), isFinite(o) && isFinite(i.max) && (n = parseFloat(o) <= parseFloat(i.max)), n
                },
                definitions: {
                    "~": {
                        validator: function(e, i, n, s, o) {
                            var a = o.signHandler(e, i, n, s, o);
                            if (!a && (a = o.radixHandler(e, i, n, s, o), !a && (a = s ? new RegExp("[0-9" + t.inputmask.escapeRegex.call(this, o.groupSeparator) + "]").test(e) : new RegExp("[0-9]").test(e), a === !0 && (a = o.leadingZeroHandler(e, i, n, s, o), a === !0)))) {
                                var r = t.inArray(o.radixPoint, i.buffer);
                                a = o.digitsOptional === !1 && n > r && !s ? {
                                    pos: n,
                                    remove: n
                                } : {
                                    pos: n
                                }
                            }
                            return a
                        },
                        cardinality: 1,
                        prevalidator: null
                    },
                    "+": {
                        validator: function(t, e, i, n, s) {
                            var o = s.signHandler(t, e, i, n, s);
                            return !o && (n && s.allowMinus && t === s.negationSymbol.front || s.allowMinus && "-" == t || s.allowPlus && "+" == t) && (o = !0), o
                        },
                        cardinality: 1,
                        prevalidator: null,
                        placeholder: ""
                    },
                    "-": {
                        validator: function(t, e, i, n, s) {
                            var o = s.signHandler(t, e, i, n, s);
                            return !o && n && s.allowMinus && t === s.negationSymbol.back && (o = !0), o
                        },
                        cardinality: 1,
                        prevalidator: null,
                        placeholder: ""
                    },
                    ":": {
                        validator: function(e, i, n, s, o) {
                            var a = o.signHandler(e, i, n, s, o);
                            if (!a) {
                                var r = "[" + t.inputmask.escapeRegex.call(this, o.radixPoint) + "]";
                                a = new RegExp(r).test(e), a && i.validPositions[n] && i.validPositions[n].match.placeholder == o.radixPoint && (a = {
                                    caret: n + 1
                                })
                            }
                            return a
                        },
                        cardinality: 1,
                        prevalidator: null,
                        placeholder: function(t) {
                            return t.radixPoint
                        }
                    }
                },
                insertMode: !0,
                autoUnmask: !1,
                onUnMask: function(e, i, n) {
                    var s = e.replace(n.prefix, "");
                    return s = s.replace(n.suffix, ""), s = s.replace(new RegExp(t.inputmask.escapeRegex.call(this, n.groupSeparator), "g"), "")
                },
                isComplete: function(e, i) {
                    var n = e.join(""),
                        s = e.slice();
                    if (i.postFormat(s, 0, !0, i), s.join("") != n) return !1;
                    var o = n.replace(i.prefix, "");
                    return o = o.replace(i.suffix, ""), o = o.replace(new RegExp(t.inputmask.escapeRegex.call(this, i.groupSeparator), "g"), ""), "," === i.radixPoint && (o = o.replace(t.inputmask.escapeRegex.call(this, i.radixPoint), ".")), isFinite(o)
                },
                onBeforeMask: function(e, i) {
                    if ("" != i.radixPoint && isFinite(e)) e = e.toString().replace(".", i.radixPoint);
                    else {
                        var n = e.match(/,/g),
                            s = e.match(/\./g);
                        s && n ? s.length > n.length ? (e = e.replace(/\./g, ""), e = e.replace(",", i.radixPoint)) : n.length > s.length ? (e = e.replace(/,/g, ""), e = e.replace(".", i.radixPoint)) : e = e.indexOf(".") < e.indexOf(",") ? e.replace(/\./g, "") : e = e.replace(/,/g, "") : e = e.replace(new RegExp(t.inputmask.escapeRegex.call(this, i.groupSeparator), "g"), "")
                    }
                    return 0 == i.digits && (-1 != e.indexOf(".") ? e = e.substring(0, e.indexOf(".")) : -1 != e.indexOf(",") && (e = e.substring(0, e.indexOf(",")))), e
                },
                canClearPosition: function(e, i, n, s, o) {
                    var a = e.validPositions[i].input,
                        r = a != o.radixPoint && isFinite(a) || i == n || a == o.groupSeparator || a == o.negationSymbol.front || a == o.negationSymbol.back;
                    if (r && isFinite(a)) {
                        var l = e.buffer.join("").substr(0, i).match(o.regex.integerNPart(o));
                        if (!s) {
                            var h = i + 1,
                                c = null == l || 0 == parseInt(l[0].replace(new RegExp(t.inputmask.escapeRegex.call(this, o.groupSeparator), "g"), ""));
                            if (c)
                                for (; e.validPositions[h] && (e.validPositions[h].input == o.groupSeparator || "0" == e.validPositions[h].input);) delete e.validPositions[h], h++
                        }
                        var u = [];
                        for (var d in e.validPositions) u.push(e.validPositions[d].input);
                        l = u.join("").match(o.regex.integerNPart(o));
                        var p = t.inArray(o.radixPoint, e.buffer);
                        if (l && (-1 == p || p >= i))
                            if (0 == l[0].indexOf("0")) r = l.index != i || -1 == p;
                            else {
                                var f = parseInt(l[0].replace(new RegExp(t.inputmask.escapeRegex.call(this, o.groupSeparator), "g"), "")); - 1 != p && 10 > f && "0" == o.placeholder.charAt(0) && (e.validPositions[i].input = "0", e.p = o.prefix.length + 1, r = !1)
                            }
                    }
                    return r
                }
            },
            currency: {
                prefix: "$ ",
                groupSeparator: ",",
                alias: "numeric",
                placeholder: "0",
                autoGroup: !0,
                digits: 2,
                digitsOptional: !1,
                clearMaskOnLostFocus: !1
            },
            decimal: {
                alias: "numeric"
            },
            integer: {
                alias: "numeric",
                digits: "0",
                radixPoint: ""
            }
        }), t.fn.inputmask
    }(jQuery),
    function(t) {
        return t.extend(t.inputmask.defaults.aliases, {
            phone: {
                url: "phone-codes/phone-codes.js",
                maskInit: "+pp(pp)pppppppp",
                countrycode: "",
                mask: function(e) {
                    e.definitions = {
                        p: {
                            validator: function() {
                                return !1
                            },
                            cardinality: 1
                        },
                        "#": {
                            validator: "[0-9]",
                            cardinality: 1
                        }
                    };
                    var i = [];
                    return t.ajax({
                        url: e.url,
                        async: !1,
                        dataType: "json",
                        success: function(t) {
                            i = t
                        },
                        error: function(t, i, n) {
                            alert(n + " - " + e.url)
                        }
                    }), i = i.sort(function(t, e) {
                        return (t.mask || t) < (e.mask || e) ? -1 : 1
                    }), "" != e.countrycode && (e.maskInit = "+" + e.countrycode + e.maskInit.substring(3)), i.splice(0, 0, e.maskInit), i
                },
                nojumps: !0,
                nojumpsThreshold: 1,
                onBeforeMask: function(t, e) {
                    var i = t.replace(/^0/g, "");
                    return (i.indexOf(e.countrycode) > 1 || -1 == i.indexOf(e.countrycode)) && (i = "+" + e.countrycode + i), i
                }
            },
            phonebe: {
                alias: "phone",
                url: "phone-codes/phone-be.js",
                countrycode: "32",
                nojumpsThreshold: 4
            }
        }), t.fn.inputmask
    }(jQuery),
    function(t) {
        return t.extend(t.inputmask.defaults.aliases, {
            Regex: {
                mask: "r",
                greedy: !1,
                repeat: "*",
                regex: null,
                regexTokens: null,
                tokenizer: /\[\^?]?(?:[^\\\]]+|\\[\S\s]?)*]?|\\(?:0(?:[0-3][0-7]{0,2}|[4-7][0-7]?)?|[1-9][0-9]*|x[0-9A-Fa-f]{2}|u[0-9A-Fa-f]{4}|c[A-Za-z]|[\S\s]?)|\((?:\?[:=!]?)?|(?:[?*+]|\{[0-9]+(?:,[0-9]*)?\})\??|[^.?*+^${[()|\\]+|./g,
                quantifierFilter: /[0-9]+[^,]/,
                isComplete: function(t, e) {
                    return new RegExp(e.regex).test(t.join(""))
                },
                definitions: {
                    r: {
                        validator: function(e, i, n, s, o) {
                            function a(t, e) {
                                this.matches = [], this.isGroup = t || !1, this.isQuantifier = e || !1, this.quantifier = {
                                    min: 1,
                                    max: 1
                                }, this.repeaterPart = void 0
                            }

                            function r() {
                                var t, e, i = new a,
                                    n = [];
                                for (o.regexTokens = []; t = o.tokenizer.exec(o.regex);) switch (e = t[0], e.charAt(0)) {
                                    case "(":
                                        n.push(new a(!0));
                                        break;
                                    case ")":
                                        var s = n.pop();
                                        n.length > 0 ? n[n.length - 1].matches.push(s) : i.matches.push(s);
                                        break;
                                    case "{":
                                    case "+":
                                    case "*":
                                        var r = new a(!1, !0);
                                        e = e.replace(/[{}]/g, "");
                                        var l = e.split(","),
                                            h = isNaN(l[0]) ? l[0] : parseInt(l[0]),
                                            c = 1 == l.length ? h : isNaN(l[1]) ? l[1] : parseInt(l[1]);
                                        if (r.quantifier = {
                                            min: h,
                                            max: c
                                        }, n.length > 0) {
                                            var u = n[n.length - 1].matches;
                                            if (t = u.pop(), !t.isGroup) {
                                                var s = new a(!0);
                                                s.matches.push(t), t = s
                                            }
                                            u.push(t), u.push(r)
                                        } else {
                                            if (t = i.matches.pop(), !t.isGroup) {
                                                var s = new a(!0);
                                                s.matches.push(t), t = s
                                            }
                                            i.matches.push(t), i.matches.push(r)
                                        }
                                        break;
                                    default:
                                        n.length > 0 ? n[n.length - 1].matches.push(e) : i.matches.push(e)
                                }
                                i.matches.length > 0 && o.regexTokens.push(i)
                            }

                            function l(e, i) {
                                var n = !1;
                                i && (c += "(", d++);
                                for (var s = 0; s < e.matches.length; s++) {
                                    var o = e.matches[s];
                                    if (1 == o.isGroup) n = l(o, !0);
                                    else if (1 == o.isQuantifier) {
                                        var a = t.inArray(o, e.matches),
                                            r = e.matches[a - 1],
                                            h = c;
                                        if (isNaN(o.quantifier.max)) {
                                            for (; o.repeaterPart && o.repeaterPart != c && o.repeaterPart.length > c.length && !(n = l(r, !0)););
                                            n = n || l(r, !0), n && (o.repeaterPart = c), c = h + o.quantifier.max
                                        } else {
                                            for (var u = 0, f = o.quantifier.max - 1; f > u && !(n = l(r, !0)); u++);
                                            c = h + "{" + o.quantifier.min + "," + o.quantifier.max + "}"
                                        }
                                    } else if (void 0 != o.matches)
                                        for (var m = 0; m < o.length && !(n = l(o[m], i)); m++);
                                    else {
                                        var g;
                                        if ("[" == o.charAt(0)) {
                                            g = c, g += o;
                                            for (var v = 0; d > v; v++) g += ")";
                                            var b = new RegExp("^(" + g + ")$");
                                            n = b.test(p)
                                        } else
                                            for (var y = 0, _ = o.length; _ > y; y++)
                                                if ("\\" != o.charAt(y)) {
                                                    g = c, g += o.substr(0, y + 1), g = g.replace(/\|$/, "");
                                                    for (var v = 0; d > v; v++) g += ")";
                                                    var b = new RegExp("^(" + g + ")$");
                                                    if (n = b.test(p)) break
                                                }
                                        c += o
                                    }
                                    if (n) break
                                }
                                return i && (c += ")", d--), n
                            }
                            null == o.regexTokens && r();
                            var h = i.buffer.slice(),
                                c = "",
                                u = !1,
                                d = 0;
                            h.splice(n, 0, e);
                            for (var p = h.join(""), f = 0; f < o.regexTokens.length; f++) {
                                var a = o.regexTokens[f];
                                if (u = l(a, a.isGroup)) break
                            }
                            return u
                        },
                        cardinality: 1
                    }
                }
            }
        }), t.fn.inputmask
    }(jQuery), define("jquery.inputmask", function() {}), define("view/note/partial/cost/CostView", ["jquery", "service/currencyService", "service/categoryService", "jquery.inputmask"], function(t, e, i, n) {
    function s(t) {
        t && (this.cost = t.costModel)
    }
    return s.prototype.getCostHtml = function() {
        var t, n = i.getCostTypeList(),
            s = e.getCurrencies(),
            o = this.cost,
            a = "";
        for (a += '<div class="write-budget write-option">', a += '<div class="budget-wrap">', a += '<div class="select">', a += '<select class="selected-usage">', t = 0; t < n.length; t++) a += parseInt(n[t].value) === parseInt(o.moneyUsage) ? '<option value="' + n[t].value + '" selected="selected">' + n[t].name + "</option>" : '<option value="' + n[t].value + '">' + n[t].name + "</option>";
        for (a += "</select>", a += "</div>", a += '<div class="details"><input type="text" class="input-detail-text" value="' + (o.detail || "") + '" placeholder="' + g_localizedString._InputMemo_ + '"/></div>', a += '<div class="select pay">', a += '<select class="selected-currency">', t = 0; t < s.length; t++) a += parseInt(s[t].value) === parseInt(o.moneyType) ? '<option value="' + s[t].value + '" selected="selected">' + s[t].name + "</option>" : '<option value="' + s[t].value + '">' + s[t].name + "</option>";
        return a += "</select>", a += "</div>", a += '<div class="details pay"><input type="text" class="input-money-text" value="' + (o.money || 0) + '" maxlength="13" /></div>', a += '<a class="btn-delete"><img class="delete-budget" src="/images/btn-note-delete.png" alt=""/></a>', a += "</div>", a += "</div>"
    }, s.prototype.draw = function(e) {
        e && e.parentId ? (this.parentId = e.parentId, this.parentElement = t("#" + this.parentId)) : e && e.parentElement && (this.parentElement = e.parentElement), this.element = t(this.getCostHtml()), this.parentElement.append(this.element), this.getMoneyInput().unbind("inputmask").inputmask({
            alias: "numeric",
            autoGroup: !0,
            groupSeparator: ",",
            groupSize: 3,
            placeholder: "0",
            allowPlus: !1,
            allowMinus: !1
        })
    }, s.prototype.bindHandlers = function(t) {
        var e = this;
        t.clickDeleteButton && this.element.find(".btn-delete").click(function() {
            e.remove(), e.checkAndHideDelButton(), t.clickDeleteButton()
        })
    }, s.prototype.checkAndHideDelButton = function() {
        0 === this.parentElement.find(".write-budget").length && this.parentElement.parent().find(".del-budget").removeClass("hide")
    }, s.prototype.getMoneyInput = function() {
        return this.element.find(".input-money-text")
    }, s.prototype.getFinalInputData = function() {
        var t;
        return t = this.parentElement ? {
            moneyUsage: parseInt(this.element.find(".selected-usage").val()),
            detail: this.element.find(".input-detail-text").val(),
            money: parseFloat(parseFloat(this.getMoneyInput().inputmask("remove").val()).toFixed(2)),
            moneyType: parseInt(this.element.find(".selected-currency").val())
        } : {
            moneyUsage: this.cost.getMoneyUsage(),
            detail: this.cost.getDetail(),
            money: this.cost.getMoney(),
            moneyType: this.cost.getMoneyType()
        }
    }, s.prototype.remove = function() {
        this.element && this.element.remove()
    }, s.prototype.destroy = function() {
        this.remove(), delete this.element, delete this.parentElement
    }, s
}), define("controller/note/partial/cost/CostController", ["wishbeen/dispatch", "model/cost/Cost", "view/note/partial/cost/CostView"], function(t, e, i) {
    function n(t) {
        t && (this.costs = t.costsModel, this.cost = new e(t.cost), this.view = new i({
            costModel: this.cost
        }))
    }
    return n.prototype.init = function(t) {
        this.parentElement = t.parentElement, this.view.draw({
            parentElement: this.parentElement
        }), this.bindHandlers()
    }, n.prototype.bindHandlers = function() {
        var t = this;
        this.view.bindHandlers({
            clickDeleteButton: function() {
                t.costs.deleteCost(t.cost)
            }
        })
    }, n.prototype.getCostModel = function() {
        return this.cost
    }, n.prototype.remove = function() {
        this.view && this.view.remove()
    }, n.prototype.destroy = function() {
        this.view && this.view.destroy()
    }, n.prototype.draw = function(t) {
        this.view && this.view.draw()
    }, n.prototype.getFinalData = function() {
        var t = this.view.getFinalInputData();
        return t.money || t.detail || (t = null), t
    }, n
}), define("controller/note/partial/cost/CostsController", ["jquery", "wishbeen/dispatch", "model/cost/Costs", "view/note/partial/cost/CostsView", "controller/note/partial/cost/CostController"], function(t, e, i, n, s) {
    function o(e) {
        if (e) {
            var s = t.extend(!0, [], e.noteModel.getCosts());
            this.costs = new i(s)
        }
        "undefined" != typeof e.moneyUsage ? this.tmpMoneyUsage = e.moneyUsage : this.tmpMoneyUsage = 7, this.initCosts(this.costs.costs), this.view = new n({
            moneyUsage: this.tmpMoneyUsage
        })
    }
    return o.prototype.init = function(t) {
        t.parentId && this.view.draw(t), this.initCostControllers(), this.bindHandlers(), this.view.checkAndHideDelButton()
    }, o.prototype.bindHandlers = function() {
        var t = this;
        this.view.bindHandlers({
            clickAddButton: function(e) {
                t.addCostItem(e), t.view.clearDetailAndMoney(), t.view.checkAndHideDelButton()
            },
            clickDeleteButton: function() {
                t.costs.reset()
            }
        })
    }, o.prototype.initCosts = function(t) {
        if (t && 0 !== t.length) {
            this.costs.reset();
            for (var e = 0; e < t.length; e++) {
                var i = t[e],
                    n = this.createCostController(i);
                this.costs.insertCost(n)
            }
        }
    }, o.prototype.initCostControllers = function() {
        for (var t = this.view.getParentElementOfCosts(), e = 0; e < this.costs.getLength(); e++) {
            var i = this.costs.getCost(e),
                n = i.getController();
            n.init({
                parentElement: t
            })
        }
    }, o.prototype.addCostItem = function(t) {
        var e = this.createCostController(t),
            i = e.getController();
        i.init({
            parentElement: this.view.getParentElementOfCosts()
        }), this.costs.insertCost(e)
    }, o.prototype.createCostController = function(t) {
        if (t) {
            var e = new s({
                    costsModel: this.costs,
                    cost: t
                }),
                i = e.getCostModel();
            return i.setController(e), i
        }
    }, o.prototype.deleteCost = function(t) {
        this.costs.deleteCost(t)
    }, o.prototype.getCosts = function() {
        return this.costs
    }, o.prototype.getFinalCosts = function() {
        for (var t, e, i = [], n = 0; n < this.costs.getLength(); n++) t = this.costs.getCost(n).getController().getFinalData(), t && i.push(t);
        return e = this.view.getLastCostInput(), (e.money > 0 || e.detail) && i.push(e), i
    }, o.prototype.destroy = function() {}, o
}),
    function(t, e) {
        function i() {
            if (!(2 > arguments.length)) {
                for (var t = arguments[0], e = 1, i = arguments.length; i > e; e++) {
                    var n = arguments[e];
                    for (var s in n) n.hasOwnProperty(s) && (t[s] = n[s])
                }
                return t
            }
        }

        function n(t) {
            return Array.isArray ? Array.isArray(t) : "[object Array]" === Object.prototype.toString.call(t)
        }

        function s(t, e) {
            var i = "a" === t.tagName.toLowerCase() ? t.parentNode : t,
                n = e.elements.indexOf(i);
            e.elements.splice(n, 1), e.values.splice(n, 1)
        }

        function o(t, e, i) {
            t.addEventListener ? t.addEventListener(e, i, !1) : t.attachEvent ? t.attachEvent("on" + e, i) : t["on" + e] = i
        }

        function a(t) {
            return t.replace(/^\s+|\s+$/g, "")
        }

        function r(e, i) {
            t.attachEvent && !t.addEventListener ? e.innerText = i : e.textContent = i
        }
        var l = {
                additionalTagClasses: "",
                allowDuplicates: !1,
                duplicateTagClass: "",
                containerFocusClass: "active",
                hiddenInputName: "taggles[]",
                tags: [],
                allowedTags: [],
                tabIndex: 1,
                placeholder: "Enter tags...",
                onTagAdd: function() {},
                onTagRemove: function() {}
            },
            h = 8,
            c = 188,
            u = 9,
            d = 13,
            p = function(p, f) {
                function m() {
                    g(), v(), b()
                }

                function g() {
                    var e, i, n;
                    L.container.rect = O.getBoundingClientRect(), L.container.style = t.getComputedStyle(O), e = L.container.style, i = parseInt(e["padding-left"] || e.paddingLeft, 10), n = parseInt(e["padding-right"] || e.paddingRight, 10), L.container.padding = i + n
                }

                function v() {
                    var e;
                    if (z.className = "taggle_list", j.type = "text", j.className = "taggle_input", j.tabIndex = F.tabIndex, U.className = "taggle_sizer", F.tags.length)
                        for (var i = 0, n = F.tags.length; n > i; i++) {
                            var s = M(F.tags[i]);
                            z.appendChild(s)
                        }
                    H && (H.style.opacity = 0, H.classList.add("taggle_placeholder"), O.appendChild(H), r(H, F.placeholder), F.tags.length || (H.style.opacity = 1)), W.appendChild(j), z.appendChild(W), O.appendChild(z), O.appendChild(U), e = t.getComputedStyle(j).fontSize, U.style.fontSize = e
                }

                function b() {
                    o(O, "click", function() {
                        j.focus()
                    }), j.onfocus = T, j.onblur = S, o(j, "keydown", D), o(j, "keyup", A)
                }

                function y() {
                    var t, e, i, n, s;
                    C(), e = j.getBoundingClientRect(), i = L.container.rect, t = ~~i.width, t || (t = ~~i.right - ~~i.left), n = ~~e.left - ~~i.left, s = L.container.padding, C(t - n - s)
                }

                function _(t) {
                    return t ? !F.allowDuplicates && x(t) ? !1 : F.allowedTags.length && -1 === F.allowedTags.indexOf(t) ? !1 : !0 : !1
                }

                function w(t, e) {
                    var i, n, s, o = "string" == typeof e ? e.toLowerCase() : a(j.value.toLowerCase());
                    _(o) && (i = M(o), n = z.querySelectorAll("li"), s = n[n.length - 1], z.insertBefore(i, s), F.onTagAdd(t, o), j.value = "", C(), y(), T())
                }

                function k(e) {
                    e = e || t.event;
                    var i = O.querySelectorAll(".taggle"),
                        n = i[i.length - 1],
                        s = "taggle_hot",
                        o = j.classList.contains("taggle_back");
                    "" !== j.value || e.keyCode !== h || o ? n.classList.contains(s) && n.classList.remove(s) : n.classList.contains(s) ? (j.classList.add("taggle_back"), N(n, e), y(), T()) : n.classList.add(s)
                }

                function C(t) {
                    j.style.width = (t || 10) + "px"
                }

                function x(t) {
                    var e, i = R.values.indexOf(t),
                        n = O.querySelector(".taggle_list");
                    if (F.duplicateTagClass) {
                        e = n.querySelectorAll("." + F.duplicateTagClass);
                        for (var s = 0, o = e.length; o > s; s++) e[s].classList.remove(F.duplicateTagClass)
                    }
                    return i > -1 ? (F.duplicateTagClass && n.childNodes[i].classList.add(F.duplicateTagClass), !0) : !1
                }

                function E(t) {
                    var e = !1;
                    return (t === c || t === u || t === d) && (e = !0), e
                }

                function T() {
                    y(), O.classList.contains(F.containerFocusClass) || O.classList.add(F.containerFocusClass), H && (H.style.opacity = 0)
                }

                function S() {
                    j.value = "", C(), O.classList.contains(F.containerFocusClass) && O.classList.remove(F.containerFocusClass), !R.values.length && H && (H.style.opacity = 1)
                }

                function D(e) {
                    e = e || t.event;
                    var i = e.keyCode;
                    return I(), E(i) && "" !== j.value ? void P(e) : void(R.values.length && k(e))
                }

                function A(e) {
                    e = e || t.event, j.classList.remove("taggle_back"), r(U, j.value)
                }

                function P(e) {
                    e = e || t.event, w(e), e.preventDefault ? e.preventDefault() : e.returnValue = !1
                }

                function I() {
                    var t = U.getBoundingClientRect().width,
                        e = L.container.rect.width - L.container.padding,
                        i = parseInt(U.style.fontSize, 10);
                    t + 1.5 * i > parseInt(j.style.width, 10) && (j.style.width = e + "px")
                }

                function M(t) {
                    var i = e.createElement("li"),
                        n = e.createElement("a"),
                        s = e.createElement("input"),
                        o = e.createElement("span");
                    return t = t.toLowerCase(), n.href = "javascript:void(0)", n.innerHTML = "&times;", n.className = "close", n.onclick = N.bind(null, n), r(o, t), o.className = "taggle_text", i.className = "taggle " + F.additionalTagClasses, s.type = "hidden", s.value = t, s.name = F.hiddenInputName, i.appendChild(o), i.appendChild(n), i.appendChild(s), R.values.push(t), R.elements.push(i), i
                }

                function N(t, e) {
                    var i, n;
                    "li" !== t.tagName.toLowerCase() && (t = t.parentNode), i = t.querySelector(".taggle_text"), n = i.innerText || i.textContent, F.onTagRemove(e, n), t.parentNode.removeChild(t), s(t, R), T()
                }
                var H, B = this,
                    F = i({}, l, f),
                    L = {
                        container: {
                            rect: null,
                            style: null,
                            padding: null
                        }
                    },
                    O = p,
                    R = {
                        values: [],
                        elements: []
                    },
                    z = e.createElement("ul"),
                    W = e.createElement("li"),
                    j = e.createElement("input"),
                    U = e.createElement("div");
                F.placeholder && (H = e.createElement("span")), "string" == typeof p && (O = e.getElementById(p)), B.getTags = function() {
                    return R
                }, B.getTagElements = function() {
                    return R.elements
                }, B.getTagValues = function() {
                    return R.values
                }, B.getInput = function() {
                    return j
                }, B.getContainer = function() {
                    return O
                }, B.add = function(t) {
                    var e = n(t);
                    if ("string" == typeof t) return w(null, t);
                    if (e)
                        for (var i = 0, s = t.length; s > i; i++) "string" == typeof t[i] && w(null, t[i]);
                    return B
                }, B.remove = function(t, e) {
                    for (var i = R.values.length - 1, n = !1; i > -1 && (R.values[i] === t && (n = !0, N(R.elements[i])), !n || e);) i--;
                    return B
                }, m()
            };
        t.Taggle = p
    }(window, document), define("taggle", function() {}), define("view/note/partial/NoteTagView", ["jquery"], function(t) {
    function e(t) {
        t && t.noteModel && (this.noteModel = t.noteModel)
    }
    return e.prototype.getHtml = function() {
        var t = '<div id="note-recommend-tags" class="auto-list hide"><div class="recommend-box"></div><span class="icon-tag-arrow"><img src="/images/icon-tag-arrow.png" alt=""/></span></div><div id="note-taggle" class="note-taggle input clearfix textarea"></div><a class="btn-delete btn-tag-delete"><img src="/images/btn-note-delete.png" alt=""/></a>';
        return t
    }, e.prototype.draw = function(e) {
        var i = this;
        e.parentId ? (this.parentId = e.parentId, this.parentElement = t("#" + this.parentId)) : e.parentElement && (this.parentElement = e.parentElement), this.tags = e.tags ? e.tags : [];
        var n = this.getHtml();
        this.element = t(n), this.parentElement.append(this.element), this.parentElement.removeClass("hide"), this.Taggle = new Taggle("note-taggle", {
            tags: this.tags,
            duplicateTagClass: "bounce",
            placeholder: g_localizedString._Tags_,
            submitKeys: [188, 9, 13, 32]
        }), t(this.Taggle.getInput()).autocomplete({
            source: [],
            appendTo: i.Taggle.getContainer(),
            position: {
                at: "left bottom",
                of: i.Taggle.getContainer()
            },
            select: function(t, e) {
                t.preventDefault(), 1 === t.which && i.Taggle.add(e.item.value)
            }
        })
    }, e.prototype.bindHandlers = function(e) {
        var i = this;
        e.clickTagDelete && this.element.parent().find(".btn-tag-delete").click(function() {
            return i.element.remove(), t("#" + i.parentId).addClass("hide"), t("#note-tag-button").removeClass("active"), e.clickTagDelete(), !1
        }), e.focusTagText && (this.element.find(".taggle_input").focus(function() {
            var e = t(this).val(),
                n = i.Taggle.getTags().values.length;
            e || 0 !== n || i.showRecommendTags()
        }), this.element.find(".taggle_input").blur(function(t) {
            i.hideRecommendTags()
        })), e.inputTagText && this.element.find(".taggle_input").keyup(function(n) {
            var s = t(this).val(),
                o = i.Taggle.getTags().values.length;
            s && (i.hideRecommendTags(), e.inputTagText(s)), s || 0 !== o || i.showRecommendTags()
        })
    }, e.prototype.bindTagsHandlers = function(e) {
        var i = this;
        e.clickRecommendTag && this.element.parent().find("#note-recommend-tags .recommend-box span").mousedown(function() {
            i.Taggle.add(t(this).text())
        })
    }, e.prototype.setRecommendTags = function(t) {
        for (var e = this.element.parent().find("#note-recommend-tags .recommend-box"), i = "", n = 0; n < t.length; n++) i += "<span>" + t[n].text + "</span>";
        e.empty(), e.append(i)
    }, e.prototype.setAutoCompleteText = function(e) {
        t(this.Taggle.getInput()).autocomplete("option", "source", e)
    }, e.prototype.showRecommendTags = function() {
        this.element.parent().find("#note-recommend-tags").removeClass("hide")
    }, e.prototype.hideRecommendTags = function() {
        this.element.parent().find("#note-recommend-tags").addClass("hide")
    }, e.prototype.getTags = function() {
        return this.Taggle ? this.Taggle.getTags().values : []
    }, e.prototype.destroy = function() {
        delete this.Taggle
    }, e
}), define("controller/note/partial/NoteTagController", ["jquery", "taggle", "view/note/partial/NoteTagView", "service/autoCompleteService"], function(t, e, i, n) {
    function s(e) {
        this.tmpTags = null, e && e.noteModel && (this.noteModel = e.noteModel, this.tmpTags = t.extend(!0, [], this.noteModel.getTags())), this.view = new i(e)
    }
    return s.prototype.init = function(t) {
        0,
            t.tags = this.tmpTags,
            this.view.draw(t),
            this.bindHandlers()
    }, s.prototype.bindHandlers = function() {
        var t = this;
        this.view.bindHandlers({
            clickTagDelete: function() {
                t.tamTags = null
            },
            focusTagText: function() {},
            inputTagText: function(e) {
                n.getTags(e, function(e, i) {
                    t.view.setAutoCompleteText(i)
                })
            }
        })
    }, s.prototype.bindTagsHandlers = function() {
        this.view.bindTagsHandlers({
            clickRecommendTag: function(t) {}
        })
    }, s.prototype.getTags = function() {
        return this.view.getTags()
    }, s.prototype.setRecommendTags = function(t) {
        return this.view.setRecommendTags(t)
    }, s.prototype.destroy = function() {
        this.view.destroy()
    }, s
}), define("service/NoteService", ["wishbeen/httpUtil", "underscore"], function(t, e) {
    function i() {}
    var n = [{
        value: 2,
        name: "Memo"
    }, {
        value: 1,
        name: "Information"
    }, {
        value: 3,
        name: "Journal"
    }, {
        value: 4,
        name: "Reviews"
    }, {
        value: 0,
        name: "Talk"
    }, {
        value: 5,
        name: "Ask"
    }];
    return i.getNoteTypeValueByName = function(t) {
        var i = e.find(n, function(e) {
            return e.name == t
        });
        return i.value
    }, i.getNoteTypeNameByValue = function(t) {
        var i = e.find(n, function(e) {
            return e.value == t
        });
        return i.name
    }, i.getIsTourAfterTypeValue = function(t) {
        return t ? 3 : 2
    }, i.getNotes = function(e, i) {
        t.get("/v2.5/ajax/search/notes", e, function(t, e) {
            i(t, e)
        })
    }, i.saveNote = function(e, i) {
        t.post("/v2.5/ajax/note", e, function(t, e) {
            i(t, e)
        })
    }, i.updateNote = function(e, i, n) {
        t.put("/v2.5/ajax/note/" + e.id, i, function(t, e) {
            n(t, e)
        })
    }, i.deleteNote = function(e, i) {
        t["delete"]("/v2.5/ajax/note/" + e.id, function(t, e) {
            i(t, e)
        })
    }, i.likeNote = function(e, i) {
        var n = e.id,
            s = e.like;
        t.put("/v2.5/ajax/note/" + n + "/like", {
            like: s
        }, function(t, e) {
            i(t, e)
        })
    }, i
}), define("service/TagService", ["wishbeen/httpUtil"], function(t) {
    function e() {}
    return e.getRecommendTags = function(e, i) {
        t.get("/v2.5/ajax/search/tags/recommend", e, function(t, e) {
            i(t, e)
        })
    }, e
}), define("../controller/note/NoteEditController", ["jquery", "underscore", "wishbeen/dispatch", "model/note/Note", "view/note/NoteEditView", "view/note/partial/EditorView", "controller/modalController", "controller/note/partial/EditorController", "controller/note/partial/NoteLocationController", "controller/note/partial/cost/CostsController", "controller/note/partial/NoteTagController", "service/categoryService", "service/NoteService", "service/TagService"], function(t, e, i, n, s, o, a, r, l, h, c, u, d, p) {
    function f() {
        this.editor = null, this.editorCtrl = null, this.noteLocationCtrl = null, this.costsCtrl = null, this.noteTagCtrl = null
    }
    return f.prototype.init = function(t) {
        this.spotModel = t.spotModel, this.noteModel = t.noteModel, this.insertCallback = t.insert, this.updateCallback = t.update, this.closeCallback = t.close, this.view = new s(t), this.tmpNoteType = 99 !== this.noteModel.getType() ? this.noteModel.getType() : 0, this.isSaving = !1, this.view.titleDraw(), u.setSpotCategoryToMoneyUsage(g_data.noteEditData.spotCategoryToMoneyUsage), this.editorCtrl = new r({
            noteModel: this.noteModel,
            view: new o({
                noteModel: this.noteModel
            })
        }), this.editorCtrl.init({
            parentId: this.view.getEditorParentId(),
            contentHtml: this.view.getContentHtml()
        }), this.noteLocationCtrl = new l({
            spotModel: this.spotModel,
            noteModel: this.noteModel
        }), this.costsCtrl = new h({
            noteModel: this.noteModel,
            moneyUsage: this.spotModel ? u.getSpotCategoryToMoneyUsage(this.spotModel.getCategory()) : 7
        }), this.noteTagCtrl = new c({
            noteModel: this.noteModel
        }), this.bindHandlers(), this.initNoteData = this.makeFinalNoteData(), (this.noteModel.getWroteAtSpot() || this.spotModel) && this.view.triggerNoteLocationButton(), this.noteModel.getCosts() && this.noteModel.getCosts().length > 0 && this.view.triggerNoteBudgetButton(), this.noteModel.getTags() && this.noteModel.getTags().length > 0 && this.view.triggerNoteTagButton()
    }, f.prototype.bindHandlers = function() {
        var t = this;
        this.view.bindHandlers({
            changeNoteType: function(e) {
                t.tmpNoteType = e, t.view.isHideNoteTagParent() || p.getRecommendTags({
                    type: t.tmpNoteType
                }, function(e, i) {
                    return e ? void alert(e) : (t.noteTagCtrl.setRecommendTags(i), void t.noteTagCtrl.bindTagsHandlers())
                }), WebTrackingSendEvent("writePost", "setCategory", e)
            },
            clickNoteLocationButton: function() {
                t.view.isHideNoteLocationParent() && t.noteLocationCtrl.init({
                    parentId: t.view.getNoteLocationParentId()
                })
            },
            clickNoteBudgetButton: function() {
                t.view.isHideNoteBudgetParent() && t.costsCtrl.init({
                    parentId: t.view.getNoteBudgetParentId()
                })
            },
            clickNoteTagButton: function() {
                t.view.isHideNoteTagParent() && (t.noteTagCtrl.init({
                    parentId: t.view.getNoteTagParentId()
                }), p.getRecommendTags({
                    type: t.tmpNoteType
                }, function(e, i) {
                    return e ? void alert(e) : (t.noteTagCtrl.setRecommendTags(i), void t.noteTagCtrl.bindTagsHandlers())
                }))
            },
            clickNoteSaveButton: function() {
                var e = t.makeFinalNoteData();
                t.validateData(e) && !t.isSaving && (t.isSaving = !0, e._id ? t.updateCallback && t.updateCallback(e) : t.insertCallback && t.insertCallback(e), a.close("#note-edit-modal"), setTimeout(function() {
                    t.isSaving = !1
                }, 500))
            },
            clickNoteCancelButton: function() {
                var i = t.makeFinalNoteData();
                e.isEqual(t.initNoteData, i) ? a.close("#note-edit-modal") : require(["controller/confirmModalController"], function(t) {
                    var e = {
                        message: g_localizedString._NoteEditConfirm_
                    };
                    t.open(e, function(t) {
                        0 === t && a.close("#note-edit-modal")
                    })
                })
            }
        })
    }, f.prototype.validateData = function(t) {
        return t.title || 0 !== t.content.length || t.costs && 0 !== t.costs.length ? this.editorCtrl.validateContent() ? !0 : !1 : (alert(g_localizedString._PostEmptyError_), !1)
    }, f.prototype.makeFinalNoteData = function() {
        var t = {};
        for (var e in this.noteModel) t[e] = this.noteModel[e];
        return t.type = this.tmpNoteType, t.content = this.editorCtrl.getContent(), t.title = this.view.getNoteTitleValue(), this.view.isHideNoteBudgetParent() ? t.costs = this.costsCtrl.getCosts().costs.length > 0 ? this.costsCtrl.getCosts() : [] : t.costs = this.costsCtrl.getFinalCosts(), !this.view.isHideNoteTagParent() && this.noteTagCtrl.getTags() ? t.tags = this.noteTagCtrl.getTags() : t.tags = [], this.view.isHideNoteLocationParent() && this.noteModel.getWroteAtSpot() ? t.wroteAtSpot = this.noteModel.getWroteAtSpot() : this.noteLocationCtrl.getWroteAtSpot() && this.noteLocationCtrl.getWroteAtSpot()._id ? t.wroteAtSpot = {
            _id: this.noteLocationCtrl.getWroteAtSpot()._id,
            name: this.noteLocationCtrl.getWroteAtSpot().name
        } : !t.wroteAtSpot && this.spotModel && (t.wroteAtSpot = {
            _id: this.spotModel.getId(),
            name: this.spotModel.getName()
        }), t
    }, f.prototype.destroy = function() {
        this.closeCallback && this.closeCallback(), this.editorCtrl.destroy(), this.noteLocationCtrl.destroy(), this.costsCtrl.destroy(), this.noteTagCtrl.destroy(), t(".medium-editor-anchor-preview").remove(), t(".medium-editor-toolbar").remove(), a.remove("#note-edit-modal")
    }, new f
}), define("controller/note/NoteEditController", ["jquery", "underscore", "wishbeen/dispatch", "model/note/Note", "view/note/NoteEditView", "view/note/partial/EditorView", "controller/modalController", "controller/note/partial/EditorController", "controller/note/partial/NoteLocationController", "controller/note/partial/cost/CostsController", "controller/note/partial/NoteTagController", "service/categoryService", "service/NoteService", "service/TagService"], function(t, e, i, n, s, o, a, r, l, h, c, u, d, p) {
    function f() {
        this.editor = null, this.editorCtrl = null, this.noteLocationCtrl = null, this.costsCtrl = null, this.noteTagCtrl = null
    }
    return f.prototype.init = function(t) {
        this.spotModel = t.spotModel, this.noteModel = t.noteModel, this.insertCallback = t.insert, this.updateCallback = t.update, this.closeCallback = t.close, this.view = new s(t), this.tmpNoteType = 99 !== this.noteModel.getType() ? this.noteModel.getType() : 0, this.isSaving = !1, this.view.titleDraw(), u.setSpotCategoryToMoneyUsage(g_data.noteEditData.spotCategoryToMoneyUsage), this.editorCtrl = new r({
            noteModel: this.noteModel,
            view: new o({
                noteModel: this.noteModel
            })
        }), this.editorCtrl.init({
            parentId: this.view.getEditorParentId(),
            contentHtml: this.view.getContentHtml()
        }), this.noteLocationCtrl = new l({
            spotModel: this.spotModel,
            noteModel: this.noteModel
        }), this.costsCtrl = new h({
            noteModel: this.noteModel,
            moneyUsage: this.spotModel ? u.getSpotCategoryToMoneyUsage(this.spotModel.getCategory()) : 7
        }), this.noteTagCtrl = new c({
            noteModel: this.noteModel
        }), this.bindHandlers(), this.initNoteData = this.makeFinalNoteData(), (this.noteModel.getWroteAtSpot() || this.spotModel) && this.view.triggerNoteLocationButton(), this.noteModel.getCosts() && this.noteModel.getCosts().length > 0 && this.view.triggerNoteBudgetButton(), this.noteModel.getTags() && this.noteModel.getTags().length > 0 && this.view.triggerNoteTagButton()
    }, f.prototype.bindHandlers = function() {
        var t = this;
        this.view.bindHandlers({
            changeNoteType: function(e) {
                t.tmpNoteType = e, t.view.isHideNoteTagParent() || p.getRecommendTags({
                    type: t.tmpNoteType
                }, function(e, i) {
                    return e ? void alert(e) : (t.noteTagCtrl.setRecommendTags(i), void t.noteTagCtrl.bindTagsHandlers())
                }), WebTrackingSendEvent("writePost", "setCategory", e)
            },
            clickNoteLocationButton: function() {
                t.view.isHideNoteLocationParent() && t.noteLocationCtrl.init({
                    parentId: t.view.getNoteLocationParentId()
                })
            },
            clickNoteBudgetButton: function() {
                t.view.isHideNoteBudgetParent() && t.costsCtrl.init({
                    parentId: t.view.getNoteBudgetParentId()
                })
            },
            clickNoteTagButton: function() {
                t.view.isHideNoteTagParent() && (t.noteTagCtrl.init({
                    parentId: t.view.getNoteTagParentId()
                }), p.getRecommendTags({
                    type: t.tmpNoteType
                }, function(e, i) {
                    return e ? void alert(e) : (t.noteTagCtrl.setRecommendTags(i), void t.noteTagCtrl.bindTagsHandlers())
                }))
            },
            clickNoteSaveButton: function() {
                var e = t.makeFinalNoteData();
                t.validateData(e) && !t.isSaving && (t.isSaving = !0, e._id ? t.updateCallback && t.updateCallback(e) : t.insertCallback && t.insertCallback(e), a.close("#note-edit-modal"), setTimeout(function() {
                    t.isSaving = !1
                }, 500))
            },
            clickNoteCancelButton: function() {
                var i = t.makeFinalNoteData();
                e.isEqual(t.initNoteData, i) ? a.close("#note-edit-modal") : require(["controller/confirmModalController"], function(t) {
                    var e = {
                        message: g_localizedString._NoteEditConfirm_
                    };
                    t.open(e, function(t) {
                        0 === t && a.close("#note-edit-modal")
                    })
                })
            }
        })
    }, f.prototype.validateData = function(t) {
        return t.title || 0 !== t.content.length || t.costs && 0 !== t.costs.length ? this.editorCtrl.validateContent() ? !0 : !1 : (alert(g_localizedString._PostEmptyError_), !1)
    }, f.prototype.makeFinalNoteData = function() {
        var t = {};
        for (var e in this.noteModel) t[e] = this.noteModel[e];
        return t.type = this.tmpNoteType, t.content = this.editorCtrl.getContent(), t.title = this.view.getNoteTitleValue(), this.view.isHideNoteBudgetParent() ? t.costs = this.costsCtrl.getCosts().costs.length > 0 ? this.costsCtrl.getCosts() : [] : t.costs = this.costsCtrl.getFinalCosts(), !this.view.isHideNoteTagParent() && this.noteTagCtrl.getTags() ? t.tags = this.noteTagCtrl.getTags() : t.tags = [], this.view.isHideNoteLocationParent() && this.noteModel.getWroteAtSpot() ? t.wroteAtSpot = this.noteModel.getWroteAtSpot() : this.noteLocationCtrl.getWroteAtSpot() && this.noteLocationCtrl.getWroteAtSpot()._id ? t.wroteAtSpot = {
            _id: this.noteLocationCtrl.getWroteAtSpot()._id,
            name: this.noteLocationCtrl.getWroteAtSpot().name
        } : !t.wroteAtSpot && this.spotModel && (t.wroteAtSpot = {
            _id: this.spotModel.getId(),
            name: this.spotModel.getName()
        }), t
    }, f.prototype.destroy = function() {
        this.closeCallback && this.closeCallback(), this.editorCtrl.destroy(), this.noteLocationCtrl.destroy(), this.costsCtrl.destroy(), this.noteTagCtrl.destroy(), t(".medium-editor-anchor-preview").remove(), t(".medium-editor-toolbar").remove(), a.remove("#note-edit-modal")
    }, new f
});