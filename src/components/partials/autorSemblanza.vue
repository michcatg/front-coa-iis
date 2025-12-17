<template>
  <div>
    <h2 class="title is-5 mb-1">{{ author?.gradoAcademico }} {{ author?.nombres }} {{ author?.apellidos }}</h2>
    <p class="content">{{ author?.institute }}</p>
    <figure class="has-text-centered block">
      <img
        :src="author?.image?.url"
        :alt="author?.image?.alternativeText || `Foto de ${author?.name}`"
        :aria-label="author?.image?.ariaLabel || `Imagen del autor ${author?.name}`"
      />
      <figcaption>
        <p class=" content">{{ author?.image?.caption || `Autor: ${author?.name}` }}</p>
      </figcaption>
    </figure>
    <p class="content" v-for="(semblanzaPart, index) in author?.semblanza" :key="index">{{ semblanzaPart }}</p>
  </div>
</template>
<script setup>
  const props = defineProps({
    author: {
      type: Object
    }
  })
</script>
<style lang="scss" scoped>
  @forward "bulma/sass/elements/title";
  @forward "bulma/sass/elements/block";
</style>
