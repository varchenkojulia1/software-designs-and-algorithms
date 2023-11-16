import { Client } from "./Client";

const client = new Client();

client.setShipment({
    ShipmentID: 123,
    Weight: 3,
    FromAddress: 'some adress',
    FromZipCode: '1234d',
    ToAddress: 'some to adress',
    ToZipCode: '357f'
});

console.log(client.shipment.ship());
