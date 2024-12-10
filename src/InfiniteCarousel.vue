<template>
  <div class="scroll-container" ref="container">
    <div
      class="scroll-content"
      ref="scrollContent"
      :style="{ transform: `translateX(${translateX}px)` }"
    >
      <slot v-for="index in copySize"></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, toRefs } from "vue";

interface Props {
  speed?: number;
  gap?: number;
}

const props = withDefaults(defineProps<Props>(), {gap: 20, speed: 50});
const { speed, gap } = toRefs(props);


// Refs
const container = ref<HTMLDivElement | null>(null);
const scrollContent = ref<HTMLDivElement | null>(null);
const translateX = ref(0);
const copySize = ref(1)

const calculateCopySize = () => {
  const containerWidth = (container.value as HTMLDivElement).offsetWidth;
  const contentWidth = (scrollContent.value as HTMLDivElement).offsetWidth;

  if(contentWidth === 0) {
    return 1
  }
  return Math.ceil(containerWidth / contentWidth) * 2
}

let animationFrame: number;

const startScrolling = () => {
  const step = () => {
    translateX.value -= speed.value / 60; // (~60 FPS)

    const contentWidth = scrollContent.value?.offsetWidth || 0;
    if (Math.abs(translateX.value) >= contentWidth / 2) {
      translateX.value += contentWidth / 2;
    }

    animationFrame = requestAnimationFrame(step);
  };

  animationFrame = requestAnimationFrame(step);
};

const stopScrolling = () => {
  cancelAnimationFrame(animationFrame);
};

const gapCSS = computed(() => {
  return props.gap + 'px'
})

onMounted(() => {
  copySize.value = calculateCopySize()
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
  height: 50px;
  z-index: 10;
}

.scroll-content {
  display: flex;
  white-space: nowrap;
  will-change: transform;
  width: fit-content;
}

::v-deep(.scroll-item) {
  flex-shrink: 0;
  padding-right: v-bind("gapCSS");
  white-space: nowrap;
}
</style>
