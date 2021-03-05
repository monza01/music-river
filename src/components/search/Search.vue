<template>
  <div class="search">
    <div class="search-head">
      <form class="search-form" @submit="finished" action="javascript:void 0">
        <input
          type="search"
          class="searchBox"
          placeholder="音乐/歌手"
          @input="getSuggestion"
          v-model.trim="keywords"
          @blur="blur"
          @focus="focus"
          ref="input"
        />
      </form>
      <slot></slot>
      <span class="icon-search icon-in-input"></span>
    </div>
    <div class="suggest" v-show="this.showFlag">
      <ul>
        <li
          class="keyword-box"
          v-for="(item, index) in suggestion"
          :key="index"
          @click="fastSearch(item.keyword)"
        >
          <span class="icon-search icon-in-list"></span>
          <span class="keyword">{{ item.keyword }}</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { getSearchSuggestion } from "@/api/common";

export default {
  name: "Search",
  data() {
    return {
      keywords: "",
      suggestion: [],
      showFlag: false
    };
  },
  props: {
    value: String
  },
  methods: {
    getSuggestion() {
      if (this.keywords) {
        getSearchSuggestion({
          type: "mobile",
          keywords: this.keywords
        }).then(res => {
          this.suggestion = res.result.allMatch;
        });
      } else {
        this.suggestion = [];
      }
    },
    finished() {
      this.$emit("finished", this.keywords);
    },
    blur() {
      if (timer) {
        clearTimeout(timer);
      }
      const timer = setTimeout(() => {
        this.showFlag = false;
        this.$emit("switchView", true);
      }, 20);
    },
    focus() {
      this.showFlag = !!this.keywords;
      this.$emit("switchView", !this.keywords);
      this.getSuggestion();
    },
    blurInput() {
      this.$refs.input.blur();
    },
    setKeywords(value) {
      this.keywords = value;
    },
    fastSearch(keyword) {
      this.$emit("finished", keyword);
    }
  },
  watch: {
    keywords() {
      this.showFlag = !!this.keywords;
      this.$emit("switchView", !this.keywords);
    }
  }
};
</script>

<style scoped lang="scss">
@import "~@/assets/style/variables.scss";
@import "~@/assets/style/mixin.scss";
.search-head {
  display: flex;
  position: relative;
  .search-form {
    flex: 1;
    .searchBox {
      @include height(0.34rem);
      width: 100%;
      border-radius: 0.17rem;
      color: $gray;
      background-color: $gray-light;
      text-indent: 0.3rem;
    }
  }
  .icon-in-input {
    position: absolute;
    top: 0.1rem;
    left: 0.12rem;
    color: $gray;
  }
}
.suggest {
  .keyword-box {
    display: flex;
    .icon-in-list {
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
</style>
