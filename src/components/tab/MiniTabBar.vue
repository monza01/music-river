<template>
  <div class="mini-tab-bar" :style="flexStyle">
    <div
      class="tab-item"
      :class="{ current: currentTag === index }"
      v-for="(item, index) in tags"
      :key="index"
      @click="changeTag(index)"
      ref="tabItems"
    >
      {{ item }}
    </div>
    <div ref="border" class="border" :style="borderStyle"></div>
  </div>
</template>

<script>
import { prefixStyle } from "@/utils/dom";
const TRANSfORM = prefixStyle("transform");

export default {
  name: "MiniTabBar",
  data() {
    return {
      currentTag: 0,
      borderWidth: 0
    };
  },
  methods: {
    changeTag(index) {
      this.currentTag = index;
      this.$refs.border.style[
        TRANSfORM
      ] = `translateX(${this.$refs.tabItems[index].offsetLeft}px)`;
      this.borderWidth = this.$refs.tabItems[index].offsetWidth;
      this.$emit("tagClicked", this.currentTag);
    }
  },
  computed: {
    flexStyle() {
      return `justify-content: ${this.layout}`;
    },
    borderStyle() {
      return `width:${this.borderWidth}px`;
    }
  },
  mounted() {
    this.borderWidth = this.$refs.tabItems[0].offsetWidth;
  },
  props: {
    tags: {
      type: Array,
      default: () => {
        return [];
      }
    },
    layout: {
      type: String,
      default: "flex-start"
    }
  }
};
</script>

<style scoped lang="scss">
@import "~@/assets/style/variables.scss";
@import "~@/assets/style/mixin.scss";

.mini-tab-bar {
  position: relative;
  display: flex;
  .tab-item {
    padding: 0.1rem;
    color: $gray-deep;
  }
  .current {
    font-weight: 700;
    color: $black;
  }
  .border {
    position: absolute;
    top: 0.2rem;
    height: 4px;
    border-radius: 2px;
    margin-top: 0.1rem;
    background-image: linear-gradient(90deg, $yellow, $theme);
    transition: all 0.2s;
  }
}
</style>
