import { WizardService } from '../src/service/wizard.service';
import { NewWizard, WizardRepositoryTypes } from '../src/shared/types';
import { ServiceContainer } from './../src/DI/service-container';
import { describe, it, expect, beforeEach, vi } from 'vitest';


describe("Test Wizard Service" ,()=>{
    let wizardService:WizardService;
    beforeEach(()=>{
        const factory = new ServiceContainer()
        wizardService= factory.getWizardService(WizardRepositoryTypes.InMemo)
        
    });

    it("Should successfully  create a wizard when data is valid", ()=>{
         const validWizard: NewWizard = {
            name: "Hermione Granger",
            house: "Gryffindor",
            level: 1
        };
        const result =wizardService.createWizard(validWizard)

        expect(result.id).toBe(1)
        expect(result.active).toBeTruthy()
        expect(result.name).toBe("Hermione Granger");
    })

    it('should throw an error if the wizard level is negative', () => {
        const invalidWizard: NewWizard = {
            name: "Ron Weasley",
            house: "Gryffindor",
            level: -5
        };


        expect(() => {
            wizardService.createWizard(invalidWizard);
        }).toThrowError(/Invalid wizard level/); 


    });
    
    it("Should return list of wizards in spesific house" , ()=>{
         const validWizard: NewWizard = {
            name: "Hermione Granger",
            house: "Gryffindor",
            level: 1
        };
        wizardService.createWizard(validWizard)
        wizardService.createWizard(validWizard)
        wizardService.createWizard(validWizard)
        const result = wizardService.getWizardsByHouse("Gryffindor")
        expect(result.length).toBe(3)
    })
})