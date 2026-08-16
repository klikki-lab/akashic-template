import * as GeometryUtil from "./geometryUtil";
import { IEntity2D } from "./iEntity2D";

export interface UtilityParameterObject {

    /**
     * オブジェクトの`anchorX`と`anchorY`に同じ値を設定するためのユーティリティプロパティ。
     */
    anchor?: number;

    /**
     * オブジェクトの`scaleX`と`scaleY`に同じ値を設定するためのユーティリティプロパティ。
     */
    scale?: number;
}

export interface Entity2DParameterObject extends g.EParameterObject, UtilityParameterObject { }

export class Entity2D extends g.E implements IEntity2D {

    constructor(param: Entity2DParameterObject) {
        super({
            ...param,
            anchorX: param.anchor ?? param.anchorX ?? 0,
            anchorY: param.anchor ?? param.anchorY ?? 0,
            scaleX: param.scale ?? param.scaleX ?? 1,
            scaleY: param.scale ?? param.scaleY ?? 1,
        });
        this.children = [];
    }

    /**
     * @returns 子エンティティが存在しない場合`true`、そうでなければ`false`。
     */
    isEmptyChildren(): boolean { return this.children?.length === 0; }

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
        GeometryUtil.translate(this, arg1, arg2);
    }
}