<template>
  <section class="section container">
    <h1 class="title is-3 mb-3">Recoplicación</h1>
    <h2 class="subtitle is-5 has-text-grey">Items</h2>
    <div class="columns">
      <div class="column is-half">
        <p>Se muestran {{ itemsWithAuthors.length }} items.</p>
      </div>
      <div class="column is-half has-text-right">
        <button class="button is-link is-light" @click="fetchItemsWithAuthors">
          Refrescar
        </button>
      </div>
    </div>
    <div v-if="isLoading">Cargando...</div>
    <div v-else-if="isError">Error al cargar los items.</div>
    <ul v-else class="catalogo-items">
      <li
        v-for="(item, idx) in itemsWithAuthors"
        :key="item.id"
        :image-source="item.thumbnailSource"
        :class="['pt-4 pb-3', { 'has-border-top': idx !== 0 }]"
      >
        <article class="columns">
          <figure class="column">
            <img :src="item.thumbnailSource" :alt="item.title" />
          </figure>
          <div class="column is-10">
            <h3 class="mb-2"><strong>{{ item.title }}</strong></h3>
            <time :datetime="item.createdAt" class="has-text-grey">
              <small>{{ item.createdAt }}</small>
            </time>
            <moreLowText
              :text="item.description"
            />
            <section class="content">
              <strong>Personas autoras:</strong>
              <p v-if="item.useAuthors.isLoading">Cargando autores...</p>
              <p v-else-if="item.useAuthors.isError">Error al cargar autores.</p>
              <p
                v-else-if="item.useAuthors.authors.length === 0"
                class="tag is-info is-light is-rounded ml-2"
                aria-live="polite"
                role="status"
              >
                <span class="icon" aria-hidden="true">
                  <font-awesome-icon :icon="faUserSlash" />
                </span>
                <span>No hay personas autoras asociadas.</span>
              </p>
              <template v-else>
                <ul>
                  <li v-for="author in item.useAuthors.authors" :key="author.id">
                    {{ author.gradoAcademico }} {{ author.nombres }} {{ author.apellidos }}
                    <a class="has-text-link" @click="processSemblanzaAuthor(author)">
                      <font-awesome-icon :icon="faFile" /> Ver semblanza
                    </a>
                  </li>
                  <li
                    v-for="(authorName, index) in item.authors.filter(authorName =>
                    !item.useAuthors.authors.some(
                      author =>
                      authorName === `${author.apellidos}, ${author.nombres}`
                    )
                    )"
                    :key="`name-${index}`"
                  >
                    {{ authorName }}
                    <small class="tag is-info is-light is-rounded" aria-label="Sin perfil" title="Sin perfil" role="status">Sin perfil</small>
                  </li>
                </ul>
              </template>
            </section>
          </div>
        </article>
      </li>
    </ul>
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
  import moreLowText from '@/components/basicFormats/moreLowText.vue'
  import { useSimpleItemsWithAuthors } from '@/composables/useSimpleItemsWithAuthors'
   import { useSemblanzaAuthor } from '@/composables/useSemblanzaAuthors'
  import { faFile, faTimes, faUserSlash } from '@fortawesome/free-solid-svg-icons'
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
  @forward "bulma/sass/elements/button";
  @forward "bulma/sass/elements/tag";
  .catalogo-items {
    list-style: none;
    margin: 0;
    padding: 0;
  }
  .catalogo-items > li.has-border-top {
    border-top: 1px solid #e3e7ed;
  }
</style>
