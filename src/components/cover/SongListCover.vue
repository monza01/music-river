<template>
  <div @click="coverClicked(detail.id)">
    <div class="cover">
      <img
        v-if="detail.coverImgUrl"
        v-lazy="setUrl(detail.coverImgUrl, 105, 105)"
        alt=""
      />
      <img v-else v-lazy="setUrl(detail.picUrl, 105, 105)" alt="" />
      <div v-if="subMsgType === 'playCount'" class="play-count icon-play">
        {{ formatPlayCount }}
      </div>
      <div v-else class="play-count">{{ detail.updateFrequency }}</div>
    </div>
    <div class="title">{{ detail.name }}</div>
  </div>
</template>

<script>
import { numberFormat } from "@/utils/utils";
export default {
  name: "Cover",
  props: {
    detail: Object,
    subMsgType: {
      type: String,
      default: "playCount"
    }
  },
  computed: {
    formatPlayCount() {
      return numberFormat(this.detail.playCount);
    }
  },
  methods: {
    coverClicked(id) {
      this.bus.$emit("coverClicked", id);
    }
  }
};
</script>

<style scoped lang="scss">
@import "~@/assets/style/variables.scss";
@import "~@/assets/style/mixin.scss";

.cover {
  @include box(0.9rem, 1.08rem, 0.1rem);
  position: relative;
  left: 0.1rem;
  background-color: rgba(0, 0, 0, 0.15);
  margin-top: 0.1rem;
  img {
    @include position(0.04rem, -0.06rem);
    @include box(1.05rem, $radius: 0.1rem);
  }
  .play-count {
    @include height(0.16rem);
    position: absolute;
    top: 0.08rem;
    right: -0.05rem;
    font-size: $font-size-xs;
    border-radius: 0.08rem;
    background-color: rgba(0, 0, 0, 0.3);
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
  padding-left: 0.03rem;
}
</style>
