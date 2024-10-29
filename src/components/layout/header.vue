<template>
  <div class="flex">
    <div class="w-full bg-[#0F1524]">
      <div class="w-[90%] m-auto flex items-center justify-between h-[80px]">
        <div class="flex items-center ml-8">
          <h1 :class="styles.logo">Quick Dash</h1>
        </div>

        <div class="flex items-center">
          <Nav />
          <Profile />
        </div>
      </div>
    </div>

    <!-- logo -->
    <RouterLink to="/home" class="fixed">
      <img
        class="w-10 h-10 object-cover rounded-sm text-center m-4"
        src="/src/assets/quick_dash.png"
        alt="Quick Dash Logo"
      />
    </RouterLink>

    <!-- dark  toggle -->
    <ToggleDarkMode />
  </div>
</template>

<script setup>
import styles from "../../utils/style";
import Nav from "../../components/nav.vue";
import Profile from "../../components/profile.vue";
import ToggleDarkMode from "../toggleDarkMode.vue";
</script>

<style scoped></style>
