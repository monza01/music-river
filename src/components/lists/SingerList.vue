<template>
  <ul class="singer-list">
    <li class="singer" v-for="(singer, index) in singers" :key="singer.id">
      <div class="index" :class="isTop3(index)">
        {{ indexFormat(index) }}
      </div>
      <img class="avatar" v-lazy="setUrl(singer.img1v1Url, 80, 80)" alt="" />
    </li>
  </ul>
</template>

<script>
import { formatIndex } from "@/utils/utils";

export default {
  name: "SingerList",
  props: {
    singers: Array
  },
  methods: {
    isTop3(index) {
      return index <= 2 ? "top3" : "";
    }
  },
  computed: {
    indexFormat() {
      return function(index) {
        return formatIndex(index);
      };
    }
  }
};
</script>

<style scoped lang="scss">
@import "~@/assets/style/variables.scss";
@import "~@/assets/style/mixin.scss";

.singer {
  display: flex;
  height: 0.9rem;
  padding: 0.05rem 0;
  .index {
    width: 0.27rem;
    text-align: center;
    font-weight: 700;
    line-height: 0.65rem;
    font-size: $font-size-m;
    color: $gray;
  }
  .top3 {
    color: $red;
  }
  .avatar {
    @include box(0.8rem, 0.8rem, 0.05rem);
    margin-left: 0.15rem;
  }
}
</style>
