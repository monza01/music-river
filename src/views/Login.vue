<template>
  <div class="login-page">
    <div class="login-header">
      <page-title
        pageTitle="MUSIC RIVER"
        icon-name="icon-angle-left"
      ></page-title>
    </div>
    <div class="logo-container"><h1 class="logo">M</h1></div>
    <login-form></login-form>
  </div>
</template>

<script>
import PageTitle from "@/components/common/title/PageTitle";
import LoginForm from "@/components/common/login-form/LoginForm";

export default {
  name: "Login",
  components: {
    PageTitle,
    LoginForm
  }
};
</script>

<style scoped lang="scss">
@import "~@/assets/style/variables.scss";
.login-page {
  background-color: $white;
}
.logo-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 2rem;
  .logo {
    width: 1.2rem;
    height: 1.2rem;
    background-color: $black;
    color: $white;
    font-size: 80px;
    line-height: 1.2rem;
    text-align: center;
  }
}
</style>
