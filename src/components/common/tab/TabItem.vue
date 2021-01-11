<template>
  <div class="tab-item" @click="nav">
    <div class="icon" :class="iconActive">
      <slot name="icon"></slot>
    </div>
    <div :class="textActive">
      <slot name="text"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "TabItem",
  props: {
    link: {
      type: String,
      default: null
    }
  },
  methods: {
    nav() {
      this.$router.push(this.link).catch(err => err);
    }
  },
  computed: {
    isActive() {
      return this.$route.path.indexOf(this.link) !== -1;
    },
    textActive() {
      return this.isActive ? "text-active" : "";
    },
    iconActive() {
      return this.isActive ? "icon-active" : "";
    }
  }
};
</script>

<style scoped lang="scss">
@import "~@/assets/style/variables.scss";

.tab-item {
  flex: 1;
  text-align: center;
  font-size: $font-size-xs;
  color: $gray;
  .icon {
    margin: 4px auto;
    width: 0.25rem;
    height: 0.25rem;
    font-size: $font-size-xl;
    border-radius: 50%;
    transition: font-size 0.1s;
    :nth-child(1) {
      height: 0.25rem;
      line-height: 0.25rem;
    }
  }
  .text-active {
    color: $theme;
  }
  .icon-active {
    background-image: linear-gradient(135deg, $theme, $theme-lighter);
    font-size: $font-size-s;
    color: $white;
  }
}
</style>
