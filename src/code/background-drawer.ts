import BackgroundFiller from "./background-filler"
import getRandomArrayElement from "./get-random-array-element";

export default class BackgroundDrawer {
    drawFourColorBackgroundAndCirclePattern(ctx: CanvasRenderingContext2D) {
        const colors = [
            [this.colorWayBeyondTheBlue, this.colorMilitantVegan],
            [this.colorFerocious, this.colorLemonTart],
        ];
        const countCircles = 4;
        const circleRadius = 32.5;
        const circleColor = 'rgba(255, 255, 255, 0.2)';

        this.backgroundFiller.drawColorPallet(ctx, colors);
        this.backgroundFiller.drawCirclePattern(ctx, circleRadius, circleColor, countCircles, countCircles);
    }

    drawBoom(ctx: CanvasRenderingContext2D) {
        this.fillSolid(ctx, this.colorCandyGrapeFizz);
        this.backgroundFiller.drawExplosion(ctx, this.colorKilimanjaro, this.colorLemonTart, this.colorFerocious);
    }

    fillSolid(ctx: CanvasRenderingContext2D, color?: string) {
        if (color === undefined) {
            color = getRandomArrayElement(this.colors);
        }

        ctx.fillStyle = color;
        ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
        
        return color;
    }

    private backgroundFiller = new BackgroundFiller();

    private colorFruityLicious: string = '#FC8F8F' //Pink
    private colorWayBeyondTheBlue: string = '#1776CF' //Blue
    private colorMilitantVegan: string = '#1C974D' //Green
    private colorFerocious: string = '#E22525' //Red
    private colorLemonTart: string = '#FFDD65' //Yellow
    private colorCandyGrapeFizz: string = '#985CFA' //Purple
    private colorKilimanjaro: string = '#383434' //Black
    private colorJitteryJade: string = '#76EBC8'

    private colors: string[] = [
        this.colorFruityLicious,
        this.colorWayBeyondTheBlue,
        this.colorMilitantVegan,
        this.colorFerocious,
        this.colorLemonTart,
        this.colorCandyGrapeFizz,
        this.colorKilimanjaro,
        this.colorJitteryJade
    ]
}