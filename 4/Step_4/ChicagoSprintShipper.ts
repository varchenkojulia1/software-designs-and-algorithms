import { Shipper } from "./Shipper";
import { ShipmentCost } from "./AirEastShipper";

export class ChicagoSprintShipper extends Shipper {
    public name = 'Chicago Sprint';
    public standardPackageChange = 0.42;
    public shipmentCost: ShipmentCost = {
        letter: 0.42, package: 0.2, oversized: this.standardPackageChange
    };
}
