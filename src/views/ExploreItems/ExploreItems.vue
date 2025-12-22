<template>
  <section class="section container">
    <div class="columns">
      <!-- Aside de facets -->
      <aside class="column is-2" aria-label="Filtros">
        <CategoriesFacet @update:model-value="processFacet" v-model="categoriesSelected" />
      </aside>
      <main class="column">
        <header>
          <h1 class="title is-3 mb-3">Explorar Items</h1>
          <h2 class="subtitle is-5 has-text-grey">Resultados</h2>
        </header>
        <div class="columns">
          <div class="column is-half">
            <p>Se muestran {{ itemsWithAuthors.length }} items.</p>
          </div>
          <div class="column is-half has-text-right">
            <button class="button is-link is-light" @click="fetchItemsWithAuthors">
              Refrescar
            </button>
          </div>
        </div>
        <items-list
          :items="itemsWithAuthors"
          :is-loading="isLoading"
          :is-error="isError"
          @view-author="processSemblanzaAuthor"
        />
      </main>
      <profile-author-modal
        v-if="displayProfileAuthor"
        :author="selectedAuthor?.useAuthorProfile?.semblanzaAuthor"
        :is-loading="isLoading"
        :is-error="isError"
        @close="displayProfileAuthor = false"
      />
    </div>
  </section>
</template>
<script setup>
  import { ref, watch, onMounted, triggerRef } from 'vue'
  import router from '@/router'
  import { useItemsResumeWithAuthors } from '@/composables/useItemsResumeWithAuthors'
  import { useAuthorProfile } from '@/composables/useAuthorProfile'
  import { useItemsCategories } from '@/composables/useItemsCategories'
  /**Partials and parts */
  import CategoriesFacet from './CategoriesFacet.vue'
  import ItemsList from './ItemsList.vue'
  import ProfileAuthorModal from './ProfileAuthorModal.vue'

  const props = defineProps({
    categories: {
      type: [Array, String],
      default: null
    }
  })

  const { isLoading, isError, itemsWithAuthors, fetchItemsWithAuthors, searchOptions, cleanState } = useItemsResumeWithAuthors()
  const useItemsCategoriesInstance = useItemsCategories()
  const categoriesSelected = ref([])

  onMounted(() => {
    if (Array.isArray(props.categories)) {
      useItemsCategoriesInstance.categories.value = props.categories
    } else if (typeof props.categories === 'string' && props.categories) {
      useItemsCategoriesInstance.categories.value = [props.categories]
    } else {
      useItemsCategoriesInstance.categories.value = []
    }
    categoriesSelected.value = [...useItemsCategoriesInstance.categories.value]
    triggerRef(useItemsCategoriesInstance.categories);

    watch(
    () => useItemsCategoriesInstance.categories.value,
    (newValue) => {
      if (newValue.length > 0) {
        useItemsCategoriesInstance.fetchItems();
        console.log('Categories selected:', newValue);
      }else {
        console.log('No categories selected, clearing item IDs filter.');
        delete searchOptions.value.ids
        fetchItemsWithAuthors()
      }
    });

    watch (
      () => useItemsCategoriesInstance.items.value,
      (newItems) => {
        console.log('New items from categories:', newItems)
        if (newItems) {
          if(newItems.length > 0) {
            searchOptions.value.ids = newItems.map(item => item.source.replace(/^\/items\//, ''))
            fetchItemsWithAuthors()
            console.log('Search options updated:', searchOptions.value)
          } else if (useItemsCategoriesInstance.categories.value.length === 0) {
            if (searchOptions.value.ids) delete searchOptions.value.ids
          } else {
            cleanState()
            searchOptions.value.ids = [-1]
          }
        }
      }
    )
  })
  
  const displayProfileAuthor = ref(false)
  const selectedAuthor = ref(null)

  /** Permite recuperar el perfil del autor en caso de que no se haya cargado */
  async function processSemblanzaAuthor(author){
    if (!author.useAuthorProfile) {
      author.useAuthorProfile = useAuthorProfile(author);
      author.useAuthorProfile.fetchSemblanzaAuthor();
    }
    selectedAuthor.value =  author
    displayProfileAuthor.value = true
  }

  function processFacet(newValue) {
    router.push({ name: 'items', query: { categories: newValue } })
    useItemsCategoriesInstance.categories.value = [...newValue]
    triggerRef(useItemsCategoriesInstance.categories)
  }
</script>
<style lang="scss" scoped>
  @forward "bulma/sass/elements/title";
  @forward "bulma/sass/elements/button";
  @media (max-width: 1024px) {
    aside[aria-label="Filtros"] {
      position: fixed;
      left: 0;
      bottom: 0;
      width: 100vw;
      max-height: 60vh;
      z-index: 1000;
      background: #fff;
      box-shadow: 0 -2px 8px rgba(0,0,0,0.12);
      overflow-y: auto;
      border-top-left-radius: 1rem;
      border-top-right-radius: 1rem;
      padding: 1.5rem 1rem;
      transition: box-shadow 0.2s;
    }
  }
</style>
