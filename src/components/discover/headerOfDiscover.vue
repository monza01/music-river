<template>
  <div class="header">
    <div class="lists">
      <span class="icon-indent"></span>
    </div>
    <div class="searchBox">
      <span class="icon-search"></span>
      <span>音乐/歌手</span>
    </div>
    <div class="login" @click="loginClicked">登录</div>
  </div>
</template>

<script>
export default {
  name: "HeaderOfDiscover",
  methods: {
    loginClicked() {
      this.$emit("loginClicked");
    }
  }
};
</script>

<style scoped lang="scss">
@import "~@/assets/style/variables.scss";
@import "~@/assets/style/mixin.scss";

.header {
  position: absolute;
  z-index: 100;
  display: flex;
  width: 100%;
  align-items: center;
  height: 0.44rem;
  text-align: center;
  color: #37474f;
  .login,
  .lists {
    padding: 0.15rem;
  }
  .login {
    font-weight: 600;
  }
  .lists {
    .icon-indent {
      font-size: $font-size-xl;
    }
  }
  .searchBox {
    flex: 1;
    height: 0.34rem;
    border-radius: 0.17rem;
    color: $gray;
    line-height: 0.34rem;
    background-color: $gray-light;
    span {
      padding: 0 0.03rem;
      font-size: $font-size-s;
    }
  }
}
</style>
