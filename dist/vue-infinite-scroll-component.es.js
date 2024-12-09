/**
* @vue/shared v3.5.13
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/
/*! #__NO_SIDE_EFFECTS__ */
// @__NO_SIDE_EFFECTS__
function wn(e) {
  const t = /* @__PURE__ */ Object.create(null);
  for (const n of e.split(",")) t[n] = 1;
  return (n) => n in t;
}
const C = process.env.NODE_ENV !== "production" ? Object.freeze({}) : {}, yn = process.env.NODE_ENV !== "production" ? Object.freeze([]) : [], J = () => {
}, Sn = (e) => e.charCodeAt(0) === 111 && e.charCodeAt(1) === 110 && // uppercase letter
(e.charCodeAt(2) > 122 || e.charCodeAt(2) < 97), T = Object.assign, On = Object.prototype.hasOwnProperty, b = (e, t) => On.call(e, t), E = Array.isArray, re = (e) => He(e) === "[object Map]", xn = (e) => He(e) === "[object Set]", N = (e) => typeof e == "function", $ = (e) => typeof e == "string", oe = (e) => typeof e == "symbol", D = (e) => e !== null && typeof e == "object", Dn = (e) => (D(e) || N(e)) && N(e.then) && N(e.catch), Vn = Object.prototype.toString, He = (e) => Vn.call(e), $t = (e) => He(e).slice(8, -1), Rn = (e) => He(e) === "[object Object]", st = (e) => $(e) && e !== "NaN" && e[0] !== "-" && "" + parseInt(e, 10) === e, Pt = (e) => {
  const t = /* @__PURE__ */ Object.create(null);
  return (n) => t[n] || (t[n] = e(n));
}, At = Pt((e) => e.charAt(0).toUpperCase() + e.slice(1)), Tn = Pt(
  (e) => e ? `on${At(e)}` : ""
), z = (e, t) => !Object.is(e, t), Cn = (e, t, n, s = !1) => {
  Object.defineProperty(e, t, {
    configurable: !0,
    enumerable: !1,
    writable: s,
    value: n
  });
};
let Nt;
const je = () => Nt || (Nt = typeof globalThis < "u" ? globalThis : typeof self < "u" ? self : typeof window < "u" ? window : typeof global < "u" ? global : {});
function We(e) {
  if (E(e)) {
    const t = {};
    for (let n = 0; n < e.length; n++) {
      const s = e[n], r = $(s) ? An(s) : We(s);
      if (r)
        for (const o in r)
          t[o] = r[o];
    }
    return t;
  } else if ($(e) || D(e))
    return e;
}
const In = /;(?![^(]*\))/g, $n = /:([^]+)/, Pn = /\/\*[^]*?\*\//g;
function An(e) {
  const t = {};
  return e.replace(Pn, "").split(In).forEach((n) => {
    if (n) {
      const s = n.split($n);
      s.length > 1 && (t[s[0].trim()] = s[1].trim());
    }
  }), t;
}
function ot(e) {
  let t = "";
  if ($(e))
    t = e;
  else if (E(e))
    for (let n = 0; n < e.length; n++) {
      const s = ot(e[n]);
      s && (t += s + " ");
    }
  else if (D(e))
    for (const n in e)
      e[n] && (t += n + " ");
  return t.trim();
}
/**
* @vue/reactivity v3.5.13
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/
function F(e, ...t) {
  console.warn(`[Vue warn] ${e}`, ...t);
}
let g;
const ze = /* @__PURE__ */ new WeakSet();
class Mn {
  constructor(t) {
    this.fn = t, this.deps = void 0, this.depsTail = void 0, this.flags = 5, this.next = void 0, this.cleanup = void 0, this.scheduler = void 0;
  }
  pause() {
    this.flags |= 64;
  }
  resume() {
    this.flags & 64 && (this.flags &= -65, ze.has(this) && (ze.delete(this), this.trigger()));
  }
  /**
   * @internal
   */
  notify() {
    this.flags & 2 && !(this.flags & 32) || this.flags & 8 || Ft(this);
  }
  run() {
    if (!(this.flags & 1))
      return this.fn();
    this.flags |= 2, wt(this), Ht(this);
    const t = g, n = A;
    g = this, A = !0;
    try {
      return this.fn();
    } finally {
      process.env.NODE_ENV !== "production" && g !== this && F(
        "Active effect was not restored correctly - this is likely a Vue internal bug."
      ), jt(this), g = t, A = n, this.flags &= -3;
    }
  }
  stop() {
    if (this.flags & 1) {
      for (let t = this.deps; t; t = t.nextDep)
        lt(t);
      this.deps = this.depsTail = void 0, wt(this), this.onStop && this.onStop(), this.flags &= -2;
    }
  }
  trigger() {
    this.flags & 64 ? ze.add(this) : this.scheduler ? this.scheduler() : this.runIfDirty();
  }
  /**
   * @internal
   */
  runIfDirty() {
    Qe(this) && this.run();
  }
  get dirty() {
    return Qe(this);
  }
}
let Mt = 0, ae, ue;
function Ft(e, t = !1) {
  if (e.flags |= 8, t) {
    e.next = ue, ue = e;
    return;
  }
  e.next = ae, ae = e;
}
function it() {
  Mt++;
}
function ct() {
  if (--Mt > 0)
    return;
  if (ue) {
    let t = ue;
    for (ue = void 0; t; ) {
      const n = t.next;
      t.next = void 0, t.flags &= -9, t = n;
    }
  }
  let e;
  for (; ae; ) {
    let t = ae;
    for (ae = void 0; t; ) {
      const n = t.next;
      if (t.next = void 0, t.flags &= -9, t.flags & 1)
        try {
          t.trigger();
        } catch (s) {
          e || (e = s);
        }
      t = n;
    }
  }
  if (e) throw e;
}
function Ht(e) {
  for (let t = e.deps; t; t = t.nextDep)
    t.version = -1, t.prevActiveLink = t.dep.activeLink, t.dep.activeLink = t;
}
function jt(e) {
  let t, n = e.depsTail, s = n;
  for (; s; ) {
    const r = s.prevDep;
    s.version === -1 ? (s === n && (n = r), lt(s), Fn(s)) : t = s, s.dep.activeLink = s.prevActiveLink, s.prevActiveLink = void 0, s = r;
  }
  e.deps = t, e.depsTail = n;
}
function Qe(e) {
  for (let t = e.deps; t; t = t.nextDep)
    if (t.dep.version !== t.version || t.dep.computed && (Wt(t.dep.computed) || t.dep.version !== t.version))
      return !0;
  return !!e._dirty;
}
function Wt(e) {
  if (e.flags & 4 && !(e.flags & 16) || (e.flags &= -17, e.globalVersion === pe))
    return;
  e.globalVersion = pe;
  const t = e.dep;
  if (e.flags |= 2, t.version > 0 && !e.isSSR && e.deps && !Qe(e)) {
    e.flags &= -3;
    return;
  }
  const n = g, s = A;
  g = e, A = !0;
  try {
    Ht(e);
    const r = e.fn(e._value);
    (t.version === 0 || z(r, e._value)) && (e._value = r, t.version++);
  } catch (r) {
    throw t.version++, r;
  } finally {
    g = n, A = s, jt(e), e.flags &= -3;
  }
}
function lt(e, t = !1) {
  const { dep: n, prevSub: s, nextSub: r } = e;
  if (s && (s.nextSub = r, e.prevSub = void 0), r && (r.prevSub = s, e.nextSub = void 0), process.env.NODE_ENV !== "production" && n.subsHead === e && (n.subsHead = r), n.subs === e && (n.subs = s, !s && n.computed)) {
    n.computed.flags &= -5;
    for (let o = n.computed.deps; o; o = o.nextDep)
      lt(o, !0);
  }
  !t && !--n.sc && n.map && n.map.delete(n.key);
}
function Fn(e) {
  const { prevDep: t, nextDep: n } = e;
  t && (t.nextDep = n, e.prevDep = void 0), n && (n.prevDep = t, e.nextDep = void 0);
}
let A = !0;
const Lt = [];
function me() {
  Lt.push(A), A = !1;
}
function ve() {
  const e = Lt.pop();
  A = e === void 0 ? !0 : e;
}
function wt(e) {
  const { cleanup: t } = e;
  if (e.cleanup = void 0, t) {
    const n = g;
    g = void 0;
    try {
      t();
    } finally {
      g = n;
    }
  }
}
let pe = 0;
class Hn {
  constructor(t, n) {
    this.sub = t, this.dep = n, this.version = n.version, this.nextDep = this.prevDep = this.nextSub = this.prevSub = this.prevActiveLink = void 0;
  }
}
class at {
  constructor(t) {
    this.computed = t, this.version = 0, this.activeLink = void 0, this.subs = void 0, this.map = void 0, this.key = void 0, this.sc = 0, process.env.NODE_ENV !== "production" && (this.subsHead = void 0);
  }
  track(t) {
    if (!g || !A || g === this.computed)
      return;
    let n = this.activeLink;
    if (n === void 0 || n.sub !== g)
      n = this.activeLink = new Hn(g, this), g.deps ? (n.prevDep = g.depsTail, g.depsTail.nextDep = n, g.depsTail = n) : g.deps = g.depsTail = n, Kt(n);
    else if (n.version === -1 && (n.version = this.version, n.nextDep)) {
      const s = n.nextDep;
      s.prevDep = n.prevDep, n.prevDep && (n.prevDep.nextDep = s), n.prevDep = g.depsTail, n.nextDep = void 0, g.depsTail.nextDep = n, g.depsTail = n, g.deps === n && (g.deps = s);
    }
    return process.env.NODE_ENV !== "production" && g.onTrack && g.onTrack(
      T(
        {
          effect: g
        },
        t
      )
    ), n;
  }
  trigger(t) {
    this.version++, pe++, this.notify(t);
  }
  notify(t) {
    it();
    try {
      if (process.env.NODE_ENV !== "production")
        for (let n = this.subsHead; n; n = n.nextSub)
          n.sub.onTrigger && !(n.sub.flags & 8) && n.sub.onTrigger(
            T(
              {
                effect: n.sub
              },
              t
            )
          );
      for (let n = this.subs; n; n = n.prevSub)
        n.sub.notify() && n.sub.dep.notify();
    } finally {
      ct();
    }
  }
}
function Kt(e) {
  if (e.dep.sc++, e.sub.flags & 4) {
    const t = e.dep.computed;
    if (t && !e.dep.subs) {
      t.flags |= 20;
      for (let s = t.deps; s; s = s.nextDep)
        Kt(s);
    }
    const n = e.dep.subs;
    n !== e && (e.prevSub = n, n && (n.nextSub = e)), process.env.NODE_ENV !== "production" && e.dep.subsHead === void 0 && (e.dep.subsHead = e), e.dep.subs = e;
  }
}
const Re = /* @__PURE__ */ new WeakMap(), Y = Symbol(
  process.env.NODE_ENV !== "production" ? "Object iterate" : ""
), Ze = Symbol(
  process.env.NODE_ENV !== "production" ? "Map keys iterate" : ""
), de = Symbol(
  process.env.NODE_ENV !== "production" ? "Array iterate" : ""
);
function w(e, t, n) {
  if (A && g) {
    let s = Re.get(e);
    s || Re.set(e, s = /* @__PURE__ */ new Map());
    let r = s.get(n);
    r || (s.set(n, r = new at()), r.map = s, r.key = n), process.env.NODE_ENV !== "production" ? r.track({
      target: e,
      type: t,
      key: n
    }) : r.track();
  }
}
function K(e, t, n, s, r, o) {
  const i = Re.get(e);
  if (!i) {
    pe++;
    return;
  }
  const c = (a) => {
    a && (process.env.NODE_ENV !== "production" ? a.trigger({
      target: e,
      type: t,
      key: n,
      newValue: s,
      oldValue: r,
      oldTarget: o
    }) : a.trigger());
  };
  if (it(), t === "clear")
    i.forEach(c);
  else {
    const a = E(e), u = a && st(n);
    if (a && n === "length") {
      const d = Number(s);
      i.forEach((l, f) => {
        (f === "length" || f === de || !oe(f) && f >= d) && c(l);
      });
    } else
      switch ((n !== void 0 || i.has(void 0)) && c(i.get(n)), u && c(i.get(de)), t) {
        case "add":
          a ? u && c(i.get("length")) : (c(i.get(Y)), re(e) && c(i.get(Ze)));
          break;
        case "delete":
          a || (c(i.get(Y)), re(e) && c(i.get(Ze)));
          break;
        case "set":
          re(e) && c(i.get(Y));
          break;
      }
  }
  ct();
}
function jn(e, t) {
  const n = Re.get(e);
  return n && n.get(t);
}
function ee(e) {
  const t = h(e);
  return t === e ? t : (w(t, "iterate", de), V(e) ? t : t.map(S));
}
function Le(e) {
  return w(e = h(e), "iterate", de), e;
}
const Wn = {
  __proto__: null,
  [Symbol.iterator]() {
    return Be(this, Symbol.iterator, S);
  },
  concat(...e) {
    return ee(this).concat(
      ...e.map((t) => E(t) ? ee(t) : t)
    );
  },
  entries() {
    return Be(this, "entries", (e) => (e[1] = S(e[1]), e));
  },
  every(e, t) {
    return H(this, "every", e, t, void 0, arguments);
  },
  filter(e, t) {
    return H(this, "filter", e, t, (n) => n.map(S), arguments);
  },
  find(e, t) {
    return H(this, "find", e, t, S, arguments);
  },
  findIndex(e, t) {
    return H(this, "findIndex", e, t, void 0, arguments);
  },
  findLast(e, t) {
    return H(this, "findLast", e, t, S, arguments);
  },
  findLastIndex(e, t) {
    return H(this, "findLastIndex", e, t, void 0, arguments);
  },
  // flat, flatMap could benefit from ARRAY_ITERATE but are not straight-forward to implement
  forEach(e, t) {
    return H(this, "forEach", e, t, void 0, arguments);
  },
  includes(...e) {
    return qe(this, "includes", e);
  },
  indexOf(...e) {
    return qe(this, "indexOf", e);
  },
  join(e) {
    return ee(this).join(e);
  },
  // keys() iterator only reads `length`, no optimisation required
  lastIndexOf(...e) {
    return qe(this, "lastIndexOf", e);
  },
  map(e, t) {
    return H(this, "map", e, t, void 0, arguments);
  },
  pop() {
    return ce(this, "pop");
  },
  push(...e) {
    return ce(this, "push", e);
  },
  reduce(e, ...t) {
    return yt(this, "reduce", e, t);
  },
  reduceRight(e, ...t) {
    return yt(this, "reduceRight", e, t);
  },
  shift() {
    return ce(this, "shift");
  },
  // slice could use ARRAY_ITERATE but also seems to beg for range tracking
  some(e, t) {
    return H(this, "some", e, t, void 0, arguments);
  },
  splice(...e) {
    return ce(this, "splice", e);
  },
  toReversed() {
    return ee(this).toReversed();
  },
  toSorted(e) {
    return ee(this).toSorted(e);
  },
  toSpliced(...e) {
    return ee(this).toSpliced(...e);
  },
  unshift(...e) {
    return ce(this, "unshift", e);
  },
  values() {
    return Be(this, "values", S);
  }
};
function Be(e, t, n) {
  const s = Le(e), r = s[t]();
  return s !== e && !V(e) && (r._next = r.next, r.next = () => {
    const o = r._next();
    return o.value && (o.value = n(o.value)), o;
  }), r;
}
const Ln = Array.prototype;
function H(e, t, n, s, r, o) {
  const i = Le(e), c = i !== e && !V(e), a = i[t];
  if (a !== Ln[t]) {
    const l = a.apply(e, o);
    return c ? S(l) : l;
  }
  let u = n;
  i !== e && (c ? u = function(l, f) {
    return n.call(this, S(l), f, e);
  } : n.length > 2 && (u = function(l, f) {
    return n.call(this, l, f, e);
  }));
  const d = a.call(i, u, s);
  return c && r ? r(d) : d;
}
function yt(e, t, n, s) {
  const r = Le(e);
  let o = n;
  return r !== e && (V(e) ? n.length > 3 && (o = function(i, c, a) {
    return n.call(this, i, c, a, e);
  }) : o = function(i, c, a) {
    return n.call(this, i, S(c), a, e);
  }), r[t](o, ...s);
}
function qe(e, t, n) {
  const s = h(e);
  w(s, "iterate", de);
  const r = s[t](...n);
  return (r === -1 || r === !1) && he(n[0]) ? (n[0] = h(n[0]), s[t](...n)) : r;
}
function ce(e, t, n = []) {
  me(), it();
  const s = h(e)[t].apply(e, n);
  return ct(), ve(), s;
}
const Kn = /* @__PURE__ */ wn("__proto__,__v_isRef,__isVue"), Ut = new Set(
  /* @__PURE__ */ Object.getOwnPropertyNames(Symbol).filter((e) => e !== "arguments" && e !== "caller").map((e) => Symbol[e]).filter(oe)
);
function Un(e) {
  oe(e) || (e = String(e));
  const t = h(this);
  return w(t, "has", e), t.hasOwnProperty(e);
}
class zt {
  constructor(t = !1, n = !1) {
    this._isReadonly = t, this._isShallow = n;
  }
  get(t, n, s) {
    if (n === "__v_skip") return t.__v_skip;
    const r = this._isReadonly, o = this._isShallow;
    if (n === "__v_isReactive")
      return !r;
    if (n === "__v_isReadonly")
      return r;
    if (n === "__v_isShallow")
      return o;
    if (n === "__v_raw")
      return s === (r ? o ? Yt : Jt : o ? kn : qt).get(t) || // receiver is not the reactive proxy, but has the same prototype
      // this means the receiver is a user proxy of the reactive proxy
      Object.getPrototypeOf(t) === Object.getPrototypeOf(s) ? t : void 0;
    const i = E(t);
    if (!r) {
      let a;
      if (i && (a = Wn[n]))
        return a;
      if (n === "hasOwnProperty")
        return Un;
    }
    const c = Reflect.get(
      t,
      n,
      // if this is a proxy wrapping a ref, return methods using the raw ref
      // as receiver so that we don't have to call `toRaw` on the ref in all
      // its class methods
      O(t) ? t : s
    );
    return (oe(n) ? Ut.has(n) : Kn(n)) || (r || w(t, "get", n), o) ? c : O(c) ? i && st(n) ? c : c.value : D(c) ? r ? Xt(c) : Gt(c) : c;
  }
}
class zn extends zt {
  constructor(t = !1) {
    super(!1, t);
  }
  set(t, n, s, r) {
    let o = t[n];
    if (!this._isShallow) {
      const a = W(o);
      if (!V(s) && !W(s) && (o = h(o), s = h(s)), !E(t) && O(o) && !O(s))
        return a ? !1 : (o.value = s, !0);
    }
    const i = E(t) && st(n) ? Number(n) < t.length : b(t, n), c = Reflect.set(
      t,
      n,
      s,
      O(t) ? t : r
    );
    return t === h(r) && (i ? z(s, o) && K(t, "set", n, s, o) : K(t, "add", n, s)), c;
  }
  deleteProperty(t, n) {
    const s = b(t, n), r = t[n], o = Reflect.deleteProperty(t, n);
    return o && s && K(t, "delete", n, void 0, r), o;
  }
  has(t, n) {
    const s = Reflect.has(t, n);
    return (!oe(n) || !Ut.has(n)) && w(t, "has", n), s;
  }
  ownKeys(t) {
    return w(
      t,
      "iterate",
      E(t) ? "length" : Y
    ), Reflect.ownKeys(t);
  }
}
class Bt extends zt {
  constructor(t = !1) {
    super(!0, t);
  }
  set(t, n) {
    return process.env.NODE_ENV !== "production" && F(
      `Set operation on key "${String(n)}" failed: target is readonly.`,
      t
    ), !0;
  }
  deleteProperty(t, n) {
    return process.env.NODE_ENV !== "production" && F(
      `Delete operation on key "${String(n)}" failed: target is readonly.`,
      t
    ), !0;
  }
}
const Bn = /* @__PURE__ */ new zn(), qn = /* @__PURE__ */ new Bt(), Jn = /* @__PURE__ */ new Bt(!0), ke = (e) => e, Ne = (e) => Reflect.getPrototypeOf(e);
function Yn(e, t, n) {
  return function(...s) {
    const r = this.__v_raw, o = h(r), i = re(o), c = e === "entries" || e === Symbol.iterator && i, a = e === "keys" && i, u = r[e](...s), d = n ? ke : t ? et : S;
    return !t && w(
      o,
      "iterate",
      a ? Ze : Y
    ), {
      // iterator protocol
      next() {
        const { value: l, done: f } = u.next();
        return f ? { value: l, done: f } : {
          value: c ? [d(l[0]), d(l[1])] : d(l),
          done: f
        };
      },
      // iterable protocol
      [Symbol.iterator]() {
        return this;
      }
    };
  };
}
function we(e) {
  return function(...t) {
    if (process.env.NODE_ENV !== "production") {
      const n = t[0] ? `on key "${t[0]}" ` : "";
      F(
        `${At(e)} operation ${n}failed: target is readonly.`,
        h(this)
      );
    }
    return e === "delete" ? !1 : e === "clear" ? void 0 : this;
  };
}
function Gn(e, t) {
  const n = {
    get(r) {
      const o = this.__v_raw, i = h(o), c = h(r);
      e || (z(r, c) && w(i, "get", r), w(i, "get", c));
      const { has: a } = Ne(i), u = t ? ke : e ? et : S;
      if (a.call(i, r))
        return u(o.get(r));
      if (a.call(i, c))
        return u(o.get(c));
      o !== i && o.get(r);
    },
    get size() {
      const r = this.__v_raw;
      return !e && w(h(r), "iterate", Y), Reflect.get(r, "size", r);
    },
    has(r) {
      const o = this.__v_raw, i = h(o), c = h(r);
      return e || (z(r, c) && w(i, "has", r), w(i, "has", c)), r === c ? o.has(r) : o.has(r) || o.has(c);
    },
    forEach(r, o) {
      const i = this, c = i.__v_raw, a = h(c), u = t ? ke : e ? et : S;
      return !e && w(a, "iterate", Y), c.forEach((d, l) => r.call(o, u(d), u(l), i));
    }
  };
  return T(
    n,
    e ? {
      add: we("add"),
      set: we("set"),
      delete: we("delete"),
      clear: we("clear")
    } : {
      add(r) {
        !t && !V(r) && !W(r) && (r = h(r));
        const o = h(this);
        return Ne(o).has.call(o, r) || (o.add(r), K(o, "add", r, r)), this;
      },
      set(r, o) {
        !t && !V(o) && !W(o) && (o = h(o));
        const i = h(this), { has: c, get: a } = Ne(i);
        let u = c.call(i, r);
        u ? process.env.NODE_ENV !== "production" && St(i, c, r) : (r = h(r), u = c.call(i, r));
        const d = a.call(i, r);
        return i.set(r, o), u ? z(o, d) && K(i, "set", r, o, d) : K(i, "add", r, o), this;
      },
      delete(r) {
        const o = h(this), { has: i, get: c } = Ne(o);
        let a = i.call(o, r);
        a ? process.env.NODE_ENV !== "production" && St(o, i, r) : (r = h(r), a = i.call(o, r));
        const u = c ? c.call(o, r) : void 0, d = o.delete(r);
        return a && K(o, "delete", r, void 0, u), d;
      },
      clear() {
        const r = h(this), o = r.size !== 0, i = process.env.NODE_ENV !== "production" ? re(r) ? new Map(r) : new Set(r) : void 0, c = r.clear();
        return o && K(
          r,
          "clear",
          void 0,
          void 0,
          i
        ), c;
      }
    }
  ), [
    "keys",
    "values",
    "entries",
    Symbol.iterator
  ].forEach((r) => {
    n[r] = Yn(r, e, t);
  }), n;
}
function ut(e, t) {
  const n = Gn(e, t);
  return (s, r, o) => r === "__v_isReactive" ? !e : r === "__v_isReadonly" ? e : r === "__v_raw" ? s : Reflect.get(
    b(n, r) && r in s ? n : s,
    r,
    o
  );
}
const Xn = {
  get: /* @__PURE__ */ ut(!1, !1)
}, Qn = {
  get: /* @__PURE__ */ ut(!0, !1)
}, Zn = {
  get: /* @__PURE__ */ ut(!0, !0)
};
function St(e, t, n) {
  const s = h(n);
  if (s !== n && t.call(e, s)) {
    const r = $t(e);
    F(
      `Reactive ${r} contains both the raw and reactive versions of the same object${r === "Map" ? " as keys" : ""}, which can lead to inconsistencies. Avoid differentiating between the raw and reactive versions of an object and only use the reactive version if possible.`
    );
  }
}
const qt = /* @__PURE__ */ new WeakMap(), kn = /* @__PURE__ */ new WeakMap(), Jt = /* @__PURE__ */ new WeakMap(), Yt = /* @__PURE__ */ new WeakMap();
function er(e) {
  switch (e) {
    case "Object":
    case "Array":
      return 1;
    case "Map":
    case "Set":
    case "WeakMap":
    case "WeakSet":
      return 2;
    default:
      return 0;
  }
}
function tr(e) {
  return e.__v_skip || !Object.isExtensible(e) ? 0 : er($t(e));
}
function Gt(e) {
  return W(e) ? e : ft(
    e,
    !1,
    Bn,
    Xn,
    qt
  );
}
function Xt(e) {
  return ft(
    e,
    !0,
    qn,
    Qn,
    Jt
  );
}
function ye(e) {
  return ft(
    e,
    !0,
    Jn,
    Zn,
    Yt
  );
}
function ft(e, t, n, s, r) {
  if (!D(e))
    return process.env.NODE_ENV !== "production" && F(
      `value cannot be made ${t ? "readonly" : "reactive"}: ${String(
        e
      )}`
    ), e;
  if (e.__v_raw && !(t && e.__v_isReactive))
    return e;
  const o = r.get(e);
  if (o)
    return o;
  const i = tr(e);
  if (i === 0)
    return e;
  const c = new Proxy(
    e,
    i === 2 ? s : n
  );
  return r.set(e, c), c;
}
function G(e) {
  return W(e) ? G(e.__v_raw) : !!(e && e.__v_isReactive);
}
function W(e) {
  return !!(e && e.__v_isReadonly);
}
function V(e) {
  return !!(e && e.__v_isShallow);
}
function he(e) {
  return e ? !!e.__v_raw : !1;
}
function h(e) {
  const t = e && e.__v_raw;
  return t ? h(t) : e;
}
function nr(e) {
  return !b(e, "__v_skip") && Object.isExtensible(e) && Cn(e, "__v_skip", !0), e;
}
const S = (e) => D(e) ? Gt(e) : e, et = (e) => D(e) ? Xt(e) : e;
function O(e) {
  return e ? e.__v_isRef === !0 : !1;
}
function Se(e) {
  return rr(e, !1);
}
function rr(e, t) {
  return O(e) ? e : new sr(e, t);
}
class sr {
  constructor(t, n) {
    this.dep = new at(), this.__v_isRef = !0, this.__v_isShallow = !1, this._rawValue = n ? t : h(t), this._value = n ? t : S(t), this.__v_isShallow = n;
  }
  get value() {
    return process.env.NODE_ENV !== "production" ? this.dep.track({
      target: this,
      type: "get",
      key: "value"
    }) : this.dep.track(), this._value;
  }
  set value(t) {
    const n = this._rawValue, s = this.__v_isShallow || V(t) || W(t);
    t = s ? t : h(t), z(t, n) && (this._rawValue = t, this._value = s ? t : S(t), process.env.NODE_ENV !== "production" ? this.dep.trigger({
      target: this,
      type: "set",
      key: "value",
      newValue: t,
      oldValue: n
    }) : this.dep.trigger());
  }
}
function or(e) {
  return O(e) ? e.value : e;
}
const ir = {
  get: (e, t, n) => t === "__v_raw" ? e : or(Reflect.get(e, t, n)),
  set: (e, t, n, s) => {
    const r = e[t];
    return O(r) && !O(n) ? (r.value = n, !0) : Reflect.set(e, t, n, s);
  }
};
function cr(e) {
  return G(e) ? e : new Proxy(e, ir);
}
function lr(e) {
  process.env.NODE_ENV !== "production" && !he(e) && F("toRefs() expects a reactive object but received a plain one.");
  const t = E(e) ? new Array(e.length) : {};
  for (const n in e)
    t[n] = ur(e, n);
  return t;
}
class ar {
  constructor(t, n, s) {
    this._object = t, this._key = n, this._defaultValue = s, this.__v_isRef = !0, this._value = void 0;
  }
  get value() {
    const t = this._object[this._key];
    return this._value = t === void 0 ? this._defaultValue : t;
  }
  set value(t) {
    this._object[this._key] = t;
  }
  get dep() {
    return jn(h(this._object), this._key);
  }
}
function ur(e, t, n) {
  const s = e[t];
  return O(s) ? s : new ar(e, t, n);
}
class fr {
  constructor(t, n, s) {
    this.fn = t, this.setter = n, this._value = void 0, this.dep = new at(this), this.__v_isRef = !0, this.deps = void 0, this.depsTail = void 0, this.flags = 16, this.globalVersion = pe - 1, this.next = void 0, this.effect = this, this.__v_isReadonly = !n, this.isSSR = s;
  }
  /**
   * @internal
   */
  notify() {
    if (this.flags |= 16, !(this.flags & 8) && // avoid infinite self recursion
    g !== this)
      return Ft(this, !0), !0;
    process.env.NODE_ENV;
  }
  get value() {
    const t = process.env.NODE_ENV !== "production" ? this.dep.track({
      target: this,
      type: "get",
      key: "value"
    }) : this.dep.track();
    return Wt(this), t && (t.version = this.dep.version), this._value;
  }
  set value(t) {
    this.setter ? this.setter(t) : process.env.NODE_ENV !== "production" && F("Write operation failed: computed value is readonly");
  }
}
function pr(e, t, n = !1) {
  let s, r;
  N(e) ? s = e : (s = e.get, r = e.set);
  const o = new fr(s, r, n);
  return process.env.NODE_ENV !== "production" && t && !n && (o.onTrack = t.onTrack, o.onTrigger = t.onTrigger), o;
}
const Oe = {}, Te = /* @__PURE__ */ new WeakMap();
let q;
function dr(e, t = !1, n = q) {
  if (n) {
    let s = Te.get(n);
    s || Te.set(n, s = []), s.push(e);
  } else process.env.NODE_ENV !== "production" && !t && F(
    "onWatcherCleanup() was called when there was no active watcher to associate with."
  );
}
function hr(e, t, n = C) {
  const { immediate: s, deep: r, once: o, scheduler: i, augmentJob: c, call: a } = n, u = (_) => {
    (n.onWarn || F)(
      "Invalid watch source: ",
      _,
      "A watch source can only be a getter/effect function, a ref, a reactive object, or an array of these types."
    );
  }, d = (_) => r ? _ : V(_) || r === !1 || r === 0 ? U(_, 1) : U(_);
  let l, f, p, m, y = !1, Ee = !1;
  if (O(e) ? (f = () => e.value, y = V(e)) : G(e) ? (f = () => d(e), y = !0) : E(e) ? (Ee = !0, y = e.some((_) => G(_) || V(_)), f = () => e.map((_) => {
    if (O(_))
      return _.value;
    if (G(_))
      return d(_);
    if (N(_))
      return a ? a(_, 2) : _();
    process.env.NODE_ENV !== "production" && u(_);
  })) : N(e) ? t ? f = a ? () => a(e, 2) : e : f = () => {
    if (p) {
      me();
      try {
        p();
      } finally {
        ve();
      }
    }
    const _ = q;
    q = l;
    try {
      return a ? a(e, 3, [m]) : e(m);
    } finally {
      q = _;
    }
  } : (f = J, process.env.NODE_ENV !== "production" && u(e)), t && r) {
    const _ = f, M = r === !0 ? 1 / 0 : r;
    f = () => U(_(), M);
  }
  const k = () => {
    l.stop();
  };
  if (o && t) {
    const _ = t;
    t = (...M) => {
      _(...M), k();
    };
  }
  let B = Ee ? new Array(e.length).fill(Oe) : Oe;
  const ie = (_) => {
    if (!(!(l.flags & 1) || !l.dirty && !_))
      if (t) {
        const M = l.run();
        if (r || y || (Ee ? M.some((Ue, be) => z(Ue, B[be])) : z(M, B))) {
          p && p();
          const Ue = q;
          q = l;
          try {
            const be = [
              M,
              // pass undefined as the old value when it's changed for the first time
              B === Oe ? void 0 : Ee && B[0] === Oe ? [] : B,
              m
            ];
            a ? a(t, 3, be) : (
              // @ts-expect-error
              t(...be)
            ), B = M;
          } finally {
            q = Ue;
          }
        }
      } else
        l.run();
  };
  return c && c(ie), l = new Mn(f), l.scheduler = i ? () => i(ie, !1) : ie, m = (_) => dr(_, !1, l), p = l.onStop = () => {
    const _ = Te.get(l);
    if (_) {
      if (a)
        a(_, 4);
      else
        for (const M of _) M();
      Te.delete(l);
    }
  }, process.env.NODE_ENV !== "production" && (l.onTrack = n.onTrack, l.onTrigger = n.onTrigger), t ? s ? ie(!0) : B = l.run() : i ? i(ie.bind(null, !0), !0) : l.run(), k.pause = l.pause.bind(l), k.resume = l.resume.bind(l), k.stop = k, k;
}
function U(e, t = 1 / 0, n) {
  if (t <= 0 || !D(e) || e.__v_skip || (n = n || /* @__PURE__ */ new Set(), n.has(e)))
    return e;
  if (n.add(e), t--, O(e))
    U(e.value, t, n);
  else if (E(e))
    for (let s = 0; s < e.length; s++)
      U(e[s], t, n);
  else if (xn(e) || re(e))
    e.forEach((s) => {
      U(s, t, n);
    });
  else if (Rn(e)) {
    for (const s in e)
      U(e[s], t, n);
    for (const s of Object.getOwnPropertySymbols(e))
      Object.prototype.propertyIsEnumerable.call(e, s) && U(e[s], t, n);
  }
  return e;
}
/**
* @vue/runtime-core v3.5.13
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/
const X = [];
function _r(e) {
  X.push(e);
}
function gr() {
  X.pop();
}
let Je = !1;
function v(e, ...t) {
  if (Je) return;
  Je = !0, me();
  const n = X.length ? X[X.length - 1].component : null, s = n && n.appContext.config.warnHandler, r = mr();
  if (s)
    Ke(
      s,
      n,
      11,
      [
        // eslint-disable-next-line no-restricted-syntax
        e + t.map((o) => {
          var i, c;
          return (c = (i = o.toString) == null ? void 0 : i.call(o)) != null ? c : JSON.stringify(o);
        }).join(""),
        n && n.proxy,
        r.map(
          ({ vnode: o }) => `at <${En(n, o.type)}>`
        ).join(`
`),
        r
      ]
    );
  else {
    const o = [`[Vue warn]: ${e}`, ...t];
    r.length && o.push(`
`, ...vr(r)), console.warn(...o);
  }
  ve(), Je = !1;
}
function mr() {
  let e = X[X.length - 1];
  if (!e)
    return [];
  const t = [];
  for (; e; ) {
    const n = t[0];
    n && n.vnode === e ? n.recurseCount++ : t.push({
      vnode: e,
      recurseCount: 0
    });
    const s = e.component && e.component.parent;
    e = s && s.vnode;
  }
  return t;
}
function vr(e) {
  const t = [];
  return e.forEach((n, s) => {
    t.push(...s === 0 ? [] : [`
`], ...Er(n));
  }), t;
}
function Er({ vnode: e, recurseCount: t }) {
  const n = t > 0 ? `... (${t} recursive calls)` : "", s = e.component ? e.component.parent == null : !1, r = ` at <${En(
    e.component,
    e.type,
    s
  )}`, o = ">" + n;
  return e.props ? [r, ...br(e.props), o] : [r + o];
}
function br(e) {
  const t = [], n = Object.keys(e);
  return n.slice(0, 3).forEach((s) => {
    t.push(...Qt(s, e[s]));
  }), n.length > 3 && t.push(" ..."), t;
}
function Qt(e, t, n) {
  return $(t) ? (t = JSON.stringify(t), n ? t : [`${e}=${t}`]) : typeof t == "number" || typeof t == "boolean" || t == null ? n ? t : [`${e}=${t}`] : O(t) ? (t = Qt(e, h(t.value), !0), n ? t : [`${e}=Ref<`, t, ">"]) : N(t) ? [`${e}=fn${t.name ? `<${t.name}>` : ""}`] : (t = h(t), n ? t : [`${e}=`, t]);
}
const pt = {
  sp: "serverPrefetch hook",
  bc: "beforeCreate hook",
  c: "created hook",
  bm: "beforeMount hook",
  m: "mounted hook",
  bu: "beforeUpdate hook",
  u: "updated",
  bum: "beforeUnmount hook",
  um: "unmounted hook",
  a: "activated hook",
  da: "deactivated hook",
  ec: "errorCaptured hook",
  rtc: "renderTracked hook",
  rtg: "renderTriggered hook",
  0: "setup function",
  1: "render function",
  2: "watcher getter",
  3: "watcher callback",
  4: "watcher cleanup function",
  5: "native event handler",
  6: "component event handler",
  7: "vnode hook",
  8: "directive hook",
  9: "transition hook",
  10: "app errorHandler",
  11: "app warnHandler",
  12: "ref function",
  13: "async component loader",
  14: "scheduler flush",
  15: "component update",
  16: "app unmount cleanup function"
};
function Ke(e, t, n, s) {
  try {
    return s ? e(...s) : e();
  } catch (r) {
    ht(r, t, n);
  }
}
function dt(e, t, n, s) {
  if (N(e)) {
    const r = Ke(e, t, n, s);
    return r && Dn(r) && r.catch((o) => {
      ht(o, t, n);
    }), r;
  }
  if (E(e)) {
    const r = [];
    for (let o = 0; o < e.length; o++)
      r.push(dt(e[o], t, n, s));
    return r;
  } else process.env.NODE_ENV !== "production" && v(
    `Invalid value type passed to callWithAsyncErrorHandling(): ${typeof e}`
  );
}
function ht(e, t, n, s = !0) {
  const r = t ? t.vnode : null, { errorHandler: o, throwUnhandledErrorInProduction: i } = t && t.appContext.config || C;
  if (t) {
    let c = t.parent;
    const a = t.proxy, u = process.env.NODE_ENV !== "production" ? pt[n] : `https://vuejs.org/error-reference/#runtime-${n}`;
    for (; c; ) {
      const d = c.ec;
      if (d) {
        for (let l = 0; l < d.length; l++)
          if (d[l](e, a, u) === !1)
            return;
      }
      c = c.parent;
    }
    if (o) {
      me(), Ke(o, null, 10, [
        e,
        a,
        u
      ]), ve();
      return;
    }
  }
  Nr(e, n, r, s, i);
}
function Nr(e, t, n, s = !0, r = !1) {
  if (process.env.NODE_ENV !== "production") {
    const o = pt[t];
    if (n && _r(n), v(`Unhandled error${o ? ` during execution of ${o}` : ""}`), n && gr(), s)
      throw e;
    console.error(e);
  } else {
    if (r)
      throw e;
    console.error(e);
  }
}
const I = [];
let j = -1;
const se = [];
let L = null, te = 0;
const Zt = /* @__PURE__ */ Promise.resolve();
let Ce = null;
const wr = 100;
function yr(e) {
  const t = Ce || Zt;
  return e ? t.then(this ? e.bind(this) : e) : t;
}
function Sr(e) {
  let t = j + 1, n = I.length;
  for (; t < n; ) {
    const s = t + n >>> 1, r = I[s], o = _e(r);
    o < e || o === e && r.flags & 2 ? t = s + 1 : n = s;
  }
  return t;
}
function _t(e) {
  if (!(e.flags & 1)) {
    const t = _e(e), n = I[I.length - 1];
    !n || // fast path when the job id is larger than the tail
    !(e.flags & 2) && t >= _e(n) ? I.push(e) : I.splice(Sr(t), 0, e), e.flags |= 1, kt();
  }
}
function kt() {
  Ce || (Ce = Zt.then(en));
}
function gt(e) {
  E(e) ? se.push(...e) : L && e.id === -1 ? L.splice(te + 1, 0, e) : e.flags & 1 || (se.push(e), e.flags |= 1), kt();
}
function Or(e) {
  if (se.length) {
    const t = [...new Set(se)].sort(
      (n, s) => _e(n) - _e(s)
    );
    if (se.length = 0, L) {
      L.push(...t);
      return;
    }
    for (L = t, process.env.NODE_ENV !== "production" && (e = e || /* @__PURE__ */ new Map()), te = 0; te < L.length; te++) {
      const n = L[te];
      process.env.NODE_ENV !== "production" && tn(e, n) || (n.flags & 4 && (n.flags &= -2), n.flags & 8 || n(), n.flags &= -2);
    }
    L = null, te = 0;
  }
}
const _e = (e) => e.id == null ? e.flags & 2 ? -1 : 1 / 0 : e.id;
function en(e) {
  process.env.NODE_ENV !== "production" && (e = e || /* @__PURE__ */ new Map());
  const t = process.env.NODE_ENV !== "production" ? (n) => tn(e, n) : J;
  try {
    for (j = 0; j < I.length; j++) {
      const n = I[j];
      if (n && !(n.flags & 8)) {
        if (process.env.NODE_ENV !== "production" && t(n))
          continue;
        n.flags & 4 && (n.flags &= -2), Ke(
          n,
          n.i,
          n.i ? 15 : 14
        ), n.flags & 4 || (n.flags &= -2);
      }
    }
  } finally {
    for (; j < I.length; j++) {
      const n = I[j];
      n && (n.flags &= -2);
    }
    j = -1, I.length = 0, Or(e), Ce = null, (I.length || se.length) && en(e);
  }
}
function tn(e, t) {
  const n = e.get(t) || 0;
  if (n > wr) {
    const s = t.i, r = s && vn(s.type);
    return ht(
      `Maximum recursive updates exceeded${r ? ` in component <${r}>` : ""}. This means you have a reactive effect that is mutating its own dependencies and thus recursively triggering itself. Possible sources include component template, render function, updated hook or watcher source function.`,
      null,
      10
    ), !0;
  }
  return e.set(t, n + 1), !1;
}
const Ye = /* @__PURE__ */ new Map();
process.env.NODE_ENV !== "production" && (je().__VUE_HMR_RUNTIME__ = {
  createRecord: Ge(xr),
  rerender: Ge(Dr),
  reload: Ge(Vr)
});
const Ie = /* @__PURE__ */ new Map();
function xr(e, t) {
  return Ie.has(e) ? !1 : (Ie.set(e, {
    initialDef: $e(t),
    instances: /* @__PURE__ */ new Set()
  }), !0);
}
function $e(e) {
  return bn(e) ? e.__vccOpts : e;
}
function Dr(e, t) {
  const n = Ie.get(e);
  n && (n.initialDef.render = t, [...n.instances].forEach((s) => {
    t && (s.render = t, $e(s.type).render = t), s.renderCache = [], s.update();
  }));
}
function Vr(e, t) {
  const n = Ie.get(e);
  if (!n) return;
  t = $e(t), Ot(n.initialDef, t);
  const s = [...n.instances];
  for (let r = 0; r < s.length; r++) {
    const o = s[r], i = $e(o.type);
    let c = Ye.get(i);
    c || (i !== n.initialDef && Ot(i, t), Ye.set(i, c = /* @__PURE__ */ new Set())), c.add(o), o.appContext.propsCache.delete(o.type), o.appContext.emitsCache.delete(o.type), o.appContext.optionsCache.delete(o.type), o.ceReload ? (c.add(o), o.ceReload(t.styles), c.delete(o)) : o.parent ? _t(() => {
      o.parent.update(), c.delete(o);
    }) : o.appContext.reload ? o.appContext.reload() : typeof window < "u" ? window.location.reload() : console.warn(
      "[HMR] Root or manually mounted instance modified. Full reload required."
    ), o.root.ce && o !== o.root && o.root.ce._removeChildStyle(i);
  }
  gt(() => {
    Ye.clear();
  });
}
function Ot(e, t) {
  T(e, t);
  for (const n in e)
    n !== "__file" && !(n in t) && delete e[n];
}
function Ge(e) {
  return (t, n) => {
    try {
      return e(t, n);
    } catch (s) {
      console.error(s), console.warn(
        "[HMR] Something went wrong during Vue component hot-reload. Full reload required."
      );
    }
  };
}
let ne, xe = [];
function nn(e, t) {
  var n, s;
  ne = e, ne ? (ne.enabled = !0, xe.forEach(({ event: r, args: o }) => ne.emit(r, ...o)), xe = []) : /* handle late devtools injection - only do this if we are in an actual */ /* browser environment to avoid the timer handle stalling test runner exit */ /* (#4815) */ typeof window < "u" && // some envs mock window but not fully
  window.HTMLElement && // also exclude jsdom
  // eslint-disable-next-line no-restricted-syntax
  !((s = (n = window.navigator) == null ? void 0 : n.userAgent) != null && s.includes("jsdom")) ? ((t.__VUE_DEVTOOLS_HOOK_REPLAY__ = t.__VUE_DEVTOOLS_HOOK_REPLAY__ || []).push((o) => {
    nn(o, t);
  }), setTimeout(() => {
    ne || (t.__VUE_DEVTOOLS_HOOK_REPLAY__ = null, xe = []);
  }, 3e3)) : xe = [];
}
let R = null, Rr = null;
const Tr = (e) => e.__isTeleport;
function rn(e, t) {
  e.shapeFlag & 6 && e.component ? (e.transition = t, rn(e.component.subTree, t)) : e.shapeFlag & 128 ? (e.ssContent.transition = t.clone(e.ssContent), e.ssFallback.transition = t.clone(e.ssFallback)) : e.transition = t;
}
/*! #__NO_SIDE_EFFECTS__ */
// @__NO_SIDE_EFFECTS__
function Cr(e, t) {
  return N(e) ? (
    // #8236: extend call and options.name access are considered side-effects
    // by Rollup, so we have to wrap it in a pure-annotated IIFE.
    T({ name: e.name }, t, { setup: e })
  ) : e;
}
je().requestIdleCallback;
je().cancelIdleCallback;
const Ir = (e) => !!e.type.__asyncLoader;
function $r(e, t, n = Z, s = !1) {
  if (n) {
    const r = n[e] || (n[e] = []), o = t.__weh || (t.__weh = (...i) => {
      me();
      const c = mn(n), a = dt(t, n, e, i);
      return c(), ve(), a;
    });
    return s ? r.unshift(o) : r.push(o), o;
  } else if (process.env.NODE_ENV !== "production") {
    const r = Tn(pt[e].replace(/ hook$/, ""));
    v(
      `${r} is called when there is no active component instance to be associated with. Lifecycle injection APIs can only be used during execution of setup(). If you are using async setup(), make sure to register lifecycle hooks before the first await statement.`
    );
  }
}
const mt = (e) => (t, n = Z) => {
  (!ge || e === "sp") && $r(e, (...s) => t(...s), n);
}, sn = mt("m"), Pr = mt(
  "bu"
), on = mt("um"), Ar = Symbol.for("v-ndc");
function Mr(e, t, n, s) {
  let r;
  const o = n, i = E(e);
  if (i || $(e)) {
    const c = i && G(e);
    let a = !1;
    c && (a = !V(e), e = Le(e)), r = new Array(e.length);
    for (let u = 0, d = e.length; u < d; u++)
      r[u] = t(
        a ? S(e[u]) : e[u],
        u,
        void 0,
        o
      );
  } else if (typeof e == "number") {
    process.env.NODE_ENV !== "production" && !Number.isInteger(e) && v(`The v-for range expect an integer value but got ${e}.`), r = new Array(e);
    for (let c = 0; c < e; c++)
      r[c] = t(c + 1, c, void 0, o);
  } else if (D(e))
    if (e[Symbol.iterator])
      r = Array.from(
        e,
        (c, a) => t(c, a, void 0, o)
      );
    else {
      const c = Object.keys(e);
      r = new Array(c.length);
      for (let a = 0, u = c.length; a < u; a++) {
        const d = c[a];
        r[a] = t(e[d], d, a, o);
      }
    }
  else
    r = [];
  return r;
}
function Fr(e, t, n = {}, s, r) {
  if (R.ce || R.parent && Ir(R.parent) && R.parent.ce)
    return Ae(), Ct(
      Q,
      null,
      [Et("slot", n, s)],
      64
    );
  let o = e[t];
  process.env.NODE_ENV !== "production" && o && o.length > 1 && (v(
    "SSR-optimized slot function detected in a non-SSR-optimized render function. You need to mark this component with $dynamic-slots in the parent template."
  ), o = () => []), o && o._c && (o._d = !1), Ae();
  const i = o && cn(o(n)), c = n.key || // slot content array of a dynamic conditional slot may have a branch
  // key attached in the `createSlots` helper, respect that
  i && i.key, a = Ct(
    Q,
    {
      key: (c && !oe(c) ? c : `_${t}`) + // #7256 force differentiate fallback content from actual content
      (!i && s ? "_fb" : "")
    },
    i || [],
    i && e._ === 1 ? 64 : -2
  );
  return o && o._c && (o._d = !0), a;
}
function cn(e) {
  return e.some((t) => pn(t) ? !(t.type === un || t.type === Q && !cn(t.children)) : !0) ? e : null;
}
const tt = (e) => e ? ls(e) ? as(e) : tt(e.parent) : null, fe = (
  // Move PURE marker to new line to workaround compiler discarding it
  // due to type annotation
  /* @__PURE__ */ T(/* @__PURE__ */ Object.create(null), {
    $: (e) => e,
    $el: (e) => e.vnode.el,
    $data: (e) => e.data,
    $props: (e) => process.env.NODE_ENV !== "production" ? ye(e.props) : e.props,
    $attrs: (e) => process.env.NODE_ENV !== "production" ? ye(e.attrs) : e.attrs,
    $slots: (e) => process.env.NODE_ENV !== "production" ? ye(e.slots) : e.slots,
    $refs: (e) => process.env.NODE_ENV !== "production" ? ye(e.refs) : e.refs,
    $parent: (e) => tt(e.parent),
    $root: (e) => tt(e.root),
    $host: (e) => e.ce,
    $emit: (e) => e.emit,
    $options: (e) => Wr(e),
    $forceUpdate: (e) => e.f || (e.f = () => {
      _t(e.update);
    }),
    $nextTick: (e) => e.n || (e.n = yr.bind(e.proxy)),
    $watch: (e) => Qr.bind(e)
  })
), Hr = (e) => e === "_" || e === "$", Xe = (e, t) => e !== C && !e.__isScriptSetup && b(e, t), jr = {
  get({ _: e }, t) {
    if (t === "__v_skip")
      return !0;
    const { ctx: n, setupState: s, data: r, props: o, accessCache: i, type: c, appContext: a } = e;
    if (process.env.NODE_ENV !== "production" && t === "__isVue")
      return !0;
    let u;
    if (t[0] !== "$") {
      const p = i[t];
      if (p !== void 0)
        switch (p) {
          case 1:
            return s[t];
          case 2:
            return r[t];
          case 4:
            return n[t];
          case 3:
            return o[t];
        }
      else {
        if (Xe(s, t))
          return i[t] = 1, s[t];
        if (r !== C && b(r, t))
          return i[t] = 2, r[t];
        if (
          // only cache other properties when instance has declared (thus stable)
          // props
          (u = e.propsOptions[0]) && b(u, t)
        )
          return i[t] = 3, o[t];
        if (n !== C && b(n, t))
          return i[t] = 4, n[t];
        i[t] = 0;
      }
    }
    const d = fe[t];
    let l, f;
    if (d)
      return t === "$attrs" ? (w(e.attrs, "get", ""), process.env.NODE_ENV !== "production" && void 0) : process.env.NODE_ENV !== "production" && t === "$slots" && w(e, "get", t), d(e);
    if (
      // css module (injected by vue-loader)
      (l = c.__cssModules) && (l = l[t])
    )
      return l;
    if (n !== C && b(n, t))
      return i[t] = 4, n[t];
    if (
      // global properties
      f = a.config.globalProperties, b(f, t)
    )
      return f[t];
    process.env.NODE_ENV !== "production" && R && (!$(t) || // #1091 avoid internal isRef/isVNode checks on component instance leading
    // to infinite warning loop
    t.indexOf("__v") !== 0) && (r !== C && Hr(t[0]) && b(r, t) ? v(
      `Property ${JSON.stringify(
        t
      )} must be accessed via $data because it starts with a reserved character ("$" or "_") and is not proxied on the render context.`
    ) : e === R && v(
      `Property ${JSON.stringify(t)} was accessed during render but is not defined on instance.`
    ));
  },
  set({ _: e }, t, n) {
    const { data: s, setupState: r, ctx: o } = e;
    return Xe(r, t) ? (r[t] = n, !0) : process.env.NODE_ENV !== "production" && r.__isScriptSetup && b(r, t) ? (v(`Cannot mutate <script setup> binding "${t}" from Options API.`), !1) : s !== C && b(s, t) ? (s[t] = n, !0) : b(e.props, t) ? (process.env.NODE_ENV !== "production" && v(`Attempting to mutate prop "${t}". Props are readonly.`), !1) : t[0] === "$" && t.slice(1) in e ? (process.env.NODE_ENV !== "production" && v(
      `Attempting to mutate public property "${t}". Properties starting with $ are reserved and readonly.`
    ), !1) : (process.env.NODE_ENV !== "production" && t in e.appContext.config.globalProperties ? Object.defineProperty(o, t, {
      enumerable: !0,
      configurable: !0,
      value: n
    }) : o[t] = n, !0);
  },
  has({
    _: { data: e, setupState: t, accessCache: n, ctx: s, appContext: r, propsOptions: o }
  }, i) {
    let c;
    return !!n[i] || e !== C && b(e, i) || Xe(t, i) || (c = o[0]) && b(c, i) || b(s, i) || b(fe, i) || b(r.config.globalProperties, i);
  },
  defineProperty(e, t, n) {
    return n.get != null ? e._.accessCache[t] = 0 : b(n, "value") && this.set(e, t, n.value, null), Reflect.defineProperty(e, t, n);
  }
};
process.env.NODE_ENV !== "production" && (jr.ownKeys = (e) => (v(
  "Avoid app logic that relies on enumerating keys on a component instance. The keys will be empty in production mode to avoid performance overhead."
), Reflect.ownKeys(e)));
function xt(e) {
  return E(e) ? e.reduce(
    (t, n) => (t[n] = null, t),
    {}
  ) : e;
}
function Wr(e) {
  const t = e.type, { mixins: n, extends: s } = t, {
    mixins: r,
    optionsCache: o,
    config: { optionMergeStrategies: i }
  } = e.appContext, c = o.get(t);
  let a;
  return c ? a = c : !r.length && !n && !s ? a = t : (a = {}, r.length && r.forEach(
    (u) => Pe(a, u, i, !0)
  ), Pe(a, t, i)), D(t) && o.set(t, a), a;
}
function Pe(e, t, n, s = !1) {
  const { mixins: r, extends: o } = t;
  o && Pe(e, o, n, !0), r && r.forEach(
    (i) => Pe(e, i, n, !0)
  );
  for (const i in t)
    if (s && i === "expose")
      process.env.NODE_ENV !== "production" && v(
        '"expose" option is ignored when declared in mixins or extends. It should only be declared in the base component itself.'
      );
    else {
      const c = Lr[i] || n && n[i];
      e[i] = c ? c(e[i], t[i]) : t[i];
    }
  return e;
}
const Lr = {
  data: Dt,
  props: Rt,
  emits: Rt,
  // objects
  methods: le,
  computed: le,
  // lifecycle
  beforeCreate: x,
  created: x,
  beforeMount: x,
  mounted: x,
  beforeUpdate: x,
  updated: x,
  beforeDestroy: x,
  beforeUnmount: x,
  destroyed: x,
  unmounted: x,
  activated: x,
  deactivated: x,
  errorCaptured: x,
  serverPrefetch: x,
  // assets
  components: le,
  directives: le,
  // watch
  watch: Ur,
  // provide / inject
  provide: Dt,
  inject: Kr
};
function Dt(e, t) {
  return t ? e ? function() {
    return T(
      N(e) ? e.call(this, this) : e,
      N(t) ? t.call(this, this) : t
    );
  } : t : e;
}
function Kr(e, t) {
  return le(Vt(e), Vt(t));
}
function Vt(e) {
  if (E(e)) {
    const t = {};
    for (let n = 0; n < e.length; n++)
      t[e[n]] = e[n];
    return t;
  }
  return e;
}
function x(e, t) {
  return e ? [...new Set([].concat(e, t))] : t;
}
function le(e, t) {
  return e ? T(/* @__PURE__ */ Object.create(null), e, t) : t;
}
function Rt(e, t) {
  return e ? E(e) && E(t) ? [.../* @__PURE__ */ new Set([...e, ...t])] : T(
    /* @__PURE__ */ Object.create(null),
    xt(e),
    xt(t ?? {})
  ) : t;
}
function Ur(e, t) {
  if (!e) return t;
  if (!t) return e;
  const n = T(/* @__PURE__ */ Object.create(null), e);
  for (const s in t)
    n[s] = x(e[s], t[s]);
  return n;
}
let zr = null;
function Br(e, t, n = !1) {
  const s = Z || R;
  if (s || zr) {
    const r = s ? s.parent == null ? s.vnode.appContext && s.vnode.appContext.provides : s.parent.provides : void 0;
    if (r && e in r)
      return r[e];
    if (arguments.length > 1)
      return n && N(t) ? t.call(s && s.proxy) : t;
    process.env.NODE_ENV !== "production" && v(`injection "${String(e)}" not found.`);
  } else process.env.NODE_ENV !== "production" && v("inject() can only be used inside setup() or functional components.");
}
const qr = {}, ln = (e) => Object.getPrototypeOf(e) === qr, Jr = es, Yr = Symbol.for("v-scx"), Gr = () => {
  {
    const e = Br(Yr);
    return e || process.env.NODE_ENV !== "production" && v(
      "Server rendering context not provided. Make sure to only call useSSRContext() conditionally in the server build."
    ), e;
  }
};
function Xr(e, t, n) {
  return process.env.NODE_ENV !== "production" && !N(t) && v(
    "`watch(fn, options?)` signature has been moved to a separate API. Use `watchEffect(fn, options?)` instead. `watch` now only supports `watch(source, cb, options?) signature."
  ), an(e, t, n);
}
function an(e, t, n = C) {
  const { immediate: s, deep: r, flush: o, once: i } = n;
  process.env.NODE_ENV !== "production" && !t && (s !== void 0 && v(
    'watch() "immediate" option is only respected when using the watch(source, callback, options?) signature.'
  ), r !== void 0 && v(
    'watch() "deep" option is only respected when using the watch(source, callback, options?) signature.'
  ), i !== void 0 && v(
    'watch() "once" option is only respected when using the watch(source, callback, options?) signature.'
  ));
  const c = T({}, n);
  process.env.NODE_ENV !== "production" && (c.onWarn = v);
  const a = t && s || !t && o !== "post";
  let u;
  if (ge) {
    if (o === "sync") {
      const p = Gr();
      u = p.__watcherHandles || (p.__watcherHandles = []);
    } else if (!a) {
      const p = () => {
      };
      return p.stop = J, p.resume = J, p.pause = J, p;
    }
  }
  const d = Z;
  c.call = (p, m, y) => dt(p, d, m, y);
  let l = !1;
  o === "post" ? c.scheduler = (p) => {
    Jr(p, d && d.suspense);
  } : o !== "sync" && (l = !0, c.scheduler = (p, m) => {
    m ? p() : _t(p);
  }), c.augmentJob = (p) => {
    t && (p.flags |= 4), l && (p.flags |= 2, d && (p.id = d.uid, p.i = d));
  };
  const f = hr(e, t, c);
  return ge && (u ? u.push(f) : a && f()), f;
}
function Qr(e, t, n) {
  const s = this.proxy, r = $(e) ? e.includes(".") ? Zr(s, e) : () => s[e] : e.bind(s, s);
  let o;
  N(t) ? o = t : (o = t.handler, n = t);
  const i = mn(this), c = an(r, o.bind(s), n);
  return i(), c;
}
function Zr(e, t) {
  const n = t.split(".");
  return () => {
    let s = e;
    for (let r = 0; r < n.length && s; r++)
      s = s[n[r]];
    return s;
  };
}
const kr = (e) => e.__isSuspense;
function es(e, t) {
  t && t.pendingBranch ? E(e) ? t.effects.push(...e) : t.effects.push(e) : gt(e);
}
const Q = Symbol.for("v-fgt"), ts = Symbol.for("v-txt"), un = Symbol.for("v-cmt"), ns = Symbol.for("v-stc"), De = [];
let P = null;
function Ae(e = !1) {
  De.push(P = e ? null : []);
}
function rs() {
  De.pop(), P = De[De.length - 1] || null;
}
function fn(e) {
  return e.dynamicChildren = P || yn, rs(), P && P.push(e), e;
}
function Tt(e, t, n, s, r, o) {
  return fn(
    vt(
      e,
      t,
      n,
      s,
      r,
      o,
      !0
    )
  );
}
function Ct(e, t, n, s, r) {
  return fn(
    Et(
      e,
      t,
      n,
      s,
      r,
      !0
    )
  );
}
function pn(e) {
  return e ? e.__v_isVNode === !0 : !1;
}
const ss = (...e) => hn(
  ...e
), dn = ({ key: e }) => e ?? null, Ve = ({
  ref: e,
  ref_key: t,
  ref_for: n
}) => (typeof e == "number" && (e = "" + e), e != null ? $(e) || O(e) || N(e) ? { i: R, r: e, k: t, f: !!n } : e : null);
function vt(e, t = null, n = null, s = 0, r = null, o = e === Q ? 0 : 1, i = !1, c = !1) {
  const a = {
    __v_isVNode: !0,
    __v_skip: !0,
    type: e,
    props: t,
    key: t && dn(t),
    ref: t && Ve(t),
    scopeId: Rr,
    slotScopeIds: null,
    children: n,
    component: null,
    suspense: null,
    ssContent: null,
    ssFallback: null,
    dirs: null,
    transition: null,
    el: null,
    anchor: null,
    target: null,
    targetStart: null,
    targetAnchor: null,
    staticCount: 0,
    shapeFlag: o,
    patchFlag: s,
    dynamicProps: r,
    dynamicChildren: null,
    appContext: null,
    ctx: R
  };
  return c ? (bt(a, n), o & 128 && e.normalize(a)) : n && (a.shapeFlag |= $(n) ? 8 : 16), process.env.NODE_ENV !== "production" && a.key !== a.key && v("VNode created with invalid key (NaN). VNode type:", a.type), // avoid a block node from tracking itself
  !i && // has current parent block
  P && // presence of a patch flag indicates this node needs patching on updates.
  // component nodes also should always be patched, because even if the
  // component doesn't need to update, it needs to persist the instance on to
  // the next vnode so that it can be properly unmounted later.
  (a.patchFlag > 0 || o & 6) && // the EVENTS flag is only for hydration and if it is the only flag, the
  // vnode should not be considered dynamic due to handler caching.
  a.patchFlag !== 32 && P.push(a), a;
}
const Et = process.env.NODE_ENV !== "production" ? ss : hn;
function hn(e, t = null, n = null, s = 0, r = null, o = !1) {
  if ((!e || e === Ar) && (process.env.NODE_ENV !== "production" && !e && v(`Invalid vnode type when creating vnode: ${e}.`), e = un), pn(e)) {
    const c = Me(
      e,
      t,
      !0
      /* mergeRef: true */
    );
    return n && bt(c, n), !o && P && (c.shapeFlag & 6 ? P[P.indexOf(e)] = c : P.push(c)), c.patchFlag = -2, c;
  }
  if (bn(e) && (e = e.__vccOpts), t) {
    t = os(t);
    let { class: c, style: a } = t;
    c && !$(c) && (t.class = ot(c)), D(a) && (he(a) && !E(a) && (a = T({}, a)), t.style = We(a));
  }
  const i = $(e) ? 1 : kr(e) ? 128 : Tr(e) ? 64 : D(e) ? 4 : N(e) ? 2 : 0;
  return process.env.NODE_ENV !== "production" && i & 4 && he(e) && (e = h(e), v(
    "Vue received a Component that was made a reactive object. This can lead to unnecessary performance overhead and should be avoided by marking the component with `markRaw` or using `shallowRef` instead of `ref`.",
    `
Component that was made reactive: `,
    e
  )), vt(
    e,
    t,
    n,
    s,
    r,
    i,
    o,
    !0
  );
}
function os(e) {
  return e ? he(e) || ln(e) ? T({}, e) : e : null;
}
function Me(e, t, n = !1, s = !1) {
  const { props: r, ref: o, patchFlag: i, children: c, transition: a } = e, u = t ? cs(r || {}, t) : r, d = {
    __v_isVNode: !0,
    __v_skip: !0,
    type: e.type,
    props: u,
    key: u && dn(u),
    ref: t && t.ref ? (
      // #2078 in the case of <component :is="vnode" ref="extra"/>
      // if the vnode itself already has a ref, cloneVNode will need to merge
      // the refs so the single vnode can be set on multiple refs
      n && o ? E(o) ? o.concat(Ve(t)) : [o, Ve(t)] : Ve(t)
    ) : o,
    scopeId: e.scopeId,
    slotScopeIds: e.slotScopeIds,
    children: process.env.NODE_ENV !== "production" && i === -1 && E(c) ? c.map(_n) : c,
    target: e.target,
    targetStart: e.targetStart,
    targetAnchor: e.targetAnchor,
    staticCount: e.staticCount,
    shapeFlag: e.shapeFlag,
    // if the vnode is cloned with extra props, we can no longer assume its
    // existing patch flag to be reliable and need to add the FULL_PROPS flag.
    // note: preserve flag for fragments since they use the flag for children
    // fast paths only.
    patchFlag: t && e.type !== Q ? i === -1 ? 16 : i | 16 : i,
    dynamicProps: e.dynamicProps,
    dynamicChildren: e.dynamicChildren,
    appContext: e.appContext,
    dirs: e.dirs,
    transition: a,
    // These should technically only be non-null on mounted VNodes. However,
    // they *should* be copied for kept-alive vnodes. So we just always copy
    // them since them being non-null during a mount doesn't affect the logic as
    // they will simply be overwritten.
    component: e.component,
    suspense: e.suspense,
    ssContent: e.ssContent && Me(e.ssContent),
    ssFallback: e.ssFallback && Me(e.ssFallback),
    el: e.el,
    anchor: e.anchor,
    ctx: e.ctx,
    ce: e.ce
  };
  return a && s && rn(
    d,
    a.clone(d)
  ), d;
}
function _n(e) {
  const t = Me(e);
  return E(e.children) && (t.children = e.children.map(_n)), t;
}
function is(e = " ", t = 0) {
  return Et(ts, null, e, t);
}
function bt(e, t) {
  let n = 0;
  const { shapeFlag: s } = e;
  if (t == null)
    t = null;
  else if (E(t))
    n = 16;
  else if (typeof t == "object")
    if (s & 65) {
      const r = t.default;
      r && (r._c && (r._d = !1), bt(e, r()), r._c && (r._d = !0));
      return;
    } else {
      n = 32;
      const r = t._;
      !r && !ln(t) ? t._ctx = R : r === 3 && R && (R.slots._ === 1 ? t._ = 1 : (t._ = 2, e.patchFlag |= 1024));
    }
  else N(t) ? (t = { default: t, _ctx: R }, n = 32) : (t = String(t), s & 64 ? (n = 16, t = [is(t)]) : n = 8);
  e.children = t, e.shapeFlag |= n;
}
function cs(...e) {
  const t = {};
  for (let n = 0; n < e.length; n++) {
    const s = e[n];
    for (const r in s)
      if (r === "class")
        t.class !== s.class && (t.class = ot([t.class, s.class]));
      else if (r === "style")
        t.style = We([t.style, s.style]);
      else if (Sn(r)) {
        const o = t[r], i = s[r];
        i && o !== i && !(E(o) && o.includes(i)) && (t[r] = o ? [].concat(o, i) : i);
      } else r !== "" && (t[r] = s[r]);
  }
  return t;
}
let Z = null;
const gn = () => Z || R;
let nt;
{
  const e = je(), t = (n, s) => {
    let r;
    return (r = e[n]) || (r = e[n] = []), r.push(s), (o) => {
      r.length > 1 ? r.forEach((i) => i(o)) : r[0](o);
    };
  };
  nt = t(
    "__VUE_INSTANCE_SETTERS__",
    (n) => Z = n
  ), t(
    "__VUE_SSR_SETTERS__",
    (n) => ge = n
  );
}
const mn = (e) => {
  const t = Z;
  return nt(e), e.scope.on(), () => {
    e.scope.off(), nt(t);
  };
};
function ls(e) {
  return e.vnode.shapeFlag & 4;
}
let ge = !1;
process.env.NODE_ENV;
function as(e) {
  return e.exposed ? e.exposeProxy || (e.exposeProxy = new Proxy(cr(nr(e.exposed)), {
    get(t, n) {
      if (n in t)
        return t[n];
      if (n in fe)
        return fe[n](e);
    },
    has(t, n) {
      return n in t || n in fe;
    }
  })) : e.proxy;
}
const us = /(?:^|[-_])(\w)/g, fs = (e) => e.replace(us, (t) => t.toUpperCase()).replace(/[-_]/g, "");
function vn(e, t = !0) {
  return N(e) ? e.displayName || e.name : e.name || t && e.__name;
}
function En(e, t, n = !1) {
  let s = vn(t);
  if (!s && t.__file) {
    const r = t.__file.match(/([^/\\]+)\.\w+$/);
    r && (s = r[1]);
  }
  if (!s && e && e.parent) {
    const r = (o) => {
      for (const i in o)
        if (o[i] === t)
          return i;
    };
    s = r(
      e.components || e.parent.type.components
    ) || r(e.appContext.components);
  }
  return s ? fs(s) : n ? "App" : "Anonymous";
}
function bn(e) {
  return N(e) && "__vccOpts" in e;
}
const ps = (e, t) => {
  const n = pr(e, t, ge);
  if (process.env.NODE_ENV !== "production") {
    const s = gn();
    s && s.appContext.config.warnRecursiveComputed && (n._warnRecursive = !0);
  }
  return n;
};
function ds() {
  if (process.env.NODE_ENV === "production" || typeof window > "u")
    return;
  const e = { style: "color:#3ba776" }, t = { style: "color:#1677ff" }, n = { style: "color:#f5222d" }, s = { style: "color:#eb2f96" }, r = {
    __vue_custom_formatter: !0,
    header(l) {
      return D(l) ? l.__isVue ? ["div", e, "VueInstance"] : O(l) ? [
        "div",
        {},
        ["span", e, d(l)],
        "<",
        // avoid debugger accessing value affecting behavior
        c("_value" in l ? l._value : l),
        ">"
      ] : G(l) ? [
        "div",
        {},
        ["span", e, V(l) ? "ShallowReactive" : "Reactive"],
        "<",
        c(l),
        `>${W(l) ? " (readonly)" : ""}`
      ] : W(l) ? [
        "div",
        {},
        ["span", e, V(l) ? "ShallowReadonly" : "Readonly"],
        "<",
        c(l),
        ">"
      ] : null : null;
    },
    hasBody(l) {
      return l && l.__isVue;
    },
    body(l) {
      if (l && l.__isVue)
        return [
          "div",
          {},
          ...o(l.$)
        ];
    }
  };
  function o(l) {
    const f = [];
    l.type.props && l.props && f.push(i("props", h(l.props))), l.setupState !== C && f.push(i("setup", l.setupState)), l.data !== C && f.push(i("data", h(l.data)));
    const p = a(l, "computed");
    p && f.push(i("computed", p));
    const m = a(l, "inject");
    return m && f.push(i("injected", m)), f.push([
      "div",
      {},
      [
        "span",
        {
          style: s.style + ";opacity:0.66"
        },
        "$ (internal): "
      ],
      ["object", { object: l }]
    ]), f;
  }
  function i(l, f) {
    return f = T({}, f), Object.keys(f).length ? [
      "div",
      { style: "line-height:1.25em;margin-bottom:0.6em" },
      [
        "div",
        {
          style: "color:#476582"
        },
        l
      ],
      [
        "div",
        {
          style: "padding-left:1.25em"
        },
        ...Object.keys(f).map((p) => [
          "div",
          {},
          ["span", s, p + ": "],
          c(f[p], !1)
        ])
      ]
    ] : ["span", {}];
  }
  function c(l, f = !0) {
    return typeof l == "number" ? ["span", t, l] : typeof l == "string" ? ["span", n, JSON.stringify(l)] : typeof l == "boolean" ? ["span", s, l] : D(l) ? ["object", { object: f ? h(l) : l }] : ["span", n, String(l)];
  }
  function a(l, f) {
    const p = l.type;
    if (N(p))
      return;
    const m = {};
    for (const y in l.ctx)
      u(p, y, f) && (m[y] = l.ctx[y]);
    return m;
  }
  function u(l, f, p) {
    const m = l[p];
    if (E(m) && m.includes(f) || D(m) && f in m || l.extends && u(l.extends, f, p) || l.mixins && l.mixins.some((y) => u(y, f, p)))
      return !0;
  }
  function d(l) {
    return V(l) ? "ShallowRef" : l.effect ? "ComputedRef" : "Ref";
  }
  window.devtoolsFormatters ? window.devtoolsFormatters.push(r) : window.devtoolsFormatters = [r];
}
const Nn = process.env.NODE_ENV !== "production" ? v : J;
process.env.NODE_ENV;
process.env.NODE_ENV;
/**
* @vue/runtime-dom v3.5.13
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/
let hs;
const It = typeof window < "u" && window.trustedTypes;
if (It)
  try {
    hs = /* @__PURE__ */ It.createPolicy("vue", {
      createHTML: (e) => e
    });
  } catch (e) {
    process.env.NODE_ENV !== "production" && Nn(`Error creating trusted types policy: ${e}`);
  }
