<template>
    <modal @close="emit('close')">
    <template #header>
      <div class="is-flex is-justify-content-space-between is-align-items-center" style="width: 100%">
        <h2 class="modal-card-title title is-3 mb-0 has-text-white">Agregar autor</h2>
          <button
            class="button is-rounded p-1 has-background-white has-text-primary"
            aria-label="close"
            @click="emit('close')">
            <font-awesome-icon :icon="faTimes"/>
          </button>
      </div>
    </template>
    <template #body>
      <!--
      <div v-if="isLoading">Cargando...</div>
      <div v-else-if="isError">Error al cargar la semblanza.</div>
      <div v-else>
      -->
        <autor-form
          @submit="emit('submit', $event)"
          @cancel="emit('close')"
        />
      <!--</div>-->
    </template>
  </modal>
</template>
<script setup>
  import { defineEmits } from "vue"
  import modal from '@/components/common/modal.vue'
  import autorForm from './AutorForm.vue'
  import { faTimes } from '@fortawesome/free-solid-svg-icons'

  const emit = defineEmits(["close", "submit"])
</script>
<style lang="scss" scoped>
  @forward "bulma/sass/elements/button";
</style>