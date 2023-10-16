export class Point {
    public x: number;
    public y: number;

    constructor();
    constructor(x: number, y: number)
    constructor(x?: number, y?: number) {
        this.x = x ?? 0;
        this.y = y ?? 0;
    }

    public toString(): string {
        return `(${this.x}, ${this.y})`
    }

    distance();
    distance(other: Point);
    distance(x: number, y: number);
    distance(other?: number | Point, y?: number) {
        if (!y && !other) {
            return this.getDistance(0, this.x, 0, this.y);
        }
        if (other instanceof Point && !y) {
            return this.getDistance(other.x, this.x, other.y, this.y);
        }
        if (typeof(y) === 'number' && typeof(other) === 'number') {
            return this.getDistance(other, this.x, y, this.y);
        }
    }

    private getDistance(x1: number, x2: number, y1: number, y2: number): number {
        return Math.sqrt(Math.pow((x1 - x2), 2) + Math.pow((y1 - y2), 2))
    }
}
