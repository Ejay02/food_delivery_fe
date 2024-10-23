import { createApp, h, provide } from "vue";
import "./style.css";
import App from "./App.vue";
import router from "./router";
import pinia from "./store";
import Antd from "ant-design-vue";
import "ant-design-vue/dist/reset.css";
import vue3GoogleLogin from "vue3-google-login";
import { apolloClient } from "../apollo-client";
import { useUserStore } from "./store/userStore";
import VueApolloComponents from "@vue/apollo-components";
import { library } from "@fortawesome/fontawesome-svg-core";
import { DefaultApolloClient } from "@vue/apollo-composable";
import { faSun, faMoon } from "@fortawesome/free-solid-svg-icons";

library.add(faSun, faMoon);

const app = createApp({
  setup() {
    provide(DefaultApolloClient, apolloClient);
  },
  render: () => h(App),
});

app.use(VueApolloComponents);
app.use(router);
app.use(pinia);
app.use(Antd);
app.use(vue3GoogleLogin, {
  clientId: import.meta.env.VITE_APP_GOOGLE_CLIENT_ID,
});

const userStore = useUserStore();
userStore.init();

app.mount("#app");
