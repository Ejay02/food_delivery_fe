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
      <h6 class="text-center">We've sent a 4-digit code by email.</h6>
      <h6 class="text-center">Don't see it? Check your spam folder.</h6>

      <div class="m-auto flex items-center justify-around mt-12">
        <input
          v-for="(box, index) in 4"
          :key="index"
          :ref="
            (el) => {
              if (index === 0) firstInput = el;
            }
          "
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
import { ref, computed, nextTick, watch } from "vue";
import { useUserStore } from "@/store/userStore";
import LoadingScreen from "../../loadingScreen.vue";
import { useMutation } from "@vue/apollo-composable";
import { activateUserMutation } from "@/graphql/mutations";
import { useNotifications } from "../../../composables/globalAlert";
import { useModalManagement } from "../../../utils/modalManagement";
import { setCookie } from "@/utils/cookie";

const { notify } = useNotifications();

const { openModal, isModalOpen } = useModalManagement();
const userStore = useUserStore();

const activationTokens = ref(["", "", "", ""]);
const firstInput = ref(null);

const resetActivationTokens = () => {
  activationTokens.value = ["", "", "", ""];
};

const isActivationFormValid = computed(() => {
  return activationTokens.value.every((token) => token.length === 1);
});

const { mutate: activate, error, loading } = useMutation(activateUserMutation);

watch(
  () => isModalOpen("activation-modal"),
  (isOpen) => {
    if (isOpen) {
      nextTick(() => {
        if (firstInput.value) {
          firstInput.value.focus();
        }
      });
    }
  }
);

const handleSubmit = async () => {
  try {
    const activationCode = activationTokens.value.join("");
    const token = localStorage.getItem("activation_token");

    const res = await activate({
      activationToken: token,
      activationCode: activationCode,
    });

    if (res.data) {
      const { accessToken, refreshToken, user } = res.data.activateUser;

      // Set user data in the store
      userStore.setUser({
        accessToken,
        refreshToken,
        user,
      });

      // Set cookies
      setCookie("access_token", accessToken, 7);
      setCookie("refresh_token", refreshToken, 7);

      userStore.persistData();

      notify("Account verified successfully", "success");
      localStorage.removeItem("activation_token");
      closeModal("activation-modal");
      resetActivationTokens();
    } else {
      throw new Error("Activation failed. Please try again.");
    }
  } catch (error) {
    localStorage.removeItem("activation_token");

    clearCookie("access_token");
    clearCookie("refresh_token");

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
