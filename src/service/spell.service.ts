import { Cache } from "../decorator/valid-cache.decorator";

export class SpellCalculator{


    @Cache
    calculatePower(basePower: number , multiplier : number){
        return basePower * multiplier
    }
}