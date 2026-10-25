export type House = 
    "Gryffindor" |
    "Slytherin" |
    "Ravenclaw" |
    "Hufflepuff"

export type SpellCategory =
    "attack" |
    "defense" |
    "healing"

export interface Wizard {
    id: number;
    name: string;
    house: House;
    level: number;
    active: boolean;

    //[key:string]: number | boolean | string
}
export type NewWizard = Omit<Wizard , "id" | "active">;


export interface Spell {
  id: number;
  name: string;
  category: SpellCategory;
  power: number;
}

export enum AcademyEventType {
  SpellCast = "spell-cast",
  LevelUp = "level-up",
  WizardExpelled = "wizard-expelled"
}

export type AcademyEvent =
  | { type: AcademyEventType.SpellCast; wizardId: number; spellName: string }
  | { type: AcademyEventType.LevelUp; wizardId: number; newLevel: number }
  | { type: AcademyEventType.WizardExpelled; wizardId: number };

  export type SpellOutput<T extends SpellCategory> =
  T extends "attack" ? number :
  T extends "defense" ? boolean :
  T extends "healing" ? string :
  never;


export type AttackSpell = Extract<Spell, { category: "attack" }>;
export type NonHealingCategory = Exclude<SpellCategory, "healing">;
export type UpdateWizardRequest = Partial<Wizard>

export enum WizardRepositoryTypes {
  InMemo = "In-Memo",
  File = "File",
  Database = "DB"
} 
export type SpellCastEvent = Extract<AcademyEvent , {type:AcademyEventType.SpellCast}>