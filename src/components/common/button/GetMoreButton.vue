<template>
  <div class="getMoreBtn">
    更多
    <span class="icon-angle-right"></span>
  </div>
</template>

<script>
export default {
  name: "GetMoreButton"
};
</script>

<style scoped lang="scss">
@import "~@/assets/style/variables.scss";
@import "~@/assets/style/mixin.scss";

.getMoreBtn {
  @include border($gray);
  @include box(0.5rem, 0.24rem, 0.12rem);
  position: relative;
  padding-left: 0.1rem;
  line-height: 0.24rem;
  font-size: $font-size-xs;
  span {
    @include position(0.02rem, 0.36rem);
    font-size: $font-size-l;
  }
}
</style>
