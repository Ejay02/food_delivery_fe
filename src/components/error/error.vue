<template>
  <a-result status="500" sub-title="Something is wrong, we are working on it.">
    <template #extra>
      <RouterLink to="/">
        <a-button type="primary" @click="reloadPage()">Home</a-button>
      </RouterLink>
    </template>
  </a-result>
</template>

<script setup>
function reloadPage() {
  window.location.reload();
}
</script>

<style scoped></style>
