export default class Clipper {
    clipCircle(ctx: CanvasRenderingContext2D) {
        this.clipTopSemicircle(ctx);
        this.clipBottomSemicircle(ctx);
    }

    private clipTopSemicircle(ctx: CanvasRenderingContext2D) {
        const {width, height} = ctx.canvas;
        const radius = width / 2;

        ctx.save();
        ctx.beginPath();
        ctx.arc(width / 2, height / 2, radius, Math.PI, 2 * Math.PI);
        ctx.lineTo(width, 0);
        ctx.lineTo(0, 0);
        ctx.lineTo(0, height / 2);
        ctx.clip();
        ctx.clearRect(0, 0, width, height);
        ctx.restore();
    }

    private clipBottomSemicircle(ctx: CanvasRenderingContext2D) {
        const {width, height} = ctx.canvas;
        const radius = width / 2;

        ctx.save();
        ctx.beginPath();
        ctx.arc(width / 2, height / 2, radius, 0, Math.PI);
        ctx.lineTo(0, height);
        ctx.lineTo(width, height);
        ctx.lineTo(width, height / 2);
        ctx.clip();
        ctx.clearRect(0, 0, width, height);
        ctx.restore();
    }
}