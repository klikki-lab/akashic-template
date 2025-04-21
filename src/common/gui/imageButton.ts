import { Sprite2D } from "../entity/sprite2D";
import { Button } from "./button";

export class ImageButton extends Button {

    private backgorund: Sprite2D;

    constructor(scene: g.Scene, assetId: string);
    constructor(scene: g.Scene, backgorund: Sprite2D);

    constructor(scene: g.Scene, arg: string | Sprite2D) {
        super({ scene: scene, });

        if (typeof arg === "string") {
            const asset = scene.asset.getImageById(arg);
            this.backgorund = new Sprite2D({
                scene: scene,
                parent: this,
                src: asset,
                srcWidth: asset.width / 2,
                width: asset.width / 2,
            });
        } else {
            this.backgorund = arg;
            this.append(this.backgorund);
        }

        this.width = this.backgorund.width;
        this.height = this.backgorund.height;
    }

    protected override switchPressedState(isPressed: boolean): void {
        super.switchPressedState(isPressed);
        this.backgorund.srcX = isPressed ? this.width : 0;
        this.backgorund.invalidate();
    }
}