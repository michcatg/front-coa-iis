<template>
  <modal @close="emit('close')">
    <template #header>
      <div class="is-flex is-justify-content-space-between is-align-items-center" style="width: 100%">
        <h2 class="modal-card-title title is-3 mb-0 has-text-white">Semblanza</h2>
          <button
            class="button is-rounded p-1 has-background-white has-text-primary"
            aria-label="close"
            @click="emit('close')">
            <font-awesome-icon :icon="faTimes"/>
          </button>
      </div>
    </template>
    <template #body>
      <div v-if="isLoading">Cargando...</div>
      <div v-else-if="isError">Error al cargar la semblanza.</div>
      <div v-else>
        <autor-semblanza
          :author="author"
        />
      </div>
    </template>
    <template #footer>
      <button class="button is-link" @click="emit('close')">Cerrar</button>
    </template>
  </modal>
</template>
<script setup>
  import { defineEmits } from "vue"
  import modal from '@/components/common/modal.vue'
  import autorSemblanza from '@/components/partials/autorSemblanza.vue'
  import { faTimes } from '@fortawesome/free-solid-svg-icons'

  const emit = defineEmits(["close"])
  const props = defineProps({
    author: {
      type: Object
    },
    isLoading: {
      type: Boolean,
      default: false
    },
    isError: {
      type: Boolean,
      default: false
    }
  })
</script>
<style lang="scss" scoped>
  @forward "bulma/sass/elements/button";
</style>
