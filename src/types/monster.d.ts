import { TDamageTypes, TStats } from ".";

export interface IBaseMonster {
	challenge: number;
	resistances: TDamageTypes;
	description: string;
	name: string;
	portrait: string;
	skills: string[];
	stats: TStats;
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
