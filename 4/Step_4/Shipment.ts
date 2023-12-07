import { marksValues, Marks } from "./Marks";
import { Shipper } from "./Shipper";
import { ShipperFactory } from "./ShipperFactory";

export type ShipmentType = 'letter' | 'package' | 'oversized';

export interface ShipmentInfo {
    shipmentId: number;
    weight: number;
    fromAddress: string;
    fromZipCode: string;
    toAddress: string;
    toZipCode: string;
    marks: Marks[];
}

export class Shipment {
    public weight: number;
    public fromAddress: string;
    public fromZipCode: string;
    public toAddress: string;
    public toZipCode: string;
    public shipmentID: number;
    public marks: string[];

    public shipper: Shipper;

    private type: ShipmentType;

    constructor(shipment: ShipmentInfo) {
        this.shipmentID = shipment.shipmentId === 0 ? this.generateShipmentId() : shipment.shipmentId;
        this.weight = shipment.weight;
        this.fromAddress = shipment.fromAddress;
        this.fromZipCode = shipment.fromZipCode;
        this.toAddress = shipment.toAddress;
        this.toZipCode = shipment.toZipCode;
        this.marks = this.getMarks(shipment.marks);

        this.shipper = ShipperFactory.getShipper(this.fromZipCode);
        this.type = this.getShipmentType(this.weight);
    }

    public static getInstance(shipmentInfo: ShipmentInfo): Shipment {
        return shipmentInfo.marks.length > 0 ? new ShipmentWithMarks(shipmentInfo): new Shipment(shipmentInfo);
    }

    public ship(): string {
        return `Shipment with the ID ${this.shipmentID}, will be picked up from ${this.fromAddress}, ${this.fromZipCode} and shipped to ${this.toAddress}, ${this.toZipCode}
     Cost = ${this.shipper.getCost(this.type, this.weight)}, company: ${this.shipper.name}`;
    }

    private getShipmentType(weight: number): ShipmentType {
        if (weight < 0) {
            throw new Error('Incorrect weight value:' + weight);
        }
        return weight <= 15 ? 'letter' : weight <= 160 ? 'package' : 'oversized';
    }

    private getMarks(marks: Marks[]): string[] {
        return marks.map((mark: Marks) => {
            return marksValues[mark] ?? ''
        })
    }

    private generateShipmentId(): number {
        return +Math.random().toString(16).slice(2, 10);
    }
}

export class ShipmentWithMarks extends Shipment {
    public ship(): string {
        return super.ship() + this.marks.reduce((outputString: string, mark: string) => {
            return outputString + '\n **' + mark + '**'
        }, '')
    }
}
