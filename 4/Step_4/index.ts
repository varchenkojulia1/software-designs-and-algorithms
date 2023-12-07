import { Client } from "./Client";
import { Marks } from "./Marks";

const client = new Client();

client.setShipment({
    shipmentId: 123,
    weight: 100,
    fromAddress: 'FromAdress',
    fromZipCode: 'a234d',
    toAddress: 'ToAdress',
    toZipCode: '357f',
    marks: [Marks.RETURN_RECEIPT, Marks.ADDRESS, Marks.FRAGILE]
});

console.log(client.shipment.ship());
