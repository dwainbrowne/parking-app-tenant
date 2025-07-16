import { z } from 'zod';

export const emailSchema = z.string().email('Please enter a valid email address');

export const submissionSchema = z.object({
  name: z.string().min(1, 'Name is required').max(100, 'Name is too long'),
  email: emailSchema,
  licensePlate: z.string().min(1, 'License plate is required').max(20, 'License plate is too long'),
  type: z.enum(['request', 'appeal']),
  ticketId: z.string().optional(),
  details: z.string().min(1, 'Details are required').max(1000, 'Details are too long'),
}).refine((data) => {
  if (data.type === 'appeal' && !data.ticketId) {
    return false;
  }
  return true;
}, {
  message: 'Ticket ID is required for appeals',
  path: ['ticketId']
});

export const vehicleSchema = z.object({
  licensePlate: z.string().min(1, 'License plate is required').max(20, 'License plate is too long'),
  make: z.string().min(1, 'Make is required').max(50, 'Make is too long'),
  model: z.string().min(1, 'Model is required').max(50, 'Model is too long'),
  color: z.string().min(1, 'Color is required').max(30, 'Color is too long'),
  isPrimary: z.boolean()
});

export const guestReservationSchema = z.object({
  guestName: z.string().min(1, 'Guest name is required').max(100, 'Guest name is too long'),
  guestPhone: z.string().optional(),
  vehicle: z.object({
    licensePlate: z.string().min(1, 'License plate is required').max(20, 'License plate is too long'),
    make: z.string().min(1, 'Make is required').max(50, 'Make is too long'),
    model: z.string().min(1, 'Model is required').max(50, 'Model is too long'),
    color: z.string().min(1, 'Color is required').max(30, 'Color is too long'),
  }),
  reservationStart: z.date(),
  reservationEnd: z.date(),
  notes: z.string().max(500, 'Notes are too long').optional()
}).refine((data) => {
  return data.reservationEnd > data.reservationStart;
}, {
  message: 'End time must be after start time',
  path: ['reservationEnd']
});

export const loginSchema = z.object({
  email: emailSchema,
  password: z.string().min(1, 'Password is required')
});

export const registerSchema = z.object({
  name: z.string().min(1, 'Name is required').max(100, 'Name is too long'),
  email: emailSchema,
  password: z.string().min(6, 'Password must be at least 6 characters'),
  phone: z.string().min(10, 'Phone number must be at least 10 digits'),
  unitNumber: z.string().min(1, 'Unit number is required').max(20, 'Unit number is too long'),
  role: z.enum(['tenant', 'owner'])
});

export function validateEmail(email: string): boolean {
  return emailSchema.safeParse(email).success;
}

export function formatLicensePlate(plate: string): string {
  return plate.toUpperCase().replace(/[^A-Z0-9]/g, '');
}

export function formatPhoneNumber(phone: string): string {
  const cleaned = phone.replace(/\D/g, '');
  if (cleaned.length === 10) {
    return `(${cleaned.slice(0, 3)}) ${cleaned.slice(3, 6)}-${cleaned.slice(6)}`;
  }
  return phone;
}