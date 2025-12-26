import { ref, shallowRef, triggerRef } from "vue";
import { getOmekaItem as getItemDetailApi, getOmekasResourceTemplate as getResourceTemplateApi } from '@/api/omekasService.js'
import { omekasDataToItemDetailDto, omekasResourceTemplateItemIdToInt } from "@/application/adapters/itemAdapter.js";
import {omekasResourceTemplateToResourceTemplateDto} from "@/application/adapters/resourceTemplateAdapter.js";

export function useItemsDetail(settings={}) {
  const isLoading = ref(false)
  const isError = ref(false)
  const itemDetail = shallowRef(null)
  const resourceTemplate = shallowRef(null)
  const id = ref(settings.id || null)

  async function fetch() {
    isLoading.value = true
    isError.value = false
  
    try {
      const response = await getItemDetailApi(id.value)
      await fetchResourceTemplate(
        omekasResourceTemplateItemIdToInt(response.data)
      )
      itemDetail.value = omekasDataToItemDetailDto(response.data)
      triggerRef(resourceTemplate)
      triggerRef(itemDetail)
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
  function getId() {
    return id.value;
  }
  function setId(newId) {
    id.value = newId;
  }

  async function fetchResourceTemplate(resourceTemplateId) {
    if (!resourceTemplateId) {
      resourceTemplate.value = null
      return;
    }
    try {
      const response = await getResourceTemplateApi(resourceTemplateId)
      resourceTemplate.value = omekasResourceTemplateToResourceTemplateDto(response.data)
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
    itemDetail,
    resourceTemplate,
    fetch,
    getId,
    setId
  }
}
