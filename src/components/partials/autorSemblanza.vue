<template>
  <div>
    <h2 class="title is-5 mb-1">{{ author?.nombreCompleto }}</h2>
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
    <div class="content">
      <rich-text-block :blocks="author?.semblanza || []" />
    </div>
  </div>
</template>
<script setup>
  import RichTextBlock from '@/shared/presentation/richTextBlock/index.vue'
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
