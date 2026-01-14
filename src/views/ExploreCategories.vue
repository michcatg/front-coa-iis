<template>
  <section class="section container">
    <h1 class="title is-3 mb-3">Explorar por categorías</h1>
    <div v-if="isError">
      <Message type="danger">
        Ocurrió un error al cargar las categorías. Por favor, inténtalo de nuevo más tarde.
      </Message>
    </div>
    <template v-else>
      <div class="columns is-multiline">
        <div
          class="column is-12-mobile is-6-tablet is-3-desktop"
          v-if="isLoading"
          v-for="n in 4" :key="n"
        >
          <SkeletonCard/>
        </div>
        <div
          class="column is-12-mobile is-6-tablet is-3-desktop"
          v-else
          v-for="category in categories" :key="category.name"
        >
          <Card
            :imgSrc="category.thumbnailSource.url || 'https://bulma.io/assets/images/placeholders/1280x960.png'"
            :alt="category.name"
          >
            <router-link
              class="title is-4"
              :to="{
                name: 'items',
                query: { categories: category.id }
              }"
            >
              {{ category.name }}
            </router-link>
          </Card>
        </div>
      </div>
      <Message v-if="!isLoading && categories.length === 0" type="info">
        No hay categorías disponibles.
      </Message>
    </template>
  </section>
</template>
<script setup>
  import Card from '@/shared/presentation/Card.vue'
  import SkeletonCard from '@/components/common/skeletons/SkeletonCard.vue';
  import { useCategories } from '@/composables/useCategories'
  import Message from '@/shared/presentation/Message.vue'
  const { isLoading, isError, categories, fetchCategories } = useCategories()
  fetchCategories()
</script>
<style lang="scss" scoped>
  @forward "bulma/sass/elements/title";
</style>
