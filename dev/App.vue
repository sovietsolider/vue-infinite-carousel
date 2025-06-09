<template>
  <div>
    <VueInfiniteScroll :gap="20" :speed="10" direction="left">
      <template v-for="item in items">
        <VueInfiniteScrollItem>
          {{ item }}
        </VueInfiniteScrollItem>
      </template>
    </VueInfiniteScroll>
  </div>
</template>

<script setup>
import { ref } from "vue";
import VueInfiniteScrollItem from "../src/InfiniteCarouselItem.vue";

const items = ref(["Item 1", "Item 2", "Item 3"]);
</script>

<style scoped>
h1 {
  text-align: center;
}

.item {
  background: #2196f3;
  color: white;
  padding: 10px;
  border-radius: 5px;
}
</style>
