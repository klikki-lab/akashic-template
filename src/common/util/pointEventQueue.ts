/**
 * ポイントイベントキュークラス。`pop`、`isEmpty` 以外のメソッドは基本的には使わない。\
 * 軽量化のため `point-move` イベントは最新のイベントしか保持しない。
 */
export class PointEventQueue {

    private queue: g.PointEvent[] = [];
    private latestMove: { [key: number]: g.PointEvent } = {};
    private activePointers: { [key: number]: boolean } = {};
    private activePointerIds: number[] = [];
    private latestMoveCount: number = 0;

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

        switch (event.type) {
            case "point-down":
                if (!this.activePointers[event.pointerId]) {
                    this.activePointers[event.pointerId] = true;
                    this.activePointerIds.push(event.pointerId);
                }
                this.queue.push(event);
                break;
            case "point-up":
                delete this.activePointers[event.pointerId];
                this.removePointerId(event.pointerId);
                if (this.latestMove[event.pointerId] !== undefined) {
                    delete this.latestMove[event.pointerId];
                    this.latestMoveCount--;
                }
                this.queue.push(event);
                break;
            case "point-move":
                if (this.activePointers[event.pointerId]) {
                    if (this.latestMove[event.pointerId] === undefined) {
                        this.latestMoveCount++;
                    }
                    this.latestMove[event.pointerId] = event;
                }
                break;
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

        for (var i = 0; i < this.activePointerIds.length; i++) {
            var pid = this.activePointerIds[i];
            var event = this.latestMove[pid];
            if (event !== undefined) {
                delete this.latestMove[pid];
                this.latestMoveCount--;
                return event;
            }
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

        for (var i = 0; i < this.activePointerIds.length; i++) {
            var pid = this.activePointerIds[i];
            var event = this.latestMove[pid];
            if (event !== undefined) return event;
        }

        return undefined;
    }

    /**
     * キューを全削除する。
     */
    clear(): void {
        this.queue.length = 0;
        this.latestMove = {};
        this.activePointers = {};
        this.activePointerIds.length = 0;
        this.latestMoveCount = 0;
    }

    /**
     * @returns キューが空なら `true`、そうでなければ `false`。
     */
    isEmpty(): boolean {
        return this.isEmptyQueue() && this.latestMoveCount === 0;
    }

    /**
     * @returns キューの長さを取得する。待ちイベント数。
     */
    length(): number {
        return this.queue.length + this.latestMoveCount;
    }

    private isEmptyQueue(): boolean {
        return this.queue.length === 0;
    }

    private removePointerId(pid: number): void {
        var idx = this.activePointerIds.indexOf(pid);
        if (idx !== -1) {
            this.activePointerIds.splice(idx, 1);
        }
    }
}