<template>
  <div class="min-h-screen bg-gray-900">
    <!-- Header with Security Branding -->
    <div class="bg-gray-800 border-b border-gray-700">
      <div class="max-w-md mx-auto px-4 py-4">
        <div class="flex items-center justify-between">
          <div class="flex items-center space-x-3">
            <div class="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center relative">
              <div class="w-6 h-6 bg-gray-800 transform rotate-45"></div>
              <div class="absolute inset-0 flex items-center justify-center">
                <svg class="w-4 h-4 text-amber-700 z-10" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2L2 7v10c0 5.55 3.84 9.95 9 11 5.16-1.05 9-5.45 9-11V7l-10-5z"/>
                </svg>
              </div>
            </div>
            <div>
              <h2 class="text-lg font-bold text-white">SECURITY</h2>
              <p class="text-xs text-amber-200">PARKING ENFORCEMENT</p>
            </div>
          </div>
          <button class="p-2 rounded-lg hover:bg-gray-700">
            <svg class="w-6 h-6 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>
    </div>

    <main class="max-w-md mx-auto px-4 py-6">
      <!-- Hero Section with Background -->
      <div class="mb-6">
        <div class="relative h-48 bg-gray-800 rounded-2xl overflow-hidden">
          <!-- Background pattern -->
          <div class="absolute inset-0 bg-gradient-to-br from-gray-700 via-gray-800 to-gray-900"></div>
          <div class="absolute inset-0 bg-gradient-to-t from-gray-900/80 to-transparent"></div>
          <div class="absolute inset-0 flex items-center justify-center">
            <div class="text-center text-white px-4">
              <div class="w-16 h-16 bg-amber-100/20 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-4">
                <svg class="w-8 h-8 text-amber-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h1 class="text-xl font-bold mb-1">Request a Parking Permit</h1>
              <p class="text-amber-200 text-sm">Professional Security Service</p>
            </div>
          </div>
        </div>
      </div>

      <div>
        <!-- Main Form Card -->
        <div class="bg-gray-800 rounded-2xl shadow-2xl border border-gray-700 overflow-hidden">
          <!-- Card Header -->
          <div class="bg-gradient-to-r from-gray-700 to-gray-800 px-6 py-5 border-b border-gray-600">
            <div class="flex items-center space-x-3">
              <div class="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center">
                <svg class="w-6 h-6 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <div>
                <h2 class="text-lg font-semibold text-white">Request a Parking Permit</h2>
                <p class="text-sm text-gray-300">Please complete this form</p>
              </div>
            </div>
          </div>

          <!-- Form Content -->
          <div class="p-6">
            <!-- Important Notice -->
            <div class="bg-amber-50 border border-amber-200 rounded-xl p-4 mb-6">
              <div class="flex items-start space-x-3">
                <svg class="w-5 h-5 text-amber-600 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                </svg>
                <div>
                  <p class="text-sm text-amber-800 font-medium">This permit is valid for 24hrs.</p>
                  <p class="text-xs text-amber-700 mt-1">For long-term parking please contact your property manager.</p>
                </div>
              </div>
            </div>

            <!-- Use the new form component -->
            <ParkingPermitForm />

            <!-- Disclaimer -->
            <div class="mt-6 pt-4 border-t border-gray-600">
              <button class="text-amber-200 hover:text-amber-100 text-sm font-medium underline">
                Disclaimer
              </button>
            </div>
          </div>
        </div>

        <!-- Additional Info Card -->
        <div class="mt-6 bg-gray-800 rounded-2xl shadow-lg border border-gray-700 p-6">
          <div class="text-center">
            <h3 class="text-lg font-semibold text-white mb-2">Security Service & Parking Enforcement</h3>
            <p class="text-gray-300 text-sm mb-4">Professional Security Service throughout the GTA</p>
            
            <div class="bg-gray-700 rounded-lg p-4 mb-4">
              <p class="text-xs text-gray-300 mb-2">
                This permit is valid only for the license plate as issued by you. We are not responsible for any errors you have submitted, please be accurate with your license plate and address.
              </p>
            </div>

            <!-- Emergency Contact -->
            <div class="bg-blue-900/50 rounded-lg p-4 mb-4">
              <p class="text-blue-200 text-xs font-medium mb-1">24/7 AUTOMATED PERMIT SYSTEM</p>
              <p class="text-blue-100 text-sm font-bold">416-410-4850</p>
              <p class="text-blue-200 text-xs">THE SERVICE IS AVAILABLE 24/7 AND IS FREE TO USE</p>
            </div>

            <!-- Ticket Warning -->
            <div class="bg-red-900/50 rounded-lg p-3">
              <button class="text-red-200 text-xs font-medium hover:text-red-100">
                Received a parking ticket or warning? Click here
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Success State -->
      <div class="bg-gray-800 rounded-2xl shadow-2xl border border-gray-700 overflow-hidden" style="display: none;">
        <div class="bg-gradient-to-r from-green-900/50 to-emerald-900/50 px-6 py-8 text-center">
          <div class="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg class="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 class="text-xl font-bold text-white mb-2">Permit Request Submitted!</h2>
          <p class="text-gray-300 mb-6">Your parking permit request has been processed successfully.</p>
          
          <!-- Success Details -->
          <div class="bg-gray-700 rounded-xl p-4 text-left mb-6">
            <div class="space-y-2">
              <div class="flex justify-between">
                <span class="text-sm text-gray-400">Permit ID:</span>
                <span class="text-sm font-medium text-white">#SP-{{ Date.now().toString().slice(-6) }}</span>
              </div>
              <div class="flex justify-between">
                <span class="text-sm text-gray-400">Valid For:</span>
                <span class="text-sm font-medium text-amber-200">24 Hours</span>
              </div>
              <div class="flex justify-between">
                <span class="text-sm text-gray-400">Status:</span>
                <span class="text-sm font-medium text-green-400">Active</span>
              </div>
              <div class="flex justify-between">
                <span class="text-sm text-gray-400">Expires:</span>
                <span class="text-sm font-medium text-white">{{ new Date(Date.now() + 24*60*60*1000).toLocaleDateString() }}</span>
              </div>
            </div>
          </div>

          <div class="space-y-3">
            <button 
              @click="showPermitSuccess = false"
              class="w-full bg-amber-100 hover:bg-amber-200 text-gray-900 py-3 rounded-lg font-semibold transition-colors"
            >
              Request Another Permit
            </button>
            <button class="w-full bg-gray-700 hover:bg-gray-600 text-white py-3 rounded-lg font-medium transition-colors">
              Download Permit
            </button>
          </div>
        </div>
      </div>
    </main>

    <!-- Bottom Navigation -->
    <div class="fixed bottom-0 left-0 right-0 bg-gray-800 border-t border-gray-700 px-4 py-2">
      <div class="max-w-md mx-auto">
        <div class="flex justify-around">
          <button class="flex flex-col items-center py-2 px-3 text-amber-200">
            <svg class="w-5 h-5 mb-1" fill="currentColor" viewBox="0 0 24 24">
              <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/>
            </svg>
            <span class="text-xs">Home</span>
          </button>
          <button class="flex flex-col items-center py-2 px-3 text-gray-400">
            <svg class="w-5 h-5 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
            <span class="text-xs">Permits</span>
          </button>
          <button class="flex flex-col items-center py-2 px-3 text-gray-400">
            <svg class="w-5 h-5 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
            <span class="text-xs">Contact</span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
useHead({
  title: 'Request Parking Permit | Security Parking Enforcement',
  meta: [
    { name: 'description', content: 'Professional security service parking permit request system' }
  ]
})
</script>