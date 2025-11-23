
import {get} from './apiBase.js';
// TODO: Cargar desde env
// TODO: Arreglar cors
const baseUrl = 'https://test-omekas.aglaonema.mx/api';

const omekasBase = {
  baseUrl: baseUrl,
  get: async (endpoint, params, options = {}) => {
    return await get(baseUrl, endpoint, params, options);
  },
}

export { omekasBase };