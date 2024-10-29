<template>
  <div class="max-w-7xl mx-auto px-4">
    <!-- Hero Section -->
    <section
      class="relative py-20 mb-16 text-center text-white rounded-b-lg overflow-hidden"
    >
      <div class="absolute inset-0 bg-black/50">
        <div
          class="absolute inset-0 bg-[url('/src/assets/bg_img.jpg')] bg-cover bg-center mix-blend-overlay "
        ></div>
      </div>
      <div class="relative mb-5">
        <h1 class="text-4xl font-bold mb-4">Delicious Food Delivered</h1>
        <p class="text-xl">Order from your favorite local restaurants</p>
        <div class="max-w-2xl mx-auto flex flex-col sm:flex-row gap-4 mt-8">
          <input
            type="text"
            placeholder="Enter your delivery address"
            v-model="deliveryAddress"
            class="flex-1 px-4 py-3 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-red-500"
          />
          <button
            @click="searchRestaurants"
            class="px-8 py-3 bg-red-500 hover:bg-red-600 rounded-lg transition-colors duration-200"
          >
            Find Food
          </button>
        </div>
      </div>
    </section>

    <!-- Popular Categories Section -->
    <section class="mb-14">
      <div class="flex items-center group mb-6">
        <h2 class="text-3xl font-bold">Popular Categories</h2>
        <ArrowIcon
          class="ml-2 mb-5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        />
      </div>
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div
          v-for="category in categories"
          :key="category.id"
          class="group rounded-lg overflow-hidden shadow-md hover:-translate-y-1 transition-transform duration-200"
        >
          <img
            :src="category.image"
            :alt="category.name"
            class="w-full h-48 object-cover"
          />
          <span class="block p-4 font-medium">{{ category.name }}</span>
        </div>
      </div>
    </section>

    <!-- Featured Restaurants -->
    <section class="mb-14">
      <div class="flex items-center group mb-6">
        <h2 class="text-3xl font-bold">Featured Restaurants</h2>
        <ArrowIcon
          class="ml-2 mb-5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        />
      </div>
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <div
          v-for="restaurant in restaurants"
          :key="restaurant.id"
          class="rounded-lg overflow-hidden shadow-md hover:-translate-y-1 transition-transform duration-200"
        >
          <img
            :src="restaurant.image"
            :alt="restaurant.name"
            class="w-full h-48 object-cover"
          />
          <div class="p-4">
            <h3 class="font-bold text-lg">{{ restaurant.name }}</h3>
            <p class="text-gray-600">{{ restaurant.cuisine }}</p>
            <div class="flex justify-between mt-2 text-sm text-gray-600">
              <span>{{ restaurant.rating }} ⭐</span>
              <span>{{ restaurant.deliveryTime }} mins</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- How It Works -->
    <section class="mb-14">
      <h2 class="text-3xl font-bold mb-8">How It Works</h2>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div v-for="step in steps" :key="step.id" class="text-center p-6">
          <div class="text-4xl mb-4">{{ step.icon }}</div>
          <h3 class="font-bold text-xl mb-2">{{ step.title }}</h3>
          <p class="text-gray-600">{{ step.description }}</p>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import ArrowIcon from "@/components/icons/arrowIcon.vue";
import { ref } from "vue";

const deliveryAddress = ref("");

const categories = ref([
  { id: 1, name: "Pizza", image: "https://baconmockup.com/200/300" },
  { id: 2, name: "Sushi", image: "https://picsum.photos/200/300" },
  { id: 3, name: "Burgers", image: "https://baconmockup.com/200/300" },
  { id: 4, name: "Chinese", image: "https://picsum.photos/200/300" },
]);

const restaurants = ref([
  {
    id: 1,
    name: "Pizza Palace",
    cuisine: "Italian",
    rating: 4.5,
    deliveryTime: 30,
    image: "https://picsum.photos/200/300",
  },
  {
    id: 2,
    name: "Sushi Hub",
    cuisine: "Japanese",
    rating: 4.7,
    deliveryTime: 35,
    image: "https://picsum.photos/200/300",
  },
]);

const steps = ref([
  {
    id: 1,
    icon: "📍",
    title: "Set Your Location",
    description: "Enter your address to find nearby restaurants",
  },
  {
    id: 2,
    icon: "🍽️",
    title: "Choose Your Food",
    description: "Browse menus and select your favorite dishes",
  },
  {
    id: 3,
    icon: "🚚",
    title: "Get It Delivered",
    description: "Track your order in real-time",
  },
]);

const searchRestaurants = () => {
  console.log("Searching restaurants near:", deliveryAddress.value);
};
</script>
