<template>
  <div class="h-screen flex flex-col m-0 p-0 overflow-hidden">
    <div class="flex-1 relative grid place-items-center">
      <img
        src="/src/assets/bg-img.jpg"
        alt="Right Image"
        class="w-full h-full object-cover brightness-50 absolute inset-0"
      />
      <!-- Text Overlay -->
      <div class="z-10 flex flex-col items-center text-white p-4 text-center">
        <h1 class="text-5xl font-bold mb-4 leading-tight">
          Delicious Meals,<br />Delivered to Your Door
        </h1>
        <p class="text-xl mb-8 max-w-2xl">
          From local favorites to gourmet experiences, get the best restaurants
          in town delivered fresh and fast.
        </p>
        <button
          class="bg-amber-500 hover:bg-amber-600 text-white font-semibold py-3 px-8 rounded-full text-lg transition-colors"
          @click="openModal('login-modal')"
        >
          Order Now
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useModalManagement } from "@/utils/modalManagement";

const { openModal, closeModal, isModalOpen } = useModalManagement();
</script>

<style>
body {
  margin: 0;
  padding: 0;
}
</style>
