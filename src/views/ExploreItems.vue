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
              <p v-if="item.authors.length === 0"
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
                  <li v-for="author in item.authors" :key="author.id">
                    <template v-if="typeof author === 'string'">
                      {{ author }}
                      <small class="tag is-info is-light is-rounded" aria-label="Sin perfil" title="Sin perfil" role="status">Sin perfil</small>
                    </template>
                    <template v-else>
                      {{ author.nombreCompleto }}
                      <a class="has-text-link" @click="processSemblanzaAuthor(author)">
                        <font-awesome-icon :icon="faFile" /> Ver semblanza
                      </a>
                    </template>
                  </li>
                </ul>
                <p
                  v-if="item.isErrorAuthorsProfile"
                  class="tag is-danger is-light is-rounded ml-2"
                  aria-live="polite"
                  role="status"
                >
                  <span class="icon" aria-hidden="true">
                    <font-awesome-icon :icon="faUserSlash" />
                  </span>
                  <span>Error al comprobar el perfil de los autores.</span>
                </p>
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
            :author="selectedAuthor?.useAuthorProfile?.semblanzaAuthor"
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
  import { useItemsResumeWithAuthors } from '@/composables/useItemsResumeWithAuthors'
  import { useAuthorProfile } from '@/composables/useAuthorProfile'
  import { faFile, faTimes, faUserSlash } from '@fortawesome/free-solid-svg-icons'
  import modal from '@/components/common/modal.vue'
  import autorSemblanza from '@/components/partials/autorSemblanza.vue'

  const { isLoading, isError, itemsWithAuthors, fetchItemsWithAuthors } = useItemsResumeWithAuthors()
  fetchItemsWithAuthors()

  const displayProfileAuthor = ref(false)
  const selectedAuthor = ref(null)

  async function processSemblanzaAuthor(author){
    if (!author.useAuthorProfile) {
      author.useAuthorProfile = useAuthorProfile(author);
      author.useAuthorProfile.fetchSemblanzaAuthor();
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
