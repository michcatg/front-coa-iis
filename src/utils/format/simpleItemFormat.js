export function formatSimpleItem(item){
  if (!item) return null;

  return {
    id: item.id,
    source: item["@id"],
    thumbnailSource: item["thumbnail_display_urls"] ? item["thumbnail_display_urls"]["medium"] : undefined,
    title: item['dcterms:title'][0]['@value'],
    createdAt: item['dcterms:created'] ? new Date(item['dcterms:created'][0]['@value']).toLocaleDateString('es-ES', { day: '2-digit', month: 'long', year: 'numeric' }) : '',
    description: item['dcterms:description'] ? item['dcterms:description'][0]['@value'] : ''
  };
}
