import { defineComponent as y, useCssVars as x, toRefs as W, ref as c, computed as k, onMounted as F, onUnmounted as I, openBlock as d, createElementBlock as f, createElementVNode as $, normalizeStyle as z, Fragment as A, renderList as M, renderSlot as _ } from "vue";
const q = /* @__PURE__ */ y({
  __name: "InfiniteCarousel",
  props: {
    speed: { default: 50 },
    gap: { default: 20 }
  },
  setup(t) {
    x((e) => ({
      "7d307148": S.value
    }));
    const o = t, { speed: s, gap: p } = W(o), r = c(null), l = c(null), a = c(0), m = c(1), h = () => {
      const e = r.value.offsetWidth, n = l.value.offsetWidth;
      return n === 0 ? 1 : Math.ceil(e / n) * 2;
    };
    let i;
    const C = () => {
      const e = () => {
        var u;
        a.value -= s.value / 60;
        const n = ((u = l.value) == null ? void 0 : u.offsetWidth) || 0;
        Math.abs(a.value) >= n / 2 && (a.value += n / 2), i = requestAnimationFrame(e);
      };
      i = requestAnimationFrame(e);
    }, g = () => {
      cancelAnimationFrame(i);
    }, S = k(() => o.gap + "px");
    return F(() => {
      m.value = h(), C();
    }), I(() => {
      g();
    }), (e, n) => (d(), f("div", {
      class: "scroll-container",
      ref_key: "container",
      ref: r
    }, [
      $("div", {
        class: "scroll-content",
        ref_key: "scrollContent",
        ref: l,
        style: z({ transform: `translateX(${a.value}px)` })
      }, [
        (d(!0), f(A, null, M(m.value, (u) => _(e.$slots, "default", {}, void 0, !0)), 256))
      ], 4)
    ], 512));
  }
}), v = (t, o) => {
  const s = t.__vccOpts || t;
  for (const [p, r] of o)
    s[p] = r;
  return s;
}, b = /* @__PURE__ */ v(q, [["__scopeId", "data-v-a8cc3ec3"]]), B = {}, E = { class: "scroll-item" };
function V(t, o) {
  return d(), f("div", E, [
    _(t.$slots, "default")
  ]);
}
const L = /* @__PURE__ */ v(B, [["render", V]]);
export {
  b as InfiniteCarousel,
  L as InfiniteCarouselItem
};
