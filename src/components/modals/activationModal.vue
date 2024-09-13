<template>
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
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { useModalManagement } from "../../utils/modalManagement";
import { useNotifications } from "../../composables/globalAlert";
import { activateUserMutation } from "@/graphql/mutations";
import { useMutation } from "@vue/apollo-composable";

const { notify } = useNotifications();

const { openModal, closeModal, isModalOpen } = useModalManagement();

const activationTokens = ref(["", "", "", ""]);

const isActivationFormValid = computed(() => {
  return activationTokens.value.every((token) => token.length === 1);
});

const token = localStorage.getItem("activation_token");

const { mutate: activate, error, loading } = useMutation(activateUserMutation);

const handleSubmit = async () => {
  try {
    const res = await activate({
      activationToken: token,
      activationCode: activationTokens.value,
    });
    console.log("res:", res.data);
  } catch (error) {
    notify("Couldn't verify token", "error");
  }
};

function openActivationModal() {
  isActivationModalVisible.value = true;
}

function closeActivationModal() {
  isActivationModalVisible.value = false;
}

function handleActivation() {
  // Handle activation logic here
  console.log(activationTokens.value.join(""));
}

function handleInput(index) {
  if (activationTokens.value[index].length === 1 && index < 3) {
    const nextInput =
      document.querySelectorAll('input[type="text"]')[index + 1];
    nextInput.focus();
  }
}
</script>
