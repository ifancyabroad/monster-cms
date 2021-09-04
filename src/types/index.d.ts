export interface IDefense {
    armour: number;
    magicResistance: number;
}

export interface IStats {
    constitution: number;
    dexterity: number;
    initiative: number;
    intelligence: number;
    strength: number;
}

export interface IBaseMonster {
    challenge: number;
    defense: IDefense;
    description: string;
    expValue: number;
    goldValue: number;
    name: string;
    portrait: string;
    skills: string[];
    stats: IStats;
}

export interface IMonster extends IBaseMonster {
    id: string;
}

export interface ISaveMonster {
    monster: IBaseMonster;
    image: File | null;
}