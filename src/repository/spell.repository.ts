import { ValidateSpell } from "../decorator/spell-validator.decorator";
import { Spell } from "../shared/types";
import { Repository } from "./base-repository";

export class SpellRepository extends Repository<Spell> {


    @ValidateSpell
    override save(spell: Spell): Spell {
        return super.save(spell);
    }
}