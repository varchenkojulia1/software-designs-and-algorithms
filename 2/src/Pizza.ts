import { Consumable } from "./Consumable";

export class Pizza extends Consumable {
    public readonly numberOfSlices: number;
    private numberOfEatenSlices: number = 0;

    constructor(value: number, weight: number, isSpoiled: boolean, numberOfSlices) {
        super('pizza', value, weight, isSpoiled);
        this.numberOfSlices = numberOfSlices;
    }

    public use(): string {
        const numberOfEatenSlicesNew: number = this.numberOfEatenSlices + 1;
        this.isConsumed = numberOfEatenSlicesNew > this.numberOfSlices;

        if (numberOfEatenSlicesNew <= this.numberOfSlices) {
            this.numberOfEatenSlices = numberOfEatenSlicesNew;
        }

        return this.isConsumed
            ? `There's nothing left of the pizza to consume.`
            : `You consumed a slice of the pizza.`
    }

    public getNumberOfEatenSlices(): number {
        return this.numberOfEatenSlices;
    }
}
