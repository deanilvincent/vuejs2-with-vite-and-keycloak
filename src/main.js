import Vue from "vue";
import { createPinia, PiniaVuePlugin } from "pinia";
import authentication from "./plugin";
import App from "./App.vue";
import router from "./router";

import "./assets/main.css";

Vue.use(PiniaVuePlugin);

Vue.use(authentication);

Vue.$keycloak
  .init({ onLoad: "login-required", checkLoginIframe: false })
  .then(() => {
    new Vue({
      router,
      pinia: createPinia(),
      render: (h) => h(App),
    }).$mount("#app");
  });
