<template>
    <form @submit.prevent="handleFormSubmit">
        <div>
            <label for="titulo">Título:</label>
            <input id="titulo" name="titulo" type="text" v-model="data.datosCatalogacion.title" />
            
        </div>
        <div>
            <label for="archivo">Archivo:</label>
            <input id="archivo" name="archivo" type="file" @change="handleFileChange" />
        </div>
        <div>
            <button type="submit">
                Crear Recurso
            </button>
        </div>
        <div v-if="createItem.state.isLoading">Enviando...</div>
        <div v-if="createItem.state.isError" style="color: red;">Error: {{ createItem.state.isError }}</div>
        <div v-if="createItem.state.isSuccess" style="color: green;">Recurso creado exitosamente!</div>
    </form>
</template>
<script setup>
    import { reactive, ref } from 'vue'
    import { useCreateItem } from '@/composables/useCreateItem'
    const createItem = useCreateItem()

    const data = reactive({
        datosCatalogacion: {
            title: ''
        },
        autores: [],
    })
    const archivos = ref([])
    const handleFormSubmit = async () => {
        createItem.post({data: data, files: archivos.value})
    }
    const handleFileChange = (event) => {
        archivos.value = event.target.files[0]
    }
    

</script>
