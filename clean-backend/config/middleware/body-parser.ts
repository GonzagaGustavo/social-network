import bodyParser from "body-parser";

export const json = bodyParser.json();
export const urlencoded = bodyParser.urlencoded({ extended: "true" });
