<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center px-4">
    <div class="max-w-md w-full">
      <div class="card">
        <!-- Header -->
        <div class="text-center mb-8">
          <h1 class="text-3xl font-bold text-gray-900 mb-2">Sign In</h1>
          <p class="text-gray-600">Access your tenant portal</p>
        </div>

        <!-- Error Message -->
        <div v-if="error" class="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
          <p class="text-red-800 text-sm">{{ error }}</p>
        </div>

        <!-- Login Form -->
        <form @submit.prevent="handleLogin" class="space-y-6">
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
              autocomplete="current-password"
            />
            <p v-if="errors.password" class="text-red-600 text-sm mt-1">{{ errors.password }}</p>
          </div>

          <!-- Submit Button -->
          <button
            type="submit"
            :disabled="isLoading"
            class="btn-primary w-full"
          >
            <span v-if="isLoading">Signing In...</span>
            <span v-else>Sign In</span>
          </button>
        </form>

        <!-- Links -->
        <div class="mt-6 text-center space-y-2">
          <p class="text-sm text-gray-600">
            Don't have an account?
            <NuxtLink to="/register" class="text-blue-600 hover:text-blue-800 font-medium">
              Create one
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
import { loginSchema } from '~/utils/validation';

// Meta
useHead({
  title: 'Sign In - Parking Enforcement Portal'
});

// Composables
const { login, isLoading, error } = useAuth();

// Form data
const form = reactive({
  email: '',
  password: ''
});

// Form errors
const errors = reactive({
  email: '',
  password: ''
});

// Clear form errors
const clearErrors = () => {
  errors.email = '';
  errors.password = '';
};

// Handle login
const handleLogin = async () => {
  clearErrors();

  // Validate form
  const validation = loginSchema.safeParse(form);
  if (!validation.success) {
    validation.error.errors.forEach(error => {
      const field = error.path[0] as keyof typeof errors;
      if (field in errors) {
        errors[field] = error.message;
      }
    });
    return;
  }

  // Attempt login
  await login(form);
};
</script>