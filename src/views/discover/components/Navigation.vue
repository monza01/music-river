<template>
  <div class="nav">
    <nav-item title="今日推荐" :link="dailyItemLink">
      <template v-slot:icon>
        <img src="~@/assets/images/icon/calendar.png" alt="" />
      </template>
    </nav-item>
    <nav-item title="歌手榜" link="/singers">
      <template v-slot:icon>
        <img src="~@/assets/images/icon/singer.png" alt="" />
      </template>
    </nav-item>
    <nav-item title="排行榜" link="/ranks">
      <template v-slot:icon>
        <img src="~@/assets/images/icon/rank.png" alt="" />
      </template>
    </nav-item>
    <nav-item title="歌单" link="/playlists">
      <template v-slot:icon>
        <img src="~@/assets/images/icon/music-list.png" alt="" />
      </template>
    </nav-item>
  </div>
</template>

<script>
import NavItem from "@/components/nav-item/NavItem";
import { mapGetters } from "vuex";

export default {
  name: "Navigation",
  components: {
    NavItem
  },
  computed: {
    ...mapGetters(["logged"]),
    dailyItemLink() {
      return this.logged ? "/daily" : "login";
    }
  }
};
</script>

<style scoped lang="scss">
@import "~@/assets/style/variables.scss";

.nav {
  display: flex;
  justify-content: space-around;
  background-color: $white;
}
</style>
