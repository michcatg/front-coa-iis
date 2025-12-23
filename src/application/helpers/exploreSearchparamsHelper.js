import { ExploreSearchParamsDto } from '@/application/dtos/ExploreSearchParamsDto.js'
/**
 * Funciones del helper para transformar los parámetros de búsqueda que usa el router
 * de Explore Items
 */


export function fromQueryParams(query) {
  const params = new ExploreSearchParamsDto({
    fullText: formFulltextParam(query),
    categories: formCategoriesParam(query).split(',').filter(cat => cat.trim() !== ''),
  });
  // Eliminar llaves con cadena vacía o arreglo vacío
  Object.keys(params).forEach(key => {
    const val = params[key]
    if (!val || val === '' || (Array.isArray(val) && val.length === 0)) {
      delete params[key]
    }
  })
  return {
    ...params,
    ...formPropertyParam(query)
  };
}
/*
  const params = formPropertyParam(query)
  const fullText = formFulltextParam(query)
  if (fullText) params.fullText = fullText
  const categories = formCategoriesParam(query)
  if (categories) params.categories = categories.split(',').filter(cat => cat.trim() !== '')
  return params
}
/*  return {
    fullText: formFulltextParam(query),
    ...formPropertyParam(query),
    categories: formCategoriesParam(query).split(',').filter(cat => cat.trim() !== '')
  }
}*/

function formCategoriesParam(query) {
  if (query.categories && Array.isArray(query.categories) && query.categories.length > 0) {
    return query.categories.join(',')
  }
  return ''
}

// Búsqueda fulltext (texto completo)
function formFulltextParam(query) {
  if (query.fulltext_search && typeof query.fulltext_search === 'string') {
    return query.fulltext_search
  }
  return null
}

// Búsqueda por valor (propiedades Omekas)
export function formPropertyParam(query) {
  if (query.property && Array.isArray(query.property) && query.property.length > 0) {
    const params = {}
    query.property.forEach((prop, index) => {
      Object.keys(prop).forEach(key => {
        params[`property[${index}][${key}]`] = prop[key];
      });
    });
    return params;
  }
  return {};
}
