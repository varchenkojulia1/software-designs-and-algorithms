import {Point} from "./point";
import {Shape} from "./shape";

export class Triangle extends Shape {
    constructor(point1: Point, point2: Point, point3: Point);
    constructor(point1: Point, point2: Point, point3: Point, color: string, filled: boolean);
    constructor(point1: Point, point2: Point, point3: Point, color?: string, filled?: boolean) {
        super([point1, point2, point3], color, filled);
    }

    public toString(): string {
        let resultString: string = `Triangle[`;

        this.points.forEach((point: Point, index: number) => {
            resultString += `v${index + 1}=${point.toString()}${index === this.points.length - 1 ? ']' : ','}`
        });

        return resultString;
    }

    public getType(): string {
        const side1: number = this.points[0].distance(this.points[1]);
        const side2: number = this.points[1].distance(this.points[2]);
        const side3: number = this.points[2].distance(this.points[0]);

        if (side1 === side2 && side2 === side3) {
            return 'equilateral triangle'
        }
        if (side1 === side2 || side2 === side3 || side3 === side1) {
            return 'isosceles triangle'
        }
        return 'scalene triangle';
    }
}
