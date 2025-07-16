<template>
  <div class="min-h-screen bg-gray-50">
    <AppHeader />
    
    <main class="max-w-md mx-auto px-4 py-8">
      <div v-if="!showSuccess" class="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div class="text-center mb-8">
          <div class="w-16 h-16 bg-warning-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg class="w-8 h-8 text-warning-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 15.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
          </div>
          <h1 class="text-2xl font-bold text-gray-900 mb-2">File a Complaint</h1>
          <p class="text-gray-600">Share your feedback or report an issue</p>
        </div>
        
        <ComplaintForm @success="handleSuccess" />
        
        <div class="mt-6 pt-6 border-t border-gray-200">
          <p class="text-center text-sm text-gray-500">
            Need a parking pass? 
            <NuxtLink to="/" class="text-primary-600 hover:text-primary-700 font-medium">
              Request one here
            </NuxtLink>
          </p>
        </div>
      </div>
      
      <SuccessMessage
        v-else
        title="Complaint Submitted!"
        message="Thank you for your feedback. We will review your complaint and follow up if necessary."
        :data="successData"
        @close="showSuccess = false"
      />
    </main>
  </div>
</template>

<script setup lang="ts">
const showSuccess = ref(false)
const successData = ref(null)

const handleSuccess = (data: any) => {
  successData.value = data
  showSuccess.value = true
}

useHead({
  title: 'File a Complaint | Parking Pass Request'
})
</script>