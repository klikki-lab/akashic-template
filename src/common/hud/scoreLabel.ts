import * as tl from "@akashic-extension/akashic-timeline";
import { LabelView, LavelViewParameterObject } from "./labelView";

export class ScoreLabel extends LabelView {

    constructor(param: LavelViewParameterObject) {
        super(param);
    }

    /**
     * @returns スコアが表示上の最大値(カンスト)に達していれば `true`、そうでなければ `false`。
     */
    isScoreMaxed(): boolean { return g.game.vars.gameState.score >= this.max; }

    /**
     * 指定したスコアを加算する。
     * @param score スコア。
     */
    addScore(score: number): void {
        g.game.vars.gameState.score += score;
        this.setValue(g.game.vars.gameState.score);
    }

    /**
     * 指定したスコアをセットする。
     * @param score スコア。
     */
    setScore(score: number): void {
        g.game.vars.gameState.score = score;
        this.setValue(g.game.vars.gameState.score);
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
        // const clamped = g.Util.clamp(g.game.vars.gameState.score, this.min, this.max);
        return timeline.create(this)
            .every((_e: number, p: number) => {
                this.setValue(g.game.vars.gameState.score - Math.floor(score * (1 - p)));
            }, duration);
    }
}