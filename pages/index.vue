<template>
  <div class="min-h-screen bg-gray-50">
    <AppHeader />
    
    <main class="max-w-md mx-auto px-4 py-8">
      <div v-if="!showSuccess" class="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div class="text-center mb-8">
          <div class="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg class="w-8 h-8 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2v0a2 2 0 01-2-2v-2a2 2 0 00-2-2H8z" />
            </svg>
          </div>
          <h1 class="text-2xl font-bold text-gray-900 mb-2">Request Parking Testing</h1>
          <p class="text-gray-600">Get temporary parking access for your visit</p>
        </div>
        
        <ParkingRequestForm @success="handleSuccess" />
        
        <div class="mt-6 pt-6 border-t border-gray-200">
          <p class="text-center text-sm text-gray-500">
            Need to file a complaint? 
            <NuxtLink to="/complaint" class="text-primary-600 hover:text-primary-700 font-medium">
              Click here
            </NuxtLink>
          </p>
        </div>
      </div>
      
      <SuccessMessage
        v-else
        title="Parking Pass Requested!"
        message="Your parking pass request has been submitted successfully. Please keep this confirmation for your records."
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
  title: 'Request Parking Pass | Parking Pass Request'
})
</script>