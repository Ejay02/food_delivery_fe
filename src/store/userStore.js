import { defineStore } from "pinia";
import { useQuery } from "@vue/apollo-composable";
import { authUserQuery } from "@/graphql/queries";
import { watch } from "vue";
import { useNotifications } from "@/composables/globalAlert";
import { setCookie } from "@/utils/cookie";

const { notify } = useNotifications();

export const useUserStore = defineStore("user", {
  state: () => ({
    id: null,
    name: null,
    email: null,
    role: null,
    phoneNumber: null,
    address: null,
    avatar: null,
    createdAt: null,
    isGoogleUser: null,
    accessToken: null,
    refreshToken: null,
    loading: false,
    error: null,
  }),

  actions: {
    async fetchUser() {
      this.loading = true;
      this.error = null;

      const { result, loading, error, refetch } = useQuery(authUserQuery);

      watch(result, (data) => {
        if (data && data?.authUser) {
          this.setUser(data?.authUser);
        }
      });

      watch(loading, (isLoading) => {
        this.loading = isLoading;
      });

      watch(error, (err) => {
        if (err) {
          this.error = err?.message;
        }
      });
    },

    setUser(userData) {
      if (userData && userData?.user) {
        this.id = userData?.user?.id;
        this.name = userData?.user?.name;
        this.email = userData?.user?.email;
        this.role = userData?.user?.role;
        this.phoneNumber = userData?.user?.phone_number;
        this.address = userData?.user?.address;
        this.avatar = userData?.user?.avatar;
        this.isGoogleUser = userData?.user?.isGoogleUser;
        this.createdAt = userData?.user?.createdAt;
      }
      this.accessToken = userData?.accessToken;
      this.refreshToken = userData?.refreshToken;
    },

    clearUser() {
      this.$reset();
    },

    async refreshUser() {
      this.clearUser();
      const { refetch } = await this.fetchUser();
      await refetch();
    },

    persistData() {
      setCookie("userData", JSON.stringify(this.$state), 7);
    },
    restoreData() {
      const storedData = document.cookie.match(/userData=([^;]*)/);
      if (storedData) {
        this.$state = JSON.parse(storedData[1]);
      }
    },

    init() {
      this.restoreData();
    },
  },

  getters: {
    isAuthenticated: (state) => !!state?.accessToken,
    // isNotAdmin: (state) => !!state?.role,
  },
});
