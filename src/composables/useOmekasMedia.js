import { ref, shallowRef, triggerRef } from "vue";
import { getOmekasMediaFromSource as getMediaFromSourceApi } from '@/api/omekasService.js'
import { omekasDataToItemMediaDto } from "@/application/adapters/mediaAdapter.js";
/**
 * Recupera un medio (fichero o archivo que se asocia a un ítem de Omekas) a partir de su source (url)
 * @param {*} settings 
 * @returns {Object}
 */
export function useOmekasMedia(settings={}) {
  const isLoading = ref(false)
  const isError = ref(false)
  const itemMedia = shallowRef(null)
  const source = ref(settings.source || null)

  async function fetch() {
    isLoading.value = true
    isError.value = false

    try {
      const response = await getMediaFromSourceApi(source.value)
      itemMedia.value = omekasDataToItemMediaDto(response.data)
      triggerRef(itemMedia)
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
    itemMedia,
    fetch
  }
}
