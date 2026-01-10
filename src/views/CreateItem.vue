<template>
    <section class="section container">
        <h1 class="title is-3 mb-3">Crear nuevo ítem</h1>
        <item-form
            :categories="categoriesInstance.categories.value ||  []"
            :resource-templates="resourceTemplatesInstance.resourceTemplates || []"
            :autores="autorGeneralesInstance.authors.value || []"
        />
    </section>
</template>
<script setup>
    import { useAuthorsGeneralesQuery } from '@/composables/useAuthorsGeneralesQuery'
    import 'vue-ui-kit/dist/vue-ui-kit.css';
    import { useCategories } from '@/composables/useCategories';
    import { useResourceTemplates } from '@/composables/useResourceTemplates';
    import ItemForm from '@/components/ItemForm.vue';
    const autorGeneralesInstance = useAuthorsGeneralesQuery()
    autorGeneralesInstance.fetch()

    const categoriesInstance = useCategories()
    categoriesInstance.fetchCategories()

    const resourceTemplatesInstance = useResourceTemplates()
    resourceTemplatesInstance.fetch()
</script>
<style lang="scss" scoped>
  @forward "bulma/sass/elements/title";
</style>
