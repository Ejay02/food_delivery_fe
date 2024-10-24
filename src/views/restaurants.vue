<template>
  <div class="min-h-screen bg-black text-gray-100">
    <!-- Search and Filter Section -->
    <div
      class="bg-gray-900 sticky top-0 z-10 shadow-md border-b border-gray-800"
    >
      <div class="container mx-auto px-4 py-4">
        <div class="flex flex-col gap-4">
          <!-- Search Bar -->
          <div class="relative">
            <input
              type="text"
              v-model="searchQuery"
              placeholder="Search restaurants or cuisines..."
              class="w-full pl-10 pr-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-white placeholder-gray-400 cursor-pointer"
            />
            <span class="absolute left-3 top-2.5">🔍</span>
          </div>

          <!-- Filters -->
          <div class="flex gap-4 overflow-x-auto pb-2">
            <button
              v-for="cuisine in cuisineTypes"
              :key="cuisine"
              @click="toggleCuisineFilter(cuisine)"
              :class="[
                'px-4 py-2 rounded-full whitespace-nowrap border',
                selectedCuisines.includes(cuisine)
                  ? 'bg-primary text-white border-primary'
                  : 'bg-gray-800 text-gray-300 border-gray-700 hover:bg-gray-700',
              ]"
            >
              {{ cuisine }}
            </button>
          </div>

          <!-- Sort Options -->
          <div class="flex gap-4">
            <button
              v-for="sort in sortOptions"
              :key="sort.value"
              @click="currentSort = sort.value"
              :class="[
                'px-4 py-2 rounded-lg text-sm',
                currentSort === sort.value
                  ? 'bg-gray-700 text-white'
                  : 'bg-gray-800 text-gray-300 hover:bg-gray-700',
              ]"
            >
              {{ sort.label }}
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Restaurant List -->
    <main class="container mx-auto px-4 py-6">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div
          v-for="restaurant in filteredRestaurants"
          :key="restaurant.id"
          @click="goToRestaurant(restaurant.id)"
          class="bg-gray-900 rounded-lg shadow-xl overflow-hidden hover:shadow-2xl transition-shadow cursor-pointer border border-gray-800"
        >
          <!-- Restaurant Image -->
          <div class="relative h-48">
            <img
              :src="restaurant.image"
              :alt="restaurant.name"
              class="w-full h-full object-cover"
            />
            <div
              v-if="restaurant.promoted"
              class="absolute top-4 left-4 bg-primary text-white px-2 py-1 rounded-md text-sm"
            >
              Promoted
            </div>
          </div>

          <!-- Restaurant Info -->
          <div class="p-4">
            <div class="flex justify-between items-start mb-2">
              <div>
                <h3 class="text-lg font-semibold text-white">
                  {{ restaurant.name }}
                </h3>
                <p class="text-gray-400 text-sm">
                  {{ restaurant.cuisineType }}
                </p>
              </div>
              <div class="flex items-center bg-green-900 px-2 py-1 rounded">
                <span class="text-green-400 font-semibold">{{
                  restaurant.rating
                }}</span>
                <span class="text-yellow-400 ml-1">⭐</span>
              </div>
            </div>

            <!-- Additional Info -->
            <div class="flex items-center gap-4 text-sm text-gray-400 mt-2">
              <span>{{ restaurant.deliveryTime }} mins</span>
              <span>•</span>
              <span>${{ restaurant.deliveryFee }} delivery</span>
              <span>•</span>
              <span>${{ restaurant.minOrder }} min</span>
            </div>

            <!-- Tags -->
            <div class="flex flex-wrap gap-2 mt-3">
              <span
                v-for="tag in restaurant.tags"
                :key="tag"
                class="bg-gray-800 text-gray-300 px-2 py-1 rounded-full text-xs"
              >
                {{ tag }}
              </span>
            </div>
          </div>
        </div>
      </div>

      <!-- Loading State -->
      <div v-if="loading" class="flex justify-center py-8">
        <div
          class="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"
        ></div>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const loading = ref(false);
const searchQuery = ref("");
const selectedCuisines = ref(["All Cuisines"]);
const currentSort = ref("popular");

// Sample cuisine types
const cuisineTypes = [
  "All Cuisines",
  "Italian",
  "Japanese",
  "Chinese",
  "Indian",
  "Mexican",
  "Thai",
  "Fast Food",
  "Healthy",
  "Desserts",
];

// Sort options
const sortOptions = [
  { label: "Popular", value: "popular" },
  { label: "Rating", value: "rating" },
  { label: "Delivery Time", value: "delivery" },
  { label: "Cost: Low to High", value: "cost_asc" },
  { label: "Cost: High to Low", value: "cost_desc" },
];

