<template>
  <category-playlists
    :playlists="playlistsData"
    @pullUp="getMoreData"
    :more="more"
    :pullUpLoad="pullUpLoad"
  ></category-playlists>
</template>

<script>
import { playlistsMixin } from "@/utils/mixin";

export default {
  mixins: [playlistsMixin]
};
</script>

<style scoped lang="scss"></style>
