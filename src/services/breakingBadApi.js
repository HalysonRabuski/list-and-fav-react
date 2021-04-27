import { apiBreakingBad } from "./apiUtils";
import { bannedAttributes } from "./utils/bannedAttributes";

export async function getBrBaCharacters() {
  const { data } = await apiBreakingBad.get("/api/characters");

  let attributes = Object.keys(data[0]);

  attributes = attributes.filter((val) => {
    return !bannedAttributes.includes(val);
  });

  const imageKey = "img";

  return { data, attributes, imageKey };
}
