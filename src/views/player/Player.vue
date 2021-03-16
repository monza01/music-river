<template>
  <div class="player container" v-show="playlist.length > 0">
    <alert text="暂无版权" alert-type="normal" ref="alert"></alert>
    <transition name="up-down">
      <div class="normal-player" v-show="fullScreen">
        <transition name="fade">
          <div v-show="fullScreen" class="background">
            <img
              class="bg-img"
              v-if="currentSong.al"
              :src="currentSong.al.picUrl"
              alt=""
            />
            <div class="bg-wrapper"></div>
          </div>
        </transition>
        <div class="top">
          <div
            class="back-icon icon-angle-down"
            @click="setFullScreen(false)"
          ></div>
          <div class="title">
            <div class="song-name">
              <span v-if="currentSong.copyright" class="copyright">VIP</span
              >{{ currentSong.name }}
            </div>
            <div class="singers-name">
              <span v-for="(artist, index) in currentSong.ar" :key="index"
                >{{ artist.name
                }}<span v-if="currentSong.ar.length > index + 1">/</span>
              </span>
            </div>
          </div>
        </div>
        <div class="middle" @click="toggleMiddleView">
          <div class="middle-cd" v-show="!showFullLyric">
            <div class="cover-wrapper">
              <div class="cd-bg">
                <img
                  class="cover"
                  v-if="currentSong.al"
                  :src="currentSong.al.picUrl"
                  alt=""
                  :class="cdRotateClass"
                />
              </div>
            </div>
            <div class="current-lyric">
              <p>{{ currentLyric }}</p>
              <p>{{ currentTLyric }}</p>
            </div>
          </div>
          <div class="lyric" v-if="showFullLyric">
            <my-scroll ref="myScroll">
              <template v-slot:scrollContent>
                <div class="lyric-wrapper" v-if="lyric">
                  <div
                    ref="lyricLine"
                    class="lyric-text"
                    v-for="(line, index) in lyric.lines"
                    :key="index"
                    :class="{ current: currentLine === index }"
                  >
                    <p>{{ line.txt }}</p>
                    <p class="subTxt">{{ getTLyric(line.time) }}</p>
                  </div>
                </div>
                <div v-else>
                  <p>暂无歌词</p>
                </div>
              </template>
            </my-scroll>
          </div>
        </div>
        <div class="bottom">
          <div class="control">
            <div class="control-bar">
              <span class="duration">{{ formatTime(currentTime) }}</span>
              <progress-bar
                :percent="progressPercent"
                @progressChange="changeProgress"
              ></progress-bar>
              <span class="duration">{{
                formatTime(currentSong.dt / 1000)
              }}</span>
            </div>
            <div class="control-buttons">
              <div class="mode" :class="playModeIcon" @click="changeMode"></div>
              <div
                class="prev-btn icon-skip_previous"
                @click="prev"
                :class="disableClass"
              ></div>
              <div
                class="play-btn"
                :class="playIcon"
                @click="togglePlaying"
              ></div>
              <div
                class="next-btn icon-skip_next"
                @click="next"
                :class="disableClass"
              ></div>
              <div
                class="like-btn icon-heart"
                :class="likeBtnClass"
                @click="likeMusic"
              ></div>
            </div>
          </div>
        </div>
      </div>
    </transition>
    <transition name="up-down">
      <div
        v-show="!fullScreen && playlist.length > 0 && !showTab"
        class="mini-player"
        @click="setFullScreen(true)"
      >
        <cd-cover class="cd"></cd-cover>
        <div class="music-msg">
          <span class="song-name"> {{ currentSong.name }} (</span>
          <span v-for="(artist, index) in currentSong.ar" :key="index"
            >{{ artist.name
            }}<span v-if="currentSong.ar.length > index + 1">/</span> </span
          >)
        </div>
        <div class="mini-control">
          <div
            class="prev-btn icon-skip_previous"
            @click.stop="prev"
            :class="disableClass"
          ></div>
          <div
            class="play-btn"
            :class="playIcon"
            @click.stop="togglePlaying"
          ></div>
          <div
            class="next-btn icon-skip_next"
            @click.stop="next"
            :class="disableClass"
          ></div>
        </div>
      </div>
    </transition>
    <audio
      :src="musicUrl"
      ref="audio"
      @canplay="ready"
      @error="error"
      @timeupdate="updateTime"
      @ended="end"
    ></audio>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";
