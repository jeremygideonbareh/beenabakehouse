import content from "../../content.json";

export const site = content as typeof import("../../content.json");
export type Site = typeof content;