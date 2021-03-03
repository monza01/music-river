<template>
  <div class="recommend-song-list">
    <the-title title="为你推荐" link="/playlists"></the-title>
    <div class="outer-wrapper">
      <div class="wrapper">
        <loader v-if="!recommendSongList.length"></loader>
        <div class="covers">
          <Cover
            class="item"
            v-for="item in recommendSongList"
            :key="item.id"
            :detail="item"
          >
          </Cover>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import TheTitle from "@/components/title/Title";
import Cover from "@/components/cover/SongListCover";
export default {
  name: "RecommendSongList",
  props: {
    recommendSongList: {
      type: Array,
      default: () => {
        return [];
      }
    }
  },
  components: {
    Cover,
    TheTitle
  }
};
</script>

<style scoped lang="scss">
@import "~@/assets/style/variables.scss";

.recommend-song-list {
  background-color: $white;
  padding: 0.15rem 0.15rem 0.15rem 0.1rem;
  margin-top: 0.1rem;
  border-radius: 0.1rem;
  .outer-wrapper {
    height: 3.2rem;
    overflow-y: hidden;
    .wrapper {
      height: 3.4rem;
      overflow-y: hidden;
      .covers {
        display: flex;
        width: 189%;
        flex-wrap: wrap;
      }
    }
  }
}
</style>
