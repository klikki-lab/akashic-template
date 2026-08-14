/**
 * `g.RandomGenerator` のラッパークラス。
 */
export class Random {

    constructor(private random: g.RandomGenerator) { }

    /** 
     * @returns `0` 以上 `1` 未満のランダム値を返す。
     */
    generate(): number;

    /** 
     * @param max 最大値
     * @returns `0` 以上 `max` 未満のランダム値を返す。`max` が `0` 以下の場合は `0` 以下 `max` 未満のランダム値を返す。
     */
    generate(max: number): number;

    /**
     * @param min 最小値
     * @param max 最大値
     * @returns `min` 以上 `max` 未満のランダム値を返す。
     * @throws `min` が `max` 以上の場合はエラーを投げる。
     */
    generate(min: number, max: number): number;

    generate(arg1?: number, arg2?: number): number {
        if (arg1 === undefined) {
            return this.random.generate();
        }
        if (arg2 === undefined) {
            return this.random.generate() * arg1;
        }
        if (arg1 >= arg2) {
            throw new Error("arg1 must be less than arg2.");
        }
        return this.random.generate() * (arg2 - arg1) + arg1;
    }

    /** 
     * @param max 最大値
     * @returns `0` 以上 `max` 未満のランダム整数を返す。`max` が `0` 以下の場合は `0` 以下 `max` 未満のランダム整数を返す。
     */
    generateInt(max: number): number;

    /**
     * @param min 最小値
     * @param max 最大値
     * @returns `min` 以上 `max` 未満のランダム整数を返す。
     * @throws `min` が `max` 以上の場合はエラーを投げる。
     */
    generateInt(min: number, max: number): number;

    generateInt(arg1: number, arg2?: number): number {
        if (arg2 === undefined) {
            return Math.floor(this.random.generate() * arg1);
        }
        if (arg1 >= arg2) {
            throw new Error("arg1 must be less than arg2.");
        }
        return Math.floor(this.random.generate() * (arg2 - arg1) + arg1);
    }
}