import Vue from "vue";
import VueRouter from "vue-router";
import Discover from "@/views/Discover";
import Profile from "@/views/Profile";
import Login from "@/views/Login";

Vue.use(VueRouter);

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
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

router.beforeEach(function(to, from, next) {
  document.title = "music river - " + to.meta.title;
  next();
});

export default router;
