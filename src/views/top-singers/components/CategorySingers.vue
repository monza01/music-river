<template>
  <my-scroll class="my-scroll" :remember-scroll="true" ref="myScroll">
    <template v-slot:scrollContent>
      <loader v-if="loading" class="the-loader"></loader>
      <div v-else class="content">
        <div class="updateTime">最近更新:{{ updateTime }}</div>
        <singer-list
          :singers="singers"
          @singerClicked="toSingerDetail"
        ></singer-list>
      </div>
    </template> </my-scroll
></template>

<script>
import MyScroll from "@/components/scroll/MyScroll";
import SingerList from "@/components/lists/SingerList";
import { paddingMixin } from "@/utils/mixin";

export default {
  mixins: [paddingMixin],
  name: "CategorySingers",
  props: {
    singers: Array,
    updateTime: String,
    loading: {
      type: Boolean,
      default: true
    }
  },
  components: {
    MyScroll,
    SingerList
  },
  methods: {
    toSingerDetail(id) {
      this.$router.push(`/singer/detail/${id}`).catch(err => err);
    }
  }
};
</script>

<style scoped lang="scss">
@import "~@/assets/style/variables.scss";

.my-scroll {
  height: calc(100% - 0.8rem);
  position: absolute;
  top: 0.8rem;
}
.content {
  padding: 0.1rem 0.15rem;
}
.updateTime {
  padding: 0.1rem 0;
  font-size: $font-size-m;
}
</style>
