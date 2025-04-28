export namespace ArrayUtil {

    export function rep<T>(value: T, count: number): T[] {
        return Array(count).fill(value);
    }

    export function repWithGenerator<T>(count: number, fn: (i: number) => T): T[] {
        return Array.from({ length: count }, (_, i) => fn(i));
    }

    export function range(start: number, end: number): number[] {
        const len = end - start + 1;
        return Array.from({ length: len }, (_, i) => start + i);
    }

    export function shuffle<T>(array: T[], random: g.RandomGenerator): T[] {
        const arr = array.slice();
        for (let i = arr.length - 1; i > 0; i--) {
            const j = Math.floor(random.generate() * (i + 1));
            [arr[i], arr[j]] = [arr[j], arr[i]];
        }
        return arr;
    }

    export function equals<T>(a: T[], b: T[]): boolean {
        if (a.length !== b.length) return false;
        for (let i = 0; i < a.length; i++) {
            if (a[i] !== b[i]) return false;
        }
        return true;
    }

    export function equalsDeep<T>(a: T[], b: T[]): boolean {
        if (a.length !== b.length) return false;

        for (let i = 0; i < a.length; i++) {
            const v1 = a[i];
            const v2 = b[i];

            if (Array.isArray(v1) && Array.isArray(v2)) {
                if (!equalsDeep(v1, v2)) return false;
            } else {
                if (v1 !== v2) return false;
            }
        }
        return true;
    }
}