import { getMusicUrl, getLyric } from "@/api/common";
import { getLikeList, likeMusic } from "@/api/user";
import { playMode } from "@/utils/config";
import { shuffle } from "@/utils/utils";
import ProgressBar from "@/components/progress/ProgressBar";
import CdCover from "@/views/player/components/CdCover";
import MyScroll from "@/components/scroll/MyScroll";
import Lyric from "lyric-parser";
import Alert from "@/components/popup/Alert";

export default {
  name: "Player",
  data() {
    return {
      musicUrl: "",
      canPlay: false,
      songLoaded: false,
      currentTime: 0,
      lyric: null,
      tLyric: null,
      showFullLyric: false,
      currentLine: 0,
      currentLyric: "",
      currentTLyric: "",
      likeList: [],
      liked: false
    };
  },
  components: {
    ProgressBar,
    CdCover,
    MyScroll,
    Alert
  },
  created() {
    this.timer = null;
    this.timer2 = null;
    if (this.logged) {
      this.getLikeList();
    }
  },
  computed: {
    ...mapGetters([
      "userId",
      "fullScreen",
      "playlist",
      "sequenceList",
      "currentSong",
      "playing",
      "showTab",
      "currentIndex",
      "mode",
      "logged"
    ]),
    playIcon() {
      return this.playing
        ? "icon-pause_circle_outline"
        : "icon-play_circle_outline";
    },
    playModeIcon() {
      return this.mode === playMode.sequence
        ? "icon-repeat"
        : this.mode === playMode.loop
        ? "icon-repeat_one"
        : "icon-shuffle";
    },
    cdRotateClass() {
      return this.playing ? "play" : "play pause";
    },
    disableClass() {
      return this.songLoaded ? "" : "disable";
    },
    likeBtnClass() {
      return this.liked ? "liked" : "";
    },
    progressPercent() {
      return this.currentTime / (this.currentSong.dt / 1000);
    }
  },
  methods: {
    ...mapMutations([
      "SET_FULL_SCREEN",
      "SET_PLAYING_STATE",
      "SET_CURRENT_INDEX",
      "SET_PROGRESS",
      "SET_PLAY_MODE",
      "SET_PLAYLIST"
    ]),
    getLikeList() {
      getLikeList({
        uid: this.userId
      }).then(res => {
        this.likeList = res.ids;
      });
    },
    likeMusic() {
      likeMusic({
        like: !this.liked,
        id: this.currentSong.id
      }).then(res => {
        if (res.code === 200) {
          this.liked = !this.liked;
        }
      });
    },
    setFullScreen(flag) {
      this.SET_FULL_SCREEN(flag);
    },
    playMusic() {
      this.canPlay = false;
      getMusicUrl({
        id: this.currentSong.id
      }).then(res => {
        if (res.data[0].url) {
          this.musicUrl = res.data[0].url;
          this.canPlay = true;
          clearTimeout(this.timer);
          this.timer = setTimeout(() => {
            this.$refs.audio.play();
            this.getLyric();
          }, 500);
        } else {
          this.songLoaded = true;
          this.$refs.alert.show();
          clearTimeout(this.timer2);
          this.timer2 = setTimeout(() => {
            this.next();
          }, 3000);
        }
      });
    },
    getLyric() {
      getLyric({
        id: this.currentSong.id
      })
        .then(res => {
          if (res.lrc) {
            this.lyric = new Lyric(res.lrc.lyric, this.handleLyric);
            if (this.playing) {
              this.lyric.play();
              if (this.showFullLyric) {
                this.$refs.myScroll.scrollTo(0);
              }
            }
          } else {
            this.lyric = null;
          }
          if (res.tlyric) {
            this.tLyric = new Lyric(res.tlyric.lyric);
          } else {
            this.tlyric = null;
          }
        })
        .catch(() => {
          this.lyric = null;
          this.currentTLyric = "";
          this.currentLyric = "";
          this.currentLine = 0;
        });
    },
    getTLyric(time) {
      const arr = this.tLyric.lines.filter(item => {
        return item.time === time;
      });
      return arr.length > 0 ? arr[0].txt : "";
    },
    handleLyric({ lineNum, txt }) {
      this.currentLine = lineNum;
      this.currentLyric = txt;
      const time = this.lyric.lines[lineNum].time;
      this.currentTLyric = this.getTLyric(time);
      if (this.showFullLyric && this.lyric) {
        let currentEle = document.querySelectorAll(".lyric-text")[lineNum];
        currentEle.scrollIntoView({
          behavior: "smooth",
          block: "center"
        });
      }
    },
    togglePlaying() {
      if (!this.songLoaded) {
        return;
      }
      this.SET_PLAYING_STATE(!this.playing);
      if (this.lyric) {
        this.lyric.togglePlay();
      }
    },
    prev() {
      if (!this.songLoaded) {
        return;
      }
      if (this.playlist.length === 1) {
        this.loop();
      } else {
        let index = this.currentIndex - 1;
        if (index === -1) {
          index = this.playlist.length - 1;
        }
        this.SET_CURRENT_INDEX(index);
        if (!this.playing) {
          this.togglePlaying();
        }
      }
      this.songLoaded = false;
    },
    next() {
      if (!this.songLoaded) {
        return;
      }
      if (this.playlist.length === 1) {
        this.loop();
      } else {
        let index = this.currentIndex + 1;
        if (index === this.playlist.length) {
          index = 0;
        }
        this.SET_CURRENT_INDEX(index);
        if (!this.playing) {
          this.togglePlaying();
        }
      }
      this.songLoaded = false;
    },
    ready() {
      this.songLoaded = true;
    },
    error() {
      this.songLoaded = true;
    },
    end() {
      if (this.mode === playMode.loop) {
        this.loop();
      } else {
        this.next();
      }
    },
    loop() {
      this.$refs.audio.currentTime = 0;
      this.$refs.audio.play();
      if (this.lyric) {
        this.lyric.seek(0);
      }
      if (this.showFullLyric && this.lyric) {
        let currentEle = document.querySelectorAll(".lyric-text")[0];
        currentEle.scrollIntoView({
          behavior: "smooth",
          block: "center"
        });
      }
    },
    updateTime(e) {
      this.currentTime = e.target.currentTime;
    },
    formatTime(interval) {
      interval = interval | 0;
      const minute = this._pad((interval / 60) | 0);
      const second = this._pad(interval % 60);
      return `${minute}:${second}`;
    },
    _pad(num, n = 2) {
      let length = num.toString().length;
      while (length < n) {
        num = "0" + num;
        length++;
      }
      return num;
    },
    changeProgress(newProgress) {
      const currentTime = (this.currentSong.dt / 1000) * newProgress;
      this.$refs.audio.currentTime = currentTime;
      if (!this.playing) {
        this.togglePlaying();
      }
      if (this.lyric) {
        this.lyric.seek(currentTime * 1000);
      }
    },
    changeMode() {
      const mode = (this.mode + 1) % 3;
      this.SET_PLAY_MODE(mode);
      let list = null;
      if (mode === playMode.random) {
        list = shuffle(this.sequenceList);
      } else {
        list = this.sequenceList;
      }
      let index = list.findIndex(item => {
        return item.id === this.currentSong.id;
      });
      this.SET_PLAYLIST(list);
      this.SET_CURRENT_INDEX(index);
    },
    toggleMiddleView() {
      this.showFullLyric = !this.showFullLyric;
    }
  },
  watch: {
    currentSong(newSong, oldSong) {
      if (newSong.id === oldSong.id) {
        return;
      }
      if (this.lyric) {
        this.lyric.stop();
      }
      this.currentLine = 0;
      this.currentLyric = "";
      this.currentTLyric = "";
      this.playMusic();
      this.liked = this.likeList.indexOf(this.currentSong.id) !== -1;
    },
    playing(newState) {
      const audio = this.$refs.audio;
      if (newState && this.canPlay) {
        audio.play();
      } else {
        audio.pause();
      }
    },
    progressPercent(newPercent) {
      this.SET_PROGRESS(newPercent);
    },
    showFullLyric(newState) {
      if (newState && this.lyric) {
        this.$nextTick(() => {
          let currentEle = document.querySelectorAll(".lyric-text")[
            this.currentLine
          ];
          currentEle.scrollIntoView({
            block: "center"
          });
        });
      }
    }
  }
};
</script>

