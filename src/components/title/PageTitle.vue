<template>
  <div class="page-title">
    <div v-if="needBackBtn" class="icon" :class="iconName" @click="back"></div>
    <h3 class="the-title">{{ pageTitle }}</h3>
  </div>
</template>

<script>
export default {
  name: "PageTitle",
  props: {
    iconName: {
      type: String,
      default: "icon-angle-left"
    },
    pageTitle: {
      type: String,
      default: "页面标题"
    },
    needBackBtn: {
      type: Boolean,
      default: true
    },
    backTo: String
  },
  methods: {
    back() {
      if (this.backTo) {
        this.$router.push(this.backTo);
      } else {
        this.$router.back();
      }
    }
  }
};
</script>

<style scoped lang="scss">
@import "~@/assets/style/variables.scss";

.page-title {
  position: relative;
  padding: 0.1rem;
  .icon {
    position: absolute;
    top: 0;
    padding: 0 0.1rem;
    font-size: 36px;
  }
  .the-title {
    font-size: $font-size-l;
    text-align: center;
    font-weight: 600;
  }
}
</style>
