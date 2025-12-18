<template>
  <div class="content" v-for="(block, index) in blocks" :key="index">
    <component
      :is="getComponent(block.type)"
      v-bind="block"
    />
  </div>
</template>
<script setup>
import Paragraph from './Paragraph.vue';

/**
 * @prop {Array} blocks
 * Arreglo de bloques de texto enriquecido recibido desde Strapi como objeto JSON.
 * Cada elemento representa un bloque de contenido para ser procesado y renderizado.
 * Ejemplo de estructura:
 * [
 *   {
 *     "type": "paragraph",
 *     "children": [ { "text": "Contenido..." } ]
 *   },
 *   {
 *     "type": "heading",
 *     "level": 2,
 *     "children": [ { "text": "Título" } ]
 *   }
 * ]
 */
const props = defineProps({
  blocks: {
    type: Array,
    required: true
  }
})

const getComponent = (type) => {
  if (type === 'paragraph') return Paragraph;
  return null;
}
</script>
