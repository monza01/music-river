<template>
  <transition name="slide-upDown">
    <div v-if="showFlag" class="alert" :class="bgc">
      <div class="close icon-cancel" @click="close"></div>
      <div class="text">{{ text }}</div>
      <div v-if="always" class="refresh" @click="refresh">点击刷新</div>
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
      default: "网络错误，请刷新页面重试"
    },
    alertType: {
      type: String,
      default: "warn"
    },
    always: {
      type: Boolean,
      default: false
    }
  },
  created() {
    this.timer = null;
  },
  computed: {
    bgc() {
      return this.alertType === "warn" ? "warn" : "normal";
    }
  },
  methods: {
    show() {
      this.showFlag = true;
      if (!this.always) {
        clearTimeout(this.timer);
        this.timer = setTimeout(() => {
          this.showFlag = false;
        }, 3000);
      }
    },
    refresh() {
      window.location.reload();
    },
    close() {
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
  @include flex();
  justify-content: center;
  position: absolute;
  top: 0;
  color: $white;
  font-size: $font-size-s;
  line-height: 0.5rem;
  text-align: center;
  z-index: 9999;
  .refresh {
    @include height(0.25rem);
    border-radius: 0.125rem;
    background-color: $yellow;
    padding: 0 0.2rem;
  }
  .close {
    position: absolute;
    left: 0;
    font-size: 30px;
    padding: 0.1rem;
  }
  .text {
    width: 70%;
  }
}
.warn {
  background-color: $red;
}
.normal {
  background: $theme;
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
