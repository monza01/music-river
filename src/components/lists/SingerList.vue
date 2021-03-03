<template>
  <ul class="singer-list">
    <li
      @click="handleClick(singer.id)"
      class="singer"
      v-for="(singer, index) in singers"
      :key="singer.id"
    >
      <div class="index" :class="isTop3(index)">
        {{ indexFormat(index) }}
        <div class="compare">
          <span :class="difference(singer.lastRank, index)">
            <span class="num">{{
              Math.abs(singer.lastRank - index) || "-"
            }}</span></span
          >
        </div>
      </div>
      <img class="avatar" v-lazy="setUrl(singer.img1v1Url, 80, 80)" alt="" />
      <div class="msg">
        <div class="name">{{ singer.name }}</div>
        <div class="album-size">歌曲 ：{{ singer.musicSize }} 首</div>
        <div class="score">
          <span class="icon-fire"></span>{{ singer.score }}
        </div>
      </div>
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
    },
    handleClick(id) {
      this.$emit("singerClicked", id);
    }
  },
  computed: {
    indexFormat() {
      return function(index) {
        return formatIndex(index);
      };
    },
    difference() {
      return function(lastRank, index) {
        if (lastRank > index) {
          return "icon-triangle-up up";
        } else if (lastRank < index) {
          return "icon-triangle-down down";
        } else {
          return "";
        }
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
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 0.3rem;
    text-align: center;
    font-weight: 700;
    font-size: $font-size-m;
    color: $gray;
    .compare {
      position: relative;
      display: flex;
      justify-content: center;
      color: $gray;
      padding: 0.1rem 0.1rem 0 0;
    }
    .up {
      color: $red;
    }
    .down {
      color: $theme;
    }
    .num {
      position: absolute;
      font-size: $font-size-xs;
      font-weight: 400;
      top: 0.11rem;
    }
  }
  .top3 {
    color: $red;
  }
  .avatar {
    @include box(0.8rem, 0.8rem, 0.05rem);
    margin: 0 0.15rem 0 0.05rem;
  }
  .msg {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    padding: 0.05rem 0;
    .name {
      font-size: $font-size-m;
      font-weight: 700;
    }
    .score {
      color: $gray;
      .icon-fire {
        margin-right: 0.05rem;
      }
    }
  }
}
</style>
