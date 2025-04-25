import * as GeometryUtil from "./geometryUtil";
import { IEntity2D } from "./iEntity2D";

export class Camera2D extends g.Camera2D implements IEntity2D {

    public onUpdate: g.Trigger<Camera2D>;
    private threshold: g.CommonRect;

    constructor(param: g.Camera2DParameterObject, thresholdRate: g.CommonRect) {
        super(param);

        g.game.focusingCamera = this;
        g.game.modified();

        this.onUpdate = new g.Trigger();
        this.threshold = thresholdRate;
    }

    step(): void {
        this.onUpdate.fire(this);
    }

    getThreshold(): g.CommonRect {
        return {
            left: this.getWidth() * this.threshold.left,
            top: this.getHeight() * this.threshold.top,
            right: this.getWidth() * this.threshold.right,
            bottom: this.getHeight() * this.threshold.bottom,
        };
    }

    getViewport(): g.CommonRect {
        return {
            left: this.getLeft(),
            top: this.getTop(),
            right: this.getWidth(),
            bottom: this.getHeight(),
        };
    }

    getWidth(): number { return GeometryUtil.getWidth(this); }

    getHeight(): number { return GeometryUtil.getHeight(this); }

    getTop(): number { return GeometryUtil.getTop(this); }

    getRight(): number { return GeometryUtil.getRight(this); }

    getBottom(): number { return GeometryUtil.getBottom(this); }

    getLeft(): number { return GeometryUtil.getLeft(this); }

    getCenterX(): number { return GeometryUtil.getCenterX(this); }

    getCenterY(): number { return GeometryUtil.getCenterY(this); }

    translate(x: number, y: number): void;
    translate(pos: g.CommonOffset): void;

    translate(arg1: number | g.CommonOffset, arg2?: number): void {
        if (typeof arg1 === "number") {
            this.moveTo(arg1, arg2);
        } else {
            this.moveTo(arg1);
        }
        this.modified();
    }
}