<style scoped lang="scss">
@import "~@/assets/style/variables.scss";
@import "~@/assets/style/mixin.scss";
@import "~@/assets/style/transition.scss";

.player {
  .normal-player {
    @include wh(100%, 100%);
    position: fixed;
    top: 0;
    z-index: 999;
    background-color: #bababa;
    .background {
      @include wh(100%, 100%);
      position: absolute;
      top: 0;
      z-index: -1;
      .bg-img {
        @include wh(130%, 130%);
        transform: translate3d(-10%, -10%, 0);
        filter: blur(40px);
      }
      .bg-wrapper {
        @include wh(100%, 100%);
        @include position();
        background-color: rgba(0, 0, 0, 0.3);
      }
    }
    .top {
      color: $white;
      .back-icon {
        position: absolute;
        top: 0;
        padding: 0 0.1rem;
        font-size: 36px;
      }
      .title {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        padding: 0.1rem 0;
        .song-name {
          @include no-wrap;
          @include height(0.16rem);
          width: 60%;
          text-align: center;
          font-size: $font-size-m;
          .copyright {
            @include border($white);
            @include height(0.14rem);
            display: inline-block;
            padding: 0 0.03rem;
            margin-right: 0.02rem;
            border-radius: 0.04rem;
            font-size: 10px;
            text-align: center;
          }
        }
        .singers-name {
          @include no-wrap;
          padding-top: 0.05rem;
          width: 60%;
          height: 0.25rem;
          text-align: center;
          color: $gray-light;
        }
      }
    }
    .middle {
      @include flex();
      height: 70%;
      .middle-cd {
        @include flex();
        width: 100%;
        flex-direction: column;
        .cover-wrapper {
          @include box(3rem, 3rem);
          @include flex();
          background-color: rgba(255, 255, 255, 0.2);
          .cd-bg {
            @include box(3.2rem, 3.2rem);
            @include flex();
            background-image: url("~@/assets/images/background/cd.png");
            background-size: cover;
            background-position: center;
            .cover {
              @include box(2rem);
            }
          }
        }
        .current-lyric {
          height: 0.8rem;
          text-align: center;
          color: $white;
          padding: 0.3rem 0.2rem 0;
          p {
            padding: 2px 0;
          }
        }
      }

      .lyric {
        @include wh(100%, 100%);
        text-align: center;
        color: #a3a6a9;
        font-size: $font-size-m;
        .lyric-wrapper {
          padding: 0.2rem 0.5rem;
          .lyric-text {
            padding: 0.1rem 0;
            .subTxt {
              font-size: $font-size-s;
              padding-top: 3px;
            }
          }
          .current {
            color: white;
          }
        }
      }
    }
    .bottom {
      .control {
        position: absolute;
        bottom: 0;
        width: 100%;
        padding: 0 0.15rem;
        .control-bar {
          @include height(0.3rem);
          @include flex();
          .duration {
            padding: 0 0.1rem;
            color: $white;
          }
        }
        .control-buttons {
          display: flex;
          justify-content: space-between;
          align-items: center;
          color: rgba(255, 255, 255, 0.9);
          font-size: 32px;
          padding: 0.2rem 0.2rem 0.15rem;
          .play-btn {
            font-size: 60px;
          }
          .like-btn {
            font-size: 26px;
          }
          .liked {
            color: $red;
          }
        }
      }
    }
  }
  .mini-player {
    display: flex;
    position: absolute;
    bottom: 0;
    z-index: 999;
    width: 100%;
    height: 50px;
    background-color: #fcfcfc;
    box-shadow: 0 -1px 1px rgba(0, 0, 0, 0.1);
    padding-left: 70px;
    .cd {
      position: absolute;
      left: 15px;
      top: -10px;
    }
    .music-msg {
      @include no-wrap;
      @include wh(60%, 50px);
      line-height: 50px;
      font-size: 14px;
      color: $black;
    }
    .mini-control {
      display: flex;
      flex: 1;
      justify-content: space-between;
      align-items: center;
      padding-right: 15px;
      color: $black;
      font-size: 24px;
      .play-btn {
        font-size: 30px;
      }
    }
  }
}
.play {
  animation: rotate 20s linear infinite;
}
.pause {
  animation-play-state: paused;
}
.disable {
  color: rgba(255, 255, 255, 0.3);
}
@keyframes rotate {
  0% {
    transform: rotate(0);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
