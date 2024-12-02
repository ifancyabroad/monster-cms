import { Button } from "@mui/material";
import { useAppDispatch, useAppSelector } from "common/hooks";
import { IUpdateArmour } from "common/types";
import { ArmourType } from "common/utils";
import { updateArmour } from "features/armours";

export const ScriptButton: React.FC = () => {
	const dispatch = useAppDispatch();
	const armours = useAppSelector((state) => state.armours.armours);

	const run = () => {
		armours.forEach(({ id, ...armour }) => {
			if (!armour.armourType) {
				armour.armourType = ArmourType.Miscellaneous;
			}

			const payload: IUpdateArmour = {
				id,
				image: null,
				oldImage: armour.icon,
				armour,
			};
			console.log("updateArmour", payload);
			dispatch(updateArmour(payload));
		});
	};

	return (
		<Button variant="contained" color="secondary" onClick={run}>
			RUN SCRIPT
		</Button>
	);
};
