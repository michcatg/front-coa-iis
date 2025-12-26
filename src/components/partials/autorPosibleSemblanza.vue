<template>
  <div>
    <template v-if="typeof author === 'string'">
      {{ author }}
      <small class="tag is-info is-light is-rounded" aria-label="Sin semblanza" title="Sin semblanza" role="status">Sin semblanza</small>
    </template>
    <template v-else>
      {{ author.nombreCompleto }}
      <button
        class="has-text-link"
        @click="emit('view-author', author)"
        role="button"
      >
        <font-awesome-icon :icon="faFile" /> Ver semblanza
      </button>
    </template>
  </div>
</template>
<script setup>
  import { defineEmits, defineProps } from 'vue';
  import { faFile } from '@fortawesome/free-solid-svg-icons';

  const props = defineProps({
    author: {
      type: [String, Object],
      required: true
    }
  });

  const emit = defineEmits(["view-author"]);
</script>
<style lang="scss" scoped>
  @forward "bulma/sass/elements/button";
  @forward "bulma/sass/elements/tag";
</style>
