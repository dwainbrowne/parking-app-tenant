<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
    <div class="container mx-auto px-4 py-8">
      <!-- Header -->
      <div class="text-center mb-12">
        <h1 class="text-4xl font-bold text-gray-900 mb-4">
          Parking Enforcement Portal
        </h1>
        <p class="text-xl text-gray-600 max-w-2xl mx-auto">
          Submit parking requests, appeals, or access your tenant portal
        </p>
      </div>

      <!-- Navigation Cards -->
      <div class="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto mb-12">
        <!-- Self-Serve Form -->
        <div class="card hover:shadow-lg transition-shadow duration-200">
          <div class="text-center mb-6">
            <div class="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg class="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <h2 class="text-2xl font-semibold text-gray-900 mb-2">Quick Request</h2>
            <p class="text-gray-600">Submit a parking request or appeal without an account</p>
          </div>
          <button @click="showSelfServeForm = true" class="btn-primary w-full">
            Start Request
          </button>
        </div>

        <!-- Tenant Portal -->
        <div class="card hover:shadow-lg transition-shadow duration-200">
          <div class="text-center mb-6">
            <div class="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg class="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-4m-5 0H9m0 0H5m4 0V9a1 1 0 011-1h4a1 1 0 011 1v12m-6 0h6" />
              </svg>
            </div>
            <h2 class="text-2xl font-semibold text-gray-900 mb-2">Tenant Portal</h2>
            <p class="text-gray-600">Manage vehicles, guest parking, and view history</p>
          </div>
          <div class="space-y-3">
            <NuxtLink to="/login" class="btn-primary w-full block text-center">
              Sign In
            </NuxtLink>
            <NuxtLink to="/register" class="btn-secondary w-full block text-center">
              Create Account
            </NuxtLink>
          </div>
        </div>
      </div>

      <!-- Self-Serve Form Modal -->
      <div v-if="showSelfServeForm" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
        <div class="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
          <div class="p-6">
            <!-- Form Header -->
            <div class="flex justify-between items-center mb-6">
              <h2 class="text-2xl font-semibold text-gray-900">Parking Request Form</h2>
              <button @click="showSelfServeForm = false" class="text-gray-400 hover:text-gray-600">
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <!-- Success Message -->
            <div v-if="submitSuccess" class="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
              <div class="flex items-center">
                <svg class="w-5 h-5 text-green-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                </svg>
                <p class="text-green-800 font-medium">Thank you! Your request has been submitted successfully.</p>
              </div>
            </div>

            <!-- Form -->
            <form @submit.prevent="submitForm" class="space-y-6">
              <!-- Name -->
              <div>
                <label class="form-label">Name *</label>
                <input
                  v-model="form.name"
                  type="text"
                  class="form-input"
                  :class="{ 'border-red-500': errors.name }"
                  required
                />
                <p v-if="errors.name" class="text-red-600 text-sm mt-1">{{ errors.name }}</p>
              </div>

              <!-- Email -->
              <div>
                <label class="form-label">Email *</label>
                <input
                  v-model="form.email"
                  type="email"
                  class="form-input"
                  :class="{ 'border-red-500': errors.email }"
                  required
                />
                <p v-if="errors.email" class="text-red-600 text-sm mt-1">{{ errors.email }}</p>
              </div>

              <!-- License Plate -->
              <div>
                <label class="form-label">License Plate *</label>
                <input
                  v-model="form.licensePlate"
                  type="text"
                  class="form-input"
                  :class="{ 'border-red-500': errors.licensePlate }"
                  placeholder="ABC123"
                  required
                />
                <p v-if="errors.licensePlate" class="text-red-600 text-sm mt-1">{{ errors.licensePlate }}</p>
              </div>

              <!-- Request Type -->
              <div>
                <label class="form-label">Request Type *</label>
                <select
                  v-model="form.type"
                  class="form-input"
                  :class="{ 'border-red-500': errors.type }"
                  required
                >
                  <option value="">Select type</option>
                  <option value="request">New Request</option>
                  <option value="appeal">Appeal</option>
                </select>
                <p v-if="errors.type" class="text-red-600 text-sm mt-1">{{ errors.type }}</p>
              </div>

              <!-- Ticket ID (for appeals) -->
              <div v-if="form.type === 'appeal'">
                <label class="form-label">Ticket ID *</label>
                <input
                  v-model="form.ticketId"
                  type="text"
                  class="form-input"
                  :class="{ 'border-red-500': errors.ticketId }"
                  placeholder="TKT-12345"
                  required
                />
                <p v-if="errors.ticketId" class="text-red-600 text-sm mt-1">{{ errors.ticketId }}</p>
              </div>

              <!-- Details -->
              <div>
                <label class="form-label">Details *</label>
                <textarea
                  v-model="form.details"
                  class="form-input"
                  :class="{ 'border-red-500': errors.details }"
                  rows="4"
                  placeholder="Please provide details about your request..."
                  required
                ></textarea>
                <p v-if="errors.details" class="text-red-600 text-sm mt-1">{{ errors.details }}</p>
              </div>

              <!-- Submit Button -->
              <div class="flex flex-col sm:flex-row gap-4">
                <button
                  type="submit"
                  :disabled="isSubmitting"
                  class="btn-primary flex-1"
                >
                  <span v-if="isSubmitting">Submitting...</span>
                  <span v-else>Submit Request</span>
                </button>
                <button
                  type="button"
                  @click="showSelfServeForm = false"
                  class="btn-secondary flex-1"
                >
                  Cancel
                </button>
              </div>
            </form>

            <!-- Clear Saved Info -->
            <div v-if="hasCachedUser" class="mt-6 pt-6 border-t border-gray-200">
              <button
                @click="clearSavedInfo"
                class="text-sm text-gray-600 hover:text-gray-800 underline"
              >
                Clear Saved Info
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { submissionSchema } from '~/utils/validation';
import type { Submission } from '~/types';

