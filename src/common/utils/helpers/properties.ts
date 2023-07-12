import { TProperty } from "common/types";
import { PROPERTY_CONFIG } from "common/utils";

export const getPropertyConfig = (property: TProperty) => {
	const { properties } = PROPERTY_CONFIG[property.type];
	return properties.find((prop) => prop.key === property.name);
};
