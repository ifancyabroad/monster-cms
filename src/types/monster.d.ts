export type TResistances = {
    arcane: number;
    cold: number;
    divine: number;
    fire: number;
    physical: number;
    unholy: number
}

export type TStats = {
    charisma: number;
    constitution: number;
    dexterity: number;
    intelligence: number;
    strength: number;
    wisdom: number;
}

export type TRewards = {
    experience: number;
    gold: number;
}

export interface IBaseMonster {
    challenge: number;
    resistances: TResistances;
    description: string;
    name: string;
    portrait: string;
    rewards: TRewards;
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