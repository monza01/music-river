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

.getMoreBtn {
  position: relative;
  padding-left: 0.1rem;
  width: 0.5rem;
  height: 0.24rem;
  border: 1px solid $gray;
  border-radius: 0.12rem;
  line-height: 0.24rem;
  font-size: $font-size-xs;
  span {
    position: absolute;
    top: 0.02rem;
    left: 0.36rem;
    font-size: $font-size-l;
  }
}
</style>
