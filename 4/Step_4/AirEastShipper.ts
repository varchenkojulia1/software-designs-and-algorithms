import { Shipper } from "./Shipper";
import { PackageType } from "./Shipment";

export interface ShipmentCost {
    [PackageType.letter]: number;
    [PackageType.package]: number;
    [PackageType.oversized]: number;
}

export class AirEastShipper extends Shipper {
    public name = 'Air East';
    public standardPackageChange = 0.39;
    public shipmentCost: ShipmentCost = {
        [PackageType.letter]: 0.39,
        [PackageType.package]: 0.25,
        [PackageType.oversized]: 0.39
    };

    public getCost(type: PackageType, weight: number): number {
        if (type === PackageType.oversized) {
            return 10 + super.getCost(type, weight);
        }
        return super.getCost(type, weight);
    }
}
