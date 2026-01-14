<template>
    <article class="message" :class="`is-${props.type}`">
        <div class="message-body">
            <slot></slot>
        </div>
    </article>
</template>
<script setup>
import { defineProps } from 'vue'

  const props = defineProps({    
    type: {
      type: String,
      default: 'info' // link, primary, info, success, warning, danger
    }
  })
</script>
<style lang="scss" scoped>
  @forward "bulma/sass/components/message";
</style>
