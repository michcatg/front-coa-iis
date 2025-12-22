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
