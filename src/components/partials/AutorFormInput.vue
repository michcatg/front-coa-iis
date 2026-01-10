<template>
    <div>
        <button
            type="button"
            class="button is-link is-light mb-2"
            @click="emit('add-autor', true)"
        >
            Agregar autor
        </button>
        <div v-if="model?.length" class="content">
            <transition-group
                name="list"
                tag="ul"
            >
                <li
                    v-for="(autor, index) in model"
                    :key="index"
                    :class="{ 'is-last-selected': index === lastAddedAutorIndex }"
                >
                    {{ autor.nombres }} {{ autor.primerApellido }} {{ autor.segundoApellido }}
                    <button
                        type="button"
                        class="button is-danger is-small is-outlined is-light"
                        @click="model.splice(index, 1)"
                    >
                        Remover
                    </button>
                </li>
            </transition-group>
        </div>
        
    </div>
</template>
<script setup>
import { defineEmits } from 'vue';
    const props = defineProps({
        lastAddedAutorIndex: {
            type: Number,
            default: null
        }
    })
    const model = defineModel()
    const emit = defineEmits(['update:modelValue', 'add-autor']);
</script>
<style lang="scss" scoped>
  @forward "bulma/sass/elements/button";
  @forward "bulma/sass/form";
  @forward "@/assets/sass/listChangesEffects.scss";
</style>