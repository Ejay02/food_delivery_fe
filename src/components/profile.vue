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
        <a-menu class="w-44">
          <a-menu-item>
            <div
              class="flex gap-3 items-center text-decoration-none text-slate-500"
            >
              <i class="fa-solid fa-ellipsis-vertical"></i>
              <div class="">
                <p class="mb-0 text-xs">Signed in as</p>
                <span class="text-xs">{{ fullName }}</span>
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
  </div>
</template>

<script setup>
import { computed, onMounted } from "vue";
import LoginModal from "./modals/loginModal.vue";
import SignupModal from "./modals/signupModal.vue";
import ActivationModal from "./modals/activationModal.vue";
import { useModalManagement } from "../utils/modalManagement";
import { useUserStore } from "@/store/userStore";

const { openModal } = useModalManagement();

const userStore = useUserStore();
console.log("userStore:", userStore);

const isAuthenticated = computed(() => userStore?.isAuthenticated);

const userRole = computed(() => userStore.role);
const fullName = computed(() => userStore.name);
const isAdmin = computed(() => userStore.role === "admin");

onMounted(() => {
  userStore.fetchUser();
});
</script>

<style scoped></style>
