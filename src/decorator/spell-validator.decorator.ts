import { Spell } from "../shared/types";

export function ValidateSpell(originalMethod: any, context: any){
    if(context.kind!= "method"){
        throw new Error("Cannot apply on this type")
    }
    return function(this:any , ...args:any[]){
         const spell = args[0];
        if("power" in spell){
            if(spell.power < 0){
                throw new Error("Spell power cannot be negative try another value!")
            }
        }

        return originalMethod.apply(this, args);
    };
}