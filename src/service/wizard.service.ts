import { IWizardRepository, WizardRepository } from "../repository/wizard.repository";
import { AcademyEventType, NewWizard, SpellCastEvent, Wizard } from "../shared/types";
import { AcademyEventListener } from "./academy-event-emitter";


export class WizardService {
    private static currentId = 1;

    //TODO : inject repository
    constructor(private readonly repository: IWizardRepository , private readonly dispatcher:AcademyEventListener) { }
        


   public createWizard(newWizard: NewWizard): Wizard {
    if (!newWizard) {
        throw new Error("Invalid wizard data: The wizard object cannot be null or undefined.");
    }

    if (typeof newWizard.level === "number" && newWizard.level < 0) {
        throw new Error(`Invalid wizard level: Provided [${newWizard.level}], but a wizard level must be 0 or greater.`);
    }

    const wizardToSave: Wizard = {
        ...(newWizard as NewWizard),
        id: WizardService.currentId++,
        active: true
    };

    const savedWizard = this.repository.save(wizardToSave);

    if (!savedWizard) {
        throw new Error("Database error: Failed to save the wizard into the repository.");
    }

    return savedWizard;
    }

    public getWizardsByHouse(house:Wizard["house"]):Wizard[]{
        return this.repository.findByHouse(house)
    }

    public castSpell(wizardId: number, spellName: string): void {

        const event: SpellCastEvent = {
            type: AcademyEventType.SpellCast,
            wizardId: wizardId,
            spellName: spellName
        };

        this.dispatcher.emit(AcademyEventType.SpellCast, event);
    }
}