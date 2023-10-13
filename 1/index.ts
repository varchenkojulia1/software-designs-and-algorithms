class Point {
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

class Shape {
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

class Triangle extends Shape {
    constructor(point1: Point, point2: Point, point3: Point);
    constructor(point1: Point, point2: Point, point3: Point, color: string, filled: boolean);
    constructor(point1: Point, point2: Point, point3: Point, color?: string, filled?: boolean) {
        super([point1, point2, point3], color, filled);
    }

    public toString(): string {
        let resultString: string = `Triangle[`;

        this.points.forEach((point: Point, index: number) => {
            resultString += `v${index + 1}=(${point.toString()})${index === this.points.length - 1 ? ']' : ','}`
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
