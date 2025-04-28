import { BaseScene } from "../common/scene/baseScene";
import { AudioController } from "../common/util/audioController";
import { CountdownTimer } from "../common/util/countdownTimer";
import { Random } from "../common/util/random";
import { GameMainParameterObject } from "./../parameterObject";

export class GameScene extends BaseScene<void> {

    private audioController: AudioController;
    private countdownTimer: CountdownTimer;
    private random: Random;

    private isFinish = true;

    constructor(param: GameMainParameterObject, isTouched: boolean, timeLimit: number) {
        super({
            game: g.game,
            assetIds: [

            ],
        });

        this.random = new Random(param.random || g.game.random);
        this.onLoad.add(() => this.loadHandler(isTouched, timeLimit));
    }

    private loadHandler = (isTouched: boolean, timeLimit: number): void => {
        this.countdownTimer = this.createCountdownTimer(timeLimit);
        this.audioController = this.createAudioController(0.2, 0.2, !isTouched);
    };

    private updateHandler = (): void | boolean => {
        if (this.isFinish) {
            this.onFinish();
            return true;
        }
    };

    private createCountdownTimer(timeLimit: number): CountdownTimer {
        const countdownTimer = new CountdownTimer(timeLimit);
        countdownTimer.onTick = remainingSec => {

        };

        countdownTimer.onFinish = () => {
            this.isFinish = true;
        };
        return countdownTimer;
    }

    private createAudioController(musicVolume: number, soundVolume: number, disable: boolean): AudioController {
        const audioController = new AudioController(musicVolume, soundVolume, disable);

        return audioController;
    }
}