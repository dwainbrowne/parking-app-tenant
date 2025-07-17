import type { PermitRequest } from '~/types'

export const usePermitForm = () => {
  const { submitPermit, isSubmitting, submitResult, clearResult } = usePermitSubmission()
  const { validatePermitForm, validateField } = usePermitValidation()

  // Form state
  const formData = ref<Partial<PermitRequest>>({
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
  const showSuccess = ref(false)
  const showError = ref(false)

  // Helper to format date for input
  const formatDate = (date: Date): string => {
    return date.toISOString().split('T')[0]
  }

  // Initialize dates
  const today = new Date()
  const tomorrow = new Date(today)
  tomorrow.setDate(today.getDate() + 1)

  formData.value.requested_start_date = formatDate(today)
  formData.value.requested_end_date = formatDate(tomorrow)

  // Validate single field
  const validateSingleField = (fieldName: keyof PermitRequest, value: any) => {
    const error = validateField(fieldName, value)
    if (error) {
      errors.value[fieldName] = error
    } else {
      delete errors.value[fieldName]
    }
  }

  // Submit form
  const handleSubmit = async () => {
    // Clear previous results
    clearResult()
    showSuccess.value = false
    showError.value = false

    // Validate form
    const validation = validatePermitForm(formData.value)
    errors.value = validation.errors

    if (!validation.isValid) {
      showError.value = true
      return
    }

    // Submit permit
    const result = await submitPermit(formData.value as PermitRequest)
    
    if (result.success) {
      showSuccess.value = true
      showError.value = false
      // Reset form on success
      resetForm()
    } else {
      showError.value = true
      showSuccess.value = false
    }
  }

  // Reset form
  const resetForm = () => {
    formData.value = {
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
      requested_start_date: formatDate(today),
      requested_end_date: formatDate(tomorrow),
      notes: '',
      priority: 2
    }
    errors.value = {}
  }

  // Clear success/error states
  const clearStates = () => {
    showSuccess.value = false
    showError.value = false
    clearResult()
  }

  return {
    formData,
    errors: readonly(errors),
    isSubmitting,
    submitResult,
    showSuccess: readonly(showSuccess),
    showError: readonly(showError),
    handleSubmit,
    resetForm,
    clearStates,
    validateSingleField
  }
}
