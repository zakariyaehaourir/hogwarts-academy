import { WizardRepository } from '../repository/wizard.repository'
import { Repository } from "../repository/base-repository";
import { Wizard, WizardRepositoryTypes } from "../shared/types";
import { WizardService } from '../service/wizard.service';

/**
 * Inverion Of Control home made
 */
export class ServiceContainer{

    private wizaredRepository :Repository<Wizard> | null= null
    private wizardService: WizardService | null = null;

    /**
     * 
     * @param whichType Wizard Repository type : Database | InMemo | File
     * @returns 
     */
    public getWizardRepository(whichType: WizardRepositoryTypes): Repository<Wizard> {
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

    public getWizardService(whichType: WizardRepositoryTypes): WizardService {
        if (!this.wizardService) {
            const repository = this.getWizardRepository(whichType);
            this.wizardService = new WizardService(repository);
        }
        return this.wizardService;
    }
}