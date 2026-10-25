import { WizardService } from "../src/service/wizard.service";
import { NewWizard, WizardRepositoryTypes } from "../src/shared/types";
import { ServiceContainer } from "./../src/DI/service-container";
 import { describe, it, expect, beforeEach, vi } from "vitest";

describe("Test Wizard Service", () => {
  let wizardService: WizardService;
  let factory : ServiceContainer;
  beforeEach(() => {
    factory = new ServiceContainer();
    wizardService = factory.getWizardService(WizardRepositoryTypes.InMemo);
  });

  it("Should successfully  create a wizard when data is valid", () => {
    const validWizard: NewWizard = {
      name: "Hermione Granger",
      house: "Gryffindor",
      level: 1,
    };
    const result = wizardService.createWizard(validWizard);

    expect(result.id).toBe(1);
    expect(result.active).toBeTruthy();
    expect(result.name).toBe("Hermione Granger");
  });

  it("should throw an error if the wizard level is negative", () => {
    const invalidWizard: NewWizard = {
      name: "Ron Weasley",
      house: "Gryffindor",
      level: -5,
    };

    expect(() => {
      wizardService.createWizard(invalidWizard);
    }).toThrowError(/Invalid wizard level/);
  });

  it("Should return list of wizards in spesific house", () => {
    const validWizard: NewWizard = {
      name: "Hermione Granger",
      house: "Gryffindor",
      level: 1,
    };
    wizardService.createWizard(validWizard);
    wizardService.createWizard(validWizard);
    wizardService.createWizard(validWizard);
    const result = wizardService.getWizardsByHouse("Gryffindor");
    expect(result.length).toBe(3);
  });

  it("Should not permit saving negative power spell" , ()=>{
    const spellRepository = factory.getSpellRepository()
    expect(()=>{
        spellRepository.save({id:4 , name:"my spell" ,category : "defense" , power:-55})
    }).toThrowError("Spell power cannot be negative try another value!")
  })

  it("Should reject a non valid Wizard" , ()=>{
    const result_not_object =wizardService.isWizard("notwizard")
    expect(result_not_object).toBeFalsy()

    const result_object_not_valid = wizardService.isWizard({name : 62 , id: "HS"})
    expect(result_object_not_valid).toBeFalsy()

    const result_house_invalid = wizardService.isWizard({name: 'Ari Haourir',house: 'Oujda',level: 0,id: 3,active: true})
    expect(result_house_invalid).toBeFalsy()
  })

  it("Should return true on valid Wizard" , ()=>{
    const result = wizardService.isWizard({name: 'Ari Haourir',house: 'Slytherin',level: 0,id: 3,active: true})
    expect(result).toBeTruthy()
  })
});
