<template>
    <form @submit.prevent="handleFormSubmit">
        <div class="field">
            <label
                class="label"
                for="categoria"
            >
                Categoría
            </label>
            <div class="control">
                <custom-select-input
                    v-model="data.categoria"
                    :options="categories"
                    label-for="categoria"
                    key-value="id"
                    key-text="name"
                    placeholder="Seleccione una categoría"
                />
            </div>
        </div>
        <div>
            <label for="titulo">Título:</label>
            <input id="titulo" name="titulo" type="text" v-model="data.datosCatalogacion.title" />
            
        </div>
        <div>
            <label for="archivo">Archivo:</label>
            <input id="archivo" name="archivo" type="file" @change="handleFileChange" />
        </div>
        <div class="field is-grouped">
            <div class="control">
                <button
                    type="submit"
                    class="button is-primary"
                    role="button"
                >
                    Crear Recurso
                </button>
            </div>
        </div>
        <div v-if="createItem.state.isLoading">Enviando...</div>
        <div v-if="createItem.state.isError" style="color: red;">Error: {{ createItem.state.isError }}</div>
        <div v-if="createItem.state.isSuccess" style="color: green;">Recurso creado exitosamente!</div>
    </form>
</template>
<script setup>
    import { reactive, ref, computed } from 'vue'
    import { useCreateItem } from '@/composables/useCreateItem'
    import {
        SelectSercheable as CustomSelectInput,
    } from 'vue-ui-kit'

    const props = defineProps({
        /**
         * Lista de categorías disponibles para seleccionar
         * @type {Array<{id: number, name: string}>}
         * @example [{ id: 1, name: 'Libro', resourceTemplateSource: 1 }, { id: 2, name: 'Artículo', resourceTemplateSource: 3 }]
         */
        categories: {
            type: Array,
            required: true
        },
        /**
         * Lista de plantillas de recursos disponibles
         * @type {Array<{id: number, label: string, properties: Array<{id: number, label: string}>}>}
         * @example [{ id: 1, label: 'Libro', properties: [...] }, { id: 2, label: 'Artículo', properties: [...] }]
         */
        resourceTemplates: {
            type: Array,
            required: true,
        }
    })

    const createItem = useCreateItem()

    const data = reactive({
        datosCatalogacion: {
            title: ''
        },
        autores: [],
        categoria: null,
    })
    const archivos = ref([])
    const handleFormSubmit = async () => {
        createItem.post({data: data, files: archivos.value})
    }
    const handleFileChange = (event) => {
        archivos.value = event.target.files[0]
    }
    
    const resourceTemplateSelected = computed(() => {
        if (!data.categoria) {
            return null
        }
        return props.resourceTemplates.find(
            (template) => `${template.id}` === props.categories.find(
                (category) => category.id === data.categoria
            )?.resourceTemplateSource
        ) || null
    })

</script>
<style lang="scss" scoped>
  @forward "bulma/sass/elements/button";
  @forward "bulma/sass/form";
</style>
