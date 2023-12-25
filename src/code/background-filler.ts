import getRandomArrayElement from "./get-random-array-element";

export default class BackgroundFiller {
    fillCirclePattern(ctx: CanvasRenderingContext2D) {
        const colors = [
            [this.colorWayBeyondTheBlue, this.colorMilitantVegan],
            [this.colorFerocious, this.colorLemonTart],
        ];
        const countCircles = 4;

        this.drawColorPallet(ctx, colors);
        this.drawCirclePattern(ctx, 32.5,'rgba(255, 255, 255, 0.2)', countCircles, countCircles);
    }

    fillBoom(ctx: CanvasRenderingContext2D) {
        this.fillSolid(ctx, this.colorCandyGrapeFizz);
        this.drawBoom(ctx);
    }

    fillSolid(ctx: CanvasRenderingContext2D, color?: string) {
        color ? ctx.fillStyle = color : ctx.fillStyle = getRandomArrayElement(this.colors);
        ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    }

    private drawBoom(ctx: CanvasRenderingContext2D) {
        const boomPath = new Path2D('M191.417 109.588L217.297 9.36209L243.178 109.588L245.013 116.696L249.38 110.795L347.181 -21.3678L296.719 131.982L293.967 140.347L301.71 136.154L395.59 85.3218L336.288 175.668L333.281 180.248L338.701 181.051L398.583 189.921L354.875 232.035L349.944 236.785L356.682 238L563.611 275.3L350.932 290.633L339.239 291.477L349.481 297.182L430.828 342.497H321.915H314.775L319.148 348.141L426.622 486.837L276.607 378.368L271.056 374.354V381.204V555.094L220.64 392.62L218.77 386.596L214.648 391.37L163.538 450.557V381.204V373.606L157.763 378.544L76.317 448.191L115.937 347.276L118.999 339.476L111.299 342.781L-36.9571 406.406L85.7425 296.734L91.3507 291.721L83.904 290.659L-23.8911 275.292L78.4934 237.842L85.846 235.153L78.9387 231.467L-89.306 141.697L94.6489 181.011L102.23 182.631L98.4314 175.874L57.5327 103.113L133.144 136.281L140.326 139.432L137.875 131.982L87.4128 -21.3679L185.214 110.795L189.581 116.696L191.417 109.588Z');
        
        //Draw shadow
        ctx.save();
        ctx.translate(-22, 22);
        ctx.fillStyle = this.colorKilimanjaro;
        ctx.fill(boomPath);
        ctx.restore();

        //Draw explosion
        ctx.fillStyle = this.colorLemonTart;
        ctx.strokeStyle = this.colorFerocious;
        ctx.lineWidth = 7;
        ctx.fill(boomPath);
        ctx.stroke(boomPath);
    }

    private drawColorPallet(ctx: CanvasRenderingContext2D, colors: string[][]) {
        let positionX = 0;
        let positionY = 0;
        const canvasHeight = ctx.canvas.height;
        const canvasWidth = ctx.canvas.width;
        const heightFactor = canvasHeight / colors.length;

        colors.forEach((colorsInRow) => {
            const widthFactor = canvasWidth / colorsInRow.length;

            colorsInRow.forEach((color) => {
                ctx.fillStyle = color;
                ctx.fillRect(positionX, positionY, widthFactor, heightFactor);
                positionX += widthFactor;
            });

            positionX = 0;
            positionY += heightFactor;
        })
    }

    private drawCirclePattern(ctx: CanvasRenderingContext2D, radius: number, color: string, countInRow: number, countInColumn: number) {
        let positionY = 0;
        const diameter = radius * 2;
        const canvasWidth = ctx.canvas.width;
        const canvasHeight = ctx.canvas.height;
        const spaceBetweenHorizon = (canvasWidth - diameter * countInRow) / countInRow;
        const spaceBetweenVertical = (canvasHeight - diameter * countInColumn) / countInColumn;

        ctx.fillStyle = color;

        for (let columnIndex = 0; columnIndex < countInColumn; columnIndex++) {
            let positionX = 0;

            for (let rowIndex = 0; rowIndex < countInRow; rowIndex++) {
                ctx.beginPath();
                ctx.arc(positionX + (diameter + spaceBetweenHorizon) / 2, positionY + (diameter + spaceBetweenVertical) / 2, radius, 0, Math.PI * 2);
                ctx.fill();
    
                positionX += diameter + spaceBetweenHorizon;
            }

            positionY += diameter + spaceBetweenVertical;
        }
    }

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
        this.colorJitteryJade
    ]
}