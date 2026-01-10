import { ref, shallowRef } from "vue"
import { getAuthors } from '@/api/strapiService'
import { autorStrapitoAutorGeneralesDto } from '@/application/adapters/autorAdapter'
import { AutorGeneralesDto } from '@/application/dtos/AutorGeneralesDto'
import { toSnakeCase } from '@/utils/stringHelpers'

export function useAuthorsGeneralesQuery(options={
  // TODO: Manejar paginaicón
  limit: 100000000000,
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
          new AutorGeneralesDto({})
        ).map(toSnakeCase),
        ...finalOptions
      })
      // TODO: Ver porque falla el map
      console.log(response.data)
      authors.value = response.data.data.map(autorStrapitoAutorGeneralesDto)
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