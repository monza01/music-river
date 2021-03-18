import VueRouter from "vue-router";

const routes = [
  {
    path: "/",
    redirect: "/discover"
  },
  {
    path: "/discover",
    component: () => import("@/views/discover/Discover"),
    meta: {
      title: "发现",
      index: 0
    }
  },
  {
    path: "/profile",
    component: () => import("@/views/profile/Profile"),
    meta: {
      title: "我的",
      index: 0
    }
  },
  {
    path: "/search",
    component: () => import("@/views/search/SearchPage"),
    meta: {
      title: "搜索",
      index: 0
    }
  },
  {
    path: "/login",
    component: () => import("@/views/login/Login"),
    meta: {
      title: "登录",
      index: 1
    }
  },
  {
    path: "/playlists",
    component: () => import("@/views/playlists/Playlists"),
    meta: {
      title: "歌单广场",
      index: 1
    }
  },
  {
    path: "/ranks",
    component: () => import("@/views/ranks/Ranks"),
    meta: {
      title: "排行榜",
      index: 1
    }
  },
  {
    path: "/daily",
    component: () => import("@/views/daily-songs/DailySongs"),
    meta: {
      title: "今日推荐",
      index: 1
    }
  },
  {
    path: "/singers",
    component: () => import("@/views/top-singers/TopSingers"),
    meta: {
      title: "歌手榜",
      index: 1
    }
  },
  {
    path: "/singer/detail/:id",
    component: () => import("@/views/singer-detail/SingerDetail"),
    meta: {
      title: "歌手详情",
      index: 2
    }
  },
  {
    path: "/playlists/detail/:id",
    component: () => import("@/views/playlists-detail/PlaylistsDetail"),
    meta: {
      title: "歌单详情",
      index: 2
    }
  },
  {
    path: "/search/:keywords",
    component: () => import("@/views/search/SearchResult"),
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
