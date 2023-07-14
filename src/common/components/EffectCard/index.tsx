import { Chip, Tooltip } from "@mui/material";
import { useAppDispatch } from "common/hooks";
import { openEffectModal } from "features/modals";
import { ISkillEffect } from "common/types";
import { EFFECTS_NAME_MAP, EffectType } from "common/utils";
import { EffectDetails } from "./EffectDetails";
import { ReactComponent as WeaponDamageIcon } from "assets/images/icons/sword-brandish.svg";
import { ReactComponent as DamageIcon } from "assets/images/icons/lightning-flame.svg";
import { ReactComponent as HealIcon } from "assets/images/icons/heart-plus.svg";
import { ReactComponent as StatusIcon } from "assets/images/icons/lift.svg";
import { ReactComponent as AuxiliaryIcon } from "assets/images/icons/death-juice.svg";

const EFFECT_TYPE_ICON_MAP: Record<EffectType, JSX.Element> = {
	[EffectType.WeaponDamage]: <WeaponDamageIcon height={20} width={20} />,
	[EffectType.Damage]: <DamageIcon height={20} width={20} />,
	[EffectType.Heal]: <HealIcon height={20} width={20} />,
	[EffectType.Status]: <StatusIcon height={20} width={20} />,
	[EffectType.Auxiliary]: <AuxiliaryIcon height={20} width={20} />,
};

interface IEditProps {
	effect: ISkillEffect;
	index: number;
	onRemove: (effect: ISkillEffect, index: number) => void;
}

export const EditEffectCard: React.FC<IEditProps> = ({
	effect,
	index,
	onRemove,
}) => {
	const dispatch = useAppDispatch();

	const handleOpenEffectModal = () => {
		dispatch(openEffectModal({ effect, index }));
	};

	const handleRemoveEffect = () => {
		onRemove(effect, index);
	};

	return (
		<Tooltip title={<EffectDetails {...effect} />} placement="top">
			<Chip
				icon={EFFECT_TYPE_ICON_MAP[effect.type]}
				label={EFFECTS_NAME_MAP[effect.type]}
				onClick={handleOpenEffectModal}
				onDelete={handleRemoveEffect}
			/>
		</Tooltip>
	);
};

interface IProps {
	effect: ISkillEffect;
}

export const EffectCard: React.FC<IProps> = ({ effect }) => (
	<Tooltip title={<EffectDetails {...effect} />} placement="top">
		<Chip
			icon={EFFECT_TYPE_ICON_MAP[effect.type]}
			label={EFFECTS_NAME_MAP[effect.type]}
		/>
	</Tooltip>
);
