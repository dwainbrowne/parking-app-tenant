<template>
  <div class="space-y-4">
    <!-- Success Message -->
    <div v-if="formShowSuccess" class="bg-green-50 border border-green-200 rounded-xl p-4 mb-6">
      <div class="flex items-start space-x-3">
        <svg class="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
        </svg>
        <div>
          <p class="text-sm text-green-800 font-medium">Permit request submitted successfully!</p>
          <p class="text-xs text-green-700 mt-1">Your permit will be processed within 24 hours.</p>
        </div>
      </div>
    </div>

    <!-- Error Message -->
    <div v-if="formShowError" class="bg-red-50 border border-red-200 rounded-xl p-4 mb-6">
      <div class="flex items-start space-x-3">
        <svg class="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
        </svg>
        <div>
          <p class="text-sm text-red-800 font-medium">
            {{ (submitResult && submitResult.error) || 'Please fix the errors below and try again.' }}
          </p>
        </div>
      </div>
    </div>

    <form @submit.prevent="handleSubmit">
      <!-- Name Fields -->
      <div class="grid grid-cols-2 gap-3 mb-4">
        <div>
          <label class="block text-sm font-medium text-gray-300 mb-2">First Name</label>
          <input 
            v-model="formData.first_name"
            @blur="validateSingleField('first_name', formData.first_name)"
            type="text" 
            class="w-full px-4 py-3 bg-white border rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent text-gray-900"
            :class="errors.first_name ? 'border-red-500' : 'border-gray-300'"
            placeholder="First Name"
          />
          <p v-if="errors.first_name" class="text-red-500 text-xs mt-1">{{ errors.first_name }}</p>
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-300 mb-2">Last Name</label>
          <input 
            v-model="formData.last_name"
            @blur="validateSingleField('last_name', formData.last_name)"
            type="text" 
            class="w-full px-4 py-3 bg-white border rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent text-gray-900"
            :class="errors.last_name ? 'border-red-500' : 'border-gray-300'"
            placeholder="Last Name"
          />
          <p v-if="errors.last_name" class="text-red-500 text-xs mt-1">{{ errors.last_name }}</p>
        </div>
      </div>

      <!-- Contact Info -->
      <div class="grid grid-cols-2 gap-3 mb-4">
        <div>
          <label class="block text-sm font-medium text-gray-300 mb-2">Phone Number</label>
          <input 
            v-model="formData.phone"
            @blur="validateSingleField('phone', formData.phone)"
            type="tel" 
            class="w-full px-4 py-3 bg-white border rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent text-gray-900"
            :class="errors.phone ? 'border-red-500' : 'border-gray-300'"
            placeholder="Phone Number"
          />
          <p v-if="errors.phone" class="text-red-500 text-xs mt-1">{{ errors.phone }}</p>
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-300 mb-2">Email Address</label>
          <input 
            v-model="formData.email"
            @blur="validateSingleField('email', formData.email)"
            type="email" 
            class="w-full px-4 py-3 bg-white border rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent text-gray-900"
            :class="errors.email ? 'border-red-500' : 'border-gray-300'"
            placeholder="E-mail Address"
          />
          <p v-if="errors.email" class="text-red-500 text-xs mt-1">{{ errors.email }}</p>
        </div>
      </div>

      <!-- Address Fields -->
      <div class="grid grid-cols-2 gap-3 mb-4">
        <div>
          <label class="block text-sm font-medium text-gray-300 mb-2">Unit Number</label>
          <input 
            v-model="formData.unit_number"
            type="text" 
            class="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent text-gray-900"
            placeholder="Unit Number"
          />
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-300 mb-2">Building Code</label>
          <input 
            v-model="formData.building_code"
            type="text" 
            class="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent text-gray-900"
            placeholder="Building Code"
          />
        </div>
      </div>

      <!-- Full Address -->
      <div class="mb-4">
        <label class="block text-sm font-medium text-gray-300 mb-2">Full Address</label>
        <input 
          v-model="formData.full_address"
          @blur="validateSingleField('full_address', formData.full_address)"
          type="text" 
          class="w-full px-4 py-3 bg-white border rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent text-gray-900"
          :class="errors.full_address ? 'border-red-500' : 'border-gray-300'"
          placeholder="Please include unit number"
        />
        <p v-if="errors.full_address" class="text-red-500 text-xs mt-1">{{ errors.full_address }}</p>
      </div>

      <!-- Vehicle Info -->
      <div class="mb-4">
        <label class="block text-sm font-medium text-gray-300 mb-2">License Plate #</label>
        <input 
          v-model="formData.license_plate"
          @blur="validateSingleField('license_plate', formData.license_plate)"
          type="text" 
          class="w-full px-4 py-3 bg-white border rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent text-gray-900"
          :class="errors.license_plate ? 'border-red-500' : 'border-gray-300'"
          placeholder="License Plate #"
        />
        <p v-if="errors.license_plate" class="text-red-500 text-xs mt-1">{{ errors.license_plate }}</p>
      </div>

      <!-- Vehicle Details -->
      <div class="grid grid-cols-2 gap-3 mb-4">
        <div>
          <label class="block text-sm font-medium text-gray-300 mb-2">Make</label>
          <input 
            v-model="formData.make"
            @blur="validateSingleField('make', formData.make)"
            type="text" 
            class="w-full px-4 py-3 bg-white border rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent text-gray-900"
            :class="errors.make ? 'border-red-500' : 'border-gray-300'"
            placeholder="Honda"
          />
          <p v-if="errors.make" class="text-red-500 text-xs mt-1">{{ errors.make }}</p>
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-300 mb-2">Model</label>
          <input 
            v-model="formData.model"
            @blur="validateSingleField('model', formData.model)"
            type="text" 
            class="w-full px-4 py-3 bg-white border rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent text-gray-900"
            :class="errors.model ? 'border-red-500' : 'border-gray-300'"
            placeholder="Civic"
          />
          <p v-if="errors.model" class="text-red-500 text-xs mt-1">{{ errors.model }}</p>
        </div>
      </div>

      <div class="grid grid-cols-2 gap-3 mb-4">
        <div>
          <label class="block text-sm font-medium text-gray-300 mb-2">Year</label>
          <input 
            v-model.number="formData.year"
            @blur="validateSingleField('year', formData.year)"
            type="number" 
            class="w-full px-4 py-3 bg-white border rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent text-gray-900"
            :class="errors.year ? 'border-red-500' : 'border-gray-300'"
            placeholder="2019"
          />
          <p v-if="errors.year" class="text-red-500 text-xs mt-1">{{ errors.year }}</p>
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-300 mb-2">Color</label>
          <input 
            v-model="formData.color"
            @blur="validateSingleField('color', formData.color)"
            type="text" 
            class="w-full px-4 py-3 bg-white border rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent text-gray-900"
            :class="errors.color ? 'border-red-500' : 'border-gray-300'"
            placeholder="Red"
          />
          <p v-if="errors.color" class="text-red-500 text-xs mt-1">{{ errors.color }}</p>
        </div>
      </div>

      <!-- Location Info -->
      <div class="grid grid-cols-2 gap-3 mb-4">
        <div>
          <label class="block text-sm font-medium text-gray-300 mb-2">State/Province</label>
          <input 
            v-model="formData.state_province"
            @blur="validateSingleField('state_province', formData.state_province)"
            type="text" 
            class="w-full px-4 py-3 bg-white border rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent text-gray-900"
            :class="errors.state_province ? 'border-red-500' : 'border-gray-300'"
            placeholder="CA"
          />
          <p v-if="errors.state_province" class="text-red-500 text-xs mt-1">{{ errors.state_province }}</p>
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-300 mb-2">Country</label>
          <select 
            v-model="formData.country"
            class="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent text-gray-900"
          >
            <option value="US">United States</option>
            <option value="CA">Canada</option>
          </select>
        </div>
      </div>

      <!-- Permit Dates -->
      <div class="grid grid-cols-2 gap-3 mb-4">
        <div>
          <label class="block text-sm font-medium text-gray-300 mb-2">Start Date</label>
          <input 
            v-model="formData.requested_start_date"
            @blur="validateSingleField('requested_start_date', formData.requested_start_date)"
            type="date" 
            class="w-full px-4 py-3 bg-white border rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent text-gray-900"
            :class="errors.requested_start_date ? 'border-red-500' : 'border-gray-300'"
          />
          <p v-if="errors.requested_start_date" class="text-red-500 text-xs mt-1">{{ errors.requested_start_date }}</p>
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-300 mb-2">End Date</label>
          <input 
            v-model="formData.requested_end_date"
            @blur="validateSingleField('requested_end_date', formData.requested_end_date)"
            type="date" 
            class="w-full px-4 py-3 bg-white border rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent text-gray-900"
            :class="errors.requested_end_date ? 'border-red-500' : 'border-gray-300'"
          />
          <p v-if="errors.requested_end_date" class="text-red-500 text-xs mt-1">{{ errors.requested_end_date }}</p>
        </div>
      </div>

      <!-- Notes -->
      <div class="mb-4">
        <label class="block text-sm font-medium text-gray-300 mb-2">Notes (Optional)</label>
        <textarea 
          v-model="formData.notes"
          class="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent text-gray-900"
          rows="3"
          placeholder="Any additional notes..."
        ></textarea>
      </div>

      <!-- Submit Button -->
      <button 
        type="submit"
        :disabled="isSubmitting"
        class="w-full bg-amber-100 hover:bg-amber-200 text-gray-900 py-4 rounded-lg font-semibold transition-all duration-200 shadow-lg hover:shadow-xl border border-amber-200 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <span v-if="isSubmitting" class="flex items-center justify-center">
          <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-gray-900" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          Submitting...
        </span>
        <span v-else>Submit Permit Request</span>
      </button>
    </form>
  </div>
