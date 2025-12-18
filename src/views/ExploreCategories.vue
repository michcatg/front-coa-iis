<template>
  <section class="section container">
    <h1 class="title is-3 mb-3">Explorar por categorías</h1>
    <div class="fixed-grid has-4-cols">
      <div class="grid">
        <!-- TODO: Arreglar lo de las imagenes -->
        <Card
          v-for="category in categories"
          :key="category.nombre"
          imgSrc="https://bulma.io/assets/images/placeholders/1280x960.png"
          :alt="category.nombre"
        >
          <router-link
            class="title is-4"
            :to="`/categories/${category.slug}`"
          >
            {{ category.nombre }}
          </router-link>
        </Card>
      </div>
    </div>
  </section>
</template>
<script setup>
  import Card from '@/shared/presentation/Card.vue'
  import { useCategories } from '@/composables/useCategories'
  const { isLoading, isError, data: categories } = useCategories()
</script>
<style lang="scss" scoped>
  @forward "bulma/sass/elements/title";
  @forward "bulma/sass/grid/_index";
</style>
