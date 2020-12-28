import Vue from "vue";
import VueRouter from "vue-router";

import Discover from "@/views/discover/Discover";
import DiscLists from "@/views/discLists/DiscLists";
import PrivateFM from "@/views/privateFM/PrivateFM";
import Rank from "@/views/rank/Rank";
import Recommend from "@/views/recommend/Recommend";

import Profile from "@/views/profile/Profile";

import Player from "@/views/player/Player";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    redirect: "/discover"
  },
  {
    path: "/discover",
    component: Discover,
    children: [
      {
        path: "disc-lists",
        component: DiscLists
      },
      {
        path: "privateFM",
        component: PrivateFM
      },
      {
        path: "rank",
        component: Rank
      },
      {
        path: "recommend",
        component: Recommend
      }
    ]
  },
  {
    path: "/profile",
    component: Profile
  },
  {
    path: "/player",
    component: Player
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
