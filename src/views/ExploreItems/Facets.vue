<template>
  <!-- Aside de facets -->
  <aside class="column is-2" aria-label="Filtros">
    <CategoriesFacet @update:model-value="emit('update:model-value', $event)" v-model="categoriesSelected" />
  </aside>
</template>
<script setup>
  import CategoriesFacet from './CategoriesFacet.vue'
  const model = defineModel({
    type: Array,
    default: () => []
  })
  const emit = defineEmits(['update:model-value'])
</script>
