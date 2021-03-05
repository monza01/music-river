<template>
  <div class="search-result container">
    <div class="search-head">
      <span class="icon icon-angle-left" @click="back"></span>
      <search
        class="search-box"
        @finished="reSearch"
        ref="searchBox"
        @switchView="switchView"
      ></search>
    </div>
    <div class="result" v-show="show">
      <div class="tab">
        <mini-tab-bar
          @tagClicked="changeTag"
          :tags="tags"
          layout="space-between"
        ></mini-tab-bar>
      </div>
      <transition>
        <keep-alive>
          <component
            :keywords="keywords"
            ref="searchResult"
            :is="currentTabComponent"
          ></component>
        </keep-alive>
      </transition>
    </div>
  </div>
</template>

<script>
import MiniTabBar from "@/components/tab/MiniTabBar";
import Search from "@/components/search/Search";
import Songs from "@/views/search/components/Songs";
import Singers from "@/views/search/components/Singers";
import { mapMutations } from "vuex";

export default {
  name: "SearchResult",
  data() {
    return {
      tags: ["单曲", "歌手"],
      show: true,
      componentsName: ["Songs", "Singers"],
      currentTag: 0,
      keywords: ""
    };
  },
  created() {
    this.keywords = this.$route.params.keywords;
  },
  mounted() {
    this.SET_CACHE_VIEWS("SearchResult");
    this.$refs.searchBox.setKeywords(this.keywords);
    if (timer) {
      clearTimeout(timer);
    }
    const timer = setTimeout(() => {
      this.show = true;
    }, 20);
  },
  components: {
    Search,
    MiniTabBar,
    Songs,
    Singers
  },
  methods: {
    ...mapMutations(["SET_CACHE_VIEWS", "REMOVE_CACHE_VIEWS"]),
    changeTag(currentTag) {
      this.currentTag = currentTag;
    },
    back() {
      this.$router.push("/discover");
    },
    reSearch(keywords) {
      this.$router
        .replace({
          path: `/search/${keywords}`
        })
        .catch(err => err);
      this.$refs.searchBox.blurInput();
    },
    switchView(value) {
      this.show = value;
    }
  },
  computed: {
    currentTabComponent() {
      return this.componentsName[this.currentTag];
    }
  },
  beforeRouteUpdate(to, from, next) {
    this.$refs.searchBox.setKeywords(to.params.keywords);
    this.keywords = to.params.keywords;
    next();
  },
  beforeRouteLeave(to, from, next) {
    if (to.meta.index > from.meta.index) {
      this.SET_CACHE_VIEWS("SearchResult");
    } else {
      this.REMOVE_CACHE_VIEWS("SearchResult");
    }
    next();
  }
};
</script>

<style scoped lang="scss">
@import "~@/assets/style/variables.scss";
@import "~@/assets/style/mixin.scss";
.search-result {
  background-color: $white;
  padding: 0.1rem 0.15rem;
}
.search-head {
  display: flex;
  .icon {
    font-size: 36px;
    padding-right: 0.15rem;
  }
  .search-box {
    flex: 1;
  }
}
.tab {
  padding: 0 0.5rem 0.1rem;
}
.result {
  height: calc(100% - 0.5rem);
}
</style>
