import { BaseScene } from "../common/baseScene";
import { CountdownTimer } from "../common/countdownTimer";
import { GameMainParameterObject } from "./../parameterObject";

export class TitleScene extends BaseScene<boolean> {

    private countdownTimer: CountdownTimer;

    private isTouched = false;
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

        this.onPointDownCapture.add(this.pointDownHandler);
        this.onUpdate.add(this.updateHandler);
    };

    private pointDownHandler = (ev: g.PointDownEvent): void => {
        this.isTouched = true;
        this.onPointDownCapture.remove(this.pointDownHandler);
    };

    private updateHandler = (): void | boolean => {
        if (this.isFinish) {
            this.onFinish(this.isTouched);
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