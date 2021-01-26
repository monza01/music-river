<template>
  <div v-if="show" id="app" class="container">
    <transition :name="transitionName">
      <keep-alive include="Discover,Profile">
        <router-view> </router-view>
      </keep-alive>
    </transition>
    <tab-bar></tab-bar>
    <player v-show="false"></player>
  </div>
</template>

<script>
import TabBar from "@/components/tab/TabBar";
import Player from "@/components/player/Player";
import { checkUserStatus } from "@/api/user";
import { mapActions } from "vuex";

export default {
  components: {
    TabBar,
    Player
  },
  data() {
    return {
      transitionName: "",
      show: false
    };
  },
  created() {
    this.checkUserStatus();
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
#app {
  margin: 0 auto;
}
</style>
