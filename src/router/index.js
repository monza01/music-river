import Vue from "vue";
import VueRouter from "vue-router";
Vue.use(VueRouter);
import Discover from "@/views/discover/Discover";
import Profile from "@/views/profile/Profile";
import SearchPage from "@/views/search/SearchPage";
import Login from "@/views/login/Login";
import Playlists from "@/views/playlists/Playlists";
import PlaylistsDetail from "@/views/playlists-detail/PlaylistsDetail";
import Ranks from "@/views/ranks/Ranks";
import DailySongs from "@/views/daily-songs/DailySongs";
import TopSingers from "@/views/top-singers/TopSingers";
import SingerDetail from "@/views/singer-detail/SingerDetail";
import SearchResult from "@/views/search/SearchResult";

const routes = [
  {
    path: "/",
    redirect: "/discover"
  },
  {
    path: "/discover",
    component: Discover,
    meta: {
      title: "发现",
      index: 0
    }
  },
  {
    path: "/profile",
    component: Profile,
    meta: {
      title: "我的",
      index: 0
    }
  },
  {
    path: "/search",
    component: SearchPage,
    meta: {
      title: "搜索",
      index: 0
    }
  },
  {
    path: "/login",
    component: Login,
    meta: {
      title: "登录",
      index: 1
    }
  },
  {
    path: "/playlists",
    component: Playlists,
    meta: {
      title: "歌单广场",
      index: 1
    }
  },
  {
    path: "/ranks",
    component: Ranks,
    meta: {
      title: "排行榜",
      index: 1
    }
  },
  {
    path: "/daily",
    component: DailySongs,
    meta: {
      title: "今日推荐",
      index: 1
    }
  },
  {
    path: "/singers",
    component: TopSingers,
    meta: {
      title: "歌手榜",
      index: 1
    }
  },
  {
    path: "/singer/detail/:id",
    component: SingerDetail,
    meta: {
      title: "歌手详情",
      index: 2
    }
  },
  {
    path: "/playlists/detail/:id",
    component: PlaylistsDetail,
    meta: {
      title: "歌单详情",
      index: 2
    }
  },
  {
    path: "/search/:keywords",
    component: SearchResult,
    meta: {
      title: "搜索结果",
      index: 1
    }
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

router.beforeEach(function(to, from, next) {
  document.title = "music river - " + to.matched[0].meta.title;
  next();
});

export default router;
