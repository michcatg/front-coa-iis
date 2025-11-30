import { ref, shallowRef } from "vue";
import { getRecentOmekaItems as getItemsApi } from '@/api/omekasService.js'
import { formatSimpleItem } from "@/utils/format/simpleItemFormat";

export function useSimpleItems() {
  const isLoading = ref(false)
  const isError = ref(false)
  const items = shallowRef(null)

  async function fetchItems(itemId) {
    isLoading.value = true
    isError.value = false

    try {
      const response = await getItemsApi(itemId)
      items.value = response.data.map(formatSimpleItem)
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
  }
}
