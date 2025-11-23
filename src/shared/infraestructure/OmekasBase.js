
/* TODO: Borrar porque se reemplaza con api/OomekasService */
import {get} from './apiBase.js';
const baseUrl = 'https://test-omekas.aglaonema.mx/api';

const omekasBase = {
  baseUrl: baseUrl,
  get: async (endpoint, params, options = {}) => {
    return await get(baseUrl, endpoint, params, options);
  },
}

export { omekasBase };