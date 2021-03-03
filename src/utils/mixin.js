import { getChosenSongs, getTopSingers } from "@/api/common";

const LIMIT = 30;

export const playlistsMixin = {
  data() {
    return {
      playlistsData: [],
      loading: false,
      more: true,
      total: 0,
      pullUpLoad: true
    };
  },
  props: {
    cat: String,
    default: "全部"
  },
  created() {
    this.OFFSET = 30;
    this.getPlaylistsData();
  },
  methods: {
    getPlaylistsData() {
      getChosenSongs({
        limit: LIMIT,
        cat: this.cat,
        offset: 0
      }).then(res => {
        this.playlistsData = res.playlists;
        this.total = res.total;
      });
    },
    getMoreData() {
      if (!this.loading && this.more) {
        this.loading = true;
        getChosenSongs({
          limit: LIMIT,
          cat: this.cat,
          offset: this.OFFSET
        }).then(res => {
          res.playlists.forEach(item => {
            this.playlistsData.push(item);
          });
          this.OFFSET += LIMIT;
          this.loading = false;
          this.more = this.playlistsData.length < this.total;
          this.pullUpLoad = this.more;
        });
      }
    }
  }
};

export const singersMixin = {
  data() {
    return {
      singers: [],
      time: 0,
      loading: true
    };
  },
  props: {
    cat: {
      type: Number,
      default: 1
    }
  },
  created() {
    this.getTopSingers();
  },

  methods: {
    getTopSingers() {
      getTopSingers({
        type: this.cat
      }).then(res => {
        this.singers = res.list.artists;
        this.time = res.list.updateTime;
        this.loading = false;
      });
    }
  },
  computed: {
    updateTime() {
      const date = new Date(this.time);
      return date.getMonth() + 1 + "月" + date.getDate() + "日";
    }
  }
};

export const routerMixin = {
  methods: {
    toPlaylistsDetail(id) {
      this.$router
        .push({
          path: `/playlists/detail/${id}`,
          query: {
            type: "music-lists"
          }
        })
        .catch(err => err);
    },
    toRankDetail(id) {
      this.$router
        .push({
          path: `/playlists/detail/${id}`,
          query: {
            type: "rank"
          }
        })
        .catch(err => err);
    }
  },
  deactivated() {
    this.bus.$off(["coverClicked", "rankClicked"]);
  }
};
