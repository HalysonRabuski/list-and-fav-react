import { apiGameOfThrones } from "./apiUtils";
import { bannedAttributes } from "./utils/bannedAttributes";

export async function getGoTCharacters() {
  const { data } = await apiGameOfThrones.get("/api/v2/Characters");

  let attributes = Object.keys(data[0]);

  attributes = attributes.filter((val) => {
    return !bannedAttributes.includes(val);
  });

  const imageKey = "imageUrl";

  return { data, attributes, imageKey };
}
