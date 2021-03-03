<template>
  <category-singers
    :singers="singers"
    :update-time="updateTime"
    :loading="loading"
  ></category-singers>
</template>

<script>
import CategorySingers from "@/views/top-singers/components/CategorySingers";
import { singersMixin } from "@/utils/mixin";

export default {
  mixins: [singersMixin],
  components: {
    CategorySingers
  }
};
</script>

<style scoped></style>
