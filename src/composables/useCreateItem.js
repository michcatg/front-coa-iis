import { reactive } from 'vue'
import { createRecursoDigitalCompleto } from '@/api/strapiService'

export function useCreateItem() {
  const state = reactive({
    isLoading: false,
    isError: false,
    isSuccess: false
  })
  async function post({
    data,
    files 
  }) {
    state.isLoading = true
    state.isError = false

    try {
      const response = await createRecursoDigitalCompleto(
        data,
        files
      )
      state.isSuccess = true
      return response.data
    } catch (error) {
      state.isSuccess = false
      if (process.env.NODE_ENV === 'development') {
        console.error(error)
      }
      state.isError = true
      throw error;
    } finally {
      state.isLoading = false
    }
  }

  return {
    state,
    post
  }
}