import { omekasBase } from '@/shared/infraestructure/OmekasBase';

const getItem = async (id) => {
  console.log(omekasBase.baseUrl);
  return await omekasBase.get(`items/${id}`)
}

export { getItem }