import { ref } from "vue";
import { useSimpleItems } from "./useSimpleItems";
import { useItemSimpleAuthors } from "./useItemSimpleAuthors";

export function useSimpleItemsWithAuthors() {
  const simpleItems = useSimpleItems();
  const isLoading = ref(false);
  const isError = ref(false);
  const itemsWithAuthors = ref([]);

  async function fetchItemsWithAuthors() {
    isLoading.value = true;
    try {
      await simpleItems.fetchItems();
      itemsWithAuthors.value = await Promise.all(simpleItems.items.value.map(fetchAuthorItem));
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
    const simpleAuthors = useItemSimpleAuthors(item);
    await simpleAuthors.fetchAuthors();
    return {
      ...item,
      useAuthors: simpleAuthors
    };
  };

  return {
    isLoading,
    isError,
    itemsWithAuthors,
    fetchItemsWithAuthors,
  };
}
