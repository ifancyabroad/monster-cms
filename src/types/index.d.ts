export interface IDictionary<T> {
	[K: string]: T;
}

export type TDefense = {
    armour: number;
    magicResistance: number;
}

export type TStats = {
    constitution: number;
    dexterity: number;
    initiative: number;
    intelligence: number;
    strength: number;
}

export interface IBaseMonster {
    challenge: number;
    defense: TDefense;
    description: string;
    expValue: number;
    goldValue: number;
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