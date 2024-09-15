import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/home.vue";
import NotFound from "../components/error/notFound.vue";
// import Home from "../views/Home.vue";
import ResetPasswordHandler from '../components/resetPasswordHandler.vue'

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
