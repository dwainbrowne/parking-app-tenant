export interface CachedUser {
  name: string;
  email: string;
}

export interface Submission {
  name: string;
  email: string;
  licensePlate: string;
  type: 'request' | 'appeal';
  ticketId?: string;
  details: string;
  timestamp: string;
}

export interface Vehicle {
  id?: string;
  licensePlate: string;
  make: string;
  model: string;
  color: string;
  isPrimary: boolean;
  createdAt?: Date;
}

export interface GuestReservation {
  id?: string;
  guestName: string;
  guestPhone?: string;
  vehicle: Omit<Vehicle, 'isPrimary' | 'id'>;
  reservationStart: Date;
  reservationEnd: Date;
  status: 'pending' | 'approved' | 'denied' | 'expired';
  createdAt: Date;
  notes?: string;
}

export interface TenantProfile {
  id?: string;
  unitNumber: string;
  email: string;
  phone: string;
  name: string;
  role: 'tenant' | 'owner';
  vehicles: Vehicle[];
  reservations: GuestReservation[];
  monthlyGuestLimit: number;
  currentMonthUsage: number;
  createdAt?: Date;
}

export interface ParkingTicket {
  id?: string;
  licensePlate: string;
  violation: string;
  location: string;
  dateIssued: Date;
  amount: number;
  status: 'pending' | 'paid' | 'appealed' | 'dismissed';
  unitNumber?: string;
  photos?: string[];
}

export interface Message {
  id?: string;
  title: string;
  content: string;
  type: 'announcement' | 'violation' | 'reminder';
  priority: 'low' | 'medium' | 'high';
  createdAt: Date;
  readAt?: Date;
}

export interface AuthUser {
  id: string;
  email: string;
  name: string;
  unitNumber: string;
  role: 'tenant' | 'owner';
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  name: string;
  email: string;
  password: string;
  phone: string;
  unitNumber: string;
  role: 'tenant' | 'owner';
}