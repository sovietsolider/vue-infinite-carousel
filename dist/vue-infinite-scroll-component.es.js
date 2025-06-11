import { defineComponent as F, useCssVars as I, toRefs as $, computed as h, ref as i, onMounted as z, nextTick as A, onUnmounted as T, openBlock as v, createElementBlock as p, createElementVNode as q, normalizeStyle as w, Fragment as B, renderList as E, renderSlot as g } from "vue";
const M = /* @__PURE__ */ F({
  __name: "InfiniteCarousel",
  props: {
    speed: { default: 50 },
    gap: { default: 20 },
    direction: { default: "left" },
    initialTranslate: { default: 0 }
  },
  setup(n) {
    I((e) => ({
      "11a3f518": x.value
    }));
    const l = n, { speed: c, gap: u, direction: o } = $(l), y = h(() => o.value === "right" ? 1 : -1), f = i(null), r = i(null), t = i(l.initialTranslate), m = i(1), S = () => {
      if (!f.value || !r.value) return 1;
      const e = f.value.offsetWidth, a = r.value.offsetWidth;
      return a === 0 ? 1 : Math.ceil(e / a) * 2;
    };
    let d;
    const k = () => {
      const e = () => {
        var _;
        t.value += y.value * (c.value / 60);
        const s = (((_ = r.value) == null ? void 0 : _.offsetWidth) || 0) / 2;
        o.value === "left" && t.value <= -s && (t.value += s), o.value === "right" && t.value >= 0 && (t.value -= s), d = requestAnimationFrame(e);
      };
      d = requestAnimationFrame(e);
    }, W = () => cancelAnimationFrame(d), x = h(() => u.value + "px");
    return z(() => {
      m.value = S(), A(() => {
        var e;
        if (o.value === "right") {
          const a = ((e = r.value) == null ? void 0 : e.offsetWidth) || 0;
          t.value = -a / 2;
        }
        k();
      });
    }), T(() => {
      W();
    }), (e, a) => (v(), p("div", {
      class: "scroll-container",
      ref_key: "container",
      ref: f
    }, [
      q("div", {
        class: "scroll-content",
        ref_key: "scrollContent",
        ref: r,
        style: w({ transform: `translateX(${t.value}px)` })
      }, [
        (v(!0), p(B, null, E(m.value, (s) => g(e.$slots, "default", { key: s }, void 0, !0)), 128))
      ], 4)
    ], 512));
  }
}), C = (n, l) => {
  const c = n.__vccOpts || n;
  for (const [u, o] of l)
    c[u] = o;
  return c;
}, O = /* @__PURE__ */ C(M, [["__scopeId", "data-v-1e6af309"]]), V = {}, X = { class: "scroll-item" };
function L(n, l) {
  return v(), p("div", X, [
    g(n.$slots, "default")
  ]);
}
const R = /* @__PURE__ */ C(V, [["render", L]]);
export {
  O as InfiniteCarousel,
  R as InfiniteCarouselItem
};
