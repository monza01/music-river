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
import CategoryPlaylists from "@/views/playlists/components/CategoryPlaylists";

export default {
  mixins: [playlistsMixin],
  components: {
    CategoryPlaylists
  }
};
</script>

<style scoped lang="scss"></style>
