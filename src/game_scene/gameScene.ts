import { GameMainParameterObject } from "./../parameterObject";

export class GameScene extends g.Scene {

    constructor(param: GameMainParameterObject, timeLimit: number) {
        super({
            game: g.game,
            assetIds: [

            ],
        });

        this.onLoad.add(this.loadHandler);
    }

    private loadHandler = (): void => {

    };
}