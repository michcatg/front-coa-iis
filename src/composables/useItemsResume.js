import { ref, shallowRef, triggerRef } from "vue";
import { getRecentOmekasItems as getItemsApi } from '@/api/omekasService.js'
import { toItemResumeDto } from "@/application/adapters/itemAdapter.js";
import { OmekasQueryParamsDto } from "@/application/dtos/OmekasQueryParamsDto.js";

export function useSimpleItems() {
  const isLoading = ref(false)
  const isError = ref(false)
  const items = shallowRef(null)
  const searchOptions = shallowRef(new OmekasQueryParamsDto())

  function cleanState() {
    items.value = null
    isLoading.value = false
    isError.value = false
    triggerRef(items)
  }

  function cleanSearchOption(optionKey) {
    if (searchOptions.value[optionKey] === undefined) return
    delete searchOptions.value[optionKey]
    triggerRef(searchOptions)
  }

  function cleanSomeSearchOptions(optionsKeys=[]) {
    optionsKeys.forEach(key => {
      if (searchOptions.value[key] !== undefined) {
        delete searchOptions.value[key]
      }
    })
    triggerRef(searchOptions)
  }

  async function fetchItems() {
    isLoading.value = true
    isError.value = false

    try {
      const response = await getItemsApi(searchOptions.value)
      items.value = response.data.map(toItemResumeDto)
      triggerRef(items)
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
    items,
    fetchItems,
    searchOptions,
    cleanState,
    cleanSearchOption,
    cleanSomeSearchOptions,
  }
}
