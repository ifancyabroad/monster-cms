export interface Monster {
    defense: {
        armour: number;
        magicResistance: number;
    };
    challenge: number;
    expValue: number;
    goldValue: number;
    id: string;
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