// Meta
useHead({
  title: 'Parking Enforcement Portal',
  meta: [
    { name: 'description', content: 'Submit parking requests and appeals, or access your tenant portal' }
  ]
});

// Reactive state
const showSelfServeForm = ref(false);
const isSubmitting = ref(false);
const submitSuccess = ref(false);
const hasCachedUser = ref(false);

// Form data
const form = reactive({
  name: '',
  email: '',
  licensePlate: '',
  type: '' as 'request' | 'appeal' | '',
  ticketId: '',
  details: ''
});

// Form errors
const errors = reactive({
  name: '',
  email: '',
  licensePlate: '',
  type: '',
  ticketId: '',
  details: ''
});

// Composables
const { get: getCachedUser, set: setCachedUser, clear: clearCachedUser } = useCachedUser();

// Load cached user data on mount
onMounted(() => {
  const cached = getCachedUser();
  if (cached) {
    form.name = cached.name;
    form.email = cached.email;
    hasCachedUser.value = true;
  }
});

// Clear form errors
const clearErrors = () => {
  Object.keys(errors).forEach(key => {
    errors[key as keyof typeof errors] = '';
  });
};

// Clear saved info
const clearSavedInfo = () => {
  clearCachedUser();
  form.name = '';
  form.email = '';
  hasCachedUser.value = false;
};

// Submit form
const submitForm = async () => {
  clearErrors();
  isSubmitting.value = true;
  submitSuccess.value = false;

  try {
    // Prepare submission data
    const submissionData: Omit<Submission, 'timestamp'> = {
      name: form.name.trim(),
      email: form.email.trim(),
      licensePlate: form.licensePlate.trim().toUpperCase(),
      type: form.type as 'request' | 'appeal',
      details: form.details.trim(),
      ...(form.type === 'appeal' && { ticketId: form.ticketId.trim() })
    };

    // Validate
    const validation = submissionSchema.safeParse(submissionData);
    if (!validation.success) {
      validation.error.errors.forEach(error => {
        const field = error.path[0] as keyof typeof errors;
        if (field in errors) {
          errors[field] = error.message;
        }
      });
      return;
    }

    // Submit to API
    await $fetch('/api/submit', {
      method: 'POST',
      body: {
        ...submissionData,
        timestamp: new Date().toISOString()
      }
    });

    // Cache user info (name and email only)
    setCachedUser({
      name: form.name.trim(),
      email: form.email.trim()
    });
    hasCachedUser.value = true;

    // Show success and reset form (except cached fields)
    submitSuccess.value = true;
    form.licensePlate = '';
    form.type = '';
    form.ticketId = '';
    form.details = '';

    // Auto-hide success message after 5 seconds
    setTimeout(() => {
      submitSuccess.value = false;
    }, 5000);

  } catch (error: any) {
    console.error('Submission error:', error);
    errors.details = error.data?.message || 'Failed to submit request. Please try again.';
  } finally {
    isSubmitting.value = false;
  }
};
</script>