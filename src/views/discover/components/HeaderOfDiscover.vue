<template>
  <div class="header">
    <div class="lists" @click="listIconClicked">
      <span class="icon-queue_music"></span>
    </div>
    <div class="searchBox" @click="searchClicked">
      <span class="icon-search"></span>
      <span>音乐/歌手</span>
    </div>
    <div class="login-box">
      <img @click="avatarClicked" v-if="avatar" :src="avatar" alt="" />
      <img
        v-else
        src="~@/assets/images/icon/login.png"
        alt=""
        @click="loginClicked"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: "HeaderOfDiscover",
  methods: {
    loginClicked() {
      this.$emit("loginClicked");
    },
    avatarClicked() {
      this.$emit("avatarClicked");
    },
    searchClicked() {
      this.$emit("searchClicked");
    },
    listIconClicked() {
      this.$emit("listIconClicked");
    }
  },
  props: {
    avatar: String
  }
};
</script>

<style scoped lang="scss">
@import "~@/assets/style/variables.scss";
@import "~@/assets/style/mixin.scss";

.header {
  @include wh(100%, 0.44rem);
  position: absolute;
  z-index: 100;
  display: flex;
  align-items: center;
  text-align: center;
  color: #37474f;
  .login-box,
  .lists {
    padding: 0.05rem 0.15rem 0;
  }
  img {
    @include box(0.3rem, 0.3rem);
  }
  .lists {
    .icon-queue_music {
      font-size: $font-size-xxl;
    }
  }
  .searchBox {
    @include height(0.34rem);
    flex: 1;
    border-radius: 0.17rem;
    color: $gray;
    background-color: $gray-light;
    span {
      padding: 0 0.03rem;
      font-size: $font-size-s;
    }
  }
}
</style>
