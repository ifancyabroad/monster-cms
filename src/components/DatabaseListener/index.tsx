import { Fragment, useEffect } from "react";
import { dbMonsters, dbSkills } from "../../firebaseSetup";
import { useAppDispatch } from "../../app/hooks";
import { fetchMonsters } from "../../features/monsters/monstersSlice";
import { IMonster, ISkill } from "../../types";
import { fetchSkills } from "../../features/skills/skillsSlice";

export const DatabaseListener: React.FC = ({ children }) => {
	const dispatch = useAppDispatch();

	useEffect(() => {
		dbMonsters.on("value", (snapshot) => {
			const monsters = [] as IMonster[];
			snapshot.forEach((childSnapshot) => {
				const monster = {
					...childSnapshot.val(),
					id: childSnapshot.key,
				};
				monsters.push(monster);
			});
			dispatch(fetchMonsters(monsters));
		});
	}, [dispatch]);

	useEffect(() => {
		dbSkills.on("value", (snapshot) => {
			const skills = [] as ISkill[];
			snapshot.forEach((childSnapshot) => {
				const skill = {
					...childSnapshot.val(),
					id: childSnapshot.key,
				};
				skills.push(skill);
			});
			dispatch(fetchSkills(skills));
		});
	}, [dispatch]);

	return <Fragment>{children}</Fragment>;
};
