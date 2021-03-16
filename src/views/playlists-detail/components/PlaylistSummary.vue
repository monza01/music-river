<template>
  <div class="playlist-summary">
    <div class="cover">
      <img
        :src="playlistsDetail.coverImgUrl || playlistsDetail.picUrl"
        alt=""
      />
      <div class="play-count icon-play">
        {{ formatPlayCount }}
      </div>
    </div>
    <div class="msg" v-if="playlistsDetail.creator">
      <h3 class="list-name">{{ playlistsDetail.name }}</h3>
      <div class="creator">
        <img class="avatar" :src="playlistsDetail.creator.avatarUrl" alt="" />
        <div class="nick-name">{{ playlistsDetail.creator.nickname }}</div>
      </div>
      <p class="description">{{ playlistsDetail.description || "暂无简介" }}</p>
    </div>
  </div>
</template>

<script>
import { numberFormat } from "@/utils/utils";

export default {
  name: "PlaylistSummary",
  props: {
    playlistsDetail: Object
  },
  computed: {
    formatPlayCount() {
      return numberFormat(this.playlistsDetail.playCount);
    }
  }
};
</script>

<style scoped lang="scss">
@import "~@/assets/style/variables.scss";
@import "~@/assets/style/mixin.scss";

.playlist-summary {
  display: flex;
  padding: 0.1rem 0.15rem 0.25rem;
  .cover {
    @include box(1.05rem, 1.2rem, 0.1rem);
    position: relative;
    left: 0.1rem;
    background-color: rgba(0, 0, 0, 0.15);
    margin: 0.1rem 0.3rem 0 0;
    img {
      @include position(0.04rem, -0.07rem);
      @include box(1.2rem, $radius: 0.1rem);
    }
    .play-count {
      @include height(0.16rem);
      position: absolute;
      top: 0.08rem;
      right: -0.05rem;
      font-size: $font-size-xs;
      border-radius: 0.08rem;
      background-color: rgba(0, 0, 0, 0.3);
      padding: 0 0.05rem;
      color: $white;
    }
  }
  .msg {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 60%;
    color: $white;
    padding: 0.2rem 0 0.1rem;
    .list-name {
      line-height: 0.2rem;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 2;
      color: $white;
    }
    .creator {
      display: flex;
      .avatar {
        @include box(0.3rem, 0.3rem);
      }
      .nick-name {
        padding-left: 0.05rem;
        line-height: 0.3rem;
        font-size: $font-size-xs;
      }
    }
    .description {
      @include no-wrap;
      font-size: $font-size-xs;
    }
  }
}
</style>
