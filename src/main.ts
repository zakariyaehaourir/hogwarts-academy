import { ServiceContainer } from "./DI/service-container";
import { NewWizard, WizardRepositoryTypes } from "./shared/types";

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
