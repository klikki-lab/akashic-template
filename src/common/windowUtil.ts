/**
 * windowオブジェクト絡みのユーティリティモジュール。
 */
export namespace WindowUtil {

    /**
     * @returns ドメインが`nicovideo.jp`なら`true`、そうでなければ`false`
     */
    export const isNicovideoJpDomain = (): boolean => {
        try {
            return window?.location?.hostname.indexOf("nicovideo.jp") >= 0;
        } catch (e: unknown) {
            return false;
        }
    };

    export const addMouseMoveListener = (listener: (ev: MouseEvent) => void): void => {
        window?.addEventListener('mousemove', listener);
    };

    export const removeMouseMoveListener = (listener: (ev: MouseEvent) => void): void => {
        window?.removeEventListener('mousemove', listener);
    };
}
