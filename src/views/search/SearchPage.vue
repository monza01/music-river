<template>
  <div class="search-page">
    <search @finished="toSearchResult" @switchView="switchView" ref="searchBox">
      <template v-slot:default>
        <span class="cancel" @click="back">取消</span>
      </template>
    </search>
    <div class="hot" v-show="show">
      <h4>热搜榜</h4>
      <ul class="hot-search-box">
        <li
          v-for="(item, index) in hotWords"
          class="hot-search"
          :key="index"
          @click="searchHotWords(item.searchWord)"
        >
          <div class="index" :class="isTop3(index)">{{ index + 1 }}</div>
          <div class="word" :class="isTop3(index)">
            {{ item.searchWord }}
            <img
              class="icon"
              :class="{ special: item.iconType === 5 }"
              v-if="item.iconUrl"
              :src="item.iconUrl"
              alt=""
            />
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { getHotSearch } from "@/api/common";
import Search from "@/views/common/Search";
import { mapMutations } from "vuex";

export default {
  name: "SearchPage",
  data() {
    return {
      hotWords: [],
      show: true
    };
  },
  created() {
    this.getHotSearch();
  },
  mounted() {
    this.SET_CACHE_VIEWS("SearchPage");
  },
  components: {
    Search
  },
  methods: {
    ...mapMutations(["SET_CACHE_VIEWS", "REMOVE_CACHE_VIEWS"]),
    back() {
      this.$router.push("/discover").catch(err => err);
    },
    getHotSearch() {
      getHotSearch().then(res => {
        this.hotWords = res.data;
      });
    },
    isTop3(index) {
      return index <= 2 ? "top3" : "";
    },
    toSearchResult(keywords) {
      this.$router
        .push({
          path: `/search/${keywords}`
        })
        .catch(err => err);
    },
    switchView(value) {
      this.show = value;
    },
    searchHotWords(hotWords) {
      this.$refs.searchBox.setKeywords(hotWords);
      this.$refs.searchBox.finished(hotWords);
    }
  },
  activated() {
    this.$refs.searchBox.setKeywords("");
  },
  beforeRouteLeave(to, from, next) {
    if (to.meta.index > from.meta.index) {
      this.SET_CACHE_VIEWS("SearchPage");
    } else {
      this.REMOVE_CACHE_VIEWS("SearchPage");
    }
    next();
  }
};
</script>

<style scoped lang="scss">
@import "~@/assets/style/variables.scss";
@import "~@/assets/style/mixin.scss";

.search-page {
  padding: 0.05rem 0.15rem;
  .cancel {
    @include wh(0.5rem, 0.4rem);
    line-height: 0.36rem;
    font-size: $font-size-m;
    text-align: center;
  }
  .hot {
    h4 {
      padding: 0.1rem 0;
      border-bottom: 1px solid $gray-light;
    }
    .hot-search-box {
      display: flex;
      flex-wrap: wrap;
      .hot-search {
        display: flex;
        width: 50%;
        padding: 0.08rem 0;
        .index {
          width: 0.25rem;
          padding-right: 0.1rem;
          font-weight: 700;
          color: $gray;
          font-size: $font-size-m;
        }
        .word {
          @include no-wrap;
          width: 95%;
          line-height: 16px;
          color: $black !important;
        }
        .icon {
          width: 20px;
        }
        .special {
          width: 10px;
          height: 11px;
        }
        .top3 {
          color: $red;
          font-weight: 700;
        }
      }
    }
  }
}
</style>
