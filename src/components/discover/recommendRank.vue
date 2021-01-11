<template>
  <div class="songs-list">
    <h3 class="title">精选榜单</h3>
    <div class="rank-name">
      <div>{{ rankList.name }}</div>
      <div class="play-all">
        <span class="icon-play-circle"></span> 播放全部
      </div>
    </div>
    <loader v-if="!rankList.tracks"></loader>
    <music-list :playList="rankList.tracks"></music-list>
  </div>
</template>

<script>
import MusicList from "@/components/common/music-list/MusicList";

export default {
  name: "recommendRank",
  components: {
    MusicList
  },
  props: {
    rankList: {
      type: Object,
      default: () => {
        return {};
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
    .play-all {
      display: flex;
      align-items: center;
      font-size: $font-size-m;
      .icon-play-circle {
        padding-right: 0.05rem;
        font-size: $font-size-xl;
        color: $theme;
      }
    }
  }
}
</style>
