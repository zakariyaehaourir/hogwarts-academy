import { EventEmitter } from "events";
import { AcademyEventType, SpellCastEvent } from "../shared/types";

export class AcademyEventListener extends EventEmitter{
    constructor() {
        super();
        this.initListeners();
    }

    private initListeners():void{
        this.on(AcademyEventType.SpellCast , (event:SpellCastEvent)=>{
            this.handleSpellCast(event)
        })
    }


    /**
     * Handle SpellCast event
     * @param event 
     */
    private handleSpellCast(event: SpellCastEvent): void {
        console.log(`[EVENT INTERCEPTED] Wizard #${event.wizardId} casted "${event.spellName}"!`);
    }

}