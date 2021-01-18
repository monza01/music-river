<template>
  <transition name="slide-upDown">
    <div
      @click="hidden"
      v-show="showFlag"
      class="alert"
      :style="{ background: setBgc }"
    >
      {{ text }}
    </div>
  </transition>
</template>

<script>
export default {
  name: "Alert",
  data() {
    return {
      showFlag: false
    };
  },
  props: {
    text: {
      type: String,
      default: ""
    },
    alertType: {
      type: String,
      default: ""
    }
  },
  computed: {
    setBgc() {
      if (this.alertType === "warn") {
        return "#cc5f76";
      } else {
        return "#3fa6a5";
      }
    }
  },
  methods: {
    show() {
      this.showFlag = true;
      if (timer) {
        clearTimeout(timer);
      }
      const timer = setTimeout(() => {
        this.showFlag = false;
      }, 2000);
    },
    hidden() {
      this.showFlag = false;
    }
  }
};
</script>

<style scoped lang="scss">
@import "~@/assets/style/variables.scss";
@import "~@/assets/style/mixin.scss";

.alert {
  @include wh(100%, 0.5rem);
  position: absolute;
  color: $white;
  font-size: $font-size-s;
  line-height: 0.5rem;
  text-align: center;
  z-index: 9999;
}

.slide-upDown-enter-active,
.slide-upDown-leave-active {
  transition: all 0.2s;
}
.slide-upDown-enter,
.slide-upDown-leave-to {
  transform: translate3d(0, -100%, 0);
}
</style>
