export interface ParkingPassRequest {
  name: string
  email: string
  phone: string
  address: string
  licensePlate: string
  createdAt: Date
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