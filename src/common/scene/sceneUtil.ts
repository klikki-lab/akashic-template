export namespace SceneUtil {

    /**
    * 開発中に右クリックでスクリーンショットできるようにする。
    * この処理を有効にするにはtsconfigにdomを追加すること。
    */
    export function enableRightClickScreenshot(scene: g.Scene): void {
        scene.onPointDownCapture.add(ev => {
            if (ev.button === 2) {
                const link = document.getElementsByClassName("pure-button")[2];
                (link as HTMLAnchorElement).click();
            }
        });
    }
}