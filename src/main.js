import Vue from "vue";
import App from "./App.vue";
import store from "./store";
import "bootstrap/dist/css/bootstrap.css";
Vue.config.productionTip = false;
import Loading from "vue-loading-overlay";
import "vue-loading-overlay/dist/vue-loading.css";
Vue.component("Loading", Loading);
new Vue({
  store,
  render: (h) => h(App),
}).$mount("#app");
