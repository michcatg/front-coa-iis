<template>
    <section class="section container">
        aquí va el registro de recursos
        catálogo de autores
        <pre>
            {{  autorGeneralesInstance.authors }}
        </pre>
    </section>
</template>
<script setup>
    import { useAuthorsGeneralesQuery } from '@/composables/useAuthorsGeneralesQuery'
    const autorGeneralesInstance = useAuthorsGeneralesQuery()
    autorGeneralesInstance.fetch()
</script>
