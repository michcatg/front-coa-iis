<template>
  <section class="box" aria-label="Búsqueda avanzada de items">
    <h2 class="title is-5 mb-3 p-3 ">Búsqueda avanzada</h2>
    <form @submit.prevent="emit('search', getFullQuery())">
      <div class="field mb-2">
        <label for="full-text-advanced" class="label mb-2">Buscar por texto completo</label>
        <div class="control">
          <input
            id="full-text-advanced"
            class="input"
            type="text"
            placeholder="Texto de entrada"
            v-model="fullText"
          />
        </div>
      </div>  
      <div class="field mb-2">
        <label for="value-search" class="label mb-2">Buscar por valor</label>
        <div
          v-for="(query,index) in searchQuery"
          :key="query.id"
          class="control columns is-gap-2"
        >
          <div class="column is-2" v-if="searchQuery.length > 1">
            <select-searchable
              labelFor="value-search"
              :options="[{ value: 'and', text: 'Y' }, { value: 'or', text: 'O' }]"
              keyValue="value"
              keyText="text"
              placeholder="Conector lógico"
              v-model="query.logicConnector"
            />
          </div>
          <div class="column"  v-if="properties?.length > 0">
            <select-searchable
              labelFor="value-search"
              :options="properties"
              keyValue="id"
              keyText="name"
              placeholder="Selecciona una propiedad"
              v-model="query.term"
            />
          </div>
          <div class="column">
            <select-searchable
              :options="searchOperators"
              keyText="text"
              keyValue="value"
              placeholder="Seleccione un operador"
              v-model="query.operand"
            />
          </div>
          <div
            v-if="!query.operator || searchOperators.find(op => op.value === query.operator)?.operands === 1"
            class="column"
          >
            <input
              id="value-search"
              class="input"
              type="text"
              placeholder="Valor de la propiedad"
              v-model="query.value"
            />
          </div>
            <div class="column is-narrow">
            <button
              v-if="index === searchQuery.length - 1 && searchQuery.length < 5"
              type="button"
              class="button is-info mr-2"
              @click="addEmptySearchQuery"
              aria-label="Agregar otro valor"
            >
              <span class="icon" aria-hidden="true">
              <font-awesome-icon :icon="['fas', 'plus']" />
              </span>
            </button>
            <button
              v-if="searchQuery.length > 1"
              type="button"
              class="button is-danger"
              @click="deleteSearchQuery(index)"
              aria-label="Borrar este valor"
            >
              <span class="icon" aria-hidden="true">
              <font-awesome-icon :icon="['fas', 'trash']" />
              </span>
            </button>
            </div>
        </div>
      </div>
      <div class="field is-grouped is-grouped-right mt-4">
        <div class="control">
          <button class="button is-primary" type="submit" aria-label="Buscar">
            <span class="icon" aria-hidden="true">
                <font-awesome-icon :icon="['fas', 'magnifying-glass']" />
            </span>
            <span>Buscar</span>
          </button>
        </div>
        <div class="control">
          <button class="button is-primary is-light" type="reset" aria-label="Limpiar búsqueda" @click.prevent="cleanFullQuery">
            <span class="icon" aria-hidden="true">
              <font-awesome-icon :icon="['fas', 'trash']" />
            </span>
            <span>Limpiar búsqueda</span>
          </button>
        </div>
      </div>
    </form>
  </section>
</template>
<script setup>
  import { ref, onMounted, defineEmits, watch } from 'vue'
  //import { useResourceTemplatesCategories } from '@/composables/useResourceTemplatesCategories.js'
  import { useProperties } from '@/composables/useProperties.js'
  import { useOmekasSearchQuery as useSearchQuery } from '@/composables/useOmekasSearchQuery.js'
  import { searchPropertyToSearchQueryDto } from '@/application/adapters/sorucesQueryAdapter.js'
  import { SelectSercheable as SelectSearchable } from 'vue-ui-kit'
  import 'vue-ui-kit/dist/vue-ui-kit.css';
  import { searchOperators } from '@/application/constants/omekasSearchOperations';

  const emit = defineEmits(['search'])
  //const resourceTemplatesRecovered = ref([])
  //let categoriesSelected = []

  const props = defineProps({
    categories: {
      type: Array,
      default: () => []
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
/*
  const {
    isLoading: isLoadingTemplates,
    isError: isErrorTemplates,
    resourcesTemplates,
    fetchResourceTemplates,
    addCategory,
    setCategories,
  } = useResourceTemplatesCategories()
*/
  const {
    isLoading: isLoadingProperties,
    isError: isErrorProperties,
    properties,
    fetchProperties,
  } = useProperties()
  fetchProperties()

  const {
    fullText,
    searchQuery,
    addEmptySearchQuery,
    addSearchQuery,
    deleteSearchQuery,
    getFullQuery,
    cleanQuery
  } = useSearchQuery()

  onMounted(() => {
    /*
    if(props.categories !== null && props.categories.length > 0) {
      setCategories(props.categories)
      fetchResourceTemplates();
      categoriesSelected = [...props.categories]
    }else{
      fetchResourceTemplates();
      addCategory('all')
      categoriesSelected = ['all']
    }

    watch(
      () => props.categories,
      (newVal) => {
        if (!categoriesSelected.includes('all')) {
          const diff = newVal.filter(val => !categoriesSelected.includes(val));
          if (diff.length > 0) {
            setCategories(diff);
            categoriesSelected = [...categoriesSelected, ...diff];
            fetchResourceTemplates();
          }
        }
      }
    )
    addEmptySearchQuery()
    */
  })

  watch(
    () => props.initialFulltextSearch,
    (newVal) => {
      if(!newVal) return;
      fullText.value = newVal
    }, { immediate: true }
  )

  watch(
    () => props.initialProperty,
    (newVal) => {
      searchQuery.value = []
      if(!newVal || newVal.length === 0) {
        addEmptySearchQuery()
        return;
      }
      newVal.forEach((val) => {
        addSearchQuery(searchPropertyToSearchQueryDto(val), newVal.length === 1);
      });
    },
    { immediate: true, deep: true }
  )
  /*
  watch( resourcesTemplates, (newVal) => {
    if(newVal === null || newVal.length === 0) return;
    const diff = newVal.filter(val => !resourceTemplatesRecovered.value.includes(val));
    resourceTemplatesRecovered.value = [...resourceTemplatesRecovered.value, ...diff];
  }, { immediate: true })
  */
  function cleanFullQuery() {
    cleanQuery()
    addEmptySearchQuery()
    emit('search', getFullQuery())
  }

</script>
<style scoped lang="scss">
  @forward 'vue-ui-kit/dist/vue-ui-kit.css';
  @forward "bulma/sass/form";
  @forward "bulma/sass/elements/button";
  @forward "bulma/sass/elements/box";
  @forward "bulma/sass/layout/section";
  @forward "bulma/sass/elements/title";
  .is-fullwidth {
    width: 100% !important;
  }
</style>
