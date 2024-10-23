<template>
  <LoadingScreen v-if="loading" />

  <div
    v-if="isModalOpen('reset-modal') && !loading && !error"
    class="fixed inset-0 bg-[#00000027] bg-opacity-50 backdrop-blur-sm flex justify-center items-center z-50"
  >
    <!-- @click.self="closeModal('reset-modal')" -->
    <div class="bg-slate-900 p-8 rounded-lg shadow-lg w-11/12 max-w-md">
      <h2 class="text-2xl font-bold mb-6 text-center text-white">
        Reset Password
      </h2>
      <form @submit.prevent="" class="space-y-4">
        <div>
          <label
            for="password"
            class="block mb-2 text-sm font-medium text-white"
            >New Password:</label
          >
          <div class="relative">
            <input
              :type="showPassword ? 'text' : 'password'"
              id="password"
              v-model="password"
              required
              placeholder="myPassword@#12$"
              minlength="8"
              class="cursor-pointer w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
            />
            <button
              type="button"
              class="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400"
              @click="togglePasswordVisibility('password')"
            >
              <i :class="showPassword ? 'fas fa-eye-slash' : 'fas fa-eye'"></i>
            </button>
          </div>
        </div>

        <button
          @click="handleSubmit"
          type="submit"
          :disabled="!isFormValid"
          :class="[
            'w-full py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2',
            isFormValid
              ? 'bg-blue-500 text-white hover:bg-blue-600'
              : 'bg-blue-300 text-gray-500 cursor-not-allowed',
          ]"
        >
          Reset
        </button>
      </form>

      <div class="border-b border-gray-300 border-opacity-10 mt-8"></div>

      <div class="mt-4 text-center text-sm">
        <p class="text-white">
          Go back to
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
import { useRoute } from "vue-router";
import { computed, onMounted, ref } from "vue";
import LoadingScreen from "../../loadingScreen.vue";
import { useMutation } from "@vue/apollo-composable";
import { resetPasswordMutation } from "../../../graphql/mutations";
import { useNotifications } from "../../../composables/globalAlert";
import { useModalManagement } from "../../../utils/modalManagement";

const { notify } = useNotifications();

const { openModal, closeModal, isModalOpen } = useModalManagement();

const password = ref("");

const route = useRoute();

// const activationToken = route.query.verify;

const activationTokenII = localStorage.getItem("resetPasswordToken");

const resetForm = () => {
  password.value = "";
};

const showPassword = ref(false);

const togglePasswordVisibility = (field) => {
  if (field === "password") {
    showPassword.value = !showPassword.value;
  }
};

const isFormValid = computed(() => {
  return password.value.trim() !== "";
});

const {
  mutate: resetPassword,
  error,
  loading,
} = useMutation(resetPasswordMutation);

const handleSubmit = async () => {
  try {
    const res = await resetPassword({
      password: password.value,
      activationToken: activationTokenII,
    });

    if (res.data) {
      notify("Password Reset Successful", "success");
      closeModal("reset-modal");

      resetForm();
      localStorage.removeItem("resetPasswordToken");
      openModal("login-modal");
    }
  } catch (error) {
    openModal("reset-modal");
    notify(error.message, "error");
  }
};

const switchToLogin = () => {
  closeModal("reset-modal");
  openModal("login-modal");
};
</script>
