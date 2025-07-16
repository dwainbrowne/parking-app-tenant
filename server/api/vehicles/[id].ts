import jwt from 'jsonwebtoken';

// Mock vehicle database (in production, use a real database)
const mockVehicles: any[] = [];

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
  const vehicleId = getRouterParam(event, 'id');

  if (event.node.req.method === 'DELETE') {
    // Find vehicle
    const vehicleIndex = mockVehicles.findIndex(v => 
      v.id === vehicleId && v.userId === user.userId
    );

    if (vehicleIndex === -1) {
      throw createError({
        statusCode: 404,
        statusMessage: 'Vehicle not found'
      });
    }

    // Remove vehicle
    mockVehicles.splice(vehicleIndex, 1);

    return { success: true };
  }

  throw createError({
    statusCode: 405,
    statusMessage: 'Method Not Allowed'
  });
});