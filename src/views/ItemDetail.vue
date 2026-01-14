<template>
  <div class="container mt-5">
    <h1 class="title is-3 mb-2">Detalle del Item</h1>
    <hr class="mb-3 mt-0">

    <div v-if="!id" class="notification is-warning is-light has-text-centered">
      <p>ID de Item no proporcionado.</p>
    </div>

    <div v-else>
      <message v-if="itemDetail === null || isLoading || isError"
        :type="isError ? 'danger' : 'info'"
      >
        <template v-if="isError">Ha ocurrido un error al cargar el detalle del item. Por favor, inténtalo de nuevo más tarde.</template>
        <template v-else-if="isLoading">Cargando item...</template>
        <template v-else>No se ha encontrado información del item para mostrar.</template>
      </message>
      <div class="content" v-else>
        <!--<p class="notification is-info">
          Mostrando detalles para el ítem con ID: {{ id }}
        </p>
        </p>-->
        <div class="box mt-5 hover-scale">
          <h2 class="title is-4">Ficheros</h2>
          <div class="columns is-centered">
            <template v-for="media in omekasMediasInstance.medias.value" :key="media.id">
              <div v-if="media.isPublic" class="column is-narrow">
                <figure class="image is-128x128 is-flex is-flex-direction-column is-align-items-center media-figure">
                  <a :href="media.url" target="_blank" rel="noopener">
                    <img :src="media.thumbnailUrls.large" :alt="media.alternativeText" class="is-rounded" />
                    <span :class="['icon-overlay', getFileTypeWithMediaType(media.mime)]">
                      <font-awesome-icon :icon="getIconForFileType(media.mime)" />
                    </span>
                  </a>
                  <a
                    class="button is-link is-light mt-3"
                    :href="media.url"
                    target="_blank"
                    rel="noopener"
                    :aria-label="'Ver media ' + media.title"
                    role="link"
                  >
                    Visualizar <br>{{ media.alternateText || media.title }}
                  </a>
                </figure>
              </div>
            </template>
          </div>
        </div>
        <div class="box hover-scale">
          <h2 class="title is-4">Descripción</h2>
          <!-- TODO: Usar el useAutorProfile para mostrar información del autor -->
          <dl v-if="itemPropertyValuesMapped.length" class="content">
            <template v-for="itemProperty in itemPropertyValuesMapped">
                <dt class="">
                {{ itemProperty.propertyLabel }}
                </dt>
              <dd>
                <ul v-if="itemProperty.values && itemProperty.values.length > 1">
                  <li v-for="value in itemProperty.values" :key="value">
                    <autor-possible-semblanza
                      v-if="value?.value && isAuthorPropertyValue(itemProperty)"
                      :author="value.value"
                      @view-author="processSemblanzaAuthor"
                    />
                    <template v-else>
                      {{ value.value }}
                    </template>
                  </li>
                </ul>
                <span v-else>
                  <autor-possible-semblanza
                    v-if="itemProperty.values[0]?.value && isAuthorPropertyValue(itemProperty)"
                    :author="itemProperty.values[0].value"
                    @view-author="processSemblanzaAuthor"
                  />
                  <template v-else>
                    {{ itemProperty.values[0].value }}
                  </template>
                </span>
              </dd>
            </template>
          </dl>
        </div>
      </div>
    </div>
    <profile-author-modal
      v-if="displayProfileAuthor"
      :author="selectedAuthor?.useAuthorProfile?.semblanzaAuthor"
      :is-loading="isLoading"
      :is-error="isError"
      @close="displayProfileAuthor = false"
    />
  </div>
