import { ShipmentCost } from "./AirEastShipper";
import { ShipmentType } from "./Shipment";

export abstract class Shipper {
    public name: string;
    public shipmentCost?: ShipmentCost;

    public getCost(type: ShipmentType, weight: number): number {
        return +(this.shipmentCost[type] * weight).toFixed(2);
    }
}
