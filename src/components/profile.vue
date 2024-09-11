<template>
  <div class="flex items-center">
    <a-dropdown v-if="avatar">
      <a class="ant-dropdown-link cursor-pointer" @click.prevent>
        <!-- Hover me -->
        <div>
          <div>
            <img
              :src="avatar"
              alt="user image"
              style="width: 50px; height: 50px; border-radius: 5px"
            />
          </div>
          <!-- <div v-else>
            <i class="fa-solid fa-circle-user mr-5"></i>
          
          </div> -->
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
                <p class="mb-0">Signed in as</p>
                <span class="text-xs">hello@test.com</span>
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
    <!-- auth -->
    <div v-else class="cursor-pointer" @click="showLoginModal">
      <i class="fa-solid fa-circle-user mr-9"></i>
    </div>

    <LoginModal ref="loginModal" />
  </div>
</template>

<script setup>
import { ref } from "vue";
// import { useUserStore } from "@/stores/user"; // Adjust the import path as needed
import LoginModal from "./modals/loginModal.vue";

// const userStore = useUserStore();
const loginModal = ref(null);

const showLoginModal = () => {
  loginModal.value.showModal();
};
</script>

<style scoped></style>
