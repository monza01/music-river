<template>
  <category-playlists
    :playlists="playlistsData"
    @pullUp="getMoreData"
    :more="more"
    :pullUpLoad="pullUpLoad"
  ></category-playlists>
</template>

<script>
import CategoryPlaylists from "@/views/playlists/components/CategoryPlaylists";
import { playlistsMixin } from "@/utils/mixin";

export default {
  mixins: [playlistsMixin],
  components: {
    CategoryPlaylists
  }
};
</script>

<style scoped lang="scss"></style>
