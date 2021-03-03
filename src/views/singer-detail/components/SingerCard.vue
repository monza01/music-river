<template>
  <div class="user-card">
    <div class="avatar">
      <img v-lazy="setUrl(profile.cover, 76, 76)" alt="" />
    </div>
    <div class="nick-name">{{ profile.name }}</div>
    <div class="count">
      <span
        >歌曲： <i>{{ profile.musicSize }}</i>
      </span>
      <span
        >MV： <i>{{ profile.mvSize }}</i></span
      >
    </div>
  </div>
</template>

<script>
export default {
  name: "SingerCard",
  props: {
    profile: Object
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
  .nick-name {
    position: relative;
    text-align: center;
    padding-top: 0.5rem;
    height: 0.68rem;
    font-size: $font-size-l;
    font-weight: 700;
  }
  .count {
    padding-top: 0.1rem;
    text-align: center;
    font-size: $font-size-xs;
    color: $gray;
    span {
      padding: 0 0.05rem;
      color: $black;
      i {
        color: $gray;
      }
    }
  }
}
</style>
