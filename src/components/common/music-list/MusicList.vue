<template>
  <ul class="list">
    <li class="item" v-for="(item, index) in playList" :key="item.id">
      <div
        class="wrapper"
        @click="setAnimate(index)"
        :class="currentIndex === index ? 'click-animate' : ''"
      >
        <img class="cover" v-lazy="item.al.picUrl" alt="" />
        <div class="index" :class="isTop3(index)">
          {{ indexFormat(index) }}
        </div>
        <div class="msg">
          <p class="song-name">{{ item.name }}</p>
          <div class="sub-msg">
            <span v-for="(artist, index) in item.ar" :key="index"
              >{{ artist.name }}<span v-if="item.ar.length > index + 1">/</span>
            </span>
          </div>
        </div>
        <span class="icon-report"></span>
        <span class="icon-dots-three-vertical"></span>
      </div>
    </li>
  </ul>
</template>

<script>
import { formatIndex } from "@/utils/utils";

export default {
  name: "MusicList",
  data() {
    return {
      currentIndex: -1
    };
  },
  props: {
    playList: {
      type: Array,
      default: () => {
        return [];
      }
    }
  },
  computed: {
    indexFormat() {
      return function(index) {
        return formatIndex(index);
      };
    },
    isTop3() {
      return function(index) {
        return index <= 2 ? "top3" : "";
      };
    }
  },
  methods: {
    setAnimate(index) {
      let timer = null;
      clearTimeout(timer);
      this.currentIndex = index;
      timer = setTimeout(() => {
        this.currentIndex = -1;
      }, 300);
    }
  }
};
</script>

<style scoped lang="scss">
@import "~@/assets/style/variables.scss";
@import "~@/assets/style/mixin.scss";

.item {
  height: 0.7rem;
}
.wrapper {
  height: 0.7rem;
  padding-bottom: 0.1rem;
  display: flex;
  .cover {
    width: 0.6rem;
    border-radius: 0.1rem;
  }
  .index {
    margin-left: 0.1rem;
    line-height: 0.6rem;
    font-weight: 700;
    font-size: $font-size-m;
    border-bottom: 1px solid $gray-light;
  }
  .top3 {
    color: $red;
  }
  .msg {
    width: 55%;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    padding: 0.1rem 0.15rem;
    border-bottom: 1px solid $gray-light;
    .song-name {
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      font-size: $font-size-m;
      line-height: 0.18rem;
      font-weight: 500;
    }
    .sub-msg {
      @include no-wrap;
      font-size: $font-size-s;
      line-height: 0.16rem;
      color: $gray-deep;
    }
  }
}
.icon-report {
  font-size: $font-size-l;
  line-height: 0.6rem;
  color: $yellow;
}
.icon-dots-three-vertical {
  margin-left: 0.2rem;
  padding: 0 0.05rem;
  font-size: $font-size-s;
  line-height: 0.6rem;
  color: $gray;
}

.click-animate {
  animation-name: clicked;
  animation-duration: 0.3s;
}

@keyframes clicked {
  50% {
    transform: scale(0.9);
  }

  100% {
    transform: scale(1);
  }
}
</style>
