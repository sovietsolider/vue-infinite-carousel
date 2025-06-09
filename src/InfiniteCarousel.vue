<template>
  <div class="scroll-container" ref="container">
    <div
      class="scroll-content"
      ref="scrollContent"
      :style="{ transform: `translateX(${translateX}px)`, gap: gapCSS }"
    >
      <slot v-for="index in copySize" :key="index" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, toRefs, nextTick } from "vue";

interface Props {
  speed?: number;
  gap?: number;
  direction?: "left" | "right";
}

const props = withDefaults(defineProps<Props>(), {
  gap: 20,
  speed: 50,
  direction: "left",
});
const { speed, gap, direction } = toRefs(props);

// Refs
const container = ref<HTMLElement | null>(null);
const scrollContent = ref<HTMLElement | null>(null);
const translateX = ref(0);
const copySize = ref(1);

// Compute copies needed to fill twice the container width
const calculateCopySize = () => {
  const containerWidth = container.value?.offsetWidth || 0;
  const singleWidth = scrollContent.value?.children[0]?.clientWidth || 0;
  if (!singleWidth) return 1;
  const needed = Math.ceil(containerWidth / singleWidth);
  return needed * 2;
};

let animationFrame: number;

const startScrolling = () => {
  const step = () => {
    const move = speed.value / 60;
    translateX.value += direction.value === "left" ? -move : move;

    const contentWidth = scrollContent.value?.offsetWidth || 0;
    const threshold = contentWidth / 2;

    if (direction.value === "left") {
      if (Math.abs(translateX.value) >= threshold) {
        translateX.value += threshold;
      }
    } else {
      if (translateX.value >= threshold) {
        translateX.value -= threshold;
      }
    }

    animationFrame = requestAnimationFrame(step);
  };

  animationFrame = requestAnimationFrame(step);
};

const stopScrolling = () => {
  cancelAnimationFrame(animationFrame);
};

const gapCSS = computed(() => `${gap.value}px`);

onMounted(async () => {
  // Wait for slot content to render
  await nextTick();
  copySize.value = calculateCopySize();

  // For right direction, start from middle to have items on both sides
  const contentWidth = scrollContent.value?.offsetWidth || 0;
  if (direction.value === "right") {
    translateX.value = -contentWidth / 2;
  }

  startScrolling();
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
}

::v-deep(.scroll-item) {
  flex-shrink: 0;
  white-space: nowrap;
}
</style>
