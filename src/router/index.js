import Home from "../views/home.vue";
import About from "@/views/about.vue";
import Contact from "@/views/contact.vue";
import AuthPage from "@/views/authPage.vue";
import NotFound from "../components/error/notFound.vue";
import { createRouter, createWebHistory } from "vue-router";
import ResetPasswordHandler from "../components/resetPasswordHandler.vue";
import Restaurants from "@/views/restaurants.vue";
import Layout from "@/views/layout.vue";
import PopularFoods from "@/views/popularFoods.vue";

const routes = [
  {
    path: "/",
    name: "Auth",
    component: AuthPage,
  },
  {
    path: "/reset-password",
    name: "ResetPassword",
    component: ResetPasswordHandler,
  },
  {
    path: "/layout",
    name: "Layout",
    component: Layout,
    children: [
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
    ],
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
