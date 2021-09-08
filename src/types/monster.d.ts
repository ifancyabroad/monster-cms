import { RESISTANCES, REWARDS, STATS } from "../utils";

export type TStat = typeof STATS[number];
export type TResistance = typeof RESISTANCES[number];
export type TReward = typeof REWARDS[number];

export type TStats = {
    [key in TStat]: number;
}

export type TResistances = {
    [key in TResistance]: number;
}

export type TRewards = {
    [key in TReward]: number;
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