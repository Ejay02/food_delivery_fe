<template>
  <div class="min-h-screen flex flex-col items-center justify-center">
    <div class="flex items-center">
      <p class="text-2xl font-semibold mr-2">404</p>
      <p class="text-2xl font-semibold mr-2">|</p>
      <p class="ml-2 text-center">The page you're looking for doesn't exist.</p>
    </div>

    <router-link
      to="/"
      class="mt-6 px-4 py-2 bg-black bg-opacity-40 text-white rounded-lg shadow-lg backdrop-blur-md hover:bg-opacity-50 transition"
    >
      Go Home
    </router-link>
  </div>
</template>
