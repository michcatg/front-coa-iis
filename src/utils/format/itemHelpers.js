export function isAuthorPropertyValue(property) {
    return property?.propertyLabel?.toLowerCase() === 'autor'
        || property?.propertyLabel?.toLowerCase() === 'author'
        || property?.propertyLabel?.toLowerCase() === 'creator';
}
