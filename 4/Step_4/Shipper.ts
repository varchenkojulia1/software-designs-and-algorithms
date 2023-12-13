import { ShipmentCost } from "./AirEastShipper";
import { PackageType } from "./Shipment";

export abstract class Shipper {
    public name: string;
    public shipmentCost?: ShipmentCost;

    public getCost(type: PackageType, weight: number): number {
        return Number((this.shipmentCost[type] * weight).toFixed(2));
    }
}
