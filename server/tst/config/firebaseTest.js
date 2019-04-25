import firestore from "../../src/config/firebase/firebaseConfig";
import * as firebase from "firebase-admin";
import * as firebaseDocData from "./firebaseDocData";

var docData = undefined;
var docExists = true;
export default function firebaseTest(existsIndex=0){
  const docResult = () => {
    return {
      data: () => docData, 
      exists: docExists
    };
  };
  firestore.doc = jest.fn(docname => {
    docData = firebaseDocData.docDataMap[docname];
    docExists = firebaseDocData.docExistsMap[existsIndex][docname];
    return { update, get, set };
  });

  const get = jest.fn(() => Promise.resolve(docResult()));
  const update = jest.fn(updateValue => Promise.resolve(true));
  const set = jest.fn(setValue => Promise.resolve(true));
  firebase.firestore.FieldValue.arrayUnion = jest.fn(val => {
    return val;
  });
  firebase.firestore.FieldValue.arrayRemove = jest.fn(val => {
    return val;
  });
}
