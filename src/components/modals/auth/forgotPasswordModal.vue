<template>
  <LoadingScreen v-if="loading" />

  <div
    v-if="isModalOpen('forgot-modal') && !loading && !error"
    class="fixed inset-0 bg-[#00000027] bg-opacity-50 backdrop-blur-sm flex justify-center items-center z-50"
    @click.self="closeModal('forgot-modal')"
  >
    <div class="bg-slate-900 p-8 rounded-lg shadow-lg w-11/12 max-w-md">
      <h2 class="text-2xl font-bold mb-2 text-center">Forgot password?</h2>
      <h6 class="text-sm mb-6">
        No worries, we will send reset instructions to your email.
      </h6>
      <form @submit.prevent="" class="space-y-4">
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
          Send Mail
        </button>
      </form>

      <div class="mt-4 text-center text-sm">
        <p class="">
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
import { computed, ref } from "vue";
import { forgotPasswordMutation } from "@/graphql/mutations";
import { useMutation } from "@vue/apollo-composable";
import LoadingScreen from "@/components/loadingScreen.vue";
import { useModalManagement } from "@/utils/modalManagement";
import { useNotifications } from "@/composables/globalAlert";

const email = ref("");
const { notify } = useNotifications();
const { openModal, closeModal, isModalOpen } = useModalManagement();

const switchToLogin = () => {
  closeModal("forgot-modal");
  openModal("login-modal");
};

const isFormValid = computed(() => {
  return email.value.trim() !== "";
});

const {
  mutate: forgotPassword,
  error,
  loading,
} = useMutation(forgotPasswordMutation);

const handleSubmit = async () => {
  try {
    const res = await forgotPassword({ email: email.value });

    if (res.data) {
      notify("Password reset email sent to your email", "success");
      email.value = "";
    }
  } catch (error) {
    notify(error.message, "error");
  }
};
</script>
