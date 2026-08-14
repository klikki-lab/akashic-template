import { CustomLoadingScene } from "./common/scene/customLoadingScene";
import { GameScene } from "./game_scene/gameScene";
import { GameMainParameterObject } from "./parameterObject";
import { TitleScene } from "./title_scene/titleScene";

const TimeLimit = { TITLE: 60, GAME: 10 };

export function main(param: GameMainParameterObject): void {
    g.game.vars.gameState = {
        score: 0,
        playThreshold: 100,
        clearThreshold: undefined,
    };
    g.game.loadingScene = new CustomLoadingScene();

    g.game.pushScene(createGameScene(param, true));
}

function createTitleScene(param: GameMainParameterObject): TitleScene {
    const titleScene = new TitleScene(param, TimeLimit.TITLE);
    titleScene.onFinish = isTouched =>
        g.game.replaceScene(createGameScene(param, isTouched));
    return titleScene;
}

function createGameScene(param: GameMainParameterObject, isTouched: boolean): GameScene {
    const gameScene = new GameScene(param, isTouched, TimeLimit.GAME);
    gameScene.onFinish = () =>
        g.game.replaceScene(createTitleScene(param));
    return gameScene;
}