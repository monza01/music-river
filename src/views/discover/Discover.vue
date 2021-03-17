<template>
  <div class="discover-container">
    <loader v-if="loading"></loader>
    <transition name="slide">
      <playlist v-if="showPlaylist" @close="closePlaylist"></playlist>
    </transition>
    <transition name="fade-fast">
      <div v-if="showPlaylist" class="wrapper" @click="closePlaylist"></div>
    </transition>
    <my-scroll
      :remember-scroll="true"
      :listen-scroll="listenScroll"
      @scroll="handleScroll"
    >
      <template v-if="!loading" v-slot:scrollContent>
        <div class="discover" ref="discover">
          <div class="head">
            <header-of-discover
              class="header"
              @loginClicked="loginClicked"
              @avatarClicked="avatarClicked"
              @searchClicked="searchClicked"
              @listIconClicked="listIconClicked"
              :avatar="logged ? userAvatar : ''"
            ></header-of-discover>
            <img class="header-bg" :src="currentImgURL" width="100%" alt="" />
            <carousel
              class="carousel"
              :banners="banners"
              @sliderChange="getCurrentImgURL"
            ></carousel>
          </div>
          <navigation class="nav"></navigation>
          <div class="line"></div>
          <chosen-song-list
            :tags="tags"
            :chosenSongList="chosenSongList"
            @tagClicked="changeTag"
          ></chosen-song-list>
          <rank-summary
            class="rank-summary"
            :rankData="rankData"
          ></rank-summary>
          <recommend-song-list
            ref="recommendSL"
            :recommendSongList="recommendSongList"
          ></recommend-song-list>
          <recommend-rank
            class="recommend-rank"
            :rankList="rankPlayList"
            ref="recommendRank"
          ></recommend-rank>
          <div v-if="rankPlayList.tracks" class="bottom">
            <span class="refresh" @click="refresh">换一批新内容</span>
          </div>
        </div>
      </template>
    </my-scroll>
  </div>
</template>

<script>
import axios from "axios";
import {
  getChosenSongs,
  getRecommendSongList,
  getRankSummary
} from "@/api/common";
import { getPlaylist, getBanner } from "@/api/common";
import { randomNum } from "@/utils/utils";
import MyScroll from "@/components/scroll/MyScroll";
import HeaderOfDiscover from "@/views/discover/components/HeaderOfDiscover";
import Carousel from "@/views/discover/components/Carousel";
import Navigation from "@/views/discover/components/Navigation";
import RecommendSongList from "@/views/discover/components/RecommendSongList";
import ChosenSongList from "@/views/discover/components/ChosenSongList";
import RankSummary from "@/views/discover/components/RankSummary";
import RecommendRank from "@/views/discover/components/RecommendRank";
import Playlist from "@/views/common/Playlist";
import { mapGetters } from "vuex";
import { routerMixin } from "@/utils/mixin";

