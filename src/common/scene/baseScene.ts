import { PointEventQueue } from "../util/pointEventQueue";

/**
 * 各シーンはこのクラスを継承する。\
 * シーン終了のイベントハンドラに `_onFinish`があり、`onFinish`でコールバック関数をセットする。\
 * また、サブクラスではポイントイベントを直接操作することはせず、サブクラスの `onUpdate` 内で
 * `pointEventQueue()` からポイントイベントを取得すること。詳細は `PointEventQueue` を参照。
 */
export abstract class BaseScene<T> extends g.Scene {

    protected _onFinish?: (param: T) => void;
    #eventQueue: PointEventQueue;

    constructor(param: g.SceneParameterObject) {
        super(param);

        this.#eventQueue = new PointEventQueue();

        this.onPointDownCapture.add(this.#eventQueue.push, this.#eventQueue);
        this.onPointMoveCapture.add(this.#eventQueue.push, this.#eventQueue);
        this.onPointUpCapture.add(this.#eventQueue.push, this.#eventQueue);
    }

    /**
     * @returns `PointEventQueue`
     */
    get pointEventQueue(): PointEventQueue { return this.#eventQueue; }

    /**
    * シーン終了のイベントコールバックをセットする。
    */
    set onFinish(callback: (param: T) => void) { this._onFinish = callback; }
}