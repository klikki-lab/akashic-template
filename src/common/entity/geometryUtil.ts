interface Transformable extends g.CommonArea {
    scaleX: number;
    scaleY: number;
    anchorX: number;
    anchorY: number;
}

export function getScaledWidth(e: Transformable): number {
    return e.width * e.scaleX;
}

export function getScaledHeight(e: Transformable): number {
    return e.height * e.scaleY;
}

export function getLeft(e: Transformable): number {
    return e.x - getScaledWidth(e) * e.anchorX;
}

export function getTop(e: Transformable): number {
    return e.y - getScaledHeight(e) * e.anchorY;
}

export function getRight(e: Transformable): number {
    return getLeft(e) + getScaledWidth(e);
}

export function getBottom(e: Transformable): number {
    return getTop(e) + getScaledHeight(e);
}