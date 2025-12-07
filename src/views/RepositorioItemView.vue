<template>
  <main>
    <h1 class="title">Recoplicación</h1>
    <h2 class="subtitle">Items</h2>
    <div v-if="isLoading">Cargando...</div>
    <div v-else-if="isError">Error al cargar los items.</div>
    <media
      v-else
      v-for="item in itemsWithAuthors"
      :key="item.id"
      :image-source="item.thumbnailSource"
    >
      <strong>{{ item.title }}</strong> <small>{{ item.createdAt }}</small>
      <moreLowText
        :text="item.description"
      />
      <strong>Autores:</strong>
      <div>
        <template v-if="item.useAuthors.isLoading">Cargando autores...</template>
        <template v-else-if="item.useAuthors.isError">Error al cargar autores.</template>
        <template v-else>
          <ul>
            <li v-for="author in item.useAuthors.authors" :key="author.id">
              {{ author.gradoAcademico }} {{ author.name }} {{ author.apellidos }}
              <a class="has-text-link" @click="processSemblanzaAuthor(author)">
                <font-awesome-icon :icon="faFile" /> Ver Semblanza
              </a>
            </li>
          </ul>
        </template>
      </div>
    </media>
  </main>
</template>
<script setup>
  import media from '@/components/layoutComponents/media.vue'
  import moreLowText from '@/components/basicFormats/moreLowText.vue'
  import { useSimpleItemsWithAuthors } from '@/composables/useSimpleItemsWithAuthors'
   import { useSemblanzaAuthor } from '@/composables/useSemblanzaAuthors'
  import { faFile } from '@fortawesome/free-solid-svg-icons'
  const { isLoading, isError, itemsWithAuthors, fetchItemsWithAuthors } = useSimpleItemsWithAuthors()
  fetchItemsWithAuthors()

  async function processSemblanzaAuthor(author){
    if (!author.useSemblanza) {
      author.useSemblanza = useSemblanzaAuthor(author.id);
      await author.useSemblanza.fetchSemblanzaAuthor();
    }
    console.log(author.useSemblanza.semblanzaAuthor);
  }
</script>
