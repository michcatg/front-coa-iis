<template>
  <main>
    <h1 class="title">Recoplicación</h1>
    <h2 class="subtitle">Items</h2>
    <div v-if="isLoading">Cargando...</div>
    <div v-else-if="isError">Error al cargar los items.</div>
    <template v-else>
      <hr>
      items:
      <pre>
        {{ items }}
      </pre>
      <hr>
      authors for item source /items/3:
      <pre>
        {{ authorsArray }}
      </pre>
    </template>
  </main>
</template>
<script setup>
  import { ref } from 'vue'
  // OmekaS items
  import { useSimpleItems } from '@/composables/useSimpleItems.js'
  const { isLoading, isError, items, fetchItems } = useSimpleItems()
  fetchItems()

  // Strapi authors with items sources (linked OmekaS)
  import { getAuthorsForItemSource } from '@/api/strapiService.js'
  const authorsArray = ref([])
  async function fetchAuthors() {
    try {
      const response = await getAuthorsForItemSource('/items/3')
      authorsArray.value = response.data?.data?.[0]?.autores
    } catch (error) {
      console.error('Error fetching authors:', error)
    }
  }
  fetchAuthors()
</script>
