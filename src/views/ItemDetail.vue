<template>
  <div class="container">
    <h1 class="title is-3 has-text-centered mb-5">Detalle del Ítem</h1>
    <div v-if="!id">
      <p class="notification is-warning">
        ID de ítem no proporcionado.
      </p>
    </div>
    <div v-else>
      <p class="notification is-info">
        Aquí se mostraría el detalle del ítem con ID: {{ id }}.
      </p>
    </div>
  </div>
</template>
<script setup>
  const props = defineProps({
    id: {
      type: Number,
      required: true
    }
  })
</script>
