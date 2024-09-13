<template>
  <div
    class="fixed top-0 left-0 w-full h-full bg-white/80 z-[9999] flex justify-center items-center transition-opacity duration-300"
  >
    <h2 class="ml-4 text-xl text-blue-500">
      Loading, stand by<span class="dots"
        ><span>.</span><span>.</span><span>.</span></span
      >
    </h2>
  </div>
</template>

<script setup></script>

<style scoped>
.dots span {
  opacity: 0;
  display: inline-block;
  animation: appear-disappear 1.5s infinite;
}

.dots span:nth-child(2) {
  animation-delay: 0.5s;
}

.dots span:nth-child(3) {
  animation-delay: 1s;
}

@keyframes appear-disappear {
  0%,
  100% {
    opacity: 0;
  }
  33.33% {
    opacity: 1;
  }
  66.66% {
    opacity: 0;
  }
}
</style>
