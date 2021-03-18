module.exports = {
  productionSourceMap: false,
  configureWebpack: {
    externals: {
      vue: "Vue",
      "vue-router": "VueRouter",
      vuex: "Vuex",
      swiper: "Swiper",
      "vue-awesome-swiper": "VueAwesomeSwiper"
    }
  }
};
