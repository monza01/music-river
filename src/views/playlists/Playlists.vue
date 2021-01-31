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

export default {
  name: "playlists",
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
  },
  methods: {
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
  }
};
</script>

<style scoped lang="scss">
@import "~@/assets/style/variables.scss";
@import "~@/assets/style/transition.scss";

.playlists {
  background-color: $white;
  .mini-tab {
    margin: 0.05rem 0.15rem;
  }
}
</style>
