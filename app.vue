<template>
  <div>
    <NuxtPage />
  </div>
</template>

<script setup lang="ts">
// Check authentication on app load
const { checkAuth } = useAuth();

onMounted(() => {
  // Temporarily commented out to test
  // checkAuth();
});
</script>