import { Shipper } from "./Shipper";
import { ShipmentType } from "./Shipment";

export interface ShipmentCost {
    letter: number;
    package: number;
    oversized: number;
}

export class AirEastShipper extends Shipper {
    public name = 'Air East';
    public standardPackageChange = 0.39;
    public shipmentCost: ShipmentCost = {
        letter: 0.39, package: 0.25, oversized: 0.39
    };

    public getCost(type: ShipmentType, weight: number): number {
        if (type === 'oversized') {
            return 10 + super.getCost(type, weight);
        }
        return super.getCost(type, weight);
    }
}
