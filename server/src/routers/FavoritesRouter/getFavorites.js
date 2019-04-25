import firestore from "../../config/firebase/firebaseConfig";

import * as constants from "../../config/constants";

export default async function getFavorites(token) {
  let usersDoc = undefined;
  let menusDoc = undefined;
  let favoritesTodayDoc = undefined;

  try {
    usersDoc = await firestore.doc("favorites/users").get();
    menusDoc = await firestore.doc("menus/menuItems").get();
    favoritesTodayDoc = await firestore.doc("favorites/today").get();
  } catch (e) {
    throw new Error(`${constants.E_DB_READ}: ${e}`);
  }

  if (!usersDoc.exists) {
    throw new Error(`${constants.E_DB_NOENT}: favorites/users`);
  } else if (!menusDoc.exists) {
    throw new Error(`${constants.E_DB_NOENT}: menus/menuItems`);
  } else if (!favoritesTodayDoc.exists) {
    throw new Error(`${constants.E_DB_NOENT}: favorites/today`);
  } else if (!token) {
    throw new Error(constants.E_BAD_FAVE_GET_REQ);
  }

  var menuItems = {};
  try {
    usersDoc.data()[token]
      ? usersDoc.data()[token].forEach(item => {
          var name, meal, location, timestamp;
          item in favoritesTodayDoc.data() &&
          ({ name, meal, location, timestamp } = favoritesTodayDoc.data()[item]) &&
          isFresh(timestamp)
            ? (menuItems[item] = {name, meal, location, isBeingServed:true})
            : (menuItems[item] = { name: menusDoc.data()[item], isBeingServed:false });
        })
      : await firestore
            .doc("favorites/users")
            .update({ [token]: [] });
  } catch (e) {
    throw new Error(`${constants.E_DB_WRITE}: ${e}`);
  }

  return menuItems;
}

function isFresh(timestamp) {
  const date = new Date();
  return date.toDateString() == timestamp;
}
