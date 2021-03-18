<template>
  <div class="banner-wrapper">
    <swiper
      v-if="banners.length"
      class="swiper slider"
      :options="swiperOption"
      @slideChange="slideChange"
      ref="mySwiper"
    >
      <swiper-slide
        v-for="banner in banners"
        :key="banner.id"
        @click.native="slideClicked(banner)"
      >
        <img class="slider-img" :src="banner.pic" alt="" />
        <div class="type-title">{{ banner.typeTitle }}</div>
      </swiper-slide>
      <template v-slot:pagination>
        <div class="swiper-pagination"></div>
      </template>
    </swiper>
  </div>
</template>

<script>
import { mapActions } from "vuex";
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
    ...mapActions(["selectPlay"]),
    slideChange() {
      const activeIndex = this.$refs.mySwiper.$swiper.realIndex;
      this.$emit("sliderChange", activeIndex);
    },
    slideClicked(banner) {
      let arr = [];
      switch (banner.targetType) {
        case 3000:
          window.location = banner.url;
          break;
        case 1:
          arr[0] = banner.song;
          this.selectPlay({
            list: arr,
            index: 0
          });
          break;
        default:
          break;
      }
    }
  }
};
</script>

<style scoped lang="scss">
@import "~@/assets/style/variables.scss";

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
  .type-title {
    position: absolute;
    right: 3%;
    bottom: 0;
    color: $white;
    background-color: $red;
    padding: 0.03rem 0.1rem;
    border-top-left-radius: 0.1rem;
    border-bottom-right-radius: 0.1rem;
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
