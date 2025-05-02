/**
 * GUIの配置は `UIMargin` エリア（スクリーンの上下左右基準）を避けるべき。
 * 少なくとも `UIMargin` から半分以上GUIのタップエリアが確保されていること。
 * スワイプも `UIMargin` エリア内で操作させるべきではない。
 */
export const UIMargin = {
    /** 128 px (画面縦幅が 720 px 基準) */
    top: g.game.height * 0.178,
    /** 48 px (画面縦幅が 720 px 基準) */
    bottom: g.game.height * 0.067,
    /** 128 px (画面横幅が 1280 px 基準) */
    left: g.game.width * 0.1,
    /** 128 px (画面横幅が 1280 px 基準) */
    right: g.game.width * 0.1,
} as const;

/**
 * GUIの最小サイズは `UIMinSize` 以上を推奨。
 */
export const UIMinSize = {
    /** 120 px (画面横幅が 1280 px 基準) */
    width: g.game.width * 0.094,
    /** 128 px (画面縦幅が 720 px 基準) */
    height: g.game.height * 0.178,
} as const;