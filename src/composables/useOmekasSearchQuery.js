import { ref } from "vue";
import { OmekasSearchQueryDto } from '@/application/dtos/OmekasSearchQueryDto.js'
import { cleanValueQuery, getFullQuery } from '@/application/helpers/omekasQueryHelper.js'

export function useOmekasSearchQuery() {
  const fullText = ref('')
  const searchQuery = ref([])

  const addEmptySearchQuery = () => {
    addSearchQuery({ term: '', operand: '', value: '', logicConnector: '' })
  }

  const addSearchQuery = (query) => {
    searchQuery.value.push(
      cleanValueQuery(
        new OmekasSearchQueryDto({
          term: query.term,
          operand: query.operand,
          value: query.value,
          logicConnector: query.logicConnector
        }),
        searchQuery.value.length === 1
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

  return {
    fullText,
    searchQuery,
    addEmptySearchQuery,
    addSearchQuery,
    deleteSearchQuery,
    getFullQuery: () => getFullQuery({
      fullText: fullText.value,
      searchQuery: searchQuery.value
    }),
    cleanQuery
  };
}
