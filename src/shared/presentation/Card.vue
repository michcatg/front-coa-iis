<template>
  <div class="card">
    <div class="card-image">
      <figure class="image is-4by3">
        <img
          :src="imgSrc"
          :alt="alt"
        />
      </figure>
    </div>
    <div class="card-content">
      <slot></slot>
    </div>
  </div>
</template>
<script setup>
  const props = defineProps({
    imgSrc: {
      type: String,
      default: 'https://bulma.io/assets/images/placeholders/1280x960.png'
    },
    alt: {
      type: String,
      default: 'Placeholder image'
    },
  })
</script>
<style lang="scss" scoped>
  @forward "bulma/sass/components/card";
</style>
