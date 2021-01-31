import { getChosenSongs } from "@/api/common";
import CategoryPlaylists from "@/views/playlists/components/CategoryPlaylists";

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
  components: {
    CategoryPlaylists
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
