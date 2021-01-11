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
      index: 0
    }
  },
  {
    path: "/profile",
    component: Profile,
    meta: {
      index: 0
    }
  },
  {
    path: "/login",
    component: Login,
    meta: {
      index: 1
    }
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    } else {
      return { x: 0, y: 0 };
    }
  }
});

export default router;
