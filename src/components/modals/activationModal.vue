<template>
  <div
    v-if="isActivationModalVisible"
    class="fixed inset-0 bg-[#00000027] bg-opacity-50 backdrop-blur-sm flex justify-center items-center z-50"
    @click="closeActivationModal"
  >
    <div
      class="bg-slate-900 p-8 rounded-lg shadow-lg w-11/12 max-w-md"
      @click.stop
    >
      <h2 class="text-2xl font-bold mb-6 text-center">Activation</h2>
      <div class="space-y-4">
        <div v-for="(box, index) in 4" :key="index">
          <input
            type="text"
            v-model="activationTokens[index]"
            required
            maxlength="1"
            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
          />
        </div>
      </div>

      <button
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

const isActivationModalVisible = ref(false);
const activationTokens = ref(["", "", "", ""]);
const loading = ref(false);

const showModal = () => {
  isActivationModalVisible.value = true;
};

const hideModal = () => {
  isActivationModalVisible.value = false;
};

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

defineExpose({ showModal, hideModal });
</script>
