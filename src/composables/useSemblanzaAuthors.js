import { ref } from "vue";
import { getSemblanzaAuthor } from '@/api/strapiService.js'
import { toAutorProfileDto } from '@/application/adapters/autorAdapter.js'

export function useSemblanzaAuthor(autor) {
  const isLoading = ref(false);
  const isError = ref(false);
  const semblanzaAuthor = ref(null);

  const fetchSemblanzaAuthor = async () => {
    isLoading.value = true;
    isError.value = false;

    try {
      const response = await getSemblanzaAuthor(autor.id);
      semblanzaAuthor.value = toAutorProfileDto({
        ...autor,
        ...response.data.data
      });
      semblanzaAuthor.value.nombreCompleto = `${autor.gradoAcademico} ${autor.nombreCompleto}`;
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
