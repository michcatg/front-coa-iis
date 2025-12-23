/** TODO: Borrar porque se reemplaza con el contenido de api/ */
import { omekasBase } from '@/shared/infraestructure/OmekasBase';

const getItem = async (id) => {
  return await omekasBase.get(`items/${id}`)
}

export { getItem }