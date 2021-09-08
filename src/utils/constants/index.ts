export const DRAWER_WIDTH = 240;

export const STATS = [
    "strength",
    "dexterity",
    "constitution",
    "intelligence",
    "wisdom",
    "charisma"
] as const;

export const RESISTANCES = [
    "physical",
    "arcane",
    "cold",
    "fire",
    "divine",
    "unholy"
] as const;

export const REWARDS = [
    "experience",
    "gold"
] as const;

export const STATS_NAME_MAP = {
    charisma: "Charisma",
    constitution: "Constitution",
    dexterity: "Dexterity",
    intelligence: "Intelligence",
    strength: "Strength",
    wisdom: "Wisdom"
};

export const RESISTANCES_NAME_MAP = {
    arcane: "Arcane",
    cold: "Cold",
    divine: "Divine",
    fire: "Fire",
    physical: "Physical",
    unholy: "Unholy",
};

export const REWARDS_NAME_MAP = {
    experience: "Experience",
    gold: "Gold",
};