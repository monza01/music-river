<template>
  <div class="login-page" id="test">
    <alert ref="alert" :text="alertText" :alert-type="alertType"></alert>
    <div class="login-header">
      <page-title
        pageTitle="MUSIC RIVER"
        icon-name="icon-angle-left"
      ></page-title>
    </div>
    <div class="logo-container">
      <h1 class="logo">M</h1>
    </div>
    <login-form @loginClicked="toLogin"></login-form>
    <div v-show="loading" class="loading">
      <img src="~@/assets/images/icon/loading.png" alt="" />
    </div>
  </div>
</template>

<script>
import PageTitle from "@/components/common/title/PageTitle";
import LoginForm from "@/components/common/login-form/LoginForm";
import { loginWithEmail, loginWithPhone } from "@/api/user";
import Alert from "@/components/common/popup/Alert";

export default {
  name: "Login",
  components: {
    PageTitle,
    LoginForm,
    Alert
  },
  data() {
    return {
      alertText: "登录成功 ！",
      alertType: "success",
      loading: false
    };
  },
  methods: {
    toLogin(data) {
      if (!data.valid) {
        this.alertType = "warn";
        this.alertText = "账号或密码格式不正确 ！";
        this.$refs.alert.show();
      } else {
        if (data.type === "phone") {
          this.loading = true;
          loginWithPhone({
            phone: data.accountInfo,
            password: data.password
          })
            .then(res => {
              this.success(res);
              this.loading = false;
            })
            .catch(res => {
              this.error(res);
              this.loading = false;
            });
        } else {
          this.loading = true;
          loginWithEmail({
            email: data.accountInfo,
            password: data.password
          })
            .then(res => {
              this.success(res);
              this.loading = false;
            })
            .catch(res => {
              this.error(res);
              this.loading = false;
            });
        }
      }
    },
    success(res) {
      console.log(res.code);
      if (res.code === 200) {
        this.$router.push("/discover").catch(err => err);
      } else {
        this.alertType = "warn";
        this.alertText = res.msg;
        this.$refs.alert.show();
      }
    },
    error(res) {
      console.log(res.code);
      this.alertType = "warn";
      this.alertText = res.msg;
      this.$refs.alert.show();
    }
  }
};
</script>

<style lang="scss">
@import "~@/assets/style/variables.scss";
.login-page {
  width: 100%;
  height: 100%;
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

.loading {
  position: absolute;
  top: 4.54rem;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 0.5rem;
  background-color: #86ccca;
  img {
    animation-name: spin;
    animation-duration: 1s;
    animation-iteration-count: infinite;
    width: 0.3rem;
    height: 0.3rem;
  }
}

@keyframes spin {
  100% {
    transform: rotateZ(360deg);
  }
}
</style>
