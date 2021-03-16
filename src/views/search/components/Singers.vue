<template>
  <div class="search-singers">
    <div class="noResult" v-show="!total">无结果</div>
    <my-scroll
      v-show="total"
      :pull-up="pullUpLoad"
      :remember-scroll="true"
      @pullUp="getMoreData"
      ref="myScroll"
    >
      <template v-slot:scrollContent>
        <ul class="scroll-content">
          <li
            v-for="(item, index) in list"
            :key="index"
            class="artist"
            @click="toSingerDetail(item.id)"
          >
            <img
              class="avatar"
              v-lazy="setUrl(item.img1v1Url, 40, 40)"
              alt=""
            />
            <div class="singer-name">{{ item.name }}</div>
          </li>
        </ul>
        <loader v-show="loading" class="the-loader"></loader>
        <p class="bottom" v-if="!more">到底啦 ！</p>
      </template>
    </my-scroll>
  </div>
</template>

<script>
import MyScroll from "@/components/scroll/MyScroll";
import { getSearchResult } from "@/api/common";
import { paddingMixin } from "@/utils/mixin";

export default {
  mixins: [paddingMixin],
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
    MyScroll
  },
  created() {
    this.OFFSET = 20;
    this.getSearchResult(this.keywords);
  },
  methods: {
    getSearchResult(keywords) {
      this.loading = true;
      getSearchResult({
        type: 100,
        limit: 20,
        keywords: keywords
      }).then(res => {
        this.list = res.result.artists;
        this.loading = false;
        this.total = res.result.artistCount;
      });
    },
    getMoreData() {
      if (!this.loading && this.more) {
        this.loading = true;
        getSearchResult({
          type: 100,
          limit: 20,
          offset: this.OFFSET,
          keywords: this.keywords
        }).then(res => {
          if (res.result.artistCount > 0) {
            res.result.artists.forEach(item => {
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
    },
    toSingerDetail(id) {
      this.$router.push(`/singer/detail/${id}`).catch(err => err);
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

.search-singers {
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
.artist {
  display: flex;
  height: 0.7rem;
  align-items: center;
  .avatar {
    @include box(0.5rem, 0.5rem, 50%);
  }
  .singer-name {
    @include no-wrap;
    line-height: 0.7rem;
    padding-left: 0.15rem;
    font-size: $font-size-m;
  }
}
</style>
