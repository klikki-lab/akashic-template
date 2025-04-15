// import * as tl from "@akashic-extension/akashic-timeline";

export class CustomLoadingScene extends g.LoadingScene {

    // private timeline: tl.Timeline;
    private waitingAssetCount = 0;

    constructor() {
        super({
            game: g.game,
            assetIds: [],
            explicitEnd: true,
        });

        // this.timeline = new tl.Timeline(this);

        this.onLoad.add(() => {
            new g.FilledRect({
                scene: this,
                parent: this,
                width: g.game.width,
                height: g.game.height,
                cssColor: "black",
                opacity: 0.9,
            });

            // const alien = new g.Sprite({
            //     scene: this,
            //     src: this.asset.getImageById("img_loading"),
            // });

            // const rect = new g.FilledRect({
            //     scene: this,
            //     width: alien.width,
            //     height: alien.height,
            //     cssColor: "black",
            //     compositeOperation: "source-atop",
            // });

            // const pane = new g.Pane({
            //     scene: this,
            //     width: alien.width,
            //     height: alien.height,
            //     x: g.game.width - alien.width * 0.75,
            //     y: g.game.height - alien.height * 0.75,
            //     anchorX: 0.5,
            //     anchorY: 0.5,
            // });
            // pane.append(alien);
            // pane.append(rect);
            // this.append(pane);

            const loading = (): void => {
                const rate = this.getTargetWaitingAssetsCount() / this.waitingAssetCount;
                // rect.height = pane.height * rate;
                // rect.modified();
            }

            this.onTargetReset.add(_scene => {
                // rect.height = pane.height;
                // rect.modified();

                // pane.opacity = 1;
                // pane.x = g.game.width - alien.width * 0.75;
                // pane.y = g.game.height - alien.height * 0.75;
                // pane.modified();

                // this.waitingAssetCount = this.getTargetWaitingAssetsCount();
            });

            this.onTargetAssetLoad.add(_asset => loading());

            this.onTargetReady.add(_scene => {
                // loading();
                // // this.end();
                // this.timeline.create(pane)
                //     .fadeOut(200, tl.Easing.easeInCubic)
                //     .call(() => this.end());
                this.end();
            });
        });
    }
}