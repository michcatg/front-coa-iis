import { computed } from 'vue';
export function useItemPropertyValues({
    refPropertyValues,
    refResourceTemplate
}) {
    const propertyValues = refPropertyValues;
    const resourceTemplate = refResourceTemplate;

    // TODO: Limpiar que no se dupliquen los property values porque entran en los no agrupados
    const mappedPropertyValues = computed(() => {
        if (!propertyValues.value || propertyValues.value.length === 0) return [];
        const mappedValues = [];
        // SI hay resource template, se mapea con sus labels
        if (resourceTemplate.value) {
            resourceTemplate.value.properties.forEach((property) => {
                console.log('Mapping property:', property);
                const values = getPropertyValuesForPropertyWithId(property.id);
                if (values.length) {
                    console.log('values found for property:', property);
                    console.log('values:', values);
                    mappedValues.push({
                        propertyId: property.id,
                        propertyLabel: property.label || values[0].propertyLabel,
                        values: [...values]
                    });
                }
            });
            const propertyIdsInTemplate = resourceTemplate.value.properties.map((property) => property.id);
            const valuesNotInTemplate = propertyValues.value.filter(
                (pv) => !propertyIdsInTemplate.includes(pv.propertyId)
            );
            mappedValues.push(...getPropertyValuesForPropertyWithoutTemplate(valuesNotInTemplate));
        } else {// Si no hay resource template, se mapea solo con los labels del item
            mappedValues.push(...getPropertyValuesForPropertyWithoutTemplate(propertyValues.value));
        }
        return mappedValues;
    });

    function getPropertyValuesForPropertyWithoutTemplate(propertyValuesArray){
        const mappedValues = [];
        const groupedValues = propertyValuesArray.reduce((acc, pv) => {
            console.log('Grouping property value:', pv);
            console.log('Current accumulator:', acc);
            if (!acc[pv[0].propertyId]) {
                console.log('Creating new group for propertyId:', pv[0].propertyId);
                acc[pv[0].propertyId] = {
                    propertyId: pv[0].propertyId,
                    propertyLabel: pv[0].propertyLabel,
                    values: []
                };
            }
            if (pv[0].value !== undefined) {
                acc[pv[0].propertyId].values.push(pv[0]);
            }
            return acc;
        }, {});

        Object.values(groupedValues).forEach((group) => {
            console.log('Grouped property values:', group);
            if (group.values.length) {
                mappedValues.push(group);
            }
        });
        return mappedValues;
    }

    function getPropertyValuesForPropertyWithId(propertyId){
        return propertyValues.value.filter((pv) => pv[0].propertyId === propertyId)[0];
    }
   

    return {
        resourceTemplate,
        propertyValues,
        mappedPropertyValues
    };
}
