<template>
  <bg-container
    :bg-img-url="backgroundUrl"
    pageTitle="个人中心"
    :needBackBtn="false"
  >
    <template>
      <div class="user-page container">
        <div class="content">
          <user-card
            class="the-user-card"
            :logged="logged"
            :profile="profile"
            :level="level"
            @loginBtnClicked="toLoginPage"
          ></user-card>
        </div>
      </div>
    </template>
  </bg-container>
</template>

<script>
import { mapGetters } from "vuex";
import { getPfrofile } from "@/api/user";
import BgContainer from "@/components/common/bg-container/BgContainer";
import UserCard from "@/components/common/user/UserCard";

export default {
  name: "Profile",
  data() {
    return {
      profile: {},
      level: 0
    };
  },
  components: {
    UserCard,
    BgContainer
  },
  created() {
    if (this.logged) {
      this.getProfile();
    }
  },
  computed: {
    ...mapGetters(["logged", "userId"]),
    backgroundUrl() {
      return this.logged
        ? this.profile.backgroundUrl
        : "https://res.klook.com/image/upload/c_fill,w_960,h_460,f_auto/w_80,x_15,y_15,g_south_west,l_klook_water/activities/51988759-Sarangkot-Sunrise-View.webp";
    }
  },
  methods: {
    getProfile() {
      getPfrofile({
        uid: this.userId
      }).then(res => {
        this.profile = res.profile;
        this.level = res.level;
      });
    },
    toLoginPage() {
      this.$router.push("/login").catch(err => err);
    }
  }
};
</script>

<style scoped lang="scss">
@import "~@/assets/style/variables.scss";
@import "~@/assets/style/mixin.scss";

.user-page {
  width: 100%;
  padding-top: 1.9rem;
  .content {
    height: 20rem;
    background-color: $gray-light;
    border-top-left-radius: 0.2rem;
    border-top-right-radius: 0.2rem;
    .user-card {
      position: absolute;
      top: 1.5rem;
    }
  }
}
</style>
