<template>
  <div class="modal is-active">
    <div
      class="modal-background"
      @click="emitClose"
    ></div>
    <div class="modal-card">
      <header class="modal-card-head" v-if="$slots.header">
        <slot name="header">
          <button class="delete" aria-label="close"></button>
        </slot>
      </header>
      <section class="modal-card-body">
        <slot name="body">
          <slot name="content"></slot>
        </slot>
      </section>
      <footer class="modal-card-foot" v-if="$slots.footer">
        <slot name="footer"></slot>
      </footer>
    </div>
  </div>
</template>
<script setup>
  import { defineEmits } from 'vue';

  const emit = defineEmits(['close']);

  function emitClose() {
    emit('close');
  }
</script>
<style lang="scss" scoped>
  @forward "bulma/sass/components/modal";
</style>
