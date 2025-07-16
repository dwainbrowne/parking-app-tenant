import { submissionSchema } from '../../utils/validation';
import type { Submission } from '../../types';

export default defineEventHandler(async (event) => {
  // Only allow POST requests
  if (event.node.req.method !== 'POST') {
    throw createError({
      statusCode: 405,
      statusMessage: 'Method Not Allowed'
    });
  }

  try {
    // Parse request body
    const body = await readBody(event);
    
    // Validate submission data
    const validation = submissionSchema.safeParse(body);
    if (!validation.success) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Validation Error',
        data: validation.error.issues
      });
    }

    const submission: Submission = {
      ...validation.data,
      timestamp: new Date().toISOString()
    };

    // Log the submission (in production, you might send to email/webhook)
    console.log('Parking Enforcement Submission:', {
      type: submission.type,
      name: submission.name,
      email: submission.email,
      licensePlate: submission.licensePlate,
      ticketId: submission.ticketId,
      details: submission.details,
      timestamp: submission.timestamp
    });

    // In a real implementation, you might:
    // 1. Send email notification
    // 2. Forward to webhook
    // 3. Store in external database
    // 4. Integrate with ticketing system

    // Simulate processing delay
    await new Promise(resolve => setTimeout(resolve, 500));

    // Return success response
    return {
      success: true,
      message: 'Request submitted successfully',
      submissionId: `REQ-${Date.now()}`
    };

  } catch (error: any) {
    // Handle validation errors
    if (error.statusCode === 400) {
      throw error;
    }

    // Handle other errors
    console.error('Submission error:', error);
    throw createError({
      statusCode: 500,
      statusMessage: 'Internal Server Error'
    });
  }
});