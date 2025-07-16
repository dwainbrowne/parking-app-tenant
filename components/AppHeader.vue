<template>
  <header class="bg-white shadow-sm border-b border-gray-200">
    <div class="max-w-md mx-auto px-4 py-4">
      <div class="flex items-center justify-between">
        <div class="flex items-center space-x-3">
          <div class="w-8 h-8 bg-primary-500 rounded-lg flex items-center justify-center">
            <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2v0a2 2 0 01-2-2v-2a2 2 0 00-2-2H8z" />
            </svg>
          </div>
          <h1 class="text-xl font-bold text-gray-900">Parking Pass</h1>
        </div>
        
        <nav class="flex space-x-4">
          <NuxtLink 
            to="/" 
            class="text-sm font-medium transition-colors duration-200"
            :class="$route.path === '/' ? 'text-primary-600' : 'text-gray-600 hover:text-primary-600'"
          >
            Request
          </NuxtLink>
          <NuxtLink 
            to="/complaint" 
            class="text-sm font-medium transition-colors duration-200"
            :class="$route.path === '/complaint' ? 'text-primary-600' : 'text-gray-600 hover:text-primary-600'"
          >
            Complaint
          </NuxtLink>
        </nav>
      </div>
    </div>
  </header>
</template>