import { Shipment, ShipmentInfo } from "./Shipment";

export class Client {
    public shipment: Shipment;

    public setShipment(shipmentInfo: ShipmentInfo): void {
        this.shipment = Shipment.getInstance(shipmentInfo);
    }
}
