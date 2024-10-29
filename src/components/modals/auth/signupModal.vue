<template>
  <LoadingScreen v-if="loading || googleLoading" />
  <div
    v-if="isModalOpen('signup-modal')"
    class="fixed inset-0 bg-[#00000027] bg-opacity-50 backdrop-blur-sm flex justify-center items-center z-50"
    @click.self="closeModal('signup-modal')"
  >
    <div class="bg-slate-900 p-8 rounded-lg shadow-lg w-11/12 max-w-md">
      <h2 class="text-2xl font-bold mb-4 text-center">Sign Up</h2>
      <form @submit.prevent="" class="space-y-4">
        <!-- name -->
        <div>
          <label for="email" class="block mb-2 text-sm font-medium"
            >Name:</label
          >
          <input
            ref="firstInput"
            type="text"
            id="name"
            v-model="name"
            required
            autofocus
            min="4"
            placeholder="Jane Smith"
            class="cursor-pointer w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
          />
        </div>

        <!-- email -->
        <div>
          <label for="email" class="block mb-2 text-sm font-medium"
            >Email:</label
          >
          <input
            type="email"
            id="email"
            v-model="email"
            required
            placeholder="hello@test.com"
            class="cursor-pointer w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
          />
        </div>
        <!-- password -->
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
            class="cursor-pointer w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
          />
        </div>

        <!-- number -->
        <div>
          <label for="password" class="block mb-2 text-sm font-medium"
            >Phone Number:</label
          >
          <input
            type="number"
            id="number"
            v-model="number"
            required
            placeholder="+001 234 5678"
            class="cursor-pointer w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
          />
        </div>

        <!-- submit -->
        <button
          @click="handleSubmit"
          type="submit"
          :disabled="!isFormValid || loading"
          :class="[
            'w-full py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2',
            isFormValid
              ? 'bg-blue-500 text-white hover:bg-blue-600'
              : 'bg-blue-300 text-gray-500 cursor-not-allowed',
          ]"
        >
          Sign Up
        </button>
      </form>

      <div class="mt-4 text-center">
        <p class="text-sm">Or signup with</p>
        <div class="flex justify-center space-x-4 mt-2">
          <GoogleLogin
            :callback="callback"
            class="block w-full rounded-md shadow-sm"
          >
            <button class="text-white p-2 rounded-md hover:bg-slate-500">
              <img src="/src/assets/google.jpg" class="w-4 h-4" />
            </button>
          </GoogleLogin>
        </div>
      </div>

      <div class="border-b border-gray-300 border-opacity-10 mt-4"></div>

      <div class="mt-4 text-center text-sm">
        <p class="">
          Have an account?
          <a
            href="#"
            @click="switchToLogin"
            class="text-blue-500 hover:underline"
            >Login</a
          >
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, nextTick, ref, watch } from "vue";
import LoadingScreen from "../../loadingScreen.vue";
import { useMutation } from "@vue/apollo-composable";
import { useUserStore } from "../../../store/userStore";
import {
  googleLoginMutation,
  registerMutation,
} from "../../../graphql/mutations";
import { useNotifications } from "../../../composables/globalAlert";
import { useModalManagement } from "../../../utils/modalManagement";
import { setCookie } from "@/utils/cookie";

const userStore = useUserStore();

const { notify } = useNotifications();
const { openModal, closeModal, isModalOpen } = useModalManagement();

const name = ref("");
const email = ref("");
const password = ref("");
const number = ref("");

const firstInput = ref(null);

const resetForm = () => {
  name.value = "";
  email.value = "";
  password.value = "";
  number.value = "";
};

const isFormValid = computed(() => {
  return (
    name.value.trim() !== "" &&
    email.value.trim() !== "" &&
    password.value.trim() !== "" &&
    number.value !== ""
  );
});

const { mutate: register, loading } = useMutation(registerMutation);

const handleSubmit = async () => {
  try {
    const res = await register({
      name: name.value,
      email: email.value,
      password: password.value,
      phone_number: number.value,
    });

    if (res.data.register) {
      const actToken = res.data.register.activation_token;

      // find token and access token so we can set headers

      localStorage.setItem("activation_token", actToken);
      notify("Please check your email to activate your account", "success");

      closeModal("signup-modal");
      resetForm();
      openModal("activation-modal");
    }
  } catch (error) {
    notify(error.message, "error");
  }
};

const switchToLogin = () => {
  closeModal("signup-modal");
  resetForm();
  openModal("login-modal");
};

const {
  mutate: googleLogin,
  error: googleError,
  loading: googleLoading,
} = useMutation(googleLoginMutation);

// googleLoginMutation
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
      setCookie("access_token", res.data.googleLogin.accessToken, 7);
      setCookie("refresh_token", res.data.googleLogin.refreshToken, 7);

      notify("Signup successful", "success");

      // userStore.refreshUser();

      closeModal("signup-modal");
    }
  } catch (error) {
    notify(error.message, "error");
  }
};

watch(
  () => isModalOpen("signup-modal"),
  (isOpen) => {
    if (isOpen) {
      nextTick(() => {
        if (firstInput.value) {
          firstInput.value.focus();
        }
      });
    }
  }
);
</script>
