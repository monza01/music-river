<template>
  <div>
    <div class="cover">
      <img v-lazy="detail.coverImgUrl || detail.picUrl" alt="" />
      <div class="play-count icon-play">{{ formatPlayCount }}</div>
    </div>
    <div class="title">{{ detail.name }}</div>
  </div>
</template>

<script>
import { numberFormat } from "@/utils/utils";
export default {
  name: "Cover",
  props: {
    detail: Object
  },
  computed: {
    formatPlayCount() {
      return numberFormat(this.detail.playCount);
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
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  width: 1.1rem;
  height: 0.32rem;
  line-height: 0.18rem;
  margin-top: 0.05rem;
  padding-left: 0.02rem;
}
</style>
