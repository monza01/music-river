<template>
  <div class="mini-tab-bar">
    <div
      class="tab-item"
      v-for="(item, index) in tags"
      :key="index"
      @click="changeTag(index)"
      ref="tabItems"
    >
      {{ item }}
    </div>
    <div ref="border" class="border"></div>
  </div>
</template>

<script>
import { prefixStyle } from "@/utils/dom";
const TRANSfORM = prefixStyle("transform");

export default {
  name: "MiniTabBar",
  data() {
    return {
      currentTag: 0
    };
  },
  methods: {
    changeTag(index) {
      this.currentTag = index;
      this.$refs.border.style[
        TRANSfORM
      ] = `translateX(${this.$refs.tabItems[index].offsetLeft}px)`;
      this.$emit("tagClicked", this.currentTag);
    }
  },
  props: {
    tags: {
      type: Array,
      default: () => {
        return [];
      }
    }
  }
};
</script>

<style scoped lang="scss">
@import "~@/assets/style/variables.scss";

.mini-tab-bar {
  position: relative;
  display: flex;
  justify-content: flex-start;
  .tab-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 0.5rem;
    padding: 0.05rem 0.1rem;
  }
  .border {
    position: absolute;
    top: 0.2rem;
    left: 0.05rem;
    width: 0.38rem;
    height: 4px;
    margin-top: 0.03rem;
    border-radius: 2px;
    background-image: linear-gradient(90deg, $yellow, $theme);
    transition: all 0.2s;
  }
}
</style>
