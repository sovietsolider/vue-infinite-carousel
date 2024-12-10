# Infinite carousel for Vue 3
This package allows you to implement infinite scrolling for any of your Vue components.


![alt text](https://s7.gifyu.com/images/SJWBO.gif "Logo Title Text 1")

## Usage

### Use globally:
In `main.ts `
```js
import {VueInfiniteScroll, VueInfiniteScrollItem} from 'vue-infinite-carousel'
import "vue-infinite-carousel/dist/vue-infinite-carousel.css" 

const app = createApp(App);
app.component("VueInfiniteScroll", VueInfiniteScroll);
app.component("VueInfiniteScrollItem", VueInfiniteScrollItem);
app.mount("#app");
```
```html
<script setup>
// ...
const items = ref(["Item 1", "Item 2", "Item 3"]);
// ...
</script>

<template>
  <VueInfiniteScroll :gap="20" :speed="50">
    <template v-for="item in items">
      <VueInfiniteScrollItem>
        {{ item }}
      </VueInfiniteScrollItem>
    </template>
  </VueInfiniteScroll>
</template>
```
### Use locally:
```html
<script setup>
import {VueInfiniteScroll, VueInfiniteScrollItem} from 'vue-infinite-carousel'
import "vue-infinite-carousel/dist/vue-infinite-carousel.css" 
// ...
const items = ref(["Item 1", "Item 2", "Item 3"]);
// ...
</script>

<template>
  <VueInfiniteScroll :gap="20" :speed="50">
    <template v-for="item in items">
      <VueInfiniteScrollItem>
        {{ item }}
      </VueInfiniteScrollItem>
    </template>
  </VueInfiniteScroll>
</template>
```

## Available props
* **Speed** - speed of scroll (Default value: **50**)
* **Gap** - padding-right of each element (Default value: **20**)