<template>
  <div class="rank-summary">
    <the-title class="the-title" title="排行榜"></the-title>
    <swiper class="swiper" :options="swiperOption">
      <swiper-slide v-for="(item, index) in rankData" :key="index">
        <Top3 :listData="item"></Top3>
      </swiper-slide>
    </swiper>
  </div>
</template>

<script>
import TheTitle from "@/components/common/title/Title";
import Top3 from "@/components/discover/Top3";
import { Swiper, SwiperSlide } from "vue-awesome-swiper";
import "swiper/css/swiper.css";

export default {
  name: "RankSummary",
  data() {
    return {
      swiperOption: {
        slidesPerView: "auto",
        spaceBetween: 10,
        centeredSlides: true
      }
    };
  },
  components: {
    TheTitle,
    Top3,
    Swiper,
    SwiperSlide
  },
  props: {
    rankData: {
      type: Array,
      default: () => {
        return [];
      }
    }
  }
};
</script>

<style scoped lang="scss">
@import "~@/assets/style/variables.scss";

.rank-summary {
  height: 1.65rem;
  padding: 0.05rem 0;
  background-color: $white;
  border-radius: 0.1rem;
  .the-title {
    padding: 0.05rem 0.25rem;
  }
  .swiper-slide {
    width: 90%;
  }
}
</style>
