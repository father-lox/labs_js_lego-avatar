import { Coordinates } from "../types/coordinates";

export default class AnchorPoint {
    constructor(private elementWidth: number, private elementHeight: number) {};

    leftTop(position: Coordinates): Coordinates {
        return position
    }

    centerTop(position: Coordinates): Coordinates {
        return {
            x: position.x - this.elementWidth / 2,
            y: position.y
        }
    }

    rightTop(position: Coordinates): Coordinates {
        return {
            x: position.x - this.elementWidth,
            y: position.y
        }
    }
    
    leftCenter(position: Coordinates): Coordinates {
        return {
            x: position.x,
            y: position.y - this.elementHeight / 2
        }
    }
    
    centerCenter(position: Coordinates): Coordinates {
        return {
            x: position.x - this.elementWidth / 2,
            y: position.y - this.elementHeight / 2
        }
    }

    rightCenter(position: Coordinates): Coordinates {
        return {
            x: position.x - this.elementWidth,
            y: position.y - this.elementHeight / 2
        }
    }

    leftBottom(position: Coordinates): Coordinates {
        return {
            x: position.x,
            y: position.y - this.elementHeight
        }
    }

    centerBottom(position: Coordinates): Coordinates {
        return {
            x: position.x - this.elementWidth / 2,
            y: position.y - this.elementHeight
        }
    }

    rightBottom(position: Coordinates): Coordinates {
        return {
            x: position.x - this.elementWidth,
            y: position.y - this.elementHeight
        }
    }
}