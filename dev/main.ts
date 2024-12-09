import { createApp } from "vue";
import App from "./App.vue";
import VueInfiniteScroll from '../src/InfiniteScroll.vue' // Подключение вашего компонента

const app = createApp(App);
app.component("VueInfiniteScroll", VueInfiniteScroll);
app.mount("#app");
