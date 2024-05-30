import { IArmour, IWeapon } from "common/types";

interface IProps {
	equipment: IWeapon | IArmour;
	width?: number;
}

export const EquipmentIcon: React.FC<IProps> = ({ equipment, width = 40 }) => {
	if (equipment.icon) {
		return <img src={equipment.icon} alt={equipment.name} width={width} />;
	}

	return (
		<img
			src={`https://via.placeholder.com/${width}`}
			alt={equipment.name}
		/>
	);
};
