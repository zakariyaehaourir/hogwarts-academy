import { Repository } from "./base-repository";
import { Wizard} from "../shared/types";

export interface IWizardRepository extends Repository<Wizard> {
    findByHouse(house: Wizard["house"]): Wizard[];
}


export class WizardRepository extends Repository<Wizard> implements IWizardRepository{

   public findByHouse(house: Wizard["house"]): Wizard[] {
        return super.getAll().filter(wizard => wizard.house === house);
    }
    
}