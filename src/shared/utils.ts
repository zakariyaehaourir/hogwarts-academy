import { House } from "./types";

const validHouses: readonly House[] = ["Gryffindor", "Slytherin", "Ravenclaw", "Hufflepuff"];

export function isHouse(value: unknown): value is House{
    return (typeof value === "string" && validHouses.includes(value as House));
}