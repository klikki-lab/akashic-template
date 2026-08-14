import { Random } from "./random";

/**
 * 配列に関するユーティリティ関数を提供する。
 */
export namespace ArrayUtil {

    /**
     * `value` を `count` 個持つ配列を生成する。
     * @param value 配列の要素
     * @param count 配列の要素数
     * @returns `value` を `count` 個持つ配列
     */
    export function rep<T>(value: T, count: number): T[] {
        return Array(count).fill(value);
    }

    /**
     * `func` の戻り値を `count` 個持つ配列を生成する。
     * @param count 配列の要素数
     * @param func 配列の要素を生成する関数。引数には要素のインデックスが渡される。
     * @returns `func` の戻り値を `count` 個持つ配列
     */
    export function repWithGenerator<T>(count: number, func: (i: number) => T): T[] {
        return Array.from({ length: count }, (_, i) => func(i));
    }

    /**
     * `start` から `end` までの整数を要素とする配列を生成する。
     * @param start 開始値
     * @param end 終了値
     * @returns `start` から `end` までの整数を要素とする配列
     */
    export function range(start: number, end: number): number[] {
        const len = end - start + 1;
        return Array.from({ length: len }, (_, i) => start + i);
    }

    /**
     * 配列をシャッフルする。
     * @param array シャッフルする配列
     * @param random シャッフルに使用する乱数生成器
     * @returns シャッフルされた配列
     */
    export function shuffle<T>(array: T[], random: Random): T[] {
        const arr = array.slice();
        for (let i = arr.length - 1; i > 0; i--) {
            const j = random.generateInt(i + 1);
            [arr[i], arr[j]] = [arr[j], arr[i]];
        }
        return arr;
    }

    /**
     * 配列の要素がすべて等しいかどうかを判定する。
     * @param a 配列a
     * @param b 配列b
     * @returns 配列の要素がすべて等しい場合は`true`、そうでない場合は`false`
     */
    export function equals<T>(a: T[], b: T[]): boolean {
        if (a.length !== b.length) return false;
        for (let i = 0; i < a.length; i++) {
            if (a[i] !== b[i]) return false;
        }
        return true;
    }

    /**
     * 配列の要素がすべて等しいかどうかを深く判定する。
     * @param a 配列a
     * @param b 配列b
     * @returns 配列の要素がすべて等しい場合は`true`、そうでない場合は`false`
     */
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