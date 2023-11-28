import { Comparable } from "./Comparable";

export class Item implements Comparable<Item> {
    private static idCounter: number = 0;

    public readonly name: string;
    public value: number;
    public weight: number;

    private readonly id: number;

    constructor(name: string, value: number, weight: number) {
        Item.idCounter += 1;
        this.id = Item.idCounter;

        this.name = name;
        this.value = value;
        this.weight = weight;
    }

    public getId(): number {
        return this.id;
    }

    public static resetIdCounter(): void {
        Item.idCounter = 0;
    }

    public compareTo(other: Item): number {
        if (this.value === other.value) {
            return this.name.toLowerCase().localeCompare(other.name.toLowerCase());
        }

        return this.value > other.value ? 1 : -1;
    }

    public toString(): string {
        return `${this.name} − Value: ${this.value.toFixed(2)}, Weight: ${this.weight.toFixed(2)}`
    }
}