// Extended sample restaurant data
const restaurants = [
  {
    id: 1,
    name: "Pizza Paradise",
    image: "https://picsum.photos/200/300",
    rating: 4.5,
    cuisineType: "Italian",
    deliveryTime: 30,
    deliveryFee: 2.99,
    minOrder: 15,
    promoted: true,
    tags: ["Pizza", "Pasta", "Family Size"],
  },
  {
    id: 2,
    name: "Roma Trattoria",
    image: "https://picsum.photos/200/300",
    rating: 4.8,
    cuisineType: "Italian",
    deliveryTime: 35,
    deliveryFee: 3.99,
    minOrder: 20,
    promoted: false,
    tags: ["Authentic", "Pasta", "Wine Selection"],
  },
  {
    id: 3,
    name: "Sushi Master",
    image: "https://picsum.photos/200/300",
    rating: 4.7,
    cuisineType: "Japanese",
    deliveryTime: 45,
    deliveryFee: 3.99,
    minOrder: 20,
    promoted: false,
    tags: ["Sushi", "Ramen", "Bento"],
  },
  {
    id: 4,
    name: "Tokyo Bites",
    image: "https://picsum.photos/200/300",
    rating: 4.6,
    cuisineType: "Japanese",
    deliveryTime: 40,
    deliveryFee: 4.99,
    minOrder: 25,
    promoted: true,
    tags: ["Sushi", "Tempura", "Sake"],
  },
  {
    id: 5,
    name: "Spice Garden",
    image: "https://picsum.photos/200/300",
    rating: 4.4,
    cuisineType: "Indian",
    deliveryTime: 50,
    deliveryFee: 2.99,
    minOrder: 18,
    promoted: false,
    tags: ["Curry", "Tandoor", "Vegetarian"],
  },
  {
    id: 6,
    name: "Taj Flavors",
    image: "https://picsum.photos/200/300",
    rating: 4.3,
    cuisineType: "Indian",
    deliveryTime: 45,
    deliveryFee: 3.49,
    minOrder: 20,
    promoted: false,
    tags: ["Biryani", "Naan", "Spicy"],
  },
];

// Filter and sort restaurants
const filteredRestaurants = computed(() => {
  let filtered = [...restaurants];

  // Search filter
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase();
    filtered = filtered.filter(
      (restaurant) =>
        restaurant.name.toLowerCase().includes(query) ||
        restaurant.cuisineType.toLowerCase().includes(query) ||
        restaurant.tags.some((tag) => tag.toLowerCase().includes(query))
    );
  }

  // Cuisine filter
  if (
    selectedCuisines.value.length > 0 &&
    !selectedCuisines.value.includes("All Cuisines")
  ) {
    filtered = filtered.filter((restaurant) =>
      selectedCuisines.value.includes(restaurant.cuisineType)
    );
  }

  // Sort
  switch (currentSort.value) {
    case "rating":
      filtered.sort((a, b) => b.rating - a.rating);
      break;
    case "delivery":
      filtered.sort((a, b) => a.deliveryTime - b.deliveryTime);
      break;
    case "cost_asc":
      filtered.sort((a, b) => a.minOrder - b.minOrder);
      break;
    case "cost_desc":
      filtered.sort((a, b) => b.minOrder - a.minOrder);
      break;
    default: // 'popular' - might want to add a popularity metric
      filtered = filtered;
  }

  return filtered;
});

// Toggle cuisine filter
const toggleCuisineFilter = (cuisine) => {
  if (cuisine === "All Cuisines") {
    selectedCuisines.value = ["All Cuisines"];
    return;
  }

  // Remove 'All Cuisines' if it's selected
  selectedCuisines.value = selectedCuisines.value.filter(
    (c) => c !== "All Cuisines"
  );

  const index = selectedCuisines.value.indexOf(cuisine);
  if (index === -1) {
    selectedCuisines.value.push(cuisine);
  } else {
    selectedCuisines.value.splice(index, 1);
  }

  // If no cuisines are selected, select 'All Cuisines'
  if (selectedCuisines.value.length === 0) {
    selectedCuisines.value = ["All Cuisines"];
  }
};

// Navigate to restaurant page
const goToRestaurant = (id) => {
  router.push(`/restaurant/${id}`);
};
</script>

<style scoped>
.bg-primary {
  background-color: #ff4d4d;
}

.text-primary {
  color: #ff4d4d;
}

.border-primary {
  border-color: #ff4d4d;
}

.ring-primary {
  --tw-ring-color: #ff4d4d;
}
</style>
