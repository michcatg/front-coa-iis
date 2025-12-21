<template>
  <div class="container mt-5">
    <h1 class="title is-3 mb-3">Test Categories Facet</h1>
    <CategoriesFacet @update:model-value="reasignValue" v-model="categoriesSelected" />
    <p class="mt-5">Categorías seleccionadas: {{ categoriesSelected }}</p>
    <p class="mt-2">Input test (reasignado): {{ inputTest }}</p>
  </div>
</template>
<script setup>
import { ref, shallowRef, triggerRef } from 'vue'
import CategoriesFacet from './ExploreCategories/CategoriesFacet.vue'
const categoriesSelected = ref(['ydrsgiejxpfi1lrs3ti3z4a8'])
const inputTest = shallowRef([])
const reasignValue = (newValue) => {
  inputTest.value = [...newValue]
  triggerRef(inputTest)
}
</script>
