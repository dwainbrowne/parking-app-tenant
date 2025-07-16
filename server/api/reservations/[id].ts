import jwt from 'jsonwebtoken';

// Mock reservation database (in production, use a real database)
const mockReservations: any[] = [];

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
  const reservationId = getRouterParam(event, 'id');

  if (event.node.req.method === 'DELETE') {
    // Find reservation
    const reservationIndex = mockReservations.findIndex(r => 
      r.id === reservationId && r.userId === user.userId
    );

    if (reservationIndex === -1) {
      throw createError({
        statusCode: 404,
        statusMessage: 'Reservation not found'
      });
    }

    const reservation = mockReservations[reservationIndex];

    // Check if reservation can be cancelled
    if (reservation.status === 'expired') {
      throw createError({
        statusCode: 400,
        statusMessage: 'Cannot cancel expired reservation'
      });
    }

    // Remove reservation
    mockReservations.splice(reservationIndex, 1);

    return { success: true };
  }

  throw createError({
    statusCode: 405,
    statusMessage: 'Method Not Allowed'
  });
});