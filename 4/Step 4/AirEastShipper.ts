import { Shipper } from "./Shipper";

export interface ShipmentCost {
    letter: number, package: number, oversized: number
}

export class AirEastShipper extends Shipper {
    public standardPackageChange = 0.39;
    public shipmentCost: ShipmentCost = {
        letter: 0.39, package: 0.25, oversized: 10 + this.standardPackageChange
    };
}
