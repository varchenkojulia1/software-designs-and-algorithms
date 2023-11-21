import { Shipper } from "../Step 2/Shipper";
import { ShipmentDecorator } from "./ShipmentDecorator";
import { marksValues, ShipmentMarks, Marks } from "./Marks";

type ShipmentType = 'letter' | 'package' | 'oversized';
export interface ShipmentInfo {
    ShipmentID: number;
    Weight: number;
    FromAddress: string;
    FromZipCode: string;
    ToAddress: string;
    ToZipCode: string;
    Marks: Marks[];
}

export class Shipment {
    public static id = 0;
    public static shipment: ShipmentDecorator;

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
        this.shipmentID = shipment.ShipmentID === 0 ? this.generateShipmentId() : shipment.ShipmentID;
        this.weight = shipment.Weight;
        this.fromAddress = shipment.FromAddress;
        this.fromZipCode = shipment.FromZipCode;
        this.toAddress = shipment.ToAddress;
        this.toZipCode = shipment.ToZipCode;
        this.marks = this.getMarks(shipment.Marks);

        this.shipper = Shipper.getInstance(this.fromZipCode);
        this.type = this.getShipmentType(this.weight);
    }

    public static getInstance(shipmentInfo: ShipmentInfo): ShipmentDecorator {
        if (!Shipment.shipment) {
            const shipment: Shipment = new Shipment(shipmentInfo);
            return new ShipmentDecorator(shipment);
        }
        return Shipment.shipment;
    }

    public ship(): string {
        return `Shipment with the ID ${this.shipmentID}, will be picked up from ${this.fromAddress}, ${this.fromZipCode} and shipped to ${this.toAddress}, ${this.toZipCode}
     Cost = ${this.weight * this.shipper.getCost()}`;
    }

    private getShipmentType(weight: number): ShipmentType {
        if (weight < 0) {
            throw new Error('Incorrect weight value');
        }
        return weight <= 15 ? 'letter' : weight <= 160 ? 'package' : 'oversized';
    }

    private getMarks(marks: Marks[]): string[] {
        return marks.map((mark: Marks) => {
            return marksValues.find((value: ShipmentMarks) => value.value === mark)?.displayValue ?? ''
        })
    }

    private generateShipmentId(): number {
        Shipment.id += 1;
        return Shipment.id;
    }

}
