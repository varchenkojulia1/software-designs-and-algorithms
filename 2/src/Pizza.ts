import { Consumable } from "./Consumable";

interface PizzaConstruction {
    value: number;
    weight: number;
    isSpoiled: boolean;
    numberOfSlices: number;
}
export class Pizza extends Consumable {
    public readonly numberOfSlices: number;
    private numberOfEatenSlices = 0;

    constructor({ value, weight, isSpoiled, numberOfSlices }: PizzaConstruction) {
        super('pizza', value, weight, isSpoiled);
        this.numberOfSlices = numberOfSlices;
    }

    public use(): string {
        const numberOfEatenSlicesNew = this.numberOfEatenSlices + 1;
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
