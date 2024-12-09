import { defineComponent as h, useCssVars as y, toRefs as C, ref as l, computed as x, onMounted as W, onUnmounted as k, openBlock as f, createElementBlock as m, createElementVNode as F, normalizeStyle as q, Fragment as z, renderList as A, renderSlot as M } from "vue";
const b = /* @__PURE__ */ h({
  __name: "InfiniteScroll",
  props: {
    speed: { default: 50 },
    gap: { default: 20 }
  },
  setup(n) {
    y((e) => ({
      b9d30186: g.value
    }));
    const o = n, { speed: r, gap: u } = C(o), s = l(null), d = l(null), c = l(0), p = l(1), v = () => {
      const e = document.querySelector(".scroll-container").offsetWidth, t = document.querySelector(".scroll-content").offsetWidth;
      return console.log(e, t), t === 0 ? 1 : Math.ceil(e / t) * 2;
    };
    let a;
    const _ = () => {
      const e = () => {
        var i;
        c.value -= r.value / 60;
        const t = ((i = d.value) == null ? void 0 : i.offsetWidth) || 0;
        Math.abs(c.value) >= t / 2 && (c.value += t / 2), a = requestAnimationFrame(e);
      };
      a = requestAnimationFrame(e);
    }, S = () => {
      cancelAnimationFrame(a);
    }, g = x(() => o.gap + "px");
    return W(() => {
      p.value = v(), _();
    }), k(() => {
      S();
    }), (e, t) => (f(), m("div", {
      class: "scroll-container",
      ref_key: "container",
      ref: s
    }, [
      F("div", {
        class: "scroll-content",
        ref_key: "scrollContent",
        ref: d,
        style: q({ transform: `translateX(${c.value}px)` })
      }, [
        (f(!0), m(z, null, A(p.value, (i) => M(e.$slots, "default", {}, void 0, !0)), 256))
      ], 4)
    ], 512));
  }
}), B = (n, o) => {
  const r = n.__vccOpts || n;
  for (const [u, s] of o)
    r[u] = s;
  return r;
}, I = /* @__PURE__ */ B(b, [["__scopeId", "data-v-24d9d9d2"]]);
export {
  I as default
};
