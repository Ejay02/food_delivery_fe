import { defineStore } from "pinia";

export const useUserStore = defineStore("user", {
  state: () => ({
    id: null,
    name: null,
    email: null,
    phoneNumber: null,
    address: null,
    avatar: null,
    role: null,
    createdAt: null,
    accessToken: null,
    refreshToken: null,
  }),
  actions: {
    // setUser(userData) {
    //   console.log("UserData:", userData);
    //   this.$state = { ...this.$state, ...userData };
    //   console.log("UserStore State:", this.$state);
    // },

    setUser(userData) {
      this.id = userData.id;
      this.name = userData.name;
      this.email = userData.email;
      this.phoneNumber = userData.phoneNumber;
      this.address = userData.address;
      this.avatar = userData.avatar;
      this.role = userData.role;
      this.createdAt = userData.createdAt;
      this.accessToken = userData.accessToken;
      this.refreshToken = userData.refreshToken;

      console.log("UserStore State:", this.$state);
    },

    setHeaders() {
      return {
        Authorization: `Bearer ${this.accessToken}`,
        "Refresh-Token": this.refreshToken,
      };
    },
  },
});
