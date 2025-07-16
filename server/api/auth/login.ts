import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { loginSchema } from '~/utils/validation';

// Mock user database (in production, use a real database)
const mockUsers = [
  {
    id: '1',
    name: 'John Doe',
    email: 'john@example.com',
    password: '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', // password
    phone: '(555) 123-4567',
    unitNumber: '101',
    role: 'tenant' as const
  },
  {
    id: '2',
    name: 'Jane Smith',
    email: 'jane@example.com',
    password: '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', // password
    phone: '(555) 987-6543',
    unitNumber: '205',
    role: 'owner' as const
  }
];

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
    const validation = loginSchema.safeParse(body);
    if (!validation.success) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Invalid input',
        data: { message: 'Please check your email and password' }
      });
    }

    const { email, password } = validation.data;

    // Find user
    const user = mockUsers.find(u => u.email === email);
    if (!user) {
      throw createError({
        statusCode: 401,
        statusMessage: 'Invalid credentials',
        data: { message: 'Invalid email or password' }
      });
    }

    // Verify password
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      throw createError({
        statusCode: 401,
        statusMessage: 'Invalid credentials',
        data: { message: 'Invalid email or password' }
      });
    }

    // Generate JWT token
    const config = useRuntimeConfig();
    const token = jwt.sign(
      { 
        userId: user.id,
        email: user.email,
        unitNumber: user.unitNumber,
        role: user.role
      },
      config.jwtSecret,
      { expiresIn: '7d' }
    );

    // Return user data and token
    return {
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        unitNumber: user.unitNumber,
        role: user.role
      },
      token
    };

  } catch (error: any) {
    if (error.statusCode) {
      throw error;
    }

    console.error('Login error:', error);
    throw createError({
      statusCode: 500,
      statusMessage: 'Internal Server Error'
    });
  }
});