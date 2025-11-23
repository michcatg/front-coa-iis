<template>
  <div>
    Este es el contenido recuperado del item:
    <br>
    Item Id: {{ itemId }}
    <br>
    Item content:
    <pre>
      {{ item }}
    </pre>
  </div>
</template>
<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { getItem } from './api/items.js'; // Asegúrate de que la ruta sea correcta

const item = ref({});

onMounted(async () => {
  if (itemId) {
    item.value = await getItem(itemId);
  }
});

const route = useRoute();
const itemId = route.params.id; // Recupera el ID de la URL
</script>