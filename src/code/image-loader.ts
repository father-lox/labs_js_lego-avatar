export default class ImageLoader {
    loadImage(path: string): Promise<HTMLImageElement> {
        return new Promise<HTMLImageElement>((resolve, reject) => {
            const image = new Image();

            image.addEventListener("load", (event) => {
                const image = event.target as HTMLImageElement;
                resolve(image);
            });

            image.addEventListener('error', () => {
                reject(`Fail to load an image ${path}`);
            });
    
            image.src = path;
        });
    }

    loadImageSet() {

    }
}