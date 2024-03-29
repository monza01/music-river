<template>
  <div class="rank-lists container">
    <page-title page-title="排行榜"></page-title>
    <div class="top-lists">
      <my-scroll :remember-scroll="true" ref="myScroll">
        <template v-slot:scrollContent>
          <loader v-if="loading"></loader>
          <div v-else class="scroll-content">
            <div class="list-container">
              <h3 class="title">推荐榜单</h3>
              <div class="recommended">
                <song-list-cover
                  v-for="item in recommended"
                  :key="item.id"
                  :detail="item"
                  sub-msg-type="updateFrequency"
                  @coverClicked="toRankDetail"
                ></song-list-cover>
              </div>
            </div>
            <div class="list-container">
              <h3 class="title">官方榜单</h3>
              <div class="official">
                <top3
                  v-for="(item, index) in official"
                  :key="item.id"
                  :list-data="item"
                  :bg-color="bgColor[index]"
                ></top3>
              </div>
            </div>
            <div class="list-container">
              <h3 class="title">精选榜单</h3>
              <div class="chosen">
                <song-list-cover
                  v-for="item in chosen"
                  :key="item.id"
                  :detail="item"
                  sub-msg-type="updateFrequency"
                ></song-list-cover>
              </div>
            </div>
          </div>
        </template>
      </my-scroll>
    </div>
  </div>
</template>

<script>
import { getRankSummary } from "@/api/common";
import PageTitle from "@/components/title/PageTitle";
import MyScroll from "@/components/scroll/MyScroll";
import SongListCover from "@/components/cover/SongListCover";
import Top3 from "@/components/lists/Top3";
import { routerMixin, paddingMixin } from "@/utils/mixin";
import { mapMutations } from "vuex";

export default {
  mixins: [routerMixin, paddingMixin],
  name: "Ranks",
  data() {
    return {
      recommended: [],
      official: [],
      chosen: [],
      bgColor: ["#eaeff5", "#e9f2f1", "#f8e9ee", "#f8f1eb"],
      loading: false
    };
  },
  components: {
    PageTitle,
    MyScroll,
    SongListCover,
    Top3
  },
  created() {
    this.getRanksData();
  },
  activated() {
    this.bus.$on("coverClicked", id => {
      this.toRankDetail(id);
    });
    this.bus.$on("rankClicked", id => {
      this.toRankDetail(id);
    });
  },
  mounted() {
    this.SET_CACHE_VIEWS("Ranks");
    this.bus.$on("coverClicked", id => {
      this.toRankDetail(id);
    });
    this.bus.$on("rankClicked", id => {
      this.toRankDetail(id);
    });
  },
  methods: {
    ...mapMutations(["SET_CACHE_VIEWS", "REMOVE_CACHE_VIEWS"]),
    getRanksData() {
      this.loading = true;
      getRankSummary().then(res => {
        res.list.forEach((item, index) => {
          if (index < 4) {
            this.official.push(item);
          } else if (
            item.id === 180106 ||
            item.id === 60198 ||
            item.id === 11641012
          ) {
            this.recommended.push(item);
          } else {
            this.chosen.push(item);
          }
        });
        this.loading = false;
      });
    }
  },
  beforeRouteLeave(to, from, next) {
    if (to.meta.index > from.meta.index) {
      this.SET_CACHE_VIEWS("Ranks");
    } else {
      this.REMOVE_CACHE_VIEWS("Ranks");
    }
    next();
  }
};
</script>

<style scoped lang="scss">
@import "~@/assets/style/variables.scss";

.rank-lists {
  background-color: $gray-light;
  .top-lists {
    height: calc(100% - 0.4rem);
    background-color: $gray-light;
    .title {
      padding: 0.2rem 0 0 0.05rem;
    }
    .list-container {
      margin-top: 0.15rem;
      background-color: $white;
      border-radius: 0.1rem;
      padding: 0 0.15rem;
      .recommended {
        display: flex;
        justify-content: space-between;
      }
      .official {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        padding: 0.15rem 0;
        height: 4.6rem;
      }
      .chosen {
        display: flex;
        justify-content: space-between;
        flex-wrap: wrap;
      }
    }
  }
}
</style>
