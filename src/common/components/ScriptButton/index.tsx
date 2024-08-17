// @ts-nocheck

import { Button } from "@mui/material";
import { useAppDispatch, useAppSelector } from "common/hooks";
import { IUpdateMonster } from "common/types";
import { updateMonster } from "features/monsters";

export const ScriptButton: React.FC = () => {
	const dispatch = useAppDispatch();
	const monsters = useAppSelector((state) => state.monsters.monsters);

	const run = () => {
		monsters.forEach(({ id, ...monster }) => {
			monster.naturalArmourClass = 0;
			monster.naturalMinDamage = 1;
			monster.naturalMaxDamage = 4;

			const payload: IUpdateMonster = {
				id,
				image: null,
				oldImage: monster.portrait,
				monster,
			};
			console.log("updateMonster", payload);
			dispatch(updateMonster(payload));
		});
	};

	return (
		<Button variant="contained" color="secondary" onClick={run}>
			RUN SCRIPT
		</Button>
	);
};
