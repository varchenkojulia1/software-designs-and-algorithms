import { Weapon } from "./Weapon";

interface BowConstruction {
    baseDamage: number;
    baseDurability: number;
    value: number;
    weight: number
}
export class Bow extends Weapon {
    constructor({ baseDamage, baseDurability, weight, value }: BowConstruction) {
        super({ name: 'bow', baseDamage, baseDurability, value, weight});
    }

    polish(): void {
        const newDurability = this.durabilityModifier + Weapon.MODIFIER_CHANGE_RATE;
        if (this.getEffectiveDurability(newDurability) <= 1) {
            this.durabilityModifier = newDurability;
        }
    }
}
