<template>
  <div class="detail-page container">
    <bg-container :page-title="pageTitle" :bgImgUrl="playList.coverImgUrl">
      <template>
        <div class="content">
          <playlist-summary :playlistsDetail="playList"></playlist-summary>
          <div class="buttons">
            <div class="collect">
              收藏歌单 <span class="icon-folder-plus"></span>
            </div>
            <div class="border"></div>
            <div class="play-all">
              播放全部 <span class="icon-play-circle"></span>
            </div>
          </div>
          <div class="list-detail">
            <loader v-if="loading"></loader>
            <div v-else class="list-content">
              <span class="count">（{{ tracks.songs.length }}首）</span>
              <music-list
                :special-index="specialIndex"
                :playList="tracks.songs"
              ></music-list>
            </div>
          </div>
        </div>
      </template>
    </bg-container>
  </div>
</template>

<script>
import BgContainer from "@/components/bg-container/BgContainer";
import PlaylistSummary from "@/views/playlists-detail/components/PlaylistSummary";
import MusicList from "@/components/lists/MusicList";
import { getPlaylist, getSongDetail } from "@/api/common";

export default {
  name: "PlaylistsDetail",
  data() {
    return {
      playList: {},
      tracks: {},
      listType: "musicList",
      loading: true
    };
  },
  components: {
    BgContainer,
    PlaylistSummary,
    MusicList
  },
  created() {
    this.fetchData();
    this.setListType();
  },
  methods: {
    async fetchData() {
      const playlistData = await getPlaylist({
        id: this.$route.params.id
      });
      this.playList = playlistData.playlist;
      if (this.listType === "musicList") {
        let trackIds = [];
        this.playList.trackIds.forEach(item => {
          trackIds.push(item.id);
        });
        const tracksIdStr = trackIds.join(",");
        this.tracks = await getSongDetail({
          ids: tracksIdStr
        });
      } else {
        this.$set(this.tracks, "songs", this.playList.tracks);
      }
      this.loading = false;
    },
    setListType() {
      if (this.$route.query.type === "music-lists") {
        this.listType = "musicList";
      } else {
        this.listType = "rank";
      }
    }
  },
  computed: {
    pageTitle() {
      return this.listType === "musicList" ? "歌单" : "排行榜";
    },
    specialIndex() {
      return this.listType !== "musicList";
    }
  }
};
</script>

<style scoped lang="scss">
@import "~@/assets/style/variables.scss";
@import "~@/assets/style/mixin.scss";

.buttons {
  @include box(2.6rem, 0.4rem, 0.2rem);
  @include position(1.65rem, 50%);
  display: flex;
  justify-content: space-around;
  margin-left: -1.3rem;
  background-color: #fff;
  font-size: $font-size-m;
  font-weight: 700;
  line-height: 0.4rem;
  color: $gray-deep;
  .border {
    width: 1px;
    height: 0.2rem;
    background-color: #d7d7d7;
    margin-top: 0.1rem;
  }
  .collect,
  .play-all {
    flex: 1;
    position: relative;
    padding-left: 0.2rem;
    span {
      @include position(0.08rem, 0.88rem);
      color: $theme;
      font-size: $font-size-xl;
    }
  }
}
.list-detail {
  width: 100%;
  min-height: 5rem;
  background-color: $gray-light;
  border-top-left-radius: 0.2rem;
  border-top-right-radius: 0.2rem;
  padding: 0.35rem 0.15rem 0;
  .list-content {
    position: relative;
    .count {
      @include position(-0.15rem, -0.15rem);
      font-size: $font-size-xs;
      color: $gray;
      font-weight: 700;
    }
  }
}
</style>
