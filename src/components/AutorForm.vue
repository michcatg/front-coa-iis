<template>
    <form @submit.prevent="submit">
        <div class="field mb-4">
            <label
                class="label"
                for="nombres"
            >
                Nombres
            </label>
            <div class="control">
                <input
                    required
                    class="input"
                    id="nombres"
                    name="nombres"
                    type="text"
                    v-model="data.nombres"
                />
            </div>
        </div>
        <div class="field mb-4">
            <label
                class="label"
                for="primerApellido"
            >
                Primer apellido
            </label>
            <div class="control">
                <input
                    required
                    class="input"
                    id="primerApellido"
                    name="primerApellido"
                    type="text"
                    v-model="data.primerApellido"
                />
            </div>
        </div>
        <div class="field mb-4">
            <label
                class="label"
                for="segundoApellido"
            >
                Segundo apellido
            </label>
            <div class="control">
                <input
                    class="input"
                    id="segundoApellido"
                    name="segundoApellido"
                    type="text"
                    v-model="data.segundoApellido"
                />
            </div>
        </div>
        <div class="field mb-4">
            <label
                class="label"
                for="gradoAcademico"
            >
                Grado Académico
            </label>
            <div class="control">
                <input
                    class="input"
                    id="gradoAcademico"
                    name="gradoAcademico"
                    type="text"
                    v-model="data.gradoAcademico"
                />
            </div>
        </div>
        <div class="field mb-4">
            <label
                class="label"
                for="correoElectronico"
            >
                Correo electrónico
            </label>
            <div class="control">
                <input
                    class="input"
                    id="correoElectronico"
                    name="correoElectronico"
                    type="email"
                    v-model="data.correoElectronico"
                />
            </div>
        </div>
        <div class="field mb-4">
            <label
                class="label"
                for="perfil"
            >
                Perfil
            </label>
            <div class="control">
                <custom-textarea-input
                    itemId="perfil"
                    itemName="perfil"
                    v-model="data.perfil"
                    :maxLengthValue="500"
                    placeholder="Escribe una breve semblanza del autor..."
                />
            </div>
        </div>
        <div class="field is-grouped">
            <div class="control">
                <button
                    type="submit"
                    class="button is-primary is-light"
                    role="button"
                >
                    Agregar
                </button>
            </div>
        </div>
    </form>
</template>
<script setup>
    import { defineEmits, reactive } from 'vue';
    import { CustomTextarea as CustomTextareaInput } from 'vue-ui-kit';
    const emit = defineEmits(['submit']);
    const data = reactive({
        nombres: '',
        primerApellido: '',
        segundoApellido: '',
        gradoAcademico: '',
        correoElectronico: '',
        perfil: '',
        entidadAcademica: 1
    });

    function submit() {
        emit('submit', { ...data });
        data.nombres = '';
    }
</script>
<style lang="scss" scoped>
  @forward "bulma/sass/elements/button";
  @forward "bulma/sass/form";
</style>
