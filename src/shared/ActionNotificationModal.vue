<template>
  <modal @close="emit('close')">
    <template #body>
      <div>
        <div class="is-flex is-justify-content-right is-align-items-center" style="width: 100%">
          <!--<h2 class="modal-card-title title is-3 mb-0 has-text-white"></h2>-->
            <button
              :class="`button is-rounded is-ghost p-1 has-text-${type} has-text-weight-bold close-button`"
              style="border: none;"
              aria-label="close"
              @click="emit('close')">
              <font-awesome-icon :icon="faTimes"/>
            </button>
        </div>
        <div :class="`has-text-${type} text-darkened`">
          <slot></slot>
        </div>
      </div>
    </template>
  </modal>
</template>
<script setup>
  import { defineEmits } from "vue"
  import modal from '@/components/common/modal.vue'
  import { faTimes } from '@fortawesome/free-solid-svg-icons'
  const emit = defineEmits(["close"])
  const props = defineProps({
    /**
     * Tipo de notificación (info, success, warning, error)
     */
    type: {
      type: String,
      default: 'info'
    },
  })
</script>
<style lang="scss" scoped>
  @forward "bulma/sass/elements/button";

  .close-button {
    transition: all 0.3s ease;
    
    &:hover {
      transform: scale(1.2);
      background-color: rgba(0, 0, 0, 0.05) !important;
      cursor: pointer;
    }
  }
</style>