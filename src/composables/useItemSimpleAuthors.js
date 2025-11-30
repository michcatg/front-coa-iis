import { ref } from "vue";
import { getAuthorsForItemSource } from '@/api/strapiService.js'
import { getOmekaBase as itemSourceURL } from '@/api/omekasService.js'
import { formatSimpleAuthors } from "@/utils/format/simpleAutorFormat";

export function useItemSimpleAuthors(item) {
  const isLoading = ref(false)
  const isError = ref(false)
  const authors = ref([])

  async function fetchAuthors() {
    isLoading.value = true
    isError.value = false

    try {
      const response = await getAuthorsForItemSource(item.source.replace(itemSourceURL(), ''))
      const authorsArray = response.data?.data?.[0]?.autores.map(formatSimpleAuthors) || []
      authors.value = authorsArray
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
    authors,
    fetchAuthors
  }
}