export default {
  mixins: [routerMixin],
  name: "Discover",
  components: {
    MyScroll,
    HeaderOfDiscover,
    Carousel,
    Navigation,
    RecommendSongList,
    ChosenSongList,
    RankSummary,
    RecommendRank,
    Playlist
  },
  data() {
    return {
      loading: false,
      showPlaylist: false,
      banners: [],
      currentImgURL: "",
      recommendSongList: [],
      chosenSongList: {},
      tags: ["欧美", "华语", "流行", "民谣", "摇滚", "说唱"],
      currentTag: 0,
      rankCategory: [3779629, 3778678, 60198, 11641012],
      rankData: [],
      rankPlayList: {},
      flag1: false,
      flag2: false,
      listenScroll: true
    };
  },
  created() {
    this.getFirstPageData();
  },
  updated() {
    const windowHeight = window.innerHeight;
    this.pos1 = this.$refs.recommendSL.$el.offsetTop - windowHeight - 20;
    this.pos2 = this.$refs.recommendRank.$el.offsetTop - windowHeight - 20;
    if (this.pos1 <= 0) {
      this.flag1 = true;
      this.getRecommendSongList();
    }
    if (this.pos2 <= 0) {
      this.flag2 = true;
      this.getRankPlayList();
    }
  },
  methods: {
    getFirstPageData() {
      this.loading = true;
      axios
        .all([
          getBanner(),
          getChosenSongs({
            limit: 6,
            cat: this.tags[this.currentTag],
            offset: randomNum(0, 200)
          }),
          getRankSummary()
        ])
        .then(
          axios.spread((bannerData, chosenSongListData, rankSummaryData) => {
            this.banners = bannerData.banners;
            this.$set(
              this.chosenSongList,
              this.currentTag,
              chosenSongListData.playlists
            );
            this.rankData = rankSummaryData.list.slice(0, 4);
            this.loading = false;
          })
        );
    },
    getChosenSongList() {
      if (!this.chosenSongList[this.currentTag]) {
        getChosenSongs({
          limit: 6,
          cat: this.tags[this.currentTag],
          offset: randomNum(0, 200)
        }).then(res => {
          this.$set(this.chosenSongList, this.currentTag, res.playlists);
        });
      }
    },
    getRecommendSongList() {
      getRecommendSongList({ limit: 12 }).then(res => {
        this.recommendSongList = res.result;
      });
    },
    getRankPlayList() {
      const num = randomNum(0, 3);
      const rankId = this.rankCategory[num];
      getPlaylist({ id: rankId }).then(res => {
        this.rankPlayList = res.playlist;
        this.rankPlayList.tracks = this.rankPlayList.tracks.slice(0, 20);
      });
    },
    listIconClicked() {
      this.showPlaylist = true;
    },
    closePlaylist() {
      this.showPlaylist = false;
    },
    loginClicked() {
      this.$router.push("/login").catch(err => err);
    },
    avatarClicked() {
      this.$router.push("/profile").catch(err => err);
    },
    searchClicked() {
      this.$router.push("/search").catch(err => err);
    },
    getCurrentImgURL(index) {
      if (timer) {
        clearTimeout(timer);
      }
      const timer = setTimeout(() => {
        this.currentImgURL = this.banners[index].pic;
      }, 300);
    },
    changeTag(currentTag) {
      this.currentTag = currentTag;
    },
    refresh() {
      window.location.reload();
    },
    handleScroll(pos) {
      if (pos >= this.pos1 && !this.flag1) {
        this.flag1 = true;
        this.getRecommendSongList();
      }
      if (pos >= this.pos2 && !this.flag2) {
        this.flag2 = true;
        this.getRankPlayList();
      }
      if (this.flag1 && this.flag2) {
        this.listenScroll = false;
      }
    }
  },
  computed: {
    ...mapGetters(["logged", "userAvatar"])
  },
  watch: {
    banners() {
      this.currentImgURL = this.banners[0].pic;
    },
    currentTag() {
      this.getChosenSongList();
    }
  },
  activated() {
    this.bus.$on("coverClicked", id => {
      this.toPlaylistsDetail(id);
    });
    this.bus.$on("rankClicked", id => {
      this.toRankDetail(id);
    });
  }
};
</script>

<style scoped lang="scss">
@import "~@/assets/style/variables.scss";
@import "~@/assets/style/mixin.scss";
@import "~@/assets/style/transition.scss";

.discover-container {
  height: calc(100% - 60px);
}
.discover {
  background-color: $gray-light;
}
.wrapper {
  @include wh(100%, 100%);
  position: absolute;
  top: 0;
  z-index: 998;
  background-color: rgba(0, 0, 0, 0.4);
}
.header-bg {
  position: absolute;
  top: 0;
  filter: blur(20px);
  opacity: 30%;
  height: 1.97rem;
}
.line {
  height: 1px;
  background-color: rgba(0, 0, 0, 0.1);
}
.head {
  background-color: $white;
  .carousel {
    padding-top: 0.5rem;
  }
}
.nav {
  padding: 0.1rem 0.2rem;
}
.rank-summary {
  margin-top: 0.1rem;
}
.recommend-rank {
  margin-top: 0.1rem;
}
.bottom {
  display: flex;
  justify-content: center;
  height: 1rem;
  background-color: $white;
  border-radius: 0.1rem;
  .refresh {
    @include height(0.3rem);
    margin-top: 0.2rem;
    background-color: $theme;
    padding: 0 0.2rem;
    color: $white;
    font-weight: 500;
    border-radius: 0.15rem;
  }
}
</style>
