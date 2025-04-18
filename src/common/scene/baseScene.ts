
export abstract class BaseScene<T> extends g.Scene {

    public static readonly SCREEN_PADDING = 48;

    protected _onFinish?: (param: T) => void;

    /**
     * シーン終了のイベントコールバックをセットする。
     */
    set onFinish(callback: (param: T) => void) { this._onFinish = callback; }

    /**
    * 開発中に右クリックでスクリーンショットできるようにする。この処理を有効にするにはtsconfigにdomを追加すること。
    */
    enableRightClickScreenshot(): void {
        this.onPointDownCapture.add(ev => {
            if (ev.button === 2) {
                const link = document.getElementsByClassName("pure-button")[2];
                (link as HTMLAnchorElement).click();
                return;
            }
        });
    };
}