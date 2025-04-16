export class Random {

    constructor(private random: g.RandomGenerator) { }

    /** 
     * 乱数を生成する。
     * @returns 0 以上 1 未満の乱数を返す。
     */
    generate(): number {
        return this.random.generate();
    }

    /**
     * 乱数を生成する。
     * @param min 最小値
     * @param max 最大値
     * @returns min 以上 max 未満の乱数を返す。
     */
    range(min: number, max: number): number {
        const _min = min ?? 0;
        return this.random.generate() * (max - _min) + _min;
    }

    /**
     * 乱数を生成する。
     * @param min 最小値
     * @param max 最大値
     * @returns min 以上 max 未満の整数値を返す。
     */
    rangeInt(min: number, max: number): number {
        return Math.floor(this.range(min, max));
    }
}