import { ref, shallowRef, triggerRef } from "vue";
import { getItemSourcesByCategories } from '@/api/strapiService.js'
import { toItemStrapiDto } from "@/application/adapters/itemAdapter.js";

export function useItemsCategories() {
  const isLoading = ref(false)
  const isError = ref(false)
  const items = shallowRef(null)
  const categories = shallowRef([])

  async function fetchItems() {
    isLoading.value = true
    isError.value = false

    try {
      const response = await getItemSourcesByCategories(
        categories.value.length > 0 ? categories.value : null
      )
      items.value = response.data.data.map(toItemStrapiDto)
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
  function addCategory(category) {
    if (!categories.value.includes(category)) {
      categories.value.push(category);
    }
    triggerRef(categories);
  }
  function removeCategory(category) {
    const index = categories.value.indexOf(category);
    if (index !== -1) {
      categories.value.splice(index, 1);
    }
    triggerRef(categories);
  }

  function setCategories(newCategories){
    categories.value = [...newCategories];
    triggerRef(categories);
  }

  return {
    isLoading,
    isError,
    items,
    fetchItems,
    categories,
    addCategory,
    removeCategory,
    setCategories,
  }
}
