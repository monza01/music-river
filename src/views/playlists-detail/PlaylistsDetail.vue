<template>
  <div class="detail-page container">
    <bg-container :page-title="pageTitle" :bgImgUrl="playList.coverImgUrl">
      <template>
        <div class="content">
          <playlist-summary :playlistsDetail="playList"></playlist-summary>
          <div class="list-detail">
            <loader v-if="loading"></loader>
            <div v-else class="list-content">
              <div class="list-header">
                <play-all-button :music-list="tracks.songs"></play-all-button>
                <span class="count">（{{ tracks.songs.length }}首）</span>
              </div>
              <music-list
                :special-index="specialIndex"
                :playList="tracks.songs"
                @select="selectItem"
                :current-playing="currentPlaying"
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
import PlayAllButton from "@/views/common/PlayAllButton";
import { getPlaylist, getSongDetail } from "@/api/common";
import { mapActions, mapGetters } from "vuex";

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
    MusicList,
    PlayAllButton
  },
  created() {
    this.fetchData();
    this.setListType();
  },
  methods: {
    ...mapActions(["selectPlay"]),
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
    },
    selectItem(item, index) {
      this.selectPlay({
        list: this.tracks.songs,
        index
      });
    }
  },
  computed: {
    ...mapGetters(["playlist", "currentIndex"]),
    pageTitle() {
      return this.listType === "musicList" ? "歌单" : "排行榜";
    },
    specialIndex() {
      return this.listType !== "musicList";
    },
    currentPlaying() {
      if (this.playlist.length > 0 && this.tracks.songs) {
        return this.tracks.songs.findIndex(item => {
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
@import "~@/assets/style/mixin.scss";

.list-detail {
  width: 100%;
  min-height: 11rem;
  background-color: $gray-light;
  border-top-left-radius: 0.2rem;
  border-top-right-radius: 0.2rem;
  padding: 0 0.15rem;
  .list-content {
    position: relative;
    .list-header {
      display: flex;
      height: 0.35rem;
      .count {
        font-size: $font-size-xs;
        color: $gray;
        font-weight: 700;
        line-height: 0.35rem;
      }
    }
  }
}
</style>
