<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <!-- Popular Foods Section -->
    <section class="popular-foods-section mb-10">
      <!-- <div class="flex items-center justify-between">
        <h2 class="text-3xl"></h2>
      </div> -->
      <div>
        <h1 class="text-4xl font-bold text-center m-4 cursor-pointer">
          Popular Foods
        </h1>
      </div>
      <div
        class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-6"
      >
        <div v-for="food in popularFoods" :key="food.id" class="food-card">
          <img
            :src="food.image"
            :alt="food.name"
            class="w-full h-48 object-cover rounded-lg"
          />
          <div class="p-4">
            <h3 class="text-lg font-bold">{{ food.name }}</h3>
            <p class="text-gray-600">{{ food.description }}</p>
            <div class="flex justify-between mt-2">
              <span class="text-lg font-bold">${{ food.price }}</span>
              <span class="text-yellow-500">{{ food.rating }} ⭐</span>
            </div>
            <button
              @click="addToCart(food)"
              class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-lg mt-4"
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref } from "vue";

const popularFoods = ref([
  {
    id: 1,
    name: "Pizza Margherita",
    description: "Fresh tomato sauce, mozzarella, and basil",
    price: 15.99,
    rating: 4.5,
    image: "https://picsum.photos/200/300",
  },
  {
    id: 2,
    name: "Chicken Fajitas",
    description: "Grilled chicken, bell peppers, onions, and tortillas",
    price: 12.99,
    rating: 4.2,
    image: "https://picsum.photos/200/300",
  },
  {
    id: 3,
    name: "Burger Deluxe",
    description: "Beef patty, cheddar cheese, lettuce, tomato, and onion",
    price: 10.99,
    rating: 4.8,
    image: "https://picsum.photos/200/300",
  },
  {
    id: 4,
    name: "Veggie Wrap",
    description: "Hummus, cucumber, tomato, and mixed greens",
    price: 9.99,
    rating: 4.6,
    image: "https://picsum.photos/200/300",
  },
]);

function addToCart(food) {
  // Implement add to cart functionality
  console.log(`Added ${food.name} to cart`);
}
</script>
