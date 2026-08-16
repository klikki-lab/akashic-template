export namespace StringUtil {

    export function repeat(str: string, digits: number) {
        if (digits <= 0) return "";
        return new Array(digits + 1).join(str);
    }

    export function paddingSpace(value: number, digits: number) {
        // const padding = ' '.repeat(digits - 1);
        const padding = repeat(" ", digits);
        return (padding + value).slice(-(padding.length + 1));
    }
}