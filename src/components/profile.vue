<template>
  <div class="flex items-center">
    <!-- auth -->

    <a-dropdown v-if="isAuthenticated">
      <a class="ant-dropdown-link cursor-pointer" @click.prevent>
        <!-- Hover me -->
        <div class="mr-8">
          <div v-if="avatar">
            <img
              :src="avatar"
              alt="user avatar"
              class="w-10 h-10 rounded-md object-cover"
            />
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
            <a
              href="https://quick-dash-restaurant.netlify.app/"
              class="flex gap-3 items-center text-decoration-none text-slate-500"
            >
              <i class="fa-solid fa-hand-holding-dollar text-slate-500"></i>
              <!--  -->
              <span>Restaurant Dashboard</span>
            </a>
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
  </div>
</template>

<script setup>
import router from "@/router";
import { computed, onMounted, ref } from "vue";
import { useUserStore } from "@/store/userStore";
import { useNotifications } from "@/composables/globalAlert";
import { useModalManagement } from "../utils/modalManagement";

const { notify } = useNotifications();

const { openModal, closeModal, isModalOpen } = useModalManagement();

const userStore = useUserStore();

const isAuthenticated = computed(() => userStore?.isAuthenticated);

const fullName = computed(() => userStore.name);
const avatar = computed(() => userStore.avatar);

const handleLogout = async () => {
  try {
    // Clear the user store
    userStore.clearUser();

    notify("Logout successful", "success");

    router.push("/");
  } catch (error) {
    notify("Logout error, please try again", "error");
  }
};

onMounted(() => {
  userStore.fetchCurrentUser();
});
</script>

<style scoped></style>
