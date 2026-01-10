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
        {
          ... data,
          datosCatalogacion: cleanEmpty({... data.datosCatalogacion})
        },
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

  function cleanEmpty(obj) {
    Object.keys(obj).forEach(key => {
      if (obj[key].value === null || obj[key].value === undefined || obj[key].value === '' || (Array.isArray(obj[key].value) && obj[key].value.length === 0)) {
        delete obj[key];
      }
    });
    return obj;
  }

  function resetState() {
    state.isLoading = false
    state.isError = false
    state.isSuccess = false
  }

  return {
    state,
    post,
    resetState
  }
}