import { EntityUtil } from "./entityUtil";

export class FilledRect2D extends g.FilledRect {

    /**　
     * @returns スケールを加味した横幅。
     */
    getScaledWidth(): number { return EntityUtil.getScaledWidth(this); }

    /**
     * @returns スケールを加味した縦幅。
     */
    getScaledHeight(): number { return EntityUtil.getScaledHeight(this); }

    /** 
     * @returns 上座標。
     */
    getTop(): number { return EntityUtil.getTop(this); }

    /**
     * @returns 右座標。
     */
    getRight(): number { return EntityUtil.getRight(this); }

    /**
     * @returns 下座標。
     */
    getBottom(): number { return EntityUtil.getBottom(this); }

    /**
     * @returns 左座標。
     */
    getLeft(): number { return EntityUtil.getLeft(this); }
}