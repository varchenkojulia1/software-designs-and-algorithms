import { Weapon } from "./Weapon";

const MAX_EFFECTIVE_DAMAGE_COEFF: number = 1.25;

export class Sword extends Weapon {
    private readonly maxEffectiveDamage: number;

    constructor(baseDamage: number, baseDurability: number,value: number, weight: number) {
        super('sword', baseDamage, baseDurability, value, weight);
        this.maxEffectiveDamage = this.baseDamage * MAX_EFFECTIVE_DAMAGE_COEFF;
    }

    public polish(): void {
        if (this.getEffectiveDamage() < this.maxEffectiveDamage) {
            this.damageModifier += Weapon.MODIFIER_CHANGE_RATE;
        }
    }
}
