<template>
  <div class="bg-container">
    <div class="bgImg" :style="bgStyle" ref="bgImage"></div>
    <page-title
      :pageTitle="pageTitle"
      :needBackBtn="needBackBtn"
      class="the-page-title"
      ref="theTitle"
    ></page-title>
    <my-scroll :listenScroll="true" @scroll="handleScroll" class="my-scroll">
      <template v-slot:scrollContent>
        <slot></slot>
      </template>
    </my-scroll>
  </div>
</template>

<script>
import MyScroll from "@/components/scroll/MyScroll";
import PageTitle from "@/components/title/PageTitle";
import { prefixStyle } from "@/utils/dom";
const transform = prefixStyle("transform");

export default {
  name: "BgContainer",
  props: {
    bgImgUrl: {
      type: String,
      default:
        "http://p1.music.126.net/XUF-8AwX4s5h7gIByOz1Yg==/109951165666497079.jpg"
    },
    pageTitle: String,
    needBackBtn: Boolean,
    titleColor: {
      type: String,
      default: "#000"
    }
  },
  data() {
    return {
      scrollY: 0
    };
  },
  components: {
    MyScroll,
    PageTitle
  },
  methods: {
    handleScroll(pos) {
      this.scrollY = pos;
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
      if (newVal >= 0) {
        opacity = Math.max(0.4, 1 - percent);
        num = Math.max(0, Math.floor(255 * (1 - percent)));
      } else {
        scale = 1 + percent;
      }
      this.$refs.bgImage.style[transform] = `scale(${scale})`;
      this.$refs.bgImage.style.opacity = opacity;
      this.$refs.theTitle.$el.style.color = `rgb(${num},${num},${num})`;
    }
  }
};
</script>

<style scoped lang="scss">
@import "~@/assets/style/variables.scss";
@import "~@/assets/style/mixin.scss";

.bg-container {
  position: relative;
  height: 100%;
  .bgImg {
    @include wh(100%, 0);
    position: absolute;
    padding-top: 2.5rem;
    transform-origin: top;
    background-size: cover;
  }
  .the-page-title {
    color: $white;
  }
  .my-scroll {
    height: calc(100% - 0.4rem);
  }
}
</style>