process.env.NODE_ENV;
const _s = Symbol(process.env.NODE_ENV !== "production" ? "CSS_VAR_TEXT" : "");
function gs(e) {
  const t = gn();
  if (!t) {
    process.env.NODE_ENV !== "production" && Nn("useCssVars is called without current active component instance.");
    return;
  }
  const n = t.ut = (r = e(t.proxy)) => {
    Array.from(
      document.querySelectorAll(`[data-v-owner="${t.uid}"]`)
    ).forEach((o) => Fe(o, r));
  };
  process.env.NODE_ENV !== "production" && (t.getCssVars = () => e(t.proxy));
  const s = () => {
    const r = e(t.proxy);
    t.ce ? Fe(t.ce, r) : rt(t.subTree, r), n(r);
  };
  Pr(() => {
    gt(s);
  }), sn(() => {
    Xr(s, J, { flush: "post" });
    const r = new MutationObserver(s);
    r.observe(t.subTree.el.parentNode, { childList: !0 }), on(() => r.disconnect());
  });
}
function rt(e, t) {
  if (e.shapeFlag & 128) {
    const n = e.suspense;
    e = n.activeBranch, n.pendingBranch && !n.isHydrating && n.effects.push(() => {
      rt(n.activeBranch, t);
    });
  }
  for (; e.component; )
    e = e.component.subTree;
  if (e.shapeFlag & 1 && e.el)
    Fe(e.el, t);
  else if (e.type === Q)
    e.children.forEach((n) => rt(n, t));
  else if (e.type === ns) {
    let { el: n, anchor: s } = e;
    for (; n && (Fe(n, t), n !== s); )
      n = n.nextSibling;
  }
}
function Fe(e, t) {
  if (e.nodeType === 1) {
    const n = e.style;
    let s = "";
    for (const r in t)
      n.setProperty(`--${r}`, t[r]), s += `--${r}: ${t[r]};`;
    n[_s] = s;
  }
}
/**
* vue v3.5.13
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/
function ms() {
  ds();
}
process.env.NODE_ENV !== "production" && ms();
const vs = /* @__PURE__ */ Cr({
  __name: "InfiniteScroll",
  props: {
    speed: { default: 50 },
    gap: { default: 20 }
  },
  setup(e) {
    gs((p) => ({
      b9d30186: f.value
    }));
    const t = e, { speed: n, gap: s } = lr(t), r = Se(null), o = Se(null), i = Se(0), c = Se(1), a = () => {
      const p = document.querySelector(".scroll-container").offsetWidth, m = document.querySelector(".scroll-content").offsetWidth;
      return console.log(p, m), m === 0 ? 1 : Math.ceil(p / m) * 2;
    };
    let u;
    const d = () => {
      const p = () => {
        var y;
        i.value -= n.value / 60;
        const m = ((y = o.value) == null ? void 0 : y.offsetWidth) || 0;
        Math.abs(i.value) >= m / 2 && (i.value += m / 2), u = requestAnimationFrame(p);
      };
      u = requestAnimationFrame(p);
    }, l = () => {
      cancelAnimationFrame(u);
    }, f = ps(() => t.gap + "px");
    return sn(() => {
      c.value = a(), d();
    }), on(() => {
      l();
    }), (p, m) => (Ae(), Tt("div", {
      class: "scroll-container",
      ref_key: "container",
      ref: r
    }, [
      vt("div", {
        class: "scroll-content",
        ref_key: "scrollContent",
        ref: o,
        style: We({ transform: `translateX(${i.value}px)` })
      }, [
        (Ae(!0), Tt(Q, null, Mr(c.value, (y) => Fr(p.$slots, "default", {}, void 0)), 256))
      ], 4)
    ], 512));
  }
}), Es = (e, t) => {
  const n = e.__vccOpts || e;
  for (const [s, r] of t)
    n[s] = r;
  return n;
}, bs = /* @__PURE__ */ Es(vs, [["__scopeId", "data-v-24d9d9d2"]]);
export {
  bs as default
};
