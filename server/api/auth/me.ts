import jwt from 'jsonwebtoken';

export default defineEventHandler(async (event) => {
  if (event.node.req.method !== 'GET') {
    throw createError({
      statusCode: 405,
      statusMessage: 'Method Not Allowed'
    });
  }

  try {
    // Get token from Authorization header
    const authHeader = getHeader(event, 'authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw createError({
        statusCode: 401,
        statusMessage: 'Unauthorized',
        data: { message: 'No token provided' }
      });
    }

    const token = authHeader.substring(7);
    const config = useRuntimeConfig();

    // Verify token
    const decoded = jwt.verify(token, config.jwtSecret) as any;

    // Return user data
    return {
      user: {
        id: decoded.userId,
        email: decoded.email,
        name: decoded.name || 'User',
        unitNumber: decoded.unitNumber,
        role: decoded.role
      }
    };

  } catch (error: any) {
    if (error.name === 'JsonWebTokenError' || error.name === 'TokenExpiredError') {
      throw createError({
        statusCode: 401,
        statusMessage: 'Unauthorized',
        data: { message: 'Invalid or expired token' }
      });
    }

    console.error('Auth verification error:', error);
    throw createError({
      statusCode: 500,
      statusMessage: 'Internal Server Error'
    });
  }
});