// TODO: Evaluar si remover porque ya se usan los composables
import { ref } from 'vue'
export function useApiQuery({ 
    queryFn: queryFn,
    retry: retry = 1,
    immediate = true  // Nueva opción para controlar ejecución automática
}) {
  const isLoading = ref(false)
  const isError = ref(false)
  const data = ref(null)
  const meta = ref(null)
  const error = ref(null)
  const retries = ref(0)

  const refetch = async () => {
    isLoading.value = true
    isError.value = false
    error.value = null
    data.value = null
    meta.value = null
    retries.value = 0

    while (retries.value < retry) {
      retries.value++
      try {
        const result = await queryFn()
        isError.value = false
        data.value = result.data.data || result.data || result
        meta.value = result.data.meta || null
        break // Salir del loop si es exitoso
      } catch (err) {
        error.value = err
        isError.value = true
        if (process.env.NODE_ENV === 'development') {
          console.error(err)
        }
        // Si es el último intento, no continuar
        if (retries.value >= retry) {
          break
        }
      }
    }
    isLoading.value = false
  }

  // Ejecutar automáticamente al instanciar si immediate es true
  if (immediate) {
    refetch()
  }

  return {
    isLoading,
    isError,
    data,
    meta,
    error,
    refetch
  }
}
