<template>
  <div>
    <div v-if="isLoading">Cargando...</div>
    <div v-else-if="isError">Error al cargar los items.</div>
    <ul v-else :class="['catalogo-items', { 'columns is-multiline': isCardView }]">
      <li
        v-for="(item, idx) in items"
        :key="item.id"
        :image-source="item.thumbnailSource"
                :class="['pt-4 pb-3',
          {
            'has-border-top': idx !== 0,
            'column is-one-third': isCardView
          }
        ]"
      >
        <article class="box hover-scale">
          <div :class="[{'columns': isListView}]">
            <figure
              :class="[
                'is-flex', 'is-flex-direction-column', 'is-align-items-center',
                { 'column is-2': isListView }
              ]">
                <a :href="router.resolve({ name: 'itemDetail', params: { id: item.id } }).href">
                  <img :src="item.thumbnailSource" :alt="item.title" />
                </a>
                <a
                  v-if="isListView"
                  class="button is-link is-light"
                  @click="() => router.push({ name: 'itemDetail', params: { id: item.id } })"
                  :aria-label="`Ver detalle del item ${item.title}`"
                  role="link"
                >
                  Ver detalle
                </a>
            </figure>
            <div class="column is-10">
              <h3 class="mb-2"><strong class="has-text-primary">{{ item.title }}</strong></h3>
              <time :datetime="item.createdAt" class="has-text-grey">
                <small>{{ item.createdAt }}</small>
              </time>
              <a
                class="button is-link is-light"
                @click="() => router.push({ name: 'itemDetail', params: { id: item.id } })"
                :aria-label="`Ver detalle del item ${item.title}`"
                role="link"
              >
                Ver detalle
              </a>
              <moreLowText
                v-if="isListView"
                :text="item.description"
              />
              <section v-if="isListView" class="content">
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
                      <autor-possible-semblanza
                        :author="author"
                        @view-author="emit('view-author', $event)"
                      />
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
          </div>
        </article>
      </li>
    </ul>
  </div>
</template>
<script setup>
  import { defineEmits, computed } from 'vue'
  import { faUserSlash } from '@fortawesome/free-solid-svg-icons'
  import moreLowText from '@/components/basicFormats/moreLowText.vue'
  import router from '@/router'

  /** Partials and parts */
  import AutorPossibleSemblanza from '@/components/partials/autorPosibleSemblanza.vue'

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
    },
    viewMode: {
      type: String,
      default: 'list' // 'list' o 'card'
    }
  })
  const emit = defineEmits(["view-author"])
  const isListView = computed(() => props.viewMode === 'list')
  const isCardView = computed(() => props.viewMode === 'card')
</script>
<style lang="scss" scoped>
  @forward "bulma/sass/elements/button";
  @forward "bulma/sass/elements/tag";
  @forward "bulma/sass/elements/box";
  @forward "@/assets/sass/hoverScale.scss";

  .catalogo-items {
    list-style: none;
    margin: 0;
    padding: 0;
  }
  /*.catalogo-items > li.has-border-top {
    border-top: 1px solid #e3e7ed;
  }*/

  .catalogo-items img {
    max-width: 100%;
    height: auto;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }
</style>
