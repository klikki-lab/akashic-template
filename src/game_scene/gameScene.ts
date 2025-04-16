import { AudioController } from "../common/audioController";
import { BaseScene } from "../common/baseScene";
import { CountdownTimer } from "../common/countdownTimer";
import { GameMainParameterObject } from "./../parameterObject";

export class GameScene extends BaseScene<void> {

    private countdownTimer: CountdownTimer;
    private audioController: AudioController;

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
        this.audioController = this.createAudioController();
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

    private createAudioController = (): AudioController => {
        const audioController = new AudioController(0.2, 0.2, false);

        return audioController;
    };
}