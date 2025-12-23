import { ref } from "vue";
import { useItemsResume } from "./useItemsResume";
import { useAuthorItem } from "./useAuthorItem";
import { compareStrings } from "@/utils/stringHelpers";

export function useItemsResumeWithAuthors() {
  const simpleItems = useItemsResume();
  const isLoading = ref(false);
  const isError = ref(false);
  const itemsWithAuthors = ref([]);

  function cleanState() {
    itemsWithAuthors.value = [];
    isLoading.value = false;
    isError.value = false;
    simpleItems.cleanState();
  }

  async function fetchItemsWithAuthors() {
    isLoading.value = true;
    try {
      await simpleItems.fetchItems();
      itemsWithAuthors.value = simpleItems.items.value
      itemsWithAuthors.value = await Promise.all(itemsWithAuthors.value.map(fetchAuthorItem));
    } catch (error) {
      if (process.env.NODE_ENV === 'development') {
        console.error(error);
      }
      isError.value = true;
    } finally {
      isLoading.value = false;
    }
  }

  const fetchAuthorItem = async (item) => {
    const simpleAuthors = useAuthorItem(item);
    try {
      await simpleAuthors.fetchAuthors();
    } catch (error) {
      if (process.env.NODE_ENV === 'development') {
        console.error(error);
      }
    }finally {
      return {
        ...item,
        authors: [
          ...simpleAuthors.authors.value,
          ...item.authors.filter(authorName =>
            !simpleAuthors.authors.value.some(
              author => compareStrings(authorName, `${author.primerApellido} ${author.segundoApellido}, ${author.nombres}`)
            )
          )
        ],
        isErrorAuthorsProfile: simpleAuthors.isError
      };
    }
  };

  return {
    isLoading,
    isError,
    itemsWithAuthors,
    fetchItemsWithAuthors,
    searchOptions: simpleItems.searchOptions,
    cleanState,
    cleanSearchOption: simpleItems.cleanSearchOption,
    cleanSomeSearchOptions: simpleItems.cleanSomeSearchOptions,
  };
}
