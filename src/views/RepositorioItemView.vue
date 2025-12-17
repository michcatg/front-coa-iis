<template>
  <section class="section container">
    <h1 class="title is-3 mb-3">Recoplicación</h1>
    <h2 class="subtitle is-5 has-text-grey">Items</h2>
    <div v-if="isLoading">Cargando...</div>
    <div v-else-if="isError">Error al cargar los items.</div>
    <media
      v-else
      v-for="item in itemsWithAuthors"
      :key="item.id"
      :image-source="item.thumbnailSource"
    >
      <h3><strong>{{ item.title }}</strong></h3>
      <time :datetime="item.createdAt"><small>{{ item.createdAt }}</small></time>
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
              {{ author.gradoAcademico }} {{ author.nombres }} {{ author.apellidos }}
              <a class="has-text-link" @click="processSemblanzaAuthor(author)">
                <font-awesome-icon :icon="faFile" /> Ver semblanza
              </a>
            </li>
          </ul>
        </template>
      </div>
    </media>
    <modal v-if="displayProfileAuthor" @close="displayProfileAuthor = false">
      <template #header>
        <p class="modal-card-title">Sembalnza de la persona autora</p>
        <button class="delete" aria-label="close" @click="displayProfileAuthor = false">
          <font-awesome-icon :icon="faTimes" />
        </button>
      </template>
      <template #body>
        <div v-if="isLoading">Cargando...</div>
        <div v-else-if="isError">Error al cargar la semblanza.</div>
        <div v-else>
          <autor-semblanza
            :author="{
              ...selectedAuthor?.useSemblanza?.semblanzaAuthor,
              gradoAcademico: selectedAuthor?.gradoAcademico,
              nombres: selectedAuthor?.nombres,
              apellidos: selectedAuthor?.apellidos
            }"
          />
        </div>
      </template>
      <template #footer>
        <button class="button is-link" @click="displayProfileAuthor = false">Cerrar</button>
      </template>
    </modal>
  </section>
</template>
<script setup>
  import { ref } from 'vue'
  import media from '@/components/layoutComponents/media.vue'
  import moreLowText from '@/components/basicFormats/moreLowText.vue'
  import { useSimpleItemsWithAuthors } from '@/composables/useSimpleItemsWithAuthors'
   import { useSemblanzaAuthor } from '@/composables/useSemblanzaAuthors'
  import { faFile, faTimes } from '@fortawesome/free-solid-svg-icons'
  import modal from '@/components/common/modal.vue'
  import autorSemblanza from '@/components/partials/autorSemblanza.vue'

  const { isLoading, isError, itemsWithAuthors, fetchItemsWithAuthors } = useSimpleItemsWithAuthors()
  fetchItemsWithAuthors()

  const displayProfileAuthor = ref(false)
  const selectedAuthor = ref(null)

  async function processSemblanzaAuthor(author){
    if (!author.useSemblanza) {
      author.useSemblanza = useSemblanzaAuthor(author.id);
      author.useSemblanza.fetchSemblanzaAuthor();
    }
    selectedAuthor.value = author
    displayProfileAuthor.value = true
  }
</script>
<style lang="scss" scoped>
  @forward "bulma/sass/elements/button";
  @forward "bulma/sass/elements/title";
  @forward "bulma/sass/elements/block";
</style>
