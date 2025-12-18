import { getItemsCategories } from '@/api/strapiService'
import { useApiQuery } from '@/shared/infraestructure/useApiQuery.js'

export function useCategories({
  immediate= true,
  retry= 1
} = {} ) {
  const apiQuery = useApiQuery({ 
    queryFn: getItemsCategories,
    immediate: immediate,
    retry: retry
  })

  return {
    isLoading: apiQuery.isLoading,
    isError: apiQuery.isError,
    data: apiQuery.data,
    error: apiQuery.error,
    refetch: apiQuery.refetch
  }
}
