import { CustomLoadingScene } from "./common/customLoadingScene";
import { GameScene } from "./game_scene/gameScene";
import { GameMainParameterObject } from "./parameterObject";

export function main(param: GameMainParameterObject): void {
    g.game.vars.gameState = {
        score: 0,
        playThreshold: 100,
        clearThreshold: undefined,
    };
    g.game.loadingScene = new CustomLoadingScene();

    const totalTimeLimit = param.sessionParameter.totalTimeLimit || 65;
    g.game.pushScene(new GameScene(param, false, 60));
}
