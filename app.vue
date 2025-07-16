<template>
  <div>
    <NuxtPage />
  </div>
</template>

<script setup lang="ts">
// Check authentication on app load
const { checkAuth } = useAuth();

onMounted(() => {
  checkAuth();
});
</script>