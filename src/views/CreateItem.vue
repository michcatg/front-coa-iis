<template>
    <section class="section container">
        aquí va el registro de recursos
        catálogo de autores
        <pre>
            {{  autorGeneralesInstance.authors }}
        </pre>
        <select v-model="autorSeleccionado">
            <option v-for="autor in autoresEjemplo" :key="autor.id" :value="autor">
                {{ autor.nombres }} {{ autor.primerApellido }} {{ autor.segundoApellido }}
            </option>
        </select>
        select personalizado
        <custom-select
            v-model="autorSeleccionado"
            :options="autoresEjemplo"
            label-for="autor"
            key-value="id"
            key-text="nombres"
        />esto
    </section>
</template>
<script setup>
    import { ref } from 'vue'
    import { useAuthorsGeneralesQuery } from '@/composables/useAuthorsGeneralesQuery'
    import { SelectSercheable as CustomSelect } from 'vue-ui-kit'
    import { useCategories } from '@/composables/useCategories';
    import 'vue-ui-kit/dist/vue-ui-kit.css';
    const autorGeneralesInstance = useAuthorsGeneralesQuery()
    autorGeneralesInstance.fetch()
    const autorSeleccionado = ref(null);

    const categoriesInstance = useCategories()
    categoriesInstance.fetchCategories()

    const autoresEjemplo = [
        {
            id: 1,
            nombres: "Juan Carlos",
            primerApellido: "García",
            segundoApellido: "López",
            gradoAcademico: "Dr.",
            correoElectronico: "juan.garcia@ejemplo.com"
        },
        {
            id: 2,
            nombres: "María Elena",
            primerApellido: "Rodríguez",
            segundoApellido: "Martínez",
            gradoAcademico: "Dra.",
            correoElectronico: "maria.rodriguez@ejemplo.com"
        },
        {
            id: 3,
            nombres: "Carlos Alberto",
            primerApellido: "Hernández",
            segundoApellido: "Pérez",
            gradoAcademico: "Mtro.",
            correoElectronico: "carlos.hernandez@ejemplo.com"
        },
        {
            id: 4,
            nombres: "Ana Sofía",
            primerApellido: "González",
            segundoApellido: "Sánchez",
            gradoAcademico: "Mtra.",
            correoElectronico: "ana.gonzalez@ejemplo.com"
        },
        {
            id: 5,
            nombres: "Luis Fernando",
            primerApellido: "Ramírez",
            segundoApellido: "Torres",
            gradoAcademico: "Dr.",
            correoElectronico: "luis.ramirez@ejemplo.com"
        }
    ]
</script>
