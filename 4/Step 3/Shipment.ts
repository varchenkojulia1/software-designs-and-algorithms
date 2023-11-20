import { Shipper } from "../Step 2/Shipper";

export interface ShipmentInfo {
    ShipmentID: number;
    Weight: number;
    FromAddress: string;
    FromZipCode: string;
    ToAddress: string;
    ToZipCode: string;
}

type ShipmentType = 'letter' | 'package' | 'oversized';

export class Shipment {
    public static id = 0;
    public static shipment: Shipment;

    public weight: number;
    public fromAddress: string;
    public fromZipCode: string;
    public toAddress: string;
    public toZipCode: string;
    public shipmentID: number;
    public shipper: Shipper;

    private type: ShipmentType;

    constructor(shipment: ShipmentInfo) {
        this.shipmentID = shipment.ShipmentID === 0 ? this.generateShipmentId() : shipment.ShipmentID;
        this.weight = shipment.Weight;
        this.fromAddress = shipment.FromAddress;
        this.fromZipCode = shipment.FromZipCode;
        this.toAddress = shipment.ToAddress;
        this.toZipCode = shipment.ToZipCode;

        this.shipper = Shipper.getInstance(this.fromZipCode);
        this.type = this.getShipmentType(this.weight);
    }

    public static getInstance(shipmentInfo: ShipmentInfo): Shipment {
        if (!Shipment.shipment) {
            return new Shipment(shipmentInfo);
        }
        return Shipment.shipment;
    }

    private generateShipmentId(): number {
        Shipment.id += 1;
        return Shipment.id;
    }

    public ship(): string {
        return `shipmentId = ${this.shipmentID}, sent from: ${this.fromAddress}, ${this.fromZipCode}. It is going: ${this.toAddress}, ${this.toZipCode}, cost = ${this.weight * this.shipper.getCost()}`;
    }

    private getShipmentType(weight: number): ShipmentType {
        if (weight < 0) {
            throw new Error('Incorrect weight value');
        }
        return weight <= 15 ? 'letter' : weight <= 160 ? 'package' : 'oversized';
    }
}
