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
    distance(other?: number | Point, yValue?: number) {
        if (!yValue && !other) {
            return this.getDistance([0, this.x], [0, this.y]);
        }
        const { x, y }: { x: number, y: number } = other instanceof Point ? other : { x: other , y: yValue };

        return this.getDistance([x, this.x], [y, this.y]);
    }

    private getDistance(xValues: number[], yValues: number[]): number {
        return Number(Math.sqrt(Math.pow((xValues[0] - xValues[1]), 2) + Math.pow((yValues[0] - yValues[1]), 2)).toFixed(2));
    }
}
