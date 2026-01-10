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
                    @update:modelValue="validateField('categoria', data.categoria, errors)"
                />
            </div>
            <template v-if="errors.categoria">
                <p v-for="error in errors.categoria" class="help is-danger">{{ error }}</p>
            </template>
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
                        <autor-form-input
                            v-model="data.autores"
                            :autores="autores"
                            :last-added-autor-index="lastAddedAutorIndex"
                            @select-autor="setAutor($event)"
                        />
                        <template v-if="errors.autores">
                            <p v-for="error in errors.autores" class="help is-danger">{{ error }}</p>
                        </template>
                    </template>
                    <!-- FIN autor -->
                     <template v-else-if="propertyComponentTypes[property.id] === 'MULTITEXT'">
                        <custom-multitext-value-input
                            v-model="data.datosCatalogacion[toCamelCase(property.label)].value"
                            :id="toCamelCase(property.label)"
                            :name="toCamelCase(property.label)"
                            :delimiters="[';',  '|']"
                            @update:modelValue="validateField(toCamelCase(property.label), data.datosCatalogacion[toCamelCase(property.label)].value, errors)"
                        />
                        <template v-if="errors[toCamelCase(property.label)]">
                            <p v-for="error in errors[toCamelCase(property.label)]" class="help is-danger">{{ error }}</p>
                        </template>

                     </template>
                    <!-- INICIO otros tipos de propiedad -->
                    <template v-else>
                        <input
                            class="input"
                            :class="{ 'is-danger': errors[toCamelCase(property.label)] }"
                            :id="toCamelCase(property.label)"
                            :name="toCamelCase(property.label)"
                            type="text"
                            v-model="data.datosCatalogacion[toCamelCase(property.label)].value"
                            @input="validateField(toCamelCase(property.label), data.datosCatalogacion[toCamelCase(property.label)].value, errors)"
                        />

                        <template v-if="errors[toCamelCase(property.label)]">
                            <p v-for="error in errors[toCamelCase(property.label)]" class="help is-danger">{{ error }}</p>
                        </template>
                    </template>
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
                <template v-if="errors.archivo">
                    <p v-for="error in errors.archivo" class="help is-danger">{{ error }}</p>
                </template>
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
        <!--INICIO modals section-->
        <action-notification-modal
            v-if="createItem.state.isSuccess || createItem.state.isError"
            :type="(createItem.state.isSuccess) ? 'success' : 'danger'"
            @close="createItem.resetState()"
        >
            <font-awesome-icon :icon="createItem.state.isSuccess ? faCheckCircle : faExclamationCircle" class="mr-2" />
            {{ createItem.state.isSuccess ? 'El recurso ha sido creado exitosamente.' : 'Ha ocurrido un error al crear el recurso: ' + createItem.state.isError }}
        </action-notification-modal>
        <action-notification-modal
            v-if="createItem.state.isLoading"
            type="info"
            :is-dismissible="false"
        >
            <div class="loading-container">
                <div class="spinner"></div>
                <span class="ml-3">Enviando recurso, por favor espere...</span>
            </div>
        </action-notification-modal>
        <!--FIN modals section-->
    </form>
</template>
<script setup>
    import { reactive, ref, computed, watch } from 'vue'
    import { useCreateItem } from '@/composables/useCreateItem'
    import {
        SelectSercheable as CustomSelectInput,
        MultitextValue as CustomMultitextValueInput,
    } from 'vue-ui-kit'
    import { propertyComponentTypes } from '@/application/constants/propertyInputsComponents'
    import { toCamelCase } from '@/utils/stringHelpers'
    import { isPropertyAutor } from '@/application/helpers/omekasPropertiesHelper'
    import { faUpload, faCheckCircle, faExclamationCircle } from '@fortawesome/free-solid-svg-icons'
    import ActionNotificationModal from '@/shared/ActionNotificationModal.vue'
    import { validateForm, validateField } from '@/application/helpers/validateCreateItemFormHelper'
    import AutorFormInput from './partials/AutorFormInput.vue'

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
        },
        autores: {
            type: Array,
            default: []
        }
    })
    const lastAddedAutorIndex = ref(null)

    const createItem = useCreateItem()

    const data = reactive({
        datosCatalogacion: {},
        resourceTemplate: null,
        autores: [],
        categoria: null,
    })
    const archivos = ref([])
    const errors = reactive({})

    function setAutor(dataAutor) {
        if (!dataAutor || Object.keys(dataAutor).length === 0) {
            return
        }
        if (!data.autores) {
            data.autores = []
        }
        data.autores.push(dataAutor)
        lastAddedAutorIndex.value = data.autores.length - 1
    }
    watch (
        () => data.autores,
        () => {
            if (!data.autores) {
                return
            }
            validateField(
                'autores',
                [...data.autores],
                errors
            )
        },
        { deep: true }
    )
    const handleFormSubmit = async () => {
        if (!validateForm(
            errors,
            {
                categoria: data.categoria,
                titulo: data.datosCatalogacion['titulo']?.value,
                autores: data.autores,
                archivo: archivos.value,
            }
        )) {
            return
        }

        createItem.post({data: data, files: archivos.value})
    }
    const handleFileChange = (event) => {
        archivos.value = event.target.files[0]
        validateField('archivo', archivos.value, errors)
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

    watch(() => createItem.state.isSuccess, (isSuccess) => {
        if (isSuccess) {
            data.datosCatalogacion = {}
            data.resourceTemplate = null
            data.autores = []
            data.categoria = null
            archivos.value = []
            Object.keys(errors).forEach(key => delete errors[key])
        }
    })

</script>
<style lang="scss" scoped>
  @forward "bulma/sass/elements/button";
  @forward "bulma/sass/form";
  @forward "@/assets/sass/listChangesEffects.scss";
  @forward "@/assets/sass/loadingSpinner.scss";
</style>
