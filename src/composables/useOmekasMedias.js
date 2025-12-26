import { shallowRef, triggerRef } from "vue";
import { useOmekasMedia } from "./useOmekasMedia";
/**
 * Recupera múltiples medios (ficheros o archivos que se asocian a ítems de Omekas) a partir de un array de sources (urls)
 * Hace uso del composable useOmekasMedia para cada source.
 * @returns {Object}
 */
export function useOmekasMedias() {
  const medias = shallowRef([]);
  const isLoading = shallowRef(false);
  const isError = shallowRef(false);

  async function fetchMultiple(sources=[]) {
    isLoading.value = true;
    isError.value = false;
    medias.value = [];

    try {
      const fetchPromises = sources.map(async (source) => {
        const mediaComposable = useOmekasMedia({ source });
        await mediaComposable.fetch();
        return mediaComposable.itemMedia.value;
      });

      medias.value = await Promise.all(fetchPromises);
      triggerRef(medias);
    } catch (error) {
      if (process.env.NODE_ENV === 'development') {
        console.error(error);
      }
      isError.value = true;
      throw error;
    } finally {
      isLoading.value = false;
    }
  }

  return {
    medias,
    isLoading,
    isError,
    fetchMultiple
  };
}
