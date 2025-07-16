<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center px-4">
    <div class="max-w-md w-full">
      <div class="card">
        <!-- Header -->
        <div class="text-center mb-8">
          <h1 class="text-3xl font-bold text-gray-900 mb-2">Create Account</h1>
          <p class="text-gray-600">Join the tenant portal</p>
        </div>

        <!-- Error Message -->
        <div v-if="error" class="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
          <p class="text-red-800 text-sm">{{ error }}</p>
        </div>

        <!-- Registration Form -->
        <form @submit.prevent="handleRegister" class="space-y-6">
          <!-- Name -->
          <div>
            <label class="form-label">Full Name</label>
            <input
              v-model="form.name"
              type="text"
              class="form-input"
              :class="{ 'border-red-500': errors.name }"
              required
              autocomplete="name"
            />
            <p v-if="errors.name" class="text-red-600 text-sm mt-1">{{ errors.name }}</p>
          </div>

          <!-- Email -->
          <div>
            <label class="form-label">Email</label>
            <input
              v-model="form.email"
              type="email"
              class="form-input"
              :class="{ 'border-red-500': errors.email }"
              required
              autocomplete="email"
            />
            <p v-if="errors.email" class="text-red-600 text-sm mt-1">{{ errors.email }}</p>
          </div>

          <!-- Password -->
          <div>
            <label class="form-label">Password</label>
            <input
              v-model="form.password"
              type="password"
              class="form-input"
              :class="{ 'border-red-500': errors.password }"
              required
              autocomplete="new-password"
            />
            <p v-if="errors.password" class="text-red-600 text-sm mt-1">{{ errors.password }}</p>
          </div>

          <!-- Phone -->
          <div>
            <label class="form-label">Phone Number</label>
            <input
              v-model="form.phone"
              type="tel"
              class="form-input"
              :class="{ 'border-red-500': errors.phone }"
              required
              autocomplete="tel"
              placeholder="(555) 123-4567"
            />
            <p v-if="errors.phone" class="text-red-600 text-sm mt-1">{{ errors.phone }}</p>
          </div>

          <!-- Unit Number -->
          <div>
            <label class="form-label">Unit Number</label>
            <input
              v-model="form.unitNumber"
              type="text"
              class="form-input"
              :class="{ 'border-red-500': errors.unitNumber }"
              required
              placeholder="101, A-5, etc."
            />
            <p v-if="errors.unitNumber" class="text-red-600 text-sm mt-1">{{ errors.unitNumber }}</p>
          </div>

          <!-- Role -->
          <div>
            <label class="form-label">I am a</label>
            <select
              v-model="form.role"
              class="form-input"
              :class="{ 'border-red-500': errors.role }"
              required
            >
              <option value="">Select role</option>
              <option value="tenant">Tenant</option>
              <option value="owner">Property Owner</option>
            </select>
            <p v-if="errors.role" class="text-red-600 text-sm mt-1">{{ errors.role }}</p>
          </div>

          <!-- Submit Button -->
          <button
            type="submit"
            :disabled="isLoading"
            class="btn-primary w-full"
          >
            <span v-if="isLoading">Creating Account...</span>
            <span v-else>Create Account</span>
          </button>
        </form>

        <!-- Links -->
        <div class="mt-6 text-center space-y-2">
          <p class="text-sm text-gray-600">
            Already have an account?
            <NuxtLink to="/login" class="text-blue-600 hover:text-blue-800 font-medium">
              Sign in
            </NuxtLink>
          </p>
          <NuxtLink to="/" class="text-sm text-gray-500 hover:text-gray-700 block">
            ← Back to home
          </NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { registerSchema } from '~/utils/validation';
import { formatPhoneNumber } from '~/utils/validation';

// Meta
useHead({
  title: 'Create Account - Parking Enforcement Portal'
});

// Composables
const { register, isLoading, error } = useAuth();

// Form data
const form = reactive({
  name: '',
  email: '',
  password: '',
  phone: '',
  unitNumber: '',
  role: '' as 'tenant' | 'owner' | ''
});

// Form errors
const errors = reactive({
  name: '',
  email: '',
  password: '',
  phone: '',
  unitNumber: '',
  role: ''
});

// Format phone number on input
watch(() => form.phone, (newPhone) => {
  form.phone = formatPhoneNumber(newPhone);
});

// Clear form errors
const clearErrors = () => {
  Object.keys(errors).forEach(key => {
    errors[key as keyof typeof errors] = '';
  });
};

// Handle registration
const handleRegister = async () => {
  clearErrors();

  // Validate form
  const validation = registerSchema.safeParse(form);
  if (!validation.success) {
    validation.error.errors.forEach(error => {
      const field = error.path[0] as keyof typeof errors;
      if (field in errors) {
        errors[field] = error.message;
      }
    });
    return;
  }

  // Attempt registration
  await register(form);
};
</script>