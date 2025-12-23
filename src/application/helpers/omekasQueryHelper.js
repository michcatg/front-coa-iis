import { searchOperators } from '@/application/constants/omekasSearchOperations';

export function cleanValueQuery(query, isUnique=false) {
  query.logicConnector =  (isUnique || !query.logicConnector) ? 'and' : query.logicConnector.trim();
  query.term = query.term;
  const operandSelected = searchOperators.find(op => op.value === query.operand);

  query.value = operandSelected && operandSelected.operands === 1
    ? query.value.trim()
    : '';
  query.operand = operandSelected?.value.trim();

  return query;
}

export function cleanQueryArray(queries) {
  return queries
    .map(query => cleanValueQuery(query))
    .filter(query => isValidQuery(query)); 
}

export function isValidQuery(query) {
  return query.term && query.operand && (query.value || ['ex', 'nex'].includes(query.operand));
}

export function getFullQuery({ fullText, searchQuery }) {
  const cleanedQueries = cleanQueryArray(searchQuery);
  if (typeof fullText === 'string') {
    fullText = fullText.trim();
  }
  let queryParts = {};

  if (fullText) {
    queryParts.fulltext_search = fullText.trim();
  }
  if (cleanedQueries.length > 0) {
    queryParts.property = [...cleanedQueries.map(getValueQuery)];
  }

  return queryParts;
}

export function getValueQuery(query) {
  return {
    joiner: query.logicConnector,
    property: query.term,
    type: query.operand,
    ...(query.value ? { text: query.value } : {})
  }
}

export function transformSearchOptionsToUrlParams(searchOptions) {
  const params = {};
/*
  // Agregar las categorias como un solo string separado por comas
  if (searchOptions.categories && searchOptions.categories.length > 0) {
    params.categories = searchOptions.categories.join(',');
  }
*/
  // Agregar el fulltext_search si existe
  if (searchOptions.fullQuery.fulltext_search) {
    params.fulltext_search = searchOptions.fullQuery.fulltext_search;
  }

  // Agregar las propiedades (property array)
  if (searchOptions.fullQuery.property && searchOptions.fullQuery.property.length > 0) {
    searchOptions.fullQuery.property.forEach((prop, index) => {
      Object.keys(prop).forEach(key => {
        params[`property[${index}][${key}]`] = prop[key];
      });
    });
  }

  // Agregar parámetros adicionales
  params.sort_by = 'added';
  params.sort_order = 'desc';
  params.per_page = '5';

  return params;
}
