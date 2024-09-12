<template>
  <div class="h-screen flex justify-center items-center">
    <section class="container text-center">
      <div class="content flex flex-col justify-center items-center">
        <div class="four_zero_four_text">
          <h1 class="text-8xl text-black">404</h1>
        </div>
        <div
          class="four_zero_four_bg h-[400px] w-full max-w-[600px] bg-cover bg-center"
          style="
            background-image: url(https://cdn.dribbble.com/users/285475/screenshots/2083086/dribbble_1.gif);
          "
        ></div>
        <div class="content_box_404">
          <h3 class="text-xl">Hmmm, looks like you're lost</h3>
          <p>The page you are looking for is not available!</p>
          <button
            class="bg-[#ffd333] text-black py-2 px-4 rounded-md"
            type="submit"
          >
            <a href="/" class="text-black no-underline hover:underline"
              >Go Home</a
            >
          </button>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup></script>
