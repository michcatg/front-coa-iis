export function getFilterCategories(categoryIds) {
  return categoryIds
    .map((id, idx) => `filters[$or][${idx}][categoria][documentId][$eq]=${id}`)
    .join('&')
}
