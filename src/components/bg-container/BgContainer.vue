<template>
  <div class="bg-container">
    <div class="bg-wrapper">
      <transition name="fade">
        <img
          v-show="bgImgUrl"
          class="bg-img"
          :src="bgImgUrl"
          alt=""
          ref="bgImage"
        />
      </transition>
      <div class="bg-img-wrapper"></div>
    </div>
    <page-title
      :pageTitle="pageTitle"
      :needBackBtn="needBackBtn"
      class="the-page-title"
      ref="theTitle"
    ></page-title>
    <my-scroll
      :remember-scroll="rememberScroll"
      :listenScroll="true"
      @scroll="handleScroll"
      class="my-scroll"
      ref="myScroll"
    >
      <template v-slot:scrollContent>
        <slot class="test"></slot>
      </template>
    </my-scroll>
  </div>
</template>

<script>
import MyScroll from "@/components/scroll/MyScroll";
import PageTitle from "@/components/title/PageTitle";
import { prefixStyle } from "@/utils/dom";
const transform = prefixStyle("transform");
import { paddingMixin } from "@/utils/mixin";

export default {
  mixins: [paddingMixin],
  name: "BgContainer",
  props: {
    bgImgUrl: {
      type: String,
      default: ""
    },
    pageTitle: String,
    needBackBtn: {
      type: Boolean,
      default: true
    },
    titleColor: {
      type: String,
      default: "#000"
    },
    rememberScroll: {
      type: Boolean,
      default: false
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
  watch: {
    scrollY(newVal) {
      let scale = 1;
      if (newVal <= 0) {
        scale = 1 + Math.abs(newVal / this.$refs.bgImage.clientHeight);
      }
      this.$refs.bgImage.style[
        transform
      ] = `translate3d(-10%, -10%, 0) scale(${scale})`;
    }
  }
};
</script>

<style scoped lang="scss">
@import "~@/assets/style/variables.scss";
@import "~@/assets/style/mixin.scss";
@import "~@/assets/style/transition.scss";

.bg-container {
  position: relative;
  height: 100%;
  overflow: hidden;
  .bg-wrapper {
    @include wh(100%, 70%);
    position: absolute;
    top: 0;
    background-color: #bababa;
    .bg-img {
      width: 130%;
      transform: translate3d(-10%, -10%, 0);
      filter: blur(40px);
    }
    .bg-img-wrapper {
      @include wh(100%, 100%);
      @include position();
      background-color: rgba(0, 0, 0, 0.3);
    }
  }

  .the-page-title {
    position: absolute;
    top: 0;
    color: $white;
    width: 100%;
  }
  .my-scroll {
    height: calc(100% - 0.4rem);
    position: absolute;
    top: 0.4rem;
  }
}
</style>
