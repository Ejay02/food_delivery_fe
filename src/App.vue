<script setup>
import { onMounted } from "vue";
import { useUserStore } from "./store/userStore";
import Header from "./components/layout/header.vue";
import { provideModalManagement } from "./utils/modalManagement";
import LoginModal from "./components/modals/auth/loginModal.vue";
import SignupModal from "./components/modals/auth/signupModal.vue";
import ScrollToTopButton from "./components/scrollToTopButton.vue";
import ActivationModal from "./components/modals/auth/activationModal.vue";
import ResetPasswordModal from "./components/modals/auth/resetPasswordModal.vue";
import ForgotPasswordModal from "./components/modals/auth/forgotPasswordModal.vue";

const userStore = useUserStore();

onMounted(() => {
  if (userStore.isAuthenticated) {
    userStore.fetchCurrentUser(); // Fetch user data when the app loads
  }
});

provideModalManagement();
</script>

<template>
  <div
    class="min-h-screen bg-white dark:bg-black text-pink-900 dark:text-white"
  >
    <Header />

    <router-view></router-view>
    <LoginModal />
    <SignupModal />
    <ActivationModal />
    <ForgotPasswordModal />
    <ResetPasswordModal />
    <ScrollToTopButton />
  </div>
</template>

<style scoped></style>
