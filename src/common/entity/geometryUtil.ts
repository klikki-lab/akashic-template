export function getCenterX(e: g.Object2D): number { return getLeft(e) + getWidth(e) / 2; }

export function getCenterY(e: g.Object2D): number { return getTop(e) + getHeight(e) / 2; }

export function getWidth(e: g.Object2D): number { return e.width * e.scaleX; }

export function getHeight(e: g.Object2D): number { return e.height * e.scaleY; }

export function getLeft(e: g.Object2D): number { return e.x - getWidth(e) * (e.anchorX ?? 0); }

export function getTop(e: g.Object2D): number { return e.y - getHeight(e) * (e.anchorY ?? 0); }

export function getRight(e: g.Object2D): number { return getLeft(e) + getWidth(e); }

export function getBottom(e: g.Object2D): number { return getTop(e) + getHeight(e); }

export function translate(e: g.E | g.Camera2D, arg1: number | g.CommonOffset, arg2?: number): void {
    if (typeof arg1 === "number" && typeof arg2 === "number") {
        e.moveTo(arg1, arg2);
    } else if (typeof arg1 === "object") {
        e.moveTo(arg1);
    }
    e.modified();
}