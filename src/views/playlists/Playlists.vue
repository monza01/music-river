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
      <keep-alive> <router-view></router-view> </keep-alive>
    </transition>
  </div>
</template>

<script>
import PageTitle from "@/components/title/PageTitle";
import MiniTabBar from "@/components/tab/MiniTabBar";
import { mapMutations } from "vuex";

export default {
  name: "Playlists",
  data() {
    return {
      tags: ["推荐", "欧美", "华语", "流行", "摇滚", "说唱"],
      links: ["recommend", "e&a", "mandarin", "popular", "rock", "rap"],
      currentTag: 0
    };
  },
  components: {
    PageTitle,
    MiniTabBar
  },
  mounted() {
    this.setTag();
    this.SET_CACHE_VIEWS("Playlists");
  },
  methods: {
    ...mapMutations(["SET_CACHE_VIEWS", "REMOVE_CACHE_VIEWS"]),
    setTag() {
      this.currentTag = this.tags.indexOf(this.$route.meta.cat);
      if (this.currentTag === -1) {
        this.currentTag = 0;
      }
      this.$refs.miniTab.changeTag(this.currentTag);
    },
    changeTag(currentTag) {
      this.$router
        .push({
          path: "/playlists/" + this.links[currentTag]
        })
        .catch(err => err);
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
