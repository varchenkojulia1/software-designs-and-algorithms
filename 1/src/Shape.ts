import { Point } from "./point";

export class Shape {
  public color: string;
  public filled: boolean;
  public points: Point[];

  constructor(points: Point[]);
  constructor(points: Point[], color: string, filled: boolean);
  constructor(points: Point[], color: string = 'green', filled: boolean = true) {
    if (points.length < 3) {
      throw new Error('Should be at least 3 points');
    }
    this.points = points;
    this.color = color;
    this.filled = filled;

  }

  public toString(): string {
    const resultString: string = `A Shape with color of ${this.color} and ${this.filled ? 'filled' : 'not filled'}. Points:`
    const points: string = this.points.reduce((pointsString: string, point: Point, index: number) => {
      return `${pointsString} ${point.toString()}${(index === this.points.length - 1 ? '.' : ',')}`
    }, '');
    return resultString + points;
  }

  public getPerimeter(): number {
    return this.points.reduce((perimeter: number, point: Point, index: number) => {
      return perimeter + point.distance(this.points[index + 1] ?? this.points[0]);
    }, 0)
  }
}

