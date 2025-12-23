import { ref } from "vue";
import { OmekasSearchQueryDto } from '@/application/dtos/OmekasSearchQueryDto.js'
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
        new OmekasSearchQueryDto({
          term: query.term,
          operand: query.operand,
          value: query.value,
          logicConnector: query.logicConnector
        }),
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

  // TODO: Borrar porque creo que no es necesario
  const initSearchParams = (params) => {
    if (params.fullText && typeof params.fullText === 'string') {
      fullText.value = params.fullText
    }
    /*if (params.property && Array.isArray(params.property)) {
      searchQuery.value = cleanValueQuery(
        params.property.map(prop => new OmekasSearchQueryDto({
          term: prop.property || '',
          operand: prop.type || '',
          value: prop.text || '',
          logicConnector: prop.joiner || ''
        })),
        true
      )
    }*/
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
    initSearchParams,
    fullText,
    searchQuery,
    addEmptySearchQuery,
    addSearchQuery,
    deleteSearchQuery,
    getFullQuery,
    cleanQuery
  };
}
