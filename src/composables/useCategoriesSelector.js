import { readonly, shallowRef, triggerRef } from 'vue'
import { useCategories } from '@/composables/useCategories'
import { toCategorySelectedDto } from '@/application/adapters/categoryAdapter'

export function useCategoriesSelector() {
  const categories = shallowRef ([])
  const useCategoriesCatalog = useCategories()
  const idsCategoriesSelected = shallowRef([])

  async function fetchCategories() {
    await useCategoriesCatalog.fetchCategories()
    categories.value = useCategoriesCatalog.categories.value
    recalculateCategoriesSelected()
  }

  const setIdsCategoriesSelected = (ids) => {
    idsCategoriesSelected.value = ids
    recalculateCategoriesSelected()
  }
  const clearIdsCategoriesSelected = () => {
    idsCategoriesSelected.value = []
    recalculateCategoriesSelected()
  }

  const toggleCategorySelected = (id) => {
    const index = idsCategoriesSelected.value.indexOf(id)
    const temp = [...idsCategoriesSelected.value]
    if (index === -1) {
      temp.push(id)
    } else {
      temp.splice(index, 1)
    }
    idsCategoriesSelected.value = [...temp]
    recalculateCategoriesSelected()
  }

  function recalculateCategoriesSelected() {
    if (categories.value.length > 0) {
      categories.value = categories.value.map(category =>
        toCategorySelectedDto({
          id: category.id,
          nombre: category.name,
          isSelected: idsCategoriesSelected.value.includes(category.id)
        })
      )
      triggerRef(categories)
    }
    triggerRef(idsCategoriesSelected)
  }

  return {
    isLoading: useCategoriesCatalog.isLoading,
    isError: useCategoriesCatalog.isError,
    fetchCategories,
    setIdsCategoriesSelected,
    toggleCategorySelected,
    clearIdsCategoriesSelected,
    categories,
    idsCategoriesSelected: readonly(idsCategoriesSelected),
  }
}
