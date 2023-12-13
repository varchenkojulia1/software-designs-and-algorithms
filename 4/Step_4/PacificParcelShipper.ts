import { Shipper } from "./Shipper";
import { ShipmentCost } from "./AirEastShipper";
import { PackageType } from "./Shipment";

export class PacificParcelShipper extends Shipper {
    public name = 'Pacific Parcel';
    public standardPackageChange = 0.51;
    public shipmentCost: ShipmentCost = {
        [PackageType.letter]: 0.51,
        [PackageType.package]: 0.19,
        [PackageType.oversized]: this.standardPackageChange + 0.02
    };
}
