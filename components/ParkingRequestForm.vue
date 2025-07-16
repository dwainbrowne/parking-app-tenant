<template>
  <form @submit.prevent="submitForm" class="space-y-6">
    <div>
      <label for="name" class="form-label">Full Name *</label>
      <input
        id="name"
        v-model="form.name"
        type="text"
        class="form-input"
        :class="{ 'border-error-500 focus:ring-error-500 focus:border-error-500': errors.name }"
        placeholder="Enter your full name"
        required
      />
      <p v-if="errors.name" class="error-message">{{ errors.name }}</p>
    </div>

    <div>
      <label for="email" class="form-label">Email Address *</label>
      <input
        id="email"
        v-model="form.email"
        type="email"
        class="form-input"
        :class="{ 'border-error-500 focus:ring-error-500 focus:border-error-500': errors.email }"
        placeholder="your@email.com"
        required
      />
      <p v-if="errors.email" class="error-message">{{ errors.email }}</p>
    </div>

    <div>
      <label for="phone" class="form-label">Phone Number *</label>
      <input
        id="phone"
        v-model="form.phone"
        type="tel"
        class="form-input"
        :class="{ 'border-error-500 focus:ring-error-500 focus:border-error-500': errors.phone }"
        placeholder="(555) 123-4567"
        required
      />
      <p v-if="errors.phone" class="error-message">{{ errors.phone }}</p>
    </div>

    <div>
      <label for="address" class="form-label">Visiting Address *</label>
      <input
        id="address"
        v-model="form.address"
        type="text"
        class="form-input"
        :class="{ 'border-error-500 focus:ring-error-500 focus:border-error-500': errors.address }"
        placeholder="123 Main St, Unit 4B"
        required
      />
      <p v-if="errors.address" class="error-message">{{ errors.address }}</p>
    </div>

    <div>
      <label for="licensePlate" class="form-label">License Plate *</label>
      <input
        id="licensePlate"
        v-model="form.licensePlate"
        type="text"
        class="form-input"
        :class="{ 'border-error-500 focus:ring-error-500 focus:border-error-500': errors.licensePlate }"
        placeholder="ABC-1234"
        required
        maxlength="10"
      />
      <p v-if="errors.licensePlate" class="error-message">{{ errors.licensePlate }}</p>
    </div>

    <button
      type="submit"
      :disabled="isSubmitting"
      class="btn-primary w-full flex items-center justify-center"
      :class="{ 'opacity-50 cursor-not-allowed': isSubmitting }"
    >
      <svg 
        v-if="isSubmitting" 
        class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" 
        xmlns="http://www.w3.org/2000/svg" 
        fill="none" 
        viewBox="0 0 24 24"
      >
        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
      </svg>
      {{ isSubmitting ? 'Submitting...' : 'Request Parking Pass' }}
    </button>
  </form>
</template>

<script setup lang="ts">
import type { ParkingPassRequest } from '~/types'

const emit = defineEmits<{
  success: [data: any]
}>()

const form = reactive({
  name: '',
  email: '',
  phone: '',
  address: '',
  licensePlate: ''
})

const errors = reactive<Record<string, string>>({})
const isSubmitting = ref(false)

const validateForm = () => {
  // Clear previous errors
  Object.keys(errors).forEach(key => delete errors[key])
  
  if (!form.name.trim()) {
    errors.name = 'Full name is required'
  }
  
  if (!form.email.trim()) {
    errors.email = 'Email address is required'
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
    errors.email = 'Please enter a valid email address'
  }
  
  if (!form.phone.trim()) {
    errors.phone = 'Phone number is required'
  } else if (!/^[\d\s\-\(\)\+]+$/.test(form.phone)) {
    errors.phone = 'Please enter a valid phone number'
  }
  
  if (!form.address.trim()) {
    errors.address = 'Visiting address is required'
  }
  
  if (!form.licensePlate.trim()) {
    errors.licensePlate = 'License plate is required'
  } else if (form.licensePlate.trim().length < 2) {
    errors.licensePlate = 'License plate must be at least 2 characters'
  }
  
  return Object.keys(errors).length === 0
}

const submitForm = async () => {
  if (!validateForm()) return
  
  isSubmitting.value = true
  
  try {
    const { data } = await $fetch('/api/request-pass', {
      method: 'POST',
      body: form
    })
    
    emit('success', data)
    
    // Reset form
    Object.keys(form).forEach(key => form[key] = '')
    
  } catch (error: any) {
    console.error('Error submitting parking request:', error)
    // You could show a toast notification or error message here
  } finally {
    isSubmitting.value = false
  }
}
</script>