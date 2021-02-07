<template>
  <ul class="list">
    <li class="item" v-for="(item, index) in playList" :key="item.id">
      <div
        class="wrapper"
        @click="setAnimate(index)"
        :class="currentIndex === index ? 'click-animate' : ''"
      >
        <img class="cover-img" v-lazy="setUrl(item.al.picUrl, 40, 40)" alt="" />
        <div class="index" :class="isTop3(index)">
          {{ indexFormat(index) }}
        </div>
        <div class="msg">
          <p class="song-name">{{ item.name }}</p>
          <div class="sub-msg">
            <span v-if="item.copyright" class="copyright">VIP</span>
            <span v-for="(artist, index) in item.ar" :key="index"
              >{{ artist.name }}<span v-if="item.ar.length > index + 1">/</span>
            </span>
            <span> - {{ item.al.name }}</span>
          </div>
        </div>
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
    },
    specialIndex: {
      type: Boolean,
      default: true
    },
    cover: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    indexFormat() {
      return function(index) {
        return formatIndex(index);
      };
    }
  },
  methods: {
    setAnimate(index) {
      if (timer) {
        clearTimeout(timer);
      }
      this.currentIndex = index;
      const timer = setTimeout(() => {
        this.currentIndex = -1;
      }, 300);
    },
    isTop3(index) {
      if (this.specialIndex) {
        return index <= 2 ? "top3" : "";
      }
    }
  }
};
</script>

<style scoped lang="scss">
@import "~@/assets/style/variables.scss";
@import "~@/assets/style/mixin.scss";

.item {
  height: 0.6rem;
}
.wrapper {
  display: flex;
  justify-content: space-between;
  height: 0.6rem;
  padding-bottom: 0.1rem;
  .cover-img {
    @include box(0.4rem, 0.4rem, 0.1rem);
    margin-right: 0.05rem;
    margin-top: 0.03rem;
  }
  .index {
    width: 0.27rem;
    text-align: center;
    line-height: 0.5rem;
    font-weight: 700;
    font-size: $font-size-m;
    color: $gray;
  }
  .top3 {
    color: $red;
  }
  .msg {
    display: flex;
    width: 70%;
    flex-direction: column;
    justify-content: space-around;
    padding: 0 0.1rem 0 0.1rem;
    .song-name {
      @include no-wrap;
      font-size: $font-size-m;
      font-weight: 500;
    }
    .sub-msg {
      @include no-wrap;
      font-size: $font-size-s;
      color: $gray-deep;
      height: 0.15rem;
      .copyright {
        @include border($red);
        @include height(0.14rem);
        display: inline-block;
        padding: 0 0.03rem;
        margin-right: 0.05rem;
        border-radius: 0.04rem;
        color: $red;
        font-size: 10px;
        text-align: center;
      }
    }
  }
}

.icon-dots-three-vertical {
  font-size: $font-size-s;
  line-height: 0.6rem;
  color: $gray;
  padding: 0 0.1rem;
}

.click-animate {
  animation-name: clicked;
  animation-duration: 0.2s;
}

@keyframes clicked {
  50% {
    transform: scale(0.95);
  }

  100% {
    transform: scale(1);
  }
}
</style>
