<template>
  <swiper
    class="swiper slider"
    :options="swiperOption"
    @slideChange="slideChange"
    ref="mySwiper"
  >
    <swiper-slide v-for="banner in banners" :key="banner.id">
      <a :href="banner.url"
        ><img class="slider-img" :src="banner.pic" alt="" /> </a
    ></swiper-slide>

    <template v-slot:pagination>
      <div class="swiper-pagination"></div>
    </template>
  </swiper>
</template>

<script>
import { Swiper, SwiperSlide } from "vue-awesome-swiper";
import "swiper/css/swiper.css";

export default {
  name: "swiper-example-pagination",
  components: {
    Swiper,
    SwiperSlide
  },
  props: {
    banners: {
      type: Array,
      default: null
    }
  },
  data() {
    return {
      swiperOption: {
        pagination: {
          el: ".swiper-pagination",
          bulletClass: "my-bullet",
          bulletActiveClass: "my-bullet-active"
        },
        autoplay: {
          disableOnInteraction: false,
          delay: 5000
        }
      }
    };
  },
  methods: {
    slideChange() {
      let activeIndex = this.$refs.mySwiper.$swiper.activeIndex;
      this.$emit("sliderChange", activeIndex);
    }
  }
};
</script>

<style scoped lang="scss">
.slider {
  a {
    display: block;
    width: 100%;
  }
  .slider-img {
    display: block;
    margin: 0 auto;
    width: 94%;
    border-radius: 0.1rem;
  }
}
</style>

<style lang="scss">
.my-bullet {
  width: 0.1rem;
  height: 0.02rem;
  display: inline-block;
  border-radius: 0.01rem;
  background: #a2a2a2;
  margin: -0.07rem 0.02rem;
}
.my-bullet-active {
  background: #fff;
}
</style>
