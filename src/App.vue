<template>
  <div v-if="show" id="app" class="container">
    <transition :name="transitionName">
      <keep-alive :include="['Discover', 'Profile', ...cacheViews]">
        <router-view> </router-view>
      </keep-alive>
    </transition>
    <transition name="up-down">
      <tab-bar v-show="showTab"></tab-bar>
    </transition>
    <player v-show="false"></player>
  </div>
</template>

<script>
import TabBar from "@/components/tab/TabBar";
import Player from "@/components/player/Player";
import { checkUserStatus } from "@/api/user";
import { mapActions, mapGetters } from "vuex";

export default {
  components: {
    TabBar,
    Player
  },
  data() {
    return {
      transitionName: "",
      show: false,
      showTab: true
    };
  },
  created() {
    this.checkUserStatus();
  },
  updated() {
    this.showTab =
      this.$route.path === "/discover" || this.$route.path === "/profile";
  },
  methods: {
    ...mapActions(["manageUser"]),
    checkUserStatus() {
      checkUserStatus().then(res => {
        if (res.account) {
          this.manageUser({
            status: true,
            id: res.account.id,
            avatar: res.profile.avatarUrl
          });
        }
        this.show = true;
      });
    }
  },
  computed: {
    ...mapGetters(["cacheViews"])
  },
  watch: {
    $route(to, from) {
      if (to.meta.index > from.meta.index) {
        this.transitionName = "slide-left";
      } else if (to.meta.index < from.meta.index) {
        this.transitionName = "slide-right";
      } else {
        this.transitionName = "fade";
      }
    }
  }
};
</script>

<style scoped lang="scss">
@import "~@/assets/style/transition.scss";
</style>
