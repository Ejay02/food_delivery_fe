import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/home.vue";
import NotFound from "../components/error/notFound.vue";
import ResetPasswordHandler from '../components/resetPasswordHandler.vue'
import About from "@/views/about.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/reset-password",
    name: "ResetPassword",
    component: ResetPasswordHandler,
  },
  {
    path: "/about",
    name: "About",
    component: About,
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
