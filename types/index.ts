export interface ParkingPassRequest {
  name: string
  email: string
  phone: string
  address: string
  licensePlate: string
  createdAt: Date
}

export interface PermitRequest {
  first_name: string
  last_name: string
  email: string
  phone: string
  unit_number: string
  building_code: string
  full_address: string
  license_plate: string
  make: string
  model: string
  year: number
  color: string
  state_province: string
  country: string
  permit_type_id: string
  requested_start_date: string
  requested_end_date: string
  notes?: string
  priority: number
}

export interface ApiResponse<T = any> {
  success: boolean
  data?: T
  error?: string
  message?: string
}

export interface Complaint {
  name?: string
  email?: string
  phone?: string
  message: string
  createdAt: Date
}

export interface FormValidation {
  isValid: boolean
  errors: Record<string, string>
}