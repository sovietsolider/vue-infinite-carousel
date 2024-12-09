import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

export default defineConfig({
  plugins: [vue()],
  build: {
    lib: {
      entry: "./src/index.ts",
      name: "VueInfiniteScrollComponent",
      fileName: (format) => `vue-infinite-scroll-component.${format}.js`,
    },
  },
});
