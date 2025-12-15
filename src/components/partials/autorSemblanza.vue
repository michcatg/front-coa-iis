<template>
  <div>
    <h2 class="title">Semblanza del Autor</h2>
    <p>{{ author?.institute }}</p>
    <figure>
      <img
        :src="author?.image?.url"
        :alt="author?.image?.alternativeText || `Foto de ${author?.name}`"
        :aria-label="author?.image?.ariaLabel || `Imagen del autor ${author?.name}`"
      />
      <figcaption>{{ author?.image?.caption || `Autor: ${author?.name}` }}</figcaption>
    </figure>
    <p v-for="(semblanzaPart, index) in author?.semblanza" :key="index">{{ semblanzaPart }}</p>
  </div>
</template>
<script setup>
  const props = defineProps({
    author: {
      type: Object
    }
  })
</script>
