import { ServiceContainer } from "./DI/service-container";
import { SpellRepository } from "./repository/spell.repository";
import { SpellCalculator } from "./service/spell.service";
import { NewWizard, Spell, SpellCastEvent, WizardRepositoryTypes } from "./shared/types";

/** STEP 1 */
const factory = new ServiceContainer()
const wizardService = factory.getWizardService(WizardRepositoryTypes.InMemo)

const harryData: NewWizard = {
        name: "Harry Potter",
        house: "Gryffindor",
        level: 1,
    };
const savedHarry = wizardService.createWizard(harryData);
console.log("-------- Saved Harry ----------")
console.log(savedHarry);

const dracoData: NewWizard = {
            name: "Draco Malfoy",
            house: "Slytherin",
            level: 8,
        };
const savedDraco = wizardService.createWizard(dracoData)
console.log("-------- Saved Draco ----------")
console.log(savedDraco)

/** STEP 2 */
const haourirData: NewWizard = {
            name: "Ari Haourir",
            house: "Slytherin",
            level: 0,
        };
const savedHaourir = wizardService.createWizard(haourirData)
const wizardsInSlytherin=wizardService.getWizardsByHouse("Slytherin")
console.log("-- List of wizards in Slytherin House --")
console.log(wizardsInSlytherin);
/** STEP 3 */
console.log("---------------------- STEP 3 ---------------------")
factory.getAcademyEventEmitter()
wizardService.castSpell(77, "Expecto Patronum");

/** STEP 4 */
const spellRepository = factory.getSpellRepository()
try {
    spellRepository.save({id:4 , name:"my spell" ,category : "defense" , power:55})
} catch (error) {
    console.error(error)
}
/** STEP 5 */
console.log("--------------- STEP 5 use cache --------------")
const spellService = factory.getSpellService()
console.log(spellService.calculatePower(5 , 22)) //Missed
console.log(spellService.calculatePower(1 , 22)) //Missed
console.log(spellService.calculatePower(5 , 22)) // Hit