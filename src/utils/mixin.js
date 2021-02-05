import { getChosenSongs } from "@/api/common";

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
  created() {
    this.OFFSET = 30;
    this.getPlaylistsData();
  },
  methods: {
    getPlaylistsData() {
      getChosenSongs({
        limit: LIMIT,
        cat: this.$route.meta.cat,
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
          cat: this.$route.meta.cat,
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
