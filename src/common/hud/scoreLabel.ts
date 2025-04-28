import * as tl from "@akashic-extension/akashic-timeline";
import { Affix } from "./afix";

/**
 * 表示上の最小値と最大値(カンスト値)を指定する。
 * 内部的なスコアはこれらの閾値に影響されずに増減する。
 */
export interface ScoreThreshold {
    /** 表示上の最小値。指定がなければ `0`。`max` 以上であれば例外を投げる。 */
    min?: number;
    /** 表示上の最大値(カンスト値)。指定がなければ `Number.MAX_VALUE`。 `0` または `min` 以下であれば例外を投げる。 */
    max?: number;
}

export class ScoreLabel extends g.Label {

    #min: number;
    get min(): number { return this.#min; }

    #max: number;
    get max(): number { return this.#max; }

    #prefix: string;
    #suffix: string;
    #spaces: string;

    constructor(param: g.LabelParameterObject, initialScore: number = 0, private affix: Affix, threshold?: ScoreThreshold) {
        super(param);

        g.game.vars.gameState.score = initialScore;

        const min = threshold?.min ?? 0;
        const max = threshold?.max ?? Number.MAX_VALUE;
        if (min >= max || max <= 0) throw new Error();

        this.#min = min;
        this.#max = max;

        this.#prefix = this.affix.prefix ?? "";
        this.#suffix = this.affix.suffix ?? "";

        const digits = Math.floor(Math.log10(max)) + 1;
        this.#spaces = ' '.repeat(digits - 1);
    }

    /**
     * @returns スコアが表示上の最大値(カンスト)に達していれば`true`、そうでなければ`false`。
     */
    isScoreMaxed(): boolean { return g.game.vars.gameState.score >= this.#max; }

    /**
     * 指定したスコアを加算する。
     * @param score スコア。
     */
    addScore(score: number): void {
        g.game.vars.gameState.score += score;
        this.setText(this.clamp(g.game.vars.gameState.score));
    }

    /**
     * 指定したスコアをセットする。
     * @param score スコア。
     */
    setScore(score: number): void {
        g.game.vars.gameState.score = score;
        this.setText(this.clamp(g.game.vars.gameState.score));
    }

    /**
     * 指定したスコアを加算アニメーションする。
     * @param timeline `tl.Timeline`
     * @param score スコア
     * @param duration 変化に要する時間（ミリ秒）
     * @returns `tl.Tween`
     */
    addScoreWithAnim(timeline: tl.Timeline, score: number, duration: number): tl.Tween {
        g.game.vars.gameState.score += score;
        return this.animation(timeline, score, duration);
    }

    /**
     * 指定したスコアをセットしアニメーションする。
     * @param timeline `tl.Timeline`
     * @param score スコア
     * @param duration 変化に要する時間（ミリ秒）
     * @returns `tl.Tween`
     */
    setScoreWithAnim(timeline: tl.Timeline, score: number, duration: number): tl.Tween {
        const diff = score - g.game.vars.gameState.score;
        g.game.vars.gameState.score = score;
        return this.animation(timeline, diff, duration);
    }

    private animation(timeline: tl.Timeline, score: number, duration: number): tl.Tween {
        const clamped = this.clamp(g.game.vars.gameState.score);
        return timeline.create(this)
            .every((_e: number, p: number) => {
                this.setText(clamped - Math.floor(score * (1 - p)));
            }, duration);
    }

    private clamp(score: number): number { return g.Util.clamp(score, this.#min, this.#max); }

    private setText(score: number): void {
        const SpacesFilledScore = (this.#spaces + score).slice(-(this.#spaces.length + 1));
        this.text = `${this.#prefix}${SpacesFilledScore}${this.#suffix}`;
        this.invalidate();
    }
}