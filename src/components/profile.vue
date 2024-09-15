<template>
  <div class="flex items-center">
    <!-- auth -->

    <a-dropdown v-if="isAuthenticated">
      <a class="ant-dropdown-link cursor-pointer" @click.prevent>
        <!-- Hover me -->
        <div class="mr-8">
          <div v-if="userStore?.avatar">
            <!-- :src="userStore?.avatar" -->
            <img
              src="https://via.placeholder.com/150"
              alt="user image"
              class="w-12 h-12 rounded-md object-cover"
            />
            <!--   style="width: 50px; height: 50px; border-radius: 5px" -->
          </div>
          <div
            v-else
            class="w-8 h-8 text-center text-xs rounded-md bg-gray-300 flex items-center justify-center font-bold text-gray-900"
          >
            {{ fullName[0] }}
          </div>
        </div>
      </a>
      <template #overlay>
        <a-menu class="w-56">
          <a-menu-item>
            <div
              class="flex gap-3 items-center text-decoration-none text-slate-500"
            >
              <i class="fa-solid fa-ellipsis-vertical"></i>
              <div class="">
                <p class="mb-0 text-xs">Signed in as</p>
                <span class="text-xs truncate block max-w-full">{{
                  userStore.email
                }}</span>
              </div>
            </div>
          </a-menu-item>
          <a-menu-item key="profile">
            <div
              class="flex gap-3 items-center text-decoration-none text-slate-500"
            >
              <i class="fa-regular fa-user"></i>
              <span>Profile</span>
            </div>
          </a-menu-item>
          <a-menu-item key="orders">
            <div
              class="flex gap-3 items-center text-decoration-none text-slate-500"
            >
              <i class="fa-solid fa-clipboard-list"></i>
              <span>Orders</span>
            </div>
          </a-menu-item>
          <a-menu-item key="admin">
            <div
              class="flex gap-3 items-center text-decoration-none text-slate-500"
            >
              <i class="fa-solid fa-hand-holding-dollar"></i>
              <span>Sell on Quick Dash</span>
            </div>
          </a-menu-item>
          <a-menu-item>
            <div
              data-test="logout"
              @click="handleLogout"
              class="flex gap-3 items-center text-decoration-none text-slate-500"
            >
              <i class="fa-solid fa-power-off"></i>
              <span>Logout</span>
            </div>
          </a-menu-item>
        </a-menu>
      </template>
    </a-dropdown>

    <div v-else class="cursor-pointer" @click="openModal('login-modal')">
      <i class="fa-solid fa-circle-user mr-9"></i>
    </div>
    <LoginModal />
    <SignupModal />
    <ActivationModal />
    <ForgotPasswordModal />
    <ResetPasswordModal />
  </div>
</template>

<script setup>
import { eraseCookie } from "@/utils/cookie";
import { computed, onMounted, ref } from "vue";
import { useUserStore } from "@/store/userStore";
import LoginModal from "./modals/auth/loginModal.vue";
import SignupModal from "./modals/auth/signupModal.vue";
import { useMutation } from "@vue/apollo-composable";
import { logoutMutation } from "@/graphql/mutations";
import ActivationModal from "./modals/auth/activationModal.vue";
import { useNotifications } from "@/composables/globalAlert";
import { useModalManagement } from "../utils/modalManagement";
import ForgotPasswordModal from "./modals/auth/forgotPasswordModal.vue";

const { notify } = useNotifications();

const { openModal, closeModal, isModalOpen } = useModalManagement();

const userStore = useUserStore();

const isAuthenticated = computed(() => userStore?.isAuthenticated);

const fullName = computed(() => userStore.name);

const isLoggingOut = ref(false);

const { mutate: logoutMutate, onError: onLogoutError } =
  useMutation(logoutMutation);

onLogoutError((error) => {
  notify("Logout error, please try again", "error");
  isLoggingOut.value = false;
});

const handleLogout = async () => {
  if (isLoggingOut.value) return;

  isLoggingOut.value = true;
  try {
    await logoutMutate();

    eraseCookie("access_token");
    eraseCookie("refresh_token");

    // Clear the user store
    userStore.clearUser();

    notify("Logout successful", "success");

    // Delay opening the login modal to ensure state updates have propagated
    setTimeout(() => {
      openModal("login-modal");
      isLoggingOut.value = false;
    }, 100);
  } catch (error) {
    notify("Logout error, please try again", "error");
    isLoggingOut.value = false;
  }
};

onMounted(() => {
  userStore.fetchUser();
});
</script>

<style scoped></style>
