<template>
  <div class="playlists container">
    <page-title back-to="/discover" pageTitle="歌单广场"></page-title>
    <mini-tab-bar
      class="mini-tab"
      :tags="tags"
      layout="space-between"
      @tagClicked="changeTag"
      ref="miniTab"
    ></mini-tab-bar>
    <transition>
      <keep-alive>
        <component :is="currentTabComponent" :cat="currentCat"></component>
      </keep-alive>
    </transition>
  </div>
</template>

<script>
import PageTitle from "@/components/title/PageTitle";
import MiniTabBar from "@/components/tab/MiniTabBar";
import Recommend from "@/views/playlists/components/Recommend";
import EAndA from "@/views/playlists/components/EAndA";
import Mandarin from "@/views/playlists/components/Mandarin";
import Popular from "@/views/playlists/components/Popular";
import Rock from "@/views/playlists/components/Rock";
import Rap from "@/views/playlists/components/Rap";
import { mapMutations } from "vuex";

export default {
  name: "Playlists",
  data() {
    return {
      tags: ["推荐", "欧美", "华语", "流行", "摇滚", "说唱"],
      componentsName: [
        "Recommend",
        "EAndA",
        "Mandarin",
        "Popular",
        "Rock",
        "Rap"
      ],
      currentTag: 0
    };
  },
  components: {
    PageTitle,
    MiniTabBar,
    Recommend,
    EAndA,
    Mandarin,
    Popular,
    Rock,
    Rap
  },
  mounted() {
    this.SET_CACHE_VIEWS("Playlists");
  },
  methods: {
    ...mapMutations(["SET_CACHE_VIEWS", "REMOVE_CACHE_VIEWS"]),
    changeTag(currentTag) {
      this.currentTag = currentTag;
    }
  },
  computed: {
    currentCat() {
      return this.currentTag ? this.tags[this.currentTag] : "全部";
    },
    currentTabComponent() {
      return this.componentsName[this.currentTag];
    }
  },
  beforeRouteLeave(to, from, next) {
    if (to.meta.index > from.meta.index) {
      this.SET_CACHE_VIEWS("Playlists");
    } else {
      this.REMOVE_CACHE_VIEWS("Playlists");
    }
    next();
  }
};
</script>

<style scoped lang="scss">
@import "~@/assets/style/variables.scss";

.playlists {
  background-color: $white;
  .mini-tab {
    margin: 0.05rem 0.15rem;
  }
}
</style>
