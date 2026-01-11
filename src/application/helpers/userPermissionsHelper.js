// Cambiar todo para trabajar en backend
export function hasCreateItemPermission() {
    // TODO: Crear crear endpoint de validación de permisos en el backend
    return hasSession();
}

export function hasSession() {
    return localStorage.getItem('currentUser')? true : false;
}