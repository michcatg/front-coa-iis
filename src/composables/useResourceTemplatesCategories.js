import { ref, shallowRef, triggerRef } from "vue";
import { getResourceTemplatesSourceByCategories } from '@/api/strapiService.js'
import { toResourceTemplateStrapiDto } from "@/application/adapters/resourceTemplateAdapter";

export function useResourceTemplatesCategories() {
  const isLoading = ref(false)
  const isError = ref(false)
  const resourcesTemplates = shallowRef(null)
  const categories = shallowRef([])

  async function fetchResourceTemplates() {
    isLoading.value = true
    isError.value = false

    try {
      const response = await getResourceTemplatesSourceByCategories(
        categories.value.length > 0 ? categories.value : null
      )
      resourcesTemplates.value = Array.from(
        new Map(
          response.data.data.map((resourceTemplate) => [resourceTemplate.id, toResourceTemplateStrapiDto(resourceTemplate)])
        ).values()
      );
      //resourcesTemplates.value = response.data.data.map(toResourceTemplateStrapiDto)
      triggerRef(resourcesTemplates)
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
    resourcesTemplates,
    fetchResourceTemplates,
    categories,
    addCategory,
    removeCategory,
    setCategories,
  }
}
