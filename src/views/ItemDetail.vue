<template>
  <div class="container">
    <h1 class="title is-3 has-text-centered mb-5">Detalle del Ítem</h1>

    <div v-if="!id" class="notification is-warning is-light has-text-centered">
      <p>ID de ítem no proporcionado.</p>
    </div>

    <div v-else>
      <div v-if="isLoading">Cargando...</div>
      <div v-else-if="isError">Error al cargar los items.</div>
      <div class="content" v-else>
        <p class="notification is-info">
          Mostrando detalles para el ítem con ID: {{ id }}
        </p>
        <figure
          v-if="itemDetail"
          class="is-flex is-flex-direction-column is-align-items-center column is-2">
            <!-- TODO: Recuperar el media para que se  pueda visualizar el item-->
            <a :href="itemDetail.source" target="_blank" rel="noopener">
              <img :src="itemDetail.thumbnailSource" alt="Miniatura del ítem" />
            </a>
            <button
              class="button is-link is-light"
              @click="() => router.push({ name: 'itemDetail', params: { id: item.id } })"
              aria-label="Ver detalle del item {{ item.title }}"
              role="link"
            >
              Ver detalle
            </button>
        </figure>
        <dl v-if="itemPropertyValuesMapped.length">
          <template v-for="itemProperty in itemPropertyValuesMapped">
            <dt>
              {{ itemProperty.propertyLabel }}
            </dt>
            <dd>
              <ul
                v-if="itemProperty.values && itemProperty.values.length > 1"
              >
                <li v-for="value in itemProperty.values" :key="value">
                  {{ value?.value }}
                </li>
              </ul>
              <span
                v-else
              >
                {{ itemProperty.values[0].value }}
              </span>
            </dd>
          </template>
        </dl>
      </div>
    </div>
    <pre>
      Item Detail:
      {{ itemDetail }}
    </pre>
    <pre>
      mapeados:
      {{ itemPropertyValuesMapped }}
    </pre>
  </div>
</template>
<script setup>
  import { defineProps, computed } from 'vue';
  import { useItemsDetail } from '@/composables/useItemsDetail';
  import { useItemPropertyValues } from '@/composables/useItemPropertyValues.js';

  const props = defineProps({
    id: {
      type: Number,
      required: true
    }
  });

  const { itemDetail, resourceTemplate, isLoading, isError, fetch } = useItemsDetail({
    id: props.id
  });
  fetch();

  const propertiesValues = computed(() => {
    return itemDetail.value ? itemDetail.value.propertiesValues : [];
  });

  const itemPropertyValues = useItemPropertyValues({
    refPropertyValues: propertiesValues,
    refResourceTemplate: resourceTemplate
  });

  const itemPropertyValuesMapped = computed(() => {
    return itemPropertyValues.mappedPropertyValues.value || [];
  });

</script>
<style lang="scss" scoped>
@forward "bulma/sass/elements/title";
@forward "bulma/sass/elements/button";
</style>
