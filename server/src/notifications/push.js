import Expo from 'expo-server-sdk';

export default function push(tokens){
    let expo = new Expo();
    let chunks = expo.chunkPushNotifications(tokens);
    let tickets = [];
    (async () => {
        for (let chunk of chunks) {
            try {
                let ticketChunk = await expo.sendPushNotificationsAsync(chunk);
                console.log(ticketChunk);
                tickets.push(...ticketChunk);
            } catch (error) {
                console.error(error);
            }
        }
    })();

    let receiptIds = [];
    for (let ticket of tickets) {
        if (ticket.id) {
            receiptIds.push(ticket.id);
        }
    }

    let receiptIdChunks = expo.chunkPushNotificationReceiptIds(receiptIds);
    (async () => {
        for (let chunk of receiptIdChunks) {
            try {
                let receipts = await expo.getPushNotificationReceiptsAsync(chunk);
                console.log(receipts);
                for (let receipt of receipts) {
                    if (receipt.status === 'ok') {
                        continue;
                    } else if (receipt.status === 'error') {
                        console.error(`There was an error sending a notification: ${receipt.message}`);
                        if (receipt.details && receipt.details.error) {
                            console.error(`The error code is ${receipt.details.error}`);
                        }
                    }
                }
            } catch (error) {
                console.error(error);
            }
        }
    })();
}