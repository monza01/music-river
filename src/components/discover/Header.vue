<template>
  <div>
    <img class="header-bg" :src="bgImg" width="100%" alt="" />
    <div class="header">
      <div class="lists">
        <span class="icon-indent"></span>
      </div>
      <div class="searchBox">
        <span class="icon-search"></span>
        <span>Eminem</span>
      </div>
      <div class="login">登录</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Header",
  components: {},
  props: {
    bgImg: {
      type: String,
      default: ""
    }
  }
};
</script>

<style scoped lang="scss">
@import "~@/assets/style/variables.scss";

.header-bg {
  position: absolute;
  top: 0;
  filter: blur(80px);
  //opacity: 0.2;
}

.header {
  display: flex;
  align-items: center;
  height: 0.44rem;
  text-align: center;
  color: #37474f;
  .login,
  .lists {
    width: 0.55rem;
  }
  .login {
    font-weight: 600;
  }
  .lists {
    padding-top: 0.05rem;
    .icon-indent {
      font-size: 0.2rem;
    }
  }
  .searchBox {
    flex: 1;
    height: 0.34rem;
    background-color: #cfd8dc;
    border-radius: 0.17rem;
    color: #263238;
    line-height: 0.3rem;
    span {
      padding: 0 0.03rem;
      font-size: 0.14rem;
    }
  }
}
</style>
