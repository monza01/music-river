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
    <my-scroll class="my-scroll">
      <template v-slot:scrollContent>
        <div class="content">
          <div class="updateTime">最近更新:{{ updateTime }}</div>
          <singer-list :singers="singers[currentTag]"></singer-list>
        </div>
      </template>
    </my-scroll>
  </div>
</template>

<script>
import PageTitle from "@/components/title/PageTitle";
import MiniTabBar from "@/components/tab/MiniTabBar";
import MyScroll from "@/components/scroll/MyScroll";
import SingerList from "@/components/lists/SingerList";
import { getTopSingers } from "@/api/common";

export default {
  name: "TopSingers",
  components: {
    PageTitle,
    MiniTabBar,
    MyScroll,
    SingerList
  },
  data() {
    return {
      singers: {},
      tags: ["华语", "欧美", "韩国", "日本"],
      currentTag: 0,
      time: 0
    };
  },
  created() {
    this.getTopSingers();
  },
  methods: {
    getTopSingers() {
      if (!this.singers[this.currentTag]) {
        getTopSingers({
          type: this.currentTag + 1
        }).then(res => {
          this.$set(this.singers, this.currentTag, res.list.artists);
          this.time = res.list.updateTime;
        });
      }
    },
    changeTag(currentTag) {
      this.currentTag = currentTag;
      this.getTopSingers();
    }
  },
  computed: {
    updateTime() {
      const date = new Date(this.time);
      return date.getMonth() + 1 + "月" + date.getDate() + "日";
    }
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
}
</style>
