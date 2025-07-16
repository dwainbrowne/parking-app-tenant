<template>
  <form @submit.prevent="submitForm" class="space-y-6">
    <div>
      <label for="complaintName" class="form-label">Name (Optional)</label>
      <input
        id="complaintName"
        v-model="form.name"
        type="text"
        class="form-input"
        placeholder="Your name"
      />
    </div>

    <div>
      <label for="complaintEmail" class="form-label">Email Address (Optional)</label>
      <input
        id="complaintEmail"
        v-model="form.email"
        type="email"
        class="form-input"
        :class="{ 'border-error-500 focus:ring-error-500 focus:border-error-500': errors.email }"
        placeholder="your@email.com"
      />
      <p v-if="errors.email" class="error-message">{{ errors.email }}</p>
    </div>

    <div>
      <label for="complaintPhone" class="form-label">Phone Number (Optional)</label>
      <input
        id="complaintPhone"
        v-model="form.phone"
        type="tel"
        class="form-input"
        :class="{ 'border-error-500 focus:ring-error-500 focus:border-error-500': errors.phone }"
        placeholder="(555) 123-4567"
      />
      <p v-if="errors.phone" class="error-message">{{ errors.phone }}</p>
    </div>

    <div>
      <label for="message" class="form-label">Complaint Details *</label>
      <textarea
        id="message"
        v-model="form.message"
        rows="6"
        class="form-input resize-none"
        :class="{ 'border-error-500 focus:ring-error-500 focus:border-error-500': errors.message }"
        placeholder="Please describe your complaint in detail..."
        required
      ></textarea>
      <p v-if="errors.message" class="error-message">{{ errors.message }}</p>
      <p class="text-sm text-gray-500 mt-1">
        {{ form.message.length }}/500 characters
      </p>
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
      {{ isSubmitting ? 'Submitting...' : 'Submit Complaint' }}
    </button>
  </form>
</template>

<script setup lang="ts">
import type { Complaint } from '~/types'

const emit = defineEmits<{
  success: [data: any]
}>()

const form = reactive({
  name: '',
  email: '',
  phone: '',
  message: ''
})

const errors = reactive<Record<string, string>>({})
const isSubmitting = ref(false)

const validateForm = () => {
  // Clear previous errors
  Object.keys(errors).forEach(key => delete errors[key])
  
  if (!form.message.trim()) {
    errors.message = 'Complaint details are required'
  } else if (form.message.trim().length < 10) {
    errors.message = 'Please provide at least 10 characters'
  } else if (form.message.length > 500) {
    errors.message = 'Message cannot exceed 500 characters'
  }
  
  // Validate email if provided
  if (form.email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
    errors.email = 'Please enter a valid email address'
  }
  
  // Validate phone if provided
  if (form.phone.trim() && !/^[\d\s\-\(\)\+]+$/.test(form.phone)) {
    errors.phone = 'Please enter a valid phone number'
  }
  
  return Object.keys(errors).length === 0
}

const submitForm = async () => {
  if (!validateForm()) return
  
  isSubmitting.value = true
  
  try {
    const { data } = await $fetch('/api/complaint', {
      method: 'POST',
      body: form
    })
    
    emit('success', data)
    
    // Reset form
    Object.keys(form).forEach(key => form[key] = '')
    
  } catch (error: any) {
    console.error('Error submitting complaint:', error)
    // You could show a toast notification or error message here
  } finally {
    isSubmitting.value = false
  }
}

// Watch message length for real-time character count
watch(() => form.message, (newValue) => {
  if (newValue.length > 500) {
    form.message = newValue.substring(0, 500)
  }
})
</script>