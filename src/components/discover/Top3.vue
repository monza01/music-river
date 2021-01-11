<template>
  <div class="top3">
    <img class="cover" v-lazy="listData.coverImgUrl" alt="" />
    <div class="list">
      <h3 class="title">{{ listData.name }}</h3>
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
    listData: {
      type: Object,
      default: () => {
        return [];
      }
    }
  }
};
</script>

<style scoped lang="scss">
@import "~@/assets/style/variables.scss";
@import "~@/assets/style/mixin.scss";

.top3 {
  display: flex;
  background-color: $gray-light;
  width: 100%;
  border-radius: 0.1rem 0.05rem 0.05rem 0.1rem;
  box-shadow: 0 0 1px 0 rgba(0, 0, 0, 0.3);
  .cover {
    width: 1rem;
    height: 1rem;
    border-radius: 0.1rem;
    box-shadow: 1px 0 2px 1px rgba(0, 0, 0, 0.3);
  }
  .list {
    padding-left: 0.15rem;
    width: 60%;
    .title {
      height: 0.35rem;
      line-height: 0.35rem;
    }
    li {
      @include no-wrap;
      height: 0.2rem;
      color: $gray-deep;
    }
  }
}
</style>
