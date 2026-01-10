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
                placeholder="Seleccione autores..."
            />
            <button
                type="button"
                class="button is-link is-light ml-2"
                @click="emit('select-autor', props.autores.find(autor => autor.id === autorSeleccionado)); autorSeleccionado = null"
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
            @click="emit('add-autor', true)"
            :disabled="isDisabled"
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
                    <button
                        type="button"
                        class="button is-danger is-small is-light"
                        @click="model.splice(index, 1)"
                    >
                        <FontAwesomeIcon class=" is-small mr-2" :icon="faTimes" />
                        Remover
                    </button>
                </li>
            </transition-group>
        </div>
    </div>
</template>
<script setup>
    import { defineEmits, computed, ref } from 'vue';
    import { faUserPlus, faUserTag, faTimes } from '@fortawesome/free-solid-svg-icons';
    import { SelectSercheable as CustomSelectInput } from 'vue-ui-kit'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
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
    const emit = defineEmits(['update:modelValue', 'add-autor', 'select-autor']);
    const autorSeleccionado = ref(null);
    const isDisabled = computed(() => {
        return props.autores.length === 0;
    });
    const autoresTransformados = computed(() => {
        return props.autores.map(autor => ({
            id: autor.id,
            labels: `${autor.nombres} ${autor.primerApellido} ${autor.segundoApellido} (${autor.correoElectronico})`
        }))
    })
</script>
<style lang="scss" scoped>
  @forward "bulma/sass/elements/button";
  @forward "bulma/sass/form";
  @forward "@/assets/sass/listChangesEffects.scss";
</style>