<template>
  <div class="w-full bg-[#0F1524]">
    <div class="w-[90%] m-auto flex items-center justify-between h-[80px]">
      <h1 :class="styles.logo">Quick Dash</h1>
      <div class="text-white flex">
        <!-- {{ userStore }} -->

        <!-- Log the user details here -->
      </div>
      <div class="flex items-center m-2">
        <Nav />
        <Profile />
      </div>
    </div>
  </div>
</template>

<script setup>
import styles from "../../utils/style";
import Nav from "../../components/nav.vue";
import Profile from "../../components/profile.vue";
import { useUserStore } from "../../store/userStore";

const userStore = useUserStore();
console.log("userStore:", userStore.value);
</script>

<style lang="scss" scoped></style>
