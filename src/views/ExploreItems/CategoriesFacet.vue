<template>
  <section aria-label="Filtros de categorías">
    <h2 class="title is-5 mb-3 has-background-primary p-3 has-text-white">Categorías</h2>
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
  </section>
</template>
<script setup>
  import { ref, watch, defineEmits, onMounted, onBeforeMount } from 'vue';
  import { useCategoriesSelector } from '@/composables/useCategoriesSelector';
  import { faTrash } from '@fortawesome/free-solid-svg-icons'
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
