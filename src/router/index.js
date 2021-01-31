import Vue from "vue";
import VueRouter from "vue-router";
Vue.use(VueRouter);
import Discover from "@/views/discover/Discover";
import Profile from "@/views/profile/Profile";
import Login from "@/views/login/Login";
import Playlists from "@/views/playlists/Playlists";
import Recommend from "@/views/playlists/children/Recommend";
import EAndA from "@/views/playlists/children/EAndA";
import Mandarin from "@/views/playlists/children/Mandarin";
import Popular from "@/views/playlists/children/Popular";
import Rock from "@/views/playlists/children/Rock";
import Rap from "@/views/playlists/children/Rap";

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
    },
    children: [
      {
        path: "recommend",
        component: Recommend,
        meta: {
          cat: "全部",
          index: 1
        }
      },
      {
        path: "e&a",
        component: EAndA,
        meta: {
          cat: "欧美",
          index: 1
        }
      },
      {
        path: "mandarin",
        component: Mandarin,
        meta: {
          cat: "华语",
          index: 1
        }
      },
      {
        path: "popular",
        component: Popular,
        meta: {
          cat: "流行",
          index: 1
        }
      },
      {
        path: "rock",
        component: Rock,
        meta: {
          cat: "摇滚",
          index: 1
        }
      },
      {
        path: "rap",
        component: Rap,
        meta: {
          cat: "说唱",
          index: 1
        }
      }
    ]
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
