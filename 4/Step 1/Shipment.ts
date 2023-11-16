export interface ShipmentInfo {
    ShipmentID: number;
    Weight: number;
    FromAddress: string;
    FromZipCode: string;
    ToAddress: string;
    ToZipCode: string;
}

const PRICE_PER_OUNCE = 0.39;

export class Shipment {
    public static id = 0;
    public static shipment: Shipment;

    public weight: number;
    public fromAddress: string;
    public fromZipCode: string;
    public toAddress: string;
    public toZipCode: string;
    public shipmentID: number;

    constructor(shipment: ShipmentInfo) {
        this.shipmentID = shipment.ShipmentID === 0 ? this.generateShipmentId() : shipment.ShipmentID;
        this.weight = shipment.Weight;
        this.fromAddress = shipment.FromAddress;
        this.fromZipCode = shipment.FromZipCode;
        this.toAddress = shipment.ToAddress;
        this.toZipCode = shipment.ToZipCode;

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
        return `shipmentId = ${this.shipmentID}, sent from: ${this.fromAddress}, ${this.fromZipCode}. It is going: ${this.toAddress}, ${this.toZipCode}, cost = ${this.weight * PRICE_PER_OUNCE}`;
    }

}
