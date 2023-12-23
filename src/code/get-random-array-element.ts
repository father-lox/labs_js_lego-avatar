import getRandomNumberInRange from "./get-random-number-in-range";

export default function getRandomArrayElement<T>(array: T[]): T {
    return array[getRandomNumberInRange(0, array.length - 1)];
}