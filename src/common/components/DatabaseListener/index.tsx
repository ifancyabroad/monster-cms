import { Fragment, useEffect } from "react";
import { dbArmours, dbMonsters, dbSkills, dbWeapons } from "firebaseSetup";
import { useAppDispatch } from "common/hooks";
import { fetchMonsters } from "features/monsters";
import { IArmour, IMonster, ISkill, IWeapon } from "common/types";
import { fetchSkills } from "features/skills";
import { fetchWeapons } from "features/weapons";
import { fetchArmours } from "features/armours";

export const DatabaseListener: React.FC = ({ children }) => {
	const dispatch = useAppDispatch();

	useEffect(() => {
		dbMonsters.orderByChild("name").on("value", (snapshot) => {
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
		dbSkills.orderByChild("name").on("value", (snapshot) => {
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

	useEffect(() => {
		dbWeapons.orderByChild("name").on("value", (snapshot) => {
			const weapons = [] as IWeapon[];
			snapshot.forEach((childSnapshot) => {
				const weapon = {
					...childSnapshot.val(),
					id: childSnapshot.key,
				};
				weapons.push(weapon);
			});
			dispatch(fetchWeapons(weapons));
		});
	}, [dispatch]);

	useEffect(() => {
		dbArmours.orderByChild("name").on("value", (snapshot) => {
			const armours = [] as IArmour[];
			snapshot.forEach((childSnapshot) => {
				const armour = {
					...childSnapshot.val(),
					id: childSnapshot.key,
				};
				armours.push(armour);
			});
			dispatch(fetchArmours(armours));
		});
	}, [dispatch]);

	return <Fragment>{children}</Fragment>;
};
