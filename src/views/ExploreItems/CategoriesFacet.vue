<template>
  <section aria-label="Filtros de categorías">
    <h2
      class="title m-0 is-5 has-background-primary p-3 has-text-white is-flex is-justify-content-space-between is-align-items-center"
      @click="toggleCollapsed()"
    >
      <span>
        Categorías <small v-if="idsCategoriesSelected.length > 0">({{ idsCategoriesSelected.length }})</small>
      </span>  
      <span class="ml-2 icon is-size-7" aria-hidden="true">
        <font-awesome-icon :icon="collapsed ? faChevronDown : faChevronUp" />
      </span>
    </h2>
    <div class="mt-3" v-if="!collapsed">
      <p v-if="isError">Error al cargar las categorías.</p>
      <button
        v-if="idsCategoriesSelected.length > 0"
        class="has-text-link is-fullwidth"
        role="button"
        @click="clearIdsCategoriesSelected()"
      >
          <font-awesome-icon :icon="faTrash" />
        Limpiar selección
      </button>
      <ul v-if="categories?.length > 0">
        <li v-for="category in categories" :key="category.id">
          <label class="checkbox">
          <input
            type="checkbox"
            :value="category.id"
            :checked="category.isSelected"
            @input="toggleCategorySelected(category.id)"
          />
            {{ category.name }}
          </label>
        </li>
      </ul>
    </div>
  </section>
</template>
<script setup>
  import { ref, watch, defineEmits, onMounted, onBeforeMount } from 'vue';
  import { useCategoriesSelector } from '@/composables/useCategoriesSelector';
  import { faTrash, faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons'
  const emits = defineEmits(['update:modelValue']);

  const props = defineProps({
    initialValue: {
      type: Array,
      default: () => []
    }
  });

  const { 
    isLoading,
    isError,
    fetchCategories,
    setIdsCategoriesSelected,
    toggleCategorySelected,
    clearIdsCategoriesSelected,
    categories,
    idsCategoriesSelected
  } = useCategoriesSelector();

  const collapsed = ref(false);
  function toggleCollapsed() {
    collapsed.value = !collapsed.value;
  }
  onBeforeMount(() => {
    setIdsCategoriesSelected(props.initialValue);
  });
  onMounted(() => {
    fetchCategories();
    watch(
      idsCategoriesSelected,
      (newValue) => {
        if(newValue){
          emits('update:modelValue', newValue);
        }
      }
    );
  });
</script>
<style lang="scss" scoped>
  @forward "bulma/sass/elements/title";
  @forward "bulma/sass/elements/button";
</style>
