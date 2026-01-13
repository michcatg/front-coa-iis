const isProdConfig = typeof window !== 'undefined' && window.__APP_CONFIG__;

export function getOmekasUrl() {
  if (typeof window !== 'undefined' && window.__APP_CONFIG__ && window.__APP_CONFIG__.OMEKAS_MAIN_URL) {
    return window.__APP_CONFIG__.OMEKAS_MAIN_URL;
  }
  return import.meta.env.VITE_OMEKAS_MAIN_URL;
}

export function getStrapiUrl() {
  if (typeof window !== 'undefined' && window.__APP_CONFIG__ && window.__APP_CONFIG__.STRAPI_API_URL) {
    return window.__APP_CONFIG__.STRAPI_API_URL;
  }
  return import.meta.env.VITE_STRAPI_API_URL;
}

export function getStrapiApiKey() {
  if (typeof window !== 'undefined' && window.__APP_CONFIG__ && window.__APP_CONFIG__.STRAPI_API_KEY) {
    return window.__APP_CONFIG__.STRAPI_API_KEY;
  }
  return import.meta.env.VITE_STRAPI_API_KEY;
}
