import { useReducer } from "react";
import { bannedAttributes } from "./utils/bannedAttributes";

export async function getUserFavorites(loggedUser) {
  try {
    const data = await loggedUser.favorites;
    let attributes = [];

    await data.map(async (element) => {
      let elementAttributes = Object.keys(element);
      let differences = elementAttributes.filter(
        (x) =>
          !attributes.includes(x) &&
          !bannedAttributes.includes(x) &&
          x !== "imageAttribute"
      );
      attributes = attributes.concat(differences);
    });

    const imageKey = await data[0].imageAttribute;

    return { data, attributes, imageKey };
  } catch (error) {
    return { data: [], attributes: [], imageKey: "img" };
  }
}

export async function addFavorite(item, loggedUser, imageAttribute, attr) {
  try {
    const users = await JSON.parse(localStorage.getItem("listfav-users"));
    delete item.liked;

    item.imageAttribute = await imageAttribute;

    let index = await users.findIndex((user) => {
      return user.email === loggedUser.email;
    });

    await loggedUser.favorites.push(item);

    await users[index].favorites.push(item);

    localStorage.setItem("listfav-signed", JSON.stringify(loggedUser));
    localStorage.setItem("listfav-users", JSON.stringify(users));

    return true;
  } catch (error) {
    console.log(error);
  }
}

export async function removeFavorite(itemIndex, loggedUser) {
  try {
    const users = await JSON.parse(localStorage.getItem("listfav-users"));

    let index = await users.findIndex((user) => {
      return user.email === loggedUser.email;
    });

    await loggedUser.favorites.splice(itemIndex, 1);
    await users[index].favorites.splice(itemIndex, 1);

    localStorage.setItem("listfav-signed", JSON.stringify(loggedUser));
    localStorage.setItem("listfav-users", JSON.stringify(users));

    return true;
  } catch (error) {
    console.log(error);
  }
}
