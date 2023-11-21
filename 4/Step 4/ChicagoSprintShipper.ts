import { Shipper } from "./Shipper";
import { ShipmentCost } from "./AirEastShipper";

export class ChicagoSprintShipper extends Shipper {
    public standardPackageChange = 0.42;
    public shipmentCost: ShipmentCost = {
        letter: 0.42, package: 0.2, oversized: 0
    };
}
