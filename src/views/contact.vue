<template>
  <div
    class="flex justify-center items-center min-h-screen bg-gradient-to-r from-gray-800 via-indigo-600 to-black"
  >
    <div class="rounded-lg shadow-lg overflow-hidden w-full max-w-4xl">
      <div class="flex flex-col lg:flex-row">
        <!-- Left Container -->
        <div
          class="hidden lg:flex flex-1 bg-sky-600 justify-center items-center p-8"
        >
          <div class="text-center space-y-4">
            <h2 class="text-2xl font-bold">Let's Chat</h2>
            <p>
              Whether you have a question, want to start a project, or simply
              want to connect.
            </p>
            <br />
            <p>Feel free to send me a message in the contact form.</p>
            <div class="flex justify-center items-center">
              <!-- linkdin -->
              <a
                href="https://www.linkedin.com/in/ejakpovi/"
                class="social mr-2"
                target="_blank"
                ><i class="fab fa-linkedin-in"></i
              ></a>

              <!-- github -->
              <a
                href="https://github.com/Ejay02?tab=repositories"
                target="_blank"
                class="social"
              >
                <i class="fa-brands fa-github"></i>
              </a>
            </div>
          </div>
        </div>

        <!-- Right Container -->
        <div class="flex flex-1 justify-center items-center bg-white p-8">
          <div class="w-full max-w-md space-y-4 mt-10">
            <form action="#">
              <input
                type="text"
                placeholder="Name *"
                autofocus
                class="bg-gray-200 w-full p-3 mb-3 rounded focus:outline-none focus:ring-2 focus:ring-sky-500"
              />
              <input
                type="email"
                placeholder="Email *"
                class="bg-gray-200 w-full p-3 mb-3 rounded focus:outline-none focus:ring-2 focus:ring-sky-500"
              />
              <input
                type="text"
                placeholder="Company"
                class="bg-gray-200 w-full p-3 mb-3 rounded focus:outline-none focus:ring-2 focus:ring-sky-500"
              />
              <input
                type="tel"
                placeholder="Phone"
                class="bg-gray-200 w-full p-3 mb-3 rounded focus:outline-none focus:ring-2 focus:ring-sky-500"
              />
              <textarea
                rows="4"
                placeholder="Message"
                class="bg-gray-200 w-full p-3 mb-3 rounded focus:outline-none focus:ring-2 focus:ring-sky-500"
              ></textarea>
              <div class="flex justify-end">
                <button
                  class="bg-sky-500 text-white uppercase text-sm py-3 px-6 rounded-lg hover:opacity-80"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup></script>
