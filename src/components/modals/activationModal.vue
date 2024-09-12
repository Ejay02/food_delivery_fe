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
      <h2 class="text-2xl font-bold mb-6 text-center">Activation</h2>

      <div class="flex space-x-4 mt-12">
        <input
          v-for="(box, index) in 4"
          :key="index"
          type="text"
          v-model="activationTokens[index]"
          required
          maxlength="1"
          class="w-full px-2 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
        />
      </div>

      <button
        class="mt-16"
        type="button"
        :disabled="!isActivationFormValid || loading"
        :class="[
          'w-full py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2',
          isActivationFormValid
            ? 'bg-blue-500 text-white hover:bg-blue-600'
            : 'bg-blue-300 text-gray-500 cursor-not-allowed',
        ]"
        @click="handleActivation"
      >
        Activate
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { useModalManagement } from "../../utils/modalManagement";

const { openModal, closeModal, isModalOpen } = useModalManagement();

const activationTokens = ref(["", "", "", ""]);
const loading = ref(false);

const isActivationFormValid = computed(() => {
  return activationTokens.value.every((token) => token.length === 1);
});

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

// defineExpose({ showModal, hideModal });
</script>
