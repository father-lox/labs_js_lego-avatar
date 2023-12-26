import BackgroundFiller from "./background-filler"
import ColorSet from "./color-set";

export default class BackgroundDrawer {
    drawFourColorBackgroundAndCirclePattern(ctx: CanvasRenderingContext2D) {
        const colors = [
            [ColorSet.color.wayBeyondTheBlue, ColorSet.color.militantVegan],
            [ColorSet.color.ferocious, ColorSet.color.lemonTart],
        ];
        const countCircles = 4;
        const circleRadius = 32.5;
        const circleColor = 'rgba(255, 255, 255, 0.2)';

        this.backgroundFiller.drawColorPallet(ctx, colors);
        this.backgroundFiller.drawCirclePattern(ctx, circleRadius, circleColor, countCircles, countCircles);
    }

    drawBoom(ctx: CanvasRenderingContext2D) {
        this.fillSolid(ctx, ColorSet.color.candyGrapeFizz);
        this.backgroundFiller.drawExplosion(ctx, ColorSet.color.kilimanjaro, ColorSet.color.lemonTart, ColorSet.color.ferocious);
    }

    fillSolid(ctx: CanvasRenderingContext2D, color: string) {
        ctx.fillStyle = color;
        ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
        
        return color;
    }

    private backgroundFiller = new BackgroundFiller();
}