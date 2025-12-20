import { ref, shallowRef } from "vue"
import { getCategories } from '@/api/strapiService'
import { toCategoryResumeDto } from "@/application/adapters/categoryAdapter";

export function useCategories() {
  const isLoading = ref(false)
  const isError = ref(false)
  const categories = shallowRef(null)

  async function fetchCategories() {
    isLoading.value = true
    isError.value = false

    try {
      const response = await getCategories()
      categories.value = response.data.data.map(toCategoryResumeDto)
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
    categories,
    fetchCategories,
  }
}
