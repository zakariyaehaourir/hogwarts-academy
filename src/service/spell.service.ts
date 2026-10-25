import { Logger } from "../decorator/logger.decorator";
import { Cache } from "../decorator/valid-cache.decorator";

export class SpellCalculator{


    @Cache
    @Logger()
    calculatePower(basePower: number , multiplier : number){
        return basePower * multiplier
    }
}