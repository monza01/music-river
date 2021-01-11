<template>
  <div>
    <div class="cover">
      <img v-lazy="imgURL" alt="" />
      <div class="play-count icon-play">{{ formatPlayCount }}</div>
    </div>
    <div class="title">{{ title }}</div>
  </div>
</template>

<script>
import { numberFormat } from "@/utils/utils";
export default {
  name: "Cover",
  props: {
    imgURL: {
      type: String,
      default: ""
    },
    title: {
      type: String,
      default: ""
    },
    playCount: {
      type: Number,
      default: 0
    }
  },
  computed: {
    formatPlayCount() {
      return numberFormat(this.playCount);
    }
  }
};
</script>

<style scoped lang="scss">
@import "~@/assets/style/variables.scss";
@import "~@/assets/style/mixin.scss";

.cover {
  position: relative;
  left: 0.1rem;
  width: 0.9rem;
  height: 1.1rem;
  background-color: $gray-light;
  margin-top: 0.1rem;
  border-radius: 0.1rem;
  img {
    position: absolute;
    top: 0.04rem;
    left: -0.06rem;
    width: 1.05rem;
    border-radius: 0.1rem;
  }
  .play-count {
    position: absolute;
    top: 0.08rem;
    right: -0.05rem;
    font-size: $font-size-xs;
    height: 0.14rem;
    line-height: 0.14rem;
    border-radius: 0.07rem;
    background-color: $gray;
    padding: 0 0.05rem;
    color: $white;
  }
}
.title {
  margin-top: 0.05rem;
  text-indent: 0.02rem;
  width: 1.1rem;
  @include no-wrap;
}
</style>
