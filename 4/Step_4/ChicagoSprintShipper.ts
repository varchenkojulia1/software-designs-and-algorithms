import { Shipper } from "./Shipper";
import { ShipmentCost } from "./AirEastShipper";
import { PackageType } from "./Shipment";

export class ChicagoSprintShipper extends Shipper {
    public name = 'Chicago Sprint';
    public standardPackageChange = 0.42;
    public shipmentCost: ShipmentCost = {
        [PackageType.letter]: 0.42,
        [PackageType.package]: 0.2,
        [PackageType.oversized]: this.standardPackageChange
    };
}
