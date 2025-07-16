import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { registerSchema } from '~/utils/validation';

// Mock user database (in production, use a real database)
const mockUsers: any[] = [];

export default defineEventHandler(async (event) => {
  if (event.node.req.method !== 'POST') {
    throw createError({
      statusCode: 405,
      statusMessage: 'Method Not Allowed'
    });
  }

  try {
    const body = await readBody(event);
    
    // Validate input
    const validation = registerSchema.safeParse(body);
    if (!validation.success) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Validation Error',
        data: { message: validation.error.errors[0].message }
      });
    }

    const { name, email, password, phone, unitNumber, role } = validation.data;

    // Check if user already exists
    const existingUser = mockUsers.find(u => u.email === email);
    if (existingUser) {
      throw createError({
        statusCode: 409,
        statusMessage: 'User already exists',
        data: { message: 'An account with this email already exists' }
      });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const newUser = {
      id: String(mockUsers.length + 1),
      name,
      email,
      password: hashedPassword,
      phone,
      unitNumber,
      role,
      createdAt: new Date()
    };

    mockUsers.push(newUser);

    // Generate JWT token
    const config = useRuntimeConfig();
    const token = jwt.sign(
      { 
        userId: newUser.id,
        email: newUser.email,
        unitNumber: newUser.unitNumber,
        role: newUser.role
      },
      config.jwtSecret,
      { expiresIn: '7d' }
    );

    // Return user data and token
    return {
      user: {
        id: newUser.id,
        name: newUser.name,
        email: newUser.email,
        unitNumber: newUser.unitNumber,
        role: newUser.role
      },
      token
    };

  } catch (error: any) {
    if (error.statusCode) {
      throw error;
    }

    console.error('Registration error:', error);
    throw createError({
      statusCode: 500,
      statusMessage: 'Internal Server Error'
    });
  }
});