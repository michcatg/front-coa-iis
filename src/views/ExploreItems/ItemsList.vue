<template>
  <div>
    <div v-if="isLoading">Cargando...</div>
    <div v-else-if="isError">Error al cargar los items.</div>
    <ul v-else class="catalogo-items">
      <li
        v-for="(item, idx) in items"
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
                      <small class="tag is-info is-light is-rounded" aria-label="Sin semblanza" title="Sin semblanza" role="status">Sin semblanza</small>
                    </template>
                    <template v-else>
                      {{ author.nombreCompleto }}
                      <button
                        class="has-text-link"
                        @click="emit('view-author', author)"
                        role="button"
                      >
                        <font-awesome-icon :icon="faFile" /> Ver semblanza
                    </button>
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
                  <span>Error al comprobar la semblanza de los autores.</span>
                </p>
              </template>
            </section>
          </div>
        </article>
      </li>
    </ul>
  </div>
</template>
<script setup>
  import { defineEmits } from 'vue'
  import { faFile, faUserSlash } from '@fortawesome/free-solid-svg-icons'
  import moreLowText from '@/components/basicFormats/moreLowText.vue'
  const props = defineProps({
    items: {
      type: Array,
      default: () => []
    },
    isLoading: {
      type: Boolean,
      default: false
    },
    isError: {
      type: Boolean,
      default: false
    }
  })
  const emit = defineEmits(["view-author"])
</script>
