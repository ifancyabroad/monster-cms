import { Chip } from "@mui/material";
import { TProperty } from "common/types";
import { openPropertyModal } from "../../../features/modals/modalsSlice";
import { useAppDispatch } from "common/hooks";
import { PROPERTY_CONFIG } from "common/utils/constants/config";

interface IEditProps {
	property: TProperty;
	index: number;
	onRemove: (effect: TProperty, index: number) => void;
}

export const EditPropertyCard: React.FC<IEditProps> = ({
	property,
	index,
	onRemove,
}) => {
	const dispatch = useAppDispatch();
	const { prefix, suffix, properties } = PROPERTY_CONFIG[property.type];
	const propertyConfig = properties.find(
		(prop) => prop.key === property.name
	);

	const handleOpenPropertyModal = () => {
		dispatch(openPropertyModal({ property, index }));
	};

	const handleRemove = () => {
		onRemove(property, index);
	};

	return (
		<Chip
			label={`${prefix}${property.value}${suffix} ${propertyConfig?.name}`}
			onClick={handleOpenPropertyModal}
			onDelete={handleRemove}
		/>
	);
};

interface IProps {
	property: TProperty;
}

export const PropertyCard: React.FC<IProps> = ({ property }) => {
	const { prefix, suffix, properties } = PROPERTY_CONFIG[property.type];
	const propertyConfig = properties.find(
		(prop) => prop.key === property.name
	);

	return (
		<Chip
			label={`${prefix}${property.value}${suffix} ${propertyConfig?.name}`}
		/>
	);
};
