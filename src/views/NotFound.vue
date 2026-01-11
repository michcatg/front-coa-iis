<template>
    <section class="section container">
        <h1 class="title is-3 mb-3">Página no encontrada</h1>
        <p>La página que está buscando no existe.</p>
        <p class="mb-5">Por favor, utilice el menú para navegar.</p>
        <RouterLink to="/" class="button is-primary">
            Ir a la página principal
        </RouterLink>
    </section>
</template>
<script setup>
import { RouterLink } from 'vue-router'

</script>
<style lang="scss" scoped>
  @forward "bulma/sass/elements/title";
  @forward "bulma/sass/elements/button";
</style>
