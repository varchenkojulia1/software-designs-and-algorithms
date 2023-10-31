import { Item } from "./Item";

export abstract class Consumable extends Item {
    public isConsumed: boolean = false;
    private readonly _isSpoiled: boolean;

    constructor(name: string, value: number, weight: number, isSpoiled: boolean = false) {
        super(name, value, weight);
        this._isSpoiled = isSpoiled;
    }

    public isSpoiled(): boolean {
        return this._isSpoiled;
    }
    public use(): string {
        return this.isConsumed
            ? `There's nothing left of the ${this.name} to consume.`
            : `You consumed the ${this.name}.` + (this._isSpoiled ? '\nYou feel sick.' : '')
    }
}
