<template>
  <div class="playlist">
    <div class="title">
      <span @click="close" class="icon-angle-left"></span> 正在播放...
    </div>
    <my-scroll class="my-scroll">
      <template v-slot:scrollContent>
        <music-list
          :play-list="sequenceList"
          :show-cover="false"
          @select="selectItem"
          :special-index="false"
          :current-playing="currentPlaying"
        ></music-list>
      </template>
    </my-scroll>
  </div>
</template>

<script>
import MusicList from "@/components/lists/MusicList";
import MyScroll from "@/components/scroll/MyScroll";
import { mapActions, mapGetters } from "vuex";

export default {
  name: "Playlist",
  components: {
    MusicList,
    MyScroll
  },
  methods: {
    ...mapActions(["selectPlay"]),
    close() {
      this.$emit("close");
    },
    selectItem(item, index) {
      this.selectPlay({
        list: this.sequenceList,
        index
      });
    }
  },
  computed: {
    ...mapGetters(["sequenceList", "playlist", "currentIndex"]),
    currentPlaying() {
      return this.sequenceList.findIndex(item => {
        return item.id === this.playlist[this.currentIndex].id;
      });
    }
  }
};
</script>

<style scoped lang="scss">
@import "~@/assets/style/variables.scss";
@import "~@/assets/style/mixin.scss";

.playlist {
  position: absolute;
  @include wh(80%, 100%);
  background-color: $white;
  z-index: 999;
  .title {
    padding: 0.1rem 0;
    text-align: center;
    font-size: $font-size-l;
    font-weight: 700;
    .icon-angle-left {
      padding: 0.1rem;
      position: absolute;
      left: 0.05rem;
      top: -0.1rem;
      font-size: 36px;
    }
  }
  .my-scroll {
    height: calc(100% - 0.4rem);
  }
}
</style>
