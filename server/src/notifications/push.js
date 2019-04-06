import Expo from 'expo-server-sdk';
import { E_PUSH_SEND, E_CODE_IS, STATUS_OK, STATUS_ERROR } from '../config/constants';

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
                    if (receipt.status === STATUS_OK) {
                        continue;
                    } else if (receipt.status === STATUS_ERROR) {
                        console.log(`${E_PUSH_SEND} ${receipt.message}`);
                        if (receipt.details && receipt.details.error) {
                            console.error(`${E_CODE_IS} ${receipt.details.error}`);
                        }
                    }
                }
            } catch (error) {
                console.error(error);
            }
        }
    })();
}