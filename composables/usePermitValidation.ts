import type { PermitRequest, FormValidation } from '~/types'

export const usePermitValidation = () => {
  const validatePermitForm = (formData: Partial<PermitRequest>): FormValidation => {
    const errors: Record<string, string> = {}

    // Required field validation
    if (!formData.first_name?.trim()) {
      errors.first_name = 'First name is required'
    }

    if (!formData.last_name?.trim()) {
      errors.last_name = 'Last name is required'
    }

    if (!formData.email?.trim()) {
      errors.email = 'Email is required'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = 'Please enter a valid email address'
    }

    if (!formData.phone?.trim()) {
      errors.phone = 'Phone number is required'
    } else if (!/^\+?[\d\s\-\(\)]+$/.test(formData.phone)) {
      errors.phone = 'Please enter a valid phone number'
    }

    if (!formData.full_address?.trim()) {
      errors.full_address = 'Full address is required'
    }

    if (!formData.license_plate?.trim()) {
      errors.license_plate = 'License plate is required'
    }

    if (!formData.make?.trim()) {
      errors.make = 'Vehicle make is required'
    }

    if (!formData.model?.trim()) {
      errors.model = 'Vehicle model is required'
    }

    if (!formData.year || formData.year < 1900 || formData.year > new Date().getFullYear() + 1) {
      errors.year = 'Please enter a valid year'
    }

    if (!formData.color?.trim()) {
      errors.color = 'Vehicle color is required'
    }

    if (!formData.state_province?.trim()) {
      errors.state_province = 'State/Province is required'
    }

    if (!formData.country?.trim()) {
      errors.country = 'Country is required'
    }

    if (!formData.permit_type_id?.trim()) {
      errors.permit_type_id = 'Permit type is required'
    }

    if (!formData.requested_start_date?.trim()) {
      errors.requested_start_date = 'Start date is required'
    }

    if (!formData.requested_end_date?.trim()) {
      errors.requested_end_date = 'End date is required'
    }

    // Date validation
    if (formData.requested_start_date && formData.requested_end_date) {
      const startDate = new Date(formData.requested_start_date)
      const endDate = new Date(formData.requested_end_date)
      
      if (startDate >= endDate) {
        errors.requested_end_date = 'End date must be after start date'
      }
    }

    return {
      isValid: Object.keys(errors).length === 0,
      errors
    }
  }

  const validateField = (fieldName: keyof PermitRequest, value: any): string | null => {
    const tempData = { [fieldName]: value } as Partial<PermitRequest>
    const validation = validatePermitForm(tempData)
    return validation.errors[fieldName] || null
  }

  return {
    validatePermitForm,
    validateField
  }
}
