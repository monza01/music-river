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
  @include box(0.9rem, 1.1rem, 0.1rem);
  position: relative;
  left: 0.1rem;
  background-color: $gray-light;
  margin-top: 0.1rem;
  img {
    @include position(0.04rem, -0.06rem);
    @include box(1.05rem, $radius: 0.1rem);
  }
  .play-count {
    @include height(0.14rem);
    position: absolute;
    top: 0.08rem;
    right: -0.05rem;
    font-size: $font-size-xs;
    border-radius: 0.07rem;
    background-color: $gray;
    padding: 0 0.05rem;
    color: $white;
  }
}
.title {
  @include no-wrap;
  margin-top: 0.05rem;
  text-indent: 0.02rem;
  width: 1.1rem;
}
</style>
