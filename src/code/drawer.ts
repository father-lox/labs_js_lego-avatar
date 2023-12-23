import headPath from '../assets/body-parts/head.svg';
import bodyPath from '../assets/body-parts/bodies/muscle-shirt.svg';
import eyePath from '../assets/body-parts/eyes/nice.svg';
import mouth from '../assets/body-parts/mouths/open-smile.svg';
import glasses from '../assets/body-parts/glasses/plain.svg';
import eyebrows from '../assets/body-parts/eyebrows/angry.svg';
import heir from '../assets/body-parts/heirs/crazy.svg';
import pet from '../assets/pets/cat.svg';

import ImageLoader from './image-loader';
import AnchorPoint from './anchor-point';

import { Coordinates } from '../types/coordinates';


export default class CharacterDrawer {
    drawCharacter(ctx: CanvasRenderingContext2D) {
        this.drawCharacterPart(ctx, bodyPath, this.bodyTopPosition);
        this.drawCharacterPart(ctx, headPath, this.headTopPosition);
        this.drawCharacterPart(ctx, heir, this.heirTopPosition);
        this.drawCharacterPart(ctx, eyebrows, this.eyebrowTopPosition);
        this.drawCharacterPart(ctx, eyePath, this.eyeTopPosition);
        this.drawCharacterPart(ctx, glasses, this.glassTopPosition);
        this.drawCharacterPart(ctx, mouth, this.mouthTopPosition);
        this.drawPet(ctx, pet)
    }

    private headTopPosition = 125;
    private heirTopPosition = 58;
    private mouthTopPosition = 225;
    private glassTopPosition = 194;
    private eyeTopPosition = 200;
    private eyebrowTopPosition = 176;
    private bodyTopPosition = 297;

    private drawCharacterPart(ctx: CanvasRenderingContext2D, imagePath: string, topPosition: number) {
        new ImageLoader().loadImage(imagePath)
            .then((image) => {
                const position: Coordinates = {
                    x: ctx.canvas.clientWidth / 2,
                    y: topPosition
                };

                const { x, y } = new AnchorPoint(image.width, image.height).centerTop(position)

                ctx.drawImage(image, x, y);
            }).catch((message) => {
                console.error(message);
            })
    }

    private drawPet(ctx: CanvasRenderingContext2D, imagePath: string) {
        new ImageLoader().loadImage(imagePath)
            .then((image) => {
                const position: Coordinates = {
                    x: 0,
                    y: ctx.canvas.height
                };

                image.style.transform = 'rotate(-30deg)';
                
                const { x, y } = new AnchorPoint(image.width, image.height).leftBottom(position)

                ctx.drawImage(image, x, y);
            }).catch((message) => {
                console.error(message);
            })
    }
}
