import {Point} from "./point";

export class Shape {
    public color: string;
    public filled: boolean;
    public points: Point[];

    constructor(points: Point[]);
    constructor(points: Point[], color: string, filled: boolean);
    constructor(points: Point[], color?: string, filled?: boolean) {
        if (points.length < 3) {
            throw new Error('Should be at least 3 points');
        }
        this.points = points;

        if (!color && !filled) {
            this.color = 'green';
            this.filled = true;
        } else {
            this.color = color;
            this.filled = filled;
        }
    }

    public toString(): string {
        const resultString: string = `A Shape with color of ${this.color} and ${this.filled ? 'filled' : 'Not filled'}. Points:`
        this.points.forEach((point: Point, index: number) =>
            resultString + `${point.toString()}` + (index === this.points.length - 1 ? '' : ','));
        return resultString;
    }

    public getPerimeter(): number {
        return this.points.reduce((perimetr: number, point: Point, index: number) => {
            let nextPoint: Point = this.points[index + 1];
            if(index === this.points.length - 1) {
                nextPoint = this.points[0];
            }
            return perimetr + point.distance(nextPoint);
        }, 0)
    }
}
