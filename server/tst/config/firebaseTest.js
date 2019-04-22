import firestore from "../../src/config/firebase/firebaseConfig";
import * as firebase from "firebase-admin";

export default function firebaseTest() {
  const docData = {"Mock" : "Data"};
  const docResult = {
    data: () => docData, 
    exists: () => true
  };
  firestore.doc = jest.fn(docname => {
    return { update, get };
  });
  const get = jest.fn(() => Promise.resolve(docResult));
  const update = jest.fn(updateValue => Promise.resolve(true));
  firebase.firestore.FieldValue.arrayUnion = jest.fn(val => {
    return val;
  });
  firebase.firestore.FieldValue.arrayRemove = jest.fn(val => {
    return val;
  });
}
