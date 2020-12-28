<template>
  <div class="discover">
    <Header :bgImg="currentImgURL"></Header>
    <Carousel
      class="carousel"
      :banners="banners"
      @sliderChange="getCurrentImgURL"
    ></Carousel>
  </div>
</template>

<script>
import { getBanner } from "@/api/discover";
import Header from "@/components/discover/Header";
import Carousel from "@/components/common/carousel/Carousel";

export default {
  name: "Discover",
  data() {
    return {
      banners: [],
      currentImgURL: ""
    };
  },
  components: {
    Header,
    Carousel
  },
  created() {
    this.getBannerData();
  },
  methods: {
    getBannerData() {
      getBanner()
        .then(res => {
          this.banners = res.data.banners;
        })
        .catch(err => {
          console.log(err);
        });
    },
    getCurrentImgURL(index) {
      this.currentImgURL = this.banners[index].pic;
    }
  },
  watch: {
    banners() {
      this.currentImgURL = this.banners[0].pic;
    }
  }
};
</script>

<style scoped lang="scss">
.carousel {
  margin-top: 0.1rem;
}
</style>
