<template>
  <div
    class="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-white"
  >
    <div class="text-center">
      <h1 class="text-9xl font-extrabold tracking-widest text-red-600">
        {{ errorCode }}
      </h1>
      <p class="text-2xl md:text-3xl font-semibold my-4">
        Oops! {{ errorMessage }}
      </p>
      <p class="mb-8 text-gray-400">
        It seems something went wrong. Don't worry, let's get you back!
      </p>
      <router-link
        to="/"
        class="bg-red-600 text-white px-6 py-3 rounded-lg font-bold shadow hover:bg-red-700 transition duration-300"
      >
        Go Home
      </router-link>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

// These can be dynamically updated based on the error
const errorCode = ref("404");
const errorMessage = ref("This is unusual");
</script>
