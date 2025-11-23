<template>
  <main>
    <h1 class="title">Recoplicación</h1>
    <h2 class="subtitle">Items</h2>
    <div v-if="isLoading">Cargando...</div>
    <div v-else-if="isError">Error al cargar los items.</div>
    <template v-else>
      <pre>
        {{ items }}
      </pre>
    </template>
  </main>
</template>
<script setup>
  import { useSimpleItems } from '@/composables/useSimpleItems.js'
  const { isLoading, isError, items, fetchItems } = useSimpleItems()
  fetchItems()
</script>
