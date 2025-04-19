import * as GeometryUtil from "./geometryUtil";

export class Sprite2D extends g.Sprite {

    /**　
     * @returns スケールを考慮した横幅。
     */
    getScaledWidth(): number { return GeometryUtil.getScaledWidth(this); }

    /**
     * @returns スケールを考慮した縦幅。
     */
    getScaledHeight(): number { return GeometryUtil.getScaledHeight(this); }

    /** 
     * @returns 上座標。
     */
    getTop(): number { return GeometryUtil.getTop(this); }

    /**
     * @returns 右座標。
     */
    getRight(): number { return GeometryUtil.getRight(this); }

    /**
     * @returns 下座標。
     */
    getBottom(): number { return GeometryUtil.getBottom(this); }

    /**
     * @returns 左座標。
     */
    getLeft(): number { return GeometryUtil.getLeft(this); }
}