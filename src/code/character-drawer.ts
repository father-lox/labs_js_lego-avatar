import AnchorPoint from './anchor-point';

import { Coordinates } from '../types/coordinates';
import { Character } from '../types/character';


export default class CharacterDrawer {
    drawCharacter(ctx: CanvasRenderingContext2D, character: Character<HTMLImageElement>) {
        this.drawCharacterPart(ctx, character.body, this.bodyTopPosition);
        this.drawCharacterPart(ctx, character.head, this.headTopPosition);
        this.drawCharacterPart(ctx, character.eyebrow, this.eyebrowTopPosition);
        this.drawCharacterPart(ctx, character.eye, this.eyeTopPosition);
        this.drawCharacterPart(ctx, character.glass, this.glassTopPosition);
        this.drawCharacterPart(ctx, character.mouth, this.mouthTopPosition);
        this.drawCharacterPart(ctx, character.heir, this.heirTopPosition);
        this.drawPet(ctx, character.pet)
    }

    private headTopPosition = 125;
    private heirTopPosition = 58;
    private mouthTopPosition = 175;
    private glassTopPosition = 194;
    private eyeTopPosition = 200;
    private eyebrowTopPosition = 176;
    private bodyTopPosition = 297;

    private drawCharacterPart(ctx: CanvasRenderingContext2D, image: HTMLImageElement, topPosition: number) {
        const position: Coordinates = {
            x: ctx.canvas.clientWidth / 2,
            y: topPosition
        };

        const { x, y } = new AnchorPoint(image.width, image.height).centerTop(position)

        ctx.drawImage(image, x, y);
    }

    private drawPet(ctx: CanvasRenderingContext2D, image: HTMLImageElement) {
        const borderOut = 100;
        const position: Coordinates = {
            x: 0,
            y: ctx.canvas.height + borderOut
        };

        const { x, y } = new AnchorPoint(image.width, image.height).leftBottom(position)

        ctx.drawImage(image, x, y);
    }
}
