<template>
  <div>
    <p>
      {{ isExpanded ? text : truncated }}
      <span v-if="!isExpanded && text.length > maxLength">
        ...
        <a class="has-text-link" @click="isExpanded = true">ver más</a>
      </span>
      <span v-else-if="isExpanded && text.length > maxLength">
        <a class="has-text-link" @click="isExpanded = false">ver menos</a>
      </span>
    </p>
  </div>
</template>
<script setup>
const props = defineProps({
  /**
   * Representa un texto con formato reducido.
   * - text: texto a mostrar (obligatorio).
   * - maxLength: longitud máxima del texto antes de truncarlo (opcional, por defecto 100).
   */
  text: {
    type: String,
    required: true
  },
  /**
   * maxLength especifica la longitud máxima permitida para el valor de entrada.
   * Limita la cantidad de caracteres que el usuario puede ingresar.
   * Útil para validar y restringir datos en formularios.
   *
   * @type {number}
   */
  maxLength: {
    type: Number,
    default: 300
  }
})
import { computed, ref } from 'vue'
const isExpanded = ref(false)
const truncated = computed(() => 
  props.text
    ? props.text.slice(0, props.maxLength)
    : ''
)
</script>
