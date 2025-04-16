import { BaseScene } from "../common/baseScene";
import { GameMainParameterObject } from "./../parameterObject";

export class TitleScene extends BaseScene<void> {

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