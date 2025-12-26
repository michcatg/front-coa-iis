<template>
  <section class="section container">
    <search-form
      :initial-fulltext-search="searchOptions.fulltext_search"
      :initial-property="searchOptions.property"
      @search="executeAdvancedSearch"
    />
    <div class="columns">
      <!-- Aside de facets -->
      <aside class="column is-2" aria-label="Filtros">
        <CategoriesFacet @update:model-value="processFacet" :initial-value="useItemsCategoriesInstance.categories.value" />
      </aside>
      <main class="column">
        <header>
          <h1 class="title is-3 mb-2">Explorar Items</h1>
          <hr class="mb-3 mt-0">
        </header>
        <div class="columns">
          <div class="column is-half has-text-grey">
            <p>Se encontraron <span class="has-text-primary has-text-weight-bold">{{ itemsWithAuthors.length }}</span> items.</p>
          </div>
          <div class="column is-half has-text-right">
            <div v-if="itemsWithAuthors.length > 0" class="">
              <button
                class="has-text-link p-2"
                :class="{ 'is-link': isListView }"
                @click="isListView = true"
                aria-label="Ver en Lista"
              >
                <font-awesome-icon :icon="faList" />
                Lista
              </button>
              <button
                class="has-text-link p-2"
                :class="{ 'is-link': !isListView }"
                @click="isListView = false"
                aria-label="Ver en Tarjetas"
              >
                <font-awesome-icon :icon="faThLarge" />
                Tarjetas
              </button>
            </div>
            <button class="button is-link is-light" @click="fetchItems">
              Refrescar
            </button>
          </div>
        </div>
        <!-- TODO: Manejar de forma correcta los estados de error y carga -->
        <items-list
          :items="itemsWithAuthors"
          :is-loading="isLoading"
          :is-error="isError"
          :view-mode="isListView ? 'list' : 'card'"
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
  import { ref, watch, onBeforeMount, onMounted, triggerRef } from 'vue'
  import router from '@/router'
  import { faList, faThLarge } from '@fortawesome/free-solid-svg-icons'
  import { useItemsResumeWithAuthors } from '@/composables/useItemsResumeWithAuthors'
  import { useAuthorProfile } from '@/composables/useAuthorProfile'
  import { useItemsCategories } from '@/composables/useItemsCategories'
  import { fromQueryParams } from '@/application/helpers/exploreSearchparamsHelper'
  /**Partials and parts */
  import CategoriesFacet from './CategoriesFacet.vue'
  import ItemsList from './ItemsList.vue'
  import ProfileAuthorModal from './ProfileAuthorModal.vue'
  import SearchForm from './SearchForm.vue'

  const isListView = ref(true); // true para lista, false para tarjetas

  const props = defineProps({
    categories: {
      type: [Array, String],
      default: []
    },
    initialFulltextSearch: {
      type: String,
      default: ''
    },
    initialProperty: {
      type: Array,
      default: () => []
    }
  })

  const { isLoading, isError, itemsWithAuthors, fetchItemsWithAuthors, searchOptions, cleanState, cleanSomeSearchOptions } = useItemsResumeWithAuthors()
  const useItemsCategoriesInstance = useItemsCategories()

  function fetchItems(){
    if (!useItemsCategoriesInstance.hasSelectedDataNoItemsResults()) { // Si tiene facets que no devolvieron resultados
      cleanState()
      fetchItemsWithAuthors()
    }
  }

  onBeforeMount(() => {
    if(props.categories !== null) {
      useItemsCategoriesInstance.setCategories(
        typeof props.categories === 'string'
          ? [props.categories]
          : props.categories
      );
    }
    searchOptions.value.fulltext_search = props.initialFulltextSearch
    searchOptions.value.property = props.initialProperty
  })

  onMounted(async () => {
    if (useItemsCategoriesInstance.categories.value.length > 0) await useItemsCategoriesInstance.fetchItems();
    if (useItemsCategoriesInstance.items.value?.length > 0) {
      searchOptions.value.ids = useItemsCategoriesInstance.items.value.map(item => item.source.replace(/^\/items\//, ''))
    }
    fetchItems()

    watch(
    () => useItemsCategoriesInstance.categories.value,
    (newValue) => {
      if (newValue.length > 0) {
        useItemsCategoriesInstance.fetchItems();
      } else {
        searchOptions.value.ids = []
        fetchItems()
      }
    });

    watch (
      () => useItemsCategoriesInstance.items.value,
      (newItems) => {
        if (newItems) {
          if(newItems.length > 0) {
            searchOptions.value.ids = newItems.map(item => item.source.replace(/^\/items\//, ''))
            fetchItems()
          } else{
            cleanState()
            searchOptions.value.ids = []
          }
        }
      }
    )
  })

  /** Inicio perfil-autor-process */
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
  /** FIN  perfil-autor-process */

  /** Permite procesar la selección de categorías */
  function processFacet(newValue) {
    useItemsCategoriesInstance.categories.value = [...newValue]
    triggerRef(useItemsCategoriesInstance.categories)
    refreshRouteWithParams()
  }

  function executeAdvancedSearch(fullQuery){
    if (!fullQuery) return;
    cleanState()
    searchOptions.value = { ...searchOptions.value, ...fullQuery }
    fetchItems()
    refreshRouteWithParams()
  }

  function refreshRouteWithParams() {
    router.push({
      name: 'items',
      query: fromQueryParams({
        categories: useItemsCategoriesInstance.categories.value,
        ...searchOptions.value
      })
    })
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
