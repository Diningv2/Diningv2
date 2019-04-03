import * as firebase from "firebase-admin";

const serviceAccount = require("./diningv2-4a304-firebase-adminsdk-v1tzp-e47819434d.json");

firebase.initializeApp({
    credential: firebase.credential.cert(serviceAccount),
    databaseURL: "https://diningv2-4a304.firebaseio.com"
});

const firestore = firebase.firestore();

export default firestore;
