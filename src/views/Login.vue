<template>
    <section class="section container">
        <h1 class="title is-3 mb-3">Bienvenido a la biblioteca digital</h1>
        <p class="mb-5">Por favor, inicie sesión para continuar.</p>
        <form @submit.prevent="handleSubmit">
            <div class="field">
                <label class="label">Nombre de usuario</label>
                <div class="control">
                    <input
                        class="input"
                        type="text"
                        placeholder="Ingrese su nombre de usuario"
                        v-model="username"
                        required
                    />
                </div>
            </div>
            <div class="field">
                <label class="label">Contraseña</label>
                <div class="control has-icons-right" style="position: relative;">
                    <input
                        class="input"
                        :type="showPassword ? 'text' : 'password'"
                        placeholder="Ingrese su contraseña"
                        autocomplete="off"
                        autocorrect="off"
                        autocapitalize="off"
                        spellcheck="false"
                        v-model="password"
                        required
                    />
                    <button
                        type="button"
                        class="button is-small password-toggle"
                        @click="showPassword = !showPassword"
                        tabindex="-1"
                        style="position: absolute; right: 0.5rem; top: 50%; transform: translateY(-50%);"
                        aria-label="Mostrar/ocultar contraseña"
                    >
                        -
                        <span class="icon">
                            <font-awesome-icon :icon="passwordIcon" />
                        </span>
                    </button>
                </div>
            </div>
            <div class="field mt-5">
                <div class="control">
                    <button class="button is-primary" type="submit">Iniciar sesión</button>
                </div>
            </div>
        </form>
        <action-notification-modal
            v-if="loginError"
            type="danger"
            @close="loginError = null"
        >
            <font-awesome-icon :icon="faExclamationCircle" class="mr-2" />
            <span class="ml-3">{{ loginError }}</span>
        </action-notification-modal>
        <action-notification-modal
            v-if="isLoading"
            type="info"
            :isDismissible="false"
            @close="loginError = null"
        >
            <div class="loading-container">
                <div class="spinner"></div>
                <span class="ml-3">Validando datos</span>
            </div>
        </action-notification-modal>
    </section>
</template>
<script setup>
import { ref, computed } from 'vue';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import ActionNotificationModal from '@/shared/ActionNotificationModal.vue';
import { faExclamationCircle } from '@fortawesome/free-solid-svg-icons';
import { useAuthenticateUserStore } from '@/stores/useAuthenticateUser';
import { useRouter } from 'vue-router';
const router = useRouter();
const showPassword = ref(false);

const passwordIcon = computed(() => showPassword.value ? faEyeSlash : faEye);
const authStore = useAuthenticateUserStore();

const password = ref("");
const username = ref("");
const loginError = ref(null);
const isLoading = ref(false);

async function handleSubmit() {
    loginError.value = null;
    isLoading.value = true;
    try {
        await authStore.authenticate(username.value, password.value)
        router.push({ name: 'home' });
    }catch (error) {
        password.value = "";
        username.value = "";
        loginError.value = error.message || "Error al iniciar sesión. Por favor, intente nuevamente.";
    } finally {
        isLoading.value = false;
    }
}

</script>
<style lang="scss" scoped>
  @forward "bulma/sass/elements/title";
  @forward "bulma/sass/elements/button";
  @forward "bulma/sass/form";
  @forward "@/assets/sass/loadingSpinner.scss";
  .password-toggle {
    border: none;
    background: transparent;
    box-shadow: none;
    padding: 0 0.25rem;
    cursor: pointer;
  }
</style>
