<template>
  <div class="user-card">
    <div class="avatar">
      <img v-if="logged" :src="setUrl(profile.avatarUrl, 76, 76)" alt="" />
      <img v-else src="~@/assets/images/icon/avatar.png" alt="" />
    </div>
    <div v-if="logged" class="nick-name">{{ profile.nickname }}</div>
    <div v-else @click="loginBtnClicked" class="login-now">
      立即登录
    </div>
    <div class="follow">
      <span>{{ profile.follows || 0 }}</span> 关注
      <span>{{ profile.followeds || 0 }}</span> 粉丝
      <span>Lv.{{ level }}</span>
    </div>
    <div v-if="logged" class="log-out icon-power-outline" @click="logout"></div>
  </div>
</template>

<script>
export default {
  name: "UserCard",
  props: {
    profile: Object,
    logged: Boolean,
    level: Number
  },
  methods: {
    loginBtnClicked() {
      this.$emit("loginBtnClicked");
    },
    logout() {
      this.$emit("logout");
    }
  }
};
</script>

<style scoped lang="scss">
@import "~@/assets/style/variables.scss";
@import "~@/assets/style/mixin.scss";
.user-card {
  position: relative;
  left: 4%;
  width: 92%;
  border-radius: 0.2rem;
  padding-bottom: 0.1rem;
  background-color: $white;
  .avatar {
    @include box(0.8rem, 0.8rem);
    position: absolute;
    overflow: hidden;
    top: -0.4rem;
    left: 50%;
    margin-left: -0.4rem;
    background-color: $white;
    img {
      @include box(0.76rem, 0.76rem);
      margin-left: 0.02rem;
      margin-top: 0.02rem;
    }
  }
  .nick-name,
  .login-now {
    position: relative;
    text-align: center;
    padding-top: 0.5rem;
    height: 0.68rem;
    font-size: $font-size-l;
    font-weight: 700;
  }
  .login-now {
    color: $gray-deep;
  }
  .follow {
    padding-top: 0.1rem;
    text-align: center;
    font-size: $font-size-xs;
    color: $gray;
    span {
      color: $black;
    }
  }
  .log-out {
    position: absolute;
    top: -0.1rem;
    right: 0;
    font-size: $font-size-xxl;
    color: $red;
    padding: 0.1rem;
  }
}
</style>
