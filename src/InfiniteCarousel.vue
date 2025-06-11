<template>
  <div class="scroll-container" ref="container">
    <div
      class="scroll-content"
      ref="scrollContent"
      :style="{ transform: `translateX(${translateX}px)` }"
    >
      <slot v-for="index in copySize" :key="index"></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  ref,
  computed,
  onMounted,
  onUnmounted,
  toRefs,
  withDefaults,
  defineProps,
  nextTick,
} from "vue";

interface Props {
  speed?: number;
  gap?: number;
  direction?: "left" | "right";
  /** Начальное смещение в пикселях */
  initialTranslate?: number;
}

const props = withDefaults(defineProps<Props>(), {
  gap: 20,
  speed: 50,
  direction: "left",
  initialTranslate: 0,
});

// Деструктурируем все props, включая initialTranslate
const { speed, gap, direction, initialTranslate } = toRefs(props);

/** Множитель направления: влево −1, вправо +1 */
const directionFactor = computed(() => (direction.value === "right" ? 1 : -1));

const container = ref<HTMLDivElement | null>(null);
const scrollContent = ref<HTMLDivElement | null>(null);
/** Текущее смещение, стартуем с initialTranslate */
const translateX = ref(initialTranslate.value);
const copySize = ref(1);

const calculateCopySize = () => {
  if (!container.value || !scrollContent.value) return 1;
  const cw = container.value.offsetWidth;
  const sw = scrollContent.value.offsetWidth;
  if (sw === 0) return 1;
  // столько копий, чтобы контент дважды перекрывал контейнер
  return Math.ceil(cw / sw) * 2;
};

let animationFrame: number;
const startScrolling = () => {
  const step = () => {
    translateX.value += directionFactor.value * (speed.value / 60);
    const totalW = scrollContent.value?.offsetWidth || 0;
    const half = totalW / 2;
    const offset = initialTranslate.value;

    // «Заворачиваем» с учётом initialTranslate
    if (direction.value === "left" && translateX.value <= -half + offset) {
      translateX.value += half;
    }
    if (direction.value === "right" && translateX.value >= offset) {
      translateX.value -= half;
    }

    animationFrame = requestAnimationFrame(step);
  };
  animationFrame = requestAnimationFrame(step);
};

const stopScrolling = () => cancelAnimationFrame(animationFrame);
const gapCSS = computed(() => gap.value + "px");

onMounted(() => {
  copySize.value = calculateCopySize();
  nextTick(() => {
    const totalW = scrollContent.value?.offsetWidth || 0;
    const half = totalW / 2;

    // Устанавливаем стартовое смещение с учётом направления
    if (direction.value === "right") {
      translateX.value = -half + initialTranslate.value;
    } else {
      translateX.value = initialTranslate.value;
    }

    startScrolling();
  });
});

onUnmounted(() => {
  stopScrolling();
});
</script>

<style scoped>
.scroll-container {
  width: 100%;
  overflow: hidden;
  position: relative;
  z-index: 10;
}

.scroll-content {
  display: flex;
  white-space: nowrap;
  will-change: transform;
  width: fit-content;
}

/* Элементы прокрутки должны иметь класс scroll-item */
::v-deep(.scroll-item) {
  flex-shrink: 0;
  /* Лучше через inline-стиль или CSS-переменную,
     но оставим ваш вариант с v-bind */
  padding-right: v-bind("gapCSS");
  white-space: nowrap;
}
</style>
