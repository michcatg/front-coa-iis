import { ref } from 'vue'
import { defineStore } from 'pinia'
import { strapiAuthService as authService} from '@/api/strapiAuth.js';

export const useAuthenticateUserStore = defineStore('authenticateUser', () => {
  const isAuthenticated = ref(authService.isAuthenticated());
  const currentUser = ref(localStorage.getItem('currentUser') ? JSON.parse(localStorage.getItem('currentUser')) : null);
  //const isAuthenticated = ref(false);

  async function authenticate(username, password) {
    await authService.login(username, password)
      .then(response => {
          isAuthenticated.value = authService.isAuthenticated();
          authService.getCurrentUser()
            .then(user => {
              currentUser.value = {...user};
              localStorage.setItem('currentUser', JSON.stringify(user))
            })
            .catch(error => {
              throw error
            });
          
      })
      .catch(error => {
          throw new Error(
              (error && error.name === 'ValidationError') ?
                  'Credenciales inválidas. Por favor, intente de nuevo.' :
                  'Error de inicio de sesión: Intente más tarde.'
          );
        });
  }

  function logout() {
    authService.logout()
    isAuthenticated.value = authService.isAuthenticated()
    localStorage.removeItem('currentUser')
  }

  return { isAuthenticated, currentUser, authenticate, logout }
})