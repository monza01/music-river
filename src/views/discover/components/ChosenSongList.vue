<template>
  <div class="chosen-song-list">
    <the-title title="精选歌单" :link="link"></the-title>
    <mini-tab-bar
      :tags="tags"
      @tagClicked="tagClicked"
      ref="miniTab"
    ></mini-tab-bar>
    <swiper class="swiper" @slideChange="slideChange" ref="mySwiper">
      <swiper-slide v-for="n in 6" :key="n">
        <loader v-if="!chosenSongList[n - 1]"></loader>
        <div class="covers">
          <Cover
            v-for="item in chosenSongList[n - 1]"
            :key="item.id"
            :detail="item"
          >
          </Cover>
        </div>
      </swiper-slide>
    </swiper>
  </div>
</template>

<script>
import TheTitle from "@/components/title/Title";
import Cover from "@/components/cover/SongListCover";
import MiniTabBar from "@/components/tab/MiniTabBar";
import { Swiper, SwiperSlide } from "vue-awesome-swiper";
import "swiper/css/swiper.css";

export default {
  name: "ChosenSongList",
  components: {
    Cover,
    MiniTabBar,
    TheTitle,
    Swiper,
    SwiperSlide
  },
  data() {
    return {
      links: ["e&a", "mandarin", "popular", "recommend", "rock", "rap"],
      link: "/playlists/e&a"
    };
  },
  props: {
    chosenSongList: {
      type: Object,
      default: () => {
        return {};
      }
    },
    tags: {
      type: Array,
      default: () => {
        return [];
      }
    }
  },
  methods: {
    tagClicked(currentTag) {
      this.$emit("tagClicked", currentTag);
      this.$refs.mySwiper.$swiper.slideTo(currentTag);
      this.link = "/playlists/" + this.links[currentTag];
    },
    slideChange() {
      const activeIndex = this.$refs.mySwiper.$swiper.realIndex;
      this.$refs.miniTab.changeTag(activeIndex);
    }
  }
};
</script>

<style scoped lang="scss">
@import "~@/assets/style/variables.scss";

.chosen-song-list {
  background-color: $white;
  height: 4.1rem;
  padding: 0.15rem 0.15rem 0.15rem 0.1rem;
  border-bottom-left-radius: 0.1rem;
  border-bottom-right-radius: 0.1rem;
  .covers {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
  }
}
</style>
