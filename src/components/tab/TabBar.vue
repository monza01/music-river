<template>
  <div id="tab-bar" class="container">
    <tab-item link="/discover">
      <template v-slot:icon>
        <div class="icon-headphones"></div>
      </template>
      <template v-slot:text>
        <p>发现</p>
      </template>
    </tab-item>

    <div>
      <img
        class="record"
        src="~@/assets/images/icon/record-player.png"
        alt="正在播放"
      />
    </div>

    <tab-item link="/profile">
      <template v-slot:icon>
        <span class="icon-user"></span>
      </template>
      <template v-slot:text>
        <p>我的</p>
      </template>
    </tab-item>
  </div>
</template>

<script>
import TabItem from "@/components/tab/TabItem";

export default {
  name: "tabBar",
  components: {
    TabItem
  }
};
</script>

<style scoped lang="scss">
@import "~@/assets/style/variables.scss";
@import "~@/assets/style/mixin.scss";

#tab-bar {
  @include wh(100%, 0.6rem);
  position: absolute;
  display: flex;
  bottom: 0;
  background-color: $white;
  z-index: 9;
  box-shadow: 0 2px 6px 0 rgba(0, 0, 0, 0.3);
  .record {
    transform: translateY(-5px);
    width: 0.5rem;
  }
}
</style>
