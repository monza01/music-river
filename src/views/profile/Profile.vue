<template>
  <div class="container">
    <loader v-if="loading"></loader>
    <bg-container
      v-else
      :bg-img-url="profile.backgroundUrl"
      page-title="个人中心"
      :needb-ack-btn="false"
      :remember-scroll="true"
    >
      <template>
        <div class="content">
          <user-card
            class="the-user-card"
            :logged="logged"
            :profile="profile"
            :level="level"
            @loginBtnClicked="toLoginPage"
          ></user-card>
          <div class="favorite">
            <img
              v-if="logged"
              class="coverImg"
              :src="favoriteSongs.coverImgUrl"
              alt=""
            />
            <img
              v-else
              class="coverImg"
              src="https://p2.music.126.net/2paqLHto1pF9TYUOSvgIIw==/109951165448455035.jpg"
              alt=""
            />
            <div class="msg">
              <p class="name-msg">我喜欢的音乐</p>
              <p class="sub-msg">{{ favoriteSongs.trackCount || 0 }}首</p>
            </div>
            <div class="heart-beat-mode">
              <span class="icon-heartbeat"></span> 心动模式
            </div>
          </div>
          <div class="created">
            <div class="the-title">
              创建歌单（{{ createdPlaylists.length }}个）
            </div>
            <disc-list :play-list-data="createdPlaylists"></disc-list>
          </div>
          <div class="collected">
            <div class="the-title">
              收藏歌单（{{ collectedPlaylists.length }}个）
            </div>
            <disc-list :play-list-data="collectedPlaylists"></disc-list>
          </div>
          <div class="record">
            <div class="the-title">最近播放（{{ recordLength }}首）</div>
            <music-list :needIndex="false" :play-list="record"></music-list>
            <div class="check-more" @click="checkMore">
              {{ logged ? "查看更多" : "去登陆" }}
            </div>
          </div>
        </div>
      </template>
    </bg-container>
  </div>
</template>

<script>
import axios from "axios";
import { mapGetters } from "vuex";
import { getProfile, getRecord, getUserPlaylists } from "@/api/user";
import BgContainer from "@/components/bg-container/BgContainer";
import UserCard from "@/components/user/UserCard";
import DiscList from "@/components/lists/DiscList";
import MusicList from "@/components/lists/MusicList";

export default {
  name: "Profile",
  data() {
    return {
      profile: {},
      level: 0,
      tags: ["创建歌单", "收藏歌单", "最近播放"],
      loading: false,
      record: [],
      recordLength: 0,
      favoriteSongs: {},
      createdPlaylists: [],
      collectedPlaylists: []
    };
  },
  components: {
    UserCard,
    BgContainer,
    DiscList,
    MusicList
  },
  computed: {
    ...mapGetters(["logged", "userId"])
  },
  methods: {
    getData() {
      this.loading = true;
      axios
        .all([
          getProfile({ uid: this.userId }),
          getRecord({ uid: this.userId, type: 1 }),
          getUserPlaylists({ uid: this.userId })
        ])
        .then(
          axios.spread((profile, record, userPlaylists) => {
            this.profile = profile.profile;
            this.level = profile.level;
            this.recordLength = record.weekData.length;
            this.record = record.weekData.slice(0, 10).map(item => {
              return item.song;
            });
            userPlaylists.playlist.forEach(item => {
              if (item.creator.userId === this.userId) {
                this.createdPlaylists.push(item);
              } else {
                this.collectedPlaylists.push(item);
              }
            });
            this.favoriteSongs = this.createdPlaylists[0];
            this.createdPlaylists.shift();
            this.loading = false;
          })
        );
    },

    toLoginPage() {
      this.$router.push("/login").catch(err => err);
    },
    checkMore() {
      if (!this.logged) {
        this.$router.push("/login").catch(err => err);
      }
    }
  },
  created() {
    if (this.logged) {
      this.getData();
    }
  },
  watch: {
    logged(value) {
      if (value) {
        this.getData();
      } else {
        window.location.reload();
      }
    }
  }
};
</script>

<style scoped lang="scss">
@import "~@/assets/style/variables.scss";
@import "~@/assets/style/mixin.scss";

.content {
  padding: 0.7rem 0.15rem 0;
  margin-top: 1.9rem;
  min-height: calc(100% - 1rem);
  background-color: $gray-light;
  border-top-left-radius: 0.2rem;
  border-top-right-radius: 0.2rem;
  .user-card {
    position: absolute;
    top: 1.5rem;
  }
  .favorite {
    display: flex;
    padding: 0.1rem;
    background-color: $white;
    border-radius: 0.1rem;
    .coverImg {
      @include wh(0.6rem, 0.6rem);
      border-radius: 0.1rem;
      margin-right: 0.1rem;
    }
    .msg {
      width: 50%;
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
      .icon-heartbeat {
        position: absolute;
        left: 0.06rem;
        color: $red;
        padding-top: 0.05rem;
      }
    }
  }
  .record,
  .collected,
  .created {
    padding: 0.1rem;
    background-color: #fff;
    margin-top: 0.1rem;
    border-radius: 0.1rem;
  }
  .the-title {
    padding-bottom: 0.15rem;
    color: $gray;
  }
  .check-more {
    padding: 0.1rem 0 0.05rem;
    font-size: $font-size-m;
    color: $gray;
    text-align: center;
  }
}
</style>
