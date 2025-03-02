import "./assets/main.css";

import { createApp } from "vue";
import { createPinia } from "pinia";

import App from "./App.vue";
import router from "./router";
import { VueFire } from "vuefire";
import { firebaseApp } from "./lib/firebase";

const app = createApp(App);

app.use(VueFire, {
  firebaseApp,
});
app.use(createPinia());
app.use(router);

app.mount("#app");
