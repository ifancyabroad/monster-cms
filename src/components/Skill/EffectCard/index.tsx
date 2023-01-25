import {
	Card,
	CardContent,
	CardHeader,
	Collapse,
	IconButton,
	IconButtonProps,
	styled,
} from "@mui/material";
import { ISkillEffect } from "../../../types";
import { EFFECTS_NAME_MAP, EffectType } from "../../../utils";
import { StatusEffect } from "./StatusEffect";
import { DamageEffect } from "./DamageEffect";
import { HealEffect } from "./HealEffect";
import { AuxiliaryEffect } from "./AuxiliaryEffect";
import { useState } from "react";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { WeaponDamageEffect } from "./WeaponDamageEffect";

interface ExpandMoreProps extends IconButtonProps {
	expand: boolean;
}

const ExpandMore = styled((props: ExpandMoreProps) => {
	const { expand, ...other } = props;
	return <IconButton {...other} />;
})(({ theme, expand }) => ({
	transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
	transition: theme.transitions.create("transform", {
		duration: theme.transitions.duration.shortest,
	}),
}));

export const EffectCard: React.FC<ISkillEffect> = (effect) => {
	const [expanded, setExpanded] = useState(false);

	const handleExpandClick = () => {
		setExpanded(!expanded);
	};

	const getEffectDetails = () => {
		switch (effect.type) {
			case EffectType.WeaponDamage:
				return <WeaponDamageEffect {...effect} />;
			case EffectType.Damage:
				return <DamageEffect {...effect} />;
			case EffectType.Heal:
				return <HealEffect {...effect} />;
			case EffectType.Status:
				return <StatusEffect {...effect} />;
			case EffectType.Auxiliary:
				return <AuxiliaryEffect {...effect} />;
			default:
				return null;
		}
	};

	return (
		<Card variant="outlined">
			<CardHeader
				title={EFFECTS_NAME_MAP[effect.type]}
				action={
					<ExpandMore
						expand={expanded}
						onClick={handleExpandClick}
						aria-expanded={expanded}
						aria-label="show more"
					>
						<ExpandMoreIcon />
					</ExpandMore>
				}
			/>
			<Collapse in={expanded} timeout="auto" unmountOnExit>
				<CardContent>{getEffectDetails()}</CardContent>
			</Collapse>
		</Card>
	);
};
