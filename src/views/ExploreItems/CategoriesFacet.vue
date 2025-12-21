<template>
  <section aria-label="Filtros de categorías">
    <h2 class="title is-5 mb-3">Categorías</h2>
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
  import { watch,defineModel, defineEmits } from 'vue';
  import { useCategoriesSelector } from '@/composables/useCategoriesSelector';
  import { faTrash } from '@fortawesome/free-solid-svg-icons'
  const emits = defineEmits(['update:modelValue']);

  const model = defineModel({
    type: Array,
    default: () => []
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
  fetchCategories(); 

  watch(
    model,
    (newValue) => {
      if (newValue.length !== idsCategoriesSelected.value.length || newValue.some((id, i) => id !== idsCategoriesSelected.value[i])) {
        setIdsCategoriesSelected(newValue);
      }
    },
    { immediate: true }
  );
  watch(idsCategoriesSelected,
    (newValue) => {
      model.value = [...newValue];
    }
    , { immediate: true }
  );
</script>
<style lang="scss" scoped>
  @forward "bulma/sass/elements/title";
  @forward "bulma/sass/elements/button";
</style>
