import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import { Api } from "@/common/api";
import constants from "@/common/constants";

Vue.config.productionTip = false;
Vue.prototype.$telegram = window.Telegram.WebApp;
Vue.prototype.$constants = constants;
Vue.prototype.$api = new Api();

new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App),
}).$mount("#app");
