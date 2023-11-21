import { Shipment } from "./Shipment";


export class ShipmentDecorator {
    protected wrappee: Shipment;

    constructor(wrapper: Shipment) {
        this.wrappee  = wrapper;
    }

    public ship(): string {
        return this.wrappee.ship() + this.wrappee.marks.reduce((outputString: string, mark: string) => {
            return outputString + '\n **' + mark + '**'
        }, '')
    }
}
