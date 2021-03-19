module.exports = {
  productionSourceMap: false,
  publicPath: process.env.NODE_ENV === "production" ? "./" : "/",
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
