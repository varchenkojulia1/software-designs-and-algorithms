import { Item } from "./Item";
import { ItemComparator } from "./ItemComparator";

export class Inventory {
    private items: Item[] = [];

    public addItem(item: Item): void {
        this.items.push(item);
    }

    public sort(comparator?: ItemComparator): void {
        if (comparator) {
            this.items.sort(comparator.compare);
            return;
        }
        this.items.sort((a: Item, b: Item) => a.compareTo(b));
    }

    public toString(): string {
        return this.items.map((item: Item) => item.toString()).join(', ');
    }
}
