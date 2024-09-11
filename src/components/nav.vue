<template>
  <div class="px-5 text-[18px] font-[500] flex items-center">
    <div
      v-for="(item, index) in navItems"
      :key="index"
      :class="{ 'text-[#b637a5]': activeItem === index }"
      class="justify-between p-4"
    >
      <a :href="item.url">{{ item.title }}</a>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

const navItems = [
  {
    title: "Home",
    url: "/",
  },
  {
    title: "About Us",
    url: "/about",
  },
  {
    title: "Restaurants",
    url: "/restaurants",
  },
  {
    title: "Popular Foods",
    url: "/foods",
  },
  {
    title: "Contact Us",
    url: "/contact",
  },
];

const activeItem = ref(0);
</script>

<style scoped></style>
