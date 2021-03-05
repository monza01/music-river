<template>
  <div class="search-songs">
    <div class="noResult" v-show="!total">无结果</div>
    <my-scroll
      v-show="total"
      :pull-up="pullUpLoad"
      @pullUp="getMoreData"
      ref="myScroll"
      :remember-scroll="true"
    >
      <template v-slot:scrollContent>
        <music-list
          class="scroll-content"
          :play-list="list"
          :special-index="false"
        ></music-list>
        <loader v-show="loading" class="the-loader"></loader>
        <p class="bottom" v-if="!more">到底啦 ！</p>
      </template>
    </my-scroll>
  </div>
</template>

<script>
import MyScroll from "@/components/scroll/MyScroll";
import MusicList from "@/components/lists/MusicList";
import { getSearchResult } from "@/api/common";

export default {
  name: "Songs",
  data() {
    return {
      list: [],
      more: true,
      pullUpLoad: true,
      loading: true,
      total: 1
    };
  },
  props: {
    keywords: String
  },
  components: {
    MyScroll,
    MusicList
  },
  created() {
    this.OFFSET = 20;
    this.getSearchResult(this.keywords);
  },
  methods: {
    getSearchResult(keywords) {
      this.loading = true;
      getSearchResult({
        limit: 20,
        keywords: keywords
      }).then(res => {
        this.list = res.result.songs;
        this.loading = false;
        this.total = res.result.songCount;
      });
    },
    getMoreData() {
      if (!this.loading && this.more) {
        this.loading = true;
        getSearchResult({
          limit: 20,
          offset: this.OFFSET,
          keywords: this.keywords
        }).then(res => {
          if (res.result.songCount > 0) {
            res.result.songs.forEach(item => {
              this.list.push(item);
            });
            this.OFFSET += 20;
          } else {
            this.more = false;
            this.pullUpLoad = this.more;
          }
          this.loading = false;
        });
      }
    }
  },
  watch: {
    keywords(newKeywords) {
      this.getSearchResult(newKeywords);
    }
  },
  beforeUpdate() {
    this.$refs.myScroll.scrollTo(0);
  }
};
</script>

<style scoped lang="scss">
@import "~@/assets/style/variables.scss";
@import "~@/assets/style/mixin.scss";

.search-songs {
  height: calc(100% - 0.44rem);
}
.noResult {
  color: $gray;
  text-align: center;
}
.the-loader {
  padding-top: 0 !important;
}
.bottom {
  @include height(0.5rem);
  text-align: center;
  color: $gray;
}
</style>
