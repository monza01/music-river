<template>
  <div class="play-all" @click="playAll">
    <span class="icon-shuffle"></span> {{ text }}
  </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "PlayAllButton",
  props: {
    text: {
      type: String,
      default: "随机播放"
    },
    musicList: Array
  },
  methods: {
    ...mapActions(["randomPlay"]),
    playAll() {
      this.randomPlay({
        list: this.musicList
      });
    }
  }
};
</script>

<style scoped lang="scss">
@import "~@/assets/style/variables.scss";

.play-all {
  display: flex;
  align-items: center;
  font-size: $font-size-m;
  .icon-shuffle {
    padding-right: 0.05rem;
    font-size: $font-size-xl;
    color: $theme;
  }
}
</style>
