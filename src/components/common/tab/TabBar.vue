<template>
  <div id="tab-bar">
    <TabItem link="/discover">
      <template v-slot:icon>
        <div class="icon-headphones"></div>
      </template>
      <template v-slot:text>
        <p>发现</p>
      </template>
    </TabItem>

    <div>
      <img
        @click="nav"
        class="record"
        src="~@/assets/images/record-player.png"
        alt="正在播放"
      />
    </div>

    <TabItem link="/profile">
      <template v-slot:icon>
        <span class="icon-user"></span>
      </template>
      <template v-slot:text>
        <p>我的</p>
      </template>
    </TabItem>
  </div>
</template>

<script>
import TabItem from "@/components/common/tab/TabItem";
export default {
  name: "tabBar",
  components: {
    TabItem
  },
  methods: {
    nav() {
      this.$router.replace("/player").catch(err => err);
    }
  }
};
</script>

<style scoped lang="scss">
#tab-bar {
  display: flex;
  position: fixed;
  max-width: 1024px;
  margin: 0 auto;
  left: 0;
  right: 0;
  bottom: 0;
  height: 0.49rem;
  .record {
    transform: translateY(-5px);
    width: 0.5rem;
  }
}
</style>
