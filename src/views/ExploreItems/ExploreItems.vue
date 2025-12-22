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
        <div v-if="isLoading">Cargando...</div>
        <div v-else-if="isError">Error al cargar los items.</div>
        <ul v-else class="catalogo-items">
          <li
            v-for="(item, idx) in itemsWithAuthors"
            :key="item.id"
            :image-source="item.thumbnailSource"
            :class="['pt-4 pb-3', { 'has-border-top': idx !== 0 }]"
          >
            <article class="columns">
              <figure class="column">
                <img :src="item.thumbnailSource" :alt="item.title" />
              </figure>
              <div class="column is-10">
                <h3 class="mb-2"><strong>{{ item.title }}</strong></h3>
                <time :datetime="item.createdAt" class="has-text-grey">
                  <small>{{ item.createdAt }}</small>
                </time>
                <moreLowText
                  :text="item.description"
                />
                <section class="content">
                  <strong>Personas autoras:</strong>
                  <p v-if="item.authors.length === 0"
                    class="tag is-info is-light is-rounded ml-2"
                    aria-live="polite"
                    role="status"
                  >
                    <span class="icon" aria-hidden="true">
                      <font-awesome-icon :icon="faUserSlash" />
                    </span>
                    <span>No hay personas autoras asociadas.</span>
                  </p>
                  <template v-else>
                    <ul>
                      <li v-for="author in item.authors" :key="author.id">
                        <template v-if="typeof author === 'string'">
                          {{ author }}
                          <small class="tag is-info is-light is-rounded" aria-label="Sin semblanza" title="Sin semblanza" role="status">Sin semblanza</small>
                        </template>
                        <template v-else>
                          {{ author.nombreCompleto }}
                          <button
                            class="has-text-link"
                            @click="processSemblanzaAuthor(author)"
                            role="button"
                          >
                            <font-awesome-icon :icon="faFile" /> Ver semblanza
                        </button>
                        </template>
                      </li>
                    </ul>
                    <p
                      v-if="item.isErrorAuthorsProfile"
                      class="tag is-danger is-light is-rounded ml-2"
                      aria-live="polite"
                      role="status"
                    >
                      <span class="icon" aria-hidden="true">
                        <font-awesome-icon :icon="faUserSlash" />
                      </span>
                      <span>Error al comprobar la semblanza de los autores.</span>
                    </p>
                  </template>
                </section>
              </div>
            </article>
          </li>
        </ul>
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
  import moreLowText from '@/components/basicFormats/moreLowText.vue'
  import { useItemsResumeWithAuthors } from '@/composables/useItemsResumeWithAuthors'
  import { useAuthorProfile } from '@/composables/useAuthorProfile'
  import { useItemsCategories } from '@/composables/useItemsCategories'
  import { faFile, faUserSlash } from '@fortawesome/free-solid-svg-icons'
  /**Partials and parts */
  import CategoriesFacet from './CategoriesFacet.vue'
  import ProfileAuthorModal from './ProfileAuthorModal.vue'
  import router from '@/router'

  const props = defineProps({
    categories: {
      type: [Array, String],
      default: null
    }
  })

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
  })

  watch(
    () => useItemsCategoriesInstance.categories.value,
    (newValue) => {
      if (newValue.length > 0) {
        useItemsCategoriesInstance.fetchItems();
      }else {
        searchOptions.value.ids = undefined
        fetchItemsWithAuthors()
      }
  });

  const { isLoading, isError, itemsWithAuthors, fetchItemsWithAuthors, searchOptions, cleanItemsState } = useItemsResumeWithAuthors()

  watch (
    () => useItemsCategoriesInstance.items.value,
    (newItems) => {
      if (newItems) {
        if(newItems.length > 0) {
          searchOptions.value.ids = newItems.map(item => item.source.replace(/^\/items\//, ''))
          fetchItemsWithAuthors()
        } else {
          cleanItemsState()
        }
      }
    }
  )
  
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

  function processFacet(newValue) {
    router.push({ name: 'items', query: { categories: newValue } })
    useItemsCategoriesInstance.categories.value = [...newValue]
    triggerRef(useItemsCategoriesInstance.categories)
  }
</script>
<style lang="scss" scoped>
  @forward "bulma/sass/elements/title";
  @forward "bulma/sass/elements/block";
  @forward "bulma/sass/elements/button";
  @forward "bulma/sass/elements/tag";
  .catalogo-items {
    list-style: none;
    margin: 0;
    padding: 0;
  }
  .catalogo-items > li.has-border-top {
    border-top: 1px solid #e3e7ed;
  }
</style>
