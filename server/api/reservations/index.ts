import jwt from 'jsonwebtoken';
import { guestReservationSchema } from '../../../utils/validation';
import type { GuestReservation } from '../../../types';

// Mock reservation database (in production, use a real database)
const mockReservations: (GuestReservation & { userId: string })[] = [];

function getUserFromToken(event: any) {
  const authHeader = getHeader(event, 'authorization');
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    throw createError({
      statusCode: 401,
      statusMessage: 'Unauthorized'
    });
  }

  const token = authHeader.substring(7);
  const config = useRuntimeConfig();
  
  try {
    return jwt.verify(token, config.jwtSecret) as any;
  } catch (error) {
    throw createError({
      statusCode: 401,
      statusMessage: 'Invalid token'
    });
  }
}

export default defineEventHandler(async (event) => {
  const user = getUserFromToken(event);

  if (event.node.req.method === 'GET') {
    // Get user's reservations
    const userReservations = mockReservations
      .filter(r => r.userId === user.userId)
      .map(({ userId, ...reservation }) => reservation)
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

    return { reservations: userReservations };
  }

  if (event.node.req.method === 'POST') {
    // Create new reservation
    const body = await readBody(event);
    
    // Validate input
    const validation = guestReservationSchema.safeParse(body);
    if (!validation.success) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Validation Error',
        data: { message: validation.error.issues[0].message }
      });
    }

    // Check monthly limit (5 reservations per month)
    const now = new Date();
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const monthlyCount = mockReservations.filter(r => 
      r.userId === user.userId && new Date(r.createdAt) >= startOfMonth
    ).length;

    if (monthlyCount >= 5) {
      throw createError({
        statusCode: 429,
        statusMessage: 'Monthly limit exceeded',
        data: { message: 'You have reached your monthly limit of 5 guest reservations' }
      });
    }

    // Check for conflicting reservations (same license plate, overlapping time)
    const hasConflict = mockReservations.some(r => {
      if (r.vehicle.licensePlate !== validation.data.vehicle.licensePlate.toUpperCase()) {
        return false;
      }
      
      const existingStart = new Date(r.reservationStart);
      const existingEnd = new Date(r.reservationEnd);
      const newStart = new Date(validation.data.reservationStart);
      const newEnd = new Date(validation.data.reservationEnd);
      
      return (newStart < existingEnd && newEnd > existingStart);
    });

    if (hasConflict) {
      throw createError({
        statusCode: 409,
        statusMessage: 'Scheduling conflict',
        data: { message: 'This vehicle already has a reservation during this time period' }
      });
    }

    // Create new reservation
    const newReservation = {
      id: String(mockReservations.length + 1),
      ...validation.data,
      vehicle: {
        ...validation.data.vehicle,
        licensePlate: validation.data.vehicle.licensePlate.toUpperCase()
      },
      status: 'pending' as const,
      userId: user.userId,
      createdAt: new Date()
    };

    mockReservations.push(newReservation);

    const { userId, ...reservationData } = newReservation;
    return { reservation: reservationData };
  }

  throw createError({
    statusCode: 405,
    statusMessage: 'Method Not Allowed'
  });
});