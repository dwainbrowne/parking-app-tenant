import { apiService } from '~/utils/api'
import type { PermitRequest, ApiResponse } from '~/types'

export const usePermitSubmission = () => {
  const isSubmitting = ref(false)
  const submitResult = ref<ApiResponse | null>(null)

  const submitPermit = async (permitData: PermitRequest): Promise<ApiResponse> => {
    isSubmitting.value = true
    submitResult.value = null

    try {
      const response = await apiService.post('/api/submit-permit-request', permitData)
      submitResult.value = response
      return response
    } catch (error) {
      const errorResponse: ApiResponse = {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error occurred',
        message: 'Failed to submit permit request'
      }
      submitResult.value = errorResponse
      return errorResponse
    } finally {
      isSubmitting.value = false
    }
  }

  const clearResult = () => {
    submitResult.value = null
  }

  return {
    isSubmitting: readonly(isSubmitting),
    submitResult: readonly(submitResult),
    submitPermit,
    clearResult
  }
}
