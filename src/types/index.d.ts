export interface IBaseMonster {
    defense: {
        armour: number;
        magicResistance: number;
    };
    challenge: number;
    expValue: number;
    goldValue: number;
    name: string;
    portrait: string;
    skills: string[];
    stats: {
        constitution: number;
        dexterity: number;
        initiative: number;
        intelligence: number;
        strength: number;
    };
}

export interface IMonster extends IBaseMonster {
    id: string;
}

export interface ISaveMonster {
    monster: IBaseMonster;
    image: File;
}