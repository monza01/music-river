<template>
  <div class="login">
    <div class="info">登录</div>
    <div class="account-box">
      <input
        :type="currentType"
        :placeholder="currentPlaceholder"
        @focus="handleFocus(0)"
        @blur="handleBlur"
        @input="inputChange"
        :class="{ focused: isFocused(0) }"
        v-model="accountInfo"
        ref="accountInput"
      />
      <span
        v-show="this.accountInfo"
        class="icon-cancel"
        @click.prevent="clearValue(0)"
      ></span>
    </div>
    <div class="pwd-box">
      <input
        type="password"
        placeholder="密码"
        @focus="handleFocus(1)"
        @blur="handleBlur"
        @input="inputChange"
        :class="{ focused: isFocused(1) }"
        v-model="password"
        ref="pwdInput"
      />
      <span
        class="icon-cancel"
        v-show="this.password"
        @click.prevent="clearValue(1)"
      ></span>
    </div>
    <div class="toggle-type" @click="toggleType">
      <span class="icon-exchange"></span> {{ toggleText }}
    </div>
    <div class="loginBtn" :class="{ filled: filled }">
      登录
    </div>
  </div>
</template>

<script>
export default {
  name: "LoginForm",
  data() {
    return {
      phoneType: true,
      focusedInput: -1,
      accountInfo: "",
      password: "",
      filled: false
    };
  },
  computed: {
    currentPlaceholder() {
      return this.phoneType ? "请输入手机号" : "请输入邮箱";
    },
    toggleText() {
      return this.phoneType ? "使用邮箱登录" : "使用手机号登录";
    },
    currentType() {
      return this.phoneType ? "tel" : "email";
    },
    isFocused() {
      return function(n) {
        return this.focusedInput === n;
      };
    }
  },
  methods: {
    toggleType() {
      this.phoneType = !this.phoneType;
      this.accountInfo = "";
      this.password = "";
    },
    handleFocus(n) {
      this.focusedInput = n;
    },
    handleBlur() {
      this.focusedInput = -1;
    },
    clearValue(n) {
      if (n === 0) {
        this.$refs.accountInput.focus();
        this.accountInfo = "";
      } else {
        this.$refs.pwdInput.focus();
        this.password = "";
      }
    },
    inputChange() {
      this.filled = !!(this.accountInfo && this.password.length >= 6);
    }
  }
};
</script>

<style scoped lang="scss">
@import "~@/assets/style/variables.scss";

.info {
  font-size: $font-size-m;
  font-weight: 700;
  padding: 0 0.25rem;
}
.account-box,
.pwd-box {
  position: relative;
  padding: 0 0.25rem;

  input {
    margin: 0.1rem 0;
    width: 100%;
    height: 0.5rem;
    border-bottom: 1px solid $gray-light;
  }
  .icon-cancel {
    position: absolute;
    padding: 0.05rem;
    top: 0.25rem;
    right: 0.1rem;
    color: $gray;
    font-size: $font-size-l;
  }
}

.toggle-type {
  padding: 0.1rem 0.25rem;
  color: $gray-deep;
}
.focused {
  border-bottom: 1px solid $theme;
}
.loginBtn {
  height: 0.5rem;
  margin: 0.15rem 0;
  font-size: $font-size-l;
  font-weight: 700;
  color: $white;
  text-align: center;
  line-height: 0.5rem;
  background-color: $theme-light;
}
.filled {
  background-color: $theme;
}
</style>
