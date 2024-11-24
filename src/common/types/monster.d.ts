import { TDamageTypes, TEquipment, TStats } from "common/types";
import { DamageType, Stat, Tactics, Zone } from "common/utils";

export interface IBaseMonster {
	challenge: number;
	zone: Zone;
	resistances: TDamageTypes;
	description: string;
	name: string;
	portrait: string;
	boss: boolean;
	skills: string[];
	stats: TStats;
	tactics: Tactics;
	naturalArmourClass: number;
	naturalHitChance: number;
	naturalDamageType: DamageType;
	naturalMinDamage: number;
	naturalMaxDamage: number;
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
	zone: Zone | "all";
	challenge: number;
}

export type TMonstersOrderBy = keyof IMonster | Stat;
