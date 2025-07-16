<template>
  <div class="bg-success-50 border border-success-200 rounded-lg p-6 text-center">
    <div class="w-12 h-12 bg-success-100 rounded-full flex items-center justify-center mx-auto mb-4">
      <svg class="w-6 h-6 text-success-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
      </svg>
    </div>
    
    <h3 class="text-lg font-semibold text-success-800 mb-2">
      {{ title }}
    </h3>
    
    <p class="text-success-700 mb-4">
      {{ message }}
    </p>
    
    <div v-if="data" class="bg-white rounded-lg p-4 text-sm text-gray-600 mb-4">
      <div v-if="data.id" class="mb-2">
        <span class="font-medium">Reference ID:</span> {{ data.id }}
      </div>
      <div v-if="data.licensePlate" class="mb-2">
        <span class="font-medium">License Plate:</span> {{ data.licensePlate }}
      </div>
      <div v-if="data.timestamp">
        <span class="font-medium">Submitted:</span> 
        {{ new Date(data.timestamp).toLocaleString() }}
      </div>
    </div>
    
    <button 
      @click="$emit('close')"
      class="btn-secondary"
    >
      Submit Another Request
    </button>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  title: string
  message: string
  data?: any
}>()

defineEmits<{
  close: []
}>()
</script>