<template>
  <div class="min-h-screen bg-gray-100 py-8">
    <div class="max-w-6xl mx-auto px-4">
      <h1 class="text-4xl font-bold text-gray-900 text-center mb-8">
        Parking Enforcement Portal
      </h1>
      
      <div class="grid md:grid-cols-2 gap-8">
        <!-- Quick Request Card -->
        <div class="bg-white p-6 rounded-lg shadow-md">
          <h2 class="text-2xl font-semibold mb-4">Quick Request</h2>
          <p class="text-gray-600 mb-4">Submit a parking request or appeal without an account</p>
          <button class="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700">
            Start Request
          </button>
        </div>
        
        <!-- Tenant Portal Card -->
        <div class="bg-white p-6 rounded-lg shadow-md">
          <h2 class="text-2xl font-semibold mb-4">Tenant Portal</h2>
          <p class="text-gray-600 mb-4">Manage vehicles, guest parking, and view history</p>
          <div class="space-y-3">
            <NuxtLink to="/login" class="block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 text-center">
              Sign In
            </NuxtLink>
            <NuxtLink to="/register" class="block bg-gray-200 text-gray-800 px-6 py-3 rounded-lg hover:bg-gray-300 text-center">
              Create Account
            </NuxtLink>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
