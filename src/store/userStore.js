import { defineStore } from "pinia";
import { useQuery } from "@vue/apollo-composable";
import { authUserQuery } from "@/graphql/queries";
import { watch } from "vue";

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
    accessToken: null,
    refreshToken: null,
    loading: false,
    error: null,
  }),

  actions: {
    async fetchUser() {
      this.loading = true;
      this.error = null;

      const { result, loading, error } = useQuery(authUserQuery);

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
      console.log("userData:", userData);
      if (userData && userData?.user) {
        this.id = userData?.user?.id;
        this.name = userData?.user?.name;
        this.email = userData?.user?.email;
        this.role = userData?.user?.role;
        this.phoneNumber = userData?.user?.phone_number;
        this.address = userData?.user?.address;
        this.avatar = userData?.user?.avatar;
        this.createdAt = userData?.user?.createdAt;
      }
      this.accessToken = userData?.accessToken;
      this.refreshToken = userData?.refreshToken;
    },

    clearUser() {
      this.$reset();
    },
  },
  getters: {
    isAuthenticated: (state) => !!state?.accessToken,
    // Add more getters as needed
  },
});
