import { ref } from "vue";
import { getSemblanzaAuthor } from '@/api/strapiService.js'

export function useSemblanzaAuthor(autorId) {
  const isLoading = ref(false);
  const isError = ref(false);
  const semblanzaAuthor = ref(null);

  const fetchSemblanzaAuthor = async () => {
    isLoading.value = true;
    isError.value = false;

    try {
      const response = await getSemblanzaAuthor(autorId);
      semblanzaAuthor.value = response.data;
    } catch (error) {
      isError.value = true;
    } finally {
      isLoading.value = false;
    }
  };

  return {
    isLoading,
    isError,
    semblanzaAuthor,
    fetchSemblanzaAuthor
  };
}
