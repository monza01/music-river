<template>
  <div class="search-page">
    <form
      class="search-form"
      @submit="toSearchResult"
      action="javascript:void 0"
    >
      <input
        type="search"
        class="searchBox"
        placeholder="音乐/歌手"
        @input="getSuggestion"
        v-model.trim="keywords"
      />
      <span class="cancel" @click="back">取消</span>
      <span class="icon-search"></span>
    </form>
    <div class="suggest" v-show="this.keywords">
      <ul>
        <li
          class="keyword-box"
          v-for="(item, index) in suggestion"
          :key="index"
        >
          <span class="icon-search"></span>
          <span class="keyword">{{ item.keyword }}</span>
        </li>
      </ul>
    </div>
    <div class="hot" v-show="!this.keywords">
      <h4>热搜榜</h4>
      <ul class="hot-search-box">
        <li v-for="(item, index) in hotWords" class="hot-search" :key="index">
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
import { getHotSearch, getSearchSuggestion } from "@/api/common";

export default {
  name: "Search",
  data() {
    return {
      hotWords: [],
      keywords: "",
      suggestion: []
    };
  },
  created() {
    this.getHotSearch();
  },
  methods: {
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
    getSuggestion() {
      if (this.keywords) {
        getSearchSuggestion({
          type: "mobile",
          keywords: this.keywords
        }).then(res => {
          this.suggestion = res.result.allMatch;
        });
      }
    },
    toSearchResult() {
      this.$router.push({
        path: "/search/result",
        query: {
          keyword: this.keywords
        }
      });
    }
  }
};
</script>

<style scoped lang="scss">
@import "~@/assets/style/variables.scss";
@import "~@/assets/style/mixin.scss";

.search-page {
  padding: 0.05rem 0.15rem;
  .search-form {
    display: flex;
    .searchBox {
      @include height(0.34rem);
      position: relative;
      flex: 1;
      border-radius: 0.17rem;
      color: $gray;
      background-color: $gray-light;
      text-indent: 0.3rem;
    }
    .cancel {
      @include wh(0.5rem, 0.4rem);
      line-height: 0.36rem;
      font-size: $font-size-m;
      text-align: center;
    }
    .icon-search {
      position: absolute;
      top: 0.15rem;
      left: 0.25rem;
      color: $gray;
    }
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
  .suggest {
    .keyword-box {
      display: flex;
      .icon-search {
        color: $gray;
        padding-top: 0.16rem;
      }
      .keyword {
        flex: 1;
        padding-left: 0.1rem;
        height: 0.5rem;
        border-bottom: 1px solid $gray-light;
        line-height: 0.5rem;
      }
    }
  }
}
</style>
