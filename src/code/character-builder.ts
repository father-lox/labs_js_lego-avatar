import head from '../assets/body-parts/head.svg';
import bodies from "../data/bodies";
import eyebrows from "../data/eyebrows";
import eyes from "../data/eyes";
import glasses from "../data/glasses";
import heirs from "../data/heirs";
import mouths from "../data/mouths";
import pets from "../data/pets";

import ImageLoader from './image-loader';
import getRandomArrayElement from './get-random-array-element';

import { Character } from '../types/character';

export default class CharacterBuilder {
    async buildRandomCharacter() {
        return await this.loadCharacterAssets(this.generateCharacter());
    }

    private loadCharacterAssets(character: Character<string>) {
        const imageLoader = new ImageLoader();

        return Promise.all(
            Object.entries(character).map(([key, value]) => imageLoader.loadImage(value)),
        ).then((characterAssets) => {
            const [
                body,
                head,
                heir,
                mouth,
                glass,
                eye,
                eyebrow,
                pet,
            ] = characterAssets;

            return {
                body: body,
                head: head,
                heir: heir,
                mouth: mouth,
                glass: glass,
                eye: eye,
                eyebrow: eyebrow,
                pet: pet,
            } as Character<HTMLImageElement>
        });
    }

    private generateCharacter(): Character<string> {
        return {
            body: getRandomArrayElement(bodies),
            head: head,
            heir: getRandomArrayElement(heirs),
            mouth: getRandomArrayElement(mouths),
            glass: getRandomArrayElement(glasses),
            eye: getRandomArrayElement(eyes),
            eyebrow: getRandomArrayElement(eyebrows),
            pet: getRandomArrayElement(pets)
        }
    }
}

