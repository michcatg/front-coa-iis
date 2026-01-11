<template>
    <section class="section container">
        <h1 class="title is-3 mb-3">Sesión finalizada</h1>
        <p>Ha cerrado sesión correctamente.</p>
        <p class="mb-5">Por favor, inicie sesión para continuar.</p>
        <RouterLink to="/login" class="button is-primary">
            Iniciar sesión
        </RouterLink>
    </section>
</template>
<script setup>
import { useAuthenticateUserStore } from '@/stores/useAuthenticateUser';
import { RouterLink } from 'vue-router'
const authStore = useAuthenticateUserStore();
authStore.logout();

</script>
<style lang="scss" scoped>
  @forward "bulma/sass/elements/title";
  @forward "bulma/sass/elements/button";
</style>
