import { createRouter, createWebHistory, type RouteRecordRaw } from "vue-router";
import HomeView from "../views/HomeView.vue";

const routes: RouteRecordRaw[] = [
  {
    path: "/",
    name: "home",
    component: HomeView,
    meta: {
      order: 1,
      requiresAuth: false,
    },
  },
  {
    path: "/shop",
    name: "shop",
    component: () => import("../views/ShopView.vue"),
    meta: {
      order: 2,
      requiresAuth: false,
    },
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
