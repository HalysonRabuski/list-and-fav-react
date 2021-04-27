import axios from "axios";

export const apiBreakingBad = axios.create({
  baseURL: "https://breakingbadapi.com",
});

export const apiGameOfThrones = axios.create({
  baseURL: "https://thronesapi.com",
});
