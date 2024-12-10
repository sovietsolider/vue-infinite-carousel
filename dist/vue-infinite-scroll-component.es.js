import { defineComponent as y, useCssVars as x, toRefs as W, ref as c, computed as k, onMounted as F, onUnmounted as I, openBlock as f, createElementBlock as d, createElementVNode as $, normalizeStyle as z, Fragment as A, renderList as M, renderSlot as _ } from "vue";
const q = /* @__PURE__ */ y({
  __name: "InfiniteCarousel",
  props: {
    speed: { default: 50 },
    gap: { default: 20 }
  },
  setup(n) {
    x((e) => ({
      39969280: S.value
    }));
    const o = n, { speed: s, gap: p } = W(o), r = c(null), l = c(null), a = c(0), m = c(1), h = () => {
      const e = r.value.offsetWidth, t = l.value.offsetWidth;
      return console.log(e, t), t === 0 ? 1 : Math.ceil(e / t) * 2;
    };
    let i;
    const g = () => {
      const e = () => {
        var u;
        a.value -= s.value / 60;
        const t = ((u = l.value) == null ? void 0 : u.offsetWidth) || 0;
        Math.abs(a.value) >= t / 2 && (a.value += t / 2), i = requestAnimationFrame(e);
      };
      i = requestAnimationFrame(e);
    }, C = () => {
      cancelAnimationFrame(i);
    }, S = k(() => o.gap + "px");
    return F(() => {
      m.value = h(), g();
    }), I(() => {
      C();
    }), (e, t) => (f(), d("div", {
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
        (f(!0), d(A, null, M(m.value, (u) => _(e.$slots, "default", {}, void 0, !0)), 256))
      ], 4)
    ], 512));
  }
}), v = (n, o) => {
  const s = n.__vccOpts || n;
  for (const [p, r] of o)
    s[p] = r;
  return s;
}, b = /* @__PURE__ */ v(q, [["__scopeId", "data-v-460a92c4"]]), B = {}, E = { class: "scroll-item" };
function V(n, o) {
  return f(), d("div", E, [
    _(n.$slots, "default")
  ]);
}
const L = /* @__PURE__ */ v(B, [["render", V]]);
export {
  b as InfiniteCarousel,
  L as InfiniteCarouselItem
};
