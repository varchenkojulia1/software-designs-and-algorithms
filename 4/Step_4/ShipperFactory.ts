import { ChicagoSprintShipper } from "./ChicagoSprintShipper";
import { PacificParcelShipper } from "./PacificParcelShipper";
import { Shipper } from "./Shipper";
import { AirEastShipper } from "./AirEastShipper";

export class ShipperFactory {
    public static getShipper(fromZipCode: string): Shipper {
        switch (fromZipCode[0]) {
            case '4':
            case '5':
            case '6':
                return new ChicagoSprintShipper();
            case '7':
            case '8':
            case '9':
                return new PacificParcelShipper();
            default:
                return new AirEastShipper();
        }
    }
}