</template>

<script setup lang="ts">
const formData = ref({
  first_name: '',
  last_name: '',
  email: '',
  phone: '',
  unit_number: '',
  building_code: '',
  full_address: '',
  license_plate: '',
  make: '',
  model: '',
  year: new Date().getFullYear(),
  color: '',
  state_province: '',
  country: 'US',
  permit_type_id: 'temporary',
  requested_start_date: '',
  requested_end_date: '',
  notes: '',
  priority: 2
})

const errors = ref<Record<string, string>>({})
const isSubmitting = ref(false)
const formShowSuccess = ref(false)
const formShowError = ref(false)
const submitResult = ref<any>(null)

// Initialize dates
const today = new Date()
const tomorrow = new Date(today)
tomorrow.setDate(today.getDate() + 1)

const formatDate = (date: Date): string => {
  return date.toISOString().split('T')[0]
}

formData.value.requested_start_date = formatDate(today)
formData.value.requested_end_date = formatDate(tomorrow)

const validateSingleField = (fieldName: string, value: any) => {
  // Basic validation
  if (!value || (typeof value === 'string' && !value.trim())) {
    errors.value[fieldName] = `${fieldName.replace('_', ' ')} is required`
  } else {
    delete errors.value[fieldName]
  }
}

const handleSubmit = async () => {
  isSubmitting.value = true
  formShowSuccess.value = false
  formShowError.value = false
  submitResult.value = null

  try {
    const response = await fetch('https://parking-app-api.snapsuite.workers.dev/api/submit-permit-request', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData.value),
    })

    if (response.ok) {
      formShowSuccess.value = true
      formShowError.value = false
      // Reset form
      Object.keys(formData.value).forEach(key => {
        if (key === 'year') {
          formData.value[key] = new Date().getFullYear()
        } else if (key === 'country') {
          formData.value[key] = 'US'
        } else if (key === 'permit_type_id') {
          formData.value[key] = 'temporary'
        } else if (key === 'priority') {
          formData.value[key] = 2
        } else if (key === 'requested_start_date') {
          formData.value[key] = formatDate(today)
        } else if (key === 'requested_end_date') {
          formData.value[key] = formatDate(tomorrow)
        } else {
          formData.value[key] = ''
        }
      })
      errors.value = {}
    } else {
      const errorData = await response.json()
      formShowError.value = true
      formShowSuccess.value = false
      submitResult.value = { error: errorData.error || 'Failed to submit permit request' }
    }
  } catch (error) {
    formShowError.value = true
    formShowSuccess.value = false
    submitResult.value = { error: 'Network error occurred' }
  } finally {
    isSubmitting.value = false
  }
}
</script>
