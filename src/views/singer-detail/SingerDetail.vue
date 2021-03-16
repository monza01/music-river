<template>
  <div class="singer-detail container">
    <bg-container :page-title="artist.name" :bg-img-url="artist.cover">
      <template>
        <div class="content">
          <singer-card class="the-singer-card" :profile="artist"></singer-card>
          <div class="list-detail">
            <loader v-if="loading"></loader>
            <div v-else class="list-content">
              <play-all-button
                text="随机播放 50"
                :music-list="singerTopSongs"
              ></play-all-button>
              <music-list
                :playList="singerTopSongs"
                :special-index="false"
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
import SingerCard from "@/views/singer-detail/components/SingerCard";
import MusicList from "@/components/lists/MusicList";
import PlayAllButton from "@/views/common/PlayAllButton";
import { getSingerDetail, getSingerTopSongs } from "@/api/common";
import { mapActions, mapGetters } from "vuex";

export default {
  name: "SingerDetail",
  data() {
    return {
      artist: {},
      loading: true,
      singerTopSongs: []
    };
  },
  components: {
    BgContainer,
    SingerCard,
    MusicList,
    PlayAllButton
  },
  created() {
    this.getSingerDetail();
    this.getSingerTopSongs();
  },
  methods: {
    ...mapActions(["selectPlay"]),
    getSingerDetail() {
      getSingerDetail({
        id: this.$route.params.id
      }).then(res => {
        this.artist = res.data.artist;
      });
    },
    getSingerTopSongs() {
      getSingerTopSongs({ id: this.$route.params.id }).then(res => {
        this.singerTopSongs = res.songs;
        this.loading = false;
      });
    },
    selectItem(item, index) {
      this.selectPlay({
        list: this.singerTopSongs,
        index
      });
    }
  },
  computed: {
    ...mapGetters(["playlist", "currentIndex"]),
    currentPlaying() {
      if (this.playlist.length > 0) {
        return this.singerTopSongs.findIndex(item => {
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

.content {
  padding: 0.3rem 0 0.2rem;
  margin-top: 1rem;
  min-height: calc(100% - 1rem);
  background-color: $gray-light;
  border-top-left-radius: 0.2rem;
  border-top-right-radius: 0.2rem;
  .the-singer-card {
    position: absolute;
    top: 0.6rem;
  }
}
.list-detail {
  width: 100%;
  min-height: 5rem;
  background-color: $gray-light;
  border-top-left-radius: 0.2rem;
  border-top-right-radius: 0.2rem;
  padding: 0.35rem 0.15rem 0;
}
.play-all {
  display: flex;
  align-items: center;
  font-size: $font-size-l;
  font-weight: 700;
  padding: 0.15rem 0;
  .icon-play-circle {
    padding-right: 0.05rem;
    font-size: $font-size-xl;
    color: $theme;
  }
}
</style>
