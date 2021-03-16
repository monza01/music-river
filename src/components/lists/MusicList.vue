<template>
  <ul class="list">
    <li
      class="item"
      @click="selectItem(item, index)"
      v-for="(item, index) in playList"
      :key="index"
    >
      <div
        class="wrapper"
        @click="setAnimate(index)"
        :class="currentIndex === index ? 'click-animate' : ''"
      >
        <img
          v-if="showCover"
          class="cover-img"
          v-lazy="setUrl(item.al.picUrl, 40, 40)"
          alt=""
        />
        <div class="index" :class="isTop3(index)">
          {{ indexFormat(index) }}
        </div>
        <div class="msg" :class="setMsgClass(index)">
          <p class="song-name">{{ item.name }}</p>
          <div class="sub-msg" :class="setMsgClass(index)">
            <span v-if="item.copyright" class="copyright">VIP</span>
            <span v-for="(artist, index) in item.ar" :key="index"
              >{{ artist.name }}<span v-if="item.ar.length > index + 1">/</span>
            </span>
            <span> - {{ item.al.name }}</span>
          </div>
        </div>
        <span
          v-if="setIconClass(index)"
          class="playing-icon"
          :class="setIconClass(index)"
        ></span>
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
    playList: Array,
    specialIndex: {
      type: Boolean,
      default: true
    },
    showCover: {
      type: Boolean,
      default: true
    },
    currentPlaying: Number
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
    },
    selectItem(item, index) {
      this.$emit("select", item, index);
    },
    setIconClass(index) {
      return this.currentPlaying === index ? "icon-audiotrack" : "";
    },
    setMsgClass(index) {
      return this.currentPlaying === index ? "playing" : "";
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
  position: relative;
  height: 0.6rem;
  padding-bottom: 0.1rem;
  .cover-img {
    @include box(0.4rem, 0.4rem, 0.1rem);
    margin-top: 0.03rem;
  }
  .index {
    width: 0.27rem;
    text-align: center;
    line-height: 0.5rem;
    font-weight: 700;
    font-size: $font-size-m;
    color: $gray;
    margin-left: 0.05rem;
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
      height: 18px;
    }
    .sub-msg {
      @include no-wrap;
      font-size: $font-size-s;
      color: $gray-deep;
      height: 0.15rem;
      .copyright {
        @include border($theme);
        @include height(0.14rem);
        display: inline-block;
        padding: 0 0.03rem;
        margin-right: 0.05rem;
        border-radius: 0.04rem;
        color: $theme;
        font-size: 10px;
        text-align: center;
      }
    }
  }
}
.playing-icon {
  width: 0.25rem;
  font-size: 26px;
  line-height: 0.6rem;
  color: $theme;
  animation-name: playing;
  animation-duration: 1s;
  animation-iteration-count: infinite;
}

.playing {
  color: $theme !important;
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

@keyframes playing {
  50% {
    transform: scale(0.5);
  }
  100% {
    transform: scale(1);
  }
}
</style>
