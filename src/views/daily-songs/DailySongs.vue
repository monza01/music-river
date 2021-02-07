<template>
  <div class="daily-songs container">
    <bg-container page-title="今日推荐" :bg-img-url="bgImgUrl">
      <template>
        <div class="content">
          <div class="date">
            <span class="day">{{ month }}</span>
            <span class="month"> / {{ day }}</span>
            <span class="tips">根据您的音乐喜好推荐</span>
          </div>
          <div class="list-detail">
            <loader v-if="loading"></loader>
            <div v-else class="list-content">
              <div class="play-all">
                <span class="icon-play-circle"></span>
                播放全部
                <span class="count">（{{ dailySongs.length }}首）</span>
              </div>
              <music-list :cover="true" :playList="dailySongs"></music-list>
            </div>
          </div>
        </div>
      </template>
    </bg-container>
  </div>
</template>

<script>
import BgContainer from "@/components/bg-container/BgContainer";
import MusicList from "@/components/lists/MusicList";
import { getDailySongs } from "@/api/common";

export default {
  name: "DailySongs",
  data() {
    return {
      dailySongs: [],
      bgImgUrl: "",
      loading: {
        type: Boolean,
        default: true
      },
      date: new Date()
    };
  },
  components: {
    BgContainer,
    MusicList
  },
  created() {
    this.getDailySongs();
  },
  methods: {
    getDailySongs() {
      getDailySongs().then(res => {
        this.dailySongs = res.data.dailySongs;
        this.bgImgUrl = this.dailySongs[0].al.picUrl;
      });
      this.loading = false;
    },
    formatNum(num) {
      if (num < 10) {
        num = "0" + num;
      }
      return num;
    }
  },
  computed: {
    day() {
      return this.formatNum(this.date.getDate());
    },
    month() {
      return this.formatNum(this.date.getMonth() + 1);
    }
  }
};
</script>

<style scoped lang="scss">
@import "~@/assets/style/variables.scss";
@import "~@/assets/style/mixin.scss";

.date {
  padding: 0.2rem 0 0.1rem 0.1rem;
  .day {
    font-size: 50px;
    color: white;
  }
  .month {
    font-size: 30px;
    color: white;
  }
  .tips {
    color: $white;
    font-size: 12px;
    padding-left: 1.2rem;
  }
}
.list-detail {
  width: 100%;
  min-height: 8rem;
  background-color: $gray-light;
  padding: 0 0.15rem;
  .play-all {
    display: flex;
    padding: 0.1rem 0;
    align-items: center;
    font-size: $font-size-m;
    .icon-play-circle {
      padding-right: 0.05rem;
      font-size: $font-size-xl;
      color: $theme;
    }
    .count {
      font-size: $font-size-xs;
      color: $gray;
      font-weight: 700;
    }
  }
}
</style>
