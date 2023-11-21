import { AirEastShipper } from "./AirEastShipper";
import { ChicagoSprintShipper } from "./ChicagoSprintShipper";
import { PacificParcelShipper } from "./PacificParcelShipper";

export abstract class Shipper {
    public static shipper: Shipper;
    public shipmentCost: number;

    public static getInstance(fromZipCode: string): Shipper {
        if (!Shipper.shipper) {
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
        return Shipper.shipper;
    }

    public getCost(): number {
        return this.shipmentCost;
    }
}
