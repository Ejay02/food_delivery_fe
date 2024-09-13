<template>
  <LoadingScreen v-if="loading" />
  <div
    v-if="isModalOpen('activation-modal')"
    class="fixed inset-0 bg-[#00000027] bg-opacity-50 backdrop-blur-sm flex justify-center items-center z-50"
    @click.self="closeModal('activation-modal')"
  >
    <div
      class="bg-slate-900 p-8 rounded-lg shadow-lg w-11/12 max-w-md"
      @click.stop
    >
      <h2 class="text-2xl font-bold mb-6 text-center">Verify Your Account</h2>

      <div class="m-auto flex items-center justify-around mt-16">
        <input
          v-for="(box, index) in 4"
          :key="index"
          type="text"
          v-model="activationTokens[index]"
          required
          maxlength="1"
          :class="{
            'w-[65px] h-[65px] bg-transparent border-[3px] rounded-[10px] flex items-center text-white justify-center text-[18px] outline-none text-center': true,
            'shake border-red-500': error,
            'border-white': !error,
          }"
          @input="handleInput(index)"
          @paste.prevent
        />
      </div>

      <button
        class="mt-16 mb-9"
        type="button"
        :disabled="!isActivationFormValid || loading"
        :class="[
          'w-full py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2',
          isActivationFormValid
            ? 'bg-blue-500 text-white hover:bg-blue-600'
            : 'bg-blue-300 text-gray-500 cursor-not-allowed',
        ]"
        @click="handleSubmit"
      >
        Verify OTP
      </button>

      <div class="mt-4 text-center text-sm">
        <p class="">
          Go Back To Signup?
          <a
            href="#"
            @click="switchToSignup"
            class="text-blue-500 hover:underline"
            >Sign up</a
          >
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { useModalManagement } from "../../utils/modalManagement";
import { useNotifications } from "../../composables/globalAlert";
import { activateUserMutation } from "@/graphql/mutations";
import { useMutation } from "@vue/apollo-composable";
import LoadingScreen from "../loadingScreen.vue";

const { notify } = useNotifications();

const { openModal, closeModal, isModalOpen } = useModalManagement();

const activationTokens = ref(["", "", "", ""]);

const resetActivationTokens = () => {
  activationTokens.value = ["", "", "", ""];
};

const isActivationFormValid = computed(() => {
  return activationTokens.value.every((token) => token.length === 1);
});

const token = localStorage.getItem("activation_token");

const { mutate: activate, error, loading } = useMutation(activateUserMutation);

const handleSubmit = async () => {
  try {
    const activationCode = activationTokens.value.join("");

    const res = await activate({
      activationToken: token,
      activationCode: activationCode,
    });

    notify("Account verified successfully", "success");
    closeModal("activation-modal");
    resetActivationTokens();
  } catch (error) {
    notify(error.message, "error");
  }
};

function handleInput(index) {
  if (activationTokens.value[index].length === 1 && index < 3) {
    const nextInput =
      document.querySelectorAll('input[type="text"]')[index + 1];
    nextInput.focus();
  }
}

const switchToSignup = () => {
  closeModal("activation-modal");
  openModal("signup-modal");
};
</script>
