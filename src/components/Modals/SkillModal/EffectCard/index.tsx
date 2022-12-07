import {
	Card,
	CardActions,
	CardContent,
	createStyles,
	IconButton,
	makeStyles,
	Theme,
	Typography,
} from "@material-ui/core";
import { Delete, Edit } from "@material-ui/icons";
import { useAppDispatch } from "../../../../app/hooks";
import { EffectType } from "../../../../enums";
import { openEffectModal } from "../../../../features/modals/modalsSlice";
import { ISkillEffect } from "../../../../types";
import { EFFECTS_NAME_MAP } from "../../../../utils";
import { BuffEffect } from "./BuffEffect";
import { DamageEffect } from "./DamageEffect";
import { DebuffEffect } from "./DebuffEffect";
import { HealEffect } from "./HealEffect";
import { PoisonEffect } from "./PoisonEffect";
import { StunEffect } from "./StunEffect";

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		root: {},
		title: {
			fontSize: 14,
		},
	})
);

interface IProps {
	effect: ISkillEffect;
	onRemove: (effect: ISkillEffect) => void;
}

export const EffectCard: React.FC<IProps> = ({ effect, onRemove }) => {
	const classes = useStyles();
	const dispatch = useAppDispatch();

	const getEffectDetails = () => {
		switch (effect.type) {
			case EffectType.Damage:
				return <DamageEffect {...effect} />;
			case EffectType.Heal:
				return <HealEffect {...effect} />;
			case EffectType.Buff:
				return <BuffEffect {...effect} />;
			case EffectType.Debuff:
				return <DebuffEffect {...effect} />;
			case EffectType.Stun:
				return <StunEffect {...effect} />;
			case EffectType.Poison:
				return <PoisonEffect {...effect} />;
			default:
				return null;
		}
	};

	const handleOpenEffectModal = () => {
		dispatch(openEffectModal(effect));
	};

	const handleRemoveEffect = () => {
		onRemove(effect);
	};

	return (
		<Card className={classes.root} variant="outlined">
			<CardContent>
				<Typography
					className={classes.title}
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
