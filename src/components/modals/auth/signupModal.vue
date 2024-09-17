<template>
  <LoadingScreen v-if="loading" />
  <div
    v-if="isModalOpen('signup-modal')"
    class="fixed inset-0 bg-[#00000027] bg-opacity-50 backdrop-blur-sm flex justify-center items-center z-50"
    @click.self="closeModal('signup-modal')"
  >
    <div
      class="bg-slate-900 p-8 rounded-lg shadow-lg w-11/12 max-w-md"
      @click.stop
    >
      <h2 class="text-2xl font-bold mb-6 text-center">Sign Up</h2>
      <form @submit.prevent="" class="space-y-4">
        <!-- name -->
        <div>
          <label for="email" class="block mb-2 text-sm font-medium"
            >Name:</label
          >
          <input
            type="text"
            id="name"
            v-model="name"
            required
            autofocus
            min="4"
            placeholder="Jane Smith"
            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
          />
        </div>

        <!-- email -->
        <div>
          <label for="email" class="block mb-2 text-sm font-medium"
            >Email:</label
          >
          <input
            type="email"
            id="email"
            v-model="email"
            required
            autofocus
            placeholder="hello@test.com"
            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
          />
        </div>
        <!-- password -->
        <div>
          <label for="password" class="block mb-2 text-sm font-medium"
            >Password:</label
          >
          <input
            type="password"
            id="password"
            v-model="password"
            required
            placeholder="myPassword@#12$"
            minlength="8"
            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
          />
        </div>

        <!-- number -->
        <div>
          <label for="password" class="block mb-2 text-sm font-medium"
            >Phone Number:</label
          >
          <input
            type="number"
            id="number"
            v-model="number"
            required
            placeholder="+001 234 5678"
            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
          />
        </div>

        <!-- submit -->
        <button
          @click="handleSubmit"
          type="submit"
          :disabled="!isFormValid || loading"
          :class="[
            'w-full py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2',
            isFormValid
              ? 'bg-blue-500 text-white hover:bg-blue-600'
              : 'bg-blue-300 text-gray-500 cursor-not-allowed',
          ]"
        >
          Sign Up
        </button>
      </form>

      <div class="mt-4 text-center">
        <p class="text-sm">Or signup with</p>
        <div class="flex justify-center space-x-4 mt-2">
          <GoogleLogin
            :callback="callback"
            popup-type="TOKEN"
            class="block w-full rounded-md shadow-sm"
          >
            <button class="text-white p-2 rounded-md hover:bg-slate-500">
              <img src="/src/assets/google.jpg" class="w-4 h-4" />
            </button>
          </GoogleLogin>
        </div>
      </div>

      <div class="mt-4 text-center text-sm">
        <p class="">
          Have an account?
          <a
            href="#"
            @click="switchToLogin"
            class="text-blue-500 hover:underline"
            >Login</a
          >
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from "vue";
import LoadingScreen from "../../loadingScreen.vue";
import { useMutation } from "@vue/apollo-composable";
import { useUserStore } from "../../../store/userStore";
import { registerMutation } from "../../../graphql/mutations";
import { useNotifications } from "../../../composables/globalAlert";
import { useModalManagement } from "../../../utils/modalManagement";

const userStore = useUserStore();

const { notify } = useNotifications();
const { openModal, closeModal, isModalOpen } = useModalManagement();

const name = ref("");
const email = ref("");
const password = ref("");
const number = ref("");

const resetForm = () => {
  name.value = "";
  email.value = "";
  password.value = "";
  number.value = "";
};

const isFormValid = computed(() => {
  return (
    name.value.trim() !== "" &&
    email.value.trim() !== "" &&
    password.value.trim() !== "" &&
    number.value !== ""
  );
});

const { mutate: register, loading } = useMutation(registerMutation);

const handleSubmit = async () => {
  try {
    const res = await register({
      name: name.value,
      email: email.value,
      password: password.value,
      phone_number: number.value,
    });

    if (res.data.register) {
      const actToken = res.data.register.activation_token;

      // find token and access token so we can set headers

      localStorage.setItem("activation_token", actToken);
      notify("Please check your email to activate your account", "success");

      closeModal("signup-modal");
      resetForm();
      openModal("activation-modal");
    }
  } catch (error) {
    notify(error.message, "error");
  }
};

const switchToLogin = () => {
  closeModal("signup-modal");
  openModal("login-modal");
};

const callback = async (response) => {
  try {
    console.log("Login with Gmail");
    // This callback will be triggered when the user selects or login to
    // his Google account from the popup
    console.log("Handle the response", response);

    // const accessToken = response.access_token;

    // const res = await validateGoogleToken({
    // 	googleOauthValidateInput: {
    // 		accessToken: accessToken,
    // 		inviteCode,
    // 	},
    // });
  } catch (error) {
    console.log("error:", error);
  }
};
</script>
