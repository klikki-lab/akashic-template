interface Entity extends g.CommonArea {
    scaleX: number;
    scaleY: number;
    anchorX: number;
    anchorY: number;
}

export namespace EntityUtil {

    export function getScaledWidth(e: Entity): number {
        return e.width * e.scaleX;
    }

    export function getScaledHeight(e: Entity): number {
        return e.height * e.scaleY;
    }

    export function getLeft(e: Entity): number {
        return e.x - getScaledWidth(e) * e.anchorX;
    }

    export function getTop(e: Entity): number {
        return e.y - getScaledHeight(e) * e.anchorY;
    }

    export function getRight(e: Entity): number {
        return getLeft(e) + getScaledWidth(e);
    }

    export function getBottom(e: Entity): number {
        return getTop(e) + getScaledHeight(e);
    }
}