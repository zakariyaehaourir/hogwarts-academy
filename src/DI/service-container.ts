import { IWizardRepository, WizardRepository } from '../repository/wizard.repository'
import { Repository } from "../repository/base-repository";
import { Wizard, WizardRepositoryTypes } from "../shared/types";
import { WizardService } from '../service/wizard.service';
import { AcademyEventListener } from '../service/academy-event-emitter';
import { SpellRepository } from '../repository/spell.repository';
import { SpellCalculator } from '../service/spell.service';

/**
 * Inverion Of Control home made
 */
export class ServiceContainer{

    private wizaredRepository :IWizardRepository | null= null
    private wizardService: WizardService | null = null;
    private academyEmitter :AcademyEventListener | null = null;
    private spellCalculator : SpellCalculator | null = null;

    /**
     * 
     * @param whichType Wizard Repository type : Database | InMemo | File
     * @returns 
     */
    public getWizardRepository(whichType: WizardRepositoryTypes): IWizardRepository {
        switch (whichType) {
            case WizardRepositoryTypes.InMemo:
                if(!this.wizaredRepository){
                    this.wizaredRepository = new WizardRepository()
                }
                return this.wizaredRepository
            default:
                return new WizardRepository();
        }
    }

    public getAcademyEventEmitter():AcademyEventListener{
        if(!this.academyEmitter){
            this.academyEmitter = new AcademyEventListener()
        }
        return this.academyEmitter
    }
    public getWizardService(whichType: WizardRepositoryTypes): WizardService {
        if (!this.wizardService) {
            const repository = this.getWizardRepository(whichType);
            const dispatcher = this.getAcademyEventEmitter()
            this.wizardService = new WizardService(repository,dispatcher);
        }
        return this.wizardService;
    }

    public getSpellRepository():SpellRepository{
        return new SpellRepository()
    }
    public getSpellService():SpellCalculator{
        if(!this.spellCalculator){
            this.spellCalculator = new SpellCalculator()
        }
        return this.spellCalculator
    }
}