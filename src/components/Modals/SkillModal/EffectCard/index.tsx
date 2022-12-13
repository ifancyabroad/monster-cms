import {
	Card,
	CardActions,
	CardContent,
	IconButton,
	Typography,
} from "@mui/material";
import { Delete, Edit } from "@mui/icons-material";
import { useAppDispatch } from "../../../../app/hooks";
import { EffectType } from "../../../../enums";
import { openEffectModal } from "../../../../features/modals/modalsSlice";
import { ISkillEffect } from "../../../../types";
import { EFFECTS_NAME_MAP } from "../../../../utils";
import { StatusEffect } from "./StatusEffect";
import { DamageEffect } from "./DamageEffect";
import { HealEffect } from "./HealEffect";
import { AuxiliaryEffect } from "./AuxiliaryEffect";

interface IProps {
	effect: ISkillEffect;
	index: number;
	onRemove: (effect: ISkillEffect, index: number) => void;
}

export const EffectCard: React.FC<IProps> = ({ effect, index, onRemove }) => {
	const dispatch = useAppDispatch();

	const getEffectDetails = () => {
		switch (effect.type) {
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
					onClick={handleOpenEffectModal}
				>
					<Edit fontSize="small" />
				</IconButton>
				<IconButton
					aria-label="Delete effect"
					onClick={handleRemoveEffect}
				>
					<Delete fontSize="small" />
				</IconButton>
			</CardActions>
		</Card>
	);
};
