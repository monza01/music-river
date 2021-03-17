<template>
  <progress-circle
    :radius="cdRadius"
    class="progress-circle"
    :percent="progress"
  >
    <template v-slot:default>
      <div class="cd-bg">
        <img
          class="cover"
          :class="cdRotateClass"
          v-if="currentSong.al"
          :src="currentSong.al.picUrl"
          alt=""
        />
      </div>
    </template>
  </progress-circle>
</template>

<script>
import ProgressCircle from "@/components/progress/ProgressCircle";
import { mapGetters } from "vuex";
export default {
  name: "CdCover",
  components: {
    ProgressCircle
  },
  data() {
    return {
      cdRadius: 50
    };
  },
  computed: {
    ...mapGetters(["currentSong", "playing", "progress"]),
    cdRotateClass() {
      return this.playing ? "play" : "play pause";
    }
  }
};
</script>

<style scoped lang="scss">
@import "~@/assets/style/variables.scss";
@import "~@/assets/style/mixin.scss";
.progress-circle {
  .cd-bg {
    @include box(42px, 42px);
    @include flex();
    position: absolute;
    left: 4px;
    top: 4px;
    background-image: url("https://www.flaticon.com/svg/vstatic/svg/187/187518.svg?token=exp=1615932957~hmac=70b5106d3b89afdf4a1146a4af09298b");
    background-size: cover;
    background-position: center;
    .cover {
      @include box(30px);
    }
  }
}
.play {
  animation: rotate 20s linear infinite;
}
.pause {
  animation-play-state: paused;
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
