import { reactive } from "vue";
import { getOmekasResoruceTemplates as getOmekasResoruceTemplatesApi } from '@/api/omekasService.js'
import { omekasResourceTemplateToResourceTemplateDto } from "@/application/adapters/resourceTemplateAdapter.js";

export function useResourceTemplates() {
  const state = reactive({
    isLoading: false,
    isError: false
  })
  const resourceTemplates = reactive([])

  async function fetch() {
    state.isLoading = true
    state.isError = false
  
    try {
      const response = await getOmekasResoruceTemplatesApi()
      resourceTemplates.splice(0, resourceTemplates.length, ...response.data.map(omekasResourceTemplateToResourceTemplateDto))
      console.log('Resource Templates fetched:', resourceTemplates)
    } catch (error) {
      if (process.env.NODE_ENV === 'development') {
        console.error(error)
      }
      state.isError = true
      throw error;
    } finally {
      state.isLoading = false
    }
  }

  return {
    isLoading: state.isLoading,
    isError: state.isError,
    resourceTemplates,
    fetch,
  }
}
