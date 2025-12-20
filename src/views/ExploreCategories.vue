<template>
  <section class="section container">
    <h1 class="title is-3 mb-3">Explorar por categorías</h1>
    <div v-if="isError">Error al cargar los items.</div>
    <div v-else
      class="fixed-grid has-4-cols"
    >
      <div class="grid">
        <SkeletonCard v-if="isLoading" v-for="n in 4" :key="n" />
        <Card
          v-else
          v-for="category in categories"
          :key="category.name"
          :imgSrc="category.thumbnailSource || 'https://bulma.io/assets/images/placeholders/1280x960.png'"
          :alt="category.name"
        >
          <router-link
            class="title is-4"
            :to="`/categories/${category.slug}/items`"
          >
            {{ category.name }}
          </router-link>
        </Card>
      </div>
    </div>
  </section>
</template>
<script setup>
  import Card from '@/shared/presentation/Card.vue'
  import SkeletonCard from '@/components/common/skeletons/SkeletonCard.vue';
  import { useCategories } from '@/composables/useCategories'
  const { isLoading, isError, categories, fetchCategories } = useCategories()
  fetchCategories()
</script>
<style lang="scss" scoped>
  @forward "bulma/sass/elements/title";
</style>
