<template>
  <div id="app" @touchmove.prevent>
    <router-view></router-view>
    <TabBar></TabBar>
  </div>
</template>

<script>
import TabBar from "@/components/common/tab/TabBar";

export default {
  components: {
    TabBar
  }
};
</script>

<style scoped lang="scss">
#app {
  position: relative;
  max-width: 760px;
  margin: 0 auto;
}
</style>
