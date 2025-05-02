/**
 * ポイントイベントキュークラス。`pop`、`isEmpty` 以外のメソッドは基本的には使わない。\
 * 軽量化のため `point-move` イベントは最新のイベントしか保持しない。
 */
export class PointEventQueue {

    private queue: g.PointEvent[] = [];
    private latestMove: Map<number, g.PointEvent> = new Map();

    /**
     * @param maxPointerId 最大マルチタッチ数を指定する。デフォルトは `0`。
     * @throws `maxPointerId` が負数の場合、例外を投げる
     */
    constructor(private maxPointerId: number = 1) {
        if (maxPointerId <= 0) {
            throw new Error(`maxPointerId must be greater than or equal to 1, but got: ${maxPointerId}`);
        }
    }

    /**
     * サブクラスから呼び出す必要はない。
     * @param event `g.PointEvent`
     */
    push(event: g.PointEvent): void {
        if (event.pointerId > this.maxPointerId) return;

        if (event.type === "point-move") {
            this.latestMove.set(event.pointerId, event);
        } else {
            this.queue.push(event);
        }
    }

    /**
     * 最新のポイントイベントを取得する。取得したイベントはキューから削除される。
     * @returns ポイントイベントが存在すれば `g.PointEvent`、なければ `undefined`。
     */
    pop(): (g.PointEvent | undefined) {
        if (!this.isEmptyQueue()) {
            return this.queue.shift();
        }
        for (const [pid, event] of this.latestMove) {
            this.latestMove.delete(pid);
            return event;
        }
        return undefined;
    }

    /**
     * 最新のポイントイベントを取得する。取得したイベントはキューから削除されない。
     * 最新のポイントイベントの確認用。
     * @returns ポイントイベントが存在すれば `g.PointEvent`、なければ `undefined`。
     */
    peek(): (g.PointEvent | undefined) {
        if (!this.isEmptyQueue()) {
            return this.queue[0];
        }
        for (const [_pid, event] of this.latestMove) {
            return event;
        }
        return undefined;
    }

    /**
     * キューを全削除する。
     */
    clear(): void {
        this.queue.length = 0;
        this.latestMove.clear();
    }

    /**
     * @returns キューが空なら `true`、そうでなければ `false`。
     */
    isEmpty(): boolean {
        return this.isEmptyQueue() && this.latestMove.size === 0;
    }

    /**
     * @returns キューの長さを取得する。待ちイベント数。
     */
    length(): number {
        return this.queue.length + + this.latestMove.size;
    }

    private isEmptyQueue(): boolean {
        return this.queue.length === 0;
    }
}