</template>
<script setup>
  import { defineProps, computed, watch } from 'vue';
  import { useItemsDetail } from '@/composables/useItemsDetail';
  import { useItemPropertyValues } from '@/composables/useItemPropertyValues.js';
  import { useAuthorItem } from "@/composables/useAuthorItem";
  import { useOmekasMedias } from '@/composables/useOmekasMedias';
  import { useAuthorProfileTriggerDisplay } from '@/composables/useAuthorProfileTriggerDisplay';
  import { getFileTypeWithMediaType } from '@/application/helpers/simplifyFIleTypeHelper';
  import { faFilePdf, faFileImage, faFileAlt } from '@fortawesome/free-solid-svg-icons';
  import { isAuthorPropertyValue } from '@/utils/format/itemHelpers.js';
  import { compareStrings } from "@/utils/stringHelpers";
  import Message from '@/shared/presentation/Message.vue';

  /** Partials and parts */
  import ProfileAuthorModal from '@/views/ExploreItems/ProfileAuthorModal.vue';
  import AutorPossibleSemblanza from '@/components/partials/autorPosibleSemblanza.vue'

  const props = defineProps({
    id: {
      type: Number,
      required: true
    }
  });

  /* INICIO Recuperación de autores relacionados con el ítem */
  const authorsItemInstance = useAuthorItem(props.id);
  authorsItemInstance.fetchAuthors();
  /* FIN Recuperación de autores relacionados con el ítem */

  /* INICIO Manejo de modal de perfil de autor */
  const { displayProfileAuthor, selectedAuthor, processSemblanzaAuthor } = useAuthorProfileTriggerDisplay();
  /* FIN Manejo de modal de perfil de autor */

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
    if (!itemPropertyValues.mappedPropertyValues?.value) return [];
    return itemPropertyValues.mappedPropertyValues.value.map(prop => {
      if (!isAuthorPropertyValue(prop)) return prop;
      prop.values = [
        ...authorsItemInstance.authors.value.map(author => ({
          propertyId: prop.propertyId,
          propertyLabel: prop.propertyLabel,
          value: author,
        })),
        ...prop.values.filter(authorPropertyValue =>
          !authorsItemInstance.authors.value.some(
            author => compareStrings(authorPropertyValue.value, `${author.primerApellido} ${author.segundoApellido}, ${author.nombres}`)
          )
        )
      ]
      return prop;
    });
  });

  /** Inicio manejo de medias */
  const omekasMediasInstance = useOmekasMedias();
  watch(itemDetail, (newItemDetail) => {
    if (newItemDetail && newItemDetail.mediaSources) {
      omekasMediasInstance.fetchMultiple(newItemDetail.mediaSources);
    }
  });
  function getIconForFileType(mimeType) {
    const fileType = getFileTypeWithMediaType(mimeType);
    if (fileType === 'image') {
      return faFileImage;
    } else if (fileType === 'pdf') {
      return faFilePdf;
    } else {
      return faFileAlt; // Icono genérico para otros tipos de archivo
    }
  }
  /** Fin manejo de medias */
</script>
<style lang="scss" scoped>
@forward "bulma/sass/elements/title";
@forward "bulma/sass/elements/box";
@forward "bulma/sass/elements/notification";
@forward "bulma/sass/elements/button";
@forward "@/assets/sass/hoverScale.scss";
@use "@/assets/sass/_variables" as *;

.title {
  color: #333;
}

figure {
  max-width: 200px;
  margin: 0 auto 20px;
  img {
    max-width: 100%;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }
}

dl {
  @media (min-width: 1024px) {
    display: grid;
    grid-template-columns: 1fr 3fr;
    gap: 10px;
  }

  dt {
    margin-top: 10px;
    font-weight: bold;
    color: #555;
  }
  dd {
    margin: 0;
    color: #333;
    overflow-wrap: break-word;

    ul {
      list-style: disc;
      padding-left: 1rem;

      li {
        &::marker {
          color: $primary; /* Usa la variable de Bulma para el color primario */
        }
      }
    }
  }
}

.button {
  margin-top: 10px;
  display: flex;
  align-items: center;
  gap: 5px;
  svg {
    width: 16px;
    height: 16px;
  }
}

/** Inicio para superponer el icono de archivo */
.media-figure {
  position: relative; /* Necesario para posicionar el ícono */
  display: inline-block;

  img {
    max-width: 100%;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }

  .icon-overlay {
    position: absolute;
    top: -0.5rem; /* Ajusta la distancia desde la parte superior */
    right: -0.5rem; /* Ajusta la distancia desde la derecha */
    font-size: 2.5rem; /* Tamaño del ícono */
    background: rgba(255, 255, 255, 0.8); /* Fondo blanco semitransparente */
    border-radius: 2px; /* Hace el fondo circular */
    padding: 0.3rem; /* Espaciado interno */
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2); /* Sombra para destacar */
  }
  .icon-overlay.pdf {
    color: #ff3860; /* Color primario de Bulma para PDF */
  }
  .icon-overlay.image {
    color: #23d160; /* Color verde de Bulma para imágenes */
  }
}
/** Fin para superponer el icono de archivo */
.hover-scale:hover {
  margin-top: 60px;
}
</style>
