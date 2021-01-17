<template>
  <scroll
    :data="rankPlayList.tracks"
    :listenScroll="listenScroll"
    @scroll="handleScroll"
    ref="scrollWrapper"
  >
    <div class="discover " ref="discover">
      <div class="head">
        <header-of-discover
          class="header"
          @loginClicked="loginClicked"
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
      <rank-summary class="rank-summary" :rankData="rankData"></rank-summary>
      <recommend-song-list
        ref="recommendSL"
        :recommendSongList="recommendSongList"
      ></recommend-song-list>
      <recommend-rank
        ref="bill-board"
        class="billboard"
        :rankList="rankPlayList"
      ></recommend-rank>
      <div v-if="rankPlayList.tracks" class="bottom">
        <span class="refresh" @click="refresh">换一批新内容</span>
      </div>
    </div>
  </scroll>
</template>

<script>
import {
  getBanner,
  getRecommendSongList,
  getChosenSongList,
  getRankSummary
} from "@/api/discover";
import { getPlaylist } from "@/api/common";
import { randomNum } from "@/utils/utils";
import Scroll from "@/components/common/scroll/Scroll";
import HeaderOfDiscover from "@/components/discover/headerOfDiscover";
import Carousel from "@/components/discover/Carousel";
import Navigation from "@/components/discover/Navigation";
import RecommendSongList from "@/components/discover/RecommendSongList";
import ChosenSongList from "@/components/discover/ChosenSongList";
import RankSummary from "@/components/discover/RankSummary";
import RecommendRank from "@/components/discover/recommendRank";

export default {
  name: "Discover",
  components: {
    Scroll,
    HeaderOfDiscover,
    Carousel,
    Navigation,
    RecommendSongList,
    ChosenSongList,
    RankSummary,
    RecommendRank
  },
  data() {
    return {
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
    this.getBannerData();
    this.getChosenSongList();
    this.getRankData();
  },
  methods: {
    loginClicked() {
      this.$router.push("/login").catch(err => err);
    },
    getBannerData() {
      getBanner().then(res => {
        this.banners = res.banners;
      });
    },
    getCurrentImgURL(index) {
      if (timer) {
        clearTimeout(timer);
      }
      const timer = setTimeout(() => {
        this.currentImgURL = this.banners[index].pic;
      }, 300);
    },
    getRecommendSongList() {
      getRecommendSongList({ limit: 12 }).then(res => {
        this.recommendSongList = res.result;
      });
    },
    getChosenSongList() {
      if (!this.chosenSongList[this.currentTag]) {
        getChosenSongList({
          limit: 6,
          cat: this.tags[this.currentTag]
        }).then(res => {
          this.$set(this.chosenSongList, this.currentTag, res.playlists);
        });
      }
    },
    changeTag(currentTag) {
      this.currentTag = currentTag;
    },
    getRankData() {
      getRankSummary().then(res => {
        this.rankData = res.list.slice(0, 4);
      });
    },
    getRankPlayList() {
      const num = randomNum(0, 3);
      const rankId = this.rankCategory[num];
      getPlaylist({ id: rankId }).then(res => {
        this.rankPlayList = res.playlist;
      });
    },
    handleScroll(pos) {
      if (pos.y <= -90 && !this.flag1) {
        this.flag1 = true;
        this.getRecommendSongList();
      }
      if (pos.y <= -400 && !this.flag2) {
        this.flag2 = true;
        this.getRankPlayList();
      }
      if (this.flag1 && this.flag2) {
        this.$refs.scrollWrapper.off();
      }
    },
    refresh() {
      window.location.reload();
    }
  },
  watch: {
    banners() {
      this.currentImgURL = this.banners[0].pic;
    },
    currentTag() {
      this.getChosenSongList();
    }
  }
};
</script>

<style scoped lang="scss">
@import "~@/assets/style/variables.scss";

.discover {
  max-width: 768px;
  background-color: $gray-light;
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
    height: 1.91rem;
    padding-top: 0.5rem;
  }
}
.nav {
  padding: 0.1rem 0.2rem;
}
.rank-summary {
  margin-top: 0.1rem;
}
.billboard {
  margin-top: 0.1rem;
}
.bottom {
  display: flex;
  justify-content: center;
  height: 2.4rem;
  background-color: $white;
  border-radius: 0.1rem;
  padding-bottom: 0.6rem;
  .refresh {
    margin-top: 0.2rem;
    height: 0.3rem;
    background-color: $theme;
    line-height: 0.3rem;
    padding: 0 0.2rem;
    color: $white;
    font-weight: 500;
    border-radius: 0.15rem;
  }
}
</style>
