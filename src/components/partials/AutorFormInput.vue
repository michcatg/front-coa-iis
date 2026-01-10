<template>
    <div>
        <div
            class="mb-2 is-flex is-justify-content-flex-start is-align-items-center gap-2"
            aria-label="Acciones sobre la asignación de autores al item"
        >
            <custom-select-input
                v-model="autorSeleccionado"
                :options="autoresTransformados"
                label-for="autor"
                key-value="id"
                key-text="labels"
                multiple
                :disabled="autoresTransformados.length === 0"
                :placeholder="(autoresTransformados.length === 0) ? 'No hay autores disponibles' : 'Seleccione autores...'"
            />
            <button
                type="button"
                :class="['button', 'is-light', 'ml-2', isDisabled ? 'disabled' : 'is-link']"
                :disabled="isDisabled"
                @click="emit(
                    'select-autor', (autorSeleccionado) ?
                        props.autores.find(autor => autor.id === autorSeleccionado) :
                        {}
                ); autorSeleccionado = null
                "
            >
                <span class="icon is-small mr-1">
                    <font-awesome-icon :icon="faUserTag" />
                </span>
                Agregar selección
            </button>
        </div>
        <button
            class="button is-info is-light"
            type="button"
            @click="isAddingAutor = true"
        >
            <span class="icon is-small mr-1">
                <font-awesome-icon :icon="faUserPlus" />
            </span>
            <span>Registrar nuevo no listado</span>
        </button>
        <div v-if="model?.length" class="content">
            <p>Autores que se asignarán:</p>
            <transition-group
                name="list"
                tag="ul"
            >
                <li
                    v-for="(autor, index) in model"
                    :key="index"
                    :class="{ 'is-last-selected': index === lastAddedAutorIndex }"
                >
                    {{ autor.nombres }} {{ autor.primerApellido }} {{ autor.segundoApellido }} ({{ autor.correoElectronico }})
                    <span v-if="!props.autores.some(a => a.correoElectronico === autor.correoElectronico)" class="tag is-info ml-2 mr-2">nuevo</span>
                    <button
                        type="button"
                        class="button is-danger is-small is-light"
                        @click="model.splice(index, 1)"
                    >
                        Remover
                        <span class="icon is-small ml-1">
                            <font-awesome-icon :icon="faTimes" />
                        </span>
                    </button>
                </li>
            </transition-group>
        </div>
        <autor-form-modal
            v-if="isAddingAutor"
            @submit="emit('select-autor', $event); isAddingAutor=false"
            @close="isAddingAutor=false"
        />
    </div>
</template>
<script setup>
    import { defineEmits, computed, ref } from 'vue';
    import { faUserPlus, faUserTag, faTimes } from '@fortawesome/free-solid-svg-icons';
    import { SelectSercheable as CustomSelectInput } from 'vue-ui-kit'
    import AutorFormModal from '@/components/AutorFormModal.vue'
    import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
    const isAddingAutor = ref(false);
    const props = defineProps({
        lastAddedAutorIndex: {
            type: Number,
            default: null
        },
        autores: {
            type: Array,
            default: []
        }
    })
    const model = defineModel()
    const emit = defineEmits(['update:modelValue', 'select-autor']);
    const autorSeleccionado = ref(null);
    const isDisabled = computed(() => {
        return props.autores.length === 0 || autorSeleccionado.value === null;
    });
    const autoresTransformados = computed(() => {
        // Filtrar autores que ya están en el model (comparando por correoElectronico)
        return props.autores
            .filter(autor => !model.value?.some(a => a.correoElectronico === autor.correoElectronico))
            .map(autor => ({
                id: autor.id,
                labels: `${autor.nombres} ${autor.primerApellido} ${autor.segundoApellido} (${autor.correoElectronico})`
            }))
    })
</script>
<style lang="scss" scoped>
  @forward "bulma/sass/elements/button";
  @forward "bulma/sass/elements/tag";
  @forward "bulma/sass/form";
  @forward "@/assets/sass/listChangesEffects.scss";
</style>
