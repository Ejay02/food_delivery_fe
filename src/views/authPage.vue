<template></template>

<script setup>
import { onMounted } from "vue";
import { useModalManagement } from "@/utils/modalManagement";

const { openModal } = useModalManagement();

onMounted(() => {
  openModal("login-modal");
});
</script>

<style lang="scss" scoped></style>
