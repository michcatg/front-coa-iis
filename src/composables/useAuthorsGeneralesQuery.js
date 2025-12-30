import { ref, shallowRef } from "vue"
import { getAuthors } from '@/api/strapiService'
import { AutorGeneralDto } from '@/application/dtos/AutorGeneralDto'
import { toSnakeCase } from '@/utils/stringHelpers'

export function useAuthorsGeneralesQuery(options={
  limit: 10,
  page: 1,
}) {
  const isLoading = ref(false)
  const isError = ref(false)
  const authors = shallowRef(null)
  const finalOptions = options

  async function fetch() {
    isLoading.value = true
    isError.value = false

    try {
      const response = await getAuthors({
        fields: Object.keys(
          new AutorGeneralDto({})
        ).map(toSnakeCase),
        limit: 10,
        ...finalOptions
      })
      authors.value = response.data
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
    fetch,
  }

}