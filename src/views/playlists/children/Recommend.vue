<template>
  <category-playlists
    :playlists="playlistsData"
    :more="more"
    :pullUpLoad="pullUpLoad"
    @pullUp="getMoreData"
    ref="list"
  ></category-playlists>
</template>

<script>
import { playlistsMixin } from "@/utils/mixin";

export default {
  mixins: [playlistsMixin]
};
</script>

<style scoped lang="scss"></style>
