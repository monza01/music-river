<template>
  <div class="nav-item">
    <div class="icon">
      <slot name="icon"></slot>
    </div>
    <p>{{ title }}</p>
  </div>
</template>

<script>
export default {
  name: "NavItem",
  props: {
    title: {
      type: String,
      default: ""
    }
  }
};
</script>

<style scoped lang="scss">
@import "~@/assets/style/variables.scss";
@import "~@/assets/style/mixin.scss";

.nav-item {
  display: flex;
  flex-direction: column;
  font-size: $font-size-xs;
  text-align: center;
  .icon {
    @include flex();
    @include box(0.5rem, 0.5rem);
    background-color: $theme-lighter;
    margin-bottom: 0.05rem;
    img {
      @include wh(0.3rem, 0.3rem);
    }
  }
}
</style>
