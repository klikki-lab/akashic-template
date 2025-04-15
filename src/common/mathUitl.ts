export namespace MathUtil {

    export const getAngle = (x1: number, y1: number, x2: number, y2: number): number => {
        const dx = x2 - x1;
        const dy = y2 - y1;
        const radians = Math.atan2(dy, dx);
        const degrees = radians * (180 / Math.PI);
        return (degrees + 360) % 360;
    };

    export const getDistance = (x1: number, y1: number, x2: number, y2: number): number => {
        const dx = x2 - x1;
        const dy = y2 - y1;
        return Math.sqrt(dx * dx + dy * dy);
    };
}