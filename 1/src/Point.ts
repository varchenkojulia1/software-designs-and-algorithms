export class Point {
    public x: number;
    public y: number;

    constructor(x: number = 0, y: number = 0) {
        this.x = x;
        this.y = y;
    }

    public toString(): string {
        return `(${this.x}, ${this.y})`
    }

    distance();
    distance(other: Point);
    distance(x: number, y: number);
    distance(other?: number | Point, y?: number) {

        if (!y && !other) {
            return this.getDistance([0, this.x], [0, this.y]);
        }
        if (other instanceof Point) {
            return this.getDistance([other.x, this.x], [other.y, this.y]);
        }
        return this.getDistance([other, this.x], [y, this.y]);
    }

    private getDistance(xValues: number[], yValues: number[]): number {
        return Number(Math.sqrt(Math.pow((xValues[0] - xValues[1]), 2) + Math.pow((yValues[0] - yValues[1]), 2)).toFixed(2));
    }
}
