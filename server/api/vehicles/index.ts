import jwt from 'jsonwebtoken';
import { vehicleSchema } from '../../../utils/validation';
import type { Vehicle } from '../../../types';

// Mock vehicle database (in production, use a real database)
const mockVehicles: (Vehicle & { userId: string })[] = [];

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
    // Get user's vehicles
    const userVehicles = mockVehicles
      .filter(v => v.userId === user.userId)
      .map(({ userId, ...vehicle }) => vehicle);

    return { vehicles: userVehicles };
  }

  if (event.node.req.method === 'POST') {
    // Add new vehicle
    const body = await readBody(event);
    
    // Validate input
    const validation = vehicleSchema.safeParse(body);
    if (!validation.success) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Validation Error',
        data: { message: validation.error.issues[0].message }
      });
    }

    // Check for duplicate license plate
    const existingVehicle = mockVehicles.find(v => 
      v.licensePlate === validation.data.licensePlate.toUpperCase()
    );
    if (existingVehicle) {
      throw createError({
        statusCode: 409,
        statusMessage: 'Vehicle already exists',
        data: { message: 'A vehicle with this license plate is already registered' }
      });
    }

    // Create new vehicle
    const newVehicle = {
      id: String(mockVehicles.length + 1),
      ...validation.data,
      licensePlate: validation.data.licensePlate.toUpperCase(),
      userId: user.userId,
      createdAt: new Date()
    };

    mockVehicles.push(newVehicle);

    const { userId, ...vehicleData } = newVehicle;
    return { vehicle: vehicleData };
  }

  throw createError({
    statusCode: 405,
    statusMessage: 'Method Not Allowed'
  });
});