import { CustomLoadingScene } from "./common/scene/customLoadingScene";
import { GameScene } from "./game_scene/gameScene";
import { GameMainParameterObject } from "./parameterObject";

export function main(param: GameMainParameterObject): void {
    g.game.vars.gameState = {
        score: 0,
        playThreshold: 100,
        clearThreshold: undefined,
    };
    g.game.loadingScene = new CustomLoadingScene();

    // const titleScene = new TitleScene(param, 10);
    // titleScene.onFinish = isTouched => {
    //     g.game.replaceScene(new GameScene(param, isTouched, 60));
    // }
    // g.game.pushScene(titleScene);

    g.game.pushScene(new GameScene(param, true, 60));
}
