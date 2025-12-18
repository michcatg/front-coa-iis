<template>
  <p>
    <template v-for="(child, i) in children" :key="i">
      <strong v-if="child.bold">{{ child.text }}</strong>
      <template v-else>{{ child.text }}</template>
    </template>
  </p>
</template>
<script setup>
  const propos=defineProps({
    type: {
      type: String,
      required: false
    },
    children: {
      type: Array,
      required: false
    }
  })
</script>
