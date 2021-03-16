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
              <play-all-button :music-list="dailySongs"> </play-all-button>
              <music-list
                @select="selectItem"
                :cover="true"
                :playList="dailySongs"
                :special-index="false"
                :current-playing="currentPlaying"
              ></music-list>
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
import PlayAllButton from "@/views/common/PlayAllButton";
import { getDailySongs } from "@/api/common";
import { mapActions, mapGetters } from "vuex";

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
    MusicList,
    PlayAllButton
  },
  created() {
    this.getDailySongs();
  },
  methods: {
    ...mapActions(["selectPlay"]),
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
    },
    selectItem(item, index) {
      this.selectPlay({
        list: this.dailySongs,
        index: index
      });
    }
  },
  computed: {
    ...mapGetters(["playlist", "currentIndex"]),
    day() {
      return this.formatNum(this.date.getDate());
    },
    month() {
      return this.formatNum(this.date.getMonth() + 1);
    },
    currentPlaying() {
      if (this.playlist.length > 0) {
        return this.dailySongs.findIndex(item => {
          return item.id === this.playlist[this.currentIndex].id;
        });
      } else {
        return -1;
      }
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
    padding: 0.1rem 0;
  }
}
</style>
