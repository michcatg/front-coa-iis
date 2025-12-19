<template>
  <article class="media">
    <!-- TODO: Evaluar si eliminar-->
    <figure class="media-left">
      <p class="image is-64x64">
        <img :src="thumbnailSrc" />
      </p>
    </figure>
    <div class="media-content">
      <div class="content">
        <slot></slot>
      </div>
    </div>
  </article>
</template>
<script setup>
const props = defineProps({
  /**  
   * Props:
   * - imageSource: String, opcional, la URL de la imagen a mostrar.
   *   Si no se proporciona, se muestra una imagen de marcador de posición.
   */
  imageSource: {
    type: String,
    default: ''
  },
  
})

import { computed } from 'vue'

const thumbnailSrc = computed(() => {
  return props.imageSource || 'https://bulma.io/assets/images/placeholders/128x128.png'
})

</script>
