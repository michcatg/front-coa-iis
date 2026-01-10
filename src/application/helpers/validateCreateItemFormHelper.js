// TODO: Manejar dinámicamente con CMS y motor de validaciones
export const fieldsValidators = {
    categoria: (value) => {
        return {
            messages: ['La categoría es obligatoria'],
            isValid: value !== null && value !== undefined && value !== ''
        }
    },
    titulo: (value) => {
        return {
            messages: ['El título es obligatorio'],
            isValid: value !== null && value !== undefined && value !== ''
        }
    },
    archivo: (value) => {
        const MAX_SIZE = 50 * 1024 * 1024 // 50 MB en bytes
        const messages = []

        if (!(value !== null && value !== undefined && value instanceof File && value.size > 0)) {
            return {
                messages: ['El archivo es obligatorio'],
                isValid: false
            }
        }

        if (value.size > MAX_SIZE) {
            messages.push('El archivo no debe superar los 50 MB')
        }

        if (value.type !== 'application/pdf') {
            messages.push('El archivo debe ser un PDF')
        }

        return {
            messages: messages,
            isValid: messages.length === 0
        }
    },
    autores: (value) => {
        if (!Array.isArray(value)){
            return {
                messages: ['El formato de los autores es inválido'],
                isValid: false
            }
        }
        const correos = value.map(autor => autor.correoElectronico).filter(correo => correo)
        const correosUnicos = new Set(correos)
        return {
            messages: ['No se pueden registrar autores con correos electrónicos duplicados'],
            isValid: correos.length === correosUnicos.size
        }
    }
}
export function validateField(field,value, errors) {
    const validationResult = fieldsValidators[field] ?
        fieldsValidators[field](value) :
        true
    if (!validationResult.isValid) {
        errors[field] = validationResult.messages
    }else{
        delete errors[field]
    }
    return validationResult.isValid
}

export const validateForm = (errors, formData) => {
    // Limpiar errores previos
    Object.keys(errors).forEach(key => delete errors[key])
    let isValid = true
    
    // Iterar sobre los campos y validar
    for (const field in fieldsValidators) {
        const value = formData[field]
        const fieldIsValid = validateField(field, value, errors)
        isValid = isValid && fieldIsValid
    }
    return isValid
}