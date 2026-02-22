export namespace MathUtil {

    /**
     * 角度をラジアンに変換する。
     * @param angle 角度
     * @returns ラジアン
     */
    export function toRadian(angle: number): number {
        return Math.PI / (180 / angle);
    }

    /**
     * ラジアンを角度に変換する。
     * @param radian ラジアン
     * @returns 角度
     */
    export function toDegrees(radian: number): number {
        return 180 * radian / Math.PI;
    }

    /**
     * 2点間の角度を取得する。
     * @param x1 
     * @param y1 
     * @param x2 
     * @param y2 
     * @returns 角度
     */
    export function getAngle(x1: number, y1: number, x2: number, y2: number): number;
    /**
     * 2点間の角度を取得する。
     * @param pos1 `g.CommonOffset`
     * @param pos2 `g.CommonOffset`
     * @returns 角度
     */
    export function getAngle(pos1: g.CommonOffset, pos2: g.CommonOffset): number;
    export function getAngle(arg1: number | g.CommonOffset, arg2: number | g.CommonOffset, arg3?: number, arg4?: number): number {
        if (typeof arg1 === "number" && typeof arg2 === "number") {
            const dx = arg3 - arg1;
            const dy = arg4 - arg2;
            const radians = Math.atan2(dy, dx);
            return radians * (180 / Math.PI);
        } else if (typeof arg1 === "object" && typeof arg2 === "object") {
            const dx = arg2.x - arg1.x;
            const dy = arg2.y - arg1.y;
            const radians = Math.atan2(dy, dx);
            return radians * (180 / Math.PI);
        }
        return 0;
    }

    /**
     *  2点間の距離を取得する。
     * @param x1 
     * @param y1 
     * @param x2 
     * @param y2 
     * @return 距離
     */
    export function getDistance(x1: number, y1: number, x2: number, y2: number): number;
    /**
     *  2点間の距離を取得する。
     * @param pos1 `g.CommonOffset`
     * @param pos2 `g.CommonOffset`
     * @return 距離
     */
    export function getDistance(pos1: g.CommonOffset, pos2: g.CommonOffset): number;
    export function getDistance(arg1: number | g.CommonOffset, arg2: number | g.CommonOffset, arg3?: number, arg4?: number): number {
        if (typeof arg1 === "number" && typeof arg2 === "number") {
            const dx = arg3 - arg1;
            const dy = arg4 - arg2;
            return Math.sqrt(dx * dx + dy * dy);
        } else if (typeof arg1 === "object" && typeof arg2 === "object") {
            const dx = arg2.x - arg1.x;
            const dy = arg2.y - arg1.y;
            return Math.sqrt(dx * dx + dy * dy);
        }
        return 0;
    }
}