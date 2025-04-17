/**
 * 最低限の機能のみを提供するイメージボタンクラス。画像は通常時と押下時の画像を横並びにしておく。
 * {@link onPress}、{@link onPressCancelled}、{@link onClick} 、3つのリスナーがある。
 */
export class Button extends g.Sprite {

    private _onPress?: (button: Button) => void;
    private _onPressCancelled?: (button: Button) => void;
    private _onClick?: (button: Button) => void;

    private isPressed: boolean = false;

    constructor(scene: g.Scene, assetId: string) {
        const asset = scene.asset.getImageById(assetId);
        super({
            scene: scene,
            src: asset,
            srcWidth: asset.width / 2,
            width: asset.width / 2,
            touchable: true,
        });

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

    /**
     * ボタンが押された時のリスナーをセットする。この時点ではまだクリックしたことにはならない。
     * @param listener 押下リスナー。
     */
    set onPress(listener: (button: Button) => void) { this._onPress = listener; };

    /**
     * ボタンを押下後、ボタンからポインタが離れた時のリスナーをセットする。このリスナーが呼び出された時点でボタンのクリックはキャンセルされる。
     * @param listener キャンセルリスナー。
     */
    set onPressCancelled(listener: (button: Button) => void) { this._onPressCancelled = listener; };

    /**
     * ボタンがクリックされた時のリスナーをセットする。
     * @param listener クリックリスナー。
     */
    set onClick(listener: (button: Button) => void) { this._onClick = listener; };

    private pointDownHandler(_ev: g.PointDownEvent): void {
        if (this.isPressed) return;

        this.switchPressedState(true);
        this._onPress?.(this);
    }

    private pointMoveHandler(ev: g.PointMoveEvent): void {
        if (!this.isPressed) return;

        const ex = ev.point.x + ev.startDelta.x;
        const ey = ev.point.y + ev.startDelta.y;
        if (ex < 0 || ex > this.width || ey < 0 || ey > this.height) {
            this.switchPressedState(false);
            this._onPressCancelled?.(this);
        }
    }

    private pointUpHandler(_ev: g.PointUpEvent) {
        if (!this.isPressed) return;

        this.switchPressedState(false);
        this._onClick?.(this);
    }

    private switchPressedState(isPressed: boolean): void {
        this.isPressed = isPressed;
        this.srcX = isPressed ? this.width : 0;
        this.invalidate();
    }
}