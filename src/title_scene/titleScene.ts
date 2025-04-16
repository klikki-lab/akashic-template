import { BaseScene } from "../common/baseScene";
import { CountdownTimer } from "../common/countdownTimer";
import { GameMainParameterObject } from "./../parameterObject";

export class TitleScene extends BaseScene<void> {

    private countdownTimer: CountdownTimer;

    private isFinish = true;

    constructor(param: GameMainParameterObject, timeLimit: number) {
        super({
            game: g.game,
            assetIds: [

            ],
        });

        this.onLoad.add(() => this.loadHandler(timeLimit));
    }

    private loadHandler = (timeLimit: number): void => {
        this.countdownTimer = this.createCountdownTimer(timeLimit);
    };

    private updateHandler = (): void | boolean => {
        if (this.isFinish) {
            this.onFinish();
            return true;
        }
    };

    private createCountdownTimer = (timeLimit: number): CountdownTimer => {
        const countdownTimer = new CountdownTimer(timeLimit);
        countdownTimer.onTick = remainingSec => {

        };

        countdownTimer.onFinish = () => {
            this.isFinish = true;
        };
        return countdownTimer;
    };
}