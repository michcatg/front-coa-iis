import { ref, shallowRef } from "vue";
import { getOmekasProperties } from '@/api/omekasService'
import { toOmekasPropertyDto } from '@/application/adapters/propertyAdapter.js'

export function useProperties() {
  const isLoading = ref(false)
  const isError = ref(false)
  const properties = shallowRef(null)

  async function fetchProperties() {
    isLoading.value = true
    isError.value = false

    try {
      const response = await getOmekasProperties()
      properties.value = response.data.map(toOmekasPropertyDto)
    } catch (error) {
      if (process.env.NODE_ENV === 'development') {
        console.error(error)
      }
      isError.value = true
      throw error;
    } finally {
      isLoading.value = false
    }
  }

  return {
    isLoading,
    isError,
    properties,
    fetchProperties,
  }
}
