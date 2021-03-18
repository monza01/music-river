import Vue from "vue";
import "@/assets/style/index.scss";
import VueLazyLoad from "vue-lazyload";
import router from "./router";
import VueCookies from "vue-cookies";
import store from "./store";
import App from "./App.vue";
import Loader from "@/components/loader/Loader";
import globalMixin from "@/utils/globalMixin";
import VueAwesomeSwiper from "vue-awesome-swiper";

Vue.mixin(globalMixin);
Vue.use(VueLazyLoad);
Vue.use(VueCookies);
Vue.use(VueAwesomeSwiper);
Vue.$cookies.config("7d");
Vue.component("Loader", Loader);
Vue.directive("focus", {
  inserted: function(el) {
    el.focus();
  }
});
Vue.prototype.bus = new Vue();
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
