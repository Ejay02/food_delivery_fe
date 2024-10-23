import Home from "../views/home.vue";
import About from "@/views/about.vue";
import Contact from "@/views/contact.vue";
import AuthPage from "@/views/authPage.vue";
import NotFound from "../components/error/notFound.vue";
import { createRouter, createWebHistory } from "vue-router";
import ResetPasswordHandler from "../components/resetPasswordHandler.vue";

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
    path: "/home",
    name: "Home",
    component: Home,
    children: [
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
