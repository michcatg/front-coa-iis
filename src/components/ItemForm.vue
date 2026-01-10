<template>
    <form @submit.prevent="handleFormSubmit">
        <div class="field mb-4">
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
        <!-- INICIA DATOS DE CATALOGACIÓN -->
        <template v-if="resourceTemplateSelected">
            <div
                v-for="property in resourceTemplateSelected.properties"
                :key="property.id"
                class="field mb-4"
            >
                <label
                    class="label"
                    :for="toCamelCase(property.label)"
                >
                    {{ property.label }}
                </label>
                <div class="control">
                    <!-- INICIO autor -->
                    <template v-if="isPropertyAutor(property.id)">
                        <button
                            type="button"
                            class="button is-link is-light mb-2"
                            @click="isAddingAutor = true"
                        >
                            Agregar autor
                        </button>
                        <div v-if="data.autores?.length" class="content">
                            <ul>
                                <li
                                    v-for="(autor, index) in data.autores"
                                    :key="index"
                                >
                                    {{ autor.nombres }} {{ autor.primerApellido }} {{ autor.segundoApellido }}
                                    <button
                                        type="button"
                                        class="button is-danger is-small is-outlined is-light"
                                        @click="data.autores.splice(index, 1)"
                                    >
                                        Remover
                                    </button>
                                </li>
                            </ul>
                        </div>
                    </template>
                    <!-- FIN autor -->
                    <!-- INICIO otros tipos de propiedad -->
                        <input
                            v-else
                            class="input"
                            :id="toCamelCase(property.label)"
                            :name="toCamelCase(property.label)"
                            type="text"
                            v-model="data.datosCatalogacion[toCamelCase(property.label)].value"
                        />
                    <!-- FIN otros tipos de propiedad -->
                </div>
            </div>
        </template>
        <!-- TERMINA DATOS DE CATALOGACIÓN -->
        <div class="field mb-4">
            <label
                class="label"
                for="archivo"
            >
                Archivo
            </label>
            <div class="control mb-4">
                <div class="file is-link has-name">
                    <label class="file-label">
                        <input id="archivo" class="file-input" name="archivo" type="file" @change="handleFileChange" />
                        <span class="file-cta">
                        <span class="file-icon">
                            <font-awesome-icon :icon="faUpload" />
                        </span>
                        <span class="file-label"> Seleccione un archivo… </span>
                        </span>
                        <span class="file-name"> {{ archivos ? archivos.name : '' }} </span>
                </label>
                </div>
            </div>
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
        <autor-form-modal
            v-if="isAddingAutor"
            @submit="(dataAutor) => {
                if (!data.autores) {
                    data.autores = []
                }
                data.autores.push(dataAutor)
                isAddingAutor = false
            }"
            @close="isAddingAutor=false"
        />
    </form>
</template>
<script setup>
    import { reactive, ref, computed } from 'vue'
    import { useCreateItem } from '@/composables/useCreateItem'
    import {
        SelectSercheable as CustomSelectInput,
    } from 'vue-ui-kit'
    import { getComponentById, getInputTypeById } from '@/application/constants/propertyInputsComponents'
    import { toCamelCase } from '@/utils/stringHelpers'
    import { isPropertyAutor } from '@/application/helpers/omekasPropertiesHelper'
    import AutorFormModal from './AutorFormModal.vue'
    import { faUpload } from '@fortawesome/free-solid-svg-icons'

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
    const isAddingAutor = ref(false)

    const createItem = useCreateItem()

    const data = reactive({
        datosCatalogacion: {},
        resourceTemplate: null,
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
    /*function handleUpdateInput(property) {
        const key = toCamelCase(property.label)
        data.datosCatalogacion[key] = 
    }*/
    
    const resourceTemplateSelected = computed(() => {
        if (!data.categoria) {
            return null
        }

        const template = props.resourceTemplates.find(
            (template) => `${template.id}` === props.categories.find(
                (category) => category.id === data.categoria
            )?.resourceTemplateSource
        ) || null

        if (template) {
            data.datosCatalogacion = {}
            template.properties.forEach(property => {
                const key = toCamelCase(property.label)
                data.datosCatalogacion[key] = {
                    propertyId: property.id,
                    value: ''
                }
            })
        }
        data.resourceTemplate = template ? template.id : null
        return template
    })
</script>
<style lang="scss" scoped>
  @forward "bulma/sass/elements/button";
  @forward "bulma/sass/form";
</style>
