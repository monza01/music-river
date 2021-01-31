<template>
  <div class="scroll-wrapper" @scroll="handleScroll" ref="myScroll">
    <slot name="scrollContent"></slot>
  </div>
</template>

<script>
export default {
  name: "MyScroll",
  data() {
    return {
      scrollTop: 0
    };
  },
  props: {
    listenScroll: {
      type: Boolean,
      default: false
    },
    pullUp: {
      type: Boolean,
      default: false
    },
    rememberScroll: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    handleScroll(e) {
      let scrollHeight = e.target.scrollTop;
      if (this.listenScroll) {
        this.$emit("scroll", scrollHeight);
      }
      if (this.pullUp) {
        let wrapperHeight = e.target.offsetHeight;
        let contentHeight = e.target.querySelector(".scroll-content")
          .offsetHeight;
        let maxScrollHeight = contentHeight - wrapperHeight;
        if (scrollHeight >= maxScrollHeight - 10) {
          this.$emit("pullUp");
        }
      }
    }
  },
  activated() {
    if (this.rememberScroll) {
      this.$nextTick().then(() => {
        this.$refs.myScroll.scrollTop = this.scrollTop;
      });
    }
  },
  deactivated() {
    if (this.rememberScroll) {
      this.scrollTop = this.$refs.myScroll.scrollTop;
    }
  }
};
</script>

<style scoped lang="scss">
.scroll-wrapper {
  position: relative;
  width: 100%;
  height: 100%;
  overflow-y: auto;
}
</style>
