<template>
  <LoadingScreen v-if="loading" />

  <div
    v-if="isModalOpen('login-modal') && !loading && !error"
    class="fixed inset-0 bg-[#00000027] bg-opacity-50 backdrop-blur-sm flex justify-center items-center z-50"
    @click.self="closeModal('login-modal')"
  >
    <div class="bg-slate-900 p-8 rounded-lg shadow-lg w-11/12 max-w-md">
      <h2 class="text-2xl font-bold mb-6 text-center">Login</h2>
      <form @submit.prevent="" class="space-y-4">
        <div>
          <label for="email" class="block mb-2 text-sm font-medium"
            >Email:</label
          >
          <input
            type="email"
            id="email"
            v-model="email"
            required
            autofocus
            placeholder="hello@test.com"
            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
          />
        </div>
        <div>
          <label for="password" class="block mb-2 text-sm font-medium"
            >Password:</label
          >
          <input
            type="password"
            id="password"
            v-model="password"
            required
            placeholder="myPassword@#12$"
            minlength="8"
            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
          />
        </div>

        <div class="mt-6 text-sm text-end">
          <a href="#" @click="forgotPassword" class="hover:underline"
            >Forgot password?</a
          >
        </div>

        <button
          @click="handleSubmit"
          type="submit"
          :disabled="!isFormValid"
          :class="[
            'w-full py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2',
            isFormValid
              ? 'bg-blue-500 text-white hover:bg-blue-600'
              : 'bg-blue-300 text-gray-500 cursor-not-allowed',
          ]"
        >
          Login
        </button>
      </form>

      <div class="mt-4 text-center">
        <p class="text-sm">Or login with</p>
        <div class="flex justify-center space-x-4 mt-2">
          <!--  -->
          <GoogleLogin
            :callback="callback"
            class="block w-full rounded-md shadow-sm"
          >
            <!-- popup-type="TOKEN" -->
            <button class="text-white p-2 rounded-md hover:bg-slate-500">
              <img src="/src/assets/google.jpg" class="w-4 h-4" />
            </button>
          </GoogleLogin>
        </div>
      </div>

      <div class="mt-4 text-center text-sm">
        <p class="">
          Need an account?
          <a
            href="#"
            @click="switchToSignup"
            class="text-blue-500 hover:underline"
            >Sign up</a
          >
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { setCookie } from "@/utils/cookie";
import { computed, onMounted, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import LoadingScreen from "../../loadingScreen.vue";
import { useMutation } from "@vue/apollo-composable";
import { useUserStore } from "../../../store/userStore";
import { googleLoginMutation, loginMutation } from "../../../graphql/mutations";
import { useNotifications } from "../../../composables/globalAlert";
import { useModalManagement } from "../../../utils/modalManagement";

const userStore = useUserStore();

const { notify } = useNotifications();

const { openModal, closeModal, isModalOpen } = useModalManagement();

const route = useRoute();
const router = useRouter();

const email = ref("");
const password = ref("");
const verifyToken = ref("");

const resetForm = () => {
  email.value = "";
  password.value = "";
  verifyToken.value = "";
};

const isFormValid = computed(() => {
  return email.value.trim() !== "" && password.value.trim() !== "";
});

const { mutate: login, error, loading } = useMutation(loginMutation);

const handleSubmit = async () => {
  try {
    const variables = {
      email: email.value,
      password: password.value,
    };

    if (verifyToken.value) {
      variables.verifyToken = verifyToken.value;
    }

    const res = await login(variables);

    if (res.data && res.data.login) {
      const { accessToken, refreshToken, user } = res.data.login;

      // Set user data in the store
      userStore.setUser({
        accessToken,
        refreshToken,
        user,
      });

      userStore.persistData();

      // Set cookies
      setCookie("access_token", accessToken, 7);
      setCookie("refresh_token", refreshToken, 7);

      notify("Login successful", "success");
      resetForm();
      closeModal("login-modal");

      // Clean up URL if it contains reset password parameters
      if (route.query.verify) {
        router.replace({ path: "/" });
      }
    }
  } catch (error) {
    notify(error.message, "error");
  }
};

const switchToSignup = () => {
  closeModal("login-modal");
  openModal("signup-modal");
};

const forgotPassword = () => {
  closeModal("login-modal");
  openModal("forgot-modal");
};

onMounted(() => {
  // Check for verify token in the URL
  if (route.query.verify) {
    verifyToken.value = route.query.verify;
    openModal("login-modal");
  }
});

const {
  mutate: googleLogin,
  error: googleError,
  loading: googleLoading,
} = useMutation(googleLoginMutation);

const callback = async (response) => {
  try {
    const res = await googleLogin({
      code: response.code,
    });

    if (res.data) {
      userStore.setUser({
        accessToken: res.data.googleLogin.accessToken,
        refreshToken: res.data.googleLogin.refreshToken,
        user: res.data.googleLogin.user,
      });

      userStore.persistData();

      // Set cookies
      setCookie("access_token", res.data.googleLogin.accessToke, 7);
      setCookie("refresh_token", res.data.googleLogin.refreshToken, 7);

      notify("Login successful", "success");

      closeModal("login-modal");
    }
  } catch (error) {
    notify(error.message, "error");
  }
};
</script>
