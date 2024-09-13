<template>
  <Header />
</template>

<script setup>
import { authUserQuery } from "@/graphql/queries";
import Header from "../components/layout/header.vue";
import { useQuery } from "@vue/apollo-composable";

const { result: authUser, loading, error } = useQuery(authUserQuery);
console.log("authUser:", authUser);
</script>

<style lang="scss" scoped></style>
