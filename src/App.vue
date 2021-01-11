<template>
  <div id="app">
    <transition :name="transitionName">
      <keep-alive>
        <router-view> </router-view>
      </keep-alive>
    </transition>
    <tab-bar></tab-bar>
    <player v-show="false"></player>
  </div>
</template>

<script>
import TabBar from "@/components/common/tab/TabBar";
import Player from "@/components/player/Player";

export default {
  components: {
    TabBar,
    Player
  },
  data() {
    return {
      transitionName: ""
    };
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
    }
  }
};
</script>

<style scoped lang="scss">
@import "~@/assets/style/variables.scss";
#app {
  position: relative;
  max-width: 768px;
  margin: 0 auto;
  background-color: $white;
}

.slide-right-enter-active,
.slide-right-leave-active,
.slide-left-enter-active,
.slide-left-leave-active {
  will-change: transform;
  transition: all 0.3s;
}

.slide-right-enter {
  transform: translate3d(-100%, 0, 0);
}
.slide-left-enter {
  transform: translate3d(100%, 0, 0);
}
.slide-right-leave-active,
.slide-left-leave-active {
  transform: translate3d(0, 0, 0);
}

.slide-right-enter-active,
.slide-left-enter-active {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
}
</style>
