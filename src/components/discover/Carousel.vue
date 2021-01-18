<template>
  <div class="banner-wrapper">
    <swiper
      v-if="banners.length"
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
  </div>
</template>

<script>
import { Swiper, SwiperSlide } from "vue-awesome-swiper";
import "swiper/css/swiper.css";
export default {
  name: "Slider",
  props: {
    banners: {
      type: Array,
      default: () => {
        return [];
      }
    }
  },
  components: {
    Swiper,
    SwiperSlide
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
        },
        loop: true
      }
    };
  },
  methods: {
    slideChange() {
      const activeIndex = this.$refs.mySwiper.$swiper.realIndex;
      this.$emit("sliderChange", activeIndex);
    }
  }
};
</script>

<style scoped lang="scss">
.banner-wrapper {
  height: 1.55rem;
}
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
@import "~@/assets/style/variables.scss";
@import "~@/assets/style/mixin.scss";

.my-bullet {
  @include box(0.1rem, 0.02rem, 0.01rem);
  display: inline-block;
  background: $gray;
  margin: -0.07rem 0.02rem;
}
.my-bullet-active {
  background: #fff;
}
</style>
