export class Point {
    constructor(private x: number = 0, private y: number = 0) {}

    public toString(): string {
        return `(${this.x}, ${this.y})`
    }

    distance();
    distance(other: Point);
    distance(x: number, y: number);
    distance(x?: number | Point, y?: number) {
        const xAxis = x instanceof Point ? x.x : x ?? 0;
        const yAxis = x instanceof Point ? x.y : y ?? 0;

        return Math.sqrt(Math.pow((xAxis - this.x), 2) + Math.pow((yAxis - this.y), 2));
    }
}
