import type { Complaint } from '~/types'

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event)
    
    // Basic validation
    if (!body.message || body.message.trim().length < 10) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Complaint message must be at least 10 characters long'
      })
    }
    
    // Create complaint object
    const complaint: Complaint = {
      name: body.name?.trim() || '',
      email: body.email?.trim().toLowerCase() || '',
      phone: body.phone?.trim() || '',
      message: body.message.trim(),
      createdAt: new Date()
    }
    
    // Here you would typically save to a database
    // For now, we'll just log it and return success
    console.log('Complaint Submitted:', complaint)
    
    // Simulate processing time
    await new Promise(resolve => setTimeout(resolve, 500))
    
    return {
      success: true,
      message: 'Complaint submitted successfully. We will review your feedback.',
      data: {
        id: Math.random().toString(36).substr(2, 9),
        timestamp: complaint.createdAt
      }
    }
    
  } catch (error) {
    throw createError({
      statusCode: error.statusCode || 500,
      statusMessage: error.statusMessage || 'Internal server error'
    })
  }
})