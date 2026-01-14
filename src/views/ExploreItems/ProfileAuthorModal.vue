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
      <message v-if="!author || isLoading || isError"
      :type="isError ? 'danger' : 'info'"
    >
      <template v-if="isError">Ha ocurrido un error al cargar la semblanza. Por favor, inténtalo de nuevo más tarde.</template>
      <template v-else-if="isLoading">Cargando semblanza...</template>
      <template v-else>No se encontró semblanza de la persona autora.</template>
    </message>
      <div v-else>
        <autor-semblanza
          v-if="author"
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
  import Message from "@/shared/presentation/Message.vue"

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
