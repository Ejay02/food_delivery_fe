<template>
  <div class="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-3xl mx-auto">
      <RouterLink to="/">
        <h1 class="text-4xl font-bold text-center mb-8">About Quick Dash</h1>
      </RouterLink>

      <div class="">
        <div class="p-6 bg-gray-500 shadow-lg rounded-lg">
          <h2 class="text-2xl font-semibold mb-4">Our Story</h2>
          <p class="mb-6">
            Quick Dash was born out of a simple idea: to make delicious food
            accessible to everyone, anytime, anywhere. Founded in 2024, we've
            quickly grown to become your trusted partner in satisfying cravings
            and bringing comfort through food.
          </p>

          <h2 class="text-2xl font-semibold mb-4">Our Mission</h2>
          <p class="mb-6">
            At Quick Dash, we're on a mission to revolutionize food delivery. We
            believe that good food has the power to brighten anyone's day, and
            we're here to make that happen with just a few taps on your phone.
          </p>

          <h2 class="text-2xl font-semibold mb-4">Why Choose Quick Dash?</h2>
          <ul class="list-disc list-inside mb-6">
            <li>Exceptional customer service</li>
            <li>Lightning-fast delivery times</li>
            <li>Exclusive deals and promotions</li>
            <li>Wide variety of cuisines and restaurants</li>
            <li>User-friendly with real-time order tracking</li>
          </ul>
        </div>
        <div class="mt-2 text-center">
          <p>
            &copy; {{ new Date().getFullYear() }} Quick Dash. All rights
            reserved.
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup></script>
