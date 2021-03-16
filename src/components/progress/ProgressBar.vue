<template>
  <div class="bar-wrapper" @click="barClicked">
    <div class="progress-bar" ref="progressBar">
      <div class="bar-inner">
        <div class="progress" ref="progress"></div>
        <div
          class="btn-wrapper"
          @touchstart.prevent="btnTouchStart"
          @touchmove.prevent="btnTouchMove"
          @touchend.prevent="btnTouchEnd"
          ref="btn"
        >
          <div class="btn"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { prefixStyle } from "@/utils/dom";
const transform = prefixStyle("transform");
export default {
  name: "ProgressBar",
  props: {
    percent: Number
  },
  watch: {
    percent(newPercent) {
      if (newPercent >= 0 && !this.touch.initiated) {
        const BarWidth = this.$refs.progressBar.clientWidth;
        const offsetWidth = Math.floor(newPercent * BarWidth);
        this.changePosition(offsetWidth);
      }
    }
  },
  created() {
    this.touch = {};
  },
  methods: {
    btnTouchStart(e) {
      this.touch.initiated = true;
      this.touch.startX = e.touches[0].pageX;
      this.touch.left = this.$refs.progress.clientWidth;
      this.$refs.progress.style.backgroundColor = "#3fa6a5";
    },
    btnTouchMove(e) {
      if (!this.touch.initiated) {
        return;
      }
      const deltaX = e.touches[0].pageX - this.touch.startX;
      const offsetWidth = Math.min(
        Math.max(0, this.touch.left + deltaX),
        this.$refs.progressBar.clientWidth
      );
      this.changePosition(offsetWidth);
    },
    btnTouchEnd() {
      this.touch.initiated = false;
      this.triggerProgress();
      this.$refs.progress.style.backgroundColor = "#fff";
    },
    changePosition(offset) {
      this.$refs.progress.style.width = `${offset}px`;
      this.$refs.btn.style[transform] = `translate3d(${offset}px , 0 , 0)`;
    },
    triggerProgress() {
      const percent =
        this.$refs.progress.clientWidth / this.$refs.progressBar.clientWidth;
      this.$emit("progressChange", percent);
    },
    barClicked(e) {
      const rect = this.$refs.progressBar.getBoundingClientRect();
      const offsetWidth = e.pageX - rect.left;
      this.changePosition(offsetWidth);
      this.triggerProgress();
    }
  }
};
</script>

<style scoped lang="scss">
@import "~@/assets/style/variables.scss";
@import "~@/assets/style/mixin.scss";

.bar-wrapper {
  @include wh(70%, 0.3rem);
  @include flex();
  .progress-bar {
    @include box(100%, 2px, 1px);
    background-color: rgba(255, 255, 255, 0.3);
    .bar-inner {
      position: relative;
      .progress {
        @include box(0, 2px, 1px);
        background-color: rgba(255, 255, 255, 0.8);
      }
      .btn-wrapper {
        @include box(30px, 30px);
        @include flex();
        position: absolute;
        top: -14px;
        left: -15px;
        .btn {
          @include box(10px, 10px);
          background-color: $white;
        }
      }
    }
  }
}
</style>
