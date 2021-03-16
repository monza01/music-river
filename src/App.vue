<template>
  <div v-if="show" id="app" class="container">
    <alert :always="true" ref="alert"></alert>
    <transition :name="transitionName">
      <keep-alive :include="['Discover', 'Profile', ...cacheViews]">
        <router-view> </router-view>
      </keep-alive>
    </transition>
    <transition name="up-down">
      <tab-bar v-show="showTab"></tab-bar>
    </transition>
    <player></player>
  </div>
</template>

<script>
import TabBar from "@/views/common/TabBar";
import Player from "@/views/player/Player";
import { getUserAccount } from "@/api/user";
import { mapActions, mapGetters, mapMutations } from "vuex";
import Alert from "@/components/popup/Alert";

export default {
  components: {
    TabBar,
    Player,
    Alert
  },
  data() {
    return {
      transitionName: "",
      show: false
    };
  },
  created() {
    this.checkUser();
  },
  updated() {
    const path = this.$route.path;
    if (path === "/discover" || path === "/profile") {
      this.SET_SHOW_TAB(true);
    } else {
      this.SET_SHOW_TAB(false);
    }
  },
  methods: {
    ...mapActions(["manageUser"]),
    ...mapMutations(["SET_SHOW_TAB", "SET_ALERT"]),
    checkUser() {
      getUserAccount().then(res => {
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
    ...mapGetters(["cacheViews", "showTab", "alert"])
  },
  watch: {
    $route(to, from) {
      if (to.meta.index > from.meta.index) {
        this.transitionName = "slide-left";
      } else if (to.meta.index < from.meta.index) {
        this.transitionName = "slide-right";
      } else {
        this.transitionName = "";
      }
    },
    alert(newFlag) {
      if (newFlag && this.$refs.alert) {
        this.$refs.alert.show();
      }
      this.SET_ALERT(false);
    }
  }
};
</script>

<style scoped lang="scss">
@import "~@/assets/style/transition.scss";
#app {
  position: relative;
}
</style>
