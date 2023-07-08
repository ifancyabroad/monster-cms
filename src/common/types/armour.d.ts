import { TAuxiliaryStats, TDamageTypes, TStats } from "common/types";
import { EquipmentType } from "common/utils";

export interface IBaseArmour {
	type: EquipmentType;
	name: string;
	description: string;
	icon: string;
	price: number;
	level: number;
	defense: number;
	modifiers?: {
		stats?: Partial<TStats>;
		auxiliaryStats?: Partial<TAuxiliaryStats>;
		resistances?: Partial<TDamageTypes>;
		damage?: Partial<TDamageTypes>;
	};
}

export interface IArmour extends IBaseArmour {
	id: string;
}

export interface ISaveArmour {
	armour: IBaseArmour;
	image: File | null;
}

export interface IUpdateArmour extends ISaveArmour {
	id: string;
	oldImage?: string;
}

export interface IArmourFilters {
	name: "";
	type: EquipmentType | "all";
	price: number;
	level: number;
}

export type TArmoursOrderBy = keyof IArmour;
