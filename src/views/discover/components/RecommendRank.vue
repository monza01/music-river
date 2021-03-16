<template>
  <div class="songs-list">
    <h3 class="title">精选榜单</h3>
    <div class="rank-name">
      <div>{{ rankList.name }}</div>
      <play-all-button :music-list="rankList.tracks"></play-all-button>
    </div>
    <loader class="the-loader" v-if="!rankList.tracks"></loader>
    <music-list
      @select="selectItem"
      :cover="true"
      :playList="rankList.tracks"
      :current-playing="currentPlaying"
    ></music-list>
  </div>
</template>

<script>
import MusicList from "@/components/lists/MusicList";
import { mapActions, mapGetters } from "vuex";
import PlayAllButton from "@/views/common/PlayAllButton";

export default {
  name: "recommendRank",
  components: {
    MusicList,
    PlayAllButton
  },
  props: {
    rankList: Object
  },
  methods: {
    ...mapActions(["selectPlay"]),
    selectItem(item, index) {
      this.selectPlay({
        list: this.rankList.tracks,
        index
      });
    }
  },
  computed: {
    ...mapGetters(["playlist", "currentIndex"]),
    currentPlaying() {
      if (this.playlist.length > 0 && this.rankList.tracks) {
        return this.rankList.tracks.findIndex(item => {
          return item.id === this.playlist[this.currentIndex].id;
        });
      } else {
        return -1;
      }
    }
  }
};
</script>

<style scoped lang="scss">
@import "~@/assets/style/variables.scss";

.songs-list {
  padding: 0.1rem 0.15rem;
  border-radius: 0.1rem;
  background-color: $white;
  .title {
    text-align: center;
    padding: 0.05rem 0.1rem 0.1rem 0.1rem;
    margin: 0 0.15rem 0.05rem 0;
    border-bottom: 1px solid $gray-light;
  }
  .rank-name {
    display: flex;
    justify-content: space-between;
    padding: 0.05rem 0.15rem 0.1rem 0;
    font-size: $font-size-l;
    font-weight: 500;
  }
  .the-loader {
    height: 2rem;
  }
}
</style>
