import { ref } from 'vue';
import { useAuthorProfile } from '@/composables/useAuthorProfile';

export function useAuthorProfileTriggerDisplay() {
  const displayProfileAuthor = ref(false)
  const selectedAuthor = ref(null)
  const isLoading = ref(false)
  const isError = ref(false)

  async function processSemblanzaAuthor(author){
    isLoading.value = true
    if (!author.useAuthorProfile) {
      const autorProfile = useAuthorProfile(author);
      await autorProfile.fetchSemblanzaAuthor();
      isError.value = autorProfile.isError.value;
      if (autorProfile.semblanzaAuthor?.value){
        author.useAuthorProfile = autorProfile;
      }
    }
    isLoading.value = false
    selectedAuthor.value =  author
    displayProfileAuthor.value = true
  }
  return {
    displayProfileAuthor,
    selectedAuthor,
    processSemblanzaAuthor,
    isLoading,
    isError
  }
}
