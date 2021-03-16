<template>
  <div id="tab-bar" class="container">
    <div
      class="discover-btn btn"
      @click="tabClicked('/discover')"
      :class="setActiveClass('/discover')"
    >
      <div class="icon icon-headphones"></div>
      <p class="text">发现</p>
    </div>
    <cd-cover class="cd" @click.native="fullScreen"></cd-cover>
    <div
      class="discover-btn btn"
      @click="tabClicked('/profile')"
      :class="setActiveClass('/profile')"
    >
      <span class="icon icon-user"></span>
      <p class="text">我的</p>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from "vuex";
import CdCover from "@/views/player/components/CdCover";
import { getPlaylist } from "@/api/common";

export default {
  name: "tabBar",
  components: {
    CdCover
  },
  data() {
    return {
      currentRoute: this.$route.path
    };
  },
  computed: {
    ...mapGetters(["playlist"]),
    cdRotateClass() {
      return this.playing ? "play" : "play pause";
    }
  },
  methods: {
    ...mapMutations(["SET_FULL_SCREEN"]),
    ...mapActions(["randomPlay"]),
    fullScreen() {
      if (this.playlist.length > 0) {
        this.SET_FULL_SCREEN(true);
      } else {
        this.randomMyFav();
      }
    },
    tabClicked(current) {
      this.currentRoute = current;
      this.$router.push(current).catch(err => err);
    },
    setActiveClass(current) {
      return this.currentRoute === current ? "active" : "";
    },
    randomMyFav() {
      getPlaylist({
        id: 148842191
      }).then(res => {
        this.randomPlay({
          list: res.playlist.tracks
        });
        this.SET_FULL_SCREEN(true);
      });
    }
  },
  watch: {
    $route(to) {
      this.currentRoute = to.path;
    }
  }
};
</script>

<style scoped lang="scss">
@import "~@/assets/style/variables.scss";
@import "~@/assets/style/mixin.scss";

#tab-bar {
  @include wh(100%, 60px);
  position: absolute;
  display: flex;
  justify-content: space-around;
  bottom: 0;
  background-color: $white;
  z-index: 9;
  box-shadow: 0 2px 6px 0 rgba(0, 0, 0, 0.3);
  .cd {
    margin-top: 2px;
  }
  .btn {
    @include flex();
    flex-direction: column;
    color: $gray;
    .icon {
      @include box(25px, 25px);
      @include height(25px);
      text-align: center;
      font-size: 20px;
      transition: font-size 0.1s;
    }
    .text {
      font-size: 14px;
      padding: 1px 0 10px 0;
    }
  }
  .active {
    .icon {
      background-image: linear-gradient(135deg, $theme, $theme-lighter);
      font-size: 14px;
      color: $white;
    }
    .text {
      color: $theme;
    }
  }
}
</style>
