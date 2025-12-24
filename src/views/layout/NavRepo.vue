<template>
    <nav class="navbar m-0 pl-5 pr-5" role="navigation" aria-label="main navigation">
        <div class="navbar-brand">
            <a
                class="navbar-item"
                rel="noopener noreferrer"
                href="https://www.iis.unam.mx/"
                target="_blank"
            >
                <!-- TODO: Arreglar espaciado del logo en escritorios que está muy pegado a la izquierda-->
                <img class="logo" src="@/assets/img/logo_iisunam_horizontal.png" />
            </a>
            <a
                role="button"
                :class="['navbar-burger', {'is-active': isActive}]"
                aria-label="menu"
                aria-expanded="false"
                data-target="navMenuRepo"
                @click="isActive = !isActive"
            >
                <span aria-hidden="true"></span>
                <span aria-hidden="true"></span>
                <span aria-hidden="true"></span>
                <span aria-hidden="true"></span>
                <span aria-hidden="true"></span>
            </a>
        </div>

        <div id="navMenuRepo" :class="['navbar-menu', {'is-active': isActive}]">
            <div class="navbar-end">
                <RouterLink to="/categories" class="navbar-item">
                    Categorías
                </RouterLink>
                <RouterLink to="/items" class="navbar-item">
                    Items
                </RouterLink>
            </div>
        </div>
    </nav>
</template>
<script setup>
    import { ref } from 'vue';
    import { RouterLink } from 'vue-router'
    const isActive = ref(false);
</script>
<style lang="scss" scoped>
    @use "@/assets/sass/_variables" as *;
    @forward "bulma/sass/components/navbar" with(
        $navbar-item-img-max-height: 2.75rem,
        $navbar-burger-color: $primary
    );

    nav {
        border-bottom: 1px solid #ddd;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    }

    .navbar-item {
        /*&:hover {
            color: $acento; // Aplica el color definido en _variables.scss para el hover
        }*/

        &.router-link-active {
            color: $primary;
            background: none;
        }
    }
</style>
