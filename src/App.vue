<template>
  <div id="app">
    <transition :name="transitionName">
      <keep-alive include="Discover">
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
  height: 100%;
}

.slide-left-enter-active {
  animation-name: slide-left-in;
  animation-duration: 0.3s;
  position: absolute;
  top: 0;
}
.slide-left-leave-active {
  animation-name: slide-left-out;
  animation-duration: 0.3s;
}
.slide-right-enter-active {
  animation-name: slide-right-in;
  animation-duration: 0.3s;
}
.slide-right-leave-active {
  animation-name: slide-right-out;
  animation-duration: 0.3s;
  position: absolute;
  z-index: 10;
}

@keyframes slide-left-in {
  0% {
    transform: translate3d(100%, 0, 0);
  }
  100% {
    transform: translate3d(0, 0, 0);
  }
}

@keyframes slide-left-out {
  0% {
    transform: translate3d(0, 0, 0);
  }
  100% {
    transform: translate3d(-30%, 0, 0);
  }
}

@keyframes slide-right-in {
  0% {
    transform: translate3d(-30%, 0, 0);
  }
  100% {
    transform: translate3d(0, 0, 0);
  }
}
@keyframes slide-right-out {
  0% {
    transform: translate3d(0, 0, 0);
  }
  100% {
    transform: translate3d(100%, 0, 0);
  }
}
</style>
