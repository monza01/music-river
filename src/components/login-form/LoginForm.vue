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
        v-model.trim="accountInfo"
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
        v-model.trim="password"
        ref="pwdInput"
        @keyup.enter="submitData"
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
    <div @click="submitData" class="login-btn" :class="{ valid: valid }">
      登录
    </div>
  </div>
</template>

<script>
const PHONE_PATTERN = /^1[3456789]\d{9}$/;
const EMAIL_PATTERN = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;

export default {
  name: "LoginForm",
  data() {
    return {
      phoneType: true,
      focusedInput: -1,
      accountInfo: "",
      password: "",
      valid: false,
      showAlert: false,
      clicked: false
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
      if (this.phoneType) {
        this.valid =
          PHONE_PATTERN.test(this.accountInfo) && this.password.length >= 6;
      } else {
        this.valid =
          EMAIL_PATTERN.test(this.accountInfo) && this.password.length >= 6;
      }
    },
    submitData() {
      this.$emit("loginClicked", {
        accountInfo: this.accountInfo,
        password: this.password,
        type: this.phoneType ? "phone" : "email",
        valid: this.valid
      });
    }
  }
};
</script>

<style scoped lang="scss">
@import "~@/assets/style/variables.scss";
@import "~@/assets/style/mixin.scss";

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
    @include wh(100%, 0.5rem);
    margin: 0.1rem 0;
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

.login-btn {
  @include height(0.5rem);
  margin: 0.15rem 0;
  font-size: $font-size-l;
  font-weight: 700;
  color: $white;
  text-align: center;
  background-color: $theme-light;
}

.valid {
  background-color: $theme;
}
</style>
