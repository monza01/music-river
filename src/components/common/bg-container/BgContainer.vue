<template>
  <div class="bg-container container">
    <div class="bgImg" :style="bgStyle" ref="bgImage"></div>
    <page-title
      :pageTitle="pageTitle"
      :needBackBtn="needBackBtn"
      class="the-page-title"
      ref="test"
    ></page-title>
    <scroll :listenScroll="true" @scroll="handleScroll" class="scroll-wrapper">
      <slot></slot>
    </scroll>
  </div>
</template>

<script>
import Scroll from "@/components/common/scroll/Scroll";
import PageTitle from "@/components/common/title/PageTitle";
import { prefixStyle } from "@/utils/dom";
const transform = prefixStyle("transform");

export default {
  name: "BgContainer",
  props: {
    bgImgUrl: String,
    pageTitle: String,
    needBackBtn: Boolean
  },
  data() {
    return {
      scrollY: 0
    };
  },
  components: {
    Scroll,
    PageTitle
  },
  methods: {
    handleScroll(pos) {
      this.scrollY = pos.y;
    }
  },
  computed: {
    bgStyle() {
      return `background-image:url(${this.bgImgUrl})`;
    }
  },
  mounted() {
    this.imageHeight = this.$refs.bgImage.clientHeight;
  },
  watch: {
    scrollY(newVal) {
      let scale = 1;
      let opacity = 1;
      let num = 255;
      const percent = Math.abs(newVal / this.imageHeight);
      if (newVal > 0) {
        scale = 1 + percent;
      } else {
        opacity = Math.max(0.4, 1 - percent);
        num = Math.max(0, Math.floor(255 * (1 - percent)));
      }
      this.$refs.bgImage.style[transform] = `scale(${scale})`;
      this.$refs.bgImage.style.opacity = opacity;
      this.$refs.test.$el.style.color = `rgb(${num},${num},${num})`;
    }
  }
};
</script>

<style scoped lang="scss">
@import "~@/assets/style/variables.scss";
@import "~@/assets/style/mixin.scss";

.bg-container {
  position: relative;
  .bgImg {
    width: 100%;
    height: 0;
    padding-top: 2.5rem;
    transform-origin: top;
    background-size: cover;
  }
  .the-page-title {
    position: absolute;
    top: 0;
    width: 100%;
    color: $white;
  }
  .scroll-wrapper {
    position: absolute;
    top: 0.4rem;
    padding-bottom: 0.4rem;
    overflow: hidden;
  }
}
</style>
