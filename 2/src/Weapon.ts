import { Item } from "./Item";

interface WeaponConstruction {
    name: string;
    baseDamage: number;
    baseDurability: number;
    value: number;
    weight: number;

}

export abstract class Weapon extends Item {
    public static MODIFIER_CHANGE_RATE = 0.05;

    public readonly name: string;
    public readonly value: number;
    public readonly weight: number;

    protected baseDamage: number;
    protected damageModifier = 0;
    protected durabilityModifier = 0;

    private readonly baseDurability: number;
    private isBroken: boolean = false;

    constructor({ name, value, weight, baseDurability, baseDamage }: WeaponConstruction) {
        super(name, value, weight);
        this.baseDamage = baseDamage;
        this.baseDurability = baseDurability;
    }

    public getEffectiveDamage(): number {
        return this.baseDamage + this.damageModifier;
    }

    public getEffectiveDurability(durabilityModifier?: number) {
        return !!durabilityModifier ? this.baseDurability + durabilityModifier : this.baseDurability + this.durabilityModifier;
    }

    public toString(): string {
        return `${super.toString()}, Damage: ${this.getEffectiveDamage().toFixed(2)}, Durability: ${(this.getEffectiveDurability() * 100).toFixed(2)}%`;
    }

    public use(): string {
        if (this.isBroken) {
            return `You can't use the ${this.name}, it is broken.`;
        }

        this.durabilityModifier = this.durabilityModifier - Weapon.MODIFIER_CHANGE_RATE;
        const effectiveDurability: number = this.getEffectiveDurability();
        const baseResultString: string = `You use the ${this.name}, dealing ${Weapon.MODIFIER_CHANGE_RATE} points of damage.`;
        this.isBroken = effectiveDurability <= 0;

        return this.isBroken ? baseResultString + '\n' + `The ${this.name} breaks.`: baseResultString;
    }

    public polish(): void {}
}
