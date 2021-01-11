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
.nav-item {
  display: flex;
  flex-direction: column;
  font-size: $font-size-xs;
  text-align: center;
  .icon {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 0.5rem;
    height: 0.5rem;
    background-color: $theme-lighter;
    border-radius: 50%;
    margin-bottom: 0.05rem;
    img {
      width: 0.3rem;
      height: 0.3rem;
    }
  }
}
</style>
