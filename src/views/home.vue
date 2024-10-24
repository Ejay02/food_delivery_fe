<template>
  <div class="main-container">
    <!-- Hero Section -->
    <section class="hero-section">
      <div class="mb-5">
        <h1 class="text-4xl">Delicious Food Delivered</h1>
        <p>Order from your favorite local restaurants</p>
        <div class="search-bar">
          <input
            type="text"
            placeholder="Enter your delivery address"
            v-model="deliveryAddress"
            class="cursor-pointer"
          />
          <button @click="searchRestaurants">Find Food</button>
        </div>
      </div>
    </section>

    <!-- Popular Categories Section -->
    <section class="mb-14">
      <div class="flex">
        <div class="flex items-center group">
          <h2 class="text-3xl">Popular Categories</h2>
          <ArrowIcon
            class="mb-5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          />
        </div>
        <div class=""></div>
      </div>
      <div class="category-grid">
        <div
          v-for="category in categories"
          :key="category.id"
          class="category-card"
        >
          <img :src="category.image" :alt="category.name" />
          <span class="m-2">{{ category.name }}</span>
        </div>
      </div>
    </section>

    <!-- Featured Restaurants -->
    <section class="mb-14">
      <div class="flex">
        <div class="flex items-center group">
          <h2 class="text-3xl">Featured Restaurants</h2>
          <ArrowIcon
            class="mb-5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          />
        </div>
        <div class=""></div>
      </div>
      <div class="restaurant-grid">
        <div
          v-for="restaurant in restaurants"
          :key="restaurant.id"
          class="restaurant-card"
        >
          <img :src="restaurant.image" :alt="restaurant.name" />
          <div class="restaurant-info">
            <h3>{{ restaurant.name }}</h3>
            <p>{{ restaurant.cuisine }}</p>
            <div class="restaurant-meta">
              <span>{{ restaurant.rating }} ⭐</span>
              <span>{{ restaurant.deliveryTime }} mins</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- How It Works -->
    <section class="mb-14">
      <h2 class="mb-5 text-3xl">How It Works</h2>
      <div class="steps-grid">
        <div class="step" v-for="step in steps" :key="step.id">
          <div class="step-icon">{{ step.icon }}</div>
          <h3>{{ step.title }}</h3>
          <p>{{ step.description }}</p>
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
  // Add more restaurants as needed
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
  // Implement search functionality
  console.log("Searching restaurants near:", deliveryAddress.value);
};
</script>

<style scoped>
.main-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
  cursor: pointer;
}

.hero-section {
  background: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)),
    url("/images/hero-bg.jpg");
  background-size: cover;
  background-position: center;
  color: white;
  padding: 50px 20px;
  text-align: center;
  /* margin-bottom: 40px; */
}

.search-bar {
  max-width: 600px;
  margin: 30px auto;
  display: flex;
  gap: 10px;
}

.search-bar input {
  flex: 1;
  padding: 15px;
  border-radius: 5px;
  border: none;
}

.search-bar button {
  padding: 15px 30px;
  background-color: #ff4d4d;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

/* doing */

.category-grid,
.restaurant-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
  margin-top: 20px;
}

.category-card,
.restaurant-card {
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s;
}

.category-card:hover,
.restaurant-card:hover {
  transform: translateY(-5px);
}

.category-card img,
.restaurant-card img {
  width: 100%;
  height: 200px;
  object-fit: cover;
}

.restaurant-info {
  padding: 15px;
}

.restaurant-meta {
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
  color: #666;
}

.steps-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 30px;
  margin-top: 20px;
}

.step {
  text-align: center;
  padding: 20px;
}

.step-icon {
  font-size: 40px;
  margin-bottom: 15px;
}

@media (max-width: 768px) {
  .hero-content h1 {
    font-size: 36px;
  }

  .search-bar {
    flex-direction: column;
  }

  .category-grid,
  .restaurant-grid {
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  }
}
</style>
