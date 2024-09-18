<!-- <template>
  <div class="w-full bg-[#0F1524]">
    <div class="w-[90%] m-auto flex items-center justify-between h-[80px]">
      <h1 :class="styles.logo">Quick Dash</h1>

      <div class="flex items-center">
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
</script>

<style lang="scss" scoped></style> -->

<template>
  <div class="w-full bg-[#0F1524]">
    <div class="w-[90%] m-auto flex items-center justify-between h-[80px]">
      <div class="flex items-center">
        <!-- <RouterLink to="/">
          <img
            class="w-10 h-10 mr-4 object-cover rounded-sm"
            src="../../assets/quick_dash.png"
            alt="Quick Dash Logo"
          />
        </RouterLink> -->
        <h1 :class="styles.logo">Quick Dash</h1>
      </div>

      <div class="flex items-center">
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
</script>

<style scoped></style>
