<template>
  <div class="search-result container">123</div>
</template>

<script>
import { getSearchResult } from "@/api/common";

export default {
  name: "SearchResult",
  created() {
    this.getSearchResult();
  },
  methods: {
    getSearchResult() {
      getSearchResult({
        keywords: this.$route.query.keyword
      }).then(res => {
        console.log(res);
      });
    }
  }
};
</script>

<style scoped></style>
