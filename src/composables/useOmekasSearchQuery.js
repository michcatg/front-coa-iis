import { ref } from "vue";
import { PropertySearchQueryDto } from '@/application/dtos/PropertySearchQueryDto.js'
import { cleanValueQuery, getFullQuery as getFullQueryOmekas } from '@/application/helpers/omekasQueryHelper.js'

export function useOmekasSearchQuery() {
  const fullText = ref('')
  const searchQuery = ref([])

  const addEmptySearchQuery = () => {
    addSearchQuery({ term: '', operand: '', value: '', logicConnector: '' })
  }

  const addSearchQuery = (query, isUnique = true) => {
    searchQuery.value.push(
      cleanValueQuery(
        new PropertySearchQueryDto(query),
        isUnique
      )
    )
  }

  const deleteSearchQuery = (index) => {
    searchQuery.value.splice(index, 1)
  }

  const cleanQuery = () => {
    fullText.value = ''
    searchQuery.value = []
  }

  const getFullQuery = () => {
    const fullQuery = getFullQueryOmekas({
      fullText: fullText.value,
      searchQuery: searchQuery.value
    })
    return {
      fulltext_search: fullQuery.fulltext_search || '',
      property: fullQuery.property || []
    };
  }

  return {
    fullText,
    searchQuery,
    addEmptySearchQuery,
    addSearchQuery,
    deleteSearchQuery,
    getFullQuery,
    cleanQuery
  };
}
