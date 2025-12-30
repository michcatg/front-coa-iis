<template>
    <section class="section container">
        aquí va el registro de recursos
        catálogo de autores
        <pre>
            {{  autores }}
        </pre>
    </section>
</template>
<script setup>
    console.log('hola mundo')
    import { ref } from 'vue'
    import { getAuthorsGeneral } from '@/api/strapiService'
    import { AutorGeneralDto } from '@/application/dtos/AutorGeneralDto'
    import { toSnakeCase } from '@/utils/stringHelpers'

    const autores = ref()
    async function getAutores() {
        const autorBase = new AutorGeneralDto({})
        console.log('array:')
        console.log(Object.keys(autorBase).map(toSnakeCase))
        const response = await getAuthorsGeneral({
            fields: Object.keys(autorBase).map(toSnakeCase),
            q: 'query'
        })
        console.log(response)
        autores.value = response.data
    }
    getAutores()
</script>