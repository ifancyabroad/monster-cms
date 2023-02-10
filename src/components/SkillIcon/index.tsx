import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useAppDispatch } from "../../app/hooks";
import {
	fetchSkillImagePath,
	selectSkillImagePathById,
} from "../../features/skills/skillsSlice";
import { ISkill } from "../../types";

interface IProps {
	skill: ISkill;
	width?: number;
}

export const SkillIcon: React.FC<IProps> = ({ skill, width = 40 }) => {
	const dispatch = useAppDispatch();
	const skillImagePath = useSelector(selectSkillImagePathById)(skill.id);

	useEffect(() => {
		if (skill.icon) {
			dispatch(fetchSkillImagePath(skill));
		}
	}, [dispatch, skill]);

	if (skillImagePath) {
		return <img src={skillImagePath} alt={skill.name} width={width} />;
	}

	return (
		<img src={`https://via.placeholder.com/${width}`} alt={skill.name} />
	);
};
