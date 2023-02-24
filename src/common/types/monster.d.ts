import { TDamageTypes, TEquipment, TStats } from "common/types";
import { Stat } from "common/utils";

export interface IBaseMonster {
	challenge: number;
	resistances: TDamageTypes;
	description: string;
	name: string;
	portrait: string;
	skills: string[];
	stats: TStats;
	equipment?: Partial<TEquipment>;
}

export interface IMonster extends IBaseMonster {
	id: string;
}

export interface ISaveMonster {
	monster: IBaseMonster;
	image: File | null;
}

export interface IUpdateMonster extends ISaveMonster {
	id: string;
	oldImage?: string;
}

export interface IMonsterFilters {
	name: "";
	challenge: number;
}

export type TMonstersOrderBy = keyof IMonster | Stat;
