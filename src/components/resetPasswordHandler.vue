<template>
  <div>
    <!-- This component doesn't need to render anything visible -->
  </div>
</template>

<script setup>
import { onMounted } from "vue";
import { useRoute } from "vue-router";
import { useModalManagement } from "../utils/modalManagement";

const route = useRoute();
const { openModal } = useModalManagement();

onMounted(() => {
  const verify = route.query.verify;

  if (!!verify) {
    localStorage.setItem("resetPasswordToken", verify);

    openModal("reset-modal");
  }
});
</script>
