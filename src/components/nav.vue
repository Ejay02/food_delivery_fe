<template>
  <div class="relative">
    <!-- Mobile menu button -->
    <button @click="toggleMenu" class="md:hidden p-2 text-white">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        class="w-6 h-6"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M4 6h16M4 12h16m-7 6h7"
        />
      </svg>
    </button>

    <!-- Desktop menu -->
    <div
      class="hidden md:flex px-5 text-[18px] font-[500] items-center justify-between"
    >
      <div
        v-for="(item, index) in navItems"
        :key="index"
        :class="{ 'text-[#b637a5]': activeItem === index }"
        class="p-4"
      >
        <a :href="item.url">{{ item.title }}</a>
      </div>
    </div>

    <!-- Mobile menu dropdown -->
    <div v-if="isMenuOpen" class="absolute top-full left-0 w-full md:hidden">
      <div
        v-for="(item, index) in navItems"
        :key="index"
        :class="{ 'text-[#b637a5]': activeItem === index }"
        class="p-4"
      >
        <a :href="item.url" @click="closeMenu">{{ item.title }}</a>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

const navItems = [
  { title: "Home", url: "/" },
  { title: "About Us", url: "/about" },
  { title: "Restaurants", url: "/restaurants" },
  { title: "Popular Foods", url: "/foods" },
  { title: "Contact Us", url: "/contact" },
];

const activeItem = ref(0);
const isMenuOpen = ref(false);

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value;
};

const closeMenu = () => {
  isMenuOpen.value = false;
};
</script>

<style scoped>

</style>
