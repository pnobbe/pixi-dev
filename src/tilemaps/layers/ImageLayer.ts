import {Image} from "../Image";
import {AbstractLayer} from "./AbstractLayer";

export class ImageLayer extends AbstractLayer {
    private readonly _x: number;
    private readonly _y: number;
    private readonly _image: Image;

    constructor(props) {
        super(props);

        this._x = props.x;
        this._y = props.y;
        this._image = new Image(props.image);
    }

    get x(): number {
        return this._x;
    }

    get y(): number {
        return this._y;
    }

    get image(): Image {
        return this._image;
    }

}
