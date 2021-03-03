<template>
  <div class="singers container">
    <page-title page-title="歌手榜"></page-title>
    <mini-tab-bar
      class="mini-tab"
      :tags="tags"
      layout="space-between"
      ref="miniTab"
      @tagClicked="changeTag"
    ></mini-tab-bar>
    <transition>
      <keep-alive>
        <component :is="currentTabComponent" :cat="currentTag + 1"></component>
      </keep-alive>
    </transition>
  </div>
</template>

<script>
import PageTitle from "@/components/title/PageTitle";
import MiniTabBar from "@/components/tab/MiniTabBar";
import ChineseSingers from "@/views/top-singers/components/ChineseSingers";
import EAndASingers from "@/views/top-singers/components/EAndASingers";
import JapaneseSingers from "@/views/top-singers/components/JapaneseSingers";
import KoreaSingers from "@/views/top-singers/components/KoreaSingers";
import { mapMutations } from "vuex";

export default {
  name: "Singers",
  components: {
    PageTitle,
    MiniTabBar,
    ChineseSingers,
    EAndASingers,
    JapaneseSingers,
    KoreaSingers
  },
  data() {
    return {
      tags: ["华语", "欧美", "韩国", "日本"],
      currentTag: 0,
      componentsName: [
        "ChineseSingers",
        "EAndASingers",
        "JapaneseSingers",
        "KoreaSingers"
      ]
    };
  },
  methods: {
    ...mapMutations(["SET_CACHE_VIEWS", "REMOVE_CACHE_VIEWS"]),
    changeTag(currentTag) {
      this.currentTag = currentTag;
    }
  },
  computed: {
    currentTabComponent() {
      return this.componentsName[this.currentTag];
    }
  },
  mounted() {
    this.SET_CACHE_VIEWS("Singers");
  },
  beforeRouteLeave(to, from, next) {
    if (to.meta.index > from.meta.index) {
      this.SET_CACHE_VIEWS("Singers");
    } else {
      this.REMOVE_CACHE_VIEWS("Singers");
    }
    next();
  }
};
</script>

<style scoped lang="scss">
@import "~@/assets/style/variables.scss";

.singers {
  background-color: $white;
  .mini-tab {
    margin: 0.05rem 0.3rem;
  }
}
</style>
