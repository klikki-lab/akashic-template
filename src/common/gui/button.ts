import { Entity2D } from "../entity/entity2D";

export abstract class Button extends Entity2D {

    protected _onPress?: (button: Button) => void;
    /**
     * ボタンが押された時のイベントリスナー。
     * この時点ではまだクリックしたことにはならない。
     * @param listener 押下イベントリスナー。
     */
    set onPress(listener: (button: Button) => void) { this._onPress = listener; };

    protected _onPressCancelled?: (button: Button) => void;
    /**
     * ボタン押下状態を維持したままボタンの領域からポインタが離れた時のイベントリスナー。
     * このイベントリスナーが呼び出されるとクリック判定は行われない。
     * @param listener キャンセルイベントリスナー。
     */
    set onPressCancelled(listener: (button: Button) => void) { this._onPressCancelled = listener; };

    protected _onClick?: (button: Button) => void;
    /**
     * ボタンがクリックされた時のイベントリスナー。
     * @param listener クリックイベントリスナー。
     */
    set onClick(listener: (button: Button) => void) { this._onClick = listener; };

    private isPressed: boolean = false;

    constructor(param: g.EParameterObject) {
        super({ ...param, touchable: true });

        this.onPointDown.add(this.pointDownHandler);
        this.onPointMove.add(this.pointMoveHandler);
        this.onPointUp.add(this.pointUpHandler);
    }

    removeAllListener(): void {
        if (this.isPressed) {
            this.switchPressedState(false);
        }
        this.onPointDown.remove(this.pointDownHandler);
        this.onPointMove.remove(this.pointMoveHandler);
        this.onPointUp.remove(this.pointUpHandler);
    }

    override destroy(): void {
        this.removeAllListener();
        super.destroy();
    }

    protected pointDownHandler = (_ev: g.PointDownEvent): void => {
        if (this.isPressed) return;

        this.switchPressedState(true);
        this._onPress?.(this);
    }

    protected pointMoveHandler = (ev: g.PointMoveEvent): void => {
        if (!this.isPressed) return;

        const ex = ev.point.x + ev.startDelta.x;
        const ey = ev.point.y + ev.startDelta.y;
        if (ex < 0 || ex > this.getWidth() ||
            ey < 0 || ey > this.getHeight()) {
            this.switchPressedState(false);
            this._onPressCancelled?.(this);
        }
    }

    protected pointUpHandler = (_ev: g.PointUpEvent) => {
        if (!this.isPressed) return;

        this.switchPressedState(false);
        this._onClick?.(this);
    }

    protected switchPressedState(isPressed: boolean): void {
        this.isPressed = isPressed;
    }
}