import { Shipper } from "./Shipper";
import { ShipmentCost } from "./AirEastShipper";

export class PacificParcelShipper extends Shipper {
    public name = 'Pacific Parcel';
    public standardPackageChange = 0.51;
    public shipmentCost: ShipmentCost = {
        letter: 0.51, package: 0.19, oversized: this.standardPackageChange + 0.02
    };
}
