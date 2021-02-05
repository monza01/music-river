<template>
  <div class="category-playlists container">
    <my-scroll
      :pull-up="pullUpLoad"
      @pullUp="emitPullUp"
      :remember-scroll="true"
    >
      <template v-slot:scrollContent>
        <div class="lists scroll-content">
          <song-list-cover
            v-for="(item, index) in playlists"
            :key="index"
            :detail="item"
          ></song-list-cover>
        </div>
        <loader v-show="more" class="the-loader"></loader>
        <p class="bottom" v-if="!more">到底啦 ！</p>
      </template>
    </my-scroll>
  </div>
</template>

<script>
import MyScroll from "@/components/scroll/MyScroll";
import SongListCover from "@/components/cover/SongListCover";
import { routerMixin } from "@/utils/mixin";

export default {
  mixins: [routerMixin],
  name: "CategoryPlaylists",
  components: {
    MyScroll,
    SongListCover
  },
  props: {
    playlists: Array,
    more: {
      type: Boolean,
      default: true
    },
    pullUpLoad: {
      type: Boolean,
      default: true
    }
  },
  methods: {
    emitPullUp() {
      this.$emit("pullUp");
    }
  },
  activated() {
    this.bus.$on("coverClicked", id => {
      this.toPlaylistsDetail(id);
    });
  }
};
</script>

<style scoped lang="scss">
@import "~@/assets/style/variables.scss";
@import "~@/assets/style/mixin.scss";

.category-playlists {
  height: calc(100% - 0.85rem);
  .lists {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    padding: 0 0.15rem;
  }
  .the-loader {
    padding-top: 0;
  }
  .bottom {
    @include height(0.5rem);
    text-align: center;
    color: $gray;
  }
}
</style>
