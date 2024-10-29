import Home from "../views/home.vue";
import About from "@/views/about.vue";
import Layout from "@/views/layout.vue";
import Contact from "@/views/contact.vue";
import Restaurants from "@/views/restaurants.vue";
import PopularFoods from "@/views/popularFoods.vue";
import NotFound from "../components/error/notFound.vue";
import { createRouter, createWebHistory } from "vue-router";
import ResetPasswordHandler from "../components/resetPasswordHandler.vue";

const routes = [
  {
    path: "/",
    name: "Layout",
    component: Layout,
  },
  {
    path: "/reset-password",
    name: "ResetPassword",
    component: ResetPasswordHandler,
  },
  {
    path: "/home",
    name: "Home",
    component: Home,
  },
  {
    path: "/restaurants",
    name: "Restaurants",
    component: Restaurants,
  },
  {
    path: "/popular-foods",
    name: "PopularFoods",
    component: PopularFoods,
  },
  {
    path: "/about",
    name: "About",
    component: About,
  },
  {
    path: "/contact",
    name: "Contact",
    component: Contact,
  },

  {
    // path: "*",
    path: "/:catchAll(.*)",
    name: "NotFound",
    component: NotFound,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
  // eslint-disable-next-line no-unused-vars
  scrollBehavior(to, from, savedPosition) {
    return { top: 0 };
  },
});

export default router;
