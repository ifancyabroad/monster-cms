import { Typography } from "@mui/material";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { selectWeaponById } from "../../features/weapons/weaponsSlice";

interface IRouteParams {
	id: string;
}

export const Weapon: React.FC = () => {
	let { id } = useParams<IRouteParams>();
	const weapon = useSelector(selectWeaponById)(id);

	if (!weapon) {
		return null;
	}

	return (
		<div>
			<Typography variant="h2" gutterBottom>
				{weapon.name}
			</Typography>
			<Typography>Coming soon</Typography>
		</div>
	);
};
