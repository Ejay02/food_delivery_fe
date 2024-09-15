<script setup>
import { useDarkMode } from "./composables/useDarkMode";
import LoginModal from "./components/modals/auth/loginModal.vue";
import SignupModal from "./components/modals/auth/signupModal.vue";
import ActivationModal from "./components/modals/auth/activationModal.vue";
import ResetPasswordModal from "./components/modals/auth/resetPasswordModal.vue";
import ForgotPasswordModal from "./components/modals/auth/forgotPasswordModal.vue";

const isDarkMode = useDarkMode();

const toggleDarkMode = () => {
  isDarkMode.value = !isDarkMode.value;
};

import { provideModalManagement } from "./utils/modalManagement";

provideModalManagement();
</script>

<template>
  <div
    class="min-h-screen bg-white dark:bg-black text-pink-900 dark:text-white"
  >
    <button
      @click="toggleDarkMode"
      class="p-2 bg-gray-200 dark:bg-gray-700 rounded fixed right-0 mt-6 mr-4"
    >
      <!-- day -->
      <svg
        v-if="isDarkMode"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="currentColor"
        class="size-4"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z"
        />
      </svg>

      <!-- night -->
      <svg
        v-if="!isDarkMode"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="currentColor"
        class="size-4"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z"
        />
      </svg>
    </button>

    <router-view></router-view>

    <LoginModal />
    <SignupModal />
    <ActivationModal />
    <ForgotPasswordModal />
    <ResetPasswordModal />
  </div>
</template>

<style scoped></style>
