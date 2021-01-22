import Vue from "vue";
import VueLazyLoad from "vue-lazyload";
import router from "./router";
import VueCookies from "vue-cookies";
import store from "./store";
import App from "./App.vue";
import Loader from "@/components/common/loader/Loader";
import "@/assets/style/index.scss";

Vue.use(VueLazyLoad);
Vue.use(VueCookies);
Vue.$cookies.config("7d");
Vue.component("Loader", Loader);
Vue.directive("focus", {
  inserted: function(el) {
    el.focus();
  }
});

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
