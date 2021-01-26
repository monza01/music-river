<template>
  <div class="scroll-wrapper" @scroll="emitScroll">
    <slot name="scrollContent"></slot>
  </div>
</template>

<script>
export default {
  name: "MyScroll",
  props: {
    listenScroll: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    emitScroll(e) {
      if (!this.listenScroll) {
        return false;
      } else {
        this.$emit("scroll", e.target.scrollTop);
      }
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
