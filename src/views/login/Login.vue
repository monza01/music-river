<template>
  <div class="login-page container">
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
import PageTitle from "@/components/title/PageTitle";
import LoginForm from "@/components/login-form/LoginForm";
import Alert from "@/components/popup/Alert";
import { loginWithEmail, loginWithPhone } from "@/api/user";
import { mapActions } from "vuex";

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
    ...mapActions(["manageUser"]),
    toLogin(data) {
      if (!data.valid) {
        this.alertType = "warn";
        this.alertText = "账号或密码格式不正确 ！";
        this.$refs.alert.show();
      } else {
        if (!this.loading) {
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
      }
    },
    success(res) {
      if (res.code === 200) {
        this.manageUser({
          status: true,
          id: res.account.id,
          avatar: res.profile.avatarUrl
        });
        this.$cookies.set("userCookie", res.cookie);
        this.$router.push("/discover").catch(err => err);
      } else {
        this.alertType = "warn";
        this.alertText = res.msg;
        this.$refs.alert.show();
      }
    },
    error(res) {
      this.alertType = "warn";
      this.alertText = res.msg;
      this.$refs.alert.show();
    }
  }
};
</script>

<style lang="scss">
@import "~@/assets/style/variables.scss";
@import "~@/assets/style/mixin.scss";

.login-page {
  background-color: $white;
  height: 100%;
}
.logo-container {
  @include flex();
  height: 2rem;
  .logo {
    @include height(1.2rem);
    width: 1.2rem;
    background-color: $black;
    color: $white;
    font-size: 80px;
    text-align: center;
  }
}

.loading {
  @include flex();
  @include wh(100%, 0.5rem);
  position: absolute;
  top: 4.44rem;
  background-color: #86ccca;
  img {
    @include wh(0.3rem, 0.3rem);
    animation-name: spin;
    animation-duration: 1s;
    animation-iteration-count: infinite;
  }
}

@keyframes spin {
  100% {
    transform: rotateZ(360deg);
  }
}
</style>
