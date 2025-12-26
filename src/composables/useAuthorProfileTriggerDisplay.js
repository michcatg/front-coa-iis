import { ref } from 'vue';
import { useAuthorProfile } from '@/composables/useAuthorProfile';

export function useAuthorProfileTriggerDisplay() {
  const displayProfileAuthor = ref(false)
  const selectedAuthor = ref(null)
  async function processSemblanzaAuthor(author){
    if (!author.useAuthorProfile) {
      author.useAuthorProfile = useAuthorProfile(author);
      author.useAuthorProfile.fetchSemblanzaAuthor();
    }
    selectedAuthor.value =  author
    displayProfileAuthor.value = true
  }
  return {
    displayProfileAuthor,
    selectedAuthor,
    processSemblanzaAuthor
  }
}
