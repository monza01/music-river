<template>
  <ul>
    <li v-for="item in playListData" :key="item.id" class="disc-item">
      <img class="coverImg" v-lazy="item.coverImgUrl" alt="" />
      <div class="msg">
        <p class="name-msg">{{ item.name }}</p>
        <p class="sub-msg">
          {{ item.trackCount }}首 by {{ item.creator.nickname }}
        </p>
      </div>
    </li>
  </ul>
</template>

<script>
export default {
  name: "DiscList",
  props: {
    playListData: Array
  }
};
</script>

<style scoped lang="scss">
@import "~@/assets/style/variables.scss";
@import "~@/assets/style/mixin.scss";

.disc-item {
  display: flex;
  padding-bottom: 0.1rem;
  .coverImg {
    @include wh(0.6rem, 0.6rem);
    border-radius: 0.1rem;
    margin-right: 0.1rem;
  }
  .msg {
    width: 75%;
    padding-top: 0.12rem;
    .name-msg {
      @include no-wrap;
      font-size: $font-size-m;
    }
    .sub-msg {
      font-size: $font-size-xs;
      color: $gray;
      margin-top: 0.08rem;
    }
  }
  .heart-beat-mode {
    @include height(0.24rem);
    position: relative;
    top: 0.15rem;
    border-radius: 0.12rem;
    padding: 0 0.05rem 0 0.25rem;
    border: 1px solid $gray;
  }
}
</style>
