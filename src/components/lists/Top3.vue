<template>
  <div
    class="top3"
    ref="test"
    :style="background"
    @click="rankClicked(listData.id)"
  >
    <img class="cover" v-lazy="setUrl(listData.coverImgUrl, 100, 100)" alt="" />
    <div class="list">
      <div class="sup-msg">
        <h3 class="title">{{ listData.name }}</h3>
        <h6 class="update-frequency">{{ listData.updateFrequency }}</h6>
      </div>
      <ul>
        <li v-for="(item, index) in listData.tracks" :key="index">
          <b>{{ "0" + (index + 1) }} </b>
          <span class="song-name">{{ item.first }} - </span>
          <span class="singer">{{ item.second }}</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: "RankSummary",
  props: {
    listData: Object,
    bgColor: {
      type: String,
      default: "white"
    }
  },
  computed: {
    background() {
      return "background-color:" + this.bgColor;
    }
  },
  methods: {
    rankClicked(id) {
      this.bus.$emit("rankClicked", id);
    }
  }
};
</script>

<style scoped lang="scss">
@import "~@/assets/style/variables.scss";
@import "~@/assets/style/mixin.scss";

.top3 {
  display: flex;
  width: 100%;
  border-radius: 0.1rem 0.05rem 0.05rem 0.1rem;
  .cover {
    @include box(1rem, 1rem, 0.1rem);
    box-shadow: 1px 0 2px 1px rgba(0, 0, 0, 0.2);
  }
  .list {
    padding-left: 0.15rem;
    width: 60%;
    .sup-msg {
      position: relative;
      .title {
        @include height(0.35rem);
      }
      .update-frequency {
        position: absolute;
        top: 0.05rem;
        right: -0.1rem;
        font-size: 10px;
        color: $gray;
      }
    }
    li {
      @include no-wrap;
      height: 0.2rem;
      color: $gray-deep;
    }
  }
}
</style>
