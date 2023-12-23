export default function getRandomNumberInRange(from: number, to: number) {
    return Math.round(Math.random() * (from - to) + to);
}