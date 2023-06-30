import {
	Card,
	CardActions,
	CardContent,
	IconButton,
	Typography,
} from "@mui/material";
import { Delete, Edit } from "@mui/icons-material";
import { useAppDispatch } from "common/hooks";
import { openEffectModal } from "features/modals";
import { ISkillEffect } from "common/types";
import { EffectType, EFFECTS_NAME_MAP } from "common/utils";
import { StatusEffect } from "./StatusEffect";
import { DamageEffect } from "./DamageEffect";
import { HealEffect } from "./HealEffect";
import { AuxiliaryEffect } from "./AuxiliaryEffect";
import { WeaponDamageEffect } from "./WeaponDamageEffect";

interface IProps {
	effect: ISkillEffect;
	index: number;
	onRemove: (effect: ISkillEffect, index: number) => void;
}

export const EffectCard: React.FC<IProps> = ({ effect, index, onRemove }) => {
	const dispatch = useAppDispatch();

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

	const handleOpenEffectModal = () => {
		dispatch(openEffectModal({ effect, index }));
	};

	const handleRemoveEffect = () => {
		onRemove(effect, index);
	};

	return (
		<Card variant="outlined">
			<CardContent>
				<Typography
					sx={{
						fontSize: 14,
					}}
					color="textSecondary"
					gutterBottom
				>
					{EFFECTS_NAME_MAP[effect.type]}
				</Typography>
				{getEffectDetails()}
			</CardContent>
			<CardActions>
				<IconButton
					aria-label="Edit effect"
					color="secondary"
					onClick={handleOpenEffectModal}
				>
					<Edit fontSize="small" />
				</IconButton>
				<IconButton
					aria-label="Delete effect"
					color="warning"
					onClick={handleRemoveEffect}
				>
					<Delete fontSize="small" />
				</IconButton>
			</CardActions>
		</Card>
	);
};