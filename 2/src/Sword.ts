import { Weapon } from "./Weapon";

const MAX_EFFECTIVE_DAMAGE_COEFF = 1.25;
interface SwordConstruction {
    baseDamage: number;
    baseDurability: number;
    value: number;
    weight: number;
}
export class Sword extends Weapon {
    private readonly maxEffectiveDamage: number;

    constructor({ baseDurability, baseDamage, weight, value }: SwordConstruction) {
        super({ name: 'sword', baseDamage, baseDurability, value, weight });
        this.maxEffectiveDamage = this.baseDamage * MAX_EFFECTIVE_DAMAGE_COEFF;
    }

    public polish(): void {
        if (this.getEffectiveDamage() < this.maxEffectiveDamage) {
            this.damageModifier += Weapon.MODIFIER_CHANGE_RATE;
        }
    }
}
